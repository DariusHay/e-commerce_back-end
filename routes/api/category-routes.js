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

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat = await Reader.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.json(updateCat)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const deletedCat = await Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  });
  
  res.json(deletedCat);
});

module.exports = router;
