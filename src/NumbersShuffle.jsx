import { useState, useEffect } from "react";
const rowsize = 3;
const options = rowsize * rowsize;
export default function NumbersPuzzle() {
  const [numbersArray, setNumbersArray] = useState([
    ...Array.from({ length: options - 1 }, (_, i) => i + 1),
    0,
  ]);
  const [solution, setSolution] = useState([]);

  function shuffle(n = 2 * options) {
    setNumbersArray((prevState) => {
      const newArray = prevState.slice();
      let solutionsAux = [];
      let prevSolution = null;
      while (n) {
        const randomIndex = Math.round(Math.random() * options) % options;
        if (
          isClickable(randomIndex, newArray) &&
          newArray[randomIndex] !== prevSolution
        ) {
          const idx0 = newArray.indexOf(0);
          solutionsAux = [newArray[randomIndex], ...solutionsAux];
          prevSolution = newArray[randomIndex];
          swap(idx0, randomIndex, newArray);
          n--;
        }
      }
      setSolution(solutionsAux);
      return newArray;
    });
  }
  function swap(a, b, arr) {
    const aux = arr[a];
    arr[a] = arr[b];
    arr[b] = aux;
  }
  function isArraySorted(arr) {
    return (
      arr.find(
        (x, i) => (x !== 0 && x !== i + 1) || (x === 0 && i !== arr.length - 1)
      ) === undefined
    );
  }
  function clickHandler(x, y) {
    const index = x * rowsize + y;
    if (isClickable(index)) {
      setNumbersArray((prevArrar) => {
        const aux = prevArrar.slice();
        const idx0 = aux.indexOf(0);
        swap(index, idx0, aux);
        return aux;
      });
    }
  }
  function isAdjacent(x0, y0, x1, y1) {
    return (
      (x0 === x1 && Math.abs(y0 - y1) === 1) ||
      (y0 === y1 && Math.abs(x0 - x1) === 1)
    );
  }
  function isClickable(i, arr = numbersArray) {
    const x = Math.floor(i / rowsize);
    const y = i % rowsize;
    const index0 = arr.indexOf(0);
    const x0 = Math.floor(index0 / rowsize);
    const y0 = index0 % rowsize;

    return isAdjacent(x0, y0, x, y);
  }
  useEffect(() => {
    shuffle();
  }, []);
  return (
    <>
      {solution.join(",")}
      <div
        className="container"
        style={{ height: rowsize * 100, width: rowsize * 100 }}
      >
        {numbersArray.map((a, i) => (
          <div
            key={a}
            onClick={() => clickHandler(Math.floor(i / rowsize), i % rowsize)}
            className={`box ${a ? "green" : "white"} ${
              isClickable(i) ? "clickable" : null
            }`}
          >
            {a ? a : null}
          </div>
        ))}
      </div>
      <p>{isArraySorted(numbersArray) ? "Done 😎" : "..."}</p>
    </>
  );
}
