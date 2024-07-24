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
  FaMapMarkedAlt 
} from "react-icons/fa";
import { BiFace } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";



const SessionLog = ({id}) => {
  const nodatafound = assets.nodatafound;
  const loading = assets.loading;
  const car = assets.car;
  const [data, setData] = useState([]);
  const baseUrl = `https://jira.shlx.vn/v1/outdoor-logs?session_id=${id}`;
  const [isLoading, setIsLoading] = useState(true);
  //PageNum
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
      });
      setData(response.data[[0]]);
      // console.log(response);
      console.log(response.data[[0]]);
      //
      // setTotalCount(Math.ceil(response.data.total / 50));
      //
      setIsLoading(false); // Kết thúc tải dữ liệu, ẩn chữ "Đang tải dữ liệu"
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Kết thúc tải dữ liệu, ẩn chữ "Đang tải dữ liệu" nếu có lỗi
    }
  };
  const customIcon = L.icon({
    iconUrl: car,
    iconSize: [100, 100],
    iconAnchor: [50, 50],
    popupAnchor: [0, -32],
  });

  const firstMarkerPosition = [data.lat, data.lng];
  const secondMarkerPosition = [data.lat, data.lng];
  return (
    <div className="w-[100%] h-[100%] overflow-auto">
      <h1>ID: {id}</h1>
      <h1>{data.lat}</h1>
      <div>
        {data.lat && data.lng && (
          <MapContainer
            center={firstMarkerPosition}
            zoom={18}
            scrollWheelZoom={true}
            className="w-[700px] h-[400px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Marker mới */}
            <Marker position={secondMarkerPosition} icon={customIcon}>
              <Popup>
                {data.trainee_name}
              </Popup>
            </Marker>

            {/* Vẽ đường từ marker mới đến marker có sẵn */}
            {/* <Polyline
              positions={[firstMarkerPosition, [data.lat, data.lng]]}
              color="blue"
            /> */}
          </MapContainer>
        )}
      </div>
    </div>
  )
}

export default SessionLog