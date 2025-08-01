import { UseFormRegisterReturn, FieldError } from "react-hook-form";

type EmailInputProps = {
  register: UseFormRegisterReturn;
  error?: FieldError;
  label?: string;
  autoComplete?: string;
}

export default function EmailInput({
  register,
  error,
  label = "Email",
  autoComplete = "email",
}: EmailInputProps) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={register.name} className="block w-full pb-2">
        {label}
      </label>
      <input
        className="border-b border-[var(--ring)] py-2 text-sm focus:outline-none w-full bg-transparent"
        {...register}
        aria-invalid={error ? true : "false"}
        autoComplete={autoComplete}
      />
      {error && (
        <p role="alert" className="text-[var(--destructive)] text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
}
