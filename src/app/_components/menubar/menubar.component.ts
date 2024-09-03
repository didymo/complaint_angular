import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [RouterModule, MatToolbar],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent {

}
