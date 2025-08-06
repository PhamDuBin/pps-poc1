import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  className?: string;
  fixedPosition?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({
  label = "戻る",
  className = "",
  fixedPosition = true,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        bg-gray-200 hover:bg-gray-300 text-gray-700 
        rounded-md text-sm font-medium transition
        ${fixedPosition ? "absolute top-4 left-4 z-50" : ""}
        ${className}
      `}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
};

export default BackButton;
