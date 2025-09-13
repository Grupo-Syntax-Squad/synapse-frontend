import { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-1 text-sm text-gray-700">{label}</label>}
      <input
        {...props}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
