//Clase UsuarioBase
//Esta clase esta representando un usuario generico con propiedades basicas y un metodo don de se visualiza sus permisos.
class UsuarioBase {
    nombre: string;
    correo: string;

    constructor(nombre: string, correo: string) {
        this.nombre = nombre;
        this.correo = correo;
    }

    // Retornamos los permisos basicos de el usuario base
    verPermisos(): string[] {
        return ["acceso con permiso basico"];
    }
}

//Clase Admin extiendida por UsuarioBase y se puede apreciar el principio de herencia
//Hacemos la representacion de un administrador con permisos adicionales
class Admin extends UsuarioBase {
    constructor(nombre: string, correo: string) {
        super(nombre, correo); //Aqui gracias a super estamos reutilizando el constructor anteriormente creado en UsuarioBase
    }

    //Aqui añadimos permisos de administrador a los permisos basicos que hemos creado
    verPermisos(): string[] {
        return [...super.verPermisos(), "gestion de usuarios"];
    }
}

//Clase SuperAdmin se extendera de clase Admin y tambien podemos apreciar el principio de herencia
//Hacemos la representacion de un superadministrador con permisos adicionales mas avanzados
class SuperAdmin extends Admin {
    constructor(nombre: string, correo: string) {
        super(nombre, correo); //Aqui reutilizamos tambien pero esta vez del constructor creado en Admin
    }

    //Añadimos permisos de superadministrador a los permisos que tiene el administrador
    verPermisos(): string[] {
        return [...super.verPermisos(), "gestion del sistema"];
    }
}

//Creamos una clase generica GestorDePermisos<T extends UsuarioBase> donde manejaremos usuarios de diferentes tipos
class GestorDePermisos<T extends UsuarioBase> {
    usuario: T;

    constructor(usuario: T) {
        this.usuario = usuario;
    }

    // Retornamos los permisos al usuario
    asignarPermisos(): string[] {
        return this.usuario.verPermisos();
    }
}

//Agregaremos funcionalidades adicionales usando prototipos en Admin
//Podemos añadir una funcion para actualizar configuraciones sin que se modifique la clase directamente
declare global {
    interface Admin {
        actualizarConfiguraciones: () => void;
    }
}

(Admin as any).prototype.actualizarConfiguraciones = function() {
    console.log(`Las configuraciones han sido actualizadas para el administrador: ${this.nombre}`);
};

//Ejemplo
const usuarioBase = new UsuarioBase("Mateo Renato", "mateo.renato@upch.pe");
const admin = new Admin("Luis Griffin", "luis.fernandez@upc.pe");
const superAdmin = new SuperAdmin("Carlos Cabrera", "carlos.cabrera@uni.pe");

//Se crea gestores para asignar y visualizar los permisos de cada tipo de usuario
const gestorUsuarioBase = new GestorDePermisos(usuarioBase);
const gestorAdmin = new GestorDePermisos(admin as any);
const gestorSuperAdmin = new GestorDePermisos(superAdmin);

//Ejecutamos los permisos
console.log("Permiso de UsuarioBase:", gestorUsuarioBase.asignarPermisos());
console.log("Permiso de Admin:", gestorAdmin.asignarPermisos());
console.log("Permiso de SuperAdmin:", gestorSuperAdmin.asignarPermisos());

// Metodo Prototipo
(admin as any).actualizarConfiguraciones();