import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { format } from "date-fns";
import assets from "../../assets";

import {
  FaCheckCircle,
  FaUserEdit,
  FaFingerprint,
  FaTimesCircle,
} from "react-icons/fa";
import { BiFace } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const SessionDetail = ({ selectedId, selectedName }) => {
  const nodatafound = assets.nodatafound;
  const loading = assets.loading;
  const [data, setData] = useState([]);
  const baseUrl = `https://jira.shlx.vn/v1/outdoor-sessions?trainee_id=${selectedId}`;
  const [isLoading, setIsLoading] = useState(true);
  //PageNum
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };
  useEffect(() => {
    fetchData();
  }, [selectedId]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
      });
      setData(response.data);
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

  return (
    <div>
      <div>
        <div className="text-2xl font-bold text-blue-800">{selectedName}</div>
        <div className="flex space-x-4">
          <div>Số phút/Quãng đường</div>
          <div>Quãng đường HT/ĐB/CKT</div>
          <div>Giờ/Đ/TĐ</div>
        </div>
      </div>
      <div className="overflow-auto h-96 custom-scrollbar">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <img src={loading} alt="loading..." className="" />
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
                  >
                    Ngày/giờ
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  >
                    Xe
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  >
                    Quãng đường
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  >
                    Thời gian
                  </th>
                  <th
                    className="text-sm px-6 py-3 border border-slate-200"
                    rowSpan={2}
                  >
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((element, index) => (
                  <tr key={index}>
                    <td className="text-xs px-8 py-4">
                      <div className="w-36 flex justify-center">
                        {format(
                          new Date(element.start_time),
                          "dd/MM/yyyy HH:mm"
                        )}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-40 h-[1px]0 flex justify-center">
                        {element.vehicle_plate} ({element.vehicle_hang})
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-40 h-[1px]0 flex justify-center">
                        {`${(element.distance / 1000).toFixed(2)} km`}
                      </div>
                    </td>
                    <td className="text-xs ">
                      <div className="w-40 h-[1px]0 flex justify-center">
                        {element.end_time
                          ? new Date(
                              new Date(element.end_time) -
                                new Date(element.start_time)
                            )
                              .toISOString()
                              .substr(11, 8)
                          : "00:00:00"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionDetail;
