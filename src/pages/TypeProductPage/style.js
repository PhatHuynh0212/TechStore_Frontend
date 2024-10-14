import { Col, Pagination, Row } from "antd";
import styled from "styled-components";

export const WrapperProduct = styled(Col)`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    gap: 30px;
    flex-wrap: wrap;
`;

export const WrapperNavbar = styled(Col)`
    width: 200px;
    height: fit-content;
    margin-right: 15px;
    background: #fff;
    padding: 10px 10px 20px 10px;
    border-radius: 6px;
`;

export const WrapperContent = styled(Row)`
    padding-top: 20px;
    flex-wrap: nowrap;
`;

export const WrapperPagination = styled(Pagination)`
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
`;

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    justify-content: flex-start;
    height: 45px;
`;
