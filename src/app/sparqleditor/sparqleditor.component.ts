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

  //result = '';

  constructor() { }

  ngOnInit(): void {

    Yasgui.defaults.requestConfig.endpoint = yasgui.endpoint;
    Yasgui.defaults.requestConfig.method = "POST";

    const yasqe = new Yasgui.Yasqe(document.getElementById("yasgui"));
    const yasr = new Yasr(document.getElementById("yasr"));

    yasqe.on("queryResponse", (instance: Yasqe, req: superagent.SuperAgentRequest, duration: number) => {
      this.onQueryResponse(instance, req, duration, yasr);
    });
  }

  onQueryResponse(instance: Yasqe, data: SuperAgentRequest, duration: number, yasr: Yasr) {
    
    yasr.setResponse(data);

    /* result parse JSON */
    const jsonData = JSON.parse((data as any).text);
    console.log(jsonData.results.bindings);
    //this.result = JSON.stringify(jsonData.results.bindings);
  }

}
