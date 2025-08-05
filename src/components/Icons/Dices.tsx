interface acceptProps{
    className?:string;
    size?: number;
}

export default function Dices( props:acceptProps) {
    const {className = "",size = 24} = props
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 10H4C2.89543 10 2 10.8954 2 12V20C2 21.1046 2.89543 22 4 22H12C13.1046 22 14 21.1046 14 20V12C14 10.8954 13.1046 10 12 10Z"
        stroke="#F35B53"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.92 14.0003L21.42 10.5003C21.791 10.0888 21.9964 9.55437 21.9964 9.0003C21.9964 8.44622 21.791 7.9118 21.42 7.5003L16.42 2.5803C16.0085 2.20926 15.4741 2.00391 14.92 2.00391C14.3659 2.00391 13.8315 2.20926 13.42 2.5803L10 6.0003"
        stroke="#F35B53"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 18H6.01"
        stroke="#F35B53"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14H10.01"
        stroke="#F35B53"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 6H15.01"
        stroke="#F35B53"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 9H18.01"
        stroke="#F35B53"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
