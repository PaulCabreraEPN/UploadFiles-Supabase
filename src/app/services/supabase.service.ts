import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://eabrubdlaywkxjsormzd.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhYnJ1YmRsYXl3a3hqc29ybXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyOTc2MjAsImV4cCI6MjA2Mzg3MzYyMH0.uCp5AozdjUqgnBs9r2IgfXYrqe-BiXex5tr36Qfn55U'
    );
  }

  async uploadFile(file: File, path: string) {
    const { data, error } = await this.supabase.storage
      .from('archivos')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;
    return data;
  }
}
