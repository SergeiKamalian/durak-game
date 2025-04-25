"use client";
import { useContext } from "react";
import { AIGameContext } from "./AIGameContext";
export const useAiGame = () => useContext(AIGameContext);
