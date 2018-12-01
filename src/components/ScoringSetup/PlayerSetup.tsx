import React from "react";
import useSessionStorage from "../../hooks/useSessionstorage";
import { Image } from "../../lib/Image";
import { Player } from "../../lib/initial-state";
import Avatar from "./Avatar";

const PlayerList = React.memo((_) => {
  const [selectedPlayers, setSelectedPlayers] = useSessionStorage("players");

  const askForNewStrokes = (playerIndex: number, playerName: string) => {
    const strokes = prompt(`Hur många slag ska ${playerName} ha då?`);
    selectedPlayers[playerIndex].strokes = parseInt(`${strokes}`, 10);
    setSelectedPlayers([...selectedPlayers]);
  };

  return (
    <section>
      <h3>Spelare</h3>
      <table>
        <thead>
          <tr>
            <th>Spelare</th>
            <th>Slag</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {selectedPlayers.map((player: Player, index: number) => (
            <tr key={player.id}>
              <td>
                {player.photo && (
                  <Image src={player.photo} width="30" height="30" />
                )}
                {player.name}
              </td>
              <td>{player.strokes}</td>
              <td>
                <button
                  onClick={() => askForNewStrokes(index, player.name)}
                  style={{ fontSize: 12, color: "#777" }}
                >
                  ÄNDRA
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 12 }}>
        Kolla nu så att antalet slag stämmer med dagens hcp innan ni startar
        rundan!
      </p>
    </section>
  );
});

export default PlayerList;
