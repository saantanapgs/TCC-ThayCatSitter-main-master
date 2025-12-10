import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainDiv:{
    width: Dimensions.get("window").width/1,
    height: Dimensions.get("window").height/1,
    backgroundColor: "#ffffffff",
    paddingTop: 60,
    flex: 1
  },
  mainDivInfos:{
    padding: 15,
    flex: 1
  },
  divPageTitle:{
    backgroundColor: 'transparent'
  },
  divHelloThayFlex:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0
  },
  mainTitle:{
    fontSize: 27,
    fontFamily: 'TitleFont',
  },
  mainTitleOrange:{
    color: "#ff5100",
    fontSize: 27,
    fontFamily: 'TitleFont',
  },
  divPageSubheader:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0
  },
  subHeader:{
    fontSize: 17,
    fontFamily: 'TitleFont',
    marginBottom: 20
  },
  subHeaderOrange:{
    fontSize: 17,
    fontFamily: 'TitleFont',
    marginBottom: 20,
    color: "#ff5100",
  },
  card: {
    padding: 12,
    marginBottom: 20,
    shadowColor: "#ff5100",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 15,
    borderRadius: 15,
    backgroundColor:"#fff",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    fontFamily: 'TitleFont',
  },
  inputLabel: {
    fontSize: 15,
    marginLeft: 1,
    marginBottom: 1,
    color: "#333", 
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#ff5100",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    elevation: 4,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
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
    logoutButton: {
    backgroundColor: "#ff5100",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 40
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  divBtnLogOut:{
    display: "flex",
    alignItems: "center",
    marginTop: 200
  }
});