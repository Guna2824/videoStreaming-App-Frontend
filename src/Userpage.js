import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Userpage() {
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
  }, []);

  return (
    <div className="my-[10%] h-[100vh] w-[100%] flex flex-col gap-4 items-center justify-center ">
      {userProfile &&
        userProfile.map((user) => {
          const name = user.name.toUpperCase();
          const name1 = name.split("");

          return (
            <div
              key={user._id}
              className="h-auto my-2 md:w-[50%] border bg-purple-300 p-4 flex flex-col justify-center items-center gap-4 md:text-[18px] rounded-lg shadow-2xl"
            >
              <div className="flex flex-col justify-center items-center text-center text-[20px] font-bold ">
                <img
                  src={"http://localhost:5001/uploads/" + user.imageUrl}
                  alt={name1[0]}
                  className="mb-2 h-[75px] w-[75px] rounded-[50%] border border-white object-cover"
                />
              </div>
              <div className="">
                <table>
                  <tbody>
                    <tr className=" bg-gray-50 h-[30px] ">
                      <td className="p-[10px] w-[50px]">Name</td>
                      <th className="p-[10px] w-[50px]">
                        {user.name.toUpperCase()}
                      </th>
                    </tr>
                    <tr>
                      <td className="p-[10px]">Phone</td>
                      <th className="p-[10px]">{user.phone}</th>
                    </tr>
                    <tr className=" bg-gray-50 h-[30px]">
                      <td className="p-[10px]">E-mail</td>
                      <th className="p-[10px]">{user.email}</th>
                    </tr>
                    <tr>
                      <td className="p-[10px]">Status</td>
                      <th className="p-[10px]">{user.logInStatus}</th>
                    </tr>
                    <tr className=" bg-gray-50 h-[30px]">
                      <td className="p-[10px]">LogIn Time</td>
                      <th className="p-[10px]">{user.logInTime}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      {userProfile && userProfile ? (
        <div>
          <button
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/");
            }}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md"
          >
            LOGOUT
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Userpage;
