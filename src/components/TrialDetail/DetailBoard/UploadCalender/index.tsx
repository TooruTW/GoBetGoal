import MonthSelector from "./MonthSelector";

export default function UploadCalendar() {
  return (
    <div className="border-1 border-schema-outline rounded-md p-3 flex flex-col gap-3 items-center">
      {/* month selector */}
      <MonthSelector month={0} year={2025} />
      {/* calendar */}
      <div></div>
    </div>
  );
}
