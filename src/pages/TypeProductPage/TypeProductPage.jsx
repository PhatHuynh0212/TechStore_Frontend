import React, { useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import {
    WrapperContent,
    WrapperNavbar,
    WrapperPagination,
    WrapperProduct,
    WrapperTypeProduct,
} from "./style";
import { Col } from "antd";
import { useLocation } from "react-router";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import TypeProduct from "../../components/TypeProduct/TypeProduct";

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 500);

    const { state } = useLocation();
    const [typeProducts, setTypeProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginate, setPaginate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    });

    const fetchProductType = async (type, page, limit) => {
        setLoading(true);
        const res = await ProductService.getProductType(type, page, limit);
        if (res?.status === "OK") {
            setLoading(false);
            setProducts(res?.data);
            setPaginate({ ...paginate, total: res?.totalPage });
        } else {
            setLoading(false);
        }
        return res;
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state, paginate?.page, paginate?.limit);
        }
    }, [state, paginate?.page, paginate?.limit]);

    const onChange = (current, pageSize) => {
        setPaginate({ ...paginate, page: current - 1, limit: pageSize });
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
        <Loading isPending={loading}>
            <div
                style={{
                    width: "1270px",
                    margin: "0 auto",
                    background: "#fff",
                }}
            >
                <WrapperTypeProduct>
                    {typeProducts?.map((item) => {
                        return <TypeProduct key={item} name={item} />;
                    })}
                </WrapperTypeProduct>
            </div>
            <div style={{ width: "100%", background: "#efefef" }}>
                <div style={{ width: "1270px", margin: "0 auto" }}>
                    <WrapperContent>
                        <WrapperNavbar span={4}>
                            <NavBarComponent />
                        </WrapperNavbar>
                        <Col
                            span={20}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <WrapperProduct>
                                {products
                                    ?.filter((pro) => {
                                        if (searchDebounce === "") {
                                            return pro;
                                        } else if (
                                            pro?.name
                                                ?.toLowerCase()
                                                ?.includes(
                                                    searchDebounce?.toLowerCase()
                                                )
                                        ) {
                                            return pro;
                                        }
                                    })
                                    ?.map((product) => {
                                        return (
                                            <CardComponent
                                                key={product._id}
                                                id={product._id}
                                                countInStock={
                                                    product.countInStock
                                                }
                                                description={
                                                    product.description
                                                }
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
                            <WrapperPagination
                                showQuickJumper
                                defaultCurrent={paginate?.page + 1}
                                total={paginate?.total}
                                onChange={onChange}
                            />
                        </Col>
                    </WrapperContent>
                </div>
            </div>
        </Loading>
    );
};

export default TypeProductPage;
