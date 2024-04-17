import React, { useEffect, useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { ScrollMode } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";

import { axiosClient } from "@/api/axios";
import { useStateContext } from "@/context/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function ReadingBook() {
  const [bookPDF, setBookPDF] = useState(null);
  const zoomPluginInstance = zoomPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const fullScreenPluginInstance = fullScreenPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  const { EnterFullScreenButton } = fullScreenPluginInstance;
  const {
    CurrentPageLabel,
    GoToFirstPage,
    GoToLastPage,
    GoToNextPage,
    GoToPreviousPage,
    CurrentPageInput,
  } = pageNavigationPluginInstance;
  const {currentUser} = useStateContext();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axiosClient
      .get("api/get_book/2")
      .then((response) => {
        console.log(response.data);
        setBookPDF(response.data.PdfURL);
        setBook(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      axiosClient.get("pdf/660754580c7d2.pdf").then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      })
  }, []);
  const handlePageChange = (e) => {
    localStorage.setItem("current-page", `${e.currentPage}`);
  };
  const initialPage = localStorage.getItem("current-page")
    ? parseInt(localStorage.getItem("current-page"), 10)
    : 0;

   const completeHandler = () => {
    axiosClient
    .post("api/add_book_to_default_biblio", {
      biblio_name: "lu",
      book_id: 1,
      user_id: currentUser.id,
    })
    .then((response) => {
      console.log("completed");
      navigate(`/book/1`);
    })
    .catch((error) => {
      console.log(error);
    });
   }
  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div
          className="rpv-core__viewer"
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              alignItems: "center",
              backgroundColor: "#ffb560",
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "center",
              padding: "4px",
              marginBottom: "20px",
            }}
          >
            <ZoomOutButton />
            <ZoomPopover />
            <ZoomInButton />
            <CurrentPageInput />
            <GoToPreviousPage />
            <GoToNextPage />
            <GoToFirstPage />
            <GoToLastPage />
            <EnterFullScreenButton />
          </div>
          <div
            style={{
              height: "890px",
            }}
          >
            {bookPDF ? (
              <Viewer
                fileUrl={"/public/TheLordOfTheRingsPDF.pdf"}
                plugins={[
                  zoomPluginInstance,
                  pageNavigationPluginInstance,
                  fullScreenPluginInstance,
                ]}
                defaultScale={SpecialZoomLevel.ActualSize}
                initialPage={initialPage}
                onPageChange={handlePageChange}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </Worker>
      <div className="bg-green-500 text-center text-white cursor-pointer hover:bg-green-600 " onClick={completeHandler}>Completed</div>
    </>
  );
}

/* import React from "react";
import ReactDOM from "react-dom";
import { Document, Page } from "react-pdf";
import { Worker } from "@react-pdf-viewer/core";

export default function ReadingBook() {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <div className="w-full flex justify-center">
        <Document file="/public/ThePowerOfNowPDFdrive.com.co.pdf">
          <Page pageNumber={1} />
          <Page pageNumber={2} />
          <Page pageNumber={3} />
        </Document>
      </div>
    </Worker>
  );
}
 */
