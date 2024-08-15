import express from 'express'
import AdvertisementController from '../controllers/advertisementController.js'

const routes = express.Router()

// Lista todos os anúncios
routes.get('/advertisements', AdvertisementController.listAdvertisements)

// Filtra e lista os anúncios pela busca(marca, modelo e ano), estado, cor, marca, ano e preço
routes.get(
  '/advertisements/search',
  AdvertisementController.searchAdvertisements,
)

// Registra um novo anúncio
routes.post(
  '/advertisement/register',
  AdvertisementController.registerAdvertisement,
)

// Retorna o anúncio pelo _id
routes.get('/advertisement', AdvertisementController.listAdvertisementById)

// routes.put("/advertisements/:id", AdvertisementController.updateAdvertisement);
// routes.delete("/advertisements/:id", AdvertisementController.deleteAdvertisement);

export default routes
