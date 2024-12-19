import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import PickupCard from '../HomeContent/PickupCard';
import { useSelector } from 'react-redux';

const PendingOrders = ({ visibleModal, handlePickupList }) => {

    const { loading, pickupList } = useSelector((state) => state.PickupList);

    // const preparingOrderCount = pickupList.filter((item) => item.status === 'preparing').length;

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {pickupList.length > 0 ? (
                <FlatList
                    data={pickupList}
                    keyExtractor={(item) => item.order_id.toString()}
                    renderItem={({ item }) => (
                        <PickupCard
                            date={item.order_date_time}
                            orderId={item.order_id}
                            orderItems={item.items}
                            setPickupList={handlePickupList}
                            orderType={item.order_type}
                            totalItems={item.total_items}
                            totalPrice={item.total_price}
                            isClick={()=>console.log("Pending Order Viewed")}
                        />
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <Text style={styles.noOrdersText}>No orders available</Text>
            )
            }
        </View>
    );
};

export default PendingOrders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    noOrdersText:{
        fontSize:20,
        margin:'auto',
        fontWeight:'bold'
    },
    
});
