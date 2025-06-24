type info = {
  frequency: string;
  stageNum: number;
  duration: number;
  people: number;
};
interface acceptProps {
  title: string;
  content: string;
  trailInfo: info;
}

export default function TextContent(props: acceptProps) {
  const { title, content, trailInfo } = props;
  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-p">{title}</p>
      <p>{content}</p>
      <ul className="columns-4">
        <li className="p-2 bg-bg-secondary/50 rounded-md w-full mb-2">
          <p className="text-label">關卡頻率</p>
          <p>{trailInfo.frequency}</p>
        </li>
        <li className="p-2 bg-bg-secondary/50 rounded-md w-full mb-2">
          <p className="text-label">關卡數量</p>
          <p>{trailInfo.stageNum}</p>
        </li>
        <li className="p-2 bg-bg-secondary/50 rounded-md w-full mb-2">
          <p className="text-label">試煉總天數</p>
          <p>{trailInfo.duration}</p>
        </li>
        <li className="p-2 bg-bg-secondary/50 rounded-md w-full mb-2">
          <p className="text-label">人數</p>
          <p>{trailInfo.people}</p>
        </li>
      </ul>
    </div>
  );
}
