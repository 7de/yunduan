import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientService } from '#{service}/http-client.service';
import { GetEmailService } from '#{service}/get-email.service';

const URL = '/notices';

@Component({
  selector: 'app-inbox-view',
  templateUrl: './inbox-view.component.html',
  styleUrls: ['./inbox-view.component.scss']
})
export class InboxViewComponent implements OnInit {
  public id
  public data;
  public has_read;

  constructor(
    private http: HttpClientService,
    private route: ActivatedRoute,
    private httpService: GetEmailService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'];
        this.has_read = params['has_read'];
        this.view();
      })
  }

  view() {
    this.http.get(`${URL}/${this.id}`)
      .subscribe(result => {
        this.data = result;
        if (!this.data.has_read) {
          this.update();
        }
      })
  }

  update() {
    return this.http.put(`${URL}/${this.id}`).subscribe(
      next => { },
      error => { }
    )
  }
}
