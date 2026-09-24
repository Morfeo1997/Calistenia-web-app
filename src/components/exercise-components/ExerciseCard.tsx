import { Link } from "react-router-dom";
import type { Ejercicio } from "../../types/ejercicio";

interface ExerciseCardProps {
  ejercicio: Ejercicio;
}

export default function ExerciseCard({ ejercicio }: ExerciseCardProps) {
  return (
    <Link
      to={`/ejercicios/${ejercicio.id}`}
      className="group flex flex-col bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-700">
        <img
          src={ejercicio.imagen}
          alt={ejercicio.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      <div className="flex flex-col gap-1 p-4">
        <h3 className="text-white font-semibold text-lg">
          {ejercicio.nombre}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{ejercicio.categoria}</span>
          <span>•</span>
          <span>{ejercicio.nivel}</span>
        </div>
      </div>
    </Link>
  );
}
