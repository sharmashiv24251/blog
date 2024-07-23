import CourseList from "./pages/CourseList";
import OtpForm from "./pages/OtpPage";
import NotFound from "./pages/NotFound";
import Batches from "./pages/Batches";
import logo from "./assets/logo.png";
import "./App.css";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  function getColor(pathname) {
    switch (pathname) {
      case "/course-list":
        return "bg-secondary text-heading-secondary";
      case "/batches":
        return "bg-tertiary text-heading-tertiary";
      default:
        return "bg-primary text-heading-primary";
    }
  }

  return (
    <div className={`h-screen fixed inset-0 ${getColor(location.pathname)}`}>
      <h1
        className={`text-center font-bold leading-[5.706rem] text-[5rem] mt-[17px]`}
        style={{
          fontFamily: '"Inter", sans-serif',
          textShadow: "2px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        Chai aur Code
      </h1>
      <Routes>
        <Route exact path="/" element={<OtpForm />} />
        <Route path="/otp-form" element={<OtpForm />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/batches" element={<Batches />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div>
        <img
          onClick={() => window.open("https://chaicode.com/", "_blank")}
          className="logo cursor-pointer"
          src={logo}
          alt=""
        />
      </div>
    </div>
  );
}

function Layout() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Layout;
