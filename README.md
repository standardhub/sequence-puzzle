# Sequence Puzzle Game

This repository contains a small browser-based 8-puzzle (sequence puzzle) game. The goal is to move the numbered tiles so that they are ordered in ascending sequence (1 → 8) with a single empty space. Players move one tile at a time into the blank space. If the number of steps exceeds 100 the game ends as "Game Over".

## Quick overview

- Game type: 3x3 sliding puzzle (8-puzzle)
- UI: static HTML + CSS using Bootstrap grid and Bootstrap 5 buttons (assets and HTML included in this repo)
- Play rules: move one tile into the empty slot per step; initial steps = 0; win when tiles are in ascending order; lose if steps > 100

## Files of interest

- `sequence puzzle.html` — main HTML file to open in the browser
- `style.css` — styles for the game (in `assets/`)
- `script.js` — game logic and interactions (in `assets/`)
- `assets/` — images, icons, bootstrap and jquery directories used by the page

Open `sequence puzzle.html` in a browser to run the game locally. No build step required (static site).

## How to run (local)

1. Open the project folder in your file manager or editor.
2. Double-click `sequence puzzle.html` or open it in your browser (Chrome, Edge, Firefox).

Optional: serve with a simple static server for consistent behavior (recommended when testing fetch or service-worker code):

```powershell
# from the repository root (Windows PowerShell)
python -m http.server 8000
# then open http://localhost:8000/sequence%20puzzle/sequence%20puzzle.html
```

## How to play

- When the page opens, the puzzle is displayed and the step counter is zero.
- Click (or use keyboard arrows if implemented) a tile adjacent to the blank to move it into the blank space.
- The game finishes when the tiles are ordered (1..8). A congratulations dialog should appear on win.
- If steps exceed 100, the game ends and shows "Game Over".

Controls:
- Mouse: click a movable tile to slide it into the blank.
- Keyboard (if enabled): use arrow keys to move the blank (or tiles) where supported.

## Requirements mapping (from assignment)

- Use Bootstrap Grid for layout — UI includes Bootstrap grid structure in `sequence puzzle.html` (check the HTML for `.container`, `.row`, `.col-` elements).
- Use Bootstrap 5 buttons — action buttons in the UI should use Bootstrap 5 classes (`btn`, `btn-primary`, etc.).
- Deadline: 2 days — see the Version / Roadmap below for priorities.

Bonus items (recommended/optional):
- Mobile responsive — layout is designed to be responsive via Bootstrap's grid; verify on small screens and tweak breakpoints in `style.css` if desired.
- Animations — small CSS transitions improve tile movement feel; check `style.css` for transition rules.
- Use Classes during development — the JavaScript can be refactored to a class-based implementation for clarity and reuse.
- Random arrangement logic on start — ensure the board is randomized to a solvable state when a new game starts.

## Version 1.1 (Required enhancements)

- Add timer in the top-left corner (stopwatch counting seconds since start).
- When the game finishes (win or game over), save the top score (lowest steps and its time) to `localStorage`. Only update stored score/time when the current run is better than the saved top score.
- Add keyboard events and mouse events for controlling tiles (both recommended).

Acceptance criteria for v1.1:
- Timer visible and accurate.
- On win, `localStorage` contains an object such as `{ steps: 42, time: 120 }` representing the top (best) score.
- Keyboard and mouse controls work reliably.

## Version 2.0 (AI assistant)

Goal: add a simple AI assistant that searches moves using Manhattan distance as a heuristic.

Specification highlights:
- A fish icon in the bottom-right starts the AI assistant.
- When clicked, lock the UI and show a waiting spinner while the AI performs a search up to depth = 10.
- The search expands game states in a tree and scores them by Manhattan distance. After searching, the UI will animate the best path up to 10 moves, applying them step-by-step.

Notes:
- This is intentionally simple and limited (depth 10) to keep the calculation tractable in the browser.
- Use web-worker if you expect the search to block the UI; otherwise show a loading overlay while running the search on the main thread.

## Implementation notes / tips for contributors

- Ensure the start-shuffle algorithm only creates solvable permutations (8-puzzle solvability rule).
- Prefer a class-based `Game` or `Puzzle` implementation that exposes methods like `shuffle()`, `move(tileIndex)`, `isSolved()`, `getState()` and `loadState()`.
- Keep DOM manipulation minimal: use a render function that updates the board from the game state.
- Store only the best score in `localStorage` under a single key, e.g. `sequence-puzzle:topScore`.

Example `localStorage` shape:

```json
{
	"steps": 32,
	"time": 95
}
```

## Testing checklist

- Open the page and verify the initial step counter is zero.
- Start a new game; ensure the board shuffles into a solvable layout.
- Move tiles by mouse and (if implemented) keyboard — the step counter increments once per move.
- Let steps exceed 100 and confirm the game shows "Game Over".
- Win a game and verify the congratulation dialog appears and top score saves to `localStorage`.

## Next steps / roadmap

1. Implement v1.1 features (timer, top-score localStorage, keyboard controls).
2. Polish UI and responsiveness, add subtle CSS tile animations.
3. Implement v2.0 AI assistant with a depth-limited search and optional web worker.

## License & contact

This project is provided as-is for learning and demonstration purposes. For questions or to contribute, open an issue or contact the author via the repository.

