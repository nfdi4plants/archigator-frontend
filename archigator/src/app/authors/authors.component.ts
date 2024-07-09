import { Component } from '@angular/core';

import {faSpinner, faTimes, faEnvelope, faUser, faBuildingUser} from '@fortawesome/free-solid-svg-icons';
import {faOrcid } from '@fortawesome/free-brands-svg-icons';
import {ArchigatorApiService} from "../archigator-api.service";
import {ApiService} from "../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {Creator, Metadata} from "../shared/response";



@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {


  faSpinner = faSpinner;
  faTimes = faTimes;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faOrcid= faOrcid;
  faBuildingUser= faBuildingUser;


  error = false;
  loading = true;

  creators ?: Creator[];
  metadata ?: Metadata;



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

  }



  // getEmail(creator: Creator): string {
  //   const emailIdentifier = creator.person_or_org.identifiers.find(
  //     (identifier) => identifier.scheme === 'email'
  //   );
  //   return emailIdentifier ? emailIdentifier.identifier : 'N/A';
  // }

  getEmail(creator: Creator): string {
    if (creator.person_or_org.identifiers && creator.person_or_org.identifiers.length > 0) {
      const emailIdentifier = creator.person_or_org.identifiers.find(
        (identifier) => identifier.scheme === 'email'
      );
      return emailIdentifier ? emailIdentifier.identifier : 'N/A';
    } else {
      return 'N/A';
    }
  }

  getOrcid(creator: Creator): string {
    if (creator.person_or_org.identifiers && creator.person_or_org.identifiers.length > 0) {
    const orcidIdentifier = creator.person_or_org.identifiers.find(
      (identifier) => identifier.scheme === 'orcid'
    );
    return orcidIdentifier ? orcidIdentifier.identifier : 'N/A';
    } else {
      return 'N/A';
    }
  }

  getAffiliations(creator: Creator): string[] {
    return creator.affiliations.map((affiliation) => affiliation.name);
  }



}
