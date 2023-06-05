import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { useCycle } from "../../contexts/CycleContext";
import { Countdown } from "./components/countdown";
import { NewFormCycle } from "./components/new-form-cycle";
import * as S from "./styles";

export interface Cycle {
  id: string;
  task: string;
  duration: number;
  startedAt: Date;
  interruptedAt?: Date;
  finishedAt?: Date;
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1),
  minutesAmount: zod.number().min(1).max(60),
});

type NewCycleFormSchema = zod.infer<typeof newCycleFormValidationSchema>;

export function Home(): JSX.Element {
  const { activeCycle, handleCreateNewCycle, markCycleAsInterrupted } =
    useCycle();

  const methods = useForm<NewCycleFormSchema>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const task: string = methods.watch("task");
  const isSubmitDisabled: boolean = !task;

  const handleNewCycle = (formData: NewCycleFormSchema): void => {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: formData.task,
      duration: formData.minutesAmount,
      startedAt: new Date(),
    };

    handleCreateNewCycle(newCycle);

    methods.reset();
  };

  return (
    <S.Container>
      <form action="" onSubmit={methods.handleSubmit(handleNewCycle)}>
        <FormProvider {...methods}>
          <NewFormCycle />
        </FormProvider>

        <Countdown />

        {!activeCycle ? (
          <S.CountdownButton type="submit" disabled={isSubmitDisabled}>
            <>
              <Play size={24} />
              Começar
            </>
          </S.CountdownButton>
        ) : (
          <S.CountdownButton
            type="button"
            onClick={markCycleAsInterrupted}
            started
          >
            <HandPalm size={24} /> Interromper
          </S.CountdownButton>
        )}
      </form>
    </S.Container>
  );
}
