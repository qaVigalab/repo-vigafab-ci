import React, { useState } from "react";
import Fullscreen from "fullscreen-react";
import Empaque from "./Empaque";
 
function FullSceen() {
  const [isEnter, setIsEnter] = useState(false);
 
  return (
    <div>
      <button
        onClick={() => {
          setIsEnter(true);
        }}
      >
        Go Fullscreen
      </button>
 
      <Fullscreen isEnter={isEnter} onChange={setIsEnter}>
        <div className="full-screenable-node">
          <Empaque/>
        </div>
      </Fullscreen>
    </div>
  );
}
 
export default FullSceen;