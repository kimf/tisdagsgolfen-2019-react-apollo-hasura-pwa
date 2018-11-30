import React from "react";

interface ToggleProps {
  onText: string;
  offText: string;
  on: boolean;
  onChange: () => void;
}

const Toggle = React.memo(({ onText, offText, on, onChange }: ToggleProps) => (
  <div className="toggle-buttons">
    <button className={`button toggle ${on && "on"}`} onClick={onChange}>
      {onText}
    </button>
    <button className={`button toggle ${!on && "on"}`} onClick={onChange}>
      {offText}
    </button>
  </div>
));

export default Toggle;
