import type { BadgeProps } from "../interfaces/badge";

const Badge: React.FC<BadgeProps> = ({
  children,
  color = "primary",
  className = "",
}) => {
  return (
    <span
      className={
        `inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white ` +
        className
      }
      style={{ backgroundColor: `var(--ifm-color-${color})` }}
    >
      {children}
    </span>
  );
};

export default Badge;
