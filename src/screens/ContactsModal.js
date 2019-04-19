import React from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, ScrollView, SafeAreaView, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Permissions, Contacts, SMS } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { updateUserInfo } from '../actions/UserInfoActions';
import { UnderlinedInput } from '../components/UnderlinedInput';
import { ProfileCard } from '../components/ProfileCard';
import {Header} from 'react-navigation'

export class ContactsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  componentDidMount(){
    this._retrieveData();
    this._textmessage();
  }

  _retrieveData = async () => {
  try {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });
    //data is an array of objects, so we will now set the state with this new information
    if (data !== null) {
      this.setState({contacts: data});
      //console.log(this.state.contacts)
    }
    else {
      console.log('IN ELSE')
      return <ActivityIndicator/>
    }
  }
  catch (error) {
    // Error retrieving data
    console.log('THERE WAS AN ERROR')
  }
};

_textmessage = async () => {
  try {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      console.log('I am available')
    } else {
      console.log('I am NOT available')
    }
  }
  catch (error) {
    // Error retrieving data
    console.log('THERE WAS AN ERROR')
  }
}

  //
  // generateContactCards = () => {
  //   if(this.state.contacts.length){
  //     return this.state.contacts.map(contact=>
  //       <TouchableOpacity style={styles.contactCardViewStyle}>
  //         <Text>{contact.name}</Text>
  //           <Ionicons
  //             name="ios-arrow-forward"
  //             size={30}
  //             color="grey"
  //             style={styles.arrowIconStyle}
  //           />
  //       </TouchableOpacity>
  //     )
  //   }
  // }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      <View style={{ flex: 1,}}>

      <View  style={{ flex: 1, backgroundColor: '#F4F4F4', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button
            onPress={() => this.props.navigation.goBack()}
            title="Done"
            />
        </View>

      <View style={{ flex: 1, backgroundColor: '#F4F4F4', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Contacts</Text>
      </View>

          <View style={{ flex: 10, }}>
            <FlatList
            data={this.state.contacts}
            initialNumToRender={10}
            ListEmptyComponent={<View style={{ margin: 80, justifyContent: 'center', alignSelf: 'center', }}
><ActivityIndicator/></View>}
            renderItem={({item}) =>
            <TouchableOpacity
            style={styles.contactCardViewStyle}
            onPress={() => SMS.sendSMSAsync(item.phoneNumbers[0].digits, `${item.firstName}, I want to set you up in Basheret. Download the app here...`)}>
              <View style={styles.innerCardViewStyle}>
                <Text>{item.name}</Text>
                  <Ionicons
                    name="ios-arrow-forward"
                    size={30}
                    color="grey"
                    style={styles.arrowIconStyle}
                  />
              </View>
            </TouchableOpacity>
          }
            />
          </View>
      </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    denomination: state.userInfo.user.info.denomination,
    shabbatObservance: state.userInfo.user.info.shabbatObservance,
    kashrutObservance: state.userInfo.user.info.kashrutObservance,
    name: state.userInfo.user.info.name,
    profilePhoto: state.userInfo.user.info.profilePhoto,
    gender: state.userInfo.user.info.gender
  };
};

export default connect(mapStateToProps)(ContactsModal);

const styles = StyleSheet.create({
  contactCardViewStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  arrowIconStyle: {
  },
  innerCardViewStyle: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flexDirection: 'row',
    //edit padding to change text and arrow spacing
    paddingTop:10,
    paddingBottom:10,
    paddingLeft: 5,
    paddingRight: 15,
    //edit margin to edit the line
    marginLeft: 15,
    borderBottomWidth: 1,
    borderColor: 'grey',

  }
})
