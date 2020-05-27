import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import colors from '../constants/colors';
import TitleText from '../components/TitleText';
const {primary} = colors;

const Header = props => {
    return(
        <View style={{
            ...styles.headerBase,
            ...Platform.select({
                  ios: styles.headerIOs,
                  android: styles.headerAndroid
                }) }}>
          <TitleText style={styles.title}>{props.title}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBase:{
        width:'100%',
        height: 90,
        paddingTop: 36,
        alignItems:'center',
        justifyContent:'center',
    },
    headerIOs:{
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerAndroid:{
        backgroundColor: primary,
        borderBottomColor: 'transparent',
        borderBottomWidth:  0
    },
    title:{
        color: Platform.OS === 'ios'? primary: 'white'
    }
});

export default Header;
