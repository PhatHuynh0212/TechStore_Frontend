import { Col, Image, Popover, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {
    CheckCircleTwoTone,
    MinusOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import * as ProductService from "../../services/ProductService";
import {
    WrapperAddressProduct,
    WrapperButton,
    WrapperInputNumber,
    WrapperPriceProduct,
    WrapperPriceTextProduct,
    WrapperProductDescription,
    WrapperQuantity,
    WrapperQuantityProduct,
    WrapperStyleColImage,
    WrapperStyleImageSmall,
    WrapperStyleNameProduct,
    WrapperStyleTextSell,
    OutOfStockMessage,
} from "./style";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
    addOrderProduct,
    resetStateOrder,
} from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";

const ProductDetailsComponent = ({ idProduct }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [numProduct, setNumProduct] = useState(1);
    const [errorLimitOrder, setErrorLimitOrder] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const user = useSelector((state) => state?.user);
    const order = useSelector((state) => state?.order);
    const dispatch = useDispatch();

    const onChange = (e) => {
        setNumProduct(Number(e.target.value));
    };

    const toggleExpandDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res?.data;
        }
        return null;
    };

    useEffect(() => {
        const orderRedux = order?.orderItems?.find(
            (item) => item.product === productDetails?._id
        );
        if (
            orderRedux?.amount + numProduct <= orderRedux?.countInStock ||
            (!orderRedux && productDetails?.countInStock > 0)
        ) {
            setErrorLimitOrder(false);
        } else if (productDetails?.countInStock === 0) {
            setErrorLimitOrder(true);
        }
    }, [numProduct]);

    const query = useQuery({
        queryKey: ["product-details", idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct,
    });
    const { isLoading, data: productDetails } = query;

    useEffect(() => {
        return () => {
            dispatch(resetStateOrder());
        };
    }, [order?.isSuccessOrder]);

    const handleChangeCount = (type, limited) => {
        if (type === "increase") {
            if (!limited) {
                setNumProduct(numProduct + 1);
            }
        } else {
            if (!limited) {
                setNumProduct(numProduct - 1);
            }
        }
    };

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate("/sign-in", { state: location?.pathname });
        } else {
            const orderRedux = order?.orderItems?.find(
                (item) => item.product === productDetails?._id
            );
            if (
                orderRedux?.amount + numProduct <= orderRedux?.countInStock ||
                !orderRedux
            ) {
                setShowPopover(true);
                setTimeout(() => setShowPopover(false), 2000);
                dispatch(
                    addOrderProduct({
                        orderItem: {
                            name: productDetails?.name,
                            amount: numProduct,
                            image: productDetails?.image,
                            price: productDetails?.price,
                            product: productDetails?._id,
                            discount: productDetails?.discount,
                            countInStock: productDetails?.countInStock,
                            selled: productDetails?.selled,
                        },
                    })
                );
            } else {
                setErrorLimitOrder(true);
            }
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
                        // preview={false}
                    />
                    <Row
                        style={{
                            paddingTop: "10px",
                            justifyContent: "space-between",
                        }}
                    >
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall
                                src={productDetails?.image}
                                alt="Small image"
                                preview={false}
                            />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall
                                src={productDetails?.image}
                                alt="Small image"
                                preview={false}
                            />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall
                                src={productDetails?.image}
                                alt="Small image"
                                preview={false}
                            />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall
                                src={productDetails?.image}
                                alt="Small image"
                                preview={false}
                            />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall
                                src={productDetails?.image}
                                alt="Small image"
                                preview={false}
                            />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall
                                src={productDetails?.image}
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
                            | Sold{" "}
                            {productDetails?.selled > 0
                                ? `${productDetails?.selled}+`
                                : 0}
                        </WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>
                            {convertPrice(productDetails?.price)}
                        </WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperProductDescription>
                        {isExpanded
                            ? productDetails?.description
                            : `${productDetails?.description?.slice(
                                  0,
                                  100
                              )}...`}
                        {productDetails?.description?.length > 100 && (
                            <span
                                onClick={toggleExpandDescription}
                                className="toggle-description"
                            >
                                {isExpanded ? " Shorten" : " See more"}
                            </span>
                        )}
                    </WrapperProductDescription>
                    <hr />
                    <WrapperAddressProduct>
                        <span>Delivered to </span>
                        {user?.address && user?.city ? (
                            <span>
                                <span className="address">
                                    {user?.address} - {user?.city}
                                </span>
                                {" - "}
                            </span>
                        ) : (
                            <span>... </span>
                        )}
                        <span
                            className="change-address"
                            onClick={() => navigate("/profile-user")}
                        >
                            Change address
                        </span>
                    </WrapperAddressProduct>
                    <hr />
                    <div style={{ margin: "10px 0 20px" }}>
                        <span>Quantity</span>
                        <WrapperQuantity>
                            <WrapperQuantityProduct>
                                <WrapperButton
                                    onClick={() =>
                                        handleChangeCount(
                                            "decrease",
                                            numProduct === 1
                                        )
                                    }
                                >
                                    <MinusOutlined
                                        style={{
                                            color: "#000",
                                            fontSize: "20px",
                                        }}
                                    />
                                </WrapperButton>
                                <WrapperInputNumber
                                    defaultValue={1}
                                    value={numProduct}
                                    min={1}
                                    max={productDetails?.countInStock}
                                />
                                <WrapperButton
                                    onClick={() =>
                                        handleChangeCount(
                                            "increase",
                                            numProduct ===
                                                productDetails?.countInStock
                                        )
                                    }
                                >
                                    <PlusOutlined
                                        style={{
                                            color: "#000",
                                            fontSize: "20px",
                                        }}
                                    />
                                </WrapperButton>
                            </WrapperQuantityProduct>
                            <div>
                                {errorLimitOrder && (
                                    <OutOfStockMessage>
                                        Product was out of stock!
                                    </OutOfStockMessage>
                                )}
                            </div>
                        </WrapperQuantity>
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
                        <div>
                            <Popover
                                content={
                                    <span>
                                        <CheckCircleTwoTone twoToneColor="#52c41a" />{" "}
                                        Added to cart!
                                    </span>
                                }
                                visible={showPopover}
                                placement="bottom"
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
                                    onClick={handleAddOrderProduct}
                                />
                            </Popover>
                        </div>
                        <ButtonComponent
                            disabled
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
                                cursor: "not-allowed",
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
