const mapping: Record<string, string> = {
  'point-of-interests': 'point_of_interest',
  routes: 'route',
  trekkers: 'trekker',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
