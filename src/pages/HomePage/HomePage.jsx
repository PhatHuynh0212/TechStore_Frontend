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

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 0);
    const refSearch = useRef();
    const [stateProducts, setStateProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const arr = ["Cellphone", "Tablet", "Laptop", "PC"];
    const fetchProductAll = async (search) => {
        const res = await ProductService.getAllProduct(search);
        if (search?.length > 0 || refSearch.current) {
            setStateProducts(res?.data);
            return [];
        } else {
            return res;
        }
    };

    useEffect(() => {
        if (refSearch.current) {
            setLoading(true);
            fetchProductAll(searchDebounce);
        }
        refSearch.current = true;
        setLoading(false);
    }, [searchDebounce]);

    const { isLoading, data: products } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductAll,
        queryRetry: {
            retry: 3,
            retryDelay: 1000,
        },
    });

    useEffect(() => {
        if (products?.data?.length > 0) {
            setStateProducts(products?.data);
        }
    }, [products]);

    return (
        <Loading isPending={isLoading || loading}>
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
                    <WrapperProduct>
                        {stateProducts?.map((product) => {
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
        </Loading>
    );
};

export default HomePage;
