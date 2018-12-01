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
  strokes: 5,
  players: [],
  __typename: 'Team'
};

export const initialState: GameState = {
  teamEvent: false,
  strokesEvent: false,
  courseId: null,
  selectedPlayers: [],
  teams: [{ ...team }, { ...team }],
  stepIndex: 0
};
