import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {useData} from './useData';

export const QueryTest = () => {
  const styles = getStyles();
  const {firstData, secondData, isLoading} = useData();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading: {isLoading ? 'loading' : 'done'}</Text>
      <View>
        {firstData?.map((d) => (
          <View key={d.id}>
            <Text style={styles.text}>first data {d.id}</Text>
          </View>
        ))}
      </View>
      <View>
        {secondData?.map((d) => (
          <View key={d}>
            <Text style={styles.text}>{d}</Text>
          </View>
        ))}
      </View>
    </View>
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
      backgroundColor: 'red',
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
