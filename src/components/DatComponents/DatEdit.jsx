import React, { useState, useEffect } from "react";
import axios from "axios";

function DatEdit({ selectedId }) {
  //Get Data of clicked 
  const [data, setData] = useState([]);
  const baseUrl = "https://jira.shlx.vn/v1/tracking_devices/";
  const finalUrl = `${baseUrl}/${selectedId}`;
  useEffect(() => {
    fetchData();
  }, [selectedId]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); 
      const response = await axios.get(
        finalUrl,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Add other headers if needed
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    checkbox: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Gửi dữ liệu đi từ đây
  };

  return (
    <div>
      <h1 className="text-2xl pl-3">Thông tin thiết bị</h1>
    <form
      onSubmit={handleSubmit}
      className="mx-4 mt-4 border border-slate-300 rounded-xl"
    >
      <div className="m-4">
        <div className="flex space-x-4 justify-center w-full">
          <div>
            <div className="mb-4 w-72">
              <label htmlFor="input1" className="text-gray-700">
                Tên
              </label>
              <input
                type="text"
                id="input1"
                name="input1"
                value={formData.input1}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4 w-72">
              <label htmlFor="input2" className=" text-gray-700">
                Serial
              </label>
              <input
                type="text"
                id="input2"
                name="input2"
                value={formData.input2}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4 w-72">
              <label htmlFor="input3" className=" text-gray-700">
                Mainboard
              </label>
              <input
                type="text"
                id="input3"
                name="input3"
                value={formData.input3}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
          <div>
            <div className="mb-4 w-72">
              <label htmlFor="input4" className=" text-gray-700">
                Sim
              </label>
              <input
                type="text"
                id="input4"
                name="input4"
                value={formData.input4}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4 w-72">
              <label htmlFor="input5" className=" text-gray-700">
                MANUFACTURE
              </label>
              <input
                type="text"
                id="input5"
                name="input5"
                value={formData.input5}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4 w-72">
              <label htmlFor="input6" className=" text-gray-700">
                Ghi chú
              </label>
              <input
                type="text"
                id="input6"
                name="input6"
                value={formData.input6}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
        </div>
        {/* Checkbox */}
        <div className="mb-4 w-72 ml-14 items-center flex space-x-2">
          <input
            type="checkbox"
            id="checkbox"
            name="checkbox"
            checked={formData.checkbox}
            onChange={handleChange}
            className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="checkbox" className="text-gray-700">
            Đang hoạt động
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-14"
        >
          Xác nhận
        </button>
      </div>
    </form>
    </div>
  );
}

export default DatEdit;
