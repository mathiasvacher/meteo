import { useState } from "react";
import "./scss/style.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Météo - Mathias Vacher</h1>
      <div className="card col-5">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
