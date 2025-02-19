import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuard } from './_helpers/auth.guard';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { LoginService } from './_services/login.service';
import { RepositoryComponent } from './components/repository/repository.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { GitHubService } from './_services/github.service';
import { AuthService } from './_helpers/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    RepositoryComponent,
    BookmarksComponent,
    BookmarkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    LoginService,
    GitHubService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
