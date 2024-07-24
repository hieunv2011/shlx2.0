import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route, Link,useLocation, useRoutes  } from "react-router-dom";
import { Navigation, Sidebar,Tabbar } from "./components";
import Dashboard from "./pages/Dashboard";
import {Card, Course, Dat, Login, Outdoor, Session, Teacher, Trainees } from "./pages";
import TrainningCar from "./pages/TrainningCar";
import { useEffect, useState } from "react";

function App() {
  // const [currentPath, setCurrentPath] = useState('/');

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <Router>
      <div className="h-screen flex flex-col bg-slate-200">
         <Navigation className="h-1/6" toggleSidebar={toggleSidebar}/>
        <div className="flex flex-grow h-full w-full">
          <Sidebar className="w-4/12" show={showSidebar} toggleSidebar={toggleSidebar}/>
          <div className="flex-grow bg-slate-200 w-8/12">
            <Routes>
              <Route index element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} /> 
              <Route path="/login" element={<Login />} /> 
              <Route path="/card" element={<Card />} /> 
              <Route path="/course" element={<Course />} /> 
              <Route path="/dat" element={<Dat />} /> 
              <Route path="/session" element={<Session />} /> 
              <Route path="/teacher" element={<Teacher />} /> 
              <Route path="/trainees" element={<Trainees />} /> 
              <Route path="/trainees/:course_id" element={<Trainees />} /> 
              <Route path="/trainningcar" element={<TrainningCar />} /> 
              <Route path="/outdoor" element={<Outdoor/>} /> 
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
