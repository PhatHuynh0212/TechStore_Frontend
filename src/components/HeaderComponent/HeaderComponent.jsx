import React, { useState } from "react";
import { Badge, Col, Popover } from "antd";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import {
    WrapperContainerHeader,
    WrapperContentPopup,
    WrapperHeader,
    WrapperHeaderRightItem,
    WrapperTextHeader,
    WrapperTextHeaderSmall,
} from "./style";
import {
    CaretDownOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/LoadingComponent";

const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [pending, setPending] = useState(false);
    const handleNavigateSignin = () => {
        navigate("/sign-in");
    };
    // const handleNavigateHome = () => {
    //     navigate("/");
    // };

    const handleLogout = async () => {
        setPending(true);
        await UserService.logoutUser();
        localStorage.removeItem("access_token");
        dispatch(resetUser());
        setPending(false);
    };

    const content = (
        <div>
            <WrapperContentPopup>User information</WrapperContentPopup>
            <WrapperContentPopup onClick={handleLogout}>
                Logout
            </WrapperContentPopup>
        </div>
    );

    return (
        <WrapperContainerHeader>
            <WrapperHeader>
                <Col span={5}>
                    <WrapperTextHeader>TechStore</WrapperTextHeader>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size="large"
                        placeholder="input search text"
                        textButton="Search"
                        bordered="none"
                        backgroundColorButton="#4096ff"
                        colorButton="#fff"
                        // onSearch={onSearch}
                    />
                </Col>
                <Col
                    span={6}
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Loading isPending={pending}>
                        <WrapperHeaderRightItem>
                            <UserOutlined style={{ fontSize: "30px" }} />
                            {user?.name ? (
                                <>
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: "pointer" }}>
                                            {user.name}
                                        </div>
                                    </Popover>
                                </>
                            ) : (
                                <div
                                    onClick={handleNavigateSignin}
                                    style={{ cursor: "pointer" }}
                                >
                                    <WrapperTextHeaderSmall>
                                        Sign in / Sign up
                                    </WrapperTextHeaderSmall>
                                    <div>
                                        <span style={{ paddingRight: "4px" }}>
                                            Account
                                        </span>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </WrapperHeaderRightItem>
                    </Loading>
                    <WrapperHeaderRightItem>
                        <Badge count={3} size="small">
                            <ShoppingCartOutlined
                                style={{ fontSize: "35px", color: "#fff" }}
                            />
                        </Badge>
                        <WrapperTextHeaderSmall
                            style={{
                                alignSelf: "flex-end",
                                paddingBottom: "4px",
                            }}
                        >
                            Shopping Cart
                        </WrapperTextHeaderSmall>
                    </WrapperHeaderRightItem>
                </Col>
            </WrapperHeader>
        </WrapperContainerHeader>
    );
};

export default HeaderComponent;
