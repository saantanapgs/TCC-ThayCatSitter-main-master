import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const style = StyleSheet.create({
  mainDiv: {
    width: width,
    height: height,
    backgroundColor: "#ffffffff",
    paddingTop: 60,
    flex: 1,
  },

  mainDivInfos: {
    padding: 15,
    flex: 1,
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
  header: {
    backgroundColor: "transparent",
    marginBottom: 10,
  },

  title: {
    fontSize: 27,
    fontFamily: "TitleFont",
  },

  titleOrange: {
    fontSize: 27,
    fontFamily: "TitleFont",
    color: "#ff5100",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    fontFamily: "TitleFont",
  },

  card: {
    padding: 12,
    marginBottom: 20,
    shadowColor: "#ff5100",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
  },

  saveButton: {
    backgroundColor: "#ff5100",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 4,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

    btn: {
    backgroundColor: "#ff5100",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
  
  logoutButton: {
    backgroundColor: "#ff5100",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 50,
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  bottomMenu: {
    width: width,
    height: height / 9,
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

  divBtnLogOut: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
});
