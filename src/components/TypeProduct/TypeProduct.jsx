import React from "react";
import { useNavigate } from "react-router";

const TypeProduct = ({ name }) => {
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

    return (
        <div
            style={{ cursor: "pointer" }}
            onClick={() => handleNavigateType(name)}
        >
            {name}
        </div>
    );
};

export default TypeProduct;
