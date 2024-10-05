// import { Radio } from "antd";
// import styled from "styled-components";

// export const WrapperStyleHeader = styled.div`
//     background: rgb(255, 255, 255);
//     padding: 9px 16px;
//     border-radius: 4px;
//     display: flex;
//     align-items: center;
//     span {
//         color: rgb(36, 36, 36);
//         font-weight: 400;
//         font-size: 13px;
//     }
// `;

// export const WrapperValue = styled.div`
//     background: rgb(240, 248, 255);
//     border: 1px solid rgb(194, 225, 255);
//     padding: 10px;
//     width: fit-content;
//     border-radius: 6px;
//     margin-top: 4px;
// `;

// export const WrapperContainer = styled.div`
//     width: 100%;
//     margin: 0 auto;
// `;

// export const WrapperListOrder = styled.div`
//     /* Define styles as needed */
// `;

// export const WrapperItemOrder = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 9px 16px;
//     background: #fff;
//     margin-top: 12px;
// `;

// export const WrapperPriceDiscount = styled.span`
//     color: #999;
//     font-size: 12px;
//     text-decoration: line-through;
//     margin-left: 4px;
// `;

// export const WrapperCountOrder = styled.div`
//     display: flex;
//     align-items: center;
//     width: 84px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
// `;

// export const WrapperRight = styled.div`
//     width: 100%;
//     margin-left: 20px;
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     align-items: center;
// `;

// export const WrapperInfo = styled.div`
//     padding: 17px 20px;
//     border-bottom: 1px solid #f5f5f5;
//     background: #fff;
// `;

// export const WrapperItemOrderInfo = styled.div`
//     padding: 17px 20px;
//     border-bottom: 1px solid #f5f5f5;
//     background: #fff;
//     border-top-right-radius: 6px;
//     border-top-left-radius: 6px;
//     width: 100%;
// `;

// export const WrapperTotal = styled.div`
//     display: flex;
//     align-items: flex-start;
//     justify-content: space-between;
//     padding: 17px 20px;
//     background: #fff;
//     border-bottom-right-radius: 6px;
//     border-bottom-left-radius: 6px;
// `;

// export const Label = styled.span`
//     font-size: 12px;
//     color: #000;
//     font-weight: bold;
// `;

// export const WrapperRadio = styled(Radio.Group)`
//     margin-top: 6px;
//     background: rgb(240, 248, 255);
//     border: 1px solid rgb(194, 225, 255);
//     width: 100%;
//     border-radius: 4px;
//     padding: 16px;
//     font-weight: normal;
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     justify-content: center;
// `;
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

export const WrapperValue = styled.div`
    background: rgb(240, 248, 255);
    border: 1px solid rgb(194, 225, 255);
    padding: 10px;
    width: fit-content;
    border-radius: 6px;
    margin-top: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
`;

export const WrapperContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 20px;
`;

export const WrapperListOrder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const WrapperItemOrder = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #fff;
    margin-top: 12px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
`;

export const WrapperPriceDiscount = styled.span`
    color: #999;
    font-size: 12px;
    text-decoration: line-through;
    margin-left: 4px;
`;

export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    width: 84px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const WrapperRight = styled.div`
    width: 100%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`;

export const WrapperInfo = styled.div`
    padding: 20px;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
    border-radius: 10px;
    margin-bottom: 20px;
`;

export const WrapperItemOrderInfo = styled.div`
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
`;

export const WrapperTotal = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.span`
    font-size: 18px;
    color: #1a73e8;
    font-weight: bold;
`;

export const WrapperRadio = styled(Radio.Group)`
    margin-top: 6px;
    background: rgb(240, 248, 255);
    border: 1px solid rgb(194, 225, 255);
    width: 100%;
    border-radius: 4px;
    padding: 16px;
    font-weight: normal;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
`;
