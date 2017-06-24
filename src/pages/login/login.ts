import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  user = {} as User;

  constructor(private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
  goRegister(){
    this.navCtrl.push('Register');
  }
  doLogin(){
    console.log("logeate a :"+this.user);
    try{
      //const result = this.afAuth.auth.signInWithEmailAndPassword(this.user.email,this.user.password);
      //console.log(result);
    }catch(e){
      console.error(e);
    }
  }

}
