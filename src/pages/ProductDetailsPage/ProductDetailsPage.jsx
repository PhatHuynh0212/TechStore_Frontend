import React, { useEffect, useState } from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router";
import { WrapperTypeProduct } from "../HomePage/style";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import * as ProductService from "../../services/ProductService";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [typeProducts, setTypeProducts] = useState([]);

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
        <>
            <div style={{ width: "1270px", margin: "0 auto" }}>
                <WrapperTypeProduct>
                    {typeProducts?.map((item) => {
                        return <TypeProduct key={item} name={item} />;
                    })}
                </WrapperTypeProduct>
            </div>
            <div
                style={{
                    padding: "5px 103px",
                    background: "#efefef",
                    height: "100vh",
                    width: "1270px",
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
        </>
    );
};

export default ProductDetailsPage;
