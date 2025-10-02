
# Sequence Puzzle

A small interactive sequence puzzle web app. The puzzle presents sequences (numbers, shapes, or symbols) and asks the player to choose the next item in the sequence. This repository contains the HTML/CSS/JS and assets needed to run the puzzle locally in a browser.

## What this is

- Objective: look at the sequence shown on the page and pick the correct next item to complete the sequence.
- Interaction: click/tap on one of the answer options. The game will indicate whether the choice is correct and advance or show feedback.

Note: assumptions were made about exact gameplay and behavior because the project contains only static files (`sequence puzzle.html`, `assets/`, `script.js`, `style.css`) and no separate documentation. If you'd like the README updated with exact rules, screenshots, or challenge examples, point me to the desired details or open the `.docx` file.

## Files in this folder

- `sequence puzzle.html` — the main HTML page to open in your browser.
- `assets/` — image and static assets used by the page (icons, styles, scripts). Contains:
	- `click.svg` — an icon used for click feedback
	- `script.js` — JavaScript that implements the game logic and interactivity
	- `style.css` — stylesheet for layout and visuals
	- `bootstrap/` — local copy of Bootstrap CSS/JS used for layout and responsive behaviour
	- `jquery/` — local copy of jQuery used by the scripts
- `Sequence puzzle.docx` — author notes or original puzzle document (may contain puzzle text or screenshots).

## How to run

The app is static and does not require a server, but some browsers restrict local file requests for JS or assets when opened via `file://`. Recommended options:

1) Open directly

	 - Double-click `sequence puzzle.html` or open it with your browser. This should work in most cases.

2) Serve with a simple local HTTP server (recommended)

	 - If you have Python installed, from the project folder run (PowerShell):

		 ```powershell
		 python -m http.server 8000
		 ```

		 Then open http://localhost:8000/ in your browser and navigate to `sequence%20puzzle/sequence%20puzzle.html` or simply click the file link.

	 - If you use VS Code, you can also use the Live Server extension to serve the folder and open the page.

## Development notes

- The primary interactive logic lives in `assets/script.js`. Editing that file will change puzzle behavior.
- Styles are in `assets/style.css` and Bootstrap is available under `assets/bootstrap/`.
- jQuery is available locally at `assets/jquery/jquery.js`.

Suggested small improvements (I can implement any of these on request):
- Add a `package.json` and a very small dev server script to standardize running the project.
- Add a test page or screenshot images to this README for quick preview.
- Extract puzzle data to a JSON file so new puzzles can be added without editing JS.

## Troubleshooting

- If images or icons don't appear, make sure your browser isn't blocking local file requests. Serve via HTTP if necessary.
- If interactions don't work, open the browser developer console (F12) and look for errors coming from `assets/script.js` or missing file 404s.

## License & Credits

This repository contains static puzzle files. No license file is provided here — if you want an open-source license added (MIT, CC-BY, etc.), tell me which one and I will add it.

Assets: Bootstrap and jQuery are included locally; please ensure you comply with their licenses when distributing.

---

If you'd like, I can also:
- add screenshots to this README,
- create a tiny `package.json` and `npm` scripts that run a local server,
- or extract puzzles into a JSON-driven format so non-developers can add new puzzles.
