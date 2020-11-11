import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ResearchmentStructuresService } from 'src/app/_services/researchment.structures.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
@Component({
  selector: 'app-researchment-structures-detail',
  templateUrl: './researchment-structures-detail.component.html',
  styleUrls: ['./researchment-structures-detail.component.css']
})
export class ResearchmentStructuresDetailComponent implements OnInit {
  @ViewChild('resultsTab', { static: false })
  resultsTab: TabsetComponent;
  /**
   * researchment structure Id
   */
  researchmentId: string;
  /** 
   * researchment
   */
  researchment: any;




  constructor(private router: Router,
              private translate: TranslateService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private researchmentStructureService: ResearchmentStructuresService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.researchmentId = params.id; // (+) converts string 'id' to a number
      if (this.researchmentId) {
        this.researchmentStructureService.getById(this.researchmentId).subscribe(data => {
          this.researchment = data;
        });

      }
    });
  }

}
