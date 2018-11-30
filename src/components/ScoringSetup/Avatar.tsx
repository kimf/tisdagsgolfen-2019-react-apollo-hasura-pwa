import React from "react";
import { Player } from "../../lib/initial-state";
import { Image } from "../../lib/Image";

interface AvatarProps {
  player: Player;
  isDragging?: boolean;
  style?: object;
  imgStyle?: object;
  isSelected?: boolean;
}

const Avatar = ({
  player,
  isDragging,
  style,
  imgStyle,
  isSelected
}: AvatarProps) => {
  const imageStyle = {
    ...imgStyle,
    border: isSelected ? "5px outset green" : ""
  };
  return (
    <div
      key={player.id}
      style={{
        width: 40,
        height: 40,
        fontWeight: "bold",
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "-webkit-grabbing" : "-webkit-grab",
        ...style
      }}
    >
      {player.photo ? (
        <Image style={imageStyle} src={player.photo} alt="avatar" />
      ) : (
        <div style={imageStyle}>
          {player.name
            .split(" ")
            .map(n => n[0])
            .join("")}
        </div>
      )}
    </div>
  );
};

export default Avatar;
