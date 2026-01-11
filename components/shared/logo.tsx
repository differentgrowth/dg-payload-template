interface Props {
  className?: string;
}

export const Logo = ({ className }: Props) => (
  <>
    <span className="sr-only">ACME</span>
    <svg
      className={className}
      fill="none"
      height="100%"
      viewBox="0 0 120 24"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>ACME</title>
      <text
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.02em"
        x="0"
        y="19"
      >
        ACME
      </text>
    </svg>
  </>
);

export const VerticalLogo = ({ className }: Props) => (
  <>
    <span className="sr-only">ACME</span>
    <svg
      className={className}
      fill="none"
      height="100%"
      viewBox="0 0 120 24"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>ACME</title>
      <text
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.02em"
        x="0"
        y="19"
      >
        ACME
      </text>
    </svg>
  </>
);
