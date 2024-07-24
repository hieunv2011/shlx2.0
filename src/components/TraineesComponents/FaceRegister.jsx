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
    <div className="m-2">
      <h1 className="text-xl font-semibold">Đăng ký nhận dạng khuôn mặt</h1>
      <div className="w-full h-[1px] bg-slate-500 my-4"></div>
      <div
        className="flex flex-col items-center justify-center space-y-4
                    rounded-xl p-4"
      >
        <div className="h-60 w-full flex border border-slate-500 p-4 rounded-xl">
          <div className="w-1/2">
            <div className="flex">
              <img className="w-40" src={data.anh_chan_dung} />
              <p className="px-3">{data.ho_va_ten}</p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="rounded-lg relative flex justify-center m-2">
              <div className="z-10 sticky pt-40">
                <button
                  onClick={captureImage}
                  className="px-4 py-1 text-white rounded-md hover:text-blue-600 flex items-center space-x-2 text-2xl"
                >
                  <FaCamera />
                </button>
              </div>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                mirrored={true}
                className="absolute inset-0 object-cover h-52 w-full"
              />
            </div>
          </div>
        </div>
        <div className="h-20 w-full border border-slate-500 rounded-xl">
          {/* {capturedImage && (
            <div>
              <h2>Ảnh đã chụp</h2>
              <img
                src={capturedImage}
                alt="Captured"
                className="w-64 h-20 rounded-lg shadow-lg"
              />
            </div>
          )} */}
        </div>
        <div className="">3</div>
      </div>
    </div>
  );
};

export default FaceRegister;

{
  /* <div className="flex bg-red-600">
<img className="w-40" src={data.anh_chan_dung} />
<p className="px-3">{data.ho_va_ten}</p>
</div>
<div className="bg-yellow-500 rounded-lg">
 <div className="z-10 sticky pt-40 pl-[104px]">
<button
  onClick={captureImage}
  className="px-4 py-1 text-white rounded-md hover:text-blue-600 flex items-center space-x-2 text-2xl"
>
  <FaCamera />
</button>
</div> 
<Webcam
  audio={false}
  ref={webcamRef}
  screenshotFormat="image/jpeg"
  videoConstraints={videoConstraints}
  mirrored={true}
  className="absolute inset-0 object-cover"
/> 
</div> */
}
