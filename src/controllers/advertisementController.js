import advertisement from "../models/Advertisement.js";
import filterAdsWidthASingleParameter from "./utils/filterAdsWithASingleParameter.js";
import filterAdsWithIntervalValues from "./utils/filterAdsWithIntervalValues.js";
import filterAdsWithMultipleParameters from "./utils/filterAdsWithMultipleParameters.js";

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
            let { limit, page, search, state, city, color, brand, year, price } = req.query;

            limit = parseInt(req.query.limit) || 10;
            page = parseInt(req.query.page) || 1;

            const skip = (page - 1) * limit;

            let filter = {};
            if (search) {

                const searchTerms = search.split(' ').map(term => term.trim()).filter(term => term);

                const regexConditions = searchTerms.map(term => ({
                    $or: [
                        { brand: { $regex: term, $options: 'i' } },
                        { model: { $regex: term, $options: 'i' } },
                        { year: { $regex: term, $options: 'i' } },
                        { color: { $regex: term, $options: 'i' } },
                    ]
                }));

                filter.$and = regexConditions;
            }

            //Aqui filtramos com apenas um parametro, ex: estado: bahia
            filterAdsWidthASingleParameter('state', state, filter);
            filterAdsWidthASingleParameter('city', city, filter);

            //Aqui filtramos com mais de um parametro, ex: cor: branco, azul e verde...
            filterAdsWithMultipleParameters('color', color, filter);
            filterAdsWithMultipleParameters('brand', brand, filter);

            //Aqui filtramos com intervalo de valores, ex: ano: 2010-2015
            filterAdsWithIntervalValues('year', year, filter);
            filterAdsWithIntervalValues('price', price, filter);

            const advertisements = await advertisement.find(filter).limit(limit).skip(skip)
            const totalAdvertisements = await advertisement.countDocuments(filter);
            const totalPages = Math.ceil(totalAdvertisements / limit);

            res.status(200).json({
                advertisements,
                totalAdvertisements,
                currentPage: page,
                totalPages: totalPages
            });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na requisição` })
        }
    }

    static async listAdvertisementById(req, res) {
        try {
            const { id } = req.query;
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