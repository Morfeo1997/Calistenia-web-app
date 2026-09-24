import ExerciseCard from "./ExerciseCard";
import type { Ejercicio } from "../../types/ejercicio";

interface ExercisesGridProps {
  ejercicios: Ejercicio[];
}

export default function ExercisesGrid({ ejercicios }: ExercisesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4 py-6">
      {ejercicios.map((ejercicio) => (
        <ExerciseCard key={ejercicio.id} ejercicio={ejercicio} />
      ))}
    </div>
  );
}
