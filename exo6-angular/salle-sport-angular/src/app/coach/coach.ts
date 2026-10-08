import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coach',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './coach.html',
  styleUrl: './coach.css'
})
export class Coach {}