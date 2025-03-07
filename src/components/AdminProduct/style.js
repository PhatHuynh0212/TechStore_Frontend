import { Button, Form, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 2rem;
`;

export const WrapperButtonAdd = styled(Button)`
  font-size: 1.6rem;
  font-weight: 500;
  color: white;
  width: 120px;
  height: 40px;
  border-radius: 6px;
  border-style: dashed;
  background-image: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
  transition: all ease-in 200ms !important;
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
`;

export const WrapperUploadInput = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
