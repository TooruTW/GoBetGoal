interface acceptProps {
  candyPerfect: number;
  candyPass: number;
  stagePerfect: number;
  stagePass: number;
  completeRate: number;
}

export default function ProgressBar(props: acceptProps) {
  const {
    candyPerfect,
    candyPass,
    stagePerfect,
    stagePass,
    completeRate,
  } = props;
  return (
    <div>
      <p className=" relative flex justify-between">
        <span>糖果總數</span>
        <span className=" absolute left-4/5 translate-x-[-50%]">{candyPass}</span>
        <span>{candyPerfect}</span>
      </p>
      <div className="w-full rounded-full relative h-4 bg-bg-module">
        <div className={`absolute rounded-full h-full bg-white min-w-4 w-[${completeRate}%] py-1 px-4 flex justify-end items-center`}>
            <p className="text-label text-black">合作進度 <span>{completeRate}</span>%</p>
        </div>
      </div>
      <p className=" relative flex justify-between">
        <span>關卡總數</span>
        <span className=" absolute left-4/5 translate-x-[-50%]">{stagePass}</span>
        <span>{stagePerfect}</span>
      </p>
    </div>
  );
}
