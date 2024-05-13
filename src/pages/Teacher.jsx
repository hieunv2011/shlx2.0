import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";

import nodatafound from "../assets/nodatafound.jpg";
import loadinng from "../assets/loading.gif";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import {FaUserEdit,FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import { Footer, Location, Pagination, TeacherAddNew, TeacherSearch } from "../components";

const Teacher = ({ currentPage }) => {
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
  const [gplx, setGplx] = useState("");
  const [gpdt, setGpdt] = useState("");
  const [id, setId] = useState("");
  const [state, setState] = useState(-2);
  const [type, setType] = useState(-2);
  const baseUrl = "https://jira.shlx.vn/v1/instructors?";
  const finalUrl = `${baseUrl}name=${name}&id_card=${id}&driving_license_no=${gplx}&teaching_license_no=${gpdt}&synced=${state}`;
  useEffect(() => {
    fetchData();
  }, [name, id, state, page, gplx, gpdt]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const response = await axios.get(finalUrl, {
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

  //Search
  const handleNameSubmit = (submittedName) => {
    setName(submittedName);
  };

  const handleIdSubmit = (submittedId) => {
    setId(submittedId);
  };
  const handleGplxSubmit = (submittedGplx) => {
    setGplx(submittedGplx);
  };
  const handleGpdtSubmit = (submittedGpdt) => {
    setId(submittedGpdt);
  };
  const handleSelectStatus = (selectedOption) => {
    //console.log(selectedOption.value);
    setState(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : -1
    );
  };
  const handleSelectType = (selectedOption) => {
    //console.log(selectedOption.value);
    setType(
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
  return (
    <div className="m-4 bg-white w-12/12 space-y-2 h-[95%]">
      <div className="m-4 h-[6%]">
        <Location />
      </div>
      <div className="mx-4 h-[1px] bg-slate-200"></div>
      <div className="m-4 h-[15%] max-phone:h-[33%] overflow-x-auto">
        <TeacherSearch
          onSubmitName={handleNameSubmit}
          onSubmitId={handleIdSubmit}
          onSubmitGpdt={handleGpdtSubmit}
          onSubmitGplx={handleGplxSubmit}
          onSelectStatus={handleSelectStatus}
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
                    Ảnh
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Họ và tên
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Ngày sinh
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    CMT
                  </th>
                  <th className="text-sm border border-slate-200">Địa chỉ</th>
                  <th className="text-sm border border-slate-200">GPLX</th>
                  <th className="text-sm border border-slate-200">GPĐT</th>
                  <th className="text-sm border border-slate-200">Tên thẻ</th>
                  <th className="text-sm border border-slate-200">Số thẻ</th>
                  <th className="text-sm border border-slate-200">Đồng bộ</th>
                  <th className="text-sm sticky right-0 bg-slate-100 border shadow-[rgba(0,0,255,0.5)_-3px_0px_10px_0px] border-b-slate-200">
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
                      <div className="w-22 flex items-center justify-center font-medium text-blue-700">
                        <img
                          className="w-16 h-16 rounded-full"
                          src={element.image_path}
                        />
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {element.name}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-15 flex items-center justify-center">
                        {format(new Date(element.birthday), "dd/MM/yyyy")}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {element.id_card}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {element.address}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {element.driving_license_no}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {element.teaching_license_no}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {element.rfid_card_name}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {element.rfid_card}
                      </div>
                    </td>
                    <td className="text-2xl border border-slate-100">
                      <div
                        className={`w-22 flex items-center justify-center py-1 mx-3 rounded-lg text-white font-bold`}
                      >
                        {element.synced ? (
                          <AiOutlineCheckCircle className="text-green-500" />
                        ) : (
                          <AiOutlineCloseCircle className="text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="text-xl border sticky right-0 bg-white border-l-black">
                      <div className="flex items-center justify-center w-34 ">
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
      <Footer/>
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
          <motion.div className="relative bg-white p-4 rounded-lg shadow-lg w-[50%] h-[70%]">
            <TeacherAddNew />
            <button
              className="absolute top-0 right-0 m-2 text-red-500 text-2xl"
              onClick={handleAddNewClose}
            >
              <FaTimesCircle />
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Teacher;
