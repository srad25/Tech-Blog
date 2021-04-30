const User = require('./User');
const Datapost = require('./Datapost');
const Comment = require('./Comment')
//create associations
User.hasMany(Datapost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Datapost.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Datapost.hasMany(Comment, {
  foreignKey: 'post_id',
  allowNull: true
});

Comment.belongsTo(Datapost, {
  foreignKey: 'post_id',
});

module.exports = { User, Datapost, Comment };