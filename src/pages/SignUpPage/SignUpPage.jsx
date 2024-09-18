import React, { useState } from "react";
import {
    WrapperContainerLeft,
    WrapperContainerRight,
    WrapperSignInContainer,
    WrapperSignInPage,
    WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import LogoSignIn from "../../assets/images/logo-signIn.png";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Image } from "antd";
import { useNavigate } from "react-router";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleNavigateSignin = () => {
        navigate("/sign-in");
    };

    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };

    const handleOnChangePassword = (value) => {
        setPassword(value);
    };

    const handleOnChangeConfirmPassword = (value) => {
        setConfirmPassword(value);
    };

    const handleSignUp = () => {
        console.log("sign-up", email, password, confirmPassword);
    };

    return (
        <WrapperSignInPage>
            <WrapperSignInContainer>
                <WrapperContainerLeft>
                    <h1>Hello, 👋</h1>
                    <p>Create new account</p>
                    <InputForm
                        placeholder="abc@email.com"
                        style={{ marginBottom: "15px" }}
                        value={email}
                        onChange={handleOnChangeEmail}
                    />
                    <div style={{ position: "relative", marginBottom: "15px" }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
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
                            value={password}
                            onChange={handleOnChangePassword}
                        />
                    </div>
                    <div style={{ position: "relative" }}>
                        <span
                            onClick={() =>
                                setIsShowConfirmPassword(!isShowConfirmPassword)
                            }
                            style={{
                                zIndex: "10",
                                position: "absolute",
                                top: "6px",
                                right: "8px",
                            }}
                        >
                            {isShowConfirmPassword ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled />
                            )}
                        </span>
                        <InputForm
                            placeholder="confirm password"
                            type={isShowConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={handleOnChangeConfirmPassword}
                        />
                    </div>
                    <ButtonComponent
                        disabled={
                            !email.length ||
                            !password.length ||
                            !confirmPassword.length
                        }
                        onClick={handleSignUp}
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
                        textButton={"Sign Up"}
                    />
                    <p>
                        You already have account?{" "}
                        <WrapperTextLight onClick={handleNavigateSignin}>
                            Sign In
                        </WrapperTextLight>
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

export default SignUpPage;
