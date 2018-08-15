import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'star-view',
  templateUrl: './star-view.component.html',
  styleUrls: ['./star-view.component.css']
})
export class StarViewComponent implements OnInit {

  @Input("selectedStar")
  public selectedStar: number;

  @Input("inputEnabled")
  public isInputEnabled: boolean;

  @Output()
  public starSelected = new EventEmitter();
  
  public star1no: boolean = true;
  public star1half: boolean = false;
  public star1full: boolean = false;

  public star2no: boolean = true;
  public star2half: boolean = false;
  public star2full: boolean = false;

  public star3no: boolean = true;
  public star3half: boolean = false;
  public star3full: boolean = false;

  public star4no: boolean = true;
  public star4half: boolean = false;
  public star4full: boolean = false;

  public star5no: boolean = true;
  public star5half: boolean = false;
  public star5full: boolean = false;

  constructor() { }

  ngOnInit() {
    this.setStars(this.selectedStar);
  }

  starClicked(starId: number){
    this.setStars(starId);
    this.starSelected.emit(starId);
  }

  setStars(starNumber: number): void{
    //Case 0
    if(starNumber == 0){
      this.initStars();
    }
    //Case 0 - 0.5    
    if(starNumber > 0 && starNumber <= 0.5){
      this.setStar1(false, true, false);
      this.setStar2(true, false, false);
      this.setStar3(true, false, false);
      this.setStar4(true, false, false);
      this.setStar5(true, false, false);
    }
    //Case 0.5 - 1    
    if(starNumber > 0.5 && starNumber <= 1){
      this.setStar1(false, false, true);
      this.setStar2(true, false, false);
      this.setStar3(true, false, false);
      this.setStar4(true, false, false);
      this.setStar5(true, false, false);
    }
    //Case 1 - 1-5    
    if(starNumber > 1 && starNumber <= 1.5){
      this.setStar1(false, false, true);
      this.setStar2(false, true, false);
      this.setStar3(true, false, false);
      this.setStar4(true, false, false);
      this.setStar5(true, false, false);
    }
    //Case 1.5 - 2     
    if(starNumber > 1.5 && starNumber <= 2){
      this.setStar1(false, false, true);
      this.setStar2(false, false, true);
      this.setStar3(true, false, false);
      this.setStar4(true, false, false);
      this.setStar5(true, false, false);
    }
    //Case 2 - 2.5    
    if(starNumber > 2 && starNumber <= 2.5){
      this.setStar1(false, false, true);
      this.setStar2(false, false, true);
      this.setStar3(false, true, false);
      this.setStar4(true, false, false);
      this.setStar5(true, false, false);
    }
    //Case 2.5 - 3    
    if(starNumber > 2.5 && starNumber <= 3){
      this.setStar1(false, false, true);
      this.setStar2(false, false, true);
      this.setStar3(false, false, true);
      this.setStar4(true, false, false);
      this.setStar5(true, false, false);
    }
    //Case 3 - 3.5    
    if(starNumber > 3 && starNumber <= 3.5){
      this.setStar1(false, false, true);
      this.setStar2(false, false, true);
      this.setStar3(false, false, true);
      this.setStar4(false, true, false);
      this.setStar5(true, false, false);
    }
    //Case 3.5 - 4
    if(starNumber > 3.5 && starNumber <= 4){
      this.setStar1(false, false, true);
      this.setStar2(false, false, true);
      this.setStar3(false, false, true);
      this.setStar4(false, false, true);
      this.setStar5(true, false, false);
    }
    //Case 4 - 4.5    
    if(starNumber > 4 && starNumber <= 4.5){
      this.setStar1(false, false, true);
      this.setStar2(false, false, true);
      this.setStar3(false, false, true);
      this.setStar4(false, false, true);
      this.setStar5(false, true, false);
    }
    //Case 4.5 - 5    
    if(starNumber > 4.5 && starNumber <= 5){
      this.setStar1(false, false, true);
      this.setStar2(false, false, true);
      this.setStar3(false, false, true);
      this.setStar4(false, false, true);
      this.setStar5(false, false, true);
    }
  }

  setStar1(no: boolean, half: boolean, full: boolean){
    this.star1no = no;
    this.star1half = half;
    this.star1full = full;
  }

  setStar2(no: boolean, half: boolean, full: boolean){
    this.star2no = no;
    this.star2half = half;
    this.star2full = full;
  }

  setStar3(no: boolean, half: boolean, full: boolean){
    this.star3no = no;
    this.star3half = half;
    this.star3full = full;
  }

  setStar4(no: boolean, half: boolean, full: boolean){
    this.star4no = no;
    this.star4half = half;
    this.star4full = full;
  }

  setStar5(no: boolean, half: boolean, full: boolean){
    this.star5no = no;
    this.star5half = half;
    this.star5full = full;
  }

  initStars(){
    this.setStar1(true, false, false);
    this.setStar2(true, false, false);
    this.setStar3(true, false, false);
    this.setStar4(true, false, false);
    this.setStar5(true, false, false);
  }

}
