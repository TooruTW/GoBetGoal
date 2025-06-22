import Title from "./Title"
import TitleIcon from "./TitleIcon"


export default function Header(){
    return (
        <div className="w-full py-4 bg-bg-secondary">

            <div className="wrap max-w-330">
                {/* left div */}
                <div className="flex items-center">
                    <TitleIcon />
                    <Title>Flag or Bet</Title>
                </div>
                {/* right nav */}
                <nav></nav>
            </div>
        </div>
    )
}