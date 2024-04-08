import React from "react";
import plays from "./reactjsPlayList.json";
import ReactPlayer from "react-player";

function Reactjs() {
  return (
    <div className="flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 mx-[10%] my-[75px] ">
      {plays.map((play, index) => {
        return (
          <div
            key={index}
            className=" my-[10px] flex flex-col justify-center items-center p-2 bg-purple-400"
          >
            <ReactPlayer
              controls={true}
              width="300px"
              height="200px"
              url={play.video}
            />
            <p className="font-semibold text-white text-[18px] py-1">
              {play.tittle}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Reactjs;
