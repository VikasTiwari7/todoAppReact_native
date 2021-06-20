import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
import * as Utility from './assets/utility';

const Notes = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [addnotes, setAddnotes] = useState([]);
  const [notes, setNotes] = useState({});
  const [edit, setEdit] = useState();
  const [visible, setVisible] = useState(false)
  
  const [stateIndex, setIndex] = useState()
  useEffect(()=>{
    retrived()
  },[])
  const retrived= async()=>{
    let abc=await Utility.getFromLocalStorge("data");
  
    if(abc){
    setAddnotes(abc);
    }else{
      console.log("nodata");
    }
    console.log("why null",abc);

  }
  const Add = async() => {
    

    if (notes.length !== 0) {
      var notesCopy = addnotes;
      notesCopy.push(notes);
      setAddnotes(notesCopy);
      await Utility.setInLocalStorge("data",addnotes);
      setNotes('');
      console.log(notesCopy)
      Alert.alert('Notes Added...')
    } else {
      return Alert.alert('Type Notes...')
    }
  }

  if (toggleCheckBox == true) {
    setToggleCheckBox(!toggleCheckBox)
    return Alert.alert("Completed notes")
  }

  const Edit = (index) => {
    setVisible(true);
    setIndex(index);
  }

  const handleEdit = (notes, index) => {
    setModalVisible(!isModalVisible);
    if (edit.length !== 0) {
      var newEditNotes = [...addnotes];
      if (index !== -1) {
        newEditNotes[index] = notes;
        setAddnotes(newEditNotes);
        setEdit('');
        console.log("after edit ", newEditNotes);
        Alert.alert('Notes is edited');
      }
    } else {
      Alert.alert('Notes is not edit...')
    }
  }

  const Delete = (index) => {
    let itemCopy = [...addnotes];
    itemCopy.splice(index, 1);
    setAddnotes(itemCopy);
    console.log(itemCopy)
    Alert.alert('Notes is deleted')
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'blue' }}>Notes App</Text>
      </View>
      <View style={{ marginTop: '10%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <View style={{ borderBottomWidth: 1 }}>

          <TextInput placeholder='Type Your Notes...' onChangeText={(notes) => setNotes(notes)} value={notes} editable={true} multiline={true}></TextInput>
        </View>
        <TouchableOpacity onPress={() => Add()}>
          <View style={{ backgroundColor: 'blue', padding: 8, borderRadius: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>ADD</Text>
          </View>
        </TouchableOpacity>
      </View>

      {
        (addnotes.length === 0) ?
          <Text style={{ fontSize: 20, marginTop: '10%', textAlign: 'center' }}>Notes is not added...</Text> :
          <ScrollView>
            <View style={{ flexDirection: 'column' }} >
              {
                addnotes.map((notes, index) =>
                  <View key={index} style={{
                    marginTop: '10%', backgroundColor: 'white', borderRadius: 10, flexDirection: 'row', marginLeft: '10%', marginRight: '10%',
                    padding: 10, justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{ fontSize: 20, color: 'black' }}>{notes}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      
                      < View >
                        <CheckBox
                          // disabled={false}
                        
                          value={toggleCheckBox}
                          onChange={()=>setToggleCheckBox(!toggleCheckBox)}
                          
                        />
                      </View>
                      {visible && stateIndex == index ? (
                        <>
                          <Modal
                            animationType={'slide'}
                            transparent={true}
                            onBackdropPress={() => toggleModal()}
                            onRequestClose={() => toggleModal()}
                            isVisible={isModalVisible}
                            onRequestClose={() => {
                              setModalVisible(!modalVisible);
                              console.log('Modal has been closed.');
                            }}>
                            <View style={{
                              backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
                              borderRadius: 20
                            }}>
                              <View style={{ borderBottomWidth: 1 }}>
                                <TextInput placeholder='edit Notes...' onChangeText={(E) => setEdit(E)} value={edit} editable={true} multiline={true}></TextInput>
                              </View>
                              <TouchableOpacity onPress={() => handleEdit(edit, index)}>
                                <View >

                                  <Image source={require('./assets/edit.png')}></Image>
                                </View>

                              </TouchableOpacity>
                            </View>
                          </Modal>
                          <TouchableOpacity onPress={() => toggleModal()}>
                            <View >
                              <Image source={require('./assets/edit.png')}></Image>
                            </View>
                          </TouchableOpacity>
                        </>
                      ) :
                        <TouchableOpacity onPress={() => Edit(index)}>
                          <View >

                            <Image source={require('./assets/edit.png')}></Image>
                          </View>
                        </TouchableOpacity>
                      }
                      <TouchableOpacity key={index} onPress={() => Delete(index)}>
                        <View>
                          <Image source={require('./assets/delete.png')} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }
            </View>
          </ScrollView>
      }
    </View>
  )
}
export default Notes;