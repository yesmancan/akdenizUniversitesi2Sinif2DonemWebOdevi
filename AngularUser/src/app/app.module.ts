import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';

import { HotNewsComponent } from './components/hotnews/hotnews.component';
import { PopularNewsComponent } from './components/popularnews/popularnews.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { MostCommentedComponent } from './components/mostcommented/mostcommented.component';
import { SearchComponent } from './components/search/search.component';
import { SocialComponent } from './components/social/social.component';
import { MenuComponent } from './components/menu/menu.component';
import { CategoryComponent } from './components/category/category.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SliderComponent } from './components/slider/slider.component';
import { TemplateComponent } from './components/template/template.component';

import { NavMenuComponent } from './navmenu/navmenu.component';
import { FooterComponent } from './footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
import { KategorilerComponent } from './pages/kategoriler/kategoriler.component';
import { SingleComponent } from './pages/single/single.component';
import { NotfoundsComponent } from './pages/notfounds/notfounds.component';

import { CategoryService } from '../services/category.service';
import { MessageService } from '../services/message.service';
import { MainService } from './services/main.service';
import { SliderService } from './services/slider.service';
import { TagsService } from './services/tags.service';
import { NewsService } from './services/news.service';

import { DatepipeModule } from '././costum/datepipe/datepipe.pipe';
import { DateTimepipeModule } from '././costum/datepipe/datetimepipe.pipe';
import { AsyncObservablePipeComponent } from '././costum/datepipe/datetimetick.pipe';
import { AuthService } from './services/auth.service';

const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Kategoriler', component: KategorilerComponent },
  { path: 'Kategoriler/:id/:name', component: KategorilerComponent },
  { path: 'Kategoriler/:id/:name/:singleId/:singleName', component: SingleComponent },
  { path: '**', component: NotfoundsComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HotNewsComponent,
    PopularNewsComponent,
    ReviewsComponent,
    MostCommentedComponent,
    CategoryComponent,
    FooterComponent,
    HomeComponent,
    SearchComponent,
    SocialComponent,
    MenuComponent,
    KategorilerComponent,
    NotfoundsComponent,
    BreadcrumbComponent,
    SingleComponent,
    TemplateComponent,

    DatepipeModule,
    DateTimepipeModule,
    AsyncObservablePipeComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CategoryService,
    MessageService,
    MainService,
    SliderService,
    TagsService,
    NewsService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
