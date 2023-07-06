import productModel from "../models/productModel.js";
import { cloudinary } from "../cloudinary/cloudinary.js";

// get all products
// @desc   Fetch all products

async function getAllProducts(req, res) {
  const products = await productModel.find({});
  res.status(200).json(products);
}

// @desc   create a product
// @route  POST /api/products

async function createProduct(req, res) {
  const { name, brand, category, description, image } = req.body;

  // upload image to cloudinary
  const uploadedImage = await cloudinary.uploader.upload(
    image,
    {
      upload_preset: "cloudimage",
      public_id: `${name}`,
      allowed_formats: [
        "jpg",
        "png",
        "jpeg",
        "gif",
        "svg",
        "webp",
        "jfif",
        "ico",
      ],
    },
    function (error, result) {
      if (error) throw error;
    }
  );
  //console.log(uploadedImage);
  const cloudImg = uploadedImage.secure_url;
  const cloudImgPub = uploadedImage.public_id;
  try {
    const product = new productModel({
      name,
      brand,
      category,
      description,
      image: cloudImg,
      imgpub: cloudImgPub,
    });
    await product.save();
    res.status(201).json({ message: "Product erfolgreich gespeichert" });
  } catch (error) {
    res.status(500).json({ message: "Fehler bei der Speicherung" });
  }
}

// @desc   Delete a product
// @route  DELETE /products/:id

async function deleteProduct(req, res) {
  const product = await productModel.findById(req.params.id);

  if (product) {
    // delete image from cloudinary
    await cloudinary.uploader.destroy(product.imgpub);
    // delete product from db
    await productModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Produkt gelöscht!" });
  } else {
    res.status(404);
    throw new Error("Produkt nicht gefunden!");
  }
}

export { getAllProducts, createProduct, deleteProduct };