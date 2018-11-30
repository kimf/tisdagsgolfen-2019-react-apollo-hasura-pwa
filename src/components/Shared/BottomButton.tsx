import React from "react";

interface Props {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const BottomButton = React.memo(({ text, onClick, disabled }: Props) => {
  return (
    <button
      className="bottom"
      onClick={disabled ? () => null : onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
});

export default BottomButton;
