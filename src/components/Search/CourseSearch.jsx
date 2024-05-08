import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";

const CourseSearch = ({
  onSubmitName,
  onSubmitId,
  onSelectStatus,
}) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const baseUrl = "https://jira.shlx.vn/v1/courses";

  const [selectedCourseOption, setSelectedCourseOption] = useState(null);
  const [selectedStatusOption, setSelectedStatusOption] = useState(null);
  const [selectedSyncOption, setSelectedSyncOption] = useState(null); // Thêm state cho select thứ ba

  const stateOptions = [
    { value: -1, label: "Tất cả" },
    { value: 0, label: "Chưa diễn ra" },
    { value: 1, label: "Học lý thuyết" },
    { value: 2, label: "Học thực hành" },
    { value: 3, label: "Kết thúc" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedStatusOption(selectedOption);
  };

  const handleCourseChange = (selectedOption) => {
    setSelectedCourseOption(selectedOption);
  };

  const handleSyncChange = (selectedOption) => {
    setSelectedSyncOption(selectedOption);
  };

  const handleSubmit = () => {
    if (
      !name &&
      !id &&
      !selectedCourseOption &&
      !selectedStatusOption &&
      !selectedSyncOption
    ) {
      onSubmitName("");
      onSubmitId("");
      onSelectStatus("-1");
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
  };
  const handleReset = () => {
    setName("");
    setId("");
    setSelectedStatusOption(-1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex space-x-2">
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Mã khoá
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-60 p-2.5 h-[38px]"
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Tên khoá
        </label>
        <input
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-60 p-2.5 h-[38px]"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <form>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Trạng thái
        </label>
        <Select
          className="w-40"
          placeholder="Tất cả"
          value={selectedStatusOption}
          onChange={handleChange}
          options={stateOptions}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        />
      </form>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 px-4  my-7 rounded-xl h-[38px] flex justify-center items-center"
        onClick={handleSubmit}
      >
        <FaSearch />
      </button>
      <button className="text-white bg-orange-500 hover:bg-orange-600 px-4  my-7 rounded-xl h-[38px]">
        Import
      </button>
      <button className="text-white bg-green-500 hover:bg-green-500 px-4  my-7 rounded-xl h-[38px]">
        Báo cáo
      </button>
    </div>
  );
};

export default CourseSearch;
