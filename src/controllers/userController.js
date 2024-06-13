import user from "../models/User.js";

class UserController {

    static async listUsers(req, res) {
        try {
            const listUsers = await user.find({});
            res.status(200).json(listUsers);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    };

    static async listUserById(req, res) {
        try {
            const id = req.params.id;
            const userFound = await user.findById(id);
            res.status(200).json(userFound);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do usuário` });
        }
    };

    static async registerUser(req, res) {
        try {
            const newUser = await user.create(req.body);
            res.status(201).json({ message: "Criado com sucesso", user: newUser });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar usuário` });
        }
    };

    static async updateUser(req, res) {
        try {
            const id = req.params.id;
            await user.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Usuário atualizado" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização do usuário` });
        }
    };

    static async deleteUser(req, res) {
        try {
            const id = req.params.id;
            await user.findByIdAndDelete(id);
            res.status(200).json({ message: "Usuário deletado com sucesso" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao deletar o usuário` });
        }
    };

    static async listUserByState(req, res) {
        const state = req.query.state;
        try {
            const usersByState = await user.find({ state: state });
            res.status(200).json(usersByState);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na busca` });
        }
    }
};

export default UserController;