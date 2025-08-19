import SlotMachine from "@/components/pages/DevPage/components/TestingComponent/SlotMachine";

export default function DevComponent() {
  return (
    <>
      <video autoPlay loop className=" w-60">
        <source
          src="/animation/mainCharacter/character45.webm"
          type="video/webm"
        />
        您的瀏覽器不支援 video 播放。
      </video>
      <SlotMachine />
    </>
  );
}
