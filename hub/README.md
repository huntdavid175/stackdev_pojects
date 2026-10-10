# Preview hub

One server for every client mockup in this folder.

- `http://localhost:5174/` is the project directory. It's locked with an access code (default `1967`), checked on the server.
- `http://localhost:5174/<project-folder>/` is that project. It's public, so a prospect can open the link you send without the code.

## Use

```bash
npm run build                 # build every project (or: npm run build -- hair-by-gyeiwaa)
npm start                     # start the hub on port 5174
```

New project? Create its folder next to `hub/`, set `base: '/<folder-name>/'` in its `vite.config.ts`,
and load images through `img()` from `src/asset.ts`. The hub lists any folder with a built `dist/`.

## Settings (environment variables)

| Variable | Default | Purpose |
|---|---|---|
| `HUB_CODE` | `1967` | Access code for the directory |
| `PORT` | `5174` | Port to listen on |
| `HUB_SECRET` | random per start | Set it to keep people unlocked across restarts |
| `HUB_TRUST_PROXY` | off | Set to `1` when hosted behind a proxy that sends `X-Forwarded-For` |

Five wrong codes lock that visitor out for five minutes. A correct code unlocks the directory for seven days.
