import { useState } from "react";
import DarkContext from "./darkContext";
import darkimg from './dark.jpg';
import lightimg from './light.jpg';

const DarkState = (props) => {
    // setting up dark-mode
  const [mode, setMode] = useState("light");

  const [img, setImg] = useState(darkimg)

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17 24 39)";
      setImg(lightimg);
    }
    else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      setImg(darkimg);
    }
  }

  return (
    <DarkContext.Provider value={{ mode, img, toggleMode }}>
      {props.children}
    </DarkContext.Provider>
  )
}

export default DarkState;
