import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Button ,Alert, TextInput, ImageBackground, TouchableOpacity} from 'react-native';
import auth from "@react-native-firebase/auth";

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [user, setUser] = useState();
  const [go, setGo] = useState(false);
  
  function Login() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);

    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (user && go) {
      navigation.navigate("Set User Data");
    }
  }

  const create = async () => {
    const response = await fetch('http://192.168.1.125:1000/SignUp', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
    navigation.navigate("Set User Data");
  
  };
  

  // function create() {
  //   alert("mmmmmm")
  //   if (email && pass) {
  //     alert("bbbb")
  //     setGo(true);
  //   auth()
  //     .createUserWithEmailAndPassword(email, pass)
  //     .then(() => {
  //       console.log("User account created & signed in!");
  //     })
  //     .catch((error) => {
  //       if (error.code === "auth/email-already-in-use") {
  //         console.log("That email address is already in use!");
  //       }

  //       if (error.code === "auth/invalid-email") {
  //         console.log("That email address is invalid!");
  //       }
  //       console.error(error);
  //     });
  //   }
  //   else {
  //     alert("you must fill all the tabs!");
  //   }
  // }

  function check() {
    navigation.navigate("SignIn");
  }


  return(
    <ImageBackground source={require('../components/pic5.jpg')} style={styles.background}>
    <View style={styles.center}>
      <Login/>
      <TextInput
        style={styles.input}
        placeholder="Enter your mail"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.separator_small}></View>
      <TextInput
        style={styles.input}
        placeholder="Enter desired password"
        value={password}
        onChangeText={setPass}
      />
      <View style={styles.separator}></View> 
      <TouchableOpacity onPress={create} style={styles.roundButton}>
          <Text style={styles.buttonText} color={'green'}>Sign up</Text>
        </TouchableOpacity>        
      <View style={styles.separator}></View>
      <Text style={styles.text}>Returning user? </Text>
      <View style={styles.separator_small}></View>
      <Button
        title="sign in"
        onPress={check}
      />
      </View>
      </ImageBackground>  
    )

  }
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white', 
    fontSize: 15,
    fontWeight: 'bold',
  },
  roundButton: {
    borderRadius: 40,
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    width: "90%",
    fontSize: 20,
    padding: 8,
    borderColor: "blue",
    borderWidth: 0.2,
    borderRadius: 20,
  },
  separator: {
    marginTop: 30,
    // marginBottom: 20,
  },
  separator_small: {
    marginTop: 10,
    // marginBottom: 20,
  },
  text: {
    fontFamily: 'KaushanScript-Regular',
    // color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default SignUp