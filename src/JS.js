import React from "react";
import plays from "./jsPlayList.json";
import ReactPlayer from "react-player";

function JS() {
  return (
    <div className="flex flex-wrap justify-around mx-[10%] my-[75px] ">
      {plays.map((play, index) => {
        return (
          <div
            key={index}
            className=" my-[10px] flex flex-col justify-center items-center p-2 bg-purple-400 "
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

export default JS;
