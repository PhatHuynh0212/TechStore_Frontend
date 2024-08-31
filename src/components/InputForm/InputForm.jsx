import React from "react";
// import { useState } from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
    // const [valueInput, setValueInput] = useState("");
    const { placeholder = "input text", ...rest } = props;
    return (
        <WrapperInputStyle
            placeholder={placeholder}
            // valueInput={valueInput}
            {...rest}
        />
    );
};

export default InputForm;
