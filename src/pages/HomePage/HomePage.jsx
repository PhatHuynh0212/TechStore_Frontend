import React, { useEffect, useRef, useState } from "react";
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
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { current } from "@reduxjs/toolkit";

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 0);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [typeProducts, setTypeProducts] = useState([]);
    const [isFirstLoad, setIsFirstLoad] = useState(true); // Thêm state để kiểm tra lần tải đầu tiên
    const endOfListRef = useRef(null);

    const fetchProductAll = async (context) => {
        const limit = context?.queryKey ? context?.queryKey[1] : 5;
        const search = context?.queryKey ? context?.queryKey[2] : 5;
        const res = await ProductService.getAllProduct(search, limit);
        return res;
    };

    const query = useQuery({
        queryKey: ["products", limit, searchDebounce],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
    });
    const { isLoading, data: products } = query;

    const allProductsLoaded = products?.data?.length >= products?.totalProduct;

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

    useEffect(() => {
        if (!isLoading && !isFirstLoad) {
            endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        // Đặt lại isFirstLoad về false sau lần tải đầu tiên
        if (isFirstLoad && !isLoading) {
            setIsFirstLoad(false);
        }
    }, [products, isLoading]); // Chỉ cuộn khi không phải lần tải đầu tiên

    return (
        <Loading isPending={isLoading || loading}>
            <div style={{ width: "1270px", margin: "0 auto" }}>
                <WrapperTypeProduct>
                    {typeProducts?.map((item) => (
                        <TypeProduct key={item} name={item} />
                    ))}
                </WrapperTypeProduct>
            </div>
            <div
                className="body"
                style={{ width: "100%", background: "#efefef" }}
            >
                <div
                    id="container"
                    style={{
                        paddingBottom: "20px",
                        width: "1270px",
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
                    <WrapperProduct>
                        {products?.data?.map((product) => (
                            <CardComponent
                                key={product._id}
                                id={product._id}
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
                        ))}
                    </WrapperProduct>
                    <div ref={endOfListRef}></div> {/* Phần tử để cuộn tới */}
                    <WrapperButtonShow>
                        <WrapperButtonHover
                            disabled={
                                allProductsLoaded || products?.totalPage === 1
                            }
                            textButton="Load more"
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
                            onClick={() => setLimit((prev) => prev + 5)}
                        />
                    </WrapperButtonShow>
                </div>
            </div>
        </Loading>
    );
};

export default HomePage;
