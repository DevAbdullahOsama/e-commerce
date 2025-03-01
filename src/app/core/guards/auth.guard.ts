import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const pLATFORM_ID = inject(PLATFORM_ID);
  const _Router = inject(Router);


  if (isPlatformBrowser(pLATFORM_ID)) {
    if(localStorage.getItem('userToken')){
      return true;
    }
    else{
      _Router.navigate(['/login']);
      return false;
    }
  }
  else{
    return false
  }

  
};
