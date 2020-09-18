import { Component, OnInit } from '@angular/core';
import Yasgui from "@triply/yasgui";
import Yasqe from "@triply/yasqe";
import Yasr from "@triply/yasr"
import { yasgui } from '../../environments/environment';
import * as superagent from "superagent";
import { SuperAgentRequest } from 'superagent';

@Component({
  selector: 'app-sparqleditor',
  templateUrl: './sparqleditor.component.html',
  styleUrls: ['./sparqleditor.component.css']
})
export class SPARQLEditorComponent implements OnInit {

  jsonData = null;

  constructor() { }

  ngOnInit(): void {

    Yasgui.defaults.requestConfig.endpoint = yasgui.endpoint;
    Yasgui.defaults.requestConfig.method = (yasgui.method == "GET") ? "GET" : "POST";

    const yasqe = new Yasgui.Yasqe(document.getElementById("yasgui"));

    yasqe.on("queryResponse", (instance: Yasqe, req: superagent.SuperAgentRequest, duration: number) => {
      // this.onQueryResponse(instance, req, duration, yasr);
      this.onQueryResponse(instance, req, duration);
    });
  }


  // When Yasgui gets the results
  onQueryResponse(instance: Yasqe, data: SuperAgentRequest, duration: number) {

    // const yasr = new Yasr(document.getElementById("yasr"));

    // yasr.setResponse(data);

    /* result parse JSON */
    this.jsonData = JSON.parse((data as any).text);
    console.log(this.jsonData.results.bindings);
  }

}

