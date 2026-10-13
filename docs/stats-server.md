# Visit counter (stats.devdio.pro), server side

Tracker W29. Set up 2026-10-13. No secrets in this file: the Umami admin
password, the database password and the tunnel token live only on the server
(and the admin password with Sait).

## Machine

- LXC `umami` (Proxmox CT 105) on Sait's Proxmox VPS, not on the server that
  runs the directory mirror. Debian 13, 4 cores, 8 GB, 24 GB disk. Public
  address 86.104.14.90 on `eth0`.
- Installed with the community-scripts helper `ct/umami.sh`: Node 22,
  PostgreSQL 17 (listens on localhost only), Umami from the release tarball in
  `/opt/umami` (3.4.0 on 2026-10-13), systemd unit `umami.service`.
- unattended-upgrades is on for Debian security updates.
- SSH: Sait is rebuilding the SSH setup himself. The key on Sait's Mac
  (`~/.ssh/id_ed25519`) is in `/root/.ssh/authorized_keys`.

## Services

| Unit | Listens | Notes |
| --- | --- | --- |
| `umami` | 127.0.0.1:3000 | drop-in `/etc/systemd/system/umami.service.d/override.conf`: runs as user `umami`, binds localhost only, Next.js and Umami telemetry off. `ExecStartPre=+chown -R umami:umami /opt/umami` hands back files that an update (run as root) leaves behind. |
| `postgresql` | 127.0.0.1:5432, ::1:5432 | database `umamidb`, user `umami` |
| `cloudflared-umami` | outbound only, user `cloudflared` | tunnel `umami-stats` (e372e92e-63ac-4c46-a028-22e0a4aa12a9), remotely managed: `stats.devdio.pro` to `http://127.0.0.1:3000`. Token in `/etc/cloudflared/umami.token` (root:cloudflared 640). `net.ipv4.ping_group_range` is set to the cloudflared group (`/etc/sysctl.d/60-cloudflared-ping.conf`) so its ICMP proxy starts. |

Checked from outside on 2026-10-13: port 3000 does not answer; the only way in
is the tunnel. DNS: `stats.devdio.pro` CNAME to the tunnel, proxied.

## Settings in /opt/umami/.env

`.env` is umami:umami 600 (it was 644, readable by every user, with the
database password in it, until 2026-10-13 18:09). It holds:

- `DATABASE_URL`
- `TWO_FACTOR_ENCRYPTION_KEY`: 64 hex characters (AES-256 key for the TOTP
  secrets), added 2026-10-13 so two-factor login can be turned on. If the key
  is lost or changed, every stored 2FA secret becomes unreadable and those
  users cannot log in until 2FA is cleared for them, so the key must survive
  in backups. The community-scripts `update` keeps `.env` (backup and
  restore).
- `MCP_ENABLED=1`: the MCP endpoint at https://stats.devdio.pro/mcp. It
  answers 401 without credentials (checked from outside). It takes an API key
  (`umami_...`, made under Settings, API keys) as a bearer token; API keys
  cannot reach password, 2FA, user or admin routes.
- `SKIP_LOCATION_HEADERS=1` (W30): Umami ignores Cloudflare's country header
  and looks the IP up in `geo/GeoLite2-City.mmdb`, so country, region and city
  are stored. The IP itself is not stored.

A copy of `.env` from before these two lines is at
`/root/umami-env.bak-202610131809` (600).

## What it records

- Websites: macdio.app (cef17e25-0c90-4678-a353-b397a24ef5c5), devdio.pro
  (a38bee44-f71a-42dd-a390-5fb4c7c8a57c), livedio.app
  (9bb74d72-a831-432f-862f-cbb92d93f155), repdio.app
  (16cd86f5-0811-4262-81bb-8b39fde12410). Replay and heatmaps are on for
  macdio.app only.
- Dashboard (Kontrol Paneli, 2026-10-14): "Devdio overview", the admin
  user's own board (type dashboard, id = the user id, written through
  POST /api/dashboard); its components name their website with entityType
  and entityId.
- Event "App Store click" (W34) with properties position (top, bottom, nav,
  faq, footer, content) and kind (button, text link) on macdio.app and
  livedio.app. Goals of that event: macdio 6a7320f2, livedio cd2e4ac0
  (POST /api/websites/<id>/goals, parameters {type: event, value}).
- Boards (2026-10-13): Macdio ac7f274b, Livedio 26217f9e, Repdio 666fb7ef,
  owned by admin. Board JSON is `parameters.rows[].columns[].component` with
  `type` (WebsiteMetricsBar, WebsiteChart, RealtimeActiveUsers, MetricsTable,
  WorldMap, WeeklyTraffic, UTM, ...) and `props`; `columns[].size` is the
  flex share.
- The client IP comes from `cf-connecting-ip` (first in Umami's header list), so
  sessions are per visitor, not per tunnel.
- Location: country, region and city from the GeoLite database (see
  `SKIP_LOCATION_HEADERS` above), since W30. A session keeps the location it
  was created with: a visitor seen before the switch stays country-only until
  the monthly salt rotates.
- Headless browsers are dropped as bots (`/api/send` answers 200 with no
  record). Test with a normal user agent.
- Session replay and heatmaps are on since W30 (2026-10-13, Sait chose no
  consent banner after being told replay is widely held to need consent in
  the EU). Settings live in the database, table `website`: `recorder_enabled`
  and `replay_config` (replayEnabled, heatmapEnabled, sampleRate 0.15,
  heatmapSampleRate 0.15, maskLevel moderate = every input masked,
  maxDuration 300000 ms). The site loads `recorder.js` next to `script.js`; it
  records only after the tracker has a session, so never outside macdio.app.
  The privacy and transparency pages describe all of it in 14 languages; any
  change to these settings needs those pages changed too.

## Known log lines

- `umami`: `"next start" does not work with "output: standalone"`. Umami's
  `next.config.ts` sets standalone output for its Docker image, while its own
  README starts a source install with `pnpm run start` (`next start`), which is
  what runs here. It serves normally.
- `cloudflared-umami`: one `No ingress rules were defined` warning at every
  start. The tunnel is remotely managed, so it starts with an empty local
  config; `Updated to new configuration` with the stats.devdio.pro rule follows
  within a second.

## Maintenance

- Update Umami: run `update` inside the CT (the community-scripts helper). It
  stops the service, rebuilds as root and starts it; the drop-in fixes
  ownership. Take a Proxmox backup of CT 105 first: a GitHub report says some
  self-hosted installs failed after the 3.3.0 upgrade.
- Admin password: change it in the dashboard (Settings, Profile).
