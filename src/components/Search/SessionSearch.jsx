import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { formatISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
const SessionSearch = ({
  onSubmitName,
  onSubmitPlate,
  onSubmitId,
  onSubmitStartDate,
  onSubmitEndDate,
  onSelectStatus,
  onSubmitImei,
  onAddButtonClick,
  onSelectCourseStatusOption,
  onSelectSync,
  onSelectMark,
  onSelectCourse,
}) => {
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [imei, setImei] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);

  const [selectedCourseOption, setSelectedCourseOption] = useState(null); //Khoá học
  const [selectedStatusOption, setSelectedStatusOption] = useState(-9); //Trạng thái
  const [selectedCourseStatusOption, setSelectedCourseStatusOption] =
    useState(-9); //Trạng thái khoá học
  let courseSelect = "";
  const baseUrl = "https://jira.shlx.vn/v1/courses?";
  let courseUrl = null;

  const [selectedSyncOption, setSelectedSyncOption] = useState(null); //Đồng bộ
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedMarkOption, setSelectedMarkOption] = useState(-9);

  const stateOptions = [
    { value: -9, label: "Tất cả" },
    { value: 0, label: "Đã bắt đầu" },
    { value: 1, label: "Đang diễn ra" },
    // { value: 1, label: "Đang diễn ra gần đây" },
    { value: 2, label: "Đã kết thúc" },
    { value: -2, label: "Chưa bị huỷ" },
  ];
  const syncOptions = [
    { value: -1, label: "Tất cả" },
    { value: 0, label: "Lỗi" },
    { value: 1, label: "Thành công" },
  ];
  const markOptions = [
    { value: -9, label: "Tất cả" },
    { value: 0, label: "Chưa đánh đấu" },
    { value: 1, label: "Đã đánh dấu" },
  ];
  const courseStateOptions = [
    { value: -1, label: "Tất cả" },
    { value: 0, label: "Chưa diễn ra" },
    { value: 1, label: "Học lý thuyết" },
    { value: 2, label: "Học thực hành" },
    { value: 3, label: "Kết thúc" },
  ];
  const handleCourseStateChange = (selectedOption) => {
    setSelectedCourseStatusOption(selectedOption);
    courseSelect = selectedOption.value;
    courseUrl = `${baseUrl}status=${courseSelect}&minimal=1`;
    console.log(courseUrl);
  };
  const handleStatusChange = (selectedOption) => {
    setSelectedStatusOption(selectedOption);
  };
  const handleCourseChange = (selectedOption) => {
    setSelectedCourseOption(selectedOption);
  };
  const handleSyncChange = (selectedOption) => {
    setSelectedSyncOption(selectedOption);
  };
  const handleMarkChange = (selectedOption) => {
    setSelectedMarkOption(selectedOption);
  };
  const handleStartDateChange = (date) => {
    const jsDate = new Date(date);
    const isoDate = formatISO(jsDate);
    setSelectedStartDate(isoDate);
  };
  const handleEndDateChange = (date) => {
    const jsDate = new Date(date);
    const isoDate = formatISO(jsDate);
    setSelectedEndDate(isoDate);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const courseStatus = selectedCourseStatusOption?.value ?? -1;
        const courseUrl = `${baseUrl}status=${courseStatus}&minimal=1`;
        const response = await axios.get(courseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.items);
        // console.log(response.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedCourseStatusOption !== null) {
      fetchData();
    }
  }, [selectedCourseStatusOption]);

  const handleSubmit = () => {
    if (
      !name &&
      !plate &&
      !id &&
      !imei &&
      !selectedStatusOption &&
      !selectedMarkOption &&
      !selectedCourseOption &&
      !selectedCourseStatusOption &&
      !selectedSyncOption &&
      !selectedEndDate &&
      !selectedStartDate
    ) {
      onSubmitName("");
      onSubmitPlate("");
      onSubmitImei("");
      onSubmitId("");
      onSelectStatus("-1");
      onSelectSync("-1");
      onSelectCourseStatusOption("-1");
      onSubmitEndDate("");
      onSubmitStartDate("");
      onSelectMark("");
      onSelectCourse("");
    } else {
      if (name) onSubmitName(name);
      if (plate) onSubmitPlate(plate);
      if (imei) onSubmitImei(imei);
      if (id) onSubmitId(id);
      if (selectedStatusOption) onSelectStatus(selectedStatusOption);
      if (selectedMarkOption) onSelectMark(selectedMarkOption);
      if (selectedCourseOption) onSelectCourse(selectedCourseOption);
      if (selectedCourseStatusOption)
        onSelectCourseStatusOption(selectedCourseStatusOption);
      if (selectedStartDate) onSubmitStartDate(selectedStartDate);
      if (selectedEndDate) onSubmitEndDate(selectedEndDate);
    }
  };

  const handleReset = () => {
    setName("");
    setPlate("");
    setId("");
    setImei("");
    setSelectedStatusOption("");
    setSelectedMarkOption("");
    setSelectedCourseOption("");
    setSelectedCourseStatusOption("");
    setSelectedSyncOption("");
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const handleAddButtonClick = () => {
    onAddButtonClick();
  };
  return (
    <div className="flex max-phone:flex-col space-x-2 max-phone:space-x-0 overflow-auto">
      <div>
        <div className="flex space-x-4 max-phone:space-x-2">
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Họ tên / Mã ĐK / Số CMT
            </label>
            <input
              type="text"
              className="max-phone:w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-60 p-2.5 h-[38px]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="">
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Trạng thái khoá học
              </label>
              <Select
                className="w-40"
                placeholder="Tất cả"
                value={selectedCourseStatusOption}
                onChange={handleCourseStateChange}
                options={courseStateOptions}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
            </form>
          </div>
        </div>
        <div className="flex space-x-4 max-phone:space-x-2">
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Từ ngày
            </label>
            <DatePicker
              selected={selectedStartDate}
              onChange={handleStartDateChange}
              dateFormat="dd/MM/yyyy"
              isClearable
              placeholderText="Chọn ngày bắt đầu..."
              className="form-control border border-gray-300 rounded-md p-2"
              popperClassName="my-popper-class"
            />
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Đến ngày
            </label>
            <DatePicker
              selected={selectedEndDate}
              onChange={handleEndDateChange}
              dateFormat="dd/MM/yyyy"
              isClearable
              placeholderText="Chọn ngày kết thúc..."
              className="form-control border border-gray-300 rounded-md p-2"
              popperClassName="my-popper-class"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex space-x-4 max-phone:space-x-2">
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tên khoá học
            </label>
            <Select
              className="w-60 max-phone:w-44"
              placeholder="Không xác định"
              value={selectedCourseOption}
              onChange={handleCourseChange}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              options={[
                { value: 0, label: "Không xác định" },
                ...data.map((course) => ({
                  value: course.id,
                  label: course.ten_khoa_hoc,
                })),
              ]}
            />
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Số IMEI
            </label>
            <input
              type="text"
              id="default-input"
              className="max-phone:w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-40 p-2.5 h-[38px]"
              onChange={(e) => setImei(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-4 max-phone:space-x-2">
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Trạng thái
            </label>
            <Select
              className="w-40"
              placeholder="Tất cả"
              value={selectedStatusOption}
              onChange={handleStatusChange}
              options={stateOptions}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Biển số xe
            </label>
            <input
              type="text"
              id="default-input"
              className="max-phone:w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-40 p-2.5 h-[38px]"
              onChange={(e) => setPlate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex space-x-4 max-phone:space-x-1">
          <form>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Đồng bộ
            </label>
            <Select
              className="w-40 max-phone:w-32"
              placeholder="Tất cả"
              value={selectedSyncOption}
              onChange={handleSyncChange}
              options={syncOptions}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </form>
          <form>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Đánh dấu
            </label>
            <Select
              className="w-40 max-phone:w-32"
              placeholder="Tất cả"
              value={selectedMarkOption}
              onChange={handleMarkChange}
              options={markOptions}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </form>
          <div className="flex pt-5 space-x-4">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 px-4  my-1 rounded-xl h-[38px] flex justify-center items-center"
              onClick={handleSubmit}
            >
              <FaSearch />
            </button>
            <button
              className="text-white bg-green-500 hover:bg-green-500 px-4  my-1 rounded-xl h-[38px]"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionSearch;
