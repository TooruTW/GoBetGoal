interface acceptProps {
  children?: string;
}

export default function Title(props: acceptProps) {
  const { children } = props;
  return <h1 className="text-title font-title text-white neon-white neon-red neon-pulse ">{children}</h1>;
}
