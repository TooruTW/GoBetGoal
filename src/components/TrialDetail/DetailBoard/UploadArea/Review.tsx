import type { Challenge } from "@/components/types/Challenge";
import { Button } from "@/components/ui/button";

interface acceptProps {
  currentChallenge: Challenge;
}

export default function review(props: acceptProps) {
  const { currentChallenge } = props;

  const handleClick =()=>{
    console.log("click")
  }
  return (
    <Button onClick={handleClick} variant="outline" className="flex flex-col w-full items-center py-2 bg-schema-primary h-fit gap-0 rounded-md">
      <span className="text-p">審核</span>
      <span className="text-label">
        還有 {currentChallenge.checkCountRemain} 次機會
      </span>
    </Button>
  );
}
