import React from "react";
import { DragSource, DragLayer } from "react-dnd";

import Avatar from "./Avatar";

export const ItemTypes = {
  PLAYER: "player"
};

function Player({ connectDragSource, connectDragPreview, isDragging, player }) {
  let content = (
    <div>
      <Avatar player={player} isDragging={isDragging} />
    </div>
  );

  content = connectDragSource(content, { dropEffect: "move" });
  content = connectDragPreview(content);
  return content;
}

export default DragSource(
  ItemTypes.PLAYER,
  {
    beginDrag(props) {
      return { ...props.player, oldTeamIndex: props.oldTeamIndex };
    }
  },
  (connect, monitor) => {
    return {
      connectDragPreview: connect.dragPreview(),
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    };
  }
)(Player);

function getItemStyles(currentOffset) {
  if (!currentOffset) {
    return {
      display: "none"
    };
  }

  // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
  var x = currentOffset.x;
  var y = currentOffset.y;
  var transform = `translate(${x}px, ${y}px)`;

  return {
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
    transform: transform,
    WebkitTransform: transform
  };
}

function Preview({ player, isDragging, currentOffset }) {
  if (!isDragging) {
    return <div />;
  }

  return (
    <div>
      <Avatar
        style={getItemStyles(currentOffset)}
        player={player}
        isDragging={false}
      />
    </div>
  );
}

export const PlayerPreview = DragLayer(monitor => {
  var item = monitor.getItem();
  return {
    player: item,
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
})(Preview);
