const bcrypt = require('bcryptjs');

// Datos ficticios de usuarios para testing
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10), // password: 123456
    role: 'admin'
  },
  {
    id: 2,
    username: 'usuario1',
    email: 'usuario1@example.com',
    password: bcrypt.hashSync('password123', 10), // password: password123
    role: 'user'
  },
  {
    id: 3,
    username: 'test',
    email: 'test@example.com',
    password: bcrypt.hashSync('test123', 10), // password: test123
    role: 'user'
  }
];

// Buscar usuario por username o email
const findUserByUsername = (username) => {
  return users.find(user => user.username === username || user.email === username);
};

// Buscar usuario por ID
const findUserById = (id) => {
  return users.find(user => user.id === id);
};

// Verificar password
const validatePassword = (inputPassword, hashedPassword) => {
  return bcrypt.compareSync(inputPassword, hashedPassword);
};

module.exports = {
  users,
  findUserByUsername,
  findUserById,
  validatePassword
};