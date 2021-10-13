
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Task from './Task';

const Tasks = ({ tasks, onCompleteTask, onDeleteTask }) => {
    return (
        <>
            {
                tasks.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => onCompleteTask(item.id)}>
                            <Task task={item} onDeleteTask={() => onDeleteTask(item.id)} />
                        </TouchableOpacity>
                    )
                })
            }
        </>
    );
}

export default Tasks;