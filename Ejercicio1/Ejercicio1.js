var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
//Clase UsuarioBase
//Esta clase esta representando un usuario generico con propiedades basicas y un metodo don de se visualiza sus permisos.
var UsuarioBase = /** @class */ (function () {
    function UsuarioBase(nombre, correo) {
        this.nombre = nombre;
        this.correo = correo;
    }
    // Retornamos los permisos basicos de el usuario base
    UsuarioBase.prototype.verPermisos = function () {
        return ["acceso con permiso basico"];
    };
    return UsuarioBase;
}());
//Clase Admin extiendida por UsuarioBase y se puede apreciar el principio de herencia
//Hacemos la representacion de un administrador con permisos adicionales
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin(nombre, correo) {
        return _super.call(this, nombre, correo) || this; //Aqui gracias a super estamos reutilizando el constructor anteriormente creado en UsuarioBase
    }
    //Aqui añadimos permisos de administrador a los permisos basicos que hemos creado
    Admin.prototype.verPermisos = function () {
        return __spreadArray(__spreadArray([], _super.prototype.verPermisos.call(this), true), ["gestion de usuarios"], false);
    };
    return Admin;
}(UsuarioBase));
//Clase SuperAdmin se extendera de clase Admin y tambien podemos apreciar el principio de herencia
//Hacemos la representacion de un superadministrador con permisos adicionales mas avanzados
var SuperAdmin = /** @class */ (function (_super) {
    __extends(SuperAdmin, _super);
    function SuperAdmin(nombre, correo) {
        return _super.call(this, nombre, correo) || this; //Aqui reutilizamos tambien pero esta vez del constructor creado en Admin
    }
    //Añadimos permisos de superadministrador a los permisos que tiene el administrador
    SuperAdmin.prototype.verPermisos = function () {
        return __spreadArray(__spreadArray([], _super.prototype.verPermisos.call(this), true), ["gestion del sistema"], false);
    };
    return SuperAdmin;
}(Admin));
//Creamos una clase generica GestorDePermisos<T extends UsuarioBase> donde manejaremos usuarios de diferentes tipos
var GestorDePermisos = /** @class */ (function () {
    function GestorDePermisos(usuario) {
        this.usuario = usuario;
    }
    // Retornamos los permisos al usuario
    GestorDePermisos.prototype.asignarPermisos = function () {
        return this.usuario.verPermisos();
    };
    return GestorDePermisos;
}());
Admin.prototype.actualizarConfiguraciones = function () {
    console.log("Las configuraciones han sido actualizadas para el administrador: ".concat(this.nombre));
};
//Ejemplo
var usuarioBase = new UsuarioBase("Mateo Renato", "mateo.renato@upch.pe");
var admin = new Admin("Luis Griffin", "luis.fernandez@upc.pe");
var superAdmin = new SuperAdmin("Carlos Cabrera", "carlos.cabrera@uni.pe");
//Se crea gestores para asignar y visualizar los permisos de cada tipo de usuario
var gestorUsuarioBase = new GestorDePermisos(usuarioBase);
var gestorAdmin = new GestorDePermisos(admin);
var gestorSuperAdmin = new GestorDePermisos(superAdmin);
//Ejecutamos los permisos
console.log("Permiso de UsuarioBase:", gestorUsuarioBase.asignarPermisos());
console.log("Permiso de Admin:", gestorAdmin.asignarPermisos());
console.log("Permiso de SuperAdmin:", gestorSuperAdmin.asignarPermisos());
// Metodo Prototipo
admin.actualizarConfiguraciones();
