import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout";
import AuthLayout from "./components/layouts/AuthLayout";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Construpedia from "./pages/Construpedia";
import AboutUs from "./pages/AboutUs";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgetPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Website */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/construpedia" element={<Construpedia />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Route>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
     <Route path="/forgotpassword" element={<ForgetPassword />} />
<Route path="/resetpassword" element={<ResetPassword />} />
<Route path="/verifyemail" element={<VerifyEmail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;