import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import MyPieChart from "@/components/charts/MyPieChart";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SubAreaChart from "@/components/charts/SubAreaChart";
import { DataGrid } from "@mui/x-data-grid";
import SolveForm from "@/components/SolveForm";
import { axiosClient } from "@/api/axios";

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
    field: "message",
    headerName: "Message",

    minWidth: 120,
    flex: 2,
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
function AdminDashboard() {
  const [usersNumber, setUsersNumber] = useState({
    total: 0,
    subscribed: 0,
    nonSubscribed: 0,
  });
  const [booksNumber, setBooksNumber] = useState({
    total: 0,
    free: 0,
    premium: 0,
  });
  const [revenue, setRevenue] = useState([]);
  const [subsTotalNumber, setSubsTotalNumber] = useState(0);

  useEffect(() => {
    axiosClient
      .get("api/get_users_number")
      .then((response) => {
        console.log(response.data);
        setUsersNumber({
          total: response.data.total_users,
          subscribed: response.data.subscribed_users,
          nonSubscribed: response.data.non_subscribed_users,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
  }, []);

  useEffect(() => {
    axiosClient
      .get("api/get_subscriptions_number?option=total")
      .then((response) => {
        console.log(response.data);
        setSubsTotalNumber(response.data.total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axiosClient
      .get("api/get_revenue").then((response) => {
        setRevenue(response.data);
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
        console.log(error.response.data.error);
      })
  }, []);

  console.log("AdminDashboard");
  const RevenueData = revenue.map((revenue) => {
    return {
      name: revenue.date,
      revenue: revenue.total_revenue,
    };
  })
  
  /* [
    {
      name: "Page A",
      pv: 989,
      amt: 2400,
    },
    {
      name: "Page B",
      pv: 1288,
      amt: 2210,
    },
    {
      name: "Page B",
      pv: 1407,
      amt: 2210,
    },
  ]; */
  const usersPieData = [
    { name: "Subscribed", value: usersNumber.subscribed },
    { name: "Non-Subscribed ", value: usersNumber.nonSubscribed },
  ];
  const booksPieData = [
    { name: "Premium", value: booksNumber.premium },
    { name: "Free", value: booksNumber.free },
  ];
  console.log(usersPieData);
  return (
    <>
      <div className="sbg-red-500  mx-5">
        <div className="sbg-blue-500 flex  space-x-2 mb-5  mt-5 ">
          <div className="flex flex-col justify-between space-y-3  w-full">
            <div className="flex w-full h-full space-x-3">
              <Card className="w-full  flex items-center">
                <CardContent className="flex items-center space-x-4 pt-1">
                  <GroupOutlinedIcon
                    fontSize="large"
                    className="text-orange-500 w-12 h-12"
                  />
                  <div>
                    <div className="text-4xl font-bold">
                      {usersNumber.total}
                    </div>
                    <div className="text-gray-500">Total Users</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full  flex items-center">
                <CardContent className="flex items-center space-x-4 pt-1">
                  <MenuBookOutlinedIcon
                    fontSize="large"
                    className="text-orange-500 w-12 h-12"
                  />
                  <div>
                    <div className="text-4xl font-bold">
                      {booksNumber.total}
                    </div>
                    <div className="text-gray-500">Total Books</div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex w-full h-full space-x-3">
              <Card className="w-full flex items-center">
                <CardContent className="flex items-center space-x-4 pt-1">
                  <FlagOutlinedIcon
                    fontSize="large"
                    className="text-orange-500 w-12 h-12"
                  />
                  <div>
                    <div className="text-4xl font-bold">216</div>
                    <div className="text-gray-500">Total Reports</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full  flex items-center">
                <CardContent className="flex items-center space-x-4 pt-1">
                  <PaidOutlinedIcon
                    fontSize="large"
                    className="text-orange-500 w-12 h-12"
                  />
                  <div>
                    <div className="text-4xl font-bold">{subsTotalNumber}</div>
                    <div className="text-gray-500">Total Subscriptions</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Card>
            <CardContent className="pt-1">
              <div className="text-xl font-bold">Users</div>
              <MyPieChart
                w={200}
                h={150}
                cx={"50%"}
                cy={"50%"}
                sizein={40}
                sizeout={70}
                label={false}
                data={usersPieData}
                colors={["#ff8800", "rgb(209 213 219)"]}
              />
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-[#ff8800]" />
                  <span className="text-gray-500 text-xs">Subscribed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-gray-300" />
                  <span className="text-gray-500 text-xs">Non Subscribed</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-1">
              <div className="text-xl font-bold">Books</div>
              <MyPieChart
                w={200}
                h={150}
                cx={"50%"}
                cy={"50%"}
                sizein={40}
                sizeout={70}
                label={false}
                data={booksPieData}
                colors={["#ff8800", "rgb(209 213 219)"]}
              />
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-[#ff8800]" />
                  <span className="text-gray-500 text-xs"> Premium</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-gray-300" />
                  <span className="text-gray-500 text-xs">Free</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="sbg-green-500 w-full  space-x-3 flex ">
          <Card className="w-4/6 h-full ">
            <div className="text-xl font-bold py-2 pl-2">
              Subscription Daily Revenue
            </div>
            <CardContent>
              <SubAreaChart
                w={window.innerWidth <= 1534 ? 700 : 600}
                h={580}
                data={RevenueData}
                datakey={"revenue"}
              />
            </CardContent>
          </Card>
          <Card className="w-2/6">
            <CardContent>
              <div className="text-xl font-bold py-2 pl-2">Report List</div>
              <DataGrid
                sx={{}}
                autoHeight
                getRowHeight={() => 95}
                rows={rows}
                columns={columns}
                columnHeaderHeight={40}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 50, 100]}
                loading={rows.length === 0}
              />
            </CardContent>
          </Card>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default AdminDashboard;
