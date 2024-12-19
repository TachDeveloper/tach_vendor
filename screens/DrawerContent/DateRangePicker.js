import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';

const DateRangePicker = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isStartPickerVisible, setStartPickerVisible] = useState(false);
    const [isEndPickerVisible, setEndPickerVisible] = useState(false);
    const [tempDate, setTempDate] = useState('');
    const [isStartPicker, setIsStartPicker] = useState(true);

    const handleConfirmDate = () => {
        if (isStartPicker) {
            setStartDate(tempDate);
        } else {
            setEndDate(tempDate);
        }
        setStartPickerVisible(false);
        setEndPickerVisible(false);
    };

    const renderDatePicker = () => {
        const date = new Date();
        const years = Array.from({ length: 50 }, (_, i) => date.getFullYear() - i);
        return (
            <View style={styles.datePicker}>
                <Text>Select a Date:</Text>
                <View style={styles.datePickerButtons}>
                    {years.map((year) => (
                        <TouchableOpacity key={year} onPress={() => {
                            const formattedDate = `${year}-01-01`; // Default to January 1st of the selected year
                            setTempDate(formattedDate);
                            handleConfirmDate();
                        }}>
                            <Text style={styles.datePickerOption}>{year}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Date Range</Text>

            <Button title="Select Start Date" onPress={() => {
                setIsStartPicker(true);
                setTempDate(startDate);
                setStartPickerVisible(true);
            }} />
            <Text>Start Date: {startDate || 'Not selected'}</Text>

            <Button title="Select End Date" onPress={() => {
                setIsStartPicker(false);
                setTempDate(endDate);
                setEndPickerVisible(true);
            }} />
            <Text>End Date: {endDate || 'Not selected'}</Text>

            {startDate && endDate && (
                <Text style={styles.rangeText}>
                    Selected Range: {startDate} - {endDate}
                </Text>
            )}

            <Modal
                transparent={true}
                animationType="slide"
                visible={isStartPickerVisible || isEndPickerVisible}
                onRequestClose={() => {
                    setStartPickerVisible(false);
                    setEndPickerVisible(false);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {renderDatePicker()}
                        <Button title="Cancel" onPress={() => {
                            setStartPickerVisible(false);
                            setEndPickerVisible(false);
                        }} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    rangeText: {
        marginTop: 20,
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    datePicker: {
        marginVertical: 10,
        alignItems: 'center',
    },
    datePickerButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    datePickerOption: {
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        textAlign: 'center',
    },
});

export default DateRangePicker;
