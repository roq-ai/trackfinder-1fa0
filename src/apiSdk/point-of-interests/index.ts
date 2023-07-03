import axios from 'axios';
import queryString from 'query-string';
import { PointOfInterestInterface, PointOfInterestGetQueryInterface } from 'interfaces/point-of-interest';
import { GetQueryInterface } from '../../interfaces';

export const getPointOfInterests = async (query?: PointOfInterestGetQueryInterface) => {
  const response = await axios.get(`/api/point-of-interests${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPointOfInterest = async (pointOfInterest: PointOfInterestInterface) => {
  const response = await axios.post('/api/point-of-interests', pointOfInterest);
  return response.data;
};

export const updatePointOfInterestById = async (id: string, pointOfInterest: PointOfInterestInterface) => {
  const response = await axios.put(`/api/point-of-interests/${id}`, pointOfInterest);
  return response.data;
};

export const getPointOfInterestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/point-of-interests/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePointOfInterestById = async (id: string) => {
  const response = await axios.delete(`/api/point-of-interests/${id}`);
  return response.data;
};
