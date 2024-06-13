import express from "express";
import AdvertisementController from "../controllers/advertisementController.js"

const routes = express.Router();

routes.get("/advertisements", AdvertisementController.listAdvertisements);
routes.get("/advertisements/search", AdvertisementController.searchAdvertisements);
routes.get("/advertisements/:id", AdvertisementController.listAdvertisementById);
routes.post("/advertisements", AdvertisementController.registerAdvertisement);
routes.put("/advertisements/:id", AdvertisementController.updateAdvertisement);
routes.delete("/advertisements/:id", AdvertisementController.deleteAdvertisement);

export default routes;