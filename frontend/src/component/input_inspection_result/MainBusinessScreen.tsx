import ServeyDate from "./main_business/SurveyDate";
import TerminalGasValve from "./main_business/TerminalGasValve";
import Siren from "./main_business/Siren";
import Piping from "./main_business/Piping";
import Equipment from "./main_business/Equipment";
import TestMeasurement from "./main_business/TestMeasurement";
import ConnectingPipe from "./main_business/ConnectingPipe";
import SupplyPipe from "./main_business/SupplyPipe";
import CircuitBreaker from "./main_business/CircuitBreaker";
import Regulator from "./main_business/Regulator";
import Meter from "./main_business/Meter";
import Vessel from "./main_business/Vessel";
import { labelColor } from "../../constants/colors";
const MainBusinessScreen = () => {
  return (
    <div className="w-full p-1 flex flex-col bg-gray-100 min-w-[930px]">
      <span
        className={`flex justify-center text-center items-center font-bold p-1 ${labelColor} text-[20px]`}
      >
        消費設備
      </span>
      <div className="mt-1 text-xs">
        <ServeyDate />
        <TerminalGasValve />
        <Siren />
        <Piping />
        <Equipment />
      </div>

      <div className="mt-1 text-xs">
        <ConnectingPipe />
        <SupplyPipe />
        <CircuitBreaker />
        <Regulator />
        <Meter />
        <Vessel />
      </div>
      <span
        className={`flex justify-center text-center items-center font-bold p-1 ${labelColor} text-[20px] mt-4 min-w-[919px]`}
      >
        試験測定
      </span>
      <div className="mt-1 text-xs min-w-[919px]">
        <TestMeasurement />
      </div>
    </div>
  );
};

export default MainBusinessScreen;
