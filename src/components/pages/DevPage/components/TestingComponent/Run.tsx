import FaultyTerminal from "@/components/shared/reactBit/FaultyTerminal";

export default function Run() {
  return (
    <div className="w-full flex flex-col items-center relative bg-amber-500">
      <img src="/image/machine.png" alt="" className="" />
      <div className=" overflow-hidden rounded-md absolute top-34 w-4/7 object-cover">
        <video autoPlay loop muted playsInline className="   h-full  ">
          {/* Safari 等瀏覽器可能讀 mov（但建議轉成 mp4） */}
          <source
            src="/animation/sideVaporwave.mp4"
            type='video/mp4; codecs="hvc1"'
            className="rounded-4xl"
          />
          {/* Chrome / Firefox / Edge 建議使用 webm */}
          <source
            src="/animation/sideVaporwave.webm"
            type="video/webm"
            className="rounded-4xl"
          />
        </video>
      </div>

      <video autoPlay loop className=" w-1/4 absolute z-20 top-1/4">
        <source
          src="/animation/mainCharacter/character45.webm"
          type="video/webm"
        />
      </video>
      <div className="w-2/3 h-auto aspect-video absolute z-10 top-1/4  rounded-md ">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#eba7e4"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={1}
        />
      </div>
    </div>
  );
}
