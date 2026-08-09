// Serve directory requests as index.html while keeping exact .html paths untouched.
// Runs only when no asset matches the request path (Cloudflare invokes the worker on asset miss).
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname.endsWith("/")) {
      const rewritten = new URL(url);
      rewritten.pathname = url.pathname + "index.html";
      return env.ASSETS.fetch(new Request(rewritten, request));
    }
    return env.ASSETS.fetch(request);
  }
};
