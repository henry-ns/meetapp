import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  function handleSubmit(data) {}

  return (
    <>
      <img src={logo} alt="Meetapp" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" placeholder="Digite seu e-mail" type="email" />
        <Input
          name="password"
          placeholder="Sua senha secreta"
          type="password"
        />

        <button type="submit">Entrar</button>
      </Form>
      <Link to="/register">
        <button type="button">Cria conta grátis</button>
      </Link>
    </>
  );
}
