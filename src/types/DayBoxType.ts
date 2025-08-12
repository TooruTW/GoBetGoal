
export type dayBoxType = {
    date: string;
    isThisMonth: boolean;
    isThisDate: boolean;
    challenge: string[];
    imageUrl: string[];
    dayType: "start" | "end" | "middle" | "none";
  };