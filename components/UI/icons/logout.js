function Logout({ color = "#737373", size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6 14H3.5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1H6m4.5 9L13.5 8l-3-3M13.5 8H6"
      />
    </svg>
  );
}

export default Logout;
