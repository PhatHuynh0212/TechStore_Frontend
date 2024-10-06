import { Form, Radio } from "antd";
import React, { useEffect, useState } from "react";
import {
    Label,
    WrapperInfo,
    WrapperLeft,
    WrapperRadio,
    WrapperRight,
    WrapperTotal,
    WrapperContainer,
    WrapperAddress,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/slides/orderSlide";

const PaymentPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);

    const [delivery, setDelivery] = useState("fast");
    const [payment, setPayment] = useState("Cash on Delivery (COD)");
    const navigate = useNavigate();
    const [sdkReady, setSdkReady] = useState(false);

    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
    });
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone,
            });
        }
    }, [isOpenModalUpdateInfo]);

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true);
    };

    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + cur.price * cur.amount;
        }, 0);
        return result;
    }, [order]);

    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + cur.discount;
        }, 0);
        if (Number(result)) {
            return result;
        }
        return 0;
    }, [order]);

    const deliveryFeeMemo = useMemo(() => {
        if (priceMemo >= 1000000) {
            return 0;
        } else if (priceMemo >= 500000) {
            return 10000;
        } else {
            return 20000;
        }
    }, [priceMemo]);

    const totalPriceMemo = useMemo(() => {
        const result =
            Number(priceMemo) -
            (Number(priceDiscountMemo) * Number(priceMemo)) / 100 +
            Number(deliveryFeeMemo);
        return result;
    }, [priceMemo, priceDiscountMemo, deliveryFeeMemo]);

    const handleAddOrder = () => {
        if (
            user?.access_token &&
            order?.orderItemsSelected &&
            user?.name &&
            user?.phone &&
            user?.address &&
            user?.city &&
            priceMemo &&
            user?.id
        ) {
            mutationAddOrder.mutate({
                token: user?.access_token,
                orderItems: order?.orderItemsSelected,
                fullName: user?.name,
                phone: user?.phone,
                address: user?.address,
                city: user?.city,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: deliveryFeeMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
                email: user?.email,
            });
        }
    };

    console.log({ user, order });

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, { ...rests }, token);
        return res;
    });

    const mutationAddOrder = useMutationHooks((data) => {
        const { token, ...rests } = data;
        const res = OrderService.createOrder({ ...rests }, token);
        return res;
    });

    const { isPending, data } = mutationUpdate;

    const {
        data: dataAdd,
        isPending: isLoadingAddOrder,
        isSuccess,
        isError,
    } = mutationAddOrder;

    useEffect(() => {
        if (isSuccess && dataAdd?.status === "OK") {
            const arrayOrdered = [];
            order?.orderItemsSelected?.forEach((element) => {
                arrayOrdered.push(element.product);
            });
            // Xóa giỏ hàng trên redux store
            dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
            message.success("Success order");
            navigate("/orderSuccess", {
                state: {
                    delivery,
                    payment,
                    orders: order?.orderItemsSelected,
                    totalPriceMemo: totalPriceMemo,
                },
            });
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    const handleCancleUpdate = () => {
        setStateUserDetails({
            name: "",
            email: "",
            phone: "",
            isAdmin: false,
        });
        form.resetFields();
        setIsOpenModalUpdateInfo(false);
    };

    const onSuccessPaypal = (details, data) => {
        mutationAddOrder.mutate({
            token: user?.access_token,
            orderItems: order?.orderItemsSelected,
            fullName: user?.name,
            address: user?.address,
            phone: user?.phone,
            city: user?.city,
            paymentMethod: payment,
            itemsPrice: priceMemo,
            shippingPrice: deliveryFeeMemo,
            totalPrice: totalPriceMemo,
            user: user?.id,
            isPaid: true,
            paidAt: details.update_time,
            email: user?.email,
        });
    };

    const handleUpdateInforUser = () => {
        const { name, address, city, phone } = stateUserDetails;
        if (name && address && city && phone) {
            mutationUpdate.mutate(
                {
                    id: user?.id,
                    token: user?.access_token,
                    ...stateUserDetails,
                },
                {
                    onSuccess: () => {
                        dispatch(updateUser({ name, address, city, phone }));
                        setIsOpenModalUpdateInfo(false);
                    },
                }
            );
        }
    };

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };
    const handleDelivery = (e) => {
        setDelivery(e.target.value);
    };

    const handlePayment = (e) => {
        setPayment(e.target.value);
    };

    return (
        <div
            style={{
                background: "#f5f5fa",
                width: "100%",
                minHeight: "100vh",
                paddingTop: "10px",
            }}
        >
            <Loading isPending={isLoadingAddOrder}>
                <div style={{ maxWidth: "1270px", margin: "0 auto" }}>
                    <p style={{ margin: "0 0 10px 0" }}>Payment</p>
                    <WrapperContainer>
                        <WrapperLeft>
                            <WrapperInfo>
                                <Label>Select delivery method</Label>
                                <WrapperRadio
                                    onChange={handleDelivery}
                                    value={delivery}
                                >
                                    <Radio value="fast">
                                        <span
                                            style={{
                                                color: "#ea8500",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            FAST
                                        </span>
                                        {"  "}
                                        Economy delivery
                                    </Radio>
                                    <Radio value="gojek">
                                        <span
                                            style={{
                                                color: "#ea8500",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            GO_JEK
                                        </span>
                                        {"  "}
                                        Economy delivery
                                    </Radio>
                                </WrapperRadio>
                            </WrapperInfo>
                            <WrapperInfo>
                                <Label>Select payment method</Label>
                                <WrapperRadio
                                    onChange={handlePayment}
                                    value={payment}
                                >
                                    <Radio value="later_money(COD)">
                                        Cash on Delivery (COD)
                                    </Radio>
                                </WrapperRadio>
                            </WrapperInfo>
                        </WrapperLeft>

                        <WrapperRight>
                            <div
                                style={{
                                    padding: "12px",
                                    background: "#fff",
                                    borderRadius: "5px",
                                }}
                            >
                                <WrapperAddress>
                                    <div
                                        style={{
                                            width: "60%",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span>Address:</span>
                                        <span style={{ fontWeight: "bold" }}>
                                            {user?.address} - {user?.city}
                                        </span>
                                    </div>
                                    <div
                                        onClick={handleChangeAddress}
                                        style={{
                                            color: "#9255FD",
                                            padding: "5px 0",
                                            cursor: "pointer",
                                            width: "20%",
                                            textAlign: "right",
                                        }}
                                    >
                                        Change
                                    </div>
                                </WrapperAddress>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "5px",
                                        justifyContent: "space-between",
                                        padding: "15px 0",
                                        borderTop: "1px solid #f0f0f0",
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
                                            {convertPrice(priceMemo)}
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
                                            {priceDiscountMemo}%
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
                                            {convertPrice(deliveryFeeMemo)}
                                        </span>
                                    </div>
                                </div>
                                <WrapperTotal>
                                    <span style={{ fontWeight: "bold" }}>
                                        TOTAL
                                    </span>
                                    <span
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "rgb(254, 56, 52)",
                                                fontSize: "26px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {convertPrice(totalPriceMemo)}
                                        </span>
                                        <span
                                            style={{
                                                paddingTop: "5px",
                                                color: "#000",
                                                fontSize: "13px",
                                                fontWeight: "normal",
                                            }}
                                        >
                                            (Indclude VAT)
                                        </span>
                                    </span>
                                </WrapperTotal>
                            </div>
                            <ButtonComponent
                                onClick={() => handleAddOrder()}
                                size={20}
                                styleButton={{
                                    background: "rgb(255,57,69)",
                                    height: "48px",
                                    width: "100%",
                                    border: "none",
                                    borderRadius: "4px",
                                    marginTop: "20px",
                                    color: "#fff",
                                    fontSize: "15px",
                                    fontWeight: 700,
                                }}
                                textButton={"Đặt hàng"}
                            ></ButtonComponent>
                        </WrapperRight>
                    </WrapperContainer>
                </div>

                <ModalComponent
                    title="Cập nhật thông tin giao hàng"
                    open={isOpenModalUpdateInfo}
                    onCancel={handleCancleUpdate}
                    onOk={handleUpdateInforUser}
                >
                    <Loading isPending={isPending}>
                        <Form
                            name="basic"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            autoComplete="on"
                            form={form}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your name!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateUserDetails["name"]}
                                    onChange={handleOnchangeDetails}
                                    name="name"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your phone!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateUserDetails.phone}
                                    onChange={handleOnchangeDetails}
                                    name="phone"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your address!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateUserDetails.address}
                                    onChange={handleOnchangeDetails}
                                    name="address"
                                />
                            </Form.Item>

                            <Form.Item
                                label="City"
                                name="city"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your city!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateUserDetails["city"]}
                                    onChange={handleOnchangeDetails}
                                    name="city"
                                />
                            </Form.Item>
                        </Form>
                    </Loading>
                </ModalComponent>
            </Loading>
        </div>
    );
};

export default PaymentPage;
