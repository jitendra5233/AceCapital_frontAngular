import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AllCategorysComponent } from './Pages/all-categorys/all-categorys.component';
import { BlogDetailComponent } from './Pages/blog-detail/blog-detail.component';
import { BlogComponent } from './Pages/blog/blog.component';
import { CareersComponent } from './Pages/careers/careers.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { HomeComponent } from './Pages/home/home.component';
import { OffPlanComponent } from './Pages/off-plan/off-plan.component';
import { PrivacyComponent } from './Pages/privacy/privacy.component';
import { PropertyDetailComponent } from './Pages/property-detail/property-detail.component';
import { PropertySearchComponent } from './Pages/property-search/property-search.component';
import { SingleProjectComponent } from './Pages/single-project/single-project.component';
import { SingleSubProjectComponent } from './Pages/single-sub-project/single-sub-project.component';
import { TermsComponent } from './Pages/terms/terms.component';
import { WhoWeAreComponent } from './Pages/who-we-are/who-we-are.component';

let description =
  'Ace Capital Where Reality Meets Realty, is an award-winning real estate agency for buying, renting and selling properties in Dubai UAE, officially recognized by the Real Estate Regulatory Agency and Dubai Land Department (RERA, DLD)';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'property-search',
    component: PropertySearchComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'buy',
    component: PropertySearchComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'rent',
    component: PropertySearchComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'off-plan',
    component: OffPlanComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'property-detail/:id',
    component: PropertyDetailComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'careers',
    component: CareersComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'terms-of-use',
    component: TermsComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'privacy-policy',
    component: PrivacyComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'blog',
    component: BlogComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'blog-detail/:id',
    component: BlogDetailComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'project-view/:id',
    component: SingleProjectComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'project-view-sub/:id',
    component: SingleSubProjectComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'who-we-are',
    component: WhoWeAreComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'all-category',
    component: AllCategorysComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  {
    path: 'page-not-found',
    component: NotFoundComponent,
    data: { title: 'Ace Capital Realty', description },
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
