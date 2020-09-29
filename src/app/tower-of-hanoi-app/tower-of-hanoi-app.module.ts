import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TowerOfHanoiAppComponent } from './tower-of-hanoi-app.component';
import { PegComponent } from '../peg/peg.component';
import { HanoiService } from '../services/hanoi.service';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [TowerOfHanoiAppComponent, PegComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [TowerOfHanoiAppComponent],
  providers: [HanoiService]
})
export class TowerOfHanoiAppModule { }
