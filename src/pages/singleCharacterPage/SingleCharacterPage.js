import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { ErrorMessage } from "../../components/errorMessage/ErrorMessage";
import { Spinner } from "../../components/spinner/Spinner";
import { useMarvelService } from "../../services/MarvelService";

import './singleCharacterPage.scss';

export const SingleCharacter = () => {

    const [char, setChar] = useState(null);
    const { id } = useParams();
    let navigate = useNavigate();

    const { loading, error, getCharacter, clearError } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = () => {
        clearError();
        getCharacter(id).then(onCharLoaded);
    };

    useEffect(() => {
        updateChar(id);
    }, [id]);

    const content = () => {
        const { thumbnail, name, description, comics } = char;

        return (
            <>
                <img src={thumbnail} alt={name} className="single-char__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    {description
                        ? <p className="single-comic__descr">{description}</p>
                        : <p className="single-comic__descr">There's no description for this character</p>}
                    <div className="char__comics">Comics:</div>
                    {comics.length
                        ? <ul className="char__comics-list">
                            {comics.map((item, i) =>
                                <li className="char__comics-item" key={i}>
                                    {item.name}
                                </li>
                            )}
                        </ul>
                        : <p className="single-comic__descr">There is no comics for this character</p>}
                </div>
                <button
                    type='button'
                    className="single-comic__back"
                    onClick={() => navigate(-1)}
                >
                    Back to all
                </button>

            </>
        );
    };

    if (loading) return <Spinner />;

    if (error) return <ErrorMessage />;

    return (
        <div className="single-comic">
            {!(loading || error || !char) && content()}
        </div>
    );
};