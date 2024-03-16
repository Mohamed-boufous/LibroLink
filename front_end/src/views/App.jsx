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
import Header from "../components/Header";
import { axiosClient } from "../api/axios";

function App() {
  /* const test = () => {
    axiosClient.post("/api/get_current_user").then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    })
  };
  test(); */
  console.log("wahyaaaaaa");
  return <>hi</>;
}

export default App;
