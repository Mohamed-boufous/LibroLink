import "../styles/App.css";
import { useStateContext } from "../context/ContextProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "./Header";

function App() {
  console.log("wahyaaaaaa");
  return (
    <Header />
  );
}

export default App;
