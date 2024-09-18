import React from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
    const { placeholder = "input text", ...rest } = props;
    const handleOnChangeInput = (e) => {
        props.handleOnChange(e.target.value);
    };
    return (
        <WrapperInputStyle
            placeholder={placeholder}
            value={props.value}
            {...rest}
            onChange={handleOnChangeInput}
        />
    );
};

export default InputForm;
