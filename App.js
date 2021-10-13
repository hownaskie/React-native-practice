/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { api } from './src/components/Api';
import Tasks from './src/components/Tasks';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks(tasks => setTasks(tasks), error => alert(error));
  }, [])

  const fetchTasks = async (success, error) => {
    await api.get('/')
      .then((res) => success(res.data))
      .catch((err) => error(err.message))
  }

  const fetchTask = async (id, success, error) => {
    await api.get(`/${id}`)
      .then((res) => success(res.data))
      .catch((err) => error(err))
  }

  const addTask = async (task) => {
    await api.post('/', task)
      .then((res) => setTasks([...tasks, res.data]))
      .catch((err) => alert(err))
  }

  const deleteTask = async (id) => {
    await api.delete(`/${id}`).then(res => setTasks(tasks.filter((task) => task.id !== id)))
  }

  const completeTask = async (id) => {
    fetchTask(id, async (taskItem) => {
      const updateTask = { ...taskItem, isCompleteTask: !taskItem.isCompleteTask };
      await api.put(`/${id}`, updateTask)
        .then((res) => {
          setTasks(tasks.map((task) => task.id === id ? { ...task, isCompleteTask: res.data.isCompleteTask } : task))
        })
        .catch((err) => alert(err.message))
    }, (error) => alert(error.message))
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.taskWrapper}>
          <Header title={'My Tasks'} />
          <View style={styles.items}>
            {tasks.length > 0 ? (
              <Tasks tasks={tasks} onCompleteTask={(id) => completeTask(id)} onDeleteTask={(id) => deleteTask(id)} />
            ) : (
              <Text style={styles.noTask}>There is no current task</Text>
            )}
          </View>
        </View>
        <Footer onAddTask={addTask} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },
  taskWrapper: {
    paddingTop: 35,
    paddingHorizontal: 20
  },
  items: {
    marginTop: 30
  },
  noTask: {
    fontSize: 14,
  },
});

export default App;
