import Navigator from "./Navigator";
import Title from "./Title";

export default function Header() {
  return (
    <div className="w-full p-2   bg-background flex justify-center fixed top-0 left-0 z-50">
      <div className="wrapper w-full max-w-330 flex justify-between items-center max-lg:px-3">
        {/* left div */}
        <Title />
        {/* right nav */}
        <Navigator />
      </div>
    </div>
  );
}
