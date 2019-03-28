import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({

  headerText: {
    fontSize: 20,
    paddingBottom: 3
  },
  touchableOpacityHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  headerIcons: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 35,
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
  },

  uploadPhotoOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  uploadIcon:{
    padding: 30,
  },

  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  filterContainer: {
    paddingBottom: 20,
    paddingLeft: 20,
  },
  settingsContainer: {
    backgroundColor: 'beige'
  },
  settingsTitle: {
    paddingHorizontal: 15,
    fontWeight: 'bold',
    fontSize: 17
  },
  profilePhoto: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    paddingTop: 100
  },
})
