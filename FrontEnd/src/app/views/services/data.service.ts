import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getonemoderateur(id:any){
    return this.http.get('http://localhost:3000/moderateur/profile/'+id)
  }
//  fin admin moderateur

// formateur formation

getAllformation(){
  return this.http.get('http://localhost:3000/moderateur/formations')
}

addformation(f:any){
  return this.http.post('http://localhost:3000/formation/addformation',f)
}

deleteformation(id:any){
  return this.http.delete('http://localhost:3000/formation/deleteformation/'+id)
}

updateformation(id:string,newformation:any){
  return this.http.patch('http://localhost:3000/formation/updateformation/'+id,newformation)
}

getoneformation(id:any){
  return this.http.get('http://localhost:3000/formation/formation/'+id)
}

}
