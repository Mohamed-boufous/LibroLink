import React from "react";

export default function IFrameReading() {
  return (
    <div className="flex justify-center w-full h-full">
      <iframe
        src={"/reading"}
        title="Loaded Component"
        width="900px"
        height="660px"
        style={{ border: "1px solid #ddd" }}
      />
    </div>
  );
}
