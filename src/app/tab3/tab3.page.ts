import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class Tab3Page {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logoutAndNavigate().subscribe(response => console.log(response));
  }
}
