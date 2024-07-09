import {Component, OnInit, SimpleChanges} from '@angular/core';
import {faEnvelope, faUser, faSpinner, faImage } from '@fortawesome/free-solid-svg-icons';
import {User, Project, Pipeline, Metadata, PublishResponse} from "../shared/response";
import {ArchigatorApiService} from "../archigator-api.service";
import {ApiService} from "../services/api.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Meta} from "@angular/platform-browser";
import {DatashareService} from "../services/datashare.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";

import {ParametersService} from "../services/parameters.service";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  faEnvelope = faEnvelope;
  faUser = faUser;


  // user: Response | undefined;
  // user ?: User;
  project ?: Project;
  pipeline ?: Pipeline;
  metadata ?: Metadata;
  publish_response ?: PublishResponse;

  // user: User | undefined;
  user: User | null = null;




  spinLoader = false;
  faSpinner = faSpinner;
  faImage = faImage;

  projectLoading = true;
  // ownerLoading = true;

  userDataSubscription!: Subscription;


  ownerLoading!: Observable<boolean>;
  pravatar_url: BehaviorSubject<string> = new BehaviorSubject<string>("null");

  isButtonDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  isPipelineFailed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isUserNoMember: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


  termsChecked = false;
  authorsChecked = false;

  // user3: User[] = []


  constructor(private apiService: ArchigatorApiService,
              private apiservice: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datashare: DatashareService,
              private parameterService: ParametersService) {
  }


  ngOnChanges(changes: SimpleChanges) {
    if ('disabled' in changes && changes['disabled'])
      this.spinLoader = false;
  }


  private fetchUserData(): void {
    this.apiservice.fetchUserData();
  }

  ngOnInit() {

    this.projectLoading = true;

    this.ownerLoading = this.apiservice.getLoadingState();

    console.log("init owner module")

    // @ts-ignore
    // this.apiservice.getOwner().subscribe((data: User) => {
    //   console.log("data", data)
    //   this.user = data
    //
    //   this.ownerLoading = false;
    // },
    //
    // (error) => {
    //   console.log("error in project loading")
    //   this.ownerLoading = false;
    // }
    //
    // );

    // this.apiservice.fetchUserData();
    // this.apiservice.getUserData().subscribe((userData: User) => {
    //   this.user = userData;
    //   // this.ownerLoading = false;
    // });


    console.log("checkout initialized, now fetching user data")
    this.apiservice.fetchUserData();
    this.userDataSubscription = this.apiservice.getUserData().subscribe((userData: User) => {
      console.log("user date updated", userData)
      this.user = userData;
      console.log("userdata", userData)
      console.log(typeof(userData.is_member))

      if (userData.is_member == true) {
        console.log("user is in member group, activating button")
        this.isUserNoMember.next(false);
      }

    });



    // @ts-ignore
    this.apiservice.getProject().subscribe((data: Project) => {
        console.log("data", data)
        this.project = data
        console.log("pipelineing", this.pipeline)
        console.log("pipelineing", this.pipeline?.status)

        if (data.status === "success") {
          console.log("pipeline was successfull activating button")
          this.isPipelineFailed.next(false);
        }

        if (data.avatar_url === null) {
          console.log("icon is null")
          this.pravatar_url.next("none");
          console.log(this.pravatar_url)
        }
        else
        {
          console.log("icon is not null")
          this.pravatar_url.next(data.avatar_url);
        }

        this.projectLoading = false;

      },
      (error) => {
        console.log("error in project loading")
        this.projectLoading = false;
      }
    );


    // const stateParam = this.route.snapshot.queryParams["token"];
    // const decodedParams = JSON.parse(decodeURIComponent(stateParam));



  }

  // publish() {
  //
  //   this.apiservice.publish_project().subscribe((data: Response) => {
  //     console.log("data", data)
  //   });
  //
  //
  // }

  publish() {
    console.log("executing publish");
    this.spinLoader = true
    this.apiservice.publish_project().subscribe({
      next: (response: any) => {

        console.log("---")
        console.log("res", response)
        if (response.status === 201) {
          console.log("success")
          // console.log(response.body)
          this.publish_response = response.body;
          // console.log("body", response.body)

          console.log("bla", response.body)
          console.log("updateing datashare")
          // this.datashare.updatePublish(response.body);
          console.log("getting token ");

          console.log("token is", this.publish_response?.token)

          // this.router.navigate(["/receipt"]);


          const navigationExtras: NavigationExtras = {
            queryParams: {
              publication: this.publish_response?.token
            }
          };


          this.router.navigate(["/order"], navigationExtras);
          // setTimeout(()=>this.datashare.publish.next(response.body), 1000);
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


  // publish() {
  //
  //
  //   this.route.queryParamMap.subscribe(queryParams => {
  //     const signature = queryParams.get('signature');
  //     const project_name = queryParams.get('project_name');
  //     const project_id = queryParams.get('project_id');
  //
  //     if (!signature || !project_name ||!project_id){
  //       return
  //     }
  //
  //
  //     console.log("signature in owner", signature)
  //     let request = {
  //       signature: signature,
  //       project_name: project_name,
  //       project_id: project_id
  //     };
  //
  //
  //     this.apiservice.publish_project(request).subscribe((data: Response) => {
  //       console.log("data", data)
  //       this.user= data.user
  //       this.project=data.project
  //       this.pipeline=data.pipeline
  //       // console.log(this.user3)
  //     })
  //
  //
  //   });
  //
  //
  // }


}
