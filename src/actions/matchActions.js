import * as firebase from 'firebase';
import { USER_MATCH_UPDATE_SUCCESS, GET_MATCHES_SUCCESS, MUTUAL_MATCH_SCREEN } from './types';
import {getAnotherUser} from './UserInfoActions'

export const POSITIVE_MATCH = 'POSITIVE_MATCH';
export const NEGATIVE_MATCH = 'NEGATIVE_MATCH';
export const MUTUAL_MATCH = 'MUTUAL_MATCH';

//Removes the cooresponding category a user is in
export const removeMatch = (category, matchID) => dispatch =>{
    console.log("removing"+category+matchID);
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+"/matches/"+matchID);
    userCategoryRef.remove();
};

export const getMatchesSuccess = (matches) => ({
    type: GET_MATCHES_SUCCESS,
    matches,
});

//Returns a list of User IDs for the cooresponding category - not currently using this since all the matches come in with user on load
export const getMatches = (category) => dispatch =>  {
    let user = firebase.auth().currentUser;
    if(user){
        let userID = user.uid;
        let userFirebase = firebase.database().ref('/users/'+userID+"/matches");
        userFirebase.orderByChild("group").equalTo(category).once("value", 
            function(snapshot) {
               let matches = new Array();
                snapshot.forEach(value=>{
                    matches.push(value.key);
                });
            getMatchesSuccess(matches)
        });
    }
}

//Get next candidate, returns the id for the next candidate that isn't the same gender and isn't already in your matches. 
//Return empty string if none. 
export const getCandidate = () => dispatch => {
    console.log('GETTING CANDIDATE')
    let result='';
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    //Get database reference to current user
    firebase.database().ref('/users/'+userID).once('value', function(snapshot) {
        let genderPreference =  snapshot.val().preferences.genderPreference;
        let userMatches = new Array();
        if(snapshot.val().matches){
            Object.keys(snapshot.val().matches).forEach(value=>{
                userMatches.push(value);
            });
        }
        let userCategoryRef = firebase.database().ref('/users/');
        //Iterate over all users in the database (problem: should stop once it finds someone, but right now it doesnt)
        userCategoryRef.once("value",
            function(snapshot2) {
                snapshot2.forEach(potentialMatch=>{
                    if(!result){
                    //Check that didn't match previously with them
                    if (!userMatches.includes(potentialMatch.key)) {
                        if (genderPreference === potentialMatch.val().info.gender) {
                            //check if potential match matched with you
                            if (potentialMatch.val().matches!=undefined && potentialMatch.val().matches.userID != undefined) {
                                if (potentialMatch.val().matches.userID.group != 'never') {
                                    console.log('RETURNING', potentialMatch.key)
                                    result = potentialMatch.key;
                                }
                            }
                            else {
                                console.log('RETURNING', potentialMatch.key)
                                result = potentialMatch.key;
                            }
                        }
                    }
                    }
                    else{
                        return;
                    }
                });
                console.log('here')
                dispatch(getAnotherUser(result, 'candidate'))
            }
        )
    });
}

//This fn is responsible for doing checks after user "accepts" another user
// [] If Nikkie is in Asher's "POSITIVE_MATCH" category, then put Asher in Nikkie's "MUTUAL_MATCH", and change Nikkie to "MUTUAL_MATCH" in Asher's
// [] If Nikkie is in Asher's "NEGATIVE_MATCH" category , then put Asher in Nikkie's "NEGATIVE_MATCH" category (supposedly never occurs - check)
// [] If Nikkie is neither category yet, put Asher in Nikkie's "POSITIVE_MATCH" category
export const acceptMatch = (matchID) => dispatch =>{
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+'/matches/'+matchID);
    userCategoryRef.set({group: 'POSITIVE_MATCH'});
    let potentialMatchRef = firebase.database().ref('/users/'+matchID+'/matches/'+userID+'/group');
    potentialMatchRef.once('value', function(snapshot) {
        if (snapshot) {
            if (snapshot.val() === 'POSITIVE_MATCH') {
                userCategoryRef.set({group: 'MUTUAL_MATCH'});
                potentialMatchRef.parent.set({group: 'MUTUAL_MATCH'});
                dispatch(mutualMatch(true));
            }
            else{
                dispatch(getCandidate());
        }
    }
    });
};

export const mutualMatch = (bool) => ({
    type: MUTUAL_MATCH_SCREEN,
    bool
});


//This fn is responsible for doing the proper work after user "declines" another user: 
//[x] Put Asher in Nikkie's "NEGATIVE_MATCH" category and put Nikkie in Asher's "NEGATIVE_MATCH" category
export const declineMatch = (matchID) => dispatch =>{
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+'/matches/'+matchID);
    let potentialMatchRef = firebase.database().ref('/users/'+matchID+'/matches/'+userID);
    userCategoryRef.set({group: 'NEGATIVE_MATCH'});
    potentialMatchRef.set({group: 'NEGATIVE_MATCH'});
    dispatch(getCandidate());
};
