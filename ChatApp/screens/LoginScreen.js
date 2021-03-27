import React,{useState,useEffect} from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'react-native'
import { View, Text,StyleSheet } from 'react-native'
import {Button,Input,Image} from 'react-native-elements'
import {auth} from '../firebase'


const LoginScreen = ({navigation}) => {
   
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const signIn=()=>{
     auth.signInWithEmailAndPassword(email,password).catch((error)=>alert(error))
    }

    useEffect(()=>{
        const unsubscribe=  auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.push("Home")
            }
            })
            return unsubscribe;
    },[])
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light"/>
            <Image source={{
                uri:"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
            }}
            style={{width:200,height:200}}
            />
           <View style={styles.inputContainer}>
               <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text)=>setEmail(text)}/>
               <Input placeholder="Password" secureTextEntry type="password" value={password}  onChangeText={(text)=>setPassword(text)} onSubmitEditing={signIn}/>
           </View >
          
           <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
           <Button containerStyle={styles.button} type="outline" title="Register" onPress={()=>navigation.navigate('Register')}/>
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles=StyleSheet.create({
    container:{
  flex:1,
  alignItems:"center",
  justifyContent:"center",
  padding:10,
backgroundColor:'white'
},
text:{
    marginLeft:20
},
inputContainer:{
width:300
},
button:{
width:200,
marginTop:10
}

})

