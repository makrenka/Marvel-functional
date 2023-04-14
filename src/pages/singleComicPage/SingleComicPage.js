import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ErrorMessage } from '../../components/errorMessage/ErrorMessage';
import { Spinner } from '../../components/spinner/Spinner';

import xMen from '../../resources/img/x-men.png';
import { useMarvelService } from '../../services/MarvelService';

import './SingleComicPage.scss';

export const SingleComic = () => {

    const { id } = useParams();
    const [comics, setComics] = useState(null);

    const { loading, error, getComics, clearError } = useMarvelService();

    const onComicsLoaded = (comics) => {
        setComics(comics);
    };

    const updateComics = () => {
        clearError();
        getComics(id).then(onComicsLoaded);
    };

    useEffect(() => {
        updateComics(id);
    }, [id]);

    const content = () => {
        const { thumbnail, title, description, pageCount, language, price } = comics;

        return (
            <>
                <img src={thumbnail} alt={title} className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">{language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">
                    Back to all
                </Link>
            </>
        )
    }

    return (
        <div className="single-comic">
            {loading && <Spinner />}
            {error && <ErrorMessage />}
            {!(loading || error || !comics) && content()}
        </div>
    );
};