import React, { useState } from 'react';
import {
    StyleSheet, View, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import { theme } from '../core/theme';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../components/responsive-ratio';
import TextInput from '../components/TextInput';

function SecondRoute () {
    const [Yarn_Count, setYarnCount] = useState(0.0)
    const [Cotton_Rate, setCottonRate] = useState(0.0)
    const [Auto_Cotton_Ratekg, setCottonRateKg] = useState(0.0)
    const [Yield, setYield] = useState(0.0)
    const [Waste_Recovery, setWasteRecovery] = useState(0.0)
    const [Conversion_Cost, setCoversionCost] = useState(0.0)
    const [Result, setResult] = useState(0.0)

    const onChangedYarn_Count = (text) => {
       setYarnCount(text)
       displayResult(text,Auto_Cotton_Ratekg,Yield,Waste_Recovery,Conversion_Cost)
    }

    const onChangedCotton_Rate = (text) => {
       setCottonRate(text)
       let t1 = parseFloat(text)/355.6
       t1 = t1.toFixed(2)
       if (!isNaN(t1)) {
           setCottonRateKg(t1)
       } 
       
       displayResult(Yarn_Count,t1,Yield,Waste_Recovery,Conversion_Cost)
    }

    const onChangedYield = (text) => {
       setYield(text)
       displayResult(Yarn_Count,Auto_Cotton_Ratekg,text,Waste_Recovery,Conversion_Cost)
    }

    const onChangedWaste_Recovery = (text) => {
       setWasteRecovery(text)
       displayResult(Yarn_Count,Auto_Cotton_Ratekg,Yield,text,Conversion_Cost)
    }

    const onChangedConversion_Cost = (text) => {
       setCoversionCost(text)
       displayResult(Yarn_Count,Auto_Cotton_Ratekg,Yield,Waste_Recovery,text)
    }

    const displayResult = (yarnCount,autoCottonRate,yieldVal,wasteRecovery,conversionCost) => {
       //Cotton one kg rate + ((100-yield)% of One kg cotton rate)+(count × conversation cost)- waste recovery

       let firstStep = parseFloat(autoCottonRate) * (100-yieldVal) / 100;
       
       firstStep = parseFloat(autoCottonRate) + firstStep;
       let secondStep = firstStep + (parseFloat(yarnCount) * parseFloat(conversionCost));
       
       let result = secondStep - parseFloat(wasteRecovery)
    //    let actualCost = parseFloat(autoCottonRate) * parseFloat(yieldVal) / 100;
    //    let yarnValue = parseFloat(yarnCount) * parseFloat(conversionCost)
    //    let t1 = parseFloat(wasteRecovery) + parseFloat(yarnValue)
    //    let result = parseFloat(actualCost) - parseFloat(t1)
       result = Math.abs(result)
       
       console.log("result: " + result)
       if (isNaN(result)) {
           setResult("Invalid")
       } else {
           setResult(result.toFixed(2))
       }
    }

   return (
       <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: wp(2) }}>
           <InPutText label='Yarn Count' keyboardType="phone-pad" labelValue='' outlineColor={'#d1d1d1'} onChangeText={onChangedYarn_Count} maxLength={6}/>
           <InPutText label='Cotton Rate' keyboardType="phone-pad" labelValue='Rs/ Candy' outlineColor={'#d1d1d1'} onChangeText={onChangedCotton_Rate} maxLength={6}/>
           <InPutText label='Cotton Rate' keyboardType="phone-pad" labelValue='Rs/kg' outlineColor={'#d1d1d1'} value={Auto_Cotton_Ratekg} maxLength={6} editable={false}/>

           <InPutText label='Yield' keyboardType="phone-pad" labelValue='%' outlineColor={'#d1d1d1'} onChangeText={onChangedYield} maxLength={6}/>
           <InPutText label='Waste Recovery' keyboardType="phone-pad" labelValue='Rs/kg' outlineColor={'#d1d1d1'} onChangeText={onChangedWaste_Recovery} maxLength={6}/>
           {/* <InPutText label='Material Cost' labelValue='Rs/kg' outlineColor={'#d1d1d1'} onChangeText={onChangedMaterial_Cost} /> */}
           <InPutText label='Conversion Cost' keyboardType="phone-pad" labelValue='Rs/k/Count' outlineColor={'#d1d1d1'} onChangeText={onChangedConversion_Cost} maxLength={6}/>
           {/* <InPutText label='Commission' labelValue='%' outlineColor={'#d1d1d1'} onChangeText={onChangedCommission} />
           <InPutText label='Other Exp' labelValue='Rs/kg' outlineColor={'#d1d1d1'} onChangeText={onChangedOther_Exp} /> */}
       <View style={{
           flexDirection: 'row',
           alignItems: 'center', marginTop: hp(1)
       }}>
           <View style={{ width: wp(40), }}><Text style={styles.label}>Yarn Cost</Text></View>
           <View style={{ alignItems: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
               <Text style={styles.value}>{Result}</Text>
               <Text style={styles.VAlue1}>Rs/kg</Text>
           </View>
       </View>
       {/* <InPutText label='Yarn Rate' labelValue='Rs/kg' outlineColor={'#d1d1d1'} />
       <InPutText label='Profit' labelValue='Rs/kg' outlineColor={'#d1d1d1'} /> */}
       {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
           <Button mode="contained"
               onPress={onPressed}
               style={{ width: wp(74) }}
               labelStyle={{
                   textTransform: 'capitalize', fontSize: 18, color: '#FFFFFF',
                   fontFamily: "Poppins-SemiBold"
               }}>
               Reset
           </Button>
           <TouchableOpacity
               onPress={onPressed}
               style={{
                   width: wp(14), height: wp(14), backgroundColor: theme.colors.primary,
                   borderRadius: wp(7), justifyContent: 'center', alignItems: 'center', marginVertical: 10
               }}>
               <Iconicons name='share-social-outline' size={hp(2.5)} color='white' />
           </TouchableOpacity>
       </View> */}

   </ScrollView>

)}

function FirstRoute() {
    const [kapas, setKapasValue] = useState(0.0)
    const [Expenses, setExpense] = useState(0.0)
    const [Cotton_Seed, setCottoSeed] = useState(0.0)
    const [Our_Turn, setOutTurn] = useState(0.0)
    const [Shortage, setShortage] = useState(0.0)
    const [Result, setResult] = useState(0.0)


    const onChangedKapas = (text) => {
        setKapasValue(text)
        displayResult(text, Expenses, Cotton_Seed, Our_Turn, Shortage)
    }

    const onChangedExpense = (text) => {
        setExpense(text)
        displayResult(kapas, text, Cotton_Seed, Our_Turn, Shortage)
    }

    const onChangedCotton_Seed = (text) => {
        setCottoSeed(text)
        displayResult(kapas, Expenses, text, Our_Turn, Shortage)
    }

    const onChangedOut_Turn = (text) => {
        setOutTurn(text)
        displayResult(kapas, Expenses, Cotton_Seed, text, Shortage)
    }

    const onChangedShortage = (text) => {
        setShortage(text)
        displayResult(kapas, Expenses, Cotton_Seed, Our_Turn, text)
    }

    const displayResult = (kapas, expenses, cottonSeed, outTurn, shortage) => {
        let t1 = parseFloat(cottonSeed) * (100 - (parseFloat(outTurn) + parseFloat(shortage)))
        let t2 = (parseFloat(kapas) + parseFloat(expenses)) * 100
        let t3 = parseFloat(t1) - parseFloat(t2)
        t3 = Math.abs(t3)
        let t4 = parseFloat(t3) * 355.60
        let t5 = 20 * parseFloat(outTurn)

        let result = parseFloat(t4) / t5;

        if (isNaN(result)) {
            setResult("Invalid")
        } else {
            setResult(Math.round(result))
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: wp(2) }}>
            <InPutText label='Kapas' keyboardType="phone-pad" labelValue='Rs/ 20 kg' outlineColor={'#eee'} onChangeText={text => onChangedKapas(text)} maxLength={6} />
            <InPutText label='Expenses' keyboardType="phone-pad" labelValue='Rs/ 20 kg' outlineColor={'#eee'} onChangeText={text => onChangedExpense(text)} maxLength={6} />
            <InPutText label='Cotton Seed' keyboardType="phone-pad" labelValue='Rs/ 20 kg' outlineColor={'#eee'} onChangeText={text => onChangedCotton_Seed(text)} maxLength={6} />
            <InPutText label='Our Turn' keyboardType="phone-pad" labelValue='%' outlineColor={'#eee'} onChangeText={text => onChangedOut_Turn(text)} maxLength={6} />
            <InPutText label='Shortage' keyboardType="phone-pad" labelValue='%' outlineColor={'#eee'} onChangeText={text => onChangedShortage(text)} maxLength={6} />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center', marginTop: hp(1)
            }}>
                <View style={{ width: wp(40), }}><Text style={styles.label}>Cost Of Cotton</Text></View>
                <View style={{ alignItems: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.value}>{Result}</Text>
                    <Text style={styles.VAlue1}>Rs/Candy</Text>
                </View>
            </View>
        </View>



    )
}
function ThirdRoute() {
    const [Cotton_Rate, setCottonRate] = useState(0.0)
    const [Expenses, setExpense] = useState(0.0)
    const [Exchange_Rate, setExchangeRate] = useState(0.0)
    const [Result, setResult] = useState(0.0)


    const onChangedCotton_Rate = (text) => {
        setCottonRate(text)
        displayResult(text, Expenses, Exchange_Rate)
    }

    const onChangedExpenses = (text) => {
        setExpense(text)
        displayResult(Cotton_Rate, text, Exchange_Rate)
    }

    const onChangedExchange_Rate = (text) => {
        setExchangeRate(text)
        displayResult(Cotton_Rate, Expenses, text)
    }

    const displayResult = (cottonRate, expenses, exchangeRate) => {
        let t1 = parseFloat(cottonRate) + parseFloat(expenses)
        let t2 = t1 * 100
        let t3 = 355.60 * parseFloat(exchangeRate)
        let t4 = t3 * 2.205



        let result = t2 / t4;

        if (isNaN(result)) {
            setResult("Invalid")
        } else {
            setResult(result.toFixed(2))
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: wp(2) }}>

            <InPutText label='Cotton Rate' keyboardType="phone-pad" labelValue='Rs/Candy' outlineColor={'#eee'} onChangeText={text => onChangedCotton_Rate(text)} maxLength={6} />
            <InPutText label='Expenses' keyboardType="phone-pad" labelValue='Rs/Candy' outlineColor={'#eee'} onChangeText={text => onChangedExpenses(text)} maxLength={6} />
            <InPutText label='Exchange Rate' keyboardType="phone-pad" labelValue='USD/INR' outlineColor={'#eee'} onChangeText={text => onChangedExchange_Rate(text)} maxLength={6} />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center', marginTop: hp(2)
            }}>
                <View style={{ width: wp(40), }}><Text style={styles.label}>Export Rate</Text></View>
                <View style={{ alignItems: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.value}>{Result}</Text>
                    <Text style={styles.VAlue1}>Cents/Bales</Text>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center', marginTop: hp(1)
            }}>
                {/* <View style={{ width: wp(40), }}><Text style={styles.label}>Export Rate</Text></View>
            <View style={{ alignItems: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.value}>{Result}</Text>
                <Text style={styles.VAlue1}>USD/kg</Text>
            </View> */}
            </View>
        </View>



    );
}

const InPutText = (props) => {
    console.log('hello')
    return (
        <View style={{
            backgroundColor: '#fff', width: wp(96), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
        }}>
            <View style={{ width: wp(30), alignItems: 'flex-start', justifyContent: 'center', paddingTop: hp(1.5) }}>
                <Text style={{
                    fontSize: hp(1.9),
                    color: theme.colors.text,
                    fontFamily: "Poppins-Regular"
                }}>{props.label}</Text></View>
            <View style={{ width: wp(43), marginVertical: -4 }}><TextInput
                returnKeyType="next"
                // require={true}

                maxLength={50}
                onChangeText={props.onChangeText}
                {...props}
            /></View>
            <View style={{ width: wp(18), alignItems: 'flex-start', justifyContent: 'center', paddingTop: hp(1.5) }}>
                <Text style={{
                    fontSize: hp(1.7),
                    color: '#555555',
                    opacity: 0.5,
                    fontFamily: "Poppins-Regular",
                    width: wp(18)
                }} numberOfLines={2}>{props.labelValue}</Text></View>

        </View>
    )
}

export { FirstRoute, SecondRoute, ThirdRoute, InPutText }

const onPressed = () => {
    console.log('reset')
}

const styles = StyleSheet.create({
    label: {
        fontSize: hp(2.5),
        color: theme.colors.primary,
        fontFamily: "Poppins-Regular"
    },
    value: {
        fontSize: hp(2.5),
        color: theme.colors.primary,
        fontFamily: "Poppins-Bold",
        marginRight: wp(5)
    },
    VAlue1: {
        fontSize: hp(2),
        color: theme.colors.text,
        fontFamily: "Poppins-Regular"
    }

})
