import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [data, setData] = useState({
    name: "",
    password: "",
  });

  const status = { logInStatus: "logIn", logInTime: new Date() };

  const handleChange = (e) => {
    setError({});
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!data.name) {
      validationErrors.name = "username is required";
    }
    if (!data.password) {
      validationErrors.password = "pasword is required";
    }
    setError(validationErrors);
    toast.error(error.name);
    toast.error(error.password);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios
          .post("http://localhost:5001/user/login", data)
          .then((res) => {
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate("/");
            toast.success("Login successfully");
          });
        await axios.put("http://localhost:5001/user/loginstatus", status, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("auth")),
          },
        });
      } catch (err) {
        console.error(err);
        toast.error(err.response.data);
      }

      setData({
        name: "",
        password: "",
      });
    }
  };

  return (
    <div className="h-[100vh] w-[100%] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 justify-center items-center  py-6 w-[350px] bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl shadow-xl"
      >
        <h2 className="font-bold text-2xl ">Login</h2>
        <label>username</label>
        <input
          className="border text-center p-2 outline-none"
          type="text"
          placeholder="Enter name"
          name="name"
          value={data.name.toLocaleLowerCase()}
          onChange={handleChange}
        />

        <label>password</label>
        <input
          className="border text-center p-2 outline-none"
          type="password"
          placeholder="Enter pasword"
          name="password"
          value={data.password}
          onChange={handleChange}
        />

        <button
          className="border w-[200px] px-4 py-2 text-white font-bold bg-blue-600 rounded-[50px] shadow-md "
          type="submit"
        >
          Login
        </button>
        <p className="text-[18px] ">new user</p>
        <button
          className="border w-[100px] px-2 py-1 text-white font-bold bg-blue-600 rounded-[50px] shadow-md"
          onClick={() => {
            navigate("/signup");
          }}
        >
          signup
        </button>
      </form>
    </div>
  );
}

export default Login;
