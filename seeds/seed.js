const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userSeed = require('./userSeed.js');
const postSeed = require('./postSeed.js');
const commentSeed = require('./commentSeed.js');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeed, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postSeed) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
}

for (const comment of commentSeed) {
  await Comment.create({
    ...comment,
    user_id: users[Math.floor(Math.random() * users.length)].id,
    post_id: users[Math.floor(Math.random() * users.length)].id,
  });
}

  process.exit(0);
};

seedDatabase();
