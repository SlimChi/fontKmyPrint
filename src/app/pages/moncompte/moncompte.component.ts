import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-moncompte',
  templateUrl: './moncompte.component.html',
  styleUrls: ['./moncompte.component.css']
})
export class MoncompteComponent implements OnInit{
  async back() {
    window.history.back();
  }

  ngOnInit(): void {
  }
}
