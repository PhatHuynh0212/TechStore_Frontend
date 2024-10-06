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
import { useLocation, useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { convertPrice } from "../../utils";
import Loading from "../../components/LoadingComponent/LoadingComponent";
// // import { orderContant } from "../../contant";

const DetailsOrderPage = () => {
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

    return (
        <Loading isPending={isPending}>
            <div
                style={{
                    width: "100%",
                    background: "#f5f5f5",
                    padding: "30px 0",
                }}
            >
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
                        Chi tiết đơn hàng
                    </div>
                    <WrapperHeaderUser>
                        {/* Địa chỉ người nhận */}
                        <WrapperInfoUser>
                            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
                            <WrapperContentInfo>
                                <div className="name-info">
                                    {data?.shippingAddress?.fullName}
                                </div>
                                <div className="address-info">
                                    <span>Địa chỉ: </span>
                                    {`${data?.shippingAddress?.address}, ${data?.shippingAddress?.city}`}
                                </div>
                                <div className="phone-info">
                                    <span>Điện thoại: </span>{" "}
                                    {data?.shippingAddress?.phone}
                                </div>
                            </WrapperContentInfo>
                        </WrapperInfoUser>

                        {/* Hình thức giao hàng */}
                        <WrapperInfoUser>
                            <WrapperLabel>Hình thức giao hàng</WrapperLabel>
                            <WrapperContentInfo>
                                <div className="delivery-info">
                                    <span className="name-delivery">FAST </span>
                                    Giao hàng tiết kiệm
                                </div>
                                <div className="delivery-fee">
                                    <span>Phí giao hàng: </span>{" "}
                                    {convertPrice(data?.shippingPrice)}
                                </div>
                            </WrapperContentInfo>
                        </WrapperInfoUser>

                        {/* Hình thức thanh toán */}
                        <WrapperInfoUser>
                            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
                            {/* <WrapperContentInfo>
                                <div className="payment-info">
                                    {orderContant.payment[data?.paymentMethod]}
                                </div>
                            </WrapperContentInfo> */}
                            <WrapperContentInfo>
                                <div className="status-payment">
                                    {data?.isPaid
                                        ? "Đã thanh toán"
                                        : "Chưa thanh toán"}
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
                                Sản phẩm
                            </div>
                            <WrapperItemLabel>Giá</WrapperItemLabel>
                            <WrapperItemLabel>Số lượng</WrapperItemLabel>
                            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
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
                                    {/* {order?.discount
                                        ? convertPrice(
                                              (priceMemo * order?.discount) /
                                                100
                                        )
                                        : "0 ₫"} */}
                                    Đã giảm giá
                                </WrapperItem>
                            </WrapperProduct>
                        ))}

                        {/* Tổng kết giá */}
                        <WrapperAllPrice>
                            <WrapperItemLabel>Tạm tính</WrapperItemLabel>
                            <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
                        </WrapperAllPrice>

                        <WrapperAllPrice>
                            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
                            <WrapperItem>
                                {convertPrice(data?.shippingPrice)}
                            </WrapperItem>
                        </WrapperAllPrice>

                        <WrapperAllPrice>
                            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
                            <WrapperItem>
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
