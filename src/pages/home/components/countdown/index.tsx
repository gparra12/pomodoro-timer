import { differenceInSeconds } from "date-fns";
import { useEffect } from "react";
import { useCycle } from "../../../../contexts/CycleContext";
import * as S from "./styles";

export function Countdown(): JSX.Element {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    handleAmountSecondsPassed,
    markCycleAsFinished,
  } = useCycle();

  const totalSeconds: number = activeCycle ? activeCycle.duration * 60 : 0;
  const currentSeconds: number = activeCycle
    ? totalSeconds - amountSecondsPassed
    : 0;

  const minutesAmount: number = Math.floor(currentSeconds / 60);
  const secondsAmount: number = currentSeconds % 60;

  const minutes: string = String(minutesAmount).padStart(2, "0");
  const seconds: string = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    } else {
      document.title = "Pomodoro Timer";
    }
  }, [minutes, seconds, activeCycle]);

  useEffect(() => {
    let cycleInterval: number;

    if (activeCycle) {
      cycleInterval = setInterval(() => {
        const secondsInDifference = differenceInSeconds(
          new Date(),
          activeCycle.startedAt
        );

        if (secondsInDifference >= totalSeconds) {
          markCycleAsFinished();
          handleAmountSecondsPassed(totalSeconds);

          clearInterval(cycleInterval);
        } else {
          handleAmountSecondsPassed(secondsInDifference);
        }
      }, 1000);
    }
    return () => {
      clearInterval(cycleInterval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  return (
    <S.CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <S.Separator>:</S.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </S.CountdownContainer>
  );
}
