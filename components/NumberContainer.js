import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const {primary,accent} = colors;
const NumberContainer = props => {
    return (
        <View style={{...props.style, ...styles.numberContainer}}>
           <Text style={styles.number}>{props.children}</Text>
       </View>
    )
}
const styles = StyleSheet.create({
  numberContainer: {
    borderWidth: 2,
    borderColor: accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  number:{
      color: accent,
      fontSize: 22,

  }
});
export default NumberContainer;

