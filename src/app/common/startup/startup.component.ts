import { Component, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { BusinnessActivityService } from 'src/app/_services/businnessActivity.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html'
})
export class StartupComponent implements OnInit {
  findRequest: FindRequest = new FindRequest();
  loaded = false;
  allStartup: Page<SparqlResults> = new Page();
  constructor(private businnessActivityService: BusinnessActivityService) { }

  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    this.allStartup = this.businnessActivityService.find(
      null, pageRequest
    );
    this.loaded = true;
  }

  allStartupFilteredPageChanged(i: number) { }
  allStartupFilteredSizeChanged(i: number) { }
  allStartupFilteredSortChanged(pageRequest: PageRequest) { }

  filterDocuments() { }
}
