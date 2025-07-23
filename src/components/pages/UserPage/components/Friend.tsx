import { usePostFriendsRequest } from "@/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { useGetFriendSupa, usePatchFriendRequest } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { IoCloseSharp } from "react-icons/io5";
import { useDeleteFriend } from "@/api";
import ProfileCard from "@/components/shared/reactBit/ProfileCard";

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
  const { mutate: postFriendsRequest } = usePostFriendsRequest();
  const [friendID, setFriendID] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const userID = useSelector((state: RootState) => state.account.user_id);
  const { data, isLoading } = useGetFriendSupa(userID);
  const { mutate: patchFriendRequest } = usePatchFriendRequest();
  const queryClient = useQueryClient();
  const { mutate: deleteFriend } = useDeleteFriend();
  const filteredData = data?.filter((friend: FriendItem) => friend.state === showState);

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
    <div className="flex flex-col gap-4 w-full justify-center items-center">
      <div className="flex flex-col gap-4 w-full">
        <ul className="grid grid-cols-4 gap-4">
          {filteredData?.map((friend: FriendItem) => (
            <li key={friend.id} className="relative group">
              <ProfileCard
                className=" rounded-lg p-2 w-full relative  h-full flex flex-col gap-2"
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
                    : `${friend.address_user.total_trial_count ?? friend.request_user.total_trial_count ?? 0}試煉 0貼文 `
                }
                contactText="Contact Me"
                avatarUrl={
                  friend.address_id !== userID
                    ? friend.address_user.charactor_img_link
                    : friend.request_id !== userID
                      ? friend.request_user.charactor_img_link
                      : ""
                }
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => console.log("Contact clicked")}
              />
              <IoCloseSharp
                className="size-8  absolute top-4 right-4 opacity-0 group-hover:opacity-100  z-50 transition-opacity duration-200"
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
              />



              {friend.state === "pending" && (
                <div className="flex w-full justify-between">
                  <Button
                    className="w-1/2"
                    onClick={() =>
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
                  >
                    接受
                  </Button>
                  <Button
                    className="w-1/2"
                    onClick={() =>
                      patchFriendRequest(
                        {
                          request_id: friend.request_id,
                          address_id: friend.address_id,
                          isAccept: false,
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
                    拒絕
                  </Button>
                </div>
              )}


            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
