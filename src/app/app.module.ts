import { NgModule } from '@angular/core';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { HeaderComponent } from './Common/header/header.component';
import { FooterComponent } from './Common/footer/footer.component';
import { PropertySearchComponent } from './Pages/property-search/property-search.component';
import { SearchBoxComponent } from './Components/Home/search-box/search-box.component';
import { TwoTypeCardComponent } from './Components/Home/two-type-card/two-type-card.component';
import { ShowCategoryComponent } from './Components/Home/show-category/show-category.component';
import { CallBackComponent } from './Components/Home/call-back/call-back.component';
import { ShowLocationsComponent } from './Components/Home/show-locations/show-locations.component';
import { SwiperModule } from 'swiper/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './Common/breadcrumb/breadcrumb.component';
import { SearchFilterComponent } from './Components/PropertySearch/search-filter/search-filter.component';
import { SearchResultComponent } from './Components/PropertySearch/search-result/search-result.component';
import { PropertyCardComponent } from './Components/PropertySearch/property-card/property-card.component';
import { PaginationComponent } from './Common/pagination/pagination.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PropertyDetailComponent } from './Pages/property-detail/property-detail.component';
import { PropertyHeaderComponent } from './Components/PropertyDetail/property-header/property-header.component';
import { PropertyDetailsComponent } from './Components/PropertyDetail/property-details/property-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CareersComponent } from './Pages/careers/careers.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { TermsComponent } from './Pages/terms/terms.component';
import { PrivacyComponent } from './Pages/privacy/privacy.component';
import { BlogComponent } from './Pages/blog/blog.component';
import { BlogDetailComponent } from './Pages/blog-detail/blog-detail.component';
import { SingleProjectComponent } from './Pages/single-project/single-project.component';
import { SingleSubProjectComponent } from './Pages/single-sub-project/single-sub-project.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LightboxModule } from 'ngx-lightbox';
import { OffPlanComponent } from './Pages/off-plan/off-plan.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { BookmMdelComponent } from './Common/bookm-mdel/bookm-mdel.component';
import { WhoWeAreComponent } from './Pages/who-we-are/who-we-are.component';
import { AllCategorysComponent } from './Pages/all-categorys/all-categorys.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MapShowComponent } from './Pages/map-show/map-show.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NguCarouselModule } from '@ngu/carousel';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PropertySearchComponent,
    SearchBoxComponent,
    TwoTypeCardComponent,
    ShowCategoryComponent,
    CallBackComponent,
    ShowLocationsComponent,
    BreadcrumbComponent,
    SearchFilterComponent,
    SearchResultComponent,
    PropertyCardComponent,
    PaginationComponent,
    PropertyDetailComponent,
    PropertyHeaderComponent,
    PropertyDetailsComponent,
    CareersComponent,
    ContactUsComponent,
    TermsComponent,
    PrivacyComponent,
    BlogComponent,
    BlogDetailComponent,
    SingleProjectComponent,
    SingleSubProjectComponent,
    OffPlanComponent,
    BookmMdelComponent,
    WhoWeAreComponent,
    AllCategorysComponent,
    MapShowComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    GooglePlaceModule,
    NgxSliderModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    GoogleMapsModule,
    LightboxModule,
    LightgalleryModule,
    MatSliderModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    CarouselModule,
    NguCarouselModule,
  ],
  providers: [Title, Meta],
  bootstrap: [AppComponent],
})
export class AppModule {}
