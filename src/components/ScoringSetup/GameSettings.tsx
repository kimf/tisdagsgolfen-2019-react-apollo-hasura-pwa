import React from "react";

import Toggle from "../../components/Shared/Toggle";

interface GameSettingsProps {
  teamEvent: boolean;
  toggleTeamEvent: () => void;
  strokesEvent: boolean;
  toggleStrokesEvent: () => void;
}

const GameSettings = React.memo(
  ({
    teamEvent,
    toggleTeamEvent,
    strokesEvent,
    toggleStrokesEvent
  }: GameSettingsProps) => {
    return (
      <div
        style={{
          borderBottom: "1px solid #eee",
          float: "left",
          marginBottom: 20,
          marginTop: 20,
          paddingBottom: 20,
          width: "100%"
        }}
      >
        <div style={{ float: "left", width: "50%" }}>
          <Toggle
            on={teamEvent}
            onText="Lag"
            offText="Indiv."
            onChange={toggleTeamEvent}
          />
        </div>
        <div style={{ float: "right", width: "50%" }}>
          <Toggle
            on={strokesEvent}
            onText="Slag"
            offText="Poäng"
            onChange={toggleStrokesEvent}
          />
        </div>
      </div>
    );
  }
);

export default GameSettings;
