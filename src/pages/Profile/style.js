import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 1.8rem;
`;

export const WrapperContentProfile = styled.div`
    margin: 0 auto;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 450px;
`;

export const WrapperLabel = styled.label`
    width: 50px;
    color: #333;
    font-size: 1.4rem;
    line-height: 30px;
    font-weight: 600;
    text-align: left;
`;

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
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
