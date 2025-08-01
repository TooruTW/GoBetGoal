type FormButtonProps = {
  isSubmitting: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function FormButton({
  isSubmitting,
  children,
  className = "text-schema-on-primary mt-6 w-full rounded-md bg-schema-primary opacity-90 hover:opacity-100 py-3 shadow-sm hover:shadow-md transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
}: FormButtonProps) {
  return (
    <button type="submit" disabled={isSubmitting} className={className}>
      {children}
    </button>
  );
}
