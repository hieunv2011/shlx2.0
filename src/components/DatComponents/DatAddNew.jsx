import React, { useState } from "react";
import axios from 'axios';

const DatAddNew = () => {
  const [formData, setFormData] = useState({
    name: "",
    serial_no: "",
    board_serial: "",
    sim: "",
    manufacture: "",
    status: false,
    config: "",
    branch_id: 0,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("userToken");
    // Replace `your-api-endpoint` with the actual endpoint you want to send data to
    const url = 'https://jira.shlx.vn/v1/tracking_devices';
    
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log(response.data); // Log response data if needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl w-80 font-semibold">Thêm thiết bị Dat mới</h2>
      <form onSubmit={handleSubmit} className="h-full w-full border border-slate-300 rounded-lg">
        <div className="flex justify-center flex-col m-4">
          <div className="flex space-x-10">
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-base w-52">
                  Tên thiết bị
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block h-8 w-52 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border border-slate-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-base w-52">
                  Sim
                </label>
                <input
                  type="text"
                  id="sim"
                  name="sim"
                  value={formData.sim}
                  onChange={handleChange}
                  className="mt-1 block h-8 w-52 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border border-slate-200"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-base w-52">
                  Số Serial
                </label>
                <input
                  type="text"
                  id="serial_no"
                  name="serial_no"
                  value={formData.serial_no}
                  onChange={handleChange}
                  className="mt-1 block h-8 w-52 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border border-slate-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-base w-52">
                  Manufacrute
                </label>
                <input
                  type="text"
                  id="manufacture"
                  name="manufacture"
                  value={formData.manufacture}
                  onChange={handleChange}
                  className="mt-1 block h-8 w-52 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border border-slate-200"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-base w-52">
                  Mainboard
                </label>
                <input
                  type="text"
                  id="board_serial"
                  name="board_serial"
                  value={formData.board_serial}
                  onChange={handleChange}
                  className="mt-1 block h-8 w-52 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border border-slate-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-base w-52">
                  Ghi chú
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block h-8 w-52 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border border-slate-200"
                />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                id="status"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Trạng thái</span>
            </label>
          </div>
        </div>
      </form>
      <div>
        <button
          onClick={handleSubmit}
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold mt-2 py-2 px-4 rounded"
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default DatAddNew;

{
  /* <div className="mt-4">
<label className="inline-flex items-center">
  <input
    type="checkbox"
    id="status"
    name="status"
    checked={formData.status}
    onChange={handleChange}
    className="form-checkbox h-5 w-5 text-blue-600"
  />
  <span className="ml-2 text-gray-700">Trạng thái</span>
</label>
</div> */
}
