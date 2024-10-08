import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader } from "./style";
import { EditTwoTone, SearchOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { Button, Form, Space, Switch } from "antd";
import Loading from "../LoadingComponent/LoadingComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useQuery } from "@tanstack/react-query";
import * as Message from "../Message/Message";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { orderContent } from "../../content";

const AdminOrder = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const user = useSelector((state) => state?.user);
    const [form] = Form.useForm();

    const [stateOrder, setStateOrder] = useState({
        isPaid: false,
        isDelivered: false,
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
                isPaid: res?.data?.isPaid,
                isDelivered: res?.data?.isDelivered,
            });
        }
        setIsLoadingUpdate(false);
        return res;
    };

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            fetchGetOrder(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    // const renderAction = () => {
    //     return (
    //         <div style={{ display: "flex", gap: "15px" }}>
    //             <EditTwoTone
    //                 style={{ fontSize: "30px", cursor: "pointer" }}
    //                 onClick={handleDetailsOrder}
    //             />
    //         </div>
    //     );
    // };

    const handleDetailsOrder = () => {
        if (rowSelected) {
            setIsLoadingUpdate(true);
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
            isPaid: false,
            isDelivered: false,
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

    const handleOnChangeDetails = (e) => {
        setStateOrder({
            ...stateOrder,
            [e.target.name]: e.target.value,
        });
    };

    const onUpdateOrder = () => {
        mutationUpdate.mutate(
            {
                id: rowSelected,
                ...stateOrder,
                token: user?.access_token,
            },
            {
                onSettled: () => {
                    queryOrder.refetch();
                },
            }
        );
    };

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
        // {
        //     title: "Action",
        //     dataIndex: "action",
        //     render: renderAction,
        // },
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

            {/* Drawer Update User */}
            <DrawerComponent
                title="Update user"
                isOpen={isOpenDrawer}
                onClose={handleCloseDrawer}
                width="50%"
            >
                <Loading isPending={isLoadingUpdate || isPendingUpdated}>
                    <Form
                        name="order details"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 20 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onUpdateOrder}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Paid"
                            name="isPaid"
                            valuePropName="checked" // Gán checked cho switch
                        >
                            <Switch
                                checked={stateOrder.isPaid}
                                onChange={(checked) =>
                                    handleOnChangeDetails({
                                        target: {
                                            name: "isPaid",
                                            value: checked,
                                        },
                                    })
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            label="Shipped"
                            name="isDelivered"
                            valuePropName="checked" // Gán checked cho switch
                        >
                            <Switch
                                checked={stateOrder.isDelivered}
                                onChange={(checked) =>
                                    handleOnChangeDetails({
                                        target: {
                                            name: "isDelivered",
                                            value: checked,
                                        },
                                    })
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 21,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
        </div>
    );
};

export default AdminOrder;
