import React from 'react';
import {View, Text, StyleSheet,
     Button, Image, Dimensions,
     ScrollView
     } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton.android';
import colors from '../constants/colors';
const {primary} = colors;
const GameOverScreen = props => {
  return (
      
      <View style={styles.screen}>
          <TitleText>The Game is over!</TitleText>
          <View style={styles.imageContainer}>
          <Image 
          source={require('../assets/original.png')} 
          style={styles.image}
          resizeMode='cover'
          />
          {/* <Image 
          source={{uri: 'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg'}} 
          style={styles.image}
          resizeMode='cover'
          /> */}

          </View>
          <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>Your phone needed 
              <Text style={styles.highlight}> {props.roundsNumber} 
              </Text> rounds to guess the number  
              <Text style={styles.highlight}> {props.userNumber}</Text>
          </BodyText>
          </View>
         
          <MainButton onPress={props.onRestartGame}>NEW GAME!</MainButton>
      </View>

  );
}

const styles = StyleSheet.create({
     screen:{
         flex: 1,
         alignItems:'center',
         justifyContent:'center'
     },
     imageContainer:{
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius:  Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical: Dimensions.get('window').height / 30
     },
     image: {
         width: '100%',
         height: '100%'
     },
     highlight:{
        color: primary,
        fontFamily:'open-sans-bold'
     },
     resultContainer:{
         marginHorizontal: 30,
         marginVertical: Dimensions.get('window').height / 60
     },
     resultText:{
         textAlign:'center',
         fontSize: Dimensions.get('window').height < 400 ? 16 : 20
     }
});

export default GameOverScreen;
