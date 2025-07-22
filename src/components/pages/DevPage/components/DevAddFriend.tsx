import { usePostFriendsRequest } from "@/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { useGetFriendSupa } from "@/api";

export default function DevAddFriend() {
  const { mutate: postFriendsRequest } = usePostFriendsRequest();
  const [friendID, setFriendID] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const userID = useSelector((state: RootState) => state.account.user_id);
  const { data, isLoading } = useGetFriendSupa(userID);

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
        <ul className="grid grid-cols-3 gap-4">
          {data?.map((friend) => (
            <li key={friend.id}>
              <div className="border-1 border-schema-outline rounded-lg p-2 flex flex-col gap-2 items-center w-full">
                <p>{friend.state}</p>
                {friend.address_id !== userID && (
                  <>
                    <p>{friend.address_id}</p>
                    <h2>{friend.address_user.nick_name}</h2>
                    <img
                      className="w-full rounded-full"
                      src={friend.address_user.charactor_img_link}
                      alt=""
                    />
                    {friend.state === "pending" && <p>等待回應</p>}
                    {friend.state === "accepted" && <p>已接受</p>}
                    {friend.state === "rejected" && <p>已拒絕</p>}
                  </>
                )}
                {friend.request_id !== userID && (
                  <>
                    <p>{friend.request_id}</p>
                    <h2>{friend.request_user.nick_name}</h2>
                    <img
                      className="w-full rounded-full"
                      src={friend.request_user.charactor_img_link}
                      alt=""
                    />
                    {friend.state === "pending" && (
                      <div className="flex w-full justify-between">
                        <Button className="w-1/2">接受</Button>
                        <Button className="w-1/2">拒絕</Button>
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
