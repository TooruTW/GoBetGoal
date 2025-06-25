import type { Trial } from "@/features/trials/type";
import type { Challenge } from "@/features/trials/type";
export const participantList = [
    {
        id:"0",
      playerName: "阿強",
      playerTotalTrials: 12,
      isFriend: true,
      playerImgUrl: "/avatar/girlJacketBandage.webp",
      likedPosts:2,
      friends:15,
    },
    {
        id:"1",
      playerName: "小美",
      playerTotalTrials: 27,
      isFriend: false,
      playerImgUrl: "/avatar/girlSkirtBubble.webp",
      likedPosts:5,
      friends:32,
    },
    {
        id:"2",
      playerName: "獵魔士Geralt",
      playerTotalTrials: 42,
      isFriend: true,
      playerImgUrl: "/avatar/girlJacketYoga.webp",
      likedPosts:23,
      friends:53,
    },
    {
        id:"3",
      playerName: "貓貓教主",
      playerTotalTrials: 9,
      isFriend: false,
      playerImgUrl: "/avatar/girlPurpleHeadphone.webp",
      likedPosts:10,
      friends:23,
    },
    {
        id:"4",
      playerName: "雷姆",
      playerTotalTrials: 15,
      isFriend: false,
      playerImgUrl: "/avatar/girlBearJacket.webp",
      likedPosts:0,
      friends:2,
    },
  ];

  export const challengeList: Challenge[] = [
    {
        id: "00001",
        title: "關卡 1",
        description: "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡 午餐：一種水果吃到飽 晚餐：煎雞胸肉＋蔬菜沙拉",
        state: "NOT_STARTED",
        uploadImage: null,
        exampleImage: [
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU"
        ],
        checkCountRemain: 3,
    },
    {
        id: "00002",
        title: "關卡 2",
        description: "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡 午餐：一種水果吃到飽 晚餐：煎雞胸肉＋蔬菜沙拉",
        state: "NOT_STARTED",
        uploadImage: null,
        exampleImage: [
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU"
        ],
        checkCountRemain: 3,
    },
    {
        id: "00003",
        title: "關卡 3",
        description: "早餐：半顆葡萄柚＋1顆水煮蛋＋黑咖啡 午餐：一種水果吃到飽 晚餐：煎雞胸肉＋蔬菜沙拉",
        state: "NOT_STARTED",
        uploadImage: null,
        exampleImage: [
          "https://www.dailynews.com/wp-content/uploads/2022/04/GettyImages-1293479617.jpg?w=525",
          "https://dana.dexterra.com/wp-content/uploads/2024/04/Capture.png",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXxqMAGXOp1LowO9f-30xueB7hYk4_RoyRX55I04-vtelof2ibRkG4tmhyXIYDT9FGJg&usqp=CAU"
        ],
        checkCountRemain: 3,
    }
  ]

  const startDate = new Date(2025, 5, 26);
  const endDate = new Date(2025, 6, 23);

  export const currentTrial: Trial = {
    id: "00001",
    category: "飲食",
    checkType: "AI",
    checkFrequency: 1,
    title: "28天哈佛減肥法",
    description: "適合能忍耐重複食物，逐步瘦身者，採用低卡、低碳、減糖及油為原則，瘦身成效高",
    startDate: startDate,
    endDate: endDate,
    createdAt: new Date(2025, 5, 25),
    createdBy: "園長",
    maxParticipants: 6,
    currentParticipants: participantList,
    challenges: challengeList,
    challengeCount: challengeList.length,
    currentChallengeIndex: 0,
    isActive: (new Date() < startDate),
    investment: 300000,
    reward: 600000,
    bounceRate: 2,
  };