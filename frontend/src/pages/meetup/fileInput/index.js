import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import api from '~/services/api';

import background from '~/assets/background-image.png';
import { Container } from './styles';

export default function FileInput() {
  const { defaultValue, registerField } = useField('File');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(
    defaultValue ? defaultValue.url : background
  );

  const ref = useRef();

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const res = await api.post('files', data);

    const { id, url } = res.data;

    setFile(id);
    setPreview(url);
  }

  useEffect(() => {
    if (ref.current)
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
  }, [ref, registerField]);

  return (
    <Container>
      <label htmlFor="file">
        <img src={preview} alt="" />

        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleChange}
          data-file={file}
          ref={ref}
        />
      </label>
    </Container>
  );
}
