import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../service/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ProfilePage {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  logout() {
    this.authService.logoutAndNavigate().subscribe(response => console.log(response));
  }

  navigateTo(path: string) {
    this.router.navigate([path], { relativeTo: this.route, state: { isEditMode: true } });
  }
}
