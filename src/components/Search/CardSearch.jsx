import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";

const CardSearch = ({
  onSubmitName,
  onSubmitId,
  onSelectStatus,
  onSelectType,
  onAddButtonClick,
}) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const baseUrl = "https://jira.shlx.vn/v1/courses";

  const [selectedStatusOption, setSelectedStatusOption] = useState(null);
  const [selectedTypeOption, setSelectedTypeOption] = useState(null);

  const typeOptions = [
    { value: -2, label: "Tất cả" },
    { value: 1, label: "Học viên" },
    { value: 2, label: "Giáo viên" },
  ];
  const stateOptions = [
    { value: -2, label: "Tất cả" },
    { value: 0, label: "Chưa dùng" },
    { value: 1, label: "Đã dùng" },
    { value: -1, label: "Đã huỷ" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedStatusOption(selectedOption);
  };

  const handleTypeChange = (selectedOption) => {
    setSelectedTypeOption(selectedOption);
  };

  const handleSubmit = () => {
    if (!name && !id && !selectedStatusOption && !selectedTypeOption) {
      onSubmitName("");
      onSubmitId("");
      onSelectStatus("-2");
      onSelectType("-2");
    }
    if (name) {
      onSubmitName(name);
      console.log(name);
    }
    if (id) {
      onSubmitId(id);
    }
    if (selectedStatusOption) {
      onSelectStatus(selectedStatusOption);
    }
    if (selectedTypeOption) {
      onSelectType(selectedTypeOption);
    }
  };
  const handleReset = () => {
    setName("");
    setId("");
    setSelectedStatusOption(-1);
    setSelectedTypeOption(0);
  };

  //Add new
  const handleAddButtonClick = () => {
    onAddButtonClick();
  };

  return (
    <div className="flex max-phone:space-x-0 space-x-4 max-phone:flex-col">
      <div className="flex space-x-4  max-phone:space-x-2">
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ID thẻ
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-60 p-2.5 h-[38px] max-phone:w-36"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Số thẻ
          </label>
          <input
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-60 p-2.5 h-[38px] max-phone:w-36"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex space-x-4  max-phone:space-x-2">
        <form>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Loại thẻ
          </label>
          <Select
            className="w-40 max-phone:w-36"
            placeholder="Tất cả"
            value={selectedTypeOption}
            onChange={handleTypeChange}
            options={typeOptions}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </form>
        <form>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Trạng thái
          </label>
          <Select
            className="w-40 max-phone:w-36"
            placeholder="Tất cả"
            value={selectedStatusOption}
            onChange={handleChange}
            options={stateOptions}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </form>
      </div>

      <div className="flex space-x-4  max-phone:space-x-2 pt-6 max-phone:pt-0">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 px-4 my-0.5 rounded-xl h-[38px] flex justify-center items-center"
          onClick={handleSubmit}
        >
          <FaSearch />
        </button>
        <button
          className="text-white bg-green-500 hover:bg-green-500 px-4 my-0.5 rounded-xl h-[38px]"
          onClick={handleAddButtonClick}
        >
          Thêm
        </button>
      </div>
    </div>
  );
};

export default CardSearch;
