import React from "react";
import { ItemTypes } from "./DraggablePlayer";
import { DropTarget } from "react-dnd";

const teamTarget = {
  drop(props, monitor) {
    const player = monitor.getItem();
    props.onReceive(props.teamIndex, player.id, player.oldTeamIndex);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

function DroppableTeam({ _x, _y, connectDropTarget, isOver, children }) {
  return connectDropTarget(
    <div
      className="teambox"
      style={{
        background: isOver ? "#feb" : "#ccc"
      }}
    >
      {children}
    </div>
  );
}

export default DropTarget(ItemTypes.PLAYER, teamTarget, collect)(DroppableTeam);
