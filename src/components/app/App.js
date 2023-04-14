import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppHeader } from "../appHeader/AppHeader";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";
import { Page404 } from "../../pages/page404";
import { SingleComic } from "../../pages/singleComicPage/SingleComicPage";
import { Spinner } from "../spinner/Spinner";

const MainPage = lazy(() => import('../../pages/MainPage'));
const ComicsPage = lazy(() => import('../../pages/ComicsPage'));

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
                        <Suspense fallback={<Spinner />}>
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route path="/comics" element={<ComicsPage />} />
                                <Route path="/comics/:id" element={<SingleComic />} />
                                <Route path="*" element={<Page404 />} />
                            </Routes>
                        </Suspense>
                    </main>
                </div>
            </ErrorBoundary>
        </Router>

    );
};