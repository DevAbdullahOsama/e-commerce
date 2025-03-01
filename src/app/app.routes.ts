import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { logedInGuard } from './core/guards/loged-in.guard';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch: 'full'},
    {path: '',loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((c)=>c.AuthLayoutComponent),
        canActivate:[logedInGuard],children:[
            {path:'login',loadComponent:()=>import('./pages/login/login.component').then((c)=>c.LoginComponent),title:'Login'},
            {path:'register',loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent),title:'Register'},
            {path:'forgot',loadComponent:()=>import('./shared/components/forgot-password/forgot-password.component').then((c)=>c.ForgotPasswordComponent),title:'Forgot Password'},
        ]},
        {path:'',loadComponent:()=>import('./layouts/blank-layout/blank-layout.component').then((c)=>c.BlankLayoutComponent),
            canActivate:[authGuard],children:[
                {path:'home',loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent),title:'Home'},
                {path:'cart',loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent),title:'Cart'},
                {path:'products',loadComponent:()=>import('./pages/products/products.component').then((c)=>c.ProductsComponent),title:'Products'},
                {path:'brands',loadComponent:()=>import('./pages/brands/brands.component').then((c)=>c.BrandsComponent),title:'Brands'},
                {path:'categories',loadComponent:()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent),title:'Categories'},
                {path:'allorders',loadComponent:()=>import('./pages/allorders/allorders.component').then((c)=>c.AllordersComponent),title:'All Orders'},
                {path:'wishlist',loadComponent:()=>import('./pages/wishlist/wishlist.component').then((c)=>c.WishlistComponent),title:'Wishlist'},
                {path:'checkout/:id',loadComponent:()=>import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent),title:'Check Out'},
                {path:'details/:id',loadComponent:()=>import('./pages/details/details.component').then((c)=>c.DetailsComponent),title:'Details'},
                {path:'**',loadComponent:()=>import('./pages/notfound/notfound.component').then((c)=>c.NotfoundComponent),title:'Not Found!'},
            ]}
    ]
