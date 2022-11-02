import { Model, DataTypes } from 'sequelize';
//import { sequelize } from '../instances/pg';
import { Visit } from './Visit';
import { sequelize } from '../instances/mysql';

export interface VisiterInstance extends Model {
    id: number;
    name: string;
    cpf: string;
    email: string;
    bdate: Date;
}

export const Visiter = sequelize.define<VisiterInstance>('Visiter', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        //unique: true
    },
    cpf: {
        type: DataTypes.STRING,
        //unique: true
    },
    email: {
        type: DataTypes.STRING,
        //unique: true
    },
    bdate: {
        type: DataTypes.DATEONLY
    }
}, {
    tableName: 'visiter',
    timestamps: false
});

// Visiter.sync({ force: true });