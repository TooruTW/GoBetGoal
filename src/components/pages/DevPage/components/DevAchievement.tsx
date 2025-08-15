import { useAchievementSupa } from "@/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePostAchievementSupa } from "@/api/postAchievementSupa";
import { useDeleteAchievementSupa } from "@/api/deleteAchievementSupa";
import { IoCloseOutline } from "react-icons/io5";
type Achievement = {
  id?: string;
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

  const handleDelete = (id: string) => {
    console.log(id);
    deleteAchievement(id);
  };

  useEffect(() => {
    if (isLoading) return;
    if (error) console.log(error);
    if (data) setAchievements(data);
  }, [data, isLoading, error]);

  return (
    <div className="flex flex-col gap-4 items-center h-screen">
      <div className="w-full">
        <h1 className="text-h1 font-title">成就管理</h1>
      </div>

      <div className="flex  gap-2 w-full items-center">
        {" "}
        <input
          onBlur={(event) => handleInputChange(event)}
          name="order"
          type="text"
          className="border p-1-2 p-4 rounded-md w-full"
          placeholder="編號"
        />
        <input
          onBlur={(event) => handleInputChange(event)}
          name="title"
          type="text"
          className="border p-1-2 p-4 rounded-md"
          placeholder="成就名稱"
        />
        <input
          onBlur={(event) => handleInputChange(event)}
          name="description"
          type="text"
          className="border p-1-2 p-4 rounded-md"
          placeholder="成就說明"
        />
        <input
          onBlur={(event) => handleInputChange(event)}
          name="icon_url"
          type="text"
          className="border p-1-2 p-4 rounded-md "
          placeholder="成就圖片鏈結"
        />
        <Button
          className="border p-1-2 p-4 cursor-pointer"
          onClick={handleSubmit}
        >
          新增成就
        </Button>
      </div>

      <div className="h-screen  my-4 overflow-y-scroll">
        <table className=" p-1-collapse  ">
          <thead className="text-lg text-start ">
            <tr className=" bg-schema-background px-2">
              <th scope="col" className=" px-2">
                編號
              </th>
              <th scope="col" className=" px-2">
                圖片
              </th>
              <th scope="col" className=" px-2">
                ID
              </th>
              <th scope="col" className=" px-2">
                成就名稱
              </th>
              <th scope="col" className=" px-2">
                成就說明
              </th>
              <th scope="col" className=" px-2"></th>
            </tr>
          </thead>

          <tbody className="overflow-y-scroll h-full">
            {achievements.length > 0 &&
              achievements.map((achievement) => (
                <tr
                  key={achievement.id}
                  className="border-b px-2 hover:bg-schema-surface-container-highest"
                >
                  <th scope="row" className=" p-1">
                    {achievement.order}
                  </th>
                  <td className=" p-6">
                    {" "}
                    <img
                      src={achievement.icon_url}
                      alt={achievement.title}
                      className="w-20"
                    />
                  </td>
                  <td className=" p-6 text-schema-on-surface-variant">
                    {achievement.id}
                  </td>
                  <td className=" p-6">{achievement.title}</td>
                  <td className=" p-6">{achievement.description}</td>

                  <td>
                    <button
                      className="text-2xl p-4 cursor-pointer"
                      onClick={() =>
                        achievement.id && handleDelete(achievement.id)
                      }
                    >
                      <IoCloseOutline />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
