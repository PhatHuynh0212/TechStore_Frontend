import { Menu } from "antd";
import React, { useState } from "react";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { getItem } from "../../utils";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

const AdminPage = () => {
    const items = [
        getItem("User management", "user", <UserOutlined />, [
            getItem("Option 1", "1"),
            getItem("Option 2", "2"),
        ]),
        getItem("Product management", "product", <AppstoreOutlined />, [
            getItem("Option 3", "3"),
            getItem("Option 4", "4"),
        ]),
    ];

    const rootSubmenuKeys = ["user", "product"];
    const [openKeys, setOpenKeys] = useState(["user"]);
    const [keySelected, setKeySelected] = useState("");

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
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
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    style={{ width: 256 }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div>{keySelected === "4" && <span>Key la 4</span>}</div>
            </div>
        </>
    );
};

export default AdminPage;
