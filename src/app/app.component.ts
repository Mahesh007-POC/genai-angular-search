import { Component ,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   implements OnInit{
  title = 'mahesh-genai-app';
  endpoint: string = "";
  headers: HttpHeaders | undefined;
  prompt: any = this.createPrompt();
  searchText: string = '';
  searchResponse:string='';


  constructor(public http: HttpClient) {
  }



  search() {
    // You can implement your search logic here
    console.log('Search text:', this.searchText);
    this.prompt= this.createPrompt();
    this.testVertexAIWithApiKey();

  }

  ngOnInit(): void {
  }



  getAuthHeaders(accessToken: string) {
    this.headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type','application/json');

  }


  
  testVertexAIWithApiKey() {
    const PROJECT_ID = 'Optional';
    const GCLOUD_AUTH_PRINT_ACCESS_TOKEN = 'generate access token from gcloud cli tool';
    
    this.buildEndpointUrl(PROJECT_ID);
    this.getAuthHeaders(GCLOUD_AUTH_PRINT_ACCESS_TOKEN);
    
    this.http.post<ApiResponse>(this.endpoint, this.prompt, { headers: this.headers })
      .subscribe(response => {
        console.log(response);
        this.searchResponse=response.reply.reply;
      });
  }
buildEndpointUrl(projectId: string) {
this.endpoint="get endpoint from integrations tab of genai app";
}



createPrompt(){
 
return  {"query":{"input":this.searchText}}

  }
}
export interface ApiResponse {
  reply: {
    reply: string;
    summary: {
      summaryText: string;
    };
  };
  conversation: {
    name: string;
    state: string;
    userPseudoId: string;
    messages: Array<{
      userInput?: {
        input: string;
      };
      reply?: {
        reply: string;
        summary: {
          summaryText: string;
        };
      };
    }>;
  };
  searchResults: Array<{
    id: string;
    document: {
      name: string;
      id: string;
      derivedStructData: {
        snippets: Array<{
          snippet: string;
          snippet_status: string;
        }>;
        link: string;
        extractive_answers: Array<{
          content: string;
          pageNumber: string;
        }>;
      };
    };
  }>;
}
