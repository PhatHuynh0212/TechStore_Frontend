import React, { useEffect, useState } from "react";
import {
    WrapperContent,
    WrapperLabelText,
    WrapperPrice,
    WrapperTextValue,
} from "./style";
import { Checkbox, Rate } from "antd";
import * as ProductService from "../../services/ProductService";
import { useNavigate } from "react-router";

const NavBarComponent = () => {
    const [typeProducts, setTypeProducts] = useState([]);
    const navigate = useNavigate();

    const handleNavigateType = (type) => {
        // Điều chỉnh lại url nếu có dấu
        navigate(
            `/product/${type
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                ?.replace(/ /g, "_")}`,
            { state: type }
        );
    };

    const onChange = (checkedValues) => {};

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

    // Fetch all type product
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === "OK") {
            setTypeProducts(res?.data);
        }
        return res;
    };

    useEffect(() => {
        fetchAllTypeProduct();
    }, []);

    return (
        <div style={{ background: "#fff" }}>
            <WrapperLabelText>Category</WrapperLabelText>
            <WrapperContent>
                {typeProducts?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            style={{ marginLeft: 15, cursor: "pointer" }}
                            onClick={() => handleNavigateType(item)}
                        >
                            {item}
                        </div>
                    );
                })}
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
