import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as braintree from 'braintree-web';
import { HttpClient } from '@angular/common/http';
import { TokenService } from "../../services/token-service/token.service";

@Component({
  selector: 'app-paiment',
  templateUrl: './paiment.component.html',
  styleUrls: ['./paiment.component.css']
})
export class PaimentComponent implements OnInit {


  ngOnInit() {
  }

}
