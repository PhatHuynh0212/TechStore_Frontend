import React from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import {
    WrapperContent,
    WrapperNavbar,
    WrapperPagination,
    WrapperProduct,
} from "./style";
import { Col } from "antd";

const TypeProductPage = () => {
    const onChange = () => {};

    return (
        <div style={{ width: "100%", background: "#efefef" }}>
            <div style={{ width: "1270px", margin: "0 auto" }}>
                <WrapperContent>
                    <WrapperNavbar span={4}>
                        <NavBarComponent />
                    </WrapperNavbar>
                    <Col span={20}>
                        <WrapperProduct>
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                        </WrapperProduct>
                        <WrapperPagination
                            showQuickJumper
                            defaultCurrent={2}
                            total={100}
                            onChange={onChange}
                        />
                    </Col>
                </WrapperContent>
            </div>
        </div>
    );
};

export default TypeProductPage;
