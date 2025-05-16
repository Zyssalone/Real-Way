import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser  = async (username: string, password: string, userType: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, password, userType });
  return response.data;
};

export const loginUser  = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const getAllTrains = async () => {
  const response = await axios.get(`${API_URL}/trains`);
  return response.data;
};
