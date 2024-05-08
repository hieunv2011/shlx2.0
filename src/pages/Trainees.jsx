import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";

import nodatafound from "../assets/nodatafound.jpg";
import loadinng from "../assets/loading.gif";
import {
  FaCheckCircle,
  FaUserEdit,
  FaFingerprint,
  FaTimesCircle,
} from "react-icons/fa";
import { BiFace } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";

import {
  FaceRegister,
  FingerPrint,
  InformationDetail,
  Location,
  Pagination,
  SessionDetail,
  TraineesSearch,
} from "../components";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Trainees = ({ currentPage }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //PageNum
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };
  //Seacrh const
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [synced, setSynced] = useState(-1);
  const [state, setState] = useState(-1);
  const [course, setCourse] = useState("0");
  const baseUrl = "https://jira.shlx.vn/v1/trainees?";
  const finalUrl = `${baseUrl}course_id=${course}&province_id=0&rf_card_name=${id}&synced=${synced}&status=${state}&name=${name}&page=${page}`;
  useEffect(() => {
    fetchData();
  }, [name, id, synced, course, page]);

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
      setIsLoading(false); // Kết thúc tải dữ liệu, ẩn chữ "Đang tải dữ liệu"
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Kết thúc tải dữ liệu, ẩn chữ "Đang tải dữ liệu" nếu có lỗi
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
  const handleSelectSynced = (selectedOption) => {
    setSynced(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : -1
    );
    //console.log(selectedOption.value);
  };
  const handleSubmitCourse = (selectedOption) => {
    setCourse(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : 0
    );
    //console.log(selectedOption.value);
  };

  //Mở 3 modal mới
  const [isInformationDetailVisible, setIsInformationDetailVisible] =
    useState(false);

  const handleEditButtonClick = () => {
    setIsInformationDetailVisible(!isInformationDetailVisible);
  };
  const [isFingerVisible, setIsFingerVisible] = useState(false);

  const handleFingerButtonClick = () => {
    setIsFingerVisible(!isFingerVisible);
  };
  const [isFaceVisible, setIsFaceVisible] = useState(false);

  const handleFaceClick = () => {
    setIsFaceVisible(!isFaceVisible);
  };
  const [isSessionVisible, setIsSessionVisible] = useState(false);
  const handleNameClick = () => {
    setIsSessionVisible(!isSessionVisible);
  };

  return (
    <div className="m-4 bg-white w-12/12 space-y-2 h-[95%]">
      <div className="m-4 h-[6%]">
        <Location />
      </div>
      <div className="mx-4 h-[1px] bg-slate-200"></div>
      <div className="m-4 h-[15%]">
        <TraineesSearch
          onSubmitName={handleNameSubmit}
          onSubmitId={handleIdSubmit}
          onSelectStatus={handleSelectStatus}
          onSelectSynced={handleSelectSynced}
          onSubmitCourse={handleSubmitCourse}
        />
        <div className="mt-[-25px] absolute right-8">
          <Pagination onPageChange={handlePageChange} totalCount={totalCount}/>
        </div>
      </div>
      <div className="mx-4 h-[1px] bg-slate-200"></div>
      <div className="m-4 border border-slate-200 h-[65%] overflow-scroll custom-scrollbar">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <img src={loadinng} alt="loading..." className="" />
          </div>
        ) : totalCount === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <img src={nodatafound} alt="Không có dữ liệu" className="w-96" />
            <p className="">Không tìm thấy dữ liệu</p>
          </div>
        ) : (
          <div className="">
            <table className="w-full border-separate border-spacing-0">
              <thead className="bg-slate-100 sticky top-0 z-50">
                <tr className="">
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  ></th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  >
                    Họ và tên
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  >
                    Ảnh
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  >
                    Mã đăng ký
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  >
                    Hạng
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  >
                    Giới tính
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  >
                    Ngày sinh
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  >
                    Số CMT
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  >
                    ID thẻ
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  >
                    Số thẻ
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    colSpan={5}
                  >
                    Thực hành
                  </th>
                  <th className="text-sm border border-slate-200" colSpan={2}>
                    Đồng bộ phiên học
                  </th>
                  <th className="text-sm border border-slate-200" rowSpan={2}>
                    ĐỒNG BỘ
                  </th>
                  <th
                    className="text-sm sticky right-0 bg-slate-100 border border-l-black border-b-slate-200"
                    rowSpan={2}
                  >
                    Thao tác
                  </th>
                </tr>
                <tr>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Giờ
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    KM
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Thiếu
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Giờ đêm
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Giờ TĐ
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    border
                    border-slate-200
                  >
                    Giờ
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Km
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((element, index) => (
                  <tr key={index}>
                    <td className="text-xs ">
                      <div className="w-1 flex items-center">
                        {index + 1}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-40 h-[1px]0 flex items-center">
                        <Link className="text-blue-800 font-medium"
                        onClick={handleNameClick}>
                          {element.ho_va_ten}
                        </Link>
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="flex items-center justify-center">
                        <Link onClick={() => console.log("Ấn ảnh")}>
                          <img
                            className="rounded-full w-8 h-9"
                            src={element.anh_chan_dung}
                            alt={`Avatar ${element.ho_va_ten}`}
                          />
                        </Link>
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-40 h-[1px]0 flex items-center justify-center">
                        {element.ma_dk}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-15 flex items-center justify-center">
                        {element.hang_gplx}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-15 flex items-center justify-center">
                        {element.gioi_tinh === "F" ? "Nữ" : "Nam"}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-15 flex items-center justify-center">
                        {format(new Date(element.ngay_sinh), "dd/MM/yyyy")}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-15 flex items-center justify-center">
                        {element.so_cmt}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-15 flex items-center justify-center">
                        {element.rfid_card_name}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-15 flex items-center justify-center">
                        {element.rfid_card}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-15 flex items-center justify-center">
                        {(element.outdoor_hour / 3600).toFixed(3)}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-15 flex items-center justify-center">
                        {(element.outdoor_distance / 1000).toFixed(3)}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-15 flex items-center justify-center">
                        {(
                          element.required_hour -
                          element.outdoor_hour / 3600
                        ).toFixed(3)}
                        /
                        {(
                          element.required_distance -
                          element.outdoor_distance / 1000
                        ).toFixed(3)}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-15 flex items-center justify-center">
                        {(element.night_duration / 3600).toFixed(3)}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-15 flex items-center justify-center">
                        {(element.auto_duration / 3600).toFixed(3)}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-15 flex items-center justify-center">
                        {(element.synced_outdoor_hours / 3600).toFixed(3)}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-15 flex items-center justify-center">
                        {(element.synced_outdoor_distance / 1000).toFixed(3)}
                      </div>
                    </td>
                    <td className="text-xs">
                      <div className="w-15 flex items-center justify-center">
                        {element.synced ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <IoIosCloseCircle className="text-xl text-red-600" />
                        )}
                      </div>
                    </td>
                    <td className="text-xl sticky right-0 bg-white border-l border-black">
                      <div className="flex items-center justify-center w-36">
                        <FaUserEdit
                          className="text-blue-500 mr-2 cursor-pointer hover:text-slate-500 edit"
                          onClick={handleEditButtonClick}
                        />
                        <Tooltip
                          anchorSelect=".edit"
                          place="bottom-end"
                          className="text-xs"
                          style={{ fontSize: "15px" }}
                        >
                          Chỉnh sửa thông tin
                        </Tooltip>
                        <FaFingerprint
                          className="text-green-500 mr-2 cursor-pointer hover:text-slate-500 finger"
                          onClick={handleFingerButtonClick}
                        />
                        <Tooltip
                          anchorSelect=".finger"
                          place="bottom-end"
                          className="text-xs"
                          style={{ fontSize: "15px" }}
                        >
                          Đăng ký vân tay
                        </Tooltip>
                        <BiFace
                          className="text-red-500 cursor-pointer hover:text-slate-500 face"
                          onClick={handleFaceClick}
                        />
                        <Tooltip
                          anchorSelect=".face"
                          place="bottom-end"
                          className="text-xs"
                          style={{ fontSize: "15px" }}
                        >
                          Đăng ký khuôn mặt
                        </Tooltip>
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
      {isInformationDetailVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }} // Thiết lập giá trị ban đầu cho opacity
          animate={{ opacity: 1 }} // Thiết lập giá trị cuối cùng cho opacity (tức là khi div xuất hiện)
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleEditButtonClick}
          ></div>
          <motion.div className="relative bg-white p-4 rounded-lg shadow-lg w-[50%] h-[70%]">
            <InformationDetail />
            <button
              className="absolute top-0 right-0 m-2 text-red-500"
              onClick={handleEditButtonClick}
            >
              <FaTimesCircle />
            </button>
          </motion.div>
        </motion.div>
      )}
      {isFingerVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }} // Thiết lập giá trị ban đầu cho opacity
          animate={{ opacity: 1 }} // Thiết lập giá trị cuối cùng cho opacity (tức là khi div xuất hiện)
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleEditButtonClick}
          ></div>
          <motion.div className="relative bg-white p-4 rounded-lg shadow-lg w-[50%] h-[70%]">
            <FingerPrint />
            <button
              className="absolute top-0 right-0 m-2 text-red-500"
              onClick={handleFingerButtonClick}
            >
              <FaTimesCircle />
            </button>
          </motion.div>
        </motion.div>
      )}
      {isFaceVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }} // Thiết lập giá trị ban đầu cho opacity
          animate={{ opacity: 1 }} // Thiết lập giá trị cuối cùng cho opacity (tức là khi div xuất hiện)
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleEditButtonClick}
          ></div>
          <motion.div className="relative bg-white p-4 rounded-lg shadow-lg w-[50%] h-[70%]">
            <FaceRegister />
            <button
              className="absolute top-0 right-0 m-2 text-red-500 text-2xl"
              onClick={handleFaceClick}
            >
              <FaTimesCircle />
            </button>
          </motion.div>
        </motion.div>
      )}
      {isSessionVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }} // Thiết lập giá trị ban đầu cho opacity
          animate={{ opacity: 1 }} // Thiết lập giá trị cuối cùng cho opacity (tức là khi div xuất hiện)
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleEditButtonClick}
          ></div>
          <motion.div className="relative bg-white p-4 rounded-lg shadow-lg w-[50%] h-[70%]">
            <SessionDetail />
            <button
              className="absolute top-0 right-0 m-2 text-red-500 text-2xl"
              onClick={handleNameClick}
            >
              <FaTimesCircle />
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Trainees;
