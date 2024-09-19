import { Col, Image, Row } from "antd";
import React from "react";
import imgProduct from "../../assets/images/img-product.webp";
import imgSmall from "../../assets/images/imgsmall.webp";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import {
    WrapperAddressProduct,
    WrapperInputNumber,
    WrapperPriceProduct,
    WrapperPriceTextProduct,
    WrapperQuantityProduct,
    WrapperStyleColImage,
    WrapperStyleImageSmall,
    WrapperStyleNameProduct,
    WrapperStyleTextSell,
} from "./style";

const ProductDetailsComponent = () => {
    const onChange = () => {};

    return (
        <Row
            style={{ padding: "16px", background: "#fff", borderRadius: "5px" }}
        >
            <Col span={10} style={{ borderRight: "1px solid #e5e5e5" }}>
                <Image src={imgProduct} alt="Product image" preview={false} />
                <Row
                    style={{
                        paddingTop: "10px",
                        justifyContent: "space-between",
                    }}
                >
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={imgSmall}
                            alt="Small image"
                            preview={false}
                        />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={imgSmall}
                            alt="Small image"
                            preview={false}
                        />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={imgSmall}
                            alt="Small image"
                            preview={false}
                        />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={imgSmall}
                            alt="Small image"
                            preview={false}
                        />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={imgSmall}
                            alt="Small image"
                            preview={false}
                        />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={imgSmall}
                            alt="Small image"
                            preview={false}
                        />
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14} style={{ paddingLeft: "15px" }}>
                <WrapperStyleNameProduct>
                    Cellphone AI Samsung Galaxy S24 Ultra, Camera 200MP Zoom
                    100x, S Pen - Genuine
                </WrapperStyleNameProduct>
                <div>
                    <StarFilled
                        style={{
                            fontSize: "1.4rem",
                            color: "#f59e0b",
                            padding: "0 4px",
                        }}
                    />
                    <StarFilled
                        style={{
                            fontSize: "1.4rem",
                            color: "#f59e0b",
                            padding: "0 4px",
                        }}
                    />
                    <StarFilled
                        style={{
                            fontSize: "1.4rem",
                            color: "#f59e0b",
                            padding: "0 4px",
                        }}
                    />
                    <StarFilled
                        style={{
                            fontSize: "1.4rem",
                            color: "#f59e0b",
                            padding: "0 4px",
                        }}
                    />
                    <WrapperStyleTextSell> | Sold 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>
                        29.990.000
                    </WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Delivered to </span>
                    <span className="address">
                        Q. 1, P. Ben Nghe, Ho Chi Minh
                    </span>
                    {" - "}
                    <span className="change-address">Change address</span>
                </WrapperAddressProduct>
                <hr />
                <div style={{ margin: "10px 0 20px" }}>
                    <span>Quantity</span>
                    <WrapperQuantityProduct>
                        <button
                            style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            <MinusOutlined
                                style={{ color: "#000", fontSize: "20px" }}
                            />
                        </button>
                        <WrapperInputNumber
                            defaultValue={1}
                            onChange={onChange}
                        />
                        <button
                            style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            <PlusOutlined
                                style={{ color: "#000", fontSize: "20px" }}
                            />
                        </button>
                    </WrapperQuantityProduct>
                </div>
                <hr />
                <div
                    style={{
                        paddingTop: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    <ButtonComponent
                        size={40}
                        styleButton={{
                            color: "#fff",
                            fontSize: "1.8rem",
                            fontWeight: "600",
                            background: "#FF3945",
                            height: "50px",
                            width: "220px",
                            border: "none",
                            borderRadius: "4px",
                        }}
                        textButton={"Add to cart"}
                    />
                    <ButtonComponent
                        size={40}
                        styleButton={{
                            color: "#0D5CB6 ",
                            fontSize: "1.8rem",
                            fontWeight: "600",
                            background: "#fff",
                            height: "50px",
                            width: "220px",
                            border: "1px solid #0D5CB6 ",
                            borderRadius: "4px",
                        }}
                        textButton={"Pay later"}
                    />
                </div>
            </Col>
        </Row>
    );
};

export default ProductDetailsComponent;
