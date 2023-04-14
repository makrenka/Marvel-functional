import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppHeader } from "../appHeader/AppHeader";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";
import { ComicsPage } from "../../pages/ComicsPage";
import { MainPage } from "../../pages/MainPage";
import { Page404 } from "../../pages/page404";
import { SingleComic } from "../../pages/singleComicPage/SingleComicPage";



export const App = () => {
    return (
        <Router>
            <ErrorBoundary>
                <div className="app">
                    <AppHeader />
                    <main>
                        {/* <Switch>
                                <Route exact path="/">
                                    <MainPage />
                                </Route>
                                <Route exact path="/comics">
                                    <ComicsPage />
                                </Route>
                            </Switch> */}
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route path="/comics/:id" element={<SingleComic />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </main>
                </div>
            </ErrorBoundary>
        </Router>

    );
};