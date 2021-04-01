const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = category;
    next();
  });
};
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  
  if (!category) return res.send("no category found");
  category.save((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "NOT able to save category in DB",
      });
    }
    res.json({ category });
  });
};
exports.getCategory = (req, res) => {
  return res.json(req.category);
};
exports.getAllCategory = (req, res) => {
  Category.find().exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "NO categories found",
      });
    }
    res.json(category);
  });
};
exports.updateCategory = (req, res) => {
  const category = req.category;

  if (!category) return res.send("no category found");

  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err || !category) {
      return res.status(400).json({
        error: "failed to update category",
      });
    }
    res.json(updatedCategory);
  });
};
exports.removeCategory = (req, res) => {
  const category = req.category;
  if (!category) return res.send("no category found");

  category.remove((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Failed to delete the catagory",
      });
    }
    res.json({
      message: "Succesfully deleted " + category.name,
    });
  });
};
