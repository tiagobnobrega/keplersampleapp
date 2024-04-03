/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */
import 'react-native-gesture-handler';
import React, {useState} from 'react';
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
  const styles = getStyles();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'permanent',
        drawerStyle: styles.drawerStyle,
        drawerContentStyle: {
          backgroundColor: '#f0f',
        },
        sceneContainerStyle: {
          marginTop: 200,
          flex: 1,
          backgroundColor: '#ff0',
        },
      }}>
      <Drawer.Screen name={'D1'} component={ScreenD1} />
      <Drawer.Screen name={'D2'} component={ScreenD2} />
    </Drawer.Navigator>
  );
};

export const App = () => {
  const styles = getStyles();
  const [isTransparent, setTransparent] = useState(true);
  const [isModal, setModal] = useState(false);
  return (
    <View style={styles.wrapper}>
      <View style={styles.background}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setTransparent(!isTransparent);
          }}>
          <Text style={[styles.buttonLabel]}>
            toggle transparent card style
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModal(!isModal);
          }}>
          <Text style={[styles.buttonLabel]}>toggle presentation modal</Text>
        </TouchableOpacity>
        <Text style={[styles.title, {marginTop: 25}]}>
          This should be fully visible
        </Text>
      </View>
      <View style={styles.navContainer}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: {
                backgroundColor: isTransparent
                  ? 'transparent'
                  : 'rgba(255,0,0,0.1)',
              },
              presentation: isModal ? 'modal' : 'card',
            }}>
            <Stack.Screen
              name="A"
              component={ScreenA}
              options={{title: 'screen A'}}
            />
            <Stack.Screen name="B" component={ScreenB} />
            <Stack.Screen name="D" component={DrawerStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
    background: {
      backgroundColor: '#24db92',
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    navContainer: {
      width: '100%',
      height: '90%',
      position: 'absolute',
      bottom: 0,
    },
    drawerStyle: {
      marginTop: 200,
      backgroundColor: 'transparent',
      width: 80,
    },
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
