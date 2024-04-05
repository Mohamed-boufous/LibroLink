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
import BarChar from "@/components/charts/BarChar";
import BooksPieChart from "@/components/charts/MyPieChart";
import MyPieChart from "@/components/charts/MyPieChart";

export default function AdminBooks() {
  const [load, setLoad] = useState(false);
  const [books, setBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [mostRatedBooks, setMostRatedBooks] = useState([]);
  const [booksNumber, setBooksNumber] = useState({
    total: 0,
    free: 0,
    premium: 0,
  });
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    serie: false,
    bookFile: false,
    origin: false,
    lang: false,
    created_at: false,
    updated_at: false,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    axiosClient
      .get("api/get_books_number")
      .then((response) => {
        console.log(response.data);
        setBooksNumber({
          total: response.data.total_books,
          free: response.data.free_books,
          premium: response.data.premium_books,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [load]);
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
    const getPopularBooksHandler = () => {
      axiosClient
        .get("api/get_all_books?option=popular&limit=5")
        .then((response) => {
          setPopularBooks(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const getMostRatedBooksHandler = () => {
      axiosClient
        .get("api/get_all_books?option=rating&limit=5")
        .then((response) => {
          setMostRatedBooks(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getBooksHandler();
    getPopularBooksHandler();
    getMostRatedBooksHandler();
  }, [load]);
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
      renderCell: (params) => (
        <EditBookFom params={params} setLoad={setLoad} load={load} />
      ),
    },
  ];

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
  const booksData = [
    { name: "Premium", value: booksNumber.premium },
    { name: "Free", value: booksNumber.free },
  ];
  const popularBooksData = popularBooks.map((book) => ({
    name: book.title,
    value: book.views,
  }));
  const mostRatedBooksData = mostRatedBooks.map((book) => ({
    name: book.title,
    value: book.sum_rating,
  }));
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
      <div className=" flex-grow flex flex-col items-center w-full mx-10 ">
        <h1 className="text-3xl w-full font-semibold mx-10 mt-5">Books</h1>
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
            <div className="flex flex-col justify-center  bg-orange-400 rounded-sm h-18 text-white text-[0.9rem] font-medium p-2 w-1/3">
              Total Books
              <div className="font-bold text-[1.5rem]">{booksNumber.total}</div>
            </div>
            <div className="flex flex-col justify-center bg-orange-400 rounded-sm h-18 text-white text-[0.9rem] font-medium p-2 w-1/3">
              Free Books
              <div className="font-bold text-[1.5rem]">{booksNumber.free}</div>
            </div>
            <div className="flex flex-col justify-center bg-orange-400 rounded-sm h-18 text-white text-[0.9rem] font-medium p-2 w-1/3">
              Premium Books
              <div className="font-bold text-[1.5rem]">
                {booksNumber.premium}
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
          <div className="flex flex-row space-x-3  mt-8">
            <div className=" p-2">
              <div className="font-[600] text-orange-500 text-[1.5rem] mb-1">
                Top 5 Viewed Books
              </div>
              <BarChar
                w={window.innerWidth <= 1534 ? 280 : 450}
                h={300}
                data={popularBooksData}
              />
            </div>
            <div className="p-2">
              <div className="font-[600] text-orange-500 text-[1.5rem] mb-1">
                Top 5 Rating Books
              </div>
              <BarChar
                w={window.innerWidth <= 1534 ? 280 : 450}
                h={300}
                data={mostRatedBooksData}
              />
            </div>
            <div className="  p-2">
              <div className="font-[600] text-orange-500 text-[1.5rem] mb-1">
                Book types
              </div>
              <MyPieChart
                w={window.innerWidth <= 1534 ? 280 : 450}
                h={250}
                sizein={60}
                data={booksData}
                label={false}
                colors={["#ff8800", "rgb(209 213 219)"]}
              />
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-[#ffb560]" />
                  <span className="text-gray-500 text-xs">Premium</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-gray-300" />
                  <span className="text-gray-500 text-xs">Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
