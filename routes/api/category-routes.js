const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: { model: Product }
    });

    res.status(200).json(allCategories);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryByID = await Category.findByPk(req.params.id, {
      include: { model: Product }
    });

    if (!categoryByID) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    };

    res.status(200).json(categoryByID);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    if (!req.params.id) {
      res.status(404).json({ message: "Please enter a valid ID!" });
    }

    const updatedCategory = await Category.update(
      {
        id: req.body.id,
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedCategory) {
      res.status(404).json({ message: "No category found with that ID!" });
      return;
    };

    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;