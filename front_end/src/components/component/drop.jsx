import React, { useState } from "react"; // Importez le hook useState
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
const Drop = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [libraryName, setLibraryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      // Ajoutez ici la logique pour traiter le formulaire
      // ...

      // Fermez la feuille après le traitement du formulaire
      setIsSheetOpen(false);
    }
  };

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
          <DropdownMenuItem value="email">Main</DropdownMenuItem>
          <DropdownMenuItem value="phone">for fun</DropdownMenuItem>
          <DropdownMenuItem value="letter">mangas</DropdownMenuItem>
          <Sheet className="custom-sheet" open={isSheetOpen}>
            <SheetTrigger className="trigger-button" onClick={handleSheetToggle}>
              add new library
            </SheetTrigger>
            <SheetContent className="custom-sheet-content">
        <SheetHeader className="custom-sheet-header">
        <SheetClose className="back-button" onClick={handleSheetToggle}>
      
      <X className="h-4 w-4 " />
   
    </SheetClose>
          <SheetDescription className="custom-sheet-description">
            <input
              type="text"
              className="library-input"
              placeholder="Nom de votre nouvelle bibliothèque"
              value={libraryName}
              onChange={handleInputChange}
            />
            {errorMessage && <p style={{ color: 'black' }}>{errorMessage}</p>}
            <button type="button" className="submit-button" onClick={handleFormSubmit}>
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
