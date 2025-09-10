import { useGetAvatar } from "@/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePostAvatarSupa } from "@/api/postAvatarSupa";
import { useDeleteAvatarSupa } from "@/api/deleteAvatarSupa";
import { IoCloseOutline } from "react-icons/io5";

type Avatar = {
  id?: string;
  character_img_link: string;
  price: number;
};

export default function DevAvatar() {
  const { data, isLoading, error } = useGetAvatar();
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [input, setInput] = useState<Avatar>({
    character_img_link: "",
    price: 0,
  });
  const { mutate: postAvatar } = usePostAvatarSupa();
  const { mutate: deleteAvatar } = useDeleteAvatarSupa();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "price" ? Number(e.target.value) : e.target.value;
    setInput({ ...input, [e.target.name]: value });
  };

  const handleSubmit = () => {
    console.log(input);
    postAvatar(input);
  };

  const handleDelete = (id: string) => {
    console.log(id);
    deleteAvatar(id);
  };

  useEffect(() => {
    if (isLoading || error || !data) return;
    if (error) if (data) console.log(error);
    setAvatars(data);
  }, [data, isLoading, error]);

  return (
    <div className="flex flex-col gap-4 items-center h-screen">
      <div className="w-full">
        <h1 className="text-h1 font-title">頭像管理</h1>
      </div>

      <div className="flex gap-2 w-full items-center">
        <input
          onBlur={(event) => handleInputChange(event)}
          name="character_img"
          type="text"
          className="border p-1-2 p-4 rounded-md w-full"
          placeholder="頭像圖片連結"
        />
        <input
          onBlur={(event) => handleInputChange(event)}
          name="price"
          type="number"
          className="border p-1-2 p-4 rounded-md"
          placeholder="價格"
        />
        <Button
          className="border p-1-2 p-4 cursor-pointer"
          onClick={handleSubmit}
        >
          新增頭像
        </Button>
      </div>

      <div className="h-screen my-4 overflow-y-scroll">
        <table className="p-1-collapse">
          <thead className="text-lg text-start">
            <tr className="bg-schema-background px-2">
              <th scope="col" className="px-2">
                圖片
              </th>
              <th scope="col" className="px-2">
                ID
              </th>
              <th scope="col" className="px-2">
                價格
              </th>
              <th scope="col" className="px-2"></th>
            </tr>
          </thead>

          <tbody className="overflow-y-scroll h-full">
            {avatars.length > 0 &&
              avatars.map((avatar) => (
                <tr
                  key={avatar.id}
                  className="border-b px-2 hover:bg-schema-surface-container-highest"
                >
                  <td className="p-6">
                    <img
                      src={avatar.character_img_link}
                      alt="avatar"
                      className="w-20"
                    />
                  </td>
                  <td className="p-6 text-schema-on-surface-variant">
                    {avatar.id}
                  </td>
                  <td className="p-6">{avatar.price}</td>
                  <td>
                    <button
                      className="text-2xl p-4 cursor-pointer"
                      onClick={() => avatar.id && handleDelete(avatar.id)}
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
