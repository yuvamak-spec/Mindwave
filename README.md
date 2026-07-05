# Mindwave — deploy in 5 minutes (GitHub Pages)

You already have a GitHub account (yuvamak-spec), so this is the whole process:

1. Go to github.com → **New repository** → name it `mindwave` → Public → Create.
2. On the empty repo page, click **uploading an existing file** → drag in all 7 files from this folder (index.html, manifest.json, sw.js, README.md, and the 3 icons) → Commit.
3. Repo **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
4. Wait ~1 minute. Your app is live at: `https://yuvamak-spec.github.io/mindwave/`

## Install on your Galaxy

1. Open that URL in **Chrome** on your phone.
2. Chrome menu (⋮) → **Add to Home screen** → **Install**. Because the manifest + service worker are valid, it installs as a real app — its own icon, fullscreen, no browser bar.
3. Open it once while online. From then on it works **fully offline** — soundscapes are synthesised, data is in localStorage, and the service worker serves the app shell from cache.

## Updating later

Edit index.html in the GitHub web editor → commit. The service worker fetches updates in the background; the new version appears on the second launch after a change. If an update ever seems stuck, bump `CACHE = 'mindwave-v2'` to `v3` in sw.js.

## Notes

- **AI weekly insight** (Progress tab) is optional and off by default. It needs your own Anthropic API key (console.anthropic.com), stored only on the device, and only works online. Everything else is fully offline.
- **Binaural scapes** (Sitar/Yaman at 6 Hz theta, Veena/Bhairavi at 9 Hz low-alpha) need headphones to work as binaural — through the phone speaker they're still pleasant drones, just not binaural.
- Wake Lock keeps the screen on during sessions so audio and the orb never cut out mid-breath.
