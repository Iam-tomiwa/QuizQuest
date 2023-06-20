import React from "react";

type LinearProgressBarProps = {
  value: number;
  className?: string;
};

const LinearProgressBar: React.FC<LinearProgressBarProps> = ({
  value,
  className,
}) => {
  return (
    <div className="w-full h-2 bg-gray-300 rounded">
      <div
        className={`h-2 bg-primary transition-all rounded ${className}`}
        style={{width: `${value}%`}}
      ></div>
    </div>
  );
};

export default LinearProgressBar;
