import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import * as UserService from "./services/UserService";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";

function App() {
    useEffect(() => {
        // Kiểm tra và xóa access_token nếu không có refresh_token
        const refreshToken = getCookie("refresh_token");
        if (!refreshToken) {
            localStorage.removeItem("access_token");
        }

        const { storageData, decoded } = handleDecoded();
        console.log("handleDecoded: ", storageData, decoded);
        if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, storageData);
        }
    }, []);

    // Hàm lấy cookie
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    };

    const handleDecoded = () => {
        let storageData = localStorage.getItem("access_token");
        let decoded = {};
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData);
            decoded = jwtDecode(storageData);
        }
        return { decoded, storageData };
    };

    // Chạy vào đây trước khi getDetails
    UserService.axiosJWT.interceptors.request.use(
        async (config) => {
            // Do something before request is sent
            const currentTime = new Date();
            const { decoded } = handleDecoded();
            if (decoded?.exp < currentTime.getTime() / 1000) {
                const data = await UserService.refreshToken();
                config.headers["token"] = `Bearer ${data?.access_token}`;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    const dispatch = useDispatch();

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route, index) => {
                        const Page = route.page;
                        const Layout = route.isShowHeader
                            ? DefaultComponent
                            : Fragment;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
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
