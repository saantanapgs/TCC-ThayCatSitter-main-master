import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainDiv:{
    width: Dimensions.get("window").width/1,
    height: Dimensions.get("window").height/1,
    backgroundColor: "#ffffffff",
    paddingTop: 60,
    flex: 1
  },
  topMenu:{
    width: Dimensions.get("window").width/1,
    height: Dimensions.get("window").height/15,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    top: 25,
    left: 0,
    right: 0,
    marginTop: 10
  },
  profilePictureIcon:{
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 5,
    left: 210,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
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
  statCard: {
    flexBasis: "48%",
    backgroundColor: "#fff5f0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#ff5100",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ff5100",
  },
  statTrend: {
    fontSize: 13,
    fontWeight: "500",
    color: "#16a34a", 
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 0,
    shadowColor: "#ff5100",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  placeholder: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },

  quickGrid: {
    marginTop: 8,
    flexDirection: "column",
    gap: 12,
    marginBottom: 40,
  },
  quickAction: {
    backgroundColor: "#ff5100",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#ff5100",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  quickTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  quickDesc: {
    fontSize: 13,
    color: "#ffe6d6",
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
