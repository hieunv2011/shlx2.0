import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";

import nodatafound from "../assets/nodatafound.jpg";
import loadinng from "../assets/loading.gif";
import { FaUserEdit, FaTimesCircle } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { motion } from "framer-motion";

import { Location, Pagination, CardSearch, CardAddNew } from "../components";

const Card = ({ currentPage }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //PageNum
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
  const [state, setState] = useState(-2);
  const [type, setType] = useState(-2);
  const baseUrl = "https://jira.shlx.vn/v1/rfcards?";
  const finalUrl = `${baseUrl}type=${type}&status=${state}&card_num=${name}&card_name=${id}&page=${page}`;
  useEffect(() => {
    fetchData();
  }, [name, id, state, page, type]);

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
  const handleSelectType = (selectedOption) => {
    //console.log(selectedOption.value);
    setType(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : -1
    );
  };

  //Xoá thẻ
const handleDelete = async (id) => {
  // Hiển thị hộp thoại xác nhận
  const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xoá thẻ có ID là ${id} không?`);
  if (isConfirmed) {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      await axios.delete(`https://jira.shlx.vn/v1/rfcards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Delete successful");
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
};


  //Open Add new card
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
      <div className="m-4 h-[15%]">
        <CardSearch
          onSubmitName={handleNameSubmit}
          onSubmitId={handleIdSubmit}
          onSelectStatus={handleSelectStatus}
          onSelectType={handleSelectType}
          onAddButtonClick={handleAddNewOpen}
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
                    ID thẻ
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Số thẻ
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Loại thẻ
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
                      {startIndex+index}
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-22 flex items-center justify-center font-medium text-blue-700">
                        {element.card_name}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center w-22">
                        {element.card_num}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-15 flex items-center justify-center">
                        {element.type === 2 && <h2>Giáo viên</h2>}
                        {element.type === 1 && <h2>Học viên</h2>}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div
                        className={`w-22 flex items-center justify-center py-1 mx-3 rounded-lg text-white font-bold`}
                      >
                        {element.status === 0 && (
                          <h2 className="bg-green-500 rounded-lg text-white text-xs flex items-center justify-center font-bold px-6 py-0.5">
                            Chưa dùng
                          </h2>
                        )}
                        {element.status === -1 && (
                          <h2 className="bg-slate-800 rounded-lg text-white text-xs flex items-center justify-center font-bold px-6 py-0.5">
                            Đã huỷ
                          </h2>
                        )}
                        {element.status === 1 && (
                          <h2 className="bg-blue-500 rounded-lg text-white text-xs flex items-center justify-center font-bold px-6 py-0.5">
                            Đã dùng
                          </h2>
                        )}
                      </div>
                    </td>
                    <td className="text-xl border sticky right-0 bg-white border-l-black">
                      <div className="flex items-center justify-center w-34 ">
                        <FaUserEdit className="text-blue-500 mr-2" />
                        <button onClick={() => handleDelete(element.id)}>
                          <AiOutlineUserDelete className="text-red-500 mr-2" />
                        </button>
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
            <CardAddNew onClose={handleAddNewClose} />
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

export default Card;
