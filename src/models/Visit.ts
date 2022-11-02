import { Model, DataTypes } from 'sequelize';
//import { sequelize } from '../instances/pg';
import { sequelize } from '../instances/mysql';

import { Visiter } from './Visiter';
import { Doorman } from './Doorman';


export interface VisitInstance extends Model {
    id: number;
    arrived: Date;
    exit: Date;
}

export const Visit = sequelize.define<VisitInstance>('Visit', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    arrived: {
        type: DataTypes.DATE
    },
    exit: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'visit',
    timestamps: false
});

Visiter.hasMany(Visit);

Visit.belongsTo(Visiter, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

Doorman.hasMany(Visit)
Visit.belongsTo(Doorman, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

// Visit.sync({ force: true })