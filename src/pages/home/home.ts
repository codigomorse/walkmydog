import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  user={};
  constructor(private toast: ToastController,private afAuth:AngularFireAuth,public alert: AlertController,public platform: Platform,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
       this.user = data;
       this.toast.create({
         message: "Welcome to Walkmydog "+data.email,
         duration: 3000
       }).present();
       console.log(this.user);
     });
  }
  logoutUser(){
        let alert = this.alert.create({
        title: 'Confirm',
        message: 'Do you want sing out and exit?',
        buttons: [{
          text: "sing out and exit?",
          handler: () => { this.exitApp() }
        }, {
          text: "Cancel",
          role: 'cancel'
        }]
      })
      alert.present();
  }
  exitApp(){
    firebase.auth().signOut();
    this.platform.exitApp();
  }
}
