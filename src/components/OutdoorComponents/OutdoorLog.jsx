import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Thay đổi URL cho phù hợp với hình ảnh của bạn
const customIcon = L.icon({
  iconUrl: require("../assets/car.png"),
  iconSize: [100, 100],
  iconAnchor: [50, 50],
  popupAnchor: [0, -32],
});

const OutdoorLog = ({
  id,
  instructor_name,
  plate,
  startTime,
  trainee_name,
}) => {
  const [data, setData] = useState([]);
  const [latlngs, setLatlngs] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const baseUrl = `https://jira.shlx.vn/v1/outdoor-logs?session_id=${id}`;
      const token = localStorage.getItem("userToken");
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //setData(response.data);
      const filteredData = response.data.filter(
        (item) => item.lat !== 0 && item.lng !== 0
      );
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const positions = data.map((point) => [point.lat, point.lng]);
  const initialPosition =
    positions.length > 0 ? positions[0] : [21.028511, 105.804817];
  return (
    <div>
      <h1 className="text-xl font-semibold">Chi tiết phiên học</h1>
      <div className="mx-0 h-[1px] bg-slate-300"></div>
      <div className="flex space-x-4">
        <div>
          <div className="flex space-x-2">
            <h1 className="font-bold">Học viên:</h1>
            <span>{trainee_name}</span>
          </div>
          <div className="flex space-x-2">
            <h2 className="font-bold">Giáo viên:</h2>
            <span>{instructor_name}</span>
          </div>
        </div>
        <div>
          <div className="flex space-x-2">
            <h2 className="font-bold">Xe:</h2>
            <span>{plate}</span>
          </div>
          <div className="flex space-x-2">
            <h2 className="font-bold">Bắt đầu:</h2>
            <span>{format(new Date(startTime), "dd/MM/yyyy HH:mm:ss")}</span>
          </div>
        </div>
      </div>
      <MapContainer
        center={initialPosition}
        zoom={10}
        scrollWheelZoom={true}
        className="w-[720px] h-[300px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.length > 0 && (
          <>
            {/* Marker cho điểm đầu tiên */}
            <Marker position={[data[0].lat, data[0].lng]} icon={customIcon}>
              <Popup>
                Đầu: Latitude: {data[0].lat}, Longitude: {data[0].lng}
              </Popup>
            </Marker>

            {/* Marker cho điểm cuối cùng */}
            {data.length > 1 && (
              <Marker
                position={[
                  data[data.length - 1].lat,
                  data[data.length - 1].lng,
                ]}
                icon={customIcon}
              >
                <Popup>
                  Cuối: Latitude: {data[data.length - 1].lat}, Longitude:{" "}
                  {data[data.length - 1].lng}
                </Popup>
              </Marker>
            )}
            <Polyline positions={positions} color="blue" />
          </>
        )}
      </MapContainer>
      <div className="mt-4 h-[1px] bg-slate-300"></div>
      <div>
        <h1 className="text-red-400">Lỗi đồng bộ: </h1>
      </div>
      <div className="mt-4 h-[1px] bg-slate-300"></div>
    </div>
  );
};

export default OutdoorLog;
