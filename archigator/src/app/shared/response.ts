export interface Response {
  user: User
  project: Project
  pipeline: Pipeline
  metadata: Metadata
}

export interface User {
  name: string
  username: string
  email: string
  avatar_url: string
  ip_address: string
  web_url: string
  is_member: boolean
  project_url: string;
}

export interface Project {
  name: string
  web_url: string
  status: string
  avatar_url: string
}

export interface Pipeline {
  status: string
  finished_at: string
  web_url: string
  tests: Test[]
}

// export interface Tests {
//     tests: Test[]
// }

export interface Test {
  name: string
  status: string
  system_output: string
}

export interface Metadata {
  creators: Creator[]
  publication_date: string
  resource_type: ResourceType
  title: string
  description: string
  publisher: string
  publication_server: string
}

export interface Creator {
  person_or_org: PersonOrOrg
  affiliations: {
    name: string;
  }[];
  // affiliation: any;
}

export interface Identifiers {
  scheme: string;
  identifier: string;
}

export interface PersonOrOrg {
  family_name: string;
  given_name: string;
  type: string;
  identifiers: Identifiers[];
  name: string;
}

export interface ResourceType {
  id: string;
}


export interface PublishResponse {
  project_name: string;
  user: string;
  order_url: string;
  token: string;
}


export interface Order {
  // project_name: string;
  investigation_name: string;
  // user: string;
  status: string;
  web_url: string;
  // project_owner: string;
  comments: Comment[];
  order_id: string;
}

export interface Comment {
  comment: string;

}
