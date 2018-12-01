export interface Player {
  id: string;
  name: string;
  photo: string | null;
  strokes?: number;
  isInTeam?: boolean;
}

export interface GameTeam {
  strokes: number;
  players: Player[];
}

export interface GameState {
  teamEvent: boolean;
  strokesEvent: boolean;
  courseId?: string | null;
  selectedPlayers?: Player[];
  teams?: GameTeam[];
  stepIndex: number;
}

const team = {
  __typename: "Team",
  players: [],
  strokes: 5
};

export const initialState: GameState = {
  courseId: null,
  selectedPlayers: [],
  stepIndex: 0,
  strokesEvent: false,
  teamEvent: false,
  teams: [{ ...team }, { ...team }]
};
