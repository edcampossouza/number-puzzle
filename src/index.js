import ReactDOM from "react-dom/client";
import NumbersShuffle from "./NumbersShuffle";

const root = ReactDOM.createRoot(document.querySelector(".root"));
root.render(<NumbersShuffle rowLength={3} />);
