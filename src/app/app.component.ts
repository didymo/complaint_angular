import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { MenubarComponent } from "./_components/menubar/menubar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MenubarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Complaint Investigation Angular Components';
}