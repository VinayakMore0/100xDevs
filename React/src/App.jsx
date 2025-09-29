import React from "react";
import Buttons from "./components/Buttons";
import Input from "./components/input";
import Otp from "./components/Otp";

const App = () => {
  return (
    <>
      <div className="w-screen h-screen flex justify-center bg-[#002B5B]">
        <div className="flex flex-col gap-20 items-center p-16">
          <div className="text-xl font-normal text-[#FDFEFE]">
            <span>🖥️</span>{" "}
            <span>
              <span className="text-[#3EDFCF]">Webinar</span>.gg
            </span>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-16">
              <span className="text-2xl font-semibold text-[#FDFEFE]">
                Verify Your Age
              </span>
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-semibold text-[#98A9BC]">
                  Please confirm your birth year. This data will not be stored.
                </span>
                <input
                  className="border border-[#486689] w-xs rounded-lg bg-[#18406A] h-8 p-4 text-sm font-semibold text-[#486689] m-4 "
                  type="text"
                  placeholder="Your Birth Year"
                />
              </div>
            </div>
            <div>
              <button className="cursor-pointer h-8 text-md font-semibold w-xs rounded-md text-[#FDFEFE] bg-[#7F95AC] hover:bg-[#3FDFD0] hover:text-[#002B5B]">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen bg-blue-700">
        <Otp number={8}></Otp>
        {/* <Input></Input> */}
        {/* <Buttons>Continue </Buttons> */}
      </div>
    </>
  );
};

export default App;
