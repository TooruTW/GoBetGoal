interface acceptProps {
  children?: string;
  className?: string;
}

export default function TitleText(props: acceptProps) {
  const { children,className ="" } = props;
  return <h1 className={`text-title font-title text-white neon-white neon-red neon-pulse ${className}`}>{children}</h1>;
}
