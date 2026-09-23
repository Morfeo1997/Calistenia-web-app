import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ejercicios from "../../data/ejercicios.json";
import type { Ejercicio } from "../../types/ejercicio";

export default function ExerciseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const ejercicio = (ejercicios as Ejercicio[]).find((e) => e.id === id);

  if (!ejercicio) {
    return (
      <div className="flex flex-col items-center gap-4 max-w-3xl mx-auto px-4 py-10 text-white">
        <p className="text-lg text-gray-300">Ejercicio no encontrado.</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
        >
          <ArrowLeft size={18} />
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-300 hover:text-white mb-6"
      >
        <ArrowLeft size={20} />
        Volver
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Imagen: arriba en mobile, izquierda en desktop */}
        <div className="w-full md:w-1/2 aspect-square overflow-hidden rounded-xl bg-gray-800">
          <img
            src={ejercicio.imagen}
            alt={ejercicio.nombre}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información: abajo en mobile, derecha en desktop */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">{ejercicio.nombre}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
              <span>{ejercicio.categoria}</span>
              <span>•</span>
              <span>{ejercicio.nivel}</span>
            </div>
          </div>

          <p className="text-gray-200 leading-relaxed">
            {ejercicio.descripcion}
          </p>

          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Músculos trabajados
            </h2>
            <div className="flex flex-wrap gap-2">
              {ejercicio.musculos.map((musculo) => (
                <span
                  key={musculo}
                  className="bg-gray-800 text-gray-200 text-sm px-3 py-1 rounded-full"
                >
                  {musculo}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
              Equipamiento
            </h2>
            <p className="text-gray-200">{ejercicio.equipamiento}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
