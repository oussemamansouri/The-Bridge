import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  //admin api

  getadmin(){
    return this.http.get('http://localhost:3000/admin/profile') // ,{params:this.params,headers:this.header} |
   }

   updateaadminimage(img:any,id:any){
    return this.http.patch(`http://localhost:3000/admin/updateimage/${id}`,img)
  }

  updateadmin(body:any,id:any){
    return this.http.patch(`http://localhost:3000/admin/updateprofile/${id}`,body) // ,{params:this.params,headers:this.header} |
   }

   updatepassword(body:any,id:any){
    return this.http.patch(`http://localhost:3000/admin/updatepassword/${id}`,body) // ,{params:this.params,headers:this.header} |
   }




// admin formateur

  getAllformateur(){
    return this.http.get('http://localhost:3000/formateur/profiles')
  }

  addformateur(f:any){
    return this.http.post('http://localhost:3000/formateur/register',f)
  }

  deleteformateur(id:any){
    return this.http.delete('http://localhost:3000/formateur/deleteprofile/'+id)
  }

  updateformateur(id:string,newprofile:any){
    return this.http.patch('http://localhost:3000/formateur/updateprofile/'+id,newprofile)
  }

  getoneformateur(id:any){
    return this.http.get('http://localhost:3000/formateur/profile/'+id)
  }
  updateaformateurimage(img:any,id:any){
    return this.http.patch(`http://localhost:3000/formateur/updateimage/${id}`,img)
  }
  updateaformateurcv(cv:any,id:any){
    return this.http.patch(`http://localhost:3000/formateur/updatecv/${id}`,cv)
  }

  updateformateurf(body:any,id:any){
    return this.http.patch(`http://localhost:3000/formateur/updateprofile/${id}`,body) // ,{params:this.params,headers:this.header} |
   }

   updatepasswordformateur(body:any,id:any){
    return this.http.patch(`http://localhost:3000/formateur/updatepassword/${id}`,body) // ,{params:this.params,headers:this.header} |
   }
  // fin  admin formateur


// admin moderateur

  getAllmoderateur(){
    return this.http.get('http://localhost:3000/moderateur/profiles')
  }

  addmoderateur(f:any){
    return this.http.post('http://localhost:3000/moderateur/register',f)
  }

  deletemoderateur(id:any){
    return this.http.delete('http://localhost:3000/moderateur/deleteprofile/'+id)
  }

  updatemoderateur(id:string,newprofile:any){
    return this.http.patch('http://localhost:3000/moderateur/updateprofile/'+id,newprofile)
  }

  getonemoderateur(id: any) {
    return this.http.get('http://localhost:3000/moderateur/profile/'+ id);
  }

  updateamoderatorimage(img:any,id:any){
    return this.http.patch(`http://localhost:3000/moderateur/updateimage/${id}`,img)
  }

  updatemoderator(body:any,id:any){
    return this.http.patch(`http://localhost:3000/moderateur/updateprofile/${id}`,body) // ,{params:this.params,headers:this.header} |
   }

   updatepasswordmoderateur(body:any,id:any){
    return this.http.patch(`http://localhost:3000/moderateur/updatepassword/${id}`,body) // ,{params:this.params,headers:this.header} |
   }
//  fin admin moderateur

// formateur formation

getAllformation(){
  return this.http.get('http://localhost:3000/formation/formations')
}

// addformation(f:any){
//   return this.http.post('http://localhost:3000/formation/addformation',f)
// }

deleteformation(id:any){
  return this.http.delete('http://localhost:3000/formation/deleteformation/'+id)
}

updateformation(id:string,newformation:any){
  return this.http.patch('http://localhost:3000/formation/updateformation/'+id,newformation)
}

getoneformation(id:any){
  return this.http.get('http://localhost:3000/formation/formation/'+id)
}

addformationparid(f: any, id: any) {
  return this.http.post(`http://localhost:3000/formation/addformation/${id}`, f);
}

updateaformationimage(img:any,id:any){
  return this.http.patch(`http://localhost:3000/formation/updateimage/${id}`,img)
}
// getAllFormationByFormateur(FormateurId: string){
//   return this.http.get(`http://localhost:3000/formation/formations/${FormateurId}`);
// }
getAllFormationByFormateur(id: any){
  return this.http.get(`http://localhost:3000/formation/formations/`+id);
}

// pack api

addpack(f:any){
  return this.http.post('http://localhost:3000/pack/addpack',f)
}

getAllpack(){
  return this.http.get('http://localhost:3000/pack/packs')
}

deletepack(id:any){
  return this.http.delete('http://localhost:3000/pack/deletepack/'+id)
}
updatepack(id:string,newpack:any){
  return this.http.patch('http://localhost:3000/pack/updatepack/'+id,newpack)
}
getonepack(id:any){
  return this.http.get('http://localhost:3000/pack/pack/'+id)
}

buyPoints(formateurId: number, points: number) {
  return this.http.patch<any>(`http://localhost:3000/formateur/buyPoints/${formateurId}/${points}`, {})
}



////////////////////

envoyerDemande(FormateurId: number, FormationId: number,ReceiverId:number ): Observable<any> {
  return this.http.post<any>(`http://localhost:3000/demande/envoyer/${FormateurId}/${FormationId}/${ReceiverId}`, {});
}

getallDemandesByFormateurId(formateurId: number): Observable<any> {
  return this.http.get<any>(`http://localhost:3000/demande/myDemandes/${formateurId}`);
}



getDemandesParticipation(formateurId: number): Observable<any> {
  return this.http.get<any>(`http://localhost:3000/demande/RequestsReceive/${formateurId}`);
}

accepterRequest(FormateurId: number,FormationId: number,ReceiverId: number): Observable<any> {
  return this.http.post<any>(`http://localhost:3000/participation/accepte/${FormateurId}/${FormationId}/${ReceiverId}`,{});
}

refuserRequest(FormateurId: number,FormationId: number,ReceiverId: number): Observable<any> {
  return this.http.delete<any>(`http://localhost:3000/demande/delete/${FormateurId}/${FormationId}/${ReceiverId}`,{});
}

getParticipation(FormateurId: number): Observable<any> {
  return this.http.get<any>(`http://localhost:3000/participation/myParticipation/${FormateurId}`,{});
}


ddeleteParticipation(FormateurId: number,FormationId: number,ReceiverId: number): Observable<any> {
  return this.http.delete<any>(`http://localhost:3000/participation/deleteparticipation/${FormateurId}/${FormationId}/${ReceiverId}`,{});
}





getAcceptedFriends(formateurId: number): Observable<any> {
  return this.http.get<any>(`http://localhost:3000/participation/acceptedFriends/${formateurId}`);
}


}


