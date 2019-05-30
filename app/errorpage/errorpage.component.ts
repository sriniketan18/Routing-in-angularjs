import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent implements OnInit {
  error_message: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.error_message= this.route.snapshot.data['message'];
    this.route.data.subscribe(
      (data: Data) => {
        this.error_message= data['message'];
      }
    );
  }

}
