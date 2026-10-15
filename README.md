# Image Compressor

A free, static image compressor that runs entirely in the browser. Drop in images (or a `.zip` of them) and they're resized and re-encoded on-device — nothing is uploaded, nothing touches a server.

Live at **https://compress-image.github.io/**

Downloads keep the **original filename** with a `-compress` tag added (e.g. `vacation.jpg` → `vacation-compress.jpg`).

## Features

- Drag-and-drop anywhere on the page, click to choose, or paste with Ctrl+V
- `.zip` archives are unpacked and compressed; folder structure is kept in "Download all"
- Input: JPG, PNG, WEBP, AVIF, GIF, BMP (HEIC where the browser can decode it)
- Output format: same as original, WebP, JPEG, PNG (and AVIF where the browser can encode it)
- **Real PNG compression**: palette quantization to ≤256 colors with dithering (like TinyPNG / pngquant), transparency kept; images with few colors are packed losslessly
- **Resize** to a max width/height (4K, Full HD, HD, …)
- **Target file size**: finds the best quality that fits (and shrinks dimensions if needed)
- Never makes a file bigger: if the original is already smaller in the same format, it's kept
- EXIF/GPS metadata stripped, photo orientation preserved
- Before/after comparison slider, per-file and total savings
- Background processing: a queue with limited concurrency, PNG quantization in a Web Worker
- Works offline and installs as an app (PWA, service worker)
- English and Russian UI, light/dark theme — settings are remembered
- No third-party requests at all: fonts and JSZip are self-hosted, and a Content-Security-Policy blocks any network upload
- Zero build step — plain HTML/CSS/JS

## Run it locally

Open `index.html` in a browser, or serve the folder (`npx serve .`) to also get the offline service worker.

## Files

- `index.html` — the whole app
- `sw.js`, `manifest.webmanifest`, `icons/` — offline/PWA support (bump `VERSION` in `sw.js` when cached files change)
- `vendor/jszip.min.js` — JSZip 3.10.1 (MIT), loaded only for zips
- `fonts/` — Space Grotesk and IBM Plex Mono (SIL Open Font License)

## License

MIT — see [LICENSE](LICENSE).
