import axios from 'axios';
import queryString from 'query-string';
import { TrekkerInterface, TrekkerGetQueryInterface } from 'interfaces/trekker';
import { GetQueryInterface } from '../../interfaces';

export const getTrekkers = async (query?: TrekkerGetQueryInterface) => {
  const response = await axios.get(`/api/trekkers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTrekker = async (trekker: TrekkerInterface) => {
  const response = await axios.post('/api/trekkers', trekker);
  return response.data;
};

export const updateTrekkerById = async (id: string, trekker: TrekkerInterface) => {
  const response = await axios.put(`/api/trekkers/${id}`, trekker);
  return response.data;
};

export const getTrekkerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/trekkers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTrekkerById = async (id: string) => {
  const response = await axios.delete(`/api/trekkers/${id}`);
  return response.data;
};
