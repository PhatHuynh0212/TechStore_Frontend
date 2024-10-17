import React, { useMemo } from "react";
import {
    WrapperAllPrice,
    WrapperContentInfo,
    WrapperHeaderUser,
    WrapperInfoUser,
    WrapperItem,
    WrapperItemLabel,
    WrapperLabel,
    WrapperNameProduct,
    WrapperProduct,
    WrapperStyleContent,
} from "./style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { convertPrice } from "../../utils";
import Loading from "../../components/LoadingComponent/LoadingComponent";

const DetailsOrderPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const params = useParams();
    const { id } = params;

    // Fetch order details
    const fetchDetailsOrder = async () => {
        const res = await OrderService.getDetailsOrder(id, state?.token);
        return res.data;
    };

    const queryOrder = useQuery({
        queryKey: ["orders-details", id],
        queryFn: fetchDetailsOrder,
        enabled: !!id,
    });

    const { isPending, data } = queryOrder;

    // Calculate total price
    const priceMemo = useMemo(() => {
        const result = data?.orderItems?.reduce((total, cur) => {
            return total + cur.price * cur.amount;
        }, 0);
        return result;
    }, [data]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <Loading isPending={isPending}>
            <div
                style={{
                    background: "#f5f5f5",
                    padding: "5px",
                }}
            >
                <p style={{ margin: "0 0 10px", padding: "0 103px" }}>
                    <span
                        style={{ cursor: "pointer", fontWeight: "bold" }}
                        onClick={() => navigate("/")}
                    >
                        Home
                    </span>{" "}
                    <span
                        style={{ cursor: "pointer", fontWeight: "bold" }}
                        onClick={() => navigate("/my-order")}
                    >
                        - My order
                    </span>{" "}
                    - Order details
                </p>
                <div
                    style={{
                        width: "90%",
                        maxWidth: "1270px",
                        margin: "0 auto",
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <div
                        style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            marginBottom: "30px",
                        }}
                    >
                        Order details
                    </div>
                    <WrapperHeaderUser>
                        {/* Thời gian đặt hàng */}
                        <WrapperInfoUser>
                            <WrapperLabel>Order create at</WrapperLabel>
                            <WrapperContentInfo>
                                <div className="created-at">
                                    {formatDate(data?.createdAt)}
                                </div>
                            </WrapperContentInfo>
                        </WrapperInfoUser>

                        {/* Địa chỉ người nhận */}
                        <WrapperInfoUser>
                            <WrapperLabel>Recipient address</WrapperLabel>
                            <WrapperContentInfo>
                                <div className="name-info">
                                    {data?.shippingAddress?.fullName}
                                </div>
                                <div className="address-info">
                                    <span>Address: </span>
                                    {`${data?.shippingAddress?.address}, ${data?.shippingAddress?.city}`}
                                </div>
                                <div className="phone-info">
                                    <span>Phone: </span>{" "}
                                    {data?.shippingAddress?.phone}
                                </div>
                            </WrapperContentInfo>
                        </WrapperInfoUser>

                        {/* Hình thức giao hàng */}
                        <WrapperInfoUser>
                            <WrapperLabel>Delivery method</WrapperLabel>
                            <WrapperContentInfo>
                                <div className="delivery-info">
                                    <span className="name-delivery">FAST </span>
                                    Economy delivery
                                </div>
                                <div className="delivery-fee">
                                    <span>Delivery fee: </span>{" "}
                                    {convertPrice(data?.shippingPrice)}
                                </div>
                            </WrapperContentInfo>
                        </WrapperInfoUser>

                        {/* Hình thức thanh toán */}
                        <WrapperInfoUser>
                            <WrapperLabel>Payment method</WrapperLabel>
                            {/* <WrapperContentInfo>
                                <div className="payment-info">
                                    {orderContant.payment[data?.paymentMethod]}
                                </div>
                            </WrapperContentInfo> */}
                            <WrapperContentInfo>
                                <div>Cash on Delivery</div>
                                <div className="status-payment">
                                    {data?.isPaid ? "Paid" : "Unpaid"}
                                </div>
                            </WrapperContentInfo>
                        </WrapperInfoUser>
                    </WrapperHeaderUser>

                    {/* Danh sách sản phẩm */}
                    <WrapperStyleContent>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                                paddingBottom: "10px",
                                borderBottom: "1px solid #ddd",
                            }}
                        >
                            <div
                                style={{
                                    width: "60%",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                Product
                            </div>
                            <WrapperItemLabel>Price</WrapperItemLabel>
                            <WrapperItemLabel>Amount</WrapperItemLabel>
                            <WrapperItemLabel>Discount</WrapperItemLabel>
                        </div>

                        {data?.orderItems?.map((order) => (
                            <WrapperProduct key={order._id}>
                                <WrapperNameProduct>
                                    <img src={order?.image} alt={order?.name} />
                                    <div>{order?.name}</div>
                                </WrapperNameProduct>
                                <WrapperItem>
                                    {convertPrice(order?.price)}
                                </WrapperItem>
                                <WrapperItem>{order?.amount}</WrapperItem>
                                <WrapperItem>
                                    {order?.discount
                                        ? convertPrice(
                                              (order?.price *
                                                  order?.discount *
                                                  order?.amount) /
                                                  100
                                          )
                                        : "0 ₫"}
                                    {<br />}({order?.discount}%)
                                </WrapperItem>
                            </WrapperProduct>
                        ))}

                        {/* Tổng kết giá */}
                        <WrapperAllPrice>
                            <WrapperItemLabel>Provisional</WrapperItemLabel>
                            <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
                        </WrapperAllPrice>

                        <WrapperAllPrice>
                            <WrapperItemLabel>Delivery fee</WrapperItemLabel>
                            <WrapperItem>
                                {convertPrice(data?.shippingPrice)}
                            </WrapperItem>
                        </WrapperAllPrice>

                        <WrapperAllPrice>
                            <WrapperItemLabel style={{ fontSize: 20 }}>
                                TOTAL
                            </WrapperItemLabel>
                            <WrapperItem style={{ fontSize: 20 }}>
                                {convertPrice(data?.totalPrice)}
                            </WrapperItem>
                        </WrapperAllPrice>
                    </WrapperStyleContent>
                </div>
            </div>
        </Loading>
    );
};

export default DetailsOrderPage;
