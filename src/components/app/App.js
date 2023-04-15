import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppHeader } from "../appHeader/AppHeader";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";
import { ComicsPage } from "../../pages/ComicsPage";
import { MainPage } from "../../pages/MainPage";

export const App = () => (
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
                    </Routes>
                </main>
            </div>
        </ErrorBoundary>
    </Router>
);