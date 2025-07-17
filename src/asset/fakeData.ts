import type { Trial } from "@/types/Trial";
import type { Challenge } from "@/types/Challenge";

const createdAt = new Date(2025, 5, 20);
const createdAtFormatted = createdAt.toISOString();
const startDate = new Date(2025, 5, 26);
const startDateFormatted = startDate.toISOString();
const duration = 7;
const endDate = new Date(startDate.getTime() + duration * 1000 * 60 * 60 * 24);
const endDateFormatted = endDate.toISOString();
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
    playerImgUrl: "/avatar/boyGymStrong.webp",
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
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
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
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
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
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
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
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
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
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
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
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
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
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
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
  {
    id: "00008",
    title: "關卡 8",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00009",
    title: "關卡 9",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00010",
    title: "關卡 10",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00011",
    title: "關卡 11",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00012",
    title: "關卡 12",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "00003",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00013",
    title: "關卡 13",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00014",
    title: "關卡 14",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00015",
    title: "關卡 15",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00016",
    title: "關卡 16",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00017",
    title: "關卡 17",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00018",
    title: "關卡 18",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00019",
    title: "關卡 19",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00020",
    title: "關卡 20",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00021",
    title: "關卡 21",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00022",
    title: "關卡 22",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00023",
    title: "關卡 23",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00024",
    title: "關卡 24",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00025",
    title: "關卡 25",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00026",
    title: "關卡 26",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00027",
    title: "關卡 27",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
  {
    id: "00028",
    title: "關卡 28",
    description: [
      "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
      "午餐：一種水果吃到飽",
      "晚餐：煎雞胸肉＋蔬菜沙拉",
    ],
    state: "NOT_STARTED",
    uploadImage: [
      {
        id: "1",
        imageUrl:
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "2",
        imageUrl:
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
      {
        id: "3",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
        createdAt: null,
        isPending:false,
        isPassed: false,
      },
    ],
    exampleImage: [
      "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
      "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
    ],
    checkCountRemain: 3,
    deadline: new Date(
      startDate.getTime() + 8 * 1000 * 60 * 60 * 24
    ).toISOString(),
  },
];

export const fakeTrialList: Trial[] = [
  {
    id: "00",
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
    passedChallengesCount: 23,
    currentChallengeIndex: 28,
    investment: 300000,
    reward: 600000,
    bounceRate: 2,
    trialState: "待開始",
    history: [
      {
        id: "00001",
        message: "試煉將於 2025/06/25 00:00 開始",
        createdAt: new Date(2025, 5, 24).toISOString(),
      },
    ],
  },
  {
    id: "01",
    isPublic: true,
    category: "運動",
    checkType: "AI",
    checkFrequency: "每週",
    title: "30天居家健身挑戰",
    description:
      "每天30分鐘居家運動，包含有氧、肌力訓練，適合初學者到進階者，打造健康體態",
    startDate: new Date(2025, 6, 1).toISOString(),
    endDate: new Date(2025, 6, 30).toISOString(),
    duration: 30,
    createdAt: new Date(2025, 5, 25).toISOString(),
    createdBy: "健身教練小明",
    maxParticipants: 8,
    currentParticipants: participantList.slice(0, 3),
    challenges: fakeChallengeList.slice(0, 10),
    challengeCount: 10,
    passedChallengesCount: 7,
    currentChallengeIndex: 8,
    investment: 200000,
    reward: 400000,
    bounceRate: 1.5,
    trialState: "進行中",
    history: [
      {
        id: "00001",
        message: "阿強 創建試煉",
        createdAt: "2025-06-30T10:00:00.000Z",
      },
      {
        id: "00002",
        message: "小美 加入試煉團隊",
        createdAt: "2025-06-30T10:05:00.000Z",
      },
      {
        id: "00003",
        message: "獵魔士Geralt 加入試煉團隊",
        createdAt: "2025-06-30T10:10:00.000Z",
      },
      {
        id: "00004",
        message: "貓貓教主 加入試煉團隊",
        createdAt: "2025-07-30T10:15:00.000Z",
      },
      {
        id: "00005",
        message: "雷姆 加入試煉團隊",
        createdAt: "2025-06-30T10:20:00.000Z",
      },
      {
        id: "00006",
        message: "試煉將於 1 天後開始",
        createdAt: "2025-07-01T10:25:00.000Z",
      },
      {
        id: "00007",
        message: "試煉開始",
        createdAt: "2025-07-02T00:00:00.000Z",
      },
      {
        id: "00008",
        message: "阿強 通過關卡 1",
        createdAt: "2025-07-03T10:35:00.000Z",
      },
      {
        id: "00009",
        message: "獵魔士Geralt 關卡 1 失敗",
        createdAt: "2025-07-03T10:40:00.000Z",
      },
      {
        id: "00010",
        message: "貓貓教主 通過關卡 1",
        createdAt: "2025-07-03T10:45:00.000Z",
      },
    ],
  },
  {
    id: "02",
    isPublic: false,
    category: "作息",
    checkType: "MANUAL",
    checkFrequency: "每日",
    title: "21天英文口說練習",
    description:
      "每天練習英文口說15分鐘，透過AI語音辨識技術，提升發音準確度和流暢度",
    startDate: new Date(2025, 5, 15).toISOString(),
    endDate: new Date(2025, 6, 5).toISOString(),
    duration: 21,
    createdAt: new Date(2025, 5, 10).toISOString(),
    createdBy: "英文老師小華",
    maxParticipants: 4,
    currentParticipants: participantList.slice(1, 4),
    challenges: [
      {
        id: "00001",
        title: "關卡 1",
        description: [
          "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
          "午餐：一種水果吃到飽",
          "晚餐：煎雞胸肉＋蔬菜沙拉",
        ],
        state: "NOT_STARTED",
        uploadImage: [
          {
            id: "1",
            imageUrl:
              "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "2",
            imageUrl:
              "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "3",
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
        ],
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
        description: [
          "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
          "午餐：一種水果吃到飽",
          "晚餐：煎雞胸肉＋蔬菜沙拉",
        ],
        state: "NOT_STARTED",
        uploadImage: [
          {
            id: "1",
            imageUrl:
              "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "2",
            imageUrl:
              "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "3",
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
        ],
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
        description: [
          "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
          "午餐：一種水果吃到飽",
          "晚餐：煎雞胸肉＋蔬菜沙拉",
        ],
        state: "NOT_STARTED",
        uploadImage: [
          {
            id: "1",
            imageUrl:
              "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "2",
            imageUrl:
              "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "3",
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
        ],
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
        description: [
          "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
          "午餐：一種水果吃到飽",
          "晚餐：煎雞胸肉＋蔬菜沙拉",
        ],
        state: "NOT_STARTED",
        uploadImage: [
          {
            id: "1",
            imageUrl:
              "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "2",
            imageUrl:
              "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "3",
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
        ],
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
        description: [
          "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
          "午餐：一種水果吃到飽",
          "晚餐：煎雞胸肉＋蔬菜沙拉",
        ],
        state: "NOT_STARTED",
        uploadImage: [
          {
            id: "1",
            imageUrl:
              "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "2",
            imageUrl:
              "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "3",
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
        ],
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
        description: [
          "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
          "午餐：一種水果吃到飽",
          "晚餐：煎雞胸肉＋蔬菜沙拉",
        ],
        state: "NOT_STARTED",
        uploadImage: [
          {
            id: "1",
            imageUrl:
              "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "2",
            imageUrl:
              "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "3",
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
        ],
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
        description: [
          "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡",
          "午餐：一種水果吃到飽",
          "晚餐：煎雞胸肉＋蔬菜沙拉",
        ],
        state: "NOT_STARTED",
        uploadImage: [
          {
            id: "1",
            imageUrl:
              "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "2",
            imageUrl:
              "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
          {
            id: "3",
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU",
            createdAt: null,
            isPending:false,
            isPassed: false,
          },
        ],
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
    ],
    challengeCount: 7,
    passedChallengesCount: 5,
    currentChallengeIndex: 1,
    investment: 150000,
    reward: 300000,
    bounceRate: 1.8,
    trialState: "進行中",
    history: [
      {
        id: "10001",
        message: "阿強 創建試煉 A",
        createdAt: "2025-07-01T09:00:00.000Z",
      },
      {
        id: "10002",
        message: "小美 加入試煉 A 團隊",
        createdAt: "2025-07-01T09:05:00.000Z",
      },
      {
        id: "10003",
        message: "試煉 A 將於 1 天後開始",
        createdAt: "2025-07-01T09:10:00.000Z",
      },
      {
        id: "10004",
        message: "試煉 A 開始",
        createdAt: "2025-07-02T00:00:00.000Z",
      },
      {
        id: "10005",
        message: "阿強 通過試煉 A 關卡 1",
        createdAt: "2025-07-02T10:00:00.000Z",
      },
    ],
  },
  {
    id: "03",
    isPublic: true,
    category: "作息",
    checkType: "AI",
    checkFrequency: "每日",
    title: "14天早起挑戰",
    description: "連續14天早上6點前起床，建立規律作息，提升生活品質和工作效率",
    startDate: new Date(2025, 7, 1).toISOString(),
    endDate: new Date(2025, 7, 14).toISOString(),
    duration: 14,
    createdAt: new Date(2025, 6, 28).toISOString(),
    createdBy: "生活達人阿美",
    maxParticipants: 10,
    currentParticipants: participantList,
    challenges: fakeChallengeList.slice(0, 14),
    challengeCount: 14,
    passedChallengesCount: 0,
    currentChallengeIndex: 0,
    investment: 100000,
    reward: 200000,
    bounceRate: 3,
    trialState: "待開始",
    history: [
      {
        id: "20001",
        message: "雷姆 創建試煉 B",
        createdAt: "2025-07-05T09:00:00.000Z",
      },
      {
        id: "20002",
        message: "貓貓教主 加入試煉 B 團隊",
        createdAt: "2025-07-05T09:10:00.000Z",
      },
      {
        id: "20003",
        message: "試煉 B 將於 1 天後開始",
        createdAt: "2025-07-05T09:20:00.000Z",
      },
      {
        id: "20004",
        message: "試煉 B 開始",
        createdAt: "2025-07-06T00:00:00.000Z",
      },
      {
        id: "20005",
        message: "雷姆 通過試煉 B 關卡 1",
        createdAt: "2025-07-06T10:00:00.000Z",
      },
    ],
  },
];
