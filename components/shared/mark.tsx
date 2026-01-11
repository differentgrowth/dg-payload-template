interface Props {
  className?: string;
}

export const Mark = ({ className }: Props) => (
  <>
    <span className="sr-only">ACME</span>
    <svg
      className={className}
      fill="none"
      height="100%"
      viewBox="0 0 24 24"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>ACME</title>
      <text
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="700"
        x="4"
        y="18"
      >
        A
      </text>
    </svg>
  </>
);
