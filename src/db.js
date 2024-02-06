// db.js
import mongoose from 'mongoose';
import { DB_USER, DB_PASSWORD, DB_HOST } from './constants.js';

const db = mongoose.connection;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin', 
}).catch((err) => console.error('Error de conexión a MongoDB:', err));

db.once('open', () => {
  console.log('Conectado a MongoDB');
});

db.on('error', (error) => {
  console.error('Error de conexión a MongoDB:', error);
});

export { db, mongoose };

