import React, { useEffect, useMemo, useState } from "react";
import {
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
import { Checkbox, Form } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import { useDispatch, useSelector } from "react-redux";
import {
    decreaseAmount,
    increaseAmount,
    removeAllOrderProduct,
    removeOrderProduct,
    selectedOrder,
} from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import * as Message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router";

const OrderPage = () => {
    const navigate = useNavigate();
    const order = useSelector((state) => state?.order);
    const user = useSelector((state) => state?.user);
    const [listChecked, setListChecked] = useState([]);
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [stateUserDetails, setStateUserDetails] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
    });

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

    useEffect(() => {
        dispatch(selectedOrder({ listChecked }));
    }, [listChecked]);

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                name: user?.name,
                phone: user?.phone,
                address: user?.address,
                city: user?.city,
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
        if (priceMemo === 0) {
            return 0;
        } else if (priceMemo > 500000) {
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

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, { ...rests }, token);
        return res;
    });
    const { isPending, data } = mutationUpdate;

    const handleAddCard = () => {
        if (!order?.orderItemsSelected?.length) {
            Message.error("Please, choose product");
        } else if (
            !user?.name ||
            !user?.phone ||
            !user?.address ||
            !user?.city
        ) {
            setIsOpenModalUpdateInfo(true);
        } else {
            navigate("/payment");
        }
    };

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: "",
            phone: "",
            address: "",
            city: "",
        });
        setIsOpenModalUpdateInfo(false);
    };

    const handleUpdateInfoUser = () => {
        const { name, phone, address, city } = stateUserDetails;
        if (name && phone && address && city) {
            mutationUpdate.mutate(
                {
                    id: user?.id,
                    ...stateUserDetails,
                    token: user?.access_token,
                },
                {
                    onSuccess: () => {
                        dispatch(
                            updateUser({ ...user, name, phone, address, city })
                        );
                        setIsOpenModalUpdateInfo(false);
                        Message.success();
                    },
                    onError: () => {
                        Message.error("Failed to update user information.");
                    },
                }
            );
        }
    };

    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
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
                                <span>Total price</span>
                                <DeleteOutlined
                                    style={{ cursor: "pointer", color: "red" }}
                                    onClick={handleRemoveAllOrder}
                                />
                            </div>
                        </WrapperStyleHeader>
                        <WrapperListOrder>
                            {order?.orderItems?.map((order, index) => {
                                return (
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
                                            <span
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: "#242424",
                                                    }}
                                                >
                                                    {convertPrice(order?.price)}
                                                </span>
                                                <WrapperPriceDiscount>
                                                    -{order?.discount}%
                                                </WrapperPriceDiscount>
                                            </span>
                                            <WrapperCountOrder>
                                                <button
                                                    style={{
                                                        border: "none",
                                                        background:
                                                            "transparent",
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
                                                        background:
                                                            "transparent",
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
                                                {convertPrice(
                                                    order?.price * order?.amount
                                                )}
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
                                );
                            })}
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
                            <WrapperInfo>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "60%",
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
                            </WrapperInfo>
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
                                <span>TOTAL</span>
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
                            onClick={() => handleAddCard()}
                            size={40}
                            styleButton={{
                                marginTop: "15px",
                                background: "#FF3945",
                                height: "50px",
                                width: "100%",
                                border: "none",
                                borderRadius: "4px",
                                color: "#fff",
                                fontSize: "16px",
                                fontWeight: "700",
                            }}
                            textButton={"Buy product"}
                        />
                    </WrapperRight>
                </div>
            </div>
            <ModalComponent
                title="Update delivery information"
                open={isOpenModalUpdateInfo}
                onCancel={handleCancelUpdate}
                onOk={handleUpdateInfoUser}
                okButtonProps={{
                    style: {
                        backgroundColor: "blue",
                        borderColor: "blue",
                    },
                }}
                cancelButtonProps={{
                    style: {
                        backgroundColor: "gray",
                        borderColor: "gray",
                        color: "white",
                    },
                }}
            >
                <Loading isPending={isPending}>
                    <Form
                        name="user details"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 20 }}
                        style={{ maxWidth: 600 }}
                        // onFinish={onUpdateUser}
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
                                value={stateUserDetails.name || ""}
                                onChange={handleOnChangeDetails}
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
                                onChange={handleOnChangeDetails}
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
                                onChange={handleOnChangeDetails}
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
                                value={stateUserDetails.city}
                                onChange={handleOnChangeDetails}
                                name="city"
                            />
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>
        </div>
    );
};

export default OrderPage;
