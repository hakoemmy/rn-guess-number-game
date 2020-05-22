import React, {useState} from 'react';
import {View, Text, 
    StyleSheet,Button,
    TouchableWithoutFeedback,
    Keyboard, Alert
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';
const {primary, accent} = colors;


const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
       setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    const confirmInputHandler = () =>{
     if(!isNaN(enteredValue)&& !(enteredValue <=0) && !(enteredValue > 99)){
        setConfirmed(true);
        setSelectedNumber(parseInt(parseInt(enteredValue)));
        setEnteredValue('');
        Keyboard.dismiss();
        return;
     }
     Alert.alert('Invalid Number!','Choose a number between 1 and 99.',
     [{text: 'Okay', style:'destructive', onPress: resetInputHandler}]);
     return;
    };

    let confirmedOutPut;
    if(confirmed){
     confirmedOutPut = (
         <Card style={styles.summaryContainer}>
             <BodyText>You selected </BodyText>
              <NumberContainer>{selectedNumber}</NumberContainer>
              <Button title="Start Game" onPress={props.onStartGame.bind(this,selectedNumber)}/>
         </Card>
     );
    }

    return (
     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
           <TitleText style={styles.title}>Start a new Game!</TitleText>
           <Card style={styles.inputContainer}>
               <BodyText>Select a Number</BodyText>
               <Input style={styles.input} blurOnSubmit 
                autoCapitalize='none' autoCorrect={false}
                keyboardType='number-pad'
                maxLength={2}
                value={enteredValue}
                onChangeText={numberInputHandler}
                 />
               <View style={styles.btnContainer}>
                   <View style={styles.btn}><Button title="Reset" onPress={resetInputHandler} color={accent}/></View>
                   <View style={styles.btn}><Button title="Confirm" onPress={confirmInputHandler} color={primary}/></View>
               </View>
           </Card>
           {confirmedOutPut}
        </View>
    </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems:'center'
    },
    title:{
       fontSize: 20,
       marginVertical: 10,
       fontFamily:'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth:'80%',
        alignItems: 'center',
    },
    btnContainer: {
     flexDirection:'row',
     width: '100%',
     justifyContent:'space-between',
     paddingHorizontal: 10
    },
    btn:{
      width: '40%'
    },
    input: {
        width: 50,
        textAlign:'center'
    },
    summaryContainer:{
        marginTop: 20,
        alignItems:'center'
    }
});

export default StartGameScreen;
