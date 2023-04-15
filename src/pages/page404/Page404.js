import { Link } from "react-router-dom";
import { ErrorMessage } from "../../components/errorMessage/ErrorMessage";

import './Page404.scss';

export const Page404 = () => (
    <div className="error-page">
        <ErrorMessage />
        <p className="error-page__text">
            Page doesn't exist
        </p>
        <Link to="/" className="error-page__link">
            Back to the main page
        </Link>
    </div>
);