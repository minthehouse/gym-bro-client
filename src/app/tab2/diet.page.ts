import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-diet',
  templateUrl: 'diet.page.html',
  styleUrls: ['diet.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class DietPage {
  constructor(private router: Router, private route: ActivatedRoute) {}

  sendEvent(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }
}
