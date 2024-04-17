import React, { useEffect, useState } from "react"; // Importez le hook useState
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { X } from "lucide-react"
import { axiosClient } from "@/api/axios";
import { useStateContext } from "@/context/ContextProvider";
const Drop = ({book}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [libraryName, setLibraryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {currentUser} = useStateContext();
  const [bibiols, setbiblios] = useState([]);
  const [load, setLoad] = useState(false);
  const handleSheetToggle = () => {
    setIsSheetOpen(!isSheetOpen);
    // Réinitialiser le message d'erreur lors de l'ouverture de la feuille
    setErrorMessage('');
  };
  const handleInputChange = (event) => {
    // Mettre à jour le state du nom de la bibliothèque à chaque changement
    setLibraryName(event.target.value);
  };
  const handleFormSubmit = () => {
    // Vérifier si le champ est vide
    if (libraryName.trim() === '') {
      // Afficher un message d'erreur si le champ est vide
      setErrorMessage('Le champ ne peut pas être vide');
    } else {
     axiosClient.post("api/createBiblio",{
      biblio_name: libraryName,
      user_id: currentUser.id
     }).then((response) => {
      console.log(response.data);
      setLoad(!load);
      setIsSheetOpen(false);
     }).catch((error) => {
      console.log(error);
     })
    }
  };
  useEffect(() => {
    axiosClient.post("api/get_current_user").then((response) => {
      const user = response.data;
      axiosClient.get(`api/user/${user.id}/biblioName`).then((response) => {
        const biblios = response.data.biblioNames
        console.log(Object.entries(biblios));
        setbiblios(Object.entries(biblios));
      })
  })}, [load]);

  const addTolibrary = (biblio_id) => {
    axiosClient.post(`/api/add_book_to_biblio`, {
      biblio_id: biblio_id,
      book_id: book.id,
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const addToDefaultLibrary=() => {
    axiosClient.post("api/add_book_to_default_biblio", {
      biblio_name: "a lire",
      book_id: book.id,
      user_id: currentUser.id,
    }).then((response) => {
      console.log("Liked");
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <>
      <style jsx>{`
        /* Ajoutez vos styles ici en utilisant les classes que nous avons définies */
        .custom-sheet {
          /* Styles pour la feuille globale */
        }

        .trigger-button {
          /* Styles pour le bouton déclencheur */
        }

        .custom-sheet-content {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          /* Autres styles selon vos besoins */
        }

        .custom-sheet-header {
          /* Styles pour l'en-tête de la feuille */
        }

        .custom-sheet-title {
          /* Styles pour le titre de la feuille */
        }

        .custom-sheet-description {
          /* Styles pour la description de la feuille */
        }

        .library-input {
          padding: 10px;
          font-size: 16px;
          color: black; /* Couleur du texte en noir */
          /* Autres styles selon vos besoins */
          display: block;
          margin-left: 1.5em;
          width: 20em;
        }

        .submit-button {
          margin-top: 10px; /* Marge pour séparer l'input du bouton */
          /* Autres styles selon vos besoins */
        }
      `}</style>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="orange" onClick={handleSheetToggle}>
            Add
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>add to your libraries</DropdownMenuLabel>
          <DropdownMenuSeparator />
          { 
           bibiols.map((biblio) => (
              <DropdownMenuItem onClick={() => addTolibrary(biblio[0])} key={biblio[0]}>{biblio[1]}</DropdownMenuItem>
            ))
          }
          <DropdownMenuItem onClick={() => addToDefaultLibrary()} key={99}>plan to read</DropdownMenuItem>
          <Sheet className="custom-sheet" open={isSheetOpen}>
            <SheetTrigger className="trigger-button" onClick={handleSheetToggle}>
              add new library
            </SheetTrigger>
            <SheetContent className="custom-sheet-content">
        <SheetHeader className="custom-sheet-header">
        <SheetClose className="back-button" onClick={handleSheetToggle}>
      
      <X className="h-4 w-4 " />
   
    </SheetClose>
          <SheetDescription className="custom-sheet-description flex flex-col ">
            <input
              type="text"
              className="library-input"
              placeholder="Nom de votre nouvelle bibliothèque"
              value={libraryName}
              onChange={handleInputChange}
            />
            {errorMessage && <p style={{ color: 'black' }}>{errorMessage}</p>}
            <button type="button" className="submit-button bg-orange-500 p-2 text-white rounded mx-5" onClick={handleFormSubmit}>
              Submit
            </button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
          </Sheet>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Drop;
