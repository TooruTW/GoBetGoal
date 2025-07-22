import { usePatchChangePassword } from "@/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function DevEditNameOrPassword() {
  const navigate = useNavigate();
  const { mutate: patchChangePassword } = usePatchChangePassword();
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const queryClient = useQueryClient();

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <h1>DevEditNameOrPassword</h1>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4">
          <h2>
            Current Name: <span className="text-schema-primary">Sofia</span>
          </h2>
          <input
            type="text"
            className="w-full border-1 border-schema-outline rounded-lg p-2"
            placeholder="New Name"
          />
          <button className="w-full bg-schema-primary text-white rounded-lg p-2">
            Change Name
          </button>
        </div>
        <div className="w-full flex flex-col gap-4">
          <h2>Change Password: </h2>
          <input
            type="text"
            className="w-full border-1 border-schema-outline rounded-lg p-2"
            placeholder="New Password"
            onBlur={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="w-full bg-schema-primary text-white rounded-lg p-2"
            onClick={() => {
              if (newPassword) patchChangePassword(newPassword,{onSuccess:()=>{
                console.log("success");
                setNewPassword(null);
                queryClient.invalidateQueries({ queryKey: ["user"] });
                navigate("/");
                
              }});
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
