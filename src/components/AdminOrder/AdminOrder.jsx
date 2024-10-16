import React, { useEffect, useRef, useState } from "react";
import {
    WrapperAllPrice,
    WrapperContentInfo,
    WrapperHeader,
    WrapperHeaderUser,
    WrapperInfoUser,
    WrapperItem,
    WrapperItemLabel,
    WrapperLabel,
    WrapperNameProduct,
    WrapperProduct,
    WrapperStyleContent,
} from "./style";
import { FileSearchOutlined, SearchOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { Button, Form, Space } from "antd";
import Loading from "../LoadingComponent/LoadingComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useQuery } from "@tanstack/react-query";
import * as Message from "../Message/Message";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { orderContent } from "../../content";
import { convertPrice } from "../../utils";

const AdminOrder = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const user = useSelector((state) => state?.user);
    const [form] = Form.useForm();

    const [stateOrder, setStateOrder] = useState({
        orderItems: [],
        shippingAddress: {},
        paymentMethod: "",
        itemsPrice: 0,
        shippingPrice: 0,
        totalPrice: 0,
        isPaid: false,
        isDelivered: false,
        createdAt: "",
    });

    // Call API
    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = OrderService.updateOrder(id, { ...rests }, token);
        return res;
    });

    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token);
        return res;
    };

    useEffect(() => {
        form.setFieldsValue(stateOrder);
    }, [form, stateOrder]);

    const fetchGetOrder = async (rowSelected) => {
        const res = await OrderService.getDetailsOrder(
            rowSelected,
            user?.access_token
        );
        if (res?.data) {
            setStateOrder({
                orderItems: res?.data?.orderItems,
                shippingAddress: res?.data?.shippingAddress,
                paymentMethod: res?.data?.paymentMethod,
                itemsPrice: res?.data?.itemsPrice,
                shippingPrice: res?.data?.shippingPrice,
                totalPrice: res?.data?.totalPrice,
                isPaid: res?.data?.isPaid,
                isDelivered: res?.data?.isDelivered,
                createdAt: res?.data?.createdAt,
            });
        }
        setIsLoadingDetails(false);
        return res;
    };

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingDetails(true);
            fetchGetOrder(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    const renderAction = () => {
        return (
            <div style={{ display: "flex", gap: "15px" }}>
                <FileSearchOutlined
                    style={{
                        fontSize: "30px",
                        cursor: "pointer",
                        color: "#0396FF",
                    }}
                    onClick={handleDetailsOrder}
                />
            </div>
        );
    };

    const handleDetailsOrder = () => {
        if (rowSelected) {
            setIsLoadingDetails(true);
            fetchGetOrder(rowSelected);
        }
        setIsOpenDrawer(true);
    };

    const {
        data: dataUpdated,
        isPending: isPendingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;

    const queryOrder = useQuery({
        queryKey: ["order"],
        queryFn: getAllOrder,
    });

    const { isPending, data: orders } = queryOrder;

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateOrder({
            orderItems: [],
            shippingAddress: {},
            paymentMethod: "",
            itemsPrice: 0,
            shippingPrice: 0,
            totalPrice: 0,
            isPaid: false,
            isDelivered: false,
            createdAt: "",
        });
        form.resetFields();
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === "OK") {
            Message.success();
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            Message.error();
        }
    }, [isSuccessUpdated]);

    // Search
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        confirm();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters, confirm)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    // Data table
    const columns = [
        {
            title: "User name",
            dataIndex: "userName",
            sorter: (a, b) => a.userName.length - b.userName.length,
            ...getColumnSearchProps("userName"),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            ...getColumnSearchProps("phone"),
        },
        {
            title: "Address",
            dataIndex: "address",
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps("address"),
        },
        {
            title: "Price items",
            dataIndex: "itemsPrice",
            sorter: (a, b) => a.itemsPrice - b.itemsPrice,
        },
        {
            title: "Shipping fee",
            dataIndex: "shippingPrice",
            sorter: (a, b) => a.shippingPrice - b.shippingPrice,
        },
        {
            title: "Total price",
            dataIndex: "totalPrice",
            sorter: (a, b) => a.totalPrice - b.totalPrice,
        },
        {
            title: "Paid",
            dataIndex: "isPaid",
            sorter: (a, b) => a.isPaid.length - b.isPaid.length,
        },
        {
            title: "Shipped",
            dataIndex: "isDelivered",
            sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
        },
        {
            title: "Payment",
            dataIndex: "paymentMethod",
            sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
        },
        {
            title: "Action",
            dataIndex: "action",
            render: renderAction,
        },
    ];

    const dataTable =
        orders?.data?.length &&
        orders?.data.map((order) => {
            return {
                ...order,
                key: order?._id,
                userName: order?.shippingAddress?.fullName,
                phone: order?.shippingAddress?.phone,
                address: order?.shippingAddress?.address,
                isPaid: order?.isPaid ? "Paid" : "Unpaid",
                isDelivered: order?.isDelivered ? "Delivered" : "Not yet",
                paymentMethod: orderContent.payment[order?.paymentMethod],
            };
        });

    // Format thời gian đặt hàng
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div>
            <WrapperHeader>Order management</WrapperHeader>
            <div>
                <TableComponent
                    columns={columns}
                    data={dataTable}
                    isPending={isPending}
                    selectionType={null}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id);
                            },
                        };
                    }}
                />
            </div>

            {/* Drawer Order Details */}
            <DrawerComponent
                title="Order detail"
                isOpen={isOpenDrawer}
                onClose={handleCloseDrawer}
                width="85%"
            >
                <Loading isPending={isLoadingDetails || isPendingUpdated}>
                    <div
                        style={{
                            width: "97%",
                            background: "#f5f5f5",
                            padding: "20px",
                            borderRadius: "8px",
                        }}
                    >
                        <WrapperHeaderUser>
                            <WrapperInfoUser>
                                <WrapperLabel>ORDER CREATED AT</WrapperLabel>
                                <WrapperContentInfo>
                                    <div className="created-at">
                                        {formatDate(stateOrder.createdAt)}
                                    </div>
                                </WrapperContentInfo>
                            </WrapperInfoUser>

                            <WrapperInfoUser>
                                <WrapperLabel>PAYMENT METHOD</WrapperLabel>
                                <WrapperContentInfo>
                                    <div>Cash on Delivery</div>
                                    <div className="status-payment">
                                        {stateOrder.isPaid ? "Paid" : "Unpaid"}
                                    </div>
                                </WrapperContentInfo>
                            </WrapperInfoUser>

                            <WrapperInfoUser>
                                <WrapperLabel>RECIPIENT ADDRESS</WrapperLabel>
                                <WrapperContentInfo>
                                    <div className="name-info">
                                        {stateOrder.shippingAddress.fullName}
                                    </div>
                                    <div className="address-info">
                                        Address:{" "}
                                        {`${stateOrder.shippingAddress.address}, ${stateOrder.shippingAddress.city}`}
                                    </div>
                                    <div className="phone-info">
                                        Phone:{" "}
                                        {stateOrder.shippingAddress.phone}
                                    </div>
                                </WrapperContentInfo>
                            </WrapperInfoUser>

                            <WrapperInfoUser>
                                <WrapperLabel>DELIVERY METHOD</WrapperLabel>
                                <WrapperContentInfo>
                                    <div className="delivery-info">
                                        <span className="name-delivery">
                                            FAST
                                        </span>{" "}
                                        Economy delivery
                                    </div>
                                    <div className="delivery-fee">
                                        Delivery fee:{" "}
                                        {convertPrice(stateOrder.shippingPrice)}
                                    </div>
                                </WrapperContentInfo>
                            </WrapperInfoUser>
                        </WrapperHeaderUser>

                        {/* Order items */}
                        <WrapperStyleContent>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
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

                            {stateOrder.orderItems.map((item) => (
                                <WrapperProduct key={item._id}>
                                    <WrapperNameProduct>
                                        <img src={item.image} alt={item.name} />
                                        <div>{item.name}</div>
                                    </WrapperNameProduct>
                                    <WrapperItem>
                                        {convertPrice(item.price)}
                                    </WrapperItem>
                                    <WrapperItem>{item.amount}</WrapperItem>
                                    <WrapperItem>
                                        {item.discount
                                            ? convertPrice(
                                                  (item.price *
                                                      item.discount *
                                                      item.amount) /
                                                      100
                                              )
                                            : "0 ₫"}
                                        {<br />}({item.discount}%)
                                    </WrapperItem>
                                </WrapperProduct>
                            ))}

                            {/* Total Price Section */}
                            <WrapperAllPrice>
                                <WrapperItemLabel>Provisional</WrapperItemLabel>
                                <WrapperItem>
                                    {convertPrice(stateOrder.itemsPrice)}
                                </WrapperItem>
                            </WrapperAllPrice>

                            <WrapperAllPrice>
                                <WrapperItemLabel>
                                    Delivery fee
                                </WrapperItemLabel>
                                <WrapperItem>
                                    {convertPrice(stateOrder.shippingPrice)}
                                </WrapperItem>
                            </WrapperAllPrice>

                            <WrapperAllPrice>
                                <WrapperItemLabel style={{ fontSize: 20 }}>
                                    TOTAL
                                </WrapperItemLabel>
                                <WrapperItem style={{ fontSize: 20 }}>
                                    {convertPrice(stateOrder.totalPrice)}
                                </WrapperItem>
                            </WrapperAllPrice>
                        </WrapperStyleContent>
                    </div>
                </Loading>
            </DrawerComponent>
        </div>
    );
};

export default AdminOrder;
