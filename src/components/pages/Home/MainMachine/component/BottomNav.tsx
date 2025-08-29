import PillNav from "@/components/shared/reactBit/PillNav";
import logo from "/src/assets/logo/LogoDark.svg";
import { IoMail } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

export default function ButtonNav() {
  return (
    <PillNav
      logo={logo}
      logoAlt="Company Logo"
      items={[
        { label: "Home", href: "/" },
        { label: "創建試煉", href: "/create-trial" },
        { label: "試煉廣場", href: "/trials/list/all/all" },
        { label: "社交平台", href: "/social-pages" },
        { label: <IoMail />, href: "/about" },
        {
          label: <FaInstagram />,
          href: "https://www.instagram.com/exuan_design.ai?utm_source=ig_web_button_share_sheet&igsh=MW4zeXQ5ZWN0cTM4cA==",
        },
        {
          label: <FaThreads />,
          href: "https://www.threads.com/@exuan_design.ai",
        },
      ]}
      activeHref="/"
      className="custom-nav"
      ease="power2.easeOut"
      baseColor="#000000"
      pillColor="#ffffff"
      hoveredPillTextColor="#ffffff"
      pillTextColor="#000000"
    />
  );
}
