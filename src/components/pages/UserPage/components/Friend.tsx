// 外層組件 (Friend.tsx)
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  useGetFriendSupa,
  usePatchFriendRequest,
  useDeleteFriendSupa,
} from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { IoCloseSharp } from "react-icons/io5";
import ProfileCard from "@/components/shared/reactBit/ProfileCard";
import { Button } from "@/components/ui/button";
import { monsterDefault, monsterCry } from "@/assets/monster";
import AddFriend from "./AddFriend";

interface FriendUser {
  nick_name: string;
  charactor_img_link: string;
  total_trial_count?: number;
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
  showState?: "accepted" | "pending";
}

export default function Friend({ showState = "accepted" }: FriendProps) {
  const { mutate: patchFriendRequest } = usePatchFriendRequest();
  const queryClient = useQueryClient();
  const { mutate: deleteFriend } = useDeleteFriendSupa();
  const userID = useSelector((state: RootState) => state.account.user_id);
  const { data, isLoading } = useGetFriendSupa(userID);
  const [show, setShow] = useState(false);
  const filteredData =
    data?.filter((friend: FriendItem) => {
      if (showState === "pending") {
        return friend.state === "pending" && friend.address_id === userID;
      } else if (showState === "accepted") {
        return friend.state === "accepted";
      }
      return false;
    }) ?? [];

  useEffect(() => {
    if (isLoading) {
      console.log("isLoading");
      return;
    }
    if (userID === "") {
      console.log("userID is empty");
      return;
    }
    console.log(data);
  }, [data, isLoading, userID]);

  return (
    <div className="flex flex-col gap-8 w-full justify-center items-center">
      <div className="flex justify-between w-full">
        <h3 className="text-xl font-bold ">好友邀請</h3>
        <AddFriend />
      </div>
      <div className="w-full">
        {filteredData.length > 0 ? (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredData?.map((friend: FriendItem) => (
              <li key={friend.id} className="relative group">
                <ProfileCard
                  className="rounded-lg w-full relative h-full flex flex-col gap-2"
                  handle={
                    friend.address_id !== userID
                      ? friend.address_user.nick_name
                      : friend.request_id !== userID
                      ? friend.request_user.nick_name
                      : ""
                  }
                  status={
                    friend.state === "pending"
                      ? friend.note
                      : `${
                          friend.address_user.total_trial_count ??
                          friend.request_user.total_trial_count ??
                          0
                        }試煉 0貼文 `
                  }
                  contactText={
                    friend.state === "pending" ? "接受" : "Contact Me"
                  }
                  avatarUrl={
                    friend.address_id !== userID
                      ? friend.address_user.charactor_img_link
                      : friend.request_id !== userID
                      ? friend.request_user.charactor_img_link
                      : ""
                  }
                  showUserInfo={true}
                  enableTilt={true}
                  // 根據狀態傳遞不同的處理函數
                  onContactClick={() =>
                    patchFriendRequest(
                      {
                        request_id: friend.request_id,
                        address_id: friend.address_id,
                        isAccept: true,
                      },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries({
                            queryKey: ["friend", userID],
                          });
                        },
                      }
                    )
                  }
                />

                <IoCloseSharp
                  className="size-8 absolute top-4 right-4 opacity-0 text-gray-500 group-hover:opacity-100 z-50 transition-opacity duration-200 cursor-pointer hover:text-white"
                  onClick={() => setShow(true)}
                />

                {show && (
                  <div
                    className="fixed inset-0 bg-black/5 flex items-center justify-center z-50"
                    onClick={() => setShow(false)}
                  >
                    <div className="bg-schema-surface-container-high/30 rounded-xl py-6 px-10 text-center shadow-lg relative z-50 flex-col flex gap-3">
                      <h2 className="text-lg font-bold ">確定要刪除好友嗎？</h2>
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
                                id1: friend.request_id,
                                id2: friend.address_id,
                              },
                              {
                                onSuccess: () => {
                                  queryClient.invalidateQueries({
                                    queryKey: ["friend", userID],
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
            ))}
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
