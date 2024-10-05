import React, { useEffect, useState } from "react";
import { Badge, Col, Popover } from "antd";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import {
    WrapperContainerHeader,
    WrapperContentPopup,
    WrapperHeader,
    WrapperHeaderRightItem,
    WrapperTextHeader,
    WrapperTextHeaderSmall,
} from "./style";
import {
    CaretDownOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import { resetOrder } from "../../redux/slides/orderSlide";
import Loading from "../LoadingComponent/LoadingComponent";
import { searchProduct } from "../../redux/slides/productSlide";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const order = useSelector((state) => state?.order);
    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const dispatch = useDispatch();
    const [pending, setPending] = useState(false);

    const handleNavigateHome = () => {
        navigate("/");
    };

    const handleNavigateSignin = () => {
        navigate("/sign-in");
    };

    const handleNavigateProfile = () => {
        navigate("/profile-user");
    };

    const handleNavigateAdmin = () => {
        navigate("/system/admin");
    };

    const handleNavigateMyOrder = () => {
        navigate("/my-order");
    };

    const handleLogout = async () => {
        setPending(true);
        await UserService.logoutUser();
        localStorage.removeItem("access_token");
        localStorage.removeItem("persist:root");
        dispatch(resetUser());
        dispatch(resetOrder());
        setPending(false);
        navigate("/");
    };

    useEffect(() => {
        setPending(true);
        setUserName(user?.name);
        setUserAvatar(user?.avatar);
        setPending(false);
    }, [user?.name, user?.avatar]);

    const content = (
        <div>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={handleNavigateAdmin}>
                    System management
                </WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={handleNavigateProfile}>
                User information
            </WrapperContentPopup>
            <WrapperContentPopup onClick={handleNavigateMyOrder}>
                My order
            </WrapperContentPopup>
            <WrapperContentPopup onClick={handleLogout}>
                Logout
            </WrapperContentPopup>
        </div>
    );

    const onSearch = (e) => {
        dispatch(searchProduct(e.target.value));
    };

    return (
        <WrapperContainerHeader>
            <WrapperHeader
                style={{
                    justifyContent:
                        isHiddenSearch && isHiddenCart
                            ? "space-between"
                            : "unset",
                }}
            >
                <Col span={5}>
                    <WrapperTextHeader onClick={handleNavigateHome}>
                        TechStore
                    </WrapperTextHeader>
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch onChange={onSearch} />
                    </Col>
                )}
                <Col
                    span={6}
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Loading isPending={pending}>
                        <WrapperHeaderRightItem>
                            {userAvatar ? (
                                <img
                                    src={userAvatar}
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                    alt="userAvatar"
                                />
                            ) : (
                                <UserOutlined style={{ fontSize: "30px" }} />
                            )}
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: "pointer" }}>
                                            {userName?.length
                                                ? userName
                                                : user?.email}
                                        </div>
                                    </Popover>
                                </>
                            ) : (
                                <div
                                    onClick={handleNavigateSignin}
                                    style={{ cursor: "pointer" }}
                                >
                                    <WrapperTextHeaderSmall>
                                        Sign in / Sign up
                                    </WrapperTextHeaderSmall>
                                    <div>
                                        <span style={{ paddingRight: "4px" }}>
                                            Account
                                        </span>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </WrapperHeaderRightItem>
                    </Loading>
                    {!isHiddenCart && (
                        <WrapperHeaderRightItem
                            onClick={() => navigate("/order")}
                            style={{ cursor: "pointer" }}
                        >
                            <Badge
                                count={order?.orderItems?.length}
                                size="small"
                            >
                                <ShoppingCartOutlined
                                    style={{ fontSize: "35px", color: "#fff" }}
                                />
                            </Badge>
                            <WrapperTextHeaderSmall>
                                Shopping Cart
                            </WrapperTextHeaderSmall>
                        </WrapperHeaderRightItem>
                    )}
                </Col>
            </WrapperHeader>
        </WrapperContainerHeader>
    );
};

export default HeaderComponent;
