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

const HomePage = () => {
    const arr = ["Cellphone", "Tablet", "Laptop", "PC"];
    return (
        <>
            <div style={{ padding: " 0 120px" }}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return <TypeProduct key={item} name={item} />;
                    })}
                </WrapperTypeProduct>
            </div>
            <div
                id="container"
                style={{
                    background: "#efefef",
                    padding: " 0 120px",
                    height: "2000px",
                }}
            >
                <SliderComponent
                    arrImages={[slider1, slider2, slider3, slider4, slider5]}
                />
                <WrapperProduct>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
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
        </>
    );
};

export default HomePage;
