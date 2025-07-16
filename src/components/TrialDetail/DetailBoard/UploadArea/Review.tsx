import { Button } from "@/components/ui/button";
import { TrialDetailSupa } from "@/components/types/TrialDetailSupa";

interface acceptProps {
    currentChallenge: TrialDetailSupa | undefined;
    onClick: () => void;
    isReadyToUpload: boolean;
}

export default function Preview(props: acceptProps) {
  const { currentChallenge,onClick,isReadyToUpload } = props;

  return (
    <Button onClick={onClick} disabled={!isReadyToUpload} variant="outline" className="flex flex-col w-full items-center py-2 bg-schema-primary h-fit gap-0 rounded-md">
      <span className="text-p">審核</span>
      <span className="text-label">
        還有 {currentChallenge?.chance_remain} 次機會
      </span>
    </Button>
  );
}
