import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'URL SUPABASE',
      'CLAVE PUBLICA'
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
