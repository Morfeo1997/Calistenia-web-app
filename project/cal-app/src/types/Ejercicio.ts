export type NivelEjercicio = "Principiante" | "Intermedio" | "Avanzado";

export interface Ejercicio {
  id: string;
  nombre: string;
  imagen: string;
  categoria: string;
  nivel: NivelEjercicio;
  musculos: string[];
  descripcion: string;
  equipamiento: string;
}
