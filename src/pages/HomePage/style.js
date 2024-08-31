import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 45px;
`;

export const WrapperButtonHover = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #0b74e5;
        span {
            color: #fff;
        }
    }
`;

export const WrapperProduct = styled.div`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    gap: 30px;
    margin-top: 25px;
    flex-wrap: wrap;
`;

export const WrapperButtonShow = styled.div`
    margin-top: 25px;
    width: 100%;
    display: flex;
    justify-content: center;
`;
