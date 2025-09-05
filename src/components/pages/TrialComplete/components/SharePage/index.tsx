import { LuDownload } from "react-icons/lu";
import { RiLinkM } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { useMemo, useRef } from "react";
import domtoimage from "dom-to-image-more";
import { saveAs } from "file-saver";
import LogoImgTxtDark from "@/assets/logo/LogoImgTxtDark.svg";
import LogoImgTxtLight from "@/assets/logo/LogoImgTxtLight.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import qrcode from "@/assets/logo/qrcode.webp";

type AcceptanceProps = {
  userImage: string;
  userName: string;
  trialName: string;
  trialReward: string;
  trialCompleteRate: string;
  cheatCount: number;
};

export default function SharePage(props: AcceptanceProps) {
  const {
    userImage,
    userName,
    trialName,
    trialReward,
    trialCompleteRate,
    cheatCount,
  } = props;
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";

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
    <div className="flex flex-col gap-6 items-center hover:cursor-pointer justify-center w-full max-w-200 rounded-t-4xl px-8 overflow-y-scroll">
      <h4 className="text-h4 font-semibold">
        想分享出去嗎？我們幫你準備好了！
      </h4>

      <div
        ref={certificateRef}
        className=" flex w-full justify-center"
        style={{ border: "none" }}
      >
        <div className="shadow-2xl p-6 rounded-3xl " style={{ border: "none" }}>
          <div className="flex flex-col items-center hover:cursor-pointer justify-center w-full border border-dotted  rounded-tr-2xl rounded-bl-2xl border-schema-primary bg-schema-surface-container aspect-20/10 p-4 min-w-150 max-md:scale-60">
            <div
              className="flex items-center hover:cursor-pointer justify-center w-full h-full"
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
                className="flex flex-col gap-2 items-center hover:cursor-pointer w-2/3 z-10"
                style={{ border: "none" }}
              >
                <h3
                  className="text-h3 w-40 flex justify-between"
                  style={{ border: "none" }}
                >
                  <span
                    style={{ border: "none" }}
                    className="text-schema-primary font-extrabold text-2xl"
                  >
                    獎
                  </span>
                  <span
                    style={{ border: "none" }}
                    className="text-schema-primary font-extrabold text-2xl"
                  >
                    壯
                  </span>
                </h3>
                <p className="flex gap-5" style={{ border: "none" }}>
                  <span className="text-nowrap" style={{ border: "none" }}>
                    {userName}
                  </span>
                  <span style={{ border: "none" }}>君 參與</span>
                </p>
                <p
                  className="text-nowrap bg-schema-surface-container-high px-2 py-1"
                  style={{ border: "none" }}
                >
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

                <div
                  className="flex items-center hover:cursor-pointer mt-2 justify-center w-ful gap-2 text-center"
                  style={{ border: "none" }}
                >
                  <div style={{ border: "none" }}>
                    <p
                      style={{ border: "none" }}
                      className="text-schema-on-surface-variant"
                    >
                      完成率
                    </p>
                    <p style={{ border: "none" }}>{trialCompleteRate}</p>
                  </div>
                  <div style={{ border: "none" }}>
                    <p
                      style={{ border: "none" }}
                      className="text-schema-on-surface-variant"
                    >
                      快樂遮羞布使用量
                    </p>
                    <p style={{ border: "none" }}>{cheatCount}</p>
                  </div>
                </div>
              </div>

              <div
                style={{ border: "none" }}
                className="flex flex-col justify-between h-full"
              >
                <img
                  src={qrcode}
                  alt=""
                  className="size-40"
                  style={{ border: "none" }}
                />
                <img
                  src={isDarkMode ? LogoImgTxtDark : LogoImgTxtLight}
                  alt="Logo with text"
                  className="hidden md:block h-8"
                />
                <p style={{ border: "none" }}>跟朋友玩遊戲就能養成理想體態</p>
              </div>
            </div>
            <div
              className="flex items-end w-full justify-between gap-4 text-schema-primary"
              style={{ border: "none" }}
            ></div>
          </div>
        </div>
      </div>
      <ul className="flex gap-15 justify-center items-center  w-full ">
        <li className="size-15 bg-schema-primary text-schema-on-primary rounded-full flex justify-center items-center hover:cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95 transition-transform ">
          <LuDownload className="size-2/3" onClick={(e) => handleDownload(e)} />
        </li>
        <li className="size-15 bg-transparent text-schema-on-background rounded-full flex justify-center items-center hover:cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95 transition-transform">
          <FaFacebook className="size-full" onClick={handleShareToFacebook} />
        </li>
        <li className="size-15 bg-schema-primary text-schema-on-primary rounded-full flex justify-center items-center hover:cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95 transition-transform">
          <RiLinkM className="size-2/3" onClick={handleCopyLink} />
        </li>
      </ul>
    </div>
  );
}
