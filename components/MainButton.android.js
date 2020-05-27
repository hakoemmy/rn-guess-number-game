import React from 'react';
import { View, Text, StyleSheet, 
    TouchableOpacity, 
    TouchableNativeFeedback,
    Platform 
} from 'react-native';
import colors from '../constants/colors';
const {primary} = colors;
const MainButton = props => {

    let ButtonComponent = Platform.Version >= 21 ? TouchableNativeFeedback: TouchableOpacity;
      
    return ( 
        <View style={styles.btnContainer}>
         <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
             <View style={styles.button}>
                 <Text style={styles.buttonText}>{props.children}</Text>
             </View>
         </ButtonComponent>
        </View>
         );

};

const styles = StyleSheet.create({
    button:{
        backgroundColor: primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25, 
    },
    buttonText:{
      color:'white',
      fontFamily:'open-sans',
      fontSize: 18
    },
    btnContainer:{
        borderRadius: 25,
        overflow: 'hidden'
    }
});

export default MainButton;

