import React from "react";
import { WrapperButtonAdd, WrapperHeader } from "./style";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";

const AdminProduct = () => {
    return (
        <div>
            <WrapperHeader>Product management</WrapperHeader>
            <WrapperButtonAdd>
                <PlusOutlined style={{ fontSize: "60px" }} />
            </WrapperButtonAdd>
            <div>
                <TableComponent />
            </div>
        </div>
    );
};

export default AdminProduct;
