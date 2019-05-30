import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { ServersService } from "../servers.service";

interface server {
    id: number;
    name: string;
    status: string;

}

@Injectable()
export class ServerResolver implements Resolve<server> {
    constructor( private serverservices : ServersService) {}
    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<server> | Promise<server> | server { 
        return this.serverservices.getServer(+route.params['id']);

    }
}