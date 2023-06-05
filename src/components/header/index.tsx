import * as S from "./styles";
import logoIcon from "../../assets/logo.svg";
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <S.Container>
      <img src={logoIcon} alt="Logo" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/historico" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </S.Container>
  );
}
