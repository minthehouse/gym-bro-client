import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../service/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ServerType } from '../enums/server-type.enum';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ProfilePage {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
  ) {}

  logout() {
    if (environment.serverType === ServerType.RAILS) {
      this.authService.logoutAndNavigate().subscribe(response => console.log(response));
    } else if (environment.serverType === ServerType.EXPRESS) {
      this.storageService.deleteSession();
      this.router.navigate(['/landing']);
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path], { relativeTo: this.route, state: { isEditMode: true } });
  }
}
