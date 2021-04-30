const sequelize = require('../config/connection');
const { User, Datapost, Comment } = require('../models');

const userSeed = require('./userSeed.json');
const postSeed = require('./postSeed.json');
const commentSeed = require('./commentSeed.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeed, {
    individualHooks: true,
    returning: true,
  });

  for (const datapost of postSeed) {
    await Datapost.create({
      ...datapost,
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
