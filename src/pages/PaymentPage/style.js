import { Radio } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
    background: rgb(255, 255, 255);
    padding: 9px 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    span {
        color: rgb(36, 36, 36);
        font-weight: 400;
        font-size: 13px;
    }
`;

export const WrapperContainer = styled.div`
    display: flex;
    gap: 30px;
`;

export const WrapperLeft = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export const WrapperRight = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const WrapperInfo = styled.div`
    padding: 17px 20px;
    border-bottom: 1px solid #f5f5f5;
    border-radius: 5px;
    background: #fff;
`;

export const WrapperAddress = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
`;

export const WrapperTotal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;
    background: #fff;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
`;

export const Label = styled.span`
    font-size: 1.6rem;
    color: #000;
    font-weight: bold;
`;

export const WrapperRadio = styled(Radio.Group)`
    margin-top: 6px;
    background: rgb(240, 248, 255);
    border: 1px solid rgb(194, 225, 255);
    width: 500px;
    border-radius: 4px;
    height: 100px;
    padding: 16px;
    font-weight: normal;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
`;
