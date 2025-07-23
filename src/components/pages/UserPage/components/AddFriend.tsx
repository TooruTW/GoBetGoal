import { useState } from "react";
import { usePostFriendsRequest } from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";

export default function AddFriend() {
  const [open, setOpen] = useState(false);
  const [friendID, setFriendID] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");

  const { mutate: postFriendsRequest } = usePostFriendsRequest();
  const userID = useSelector((state: RootState) => state.account.user_id);

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
        },
        onError: (error) => {
          console.error("新增好友失敗:", error);
        }
      }
    );
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const shareLink = `${window.location.origin}/user/${userID}`;
      navigator.clipboard.writeText(shareLink).then(() => {
        alert("連結已複製到剪貼板");
      });
    }
  };

  const shareLink = typeof window !== 'undefined' ? `${window.location.origin}/user/${userID}` : '';

  return (
    <div className="">
      <Button onClick={() => setOpen(true)}>添加好友</Button>
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700/50 backdrop-blur-sm z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className=" rounded-lg p-6 shadow-lg max-w-md w-full mx-4 relative bg-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 關閉按鈕 */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800 hover:scale-110 transition"
              aria-label="關閉"
            >
              <IoClose />
            </button>

            <h2 className="text-xl font-bold mb-6 text-gray-800">添加好友</h2>

            <div className="space-y-4">
              {/* 搜尋好友名稱 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  搜尋好友名稱
                </label>
                <input
                  type="text"
                  placeholder="搜尋好友名稱..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 輸入好友ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  好友ID
                </label>
                <input
                  type="text"
                  placeholder="輸入好友ID"
                  value={friendID}
                  onChange={(e) => setFriendID(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 輸入備註 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  備註 (可選)
                </label>
                <input
                  type="text"
                  placeholder="輸入好友備註"
                  value={note}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分享我的資料
                </label>

                {/* 分享連結 */}
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    readOnly
                    value={shareLink}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm"
                    onFocus={(e) => e.target.select()}
                  />
                  <Button
                    size="sm"
                    onClick={handleCopyLink}
                    variant="outline"
                  >
                    複製
                  </Button>
                </div>

                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareLink)}`}
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