import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";

import useSessionStorage from "../../hooks/useSessionstorage";
import { GameTeam, Player } from "../../lib/initial-state";
import DraggablePlayer, { PlayerPreview } from "./DraggablePlayer";
import DroppableTeam from "./DroppableTeam";

interface Team {
  strokes: number;
  players: Player[];
}
const newTeam = { strokes: 0, players: [] } as Team;

class Body extends Component<{
  teams: Team[];
  receivePlayer: (
    teamIndex: number,
    playerId: string,
    oldTeamIndex?: number
  ) => void;
  askForNewStrokes: (index: number) => void;
  addTeam: () => void;
  removeTeam: (index: number) => void;
  selectedPlayers: Player[];
}> {
  public render() {
    const {
      teams,
      receivePlayer,
      askForNewStrokes,
      selectedPlayers,
      addTeam,
      removeTeam
    } = this.props;

    const playersLeft = selectedPlayers.filter((sp) => !sp.isInTeam).length > 0;

    return (
      <>
        <button className="button success" onClick={addTeam}>
          ⊕ LAG
        </button>
        <div className="teamboxes">
          {teams.map((team: GameTeam, index: number) => {
            return (
              <DroppableTeam
                key={index}
                teamIndex={index}
                onReceive={receivePlayer}
              >
                <div>
                  <h4>Lag {index + 1}</h4>
                  <strong>{`${team.strokes} slag`}</strong>
                  <button
                    className="button secondary"
                    onClick={() => askForNewStrokes(index)}
                    style={{ fontSize: 12, color: "#777" }}
                  >
                    ÄNDRA
                  </button>

                  <div
                    className="avatars"
                    style={{ paddingLeft: 10, paddingTop: 10 }}
                  >
                    {team.players.map((player) => (
                      <DraggablePlayer
                        key={`teamPlayer_${index}_${player.id}`}
                        player={player}
                        oldTeamIndex={index}
                      />
                    ))}
                  </div>
                  <br />
                  <button
                    className="button danger"
                    onClick={() => removeTeam(index)}
                  >
                    Ta bort lag
                  </button>
                </div>
              </DroppableTeam>
            );
          })}
        </div>
        {playersLeft && (
          <div>
            <h3>Dra spelare till lag</h3>
            <hr />
            <div className="avatars">
              {selectedPlayers
                .filter((sp: Player) => !sp.isInTeam)
                .map((player: Player) => (
                  <DraggablePlayer key={player.id} player={player} />
                ))}
            </div>

            <PlayerPreview key="__preview" name="Item.PLAYER" />
          </div>
        )}
      </>
    );
  }
}

const BodyWithDragDrop = DragDropContext(
  TouchBackend({ enableMouseEvents: true })
)(Body);

const TeamList = React.memo((_) => {
  const [selectedPlayers, setSelectedPlayers] = useSessionStorage("players");
  const [teams, setTeams] = useSessionStorage("teams", [
    { ...newTeam },
    { ...newTeam }
  ]);

  const addTeam = () => setTeams([...teams, { ...newTeam }]);

  const markPlayerAsAvailable = (player: Player) => {
    const playerIndex = selectedPlayers.findIndex(
      (sp: Player) => Number(sp.id) === Number(player.id)
    );
    selectedPlayers[playerIndex].isInTeam = false;
    setSelectedPlayers([...selectedPlayers]);
  };

  const removeTeam = (index: number) => {
    teams[index].players.forEach(markPlayerAsAvailable);
    teams.splice(index, 1);
    setTeams([...teams]);
  };

  const askForNewStrokes = (teamIndex: number) => {
    const strokes = Number(
      prompt(`Hur många slag ska Lag ${teamIndex + 1} ha då?`)
    );
    teams[teamIndex].strokes = strokes;
    setTeams([...teams]);
  };

  const receivePlayer = (
    teamIndex: number,
    playerId: string,
    oldTeamIndex?: number
  ) => {
    const playerIndex = selectedPlayers.findIndex(
      (sp: Player) => Number(sp.id) === Number(playerId)
    );

    if (oldTeamIndex !== undefined) {
      const oldPlayerIndex = teams[oldTeamIndex].players.findIndex(
        (tp) => Number(tp.id) === Number(playerId)
      );
      teams[oldTeamIndex].players.splice(oldPlayerIndex, 1);
    } else {
      selectedPlayers[playerIndex].isInTeam = true;
      setSelectedPlayers([...selectedPlayers]);
    }

    teams[teamIndex].players = [
      ...teams[teamIndex].players,
      selectedPlayers[playerIndex]
    ];
    setTeams([...teams]);
  };

  return (
    <section>
      <BodyWithDragDrop
        teams={teams}
        receivePlayer={receivePlayer}
        askForNewStrokes={askForNewStrokes}
        selectedPlayers={selectedPlayers}
        addTeam={addTeam}
        removeTeam={removeTeam}
      />
    </section>
  );
});

export default TeamList;
