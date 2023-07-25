import { MouseEventHandler } from "react";
import Image from "next/image";

type Props = {
    title: string;
    leftIcon?: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler;
    submitting?: boolean | false;
    type?: 'button' | 'submit';
    bgColor?: string;
    textColor?: string;
}

const Button = ({ title, leftIcon, rightIcon, handleClick, submitting, type, bgColor, textColor}: Props) => {
  return (
    <button
     type={type || 'button'}
     disabled={submitting}
     className={`flexCenter gap-3 px-4 py-3 
     ${textColor ? textColor : 'text-white'} 
     ${submitting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full`}
     onClick={handleClick}
    >
        {leftIcon && (
            <Image src={leftIcon} width={14} height={14} alt="left" />
        )}
        {title}
        {rightIcon && (
            <Image src={rightIcon} width={14} height={14} alt="right" />
        )}
    </button>
  );
};

export default Button;