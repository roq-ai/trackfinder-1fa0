import { PointOfInterestInterface } from 'interfaces/point-of-interest';
import { TrekkerInterface } from 'interfaces/trekker';
import { GetQueryInterface } from 'interfaces';

export interface RouteInterface {
  id?: string;
  name: string;
  description?: string;
  trekker_id?: string;
  created_at?: any;
  updated_at?: any;
  point_of_interest?: PointOfInterestInterface[];
  trekker?: TrekkerInterface;
  _count?: {
    point_of_interest?: number;
  };
}

export interface RouteGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  trekker_id?: string;
}
