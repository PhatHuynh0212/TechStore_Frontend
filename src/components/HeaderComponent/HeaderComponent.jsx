import React, { useEffect, useState } from "react";
import { Badge, Col, Modal, Popover } from "antd";
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
    const [isModalVisible, setIsModalVisible] = useState(false);

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
        navigate(`/my-order`, {
            state: { id: user?.id, token: user?.access_token },
        });
    };

    const handleLogout = async () => {
        setPending(true);
        await UserService.logoutUser();
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
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

    // Modal
    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        handleLogout();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
            <WrapperContentPopup onClick={handleOpenModal}>
                Logout
            </WrapperContentPopup>
        </div>
    );

    // Sent search input to redux store
    const onSearch = (e) => {
        dispatch(searchProduct(e.target.value));
    };

    return (
        <>
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
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
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
                                    <UserOutlined
                                        style={{ fontSize: "30px" }}
                                    />
                                )}
                                {user?.access_token ? (
                                    <div
                                        style={{
                                            width: "120px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <Popover
                                            content={content}
                                            trigger="click"
                                        >
                                            <div
                                                style={{
                                                    cursor: "pointer",
                                                    padding: "10px 0",
                                                    width:
                                                        userName?.length > 16
                                                            ? "120px"
                                                            : "fit-content",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {userName?.length
                                                    ? userName
                                                    : user?.email}
                                            </div>
                                        </Popover>
                                    </div>
                                ) : (
                                    <div
                                        onClick={handleNavigateSignin}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <WrapperTextHeaderSmall>
                                            Sign in / Sign up
                                        </WrapperTextHeaderSmall>
                                        <div>
                                            <span
                                                style={{ paddingRight: "4px" }}
                                            >
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
                                        style={{
                                            fontSize: "35px",
                                            color: "#fff",
                                        }}
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
            <Modal
                title="Confirm logout!"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
                okButtonProps={{
                    style: {
                        backgroundColor: "red",
                        borderColor: "red",
                    },
                }}
            >
                <p>Are you sure you want to logout this account?</p>
            </Modal>
        </>
    );
};

export default HeaderComponent;
