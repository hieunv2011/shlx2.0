import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { FaWifi, FaChalkboardTeacher, FaAddressCard } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { FaTimesCircle } from "react-icons/fa";

import { Footer, OutdoorLog, OutdoorMap } from "../components";

const Outdoor = ({ currentPage }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //PageNum
  const [totalCount, setTotalCount] = useState();
  const [page, setPage] = useState(1);
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };
  //Open Log
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedPlate, setSelectedPlate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const handleDetailOpen = (id,instructor_name,plate,startTime,trainee_name) => {
    setSelectedId(id);
    setSelectedTeacher(instructor_name);
    setSelectedPlate(plate);
    setSelectedStartTime(startTime);
    setSelectedName(trainee_name);
    setIsDetailOpen(true);
  };

  const handleDetailClose = () => {
    setIsDetailOpen(false);
  };

  const baseUrl = "https://jira.shlx.vn/v1/vehicles?";
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
      });
      setData(response.data.items);
      console.log(response);
      //
      setTotalCount(Math.ceil(response.data.total / 50));
      //
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  return (
    <div className="m-4 bg-white w-12/12 space-y-2 h-[95%]">
      <div className="m-4 pt-2 h-[2%] font-bold text-2xl max-phone:text-[20px] max-phone:pt-2">
        Giám sát thực hành
      </div>
      <div className="flex flex-row h-[85%]">
        <div className="overflow-x-auto custom-scrollbar ml-4">
          {data.map((element, index) => (
            <div
              key={index}
              className="border border-slate-300 rounded-xl w-68 my-4 p-4 space-y-2"
            >
              <div className="flex space-x-4 items-center">
                <p className="border-2 border-black rounded-md text-black p-1">
                  {" "}
                  {element.plate}
                </p>
                <p> {element.hang}</p>
                {element.state ? (
                  <p
                    className="text-white bg-green-500 rounded-md
                font-bold content-center p-2"
                  >
                    {(element.state.velocity / 100).toFixed(2)} km/h
                  </p>
                ) : (
                  <p>0.0</p>
                )}
              </div>
              <div className="flex space-x-2 items-center">
                <FaWifi />
                <p>
                  {element.last_updated
                    ? format(
                        new Date(element.last_updated),
                        "dd/MM/yyyy HH:mm:ss"
                      )
                    : " "}
                </p>
              </div>
              <div className="flex space-x-2 items-center">
                <FaChalkboardTeacher />
                {element.state ? (
                  <p>{element.state.instructor_name}</p>
                ) : (
                  <p> </p>
                )}
              </div>
              <div className="flex space-x-2 items-center">
                <FaLocationDot />
                {element.state ? (
                  <p>
                    {element.state.lat.toFixed(5)} :{" "}
                    {element.state.lng.toFixed(5)}
                  </p>
                ) : (
                  <p> </p>
                )}
              </div>
              <div className="flex space-x-2 items-center">
                <FaAddressCard />
                <p>{element.gptl}</p>
              </div>
              <div className="flex space-x-2 items-center">
                <PiStudentBold />
                <Link
                  className="text-blue-800"
                  onClick={() =>
                    handleDetailOpen(element.state?.session_id || "",
                      element.state?.instructor_name || "",
                      element.plate || "",
                      element.state?.event_date || "", 
                      element.state?.trainee_name || "",
                    )
                  }
                >
                  {element.state ? (
                    <p>{element.state.trainee_name}</p>
                  ) : (
                    <p> </p>
                  )}
                </Link>
              </div>
              <div className="flex space-x-2 items-center">
                <p>Quãng đường :</p>
                {element.state ? (
                  <p>{element.state.session_distance / 1000} km</p>
                ) : (
                  <p> </p>
                )}
              </div>
              <div className="flex space-x-2 items-center">
                <p>Thời gian :</p>
                {element.state ? (
                  <p>
                    {`${String(
                      Math.floor(element.state.session_duration / 3600)
                    ).padStart(2, "0")}:${String(
                      Math.floor((element.state.session_duration % 3600) / 60)
                    ).padStart(2, "0")}:${String(
                      element.state.session_duration % 60
                    ).padStart(2, "0")}`}
                  </p>
                ) : (
                  <p> </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="overflow-auto custom-scrollbar z-0 m-2">
          <OutdoorMap />
        </div>
      </div>
      <Footer />

      {isDetailOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }} // Thiết lập giá trị ban đầu cho opacity
          animate={{ opacity: 1 }} // Thiết lập giá trị cuối cùng cho opacity (tức là khi div xuất hiện)
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleDetailClose}
          ></div>
          <motion.div className="overflow-scroll custom-scrollbar relative bg-white p-4 rounded-lg shadow-lg w-[50%] h-[70%] max-phone:h-fit z-10">
            <OutdoorLog id={selectedId} instructor_name={selectedTeacher} plate={selectedPlate} startTime={selectedStartTime} trainee_name={selectedName}  />
            <button
              className="absolute top-0 right-0 m-2 text-red-500 text-2xl"
              onClick={handleDetailClose}
            >
              <FaTimesCircle />
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Outdoor;
