import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JS from "./JS";
import Reactjs from "./Reactjs";
import Fullstack from "./Fullstack";
import Header from "./Header";
import Footer from "./Footer";
import Signup from "./Signup";
import Login from "./Login";
import Userpage from "./Userpage";
import PrivateRoute from "./ProtectedRouter";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/js"
          element={
            <PrivateRoute>
              <JS />
            </PrivateRoute>
          }
        />
        <Route
          path="/reactjs"
          element={
            <PrivateRoute>
              <Reactjs />
            </PrivateRoute>
          }
        />
        <Route
          path="/fullstack"
          element={
            <PrivateRoute>
              <Fullstack />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <Userpage />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
