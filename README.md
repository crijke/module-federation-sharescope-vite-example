# Scoped Dependencies Example

This repository demonstrates that remote apps with shared dependencies react and react-dom crash in Safari.

## Project Structure

The repository contains an app shell and three apps running inside the app shell:

- `shell`
- `app-1` (React 18.3.0, @mui/material 6.1.0, share scope: "react@18.3.0")
- `app-2` (React 18.3.0, @mui/material 6.4.7, share scope: "react@18.3.0")
- `app-3` (React 18.3.1, @mui/material 6.4.7, share scope: "react@18.3.1")

## How to Run

1. Ensure Node.js and npm are installed.
2. Run `npm start` in the root folder. This will build and run all the apps.
3. Open the app shell at [http://localhost:5173/](http://localhost:5173/).

## Expectations

- The `react` and `react-dom` dependencies are shared. In the rspack branch, the apps start normally in all browser.

## Vite Plugin issues:

with the vite plugin

- The app crashes in Safari due to uninitialized React dependencies:

- Unhandled Promise Rejection: TypeError: undefined is not an object (evaluating 'f$1.\_\_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED')
- ReferenceError: Cannot access 'default' before initialization.
  (anonymous function) — virtualExposes-Di8U-Ssu.js:8
