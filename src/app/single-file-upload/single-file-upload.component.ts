import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-single-file-upload',
  templateUrl: './single-file-upload.component.html',
  styleUrls: ['./single-file-upload.component.css'],
})
export class SingleFileUploadComponent {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  file: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = 'initial';
      this.file = file;
    }
  }

  onUpload() {
    if (this.file) {
      const formData = new FormData();

      formData.append('thumbnail', this.file, this.file.name);

      const upload$ = this.http.post('https://httpbin.org/post', formData).pipe(
        catchError((error) => {
          this.status = 'fail';
          return throwError(() => error);
        })
      );

      this.status = 'uploading';

      upload$.subscribe(() => {
        console.log('Upload completed');
        this.status = 'success';
      });
    }
  }
}
