import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ArchigatorApiService} from "../archigator-api.service";
import {Response} from "../shared/response"
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-project-owner',
  templateUrl: './project-owner.component.html',
  styleUrls: ['./project-owner.component.css']
})
export class ProjectOwnerComponent implements OnInit{

  status: Observable<Response> | undefined;

  user: Response | undefined;




  constructor(private apiService: ArchigatorApiService,
              private apiservice: ApiService,
              private route: ActivatedRoute) {
  }



  ngOnInit() {

    console.log("init owner module")


    // this.route.queryParamMap.subscribe(queryParams => {
    //   const signature = queryParams.get('signature');
    //   const project_name = queryParams.get('project_name');
    //   const project_id = queryParams.get('project_id');
    //
    //
    //   console.log("signature in owner", signature)
    //   let request = {
    //     signature: signature,
    //     project_name: project_name,
    //     project_id: project_id
    //   };
    //
    //
    //   this.apiservice.getStatus(request).subscribe((data: Response) => {
    //     console.log(data)
    //     this.user = data
    //   })
    //
    //
    // });




  }


}
