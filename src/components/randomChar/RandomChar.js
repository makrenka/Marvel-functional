import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { MarvelService } from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';

export const RandomChar = () => {

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        setLoading(true);

        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    };

    useEffect(() => {
        updateChar();
    }, []);

    const content = () => {
        const { name, description, thumbnail, homepage, wiki } = char;
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
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
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
            {!(loading || error) && content()}
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