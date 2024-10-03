import React, { useState } from "react";
import {
    ButtonContainer,
    StyledButton,
    WrapperCountOrder,
    WrapperInfo,
    WrapperItemOrder,
    WrapperLeft,
    WrapperListOrder,
    WrapperPriceDiscount,
    WrapperRight,
    WrapperStyleHeader,
    WrapperTotal,
} from "./style";
import { Checkbox } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import { useDispatch, useSelector } from "react-redux";
import {
    decreaseAmount,
    increaseAmount,
    removeAllOrderProduct,
    removeOrderProduct,
} from "../../redux/slides/orderSlide";

const OrderPage = () => {
    const order = useSelector((state) => state?.order);
    const [listChecked, setListChecked] = useState([]);
    const dispatch = useDispatch();
    console.log("order: ", order);

    const onChange = (e) => {
        console.log(`check = ${e.target.value}`);
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter(
                (item) => item !== e.target.value
            );
            setListChecked(newListChecked);
        } else {
            setListChecked([...listChecked, e.target.value]);
        }
    };

    const handleChangeCount = (type, idProduct) => {
        if (type === "increase") {
            dispatch(increaseAmount({ idProduct }));
        } else {
            dispatch(decreaseAmount({ idProduct }));
        }
    };

    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
    };

    const handleOnChangeCheckAll = (e) => {
        if (e.target.checked) {
            const allListChecked = [];
            order?.orderItems?.forEach((item) => {
                allListChecked.push(item?.product);
            });
            setListChecked(allListChecked);
        } else {
            setListChecked([]);
        }
    };

    const handleRemoveAllOrder = () => {
        if (listChecked?.length > 0) {
            dispatch(removeAllOrderProduct({ listChecked }));
        }
    };

    return (
        <div
            style={{
                background: "#f5f5fa",
                width: "100%",
                height: "100vh",
                paddingTop: "10px",
            }}
        >
            <div style={{ width: "1270px", height: "100%", margin: "0 auto" }}>
                <p style={{ margin: "0 0 10px 0" }}>Shopping Cart</p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "30px",
                    }}
                >
                    <WrapperLeft>
                        <WrapperStyleHeader>
                            <span
                                style={{
                                    display: "inline-block",
                                    width: "390px",
                                }}
                            >
                                <Checkbox
                                    onChange={handleOnChangeCheckAll}
                                    style={{ marginRight: "10px" }}
                                    checked={
                                        listChecked?.length > 0 &&
                                        listChecked?.length ===
                                            order?.orderItems?.length
                                    }
                                />
                                <span>
                                    All ({order?.orderItems?.length} products)
                                </span>
                            </span>
                            <div
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>Unit price</span>
                                <span>Quantity</span>
                                <span>Total amount</span>
                                <DeleteOutlined
                                    style={{ cursor: "pointer", color: "red" }}
                                    onClick={handleRemoveAllOrder}
                                />
                            </div>
                        </WrapperStyleHeader>
                        <WrapperListOrder>
                            {order?.orderItems?.map((order, index) => (
                                <WrapperItemOrder key={index}>
                                    <div
                                        style={{
                                            width: "390px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 4,
                                        }}
                                    >
                                        <Checkbox
                                            onChange={onChange}
                                            value={order?.product}
                                            checked={listChecked.includes(
                                                order?.product
                                            )}
                                        />
                                        <img
                                            src={order?.image}
                                            style={{
                                                width: "77px",
                                                height: "79px",
                                                objectFit: "cover",
                                                margin: "0 10px",
                                            }}
                                            alt="img_product"
                                        />
                                        <div
                                            style={{
                                                width: "260px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {order?.name}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span style={{ display: "flex" }}>
                                            <span
                                                style={{
                                                    color: "#242424",
                                                }}
                                            >
                                                {order?.price.toLocaleString()}
                                            </span>
                                            {/* <WrapperPriceDiscount>
                                                {order?.amount}
                                            </WrapperPriceDiscount> */}
                                        </span>
                                        <WrapperCountOrder>
                                            <button
                                                style={{
                                                    border: "none",
                                                    background: "transparent",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    handleChangeCount(
                                                        "decrease",
                                                        order?.product
                                                    )
                                                }
                                            >
                                                <MinusOutlined
                                                    style={{
                                                        color: "#000",
                                                        fontSize: "10px",
                                                    }}
                                                />
                                            </button>
                                            <WrapperInputNumber
                                                defaultValue={order?.amount}
                                                value={order?.amount}
                                                size="small"
                                            />
                                            <button
                                                style={{
                                                    border: "none",
                                                    background: "transparent",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    handleChangeCount(
                                                        "increase",
                                                        order?.product
                                                    )
                                                }
                                            >
                                                <PlusOutlined
                                                    style={{
                                                        color: "#000",
                                                        fontSize: "10px",
                                                    }}
                                                />
                                            </button>
                                        </WrapperCountOrder>
                                        <span
                                            style={{
                                                color: "#FF424E",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {(
                                                order?.price * order?.amount
                                            ).toLocaleString()}
                                        </span>
                                        <DeleteOutlined
                                            style={{
                                                cursor: "pointer",
                                                color: "red",
                                            }}
                                            onClick={() =>
                                                handleDeleteOrder(
                                                    order?.product
                                                )
                                            }
                                        />
                                    </div>
                                </WrapperItemOrder>
                            ))}
                        </WrapperListOrder>
                    </WrapperLeft>
                    <WrapperRight>
                        <div
                            style={{
                                padding: "10px",
                                background: "#fff",
                                borderRadius: "5px",
                            }}
                        >
                            {/* <WrapperInfo>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span>Địa chỉ giao hàng : </span>
                                        <span style={{ fontWeight: "bold" }}>
                                            HCM
                                        </span>
                                    </div>
                                    <div
                                        // onClick={handleChangeAddress}
                                        style={{
                                            color: "#9255FD",
                                            marginTop: "10px",
                                            fontSize: "15px",
                                            cursor: "pointer",
                                            marginLeft: "200px",
                                        }}
                                    >
                                        Thay đổi
                                    </div>
                                </div>
                            </WrapperInfo> */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                    justifyContent: "space-between",
                                    padding: "15px 0",
                                    // borderTop: "1px solid #f0f0f0",
                                    borderBottom: "1px solid #f0f0f0",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>Provisional</span>
                                    <span
                                        style={{
                                            color: "#000",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        price
                                        {/* {convertPrice(priceMemo)} */}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>Discount</span>
                                    <span
                                        style={{
                                            color: "#000",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        price
                                        {/* {convertPrice(priceDiscountMemo)} */}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>Shipping fee</span>
                                    <span
                                        style={{
                                            color: "#000",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        price
                                        {/* {convertPrice(diliveryPriceMemo)} */}
                                    </span>
                                </div>
                            </div>
                            <WrapperTotal>
                                <span>TOTAL</span>
                                <span
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "rgb(254, 56, 52)",
                                            fontSize: "24px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        price
                                        {/* {convertPrice(totalPriceMemo)} */}
                                    </span>
                                    <span
                                        style={{
                                            paddingTop: "5px",
                                            color: "#000",
                                            fontSize: "13px",
                                        }}
                                    >
                                        (Indclude VAT)
                                    </span>
                                </span>
                            </WrapperTotal>
                        </div>
                        <ButtonContainer>
                            <StyledButton>Buy product</StyledButton>
                        </ButtonContainer>
                    </WrapperRight>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
