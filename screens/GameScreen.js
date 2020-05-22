import React, {useState, useRef, useEffect} from 'react';
import {View,Text, StyleSheet, Button, Alert} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';


const generateNumberBetween = (max, min, exclude) =>{
    min = Math.ceil(min);
    max = Math.floor(max);

    const rndNumber = Math.floor(Math.random() * (max -min) + min);
    if(rndNumber === exclude){
        return generateNumberBetween(max, min, exclude);
    }else{
        return rndNumber;
    }
}
const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(
          generateNumberBetween(1, 100, props.userChoice)
        );
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(rounds);
        }
    },[currentGuess, userChoice,onGameOver]);
   const nextGuessHandler = direction => {
     if((direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)){
        Alert.alert('Don\'t lie! Right?','You know that this is wrong...!', [{text: 'Sorry!', style:'cancel'}]);
        return;
      }
      if(direction === 'lower'){
         currentHigh.current = currentGuess;
      }else{
          currentLow.current = currentGuess;
      }
      const nextNumber = generateNumberBetween(currentLow.current, currentHigh.current, currentGuess);
      setCurrentGuess(nextNumber);
      setRounds(curRounds => curRounds + 1);

    };
    return(
        <View style={styles.screen}>
             <BodyText>Computer's Guess</BodyText>
             <NumberContainer>{currentGuess}</NumberContainer>
             <Card style={styles.btnContainer}>
                  <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')}/>
                  <Button title="GREATER" onPress={nextGuessHandler.bind(this,'greater')}/>
             </Card>
        </View>
    )
}
const styles = StyleSheet.create({
   screen: {
       flex: 1,
       padding: 10,
       alignItems:'center'
   },
   btnContainer:{
      flexDirection:'row',
      justifyContent:'space-around',
      marginTop: 20,
      width: 300,
      maxWidth:'80%' 
   }
});

export default GameScreen;
