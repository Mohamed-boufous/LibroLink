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
export default function AdminSubscriptions() {
  const [books, setBooks] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {}, [load]);

  const rows = [
    {
      id: 1,
      username: "John Doe",
      card_number: "1234 5678 9012 3456",
      offer: "3 Months",
      subscription_date: "2022-01-01",
      expiration_date: "2022-04-01",
    },
    {
      id: 2,
      username: "John Doe",
      card_number: "1234 5678 9012 3456",
      offer: "3 Months",
      subscription_date: "2022-01-01",
      expiration_date: "2022-04-01",
    },
    {
      id: 3,
      username: "John Doe",
      card_number: "1234 5678 9012 3456",
      offer: "3 Months",
      subscription_date: "2022-01-01",
      expiration_date: "2022-04-01",
    },
    {
      id: 4,
      username: "John Doe",
      card_number: "1234 5678 9012 3456",
      offer: "3 Months",
      subscription_date: "2022-01-01",
      expiration_date: "2022-04-01",
    },
    {
      id: 5,
      username: "John Doe",
      card_number: "1234 5678 9012 3456",
      offer: "3 Months",
      subscription_date: "2022-01-01",
      expiration_date: "2022-04-01",
    },
  ];

  const columns = [
    { field: "id", headerName: "Id", width: 60 },
    {
      field: "username",
      headerName: "User",
      minWidth: 120,
      flex: 1.5,
      editable: false,
    },
    {
      field: "card_number",
      headerName: "Card Number",
      minWidth: 120,
      flex: 2,
      editable: false,
    },
    {
      field: "offer",
      headerName: "Offer",
      minWidth: 120,
      flex: 1,
      editable: false,
    },
    {
      field: "subscription_date",
      headerName: "Subscription Date",

      minWidth: 120,
      flex: 1,
      editable: false,
    },
    {
      field: "expiration_date",
      headerName: "Expiration Date",

      minWidth: 120,
      flex: 1,
      editable: false,
    },
  ];
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <div className=" flex-grow flex flex-col items-center w-full mx-10 ">
      <h1 className="text-3xl w-full font-semibold mx-10 mt-5">
        Subscriptions
      </h1>
      <div className=" lg:w-[60rem] 2xl:w-[90rem]  bg-white p-3 my-24 rounded-sm border">
        <p className=" flex items-center justify-between text-sm mb-3">
          This is where Subscriptions will be displayed.
        </p>
        <div className="font-[520] text-[0.9rem] mb-1">
          Subscriptions statictics
        </div>
        <div className="flex flex-row justify-between gap-2 w-full mb-6">
          <div className="flex flex-col justify-center  bg-orange-400 rounded-sm h-18 text-white text-[0.9rem] font-medium p-2 w-1/3">
            Total Subscriptions
            <div className="font-bold text-[1.5rem]">1200</div>
          </div>
          <div className="flex flex-col justify-center  bg-orange-400 rounded-sm h-18 text-white text-[0.9rem] font-medium p-2 w-1/3">
            Active Subscriptions
            <div className="font-bold text-[1.5rem]">200</div>
          </div>
          <div className="flex flex-col justify-center  bg-orange-400 rounded-sm h-18 text-white text-[0.9rem] font-medium p-2 w-1/3">
            Expired Subscriptions
            <div className="font-bold text-[1.5rem]">1000</div>
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
