import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Loading,LoadingController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  user = {} as User;
  public loginForm:FormGroup;
  public loading:Loading;

  constructor(public loadingCtrl: LoadingController,public formBuilder: FormBuilder,public alertCtrl: AlertController, private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, 
        EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), 
        Validators.required])]
    });
  }

  ionViewDidLoad() {
    const unsubscribe = this.afAuth.auth.onAuthStateChanged((user) => {
        if (!user) {
          unsubscribe();
        } else { 
          this.navCtrl.setRoot('Home');
          unsubscribe();
        }
      });

  }
  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }
  goToSignup(){
    this.navCtrl.push('Register');
  }
  loginUser(): void {
  if (!this.loginForm.valid){
    console.log(this.loginForm.value);
  } else {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, 
        this.loginForm.value.password)
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
}
}
