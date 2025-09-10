// 外層組件 (Friend.tsx)
import { useEffect, useState } from "react";
import {
  useGetFriendSupa,
  // usePatchFriendRequest,
  useDeleteFriendSupa,
} from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { IoCloseSharp } from "react-icons/io5";
import ProfileCard from "@/components/shared/reactBit/ProfileCard";
import { Button } from "@/components/ui/button";
import { monsterDefault, monsterCry } from "@/assets/monster";
import AddFriend from "./AddFriend";
import { useNavigate, useParams } from "react-router-dom";

interface FriendUser {
  nick_name: string;
  character_img_link: string;
  total_trial_count?: number;
  trial_pass_count?: number;
}

interface FriendItem {
  id: string;
  address_id: string;
  request_id: string;
  state: string;
  note?: string;
  address_user: FriendUser;
  request_user: FriendUser;
}

interface FriendProps {
  showState?: "accept" | "pending";
}

export default function Friend({ showState = "accept" }: FriendProps) {
  // const { mutate: patchFriendRequest } = usePatchFriendRequest();
  const queryClient = useQueryClient();
  const { mutate: deleteFriend } = useDeleteFriendSupa();
  const { id } = useParams();
  const { data, isLoading } = useGetFriendSupa(id || "");
  const [show, setShow] = useState(false);
  const [friendList, setFriendList] = useState<FriendItem[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading || !data || !id) return;
    const filteredData = data.filter((friend: FriendItem) => {
      if (showState === "pending") {
        return friend.state === "pending" && friend.address_id === id;
      } else if (showState === "accept") {
        return friend.state === "accept";
      }
      return false;
    });
    // console.log(filteredData);
    setFriendList(filteredData);
  }, [data, isLoading, id, showState]);

  return (
    <div className="flex flex-col gap-8 w-full justify-center items-center">
      <div className="flex justify-between w-full">
        <h3 className="text-xl font-bold ">好友</h3>
        <AddFriend />
      </div>
      <div className="w-full">
        {friendList.length > 0 ? (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {friendList?.map((friend: FriendItem) => {
              const thisId =
                friend.address_id !== id
                  ? friend.address_id
                  : friend.request_id;
              const thisNickName =
                friend.address_id !== id
                  ? friend.address_user.nick_name
                  : friend.request_user.nick_name;
              const thisAvatarUrl =
                friend.address_id !== id
                  ? friend.address_user.character_img_link
                  : friend.request_user.character_img_link;
              const thisTrialCount =
                friend.address_id !== id
                  ? friend.address_user.total_trial_count
                  : friend.request_user.total_trial_count;
              const thisTrialPassCount =
                friend.address_id !== id
                  ? friend.address_user.trial_pass_count
                  : friend.request_user.trial_pass_count;

              return (
                <li key={friend.id} className="relative group">
                  <ProfileCard
                    className="rounded-lg w-full relative h-full flex flex-col gap-2"
                    handle={thisNickName}
                    status={`當前戰績 ${thisTrialPassCount} / ${thisTrialCount} `}
                    contactText={
                      friend.state === "pending" ? "接受" : "Contact Me"
                    }
                    avatarUrl={thisAvatarUrl}
                    showUserInfo={true}
                    enableTilt={true}
                    // 根據狀態傳遞不同的處理函數
                    onContactClick={() => navigate(`/user/${thisId}`)}
                  />

                  <IoCloseSharp
                    className="size-8 absolute top-4 right-4 opacity-0 text-gray-500 group-hover:opacity-100 z-10 transition-opacity duration-200 cursor-pointer hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      // console.log("got click");
                      setShow(true);
                    }}
                  />

                  {show && (
                    <div className="fixed w-full h-full top-0 left-0 bg-black/5 flex items-center justify-center z-50">
                      <div className="bg-schema-surface-container-high/30 rounded-xl py-6 px-10 text-center shadow-lg relative z-50 flex-col flex gap-3">
                        <h2 className="text-lg font-bold ">
                          確定要刪除好友嗎？
                        </h2>
                        {/* <img src={monsterCry} alt="" className="w-full" /> */}
                        <p className="text-sm">嗚嗚嗚</p>
                        <img src={monsterCry} alt="" className="w-40" />
                        <div className="flex justify-center gap-4 ">
                          <Button
                            variant="outline"
                            onClick={() => setShow(false)}
                          >
                            取消
                          </Button>
                          <Button
                            onClick={() =>
                              deleteFriend(
                                {
                                  user_id: friend.request_id,
                                  friend_id: friend.address_id,
                                },
                                {
                                  onSuccess: () => {
                                    queryClient.invalidateQueries({
                                      queryKey: ["friend", id],
                                    });
                                  },
                                }
                              )
                            }
                          >
                            確認
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <img src={monsterDefault} alt="no-friend" className="w-40" />
            <p className="text-h4 mb-4">
              {showState === "pending"
                ? "哈哈沒有朋友邀請你"
                : "哈哈你沒有朋友"}
            </p>
            <Button>去交朋友</Button>
          </div>
        )}
      </div>
    </div>
  );
}
