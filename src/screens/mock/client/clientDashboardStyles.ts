import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
  mainDiv: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Fundo levemente cinza
    paddingTop: height * 0.05,
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  
  // --- Header/Título ---
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 27,
    fontFamily: 'TitleFont', 
    color: "#333",
  },
  titleOrange: {
    fontSize: 27,
    fontFamily: 'TitleFont',
    color: "#ff5100", 
  },
  divSubTitleFlex:{
    display: 'flex',
    flexDirection: 'row'
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontFamily: 'TitleFont'
  },
  subtitleOrange:{
    fontSize: 16,
    color: '#ff5100',
    fontFamily: 'TitleFont'
  },
  // --- Card de Agendamento ---
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#ff5100",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
    borderLeftWidth: 5, // Destaque lateral por status
  },
  statusAgendado: {
      borderLeftColor: "#ff6600", // Laranja para Agendado
  },
  statusConcluido: {
      borderLeftColor: "#4caf50", // Verde para Concluído
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    // fontFamily: 'TitleFont', // Descomente e ajuste para sua fonte real
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },

  // --- Linha de Botões ---
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  editButton: {
    backgroundColor: "#ff5100",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: "#ff5100",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: "#dc3545", // Vermelho forte para Cancelar
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    shadowColor: "#dc3545",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
    sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    fontFamily: "TitleFont",
  },

  // --- Estado Vazio (Empty State) ---
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 15,
    fontFamily: 'TitleFont'
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'TitleFont'
  },
  emptyButton: {
    backgroundColor: "#ff5100", // Reutiliza a cor principal
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#ff5100",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  emptyButtonText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 16,
      fontFamily: 'TitleFont'
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