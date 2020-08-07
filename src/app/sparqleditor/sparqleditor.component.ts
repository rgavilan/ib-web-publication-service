import { Component, OnInit } from '@angular/core';
import Yasgui from "@triply/yasgui";
import Yasqe from "@triply/yasqe";
import Yasr from "@triply/yasr"
import { Parser, Plugin } from "@triply/yasr";
import * as superagent from "superagent";
import { SuperAgentRequest } from 'superagent';

@Component({
  selector: 'app-sparqleditor',
  templateUrl: './sparqleditor.component.html',
  styleUrls: ['./sparqleditor.component.css']
})
export class SPARQLEditorComponent implements OnInit {

  result = '';

  constructor() { }

  ngOnInit(): void {
    // const yasgui = new Yasgui(document.getElementById("yasgui"), {});
    // yasgui.getTab().getYasqe();

    const yasqe = new Yasgui.Yasqe(document.getElementById("yasgui"));
    // yasqe.on("query", this.onQuery);
    yasqe.on("queryResponse", (instance: Yasqe, req: superagent.SuperAgentRequest, duration: number) => {
      this.onQueryResponse(instance, req, duration);
    });

    Yasr.registerPlugin("iztest", IzTest as any);

    
    // yasqe.on("queryResponse", this.onQueryResponse);
  }

  onQueryResponse(instance: Yasqe, data: SuperAgentRequest, duration: number) {
    const jsonData = JSON.parse((data as any).text);
    console.log(jsonData.results.bindings);
    this.result = JSON.stringify(jsonData.results.bindings);
    // req.text
    // myTest();

    // let parser = new Parser(data, duration);
    // let json = parser.getAsJson();

    // console.info("prueba");

    // console.log(json);
  }

}
