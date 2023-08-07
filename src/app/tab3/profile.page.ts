import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ProfilePage {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logoutAndNavigate().subscribe(response => console.log(response));
  }
}
