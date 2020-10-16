import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  inputs: ['data', 'errorMessage']
})
export class ResultsComponent implements OnInit {

  data: any = null;
  errorMessage: String = null;

  constructor() { }

  ngOnInit(): void {
    console.log("into results component");
    console.log(this.data);
    console.log(this.errorMessage);
  }

  ngOnChanges(changes: any) {
        
    // this.doSomething(changes.categoryId.currentValue);
    
    console.log("into results component");
    console.log("data "+this.data);
    console.log(this.data);
    console.log("error "+this.errorMessage);
    
}


}
