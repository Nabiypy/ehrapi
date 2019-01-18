module.exports = (sequelize, DataType) => {
    const Profile = sequelize.define("Profile", {
      levelOfEducation: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true } },
      spokenLanguages: { type: DataType.TEXT },
      profession: { type: DataType.STRING },
      maritalStatus: { type: DataType.STRING },
      noOfKids: { type: DataType.INTEGER},
      religion: { type: DataType.STRING },
      emergencyNumbers: { type: DataType.TEXT }
    }, 
    {
      classMethods: {
        associate: (models) => {
          Profile.belongsTo(models.Users);
        }
      }
    });
    return Profile;
  };
  