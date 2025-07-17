import { useAchievementSupa } from "@/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePostAchievementSupa } from "@/api/postAchievementSupa";
import { useDeleteAchievementSupa } from "@/api/deleteAcievementSupa";
type Achievement = {
  id?: number;
  created_at?: string;
  order: number;
  title: string;
  description: string;
  icon_url: string;
};

export default function DevAchievement() {
  const { data, isLoading, error } = useAchievementSupa();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [input, setInput] = useState<Achievement>({
    order: 0,
    title: "",
    description: "",
    icon_url: "",
  });
  const { mutate: postAchievement } = usePostAchievementSupa();
  const { mutate: deleteAchievement } = useDeleteAchievementSupa();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(input);
    postAchievement(input);
  };

  const handleDelete = (id: number) => {
    console.log(id);
    deleteAchievement(id);
  };

  useEffect(() => {
    if (isLoading) return;
    if (error) console.log(error);
    if (data) setAchievements(data);
  }, [data, isLoading, error]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1>Achievements</h1>
      <div>
        <ul className="grid grid-cols-2 gap-4">
          {achievements.length > 0 &&
            achievements.map((achievement) => (
              <li
                className="border-2 p-4 rounded-md flex flex-col gap-4"
                key={achievement.id}
              >
                <h2 className="text-xl">id: {achievement.id}</h2>
                <h2 className="text-xl">編號: {achievement.order}</h2>
                <h2 className="text-2xl font-bold">
                  成就名稱: {achievement.title}
                </h2>
                <p className="text-2xl ">成就說明: {achievement.description}</p>
                <img
                  src={achievement.icon_url}
                  alt={achievement.title}
                  className="w-1/2 h-1/2"
                />
                <Button
                  className="border-2 p-4 cursor-pointer"
                  onClick={() => achievement.id && handleDelete(achievement.id)}
                >
                  刪除
                </Button>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <div>
          {" "}
          <input
            onBlur={(event) => handleInputChange(event)}
            name="order"
            type="text"
            className="border-2 p-4 rounded-md"
            placeholder="編號"
          />
          <input
            onBlur={(event) => handleInputChange(event)}
            name="title"
            type="text"
            className="border-2 p-4 rounded-md"
            placeholder="成就名稱"
          />
          <input
            onBlur={(event) => handleInputChange(event)}
            name="description"
            type="text"
            className="border-2 p-4 rounded-md"
            placeholder="成就說明"
          />
        </div>
        <input
          onBlur={(event) => handleInputChange(event)}
          name="icon_url"
          type="text"
          className="border-2 p-4 rounded-md w-full"
          placeholder="成就圖片鏈結"
        />
      </div>
      <Button className="border-2 p-4 cursor-pointer" onClick={handleSubmit}>
        新增成就
      </Button>
    </div>
  );
}
