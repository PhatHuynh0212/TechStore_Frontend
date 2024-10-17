import styled from "styled-components";

export const WrapperHeaderUser = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

export const WrapperInfoUser = styled.div`
    background-color: #ffffff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 30%;

    .name-info {
        font-size: 15px;
        color: rgb(36, 36, 36);
        font-weight: bold;
        text-transform: uppercase;
    }
    .address-info,
    .phone-info,
    .delivery-info,
    .delivery-fee,
    .payment-info {
        color: rgba(0, 0, 0, 0.75);
        font-size: 14px;
        margin-top: 8px;
    }
    .name-delivery {
        color: #ff8c00;
        font-weight: bold;
        text-transform: uppercase;
    }
    .status-payment {
        margin-top: 8px;
        color: #ff8c00;
    }
`;

export const WrapperLabel = styled.div`
    color: rgb(36, 36, 36);
    font-size: 14px;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const WrapperContentInfo = styled.div`
    height: auto;
    background-color: #f1f1f1;
    border-radius: 6px;
    padding: 15px;
`;

export const WrapperStyleContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
    border-top: 1px solid #dcdcdc;
    padding-top: 20px;
`;

export const WrapperProduct = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 10px;
    padding-top: 10px;
    background-color: #fafafa;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const WrapperNameProduct = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 60%;

    img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 6px;
        margin-right: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    div {
        font-size: 14px;
        font-weight: bold;
        color: rgb(36, 36, 36);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const WrapperItem = styled.div`
    width: 15%;
    font-weight: bold;
    text-align: center;
    color: #333;
`;

export const WrapperItemLabel = styled.div`
    width: 15%;
    font-size: 15px;
    font-weight: 700;
    text-align: center;
`;

export const WrapperAllPrice = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    padding: 15px 0;
    border-top: 1px solid #ddd;
    color: rgb(36, 36, 36);

    div:last-child {
        color: red;
    }
`;
