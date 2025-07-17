import { IoFlagOutline } from "react-icons/io5";

export default function CreateChallenge(){

    return(
        <div className=" flex items-center gap-2 rounded-full px-4 py-2.5 bg-gradient-set-1">
            <IoFlagOutline />
            <p className="text-label">創建試煉</p>
        </div>
    )
}