const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCats = await Category.findAll({
      include: { model: Product }
    });
    res.status(200).json(allCats);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const oneCat = await Category.findByPk(req.params.id, {
      include: { model: Product }
    });

    if (!oneCat) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(oneCat);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;