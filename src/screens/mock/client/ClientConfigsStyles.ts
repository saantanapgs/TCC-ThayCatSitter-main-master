import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const BOTTOM_MENU_HEIGHT = height / 9;

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 80,
    paddingBottom: 90,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  sectionTitle: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#ff6600",
  marginTop: 25,
  marginBottom: 10,
},
  logoutButton: {
    backgroundColor: "#ff5100",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 50
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomMenu: {
    width: width,
    height: BOTTOM_MENU_HEIGHT,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  bottomMenuItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
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
  }
});
