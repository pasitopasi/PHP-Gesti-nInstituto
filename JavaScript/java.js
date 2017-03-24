var xmlhttp;
if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
} else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
function enviar_formulario() {
    if (event.keyCode == 13) {
        acceso();
    }
}
function aceptacionCookie() {
    borrarBarraCookie();
    guardarCookie("aceptaCookies", "si");
}
function borrarBarraCookie() {
    if (document.getElementById("barracookie")) {
        document.getElementById("barracookie").parentNode.removeChild(document.getElementById("barracookie"));
    }
}
function cargarIndex() {
    document.getElementById("eDirec").onclick = acceso;
    document.getElementById("password").onkeypress = enviar_formulario;
}
function acceso() {
    var user = document.getElementById("name").value;
    var pass = document.getElementById("password").value;
    var objetoJason = {
        user: user,
        pass: pass
    };
    var jsonString = JSON.stringify(objetoJason);
    xmlhttp.open("GET", "PHP/accesoSistema.php?objetoJson=" + jsonString, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var x = new Object();
            x = xmlhttp.responseText;
            var dats = JSON.parse(x);
            var idprof = dats["ID"];
            var user = dats["Nombre"];
            var EquipoDir = dats["EquipoDir"];
            var EquipoDir = dats["EquipoDir"];
            var Tutor = dats["Tutor"];
            if (idprof != "") {
                guardarCookie("ID_usuario", idprof);
                guardarCookie("usuario", user);
                guardarCookie("eDirectivo", EquipoDir);
                guardarCookie("tutor", Tutor);
                location.href = "Vistas/Profesorado.html";
            } else {
                if (document.getElementById("pi")) {
                    document.getElementById("pi").parentNode.removeChild(document.getElementById("pi"));
                }
                var padre = document.getElementById("padreIndex");
                var p = document.createElement("p");
                p.setAttribute("id", "pi");
                p.appendChild(document.createTextNode("Usuario y/o contraseña erronea."));
                padre.appendChild(p);
                document.getElementById("name").value = "";
                document.getElementById("password").value = "";
            }
        }
    };
}
function LeerCookie(name) {
    var nameCoockie = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ')
            cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(nameCoockie) == 0) {
            return decodeURIComponent(cookie.substring(nameCoockie.length, cookie.length));
        }
    }
    return null;
}
function BorrarCookie(nombre) {
    document.cookie = nombre + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function guardarCookie(nombre, valor) {
    document.cookie = "" + nombre + "=" + valor + ";path='/';expires=31 Dec 2020 23:59:59 GMT;";
}
function cargar() {
    /**
     * Aqui obtendremos de la session el valor del ID del profesor y su nombre
     * y lo pondremos en la etiqueta 'span' donde mostraremos su nombre y pondremos su ID
     * como value de esa etiqueta.
     */
    if (LeerCookie("aceptaCookies") == "si") {
        borrarBarraCookie();
    }
    document.getElementById("prof").innerHTML = LeerCookie("usuario");
    document.getElementById("prof").value = LeerCookie("ID_usuario");
    document.getElementById("amon").onclick = VerAmonestar;
    document.getElementById("exp").onclick = VerEspulsar;
    document.getElementById("eDirectivo").textContent = "Profesor";
    if (LeerCookie("tutor") == "si") {
        document.getElementById("eDirectivo").textContent = "Tutor";
        document.getElementById("ulDirec").style.visibility = "visible";
        document.getElementById("ullistar").style.visibility = "visible";
        document.getElementById("Boalaprox").style.display = "none";
        document.getElementById("Bosancionar").style.display = "none";
        document.getElementById("listar03").style.display = "none";
        document.getElementById("listar04").style.display = "none";
        document.getElementById("listar01").onclick = listarAlumno;
        document.getElementById("listar02").onclick = listarGrupo;
    }
    if (LeerCookie("eDirectivo") == "si") {
        document.getElementById("eDirectivo").textContent = "Equipo Directivo";
        document.getElementById("ulDirec").style.visibility = "visible";
        document.getElementById("ullistar").style.visibility = "visible";
        document.getElementById("Boalaprox").style.display = "inline-block";
        document.getElementById("Bosancionar").style.display = "inline-block";
        document.getElementById("Bosancionar").style.width = "126px";
        document.getElementById("listar03").style.width = "126px";
        document.getElementById("listar03").style.display = "inline-block";
        document.getElementById("listar04").style.width = "126px";
        document.getElementById("listar04").style.display = "inline-block";
        document.getElementById("Bosancionar").onclick = sancionar;
        document.getElementById("Boalaprox").onclick = controlfechas;
        document.getElementById("listar01").onclick = listarAlumno;
        document.getElementById("listar02").onclick = listarGrupo;
        document.getElementById("listar03").onclick = listarProf;
        document.getElementById("listar04").onclick = listarAl;
    }
    document.getElementById("desconectar").onclick = desconectar;
    document.getElementById("profesor").onclick = borrar;
    document.getElementById("eDirectivo").onclick = borrar;
}
function desconectar() {
    /**
     * Cada vez que demos a desconectar, nos mostrara este mensaje, en un futuro
     * se eliminara los datos del profesor de la session o lo que nos enseñes.
     */
    BorrarCookie("ID_usuario");
    BorrarCookie("usuario");
    BorrarCookie("eDirectivo");
    BorrarCookie("tutor");
    location.href = "../index.html";
}
function VerAmonestar() {
    /**
     * Borraremos el div donde enseñamos los datos, que creamos.
     */
    borrar();
    /**
     * Procederemos a cargar el contenido comun, que es asi como yo he interpretado
     * y en crearAmonestar() solo crearemos el boton de amonestar y la accion de clicar sobre el.
     */
    crearContenido();
    crearAmonestar();
}
function VerEspulsar() {
    /**
     * Borraremos el div donde enseñamos los datos, que creamos.
     */
    borrar();
    /**
     * Igual que en el apartado anterior, crearemos el contenuido común pero en este caso
     * tenemos mas datos, que es la tarea, dicho apartado se creara en la funcion crearExpulsar().
     */
    crearContenido();
    crearExpulsar();
}
function borrar() {
    document.getElementById("exclusivo").innerHTML = "";
    document.getElementById("exclusivo").style.display = "inline";
    if (document.getElementById("contenedor")) {
        document.getElementById("contenedor").parentNode.removeChild(document.getElementById("contenedor"));
    }
}
function crearContenido() {
    /**
     * Crearemos todo el contenido que he creido que es necesario.
     */
    borrar();
    var div = document.createElement("div");
    div.setAttribute("id", "contenedor");
    var p = document.createElement("p");
    var input = document.createElement("input");
    input.setAttribute("type", "date");
    input.setAttribute("id", "fecha");
    input.setAttribute("name", "fecha");
    p.appendChild(document.createTextNode("Fecha:"));
    p.appendChild(input);
    input = document.createElement("input");
    input.setAttribute("type", "time");
    input.setAttribute("id", "hora");
    input.setAttribute("name", "hora");
    input.setAttribute("size", "3");
    p.appendChild(document.createTextNode(" Hora:"));
    p.appendChild(input);
    div.appendChild(p);

    var radios = document.createElement("div");
    radios.setAttribute("id", "radios");
    p = document.createElement("p");
    p.appendChild(document.createTextNode("Grupo:"));
    p.appendChild(radios);
    div.appendChild(p);

    var div01 = document.createElement("div");
    div01.setAttribute("id", "alumnosSele");
    var select = document.createElement("select");
    select.setAttribute("id", "asignaturas");
    var option = document.createElement("option");
    option.setAttribute("value", "");
    option.setAttribute("selected", "selected");
    option.appendChild(document.createTextNode("- Elige Asignatura -"));
    select.appendChild(option);
    p = document.createElement("p");
    p.appendChild(document.createTextNode("Asignaturas:"));
    p.appendChild(select);
    div01.appendChild(p);
    div.appendChild(div01);

    p = document.createElement("p");
    var alumnos = document.createElement("div");
    alumnos.setAttribute("id", "alumnos");
    p.appendChild(document.createTextNode("Alumnos:"));
    p.appendChild(alumnos);
    div.appendChild(p);

    p = document.createElement("p");
    p.appendChild(document.createTextNode("Motivo:"));
    div.appendChild(p);

    input = document.createElement("input");
    input.setAttribute("list", "motivos");
    input.setAttribute("id", "motivo");
    input.setAttribute("name", "motivo");
    input.setAttribute("size", "45");
    input.setAttribute("placeholder", "Escribe aquí tu motivo.");
    div.appendChild(input);

    var datalist = document.createElement("datalist");
    datalist.setAttribute("id", "motivos");
    div.appendChild(datalist);

    var padre = document.getElementById("padre");
    padre.appendChild(div);

    ponerHora();
    ponerFecha();
    grupoAmon();
}
function crearAmonestar() {
    /**
     * Creara el contenido unicamente que corresponde a la seccion de amonestar.
     */
    var div = document.createElement("div");
    div.setAttribute("id", "cajonB");
    var button = document.createElement("button");
    button.setAttribute("id", "amonestar");
    button.appendChild(document.createTextNode("AMONESTAR"));
    div.appendChild(button);
    var padre = document.getElementById("contenedor");
    padre.appendChild(div);
    document.getElementById("amonestar").onclick = validarAmonestar;
}
function crearExpulsar() {
    /**
     * Creara el contenido unicamente que corresponde a la seccion de expulsar.
     */
    var div = document.createElement("div");
    div.setAttribute("id", "cajonB");
    var button = document.createElement("button");
    button.setAttribute("id", "expulsar");
    button.appendChild(document.createTextNode("EXPULSAR"));
    div.appendChild(button);
    var padre = document.getElementById("contenedor");
    var p = document.createElement("p");
    p.appendChild(document.createTextNode("Tarea:"));
    padre.appendChild(p);
    var textarea = document.createElement("textarea");
    textarea.setAttribute("id", "tarea");
    textarea.setAttribute("name", "tarea");
    textarea.setAttribute("rows", "2");
    textarea.setAttribute("cols", "40");
    textarea.setAttribute("placeholder", "Escribe aquí la tarea a realizar.");
    padre.appendChild(textarea);
    padre.appendChild(div);
    document.getElementById("expulsar").onclick = validarExpulsar;
}
/**
 * La aplicacion pone automaticamente la hora y la fecha, con las dos funciones de hay abajo.
 */
function ponerHora() {
    var d = new Date();
    //Conseguimos una variable Date, y extraemos de ella tanto la hora como la fecha.
    var minutos = d.getMinutes();
    if (d.getMinutes() < 10)
        minutos = "0" + d.getMinutes();
    var hora = d.getHours();
    if (d.getHours() < 10)
        hora = "0" + d.getHours();
    document.getElementById("hora").value = hora + ':' + minutos;
}
function ponerFecha() {
    var d = new Date();
    var mes = d.getMonth() + 1;
    if ((d.getMonth() + 1) < 10)
        mes = "0" + (d.getMonth() + 1);
    var dia = d.getDate();
    if (d.getDate() < 10)
        dia = "0" + d.getDate();
    var fecha = d.getFullYear() + "-" + mes + "-" + dia;
    document.getElementById("fecha").value = fecha;
}
/**
 * A partir de aqui esta los accesos a la base de datos y la creacion de elementos
 * para su posterior uso a la hora de amonestar y/o expulsar.
 */
function grupoAmon() {
    /**
     * Esta funcion la cargaremos al principio en el onload del body, para obtener
     * todos los grupos a los cuales el profeor da clase, conseguiremos el ID del 
     * profesor con la etiqueta span que he comentado arriba.
     */
    var profesor = document.getElementById("prof").value;
    xmlhttp.open("GET", "../PHP/GruposAmonestacion.php?profesor=" + profesor, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = gruposAmonestar;

}
function gruposAmonestar() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        /**
         * La llamada al PHP, nos devolvera un objeto JSON, el cual lo mandaremos
         * a otra funcion que se encargara de crear los elementos para seleccionar 
         * el grupo.
         */
        verdatosGrup(x);
    }
}
function verdatosGrup(x) {
    /**
     * Aqui recibiremos el objeto JSON, lo desglosaremos para tratarlo como un objeto.
     * luego lo recorreremos para sacar todos sus datos y crear radiobutton para elegir
     * el grupo.
     * Tambien tenemos que tener en cuenta que en cuanto pulsemos sobre un grupo, nos
     * mandaran a una funcion, asigAmin() y a alumnosAmon().
     */
    var dats = JSON.parse(x);
    var padre = document.getElementById("radios");
    var div = document.createElement("div");
    for (var i = 0; i < dats["ID"].length; i++) {
        var input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("id", dats["ID"][i]);
        input.setAttribute("value", dats["ID"][i]);
        input.setAttribute("name", "grupo");
        input.setAttribute("onclick", "asigAmon(this.value);");
        div.appendChild(input);
        div.appendChild(document.createTextNode(dats["Denominacion"][i]));
        div.appendChild(document.createElement("br"));
    }
    padre.appendChild(div);
}
function asigAmon(ID_Grupo) {
    /**
     * Esta funcion, recibira el ID del grupo obtenido anteriormente y junto al ID del profesot
     * crearemos un objeto JSON, y lo enviaremos al PHP donde lo trataremos.
     */
    var profesor = document.getElementById("prof").value;
    var objetoJason = {
        ID_Grupo: ID_Grupo,
        profesor: profesor
    };
    var jsonString = JSON.stringify(objetoJason);
    xmlhttp.open("GET", "../PHP/AsignaturasAmonestacion.php?objetoJson=" + jsonString, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = asignaturasObtener;

}
function asignaturasObtener() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        /**
         * El PHP nos devuelve un objeto JSON que lo enviamos a la funcion.
         */
        verdatosAsig(x);
    }
}
function verdatosAsig(x) {
    /**
     * Como anteriormente ocurrió, desglosamos ese objeto JSON en un objeto que podamos tratar
     * y vamos creando etiquetas 'option' para introducirlas en el select para elegir la asignatura.
     */
    var grupo = document.getElementsByName("grupo");
    for (var i = 0; i < grupo.length; i++) {
        if (grupo[i].checked) {
            var idGrupo = grupo[i].value;
            break;
        }
    }
    var selec = document.getElementById("asignaturas");
    selec.setAttribute("onchange", "alumnosAmon('" + idGrupo + "');");
    document.getElementById("asignaturas").innerHTML = "<option value='' selected='selected'>- Elige Asignatura -</option>";
    var dats = JSON.parse(x);
    var select = document.getElementById("asignaturas");
    for (var i = 0; i < dats["ID"].length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", dats["ID"][i]);
        option.appendChild(document.createTextNode(dats["ID"][i] + " - " + dats["Nombre"][i]));
        select.appendChild(option);
    }
}
function alumnosAmon(ID_grupo) {
    /**
     * Aqui obtendremos los alumnos por grupo.
     */
    xmlhttp.open("GET", "../PHP/AlumnoAmonestacion.php?grupo=" + ID_grupo, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = alumnosGrupo;
}
function alumnosGrupo() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        /**
         * El PHP nos devuelve un objeto JSON que lo enviamos a la funcion.
         */
        x = xmlhttp.responseText;
        verdatosAlumno(x);
    }
}
function verdatosAlumno(x) {
    /**
     * Esta funcion desglosaremos el objeto JSON en un objeto, del cual extraeremos los datos
     * para poder rellenar el div con todos los alumnos. Los mostraremos en dos filas.
     */
    if (document.getElementById("almacenAlumno")) {
        document.getElementById("almacenAlumno").parentNode.removeChild(document.getElementById("almacenAlumno"));
    }
    var dats = JSON.parse(x);
    var padre = document.getElementById("alumnos");
    var divP = document.createElement("div");
    divP.setAttribute("id", "almacenAlumno");
    for (var i = 0; i < dats["ID"].length; i++) {
        var divConjunto = document.createElement("div");
        divConjunto.setAttribute("class", "arreglarTaman");
        var input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("onclick", "motivosObjet();");
        input.setAttribute("id", dats["ID"][i]);
        input.setAttribute("value", dats["ID"][i]);
        input.setAttribute("name", "alumno");

        var label = document.createElement("label");
        label.appendChild(document.createTextNode(dats["Nombre"][i]));

        divConjunto.appendChild(input);
        divConjunto.appendChild(label);

        divP.appendChild(divConjunto);
    }
    padre.appendChild(divP);

}
function motivosObjet() {
    /**
     * Esta funcion obtendra todos los motivos que tenemos en la bdd.
     */
    xmlhttp.open("GET", "../PHP/ObtenerMotivos.php", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = GetMotivos;
}
function GetMotivos() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        verdatosMotivo(x);
    }
}
function verdatosMotivo(objeto) {
    /**
     * Tras obtener todos los datos crearemos las optciones para rellenar el datalist
     */
    var dats = JSON.parse(objeto);
    var final;
    for (var i = 0; i < dats["ID"].length; i++) {
        final += "<option value='" + dats["Nombre"][i] + "' >" + dats["ID"][i] + "</option>";
    }
    document.getElementById("motivos").innerHTML = final;
}
function validarAmonestar() {
    /**
     * Esta funcion nos servira para validar que todos los campos de la seccion 
     * amonestacion estan rellenos.
     * Si es asi, montaremos un objeto JSON y lo enviaremos a una funcion para meter
     * esos datos en la bdd.
     * Si hay alguno que no lo esta, mandaremos un mensaje a una funcion para que cree 
     * un mensaje en el html para que lo vea el usuario.
     */
    var grupoAl;
    var alumno;
    var grupo = document.getElementsByName("grupo");
    var seleccionado = false;
    for (var i = 0; i < grupo.length; i++) {
        if (grupo[i].checked) {
            seleccionado = true;
            grupoAl = grupo[i].value;
            break;
        }
    }
    if (!seleccionado) {
        crearSalida("No hay seleccionado un grupo.");
        return false;
    }
    var indice = document.getElementById("asignaturas").selectedIndex;
    if (indice == null || indice == 0) {
        crearSalida("No hay seleccionada una asignatura.");
        return false;
    }
    var grupo = document.getElementsByName("alumno");
    var seleccionado = false;
    for (var i = 0; i < grupo.length; i++) {
        if (grupo[i].checked) {
            seleccionado = true;
            alumno = grupo[i].value;
            break;
        }
    }
    if (!seleccionado) {
        crearSalida("No hay seleccionado un alumno.");
        return false;
    }
    var contenido = document.getElementById("motivo").value;
    if (contenido == "") {
        crearSalida("No hay un motivo.");
        return false;
    }
    var asignatura = document.getElementById("asignaturas").value;
    var fecha = document.getElementById("fecha").value;
    var hora = document.getElementById("hora").value;
    var profesor = document.getElementById("prof").value;
    var objetoJason = {
        profesor: profesor,
        asignatura: asignatura,
        grupo: grupoAl,
        alumno: alumno,
        fecha: fecha,
        hora: hora,
        motivo: contenido
    };
    var jsonString = JSON.stringify(objetoJason);
    meterAmonestacion(jsonString);
    borrar();
}
function validarExpulsar() {
    /**
     * Esta funcion nos servira para validar que todos los campos de la seccion 
     * expulsar estan rellenos.
     * Si es asi, montaremos un objeto JSON y lo enviaremos a una funcion para meter
     * esos datos en la bdd.
     * Si hay alguno que no lo esta, mandaremos un mensaje a una funcion para que cree 
     * un mensaje en el html para que lo vea el usuario.
     */
    var grupoAl;
    var alumno;
    var grupo = document.getElementsByName("grupo");
    var seleccionado = false;
    for (var i = 0; i < grupo.length; i++) {
        if (grupo[i].checked) {
            seleccionado = true;
            grupoAl = grupo[i].value;
            break;
        }
    }
    if (!seleccionado) {
        crearSalida("No hay seleccionado un grupo.");
        return false;
    }
    var indice = document.getElementById("asignaturas").selectedIndex;
    if (indice == null || indice == 0) {
        crearSalida("No hay seleccionada una asignatura.");
        return false;
    }
    var grupo = document.getElementsByName("alumno");
    var seleccionado = false;
    for (var i = 0; i < grupo.length; i++) {
        if (grupo[i].checked) {
            seleccionado = true;
            alumno = grupo[i].value;
            break;
        }
    }
    if (!seleccionado) {
        crearSalida("No hay seleccionado un alumno.");
        return false;
    }
    var contenido = document.getElementById("motivo").value;
    if (contenido == "") {
        crearSalida("No hay un motivo.");
        return false;
    }
    var tarea = document.getElementById("tarea").value;
    if (tarea == "") {
        crearSalida("No hay una tarea.");
        return false;
    }
    var asignatura = document.getElementById("asignaturas").value;
    var fecha = document.getElementById("fecha").value;
    var hora = document.getElementById("hora").value;
    var profesor = document.getElementById("prof").value;
    var objetoJason = {
        profesor: profesor,
        asignatura: asignatura,
        grupo: grupoAl,
        alumno: alumno,
        fecha: fecha,
        hora: hora,
        motivo: contenido,
        tarea: tarea
    };
    var jsonString = JSON.stringify(objetoJason);
    meterExpulsion(jsonString);
    borrar();
}
function crearSalida(_salida) {
    /**
     * Esta funcion recibira un msg y creara una etiqueta en el HTML para que el usuario
     * vea donde se ha equivocado.
     */
    if (document.getElementById("salida")) {
        document.getElementById("salida").parentNode.removeChild(document.getElementById("salida"));
    }
    var padre = document.getElementById("cajonB");
    var salida = document.createElement("p");
    salida.setAttribute("id", "salida");
    salida.appendChild(document.createTextNode(_salida));
    padre.appendChild(salida);
}
function meterAmonestacion(objetoJason) {
    /**
     * Esta función mandará el objeton JSON al PHP donde sera introducido a la BDD,
     * en caso negativo o afirmatio mostraremos unos dtos u otros.
     */
    xmlhttp.open("GET", "../PHP/DatosAmonestar.php?objetoJson=" + objetoJason, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = introducirAmonestacion;
}
function introducirAmonestacion() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        if (x == 1) {
            crearExclusivo("Amonestado correctamente.");
        } else {
            crearExclusivo("NO Amonestado.");
        }
    }
}
function meterExpulsion(objetoJason) {
    /**
     * Esta función mandará el objeton JSON al PHP donde sera introducido a la BDD,
     * en caso negativo o afirmatio mostraremos unos dtos u otros.
     */
    xmlhttp.open("GET", "../PHP/DatosExpulsar.php?objetoJson=" + objetoJason, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = introducirExpulsion;
}
function introducirExpulsion() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        if (x == 1) {
            crearExclusivo("Expulsado correctamente.");
        } else {
            crearExclusivo("NO Expulsado.");
        }
    }
}
function crearExclusivo(msg) {
    /**
     * Esta funcion solo creara un mensaje en caso de que sea necesario, ya que es
     * exclusivo para los mensajes de la bdd.
     * mostrara si se ha introducido la amonestacion o la expulsion correctamente.
     */
    if (document.getElementById("exc")) {
        document.getElementById("exc").parentNode.removeChild(document.getElementById("exc"));
    }
    var padre = document.getElementById("exclusivo");
    padre.style.display = "inline";
    var h2 = document.createElement("h2");
    h2.setAttribute("id", "exc");
    h2.appendChild(document.createTextNode(msg));
    padre.appendChild(h2);
}
function sancionar() {
    borrar();
    var div = document.createElement("div");
    div.setAttribute("id", "contenedor");

    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Sancionar"));
    div.appendChild(h1);

    var label = document.createElement("label");
    label.appendChild(document.createTextNode("Curso: "));
    var select = document.createElement("select");
    var option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.appendChild(document.createTextNode("- Elija un curso -"));
    select.setAttribute("id", "cursos");
    select.setAttribute("onchange", "SancionGrupoAlum(this.value);");
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);

    label = document.createElement("label");
    label.setAttribute("id", "labelT");
    label.appendChild(document.createTextNode("  Alumnos: "));
    select = document.createElement("select");
    option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.appendChild(document.createTextNode("- Elija un alumno -"));
    select.setAttribute("id", "alumnosSan");
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);

    var div2 = document.createElement("div");
    div2.setAttribute("id", "amonExpul");

    var div3 = document.createElement("div");
    div3.setAttribute("id", "amonExpulContenidoS");
    div2.appendChild(div3);
    div.appendChild(div2);

    var textarea = document.createElement("textarea");
    textarea.setAttribute("id", "sancionCont");
    textarea.setAttribute("name", "sancionCont");
    textarea.setAttribute("placeholder", "Escribe aquí la sanción a imponer.");
    div.appendChild(textarea);

    var button = document.createElement("button");
    button.setAttribute("id", "sancionar");
    button.appendChild(document.createTextNode("SANCIONAR"));
    div.appendChild(button);

    var padre = document.getElementById("padre");
    padre.appendChild(div);

    document.getElementById("sancionar").onclick = validarSancionar;
    /**
     * Funcion ajax para seleccion
     */
    cargarCursos();
}
function cargarCursos() {
    xmlhttp.open("GET", "../PHP/Grupos.php", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = introducirGrupos;
}
function introducirGrupos() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        var dats = JSON.parse(x);
        var select = document.getElementById("cursos");
        for (var i = 0; i < dats["ID"].length; i++) {
            var option = document.createElement("option");
            option.setAttribute("id", dats["ID"][i]);
            option.setAttribute("value", dats["ID"][i]);
            option.setAttribute("name", "grupo");
            option.appendChild(document.createTextNode(dats["Denominacion"][i]));
            select.appendChild(option);
        }
    }
}
function SancionGrupoAlum(ID) {
    xmlhttp.open("GET", "../PHP/Alumnos.php?IDGrupo=" + ID, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = alumnosSancionar;
}
function alumnosSancionar() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        var dats = JSON.parse(x);
        if (document.getElementById("alumnosSan")) {
            document.getElementById("alumnosSan").parentNode.removeChild(document.getElementById("alumnosSan"));
        }
        var padre = document.getElementById("labelT");
        var select = document.createElement("select");
        select.setAttribute("id", "alumnosSan");
        select.setAttribute("onchange", "contenido(this.value);");
        var option = document.createElement("option");
        option.appendChild(document.createTextNode("- Elija un alumno -"));
        select.appendChild(option);
        for (var i = 0; i < dats["ID"].length; i++) {
            var option = document.createElement("option");
            option.setAttribute("id", dats["ID"][i]);
            option.setAttribute("value", dats["ID"][i]);
            option.setAttribute("name", "alumnosSelect");
            option.appendChild(document.createTextNode(dats["Nombre"][i]));
            select.appendChild(option);
        }
        padre.appendChild(select);
    }
}
function contenido(id) {
    xmlhttp.open("GET", "../PHP/contenido.php?idAlumn=" + id, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = contendioSancionar;
}
function borrarTabla() {
    if (document.getElementById("tablaDatos")) {
        document.getElementById("tablaDatos").parentNode.removeChild(document.getElementById("tablaDatos"));
    }
}
function contendioSancionar() {
    if (document.getElementById("tablaDatosS")) {
        document.getElementById("tablaDatosS").parentNode.removeChild(document.getElementById("tablaDatosS"));
    }
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        var dats = JSON.parse(x);
        var table = document.createElement("table");
        table.setAttribute("id", "tablaDatosS");
        if (dats["Amonestaciones"]["ID"].length != 0) {
            var tr = document.createElement("tr");
            var td = document.createElement("th");
            td.setAttribute("colspan", "6");
            td.appendChild(document.createTextNode("AMONESTACIONES"));
            tr.appendChild(td);
            table.appendChild(tr);
            var tr = document.createElement("tr");
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Sancionar"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Motivo"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Hora"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Fecha"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Profesor"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Asignatura"));
            tr.appendChild(td);
            table.appendChild(tr);
        }
        for (var i = 0; i < dats["Amonestaciones"]["ID"].length; i++) {
            var td = document.createElement("td");
            var tr = document.createElement("tr");
            var input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", "A" + dats["Amonestaciones"]["ID"][i]);
            input.setAttribute("name", "ch");
            if (dats["Amonestaciones"]["ID_Sancion"][i] != null) {
                td.setAttribute("style", "background-color: #FFB0B0; color: black;");
                td.appendChild(document.createTextNode("Sancionado"));
            } else {
                td.setAttribute("style", "text-align: center; ");
                td.appendChild(input);
            }
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Amonestaciones"]["Motivo"][i]));
            tr.appendChild(td);
            var td = document.createElement("td");

            td.appendChild(document.createTextNode(dats["Amonestaciones"]["Hora"][i].substring(0, 5)));
            tr.appendChild(td);
            var td = document.createElement("td");
            var fecha = dats["Amonestaciones"]["Fecha"][i];
            var year = fecha.substring(0, 4);
            var mes = fecha.substring(5, 7);
            var dia = fecha.substring(8, 10);
            td.appendChild(document.createTextNode(dia + "-" + mes + "-" + year));
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Amonestaciones"]["Profesor"][i]));
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Amonestaciones"]["Asignatura"][i]));
            tr.appendChild(td);
            table.appendChild(tr);
        }
        if (dats["Expulsiones"]["ID"].length != 0) {
            var tr = document.createElement("tr");
            var td = document.createElement("th");
            td.setAttribute("colspan", "6");
            td.appendChild(document.createTextNode("EXPULSIONES"));
            tr.appendChild(td);
            table.appendChild(tr);
            var tr = document.createElement("tr");
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Sancionar"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Motivo"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Hora"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Fecha"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Profesor"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Asignatura"));
            tr.appendChild(td);
            table.appendChild(tr);
        }
        for (var i = 0; i < dats["Expulsiones"]["ID"].length; i++) {
            var td = document.createElement("td");
            var tr = document.createElement("tr");
            var input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", "E" + dats["Expulsiones"]["ID"][i]);
            input.setAttribute("name", "ch");
            if (dats["Expulsiones"]["ID_Sancion"][i] != null) {
                td.setAttribute("style", "background-color: #FFB0B0; color: black;");
                td.appendChild(document.createTextNode("Sancionado"));
            } else {
                td.setAttribute("style", "text-align: center; ");
                td.appendChild(input);
            }
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Expulsiones"]["Motivo"][i]));
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Expulsiones"]["Hora"][i].substring(0, 5)));
            tr.appendChild(td);
            var td = document.createElement("td");
            var fecha = dats["Expulsiones"]["Fecha"][i];
            var year = fecha.substring(0, 4);
            var mes = fecha.substring(5, 7);
            var dia = fecha.substring(8, 10);
            td.appendChild(document.createTextNode(dia + "-" + mes + "-" + year));
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Expulsiones"]["Profesor"][i]));
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Expulsiones"]["Asignatura"][i]));
            tr.appendChild(td);
            table.appendChild(tr);
        }
        var padre = document.getElementById("amonExpulContenidoS");
        padre.appendChild(table);
    }
}
function validarSancionar() {
    var sancionCont = document.getElementById("sancionCont").value;
    if (sancionCont == "") {
        crearSalida("No hay una sanción.");
        return false;
    }
    var amonestaciones = new Array();
    var expulsiones = new Array();
    var posicionA = 0;
    var posicionE = 0;
    var chack = document.getElementsByName("ch");
    for (var i = 0; i < chack.length; i++) {
        if (chack[i].checked) {
            if (chack[i].id[0] == "A") {
                var salida = chack[i].id;
                var resultado = salida.substring(1);
                amonestaciones[posicionA] = resultado;
                posicionA++;
            }
            if (chack[i].id[0] == "E") {
                var salidaE = chack[i].id;
                var resultadoE = salidaE.substring(1);
                expulsiones[posicionE] = resultadoE;
                posicionE++;
            }
        }
    }
    var chack = document.getElementsByName("ch");
    var salida = false;
    for (var i = 0; i < chack.length; i++) {
        if (chack[i].checked) {
            salida = true;
        }
    }
    if (!salida) {
        crearSalida("No hay nada seleccionado.");
        return false;
    }
    var alumno = document.getElementById("alumnosSan").value;
    var profesor = document.getElementById("prof").value;
    var objetoJason = {
        Amonestar: amonestaciones,
        Expulsar: expulsiones,
        sancion: sancionCont,
        alumno: alumno,
        profesor: profesor
    };
    var jsonString = JSON.stringify(objetoJason);
    meterSancion(jsonString);
    borrar();
}
function meterSancion(objetoJason) {
    /**
     * Esta función mandará el objeton JSON al PHP donde sera introducido a la BDD,
     * en caso negativo o afirmatio mostraremos unos dtos u otros.
     */
    xmlhttp.open("GET", "../PHP/DatosSancionar.php?objetoJson=" + objetoJason, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = introducirSancion;
}
function introducirSancion() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        if (x == 1) {
            crearExclusivo("Sancionado correctamente.");
        } else {
            crearExclusivo("NO sancionado.");
        }
    }
}
function controlfechas() {
    borrar();
    var div = document.createElement("div");
    div.setAttribute("id", "contenedor");

    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Control de fechas"));
    div.appendChild(h1);

    var label = document.createElement("label");
    label.appendChild(document.createTextNode("Curso: "));
    var select = document.createElement("select");
    var option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.appendChild(document.createTextNode("- Elija un curso -"));
    select.setAttribute("id", "cursos");
    select.setAttribute("onchange", "GrupoAlumF(this.value);");
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);

    label = document.createElement("label");
    label.setAttribute("id", "labelT");
    label.appendChild(document.createTextNode("  Alumnos: "));
    select = document.createElement("select");
    option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.appendChild(document.createTextNode("- Elija un alumno -"));
    select.setAttribute("id", "alumnosSan");
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);



    var div2 = document.createElement("div");
    div2.setAttribute("id", "amonExpul");

    var div3 = document.createElement("div");
    div3.setAttribute("id", "amonExpulContenido");
    div2.appendChild(div3);
    div.appendChild(div2);

    var padre = document.getElementById("padre");
    padre.appendChild(div);

    /**
     * Funcion ajax para seleccion
     */
    cargarCursosFecha();
}
function cargarCursosFecha() {
    xmlhttp.open("GET", "../PHP/Grupos.php", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = introducirGruposF;
}
function introducirGruposF() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        var dats = JSON.parse(x);
        var select = document.getElementById("cursos");
        for (var i = 0; i < dats["ID"].length; i++) {
            var option = document.createElement("option");
            option.setAttribute("id", dats["ID"][i]);
            option.setAttribute("value", dats["ID"][i]);
            option.setAttribute("name", "grupo");
            option.appendChild(document.createTextNode(dats["Denominacion"][i]));
            select.appendChild(option);
        }
    }
}
function GrupoAlumF(ID) {
    xmlhttp.open("GET", "../PHP/Alumnos.php?IDGrupo=" + ID, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = alumnosF;
}
function alumnosF() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        var dats = JSON.parse(x);
        if (document.getElementById("alumnosSan")) {
            document.getElementById("alumnosSan").parentNode.removeChild(document.getElementById("alumnosSan"));
        }
        var padre = document.getElementById("labelT");
        var select = document.createElement("select");
        select.setAttribute("id", "alumnosSan");
        select.setAttribute("onchange", "contenidoF(this.value);");
        var option = document.createElement("option");
        option.appendChild(document.createTextNode("- Elija un alumno -"));
        select.appendChild(option);
        for (var i = 0; i < dats["ID"].length; i++) {
            var option = document.createElement("option");
            option.setAttribute("id", dats["ID"][i]);
            option.setAttribute("value", dats["ID"][i]);
            option.setAttribute("name", "alumnosSelect");
            option.appendChild(document.createTextNode(dats["Nombre"][i]));
            select.appendChild(option);
        }
        padre.appendChild(select);
    }
}
function contenidoF(id) {
    xmlhttp.open("GET", "../PHP/contenido.php?idAlumn=" + id, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = contendioFechas;
}
function contendioFechas() {
    borrarTabla();
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        var dats = JSON.parse(x);
        var table = document.createElement("table");
        table.setAttribute("id", "tablaDatos");
        if (dats["Amonestaciones"]["ID"].length != 0) {
            var tr = document.createElement("tr");
            var td = document.createElement("th");
            td.setAttribute("colspan", "7");
            td.appendChild(document.createTextNode("AMONESTACIONES"));
            tr.appendChild(td);
            table.appendChild(tr);
            var tr = document.createElement("tr");
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Motivo"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Hora"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Fecha"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Profesor"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Asignatura"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Jefatura"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Familiar"));
            tr.appendChild(td);
            table.appendChild(tr);
        }
        for (var i = 0; i < dats["Amonestaciones"]["ID"].length; i++) {
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Amonestaciones"]["Motivo"][i]));
            tr.appendChild(td);
            var td = document.createElement("td");

            td.appendChild(document.createTextNode(dats["Amonestaciones"]["Hora"][i].substring(0, 5)));
            tr.appendChild(td);
            var td = document.createElement("td");
            var fecha = dats["Amonestaciones"]["Fecha"][i];
            var year = fecha.substring(0, 4);
            var mes = fecha.substring(5, 7);
            var dia = fecha.substring(8, 10);
            td.appendChild(document.createTextNode(dia + "-" + mes + "-" + year));
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Amonestaciones"]["Profesor"][i]));
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Amonestaciones"]["Asignatura"][i]));
            tr.appendChild(td);

            var button = document.createElement("button");
            button.appendChild(document.createTextNode("Pasar"));
            button.setAttribute("onclick", "FechaJEFATURA('A" + dats["Amonestaciones"]["ID"][i] + "');");
            if (dats["Amonestaciones"]["FechaFirmaJefatura"][i] != null) {
                button.setAttribute("disabled", "disabled");
            }
            var td = document.createElement("td");
            td.appendChild(button);
            tr.appendChild(td);

            var button = document.createElement("button");
            button.appendChild(document.createTextNode("Pasar"));
            button.setAttribute("onclick", "FechaFAMILIA('A" + dats["Amonestaciones"]["ID"][i] + "');");
            if (dats["Amonestaciones"]["FechaFirmaFamiliar"][i] != null) {
                button.setAttribute("disabled", "disabled");
            }
            var td = document.createElement("td");
            td.appendChild(button);
            tr.appendChild(td);

            table.appendChild(tr);
        }
        if (dats["Expulsiones"]["ID"].length != 0) {
            var tr = document.createElement("tr");
            var td = document.createElement("th");
            td.setAttribute("colspan", "7");
            td.appendChild(document.createTextNode("EXPULSIONES"));
            tr.appendChild(td);
            table.appendChild(tr);
            var tr = document.createElement("tr");
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Motivo"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Hora"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Fecha"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Profesor"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Asignatura"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Jefatura"));
            tr.appendChild(td);
            var td = document.createElement("th");
            td.appendChild(document.createTextNode("Familiar"));
            tr.appendChild(td);
            table.appendChild(tr);
        }
        for (var i = 0; i < dats["Expulsiones"]["ID"].length; i++) {
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Expulsiones"]["Motivo"][i]));
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Expulsiones"]["Hora"][i].substring(0, 5)));
            tr.appendChild(td);
            var td = document.createElement("td");
            var fecha = dats["Expulsiones"]["Fecha"][i];
            var year = fecha.substring(0, 4);
            var mes = fecha.substring(5, 7);
            var dia = fecha.substring(8, 10);
            td.appendChild(document.createTextNode(dia + "-" + mes + "-" + year));
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Expulsiones"]["Profesor"][i]));
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Expulsiones"]["Asignatura"][i]));
            tr.appendChild(td);

            var button = document.createElement("button");
            button.appendChild(document.createTextNode("Pasar"));
            button.setAttribute("onclick", "FechaJEFATURA('E" + dats["Expulsiones"]["ID"][i] + "');");
            if (dats["Expulsiones"]["FechaFirmaJefatura"][i] != null) {
                button.setAttribute("disabled", "disabled");
            }
            var td = document.createElement("td");
            td.appendChild(button);
            tr.appendChild(td);

            var button = document.createElement("button");
            button.appendChild(document.createTextNode("Pasar"));
            button.setAttribute("onclick", "FechaFAMILIA('E" + dats["Expulsiones"]["ID"][i] + "');");
            if (dats["Expulsiones"]["FechaFirmaFamiliar"][i] != null) {
                button.setAttribute("disabled", "disabled");
            }
            var td = document.createElement("td");
            td.appendChild(button);
            tr.appendChild(td);

            table.appendChild(tr);
        }
        var padre = document.getElementById("amonExpulContenido");
        padre.appendChild(table);
    }
}
function FechaJEFATURA(id) {
    xmlhttp.open("GET", "../PHP/fechaJefatura.php?id=" + id, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = salida;
}
function salida() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        borrar();
        if (x == "si") {
            crearExclusivo("Paso correcto por Jefatura.");
        } else {
            crearExclusivo("Paso no realizado.");
        }
    }
}
function FechaFAMILIA(id) {
    xmlhttp.open("GET", "../PHP/fechaFamilia.php?id=" + id, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = salidaF;
}
function salidaF() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        borrar();
        if (x == "si") {
            crearExclusivo("Paso correcto por la familia.");
        } else {
            crearExclusivo("Paso no realizado.");
        }
    }
}
function mandarCorreo(idAlumno) {
    xmlhttp.open("GET", "../PHP/mandarCorreo.php?idAlumno=" + idAlumno, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = salidaCorreo;
}
function salidaCorreo() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        borrar();
        if (x == "si") {
            crearExclusivo("Correo enviado correctamente.");
        } else {
            crearExclusivo("Correo no enviado.");
        }
    }
}
function listarGrupo() {
    borrar();
    var div = document.createElement("div");
    div.setAttribute("id", "contenedor");

    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Listado por Grupo"));
    div.appendChild(h1);

    var label = document.createElement("label");
    label.appendChild(document.createTextNode("Curso: "));
    var select = document.createElement("select");
    var option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.appendChild(document.createTextNode("- Elija un curso -"));
    select.setAttribute("id", "cursos");
    select.setAttribute("onchange", "GrupoListado(this.value);");
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);

    var div2 = document.createElement("div");
    div2.setAttribute("id", "amonExpul");

    var div3 = document.createElement("div");
    div3.setAttribute("id", "amonExpulContenido");
    div2.appendChild(div3);
    div.appendChild(div2);

    var button = document.createElement("button");
    button.setAttribute("onclick", "obtenerPDF2();");
    button.setAttribute("id", "buLA4");
    button.appendChild(document.createTextNode("Obtener PDF"));
    div.appendChild(button);

    var padre = document.getElementById("padre");
    padre.appendChild(div);

    /**
     * Funcion ajax para seleccion
     */
    cargarCursosFecha();
}
function GrupoListado(ID) {
    xmlhttp.open("GET", "../PHP/AlumnosListado.php?IDGrupo=" + ID, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = alumnosLis;
}
function alumnosLis() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        var dats = JSON.parse(x);
        if (document.getElementById("tablaListar")) {
            document.getElementById("tablaListar").parentNode.removeChild(document.getElementById("tablaListar"));
        }
        var table = document.createElement("table");
        table.setAttribute("id", "tablaListar");

        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("ALUMNO"));
        tr.appendChild(th);
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("AMONESTACIONES"));
        tr.appendChild(th);
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("EXPULSIONES"));
        tr.appendChild(th);
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("SANCIONES"));
        tr.appendChild(th);
        table.appendChild(tr);

        for (var i = 0; i < dats["ID"].length; i++) {
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Nombre"][i]));
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Amonestacion"][i]));
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Expulsion"][i]));
            tr.appendChild(td);
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(dats["Sancion"][i]));
            tr.appendChild(td);
            if (LeerCookie("tutor") == "no") {
                var td = document.createElement("td");
                var button = document.createElement("button");
                button.setAttribute("onclick", "mandarCorreo('" + dats['ID'][i] + "');");
                if (dats["AlaProxima"][i] != null) {
                    button.setAttribute("disabled", "disabled");
                }
                button.appendChild(document.createTextNode("A la proxima"));
                td.appendChild(button);
                tr.appendChild(td);
            } else {
                if (LeerCookie("eDirectivo") == "si") {
                    var td = document.createElement("td");
                    var button = document.createElement("button");
                    button.setAttribute("onclick", "mandarCorreo('" + dats['ID'][i] + "');");
                    if (dats["AlaProxima"][i] != null) {
                        button.setAttribute("disabled", "disabled");
                    }
                    button.appendChild(document.createTextNode("A la proxima"));
                    td.appendChild(button);
                    tr.appendChild(td);
                }
            }
            table.appendChild(tr);
        }
        var padre = document.getElementById("amonExpulContenido");
        padre.appendChild(table);
    }
}
function listarAlumno() {
    borrar();
    var div = document.createElement("div");
    div.setAttribute("id", "contenedor");

    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Listado por Alumno"));
    div.appendChild(h1);

    var label = document.createElement("label");
    label.appendChild(document.createTextNode("Curso: "));
    var select = document.createElement("select");
    var option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.appendChild(document.createTextNode("- Elija un curso -"));
    select.setAttribute("id", "cursos");
    select.setAttribute("onchange", "GrupoAlumL(this.value);");
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);

    label = document.createElement("label");
    label.setAttribute("id", "labelT");
    label.appendChild(document.createTextNode("  Alumnos: "));
    select = document.createElement("select");
    option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.appendChild(document.createTextNode("- Elija un alumno -"));
    select.setAttribute("id", "alumnosSan");
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);

    label = document.createElement("label");
    label.setAttribute("id", "labelT");
    label.appendChild(document.createTextNode("  Profesor: "));
    select = document.createElement("select");
    option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.appendChild(document.createTextNode("- Elija un Profesor -"));
    select.setAttribute("id", "profSele");
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);

    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    var d = new Date();
    var mes = d.getMonth() + 1;
    if ((d.getMonth() + 1) < 10)
        mes = "0" + (d.getMonth() + 1);
    var dia = d.getDate();
    if (d.getDate() < 10)
        dia = "0" + d.getDate();
    var fecha = d.getFullYear() + "-" + mes + "-" + dia;

    label = document.createElement("label");
    label.setAttribute("id", "labelT");
    label.appendChild(document.createTextNode("Fecha mínima: "));
    var input = document.createElement("input");
    input.setAttribute("type", "date");
    input.setAttribute("id", "fechaMIN");
    input.setAttribute("value", fecha);
    label.appendChild(input);
    div.appendChild(label);

    label = document.createElement("label");
    label.setAttribute("id", "labelT");
    label.appendChild(document.createTextNode("   Fecha máxima: "));
    var input = document.createElement("input");
    input.setAttribute("type", "date");
    input.setAttribute("id", "fechaMAX");
    input.setAttribute("value", fecha);
    label.appendChild(input);
    div.appendChild(label);

    var button = document.createElement("button");
    button.setAttribute("id", "but");
    button.setAttribute("style", "margin-left: 15px;");
    button.setAttribute("onclick", "AL1(alumnosSan.value);");
    button.appendChild(document.createTextNode("Buscar"));
    div.appendChild(button);


    var div2 = document.createElement("div");
    div2.setAttribute("id", "listarAlum");
    div.appendChild(div2);

    var table = document.createElement("table");
    table.setAttribute("id", "l1");
    var tr = document.createElement("tr");
    var td = document.createElement("th");
    td.appendChild(document.createTextNode("Alumno: "));
    tr.appendChild(td);
    var td = document.createElement("td");
    td.setAttribute("id", "tAlumn");
    tr.appendChild(td);
    var td = document.createElement("th");
    td.appendChild(document.createTextNode("Grupo: "));
    tr.appendChild(td);
    var td = document.createElement("td");
    td.setAttribute("id", "tGrupo");
    tr.appendChild(td);
    table.appendChild(tr);

    var tr = document.createElement("tr");
    var td = document.createElement("th");
    td.appendChild(document.createTextNode("Direccion: "));
    tr.appendChild(td);
    var td = document.createElement("td");
    td.setAttribute("id", "tDireccion");
    tr.appendChild(td);
    var td = document.createElement("th");
    td.appendChild(document.createTextNode("Poblacion: "));
    tr.appendChild(td);
    var td = document.createElement("td");
    td.setAttribute("id", "tPoblacion");
    tr.appendChild(td);
    table.appendChild(tr);

    div2.appendChild(table);
    var div3 = document.createElement("div");
    div3.setAttribute("id", "amonExpulContenidoL");
    div2.appendChild(div3);
    div.appendChild(div2);

    var button = document.createElement("button");
    button.setAttribute("onclick", "obtenerPDF1();");
    button.setAttribute("id", "buLA3");
    button.appendChild(document.createTextNode("Obtener PDF"));
    div.appendChild(button);

    var padre = document.getElementById("padre");
    padre.appendChild(div);

    cargarCursosFecha();
}
function GrupoAlumL(ID) {
    xmlhttp.open("GET", "../PHP/Alumnos.php?IDGrupo=" + ID, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = alumnosL;
}
function alumnosL() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        var dats = JSON.parse(x);
        if (document.getElementById("alumnosSan")) {
            document.getElementById("alumnosSan").parentNode.removeChild(document.getElementById("alumnosSan"));
        }
        var padre = document.getElementById("labelT");
        var select = document.createElement("select");
        select.setAttribute("id", "alumnosSan");
        select.setAttribute("onchange", "borrarTabla();");
        var option = document.createElement("option");
        option.appendChild(document.createTextNode("- Elija un alumno -"));
        select.appendChild(option);
        for (var i = 0; i < dats["ID"].length; i++) {
            var option = document.createElement("option");
            option.setAttribute("id", dats["ID"][i]);
            option.setAttribute("value", dats["ID"][i]);
            option.setAttribute("name", "alumnosSelect");
            option.appendChild(document.createTextNode(dats["Nombre"][i]));
            select.appendChild(option);
        }
        padre.appendChild(select);

        var padre1 = document.getElementById("profSele");
        padre1.innerHTML = "";
        var option = document.createElement("option");
        option.setAttribute("value", "-1");
        option.appendChild(document.createTextNode("- Elija un Profesor -"));
        padre1.appendChild(option);
        for (var i = 0; i < dats["Profesor"]["ID"].length; i++) {
            var option = document.createElement("option");
            option.setAttribute("id", dats["Profesor"]["ID"][i]);
            option.setAttribute("value", dats["Profesor"]["ID"][i]);
            option.appendChild(document.createTextNode(dats["Profesor"]["Nombre"][i]));
            padre1.appendChild(option);
        }
    }
}
function AL1(ID) {
    var alumno = document.getElementById("alumnosSan").options[document.getElementById("alumnosSan").selectedIndex].text;
    var grupo = document.getElementById("cursos").options[document.getElementById("cursos").selectedIndex].text;
    document.getElementById("tGrupo").textContent = grupo;
    document.getElementById("tAlumn").textContent = alumno;
    var fechaMi = document.getElementById("fechaMIN").value;
    var fechaMa = document.getElementById("fechaMAX").value;
    var prof = document.getElementById("profSele").value;
    if (prof == "-1") {
        var objetoJason = {
            id: ID,
            fechaMi: fechaMi,
            fechaMa: fechaMa
        };
        var jsonString = JSON.stringify(objetoJason);
        xmlhttp.open("GET", "../PHP/AlumnoLI2.php?objetoJson=" + jsonString, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = ali12;
    } else {
        var objetoJason = {
            id: ID,
            fechaMi: fechaMi,
            fechaMa: fechaMa,
            prof: prof
        };
        var jsonString = JSON.stringify(objetoJason);
        xmlhttp.open("GET", "../PHP/AlumnoLI.php?objetoJson=" + jsonString, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = ali12;
    }

}
function ali12() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = new Object();
        x = xmlhttp.responseText;
        var dats = JSON.parse(x);
        document.getElementById("tDireccion").textContent = dats["dir"];
        document.getElementById("tPoblacion").textContent = dats["pob"];
        if (document.getElementById("tLA")) {
            document.getElementById("tLA").parentNode.removeChild(document.getElementById("tLA"));
        }
        if (dats["amonestaciones"]["motivo"].length != 0) {
            var table = document.createElement("table");
            table.setAttribute("id", "tLA");
            table.setAttribute("class", "tLAC");
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            th.setAttribute("colspan", "4");
            th.appendChild(document.createTextNode("AMONESTACIONES"));
            tr.appendChild(th);
            table.appendChild(tr);
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            th.appendChild(document.createTextNode("MOTIVO"));
            tr.appendChild(th);
            var th = document.createElement("th");
            th.appendChild(document.createTextNode("FECHA"));
            tr.appendChild(th);
            var th = document.createElement("th");
            th.appendChild(document.createTextNode("PROFESOR"));
            tr.appendChild(th);
            var th = document.createElement("th");
            th.appendChild(document.createTextNode("ASIGNATURA"));
            tr.appendChild(th);
            table.appendChild(tr);
            for (var i = 0; i < dats["amonestaciones"]["motivo"].length; i++) {
                var tr = document.createElement("tr");
                var th = document.createElement("td");
                th.appendChild(document.createTextNode(dats["amonestaciones"]["motivo"][i]));
                tr.appendChild(th);
                var th = document.createElement("td");
                var fecha = dats["amonestaciones"]["fecha"][i];
                var year = fecha.substring(0, 4);
                var mes = fecha.substring(5, 7);
                var dia = fecha.substring(8, 10);
                th.appendChild(document.createTextNode(dia + "-" + mes + "-" + year));
                tr.appendChild(th);
                var th = document.createElement("td");
                th.appendChild(document.createTextNode(dats["amonestaciones"]["prof"][i]));
                tr.appendChild(th);
                var th = document.createElement("td");
                th.appendChild(document.createTextNode(dats["amonestaciones"]["asig"][i]));
                tr.appendChild(th);
                table.appendChild(tr);
            }
            document.getElementById("amonExpulContenidoL").appendChild(table);
        }
        if (document.getElementById("tLE")) {
            document.getElementById("tLE").parentNode.removeChild(document.getElementById("tLE"));
        }
        if (dats["expulsiones"]["motivo"].length != 0) {
            var table = document.createElement("table");
            table.setAttribute("id", "tLE");
            table.setAttribute("class", "tLAC");
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            th.setAttribute("colspan", "4");
            th.appendChild(document.createTextNode("EXPULSIONES"));
            tr.appendChild(th);
            table.appendChild(tr);
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            th.appendChild(document.createTextNode("MOTIVO"));
            tr.appendChild(th);
            var th = document.createElement("th");
            th.appendChild(document.createTextNode("FECHA"));
            tr.appendChild(th);
            var th = document.createElement("th");
            th.appendChild(document.createTextNode("PROFESOR"));
            tr.appendChild(th);
            var th = document.createElement("th");
            th.appendChild(document.createTextNode("ASIGNATURA"));
            tr.appendChild(th);
            table.appendChild(tr);
            for (var i = 0; i < dats["expulsiones"]["motivo"].length; i++) {
                var tr = document.createElement("tr");
                var th = document.createElement("td");
                th.appendChild(document.createTextNode(dats["expulsiones"]["motivo"][i]));
                tr.appendChild(th);
                var th = document.createElement("td");
                var fecha = dats["expulsiones"]["fecha"][i];
                var year = fecha.substring(0, 4);
                var mes = fecha.substring(5, 7);
                var dia = fecha.substring(8, 10);
                th.appendChild(document.createTextNode(dia + "-" + mes + "-" + year));
                tr.appendChild(th);
                var th = document.createElement("td");
                th.appendChild(document.createTextNode(dats["expulsiones"]["prof"][i]));
                tr.appendChild(th);
                var th = document.createElement("td");
                th.appendChild(document.createTextNode(dats["expulsiones"]["asig"][i]));
                tr.appendChild(th);
                table.appendChild(tr);
            }
            document.getElementById("amonExpulContenidoL").appendChild(table);
        }
        if (document.getElementById("tLS")) {
            document.getElementById("tLS").parentNode.removeChild(document.getElementById("tLS"));
        }
        if (dats["sanciones"]["motivo"].length != 0) {
            var table = document.createElement("table");
            table.setAttribute("id", "tLS");
            table.setAttribute("class", "tLAC");
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            th.setAttribute("colspan", "4");
            th.appendChild(document.createTextNode("SANCIONES"));
            tr.appendChild(th);
            table.appendChild(tr);
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            th.appendChild(document.createTextNode("SANCIÓN"));
            tr.appendChild(th);
            var th = document.createElement("th");
            th.appendChild(document.createTextNode("FECHA"));
            tr.appendChild(th);
            var th = document.createElement("th");
            th.appendChild(document.createTextNode("PROFESOR"));
            tr.appendChild(th);
            table.appendChild(tr);
            for (var i = 0; i < dats["sanciones"]["motivo"].length; i++) {
                var tr = document.createElement("tr");
                var th = document.createElement("td");
                th.appendChild(document.createTextNode(dats["sanciones"]["motivo"][i]));
                tr.appendChild(th);
                var th = document.createElement("td");
                var fecha = dats["sanciones"]["fecha"][i];
                var year = fecha.substring(0, 4);
                var mes = fecha.substring(5, 7);
                var dia = fecha.substring(8, 10);
                th.appendChild(document.createTextNode(dia + "-" + mes + "-" + year));
                tr.appendChild(th);
                var th = document.createElement("td");
                th.appendChild(document.createTextNode(dats["sanciones"]["prof"][i]));
                tr.appendChild(th);
                table.appendChild(tr);
            }
            document.getElementById("amonExpulContenidoL").appendChild(table);
        }
    }
}
function listarProf() {
    borrar();
    var div = document.createElement("div");
    div.setAttribute("id", "contenedor");

    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Listado por Profesor"));
    div.appendChild(h1);

    var label = document.createElement("label");
    label.setAttribute("id", "labelT");
    label.appendChild(document.createTextNode("  Profesor: "));
    var select = document.createElement("select");
    var option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.appendChild(document.createTextNode("- Elija un Profesor -"));
    select.setAttribute("id", "profSele");
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);
    div.appendChild(document.createElement("br"));

    var d = new Date();
    var mes = d.getMonth() + 1;
    if ((d.getMonth() + 1) < 10)
        mes = "0" + (d.getMonth() + 1);
    var dia = d.getDate();
    if (d.getDate() < 10)
        dia = "0" + d.getDate();
    var fecha = d.getFullYear() + "-" + mes + "-" + dia;

    var label = document.createElement("label");
    label.setAttribute("id", "labelT");
    label.appendChild(document.createTextNode("Fecha mínima: "));
    var input = document.createElement("input");
    input.setAttribute("type", "date");
    input.setAttribute("id", "fechaMIN");
    input.setAttribute("value", fecha);
    label.appendChild(input);
    div.appendChild(label);

    label = document.createElement("label");
    label.setAttribute("id", "labelT");
    label.appendChild(document.createTextNode("   Fecha máxima: "));
    var input = document.createElement("input");
    input.setAttribute("type", "date");
    input.setAttribute("id", "fechaMAX");
    input.setAttribute("value", fecha);
    label.appendChild(input);
    div.appendChild(label);

    var button = document.createElement("button");
    button.setAttribute("id", "but");
    button.setAttribute("onclick", "bPLI();");
    button.appendChild(document.createTextNode("Buscar"));
    div.appendChild(button);

    var div2 = document.createElement("div");
    div2.setAttribute("id", "amonExpul");

    var div3 = document.createElement("div");
    div3.setAttribute("id", "amonExpulContenido");
    div2.appendChild(div3);
    div.appendChild(div2);

    var button = document.createElement("button");
    button.setAttribute("onclick", "obtenerPDF2();");
    button.setAttribute("id", "buLA4");
    button.appendChild(document.createTextNode("Obtener PDF"));
    div.appendChild(button);

    var padre = document.getElementById("padre");
    padre.appendChild(div);

    obtenerProfesores();
}
function obtenerProfesores() {
    xmlhttp.open("GET", "../PHP/obtenerPROF.php", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var x = new Object();
            x = xmlhttp.responseText;
            montarProfesores(x);
        }
    };
}
function montarProfesores(x) {
    var dats = JSON.parse(x);
    document.getElementById("profSele").innerHTML = "";
    var select = document.getElementById("profSele");
    var option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.appendChild(document.createTextNode("- Elija un Profesor -"));
    select.appendChild(option);
    for (var i = 0; i < dats["ID"].length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", dats["ID"][i]);
        option.appendChild(document.createTextNode(dats["Nombre"][i]));
        select.appendChild(option);
    }
}
function bPLI() {
    if (document.getElementById("profSele").value == -1) {
        var fechaMi = document.getElementById("fechaMIN").value;
        var fechaMa = document.getElementById("fechaMAX").value;
        var objetoJason = {
            fechaMi: fechaMi,
            fechaMa: fechaMa
        };
        var jsonString = JSON.stringify(objetoJason);
        xmlhttp.open("GET", "../PHP/profesorLI.php?objetoJson=" + jsonString, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var x = new Object();
                x = xmlhttp.responseText;
                montarP(x);
            }
        };
    } else {
        var fechaMi = document.getElementById("fechaMIN").value;
        var fechaMa = document.getElementById("fechaMAX").value;
        var prof = document.getElementById("profSele").value;
        var objetoJason = {
            fechaMi: fechaMi,
            fechaMa: fechaMa,
            profesor: prof
        };
        var jsonString = JSON.stringify(objetoJason);
        xmlhttp.open("GET", "../PHP/profesorLI2.php?objetoJson=" + jsonString, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var x = new Object();
                x = xmlhttp.responseText;
                montarP(x);
            }
        };
    }

}
function montarP(x) {
    var dats = JSON.parse(x);
    var table = document.createElement("table");
    if (document.getElementById("tLIP")) {
        document.getElementById("tLIP").parentNode.removeChild(document.getElementById("tLIP"));
    }
    table.setAttribute("id", "tLIP");
    table.setAttribute("class", "tLIP");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("PROFESOR"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("CURSO"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("ASIGNATURA"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("AMONESTACIONES"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("EXPULSIONES"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("SANCIONES"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("TOTAL"));
    tr.appendChild(th);
    table.appendChild(tr);

    for (var i = 0; i < dats["profesor"].length; i++) {
        var tr = document.createElement("tr");
        var th = document.createElement("td");
        th.appendChild(document.createTextNode(dats["profesor"][i]));
        tr.appendChild(th);
        var th = document.createElement("td");
        th.appendChild(document.createTextNode(dats["curso"][i]));
        tr.appendChild(th);
        var th = document.createElement("td");
        th.appendChild(document.createTextNode(dats["asignatura"][i]));
        tr.appendChild(th);
        var th = document.createElement("td");
        th.appendChild(document.createTextNode(dats["amonestaciones"][i]));
        tr.appendChild(th);
        var th = document.createElement("td");
        th.appendChild(document.createTextNode(dats["expulsiones"][i]));
        tr.appendChild(th);
        var th = document.createElement("td");
        th.appendChild(document.createTextNode(dats["sanciones"][i]));
        tr.appendChild(th);
        var th = document.createElement("td");
        var ij = parseInt(dats["amonestaciones"][i]) + parseInt(dats["expulsiones"][i]) + parseInt(dats["sanciones"][i]);
        th.appendChild(document.createTextNode(ij));
        tr.appendChild(th);
        table.appendChild(tr);
    }
    var padre = document.getElementById("amonExpulContenido");
    padre.appendChild(table);
}
function listarAl() {
    borrar();
    var div = document.createElement("div");
    div.setAttribute("id", "contenedor");

    var h1 = document.createElement("h1");
    h1.setAttribute("id", "h1tr");
    h1.appendChild(document.createTextNode("Listado por fechas no pasadas"));
    div.appendChild(h1);

    var label = document.createElement("label");
    label.setAttribute("id", "label12");
    label.appendChild(document.createTextNode("   Curso: "));
    var select = document.createElement("select");
    var option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.appendChild(document.createTextNode("- Elija un curso -"));
    select.setAttribute("id", "cursos");
    select.setAttribute("onchange", "GrupoAlumL(this.value);borrarTabla1();");
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);

    var button = document.createElement("button");
    button.setAttribute("id", "but14");
    button.setAttribute("onclick", "mostrarGrupo(cursos.value);");
    button.appendChild(document.createTextNode("Buscar"));
    div.appendChild(button);

    var div2 = document.createElement("div");
    div2.setAttribute("id", "amonExpul");

    var div3 = document.createElement("div");
    div3.setAttribute("id", "amonExpulContenidoA");
    div2.appendChild(div3);
    div.appendChild(div2);

    var h1 = document.createElement("h1");
    h1.setAttribute("style", "margin-top: -45px;");
    h1.appendChild(document.createTextNode("Listado por faltas a un alumno"));
    div.appendChild(h1);

    label = document.createElement("label");
    label.setAttribute("id", "labelT");
    label.appendChild(document.createTextNode("  Alumnos: "));
    select = document.createElement("select");
    option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.appendChild(document.createTextNode("- Elija un alumno -"));
    select.setAttribute("id", "alumnosSan");
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);

    label = document.createElement("label");
    label.setAttribute("id", "labelT");
    label.appendChild(document.createTextNode("  Profesor: "));
    select = document.createElement("select");
    option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.appendChild(document.createTextNode("- Elija un Profesor -"));
    select.setAttribute("id", "profSele");
    select.setAttribute("onchange", "mostrarA3(this.value);");
    select.appendChild(option);
    label.appendChild(select);
    div.appendChild(label);

    var div3 = document.createElement("div");
    div3.setAttribute("id", "amonExpulContenidoLA");
    var table = document.createElement("table");
    table.setAttribute("id", "tla2");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("AMONESTACIONES"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.setAttribute("id", "valorAmonestaciones");
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("EXPULSIONES"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.setAttribute("id", "valorExpulsiones");
    tr.appendChild(th);
    table.appendChild(tr);
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("SANCIONES"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.setAttribute("id", "valorSanciones");
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("TOTAL"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.setAttribute("id", "valorTotal");
    tr.appendChild(th);
    table.appendChild(tr);
    div3.appendChild(table);
    div.appendChild(div3);

    var button = document.createElement("button");
    button.setAttribute("onclick", "obtenerPDF();");
    button.setAttribute("id", "buLA2");
    button.appendChild(document.createTextNode("Obtener PDF"));
    div.appendChild(button);

    var padre = document.getElementById("padre");
    padre.appendChild(div);
    cargarCursosFecha();
}

function montarA2(x) {
    var dats = JSON.parse(x);
    var table = document.createElement("table");
    if (document.getElementById("tLIA2")) {
        document.getElementById("tLIA2").parentNode.removeChild(document.getElementById("tLIA2"));
    }
    table.setAttribute("id", "tLIA2");
    table.setAttribute("class", "tLIA2");
    if (dats["Amonestaciones"]["ID"].length != 0) {
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("AMONESTACIONES"));
        th.setAttribute("colspan", "6");
        tr.appendChild(th);
        table.appendChild(tr);
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("ALUMNO"));
        tr.appendChild(th);
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("FECHA"));
        tr.appendChild(th);
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("MOTIVO"));
        tr.appendChild(th);
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("GRUPO"));
        tr.appendChild(th);
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("fecha Jefatura"));
        tr.appendChild(th);
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("fecha familia"));
        tr.appendChild(th);
        table.appendChild(tr);
        for (var i = 0; i < dats["Amonestaciones"]["ID"].length; i++) {
            var tr = document.createElement("tr");
            var th = document.createElement("td");
            th.appendChild(document.createTextNode(dats["Amonestaciones"]["Alumno"][i]));
            tr.appendChild(th);
            var fecha = dats["Amonestaciones"]["Fecha"][i];
            var th = document.createElement("td");
            var year = fecha.substring(0, 4);
            var mes = fecha.substring(5, 7);
            var dia = fecha.substring(8, 10);
            th.appendChild(document.createTextNode(dia + "-" + mes + "-" + year));
            tr.appendChild(th);
            var th = document.createElement("td");
            th.appendChild(document.createTextNode(dats["Amonestaciones"]["Motivo"][i]));
            tr.appendChild(th);
            var th = document.createElement("td");
            th.appendChild(document.createTextNode(dats["Amonestaciones"]["Grupo"][i]));
            tr.appendChild(th);
            var th = document.createElement("td");
            if (dats["Amonestaciones"]["FechaFirmaJefatura"][i] != null) {
                var fecha = dats["Amonestaciones"]["FechaFirmaJefatura"][i];
                var year = fecha.substring(0, 4);
                var mes = fecha.substring(5, 7);
                var dia = fecha.substring(8, 10);
                th.appendChild(document.createTextNode(dia + "-" + mes + "-" + year));
            } else {
                th.appendChild(document.createTextNode("No pasado"));
            }
            tr.appendChild(th);
            var th = document.createElement("td");
            if (dats["Amonestaciones"]["FechaFirmaFamiliar"][i] != null) {
                var fecha = dats["Amonestaciones"]["FechaFirmaFamiliar"][i];
                var year = fecha.substring(0, 4);
                var mes = fecha.substring(5, 7);
                var dia = fecha.substring(8, 10);
                th.appendChild(document.createTextNode(dia + "-" + mes + "-" + year));
            } else {
                th.appendChild(document.createTextNode("No pasado"));
            }
            tr.appendChild(th);
            table.appendChild(tr);
        }
    }
    if (dats["Expulsiones"]["ID"].length != 0) {
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("EXPULSIONES"));
        th.setAttribute("colspan", "6");
        tr.appendChild(th);
        table.appendChild(tr);
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("ALUMNO"));
        tr.appendChild(th);
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("FECHA"));
        tr.appendChild(th);
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("MOTIVO"));
        tr.appendChild(th);
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("GRUPO"));
        tr.appendChild(th);
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("fecha Jefatura"));
        tr.appendChild(th);
        var th = document.createElement("th");
        th.appendChild(document.createTextNode("fecha familia"));
        tr.appendChild(th);
        table.appendChild(tr);
        for (var i = 0; i < dats["Expulsiones"]["ID"].length; i++) {
            var tr = document.createElement("tr");
            var th = document.createElement("td");
            th.appendChild(document.createTextNode(dats["Expulsiones"]["Alumno"][i]));
            tr.appendChild(th);
            var th = document.createElement("td");
            var fecha = dats["Expulsiones"]["Fecha"][i];
            var year = fecha.substring(0, 4);
            var mes = fecha.substring(5, 7);
            var dia = fecha.substring(8, 10);
            th.appendChild(document.createTextNode(dia + "-" + mes + "-" + year));
            tr.appendChild(th);
            var th = document.createElement("td");
            th.appendChild(document.createTextNode(dats["Expulsiones"]["Motivo"][i]));
            tr.appendChild(th);
            var th = document.createElement("td");
            th.appendChild(document.createTextNode(dats["Expulsiones"]["Grupo"][i]));
            tr.appendChild(th);
            var th = document.createElement("td");
            if (dats["Expulsiones"]["FechaFirmaJefatura"][i] != null) {
                var fecha = dats["Expulsiones"]["FechaFirmaJefatura"][i];
                var year = fecha.substring(0, 4);
                var mes = fecha.substring(5, 7);
                var dia = fecha.substring(8, 10);
                th.appendChild(document.createTextNode(dia + "-" + mes + "-" + year));
            } else {
                th.appendChild(document.createTextNode("No pasado"));
            }
            tr.appendChild(th);
            var th = document.createElement("td");
            if (dats["Expulsiones"]["FechaFirmaFamiliar"][i] != null) {
                var fecha = dats["Expulsiones"]["FechaFirmaFamiliar"][i];
                var year = fecha.substring(0, 4);
                var mes = fecha.substring(5, 7);
                var dia = fecha.substring(8, 10);
                th.appendChild(document.createTextNode(dia + "-" + mes + "-" + year));
            } else {
                th.appendChild(document.createTextNode("No pasado"));
            }
            tr.appendChild(th);
            table.appendChild(tr);
        }
    }
    var padre = document.getElementById("amonExpulContenidoA");
    padre.appendChild(table);
}
function mostrarA3(profesor) {
    var alumno = document.getElementById("alumnosSan").value;
    var objetoJason = {
        alumno: alumno,
        profesor: profesor
    };
    var jsonString = JSON.stringify(objetoJason);
    xmlhttp.open("GET", "../PHP/alistar2.php?objetoJson=" + jsonString, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var x = new Object();
            x = xmlhttp.responseText;
            ponerDat(x);
        }
    };
}
function ponerDat(x) {
    var dats = JSON.parse(x);
    document.getElementById("valorAmonestaciones").textContent = dats["amonestaciones"];
    document.getElementById("valorExpulsiones").textContent = dats["expulsiones"];
    document.getElementById("valorSanciones").textContent = dats["sanciones"];
    document.getElementById("valorTotal").textContent = dats["total"];
}
function borrarTabla1() {
    document.getElementById("valorAmonestaciones").textContent = " ";
    document.getElementById("valorExpulsiones").textContent = " ";
    document.getElementById("valorSanciones").textContent = " ";
    document.getElementById("valorTotal").textContent = " ";
    document.getElementById("profSele").value = "-1";
}
function obtenerPDF() {
    ventanitaFlotante(document.getElementById("amonExpulContenidoA").innerHTML);
}
function obtenerPDF1() {
    ventanitaFlotante(document.getElementById("listarAlum").innerHTML);
}
function obtenerPDF2() {
    ventanitaFlotante(document.getElementById("amonExpulContenido").innerHTML);
}
function ventanitaFlotante(data) {
    var miventanita = window.open('', '', 'height=600,width=800');
    miventanita.document.write('<html><head><title>PDF</title>');
    miventanita.document.write('</head><body>');
    miventanita.document.write("<h1 style='text-align: center;'>EXPEDIENTE DE CONVIVENCIA</h1>");
    miventanita.document.write(data);
    miventanita.document.write("<h3 style='margin-top: 50px;'>F.D.: I.E.S. Leonardo Da Vinci</h3>");
    miventanita.document.write('</body></html>');
    miventanita.print();
    miventanita.close();
    return true;
}
function mostrarGrupo(idgrupo) {
    if (idgrupo == "-1") {
        xmlhttp.open("GET", "../PHP/alLI.php", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var x = new Object();
                x = xmlhttp.responseText;
                montarA2(x);
            }
        };
    } else {
        xmlhttp.open("GET", "../PHP/alLI2.php?idgrupo=" + idgrupo, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var x = new Object();
                x = xmlhttp.responseText;
                montarA2(x);
            }
        };
    }
}