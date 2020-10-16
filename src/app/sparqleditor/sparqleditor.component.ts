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

  jsonData: any = null;
  errorMessage: any;

  constructor() { }

  ngOnInit(): void {

    Yasgui.defaults.requestConfig.endpoint = yasgui.endpoint;
    Yasgui.defaults.requestConfig.method = (yasgui.method == "GET") ? "GET" : "POST";

    const yasqe = new Yasgui.Yasqe(document.getElementById("yasgui"));


    yasqe.on("queryResponse", (instance: Yasqe, req: any, duration: number) => {
      // this.onQueryResponse(instance, req, duration, yasr);
      console.log("queryResponse");
      this.onQueryResponse(instance, req, duration);
    });



  }


  // When Yasgui gets the results
  onQueryResponse(instance: Yasqe, data: any, duration: number) {

    // const yasr = new Yasr(document.getElementById("yasr"));

    // yasr.setResponse(data);

    /* result parse JSON */
    if(data.hasOwnProperty("text")) {
      this.errorMessage = null;
      this.jsonData = JSON.parse((data as any).text);
      console.log(this.jsonData.results.bindings);
    } else if (data.hasOwnProperty("response")) {
      if(data.response.status == 400) {
        this.errorMessage = (data as any).response.text;
        this.jsonData = null;
      }
    }
  } 

}

