  import {ScrollView,Text,StyleSheet,SafeAreaView,TextInput,Image,LogBox,Button,} from "react-native";
  import React, { useState } from "react";
  import { useRoute } from '@react-navigation/native';
  import { Picker } from "@react-native-picker/picker";
  import ImagePicker from "react-native-image-crop-picker";
  import { IP } from '../components/constants';
  

  LogBox.ignoreAllLogs();
  
  const SetUserData = ({navigation}) => {
    const {params} = useRoute();
    const user_id = params.params.user_id;
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("MALE");
    const [phone, setPhone] = useState("");
    const [photoURL,setPhotoURL] = useState("https://www.pexels.com/collections/country-roads-dqyjhhs/");
  
  
    const save = async () => {
      if (name && age) {
        const intAge = parseInt(age, 10);
        if (isNaN(intAge)) {
            alert("age must be an integer!");
        }
      else {   
          if (intAge >= 18) {
              try {
                const res = await fetch("http://"+IP+":1000/addUser", { 
                  method: "POST", 
                  headers: { Accept: "application/json", "Content-Type": "application/json" },
                  body: JSON.stringify({
                    id: user_id,
                    name: name,
                    age: age, 
                    gender: gender,
                    phone: phone,
                    photoURL: photoURL,
                  })});
                  const answer = await res.json();
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
                
                alert("We got your data successfully :)");
                navigation.navigate('Home', {
                  screen : 'Home',       
                  params : {username: name, id: user_id},
                });
          }
          else {
              alert("age must be 18 or above!");
          }
      }
    }
    else {
      alert("you must fill all the tabs!");
    }
    
  };


  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      path = image.path;
      setImage(image.path);
      setPhotoURL(image.path);
    });
  };

  return (
    <SafeAreaView style={theStyle.root}>
      <ScrollView style={theStyle.container}>
        <Image
          style={theStyle.images}
          source={{ uri: photoURL }}  
        ></Image>
        <Button 
          title="Upload Image"
          onPress={uploadImage}
        />
        <TextInput
          style={theStyle.input}
          placeholder="please enter your name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={theStyle.input}
          placeholder="please enter your age"
          value={age}
          onChangeText={setAge}
        />
        <Text>Gender</Text>
        <Picker
          label="Gender"
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Female" value="FEMALE" />
        </Picker>
        <TextInput
          style={theStyle.input}
          placeholder="please enter your phone Number"
          value={phone}
          onChangeText={setPhone}
        />
        
        <Button 
          title="save"
          onPress={save}
        />
      </ScrollView>
    </SafeAreaView>
  );
;}

const theStyle = StyleSheet.create({
  root: {
    width: "100%",
    flex: 1,
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
    backgroundColor: "#ADD8E6",
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 10,
  },
  images: {
    height: 100,
    width: 100,
    borderRadius: 15,
  },
});


export default SetUserData