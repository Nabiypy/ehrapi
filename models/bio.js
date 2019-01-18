module.exports = (sequelize, DataType) => {
    const Bio = sequelize.define("Bio", {
     userId: { type: DataType.STRING, unique: true },
     fullName: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true } },
     firstName: { type: DataType.STRING },
     middleName: { type: DataType.STRING },
     lastName: { type: DataType.STRING },
     dateOfBirth: { type: DataType.STRING },
     passportPicture: { type: DataType.BLOB('long') },
     bloodType: { type: DataType.STRING },
     bloodDonor: { type: DataType.STRING },
     allergies: { type: DataType.TEXT },
     medications: { type: DataType.TEXT},
     infections: { type: DataType.TEXT},
     handicap: { type: DataType.STRING, defaultValue: 'No'},
     location: { type: DataType.TEXT },
     height: { type: DataType.STRING },
     weight: { type: DataType.STRING},
     bodyMassIndex: { type: DataType.STRING },
     geolocation: { type: DataType.TEXT },


    }, 
    {
      classMethods: {
        associate: (models) => {
          Bio.belongsTo(models.Users);
        }
      }
    });
    return Bio;
  };
