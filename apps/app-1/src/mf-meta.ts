import ReactDOM from "react-dom";

// Metadata for dynamic loader discovery
export const meta = {
  name: "app1",
  reactVersion: ReactDOM.version,
  // Could contain other shared libs in future
  shared: {
    react: ReactDOM.version,
    "react-dom": ReactDOM.version,
  },
};

export default meta;
