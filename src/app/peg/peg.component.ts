import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Disc } from '../tower-of-hanoi-app/disc.interface';

@Component({
  selector: 'app-peg',
  templateUrl: './peg.component.html',
  styleUrls: ['./peg.component.css']
})
export class PegComponent {
  
  @Input() discs: Disc[];

  constructor() { }

  public setStyle(disc: Disc) {
    return {
      fontSize: '10px',
      backgroundColor: disc.color,
      height: `${disc.height}px`,
      width: `${disc.width}px`,
      bottom: `${26+disc.position.y}px`,
      left: `${3+disc.position.x}px`
    }
  }
}
