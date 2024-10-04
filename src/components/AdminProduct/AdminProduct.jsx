import React, { useEffect, useRef, useState } from "react";
import {
    WrapperButtonAdd,
    WrapperFormUpload,
    WrapperHeader,
    WrapperUploadFile,
    WrapperUploadInput,
} from "./style";
import {
    DeleteOutlined,
    EditTwoTone,
    PlusOutlined,
    SearchOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Select, Space } from "antd";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64, renderOptions } from "../../utils";
import * as ProductService from "../../services/ProductService";
import * as Message from "../Message/Message";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [typeSelect, setTypeSelect] = useState("");
    const user = useSelector((state) => state?.user);
    const [form] = Form.useForm();

    const [stateProduct, setStateProduct] = useState({
        name: "",
        type: "",
        price: "",
        countInStock: "",
        rating: "",
        description: "",
        image: "",
        newType: "",
        discount: "",
    });
    const [stateProductDetails, setStateProductDetails] = useState({
        name: "",
        type: "",
        price: "",
        countInStock: "",
        rating: "",
        description: "",
        image: "",
        discount: "",
    });

    // Call API
    const mutationCreate = useMutationHooks((data) => {
        const {
            name,
            type,
            price,
            countInStock,
            rating,
            description,
            image,
            discount,
        } = data;
        const res = ProductService.createProduct({
            name,
            type,
            price,
            countInStock,
            rating,
            description,
            image,
            discount,
        });
        return res;
    });

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = ProductService.updateProduct(id, token, { ...rests });
        return res;
    });

    const mutationDelete = useMutationHooks((data) => {
        const { id, token } = data;
        const res = ProductService.deleteProduct(id, token);
        return res;
    });

    const mutationDeleteMany = useMutationHooks((data) => {
        const { token, ...ids } = data;
        const res = ProductService.deleteManyProduct(ids, token);
        return res;
    });

    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected);
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                type: res?.data?.type,
                price: res?.data?.price,
                countInStock: res?.data?.countInStock,
                rating: res?.data?.rating,
                description: res?.data?.description,
                image: res?.data?.image,
                discount: res?.data?.discount,
            });
        }
        setIsLoadingUpdate(false);
        return res;
    };

    // Fetch all type product
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        return res;
    };

    useEffect(() => {
        form.setFieldsValue(stateProductDetails);
    }, [form, stateProductDetails]);

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected);
        }
    }, [rowSelected]);

    const renderAction = () => {
        return (
            <div style={{ display: "flex", gap: "15px" }}>
                <EditTwoTone
                    style={{ fontSize: "30px", cursor: "pointer" }}
                    onClick={handleDetailsProduct}
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

    const handleDetailsProduct = () => {
        if (rowSelected) {
            setIsLoadingUpdate(true);
            fetchGetDetailsProduct(rowSelected);
        }
        setIsOpenDrawer(true);
    };

    const { data, isPending, isSuccess, isError } = mutationCreate;
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

    const queryProduct = useQuery({
        queryKey: ["products"],
        queryFn: getAllProduct,
    });

    const typeProduct = useQuery({
        queryKey: ["type-product"],
        queryFn: fetchAllTypeProduct,
    });

    const { isLoading, data: products } = queryProduct;

    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            Message.success();
            handleCancel();
        } else if (isError === false && data?.status === "ERR") {
            Message.error();
        }
    }, [isSuccess, data?.status, isError]);

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: "",
            type: "",
            price: "",
            countInStock: "",
            rating: "",
            description: "",
            image: "",
            discount: "",
        });
        form.resetFields();
    };

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
            name: "",
            type: "",
            price: "",
            countInStock: "",
            rating: "",
            description: "",
            image: "",
            discount: "",
        });
        form.resetFields();
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handleDeleteProduct = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            }
        );
    };

    const handleDeleteManyProduct = (ids) => {
        mutationDeleteMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
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

    const onFinish = () => {
        const params = {
            name: stateProduct.name,
            type:
                stateProduct.type === "add_type"
                    ? stateProduct.newType
                    : stateProduct.type,
            price: stateProduct.price,
            countInStock: stateProduct.countInStock,
            rating: stateProduct.rating,
            description: stateProduct.description,
            image: stateProduct.image,
            discount: stateProduct.discount,
        };
        mutationCreate.mutate(params, {
            onSettled: () => {
                queryProduct.refetch();
            },
        });
    };

    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };

    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview,
        });
    };

    const onUpdateProduct = () => {
        mutationUpdate.mutate(
            {
                id: rowSelected,
                token: user?.access_token,
                ...stateProductDetails,
            },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            }
        );
    };

    const handleChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value,
        });
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
            title: "Price",
            dataIndex: "price",
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: "<= 1000",
                    value: "<=",
                },
                {
                    text: ">= 1tr",
                    value: ">=",
                },
            ],
            onFilter: (value, record) => {
                switch (value) {
                    case "<=":
                        return record.price <= 1000;
                    case ">=":
                        return record.price >= 1000000;
                    default:
                        return true;
                }
            },
        },
        {
            title: "Rating",
            dataIndex: "rating",
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: "<= 3",
                    value: "<=",
                },
                {
                    text: "> 3",
                    value: ">",
                },
            ],
            onFilter: (value, record) => {
                switch (value) {
                    case "<=":
                        return record.rating <= 3;
                    case ">":
                        return record.rating > 3;
                    default:
                        return true;
                }
            },
        },
        {
            title: "Type",
            dataIndex: "type",
            ...getColumnSearchProps("type"),
        },
        {
            title: "Action",
            dataIndex: "action",
            render: renderAction,
        },
    ];

    const dataTable =
        products?.data?.length &&
        products?.data.map((product) => {
            return {
                ...product,
                key: product._id,
            };
        });

    return (
        <div>
            <WrapperHeader>Product management</WrapperHeader>
            <WrapperButtonAdd onClick={() => setIsModalOpen(true)}>
                <PlusOutlined style={{ fontSize: "60px" }} />
            </WrapperButtonAdd>
            <div>
                <TableComponent
                    handleDeleteMany={handleDeleteManyProduct}
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

            {/* Modal Create Product */}
            <ModalComponent
                title="Create product"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Loading isPending={isPending}>
                    <Form
                        name="create product"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600 }}
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
                                value={stateProduct.name}
                                onChange={handleOnChange}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your type!",
                                },
                            ]}
                        >
                            <Select
                                name="type"
                                value={stateProduct.type}
                                onChange={handleChangeSelect}
                                style={{ width: 120 }}
                                options={renderOptions(typeProduct?.data?.data)}
                            />
                        </Form.Item>

                        {stateProduct.type === "add_type" && (
                            <Form.Item
                                label="New type"
                                name="newType"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your newType!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateProduct.newType}
                                    onChange={handleOnChange}
                                    name="newType"
                                />
                            </Form.Item>
                        )}

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your price!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.price}
                                onChange={handleOnChange}
                                name="price"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Discount"
                            name="discount"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input your discount of product!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.discount}
                                onChange={handleOnChange}
                                name="discount"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Count in stock"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your countInStock!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.countInStock}
                                onChange={handleOnChange}
                                name="countInStock"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your rating!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.rating}
                                onChange={handleOnChange}
                                name="rating"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your description!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.description}
                                onChange={handleOnChange}
                                name="description"
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
            </ModalComponent>

            {/* Drawer Update Product */}
            <DrawerComponent
                title="Product details"
                isOpen={isOpenDrawer}
                onClose={handleCloseDrawer}
                width="50%"
            >
                <Loading isPending={isLoadingUpdate || isPendingUpdated}>
                    <Form
                        name="product details"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 20 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onUpdateProduct}
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
                                value={stateProductDetails.name || ""}
                                onChange={handleOnChangeDetails}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your type!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProductDetails.type}
                                onChange={handleOnChangeDetails}
                                name="type"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your price!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProductDetails.price}
                                onChange={handleOnChangeDetails}
                                name="price"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Discount"
                            name="discount"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input your discount of product!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProductDetails.discount}
                                onChange={handleOnChangeDetails}
                                name="discount"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Count in stock"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your countInStock!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProductDetails.countInStock}
                                onChange={handleOnChangeDetails}
                                name="countInStock"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your rating!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProductDetails.rating}
                                onChange={handleOnChangeDetails}
                                name="rating"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your description!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProductDetails.description}
                                onChange={handleOnChangeDetails}
                                name="description"
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
                                    onChange={handleOnChangeAvatarDetails}
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Select File
                                    </Button>
                                </WrapperUploadFile>
                                {stateProductDetails?.image && (
                                    <img
                                        src={stateProductDetails?.image}
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

            {/* Modal Delete Product */}
            <ModalComponent
                title="Delete product"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteProduct}
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
                    <div>Are you sure delete this product?</div>
                </Loading>
            </ModalComponent>
        </div>
    );
};

export default AdminProduct;
