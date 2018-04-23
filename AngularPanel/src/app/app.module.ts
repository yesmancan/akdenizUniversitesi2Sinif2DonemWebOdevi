import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { MDBBootstrapModule } from './typescripts/free';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { CatsComponent } from './pages/cats/cats.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsAddComponent } from './pages/news-add/news-add.component';
import { NewsUpdateComponent } from './pages/news-update/news-update.component';
import { TagsComponent } from './pages/tags/tags.component';
import { SliderComponent } from './pages/slider/slider.component';
import { SliderAddComponent } from './pages/slider-add/slider-add.component';
import { SliderUpdateComponent } from './pages/slider-update/slider-update.component';

import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { AuthService as AuthLoginService } from './services/auth.service';
import { CatsService } from './services/cats.service';
import { NewsService } from './services/news.service';
import { TagsService } from "./services/tags.service";
import { SliderService } from "./services/slider.service";

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CkEditorComponent } from './components/ckeditor/ckeditor.module';

const appRoutes: Routes = [
  {
    path: 'pages', component: PagesComponent, canActivate: [AuthGuardService], children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
      { path: 'cats', component: CatsComponent, canActivate: [AuthGuardService] },
      { path: 'tags', component: TagsComponent, canActivate: [AuthGuardService] },
      { path: 'slider', component: SliderComponent, canActivate: [AuthGuardService] },
      { path: 'slider/add', component: SliderAddComponent, canActivate: [AuthGuardService] },
      { path: 'slider/update/:id/:name', component: SliderUpdateComponent, canActivate: [AuthGuardService] },
      { path: 'news', component: NewsComponent, canActivate: [AuthGuardService] },
      { path: 'news/add', component: NewsAddComponent, canActivate: [AuthGuardService] },
      { path: 'news/update/:id/:name', component: NewsUpdateComponent, canActivate: [AuthGuardService] }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'pages/dashboard', canActivate: [AuthGuardService], pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];
@NgModule({
  declarations: [
    DashboardComponent,
    AppComponent,
    PagesComponent,
    NavComponent,
    NotfoundComponent,
    LoginComponent,
    CatsComponent,
    BreadcrumbComponent,
    SidebarComponent,
    NewsComponent,
    NewsAddComponent,
    CkEditorComponent,
    NewsUpdateComponent,
    TagsComponent,
    SliderComponent,
    SliderAddComponent,
    SliderUpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash: false } // <-- debugging purposes only
      // { enableTracing: true, useHash: true } // <-- enableTracing Route işlemlerini console döker , UseHash Urldeki Kök dizine # ekler 

    ),
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    AuthGuardService,
    AuthService,
    AuthLoginService,
    CatsService,
    NewsService,
    TagsService,
    SliderService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
