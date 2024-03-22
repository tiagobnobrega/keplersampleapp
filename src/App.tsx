/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */
import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@amzn/react-navigation__native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@amzn/react-navigation__stack';
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from '@amzn/react-navigation__drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

type TScreen = StackScreenProps<any> & {title: string};
const Screen = ({title, navigation}: TScreen) => {
  const styles = getStyles();

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
          navigation.navigate('D', {screen: {id: 'D1'}});
        }}>
        <Text style={styles.buttonLabel}>Screen D1</Text>
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

const ScreenD1 = ({navigation}: DrawerScreenProps<any>) => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>'Screen D1'</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('A');
        }}>
        <Text style={styles.buttonLabel}>Screen A</Text>
      </TouchableOpacity>
    </View>
  );
};

const ScreenD2 = ({navigation}: DrawerScreenProps<any>) => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>'Screen D1'</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('A');
        }}>
        <Text style={styles.buttonLabel}>Screen A</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerStack = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={'D1'} component={ScreenD1} />
      <Drawer.Screen name={'D2'} component={ScreenD2} />
    </Drawer.Navigator>
  );
};

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="A"
          component={ScreenA}
          options={{title: 'screen A'}}
        />
        <Stack.Screen name="B" component={ScreenB} />
        <Stack.Screen name="D" component={DrawerStack} />
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
