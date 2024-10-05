import React from "react";
import {
    Label,
    WrapperInfo,
    WrapperContainer,
    WrapperValue,
    WrapperItemOrder,
    WrapperItemOrderInfo,
    WrapperRight,
} from "./style";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useLocation } from "react-router-dom";
import { convertPrice } from "../../utils";

const OrderSuccess = () => {
    const location = useLocation();
    const { state } = location;

    return (
        <div
            style={{
                background: "linear-gradient(90deg, #f5f5fa, #e0f7fa)",
                width: "100%",
                minHeight: "100vh",
                paddingTop: "20px",
            }}
        >
            <Loading isPending={false}>
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "20px",
                        background: "#ffffff",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <p
                        style={{
                            marginBottom: "15px",
                            fontSize: "24px",
                            color: "#4a4a4a",
                            fontWeight: "600",
                        }}
                    >
                        Order placed successfully
                    </p>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderRadius: "10px",
                            padding: "20px",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        <WrapperContainer>
                            <WrapperInfo>
                                <div>
                                    <Label
                                        style={{
                                            fontSize: "18px",
                                            color: "#1a73e8",
                                        }}
                                    >
                                        Delivery method
                                    </Label>
                                    <WrapperValue>
                                        <span
                                            style={{
                                                color: "#ea8500",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {state?.delivery.toUpperCase()}
                                        </span>{" "}
                                        Economy delivery
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>

                            <WrapperInfo>
                                <div>
                                    <Label
                                        style={{
                                            fontSize: "18px",
                                            color: "#1a73e8",
                                        }}
                                    >
                                        Payment method
                                    </Label>
                                    <WrapperValue>
                                        {state?.payment}
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "50px",
                                    background: "#fff",
                                    padding: "20px",
                                    borderRadius: "10px",
                                }}
                            >
                                <WrapperItemOrderInfo>
                                    {state.orders?.map((order, index) => (
                                        <WrapperItemOrder
                                            key={index}
                                            style={{
                                                padding: "20px",
                                                borderBottom: "1px solid #eee",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 16,
                                                }}
                                            >
                                                <img
                                                    src={order.image}
                                                    style={{
                                                        width: "80px",
                                                        height: "80px",
                                                        borderRadius: "8px",
                                                        objectFit: "cover",
                                                    }}
                                                    alt={order.name}
                                                />
                                                <div
                                                    style={{
                                                        flex: 1,
                                                        width: "250px",
                                                        fontWeight: "500",
                                                        color: "#333",
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        paddingLeft: "20px",
                                                    }}
                                                >
                                                    {order?.name}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "20px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: "#242424",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    Amount: {order?.amount}
                                                </span>
                                                <span
                                                    style={{
                                                        color: "#242424",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    Price:{" "}
                                                    {convertPrice(order?.price)}
                                                </span>
                                            </div>
                                        </WrapperItemOrder>
                                    ))}
                                </WrapperItemOrderInfo>

                                <span
                                    style={{
                                        paddingRight: "20px",
                                        textAlign: "center",
                                        fontSize: "22px",
                                        color: "red",
                                        fontWeight: "700",
                                    }}
                                >
                                    Total {convertPrice(state?.totalPriceMemo)}
                                </span>
                            </div>
                        </WrapperContainer>
                    </div>
                </div>
            </Loading>
        </div>
    );
};

export default OrderSuccess;
