import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BanForm from "./BanForm";
import TimeoutForm from "./TimeoutForm";
export default function PenaltyForm() {
  return (
    <>
      <div className="flex flex-row space-x-2">
        <BanForm />
       <TimeoutForm />
      </div>
    </>
  );
}
