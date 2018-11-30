import React, { Fragment } from "react";

import useSessionStorage from "../hooks/useSessionstorage";

import GameSettings from "../components/ScoringSetup/GameSettings";
import CoursePicker from "../components/ScoringSetup/CoursePicker";
import PlayerPicker from "../components/ScoringSetup/PlayerPicker";
import PlayerSetup from "../components/ScoringSetup/PlayerSetup";
import TeamSetup from "../components/ScoringSetup/TeamSetup";
import BottomButton from "../components/Shared/BottomButton";

const ScoringSetup = React.memo(_ => {
  const [currentStep, setCurrentStep] = useSessionStorage("currentStep", 0);
  const [teamEvent, setTeamEvent] = useSessionStorage("teamEvent", false);
  const [courseId, setCourse] = useSessionStorage("courseId", "");
  const [strokesEvent, setStrokesEvent] = useSessionStorage(
    "strokesEvent",
    false
  );

  const toggleStrokesEvent = () => setStrokesEvent(!strokesEvent);
  const toggleTeamEvent = () => setTeamEvent(!teamEvent);

  const goBack = () => setCurrentStep(currentStep - 1);
  const goOn = () => setCurrentStep(currentStep + 1);
  const play = () => null;

  return (
    <div className="screens">
      <header className="header main">
        <h1>Inställningar</h1>
      </header>
      {currentStep == 0 && (
        <section>
          <h3>Inställningar</h3>
          <GameSettings
            {...{
              teamEvent,
              strokesEvent,
              toggleTeamEvent,
              toggleStrokesEvent
            }}
          />
          <h3>Bana</h3>
          <CoursePicker {...{ courseId, setCourse }} />
        </section>
      )}
      {currentStep == 1 && <PlayerPicker />}
      {currentStep === 2 && (teamEvent ? <TeamSetup /> : <PlayerSetup />)}
      {currentStep < 2 && (
        <BottomButton
          onClick={goOn}
          text="FORTSÄTT"
          disabled={courseId === ""}
        />
      )}
      {currentStep === 2 && <BottomButton onClick={play} text="SPELA" />}
    </div>
  );
});

export default ScoringSetup;
