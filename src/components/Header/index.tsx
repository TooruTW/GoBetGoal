import Navigator from "./Navigator";
import Title from "./Title";

export default function Header() {
  return (
    <div className="w-full py-4 bg-bg-secondary">
      <div className="wrapper max-w-330 flex justify-between items-center max-lg:px-3">
        {/* left div */}
        <Title />
        {/* right nav */}
        <Navigator />
      </div>
    </div>
  );
}
