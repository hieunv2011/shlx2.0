import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import axios from "axios";
import { FaImage } from "react-icons/fa6";
import { format,addDays, add } from "date-fns";

const TeacherDetail = () => {
    
  const [formData, setFormData] = useState({
    // name: "",
    instructor_id: "0",
    from_date: new Date(),
    to_date: addDays(new Date(),1),
    vehicle_id: "0",
    device_id: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFromDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd HH:mm:ssxxx"); // Chuyển đổi định dạng
    console.log(formattedDate);
    var encodedDate = encodeURIComponent(formattedDate);
    console.log(encodedDate);
    // setFormData({ ...formData, from_date: encodedDate});
  };
  const handleToDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd HH:mm:ssxxx"); // Chuyển đổi định dạng
    // const encodedDate = encodeURIComponent(formattedDate);
    // setFormData({ ...formData, to_date: encodedDate });
  };
//   console.log(formData);
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const token = localStorage.getItem("userToken");
  //       const formDataToSend = new FormData();
  //       for (let key in formData) {
  //         formDataToSend.append(key, formData[key]);
  //       }
  //       await axios.post("https://jira.shlx.vn/v1/instructors", formDataToSend, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       console.log("Data submitted successfully");
  //     } catch (error) {
  //       console.error("Error submitting data:", error);
  //     }
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");
      const params = new URLSearchParams(formData);
      const url = `https://jira.shlx.vn/v1/instructor-outdoor-sessions?${params.toString()}`;
      console.log(url);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data retrieved successfully:", response.data);
      // Xử lý dữ liệu trả về ở đây
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Báo cáo theo giáo viên</h2>
      <div className="h-[1px] bg-slate-500 w-full"></div>
      <div className="m-4">
        <form onSubmit={handleSubmit} className="flex space-x-4 h-full w-full">
          {/* <div className="mb-4 w-72 h-[400px] flex justify-center items-center border border-slate-400 rounded-md">
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
          </div> */}
          <div className="space-x-2">
            <div className="min-phone:flex-col space-x-2 flex flex-row">
              <div>
                <div className="mb-4">
                  <label className=" text-sm font-medium text-gray-700">
                    Họ và tên:
                  </label>
                  <input
                    type="text"
                    name="name"
                    // value={formData.name}
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
                    // value={formData.driving_license_no}
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
                    // value={formData.teaching_license_no}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-300"
                  />
                </div>
                <div className="mb-4">
                  <label className=" text-sm font-medium text-gray-700 flex">
                    Từ ngày:
                  </label>
                  <DatePicker
                    selected={formData.from_date}
                    onChange={handleFromDateChange}
                    locale={vi}
                    dateFormat="dd/MM/yyyy"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-300"
                  />
                </div>
                <div className="mb-4">
                  <label className=" text-sm font-medium text-gray-700 flex">
                    Đến ngày:
                  </label>
                  <DatePicker
                    selected={formData.to_date}
                    onChange={handleToDateChange}
                    locale={vi}
                    dateFormat="dd/MM/yyyy"
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
              Tìm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherDetail;
