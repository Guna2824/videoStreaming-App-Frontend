import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleImageChange = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!name) {
      validationErrors.name = "username is required";
    }
    if (!phone) {
      validationErrors.phone = "phonenumber is required";
    } else if (phone.length !== 10) {
      validationErrors.phone = "enter correct phonenumber";
    }
    if (!email) {
      validationErrors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "enter correct email formate";
    }
    if (!password) {
      validationErrors.password = "pasword is required";
    } else if (password.length < 5) {
      validationErrors.password = "password must 6 digit";
    }
    setError(validationErrors);
    toast.error(error.name);
    toast.error(error.email);
    toast.error(error.phone);
    toast.error(error.password);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("imageUrl", imageUrl);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const uploadResponse = await axios.post(
          "http://localhost:5001/user/imageupload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = uploadResponse.data.imageUrl;
        // console.log(uploadResponse);

        await axios.post("http://localhost:5001/user/register", {
          name,
          phone,
          email,
          password,
          imageUrl,
        });
        toast.success("user signup successfully");
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
      } catch (err) {
        console.log(err);
        toast.error(err.response.data);
      }
      navigate("/login");
    }
  };

  return (
    <div className="h-[100vh] w-[100%] flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className=" h-[450px] bg-white flex flex-col gap-2 text-center justify-center items-center mt-10  py-4 w-[350px] bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl shadow-xl"
      >
        <h2 className="font-bold text-2xl ">Sing Up</h2>
        <div className="">
          {/* <label>username</label> */}
          <input
            className="border text-center p-2 outline-none"
            type="text"
            placeholder="Enter name"
            // name="name"
            value={name.trim()}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="">
          {/* <label>phonenumber</label> */}
          <input
            className="border text-center p-2 outline-none"
            type="text"
            placeholder="Enter phone number"
            // name="phone"
            value={phone.trim()}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>

        <div>
          {/* <label>email-id</label> */}
          <input
            className="border text-center p-2 outline-none"
            type="text"
            placeholder="Enter email"
            // name="email"
            value={email.trim()}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div>
          {/* <label>password</label> */}
          <input
            className="border text-center p-2 outline-none"
            type="password"
            placeholder="Enter pasword"
            // name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            placeholder="select photo"
            onChange={handleImageChange}
          />
        </div>

        <div>
          <button
            className="border w-[200px] px-4 py-2 text-white font-bold bg-blue-600 rounded-[50px] shadow-md"
            type="submit"
          >
            Register
          </button>
        </div>
        <div>
          <p className="text-[15px] p-2">allready register user</p>
          <button
            className="border w-[100px] px-2 py-1 text-white font-bold bg-blue-600 rounded-[50px] shadow-md"
            onClick={() => {
              navigate("/login");
            }}
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
