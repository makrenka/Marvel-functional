import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useMarvelService } from '../../services/MarvelService';

import './charSearchForm.scss';

const schema = yup.object({
  name: yup
    .string()
    .required('This field is required!')
});

export const CharSearchForm = () => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const onSubmit = (data) => {
    clearError();
    getCharacterByName(data.name).then(onCharLoaded);
    reset();
  };

  //текст для посещения страницы: There is! Visit {char[0].name} page?
  //текст ошибки: The character was not found. Check the name and try again

  return (
    <div className="char__search-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="char__search-label" htmlFor="charName">
          Or find a character by name:
        </label>
        <div className="char__search-wrapper">
          <div>
            <input
              placeholder="Enter name"
              {...register('name')}
            />
            <div className="char__search-error">
              {errors.name && <span>{errors.name.message}</span>}
            </div>
          </div>
          <button
            type="submit"
            className="button button__main"
            disabled={loading}
          >
            <div className="inner">find</div>
          </button>
        </div>
        <div className="char__search-error"></div>
      </form>
    </div>
  );
};
