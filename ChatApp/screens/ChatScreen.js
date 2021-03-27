import React,{useLayoutEffect,useState} from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Platform } from 'react-native'
import { Keyboard } from 'react-native'
import { StatusBar } from 'react-native'

import  { TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Icon, Input } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from 'react-native-vector-icons/FontAwesome'
import { auth, db } from '../firebase'
import firebase from 'firebase'
const ChatScreen = ({navigation,route}) => {
    const[input,setInput]=useState('')
    const [messages,setMessages]=useState([])
    useLayoutEffect(()=>{
     navigation.setOptions({
         title:"Chat",
        headerBackTitleVisible:false,
        headerTitle:()=>(
            <View style={{flexDirection:"row",alignItems:"center"}}>
                <Avatar rounded source={{uri:messages[0]?.data.photoURL}}/>
                <Text style={{color:"white",fontWeight:"700",fontSize:18,marginLeft:10}}>{route.params.chatName}</Text>
            </View>
        ),
        headerRight:()=>(
            <View
             style={{
                 flexDirection:"row",
                 justifyContent:"space-between",
                 width:80,
                 marginRight:20
             }}
            >
                <TouchableOpacity>
                   <FontAwesome name="video-camera" size={24} color="white"/>

                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="phone" size={24} color="white"/>
                </TouchableOpacity>
            </View>
        )
     })
    },[navigation,messages])
    function sendMessage(){
        if(input){
       Keyboard.dismiss()
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL

        })
        setInput('')
    }
}
useLayoutEffect(()=>{
    const unsubscribe=db.collection('chats').doc(route.params.id).collection('messages')
                      .orderBy('timestamp','desc').onSnapshot((snapshot)=>setMessages(snapshot.docs.map(doc=>({
                          id:doc.id,
                          data:doc.data()
                      }))
                      )
                      )
               return unsubscribe;
                    },[route])
    return (
      <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
          <StatusBar style="light"/>
          <KeyboardAvoidingView
          behavior={Platform.OS==="android"}
          style={styles.container}
          keyboardVerticalOffset={90}
          >
            
              <TouchableWithoutFeedback >
              <>
              <ScrollView style={{paddingTop:10}}>
              {messages.map(({id,data})=>(
                  data.email===auth.currentUser.email?(
                   <View key={id} style={styles.reciever} >
                       <Avatar containerStyle={{
                           position:"absolute",
                           bottom:-15,
                           left:-5
                       }} bottom={-15} right={-5} position="absolute" rounded  size={30} source={{
                           
                        uri:data.photoURL
                       }}/>
                       <Text style={styles.recieverText}>{data.message}</Text>
                   </View>
                  ):(
                     <View  key={id} style={styles.sender}>
                        <Avatar
                        containerStyle={{
                            position:"absolute",
                            bottom:-15,
                            right:-5
                        }}
                        bottom={-15} right={-5} position="absolute" rounded  size={30} source={{
                           
                            uri:data.photoURL
                           }}
                        />
                       <Text style={styles.senderText}>{data.message}</Text>
                       <Text style={styles.senderName}>{data.displayName}</Text>
                     </View>
                  )
              ))}
              </ScrollView>
              <View style={styles.footer}>
              <TextInput placeholder="Send a message" style={styles.textInput} value={input} onChangeText={(text)=>setInput(text)} 
             onSubmitEditing={sendMessage}/>
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} marginRight={10}>
                  <Icon name="send" size={24} color="#2B68E6"/>
              </TouchableOpacity>
              </View>
              </>
             </TouchableWithoutFeedback>
           
          </KeyboardAvoidingView>
      </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
     flex:1
    },
    footer:{
        flexDirection:"row",
        alignItems:'center',
        width:"100%",
        padding:15
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"transparent",
        backgroundColor:"#ECECEC",
        padding:10,
        color:'grey',
        borderRadius:30
    },
    reciever:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    sender:{
       padding:15,
       backgroundColor:"#2B68E6",
       alignSelf:"flex-start",
       borderRadius:20,
       margin:15,
       maxWidth:"80%",
       position:"relative"
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white"
    },
    recieverText:{
        color:"black",
        fontWeight:"500",
        marginLeft:10
    },
    senderText:{
        color:"white",
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15
    }

})
