import TitleIcon from "@/components/Icons/TitleIcon"
import TitleText from "./TitleText"


export default function Title(){
    return(
        <div className="flex items-center">
            <TitleIcon />
            <TitleText>Flag or Bet</TitleText>
        </div>
    )
}