import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Containt } from './styles';

import logo from '~/assets/logo.svg';

export default function Header() {
  const name = useSelector(state => state.user.profile.name);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Containt>
        <Link to="/dashboard">
          <img src={logo} alt="Meetapp" />
        </Link>
        <aside>
          <div>
            <strong>{name}</strong>
            <Link to="/profile">Meu perfil</Link>
          </div>
          <button type="button" onClick={handleSignOut}>
            Sair
          </button>
        </aside>
      </Containt>
    </Container>
  );
}
