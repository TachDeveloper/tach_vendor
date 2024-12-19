import { configureStore } from "@reduxjs/toolkit";
import fetchNewOrdersReducer from "./Slice/NewOrdersSlice";
import fetchPastOrders from "./Slice/PastOrderSlice";
import pickupListReducer from "./Slice/PickupListSlice";
import payoutsReducer from "./Slice/PayoutSlice";
import vendorReducer from './Slice/VendorSlice';
import orderReducer from './Slice/OrderSlice'
;

export default configureStore({
    reducer: {
        newOrders: fetchNewOrdersReducer,
        pastOrders: fetchPastOrders,
        PickupList: pickupListReducer,
        Payouts : payoutsReducer,
        vendor : vendorReducer,
        order : orderReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Disable the check to avoid the warning
    }),
})