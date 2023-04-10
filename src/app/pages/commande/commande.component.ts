import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UploadService} from "../../services/uploadFile/upload.service";
import {FormGroup} from "@angular/forms";
import {FichiersService} from "../../swagger/services/services/fichiers.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  selectedFile: File | null = null;
  selectedFiles: { id: number, name: string }[] = [];
  uploadForm!: FormGroup;
  uploading: boolean = false;
  progress: number = 0;
  fileName: string = '';
  errorMessage: string = '';

  constructor(private fichierService: UploadService,
              private fileService: FichiersService,
              private snackBar: MatSnackBar,
              private http: HttpClient) { }


  ngOnInit(): void {}



  onFileSelected(event: any) {

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
    const file = event.target.files[0] as File;

    if (file.size > MAX_FILE_SIZE) {
      this.snackBar.open(`Le fichier sélectionné dépasse la limite de taille de ${MAX_FILE_SIZE} Mo`, 'Fermer', {
        duration: 4000
      });
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
    this.fileName = file.name;

    this.snackBar.open('Fichier sélectionné avec succès', 'Fermer', {
      duration: 4000
    });
  }




  uploadFile() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:9090/fichiers', formData).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('Fichier téléchargé avec succès', 'Fermer', {duration: 4000});
      },
      (error) => {
        console.log(error);
        this.snackBar.open(`Erreur lors du téléchargement du fichier: ${error.error}`, 'Fermer', {duration: 4000});
      }
    );
  }







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



  deleteUploadedFile() {
    const confirmationSnackBar = this.snackBar.open('Êtes-vous sûr de vouloir supprimer ce fichier ?', 'Supprimer', {
      duration: 5000,
    });

    confirmationSnackBar.onAction().subscribe(() => {
      // Reset the file input element and selected file
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      fileInput.value = '';
      this.selectedFile = null;
      this.fileName = '';
      this.snackBar.open('Fichier supprimé', 'Fermer', {
        duration: 4000
      });
    });
  }


}
