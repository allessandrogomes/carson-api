import User from "../models/User.js";
import AccessData from "../models/AccessData.js";
import PersonalData from "../models/PersonalData.js";
import bcrypt from "bcrypt";

class UserController {

    static async listUsers(req, res) {
        try {
            const listUsers = await User.find({});
            res.status(200).json(listUsers);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    };

    static async registerUser(req, res) {
        try {
            const { name, surname, dateOfBirth, phoneNumber, cep, state, city, street, houseNumber, email, password } = req.body;

            //Cria as informações de acesso com a senha hash
            const passwordHash = await bcrypt.hash(password, 10);
            const accessData = new AccessData({ email, passwordHash });
            await accessData.save();

            //Cria as informações pessoais
            const personalData = new PersonalData({ name, surname, dateOfBirth, phoneNumber, cep, state, city, street, houseNumber });
            await personalData.save();

            //Cria o usuário com as referências às informações pessoais e de acesso
            const user = new User({
                personalDataId: personalData._id,
                accessDataId: accessData._id
            });
            await user.save();

            //Atualiza os documentos de informações pessoais e de acesso com a referência ao usuário
            personalData.userId = user._id;
            accessData.userId = user._id;
            await personalData.save();
            await accessData.save();

            res.status(201).json({ message: 'Usuário registrado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    };

    // static async listUserById(req, res) {
    //     try {
    //         const id = req.params.id;
    //         const userFound = await User.findById(id);
    //         res.status(200).json(userFound);
    //     } catch (erro) {
    //         res.status(500).json({ message: `${erro.message} - falha na requisição do usuário` });
    //     }
    // };

    // static async updateUser(req, res) {
    //     try {
    //         const id = req.params.id;
    //         await user.findByIdAndUpdate(id, req.body);
    //         res.status(200).json({ message: "Usuário atualizado" });
    //     } catch (erro) {
    //         res.status(500).json({ message: `${erro.message} - falha na atualização do usuário` });
    //     }
    // };

    // static async deleteUser(req, res) {
    //     try {
    //         const id = req.params.id;
    //         await user.findByIdAndDelete(id);
    //         res.status(200).json({ message: "Usuário deletado com sucesso" });
    //     } catch (erro) {
    //         res.status(500).json({ message: `${erro.message} - falha ao deletar o usuário` });
    //     }
    // };

    // static async listUserByState(req, res) {
    //     const state = req.query.state;
    //     try {
    //         const usersByState = await user.find({ state: state });
    //         res.status(200).json(usersByState);
    //     } catch (erro) {
    //         res.status(500).json({ message: `${erro.message} - falha na busca` });
    //     }
    // }
};

export default UserController;