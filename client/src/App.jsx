import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserSignUp from "./pages/UserSignUp";
import WorkerSignUp from "./pages/WorkerSignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import OnlyWorkerRoute from "./components/OnlyWorkerRoute";
import Setting from "./pages/Setting";
import CreateService from "./pages/CreateService";
import ServicePage from "./pages/ServicePage";
import NotFoundPage from "./components/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateService from "./pages/UpdateService";
import WorkerPage from "./pages/WorkerPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user-sign-up" element={<UserSignUp />} />
        <Route path="/worker-page/:workerId" element={<WorkerPage />} />
        <Route path="/worker-sign-up" element={<WorkerSignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/setting" element={<Setting />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<OnlyWorkerRoute />}>
          <Route path="/update-service/:serviceSlug" element={<UpdateService/>} />
          <Route path="/create-service" element={<CreateService />} />
        </Route>
        <Route path="/service/:serviceSlug" element={<ServicePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
