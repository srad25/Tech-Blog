const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const seedUser = require('./userSeed.js');
const seedPost = require('./postSeed.js');
const seedComment = require('./commentSeed.js');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(seedUser, {
    individualHooks: true,
    returning: true,
  });

  for (const post of seedPost) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
}

for (const comment of seedComment) {
  await Comment.create({
    ...comment,
    user_id: users[Math.floor(Math.random() * users.length)].id,
    post_id: users[Math.floor(Math.random() * users.length)].id,
  });
}

  process.exit(0);
};

seedDatabase();
