import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage {
  selectedFile: File | null = null;
  uploadResult: string = '';

  constructor(private supabaseService: SupabaseService) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async upload() {
    if (!this.selectedFile) {
      this.uploadResult = 'Por favor selecciona un archivo.';
      return;
    }

    const path = `archivos/${Date.now()}_${this.selectedFile.name}`;
    try {
      const data = await this.supabaseService.uploadFile(this.selectedFile, path);
      this.uploadResult = 'Archivo subido con éxito: ' + data.path;
    } catch (error: any) {
      if (error instanceof Error) {
        this.uploadResult = 'Error: ' + error.message;
      } else if (typeof error === 'object') {
        this.uploadResult = 'Error inesperado: ' + JSON.stringify(error);
      } else {
        this.uploadResult = 'Error desconocido: ' + String(error);
      }
    }
  }
}
