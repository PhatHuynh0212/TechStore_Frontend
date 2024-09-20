import React from "react";
import { Badge, Col } from "antd";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import {
    WrapperContainerHeader,
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
import { useSelector } from "react-redux";

const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const handleNavigateSignin = () => {
        navigate("/sign-in");
    };

    console.log("user: ", user);

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
                    <WrapperHeaderRightItem>
                        <UserOutlined style={{ fontSize: "30px" }} />
                        {user?.name ? (
                            <div style={{ cursor: "pointer" }}>{user.name}</div>
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
