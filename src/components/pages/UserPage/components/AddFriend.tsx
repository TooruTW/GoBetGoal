

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";

export default function UserPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>添加好友</Button>
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700/50 backdrop-blur-sm z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-gray-700 rounded-lg p-8 shadow-lg min-w-[300px] relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-2xl text-white hover:scale-110 transition"
              aria-label="關閉"
            >
              <IoClose />
            </button>
            <h2 className="text-lg font-bold mb-4">添加好友</h2>
            <div className="space-y-4">
              {/* 搜尋好友名稱 */}
              <input
                type="text"
                placeholder="搜尋好友名稱..."
                className="w-full px-3 py-2 rounded border border-gray-400 "
              />
              {/* 分享自己檔案連結 */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-white">我的分享連結：</span>
                <input
                  type="text"
                  readOnly
                  value={typeof window !== 'undefined' ? window.location.origin + '/user/your-id' : ''}
                  className="w-full px-2 py-1 rounded border border-gray-400 text-black bg-gray-200"
                  onFocus={e => e.target.select()}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + '/user/your-id');
                  }}
                >
                  複製
                </Button>
              </div>
              {/* 顯示 QR code */}
              <div className=" p-2 bg-white rounded shadow mx-auto w-auto">
               
                      {/* 這裡可放 QR code 圖片或元件 */}
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.origin + '/user/your-id')}`} alt="QR Code" />
                    
              </div>
            </div>
           
          </div>
        </div>
      )}
    </>
  );
}
