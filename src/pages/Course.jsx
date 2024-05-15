import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";

import nodatafound from "../assets/nodatafound.jpg";
import loadinng from "../assets/loading.gif";
import { FaCheckCircle, FaUserEdit, FaFingerprint } from "react-icons/fa";
import { BiFace } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import { TbReload } from "react-icons/tb";


import { Location, Pagination, CourseSearch, Footer } from "../components";

const Course = ({ currentPage }) => {
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
  const baseUrl = "https://jira.shlx.vn/v1/courses?";
  const finalUrl = `${baseUrl}&name=${name}&status=${state}&ma=${id}&page=${page}`;
  useEffect(() => {
    fetchData();
  }, [name, id,state,page]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
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
      //
      setTotalCount(response.data.page);
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
  return (
    <div className="m-4 bg-white w-12/12 space-y-2 h-[95%]">
      <div className="m-4 h-[6%]">
        <Location />
      </div>
      <div className="mx-4 h-[1px] bg-slate-200"></div>
      <div className="m-4 h-[15%] max-phone:h-[33%] overflow-x-auto">
        <CourseSearch
          onSubmitName={handleNameSubmit}
          onSubmitId={handleIdSubmit}
          onSelectStatus={handleSelectStatus}

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
                    Mã
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Tên khoá
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Hạng
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Hạng GP
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Số BCI
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Ngày BCI
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Khai giảng
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Bế giảng
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    Số HS
                  </th>
                  <th className="text-sm px-6 py-3 border border-slate-200">
                    QĐKG
                  </th>
                  <th className="text-sm border border-slate-200">Thời gian</th>
                  <th className="text-sm border border-slate-200" rowSpan={2}>
                    Trạng thái
                  </th>
                  <th className="text-sm border border-slate-200" rowSpan={2}>
                    Đồng bộ
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
                      <Link to={`/trainees/${element.ma_khoa_hoc}`}>{element.ma_khoa_hoc}</Link>
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="flex items-center justify-center w-60">
                        {element.ten_khoa_hoc}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-15 flex items-center justify-center">
                        {element.ma_hang_dao_tao}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-15 flex items-center justify-center">
                        {element.hang_gplx}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-32 flex items-center justify-center">
                        {element.so_bci}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-24 flex items-center justify-center">
                        {format(new Date(element.ngay_bci), "dd/MM/yyyy")}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-24 flex items-center justify-center">
                        {format(
                          new Date(element.ngay_khai_giang),
                          "dd/MM/yyyy"
                        )}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-24 flex items-center justify-center">
                        {format(new Date(element.ngay_be_giang), "dd/MM/yyyy")}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-15 flex items-center justify-center">
                        {element.so_hoc_sinh}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-28 flex items-center justify-center">
                        {element.so_qd_kg}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-15 flex items-center justify-center">
                        {element.thoi_gian_dt}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-48 flex items-center justify-center">
                        {element.status === 3 && (
                          <h2 className="bg-green-500 rounded-lg text-white text-xs flex items-center justify-center font-bold px-6 py-0.5">
                            Kết thúc
                          </h2>
                        )}
                        {element.status === 2 && (
                          <h2 className="bg-blue-500 rounded-lg text-white text-xs flex items-center justify-center font-bold px-6 py-0.5">
                            Học thực hành
                          </h2>
                        )}
                        {element.status === 0 && (
                          <h2 className="bg-slate-500 rounded-lg text-white text-xs flex items-center justify-center font-bold px-6 py-0.5">
                            Chưa diễn ra
                          </h2>
                        )}
                      </div>
                    </td>
                    <td className="text-xs border border-slate-100">
                      <div className="w-20 flex items-center justify-center">
                        {element.synced ? (
                          <FaCheckCircle className="text-xl text-green-500" />
                        ) : (
                          <IoIosCloseCircle className="text-xl text-red-600" />
                        )}
                      </div>
                    </td>
                    <td className="text-xl border sticky right-0 bg-white border-l-black">
                      <div className="flex items-center justify-center w-36 ">
                        <FaUserEdit className="text-blue-500 mr-2" />
                        <TbReload className="text-green-500 mr-2" />
                        <IoIosCloseCircle className="text-red-500" />
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
    </div>
  );
};

export default Course;
