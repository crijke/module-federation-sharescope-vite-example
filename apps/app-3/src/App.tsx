import { Button, Stack } from "@mui/material";
import { createRemoteComponent } from "@module-federation/bridge-react";

// Load the SimpleButton component from app-1 as a remote module using bridge
const SimpleButton = createRemoteComponent({
  loader: () => import("app1/SimpleButton"),
  loading: <div>Loading button from App 1...</div>,
  fallback: () => <div>Error loading button from App 1</div>,
});

function App() {
  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <h1>App 3</h1>
      <Button variant="contained">MUI Button from App 3</Button>

      <div>
        <h2>Remote Button from App 1:</h2>
        {/* @ts-expect-error - bridge-react type inference issue */}
        <SimpleButton />
      </div>
    </Stack>
  );
}

export default App;
