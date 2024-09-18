import { Button } from "antd";
import React from "react";

const ButtonComponent = ({
    size,
    styleButton,
    textButton,
    disabled,
    ...rests
}) => {
    return (
        <Button
            size={size}
            style={{
                ...styleButton,
                background: disabled ? "#ccc" : styleButton.background,
            }}
            {...rests}
        >
            {textButton}
        </Button>
    );
};

export default ButtonComponent;
