import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor() { }
  @Input() USDtoUAH:any
  @Input() EURtoUAH:any
  
}
