/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */
import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GlobalNav} from './components/navigation/GlobalNav';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

type TScreen = StackScreenProps<any> & {title: string};
const Screen = ({title, navigation}: TScreen) => {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <GlobalNav />
      <View style={styles.ctaContainer}>
        {[...Array(10).keys()].map((item, index) => {
          return (
            <TouchableOpacity onPress={() => null}>
              <Text style={styles.title}>Item: {index}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
      alignItems: 'center',
    },
    title: {
      fontSize: 42,
      fontWeight: 'bold',
      color: '#444',
    },
    ctaContainer: {
      backgroundColor: 'rgba(0,255,0,0.3)',
      padding: 20,
    },
    cta: {
      padding: 8,
      backgroundColor: '#dddd50',
      marginVertical: 10,
    },
  });
