import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';

const Location = () => {
  const location = useLocation();

  // Hàm if để hiển thị tên của Route dựa trên location.pathname
  const getRouteName = (pathname) => {
    if (pathname === '/dashboard') {
      return 'Trang chủ';
    } else if (pathname === '/login') {
      return '';
    } else if (pathname === '/card') {
      return 'Danh sách thẻ';
    } else if (pathname === '/course') {
      return 'Khoá học';
    } else if (pathname === '/dat') {
      return 'Thiết bị DAT';
    } else if (pathname === '/session') {
      return 'Thông tin phiên học';
    } else if (pathname === '/teacher') {
      return 'Danh sách giáo viên';
    } else if (pathname.startsWith('/trainees')) {
      return 'Danh sách học viên';
    } else if (pathname === '/trainningcar') {
      return 'Danh sách xe tập lái';
    } else {
      return 'Unknown';
    }
  };

  return (
    <div className='flex flex-1 pt-3'>
      <p className='font-bold text-2xl'>
        {getRouteName(location.pathname)}</p>
    </div>
  );
};

export default Location