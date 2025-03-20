import React, { useRef } from "react";
import { SiAnydesk } from "react-icons/si";
import Button from "./Button";
import MoveImg from "./MoveImg";

const LatestUpdate = () => {
  return (
    <div className="w-screen min-h-dvh relative">
      <div className="my-12 px-3.5 md:px-10 gap-6 lg:px-28">
        <div className="h-full w-full flex justify-between items-start py-5 md:text-start flex-wrap md:flex-nowrap">
          <div className="mr-7">
            <h2 className="special-font font-black text-[7rem] leading-22 font-zentry self-start">
              lat<b>e</b>st <br />
              <b>u</b>pdates
            </h2>

            <p className="max-w-md my-7">
              Stay updated with the latest news, events, <br />
              and updates in our ecosystem. Be part of <br />
              our universe's growth and evolution.
            </p>
            <Button
              title="read all news"
              rightIcon={<SiAnydesk />}
              id="read-all"
              styleClass="flex gap-2 !bg-black text-white"
            />
          </div>

          <div className="py-2 mt-20 md:mt-0">
            <div className="flex flex-col gap-7 items-start md:ms-0 ms-20">

              <MoveImg
                className="lg:w-lg sm:w-md w-80 rounded-xl overflow-hidden lg:h-80 h-72"
                src="img/news-1.jpg"
              />

              <div className="flex items-start">
                <p className="font-general text-[10px] font-semibold px-4 text-slate-600">
                  09.05.2024
                </p>

                <p className="font-circular-web max-w-md ml-4 text-black font-semibold leading-5">
                  Nexus: Zentry’s Social Portal Bridging <br />
                  Human & AI in the Global Play <br /> Economy
                </p>
              </div>
            </div>

            <div className="flex mt-14  md:mt-10 flex-col gap-7 items-start">

              <MoveImg
                src="img/news-2.png"
                className="lg:w-lg w-md rounded-xl overflow-hidden lg:h-80 h-72"
              />

              <div className="flex items-start">
                <p className="font-general text-[10px] font-semibold px-4 text-slate-600">
                  22.07.2024
                </p>

                <p className="font-circular-web max-w-md ml-4 text-black font-semibold leading-5">
                  Zentry Whitepaper: The Blueprint <br />
                  The Blueprint to the Metagame
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestUpdate;
