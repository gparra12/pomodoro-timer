import * as S from "./styles";

export function History(): JSX.Element {
  return (
    <S.Container>
      <S.Title>Meu Histórico</S.Title>

      <S.List>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 min</td>
              <td>Há 2 meses </td>
              <td>
                <S.Status statusColor="red">Interrompido</S.Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 min</td>
              <td>Há 2 meses </td>
              <td>
                <S.Status statusColor="green">Concluído</S.Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 min</td>
              <td>Há 2 meses </td>
              <td>
                <S.Status statusColor="yellow">Em andamento</S.Status>
              </td>
            </tr>
          </tbody>
        </table>
      </S.List>
    </S.Container>
  );
}
