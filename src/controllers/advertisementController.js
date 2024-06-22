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
            let { limit, page, search, state, color, brand, year, price } = req.query;

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

            if (state) {
                const states = state.split(',').map(term => term.trim()).filter(term => term);
                const stateFilter = {
                    $or: states.map(stateName => ({
                        state: { $regex: new RegExp(stateName, 'i') }
                    }))
                };
                filter.$and = filter.$and || [];
                filter.$and.push(stateFilter);
            }


            if (color) {
                const colors = color.split(',').map(term => term.trim()).filter(term => term);
                const colorFilter = {
                    $or: colors.map(colorName => ({
                        color: { $regex: new RegExp(colorName, 'i') }
                    }))
                };
                filter.$and = filter.$and || [];
                filter.$and.push(colorFilter);
            }


            if (brand) {
                const brands = brand.split(',').map(term => term.trim()).filter(term => term);
                const brandFilter = {
                    $or: brands.map(brandName => ({
                        brand: { $regex: new RegExp(brandName, 'i') }
                    }))
                };
                filter.$and = filter.$and || [];
                filter.$and.push(brandFilter);
            }

            if (year) {
                const yearRange = year.split('-').map(p => parseFloat(p));
                if (yearRange.length === 2) {
                    filter.year = { $gte: yearRange[0], $lte: yearRange[1] };
                } else {
                    filter.year = parseFloat(year);
                }
            }

            if (price) {
                const priceRange = price.split('-').map(p => parseFloat(p));
                if (priceRange.length === 2) {
                    filter.price = { $gte: priceRange[0], $lte: priceRange[1] };
                } else {
                    filter.price = parseFloat(price);
                }
            }

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