import React from "react";
import { Link } from "react-router-dom";
import { WrapperNotFoundPage } from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const NotFoundPage = () => {
    return (
        <WrapperNotFoundPage
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Link to="/">
                    <ButtonComponent
                        size="large"
                        textButton="Back Home"
                        styleButton={{
                            color: "#fff",
                            background: "#1890ff",
                            borderColor: "#1890ff",
                        }}
                    />
                </Link>
            }
        />
    );
};

export default NotFoundPage;
