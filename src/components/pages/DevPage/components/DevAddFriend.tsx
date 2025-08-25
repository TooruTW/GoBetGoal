import { usePostFriendsRequest } from "@/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { useGetFriendSupa, usePatchFriendRequest } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { IoCloseSharp } from "react-icons/io5";
import { useDeleteFriendSupa } from "@/api";

export default function DevAddFriend() {
  const { mutate: postFriendsRequest } = usePostFriendsRequest();
  const [friendID, setFriendID] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const userID = useSelector((state: RootState) => state.account.user_id);
  const { data, isLoading } = useGetFriendSupa(userID);
  const { mutate: patchFriendRequest } = usePatchFriendRequest();
  const queryClient = useQueryClient();
  const { mutate: deleteFriend } = useDeleteFriendSupa();

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
      <div className="flex flex-col gap-4 w-1/2">
        <h1>DevAddFriend</h1>
        <input
          type="text"
          placeholder="輸入好友ID"
          className="border-1 border-schema-outline rounded-lg p-2"
          onBlur={(e) => setFriendID(e.target.value)}
        />
        <input
          type="text"
          placeholder="輸入好友備註"
          className="border-1 border-schema-outline rounded-lg p-2"
          onBlur={(e) => setNote(e.target.value)}
        />
        <Button
          onClick={() =>
            postFriendsRequest(
              {
                request_id: userID,
                address_id: friendID,
                note: note,
              },
              {
                onSuccess: () => {
                  console.log("新增好友成功");
                },
              }
            )
          }
        >
          新增好友
        </Button>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1>DevAccountFriends</h1>
        <h2>my id: {userID}</h2>
        <ul className="grid grid-cols-4 gap-4">
          {data?.map((friend) => (
            <li key={friend.id} className="h-170">
              <div className="border-1 border-schema-outline rounded-lg p-2 w-full relative group h-full flex flex-col gap-2">
                <IoCloseSharp
                  className="size-10 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={() =>
                    deleteFriend(
                      {
                        user_id: friend.request_id,
                        friend_id: friend.address_id,
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
                <p>{friend.state}</p>
                {friend.address_id !== userID && (
                  <>
                    <p>{friend.address_id}</p>
                    <h2 className="text-center text-h2">
                      {friend.address_user.nick_name}
                    </h2>
                    <img
                      className="w-full rounded-full"
                      src={friend.address_user.character_img_link}
                      alt=""
                    />
                    {friend.state === "pending" && <p>等待回應</p>}
                    {friend.state === "accept" && <p>已接受</p>}
                    {friend.state === "rejected" && <p>已拒絕</p>}
                  </>
                )}
                {friend.request_id !== userID && (
                  <>
                    <p>{friend.request_id}</p>
                    <h2 className="text-center text-h2">
                      {friend.request_user.nick_name}
                    </h2>
                    <img
                      className="w-full rounded-full"
                      src={friend.request_user.character_img_link}
                      alt=""
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
                  </>
                )}
                <p>Note:</p>
                <p>{friend.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
