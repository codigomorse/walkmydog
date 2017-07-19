import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,LoadingController, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  user = {} as User;
  public loading:Loading;

  constructor(private afAuth:AngularFireAuth,public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }
  register(){
      this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, 
        this.user.password)
    .then( authData => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot('Home');
      });
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
  loginUser(): void {
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, 
        this.user.password)
    .then( authData => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot('Home');
      });
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
    goToResetPassword(){
    let prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: "Enter your mail address",
      inputs: [
        {
          name: 'mail',
          placeholder: 'mail'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            
          }
        },
        {
          text: 'Send',
          handler: data => {
            this.afAuth.auth.sendPasswordResetEmail(data.mail).then(function() {
              // Email sent.
              alert("email send");
            }, function(error) {
              alert(error);
              // An error happened.
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
