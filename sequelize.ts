import { Sequelize } from 'sequelize-typescript';
import { Todo } from './src/Model/Todo';
import { User } from './src/Model/User';

export const sequelize = new Sequelize({
  database: 'TodoDatabase',
  dialect: 'postgres',
  username: 'postgres',
  password: 'root',
  host: '127.0.0.1',
  port: 5433,
  models: [
    Todo,
    User,
    
  ],
  logging: false,
});

sequelize
  .sync()
  .then(() => {
    console.log('Database & tables created!');
  }).catch((err) => {
    console.log('Error syncing the database:', err);
  });
