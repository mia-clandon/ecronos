module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("new", {
        heading: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.BLOB("long"),
        },
        en_heading: {
            type: DataTypes.STRING,
        },
        en_description: {
            type: DataTypes.STRING,
        },
        dateAdd: {
            type: DataTypes.STRING,
        }
    });
    return Image;
};
