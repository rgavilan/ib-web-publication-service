import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-results',
  templateUrl: './error-results.component.html',
  styleUrls: ['./error-results.component.css']
})
export class ErrorResultsComponent implements OnInit {

  @Input()
  errorMessage; // private property _data
  
  ngOnInit(): void {
    console.log(this.errorMessage);
  }
}
