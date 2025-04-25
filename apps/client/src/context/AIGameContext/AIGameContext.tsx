import { createContext, ReactNode } from "react";
import { useCreateAiGameContext } from "./useCreateAiGameContext";

type InitialValues = ReturnType<typeof useCreateAiGameContext>;
const AIGameContext = createContext<InitialValues>({} as InitialValues);

const AIGameProvider = ({ children }: { children: ReactNode }) => {
  const value = useCreateAiGameContext();
  return <AIGameContext value={value}>{children}</AIGameContext>;
};

export { AIGameContext, AIGameProvider };
