import { useState } from "react";
import NumbersPuzzle from "./NumbersPuzzle";

function WelcomeComponent({ chooseOption, options }) {
  return (
    <>
      <p className="title">Choose the row length</p>
      <ul className="options-list">
        {options.map((op) => (
          <li className="option" onClick={() => chooseOption(op)}>
            {op}
          </li>
        ))}
      </ul>
    </>
  );
}
export default function App() {
  const options = [2, 3, 4];
  const [rowLength, setRowLength] = useState(null);
  return (
    <div class="main">
      {rowLength ? (
        <NumbersPuzzle rowLength={rowLength} />
      ) : (
        <WelcomeComponent chooseOption={setRowLength} options={options} />
      )}
    </div>
  );
}
