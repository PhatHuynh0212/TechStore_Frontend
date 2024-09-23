import React from "react";
import { StarFilled } from "@ant-design/icons";
import {
    StyleNameProduct,
    WrapperCardStyle,
    WrapperDiscountText,
    WrapperPriceText,
    WrapperReportText,
    WrapperStyleTextSell,
} from "./style";

const CardComponent = (props) => {
    const {
        countInStock,
        description,
        image,
        name,
        price,
        rating,
        type,
        selled,
        discount,
    } = props;
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
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span>
                    <span>{rating}</span>
                    <StarFilled
                        style={{
                            fontSize: "1.2rem",
                            color: "#f59e0b",
                            padding: "0 4px",
                        }}
                    />
                </span>
                <WrapperStyleTextSell>
                    | Sold {selled || 1000}+
                </WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: "3px" }}>{price}</span>
                <WrapperDiscountText>{discount || 5}%</WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    );
};

export default CardComponent;
