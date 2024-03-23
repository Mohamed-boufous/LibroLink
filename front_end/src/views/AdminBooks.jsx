import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PenaltyForm from "@/components/PenaltyForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AddNewBookForm from "@/components/AddNewBookForm";
import EditBookFom from "@/components/EditBookFom";
import { axiosClient } from "@/api/axios";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const getBooksHandler = () => {
      axiosClient
        .get("api/get_all_books")
        .then((response) => {
          setBooks(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getBooksHandler();
  }, [load]);

  const rows = books.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    date_publication: book.date_publication,
    origin: book.origin,
    genre: book.genres.map((g) => g.genreName).join(", "),
    subject: book.subject,
    serie: book.serie,
    isFree: book.isFree,
    description: book.description,
    lang: book.lang,
    file_path: book.filePath,
    bookCover: book.ImageURL,
  }));


  rows.forEach((row) => {
    console.log(row.file_path);
  });

  const columns = [
    { field: "id", headerName: "Id", width: 60 },
    {
      field: "bookCover",
      headerName: "Cover",
      minWidth: 80,
      flex: 0.8,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="">
          <img src={params.value} alt="cover" />
        </div>
      ),
    },
    {
      field: "title",
      headerName: "Title",

      minWidth: 120,
      flex: 2,
      editable: false,
    },
    {
      field: "author",
      headerName: "Author",
      minWidth: 120,
      flex: 1.5,
      editable: false,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 120,
      flex: 2,
      editable: false,
    },
    {
      field: "serie",
      headerName: "Serie",

      minWidth: 120,
      flex: 1.5,
      editable: false,
    },
    {
      field: "genre",
      headerName: "Genre",

      minWidth: 120,
      flex: 1,
      editable: false,
    },
    {
      field: "subject",
      headerName: "Subject",

      minWidth: 120,
      flex: 2,
      editable: false,
    },
    {
      type: "Date",
      field: "date_publication",
      headerName: "Publication Date",

      minWidth: 120,
      flex: 1,
      editable: false,
    },
    {
      field: "isFree",
      headerName: "Is_Free",
      minWidth: 120,

      minWidth: 120,
      flex: 0.8,
      type: "boolean",
      editable: false,
    },
    {
      field: "origin",
      headerName: "Origine",

      minWidth: 120,
      flex: 1,
      editable: false,
    },
    {
      field: "lang",
      headerName: "Language",

      minWidth: 120,
      flex: 1,
      options: ["ar", "en", "fr"],
    },
    {
      field: "created_at",
      headerName: "Created_at",

      minWidth: 120,
      flex: 1,
      editable: false,
    },
    {
      field: "updated_at",
      headerName: "updated_at",

      minWidth: 120,
      flex: 1,
      editable: false,
    },
    {
      field: "bookFile",
      headerName: "File Path",

      minWidth: 120,
      flex: 1,
      type: "file",
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => <EditBookFom params={params} setLoad={setLoad} load={load} />,
    },
  ];
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    serie: false,
    bookFile: false,
    origin: false,
    lang: false,
    created_at: false,
    updated_at: false,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const handleDeleteSelectedRows = () => {
    axiosClient
      .delete("api/delete_books", { data: { ids: selectedRows } })
      .then((response) => {
        console.log(response.data);
        setSelectedRows([]);
        setLoad(!load);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center w-full mx-5">
        <h1 className="text-2xl w-full font-semibold mx-10 mt-5">Books</h1>
        <div className=" lg:w-[60rem] 2xl:w-[90rem]  bg-white p-3 my-24 rounded-sm border">
          <p className=" flex items-center justify-between text-sm mb-3">
            This is where book management content will be displayed.
            <Link to={"/admin/addbook"}>
              <Button>
                <AddIcon />
                Add New Book
              </Button>
            </Link>
          </p>
          <div className="font-[520] text-[0.9rem] mb-1">Book statictics</div>
          <div className="flex flex-row justify-between gap-2 w-full mb-6">
            <div className="flex flex-col justify-center bg-orange-400 rounded-sm h-16 text-white text-[0.9rem] font-medium p-2 w-1/3">
              Total Books
              <div className="font-bold text-[1.5rem]">{books.length}</div>
            </div>
            <div className="flex flex-col justify-center bg-orange-400 rounded-sm h-16 text-white text-[0.9rem] font-medium p-2 w-1/3">
              Free Books
              <div className="font-bold text-[1.5rem]">
                {books.filter((book) => book.isFree).length}
              </div>
            </div>
            <div className="flex flex-col justify-center bg-orange-400 rounded-sm h-16 text-white text-[0.9rem] font-medium p-2 w-1/3">
              Premium Books
              <div className="font-bold text-[1.5rem]">
                {books.filter((book) => !book.isFree).length}
              </div>
            </div>
          </div>
          <div className="">
            <Button
              className={`ml-2 w-28 h-8 hover:bg-red-600 bg-red-500 ${
                selectedRows.length === 0 ? "hidden" : ""
              }`}
              onClick={handleDeleteSelectedRows}
            >
              Delete
            </Button>
            <DataGrid
              sx={{ m: 1 }}
              autoHeight
              getRowHeight={() => 95}
              rows={rows}
              columns={columns}
              columnHeaderHeight={40}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[10, 50, 100]}
              checkboxSelection
              disableRowSelectionOnClick
              loading={books.length === 0}
              columnVisibilityModel={columnVisibilityModel}
              onColumnVisibilityModelChange={(newModel) =>
                setColumnVisibilityModel(newModel)
              }
              onRowSelectionModelChange={(rowSelectionModel) => {
                setSelectedRows(rowSelectionModel);
              }}
              rowSelectionModel={selectedRows}
            />
          </div>
        </div>
      </div>
    </>
  );
}
