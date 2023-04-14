import { useState } from "react";
import { CharInfo } from "../components/charInfo/CharInfo";
import { CharList } from "../components/charList/CharList";
import { RandomChar } from "../components/randomChar/RandomChar";

import decoration from '../resources/img/vision.png';

const MainPage = () => {

    const [selectedId, setSelectedId] = useState(null);

    const onSelected = (id) => {
        setSelectedId(id);
    };

    return (
        <>
            <RandomChar />
            <div className="char__content">
                <CharList onSelected={onSelected} selectedId={selectedId} />
                <CharInfo selectedId={selectedId} />
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default MainPage;