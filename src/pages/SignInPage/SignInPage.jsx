import React, { useState } from "react";
import {
    WrapperContainerLeft,
    WrapperContainerRight,
    WrapperSignInContainer,
    WrapperSignInPage,
    WrapperTextLight,
} from "./style";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import LogoSignIn from "../../assets/images/logo-signIn.png";
import { Image } from "antd";

const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <WrapperSignInPage>
            <WrapperSignInContainer>
                <WrapperContainerLeft>
                    <h1>Hello, 👋</h1>
                    <p>Sign In or Sign Up</p>
                    <InputForm
                        placeholder="abc@email.com"
                        style={{ marginBottom: "15px" }}
                    />
                    <div style={{ position: "relative" }}>
                        <span
                            style={{
                                zIndex: "10",
                                position: "absolute",
                                top: "6px",
                                right: "8px",
                            }}
                        >
                            {isShowPassword ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled />
                            )}
                        </span>
                        <InputForm
                            placeholder="password"
                            type={isShowPassword ? "text" : "password"}
                        />
                    </div>
                    <ButtonComponent
                        size={40}
                        styleButton={{
                            color: "#fff",
                            fontSize: "1.8rem",
                            fontWeight: "600",
                            background: "#FF3945",
                            height: "45px",
                            width: "100%",
                            border: "none",
                            borderRadius: "4px",
                            margin: "26px 0 10px",
                        }}
                        textButton={"Sign In"}
                    />
                    <p>
                        <WrapperTextLight>Forgot password?</WrapperTextLight>
                    </p>
                    <p>
                        No account?{" "}
                        <WrapperTextLight>Create your account</WrapperTextLight>
                    </p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image
                        src={LogoSignIn}
                        preview={false}
                        alt="logo-signIn"
                        style={{ width: "203px", height: "203px" }}
                    />
                    <h4
                        style={{
                            marginBottom: "10px",
                            color: "#0b74e5",
                            fontSize: "1.7rem",
                        }}
                    >
                        Buying at TechShop
                    </h4>
                    <p style={{ margin: 0, color: "#0b74e5" }}>
                        Quality commitment
                    </p>
                </WrapperContainerRight>
            </WrapperSignInContainer>
        </WrapperSignInPage>
    );
};

export default SignInPage;
