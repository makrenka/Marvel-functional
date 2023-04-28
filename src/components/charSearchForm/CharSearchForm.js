import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useMarvelService } from '../../services/MarvelService';

import './charSearchForm.scss';
import { Spinner } from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

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
    formState: { errors },
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

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage />;

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
      </form>
      {char && char.length
        ? <div className='char__search-success-wrapper'>
          <p className='char__search-success'>There is! Visit {char[0].name} page</p>
          <Link to={`/character/${char[0].id}`} className='button button__secondary'>
            <div className="inner">To page</div>
          </Link>
        </div>
        : char !== null
          ? <p className="char__search-error">The character was not found. Check the name and try again</p>
          : null}
    </div>
  );
};
