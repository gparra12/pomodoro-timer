import { useFormContext } from "react-hook-form";
import { useCycle } from "../../../../contexts/CycleContext";
import * as S from "./styles";

export function NewFormCycle(): JSX.Element {
  const { activeCycle } = useCycle();
  const { register } = useFormContext();

  return (
    <S.FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <S.TaskInput
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        disabled={!!activeCycle}
        {...register("task")}
      />

      <datalist id="task-suggestions">
        <option value="Projeto-1" />
        <option value="Projeto-1" />
        <option value="Projeto-1" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <S.MinutesAmountInput
        type="number"
        max={60}
        min={1}
        id="minutesAmount"
        placeholder="00"
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </S.FormContainer>
  );
}
