import React from "react";

function ColoredButton({ color, handleClick }) {
  return (
    <div>
      <button
        style={{ background: `${color}` }}
        className={`rounded-full w-fit block p-3 mt-4 cursor-pointer mx-auto`}
        onClick={handleClick}
      ></button>
    </div>
  );
}

export default ColoredButton;
