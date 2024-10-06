import React, { useEffect } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import {
    WrapperItemOrder,
    WrapperListOrder,
    WrapperHeaderItem,
    WrapperFooterItem,
    WrapperContainer,
    WrapperStatus,
    WrapperOrderImage,
    WrapperOrderName,
    WrapperOrderPrice,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";

const MyOrder = () => {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(
            state?.id,
            state?.token
        );
        return res.data;
    };

    const queryOrder = useQuery({
        queryKey: ["orders"],
        queryFn: fetchMyOrder,
        enabled: !!state?.id && !!state?.token,
    });

    const { isPending, data } = queryOrder;

    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`, {
            state: {
                token: state?.token,
            },
        });
    };

    const mutation = useMutationHooks((data) => {
        const { id, token, orderItems } = data;
        const res = OrderService.cancelOrder(id, token, orderItems);
        return res;
    });

    const handleCancelOrder = (order) => {
        mutation.mutate(
            {
                id: order?._id,
                token: state?.token,
                orderItems: order?.orderItems,
            },
            {
                onSuccess: () => {
                    queryOrder.refetch();
                },
            }
        );
    };

    const {
        isPending: isPendingCancel,
        isSuccess: isSuccessCancel,
        isError: isErrorCancel,
        data: dataCancel,
    } = mutation;

    useEffect(() => {
        if (isSuccessCancel && dataCancel?.status === "OK") {
            message.success();
        } else if (isSuccessCancel && dataCancel?.status === "ERR") {
            message.error(dataCancel?.message);
        } else if (isErrorCancel) {
            message.error();
        }
    }, [isSuccessCancel, isErrorCancel]);

    const renderProduct = (data) => {
        return data?.map((order) => (
            <WrapperHeaderItem key={order?._id}>
                <WrapperOrderImage src={order?.image} alt={order?.name} />
                <WrapperOrderName>{order?.name}</WrapperOrderName>
                <WrapperOrderPrice>
                    {convertPrice(order?.price)}
                </WrapperOrderPrice>
            </WrapperHeaderItem>
        ));
    };

    return (
        <Loading isPending={isPending || isPendingCancel}>
            <WrapperContainer>
                <div
                    style={{
                        height: "100%",
                        width: "1270px",
                        margin: "0 auto",
                    }}
                >
                    <h4>Đơn hàng của tôi</h4>
                    <WrapperListOrder>
                        {data?.map((order) => (
                            <WrapperItemOrder key={order?._id}>
                                <WrapperStatus>
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Trạng thái
                                    </span>
                                    <div>
                                        <span
                                            style={{
                                                color: "rgb(255, 66, 78)",
                                            }}
                                        >
                                            Giao hàng:{" "}
                                        </span>
                                        <span
                                            style={{
                                                color: "rgb(90, 32, 193)",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {`${
                                                order.isDelivered
                                                    ? "Đã giao hàng"
                                                    : "Chưa giao hàng"
                                            }`}
                                        </span>
                                    </div>
                                    <div>
                                        <span
                                            style={{
                                                color: "rgb(255, 66, 78)",
                                            }}
                                        >
                                            Thanh toán:{" "}
                                        </span>
                                        <span
                                            style={{
                                                color: "rgb(90, 32, 193)",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {`${
                                                order.isPaid
                                                    ? "Đã thanh toán"
                                                    : "Chưa thanh toán"
                                            }`}
                                        </span>
                                    </div>
                                </WrapperStatus>

                                {renderProduct(order?.orderItems)}

                                <WrapperFooterItem>
                                    <div>
                                        <span
                                            style={{
                                                color: "rgb(255, 66, 78)",
                                            }}
                                        >
                                            Tổng tiền:{" "}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "13px",
                                                color: "rgb(56, 56, 61)",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {convertPrice(order?.totalPrice)}
                                        </span>
                                    </div>
                                    <div
                                        style={{ display: "flex", gap: "10px" }}
                                    >
                                        <ButtonComponent
                                            onClick={() =>
                                                handleCancelOrder(order)
                                            }
                                            size={40}
                                            styleButton={{
                                                height: "36px",
                                                border: "1px solid #9255FD",
                                                borderRadius: "4px",
                                                color: "#9255FD",
                                                fontSize: "14px",
                                            }}
                                            textButton={"Hủy Đơn Hàng"}
                                        />

                                        <ButtonComponent
                                            onClick={() =>
                                                handleDetailsOrder(order?._id)
                                            }
                                            size={40}
                                            styleButton={{
                                                height: "36px",
                                                border: "1px solid #9255FD",
                                                borderRadius: "4px",
                                                color: "#9255FD",
                                                fontSize: "14px",
                                            }}
                                            textButton={"Xem chi tiết"}
                                        />
                                    </div>
                                </WrapperFooterItem>
                            </WrapperItemOrder>
                        ))}
                    </WrapperListOrder>
                </div>
            </WrapperContainer>
        </Loading>
    );
};

export default MyOrder;
