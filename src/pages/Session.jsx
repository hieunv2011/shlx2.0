import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { format, addSeconds } from "date-fns";

import nodatafound from "../assets/nodatafound.jpg";
import loadinng from "../assets/loading.gif";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FaUserEdit, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import {
  Footer,
  Location,
  Pagination,
  TeacherAddNew,
  TeacherDetail,
  SessionSearch,
} from "../components";

const Session = ({ currentPage }) => {
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
  const [state, setState] = useState("");
  const [plate, setPlate] = useState("");
  const [imei, setImei] = useState("");
  const [mark, setMark] = useState("-9");
  const [courseState, setCourseState] = useState("");
  const [sync, setSync] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [course, setCourse] = useState("");

  const baseUrl = "https://jira.shlx.vn/v1/outdoor-sessions?";
  const finalUrl = `${baseUrl}ho_va_ten=${name}&plate=${plate}${courseState !== "" ? `&course_status=${courseState}` : `&course_status=-1`}&selected_status=${state}${sync !== "" ? `&synced=${sync}` : ""}${mark !== "" ? `&mark=${mark}` : "-9"}&serial_no=${imei}&recent_end_time=0&page=1${startDate ? `&from_date=${startDate}` : ""}${endDate ? `&to_date=${endDate}` : ""}${course !== "" ? `&course_id=${course}` : ""}`;
  useEffect(() => {
    fetchData();
  }, [name, id, state, plate, imei, mark, courseState,sync, startDate, endDate, course]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(finalUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
      });
      setData(response.data);
      // console.log(response);
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
  const handlePlateSubmit = (submittedPlate) => {
    setPlate(submittedPlate);
  };
  const handleStartDateSubmit = (submittedStartDate) => {
    setStartDate(submittedStartDate);
  };
  const handleEndDateSubmit = (submittedEndDate) => {
    setEndDate(submittedEndDate);
  };
  const handleImeiSubmit = (submittedImei) => {
    setImei(submittedImei);
  };
  const handleSelectStatus = (selectedOption) => {
    setState(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : -1
    );
  };
  const handleSelectCourseStatusOptionSubmit = (selectedOption) => {
    setCourseState(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : -1
    );
  };
  const handleSelectSyncSubmit = (selectedOption) => {
    setSync(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : -1
    );
  };
  const handleSelectMarkSubmit = (selectedOption) => {
    setMark(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : -1
    );
  };
  const handleSelectCourseSubmit = (selectedOption) => {
    setCourse(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : -1
    );
  };
  return (
    <div className="m-4 bg-white w-12/12 space-y-2 h-[95%]">
      <div className="m-4 h-[6%] font-bold text-2xl max-phone:text-[20px] max-phone:pt-2">
        {/* <Location /> */}
        Danh sách phiên học
      </div>
      <div className="mx-4 h-[1px] bg-slate-200"></div>
      <div className="m-4 h-[28%] max-phone:h-[33%] overflow-x-auto">
        <SessionSearch
          onSubmitName={handleNameSubmit}
          onSubmitPlate={handlePlateSubmit}
          onSubmitId={handleIdSubmit}
          onSubmitStartDate={handleStartDateSubmit}
          onSubmitEndDate={handleEndDateSubmit}
          onSelectStatus={handleSelectStatus}
          onSubmitImei={handleImeiSubmit}
          onSelectCourseStatusOption={handleSelectCourseStatusOptionSubmit}
          onSelectSync={handleSelectSyncSubmit}
          onSelectMark={handleSelectMarkSubmit}
          onSelectCourse={handleSelectCourseSubmit}
        />
        <div className="w-full flex justify-end">
          <div>
            <Pagination
              onPageChange={handlePageChange}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
      <div className="mx-4 h-[1px] bg-slate-200"></div>
      <div className="m-4 border border-slate-200 h-[53%] max-phone:h-[44%] overflow-scroll custom-scrollbar">
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
                    Tên học viên
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Tên giáo viên
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Xe
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Thiết bị
                  </th>
                  <th className="text-sm border border-slate-200"> Bắt đầu </th>
                  <th className="text-sm border border-slate-200">Kết thúc</th>
                  <th className="text-sm border border-slate-200">
                    Quãng đường
                  </th>
                  <th className="text-sm border border-slate-200">Thời gian</th>
                  <th className="text-sm border border-slate-200">Giờ đêm</th>
                  <th className="text-sm border border-slate-200">
                    Trạng thái
                  </th>
                  <th className="text-sm border border-slate-200">
                    Failed/FaceId
                  </th>
                  <th className="text-sm border border-slate-200">Đánh dấu</th>
                  <th className="text-sm border border-slate-200">
                    Lỗi đồng bộ
                  </th>
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
                        <Link className="text-blue-800 cursor-pointer font-bold">
                          {element.trainee_name}
                        </Link>
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        <h1 className="text-blue-800 cursor-pointer font-bold">
                          {element.instructor_name}
                        </h1>
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-15 flex items-center justify-center">
                        <h1>
                          {element.vehicle_plate} ({element.vehicle_hang})
                        </h1>
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {element.device_serial}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {format(
                          new Date(element.start_time),
                          "dd/MM/yyyy HH:mm:ss"
                        )}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {format(
                          new Date(element.end_time),
                          "dd/MM/yyyy HH:mm:ss"
                        )}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {(element.distance / 1000).toFixed(3)}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {`${String(
                          Math.floor(element.duration / 3600)
                        ).padStart(2, "0")}:${String(
                          Math.floor((element.duration % 3600) / 60)
                        ).padStart(2, "0")}:${String(
                          element.duration % 60
                        ).padStart(2, "0")}`}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {`${String(
                          Math.floor(element.night_duration / 3600)
                        ).padStart(2, "0")}:${String(
                          Math.floor((element.night_duration % 3600) / 60)
                        ).padStart(2, "0")}:${String(
                          element.night_duration % 60
                        ).padStart(2, "0")}`}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {element.state === 2 ? "Đã kết thúc" : ""}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {element.faceid_failed_count} /{" "}
                        {element.faceid_success_count}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center">
                        {element.user_mark === 1 && (
                          <AiOutlineCheckCircle className="text-2xl text-green-600" />
                        )}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100 w-40">
                      <div className="flex items-center justify-center">
                        {element.sync_error}
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
      <Footer />
      {/* {isAddNewOpen && (
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
            <TeacherAddNew />
            <button
              className="absolute top-0 right-0 m-2 text-red-500 text-2xl"
              onClick={handleAddNewClose}
            >
              <FaTimesCircle />
            </button>
          </motion.div>
        </motion.div>
      )} */}
      {/* {isDetailOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }} // Thiết lập giá trị ban đầu cho opacity
          animate={{ opacity: 1 }} // Thiết lập giá trị cuối cùng cho opacity (tức là khi div xuất hiện)
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleDetailClose}
          ></div>
          <motion.div className="relative bg-white p-4 rounded-lg shadow-lg w-[70%] h-[70%] max-phone:h-fit">
            <TeacherDetail />
            <button
              className="absolute top-0 right-0 m-2 text-red-500 text-2xl"
              onClick={handleDetailClose}
            >
              <FaTimesCircle />
            </button>
          </motion.div>
        </motion.div>
      )} */}
    </div>
  );
};

export default Session;
