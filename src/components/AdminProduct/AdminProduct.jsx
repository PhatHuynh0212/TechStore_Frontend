import React, { useEffect, useState } from "react";
import {
    WrapperButtonAdd,
    WrapperFormUpload,
    WrapperHeader,
    WrapperUploadFile,
} from "./style";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Modal } from "antd";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import * as Message from "../Message/Message";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/LoadingComponent";

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [stateProduct, setStateProduct] = useState({
        name: "",
        type: "",
        price: "",
        countInStock: "",
        rating: "",
        description: "",
        image: "",
    });

    // Call API
    const mutation = useMutationHooks((data) => {
        const { name, type, price, countInStock, rating, description, image } =
            data;
        const res = ProductService.createProduct({
            name,
            type,
            price,
            countInStock,
            rating,
            description,
            image,
        });
        return res;
    });
    const { data, isPending, isSuccess, isError } = mutation;

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
        });
        form.resetFields();
    };

    const onFinish = () => {
        mutation.mutate(stateProduct);
    };

    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
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

    return (
        <div>
            <WrapperHeader>Product management</WrapperHeader>
            <WrapperButtonAdd onClick={() => setIsModalOpen(true)}>
                <PlusOutlined style={{ fontSize: "60px" }} />
            </WrapperButtonAdd>
            <div>
                <TableComponent />
            </div>
            <Modal
                title="Create product"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Loading isPending={isPending}>
                    <Form
                        name="basic"
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
                            <InputComponent
                                value={stateProduct.type}
                                onChange={handleOnChange}
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
                                value={stateProduct.price}
                                onChange={handleOnChange}
                                name="price"
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
                            <div>
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
                            </div>
                        </WrapperFormUpload>

                        <Form.Item
                            wrapperCol={{
                                offset: 6,
                                span: 18,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>
        </div>
    );
};

export default AdminProduct;
