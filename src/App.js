import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route, index) => {
                        const Page = route.page;
                        const LayoutHeader = route.isShowHeader
                            ? DefaultComponent
                            : Fragment;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <LayoutHeader>
                                        <Page />
                                    </LayoutHeader>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
