import React, { useState } from 'react'
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform
} from 'react-native'
import { style } from './styles'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'
// import GoogleImg from '../../assets/imgsLogos/google.png'
// import FacebookImg from '../../assets/imgsLogos/facebook.png'
// import LinkedinImg from '../../assets/imgsLogos/linkedin.png'
import appLogo from '../../assets/imgsLogos/appLogo.png'
import DateTimePicker from '@react-native-community/datetimepicker'
import { register } from '../../services/autoService'

type Props = {
  navigation: any
}

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [dateText, setDateText] = useState('')
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [visiblePasswordConfirmation, setVisiblePasswordConfirmation] = useState(false)

  // Máscara de telefone
  const applyPhoneMask = (text: string) => {
    let cleanedText = text.replace(/\D/g, '')
    if (cleanedText.length > 11) cleanedText = cleanedText.substring(0, 11)
    let maskedText = ''
    if (cleanedText.length > 0) maskedText = '(' + cleanedText.substring(0, 2)
    if (cleanedText.length >= 3) maskedText += ') ' + cleanedText.substring(2, 7)
    else if (cleanedText.length > 2) maskedText += ') ' + cleanedText.substring(2)
    if (cleanedText.length >= 8) maskedText += '-' + cleanedText.substring(7, 11)
    else if (cleanedText.length > 7) maskedText += '-' + cleanedText.substring(7)
    setPhone(maskedText)
  }

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShow(false)
      return
    }
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
    const formattedDate = currentDate.toLocaleDateString('pt-BR')
    setDateText(formattedDate)
    setShow(false)
  }

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email)

  const validateInputs = (): boolean => {
    if (!name || !email || !phone || !dateText || !password || !passwordConfirmation) {
      Alert.alert('Erro', 'Preencha todos os campos.')
      return false
    }
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Digite um e-mail válido.')
      return false
    }
    const onlyNumbersPhone = phone.replace(/\D/g, '')
    if (onlyNumbersPhone.length < 10) {
      Alert.alert('Erro', 'Digite um telefone válido com DDD.')
      return false
    }
    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.')
      return false
    }
    if (password !== passwordConfirmation) {
      Alert.alert('Erro', 'As senhas devem ser idênticas.')
      return false
    }
    return true
  }

  const handleRegister = async () => {
    if (!validateInputs()) return
        const dateParts = dateText.split('/').reverse().join('-'); 
        const isoBirthday = dateParts + 'T00:00:00.000Z'; 
        const phoneWithoutMask = phone.replace(/\D/g, ''); 
    try {
        const result = await register(
            name,
            email,
            phoneWithoutMask,
            isoBirthday ,
            password
      )

      console.log('Registro bem-sucedido:', result)
      Alert.alert('Sucesso', 'Conta criada com êxito!')
      navigation.navigate('Login')
    } catch (error: any) {
  console.error('Erro ao registrar:', error.response?.data) // <-- VERIFIQUE SEU CONSOLE
  Alert.alert(
    'Erro',
    // Tenta exibir o objeto de dados completo do erro
    JSON.stringify(error.response?.data) || 'Erro sem detalhes. Tente um novo email.'
  )
}
  }

  const [fontsLoaded] = useFonts({
    'TitleFont': require('../../assets/fonts/FjallaOne-Regular.ttf'),
  })

  if (!fontsLoaded) return null

  return (
    <View style={style.divMainContainerRegister}>
      <View style={style.divLogo}>
        <View style={style.divImgLogo}>
          <Image style={style.imgLogo} source={appLogo} />
        </View>
      </View>

      <View style={style.divScreenTitle}>
        <Text style={style.screenTitleText}>Registre-se</Text>
      </View>

      <View style={style.divRegisterInfos}>
        <View style={style.divRegisterInputs}>
          <TextInput
            style={style.inputRegisterInputs}
            placeholder='Seu Nome'
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={style.inputRegisterInputs}
            placeholder='Endereço de E-mail'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
          />
          <TextInput
            style={style.inputRegisterInputs}
            placeholder='Telefone'
            value={phone}
            onChangeText={applyPhoneMask}
            keyboardType='phone-pad'
            maxLength={15}
          />
          <TextInput
            style={style.inputRegisterInputs}
            placeholder='Data de nascimento'
            value={dateText}
            onFocus={() => setShow(true)}
            editable={true}
          />

          {show && (
            <DateTimePicker
              value={date}
              mode='date'
              display='default'
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}

          <View style={style.divRegisterInputsPassword}>
            <TextInput
              style={style.inputRegisterInputs}
              placeholder='Senha'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!visiblePassword}
            />
          </View>

          <View style={style.divRegisterInputsPassword}>
            <TextInput
              style={style.inputRegisterInputs}
              placeholder='Confirme sua senha'
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
              secureTextEntry={!visiblePasswordConfirmation}
            />
          </View>
        </View>

        <View style={style.divBottomLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={style.bottomLinksText}>Já tenho uma conta</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={style.divOtherRegisterWays}>
          <View style={style.divRegisterWaysImgs}>
            <Image source={GoogleImg} style={style.registerWaysImgGoogle} />
          </View>
          <View style={style.divRegisterWaysImgs}>
            <Image source={FacebookImg} style={style.registerWaysImg} />
          </View>
          <View style={style.divRegisterWaysImgs}>
            <Image source={LinkedinImg} style={style.registerWaysImg} />
          </View>
        </View> */}

        <View style={style.divBtnRegister}>
          <TouchableOpacity
            style={style.divBtnCreateAccount}
            onPress={handleRegister}
          >
            <LinearGradient
              colors={['#f26257', '#f5a06fc7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={style.btnCreateAccount}
            >
              <Text style={style.btnCreateAccountText}>Criar conta</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
