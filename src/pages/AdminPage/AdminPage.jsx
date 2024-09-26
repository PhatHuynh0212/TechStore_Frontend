import { Menu } from "antd";
import React, { useState } from "react";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { getItem } from "../../utils";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";

const AdminPage = () => {
    const items = [
        getItem("User", "user", <UserOutlined />),
        getItem("Product", "product", <AppstoreOutlined />),
    ];

    const [keySelected, setKeySelected] = useState("");

    const renderPage = (key) => {
        switch (key) {
            case "user":
                return <AdminUser />;
            case "product":
                return <AdminProduct />;
            default:
                return <></>;
        }
    };

    const handleOnClick = ({ key }) => {
        setKeySelected(key);
    };

    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: "flex" }}>
                <Menu
                    mode="inline"
                    style={{
                        width: "15%",
                        height: "100vh",
                        boxShadow: "1px 1px 2px #ccc",
                    }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div style={{ padding: "15px", width: "85%" }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    );
};

export default AdminPage;
