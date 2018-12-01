import { Player } from "./initial-state";

const togglePlayer = (
  player: Player,
  shouldRemove: boolean,
  selectedPlayers: Player[],
  setData: (players: Player[]) => void
) => {
  if (shouldRemove) {
    const index = selectedPlayers.findIndex((sp) => sp.id === player.id);
    if (index !== -1) {
      selectedPlayers.splice(index, 1);
    }
    setData(selectedPlayers);
  } else {
    setData([...selectedPlayers, player]);
  }
};

export default togglePlayer;
