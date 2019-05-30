import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './candeactivategaurd.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate{
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowedit= false;
  changessaved= false;

  constructor(private serversService: ServersService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe(
      (queryparams: Params)=> {
        this.allowedit= queryparams['allowedit'] === '1' ? true : false;
      }
    );
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changessaved= true;
    this.router.navigate(['../'],{relativeTo: this.route});
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowedit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changessaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }

  }

}
