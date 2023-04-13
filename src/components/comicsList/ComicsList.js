import { useEffect, useState } from 'react';

import { useMarvelService } from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

import './comicsList.scss';
import classNames from 'classnames';

export const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        };

        setComicsList((comicsList) => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 8);
        setCharEnded(ended);
    };

    const onComicsListLoading = () => {
        setNewItemLoading(true);
    };

    const updateComicsList = (offset) => {
        onComicsListLoading();
        getAllComics(offset).then(onComicsListLoaded);
    };

    useEffect(() => {
        updateComicsList();
    }, []);

    return (
        <div className="comics__list">
            {loading && <Spinner />}
            {error && <ErrorMessage />}
            <ul className="comics__grid">
                {comicsList.map(({ id, thumbnail, title, price }) =>
                    <li className="comics__item" key={id}>
                        <a href="#">
                            <img src={thumbnail} alt={title} className="comics__item-img" />
                            <div className="comics__item-name">{title}</div>
                            <div className="comics__item-price">{price}</div>
                        </a>
                    </li>
                )}
            </ul>
            <button
                className={classNames("button button__main button__long", { unactive: charEnded })}
                onClick={() => { updateComicsList(offset) }}
                disabled={newItemLoading}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};