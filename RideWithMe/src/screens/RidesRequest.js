import React, { useState, useEffect } from "react";
import { View, Button, Text, TextInput, StyleSheet, ImageBackground,KeyboardAvoidingView,TouchableWithoutFeedback, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Keyboard } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import BackButton from "../components/BackButton";
import { IP } from "../components/constants";
import RidesRequestDisplay from "../components/RidesRequestDisplay";
// import RidesRowDisplay from "../components/RidesRowDisplay";

  const RidesRequest = ({navigation}) => {
  const { currentUser } = firebase.auth();
  const {params} = useRoute();
  const [rides_requests, SetRides_requests] = useState([]);

  // console.log('rides request page!');
  useEffect(() => {
    const getRidesRequests = async () => {
      try {
        const res = await fetch("http://"+IP+":1000/ridesRequests", {
          method: "POST", 
          headers: { Accept: "application/json",
           "Content-Type": "application/json" 
          },
          body: JSON.stringify({id: currentUser.uid})});

        const rides_requests_data = await res.json();
        // console.log(rides_requests_data.rides_requests_data);
        SetRides_requests(rides_requests_data.rides_requests_data);
      } catch (error) {
        console.log("im error ", error);
      }
    };
    getRidesRequests();
  }, [currentUser.uid]);

  return (
   <ImageBackground source={require('../components/pic3.jpg')} style={theStyle.background}>
    <View style ={theStyle.center}>
      <BackButton/>
      <Text style={theStyle.bold}>RidesRequest</Text>
      <View style={theStyle.separator}></View>
      <FlatList
           data={rides_requests}
           keyExtractor = {item=> item.id}
           renderItem = {({item}) => <RidesRequestDisplay UseRides = {item}/>}
      />
    </View>
  </ImageBackground>     
  )
};


const theStyle = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  center: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    
  },
  bold: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  location: {
    container: {
        flex: 1,
        postion:'relative'
      },
      textInputContainer: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth:0,
      },
      textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
      },
      predefinedPlacesDescription: {
        color: '#1faadb',
      },
},
  separator: {
    width: 1,
    height: '8%',
  },
  root: {
    width: "100%",
    // flex: 1,
    padding: 10,
  },
  container: {
    padding: 10,
  },
  input: {
    margin: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "green",
    height: 25,
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    // margin: 10,
  },
  location: {
    container: {
        flex: 1,
      },
      textInputContainer: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth:0,
      },
      textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
      },
      predefinedPlacesDescription: {
        color: '#1faadb',
      },
}

});
  export default RidesRequest;