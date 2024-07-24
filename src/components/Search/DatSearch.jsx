import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";

const DatSearch = ({
  onSubmitName,
  onSubmitId,
  onSelectStatus,
  onSubmitMainboard, 
  onAddButtonClick,
}) => {
  const [name, setName] = useState("");
  const [mainboard, setMainboard] = useState("");
  const [id, setId] = useState("");

  const [selectedCourseOption, setSelectedCourseOption] = useState(null);
  const [selectedStatusOption, setSelectedStatusOption] = useState(null);
  const [selectedSyncOption, setSelectedSyncOption] = useState(null); // Thêm state cho select thứ ba

  const stateOptions = [
    { value: -1, label: "Tất cả" },
    { value: 1, label: "Đang hoạt động" },
    { value: 0, label: "Không hoạt động" },
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
      !mainboard &&
      !selectedCourseOption &&
      !selectedStatusOption &&
      !selectedSyncOption
    ) {
      onSubmitName("");
      onSubmitMainboard("");
      onSubmitId("");
      onSelectStatus("-1");
    }
    if (name) {
      onSubmitName(name);
    }
    if (mainboard) {
      onSubmitMainboard(mainboard);
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

  //Add new
  const handleAddButtonClick = () => {
    onAddButtonClick();
  };

  return (
    <div className="flex space-x-2 max-phone:flex-col max-phone:space-x-0">
      <div className="flex space-x-2 max-phone:space-x-1">
        <div className="flex flex-col">
          <label>Tên máy</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-48 max-phone:w-40 border border-slate-500 h-10 rounded-lg "
          />
        </div>
        <div className="flex flex-col">
          <label>Số Serial</label>
          <input
            type="text"
            onChange={(e) => setId(e.target.value)}
            className="w-48 max-phone:w-40 border border-slate-500 h-10 rounded-lg"
          />
        </div>
      </div>

      <div className="flex space-x-2 max-phone:space-x-1">
        <div className="flex flex-col">
          <label>Mainboard</label>
          <input
            type="text"
            onChange={(e) => setMainboard(e.target.value)}
            className="w-48 max-phone:w-40 border border-slate-500 h-10 rounded-lg"
          />
        </div>
        <form>
          <label>Trạng thái</label>
          <Select
            placeholder="Tất cả"
            value={selectedStatusOption}
            onChange={handleChange}
            options={stateOptions}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            className="w-48 max-phone:w-40"
          />
        </form>
      </div>

      <div className="mt-6 flex space-x-2 ml-2 max-phone:mt-2">
        <button onClick={handleSubmit} className="h-9 w-10 bg-blue-500 rounded-lg text-white flex justify-center items-center ">
          <FaSearch />
        </button>
        <button onClick={handleAddButtonClick} className="h-9 w-32 bg-green-400 rounded-lg text-white">Thêm mới</button>
      </div>
    </div>

    // <div className="flex sm:max-lg:flex-col">
    //   <div className="h-20 w-80 bg-red-700">ê</div>
    //   <div className="h-20 w-80 bg-blue-700"></div>
    //   <div className="h-20 w-80 bg-yellow-700"></div>
    // </div>
  );
};

export default DatSearch;
