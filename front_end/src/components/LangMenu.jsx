import React from "react";
import UKicon from "../assets/ukicon.png";
import FRicon from "../assets/fr.svg";
import MRicon from "../assets/maroc.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStateContext } from "../context/ContextProvider";
export default function LangMenu() {
  const { Lang, setLang, saveLangHandler } = useStateContext();
  const items = [
    {
      value: "ENG",
      label: "English",
      icon: <img className="mr-2 size-8" src={UKicon} alt="eng" />,
    },
    {
      value: "FR",
      label: "French",
      icon: <img className="mr-2 size-8" src={FRicon} alt="eng" />,
    },
    {
      value: "AR",
      label: "Arabic",
      icon: <img className="mr-2 size-8" src={MRicon} alt="eng" />,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center w-16">
        {Lang === "ENG" && (
          <img className="mr-2 size-8" src={UKicon} alt="eng" />
        )}
        {Lang === "FR" && (
          <img className="mr-2 size-8" src={FRicon} alt="eng" />
        )}
        {Lang === "AR" && (
          <img className="mr-2 size-8" src={MRicon} alt="eng" />
        )}
        {Lang}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <RadioGroup>
            {items.map((item) => (
              <div key={item.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  checked={Lang === item.value}
                  onClick={() => saveLangHandler(item.value)}
                  value={item.value}
                  id={item.value}
                />
                <Label className="flex items-center" htmlFor={item.value}>
                  {item.icon}
                  {item.label}
                </Label>
              </div>
            ))}
            {/* <div className="flex items-center space-x-2">
              <RadioGroupItem  value="option-one" id="option-one" />
              <Label className="flex items-center" htmlFor="option-one">
                <img className="mr-2 size-8" src={UKicon} alt="eng" />
                ENG
              </Label>
            </div> */}
            {/*  <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label className="flex items-center" htmlFor="option-two">
                <img className="mr-2 size-8" src={FRicon} alt="eng" />
                FR
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-three" id="option-three" />
              <Label className="flex items-center" htmlFor="option-three">
                <img className="mr-2 size-8" src={MRicon} alt="eng" />
                AR
              </Label>
            </div> */}
          </RadioGroup>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
