import { Button, Stack } from "@mui/material";
import { Suspense, useState } from "react";
import { loadFederationComponent } from "@lexware/load-federation-component";

// Import the SharedButton from app-1 as a remote module
const SharedButton = loadFederationComponent({
  loader: () => import("app1/SharedButton"),
});

function App() {
  const [clickCount, setClickCount] = useState(0);

  const handleSharedButtonClick = () => {
    setClickCount((prev) => prev + 1);
    console.log("Shared button clicked from app-3!");
  };

  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <h1>App 3</h1>
      <Button variant="contained" color="secondary">
        MUI Button from App 3
      </Button>

      <div>
        <h3>Remote Button from App-1:</h3>
        <Suspense fallback={<div>Loading shared button...</div>}>
          <SharedButton onClick={handleSharedButtonClick}>
            Clicked {clickCount} times
          </SharedButton>
        </Suspense>
      </div>
    </Stack>
  );
}

export default App;
