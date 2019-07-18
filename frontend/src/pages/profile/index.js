import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string(),
  oldPassword: Yup.string().when('password', (password, field) =>
    password ? field.min(6).required('Sua senha antiga é obrigatoria') : field
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field.required().oneOf([Yup.ref('password')], 'Senhas não batem')
      : field
  ),
});

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" placeholder="Digite seu e-mail" type="email" />

        <hr />

        <Input
          name="oldPassword"
          placeholder="Sua senha atual"
          type="password"
        />
        <Input name="password" placeholder="Nova senha" type="password" />
        <Input
          name="confirmPassword"
          placeholder="Confirmação da nova senha"
          type="password"
        />
        <button type="submit">
          {loading ? 'Salvando...' : 'Salvar perfil'}
        </button>
      </Form>
    </Container>
  );
}
