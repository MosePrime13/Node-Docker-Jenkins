export interface CountryAttributes{
    id?: number;
    iso: string;
    name: string;
    iso3: string;
    numcode: string;
    phonecode: string;
    currency: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export const CountryFactory = (sequelize, DataTypes) => {
    const Country = sequelize.define('country', {
        iso: { type: DataTypes.STRING, unique: true },
        name: { type: DataTypes.STRING },
        createdAt: {type: DataTypes.DATE, field: 'created_at'},
        updatedAt: {type: DataTypes.DATE, field: 'updated_at'},
        deletedAt: {type: DataTypes.DATE, field: 'deleted_at'},
    }, {
        timestamps: true,
        paranoid: true
    });

    Country.associate = (models) => {
    }

    return Country;
}
