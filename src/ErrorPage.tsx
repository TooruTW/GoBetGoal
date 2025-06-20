import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ErrorPages() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-amber-50">Error happening</h1>
      <Button>
        <Link to="/">Redirect</Link>
      </Button>
    </div>
  );
}
