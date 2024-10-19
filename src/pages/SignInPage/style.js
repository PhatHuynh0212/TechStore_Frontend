import styled from "styled-components";

export const WrapperSignInPage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #efefef;
`;

export const WrapperSignInContainer = styled.div`
    width: 800px;
    height: 450px;
    display: flex;
    border-radius: 6px;
    background: #fff;
`;

export const WrapperContainerLeft = styled.div`
    padding: 40px 45px 25px 45px;
    flex: 1;
`;

export const WrapperContainerRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    background: #eaf5ff;
`;

export const WrapperTextLight = styled.span`
    color: #0d5cb6;
    font-size: 1.4rem;
    cursor: pointer;
`;

export const StyledErrorMessage = styled.span`
    color: #ff4d4f;
    font-size: 1.4rem;
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #fff1f0;
    border: 1px solid #ffa39e;
    border-radius: 5px;
    display: inline-block;
    width: fit-content;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
