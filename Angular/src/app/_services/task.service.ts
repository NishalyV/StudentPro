import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class TaskService {
    constructor(private http: HttpClient){}
    getResult() {
        return this.http.get<any>(`${environment.apiUrl}/task`);
    }

    addMark(studentName,studentSubject,studentMark){
        console.log(studentMark);
            return this.http.post<any>(`${environment.apiUrl}/task`, {studentName ,studentSubject, studentMark })
    }

    update(id,studentName,studentSubject,studentMark){
return this.http.patch<any>(`${environment.apiUrl}/task/${id}`,{studentName,studentSubject,studentMark});
    }

    delete(id){
        return this.http.delete<any>(`${environment.apiUrl}/task/${id}`)
    }
}