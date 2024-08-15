import User from '../models/User.js'
import AccessData from '../models/AccessData.js'
import PersonalData from '../models/PersonalData.js'
import bcrypt from 'bcrypt'
class UserController {
  static async listUsers(req, res) {
    try {
      const listUsers = await User.find({})
      res.status(200).json(listUsers)
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: `${error.message} - falha na requisição` })
      } else {
        res
          .status(500)
          .json({ message: `Erro desconhecido - falha na requisição` })
      }
    }
  }
  static async registerUser(req, res) {
    try {
      const {
        name,
        surname,
        dateOfBirth,
        phoneNumber,
        cep,
        state,
        city,
        street,
        houseNumber,
        email,
        password,
      } = req.body
      //Cria as informações de acesso com a senha hash
      const passwordHash = await bcrypt.hash(password, 10)
      const accessData = new AccessData({ email, passwordHash })
      await accessData.save()
      //Cria as informações pessoais
      const personalData = new PersonalData({
        name,
        surname,
        dateOfBirth,
        phoneNumber,
        cep,
        state,
        city,
        street,
        houseNumber,
      })
      await personalData.save()
      //Cria o usuário com as referências às informações pessoais e de acesso
      const user = new User({
        personalDataId: personalData._id,
        accessDataId: accessData._id,
      })
      await user.save()
      //Atualiza os documentos de informações pessoais e de acesso com a referência ao usuário
      personalData.userId = user._id
      accessData.userId = user._id
      await personalData.save()
      await accessData.save()
      res.status(201).json({ message: 'Usuário registrado com sucesso' })
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor', error })
    }
  }
  static async checkEmailExists(req, res) {
    try {
      const { email } = req.body
      const accessData = await AccessData.findOne({ email })
      if (accessData) {
        return res.status(200).json({ exists: true })
      }
      return res.status(200).json({ exists: false })
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor', error })
    }
  }
}
export default UserController
