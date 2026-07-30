# Image Compressor

A free, static image compressor that runs entirely in the browser. Drop in an image (or a `.zip` of them) and it's resized and re-encoded on-device — nothing is uploaded, nothing touches a server.

Live at **https://ave-roma.github.io/**

Compared to most compressor tools, downloads keep the **original filename** with a `-compress` tag added (e.g. `vacation.jpg` → `vacation-compress.jpg`).

## Features

- Drag-and-drop or click-to-choose, multiple files at once
- Also accepts a `.zip` of images — extracts and compresses everything inside
- JPG, PNG, WEBP, GIF, and BMP support (GIF/BMP are auto-converted to JPG, since browsers can't re-encode to those formats)
- Quality presets (Low / Medium / High / Best) plus a fine-grained slider
- Optional PNG → JPEG conversion for much smaller files (drops transparency)
- Per-file size comparison and percent saved, with a visual before/after bar
- 20 MB per-file limit; images wider than 8000px are automatically downscaled to keep the browser responsive
- "Download all" zips everything into one file
- Light/dark theme toggle (follows your system setting by default)
- Zero build step — one HTML file; the ZIP library only loads if you actually use a zip

## Run it locally

Just open `index.html` in a browser. No server, no install, no build.

## License

MIT — see [LICENSE](LICENSE).
