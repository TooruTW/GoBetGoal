# 🥯 GoBetGoal - 社交減重挑戰平台

> 減重太難堅持？你有想過玩遊戲就能養成理想身材嗎？在遊樂場裡，你可以用一點點錢換取貝果幣，跟 AI 小怪獸賭一把，如果你和好友可以完成他發下的減重試煉，就可以得到他的豐厚獎勵，不然貝果幣就會被扣光！透過任務挑戰、排行榜與小懲罰/獎勵機制提升動力。

你敢接下挑戰嗎？

## ⚠️ 重要警語

> **本專案僅為培訓作品，請勿在裡面填入真實個資及使用付款功能**
>
> 若要測試付款功能，請使用測試用帳號：
>
> - 卡號：`4000 2211 1111 1111`
> - 安全碼：任意 3 位數
> - 到期日：任意未來日期
>
> **請勿使用真實信用卡進行測試！**

## 專題網址

- Demo 網站：[GoBetGoal](https://gobetgoal.vercel.app/)
- Pitch 簡報：[Slides 連結](https://www.canva.com/design/DAGu5f2BTZI/pUpio7vWynHZwwwOsPTtzw/view?utm_content=DAGu5f2BTZI&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h3c702c823f)
- 開發成員：
- Sonia | [LinkedIn](https://www.linkedin.com/in/sunny-chen-07b530253/)
- Tooru | [LinkedIn](https://www.linkedin.com/in/育亨-吳-389458150/) | [GitHub](https://github.com/TooruTW)
- Kelly | [GitHub](https://github.com/kc34522) | kelly556320@gmail.com
- Weins | [GitHub](https://github.com/weiweins) | weinssha@gmail.com

## 專案目標

- 運用遊戲機制讓減重變成令人入迷的遊戲
- 透過社交互動增加減重動機
- 提供遊戲化的挑戰體驗
- 建立健康的生活習慣

## 目標用戶

- 想要減重但缺乏動機的人
- 喜歡社交互動的減重者
- 需要互相激勵的減重夥伴
- 追求遊戲化體驗的用戶

## 主要功能

### 挑戰系統

- **創建個人試煉** - 設定減重目標和時間期限
- **邀請朋友參與** - 與好友一起進行減重挑戰
- **進度追蹤** - 即時記錄和監控挑戰進度
- **完成獎勵** - 達成目標獲得虛擬獎勵和成就

### 社交功能

- **好友系統** - 添加和管理減重夥伴
- **動態分享** - 發布減重心得和進度
- **互動點讚** - 為朋友的成就加油打氣
- **即時通知** - 接收挑戰邀請和成就提醒

### 商店系統

- **虛擬貨幣** - 使用 bagel 購買道具
- **頭像裝扮** - 解鎖和購買個性頭像
- **試煉模板** - 購買專業設計的試煉模板

### 遊戲化元素

- **成就徽章** - 收集各種減重成就 （未來可期）
- **進度條** - 視覺化挑戰進度
- **排行榜** - 與朋友競爭減重成果

### 數據追蹤 (開發中, 在路由輸入 /dev 進入工作人員模式)

- **GA4 整合** - Google Analytics 4 數據分析
- **自研後端** - 客製化數據收集系統
- **投資人 Dashboard** - 專為投資人設計的數據儀表板

## 🛠️ 技術棧

### 前端框架

- **React 19** - 主要前端框架
- **TypeScript** - 類型安全的 JavaScript
- **Vite** - 快速建構工具
- **React Router DOM 7** - 路由管理

### 狀態管理

- **Redux Toolkit** - 全域狀態管理
- **React Query (TanStack Query)** - 伺服器狀態管理和快取

### 樣式與 UI

- **Tailwind CSS 4** - 樣式框架
- **shadcn/ui** - 現代化 UI 組件庫
- **Radix UI** - 無樣式 UI 組件
- **React Icons** - 圖標庫
- **Lucide React** - 圖標庫
- **Recharts** - 圖表組件

### 後端與資料庫

- **Supabase** - 後端即服務 (BaaS)
- **PostgreSQL** - 資料庫
- **Supabase Auth** - 身份驗證系統
- **Supabase Storage** - 檔案儲存
- **Supabase Realtime** - 即時資料同步

### 動畫與視覺效果

- **GSAP** - 高級動畫庫
- **Lottie** - 向量動畫
- **Three.js** - 3D 圖形渲染
- **Matter.js** - 物理引擎

### 工具庫

- **dom-to-image-more** - DOM 轉圖片
- **file-saver** - 檔案下載
- **browser-image-compression** - 圖片壓縮
- **React Hook Form** - 表單管理
- **Swiper** - 輪播組件

### 開發工具

- **ESLint** - 程式碼檢查
- **Playwright** - 端到端測試
- **Vite** - 開發伺服器

## 專案結構

```
src/
├── api/                 # API 相關函數
│   ├── getTrialSupa.ts
│   ├── getUserInfoSupa.ts
│   └── ...              # 其他 API 函數
├── assets/             # 靜態資源
│   ├── Achievement/    # 成就相關圖片
│   ├── bagel/          # 貝果相關圖片
│   ├── logo/           # Logo 圖片
│   ├── monster/        # 怪物相關圖片
│   └── ...             # 其他靜態資源
├── components/         # React 組件
│   ├── layout/         # 佈局組件
│   ├── pages/          # 頁面組件
│   ├── shared/         # 共用組件
│   └── ui/             # UI 組件
├── hooks/              # 自定義 Hooks
│   ├── useImageUpload.ts
│   ├── useIntersectionObserver.ts
│   └── ...
├── lib/                # 工具函數
│   └── utils.ts
├── routers/            # 路由設定
│   ├── index.tsx
│   └── routes.tsx
├── store/              # Redux Store
│   ├── index.ts
│   └── slices/         # Redux Slices
├── styles/             # 樣式文件
│   └── index.css
├── types/              # TypeScript 類型定義
│   ├── UserInfoSupa.ts
│   ├── TrialSupa.ts
│   └── ...
├── App.tsx             # 主應用組件
├── main.tsx            # 應用入口
└── supabaseClient.ts   # Supabase 客戶端
```

### 主要目錄說明

- **`api/`** - 所有與 Supabase 相關的 API 函數
- **`assets/`** - 靜態資源，包含圖片、動畫等
- **`components/`** - React 組件，按功能分類
- **`hooks/`** - 自定義 React Hooks
- **`store/`** - Redux 狀態管理
- **`types/`** - TypeScript 類型定義
- **`routers/`** - 路由配置

## git flow 規範

### 分支命名

- **main**：正式可發佈分支，僅接受 PR 合併（禁止直接 push），合併後可上線。
- **dev**：日常整合分支，所有工作分支一律從這裡切出（禁止直接 push 到 `main`/`dev`）。
- `feature/<scope>-<summary>`
- `fix/<scope>-<summary>`
- `hotfix/<summary>`（緊急修補從 `main` 切出）
- `chore/<scope>-<summary>`
- 建議可附 issue 編號：如 `feature/auth-setup-#123`

### Commit 命名（Conventional Commits）

- 格式：`<type>(<scope>): <subject>`
- type：`feat` / `fix` / `docs` / `style` / `refactor` / `perf` / `test` / `chore`
- 例：`feat(auth): add email/password login flow`
- PR 標題同樣使用 Conventional Commits，PR 盡量小而頻繁

### 流程

#### 一般開發

1. 從 `dev` 切出工作分支
2. 編輯
3. 執行 `npm run build` 檢查是否有錯誤
4. 將分支推到 GitHub
5. 發送合併至 `dev` 的 PR
6. 檢查無誤後合併至 `dev`
7. 本地端更新最新 `dev`

#### 合併到 main

1. 開新工作分支
2. 檢查是否有 bug
3. 最佳化可讀性
4. 將分支推到 GitHub
5. 發送合併至 `dev` 的 PR
6. 檢查無誤後合併至 `dev`
7. 在 GitHub 上發與 `main` 分支合併的 PR
8. 合併至 `main`
