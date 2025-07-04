// src/services/authService.js

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function login({ username, password }) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  console.log('Login response:', data); // log response dari backend
  return data;
}

export async function register(data) {
  console.log('Registering with data:', data);
  if (!data.username || !data.password) {
    throw new Error('Username and password are required');
  }
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function resetPassword(data) {
  const res = await fetch(`${BASE_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}
