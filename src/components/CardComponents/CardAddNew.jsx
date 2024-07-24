import React from "react";
import axios from "axios";
import Select from "react-select";
import { FaFileCsv } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
class CardAddNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      type: null,
      fileName: "",
      fileSize: 0,
    };
  }

  handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    this.setState({
      file: selectedFile,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
    });
  };
  handleTypeChange = (selectedOption) => {
    this.setState({ type: selectedOption.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("userToken");
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("type", this.state.type);

    try {
      const response = await axios.post(
        "https://jira.shlx.vn/v1/rfcards",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      // Xử lý kết quả trả về từ server nếu cần
    } catch (error) {
      console.error("Error uploading file: ", error);
      // Xử lý lỗi nếu cần
    }
  };

  //File mẫu
  downloadFile = () => {
    const fileUrl =
      "https://raw.githubusercontent.com/haiz/assets/main/xlhs/card-samples.csv";

    const link = document.createElement("a");
    window.open(fileUrl);
  };

  render() {
    const typeOptions = [
      { value: 1, label: "Học viên" },
      { value: 2, label: "Giáo viên" },
    ];

    return (
      <div className="">
        <div>
          <h1 className="text-2xl">Import thẻ</h1>
          <div className="h-[1px] w-full bg-slate-400"></div>
          <div className="flex mt-4 space-x-0">
            <div className="flex space-x-4 max-phone:flex-col max-phone:space-x-0">
              <h1 className="text-xl font-medium">Loại thẻ</h1>
              <Select
                className="w-40 ml-5"
                placeholder="Tất cả"
                options={typeOptions}
                onChange={this.handleTypeChange} // Lắng nghe sự kiện thay đổi
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
            </div>
            <div className="ml-44 max-phone:ml-10 flex space-x-2">
              <Link
                className="text-black cursor-pointer flex hover:text-blue-800"
                onClick={this.downloadFile}
              >
                Tải file mẫu
                <FaFileCsv className="text-2xl ml-3" />
              </Link>
            </div>
          </div>
          <div className="h-80 mt-2 w-full border border-slate-400 rounded-sm p-4 flex items-center justify-center flex-col">
            <form onSubmit={this.handleSubmit}>
              <div
                onClick={() => document.getElementById("fileInput").click()}
                className="cursor-pointer text-9xl text-blue-800 hover:text-blue-500"
              >
                {this.state.fileName ? <FaFileCsv /> : <FaCloudUploadAlt />}
              </div>
              <input
                id="fileInput"
                type="file"
                accept=".csv"
                onChange={this.handleFileChange}
                style={{ display: "none" }}
              />
            </form>
            <div className="flex space-x-10 pt-4">
              <h1 className="flex space-x-3">
                Tên file:
                {this.state.fileName && ( // Kiểm tra xem đã chọn file chưa trước khi hiển thị
                  <h1>{this.state.fileName}</h1>
                )}
              </h1>
              <h1 className="flex space-x-3">
                Kích thước file:
                {this.state.fileName && ( // Kiểm tra xem đã chọn file chưa trước khi hiển thị
                  <h1>{this.state.fileSize}</h1>
                )}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex max-phone:pt-5 items-center justify-center space-x-3">
          <button
            type="submit"
            className="bg-green-600 p-3 w-40 text-white rounded-md"
          >
            Import
          </button>
          <button
            type="submit"
            className="bg-slate-400 p-3 w-20 text-white rounded-md"
            onClick={this.props.onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }
}

export default CardAddNew;
