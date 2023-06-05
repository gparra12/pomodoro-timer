import { createContext, useContext, useState } from "react";
import { Cycle } from "../pages/home";

interface CycleContextProviderProps {
  children: React.ReactNode;
}

interface CycleContextProps {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  cycles: Cycle[];
  handleAmountSecondsPassed: (seconds: number) => void;
  handleCreateNewCycle: (newCycle: Cycle) => void;
  markCycleAsInterrupted: () => void;
  markCycleAsFinished: () => void;
}

const CycleContext = createContext<CycleContextProps>({} as CycleContextProps);

const useCycle = () => useContext(CycleContext);

const CycleContextProvider: React.FC<CycleContextProviderProps> = ({
  children,
}): JSX.Element => {
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);
  const [cycles, setCycles] = useState<Cycle[]>([]);

  const activeCycle: Cycle | undefined = cycles.find(
    (cycle) => cycle.id === activeCycleId
  );

  const handleAmountSecondsPassed = (amountSeconds: number) => {
    setAmountSecondsPassed(amountSeconds);
  };

  const handleCreateNewCycle = (newCycle: Cycle): void => {
    setCycles((r) => [...r, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
  };

  const markCycleAsInterrupted = (): void => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedAt: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  };

  const markCycleAsFinished = (): void => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedAt: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  };

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        cycles,
        handleAmountSecondsPassed,
        handleCreateNewCycle,
        markCycleAsInterrupted,
        markCycleAsFinished,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};

export { CycleContextProvider, useCycle };
