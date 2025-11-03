import { Button, Stack } from "@mui/material";
import { lazy, Suspense } from "react";

// Load the SimpleButton component from app-1 as a remote module
const SimpleButton = lazy(() => import("app1/SimpleButton"));

function App() {
  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <h1>App 3</h1>
      <Button variant="contained">MUI Button from App 3</Button>

      <div>
        <h2>Remote Button from App 1:</h2>
        <Suspense fallback={<div>Loading button from App 1...</div>}>
          <SimpleButton />
        </Suspense>
      </div>
    </Stack>
  );
}

export default App;
