import { StyleSheet, Dimensions } from 'react-native';

export const style = StyleSheet.create({
  mainDiv:{
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff'
  },
  divHeader:{
    marginBottom: 25
  },
  divMainTitleFlex:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0
  },
  title:{
    fontSize: 27,
    fontFamily: 'TitleFont'
  },
  titleOrange:{
    fontSize: 27,
    color: '#ff5100',
    fontFamily: 'TitleFont'
  },
  divSubTitle:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  subTitle:{
    color: 'black',
    fontFamily: 'TitleFont',
    fontSize: 17
  },
  subTitleOrange:{
    color: '#ff5100',
    fontFamily: 'TitleFont',
    fontSize: 17
  },
  divClientsList:{
    padding: 15,
    flex: 1
  },
  card: {
    borderColor: "#ff5100",
    shadowColor: "#ff5100",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor:"#fff",
  },

  clientName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  contactText: {
    fontSize: 12,
    color: "#3a3a3aff",
    marginBottom: 3
  },
  petCard: {
    marginTop: 6,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  actionBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#888",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  // addBtn: {
  //   backgroundColor: "orange",
  //   padding: 10,
  //   borderRadius: 8,
  //   alignItems: "center",
  //   marginBottom: 12,
  // },
  // addBtnText: {
  //   color: "#fff",
  //   fontWeight: "700",
  // },
  inputSearchClients: {
    width: 570,
    height: 50,
    borderWidth: 1,
    borderColor: "#FFD7C4",
    borderRadius: 10,
    padding: 15,
    marginBottom: 16,
    fontSize: 15,
    paddingLeft: 20
  },
  inputFocused:{
    width: 570,
    height: 50,
    borderWidth: 1,
    borderColor: 'ff5100',
    backgroundColor: '#ffffffff'
  },
    bottomMenu: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 9,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    },
  
    bottomMenuItem: {
      display: "flex",
      flexDirection: "column", 
      alignItems: "center",
      justifyContent: "center",
    },
  
    bottomMenuDashboardImage: {
      width: 35,
      height: 35,
    },
  
    bottomMenuChatImage: {
      width: 35,
      height: 35,
    },
  
    bottomMenuImages: {
      width: 40,
      height: 40,
    },
  
    textsBottomMenu: {
      color: "#fd6d2aff",
      fontSize: 12,
      fontFamily: "TitleFont",
      marginTop: 0, 
    },
});