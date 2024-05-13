/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GlobalNav} from './components/navigation/GlobalNav';
import {TVFocusGuideView} from '@amzn/react-native-kepler';

export const App = () => {
  const styles = getStyles();
  const [dynamicSize, setDynamicSize] = useState(200);
  return (
    <View style={styles.container}>
      <GlobalNav />
      {/*<View style={styles.bgLine} />*/}
      {/*@ts-expect-error TVFocusGuideView types are broken*/}
      <TVFocusGuideView autoFocus={true} style={styles.ctaContainer}>
        {[...Array(10).keys()].map((item, index) => {
          const operation = Math.random() > 0.5 ? 'add' : 'subtract';
          const amount = operation === 'add' ? 100 : -100;
          return (
            <TouchableOpacity
              style={styles.cta}
              onPress={() => {
                setDynamicSize(dynamicSize + amount);
              }}>
              <Text style={styles.title}>
                {operation}: {amount}
              </Text>
            </TouchableOpacity>
          );
        })}
      </TVFocusGuideView>
      <View style={[styles.dynamic, {width: dynamicSize}]}>
        {/*@ts-expect-error TVFocusGuideView types are broken*/}
        <TVFocusGuideView autoFocus={true} style={styles.ctaContainer}>
          {[...Array(10).keys()].map((item, index) => {
            return (
              <TouchableOpacity style={styles.cta} onPress={() => null}>
                <Text style={styles.title}>Item: {index}</Text>
              </TouchableOpacity>
            );
          })}
        </TVFocusGuideView>
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
    bgLine: {
      position: 'absolute',
      left: 0,
      bottom: 20,
      height: 200,
      width: '100%',
      backgroundColor: '#F00',
    },
    dynamic: {
      position: 'absolute',
      right: 150,
      bottom: 20,
      height: '100%',
      backgroundColor: '#00F',
    },
  });
