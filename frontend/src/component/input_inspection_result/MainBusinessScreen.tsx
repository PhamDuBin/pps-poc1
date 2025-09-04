import ServeyDate from "./main_business/SurveyDate";
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
    </div>
  );
};

export default MainBusinessScreen;
