import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 15px 120px;
    display: flex;
    align-items: center;
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

export const WrapperHeaderRightItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
`;
