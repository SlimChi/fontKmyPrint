import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FichiersService} from "../../swagger/services/services/fichiers.service";

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent {

  uploadForm: FormGroup;
  progress = 0;
  uploading = false;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private fichierService : FichiersService
  ) {
    this.uploadForm = this.formBuilder.group({
      pdfFile: ['', Validators.required]
    });
  }

  onSubmit() {
    const formData = new FormData();

    // Append pdfFile if it exists
    formData.append('pdfFile', this.uploadForm.get('pdfFile')?.value);

    // Append other form data if they exist
    formData.append('name', this.uploadForm.get('name')?.value);
    formData.append('description', this.uploadForm.get('description')?.value);

    // Send form data to server
    this.http.post('http://example.com/upload', formData).subscribe(
      (response) => {
        console.log('File uploaded successfully');
      },
      (error) => {
        console.log('Error uploading file');
      }
    );
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onFileDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    this.uploadForm.get('file')!.setValue(file);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.uploadForm.get('file')!.setValue(file);
  }
  async back() {
    window.history.back();
  }
}


