import React from "react";
import { Badge, Col } from "antd";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import {
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

const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader>TechStore</WrapperTextHeader>
                </Col>
                <Col span={12}>
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
                        <div>
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
        </div>
    );
};

export default HeaderComponent;
