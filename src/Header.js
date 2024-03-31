import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="hidden md:block">
        <FullHead />
      </div>
      <div className="md:hidden">
        <OffHead />
      </div>
    </>
  );
}

export default Header;

const FullHead = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed z-10 top-0 h-[70px] w-[100%] px-4 bg-green-200 text-red-800 flex justify-between items-center font-bold text-[18px] font-sans">
      <div>
        <button onClick={() => navigate("/")} className="block">
          <img
            className="h-[60px] w-[60px] rounded-[50%] m-1"
            src="https://pbs.twimg.com/profile_images/994456871326044160/u_A22pFK_400x400.jpg"
            alt="Educom"
          />
        </button>
      </div>

      <div className="flex justify-center items-center ">
        <button
          onClick={() => navigate("/js")}
          className="px-4 py-2 mx-1 hover:bg-green-600 hover:text-white focus:bg-green-800 focus:text-white"
        >
          JS
        </button>

        <button
          onClick={() => navigate("/reactjs")}
          className="px-4 py-2 mx-1 hover:bg-green-600 hover:text-white focus:bg-green-800 focus:text-white"
        >
          ReactJS
        </button>

        <button
          onClick={() => navigate("/fullstack")}
          className="px-4 py-2 mx-1 hover:bg-green-600 hover:text-white focus:bg-green-800 focus:text-white"
        >
          Fullstack
        </button>
        <button
          onClick={() => navigate("/user")}
          className="px-4 py-2 mx-1 hover:bg-green-600 hover:text-white focus:bg-green-800 focus:text-white"
        >
          User
        </button>
      </div>
    </div>
  );
};

const OffHead = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  // console.log(userProfile);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"));

        const response = await axios.get("http://localhost:5001/user/profile", {
          headers: {
            Authorization: token,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.log(error.response.data.message || "Internal Server Error");
      }
    };

    fetchUserProfile();
  }, [show]);
  const Token = JSON.parse(localStorage.getItem("auth"));
  return (
    <>
      <div className="fixed z-10 top-0 h-[75px] w-[95%] px-6 rounded-[25px] my-2 mx-4 bg-green-200 text-red-600 flex justify-between items-center font-semibold ">
        <div>
          <button onClick={() => navigate("/")} className="block">
            <img
              className="h-[60px] w-[60px] rounded-[50%]"
              src="https://pbs.twimg.com/profile_images/994456871326044160/u_A22pFK_400x400.jpg"
              alt="Educom"
            />
          </button>
        </div>
        <div>
          <button onClick={() => setShow(!show)} className="p-2">
            {show ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {!show && (
        <div className="md:hidden fixed z-10 top-[80px] mx-4 h-[auto] w-[95%] py-2 bg-white rounded-lg shadow-lg">
          <button
            onClick={() => {
              navigate("/js");
              setShow(!show);
            }}
            className="px-2 border h-[100px] w-[95%] flex justify-between items-center mx-4 my-2 bg-slate-50 rounded-[10px] shadow-lg"
          >
            <img
              className="h-[50px] w-[50px]"
              src="data:image/png;base64,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"
              alt=""
            />
            <p className="font-mono font-bold text-[18px] text-left py-1">
              Java Script Basic to Expert
            </p>
            <p className="flex justify-end px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clipRule="evenodd"
                />
              </svg>
              08:20:00
            </p>
          </button>

          <button
            onClick={() => {
              navigate("/reactjs");
              setShow(!show);
            }}
            className="px-2 border h-[100px] w-[95%] mx-4 my-2 bg-slate-50 rounded-[10px] shadow-lg flex justify-between items-center"
          >
            <img
              className="h-[50px] w-[60px]"
              src="data:image/png;base64,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"
              alt=""
            />
            <p className="font-mono font-bold text-[18px] text-left py-1">
              React JS Full course
            </p>
            <p className=" flex justify-end px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clipRule="evenodd"
                />
              </svg>
              08:00:00
            </p>
          </button>

          <button
            onClick={() => {
              navigate("/fullstack");
              setShow(!show);
            }}
            className="px-2 border h-[100px] w-[95%] mx-4 my-2 bg-slate-50 rounded-[10px] shadow-lg flex justify-between items-center"
          >
            <img
              className="h-[50px] w-[130px]"
              src="data:image/png;base64,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"
              alt=""
            />
            <p className="font-mono font-bold text-[18px] text-left py-1">
              MERN stack complete
            </p>
            <p className="flex justify-end px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clipRule="evenodd"
                />
              </svg>
              14:50:00
            </p>
          </button>

          <button
            onClick={() => {
              navigate("/user");
              setShow(!show);
            }}
            className="px-2 border h-[100px] w-[95%] flex justify-start gap-6 items-center mx-4 my-2 bg-slate-50 rounded-[10px] shadow-lg"
          >
            {Token !== null ? (
              <img
                className="h-[50px] w-[50px] rounded-[50%] border"
                src={userProfile.map(
                  (user) => "http://localhost:5001/uploads/" + user.imageUrl
                )}
                alt=""
              />
            ) : (
              <img
                className="h-[50px] w-[50px]"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvjknb9HwLna8rrWGJMf9unNSLeb0Zgm1CTA&usqp=CAU"
                alt=""
              />
            )}
            <p className="font-mono font-bold text-[18px] text-left py-1">
              {Token !== null
                ? userProfile.map((item) => item.name.toUpperCase())
                : "User"}
            </p>
          </button>
        </div>
      )}
    </>
  );
};
