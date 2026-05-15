import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const router = Router();

// Datos en memoria (sin conexión a BD)
let adminUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@zoomat.mx',
    password: '$2b$10$3p3iVLdLtPl.3zHX0.7J5uHg5kh6F5aT5kh6F5aT5kh6F5aT5kh6F',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextUserId = 2;

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Login Route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  const user = adminUsers.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  if (!user.isActive) {
    return res.status(401).json({ message: 'User account is inactive' });
  }

  // Simple password check (in production, use bcrypt.compare)
  // For demo, password is 'admin'
  const passwordMatch = password === 'admin' || bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    env.jwtSecret,
    { expiresIn: '24h' }
  );

  res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
});

// Create Admin Route
router.post('/create', verifyToken, (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password required' });
  }

  if (adminUsers.some(u => u.username === username || u.email === email)) {
    return res.status(409).json({ message: 'Username or email already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    id: nextUserId.toString(),
    username,
    email,
    password: hashedPassword,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  adminUsers.push(newUser);
  nextUserId += 1;

  res.status(201).json({
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    isActive: newUser.isActive,
    createdAt: newUser.createdAt,
  });
});

// List Admins Route
router.get('/list', verifyToken, (req, res) => {
  const users = adminUsers.map(u => ({
    id: u.id,
    username: u.username,
    email: u.email,
    isActive: u.isActive,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }));

  res.json(users);
});

// Update Admin Route
router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { username, email, isActive } = req.body;

  const userIndex = adminUsers.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Admin user not found' });
  }

  if (username && username !== adminUsers[userIndex].username) {
    if (adminUsers.some(u => u.username === username)) {
      return res.status(409).json({ message: 'Username already exists' });
    }
  }

  if (email && email !== adminUsers[userIndex].email) {
    if (adminUsers.some(u => u.email === email)) {
      return res.status(409).json({ message: 'Email already exists' });
    }
  }

  const updatedUser = {
    ...adminUsers[userIndex],
    username: username || adminUsers[userIndex].username,
    email: email || adminUsers[userIndex].email,
    isActive: isActive !== undefined ? isActive : adminUsers[userIndex].isActive,
    updatedAt: new Date().toISOString(),
  };

  adminUsers[userIndex] = updatedUser;

  res.json({
    id: updatedUser.id,
    username: updatedUser.username,
    email: updatedUser.email,
    isActive: updatedUser.isActive,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
  });
});

// Delete Admin Route
router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  const userIndex = adminUsers.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Admin user not found' });
  }

  adminUsers.splice(userIndex, 1);

  res.json({ message: 'Admin user deleted successfully', id });
});

export default router;
