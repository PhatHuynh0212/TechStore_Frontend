import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: "",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: "",
    isPaid: false,
    paidAt: "",
    isDelivered: false,
    deliveredAt: "",
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === orderItem?.product
            );
            // Check nếu cùng 1 sp thêm vào giỏ hàng chỉ cần tăng số lượng
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount;
            } else {
                state.orderItems.push(orderItem);
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === idProduct
            );
            itemOrder.amount++;
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === idProduct
            );
            itemOrder.amount--;
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.filter(
                (item) => item?.product !== idProduct
            );
            state.orderItems = itemOrder;
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload;
            const itemOrder = state?.orderItems?.filter(
                (item) => !listChecked.includes(item?.product)
            );
            state.orderItems = itemOrder;
        },
        resetOrder: (state) => {
            state.orderItems = [];
            state.shippingAddress = {};
            state.paymentMethod = "";
            state.itemsPrice = 0;
            state.shippingPrice = 0;
            state.taxPrice = 0;
            state.totalPrice = 0;
            state.user = "";
            state.isPaid = false;
            state.paidAt = "";
            state.isDelivered = false;
            state.deliveredAt = "";
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addOrderProduct,
    removeOrderProduct,
    increaseAmount,
    decreaseAmount,
    removeAllOrderProduct,
    resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
