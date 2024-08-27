import React from "react";
import {
    WrapperContent,
    WrapperLabelText,
    WrapperPrice,
    WrapperTextValue,
} from "./style";
import { Checkbox, Rate } from "antd";

const NavBarComponent = () => {
    const onChange = (checkedValues) => {
        console.log("checked = ", checkedValues);
    };

    const renderContent = (type, options) => {
        switch (type) {
            case "text":
                return options.map((option, index) => {
                    return (
                        <WrapperTextValue key={index}>
                            {option}
                        </WrapperTextValue>
                    );
                });
            case "checkbox":
                return (
                    <Checkbox.Group
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                        }}
                        onChange={onChange}
                    >
                        {options.map((option, index) => {
                            return (
                                <Checkbox key={index} value={option.value}>
                                    {option.label}
                                </Checkbox>
                            );
                        })}
                    </Checkbox.Group>
                );
            case "star":
                return options.map((option, index) => {
                    return (
                        <div
                            key={index}
                            style={{ display: "flex", gap: "6px" }}
                        >
                            <Rate
                                allowHalf
                                defaultValue={option}
                                style={{ fontSize: "12px" }}
                            />
                            <WrapperTextValue>
                                from {Math.floor(option)} star
                            </WrapperTextValue>
                        </div>
                    );
                });
            case "price":
                return options.map((option, index) => {
                    return <WrapperPrice key={index}>{option}</WrapperPrice>;
                });
            default:
                return {};
        }
    };

    return (
        <div style={{ background: "#fff" }}>
            <WrapperLabelText>Category</WrapperLabelText>
            <WrapperContent>
                {renderContent("text", ["Cellphone", "Tablet", "Laptop", "PC"])}
            </WrapperContent>
            <WrapperLabelText>Services</WrapperLabelText>
            <WrapperContent>
                {renderContent("checkbox", [
                    { value: "a", label: "Free ship" },
                    { value: "b", label: "Get Voucher" },
                    { value: "c", label: "Get Discount" },
                ])}
            </WrapperContent>
            <WrapperLabelText>Location branch</WrapperLabelText>
            <WrapperContent>
                {renderContent("checkbox", [
                    { value: "a", label: "Sai Gon" },
                    { value: "b", label: "An Giang" },
                ])}
            </WrapperContent>
            <WrapperLabelText>Evaluation</WrapperLabelText>
            <WrapperContent>
                {renderContent("star", [3.5, 4, 5])}
            </WrapperContent>
            <WrapperLabelText>Price</WrapperLabelText>
            <WrapperContent>
                {renderContent("price", [
                    "Under 500.000",
                    "Over 500.000",
                    "Over 5.000.000",
                ])}
            </WrapperContent>
        </div>
    );
};

export default NavBarComponent;
