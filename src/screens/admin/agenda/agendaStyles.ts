import { StyleSheet, Dimensions } from "react-native";

export const style = StyleSheet.create({
  mainDiv: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  divHeader: {
    marginBottom:25,
  },
  divMainTitleFlex:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0
  },
  title: {
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
  subTitle: {
    color: "black",
    fontFamily: 'TitleFont',
    fontSize: 17
  },
  subTitleOrange:{
    color: '#ff5100',
    fontFamily: 'TitleFont',
    fontSize: 17
  },
  divAgendaLists:{
    padding: 15,
    flex: 1
  },
  divEmptyList:{
    display: 'flex',
    alignItems: 'center',
    marginTop: 100
  },
  textDivEmptyList:{
    fontSize: 16,
    fontFamily: 'TitleFont',
    color: '#666'
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: 'white',
    shadowColor: "#ff5100",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  clientRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  clientName: {
    fontWeight: "600",
    fontSize: 16,
  },
  petTag: {
    marginLeft: 8,
    fontSize: 12,
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  dateText: {
    color: "#555",
    marginTop: 4,
  },
  addressText: {
    color: "#777",
    marginTop: 4,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  status: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: "600",
    color: "#fff",
  },
  btnEdit: {
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: "600",
    
  },
  btnEditAgenda: {
    color: "black",
    fontSize: 12,
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
