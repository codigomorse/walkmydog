import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  user = {} as User;

  constructor(private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }
  register(){
      this.afAuth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password).catch(function(error) {
        // Handle Errors here.
        //var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ...
        })
      var user = this.afAuth.auth.currentUser;

    if (user) {
      console.log("estoy logueado");
      console.log(user);
      this.navCtrl.setRoot('Home');
    } else {
      console.log("nadie logueado");
      // No user is signed in.
      }
  }
}
