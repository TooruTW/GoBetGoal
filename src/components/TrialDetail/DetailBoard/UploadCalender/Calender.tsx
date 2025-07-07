import DayBox from "./DayBox";

export default function Calender() {
  return (
    <div className="w-full">
      <div className="columns-7 w-full">
        <p className="text-label text-schema-on-surface-variant">Sun</p>
        <p className="text-label text-schema-on-surface-variant">Mon</p>
        <p className="text-label text-schema-on-surface-variant">Tue</p>
        <p className="text-label text-schema-on-surface-variant">Wed</p>
        <p className="text-label text-schema-on-surface-variant">Thu</p>
        <p className="text-label text-schema-on-surface-variant">Fri</p>
        <p className="text-label text-schema-on-surface-variant">Sat</p>
      </div>
      <div className="columns-7 w-full">
        <DayBox day={1} isThisMonth={true} imgUrl={[]} />
        <DayBox day={2} isThisMonth={true} imgUrl={[]} />
        <DayBox day={3} isThisMonth={true} imgUrl={[]} />
        <DayBox day={4} isThisMonth={true} imgUrl={[]} />
        <DayBox day={5} isThisMonth={true} imgUrl={[]} />
        <DayBox
          day={6}
          isThisMonth={true}
          imgUrl={[
            "/challengeSample/sample-1.jpg",
            "/challengeSample/sample-2.jpg",
            "/challengeSample/sample-3.jpg",
          ]}
        />
        <DayBox day={7} isThisMonth={true} imgUrl={[]} />
      </div>
    </div>
  );
}
