const express = require("express");
const router = express.Router();
const { getAllProducts, getAllProductsTesting, AddProductsTesting, UpdateProductsTesting, DeleteProductsTesting } = require("../controllers/product")
router.route("/").get(getAllProducts);
router.route("/testing").get(getAllProductsTesting);
router.route("/testing/add").post(AddProductsTesting);
router.route("/testing/update/:id").put(UpdateProductsTesting);
router.route("/testing/delete/:id").delete(DeleteProductsTesting);
module.exports = router