
export type dayBoxType = {
    date: string;
    isThisMonth: boolean;
    isThisDate: boolean;
    challenge: string[];
    stageIndex: number | null;
    imageUrl: string[];
    dayType: "start" | "end" | "middle" | "none" | "start-end";
    status: "pending" | "pass" | "fail" | "cheat" | null;
  };