const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
// Get all posts and JOIN with user data
router.get('/', async (req, res) => {
  try {
    const postSeed = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
  // Serialize data so the template can read it
    const posts = postSeed.map((post) => post.get({ plain: true }));
    posts.reverse();
    
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postSeed = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          required: true
        },
        {
          model: Comment,
          required: false,
          include: [
            {
              model: User,
              required: false
            }
          ]
        }
      ]
    });

    const postIt = postSeed.get({ plain: true });

    res.render('post', {
      ...postIt,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// This middleware will prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userSeed = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userSeed.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If logged in, redirect user to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;