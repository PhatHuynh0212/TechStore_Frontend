import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [],
    orderItemsSelected: [],
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
    isErrorOrder: false,
    isSuccessOrder: false,
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
                if (itemOrder.amount <= itemOrder.countInStock) {
                    itemOrder.amount += orderItem?.amount;
                    state.isSuccessOrder = true;
                    state.isErrorOrder = false;
                } else {
                    state.isErrorOrder = true;
                }
            } else {
                state.orderItems.push(orderItem);
            }
        },
        resetStateOrder: (state) => {
            state.isSuccessOrder = false;
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === idProduct
            );
            const itemOrderSelected = state?.orderItemsSelected?.find(
                (item) => item?.product === idProduct
            );
            itemOrder.amount++;
            if (itemOrderSelected) {
                itemOrderSelected.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === idProduct
            );
            const itemOrderSelected = state?.orderItemsSelected?.find(
                (item) => item?.product === idProduct
            );
            itemOrder.amount--;
            if (itemOrderSelected) {
                itemOrderSelected.amount--;
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.filter(
                (item) => item?.product !== idProduct
            );
            const itemOrderSelected = state?.orderItemsSelected?.filter(
                (item) => item?.product !== idProduct
            );
            state.orderItems = itemOrder;
            state.orderItemsSelected = itemOrderSelected;
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload;
            const itemOrder = state?.orderItems?.filter(
                (item) => !listChecked.includes(item?.product)
            );
            const itemOrderSelected = state?.orderItemsSelected?.filter(
                (item) => !listChecked.includes(item?.product)
            );
            state.orderItems = itemOrder;
            state.orderItemsSelected = itemOrderSelected;
        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload;
            const orderSelected = [];
            state.orderItems.forEach((order) => {
                if (listChecked.includes(order?.product)) {
                    orderSelected.push(order);
                }
            });
            state.orderItemsSelected = orderSelected;
        },
        resetOrder: (state) => {
            state.orderItems = [];
            state.orderItemsSelected = [];
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
            state.isErrorOrder = false;
            state.isSuccessOrder = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addOrderProduct,
    resetStateOrder,
    removeOrderProduct,
    increaseAmount,
    decreaseAmount,
    removeAllOrderProduct,
    selectedOrder,
    resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
