const Product = require("../Models/products");
const getAllProducts = async(req, res) => {
    const myData = await Product.find({});
    res.status(200).json({
        myData
    });
};

const getAllProductsTesting = async(req, res) => {
    const { company, name, price, featured, rating, sort, select } = req.query;
    const queryObject = {};
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }
    if (price) {
        queryObject.price = price;
    }
    if (featured) {
        queryObject.featured = featured;
    }
    if (rating) {
        queryObject.rating = rating
    }
    let apiData = Product.find(queryObject)
    if (sort) {
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }
    if (select) {
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 4;
    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);
    const myData = await apiData;
    res.status(200).json({
        myData,
        nbHits: myData.length
    });
};

const AddProductsTesting = async(req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        featured: req.body.featured,
        company: req.body.company
    })
    try {
        const newProducts = await product.save();
        res.status(201).json(newProducts)
    } catch (err) {
        res.status(400).json({ message: "Some Error Occured" })
    }
};
const UpdateProductsTesting = async(req, res) => {
    try {
        const updateproduct = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            price: req.body.price,
            featured: req.body.featured,
            company: req.body.company
        }, { useFindandModify: true, new: true })
        if (updateproduct) {
            res.json({ message: "Details Updated." });
        }
    } catch (err) {
        console.error(err);
    }

};

const DeleteProductsTesting = async(req, res) => {
    try {
        const deleteproduct = await Product.findByIdAndDelete(req.params.id)

        if (deleteproduct) {
            Product.deleteOne();
            res.json({ message: "Details Deleted." });
        } else {
            res.json({ message: "No Such Id Found." });
        }
    } catch (err) {
        console.error(err);
    }

};

module.exports = { getAllProducts, getAllProductsTesting, AddProductsTesting, UpdateProductsTesting, DeleteProductsTesting };