export const BodyOfCrist = ({ size = 24, color = "currentColor", className = "", ...props }) => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width={size}
    height={size}
    {...props}
  >
    <path d="M359.448 418.112 167.332 85.356a8 8 0 0 0-13.78 8l192.117 332.756a8 8 0 1 0 13.78-8z" />
    <path d="M426.644 344.667 93.889 152.552a8 8 0 1 0-8 13.78l332.755 192.115a8 8 0 1 0 8-13.78z" />
    <path d="M429.768 155.675a8 8 0 0 0-10.656-2.928L85.356 344.668a8 8 0 1 0 8 13.78l332.755-192.116a8 8 0 0 0 2.928-10.657z" />
    <path d="M356.325 82.232a8 8 0 0 0-10.656 2.928L152.552 418.111a8 8 0 1 0 13.78 8L359.448 93.889a8 8 0 0 0-2.928-10.657z" />

    <path d="M276.355 144.401 285.31 0h-58.62l8.955 144.401v223.198L226.69 512h58.62l-8.955-144.401z" />
    <path d="M367.6 235.645H144.4L0 226.69v58.62l144.399-8.955H367.6L512 285.31v-58.62z" />

    {/* Centro opcional (usa currentColor con opacidad) */}
    <circle cx="256" cy="256" r="113.391" opacity="0.15" />
  </svg>
);