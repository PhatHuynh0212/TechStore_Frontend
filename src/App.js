import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import * as UserService from "./services/UserService";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, resetUser } from "./redux/slides/userSlide";
import Loading from "./components/LoadingComponent/LoadingComponent";

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        // Kiểm tra và xóa access_token nếu không có refresh_token
        const refreshToken = getCookie("refresh_token");
        if (!refreshToken) {
            localStorage.removeItem("access_token");
        }

        setIsPending(true);

        const { storageData, decoded } = handleDecoded();
        if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, storageData);
        }

        setIsPending(false);
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
            let storageRefreshToken = localStorage.getItem("refresh_token");
            const refreshToken = JSON.parse(storageRefreshToken);
            const decodeRefreshToken = jwtDecode(refreshToken);
            if (decoded?.exp < currentTime.getTime() / 1000) {
                if (decodeRefreshToken?.exp > currentTime.getTime() / 1000) {
                    const data = await UserService.refreshToken(refreshToken);
                    config.headers["token"] = `Bearer ${data?.access_token}`;
                } else {
                    dispatch(resetUser());
                }
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    const handleGetDetailsUser = async (id, token) => {
        let storageRefreshToken = localStorage.getItem("refresh_token");
        const refreshToken = JSON.parse(storageRefreshToken);
        const res = await UserService.getDetailsUser(id, token);
        dispatch(
            updateUser({
                ...res?.data,
                access_token: token,
                refreshToken: refreshToken,
            })
        );
    };

    return (
        <div>
            <Loading isPending={isPending}>
                <Router>
                    <Routes>
                        {routes.map((route, index) => {
                            const Page = route.page;
                            const isCheckAuth =
                                !route.isPrivate || user.isAdmin;
                            const Layout = route.isShowHeader
                                ? DefaultComponent
                                : Fragment;
                            return (
                                <Route
                                    key={index}
                                    path={isCheckAuth ? route.path : undefined}
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
            </Loading>
        </div>
    );
}

export default App;
