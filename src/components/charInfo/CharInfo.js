import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useMarvelService } from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Spinner } from '../spinner/Spinner';

import './charInfo.scss';

export const CharInfo = ({ selectedId }) => {
    const [char, setChar] = useState(null);

    const { loading, error, getCharacter, clearError } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = () => {
        clearError();
        if (!selectedId) { return };

        getCharacter(selectedId).then(onCharLoaded);
    };

    useEffect(() => {
        updateChar();
    }, [selectedId]);

    const content = () => {
        const { name, description, thumbnail, homepage, wiki, comics } = char;

        return (
            <>
                <div className="char__basics">
                    <img
                        src={thumbnail}
                        alt={name}
                        className={classNames({ 'available': thumbnail.includes('available') })}
                    />
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                {comics.length
                    ? <ul className="char__comics-list">
                        {comics.slice(0, 10).map((item, i) =>
                            <li className="char__comics-item" key={i}>
                                {item.name}
                            </li>
                        )}
                    </ul>
                    : <p>There is no comics for this character</p>}
            </>
        );
    };

    return (
        <div className="char__info">
            {!(char || loading || error) && <Skeleton />}
            {error && <ErrorMessage />}
            {loading && <Spinner />}
            {!(loading || error || !char) && content()}
        </div>
    );
};
