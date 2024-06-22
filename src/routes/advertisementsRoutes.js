import express from "express";
import AdvertisementController from "../controllers/advertisementController.js"

const routes = express.Router();

routes.get("/advertisements", AdvertisementController.listAdvertisements);//Lista todos os anúncios
routes.get("/advertisements/search", AdvertisementController.searchAdvertisements);// Busca o anúncio pelo brand, model, year
routes.get("/advertisement", AdvertisementController.listAdvertisementById);// Busca um anúncio único pelo id
routes.post("/advertisements", AdvertisementController.registerAdvertisement);
routes.put("/advertisements/:id", AdvertisementController.updateAdvertisement);
routes.delete("/advertisements/:id", AdvertisementController.deleteAdvertisement);

export default routes;