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

export const WrapperPriceDiscount = styled.div`
    text-align: right;
    color: grey;
`;

export const WrapperLeft = styled.div`
    width: 100%;
    max-width: 90%;
    padding-right: 0px;
`;
export const WrapperRight = styled.div`
    width: 100%;
    max-width: 30%;
`;

export const ButtonContainer = styled.div`
    padding-top: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const StyledButton = styled.button`
    background: rgb(255, 57, 69);
    height: 48px;
    width: 100%;
    border: none;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
`;

export const WrapperInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
`;

export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
`;

export const WrapperListOrder = styled.div`
    padding-top: 10px;
`;

export const WrapperStyleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
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
`;
