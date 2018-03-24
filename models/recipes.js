module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    title: DataTypes.STRING,
    href: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    thumbnail: DataTypes.STRING
  });

// Recipe.associate = function(models){
//   Recipe.belongsTo(models.User,{
//     foreignKey:{
//       allowNull: false
//     }
//   })
// }
  return Recipe;
}
