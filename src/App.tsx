/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@amzn/react-navigation__native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@amzn/react-navigation__stack';
import {enableScreens} from '@amzn/react-native-screens';

enableScreens();

const Stack = createStackNavigator();

type TScreen = StackScreenProps<any> & {title: string};
const Screen = ({title, navigation}: TScreen) => {
  const styles = getStyles();

  useEffect(() => {
    console.log(`Screen mounted: ${title}`);
    return () => console.log(`Screen UNmounted: ${title}`);
  }, [title]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('A');
        }}>
        <Text style={styles.buttonLabel}>Screen A</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('B');
        }}>
        <Text style={styles.buttonLabel}>Screen B</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('C');
        }}>
        <Text style={styles.buttonLabel}>Screen C</Text>
      </TouchableOpacity>
    </View>
  );
};

const ScreenA = (props: StackScreenProps<any>) => {
  return <Screen title={'Screen A'} {...props} />;
};

const ScreenB = (props: StackScreenProps<any>) => {
  return <Screen title={'Screen B'} {...props} />;
};

const ScreenC = (props: StackScreenProps<any>) => {
  return <Screen title={'Screen C'} {...props} />;
};
export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // if set to true, the app will crash.
        detachInactiveScreens={false}>
        <Stack.Screen
          name="A"
          component={ScreenA}
          options={{title: 'screen A'}}
        />
        <Stack.Screen name="B" component={ScreenB} />
        <Stack.Screen name="C" component={ScreenC} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: '#ddd',
      width: '100%',
      height: '100%',
      padding: 30,
      alignItems: 'center',
    },
    title: {
      fontSize: 42,
      fontWeight: 'bold',
      color: '#444',
    },
    button: {
      padding: 8,
      backgroundColor: '#444',
      marginTop: 10,
    },
    buttonLabel: {
      color: '#fff',
      fontSize: 30,
    },
  });
