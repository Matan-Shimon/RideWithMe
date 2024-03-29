import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, FlatList} from "react-native";
import { useRoute } from '@react-navigation/native';
import BackButton from "../components/BackButton";
import AllPaths from "../components/AllPaths";

  const SearchResults = ({navigation}) => {
 
  const {params} = useRoute();
  
  return (
   <ImageBackground source={require('../components/pic4.jpg')} style={theStyle.background}>
  <View style ={theStyle.center}>
  <BackButton/>
      <Text style={theStyle.bold}>Search Results</Text>
      <View style={theStyle.separator}></View>
      <FlatList
        data= {params.params.results.shortest_paths}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={({item}) => { 
          return <AllPaths UseRides={item} user_location={params.params.user_location}/>;
        }}
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
  export default SearchResults;
