import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";

const TeaSearch = ({
  onSubmitName,
  onSubmitId,
  onSelectStatus,
  onSubmitGplx,
  onSubmitGpdt,
  onAddButtonClick,
}) => {
  const [name, setName] = useState("");
  const [gplx, setGplx] = useState("");
  const [gpdt, setGpdt] = useState("");
  const [id, setId] = useState("");

  const [selectedCourseOption, setSelectedCourseOption] = useState(null);
  const [selectedStatusOption, setSelectedStatusOption] = useState(null);
  const [selectedSyncOption, setSelectedSyncOption] = useState(null); // Thêm state cho select thứ ba

  const stateOptions = [
    { value: -1, label: "Tất cả" },
    { value: 0, label: "Lỗi" },
    { value: 1, label: "Thành công" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedStatusOption(selectedOption);
  };
  const handleSubmit = () => {
    if (!name && !id && !gpdt && !gplx && !selectedStatusOption) {
      onSubmitName("");
      onSubmitGpdt("");
      onSubmitGplx("");
      onSubmitId("");
      onSelectStatus("-1");
    }
    if (name) {
      onSubmitName(name);
    }
    if (gplx) {
      onSubmitGplx(gplx);
    }
    if (gpdt) {
      onSubmitGpdt(gpdt);
    }
    if (id) {
      onSubmitId(id);
    }
    if (selectedStatusOption) {
      onSelectStatus(selectedStatusOption);
    }
  };
  const handleReset = () => {
    setName("");
    setId("");
    setSelectedStatusOption(-1);
  };
  const handleAddButtonClick = () => {
    onAddButtonClick();
  };
  return (
    <div className="flex max-phone:flex-col space-x-2 max-phone:space-x-0">
      <div className="max-phone:flex max-phone:space-x-2">
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Họ và tên
          </label>
          <input
            type="text"
            className="max-phone:w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-60 p-2.5 h-[38px]"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Chứng minh thư
          </label>
          <input
            type="text"
            id="default-input"
            className="max-phone:w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-40 p-2.5 h-[38px]"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
      </div>

      <div className="max-phone:flex max-phone:space-x-2">
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Giấy phép lái xe
          </label>
          <input
            type="text"
            id="default-input"
            className="max-phone:w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-40 p-2.5 h-[38px]"
            onChange={(e) => setGplx(e.target.value)}
          />
        </div>
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Giấy phép đào tạo
          </label>
          <input
            type="text"
            id="default-input"
            className="max-phone:w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-40 p-2.5 h-[38px]"
            onChange={(e) => setGpdt(e.target.value)}
          />
        </div>
      </div>

      <div className="max-phone:flex max-phone:space-x-1">
        <form>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Đồng bộ
          </label>
          <Select
            className="w-40 max-phone:w-3"
            placeholder="Tất cả"
            value={selectedStatusOption}
            onChange={handleChange}
            options={stateOptions}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </form>
        <button1
          className="text-white bg-blue-700 hover:bg-blue-800 px-4  my-1 rounded-xl h-[38px] flex justify-center items-center"
          onClick={handleSubmit}
        >
          <FaSearch />
        </button1>
        <button
          className="text-white bg-green-500 hover:bg-green-500 px-4  my-1 rounded-xl h-[38px]"
          onClick={handleAddButtonClick}
        >
          Thêm mới
        </button>
      </div>
    </div>
  );
};

export default TeaSearch;
