import { Model, DataTypes } from 'sequelize';
//import { sequelize } from '../instances/pg';
import { Visit } from './Visit';
import { sequelize } from '../instances/mysql';

export interface DoormanInstance extends Model {
    id: number;
    name: string;
    cpf: string;
    turn: string;
    active: boolean;
}

export const Doorman = sequelize.define<DoormanInstance>('Doorman', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        //unique: true
    },
    turn: {
        type: DataTypes.STRING,
        //unique: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    
}, {
    tableName: 'doorman',
});



// Doorman.sync({ force: true });