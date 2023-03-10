import React from "react";
import { Query } from "react-apollo";

import playersQuery from "../../graphql/queries/playersQuery";
import useSessionStorage from "../../hooks/useSessionstorage";
import { Player } from "../../lib/initial-state";
import togglePlayer from "../../lib/togglePlayer";

const PlayerPicker = React.memo(() => {
  const [selectedPlayers, setSelectedPlayers] = useSessionStorage(
    "players",
    [] as Player[]
  );

  return (
    <Query query={playersQuery}>
      {({ data, error, loading }) => {
        if (loading) {
          return null;
        }
        if (error) {
          return <div>`Error! ${error.message}`</div>;
        }

        const { players } = data;

        return (
          <section>
            <h3>Välj spelare</h3>
            <ul>
              {players.map((player: Player) => {
                const isSelected =
                  selectedPlayers.find((sp) => sp.id === player.id) !== undefined;
                return (
                  <li
                    key={player.id}
                    className={isSelected ? "selected" : ""}
                    onClick={() =>
                      togglePlayer(
                        player,
                        isSelected,
                        selectedPlayers,
                        setSelectedPlayers
                      )
                    }
                  >
                    {player.name}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      }}
    </Query>
  );
});

export default PlayerPicker;
