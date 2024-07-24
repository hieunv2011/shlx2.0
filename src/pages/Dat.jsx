import React, { useState, useEffect } from "react";
import axios from "axios";
import nodatafound from "../assets/nodatafound.jpg";
import loadinng from "../assets/loading.gif";
import {FaUserEdit,FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import { Location, Pagination, DatSearch, DatAddNew, DatEdit, Footer } from "../components";

const Dat = ({ currentPage }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //PageNum và index
  const [totalCount, setTotalCount] = useState();
  const [page, setPage] = useState(1);
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };
  const startIndex = (page - 1) * 50 + 1;
  const endIndex = page * 50;
  //Seacrh const
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [state, setState] = useState(-1);
  const [mainboard, setMainboard] = useState("");
  const baseUrl = "https://jira.shlx.vn/v1/tracking_devices?";
  const finalUrl = `${baseUrl}name=${name}&status=${state}&serial_no=${id}&board_serial=${mainboard}&page=${page}`;
  useEffect(() => {
    fetchData();
  }, [name, id,state,page,mainboard]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); 
      const response = await axios.get(
        finalUrl,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Add other headers if needed
          },
        }
      );
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

  //Search
  const handleNameSubmit = (submittedName) => {
    setName(submittedName);
  };
  const handleMainboardSubmit = (submittedMainboard) => {
    setMainboard(submittedMainboard);
  };
  const handleIdSubmit = (submittedId) => {
    setId(submittedId);
    // console.log(finalUrl);
  };
  const handleSelectStatus = (selectedOption) => {
    //console.log(selectedOption.value);
    setState(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : -1
    );
  };

  //Open Add new tracking_device
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);

  const handleAddNewOpen = () => {
    setIsAddNewOpen(true);
  };
  
  const handleAddNewClose = () => {
    setIsAddNewOpen(false);
  };
  //Open edit dat device
  const [selectedId, setSelectedId] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleEditOpen = (id) => {
      setSelectedId(id);
      setIsEditOpen(true);
    };
    const handleEditClose = () => {
      setIsEditOpen(false);
    };

  return (
    <div className="m-4 bg-white w-12/12 space-y-2 h-[95%]">
      <div className="m-4 h-[6%]">
        <Location />
      </div>
      <div className="mx-4 h-[1px] bg-slate-200"></div>
      <div className="m-4 h-[15%] max-phone:h-[33%] overflow-x-auto">
        <DatSearch
          onSubmitName={handleNameSubmit}
          onSubmitId={handleIdSubmit}
          onSelectStatus={handleSelectStatus}
          onSubmitMainboard={handleMainboardSubmit}
          onAddButtonClick={handleAddNewOpen}
        />
        <div className="w-full flex justify-end">
          <div><Pagination onPageChange={handlePageChange} totalCount={totalCount} /></div>
        </div>
      </div>
      <div className="mx-4 h-[1px] bg-slate-200"></div>
      <div className="m-4 border border-slate-200 h-[65%] max-phone:h-[44%] overflow-scroll custom-scrollbar">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <img src={loadinng} alt="loading..." className="" />
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <img src={nodatafound} alt="Không có dữ liệu" className="w-96" />
            <p className="">Không tìm thấy dữ liệu</p>
          </div>
        ) : (
          <div className="">
            <table className="w-full border-separate border-spacing-0">
              <thead className="bg-slate-100 sticky top-0 z-10">
                <tr>
                  <th className="text-sm px-6 py-3 border border-slate-200"></th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Tên thiết bị
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Serial
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Board
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Phiên bản
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Phiên bản mới
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Xe
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Model
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Hạng
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Sim
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Trạng thái
                  </th>
                  <th className="text-sm sticky right-0 bg-slate-100 border shadow-[rgba(0,0,255,0.5)_-3px_0px_10px_0px] border-b-slate-200">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="mt-1">
                {data.map((element, index) => (
                  <tr key={index} className="h-10">
                    <td className="text-xs text-center border border-slate-100">
                     {startIndex + index}
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-32 max-phone:w-20 flex items-center justify-center font-medium text-blue-700 whitespace-normal overflow-auto">
                      {element.name}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center w-60 max-phone:w-32">
                      {element.serial_no}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-15 flex items-center justify-center">
                      {element.board_serial}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-15 flex items-center justify-center">
                      {element.firmware}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-32 flex items-center justify-center">
                        {element.config && parseConfig(element.config)}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-24 flex items-center justify-center">
                       {element.vehicle_plate}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-24 flex items-center justify-center">
                      {element.vehicle_model}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-24 flex items-center justify-center">
                      {element.vehicle_hang}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-24 flex items-center justify-center">
                      {element.sim}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className={`w-32 flex items-center justify-center py-1 mx-3 rounded-lg text-white font-bold ${element.status ? "bg-green-500" : "bg-yellow-400"}`}>
                       {element.status ? "Đang hoạt động" : "Không hoạt động"}
                      </div>
                    </td>
                    <td className="text-xl border sticky right-0 bg-white shadow-[rgba(0,0,255,0.5)_1px_10px_10px_0px]">
                      <div className="flex items-center justify-center w-20  ">
                        <FaUserEdit className="text-blue-500 mr-2 cursor-pointer" onClick={() => handleEditOpen(element.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div>
          <Footer/>
      </div>
      {isAddNewOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }} // Thiết lập giá trị ban đầu cho opacity
          animate={{ opacity: 1 }} // Thiết lập giá trị cuối cùng cho opacity (tức là khi div xuất hiện)
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleAddNewClose}
          ></div>
          <motion.div className="relative bg-white p-4 rounded-lg shadow-lg w-[70%] h-[70%] max-phone:h-fit">
            <DatAddNew/>
            <button
              className="absolute top-0 right-0 m-2 text-red-500 text-2xl"
              onClick={handleAddNewClose}
            >
              <FaTimesCircle />
            </button>
          </motion.div>
        </motion.div>
      )}
      {isEditOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }} // Thiết lập giá trị ban đầu cho opacity
          animate={{ opacity: 1 }} // Thiết lập giá trị cuối cùng cho opacity (tức là khi div xuất hiện)
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleEditClose}
          ></div>
          <motion.div className="relative bg-white p-4 rounded-lg shadow-lg w-[50%] h-[70%]">
            <DatEdit selectedId={selectedId}/>
            <button
              className="absolute top-0 right-0 m-2 text-red-500 text-2xl"
              onClick={handleEditClose}
            >
              <FaTimesCircle />
            </button>
          </motion.div>
        </motion.div>
      )}


    </div>
  );
  function parseConfig(config) {
    try {
      const parsedConfig = JSON.parse(config);
      return parsedConfig.newVersion || "N/A";
    } catch (error) {
      //   console.error("Error parsing JSON:", error);
      //   return "Invalid JSON";
    }
  }
};

export default Dat;
