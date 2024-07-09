import {Component, OnInit} from '@angular/core';
import {Creator, Metadata, Response} from "../shared/response";
import {ArchigatorApiService} from "../archigator-api.service";
import {ApiService} from "../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {faSpinner, faTimes, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-authors-card',
  templateUrl: './authors-card.component.html',
  styleUrls: ['./authors-card.component.css']
})
export class AuthorsCardComponent implements OnInit{

  metadata ?: Metadata;
  creators ?: Creator[];

  faSpinner = faSpinner;
  loading = true;

  error = false;

  faTimes = faTimes;
  faEnvelope = faEnvelope;
  faUser = faUser;



  constructor(private apiService: ArchigatorApiService,
              private apiservice: ApiService,
              private route: ActivatedRoute) {
  }


  ngOnInit() {

    // @ts-ignore
    this.apiservice.getMetadata().subscribe((data: Metadata) => {
      console.log("data", data)
      this.metadata = data;
      this.creators = data.creators;
      this.loading = false;

      if (data === null) {
        console.log("data are null")
        this.error = true;
      }

    },

      (error) => {
        this.loading = false;
        console.log("error occurred")
        this.error = true;
    });

    // this.route.queryParamMap.subscribe(queryParams => {
    //   const signature = queryParams.get('signature');
    //   const project_name = queryParams.get('project_name');
    //   const project_id = queryParams.get('project_id');
    //
    //   if (!signature || !project_name ||!project_id){
    //     return
    //   }
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
    //     console.log("data", data)
    //     this.metadata=data.metadata
    //     this.creators=data.metadata.creators
    //     // console.log(this.user3)
    //   })
    //
    //
    // });

  }

  remove_author(creator: Creator):void {
    const index = this.creators?.indexOf(creator);
    // @ts-ignore
    if (index > -1) {
      // @ts-ignore
      this.creators?.splice(index,1)
    }
  }

}
