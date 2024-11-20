export class Usuario {
    constructor(id= null, nombre, cedula, contrasenia, role = 0) {
      this.id = id;
      this.nombre = nombre;
      this.cedula = cedula;
      this.contrasenia = contrasenia;
      this.role = role;
    }
}