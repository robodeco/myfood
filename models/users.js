module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    googleId: DataTypes.STRING,
    username: DataTypes.STRING
  });

  // User.associate = function(models){
  //   User.hasMany(models.Recipe, {
  //     onDelete: "cascade"
  //   });
  // };

  return User;
}
