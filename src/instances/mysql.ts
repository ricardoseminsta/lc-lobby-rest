import { Sequelize } from 'sequelize'; 
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.MY_SQL_DB as string,
    process.env.MY_SQL_USER as string,
    process.env.MY_SQL_PASSWORD as string,
    {
        dialect: 'mysql',
        port: parseInt(process.env.MY_SQL_PORT as string)
    }
);