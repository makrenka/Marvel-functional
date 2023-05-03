import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useMarvelService } from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';

export const RandomChar = () => {

    const [char, setChar] = useState(null);

    const { loading, error, getCharacter, clearError } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id).then(onCharLoaded);
    };

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 20000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const content = () => {
        const { name, description, thumbnail, homepage, wiki, id } = char;
        const checkDescription = (description === "")
            ? 'There is no description for this character'
            : description;
        const pruningDescr = (checkDescription.length > 209)
            ? (checkDescription.slice(0, 209) + '...')
            : checkDescription;

        return (
            <div className="randomchar__block">
                <img
                    src={thumbnail}
                    alt="Random character"
                    className={classNames({
                        randomchar__img: true,
                        'available': thumbnail.includes('available')
                    })}
                />
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">{pruningDescr}</p>
                    <div className="randomchar__btns">
                        <Link to={`/character/${id}`} className="button button__main">
                            <div className="inner">homepage</div>
                        </Link>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="randomchar">
            {error && <ErrorMessage />}
            {loading && <Spinner />}
            {!(loading || error || !char) && content()}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
};