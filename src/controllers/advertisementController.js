import advertisement from "../models/Advertisement.js";

class AdvertisementController {

    static async listAdvertisements(req, res) {
        const defaultLimit = 10;
        const limit = parseInt(req.query.limit) || defaultLimit;
        const page = parseInt(req.query.page) || 1;

        const skip = (page - 1) * limit;
        
        try {
            const listAdvertisements = await advertisement.find({})
            .limit(limit)
            .skip(skip);

            const totalAdvertisements = await advertisement.countDocuments({});
            const totalPages = Math.ceil(totalAdvertisements / limit);

            res.status(200).json({
                advertisements: listAdvertisements,
                currentPage: page,
                totalPages: totalPages,
                totalAdvertisements: totalAdvertisements
            });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    };

    static async searchAdvertisements(req, res) {
        try {
            const { query } = req.query;

            let filter = {};
            if (query) {
                filter = {
                    $or: [
                        { brand: { $regex: query, $options: 'i' } },
                        { model: { $regex: query, $options: 'i' } }
                    ]
                };
            }

            const advertisements = await advertisement.find(filter).limit(10)
            const totalAdvertisements = await advertisement.countDocuments(filter);

            res.status(200).json({
                advertisements,
                totalAdvertisements
            });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na requisição` })
        }
    }

    static async listAdvertisementById(req, res) {
        try {
            const id = req.params.id;
            const advertisementFound = await advertisement.findById(id);
            res.status(200).json(advertisementFound);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do anúncio` });
        }
    };

    static async registerAdvertisement(req, res) {
        try {
            const newAdvertisement = await advertisement.create(req.body);
            res.status(201).send({ message: "Criado com sucesso", advertisement: newAdvertisement })
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar anúncio` })
        }
    };

    static async updateAdvertisement(req, res) {
        try {
            const id = req.params.id;
            await advertisement.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Anúncio atualizado" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização do anúncio` });
        }
    };

    static async deleteAdvertisement(req, res) {
        try {
            const id = req.params.id;
            await advertisement.findByIdAndDelete(id);
            res.status(200).json({ message: "Anúncio deletado com sucesso" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao deletar anúncio` });
        }
    };
};

export default AdvertisementController;