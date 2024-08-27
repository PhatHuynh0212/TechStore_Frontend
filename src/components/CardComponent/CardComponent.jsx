import React from "react";
import { StarFilled } from "@ant-design/icons";
import {
    StyleNameProduct,
    WrapperCardStyle,
    WrapperDiscountText,
    WrapperPriceText,
    WrapperReportText,
} from "./style";

const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            styles={{ body: { padding: "15px" } }}
            cover={
                <img
                    alt="example"
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png"
                />
            }
        >
            <StyleNameProduct>Samsung Galaxy S24 Ultra</StyleNameProduct>
            <WrapperReportText>
                <span>
                    <span>4.8</span>
                    <StarFilled
                        style={{
                            fontSize: "1.2rem",
                            color: "#f59e0b",
                            padding: "0 4px",
                        }}
                    />
                </span>
                <span>| Sold 1000+</span>
            </WrapperReportText>
            <WrapperPriceText>
                29.990.000đ
                <WrapperDiscountText>-5%</WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    );
};

export default CardComponent;
