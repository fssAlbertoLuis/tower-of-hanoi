import { Injectable } from '@angular/core';
import { Disc } from '../tower-of-hanoi-app/disc.interface';
import Movement from '../tower-of-hanoi-app/movement.interface';
import TowerSolution from '../tower-of-hanoi-app/towerSolution.interface';

@Injectable({
  providedIn: 'root'
})
export class HanoiService {

  nMovements = 0;
  movements: Movement[] = [];

  widthIncrement = 3;
  baseDiscHeight = 15;
  baseDiscWidth = 120;
  colors: string[] = [
    '#ff5151', '#5050e8', '#ffc04b', '#131c73', '#b15353',
    '#f1ef28', '#ff009f', '#ba00ff', '#66c5b1', '#ffa5ee'
  ];

  constructor() { }

  public initialState(discsQty: number): Disc[] {
    let discs: Disc[] = [];
    for(let i=0; i < discsQty; i++) {
      discs.push({
        number: i+1,
        height: this.baseDiscHeight,
        width: this.baseDiscWidth - (i*(2*this.widthIncrement)),
        color: this.colors[i],
        position: {
          x: this.widthIncrement * i,
          y: this.baseDiscHeight * i
        }
      });
    }
    return discs;
  }

  public recalculateDiscPos(discs: Disc[]): Disc[] {
    let newDiscs = [];
    for(let i=0; i < discs.length; i++) {
      const oldDisc = discs[i];
      newDiscs.push({
        ...oldDisc,
        position: {
          x: oldDisc.position.x,
          y: this.baseDiscHeight * i
        }
      });
    }
    return newDiscs;
  }
  public calculateSolution(discsQty: number): TowerSolution {
    this.nMovements = 0;
    this.movements = [];
    return this.hanoi(discsQty, 0, 2, 1);
  }

  private hanoi(
    discs: number, from: number, aux: number, to: number
  ): TowerSolution {
    if (discs > 0) {
      this.hanoi(discs - 1, from, to, aux);
      this.movements.push({from, to: aux});
      this.hanoi(discs - 1, to, aux, from);
      this.nMovements++;
    }
    return {movements: this.movements};
  }
}
