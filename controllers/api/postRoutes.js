const router = require('express').Router();
const { Datapost } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const newPost = await Datapost.findAll();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.get('/:id', withAuth, async (req, res) => {
  try {
    const newPost = await Datapost.findByPk();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Datapost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postSeed = await Datapost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postSeed) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postSeed);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const post = await Datapost.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id
        }
      })

      res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router