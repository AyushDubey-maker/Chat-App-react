import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button,Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'
const AddChatScreen = ({navigation}) => {
    const [input,setInput]=useState('')
    useLayoutEffect(()=>{
     navigation.setOptions({
         title:"Add a new Chat",
         headerStyle:{backgroundColor:"#fff"},
         headerTitleStyle:{color:"black"},
         headerTintColor:"black",

     })
    },[navigation])
  const addChat= async()=>{
      if(input){
      await db.collection('chats').add({
          chatName:input
      }).then(()=>{
          navigation.goBack()
      })
      .catch((error)=>alert(error))
  }else if(!input){
      alert("Chat Name cannot be empty")
  }
}
    return (
        <View style={styles.conatiner}>
           <Input
           value={input}
           onChangeText={(text)=>setInput(text)}
           placeholder="Enter a chat name"
           onSubmitEditing={addChat}
           autoFocus
           leftIcon={
           <Icon name="wechat" type="antdesign" size={24} color="lightblue"/>
           }/>
          <Button disabled={!input} title="Create new Chat" onPress={addChat}/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    conatiner:{
     backgroundColor:"white",
     padding:30,
     height:"100%"
    }
})
