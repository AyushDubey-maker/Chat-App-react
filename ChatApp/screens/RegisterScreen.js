import React, { useState, useLayoutEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";
import * as Google from "expo-google-app-auth";
const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const signInGoogle = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        androidClientId:
          "74169007198-i0vl4fpihakl17o3kqoadg01kch7d8ab.apps.googleusercontent.com",
      });

      if (type === "success") {
        setUsername(user.name);
        setEmail(user.email);

        setImageUrl(user.photoUrl);
      } else {
        console.log("Cancelled");
      }
    } catch (e) {
      console.log("Error :", e);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);
  //Here we are creating the user and also storing the username and imageUrl by Update Profile.
  //Without updateProfile we can only store email/password.
  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
          photoURL:
            imageUrl ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((error) => alert(error.message));
    setEmail("");
    setUsername("");
    setImageUrl("");
    setPassword("");
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.text}>Create an Account:</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Username"
          autoFocus
          type="text"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Pic URL (optional)"
          autoFocus
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      {imageUrl?(
           <></>
      ):(

      <Button
        containerStyle={styles.button}
        type="outline"
        title="Sign In Google"
        onPress={signInGoogle}
      />
      )}
      <Button
        containerStyle={styles.button}
        title="Register"
        raised
        onPress={register}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  text: {
    marginBottom: 50,
    fontSize: 25,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
