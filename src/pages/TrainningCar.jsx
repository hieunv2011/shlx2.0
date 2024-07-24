import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";

import nodatafound from "../assets/nodatafound.jpg";
import loadinng from "../assets/loading.gif";
import {FaUserEdit} from "react-icons/fa";

import { Location, Pagination, DatSearch } from "../components";

const TrainningCar = ({ currentPage }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //PageNum
  const [totalCount, setTotalCount] = useState();
  const [page, setPage] = useState(1);
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };
  //Seacrh const
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [state, setState] = useState(-1);
  const [mainboard, setMainboard] = useState("");
  const baseUrl="https://jira.shlx.vn/v1/vehicles?";
  // const finalUrl = `${baseUrl}plate=${name}&from_date=${submitStartDate}&to_date=${submitEndDate}`;
  useEffect(() => {
    fetchData();
  }, [name, id,state,page,mainboard]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const response = await axios.get(
        baseUrl,
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
  return (
    <div className="m-4 bg-white w-12/12 space-y-2 h-[95%]">
      <div className="m-4 h-[6%]">
        <Location />
      </div>
      <div className="mx-4 h-[1px] bg-slate-200"></div>
      <div className="m-4 h-[15%]">
        <DatSearch
          onSubmitName={handleNameSubmit}
          onSubmitId={handleIdSubmit}
          onSelectStatus={handleSelectStatus}
          onSubmitMainboard={handleMainboardSubmit}

        />
        <div className="mt-[-25px] absolute right-8">
          <Pagination onPageChange={handlePageChange} totalCount={totalCount} />
        </div>
      </div>
      <div className="mx-4 h-[1px] bg-slate-200"></div>
      <div className="m-4 border border-slate-200 h-[65%] overflow-scroll custom-scrollbar">
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
                  <th className="text-sm sticky right-0 bg-slate-100 border border-l-black border-b-slate-200">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((element, index) => (
                  <tr key={index} className="h-10">
                    <td className="text-xs text-center border border-slate-100">
                      {index + 1}
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-32 flex items-center justify-center font-medium text-blue-700">
                      {element.name}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center w-60">
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
                    <td className="text-xl border sticky right-0 bg-white border-l-black">
                      <div className="flex items-center justify-center w-36 ">
                        <FaUserEdit className="text-blue-500 mr-2" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="flex justify-between text-slate-600">
        <p className="p-4">HỆ THỐNG QUÁN LÝ ĐÀO TẠO LÁI XE</p>
        <p className="p-4">
          Giải pháp của Toàn Phương SHLX. 0904.666.329 - 0982.911.000. Email:
          shlx@toanphuong.com.vn
        </p>
      </div>
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

export default TrainningCar;
