
import React from "react";

export const ProfesorCard =({ profesor}) => {
    return(
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="aspect-square overflow-hidden">
        <img 
          src={profesor.imagen} 
          alt={profesor.nombre}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{profesor.nombre}</h3>
        <p className="text-sm text-gray-600 mb-2">{profesor.cargo}</p>
        <p className="text-sm text-gray-500 mb-4">{profesor.cargo}</p>
        <div className="flex items-center text-blue-600">
          <Mail className="w-4 h-4 mr-2" />
          <a 
            href={`mailto:${profesor.correo}`}
            className="text-sm hover:underline"
          >
            {profesor.email}
          </a>
        </div>
      </div>
    </div>
    );
}