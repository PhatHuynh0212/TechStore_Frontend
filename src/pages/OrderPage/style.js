import styled from "styled-components";
import { Checkbox } from "antd";

export const CustomCheckbox = styled(Checkbox)`
    display: flex;
    align-items: center;
    .ant-checkbox-inner {
        border-radius: 4px;
    }
`;

export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;
export const WrapperLeft = styled.div`
    width: 100%;
    max-width: 90%;
    padding-right: 0px;
    padding-left: 35px;
    @media (max-width: 1024px) {
        max-width: 60%;
    }

    @media (max-width: 768px) {
        padding-right: 0;
        max-width: 100%;
    }

    @media (max-width: 480px) {
        max-width: 100%;
        padding-right: 0;
        margin-bottom: 10px;
    }
`;
export const WrapperRight = styled.div`
    margin-left: 770px;
    width: 100%;
    max-width: 30%;

    @media (max-width: 1024px) {
        max-width: 40%;
        margin-left: 300px;
    }

    @media (max-width: 768px) {
        max-width: 100%;
        margin-left: 0;
        margin-top: 20px;
    }

    @media (max-width: 480px) {
        max-width: 100%;
        margin-left: 0;
        margin-top: 10px;
    }
`;

export const ButtonContainer = styled.div`
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
    width: 100%;

    @media (max-width: 768px) {
        justify-content: end;
    }
`;

export const StyledButton = styled.button`
    background: rgb(255, 57, 69);
    height: 48px;
    width: 220px;
    border: none;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 180px;
        height: 40px;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        width: 160px;
        height: 36px;
        font-size: 13px;
    }
`;

export const WrapperInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
`;

export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px; /* Add this line */
    }
`;

export const WrapperListOrder = styled.div`
    padding-top: 10px;
`;

export const WrapperStyleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
`;

export const WrapperStyleHeaderDelivery = styled.div`
    padding: 10px 0;
`;

export const WrapperTotal = styled(WrapperInfo)`
    font-weight: bold;
`;

export const OrderContainer = styled.div`
    background: #fff;
    width: 100%;
    height: fit-content;
    margin: 0 auto;
    padding: 20px;
    max-width: 1270px;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;
