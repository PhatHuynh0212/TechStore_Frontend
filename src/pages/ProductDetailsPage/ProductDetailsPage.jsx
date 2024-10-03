import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div
            style={{
                padding: "5px 120px",
                background: "#efefef",
                height: "100vh",
                width: "100%",
            }}
        >
            <p style={{ margin: "5px 0" }}>
                <span
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                    onClick={() => navigate("/")}
                >
                    Home
                </span>{" "}
                - Product detail
            </p>
            <ProductDetailsComponent idProduct={id} />
        </div>
    );
};

export default ProductDetailsPage;
