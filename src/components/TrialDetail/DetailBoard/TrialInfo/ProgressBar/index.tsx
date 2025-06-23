import gsap from "gsap";
import { useEffect, useState } from "react";

interface acceptProps {
  candyPerfect: number;
  candyPass: number;
  stagePerfect: number;
  stagePass: number;
  completeRate: number;
}

export default function ProgressBar(props: acceptProps) {
  const { candyPerfect, candyPass, stagePerfect, stagePass, completeRate } =
    props;
    const [rate,setRate] = useState(0)
    useEffect(()=>{
        const obj = {val:0}
        gsap.to(obj,{
            val:completeRate,
            duration:1.5,
            ease:"power2.inOut",
            onUpdate:()=>{
                setRate(Math.floor(obj.val))
            }
        })
    },[completeRate])

  return (
    <div>
      <p className=" relative flex justify-between">
        <span>糖果總數</span>
        <span className=" absolute left-4/5 translate-x-[-50%]">
          {candyPass > 1000 ? `${candyPass / 1000}K` : candyPass}
        </span>
        <span>
          {" "}
          {candyPerfect > 1000 ? `${candyPerfect / 1000}K` : candyPerfect}
        </span>
      </p>
      <div className="w-full rounded-full relative h-4 bg-bg-module">
        <p className=" absolute z-10 top-1/2 left-1/2 -translate-1/2 text-label text-white">
          合作進度 <span>{rate}</span>%
        </p>

        <div
          className={`absolute z-0 rounded-full h-full bg-gradient-set-1 flex`}
          style={{
            width: `${rate}%`,
            filter: `saturate(${rate / 100 + 0.5})`,
          }}
        ></div>
      </div>
      <p className=" relative flex justify-between">
        <span>關卡總數</span>
        <span className=" absolute left-4/5 translate-x-[-50%]">
          {stagePass}
        </span>
        <span>{stagePerfect}</span>
      </p>
    </div>
  );
}
