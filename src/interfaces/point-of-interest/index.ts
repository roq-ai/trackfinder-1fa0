import { RouteInterface } from 'interfaces/route';
import { GetQueryInterface } from 'interfaces';

export interface PointOfInterestInterface {
  id?: string;
  name: string;
  description?: string;
  route_id?: string;
  created_at?: any;
  updated_at?: any;

  route?: RouteInterface;
  _count?: {};
}

export interface PointOfInterestGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  route_id?: string;
}
