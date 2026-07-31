# For Sakshi — Girlfriend's Day site

A no-scroll, tap-to-continue cinematic site. Everything you need to
personalize lives in **config.js** — you shouldn't need to touch the
other files.

## 1. Add your photos
Drop your images into `assets/images/` using these exact filenames
(or edit the paths in `config.js` if you'd rather name them yourself):

| Filename | Used for |
|---|---|
| `hero-you.jpg` | solo photo of you (left side, hero scene) |
| `hero-her.jpg` | solo photo of her (right side, hero scene) |
| `hero-merged.jpg` | a photo of you two together (revealed after the merge animation) |
| `polaroid-1.jpg`, `polaroid-2.jpg`, `polaroid-3.jpg` | the 3 polaroid memories |
| `then.jpg` / `now.jpg` | then-vs-now comparison |
| `collage-1.jpg` … `collage-4.jpg` | the 4-photo masonry collage |

Until you add a real file, each slot shows a soft placeholder
labeled with the filename to replace, so nothing looks broken.

Recommended: portrait-ish photos (roughly 4:5) for hero/polaroids/then-now,
any orientation works for the collage. Compress large photos (under ~500KB
each) so the site loads fast on her phone.

## 2. Add music
Drop an mp3 at `assets/music/song.mp3`. The glass player top-right
lets her play/pause and adjust volume; it keeps playing across every scene.

## 3. Connect the questions form to your email
You already have a Formspree account — open your form, copy its
endpoint URL (looks like `https://formspree.io/f/xxxxxxxx`), and paste
it into `config.js`:

```js
formspreeEndpoint: "https://formspree.io/f/xxxxxxxx",
```

Her answers (smile reaction, favorite memory, what she wants to do
together, and her message to you) will land in your inbox.

## 4. Edit any of the text
Everything — the letter, captions, the hidden double-click message,
the long-press message, the ending lines — is in `config.js`.

## 5. Host it (GitHub Pages)
1. Create a new GitHub repo, upload this whole folder.
2. Repo Settings → Pages → set source to the `main` branch, root folder.
3. GitHub gives you a link like `https://yourusername.github.io/reponame/`
   — open it, or send it to her.

## Notes
- No build step, no dependencies — just open `index.html` in a browser
  to preview locally, or use a local server (e.g. `python3 -m http.server`)
  since some browsers restrict local file access for the music player.
- Tap/click anywhere to advance. Arrow keys / spacebar also work.
- Long-press a photo for a small surprise. Double-tap the final heart
  for a hidden message.
