// Browser stub for Node built-ins (`fs`, `fs/promises`, `path`) that kokoro-js
// imports at module scope but only ever calls on the Node code path. In the
// browser we use the wasm/web runtime, so these are never reached — this empty
// module keeps the client bundle resolvable under both Turbopack and webpack.
//
// A Proxy answers any property access with `undefined`, so a stray reference
// won't throw at import time (only if actually invoked, which never happens in
// the browser path).
const stub = new Proxy(
  {},
  {
    get: () => undefined,
  }
);

module.exports = stub;
module.exports.default = stub;
