import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import slider4 from "../../assets/images/slider4.webp";
import slider5 from "../../assets/images/slider5.webp";

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
                style={{ background: "#efefef", padding: " 0 120px" }}
            >
                <SliderComponent
                    arrImages={[slider1, slider2, slider3, slider4, slider5]}
                />
            </div>
        </>
    );
};

export default HomePage;
