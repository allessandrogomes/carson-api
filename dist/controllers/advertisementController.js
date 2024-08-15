import Advertisement from '../models/Advertisement.js'
import User from '../models/User.js'
import filterAdsWidthASingleParameter from './utils/filterAdsWithASingleParameter.js'
import filterAdsWithIntervalValues from './utils/filterAdsWithIntervalValues.js'
import filterAdsWithMultipleParameters from './utils/filterAdsWithMultipleParameters.js'
class AdvertisementController {
  static async listAdvertisements(req, res) {
    const defaultLimit = 10
    const limit = parseInt(req.query.limit) || defaultLimit
    const page = parseInt(req.query.page) || 1
    const skip = (page - 1) * limit
    try {
      const listAdvertisements = await Advertisement.find({})
        .limit(limit)
        .skip(skip)
      const totalAdvertisements = await Advertisement.countDocuments({})
      const totalPages = Math.ceil(totalAdvertisements / limit)
      res.status(200).json({
        advertisements: listAdvertisements,
        currentPage: page,
        totalPages: totalPages,
        totalAdvertisements: totalAdvertisements,
      })
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
  static async searchAdvertisements(req, res) {
    try {
      const { search, state, city, color, brand, year, price } = req.query
      const limitNumber = parseInt(req.query.limit) || 10
      const pageNumber = parseInt(req.query.page) || 1
      const skip = (pageNumber - 1) * limitNumber
      const filter = {}
      if (search && typeof search === 'string') {
        const searchTerms = search
          .split(' ')
          .map((term) => term.trim())
          .filter((term) => term)
        const regexConditions = searchTerms.map((term) => ({
          $or: [
            { brand: { $regex: term, $options: 'i' } },
            { model: { $regex: term, $options: 'i' } },
            { year: { $regex: term, $options: 'i' } },
            { color: { $regex: term, $options: 'i' } },
          ],
        }))
        filter.$and = regexConditions
      }
      //Aqui filtramos com apenas um parametro, ex: estado: bahia (nomeDoParametro, valor, filter)
      filterAdsWidthASingleParameter('state', state, filter)
      filterAdsWidthASingleParameter('city', city, filter)
      //Aqui filtramos com mais de um parametro, ex: cor: branco, azul e verde... (nomeDoParametro, valor, filter)
      filterAdsWithMultipleParameters('color', color, filter)
      filterAdsWithMultipleParameters('brand', brand, filter)
      //Aqui filtramos com intervalo de valores, ex: ano: 2010-2015 (nomeDoParametro, valor, filter)
      filterAdsWithIntervalValues('year', year, filter)
      filterAdsWithIntervalValues('price', price, filter)
      const advertisements = await Advertisement.find(filter)
        .limit(limitNumber)
        .skip(skip)
      const totalAdvertisements = await Advertisement.countDocuments(filter)
      const totalPages = Math.ceil(totalAdvertisements / limitNumber)
      res.status(200).json({
        advertisements,
        totalAdvertisements,
        currentPage: pageNumber,
        totalPages: totalPages,
      })
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
  static async registerAdvertisement(req, res) {
    try {
      const { userId, brand, model, year, color, km, image, price, createdAt } =
        req.body
      const ad = new Advertisement({
        userId,
        brand,
        model,
        year,
        color,
        km,
        image,
        price,
        createdAt,
      })
      await ad.save()
      // Adiciona o ID do anúncio à lista de anúncios do usuário
      const user = await User.findById(userId)
      if (user) {
        user.advertisements.push(ad._id)
        await user.save()
        res.status(201).json({ message: 'Anúncio criado com sucesso', ad })
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
  static async listAdvertisementById(req, res) {
    try {
      const { id } = req.query
      const advertisementFound = await Advertisement.findById(id)
      res.status(200).json(advertisementFound)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: `${error.message} - falha na requisição do anúncio`,
        })
      } else {
        res.status(500).json({
          message: `Erro desconhecido - falha na requisição do anúncio`,
        })
      }
    }
  }
}
export default AdvertisementController