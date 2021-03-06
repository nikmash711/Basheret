import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Permissions, Contacts } from 'expo';
import { ProfileCard } from '../components/ProfileCard';
import moment from 'moment';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, FontAwesome, AntDesign, Feather } from '@expo/vector-icons';
import { DisabledNextButton } from '../components/DisabledNextButton';
import { NavigationActions } from 'react-navigation';

export class MatchmakerScreen extends React.Component {

  async showFirstContactAsync() {
      // Ask for permission to query contacts.
      const permission = await Permissions.askAsync(Permissions.CONTACTS);

      if (permission.status !== 'granted') {
        // Permission was denied...
        return;
      }

      const contacts = await Contacts.getContactsAsync({
        fields:  [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails, Contacts.Fields.SocialProfiles, Contacts.Fields.Relationships,],
      });
      if (contacts.total > 0) {
        console.log(contacts);

      }
    }

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
        <View style={{ alignSelf: 'center'}}>
          <Text style={{ fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 40, color: '#00387e', marginTop: 30 }} >Matchmaker</Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
          <TouchableOpacity style={styles.emptyCircleStyle}
          onPress={this.props.navigate}
          >
            <Feather
            name="plus"
            size={25}
            color="black"
            style={{}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.emptyCircleStyle}
            onPress={this.props.navigate}>
            <Feather
            name="plus"
            size={25}
            color="black"
            style={{}}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', }}><Text>Note: This feature is still under construction.</Text><Text>Thank you for your patience.</Text></View>

        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', }}>
            <DisabledNextButton>Next</DisabledNextButton>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    info: state.userInfo.user.info,
    denomination: state.userInfo.user.info.denomination,
    shabbatObservance: state.userInfo.user.info.shabbatObservance,
    kashrutObservance: state.userInfo.user.info.kashrutObservance,
    name: state.userInfo.user.info.name,
    profilePhoto: state.userInfo.user.info.profilePhoto,
    gender: state.userInfo.user.info.gender
  };
};

export default connect(mapStateToProps)(MatchmakerScreen);

const styles = StyleSheet.create({
  emptyCircleStyle: {
    backgroundColor: '#aeb1b7',
    width: 135,
    height: 135,
    borderRadius: 67.5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  }
})
