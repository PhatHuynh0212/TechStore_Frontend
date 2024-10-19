import React, { useEffect, useRef, useState } from "react";
import {
    WrapperFormUpload,
    WrapperHeader,
    WrapperUploadFile,
    WrapperUploadInput,
} from "./style";
import {
    DeleteOutlined,
    EditTwoTone,
    SearchOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { Button, Form, Space, Switch } from "antd";
import Loading from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { getBase64 } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import * as Message from "../Message/Message";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { useSelector } from "react-redux";

const AdminUser = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const user = useSelector((state) => state?.user);
    const [form] = Form.useForm();

    // const [stateUser, setStateUser] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //     isAdmin: false,
    // });
    const [stateUserDetails, setStateUserDetails] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        phone: "",
        isAdmin: false,
        avatar: "",
    });

    // Call API
    // const mutationCreate = useMutationHooks((data) => {
    //     const { name, email, password, confirmPassword, isAdmin } = data;
    //     const res = UserService.signupUser({
    //         name,
    //         email,
    //         password,
    //         confirmPassword,
    //         isAdmin,
    //     });
    //     return res;
    // });

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, { ...rests }, token);
        return res;
    });

    const mutationDelete = useMutationHooks((data) => {
        const { id, token } = data;
        const res = UserService.deleteUser(id, token);
        return res;
    });

    const getAllUser = async () => {
        const res = await UserService.getAllUser(user?.access_token);
        return res;
    };

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected);
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                address: res?.data?.address,
                city: res?.data?.city,
                isAdmin: res?.data?.isAdmin,
                avatar: res?.data?.avatar,
            });
        }
        setIsLoadingUpdate(false);
        return res;
    };

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            fetchGetDetailsUser(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    const renderAction = () => {
        return (
            <div style={{ display: "flex", gap: "15px" }}>
                <EditTwoTone
                    style={{ fontSize: "30px", cursor: "pointer" }}
                    onClick={handleDetailsUser}
                />
                <DeleteOutlined
                    style={{
                        fontSize: "30px",
                        color: "red",
                        cursor: "pointer",
                    }}
                    onClick={() => setIsModalOpenDelete(true)}
                />
            </div>
        );
    };

    const handleDetailsUser = () => {
        if (rowSelected) {
            setIsLoadingUpdate(true);
            fetchGetDetailsUser(rowSelected);
        }
        setIsOpenDrawer(true);
    };

    const mutationDeleteMany = useMutationHooks((data) => {
        const { token, ...ids } = data;
        const res = UserService.deleteManyUser(ids, token);
        return res;
    });

    // const { data, isPending, isSuccess, isError } = mutationCreate;
    const {
        data: dataUpdated,
        isPending: isPendingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;
    const {
        data: dataDeleted,
        isPending: isPendingDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = mutationDelete;
    const {
        data: dataDeletedMany,
        isPending: isPendingDeletedMany,
        isSuccess: isSuccessDeletedMany,
        isError: isErrorDeletedMany,
    } = mutationDeleteMany;

    const queryUser = useQuery({
        queryKey: ["user"],
        queryFn: getAllUser,
    });

    const { isLoading, data: users } = queryUser;

    // useEffect(() => {
    //     if (isSuccess && data?.status === "OK") {
    //         Message.success();
    //         handleCancel();
    //     } else if (isError === false && data?.status === "ERR") {
    //         Message.error();
    //     }
    // }, [isSuccess, data?.status, isError]);

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    //     setStateUser({
    //         name: "",
    //         email: "",
    //         password: "",
    //         confirmPassword: "",
    //         isAdmin: false,
    //     });
    //     form.resetFields();
    // };

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails({
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            isAdmin: false,
        });
        form.resetFields();
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handleDeleteUser = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            }
        );
    };

    const handleDeleteManyUser = (ids) => {
        mutationDeleteMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            }
        );
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === "OK") {
            Message.success();
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            Message.error();
        }
    }, [isSuccessUpdated]);

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === "OK") {
            Message.success();
            handleCancelDelete();
        } else if (isErrorDeleted) {
            Message.error();
        }
    }, [isSuccessDeleted]);

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
            Message.success();
        } else if (isErrorDeletedMany) {
            Message.error();
        }
    }, [isSuccessDeletedMany]);

    // const onFinish = () => {
    //     mutationCreate.mutate(stateUser, {
    //         onSettled: () => {
    //             queryUser.refetch();
    //         },
    //     });
    // };

    // const handleOnChange = (e) => {
    //     setStateUser({
    //         ...stateUser,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };

    // const handleOnChangeAvatar = async ({ fileList }) => {
    //     const file = fileList[0];
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //     setStateUser({
    //         ...stateUser,
    //         image: file.preview,
    //     });
    // };

    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
            ...stateUserDetails,
            avatar: file.preview,
        });
    };

    const onUpdateUser = () => {
        mutationUpdate.mutate(
            {
                id: rowSelected,
                ...stateUserDetails,
                token: user?.access_token,
            },
            {
                onSettled: () => {
                    queryUser.refetch();
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
            title: "Name",
            dataIndex: "name",
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps("name"),
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps("email"),
        },
        {
            title: "Address",
            dataIndex: "address",
            ...getColumnSearchProps("address"),
        },
        {
            title: "City",
            dataIndex: "city",
            ...getColumnSearchProps("city"),
        },
        {
            title: "Admin",
            dataIndex: "isAdmin",
            filters: [
                {
                    text: "True",
                    value: true,
                },
                {
                    text: "False",
                    value: false,
                },
            ],
            onFilter: (value, record) => {
                switch (value) {
                    case true:
                        return record.isAdmin === "TRUE";
                    case false:
                        return record.isAdmin === "FALSE";
                    default:
                        return true;
                }
            },
        },
        {
            title: "Phone",
            dataIndex: "phone",
            sorter: (a, b) => a.phone - b.phone,
            ...getColumnSearchProps("phone"),
        },
        {
            title: "Action",
            dataIndex: "action",
            render: renderAction,
        },
    ];

    const dataTable =
        users?.data?.length &&
        users?.data.map((user) => {
            return {
                ...user,
                key: user._id,
                isAdmin: user.isAdmin ? "TRUE" : "FALSE",
            };
        });

    return (
        <div>
            <WrapperHeader>User management</WrapperHeader>
            {/* <WrapperButtonAdd onClick={() => setIsModalOpen(true)}>
                <PlusOutlined style={{ fontSize: "60px" }} />
            </WrapperButtonAdd> */}
            <div>
                <TableComponent
                    handleDeleteMany={handleDeleteManyUser}
                    columns={columns}
                    data={dataTable}
                    isPending={isLoading}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id);
                            },
                        };
                    }}
                />
            </div>

            {/* Modal Create User */}

            {/* <ModalComponent
                title="Create User"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={610}
            >
                <Loading isPending={isPending}>
                    <Form
                        name="User details"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="off"
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
                                value={stateUser.name}
                                onChange={handleOnChange}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateUser.email}
                                onChange={handleOnChange}
                                name="email"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateUser.password}
                                onChange={handleOnChange}
                                name="password"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateUser.confirmPassword}
                                onChange={handleOnChange}
                                name="confirmPassword"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Admin"
                            name="isAdmin"
                            valuePropName="checked" // Gán checked cho switch
                        >
                            <Switch
                                checked={stateUser.isAdmin}
                                onChange={(checked) =>
                                    handleOnChange({
                                        target: {
                                            name: "isAdmin",
                                            value: checked,
                                        },
                                    })
                                }
                            />
                        </Form.Item>

                        <WrapperFormUpload
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your image!",
                                },
                            ]}
                        >
                            <WrapperUploadInput>
                                <WrapperUploadFile
                                    onChange={handleOnChangeAvatar}
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Select File
                                    </Button>
                                </WrapperUploadFile>
                                {stateProduct?.image && (
                                    <img
                                        src={stateProduct?.image}
                                        style={{
                                            height: "60px",
                                            width: "60px",
                                            border: "1px solid #ccc",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                        alt="avatar"
                                    />
                                )}
                            </WrapperUploadInput>
                        </WrapperFormUpload>

                        <Form.Item
                            wrapperCol={{
                                offset: 20,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent> */}

            {/* Drawer Update User */}
            <DrawerComponent
                title="Update user"
                isOpen={isOpenDrawer}
                onClose={handleCloseDrawer}
                width="50%"
            >
                <Loading isPending={isLoadingUpdate || isPendingUpdated}>
                    <Form
                        name="user details"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 20 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onUpdateUser}
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
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateUserDetails.email}
                                onChange={handleOnChangeDetails}
                                name="email"
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

                        <Form.Item
                            label="Admin"
                            name="isAdmin"
                            valuePropName="checked" // Gán checked cho switch
                        >
                            <Switch
                                checked={stateUserDetails.isAdmin}
                                onChange={(checked) =>
                                    handleOnChangeDetails({
                                        target: {
                                            name: "isAdmin",
                                            value: checked,
                                        },
                                    })
                                }
                            />
                        </Form.Item>

                        <WrapperFormUpload
                            label="Avatar"
                            name="avatar"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your avatar!",
                                },
                            ]}
                        >
                            <WrapperUploadInput>
                                <WrapperUploadFile
                                    onChange={handleOnChangeAvatarDetails}
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Select File
                                    </Button>
                                </WrapperUploadFile>
                                {stateUserDetails?.avatar && (
                                    <img
                                        src={stateUserDetails?.avatar}
                                        style={{
                                            height: "60px",
                                            width: "60px",
                                            border: "1px solid #ccc",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                        alt="avatar"
                                    />
                                )}
                            </WrapperUploadInput>
                        </WrapperFormUpload>

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

            {/* Modal Delete User */}
            <ModalComponent
                title="Delete user"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteUser}
                okButtonProps={{
                    style: {
                        backgroundColor: "red",
                        borderColor: "red",
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
                <Loading isPending={isPendingDeleted}>
                    <div>Are you sure delete this account?</div>
                </Loading>
            </ModalComponent>
        </div>
    );
};

export default AdminUser;
