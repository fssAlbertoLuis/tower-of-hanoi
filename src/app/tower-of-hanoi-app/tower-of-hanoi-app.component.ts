import { Component, OnInit } from '@angular/core';
import { HanoiService } from '../services/hanoi.service';
import { Disc } from './disc.interface';
import Movement from './movement.interface';
import TowerSolution from './towerSolution.interface';

@Component({
  selector: 'tower-of-hanoi-app',
  templateUrl: './tower-of-hanoi-app.component.html',
  styleUrls: ['./tower-of-hanoi-app.component.css']
})
export class TowerOfHanoiAppComponent implements OnInit {

  startedCalculating = false;
  cancelAnimation = false;

  currentStep = 0;
  state: string = '';
  numOfDiscs = 3;
  animationMs = '1000';
  solutionMode: "auto" | "step" = "auto";
  pegs: Array<Array<Disc>> = [
    [], [], []
  ];
  solution: TowerSolution;

  constructor(private hanoiService: HanoiService) {}

  ngOnInit(): void {
    this.pegs[0] = this.hanoiService.initialState(this.numOfDiscs);
    this.state = this.setState();
  }

  public start(): void {
    this.initialize();
    this.cancelAnimation = false;
    this.startedCalculating = true;
    this.solution = this.hanoiService.calculateSolution(this.numOfDiscs);
    if (this.solutionMode === 'auto') {
      this.solvingAnimation();
    }
  }

  public initialize(): void {
    this.pegs = [
      this.hanoiService.initialState(this.numOfDiscs),
      [],
      []
    ];
    this.state = this.setState();
    this.currentStep = 0;
  }

  private async animateDisc(step: number, ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms)).then(res => {
      this.moveDisc(step)
    });
  }

  public moveDisc(step: number) {
    if (this.currentStep === this.solution.movements.length) {
      this.reset();
      return;
    }
    const movement: Movement = this.solution.movements[step];
    let from = this.pegs[movement.from];
    let to = this.pegs[movement.to];
    const removedDisc = from.pop();
    to.push(removedDisc);
    from = this.hanoiService.recalculateDiscPos(from);
    to = this.hanoiService.recalculateDiscPos(to);
    this.pegs[movement.from] = from;
    this.pegs[movement.to] = to;
    this.state = this.setState();
    this.currentStep++;
  }

  private async solvingAnimation() {
    for (let i = 0; i < this.solution.movements.length; i++) {
      if (!this.cancelAnimation) {
        await this.animateDisc(i, Number(this.animationMs));
      } else {
        this.reset();
        this.initialize();
        break;
      }
    }
    this.startedCalculating = false;
  }

  private setState(): string {
    const a = [...this.pegs[0]].reverse().map(d => d.number).join('');
    const b = [...this.pegs[1]].reverse().map(d => d.number).join('');
    const c = [...this.pegs[2]].reverse().map(d => d.number).join('');
    return `A${a}B${b}C${c}`;
  }

  public reset() {
    if (this.solutionMode === 'auto') {
      this.cancelAnimation = true;
    } else {
      this.startedCalculating = false;
      this.initialize();
    }
  }
}
