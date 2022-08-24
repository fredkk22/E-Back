const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });

    res.status(200).json(allTags);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagByID = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    })

    if (!tagByID) {
      res.status(404).json({ message: "Tag ID not found!" });
      return;
    };

    res.status(200).json(tagByID);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);

    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(
      {
        id: req.body.id,
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!req.params.id) {
      res.status(404).json({ message: "Please enter a valid tag ID!" });
      return;
    };

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedTag) {
      res.status(404).json({ message: "Please enter a valid tag ID to delete" })
    }

    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(400).json(err);
  };
});

module.exports = router;