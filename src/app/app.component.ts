import { Component ,ElementRef} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'controlRoom_client';

  constructor(private elementRef: ElementRef,  public  _router: Router) { }

  ngOnInit() {
  }

}
