/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GlobalNav} from './components/navigation/GlobalNav';

export const App = () => {
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
