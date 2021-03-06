import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {getCandidate, mutualMatch} from '../actions/matchActions'
import {showProfileScreen, showMutualMatchScreen} from '../actions/UserInfoActions';

export class CandidatesScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
    };
  }

  render() {
    console.log('THE CANDIDATE IS', this.props.candidate)
    if(this.props.candidate){
      return (
        <View style={{ flex: 1, alignSelf: 'stretch', backgroundColor: '#f4f4f4'}}>
          <TouchableOpacity style={{ flex: 1, borderRadius: 20, margin: 20,  }}
            //show Profile Modal and change profile to 'candidate'
            onPress={this.props.navigate}>
            <ImageBackground style={{ flex: 1, }} imageStyle={{borderRadius: 20, }} source={{ uri: this.props.candidate.profilePhoto }}>

            <View style={{ flex: 1, justifyContent: 'flex-end',}}>

              <View>
              </View>

              <View>
                <Text style={{ marginLeft: 25, fontSize: 23, color: 'white', fontWeight: 'bold', textShadowColor: '#242424', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 6,}} >
                  {this.props.candidate.name}, {this.props.candidate.age}
                </Text>
              </View>
              <View>
                <Text style={{ marginLeft: 25, marginTop: 0, marginBottom: 40, fontSize: 17, color: 'white', fontWeight: 'bold', textShadowColor: '#242424', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 6,}} >
                  {this.props.candidate.currentresidence}
                </Text>
              </View>
            </View>

            </ImageBackground>
          </TouchableOpacity>
        </View>
      );
    }
    else if (!this.props.candidate){
      return( <View style={{ flex: 1, alignSelf: 'center', backgroundColor: '#F4F4F4'}}>
              <Text style={{ fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 30, color: 'black', marginTop: 30, alignSelf: 'center' }}>No Candidates To Show.</Text>
              <Text style={{ fontWeight: 'bold', fontFamily: 'fitamint-script', fontSize: 30, color: 'black', marginTop: 10, alignSelf: 'center' }}>Come Back Soon!</Text>
                </View>
      )
    }
    //loading
    else{
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator/></View>)
    }
  }
}

const mapStateToProps = state => {
  console.log('SHOW MUTUAL MATCH SCREEN IS', state.nav.showMutualMatchScreen)
  return {
    candidate: state.userInfo.user.candidate,
    showMutualMatchScreen: state.nav.showMutualMatchScreen
  };
};

export default connect(mapStateToProps)(CandidatesScreen);
