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
import SolveForm from "@/components/SolveForm";

export default function AdminReports() {
  const [books, setBooks] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {}, [load]);

  const rows = [
    {
      id: 1,
      comment: "this is a comment",
      reporter: "John Doe",
      reported: "Jane Doe",
      message: "this is a message",
    },
    {
      id: 2,
      comment: "this is a comment",
      reporter: "John Doe",
      reported: "Jane Doe",
      message: "this is a message",
      solved: true,
    },
    {
      id: 3,
      comment: "this is a comment",
      reporter: "John Doe",
      reported: "Jane Doe",
      message: "this is a message",
    },
    {
      id: 4,
      comment: "this is a comment",
      reporter: "John Doe",
      reported: "Jane Doe",
      message: "this is a message",
    },
    {
      id: 5,
      comment: "this is a comment",
      reporter: "John Doe",
      reported: "Jane Doe",
      message: "this is a message",
    },
  ];

  const columns = [
    { field: "id", headerName: "Id", width: 60 },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 120,
      flex: 2,
      editable: false,
    },
    {
      field: "reporter",
      headerName: "Reporter",
      minWidth: 120,
      flex: 1,
      editable: false,
    },
    {
      field: "reported",
      headerName: "Reported",
      minWidth: 120,
      flex: 1,
      editable: false,
    },
    {
      field: "message",
      headerName: "Message",

      minWidth: 120,
      flex: 2,
      editable: false,
    },
    {
      field: "solved",
      headerName: "Solved",
      type: "boolean",
      minWidth: 120,
      flex: 1,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        if (params.row.solved) {
          return (
            <div className="text-green-500 text-center w-full">
              <div className="font-bold pr-3">Solved</div>
            </div>
          );
        } else {
          return <SolveForm params={params} />;
        }
      },
    },
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <div className=" flex-grow flex flex-col items-center w-full mx-10 ">
      <h1 className="text-3xl w-full font-semibold mx-10 mt-5">Reports</h1>
      <div className=" lg:w-[60rem] 2xl:w-[90rem]  bg-white p-3 my-24 rounded-sm border">
        <p className=" flex items-center justify-between text-sm mb-3">
          This is where Reports will be displayed.
        </p>
        <div className="font-[520] text-[0.9rem] mb-1">Reports statictics</div>
        <div className="flex flex-row justify-between gap-2 w-full mb-6">
          <div className="flex flex-col justify-center  bg-orange-400 rounded-sm h-18 text-white text-[0.9rem] font-medium p-2 w-1/3">
            Total Reports
            <div className="font-bold text-[1.5rem]">500</div>
          </div>
          <div className="flex flex-col justify-center  bg-orange-400 rounded-sm h-18 text-white text-[0.9rem] font-medium p-2 w-1/3">
            Unsolved Reports
            <div className="font-bold text-[1.5rem]">100</div>
          </div>
          <div className="flex flex-col justify-center  bg-orange-400 rounded-sm h-18 text-white text-[0.9rem] font-medium p-2 w-1/3">
            Solved Reports
            <div className="font-bold text-[1.5rem]">300</div>
          </div>
        </div>
        <div className="">
          <Button
            className={`ml-2 w-28 h-8 hover:bg-red-600 bg-red-500 ${
              selectedRows.length === 0 ? "hidden" : ""
            }`}
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
            loading={rows.length === 0}
            onRowSelectionModelChange={(rowSelectionModel) => {
              setSelectedRows(rowSelectionModel);
            }}
            rowSelectionModel={selectedRows}
          />
        </div>
      </div>
    </div>
  );
}
