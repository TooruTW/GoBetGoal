export type Participant = {
    id:string;
    playerName: string;
    playerImgUrl: string;
    playerTotalTrials: number;
    likedPosts:number;
    friends:number;
    isFriend?: boolean;
}