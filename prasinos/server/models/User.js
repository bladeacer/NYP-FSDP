module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        imageFile: {
            type: DataTypes.STRING(20),
            defaultValue: null
        }
    }, {
        tableName: 'users',
    });

    User.associate = (models) => {
        User.hasMany(models.Otp, { foreignKey: 'otpForId', as: 'otps', onDelete: 'CASCADE' });
    }
    // User.associate = (models) => {
    //     User.hasMany(models.Tutorial, {
    //         foreignKey: "userId",
    //         onDelete: "cascade"
    //     });
    // };

    return User;
}
