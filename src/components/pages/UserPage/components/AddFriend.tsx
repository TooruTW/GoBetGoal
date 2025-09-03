import { useEffect, useRef, useState } from "react";
import { usePostFriendsRequest } from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { useGetUserInfoAllSupa } from "@/api";
import { UserInfoSupa } from "@/types/UserInfoSupa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function AddFriend() {
  const [open, setOpen] = useState(false);
  const [friendID, setFriendID] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<UserInfoSupa[]>([]);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const { data: userInfoAll, isLoading } = useGetUserInfoAllSupa();
  const { mutate: postFriendsRequest } = usePostFriendsRequest();
  const userID = useSelector((state: RootState) => state.account.user_id);
  const myFriend = useSelector((state: RootState) => state.friends.friends);

  useEffect(() => {
    if (myFriend?.length === 0) return;
    console.log(myFriend, "myFriend");
  }, [myFriend]);

  useGSAP(
    () => {
      if (searchResult.length === 0 || !suggestionRef.current) return;
      console.log("searchResult", searchResult);

      gsap.from(".name-list", {
        delay: 0.5,
        x: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.1,
      });
    },
    { dependencies: [searchResult, isSuggestionOpen], revertOnUpdate: true }
  );

  useEffect(() => {
    if (isLoading || !userInfoAll || userID) return;
    const result = userInfoAll.filter((user) => user.user_id !== userID);
    setSearchResult(result);
  }, [userInfoAll, userID, isLoading]);

  // filter searchResult by searchName
  useEffect(() => {
    if (!userInfoAll) return;
    if (!searchName) {
      setSearchResult(userInfoAll);
      return;
    }
    console.log("searchName", searchName);

    const result = userInfoAll.filter((user) =>
      user.nick_name.toLowerCase().includes(searchName.toLowerCase())
    );
    setSearchResult(result);
  }, [searchName, userInfoAll]);

  const handleAddFriend = () => {
    if (!friendID.trim()) {
      alert("請輸入好友ID");
      return;
    }
    postFriendsRequest(
      {
        request_id: userID,
        address_id: friendID,
        note: note,
      },
      {
        onSuccess: () => {
          console.log("新增好友成功");
          setOpen(false);
          setFriendID("");
          setNote("");
          window.location.reload();
        },
        onError: (error) => {
          console.error("新增好友失敗:", error);
        },
      }
    );
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareLink = `${window.location.origin}/user/${userID}`;
      navigator.clipboard.writeText(shareLink).then(() => {
        alert("連結已複製到剪貼板");
      });
    }
  };

  const shareLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/user/${userID}`
      : "";

  return (
    <div className="">
      <Button onClick={() => setOpen(true)}>添加好友</Button>
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700/5  text-schema-on-background backdrop-blur-sm z-50"
          onClick={() => {
            setOpen(false);
            setIsSuggestionOpen(false);
          }}
        >
          <div
            className=" rounded-lg p-6 shadow-lg max-w-md w-full mx-4 relative bg-schema-surface-container-high"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 關閉按鈕 */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-2xl hover:text-schema-on-background hover:scale-110 transition"
              aria-label="關閉"
            >
              <IoClose />
            </button>

            <h2 className="text-xl font-bold mb-6 ">添加好友</h2>

            <div className="flex flex-col gap-4">
              {/* 搜尋好友名稱 */}
              <div className="relative">
                <label className="block text-sm font-medium text-schema-on-surface">
                  搜尋好友名稱
                </label>
                <input
                  type="text"
                  placeholder="搜尋好友名稱..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  onFocus={() => setIsSuggestionOpen(true)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div
                  ref={suggestionRef}
                  className={`absolute left-0 top-full bg-schema-surface-container-high rounded-lg w-full p-2 max-h-50 overflow-y-scroll z-10 ${
                    isSuggestionOpen ? "opacity-100" : "opacity-0 scale-0"
                  }`}
                >
                  <ul className="flex flex-col gap-4">
                    {searchResult?.length > 0 &&
                      searchResult?.map((user) => {
                        const isFriend = myFriend.some(
                          (friend) => friend.user_id === user.user_id
                        );
                        return (
                          <li
                            onClick={() => {
                              setFriendID(user.user_id);
                              setSearchName(user.nick_name);
                              setIsSuggestionOpen(false);
                            }}
                            key={user.user_id}
                            className={`w-full grid grid-cols-2 gap-2 px-4 bg-schema-surface-container-highest hover:bg-schema-surface-container cursor-pointer name-list ${
                              isFriend ? "opacity-30 pointer-events-none" : ""
                            }`}
                          >
                            <div className="flex items-start justify-center h-12 overflow-hidden">
                              <img
                                className="w-full object-cover -translate-y-1/10"
                                src={user.character_img_link}
                              />
                            </div>
                            <p className="text-h4 h-full flex items-center justify-center text-schema-on-surface">
                              {user.nick_name}
                            </p>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              {/* 輸入備註 */}
              <div>
                <label className="block text-sm font-medium text-schema-on-surface">
                  備註 (可選)
                </label>
                <input
                  type="text"
                  placeholder="輸入好友備註"
                  value={note}
                  disabled={searchName.length === 0}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 新增好友按鈕 */}
              <Button
                onClick={handleAddFriend}
                className="w-full"
                disabled={!friendID.trim()}
              >
                新增好友
              </Button>

              {/* 分隔線 */}
              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-sm text-gray-500">或</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* 分享自己的資料 */}
              <div>
                <label className="block text-sm font-medium text-schema-on-surface mb-2">
                  分享我的資料
                </label>

                {/* 分享連結 */}
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    readOnly
                    value={shareLink}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm text-schema-on-primary text-ellipsis overflow-hidden"
                    onFocus={(e) => e.target.select()}
                  />
                  <Button size="sm" onClick={handleCopyLink} variant="outline">
                    複製
                  </Button>
                </div>

                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                        shareLink
                      )}`}
                      alt="QR Code"
                      className="w-32 h-32"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  掃描 QR Code 添加好友
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
