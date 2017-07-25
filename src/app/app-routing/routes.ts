import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';
import { ContactComponent } from '../contact/contact.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';

import { Routes } from '@angular/router';

export  const routes:Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'menu',
        component: MenuComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
]