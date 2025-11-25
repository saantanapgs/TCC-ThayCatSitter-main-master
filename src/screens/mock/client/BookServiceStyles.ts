import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const BOTTOM_MENU_HEIGHT = height / 9;

export const style = StyleSheet.create({
  mainDiv: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: height * 0.05,
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingBottom: BOTTOM_MENU_HEIGHT + 30,
  },

  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 27,
    fontFamily: "TitleFont",
    color: "#333",
  },
  titleOrange: {
    fontSize: 27,
    fontFamily: "TitleFont",
    color: "#ff5100",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
    fontWeight: "400",
  },

  // ---------- CARDS ----------
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 0,
    shadowColor: "#ff5100",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
    fontFamily: "TitleFont",
  },

  // ---------- RADIOBOX ----------
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  radioText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ff5100",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ff5100",
  },

  // ---------- INPUT ----------
  input: {
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: "#ff5100",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  inputErrorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 5,
  },

  // ---------- SELECT ----------
  selectContainer: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#ff5100",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  selectPicker: {
    color: "#333",
    fontSize: 16,
  },
  datePickerButton: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },

  // ---------- CARTÃO ----------
  cardInfoContainer: {
    backgroundColor: "#fdfdfd",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  cardInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    marginBottom: 10,
  },

  // ---------- CHECKBOX ----------
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#ff5100",
    borderRadius: 6,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: "#ff5100",
  },
  checkboxText: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  termsLink: {
    color: "#ff5100",
    textDecorationLine: "underline",
    fontWeight: "600",
  },

  // ---------- TOTAL / BOTÕES ----------
  divTotalPriceText: {
    marginTop: 10,
    alignItems: "center",
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },

  scheduleButton: {
    backgroundColor: "#ff5100",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#ff5100",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  scheduleButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "TitleFont",
  },

  // ---------- BOTÃO WHATSAPP ----------
  whatsappButton: {
    position: "absolute",
    bottom: BOTTOM_MENU_HEIGHT + 20,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#25D366",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  whatsappIcon: {
    width: 40,
    height: 40,
    tintColor: "#fff",
  },

  // ---------- MENU INFERIOR ----------
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
    borderTopColor: "#eee",
    elevation: 10,
    shadowColor: "#000",
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
  },
  // --------- ESTILOS FALTANTES ---------
radioRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
  gap: 10,
},

radioDot: {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: "#ff5100",
},

errorText: {
  color: "red",
  fontSize: 14,
  marginTop: 4,
},

pickerWrapper: {
  borderWidth: 1,
  borderColor: "#eee",
  borderRadius: 10,
  overflow: "hidden",
  backgroundColor: "#fff",
  shadowColor: "#ff5100",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 3,
},

checkboxTick: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 14,
},

smallWhatsAppButton: {
  position: "absolute",
  bottom: BOTTOM_MENU_HEIGHT + 120,
  right: 20,
  backgroundColor: "#25D366",
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 6,
},

smallWhatsAppButtonText: {
  color: "#fff",
  fontSize: 14,
  fontWeight: "700",
},

scheduleButtonSecondary: {
  backgroundColor: "#25D366",
  padding: 15,
  borderRadius: 10,
  alignItems: "center",
  marginTop: 15,
  marginBottom: 30,
  shadowColor: "#25D366",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 6,
},
serviceLabel: {
  fontSize: 16,
  fontWeight: "700",
  color: "#333",
},

radioItemSelected: {
  backgroundColor: "#fff5f0", // leve destaque de fundo
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#ff5100",
},
});
