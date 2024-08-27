import { Col, Pagination, Row } from "antd";
import styled from "styled-components";

export const WrapperProduct = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`;

export const WrapperNavbar = styled(Col)`
    height: fit-content;
    margin-right: 15px;
    background: #fff;
    padding: 10px 10px 20px 10px;
    border-radius: 6px;
`;

export const WrapperContent = styled(Row)`
    padding: 20px 120px 0;
    background: #efefef;
    flex-wrap: nowrap;
`;

export const WrapperPagination = styled(Pagination)`
    margin-top: 25px;
    display: flex;
    justify-content: center;
`;
