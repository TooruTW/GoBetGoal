import { IoClose } from "react-icons/io5";

export default function TempleteDetail({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="w-full bg-schema-surface-container p-6 rounded-lg flex flex-col gap-6 items-center">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-h2">試煉詳情</h2>
        <IoClose className="size-6" onClick={() => setIsOpen(true)}></IoClose>
      </div>
      <div className="flex flex-col gap-2 w-full border-1 border-schema-outline rounded-lg p-6">
        <h3 className="text-h3">功效</h3>
        <span className="px-3 py-2 rounded-full bg-schema-surface-container-highest w-fit">
          # 改善整體健康狀況
        </span>
      </div>
      <div className="flex flex-col gap-2 w-full border-1 border-schema-outline rounded-lg p-6">
        <h3 className="text-h3">適合</h3>
        <span className="px-3 py-2 rounded-full bg-schema-surface-container-highest w-fit">
          # 想減肥者
        </span>
      </div>
      <div className="flex flex-col gap-2 w-full border-1 border-schema-outline rounded-lg p-6">
        <h3 className="text-h3">不適合</h3>
        <span className="px-3 py-2 rounded-full bg-schema-surface-container-highest w-fit">
          # 肝臟或腎臟疾病的患者
        </span>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h3 className="text-h3">關卡</h3>
        <div className="flex w-full gap-2 h-fit">
          <div className="w-5">00</div>
          <div className="w-4 relative translate-y-1">
            <div className="w-4 h-4 rounded-full bg-white"></div>
            <div className="w-1/5 h-[120%] bg-white absolute top-0 left-1/2 -translate-x-1/2"></div>
          </div>
          <ul className="list-disc pl-4 flex flex-col gap-2">
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
        <div className="flex w-full gap-2 h-fit">
          <div className="w-5">00</div>
          <div className="w-4 relative translate-y-1">
            <div className="w-4 h-4 rounded-full bg-white"></div>
            <div className="w-1/5 h-[110%] bg-white absolute top-0 left-1/2 -translate-x-1/2"></div>
          </div>
          <ul className="list-disc pl-4 flex flex-col gap-2">
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full border-1 border-schema-outline rounded-lg p-6">
        <h3 className="text-h3">守則</h3>
        <ul className="list-disc pl-4 flex flex-col gap-2">
          <li>守則1</li>
          <li>守則2</li>
          <li>守則3</li>
          <li>守則4</li>
          <li>守則5</li>
          <li>守則6</li>
          <li>守則7</li>
        </ul>
      </div>

      <div className="flex flex-col gap-2 w-full border-1 border-schema-outline rounded-lg p-6">
        <h3 className="text-h3">注意</h3>
        <ul className="list-disc pl-4 flex flex-col gap-2">
          <li>注意事項1</li>
          <li>注意事項2</li>
        </ul>
      </div>
    </div>
  );
}
