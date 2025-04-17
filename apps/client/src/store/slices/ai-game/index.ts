import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../../../../../../packages/shared";

interface AIGameState {
  aiGame: Game | null;
}

const initialState: AIGameState = { aiGame: null };

const aiGameSlice = createSlice({
  name: "ai-game",
  initialState,
  reducers: {
    changeAIGame: (state, action: PayloadAction<Game | null>) => {
      state.aiGame = action.payload;
    },
  },
});

export const { changeAIGame } = aiGameSlice.actions;
export const aiGameReducer = aiGameSlice.reducer;
