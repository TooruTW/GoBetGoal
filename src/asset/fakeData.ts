import type { Trial } from "@/features/trials/type";
import type { Challenge } from "@/features/trials/type";

const createdAt = new Date(2025, 5, 20);
const createdAtFormatted = createdAt.toISOString();
const startDate = new Date(2025, 5, 24);
const startDateFormatted = startDate.toISOString();
const duration = 7;
const endDate = new Date(startDate.getTime() + duration * 1000 * 60 * 60 * 24);
const endDateFormatted = endDate.toISOString();
const isActive = new Date() < startDate;
const checkFrequency = "每日";

export const participantList = [
  {
    id: "0",
    playerName: "阿強",
    playerTotalTrials: 12,
    isFriend: true,
    playerImgUrl: "/avatar/girlJacketBandage.webp",
    likedPosts: 2,
    friends: 15,
  },
  {
    id: "1",
    playerName: "小美",
    playerTotalTrials: 27,
    isFriend: false,
    playerImgUrl: "/avatar/girlSkirtBubble.webp",
    likedPosts: 5,
    friends: 32,
  },
  {
    id: "2",
    playerName: "獵魔士Geralt",
    playerTotalTrials: 42,
    isFriend: true,
    playerImgUrl: "/avatar/girlJacketYoga.webp",
    likedPosts: 23,
    friends: 53,
  },
  {
    id: "3",
    playerName: "貓貓教主",
    playerTotalTrials: 9,
    isFriend: false,
    playerImgUrl: "/avatar/girlPurpleHeadphone.webp",
    likedPosts: 10,
    friends: 23,
  },
  {
    id: "4",
    playerName: "雷姆",
    playerTotalTrials: 15,
    isFriend: false,
    playerImgUrl: "/avatar/girlBearJacket.webp",
    likedPosts: 0,
    friends: 2,
  },
];

export const fakeChallengeList: Challenge[] = [
  {
    id: "00001",
    title: "關卡 1",
    description:
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡 午餐：一種水果吃到飽 晚餐：煎雞胸肉＋蔬菜沙拉",
    state: "NOT_STARTED",
    uploadImage: null,
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 1 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00002",
    title: "關卡 2",
    description:
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡 午餐：一種水果吃到飽 晚餐：煎雞胸肉＋蔬菜沙拉",
    state: "NOT_STARTED",
    uploadImage: null,
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 2 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00003",
    title: "關卡 3",
    description:
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡 午餐：一種水果吃到飽 晚餐：煎雞胸肉＋蔬菜沙拉",
    state: "NOT_STARTED",
    uploadImage: null,
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 3 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00004",
    title: "關卡 4",
    description:
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡 午餐：一種水果吃到飽 晚餐：煎雞胸肉＋蔬菜沙拉",
    state: "NOT_STARTED",
    uploadImage: null,
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 4 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00005",
    title: "關卡 5",
    description:
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡 午餐：一種水果吃到飽 晚餐：煎雞胸肉＋蔬菜沙拉",
    state: "NOT_STARTED",
    uploadImage: null,
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 5 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00006",
    title: "關卡 6",
    description:
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡 午餐：一種水果吃到飽 晚餐：煎雞胸肉＋蔬菜沙拉",
    state: "NOT_STARTED",
    uploadImage: null,
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 6 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00007",
    title: "關卡 7",
    description:
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡 午餐：一種水果吃到飽 晚餐：煎雞胸肉＋蔬菜沙拉",
    state: "NOT_STARTED",
    uploadImage: null,
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 7 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
];

export const fakeCurrentTrial: Trial = {
  id: "00001",
  isPublic: true,
  category: "飲食",
  checkType: "AI",
  checkFrequency: checkFrequency,
  title: "28天哈佛減肥法",
  description:
    "適合能忍耐重複食物，逐步瘦身者，採用低卡、低碳、減糖及油為原則，瘦身成效高",
  startDate: startDateFormatted,
  endDate: endDateFormatted,
  duration: duration,
  createdAt: createdAtFormatted,
  createdBy: "園長",
  maxParticipants: 6,
  currentParticipants: participantList,
  challenges: fakeChallengeList,
  challengeCount: fakeChallengeList.length,
  passedChallengesCount: 6,
  currentChallengeIndex: 7,
  isActive: isActive,
  investment: 300000,
  reward: 600000,
  bounceRate: 2,
};
