import React from "react";



export default function Docentes() {
  return (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {profesores.map(profesor => 
            <ProfesorCard profesor={profesor} />
            )}</div>
  );
}
