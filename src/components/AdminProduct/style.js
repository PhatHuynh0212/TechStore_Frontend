import { Button, Form, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    margin-top: 0;
    color: #000;
    font-size: 2rem;
`;

export const WrapperButtonAdd = styled(Button)`
    width: 140px;
    height: 140px;
    border-radius: 6px;
    border-style: dashed;
`;

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.antant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list.ant-upload-list-text {
        display: none;
    }
`;

export const WrapperFormUpload = styled(Form.Item)`
    & .ant-row {
        align-items: center;
    }
    & #basic_image {
        display: flex;
        align-items: center;
        gap: 15px;
    }
`;
