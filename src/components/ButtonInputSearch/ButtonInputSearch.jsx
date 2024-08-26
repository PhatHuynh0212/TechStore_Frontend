import { Button, Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";

const ButtonInputSearch = (props) => {
    const {
        size,
        placeholder,
        textButton,
        bordered,
        backgroundColorInput = "#fff",
        backgroundColorButton = "#fff",
        colorButton = "#333",
    } = props;

    return (
        <div style={{ display: "flex" }}>
            <Input
                size={size}
                placeholder={placeholder}
                allowClear
                style={{
                    width: "500px",
                    border: bordered,
                    background: backgroundColorInput,
                    borderRadius: "6px 0 0 6px",
                }}
            />
            <Button
                size={size}
                icon={<SearchOutlined />}
                style={{
                    border: bordered,
                    color: colorButton,
                    background: backgroundColorButton,
                    borderRadius: "0 6px 6px 0",
                }}
            >
                {textButton}
            </Button>
        </div>
    );
};

export default ButtonInputSearch;
