import React, { useState, useEffect } from "react";
import { View, Button, Text, TextInput, StyleSheet, ImageBackground,KeyboardAvoidingView,TouchableWithoutFeedback, FlatList } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import { useRoute } from '@react-navigation/native';
import BackButton from "../components/BackButton";
import { IP } from "../components/constants";
import PassengersDisplay from "../components/PassengersDisplay";

const Passengers = ({navigation}) => {
  const { currentUser } = firebase.auth();
  const {params} = useRoute();
  const [passengers, SetPassengers] = useState([]);
  const travel_doc_id = params.params;

  useEffect(() => {
    const getPassengers = async () => {
      try {
        const res = await fetch("http://"+IP+":1000/getPassengers", {
          method: "POST", 
          headers: { Accept: "application/json",
           "Content-Type": "application/json" 
          },
          body: JSON.stringify({travel_doc_id: travel_doc_id})});

        const passengers_data = await res.json();
        SetPassengers(passengers_data.passengers_data);
      } catch (error) {
        console.log("im error ", error);
      }
    };
    getPassengers();
  }, [currentUser.uid]);

  return (
   <ImageBackground source={require('../components/pic4.jpg')} style={theStyle.background}>
<View style ={theStyle.center}>
  <BackButton/>
      <Text style={theStyle.bold}>Passengers</Text>
      <View style={theStyle.separator}></View>
      <FlatList
           data={passengers}
           keyExtractor = {item=> item.doc_id}
           renderItem = {({item}) => <PassengersDisplay user = {item} travelDocId={travel_doc_id}/>}
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
    alignItems: "center",
    borderRadius: 20,
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
  export default Passengers;