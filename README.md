# Debendu Dutta: Personal Blog

A static personal website: creative design, animations, a blog, PDF library and photo gallery.
No build tools needed. It works directly on GitHub Pages.

## Files

```
index.html     page structure
style.css      design and animations
script.js      interactivity (don't need to touch)
data.js        YOUR CONTENT: edit this file
images/        photos and artwork
pdfs/          your PDF files (create this folder)
```

## Publish on GitHub Pages

1. Sign in at https://github.com and click **New repository**.
2. Name it **`your-username.github.io`** (replace with your exact GitHub username) to get the address `https://your-username.github.io`. Any other name also works; the site will then live at `https://your-username.github.io/repo-name/`.
3. Set it to **Public** and click **Create repository**.
4. Click **uploading an existing file**, then drag in `index.html`, `style.css`, `script.js`, `data.js`, `.nojekyll` and the whole `images` folder. Click **Commit changes**.
5. Open **Settings → Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
6. Wait 1 to 2 minutes and refresh. Your site is live.

## Adding content

All edits are made in `data.js` (open it on GitHub and click the pencil icon):

- **New thought/post:** copy a block inside `POSTS`, change the `id`, title, date and text.
- **PDF:** upload it to a `pdfs` folder (Add file → Upload files), then add a line in `DOCS`.
- **Photo:** upload to `images/`, then add a line in `GALLERY`. For your profile picture upload e.g. `images/me.jpg` and set `avatar: "images/me.jpg"` in `SITE`.
- **Education years, email, social links:** edit `JOURNEY` and `SITE`.

Tips: use small images (under 1 MB) so the site loads fast, and avoid spaces in file names (use `my-photo.jpg`).

## Preview on your computer

Double-click `index.html`, or run `python -m http.server` in the folder and open http://localhost:8000.
