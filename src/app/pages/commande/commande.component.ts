import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UploadService} from "../../services/uploadFile/upload.service";
import {FormGroup} from "@angular/forms";


@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  selectedFile!: File;
  uploadForm!: FormGroup;
  uploading: boolean = false;
  progress: number = 0;
  fileName: string = '';
  constructor(private fichierService: UploadService,
              private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    const file = event.target.files[0];
    this.fileName = file.name;
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:9090/fichiers', formData).subscribe(
      (response) => {
        console.log(response);
        alert('Fichier téléchargé avec succès');
      },
      (error) => {
        console.log(error);
        alert(`Erreur lors du téléchargement du fichier: ${error.error}`);
      }
    );
  }



  ngOnInit(): void {}

  async back() {
    window.history.back();
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

  deleteFile() {

  }
}
