import { LuDownload } from "react-icons/lu";
import { RiLinkM } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { useMemo, useRef } from "react";
import domtoimage from "dom-to-image-more";
import { saveAs } from "file-saver";

type AcceptanceProps = {
  userImage: string;
  userName: string;
  trialName: string;
  trialReward: string;
};

export default function SharePage(props: AcceptanceProps) {
  const { userImage, userName, trialName, trialReward } = props;

  const certificateRef = useRef<HTMLDivElement>(null);

  const qualityOptions = useMemo(
    () => ({
      quality: 1.0,
      height: 450,
      width: 800,
      format: "webp",
      style: {
        transform: "scale(0.8)",
        transformOrigin: "top",
        width: "800px",
        height: "450px",
      },
    }),
    []
  );

  const handleDownload = (e: React.MouseEvent<Element>) => {
    e.stopPropagation();
    if (certificateRef.current) {
      // 保存原始樣式
      const originalStyle = certificateRef.current.style.cssText;

      // 設定固定尺寸
      certificateRef.current.style.width = "800px";
      certificateRef.current.style.height = "450px";
      certificateRef.current.style.position = "fixed";
      certificateRef.current.style.top = "-9999px";

      domtoimage
        .toBlob(certificateRef.current, qualityOptions)
        .then((blob: Blob) => {
          saveAs(blob, "certificate.webp");
          // 恢復原始樣式
          certificateRef.current!.style.cssText = originalStyle;
        });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    console.log("copy");
  };

  const handleShareToFacebook = () => {
    const url = window.location.href;
    console.log(url, "share to fb");

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "facebook-share-dialog", "width=800,height=600");
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full max-w-200 rounded-t-4xl px-8">
      <h4 className="text-h4 font-semibold text-schema-on-surface-variant self-start">
        現在把成果分享給平台上其他迷途者吧
      </h4>

      <div
        ref={certificateRef}
        className="p-8 flex w-full justify-center"
        style={{ border: "none" }}
      >
        <div className="flex flex-col items-center justify-center w-full border-2 border-schema-outline bg-schema-surface-container aspect-20/10 p-4 min-w-150 max-md:scale-60">
          <div
            className="flex items-center justify-center w-full h-full"
            style={{ border: "none" }}
          >
            {userImage && (
              <img
                src={userImage}
                alt="user-avatar"
                className="h-full"
                style={{ border: "none" }}
              />
            )}
            <div
              className="flex flex-col gap-2 items-center w-2/3 z-10"
              style={{ border: "none" }}
            >
              <h3
                className="text-h3 w-40 flex justify-between"
                style={{ border: "none" }}
              >
                <span style={{ border: "none" }}>獎</span>
                <span style={{ border: "none" }}>壯</span>
              </h3>
              <p className="flex gap-5" style={{ border: "none" }}>
                <span className="text-nowrap" style={{ border: "none" }}>
                  {userName}
                </span>
                <span style={{ border: "none" }}>君 參與</span>
              </p>
              <p className="text-nowrap" style={{ border: "none" }}>
                {trialName}
              </p>

              <p style={{ border: "none" }}>表現優異</p>
              <p style={{ border: "none" }}>
                獲得{" "}
                <span className="italic" style={{ border: "none" }}>
                  {trialReward}
                </span>{" "}
                貝果以茲勉勵
              </p>
              <p style={{ border: "none" }}>
                {new Date().toLocaleDateString("zh-TW", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div
                className="flex items-center justify-center w-ful gap-2 text-center"
                style={{ border: "none" }}
              >
                <div style={{ border: "none" }}>
                  <p style={{ border: "none" }}>完成率</p>
                  <p style={{ border: "none" }}>28/28</p>
                </div>
                <div style={{ border: "none" }}>
                  <p style={{ border: "none" }}>快樂遮羞布使用量</p>
                  <p style={{ border: "none" }}>5</p>
                </div>
              </div>
            </div>
          </div>
          <p style={{ border: "none" }}>
            一起來Flag or Bet，一邊玩一邊養成理想體態
          </p>
        </div>
      </div>
      <ul className="flex gap-15 justify-center items-center w-full ">
        <li className="size-15 bg-schema-primary text-schema-on-primary rounded-full flex justify-center items-center">
          <LuDownload className="size-2/3" onClick={(e) => handleDownload(e)} />
        </li>
        <li className="size-15 bg-transparent text-white rounded-full flex justify-center items-center">
          <FaFacebook className="size-full" onClick={handleShareToFacebook} />
        </li>
        <li className="size-15 bg-schema-primary text-schema-on-primary rounded-full flex justify-center items-center">
          <RiLinkM className="size-2/3" onClick={handleCopyLink} />
        </li>
      </ul>
    </div>
  );
}
