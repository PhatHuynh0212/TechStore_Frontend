import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    width: 100%;
    height: 100%;
`;

export const WrapperStyleColImage = styled(Col)`
    display: flex;
    flex-basis: unset;
    width: 65px;
    height: 65px;
`;

export const WrapperStyleNameProduct = styled.h1`
    color: #242424;
    font-size: 2.4rem;
    font-weight: 400;
    line-height: 3.2rem;
    word-break: break-word;
`;

export const WrapperStyleTextSell = styled.span`
    font-size: 1.5rem;
    line-height: 2.4rem;
    color: #787878;
`;

export const WrapperPriceProduct = styled.div`
    background: #fafafa;
    border-radius: 5px;
`;

export const WrapperButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
`;

export const WrapperPriceTextProduct = styled.h1`
    font-size: 3.2rem;
    line-height: 4rem;
    margin: 10px 10px 0 0;
    padding: 10px;
    font-weight: 600;
`;

export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 1.6rem;
        line-height: 2.4rem;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    span.change-address {
        color: #0b74e5;
        font-size: 1.6rem;
        line-height: 2.4rem;
        font-weight: 500;
        flex-shrink: 0;
    }
`;

export const WrapperQuantityProduct = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    width: 120px;
    border: 1px solid #ccc;
`;

export const WrapperQuantity = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 30px;
`;

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-outlined {
        width: 50px;
        border-radius: 0;
        border-top: none;
        border-bottom: none;
    }
    & .ant-input-number-handler-wrap {
        display: none;
    }
    & .ant-input-number-input {
        text-align: center;
    }
`;
