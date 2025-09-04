import ServeyDate from "./main_business/SurveyDate";
import ConnectingPipe from "./main_business/ConnectingPipe";
import SupplyPipe from "./main_business/SupplyPipe";
import CircuitBreaker from "./main_business/CircuitBreaker";
import Regulator from "./main_business/Regulator";
import Meter from "./main_business/Meter";
import Vessel from "./main_business/Vessel";
const MainBusinessScreen = () => {
  return (
    <div className="w-full p-1 flex flex-col bg-gray-100">
      <span className="flex justify-center text-center items-center font-bold p-1 bg-[#D9D9D9] text-[20px]">
        消費設備
      </span>
      <div className="mt-1 text-sm">
        <ServeyDate />
        <div></div>
      </div>
      <div className="mt-1 text-sm">
        <ConnectingPipe/>
      </div>
      <div className="mt-1 text-sm">
        <SupplyPipe/>
      </div>
      <div className="mt-1 text-sm">
        <CircuitBreaker/>
      </div>
      <div className="mt-1 text-sm">
        <Regulator/>
      </div>
      <div className="mt-1 text-sm">
        <Meter/>
      </div>
      <div className="mt-1 text-sm">
        <Vessel/>
      </div>
    </div>
  );
};

export default MainBusinessScreen;
