# Scoped Dependencies Example

This repository demonstrates that remote apps with the same scoped dependencies do not share the same instance of the dependency.

## Project Structure

The repository contains an app shell and 3 apps running inside the app shell:

- `shell`
- `app-1` (React 18.3.0, @mui/material 6.1.0, share scope: "react@18.3.0")
- `app-2` (React 18.3.0, @mui/material 6.4.7, share scope: "react@18.3.0")
- `app-3` (React 18.3.1, @mui/material 6.4.7, share scope: "react@18.3.1")

## how to run

- ensure node and npm is installed
- run npm start in the root folder. this will build an run all the apps
- open the app shell at http://localhost:5173/

## Shared Dependency Configuration

There are two different share scopes, "react@18.3.0", "react@18.3.1", and shared dependencies "react", "react-dom",
and "@mui/material".

```
| App   | Dependency      | Singleton | Required Version | Share Scope    |
|-------|-----------------|-----------|------------------|----------------|
| app-1 | react           | true      | 18.3.0           | react@18.3.0   |
|       | react-dom       | true      | 18.3.0           |                |
|       | @mui/material   | true      | 6.1.0            |                |
| app-2 | react           | true      | 18.3.0           | react@18.3.0   |
|       | react-dom       | true      | 18.3.0           |                |
|       | @mui/material   | true      | 6.4.7            |                |
| app-3 | react           | true      | 18.3.1           | react@18.3.1   |
|       | react-dom       | true      | 18.3.1           |                |
|       | @mui/material   | true      | 6.1.0            |                |
```

## Expectations: 

```
  - scope react@18.3.0
    - app 1 
    - app 2
      - react 18.3.0
      - @mui/material 6.4.7
  - scope react@18.3.1
    - app 3
      - react 18.3.1
      - @mui/material 6.1.0
```

1) react and react-dom dependencies are shared between app-1 and app-2 (same share scope, singleton: true, same version)
2) react versions are not shared between share scopes, even though react and react-dom dependencies are defined as singletons
3) @mui/material dependency is shared between app-1 and app-2 (same share scope, singleton: true, highest version will be used)
4) app-3 uses @mui/material 6.1.0 and should not be upgraded to @mui/material 6.4.7 (because app-3 has its own share scope)


These expectations are met with the rspack configuration. A runnable version of the rspack configuration is in branch `rspack`. 
Ths rspack configuration is also included in the main branch for reference. 
