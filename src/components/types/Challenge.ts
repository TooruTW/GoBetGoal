export interface UploadImage {
  id: string;
  imageUrl: string;
  createdAt: Date|null;
  isPassed: boolean;
}
export interface Challenge {
  id: string;
  title: string;
  description: string[];
  state:
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "PASSED"
    | "PASSED_WITHOUT_HONOR"
    | "FAILED";
  uploadImage: UploadImage[] ;
  exampleImage: string[];
  checkCountRemain: 3 | 2 | 1 | 0;
  deadline: string;
}
