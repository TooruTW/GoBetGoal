import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import gsap from "gsap";

type NotificationSectionProps = {
  isShow:boolean;
  closeNotification:()=>void;
}

export default function NotificationSection({isShow, closeNotification}:NotificationSectionProps) {
  const notificationSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(()=>{
    if(isShow){
      gsap.to(notificationSectionRef.current, {
        xPercent:0,
        duration:0.5,
        ease:"power2.inOut"
      })
    }else{
      gsap.to(notificationSectionRef.current, {
        xPercent:100,
        duration:0.5,
        ease:"power2.inOut"
      })
    }
  },{dependencies:[isShow]})

  const handleClose = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    closeNotification();
  }


  return (
    <div ref={notificationSectionRef} className="fixed top-20 right-0 w-1/2 h-200 rounded-l-4xl min-w-90 bg-red-500 flex justify-center items-center">
      <IoClose onClick={(e)=>handleClose(e)} className="absolute top-5 left-5 text-2xl" />
      <div> NotificationSection</div>
    </div>
  );
}
