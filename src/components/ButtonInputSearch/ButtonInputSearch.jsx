import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
    // const {
    //     size,
    //     placeholder,
    //     textButton,
    //     bordered,
    //     backgroundColorInput = "#fff",
    //     backgroundColorButton = "#fff",
    // } = props;

    return (
        <div style={{ display: "flex" }}>
            <InputComponent
                size="large"
                placeholder="input search text"
                allowClear
                style={{
                    width: "550px",
                    border: "none",
                    background: "#fff",
                    borderRadius: "6px 0 0 6px",
                }}
                {...props}
            />
            <ButtonComponent
                size="large"
                icon={<SearchOutlined />}
                styleButton={{
                    border: "none",
                    color: "#fff",
                    background: "#4096ff",
                    borderRadius: "0 6px 6px 0",
                }}
                textButton="Search"
                {...props}
            />
        </div>
    );
};

export default ButtonInputSearch;
