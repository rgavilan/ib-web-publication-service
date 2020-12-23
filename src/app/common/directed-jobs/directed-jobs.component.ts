import { Component, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { DirectedJobsService } from 'src/app/_services/directedJobs.service';

@Component({
  selector: 'app-directed-jobs',
  templateUrl: './directed-jobs.component.html'
})
export class DirectedJobsComponent implements OnInit {
  findRequest: FindRequest = new FindRequest();
  loaded = false;
  allDirectedJobs: Page<SparqlResults> = new Page();
  constructor(private directedJobsService: DirectedJobsService) { }

  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    this.allDirectedJobs = this.directedJobsService.find(
      null, pageRequest
    );
    this.loaded = true;
  }

  allParticipantsFilteredPageChanged(i: number) { }
  allParticipantsFilteredSizeChanged(i: number) { }
  allParticipantsFilteredSortChanged(pageRequest: PageRequest) { }
}
