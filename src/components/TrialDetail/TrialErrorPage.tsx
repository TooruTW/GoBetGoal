import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button"


export default function TrialErrorPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/trials/trial-list");
    }, 5000);
  }, [navigate]);
  function handleNavigate() {
    navigate("/trials/trial-list");
  }
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 ">
      <h1 className="text-h1 font-normal font-title">can't not found trial</h1>
      <p className="text-p font-normal">五秒後跳轉回試煉列表</p>
      <Link to="/trials">
        <Button value="ghost" size="lg" onClick={handleNavigate}>返回試煉列表</Button>
      </Link>
    </div>
  );
}
