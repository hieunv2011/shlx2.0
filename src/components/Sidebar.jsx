import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCog,
  HiOutlineDesktopComputer,
  HiOutlineIdentification,
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlineDocumentText,
  HiOutlineChartSquareBar,
} from "react-icons/hi";
const Sidebar = ({ show, toggleSidebar }) => {
  const location = useLocation();
  const [pathname, setPathname] = useState("");
  const [sidebarShow, setSidebarShow] = useState(false);
  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/login") {
      setSidebarShow(false);
    } else {
      setSidebarShow(true);
    }
  }, [location.pathname]);
  const [isSystemOpen, setIsSystemOpen] = useState(false);
  const [isStudentsOpen, setIsStudentsOpen] = useState(false);

  const toggleSystem = () => {
    setIsSystemOpen(!isSystemOpen);
  };

  const toggleStudents = () => {
    setIsStudentsOpen(!isStudentsOpen);
  };
  useEffect(() => {
    if (!show) {
      setIsSystemOpen(false);
      setIsStudentsOpen(false);
    }
  }, [show]);
  // const toggleSidebar = () => {
  //   setShow(!show);
  // };
  return (
    <div>
      {/* {show && (
        <motion.div
          className="h-full"
          initial={{ width: 0 }}
          animate={{ width: show ? 255 : 0 }}
        >
          <div className="bg-slate-800 h-full">
            <div className="flex-col flex">
              <div className="w-full border-b-2 border-gray-200"></div>
              <div className="flex bg-gray-100  overflow-x-hidden">
                <div className="bg-slate-800 lg:flex md:w-64 md:flex-col hidden">
                  <div className="flex-col pt-5 flex overflow-y-auto">
                    <div className="h-full flex-col justify-between px-4 flex">
                      <div className="space-y-8 pt-4">
                        <div className=" relative bg-top bg-cover">
                          <Link
                            to="/dashboard"
                            className={`font-medium text-sm items-center rounded-lg text-white px-4 py-2.5 flex
                        transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                          pathname === "/dashboard"
                            ? "border border-slate-200"
                            : ""
                        }`}
                          >
                            <HiOutlineHome className="text-xl mr-2" />
                            <span>Trang chủ</span>
                          </Link>
                        </div>
                        <div>
                          <p
                            className="font-medium text-sm items-center rounded-lg text-white px-4 py-2.5 flex
                        transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer"
                            onClick={toggleSystem}
                          >
                            <HiOutlineCog className="text-xl mr-2" />
                            Hệ thống
                          </p>
                          <motion.div
                            initial={false}
                            animate={{ height: isSystemOpen ? "auto" : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: "hidden" }}
                            className="pt-4"
                          >
                            <div className="bg-top bg-cover space-y-1">
                              <Link
                                to="/dat"
                                className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/dat"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                              >
                                <HiOutlineDesktopComputer className="text-xl mr-2" />
                                <span>Thiết bị DAT</span>
                              </Link>
                              <Link
                                to="/trainningcar"
                                className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/trainningcar"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                              >
                                <HiOutlineIdentification className="text-xl mr-2" />
                                <span>Xe tập lái</span>
                              </Link>
                              <Link
                                to="/card"
                                className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/card"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                              >
                                <HiOutlineUserGroup className="text-xl mr-2" />
                                <span>Danh sách thẻ</span>
                              </Link>
                              <Link
                                to="/teacher"
                                className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/teacher"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                              >
                                <HiOutlineBookOpen className="text-xl mr-2" />
                                <span>Danh sách giáo viên</span>
                              </Link>
                            </div>
                          </motion.div>
                        </div>
                        <div>
                          <p
                            className="font-medium text-sm items-center rounded-lg text-white px-4 py-2.5 flex
                        transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer"
                            onClick={toggleStudents}
                          >
                            <HiOutlineUsers className="text-xl mr-2" />
                            Học viên
                          </p>
                          <motion.div
                            initial={false}
                            animate={{ height: isStudentsOpen ? "auto" : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: "hidden" }}
                            className="pt-4"
                          >
                            <div className="bg-top bg-cover space-y-1">
                              <Link
                                to="/course"
                                className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/course"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                              >
                                <HiOutlineAcademicCap className="text-xl mr-2" />
                                <span>Danh sách khoá học</span>
                              </Link>
                              <Link
                                to="/trainees"
                                className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/trainees"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                              >
                                <HiOutlineDocumentText className="text-xl mr-2" />
                                <span>Danh sách học viên</span>
                              </Link>
                              <Link
                                to="/course"
                                className="font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                          transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer"
                              >
                                <HiOutlineChartSquareBar className="text-xl mr-2" />
                                <span>Danh sách phiên học</span>
                              </Link>
                              <a
                                href="#"
                                className="font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                          transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer"
                              >
                                <HiOutlineBookOpen className="text-xl mr-2" />
                                <span>Giám sát thực hành</span>
                              </a>
                            </div>
                          </motion.div>
                        </div>
                        <div className="bottom-2 fixed w-52">
                          <div className="h-[1px] bg-slate-300 w-full"></div>
                          <div className="mt-4 pb-4s">
                            <div className="bg-top bg-cover space-y-1">
                              <a
                                href="#"
                                className="font-medium text-sm items-center rounded-lg text-white px-4 py-2.5 flex
                    transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer"
                              >
                                <span>Đăng xuất</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )} */}
      {show && setSidebarShow && (
        <motion.div
          className="h-full"
          initial={{ x: 0, width: 0 }}
          animate={{ x: 0, width: 255 }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-slate-800 p-4 h-full flex flex-col">
            <div className="h-10 px-2 my-4 ">
              <Link
                to="/dashboard"
                className={`font-medium text-sm items-center rounded-lg text-white px-4 py-2.5 flex
                        transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                          pathname === "/dashboard"
                            ? "border border-slate-200"
                            : ""
                        }`}
              >
                <HiOutlineHome className="text-xl mr-2" />
                <span>Trang chủ</span>
              </Link>
            </div>
            <div className="p-2">
              <div>
                <p
                  className="font-medium text-sm items-center rounded-lg text-white px-4 py-2.5 flex
                        transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer"
                  onClick={toggleSystem}
                >
                  <HiOutlineCog className="text-xl mr-2" />
                  Hệ thống
                </p>
                <motion.div
                  initial={false}
                  animate={{ height: isSystemOpen ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                  className="pt-4"
                >
                  <div className="bg-top bg-cover space-y-1">
                    <Link
                      to="/dat"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/dat"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                    >
                      <HiOutlineDesktopComputer className="text-xl mr-2" />
                      <span>Thiết bị DAT</span>
                    </Link>
                    <Link
                      to="/trainningcar"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/trainningcar"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                    >
                      <HiOutlineIdentification className="text-xl mr-2" />
                      <span>Xe tập lái</span>
                    </Link>
                    <Link
                      to="/card"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/card"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                    >
                      <HiOutlineUserGroup className="text-xl mr-2" />
                      <span>Danh sách thẻ</span>
                    </Link>
                    <Link
                      to="/teacher"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/teacher"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                    >
                      <HiOutlineBookOpen className="text-xl mr-2" />
                      <span>Danh sách giáo viên</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="p-2">
              <div>
                <p
                  className="font-medium text-sm items-center rounded-lg text-white px-4 py-2.5 flex
                        transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer"
                  onClick={toggleStudents}
                >
                  <HiOutlineUsers className="text-xl mr-2" />
                  Học viên
                </p>
                <motion.div
                  initial={false}
                  animate={{ height: isStudentsOpen ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                  className="pt-4"
                >
                  <div className="bg-top bg-cover space-y-1">
                    <Link
                      to="/course"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/course"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                    >
                      <HiOutlineAcademicCap className="text-xl mr-2" />
                      <span>Danh sách khoá học</span>
                    </Link>
                    <Link
                      to="/trainees"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/trainees"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                    >
                      <HiOutlineDocumentText className="text-xl mr-2" />
                      <span>Danh sách học viên</span>
                    </Link>
                    <Link
                      to="/session"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                        transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                          pathname === "/session"
                            ? "border border-slate-200"
                            : ""
                        }`}
                    >
                      <HiOutlineChartSquareBar className="text-xl mr-2" />
                      <span>Danh sách phiên học</span>
                    </Link>
                    <Link
                      to="/outdoor"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                                pathname === "/outdoor"
                                                  ? "border border-slate-200"
                                                  : ""
                                              }`}
                    >
                      <HiOutlineBookOpen className="text-xl mr-2" />
                      <span>Giám sát thực hành</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {!show && setSidebarShow && (
        <motion.div
          className="h-full"
          initial={{ x: 0, width: 255 }}
          animate={{ x: 0, width: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-slate-800 p-4 h-full">
            {/* <div className="h-10 p-2 ">
              <Link
                to="/dashboard"
                className={`font-medium text-sm items-center rounded-lg text-white px-4 py-2.5 flex
                        transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                          pathname === "/dashboard"
                            ? "border border-slate-200"
                            : ""
                        }`}
              >
                <HiOutlineHome className="text-xl mr-2" />
                <span>Trang chủ</span>
              </Link>
            </div>
            <div className="h-10 p-2">
              <div>
                <p
                  className="font-medium text-sm items-center rounded-lg text-white px-4 py-2.5 flex
                        transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer"
                  onClick={toggleSystem}
                >
                  <HiOutlineCog className="text-xl mr-2" />
                  Hệ thống
                </p>
                <motion.div
                  initial={false}
                  animate={{ height: isSystemOpen ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                  className="pt-4"
                >
                  <div className="bg-top bg-cover space-y-1">
                    <Link
                      to="/dat"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/dat"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                    >
                      <HiOutlineDesktopComputer className="text-xl mr-2" />
                      <span>Thiết bị DAT</span>
                    </Link>
                    <Link
                      to="/trainningcar"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/trainningcar"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                    >
                      <HiOutlineIdentification className="text-xl mr-2" />
                      <span>Xe tập lái</span>
                    </Link>
                    <Link
                      to="/card"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/card"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                    >
                      <HiOutlineUserGroup className="text-xl mr-2" />
                      <span>Danh sách thẻ</span>
                    </Link>
                    <Link
                      to="/teacher"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/teacher"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                    >
                      <HiOutlineBookOpen className="text-xl mr-2" />
                      <span>Danh sách giáo viên</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="h-10 p-2">
              <div>
                <p
                  className="font-medium text-sm items-center rounded-lg text-white px-4 py-2.5 flex
                        transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer"
                  onClick={toggleStudents}
                >
                  <HiOutlineUsers className="text-xl mr-2" />
                  Học viên
                </p>
                <motion.div
                  initial={false}
                  animate={{ height: isStudentsOpen ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                  className="pt-4"
                >
                  <div className="bg-top bg-cover space-y-1">
                    <Link
                      to="/course"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/course"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                    >
                      <HiOutlineAcademicCap className="text-xl mr-2" />
                      <span>Danh sách khoá học</span>
                    </Link>
                    <Link
                      to="/trainees"
                      className={`font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                              transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer ${
                                pathname === "/trainees"
                                  ? "border border-slate-200"
                                  : ""
                              }`}
                    >
                      <HiOutlineDocumentText className="text-xl mr-2" />
                      <span>Danh sách học viên</span>
                    </Link>
                    <Link
                      to="/course"
                      className="font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                          transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer"
                    >
                      <HiOutlineChartSquareBar className="text-xl mr-2" />
                      <span>Danh sách phiên học</span>
                    </Link>
                    <a
                      href="#"
                      className="font-medium text-sm items-center rounded-lg text-white px-6 py-2.5 flex
                          transition-all duration-200 hover:bg-gray-200 hover:text-black group cursor-pointer"
                    >
                      <HiOutlineBookOpen className="text-xl mr-2" />
                      <span>Giám sát thực hành</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div> */}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Sidebar;
