import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';


const Footer = ({ onAddTask }) => {
    const [task, setTask] = useState(null);

    const handleAddTask = () => {
        const addNewtask = { title: task, isCompleteTask: false }
        onAddTask(addNewtask);
        setTask(null);
    }

    return (
        <>
            <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={styles.writeTaskWrapper}>
                <TextInput
                    testID='myInput'
                    style={styles.input}
                    placeholder={'Write a task'}
                    value={task}
                    onChangeText={(text) => setTask(text)} />
                <TouchableOpacity
                    testID='myButton'
                    onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 60,
        borderColor: '#c0c0c0',
        borderWidth: 1,
        width: 300,

    },
    addWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#c0c0c0',
        borderWidth: 1,
    },
    addText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default Footer;