import { CanActivateFn } from '@angular/router';

export const mainGuard: CanActivateFn = (route, state) => {
  return true;
};
