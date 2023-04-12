import { Route, Router, Routes } from "react-router-dom";

import { AppHeader } from "../appHeader/AppHeader";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";
import { ComicsPage } from "../../pages/ComicsPage";
import { MainPage } from "../../pages/MainPage";


export const App = () => {
    return (
        // <Router>
        <div className="app">
            <AppHeader />
            <main>
                {/* <Switch>
                        <ErrorBoundary>
                            <Route exact path="/">
                                <MainPage />
                            </Route>
                            <Route exact path="/comics">
                                <ComicsPage />
                            </Route>
                        </ErrorBoundary>
                    </Switch> */}
                {/* <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                    </Routes> */}
            </main>
        </div>
        // </Router>
    );
};