import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MailDto } from 'src/app/models/dtos/mail/MailDto';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) { }

  contact(mailDto: MailDto): Observable<ResponseModel> {
    const path = environment.apiUrl + 'mail/Contact';
    return this.httpClient.post<ResponseModel>(path, mailDto);
  }
}
