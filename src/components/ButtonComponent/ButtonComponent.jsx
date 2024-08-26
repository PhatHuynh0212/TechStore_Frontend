import { Button } from "antd";
import React from "react";

const ButtonComponent = ({ size, styleButton, textButton, ...rests }) => {
    return (
        <Button size={size} style={styleButton} {...rests}>
            {textButton}
        </Button>
    );
};

export default ButtonComponent;
