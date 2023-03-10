import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  // baseurl = 'http://localhost/Techies/AceCapital/Backend2/';
  // frontendurl = 'http://localhost:4200';

  // baseurl = 'https://aceadmin.deepdiveinnovations.dev/';
  // frontendurl = 'https://aceadmin.deepdiveinnovations.dev/ang';

  // baseurl = 'https://acecapitalrealty.com/admin/';
  // frontendurl = 'https://acecapitalrealty.com';

  baseurl = 'https://dashboard.acecapitalrealty.com/';
  frontendurl = 'https://nrx.sag.mybluehost.me';

  getPropertType() {
    return this.http.get(this.baseurl + 'api/get-all-property-types');
  }

  getProjects() {
    return this.http.get(this.baseurl + 'api/get-all-project');
  }

  addCallback(data: any) {
    return this.http.post(this.baseurl + 'api/add-callback', data);
  }

  getProperts(data: any) {
    return this.http.post(this.baseurl + 'api/get-properts', data);
  }

  getPropertBySearch(data: any) {
    return this.http.post(this.baseurl + 'api/get-properts-by-search', data);
  }

  getPropertBySearchFilter(data: any) {
    return this.http.post(
      this.baseurl + 'api/get-properts-by-search-filter',
      data
    );
  }

  getPropertyDetails(data: any) {
    return this.http.post(this.baseurl + 'api/get-single-property', data);
  }

  saveAppointmeant(data: any) {
    return this.http.post(this.baseurl + 'api/saveAppointmeant', data);
  }

  getAgentTimesloat(data: any) {
    return this.http.post(this.baseurl + 'api/getAgentTimesloat', data);
  }

  getAllBlogs() {
    return this.http.get(this.baseurl + 'api/getAllBlogs');
  }

  getAllBlogsC() {
    return this.http.get(this.baseurl + 'api/getAllBlogsC');
  }

  getAllBlogsSingle(data: any) {
    return this.http.post(this.baseurl + 'api/getAllBlogsSingle', data);
  }

  getProjectsSingle(data: any) {
    return this.http.post(this.baseurl + 'api/getProjectSingle', data);
  }

  getProjectsSingleSub(data: any) {
    return this.http.post(this.baseurl + 'api/getProjectSingleSub', data);
  }

  getSubProjects(data: any) {
    return this.http.post(this.baseurl + 'api/getSubProjects', data);
  }

  getSubProperty(data: any) {
    return this.http.post(this.baseurl + 'api/getSubProperty', data);
  }

  getAllSubProject() {
    return this.http.get(this.baseurl + 'api/getAllSubProject');
  }

  saveBookVisit(data: any) {
    return this.http.post(this.baseurl + 'api/saveBookVisit', data);
  }

  getHomeData() {
    return this.http.get(this.baseurl + 'api/getHomeData');
  }

  getHolidays() {
    return this.http.get(this.baseurl + 'api/getAllPublicHolidays');
  }
  submitContactForm(data: any) {
    return this.http.post(this.baseurl + 'api/sendcontactmail', data);
  }

  submitCareersForm(data: any) {
    return this.http.post(this.baseurl + 'api/sendcareermail', data);
  }

  getOtherData() {
    return this.http.get(this.baseurl + 'api/getOtherData');
  }
}
