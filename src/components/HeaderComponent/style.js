import { Row } from "antd";
import styled from "styled-components";

export const WrapperContainerHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background: linear-gradient(45deg, #00dbde 0%, #fc00ff 100%);
`;

export const WrapperHeader = styled(Row)`
    width: 1270px;
    padding: 15px 0;
    display: flex;
    align-items: center;
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

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        background: orange;
        color: #fff;
    }
`;
