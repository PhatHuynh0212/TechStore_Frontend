import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    display: flex;
    align-items: center;
    padding: 15px 120px;
    /* background-color: rgb(26, 148, 255); */
    background-image: linear-gradient(45deg, #00dbde 0%, #fc00ff 100%);
`;

export const WrapperTextHeader = styled.span`
    text-align: left;
    font-size: 2.2rem;
    font-weight: bold;
    color: #fff;
`;

export const WrapperTextHeaderSmall = styled.span`
    font-size: 1.4rem;
    color: #fff;
`;

export const WrapperHeaderLeftItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
`;
