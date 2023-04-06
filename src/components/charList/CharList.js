import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { MarvelService } from '../../services/MarvelService';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Spinner } from '../spinner/Spinner';

import './charList.scss';

export const CharList = ({ selectedId, onSelected }) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        };

        setCharList((charList) => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(ended);
    };

    const onCharListLoading = () => {
        setNewItemLoading(true);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const updateCharList = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    };

    useEffect(() => {
        updateCharList();
    }, []);

    return (
        <div className="char__list">
            {loading && <Spinner />}
            {error && <ErrorMessage />}
            <ul className="char__grid">
                {charList.map(({ thumbnail, name, id }) =>
                    <li
                        className={classNames({ char__item: true, 'char__item_selected': id === selectedId })}
                        key={id}
                        data-id={id}
                        onClick={() => { onSelected(id) }}

                    >
                        <img
                            src={thumbnail}
                            alt={name}
                            className={classNames({ 'available': thumbnail.includes('available') })}
                        />
                        <div className="char__name">{name}</div>
                    </li>
                )}
            </ul>
            <button
                className={classNames("button button__main button__long", { unactive: charEnded })}
                onClick={() => { updateCharList(offset) }}
                disabled={newItemLoading}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};