import React from "react";

function Button({ text }) {
  return (
    <button
      style={{
        backgroundColor: "transparent",
        border: "1px solid #ccc", // Add a border for visibility
        borderRadius: "5px",
        padding: "5px 10px", // Adjusted padding
        margin: "0 10px 10px 0", // Left and bottom margins
        textAlign: "center",
        color : "white",
      }}
    >
      {text}
    </button>
  );
}

export default Button;
