import Card from "antd/es/card/Card";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 230px;
    & img {
        width: 240px;
        height: 240px;
    }
    background-color: ${(props) => (props.disabled ? "#ccc" : "#fff")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const StyleNameProduct = styled.div`
    font-size: 1.6rem;
    font-weight: bold;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
`;

export const WrapperReportText = styled.div`
    margin: 10px 0 5px;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    color: #808089;
`;

export const WrapperPriceText = styled.div`
    color: #ff424e;
    font-size: 1.6rem;
    font-weight: 500;
`;

export const WrapperDiscountText = styled.span`
    padding-left: 8px;
    color: #ff424e;
    font-size: 1.2rem;
    font-weight: 500;
`;

export const WrapperStyleTextSell = styled.span`
    font-size: 1.5rem;
    line-height: 2.4rem;
    color: #787878;
`;
