import React, { useEffect } from "react";
import JsonInput from "./components/JsonInput";

function App() {
  useEffect(() => {
    document.title = "21BCE2807";
  }, []);

  return (
    <div className="App">
      <h1>Frontend Application</h1>
      <JsonInput />
    </div>
  );
}

export default App;
