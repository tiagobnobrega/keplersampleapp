/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */

import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

export const App = () => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Name</Text>
    </View>
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
  });
