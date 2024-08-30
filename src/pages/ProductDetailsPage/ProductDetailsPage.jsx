import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";

const ProductDetailsPage = () => {
    return (
        <div
            style={{
                padding: "0 120px",
                background: "#efefef",
                height: "1000px",
            }}
        >
            <h5 style={{ margin: "0 0 10px" }}>Home - Product detail</h5>
            <ProductDetailsComponent />
        </div>
    );
};

export default ProductDetailsPage;
