import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

type PasswordInputProps = {
  register: UseFormRegisterReturn;
  error?: FieldError;
  label?: string;
  autoComplete?: string;
}

export default function PasswordInput({
  register,
  error,
  label = "密碼",
  autoComplete = "current-password",
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={register.name} className="block w-full pb-2">
        {label}
      </label>
      <div className="mb-4 flex items-center relative">
        <input
          type={show ? "text" : "password"}
          className="border-b border-[var(--ring)] py-2 text-sm focus:outline-none pr-10 w-full bg-transparent"
          {...register}
          aria-invalid={error ? "true" : "false"}
          autoComplete={autoComplete}
        />
        <span
          className="absolute right-2 cursor-pointer"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
        </span>
      </div>
      {error && (
        <p role="alert" className="text-[var(--destructive)] text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
}
