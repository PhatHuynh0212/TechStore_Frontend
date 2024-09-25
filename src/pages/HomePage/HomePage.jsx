import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
    WrapperButtonHover,
    WrapperButtonShow,
    WrapperProduct,
    WrapperTypeProduct,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import slider4 from "../../assets/images/slider4.webp";
import slider5 from "../../assets/images/slider5.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/LoadingComponent/LoadingComponent";

const HomePage = () => {
    const arr = ["Cellphone", "Tablet", "Laptop", "PC"];
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };
    const { isLoading, data: products } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductAll,
        queryRetry: {
            retry: 3,
            retryDelay: 1000,
        },
    });

    return (
        <>
            <div style={{ width: "1270px", margin: "0 auto" }}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return <TypeProduct key={item} name={item} />;
                    })}
                </WrapperTypeProduct>
            </div>
            <div
                className="body"
                style={{ width: "100%", background: "#efefef" }}
            >
                <div
                    id="container"
                    style={{
                        width: "1270px",
                        height: "2000px",
                        margin: "0 auto",
                    }}
                >
                    <SliderComponent
                        arrImages={[
                            slider1,
                            slider2,
                            slider3,
                            slider4,
                            slider5,
                        ]}
                    />
                    <Loading isPending={isLoading}>
                        <WrapperProduct>
                            {products?.data.map((product) => {
                                return (
                                    <CardComponent
                                        key={product._id}
                                        countInStock={product.countInStock}
                                        description={product.description}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        type={product.type}
                                        selled={product.selled}
                                        discount={product.discount}
                                    />
                                );
                            })}
                        </WrapperProduct>
                    </Loading>
                    <WrapperButtonShow>
                        <WrapperButtonHover
                            textButton="Show more"
                            type="outline"
                            styleButton={{
                                width: "240px",
                                height: "38px",
                                border: "1px solid #0B74E5",
                                borderRadius: "5px",
                                color: "#0B74E5",
                                fontSize: "1.6rem",
                                fontWeight: "500",
                            }}
                        />
                    </WrapperButtonShow>
                </div>
            </div>
        </>
    );
};

export default HomePage;
