import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // Admin API

  // Fetch the profile of the admin
  getadmin() {
    return this.http.get('http://localhost:3000/admin/profile');
  }

  // Update the admin's profile image
  updateaadminimage(img: any, id: any) {
    return this.http.patch(`http://localhost:3000/admin/updateimage/${id}`, img);
  }

  // Update the admin's profile information
  updateadmin(body: any, id: any) {
    return this.http.patch(`http://localhost:3000/admin/updateprofile/${id}`, body);
  }

  // Update the admin's password
  updatepassword(body: any, id: any) {
    return this.http.patch(`http://localhost:3000/admin/updatepassword/${id}`, body);
  }

  // Admin Formateur

  // Fetch all formateur profiles
  getAllformateur() {
    return this.http.get('http://localhost:3000/formateur/profiles');
  }

  // Add a new formateur
  addformateur(f: any) {
    return this.http.post('http://localhost:3000/formateur/register', f);
  }

  // Delete a formateur by ID
  deleteformateur(id: any) {
    return this.http.delete('http://localhost:3000/formateur/deleteprofile/' + id);
  }

  // Update formateur's profile by ID
  updateformateur(id: string, newprofile: any) {
    return this.http.patch('http://localhost:3000/formateur/updateprofile/' + id, newprofile);
  }

  // Fetch one formateur's profile by ID
  getoneformateur(id: any) {
    return this.http.get('http://localhost:3000/formateur/profile/' + id);
  }

  // Update the formateur's profile image by ID
  updateaformateurimage(img: any, id: any) {
    return this.http.patch(`http://localhost:3000/formateur/updateimage/${id}`, img);
  }

  // Update the formateur's CV by ID
  updateaformateurcv(cv: any, id: any) {
    return this.http.patch(`http://localhost:3000/formateur/updatecv/${id}`, cv);
  }

  // Update formateur's profile
  updateformateurf(body: any, id: any) {
    return this.http.patch(`http://localhost:3000/formateur/updateprofile/${id}`, body);
  }

  // Update formateur's password
  updatepasswordformateur(body: any, id: any) {
    return this.http.patch(`http://localhost:3000/formateur/updatepassword/${id}`, body);
  }

  // Admin Moderateur

  // Fetch all moderateur profiles
  getAllmoderateur() {
    return this.http.get('http://localhost:3000/moderateur/profiles');
  }

  // Add a new moderateur
  addmoderateur(f: any) {
    return this.http.post('http://localhost:3000/moderateur/register', f);
  }

  // Delete a moderateur by ID
  deletemoderateur(id: any) {
    return this.http.delete('http://localhost:3000/moderateur/deleteprofile/' + id);
  }

  // Update moderateur's profile by ID
  updatemoderateur(id: string, newprofile: any) {
    return this.http.patch('http://localhost:3000/moderateur/updateprofile/' + id, newprofile);
  }

  // Fetch one moderateur's profile by ID
  getonemoderateur(id: any) {
    return this.http.get('http://localhost:3000/moderateur/profile/' + id);
  }

  // Update the moderateur's profile image by ID
  updateamoderatorimage(img: any, id: any) {
    return this.http.patch(`http://localhost:3000/moderateur/updateimage/${id}`, img);
  }

  // Update moderateur's profile
  updatemoderator(body: any, id: any) {
    return this.http.patch(`http://localhost:3000/moderateur/updateprofile/${id}`, body);
  }

  // Update moderateur's password
  updatepasswordmoderateur(body: any, id: any) {
    return this.http.patch(`http://localhost:3000/moderateur/updatepassword/${id}`, body);
  }

  // Formateur Formation

  // Fetch all formations
  getAllformation() {
    return this.http.get('http://localhost:3000/formation/formations');
  }

  // Delete a formation by ID
  deleteformation(id: any) {
    return this.http.delete('http://localhost:3000/formation/deleteformation/' + id);
  }

  // Update formation by ID
  updateformation(id: string, newformation: any) {
    return this.http.patch('http://localhost:3000/formation/updateformation/' + id, newformation);
  }

  // Fetch one formation by ID
  getoneformation(id: any) {
    return this.http.get('http://localhost:3000/formation/formation/' + id);
  }

  // Add a formation by Formateur ID
  addformationparid(f: any, id: any) {
    return this.http.post(`http://localhost:3000/formation/addformation/${id}`, f);
  }

  // Update formation image by ID
  updateaformationimage(img: any, id: any) {
    return this.http.patch(`http://localhost:3000/formation/updateimage/${id}`, img);
  }

  // Fetch all formations by Formateur ID
  getAllFormationByFormateur(id: any) {
    return this.http.get(`http://localhost:3000/formation/formations/` + id);
  }

  // Pack API

  // Add a new pack
  addpack(f: any) {
    return this.http.post('http://localhost:3000/pack/addpack', f);
  }

  // Fetch all packs
  getAllpack() {
    return this.http.get('http://localhost:3000/pack/packs');
  }

  // Delete a pack by ID
  deletepack(id: any) {
    return this.http.delete('http://localhost:3000/pack/deletepack/' + id);
  }

  // Update a pack by ID
  updatepack(id: string, newpack: any) {
    return this.http.patch('http://localhost:3000/pack/updatepack/' + id, newpack);
  }

  // Fetch one pack by ID
  getonepack(id: any) {
    return this.http.get('http://localhost:3000/pack/pack/' + id);
  }

  // Buy points by Formateur ID
  buyPoints(formateurId: number, points: number) {
    return this.http.patch<any>(`http://localhost:3000/formateur/buyPoints/${formateurId}/${points}`, {});
  }

  // Demande API

  // Send a demande from Formateur to another Formateur
  envoyerDemande(FormateurId: number, FormationId: number, ReceiverId: number): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/demande/envoyer/${FormateurId}/${FormationId}/${ReceiverId}`, {});
  }

  // Fetch all demandes by Formateur ID
  getallDemandesByFormateurId(formateurId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/demande/myDemandes/${formateurId}`);
  }

  // Fetch all participation requests for a Formateur
  getDemandesParticipation(formateurId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/demande/RequestsReceive/${formateurId}`);
  }

  // Accept a participation request
  accepterRequest(FormateurId: number, FormationId: number, ReceiverId: number): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/participation/accepte/${FormateurId}/${FormationId}/${ReceiverId}`, {});
  }

  // Refuse a participation request
  refuserRequest(FormateurId: number, FormationId: number, ReceiverId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/demande/delete/${FormateurId}/${FormationId}/${ReceiverId}`, {});
  }

  // Fetch all accepted participations by Formateur ID
  getParticipation(FormateurId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/participation/myParticipation/${FormateurId}`);
  }

  // Delete a participation by Formateur ID, Formation ID, and Receiver ID
  ddeleteParticipation(FormateurId: number, FormationId: number, ReceiverId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/participation/deleteparticipation/${FormateurId}/${FormationId}/${ReceiverId}`, {});
  }

  // Fetch all accepted friends (participations) by Formateur ID
  getAcceptedFriends(formateurId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/participation/acceptedFriends/${formateurId}`);
  }
}
