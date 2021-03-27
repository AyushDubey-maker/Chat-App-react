import React,{useLayoutEffect,useEffect,useState} from 'react'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Button } from 'react-native'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import {auth,db} from "../firebase"
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'
const HomeScreen = ({navigation}) => {
    const [chats,setChats]=useState([])


    useEffect(()=>{
     const unsubscribe=db.collection('chats').onSnapshot(snapshot=>(
         setChats(snapshot.docs.map(doc=>({
             id:doc.id,
             data:doc.data()
         })))
     ))
     return unsubscribe
    },[])
    useLayoutEffect(()=>{
     navigation.setOptions({
         title:"Chat",
         headerStyle:{backgroundColor:"#fff"},
         headerTitleStyle:{color:"black"},
         headerTintColor:"black",
         headerLeft:()=>(
             <View style={{marginLeft:20}}>
                 <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
                 <Avatar rounded source={{uri:auth?.currentUser?.photoURL}} />
             </TouchableOpacity>
             </View>
         ),
         headerRight:()=>(
             <View style={{
                 flexDirection:"row",
                 justifyContent:"space-between",
                 width:80,
                 marginRight:20
             }}>
              <TouchableOpacity activeOpacity={0.5}>
               <AntDesign name="camerao" size={24} color="black"/>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate("AddChat")}>
                  <SimpleLineIcons name="pencil" size={24} color="black"/>
              </TouchableOpacity>
             </View>
         ),

     })
    },[navigation])
    function signOut(){
    auth.signOut().then(()=>{
        navigation.replace("Login")
    })
    }
    const enterChat=(id,chatName)=>{
        navigation.navigate('Chat',{
            id:id,
            chatName:chatName
        })
    }
    return (
   <SafeAreaView>
       <ScrollView style={{height:"100%"}}>
           {chats.map(({id,data:{chatName}})=>(

       <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
           ))}
     
       </ScrollView>
   </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
