import TitleIcon from "@/components/Icons/TitleIcon"
import TitleText from "./TitleText"


export default function Title(){
    return(
        <div className="flex items-center">
            <TitleIcon />
            <TitleText className="max-md:hidden">Flag or Bet</TitleText>
        </div>
    )
}