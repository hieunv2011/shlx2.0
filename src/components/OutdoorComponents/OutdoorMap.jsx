import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const OutdoorMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get("https://jira.shlx.vn/v1/vehicles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.items);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const customIcon = L.icon({
    iconUrl: require("../assets/car.png"),
    iconSize: [100, 100],
    iconAnchor: [50, 50],
    popupAnchor: [0, -32],
  });

  const initialPosition = [21.028511, 105.804817];

  return (
    <div className="flex">
      <MapContainer
        center={initialPosition}
        zoom={10}
        scrollWheelZoom={true}
        className="w-[1200px] h-[580px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors. Map bên thứ 3- Liên hệ ngay nếu phát hiện vấn đề về chủ quyền biển đảo'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((element, index) => (
          element.state && element.state.lat != null && element.state.lng != null && (
            <Marker
              key={index}
              position={[element.state.lat, element.state.lng]}
              icon={customIcon}
            >
              <Popup>{element.state.trainee_name} {element.plate}</Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default OutdoorMap;
