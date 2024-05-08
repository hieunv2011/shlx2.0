import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import axios from "axios";
import { FaImage } from "react-icons/fa6";
import { format } from "date-fns";

const TeacherAddNew = () => {
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    id_card: "",
    address: "",
    driving_license_no: "",
    teaching_license_no: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };
  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
    setFormData({ ...formData, birthday: formattedDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      await axios.post("https://jira.shlx.vn/v1/instructors", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Thêm giáo viên mới</h2>
      <div className="h-[1px] bg-slate-500 w-full"></div>
      <div className="m-4">
        <form onSubmit={handleSubmit} className="flex space-x-4 h-full w-full">
          <div className="mb-4 w-72 h-[400px] flex justify-center items-center border border-slate-400 rounded-md">
            <div
              onClick={() => document.getElementById("file").click()}
              className="cursor-pointer text-8xl text-blue-800 hover:text-blue-500"
            >
              <FaImage />
            </div>
            <input
              id="file"
              name="image"
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            {/* <label className=" text-sm font-medium text-gray-700">Ảnh:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="h-80 mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-300"
          /> */}
          </div>
          <div className="space-x-2">
            <div className="flex space-x-2">
              <div>
                <div className="mb-4 w-50">
                  <label className=" text-sm font-medium text-gray-700">
                    Họ và tên:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-300"
                  />
                </div>
                <div className="mb-4 w-50">
                  <label className=" text-sm font-medium text-gray-700">
                    Ngày sinh:
                  </label>
                  <DatePicker
                    selected={formData.birthday}
                    onChange={handleDateChange}
                    locale={vi}
                    dateFormat="dd/MM/yyyy"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-300"
                  />
                </div>
                <div className="mb-4 w-50">
                  <label className=" text-sm font-medium text-gray-700">
                    ID Card:
                  </label>
                  <input
                    type="text"
                    name="id_card"
                    value={formData.id_card}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-300"
                  />
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className=" text-sm font-medium text-gray-700">
                    Địa chỉ:
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-300"
                  />
                </div>
                <div className="mb-4">
                  <label className=" text-sm font-medium text-gray-700">
                    GPLX:
                  </label>
                  <input
                    type="text"
                    name="driving_license_no"
                    value={formData.driving_license_no}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-300"
                  />
                </div>
                <div className="mb-4">
                  <label className=" text-sm font-medium text-gray-700">
                    GPTL:
                  </label>
                  <input
                    type="text"
                    name="teaching_license_no"
                    value={formData.teaching_license_no}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-300"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="h-10 w-20 bg-blue-800 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-300"
              onClick={handleSubmit}
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherAddNew;
