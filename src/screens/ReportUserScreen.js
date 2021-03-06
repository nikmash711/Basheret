import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { NextButton } from '../components/NextButton';

//import { reportUser } from "../actions/index";

class ReportUserScreen extends Component {
  constructor(props) {
    super(props);
    const data = [
      "Spam",
      "Inappropriate Picture",
      "Aggressive Behavior",
      "Misc",
      "Harrasment",
      "User Selling Items",
      "Violence",
      "Self-Injury",
      "Hate Speech",
    ];
    this.state = {
      selectedItems: [],
      unselectedItems: data,
      report: null,
      reporterId: "reporterId",
      reporteeId: "reporteeId",
      isLoading: null
    };
  }

  onReportSuccessful() {
    Alert.alert(
      "User Reported",
      "They are now blocked from interacting with you",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }
  onReportFailed() {
    Alert.alert(
      "Error",
      "User was not reported. Please retry",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }
  onSubmitPressed() {
    const report = {
      reporterId: this.state.reporterId,
      reporteeId: this.state.reporteeId,
      selectedItems: this.state.selectedItems
    };
    //This is where you'd call the async function to send it to firebase
  //   this.props
  //     .reportUser(report)
  //     .then(this.onReportSuccessful, this.onReportFailed);
  }

  onUnselectedButtonPressed(index, event) {
    console.log("event:", event);
    console.log("target:", event.target);
    console.log("ttagname:", event.target.tagName);
    console.log("index", index);
    var item = this.state.unselectedItems[index];
    console.log(item);
    console.log(this.state);
    var newUnselectedItems = [...this.state.unselectedItems];
    newUnselectedItems.splice(index, 1);
    this.setState((state, props) => ({
      selectedItems: [...state.selectedItems, item],
      unselectedItems: newUnselectedItems
    }));
  }

  onSelectedButtonPressed(index, event) {
    console.log("event:", event);
    console.log("index", index);
    var item = this.state.selectedItems[index];
    console.log(item);
    console.log(this.state);
    var newSelectedItems = [...this.state.selectedItems];
    newSelectedItems.splice(index, 1);
    this.setState((state, props) => ({
      selectedItems: newSelectedItems,
      unselectedItems: [...state.unselectedItems, item]
    }));
  }
  render() {
    console.log("unselected", this.state.unselectedItems);
    console.log("selected", this.state.selectedItems);
    const unSelectedItems = this.state.unselectedItems
      .sort()
      .map((item, index) => (
        <TouchableOpacity
          style={styles.unselectedButtonWrapper}
          key={item}
          onPress={this.onUnselectedButtonPressed.bind(this, index)}
        >
          <Feather
            name="plus"
            size={15}
            color="white"
            style={{ paddingRight: 5 }}
          />
          <Text style={styles.whiteText}>{item}</Text>
        </TouchableOpacity>
      ));
    const selectedItems = this.state.selectedItems.map((item, index) => (
      <TouchableOpacity
        style={styles.selectedButtonWrapper}
        key={item}
        onPress={this.onSelectedButtonPressed.bind(this, index)}
      >
        <MaterialCommunityIcons
          name="close"
          size={15}
          color="black"
          style={{ paddingRight: 5 }}
        />
        <Text style={styles.blackText}>{item}</Text>
      </TouchableOpacity>
    ));
    return (
      <Fragment>
        <SafeAreaView style={styles.container}>

          <View style={styles.minimizeContainerStyle}>
            <MaterialCommunityIcons
              name='close'
              onPress={()=>{this.props.navigation.goBack()}}
              size={25}
              color= 'grey'
              style={{ marginTop: 10, marginRight: 15,}}
            />
          </View>

          <View style={styles.questionContainerStyle}>
            <Text style={styles.questionTextStyle}>Report a User:</Text>
          </View>

          <ScrollView>
            <View style={styles.resultsContainer}>{selectedItems}</View>
          </ScrollView>

          <ScrollView>
            <View style={styles.optionsContainer}>{unSelectedItems}</View>
          </ScrollView>

          <View style={styles.submitContainer}>
            <NextButton
              onPress={this.onSubmitPressed.bind(this)}
              content='enabled'>
              <Text>Done</Text>
            </NextButton>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //reportUser: report => dispatch(reportUser(report)),
    reportUser: null
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ReportUserScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
  },

  minimizeContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  selectedButtonWrapper: {
    margin: 5,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 20,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#00387e',
    flexDirection: 'row',
  },
  unselectedButtonWrapper: {
    margin: 5,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 20,
    backgroundColor: "#00387e",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonWrapper: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderRadius: 20,
    flex: .4,
    alignItems: "center",
    backgroundColor: "#00387e"
  },

  questionContainerStyle: {
    flex: 0.5,
  },

  questionTextStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 40,
    paddingTop: 20,
    color: 'grey'
  },

  submitContainer: {
    alignItems: 'center',
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: "center",
  },
  resultsContainer: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  optionsContainer: {
    flex: 1,
    display: 'flex',
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  whiteText: {
    color: "white",
    fontSize: 13,
    fontWeight: 'bold',
  },

  blackText: {
    color: "black",
    fontSize: 13,
    fontWeight: 'bold',
  },

  scrollViewStyle:{
    flex: 2,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: .8,
//     flexDirection: "column",
//     justifyContent: 'flex-start',
//   },
//   selectedButtonWrapper: {
//     margin: 5,
//     padding: 5,
//     borderRadius: 20,
//     backgroundColor: 'white',
//     borderStyle: 'solid',
//     borderWidth: 2,
//     borderColor: '#00387e',
//   },
//   unselectedButtonWrapper: {
//     margin: 5,
//     padding: 5,
//     borderRadius: 20,
//     backgroundColor: "#00387e",
//   },
//   submitButtonWrapper: {
//     flex: 1,
//     margin: 5,
//     padding: 5,
//     borderRadius: 20,
//     flex: .4,
//     alignItems: "center",
//     backgroundColor: "#00387e"
//   },
//   title: {
//     flex: 1,
//     width: 200,
//     padding: 10,
//     fontSize: 20
//   },
//   submitContainer: {
//     alignItems: 'center',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: "center",
//   },
//   resultsContainer: {
//     flex: 3,
//     padding: 10,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     alignItems: "flex-start",
//   },
//   optionsContainer: {
//     display: 'flex',
//     padding: 10,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     flex: 6,
//     alignItems: "flex-start",
//   },
//   whiteText: {
//     color: "white"
//   }
// });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



// const Container = styled.View`
//    height: 80%;
// `;

// const OptionsContainer = styled.View`
//   padding: 10px;
//   flex-direction: row;
//   flex-wrap: wrap;
//   flex: 6;
//   align-items: flex-start;
// `;

// const ResultsContainer = styled.View`
//   flex: 3;
//   padding: 10px;
//   flex-direction: row;
//   flex-wrap: wrap;
//   align-items: flex-start;
// `;

// const BaseButtonWrapper = styled.TouchableOpacity`
//   margin: 5px 5px;
//   padding: 5px 5px;
//   border-radius: 20px;
// `;
// const SelectedButtonWrapper = styled(BaseButtonWrapper)`
//   background-color: white;
//   border-style: solid;
//   border-width: 2px;
//   border-color: #00387e;
// `;

// const UnselectedButtonWrapper = styled(BaseButtonWrapper)`
//   background-color: #00387e;
// `;

// const Title = styled.Text`
//   flex: 1;
//   width: 200px;
//   padding: 10px 10px;
//   font-size: 20px;
// `;

// const SubmitButtonWrapper = styled(UnselectedButtonWrapper)`
//   width: 40%;
//   align-items: center;
// `;

// const WhiteText = styled.Text`
//   color: white;
// `;

// const SubmitContainer = styled.View`
//   align-items: center;
//   flex: 1;
//   justify-content: center;
//   width: 100%;
// `;
