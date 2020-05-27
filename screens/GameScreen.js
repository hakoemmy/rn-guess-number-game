import React, {useState, useRef, useEffect} from 'react';
import {View,Text, StyleSheet,
     Alert, ScrollView, FlatList,
     Dimensions
    } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import {Ionicons} from '@expo/vector-icons';


const renderListItem = (listItemLength, itemData) => {
    return(
    <View style={styles.listItem}>
        <BodyText>#{listItemLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
    );
};
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
    const initialGuess = generateNumberBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length);
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
          currentLow.current = currentGuess + 1;
      }
      const nextNumber = generateNumberBetween(currentLow.current, currentHigh.current, currentGuess);
      setCurrentGuess(nextNumber);
      //setRounds(curRounds => curRounds + 1);
      setPastGuesses(curPastGuesses =>[nextNumber.toString(),...curPastGuesses]);

    };
    return(
        <View style={styles.screen}>
             <BodyText>Computer's Guess</BodyText>
             <NumberContainer>{currentGuess}</NumberContainer>
             <Card style={styles.btnContainer}>
                  <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                      <Ionicons name="md-remove" size={24} color='white'/>
                  </MainButton>
                  <MainButton onPress={nextGuessHandler.bind(this,'greater')}>
                     <Ionicons name="md-add" size={24} color='white'/>
                  </MainButton>
             </Card>
           <View style={styles.listContainer}>
             {/* <ScrollView contentContainerStyle={styles.list}>
             {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
             </ScrollView> */}
             <FlatList keyExtractor={(item) => item}
              data={pastGuesses} 
              renderItem={renderListItem.bind(this, pastGuesses.length)}
              contentContainerStyle={styles.list}/>
         </View>
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
      marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
      width: 400,
      maxWidth:'90%' 
   },
   listContainer:{
     width: Dimensions.get('window').width > 350 ? '60%': '80%',
     flex: 1
   },
   list:{
     flexGrow: 1,
     //alignItems:'center',
     justifyContent:'flex-end'
   },
   listItem:{
       borderColor: '#ccc',
       borderWidth: 1,
       padding: 15,
       marginVertical: 10,
       backgroundColor: 'white',
       flexDirection:'row',
       justifyContent:'space-between',
       width: '100%'
   }
});

export default GameScreen;
