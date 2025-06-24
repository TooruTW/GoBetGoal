import { useState } from "react";
import ErrorEffect from "./ErrorEffect";



export default function ImageLoader(props: { imgUrl: string }) {
      const { imgUrl } = props;
      const [isLoad, setIsLoad] = useState(false)
    

  return (
    <div className="flex justify-center items-center h-full">
        <img src={imgUrl} onLoad={()=>{setIsLoad(true)}} onError={()=>{setIsLoad(false)}} alt="player-img" />
        {!isLoad && <ErrorEffect />}
    </div>
  );
}
