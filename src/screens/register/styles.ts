import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
    divMainContainerRegister:{
        flex: 1,
        backgroundColor: 'white',
        width: Dimensions.get('window').width/1,
    },
    divLogo:{
        backgroundColor: 'white',
        width: Dimensions.get('window').width/1,
        height: Dimensions.get('window').height/5,
        marginTop: 45,
        marginBottom: 20
        // width: '100%',
        // height: 40,
    },
    divImgLogo:{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    imgLogo:{
        width: 200,
        height: 200
    },
    divScreenTitle:{
        width: Dimensions.get('window').width/1,
        height: Dimensions.get('window').height/15,
        marginBottom: 5
        // backgroundColor: 'red'
    },
    screenTitleText:{
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'TitleFont',
        color: '#ff5100ff'
    },
    textos:{
        textAlign: 'center',
        fontSize: 20
    },
    divRegisterInfos:{
        width: Dimensions.get('window').width/1,
        height: Dimensions.get('window').height/1.5,
        // backgroundColor: '#e7e7e7ff',
    },
    divRegisterInputs:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 10,
        // paddingBottom: 10
    },
    divRegisterInputsPassword:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    divVisiblePassword:{
        width: 20,
        height: 20
    },
    inputRegisterInputs:{
        backgroundColor: '#fff',
        width: '80%',
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        shadowColor: '#f26257',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 25,
        marginBottom: 10,
    },
    imgsPassword:{
        width: 20,
        height: 20,
        position: 'absolute',
        right: 10,
        bottom: -4,
    },
    // selectedActivity:{
    //     backgroundColor: '#fff',
    //     width: '80%',
    //     height: 50,
    //     borderRadius: 20,
    //     paddingHorizontal: 15,
    //     fontSize: 16,
    //     shadowColor: 'blue',
    //     shadowOffset: { width: 0, height: 4 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 20,
    //     elevation: 25,
    //     marginBottom: 10,
    //     color: '#949494ff',
    //     paddingLeft: 100
    // },
    divBottomLinks:{
        marginTop: 10
    },
    bottomLinksText:{
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        color: '#797979ff', 
        textDecorationLine: 'underline'
    },
    divOtherRegisterWays:{
        flexDirection: 'row',
        gap: 35,
        paddingTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divRegisterWaysImgs:{
        width: 50,
        height: 50,
        backgroundColor: '#ffffffff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 25,
        
    },
    registerWaysImgGoogle:{
        width:  25,
        height: 25, 
    },
    registerWaysImg:{
        width:  29,
        height: 29,
    },
    divBtnRegister:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 30
    },
    divBtnCreateAccount:{
        
    },
    btnCreateAccount:{
        width: 250,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 20,

    },
    btnCreateAccountText:{
        fontSize: 20,
        fontFamily: 'TitleFont'
    }
})