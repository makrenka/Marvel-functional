
import './appHeader.scss';

export const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">

                <span>Marvel</span> information portal

            </h1>
            <nav className="app__menu">
                <ul>
                    <li>

                        Characters

                    </li>
                    /
                    <li>

                        Comics

                    </li>
                </ul>
            </nav>
        </header>
    );
};