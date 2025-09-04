import ServeyDate from "./main_business/SurveyDate";
import TerminalGasValve from "./main_business/TerminalGasValve";
import Siren from "./main_business/Siren";
import Piping from "./main_business/Piping";
import Equipment from "./main_business/Equipment";
import TestMeasurement from "./main_business/TestMeasurement";
const MainBusinessScreen = () => {
  return (
    <div className="w-full p-1 flex flex-col bg-gray-100">
      <span className="flex justify-center text-center items-center font-bold p-1 bg-[#D9D9D9] text-[20px]">
        消費設備
      </span>
      <div className="mt-1 text-sm">
        <ServeyDate />
        <TerminalGasValve />
        <Siren />
        <Piping />
        <Equipment />
      </div>
      <span className="flex justify-center text-center items-center font-bold p-1 bg-[#D9D9D9] text-[20px] mt-4">
        試験測定
      </span>
      <div className="mt-1 text-sm">
        <TestMeasurement />
      </div>
    </div>
  );
};

export default MainBusinessScreen;
