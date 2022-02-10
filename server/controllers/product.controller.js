import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.model.js";

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

const addProduct = async (req, res) => {
  const { name, description, category, filters } = req.body;

  const prod = new Product({
    name,
    description,
    categoryId: category,
    filterIds: filters,
  });

  if (!name || !description || !category) {
    throw new BadRequestError("please provide all values");
  }

  const p = await Product.create(prod);
  res.status(StatusCodes.OK).json({ p });
};

const getAllProducts = async (req, res) => {
  const p = await Product.find({})
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const getProductById = async (req, res) => {
  const p = await Product.find({ _id: req.params.id })
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const updateProduct = async (req, res) => {
  const p = new Product({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.category,
    filterIds: req.body.filters,
  });
  Product.updateOne({ _id: req.params.id }, p)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Product updated successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const deleteProduct = async (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Product Deleted successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

export {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
