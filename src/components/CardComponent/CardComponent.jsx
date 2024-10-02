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
import { useNavigate } from "react-router";

const CardComponent = (props) => {
    const {
        id,
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

    const navigate = useNavigate();
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`);
    };

    return (
        <WrapperCardStyle
            hoverable
            styles={{ body: { padding: "15px" } }}
            cover={
                <img alt="image_product" src={image} style={{ width: "99%" }} />
            }
            onClick={() => handleDetailsProduct(id)}
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
                <span style={{ marginRight: "3px" }}>
                    {price.toLocaleString()} ₫
                </span>
                <WrapperDiscountText>- {discount || 5}%</WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    );
};

export default CardComponent;
