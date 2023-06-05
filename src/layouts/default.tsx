import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import * as S from "./styles";

export function DefaultLayout() {
  return (
    <S.DefaultLayoutContainer>
      <Header />
      <Outlet />
    </S.DefaultLayoutContainer>
  );
}
