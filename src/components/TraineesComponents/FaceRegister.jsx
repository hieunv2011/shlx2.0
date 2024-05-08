import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import { FaCamera } from "react-icons/fa"; // Import FaCamera icon

const FaceRegister = () => {
  //data
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const response = await axios.get(
        "https://jira.shlx.vn/v1/trainees/14213",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Add other headers if needed
          },
        }
      );
      setData(response.data);
      console.log(response);
      // setTotalCount(response.data.total);
      // setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const webcamRef = useRef(null); // Ref cho webcam
  const [capturedImage, setCapturedImage] = useState(null); // State lưu ảnh đã chụp

  // Hàm chụp ảnh từ webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  // Thiết lập video constraints để đảo ngược camera
  const videoConstraints = {
    facingMode: "user", // Sử dụng camera trước (mặc định)
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="h-[40%] w-full bg-yellow-500 flex">
        <div className="flex">
          <img
          className="w-40"
          src={data.anh_chan_dung}
          />
          <p className="px-3">{data.ho_va_ten}</p>
        </div>
        <div className="relative w-48 h-48 overflow-hidden rounded-lg shadow-lg ml-[200px]">
          {/* <div className="z-10 sticky pt-40 pl-[104px]">
            <button
              onClick={captureImage}
              className="px-4 py-1 text-white rounded-md hover:text-blue-600 flex items-center space-x-2 text-2xl"
            >
              <FaCamera />
            </button>
          </div> */}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            mirrored={true}
            className="absolute inset-0 object-cover"
          />
        </div>
        {/* {capturedImage && (
          <div>
            <h2>Ảnh đã chụp</h2>
            <img
              src={capturedImage}
              alt="Captured"
              className="w-64 h-48 rounded-lg shadow-lg"
            />
          </div>
        )} */}
      </div>
      <div className="">2</div>
      <div className="">3</div>
    </div>
  );
};

export default FaceRegister;
