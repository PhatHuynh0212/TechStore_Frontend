import { Col, Image, Rate, Row } from "antd";
import React, { useState } from "react";
import imgSmall from "../../assets/images/imgsmall.webp";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import * as ProductService from "../../services/ProductService";
import {
    WrapperAddressProduct,
    WrapperButton,
    WrapperInputNumber,
    WrapperPriceProduct,
    WrapperPriceTextProduct,
    WrapperQuantityProduct,
    WrapperStyleColImage,
    WrapperStyleImageSmall,
    WrapperStyleNameProduct,
    WrapperStyleTextSell,
} from "./style";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/LoadingComponent";
import { useSelector } from "react-redux";

const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1);
    const user = useSelector((state) => state.user);
    const onChange = (e) => {
        setNumProduct(Number(e.target.value));
    };

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res?.data;
        }
        return null;
    };

    const query = useQuery({
        queryKey: ["product-details", idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct,
    });
    const { isLoading, data: productDetails } = query;

    const handleChangeCount = (type) => {
        if (type === "increase") {
            setNumProduct(numProduct + 1);
        } else {
            setNumProduct(numProduct - 1);
        }
    };

    return (
        <Loading isPending={isLoading}>
            <Row
                style={{
                    padding: "16px",
                    background: "#fff",
                    borderRadius: "5px",
                }}
            >
                <Col span={10} style={{ borderRight: "1px solid #e5e5e5" }}>
                    <Image
                        src={productDetails?.image}
                        alt="Product image"
                        preview={false}
                    />
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
                        {productDetails?.name}
                    </WrapperStyleNameProduct>
                    <div>
                        {/* Rating starts */}
                        <Rate
                            allowHalf
                            defaultValue={productDetails?.rating}
                            value={productDetails?.rating}
                        />
                        {/* Sale */}
                        <WrapperStyleTextSell>
                            {" "}
                            | Sold 1000+
                        </WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>
                            {productDetails?.price.toLocaleString()} ₫
                        </WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Delivered to </span>
                        <span className="address">{user?.address}</span>
                        {" - "}
                        <span className="change-address">Change address</span>
                    </WrapperAddressProduct>
                    <hr />
                    <div style={{ margin: "10px 0 20px" }}>
                        <span>Quantity</span>
                        <WrapperQuantityProduct>
                            <WrapperButton
                                onClick={() => handleChangeCount("decrease")}
                            >
                                <MinusOutlined
                                    style={{ color: "#000", fontSize: "20px" }}
                                />
                            </WrapperButton>
                            <WrapperInputNumber
                                value={numProduct}
                                onChange={onChange}
                            />
                            <WrapperButton
                                onClick={() => handleChangeCount("increase")}
                            >
                                <PlusOutlined
                                    style={{ color: "#000", fontSize: "20px" }}
                                />
                            </WrapperButton>
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
        </Loading>
    );
};

export default ProductDetailsComponent;
