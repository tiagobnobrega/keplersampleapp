/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */

import React, {useCallback, useState, useSyncExternalStore} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {QueryTest} from './QueryTest';

function delay(t: number, cb: () => void) {
  return new Promise((resolve) =>
    setTimeout(() => {
      cb();
      resolve(undefined);
    }, t),
  );
}

export const createTodosStore = (name = 'Todo') => {
  let nextId = 0;
  let todos = [{id: nextId++, text: `${name} #1`}];
  let listeners: any[] = [];

  function emitChange() {
    for (const listener of listeners) {
      listener();
    }
  }
  return {
    async addTodo(t = 2000) {
      await delay(t, () => {
        todos = [...todos, {id: nextId++, text: `${name} #` + nextId}];
        emitChange();
      });
    },
    subscribe(listener: any) {
      listeners = [...listeners, listener];
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    getSnapshot() {
      return todos;
    },
  };
};

const myTodosStore = createTodosStore();
const otherTodosStore = createTodosStore('Other');

export const App = () => {
  const queryClient = new QueryClient();
  const [syncState, setSyncState] = useState('');
  const styles = getStyles();

  const myTodos = useSyncExternalStore(
    myTodosStore.subscribe,
    myTodosStore.getSnapshot,
  );

  const otherTodos = useSyncExternalStore(
    otherTodosStore.subscribe,
    otherTodosStore.getSnapshot,
  );

  const handlePress = useCallback(() => {
    myTodosStore.addTodo();
    otherTodosStore.addTodo(1000);
    setSyncState(Date.now().toString());
  }, []);
  return (
    <ImageBackground
      source={require('./assets/background.png')}
      style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={handlePress}>
          <Text style={styles.text}>Add todo</Text>
        </TouchableOpacity>

        <View>
          {myTodos.map((todo) => (
            <Text style={styles.text} key={todo.id}>
              {todo.text}
            </Text>
          ))}
        </View>

        <View>
          {otherTodos.map((todo) => (
            <Text style={styles.text} key={todo.id}>
              {todo.text}
            </Text>
          ))}
        </View>
        <View>
          <Text style={styles.text}>{syncState}</Text>
        </View>
      </View>
      <QueryClientProvider client={queryClient}>
        <QueryTest />
      </QueryClientProvider>
    </ImageBackground>
  );
};

const getStyles = () =>
  StyleSheet.create({
    btn: {
      width: 200,
    },
    background: {
      color: 'white',
      flex: 1,
      flexDirection: 'column',
    },
    container: {
      flex: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerContainer: {
      marginLeft: 200,
    },
    headerText: {
      color: 'white',
      fontSize: 80,
      marginBottom: 10,
    },
    subHeaderText: {
      color: 'white',
      fontSize: 40,
    },
    links: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: 600,
    },
    image: {
      flex: 1,
      paddingLeft: 150,
    },
    textContainer: {
      justifyContent: 'center',
      flex: 1,
      marginLeft: 190,
    },
    text: {
      color: 'white',
      fontSize: 40,
    },
  });
