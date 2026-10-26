/**
 * Portafolio Académico — sacijim (Maricielo Sarai Cerrón Villar)
 * Motor dinámico basado en JSON para renderizado de Unidades, Semanas, Lightbox,
 * navegación profunda por URL y funciones interactivas para el Chatbot.
 */
(function () {
  'use strict';

  var FALLBACK_DATA = {
    "estudiante": {
      "nombre": "Maricielo Sarai Cerrón Villar",
      "nombreCorto": "Maricielo Cerrón",
      "usuario": "sacijim",
      "rol": "Estudiante de Ingeniería de Sistemas y Computación",
      "universidad": "Universidad Peruana Los Andes (UPLA)",
      "facultad": "Facultad de Ingeniería",
      "carrera": "Ingeniería de Sistemas y Computación",
      "ciclo": "IV Ciclo",
      "periodo": "2026",
      "modalidad": "Presencial",
      "ciudad": "Huancayo, Perú",
      "repositorio": "https://github.com/sacijim/portafolio",
      "biografia": "Estudiante de Ingeniería de Sistemas y Computación en la UPLA con interés en el desarrollo de software y la gestión de proyectos tecnológicos. Este portafolio reúne las implementaciones en Java de estructuras de datos y los proyectos de desarrollo de aplicaciones."
    },
    "conocimientoTecnico": {
      "maven_pom": {
        "titulo": "Definiciones de Maven y POM (Semana 2 - Taller)",
        "explicacion": "Apache Maven es una herramienta de automatización de compilación y gestión de dependencias para proyectos Java. El archivo POM (Project Object Model, pom.xml) es el núcleo de configuración en XML donde se definen las coordenadas del proyecto (groupId, artifactId, version), las dependencias externas descargadas desde Maven Central, los plugins de compilación y las fases del ciclo de vida (clean, compile, test, package, install, deploy)."
      },
      "figma_wireframes": {
        "titulo": "Prototipado y Wireframes en Figma (Semana 1 - Taller)",
        "explicacion": "Un wireframe es el esquema estructural de baja o media fidelidad de una interfaz de usuario. En la Semana 1 de Taller se diseñaron en Figma las pantallas, jerarquía visual, navegación y flujo interactivo de la aplicación antes de su codificación."
      },
      "complejidades": {
        "arreglo_unidimensional": "Acceso por índice O(1); búsqueda lineal, inserción y eliminación con desplazamiento de elementos O(n).",
        "arreglo_bidimensional": "Recorrido completo de matriz de F filas por C columnas: O(F * C).",
        "arreglos_paralelos": "Inserción al final O(1); búsqueda secuencial O(n); ordenamiento burbuja sincronizando múltiples arreglos O(n^2).",
        "arreglo_objetos": "Encapsulamiento POO (clases Modelo y DAO). Inserción O(1), búsqueda lineal O(n), ordenamiento por atributo O(n^2).",
        "arraylist": "Colección dinámica java.util.ArrayList con redimensionamiento automático. Acceso get(i) O(1), inserción add() amortizada O(1), búsqueda y filtrado O(n).",
        "pilas": "Estructura LIFO (Last In, First Out). Operaciones apilar (Push), desapilar (Pop) y consultar cima (Peek) en tiempo constante O(1).",
        "colas": "Estructura FIFO (First In, First Out). Operaciones encolar (Enqueue) por el final y desencolar (Dequeue) por el frente en tiempo constante O(1); recorridos y filtros O(n)."
      }
    },
    "cursos": {
      "algoritmos": {
        "id": "algoritmos",
        "pagina": "algoritmos.html",
        "nombre": "Algoritmos y Estructura de Datos",
        "docente": "Mg. Raúl Enrique Fernández Bejarano",
        "ciclo": "IV Ciclo · 2026",
        "descripcion": "Trabajos y entregables de algoritmos y estructuras de datos en Java organizados por unidad académica.",
        "unidades": [
          {
            "id": "unidad-1",
            "dot": "U1",
            "titulo": "Unidad 1: CONCEPTOS DE ALGORITMOS Y ESTRUCTURAS DE DATOS",
            "meta": "Semanas 1 a 4",
            "abierta": false,
            "semanas": [
              {
                "id": "u1-semana-1",
                "numero": 1,
                "badge": "Semana 1",
                "titulo": "Tema: Arreglo Unidimensional",
                "tema": "Arreglo Unidimensional",
                "descripcion": "Entregas de la semana.",
                "resumenChatbot": "Manipulación de vectores estáticos en Java: eliminación e inserción mediante desplazamiento de índices, modificación por posición, acumulador de suma, cálculo de mínimo/máximo/promedio, filtrado de impares y rotación de elementos.",
                "explicacionTecnica": "Se trabaja con arreglos unidimensionales de tamaño fijo en Java. Para eliminar un elemento en la posición k se desplazan los elementos desde i=k hasta n-2 hacia la izquierda (v[i] = v[i+1]). Para insertar o rotar el primer elemento se desplazan las casillas manteniendo el control del contador lógico de elementos.",
                "abierta": false,
                "baseUrl": "img/",
                "items": [
                  { "archivo": "semana1-1.png", "titulo": "Ejercicio 01", "subtitulo": "Eliminar un elemento", "lightboxTitle": "Semana 1 · Ejercicio 01", "explicacion": "Busca o recibe la posición a eliminar y desplaza los elementos posteriores una casilla a la izquierda, reduciendo el contador lógico en 1." },
                  { "archivo": "semana1-2.png", "titulo": "Ejercicio 02", "subtitulo": "Modificar un elemento", "lightboxTitle": "Semana 1 · Ejercicio 02", "explicacion": "Accede directamente en O(1) al índice indicado del vector y reemplaza su valor previa validación de rango." },
                  { "archivo": "semana1-3.png", "titulo": "Ejercicio 03", "subtitulo": "Insertar un elemento", "lightboxTitle": "Semana 1 · Ejercicio 03", "explicacion": "Verifica que haya espacio disponible en el arreglo, desplaza los elementos a la derecha si es inserción en posición y asigna el nuevo valor." },
                  { "archivo": "semana1-4.png", "titulo": "Ejercicio 04", "subtitulo": "Sumar los elementos", "lightboxTitle": "Semana 1 · Ejercicio 04", "explicacion": "Recorre el arreglo con un bucle for acumulando cada valor en una variable suma total en tiempo O(n)." },
                  { "archivo": "semana1-5.png", "titulo": "Ejercicio 05", "subtitulo": "Hallar número menor, mayor y promedio", "lightboxTitle": "Semana 1 · Ejercicio 05", "explicacion": "Inicializa menor y mayor con el primer elemento v[0], compara en un solo recorrido lineal y divide la suma acumulada entre la cantidad de elementos." },
                  { "archivo": "semana1-6.png", "titulo": "Ejercicio 06", "subtitulo": "Suma de impares", "lightboxTitle": "Semana 1 · Ejercicio 06", "explicacion": "Evalúa cada elemento con el operador módulo (v[i] % 2 != 0) y suma únicamente los valores impares." },
                  { "archivo": "semana1-7.png", "titulo": "Ejercicio 07", "subtitulo": "Mover primer elemento", "lightboxTitle": "Semana 1 · Ejercicio 07", "explicacion": "Guarda v[0] en una variable temporal, desplaza todos los elementos una posición hacia la izquierda y coloca el temporal al final del arreglo." },
                  { "archivo": "semana1-8.png", "titulo": "Ejercicio 08", "subtitulo": "Mover primer elemento par", "lightboxTitle": "Semana 1 · Ejercicio 08", "explicacion": "Localiza el primer número par (v[i] % 2 == 0) en el vector y lo traslada al final desplazando el subarreglo restante." },
                  { "archivo": "semana1-9.png", "titulo": "Actividad 02", "subtitulo": "Entrega visual", "lightboxTitle": "Semana 1 · Actividad 02", "explicacion": "Consolidado práctico de operaciones sobre arreglos unidimensionales." }
                ]
              },
              {
                "id": "u1-semana-2",
                "numero": 2,
                "badge": "Semana 2",
                "titulo": "Tema: Arreglo Bidimensional",
                "tema": "Arreglo Bidimensional (Matrices)",
                "descripcion": "Entregas de la semana.",
                "resumenChatbot": "Operaciones sobre matrices (int[][]) en Java: eliminación y modificación por coordenada [fila][columna], suma de elementos, mayor y menor de la matriz, recorridos por patrones geométricos (letras L, J y U), menor por cada fila, conteo de pares e intercambio de filas.",
                "explicacionTecnica": "Utiliza arreglos bidimensionales m[filas][columnas] recorridos mediante dos bucles for anidados (i para filas, j para columnas). Los patrones de letras filtran índices específicos: letra L (primera columna j==0 o última fila i==filas-1), letra J (última columna, última fila y gancho izquierdo), y letra U (primera columna j==0, última columna j==cols-1 o última fila i==filas-1).",
                "abierta": false,
                "baseUrl": "img/",
                "items": [
                  { "archivo": "semana2-1.png", "titulo": "Ejercicio 01", "subtitulo": "Eliminar elemento", "lightboxTitle": "Semana 2 · Ejercicio 01", "explicacion": "Ubica la coordenada [f][c] dentro de la matriz y limpia o desplaza los valores según la posición indicada." },
                  { "archivo": "semana2-2.png", "titulo": "Ejercicio 02", "subtitulo": "Modificar elemento", "lightboxTitle": "Semana 2 · Ejercicio 02", "explicacion": "Actualiza directamente el valor almacenado en la celda m[fila][columna] en tiempo O(1)." },
                  { "archivo": "semana2-3.png", "titulo": "Ejercicio 03", "subtitulo": "Sumar elementos de la matriz", "lightboxTitle": "Semana 2 · Ejercicio 03", "explicacion": "Recorre todas las filas y columnas con doble for acumulando la suma general de la matriz." },
                  { "archivo": "semana2-4.png", "titulo": "Ejercicio 04", "subtitulo": "Número menor, mayor de la matriz", "lightboxTitle": "Semana 2 · Ejercicio 04", "explicacion": "Compara cada celda m[i][j] contra las variables menor y mayor inicializadas en m[0][0]." },
                  { "archivo": "semana2-5.png", "titulo": "Ejercicio 05", "subtitulo": "Visualizar la suma, letra L", "lightboxTitle": "Semana 2 · Ejercicio 05", "explicacion": "Recorre la primera columna (j == 0) y la última fila (i == filas - 1) formando la silueta de la letra L y sumando sus celdas." },
                  { "archivo": "semana2-6.png", "titulo": "Ejercicio 06", "subtitulo": "Visualizar la suma, letra J", "lightboxTitle": "Semana 2 · Ejercicio 06", "explicacion": "Selecciona y suma los elementos que conforman el trazo de la letra J dentro de la matriz." },
                  { "archivo": "semana2-7.png", "titulo": "Ejercicio 07", "subtitulo": "Visualizar la suma, letra U", "lightboxTitle": "Semana 2 · Ejercicio 07", "explicacion": "Suma las celdas de los bordes laterales (j == 0 y j == cols - 1) junto con la base inferior (i == filas - 1) formando la letra U." },
                  { "archivo": "semana2-8.png", "titulo": "Ejercicio 08", "subtitulo": "Menor número de fila", "lightboxTitle": "Semana 2 · Ejercicio 08", "explicacion": "Para cada fila i, reinicia el mínimo en m[i][0] y recorre sus columnas j para hallar el menor valor de esa fila." },
                  { "archivo": "semana2-9.png", "titulo": "Ejercicio 09", "subtitulo": "Contar números pares", "lightboxTitle": "Semana 2 · Ejercicio 09", "explicacion": "Incrementa un contador cada vez que una celda m[i][j] cumple la condición m[i][j] % 2 == 0." },
                  { "archivo": "semana2-10.png", "titulo": "Ejercicio 10", "subtitulo": "Mover contenido de filas", "lightboxTitle": "Semana 2 · Ejercicio 10", "explicacion": "Intercambia o desplaza los elementos completos entre filas de la matriz utilizando una variable auxiliar." }
                ]
              },
              {
                "id": "u1-semana-3",
                "numero": 3,
                "badge": "Semana 3",
                "titulo": "Tema: Arreglos Paralelos",
                "tema": "Arreglos Paralelos",
                "descripcion": "Entregas de la semana.",
                "resumenChatbot": "Cinco ejercicios en Java (Enunciado01.java a Enunciado05.java) utilizando arreglos paralelos donde varios vectores comparten el mismo índice para representar atributos de una entidad (alumnos o empleados).",
                "explicacionTecnica": "En los arreglos paralelos se declaran vectores separados del mismo tamaño máximo (por ejemplo codigo[], nombre[], notas[]) controlados por un único contador numAlu. Cualquier operación de búsqueda u ordenamiento debe mantener sincronizados todos los arreglos en la misma posición i.",
                "abierta": false,
                "baseUrl": "img/",
                "ejercicios": [
                  {
                    "numero": "01",
                    "titulo": "Ejercicio 01",
                    "tema": "Registro de alumnos y promedio en main (Enunciado01.java)",
                    "explicacion": "Declara tres arreglos paralelos (codigo[], nombre[], notas[]) y resuelve en main() con do-while y switch el ingreso validado de alumnos (M1) y el listado tabular con cálculo del promedio general (M2).",
                    "metodos": ["Registro de alumnos", "Registro de alumnos"]
                  },
                  {
                    "numero": "02",
                    "titulo": "Ejercicio 02",
                    "tema": "Gestión modular de empleados y sueldos (Enunciado02.java)",
                    "explicacion": "Organiza en 4 métodos el registro de empleados usando arreglos paralelos (código, nombre, sueldo/horas), listado general, búsqueda y cálculo de planilla.",
                    "metodos": ["Gestión de empleados", "Gestión de empleados", "Gestión de empleados", "Gestión de empleados"]
                  },
                  {
                    "numero": "03",
                    "titulo": "Ejercicio 03",
                    "tema": "Promedio académico con 3 notas en paralelo (Enunciado03.java)",
                    "explicacion": "Maneja arreglos paralelos para nota1[], nota2[], nota3[] y promedio[], calculando automáticamente el promedio de cada estudiante y el estado académico en 4 métodos.",
                    "metodos": ["Promedio con 3 notas", "Promedio con 3 notas", "Promedio con 3 notas", "Promedio con 3 notas"]
                  },
                  {
                    "numero": "04",
                    "titulo": "Ejercicio 04",
                    "tema": "Promedio individual, búsquedas y estadísticas (Enunciado04.java)",
                    "explicacion": "Implementa 6 métodos modulares sobre arreglos paralelos para ingresar datos, calcular promedios individuales, buscar por código/nombre y reportar mayor y menor nota.",
                    "metodos": ["Promedio individual", "Promedio individual", "Promedio individual", "Promedio individual", "Promedio individual", "Promedio individual"]
                  },
                  {
                    "numero": "05",
                    "titulo": "Ejercicio 05",
                    "tema": "Ordenamiento y reportes de alumnos en arreglos paralelos (Enunciado05.java)",
                    "explicacion": "Implementa 9 métodos incluyendo ordenamiento sincronizado (al intercambiar notas[i] con notas[j], también se intercambian codigo[i] y nombre[i]), búsqueda y reportes.",
                    "metodos": ["Orden de alumnos", "Orden de alumnos", "Orden de alumnos", "Orden de alumnos", "Orden de alumnos", "Orden de alumnos", "Orden de alumnos", "Orden de alumnos", "Orden de alumnos"]
                  }
                ]
              },
              {
                "id": "u1-semana-4",
                "numero": 4,
                "badge": "Semana 4",
                "titulo": "Tema: Arreglo de Objetos",
                "tema": "Arreglo de Objetos (POO + MVC/DAO)",
                "descripcion": "Entregas de la semana.",
                "resumenChatbot": "Transición de arreglos paralelos a Programación Orientada a Objetos con Arreglos de Objetos bajo arquitectura Modelo-DAO-Vista: Ejercicio 01 (Alumno y ArregloAlumno con 10 métodos) y Ejercicio 02 (Computadora y ArregloComputadora con 15 métodos CRUD y estadísticos).",
                "explicacionTecnica": "Cada entidad se encapsula en una clase Modelo con atributos privados, constructor y getters/setters. La clase DAO administra un vector estático de objetos (Alumno[] o Computadora[]) y un contador de índice, evitando la dispersión de arreglos paralelos.",
                "abierta": false,
                "baseUrl": "https://github.com/sacijim/portafolio/releases/download/semana04-algoritmo/",
                "ejercicios": [
                  {
                    "numero": "01",
                    "titulo": "Ejercicio 01",
                    "tema": "Gestión académica de alumnos (Clases Alumno y ArregloAlumno)",
                    "explicacion": "Administra un arreglo Alumno[] donde cada objeto encapsula código, nombre y notas. Incluye 10 métodos para promedios, estado aprobado/desaprobado (nota >= 10.5 o 11), mejor y peor promedio, promedio de aula, ordenamiento alfabético con compareToIgnoreCase, orden de mérito descendente, porcentaje de aprobación y búsqueda por nombre.",
                    "metodos": [
                      "mostrarPromediosEstado()", "listarAprobados()", "listarDesaprobados()",
                      "alumnoMejorPromedio()", "alumnoPeorPromedio()", "promedioGeneralAula()",
                      "ordenarAlfabeticamente()", "ordenarPorMerito()", "porcentajeAprobacion()", "buscarPorNombre()"
                    ]
                  },
                  {
                    "numero": "02",
                    "titulo": "Ejercicio 02",
                    "tema": "Inventario CRUD de computadoras (Clases Computadora y ArregloComputadora)",
                    "explicacion": "Gestiona un arreglo Computadora[] con ID, marca, procesador, RAM (GB), almacenamiento (GB) y estado (Operativa, Mantenimiento, Baja). Implementa 15 métodos: CRUD completo (registrar, listarTodas, buscarPorId, modificar, eliminar con desplazamiento), filtros por estado y marca, extremos de mayor RAM y menor almacenamiento, conteo por estado, ordenamiento por ID y por RAM, y promedios de hardware.",
                    "metodos": [
                      "registrar()", "listarTodas()", "buscarPorId()", "modificar()", "eliminar()",
                      "listarPorEstado()", "computadoraMayorRam()", "computadoraMenorAlmacenamiento()",
                      "contarPorEstado()", "reporteCompleto()", "ordenarPorId()", "ordenarPorRam()",
                      "buscarPorMarca()", "promedioRam()", "promedioAlmacenamiento()"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "unidad-2",
            "dot": "U2",
            "titulo": "Unidad 2: PILAS, COLAS Y RECURSIVIDAD",
            "meta": "Semanas 5 a 8",
            "abierta": true,
            "semanas": [
              {
                "id": "u2-semana-5",
                "numero": 5,
                "badge": "Semana 5",
                "titulo": "Tema: ArrayList",
                "tema": "Colecciones Dinámicas con ArrayList",
                "descripcion": "Entregas de la semana.",
                "resumenChatbot": "Uso de java.util.ArrayList<T> para listas dinámicas de objetos: Ejercicio 01 (DAOAlumno con 10 métodos de búsqueda, carrera, ordenamiento, inversión y rangos) y Ejercicio 02 (Sistema relacional con DAOEstudiante, DAOCurso y DAOMatricula con 21 métodos).",
                "explicacionTecnica": "Reemplaza los arreglos de tamaño fijo por ArrayList<T>, permitiendo inserciones dinámicas con add(), eliminaciones con remove(), acceso con get(i) y ordenamientos con Collections/Comparator sin preocuparse por desbordamiento de capacidad.",
                "abierta": false,
                "baseUrl": "https://github.com/sacijim/portafolio/releases/download/semana05-algoritmos/",
                "ejercicios": [
                  {
                    "numero": "01",
                    "titulo": "Ejercicio 01",
                    "tema": "Gestión de estudiantes con ArrayList (Clase DAOAlumno)",
                    "explicacion": "Implementa 10 operaciones sobre ArrayList<Alumno>: búsqueda por nombre, filtrado por carrera profesional, ordenamiento por apellidos y por edad, inversión de la lista, obtención del primer (index 0) y último elemento (size()-1), eliminación masiva por carrera, conteo por carrera y visualización por rango de índices.",
                    "metodos": [
                      "buscarPorNombre()", "listarPorCarrera()", "ordenarPorApellidos()",
                      "ordenarPorEdad()", "invertirLista()", "obtenerPrimero()",
                      "obtenerUltimo()", "eliminarPorCarrera()", "contarPorCarrera()", "mostrarRango()"
                    ]
                  },
                  {
                    "numero": "02",
                    "titulo": "Ejercicio 02",
                    "tema": "Sistema académico relacional de Estudiantes, Cursos y Matrículas (21 métodos)",
                    "explicacion": "Arquitectura con 3 DAOs basados en ArrayList: DAOEstudiante (CRUD de estudiantes: métodos 1 al 5), DAOCurso (CRUD de cursos: métodos 6 al 10) y DAOMatricula (matrículas, notas y reportes: métodos 11 al 20 + menú). Calcula promedio ponderado/simple por estudiante, ranking académico ordenado por rendimiento, filtro por carrera, desaprobados y mejor promedio.",
                    "metodos": [
                      "registrarEstudiante()", "listarEstudiantes()", "buscarEstudiante()", "modificarEstudiante()",
                      "eliminarEstudiante()", "registrarCurso()", "listarCursos()", "buscarCurso()",
                      "modificarCurso()", "eliminarCurso()", "registrarMatricula()", "listarMatriculas()",
                      "consultarCursosEstudiante()", "modificarNota()", "eliminarMatricula()", "promedioEstudiante()",
                      "rankingAcademico()", "estudiantesPorCarrera()", "estudiantesDesaprobados()",
                      "mejorPromedio()", "menu() · [21] Salir"
                    ]
                  }
                ]
              },
              {
                "id": "u2-semana-6",
                "numero": 6,
                "badge": "Semana 6",
                "titulo": "Tema: Pilas",
                "tema": "Pilas (LIFO: Estática, Dinámica y Undo/Redo)",
                "descripcion": "Entregas de la semana.",
                "resumenChatbot": "Implementación completa de Pilas (LIFO - Last In, First Out) en 3 actividades: Ejercicio 01 Pila estática de alumnos (PilaAlumno, 10 métodos); Ejercicio 02 Pila dinámica con nodos enlazados de computadoras (PilaInventario, 11 métodos); Ejercicio 03 Historial Deshacer/Rehacer con doble pila (GestorDocumento, 8 métodos).",
                "explicacionTecnica": "Una Pila opera bajo el principio LIFO: el último elemento en entrar es el primero en salir. En versión estática se controla con un arreglo y un índice tope (inicializado en -1). En versión dinámica se usa una lista simplemente enlazada donde el nuevo Nodo apunta a la antigua cima (nuevo.siguiente = cima; cima = nuevo) logrando Push, Pop y Peek en O(1).",
                "abierta": false,
                "baseUrl": "https://github.com/sacijim/portafolio/releases/download/semana06-algoritmo-corregido/",
                "ejercicios": [
                  {
                    "numero": "01",
                    "titulo": "Ejercicio 01",
                    "tema": "Pila estática de alumnos (Clases Alumno y PilaAlumno)",
                    "explicacion": "Usa un arreglo estático Alumno[] y puntero tope. Métodos: insertarPila [Push] valida que no esté llena e incrementa ++tope; mostrarPila recorre desde tope hasta 0; eliminaDatos [Pop] extrae pila[tope--]; eliminaPila reinicia tope = -1; consultarCima [Peek] muestra pila[tope] sin extraerlo; además de estado de capacidad, búsqueda por código, estado lógico (vacía/llena) y mejor promedio.",
                    "metodos": [
                      "insertarPila() [Push]", "mostrarPila()", "eliminaDatos() [Pop]", "eliminaPila()",
                      "consultarCima() [Peek]", "mostrarEstadoCapacidad()", "buscarAlumnoPorCodigo()",
                      "verificarEstadoLogico()", "mostrarMejorPromedio()", "menu() · 10. Salir"
                    ]
                  },
                  {
                    "numero": "02",
                    "titulo": "Ejercicio 02",
                    "tema": "Pila dinámica de inventario de computadoras (Clases Computadora, Nodo y PilaInventario)",
                    "explicacion": "Implementa una pila dinámica mediante nodos enlazados (puntero cima y contador total). Permite apilarComputadora [Push] creando un Nodo en memoria dinámica, desapilarComputadora [Pop] avanzando cima = cima.siguiente, consultarCima [Peek], limpiarInventario (cima = null), contarComputadoras, buscarPorSerie, calcularValorInventario sumando precios, filtrar equipos superiores a un precio y hallar el equipo más caro.",
                    "metodos": [
                      "apilarComputadora() [Push]", "mostrarInventario()", "desapilarComputadora() [Pop]",
                      "consultarCima() [Peek]", "limpiarInventario()", "contarComputadoras()",
                      "buscarPorSerie()", "calcularValorInventario()", "mostrarEquiposSuperioresA()",
                      "obtenerEquipoMasCaro()", "menu() · 11. Salir"
                    ]
                  },
                  {
                    "numero": "03",
                    "titulo": "Ejercicio 03",
                    "tema": "Sistema Deshacer/Rehacer (Undo/Redo) con dos pilas dinámicas (Clase GestorDocumento)",
                    "explicacion": "Modela el historial de un editor usando dos pilas enlazadas: pilaDeshacer y pilaRehacer. Al ejecutarNuevaAccion() se apila en pilaDeshacer y se vacía pilaRehacer. Al deshacerAccion() [Undo] se desapila de pilaDeshacer y se apila en pilaRehacer. Al rehacerAccion() [Redo] se desapila de pilaRehacer y vuelve a pilaDeshacer. Incluye búsqueda en historial, inversión de pila y exportación de resumen.",
                    "metodos": [
                      "ejecutarNuevaAccion()", "deshacerAccion() [Undo]", "rehacerAccion() [Redo]",
                      "mostrarEstadoHistorial()", "buscarAccionEnHistorial()", "invertirPilaAcciones()",
                      "exportarHistorialResumen()", "menu() · 8. Salir"
                    ]
                  }
                ]
              },
              {
                "id": "u2-semana-7",
                "numero": 7,
                "badge": "Semana 7",
                "titulo": "Tema: Colas",
                "tema": "Colas (FIFO: Circular Estática y Dinámicas Enlazadas)",
                "descripcion": "Entregas de la semana.",
                "resumenChatbot": "Implementación de Colas (FIFO - First In, First Out) con código fuente Java descargable (Semana07_codigo_sacijim.zip): Ejercicio 01 Cola estática circular de alumnos (ColaAlumno, 14 métodos); Ejercicio 02 Cola dinámica de atención de clientes por trámite (ColaAtencion, 9 métodos); Ejercicio 03 Cola dinámica de pedidos (ColaPedidos, 9 métodos).",
                "explicacionTecnica": "En la versión de sacijim, la Actividad 01 implementa ColaAlumno como una cola circular sobre arreglo usando índices frente, finalCola y cantidad con avance modular (finalCola + 1) % MAX, manejando errores con excepciones e invirtiendo la cola con una pila auxiliar de arreglo. Las Actividades 02 (ColaAtencion) y 03 (ColaPedidos) usan nodos simplemente enlazados con punteros frente y fin, y eliminan nodos específicos (por ticket o pedido) recorriendo con punteros anterior y actual.",
                "abierta": true,
                "baseUrl": "https://github.com/sacijim/portafolio/releases/download/semana07-algoritmos/",
                "archivos": [
                  {
                    "icono": "ZIP",
                    "titulo": "Codigo Java (3 actividades)",
                    "subtitulo": "Semana07_codigo_sacijim.zip · GitHub",
                    "verUrl": "https://github.com/sacijim/portafolio/releases/tag/semana07-algoritmos",
                    "verTexto": "Ver en GitHub",
                    "descargarUrl": "https://github.com/sacijim/portafolio/releases/download/semana07-algoritmos/Semana07_codigo_sacijim.zip",
                    "descargarTexto": "Descargar"
                  }
                ],
                "ejercicios": [
                  {
                    "numero": "01",
                    "titulo": "Ejercicio 01",
                    "tema": "Cola estática circular de alumnos (Clases Alumno y ColaAlumno)",
                    "explicacion": "Implementa una cola circular con arreglo fijo, punteros frente, finalCola y contador cantidad. Operaciones básicas O(1): insertar() [Encolar] usa (finalCola + 1) % capacidad, eliminar() [Desencolar] avanza (frente + 1) % capacidad, consultar() [Ver frente], mostrarTodos(), estaVacia(), estaLlena() y tamano(). Operaciones avanzadas: buscarPorCodigo(), promedioGeneral(), filtrarPorRendimiento(), alumnoMayor/MenorPromedio(), invertir() usando un arreglo-pila auxiliar y eliminarPorCodigo() usando cola auxiliar.",
                    "metodos": [
                      "insertar()  [Encolar]", "eliminar()  [Desencolar]", "consultar()  [Ver frente]",
                      "mostrarTodos()", "estaVacia()", "estaLlena()", "tamano()", "buscarPorCodigo()",
                      "promedioGeneral()", "filtrarPorRendimiento()", "alumnoMayor/MenorPromedio()",
                      "invertir()", "eliminarPorCodigo()", "menu()  ·  0. Salir"
                    ]
                  },
                  {
                    "numero": "02",
                    "titulo": "Ejercicio 02",
                    "tema": "Cola dinámica de atención de clientes en banco (Clases Cliente, Nodo y ColaAtencion)",
                    "explicacion": "Gestiona turnos bancarios por orden de llegada (FIFO) mediante nodos enlazados con punteros frente y fin. Métodos: encolar() [Generar ticket] inserta al final en O(1), desencolar() [Atender] extrae del frente en O(1), consultarSiguiente() [Peek], mostrarCola(), estaVacia(), buscarCliente(), filtrarPorTramite() y eliminarPorTicket() (desencola un nodo intermedio reasignando anterior.siguiente = actual.siguiente).",
                    "metodos": [
                      "encolar()  [Generar ticket]", "desencolar()  [Atender]", "consultarSiguiente()  [Peek]",
                      "mostrarCola()", "estaVacia()", "buscarCliente()", "filtrarPorTramite()",
                      "eliminarPorTicket()", "menu()  ·  9. Salir"
                    ]
                  },
                  {
                    "numero": "03",
                    "titulo": "Ejercicio 03",
                    "tema": "Cola dinámica de pedidos de cocina (Clases Pedido, Nodo y ColaPedidos)",
                    "explicacion": "Administra pedidos en espera con estructura FIFO dinámica (frente y fin). Permite encolar() [Registrar pedido], despachar() el pedido más antiguo, consultarSiguiente() [Peek], mostrarPendientes(), estaVacia(), buscarPedido(), calcularMontoTotal() acumulando el importe de todos los pedidos pendientes y cancelarPedido() buscando y desconectando el nodo con punteros anterior y actual.",
                    "metodos": [
                      "encolar()  [Registrar pedido]", "despachar()", "consultarSiguiente()  [Peek]",
                      "mostrarPendientes()", "estaVacia()", "buscarPedido()", "calcularMontoTotal()",
                      "cancelarPedido()", "menu()  ·  9. Salir"
                    ]
                  }
                ]
              }
            ]
          },
          { "id": "unidad-3", "dot": "U3", "titulo": "Unidad 3: LISTAS ENLAZADAS", "meta": "Semanas 9 a 12", "abierta": false, "semanas": [] },
          { "id": "unidad-4", "dot": "U4", "titulo": "Unidad 4: ARBOLES, GRAFOS, MÉTODOS DE ORDENACIÓN Y BÚSQUEDA", "meta": "Semanas 13 a 16", "abierta": false, "semanas": [] },
          { "id": "unidad-integral", "dot": "UI", "titulo": "Unidad Integral", "meta": "Trabajo integrador final", "abierta": false, "mensajeVacio": "El trabajo integrador se publicara al final del ciclo.", "semanas": [] }
        ]
      },
      "taller": {
        "id": "taller",
        "pagina": "taller.html",
        "nombre": "Taller: Desarrollo de Aplicaciones",
        "ciclo": "IV Ciclo · 2026",
        "descripcion": "Trabajos y entregables de Taller de Desarrollo de Aplicaciones organizados por unidad.",
        "unidades": [
          {
            "id": "unidad-1",
            "dot": "U1",
            "titulo": "Unidad 1",
            "meta": "Semanas 1 a 4",
            "abierta": true,
            "semanas": [
              {
                "id": "u1-semana-1",
                "numero": 1,
                "badge": "Semana 1",
                "titulo": "Enlace de Figma",
                "tema": "Diseño y Prototipado UI/UX en Figma",
                "descripcion": "Prototipo y diseño en Figma para esta semana.",
                "resumenChatbot": "Semana 1 de Taller: Diseño de wireframes e interfaz de usuario en Figma para prototipado de aplicaciones.",
                "explicacionTecnica": "Consiste en el diseño de wireframes y maquetas interactivas en Figma para definir la arquitectura de información, componentes visuales y flujo de pantallas de la aplicación antes de pasar al entorno de desarrollo.",
                "abierta": true,
                "archivos": [
                  {
                    "icono": "FIG",
                    "titulo": "Wireframe",
                    "subtitulo": "figma.com/wireframe",
                    "verUrl": "https://www.figma.com/design/F7UZyD9I97joeFoHH3iMfp/DISE%C3%91OS-DE-APPS?node-id=0-1&t=IGvYW2PC2g2BQLxy-1",
                    "verTexto": "Abrir",
                    "descargarUrl": "https://www.figma.com/design/F7UZyD9I97joeFoHH3iMfp/DISE%C3%91OS-DE-APPS?node-id=0-1&t=IGvYW2PC2g2BQLxy-1",
                    "descargarTexto": "Visitar",
                    "descargarExterno": true
                  }
                ]
              },
              {
                "id": "u1-semana-2",
                "numero": 2,
                "badge": "Semana 2",
                "titulo": "Documento y Release",
                "tema": "Definiciones de Maven/POM y Actividad 02",
                "descripcion": "Documento y release del proyecto para esta semana.",
                "resumenChatbot": "Semana 2 de Taller: Documento teórico-práctico sobre Definiciones de Maven y el archivo POM (pom.xml), acompañado del proyecto empaquetado Actividad02.rar en GitHub Releases.",
                "explicacionTecnica": "Incluye la investigación sobre Apache Maven y el modelo de objetos de proyecto (POM: groupId, artifactId, version, dependencias y ciclo de vida de construcción), junto con la solución práctica de la Actividad 02 empaquetada en formato RAR.",
                "abierta": true,
                "archivos": [
                  {
                    "icono": "PDF",
                    "titulo": "Documento final",
                    "subtitulo": "DEFINICIONES DE MAVEN Y POM.docx",
                    "verUrl": "pdfs/DEFINICIONES DE MAVEN Y POM.docx",
                    "verTexto": "Ver",
                    "descargarUrl": "pdfs/DEFINICIONES DE MAVEN Y POM.docx",
                    "descargarNombre": "DEFINICIONES DE MAVEN Y POM.docx",
                    "descargarTexto": "Descargar"
                  },
                  {
                    "icono": "RAR",
                    "titulo": "Actividad 02 (Release)",
                    "subtitulo": "Actividad02.rar · GitHub",
                    "verUrl": "https://github.com/sacijim/portafolio/releases/tag/TALLER-APPS",
                    "verTexto": "Ver en GitHub",
                    "descargarUrl": "https://github.com/sacijim/portafolio/releases/download/TALLER-APPS/Actividad02.rar",
                    "descargarTexto": "Descargar"
                  }
                ]
              },
              {
                "id": "u1-semana-3",
                "numero": 3,
                "badge": "Semana 3",
                "titulo": "Documento y Release",
                "tema": "Actividades 01 y 02 de Desarrollo de Aplicaciones",
                "descripcion": "Archivo rar con la actividad 1 y 2 de la semana 3.",
                "resumenChatbot": "Semana 3 de Taller: Paquete descargable Sarai.rar alojado en GitHub Releases con el desarrollo completo de las Actividades 01 y 02.",
                "explicacionTecnica": "Contiene los proyectos de código fuente correspondientes a las Actividades 01 y 02 de la Semana 3 del curso Taller de Desarrollo de Aplicaciones, listos para importar y ejecutar en el IDE.",
                "abierta": true,
                "archivos": [
                  {
                    "icono": "RAR",
                    "titulo": "Actividad 01 y 02",
                    "subtitulo": "Sarai.rar · GitHub",
                    "verUrl": "https://github.com/sacijim/portafolio/releases/download/semana03-apps/Sarai.rar",
                    "verTexto": "Descargar"
                  }
                ]
              }
            ]
          },
          { "id": "unidad-2", "dot": "U2", "titulo": "Unidad 2", "meta": "Semanas 5 a 8", "abierta": false, "semanas": [] },
          { "id": "unidad-3", "dot": "U3", "titulo": "Unidad 3", "meta": "Semanas 9 a 12", "abierta": false, "semanas": [] },
          { "id": "unidad-4", "dot": "U4", "titulo": "Unidad 4", "meta": "Semanas 13 a 16", "abierta": false, "semanas": [] },
          { "id": "unidad-integral", "dot": "UI", "titulo": "Unidad Integral", "meta": "Trabajo integrador final", "abierta": false, "mensajeVacio": "El trabajo integrador se publicara al final del ciclo.", "semanas": [] }
        ]
      }
    }
  };

  var portafolioData = null;

  function escapeHtml(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function loadPortafolioData() {
    if (portafolioData) return Promise.resolve(portafolioData);
    return fetch('data/portafolio.json')
      .then(function (res) {
        if (!res.ok) throw new Error('Error HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        portafolioData = data;
        return data;
      })
      .catch(function () {
        portafolioData = FALLBACK_DATA;
        return portafolioData;
      });
  }

  window.getPortafolioData = loadPortafolioData;
  window.expandExerciseItems = expandExerciseItems;

  // ============================================================
  // NAVEGACIÓN MÓVIL COMPARTIDA
  // ============================================================
  function initNavbar() {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============================================================
  // RENDERIZADO DE ELEMENTOS (IMÁGENES, ARCHIVOS, EJERCICIOS)
  // ============================================================
  function renderImageFileItem(item, baseUrl) {
    var src = item.url || ((baseUrl || '') + item.archivo);
    var fileName = item.descarga || item.archivo || src.split('/').pop();
    var alt = item.alt || item.titulo;
    var lightboxTitle = item.lightboxTitle || item.titulo;

    return (
      '<div class="file-item">' +
        '<div class="file-item__meta">' +
          '<img class="file-item__thumb" src="' + escapeHtml(src) + '" alt="' + escapeHtml(alt) + '" loading="lazy" />' +
          '<div class="file-item__body"><strong>' + escapeHtml(item.titulo) + '</strong><small>' + escapeHtml(item.subtitulo) + '</small></div>' +
        '</div>' +
        '<div class="file-item__actions">' +
          '<a href="' + escapeHtml(src) + '" class="file-item__view" data-full="' + escapeHtml(src) + '" data-title="' + escapeHtml(lightboxTitle) + '">Visualizar</a>' +
          '<a href="' + escapeHtml(src) + '" download="' + escapeHtml(fileName) + '" class="file-item__download">Descargar</a>' +
        '</div>' +
      '</div>'
    );
  }

  function renderAttachmentFileItem(archivo) {
    var actionsHtml = '';
    if (archivo.verUrl) {
      actionsHtml += '<a href="' + escapeHtml(archivo.verUrl) + '" target="_blank" rel="noopener" class="file-item__view">' + escapeHtml(archivo.verTexto || 'Ver') + '</a>';
    }
    if (archivo.descargarUrl) {
      var extraAttrs = archivo.descargarExterno
        ? ' target="_blank" rel="noopener"'
        : (archivo.descargarNombre ? ' download="' + escapeHtml(archivo.descargarNombre) + '"' : '');
      actionsHtml += '<a href="' + escapeHtml(archivo.descargarUrl) + '"' + extraAttrs + ' class="file-item__download">' + escapeHtml(archivo.descargarTexto || 'Descargar') + '</a>';
    }

    return (
      '<div class="file-item">' +
        '<div class="file-item__meta">' +
          '<span class="file-item__icon">' + escapeHtml(archivo.icono || 'DOC') + '</span>' +
          '<div class="file-item__body"><strong>' + escapeHtml(archivo.titulo) + '</strong><small>' + escapeHtml(archivo.subtitulo) + '</small></div>' +
        '</div>' +
        '<div class="file-item__actions">' + actionsHtml + '</div>' +
      '</div>'
    );
  }

  function expandExerciseItems(semana, ejercicio) {
    if (Array.isArray(ejercicio.items)) {
      return ejercicio.items;
    }
    var metodos = ejercicio.metodos || [];
    return metodos.map(function (nombreMetodo, idx) {
      var mNum = idx + 1;
      var archivo = ejercicio.numero + '-M' + mNum + '.png';
      return {
        archivo: archivo,
        titulo: 'Método ' + mNum,
        subtitulo: nombreMetodo,
        alt: ejercicio.titulo + ', imagen M' + mNum,
        lightboxTitle: 'Semana ' + semana.numero + ' · ' + ejercicio.titulo + ' · M' + mNum
      };
    });
  }

  function renderWeekCard(semana) {
    var isOpen = Boolean(semana.abierta);
    var bodyId = 'week-' + semana.numero + '-body';
    var baseUrl = semana.baseUrl || '';
    var innerHtml = '<p class="card__desc">' + escapeHtml(semana.descripcion || 'Entregas de la semana.') + '</p>';

    if (Array.isArray(semana.archivos) && semana.archivos.length > 0) {
      innerHtml +=
        '<div class="file-list" aria-label="Entregables de la semana ' + escapeHtml(semana.numero) + '">' +
          semana.archivos.map(renderAttachmentFileItem).join('') +
        '</div>';
    }

    if (Array.isArray(semana.items) && semana.items.length > 0) {
      innerHtml +=
        '<div class="file-list" aria-label="Archivos de la semana ' + escapeHtml(semana.numero) + '">' +
          semana.items.map(function (it) { return renderImageFileItem(it, baseUrl); }).join('') +
        '</div>';
    }

    if (Array.isArray(semana.ejercicios) && semana.ejercicios.length > 0) {
      var groupsHtml = semana.ejercicios.map(function (ej, idx) {
        var resolvedItems = expandExerciseItems(semana, ej);
        var countLabel = resolvedItems.length + (resolvedItems.length === 1 ? ' imagen' : ' imágenes');
        var exId = semana.id + '-ej-' + ej.numero;
        return (
          '<details class="exercise-group" id="' + escapeHtml(exId) + '">' +
            '<summary class="exercise-group__header">' +
              '<span class="exercise-group__title">' + escapeHtml(ej.titulo) + '</span>' +
              '<span class="exercise-group__count">' + escapeHtml(countLabel) + '</span>' +
              '<svg class="exercise-group__chevron" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>' +
            '</summary>' +
            '<div class="file-list" aria-label="Imágenes del ejercicio ' + (idx + 1) + '">' +
              resolvedItems.map(function (it) { return renderImageFileItem(it, baseUrl); }).join('') +
            '</div>' +
          '</details>'
        );
      }).join('');

      innerHtml += '<div class="exercise-list" aria-label="Ejercicios de la semana ' + escapeHtml(semana.numero) + '">' + groupsHtml + '</div>';
    }

    return (
      '<article class="card card--files week-panel' + (isOpen ? ' is-open' : '') + '" id="' + escapeHtml(semana.id) + '">' +
        '<button class="week-panel__header" type="button" aria-expanded="' + String(isOpen) + '" aria-controls="' + escapeHtml(bodyId) + '">' +
          '<span class="card__badge">' + escapeHtml(semana.badge) + '</span>' +
          '<span class="week-panel__title">' + escapeHtml(semana.titulo) + '</span>' +
          '<svg class="week-panel__chevron" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>' +
        '</button>' +
        '<div class="week-panel__body" id="' + escapeHtml(bodyId) + '">' +
          innerHtml +
        '</div>' +
      '</article>'
    );
  }

  function renderUnit(unidad, idx) {
    var isOpen = Boolean(unidad.abierta);
    var bodyId = 'body-' + (unidad.dot ? unidad.dot.toLowerCase() : ('u' + (idx + 1)));
    var semanas = Array.isArray(unidad.semanas) ? unidad.semanas : [];
    var bodyContent = '';

    if (semanas.length > 0) {
      bodyContent = '<div class="cards-grid">' + semanas.map(renderWeekCard).join('') + '</div>';
    } else {
      var emptyMsg = unidad.mensajeVacio || 'Aun no hay trabajos publicados en esta unidad.';
      bodyContent =
        '<div class="unit__empty">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true">' +
            '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />' +
            '<polyline points="14 2 14 8 20 8" />' +
          '</svg>' +
          '<p>' + escapeHtml(emptyMsg) + '</p>' +
        '</div>';
    }

    return (
      '<div class="unit' + (isOpen ? ' open' : '') + '" id="' + escapeHtml(unidad.id) + '">' +
        '<button class="unit__header" aria-expanded="' + String(isOpen) + '" aria-controls="' + escapeHtml(bodyId) + '">' +
          '<div class="unit__left">' +
            '<span class="unit__dot">' + escapeHtml(unidad.dot) + '</span>' +
            '<div>' +
              '<p class="unit__title">' + escapeHtml(unidad.titulo) + '</p>' +
              '<p class="unit__meta">' + escapeHtml(unidad.meta) + '</p>' +
            '</div>' +
          '</div>' +
          '<svg class="unit__chevron" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>' +
        '</button>' +
        '<div class="unit__body" id="' + escapeHtml(bodyId) + '">' +
          bodyContent +
        '</div>' +
      '</div>'
    );
  }

  function bindAccordions(container) {
    container.querySelectorAll('.unit__header').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var unit = btn.closest('.unit');
        var shouldOpen = !unit.classList.contains('open');

        container.querySelectorAll('.unit').forEach(function (item) {
          var itemButton = item.querySelector('.unit__header');
          var isSelected = item === unit && shouldOpen;
          item.classList.toggle('open', isSelected);
          if (itemButton) {
            itemButton.setAttribute('aria-expanded', String(isSelected));
          }
        });
      });
    });

    container.querySelectorAll('.week-panel__header').forEach(function (button) {
      button.addEventListener('click', function () {
        var panel = button.closest('.week-panel');
        var isOpen = panel.classList.contains('is-open');
        panel.classList.toggle('is-open', !isOpen);
        button.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }

  // ============================================================
  // ACCIONES INTERACTIVAS DE NAVEGACIÓN PROFUNDA (PARA CHATBOT)
  // ============================================================
  function focusWeekInDom(unitId, weekId, exerciseId) {
    var unitEl = unitId ? document.getElementById(unitId) : null;
    var weekEl = weekId ? document.getElementById(weekId) : null;

    if (!unitEl && weekEl) {
      unitEl = weekEl.closest('.unit');
    }

    if (unitEl) {
      document.querySelectorAll('.unit').forEach(function (u) {
        var btn = u.querySelector('.unit__header');
        var active = (u === unitEl);
        u.classList.toggle('open', active);
        if (btn) btn.setAttribute('aria-expanded', String(active));
      });
    }

    if (weekEl) {
      weekEl.classList.add('is-open');
      var wBtn = weekEl.querySelector('.week-panel__header');
      if (wBtn) wBtn.setAttribute('aria-expanded', 'true');
    }

    var targetScrollEl = weekEl || unitEl;
    if (exerciseId) {
      var exEl = document.getElementById(exerciseId);
      if (exEl) {
        exEl.open = true;
        targetScrollEl = exEl;
      }
    }

    if (targetScrollEl) {
      setTimeout(function () {
        targetScrollEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }

  window.navigateToPortfolioTarget = function (options) {
    if (!options) return;
    var targetPage = options.page || 'algoritmos.html';
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Si estamos en la misma página, ejecutamos la acción directamente sin recargar
    if (currentPath === targetPage) {
      if (options.unitId || options.weekId) {
        focusWeekInDom(options.unitId, options.weekId, options.exerciseId);
      }
      if (options.imageUrl && typeof window.openPortfolioImage === 'function') {
        window.openPortfolioImage(options.imageUrl, options.imageTitle);
      }
      return;
    }

    // Si estamos en otra página, redirigimos con parámetros para abrir automáticamente
    var params = new URLSearchParams();
    if (options.unitId) params.set('unit', options.unitId);
    if (options.weekId) params.set('week', options.weekId);
    if (options.exerciseId) params.set('ex', options.exerciseId);
    if (options.imageUrl) params.set('img', options.imageUrl);
    if (options.imageTitle) params.set('title', options.imageTitle);
    window.location.href = targetPage + '?' + params.toString();
  };

  function handleUrlDeepLinks() {
    var params = new URLSearchParams(window.location.search);
    var unitId = params.get('unit');
    var weekId = params.get('week');
    var exerciseId = params.get('ex');
    var imgUrl = params.get('img');
    var imgTitle = params.get('title');

    if (unitId || weekId || exerciseId) {
      focusWeekInDom(unitId, weekId, exerciseId);
    }
    if (imgUrl && typeof window.openPortfolioImage === 'function') {
      setTimeout(function () {
        window.openPortfolioImage(imgUrl, imgTitle || 'Vista previa');
      }, 150);
    }
  }

  // ============================================================
  // LIGHTBOX CON ZOOM REAL, ARRASTRE Y ATAJOS DE TECLADO (SIN EMOJIS)
  // ============================================================
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var lightboxStage = document.getElementById('lightboxStage');
    var lightboxWrapper = document.getElementById('lightboxWrapper');
    var lightboxImage = document.getElementById('lightboxImage');
    var lightboxTitle = document.getElementById('lightboxTitle');
    var lightboxZoomLevel = document.getElementById('lightboxZoomLevel');
    var lightboxZoomIn = document.getElementById('lightboxZoomIn');
    var lightboxZoomOut = document.getElementById('lightboxZoomOut');
    var lightboxZoomReset = document.getElementById('lightboxZoomReset');
    var lightboxOpenTab = document.getElementById('lightboxOpenTab');
    var lightboxDownload = document.getElementById('lightboxDownload');
    var lightboxClose = document.getElementById('lightboxClose');
    var lightboxHint = document.getElementById('lightboxHint');

    var scale = 1;
    var baseWidth = 0;
    var baseHeight = 0;
    var isDragging = false;
    var dragMoved = false;
    var startX = 0;
    var startY = 0;
    var startScrollLeft = 0;
    var startScrollTop = 0;

    function computeBaseDimensions() {
      if (!lightboxImage.naturalWidth || !lightboxImage.naturalHeight) return;
      var availW = Math.max(lightboxStage.clientWidth - 48, 240);
      var availH = Math.max(lightboxStage.clientHeight - 48, 240);
      var fitRatio = Math.min(availW / lightboxImage.naturalWidth, availH / lightboxImage.naturalHeight, 1);
      baseWidth = Math.round(lightboxImage.naturalWidth * fitRatio);
      baseHeight = Math.round(lightboxImage.naturalHeight * fitRatio);
    }

    function applyZoom(newScale, animated) {
      scale = Math.min(Math.max(newScale, 1), 4.5);
      if (!baseWidth || !baseHeight) computeBaseDimensions();

      var prevW = lightboxWrapper.clientWidth || baseWidth || 1;
      var prevH = lightboxWrapper.clientHeight || baseHeight || 1;
      var scrollCenterXRatio = (lightboxStage.scrollLeft + lightboxStage.clientWidth / 2) / prevW;
      var scrollCenterYRatio = (lightboxStage.scrollTop + lightboxStage.clientHeight / 2) / prevH;

      var targetW = Math.round(baseWidth * scale);
      var targetH = Math.round(baseHeight * scale);

      lightboxWrapper.style.transition = animated
        ? 'width 0.2s cubic-bezier(0.25, 1, 0.5, 1), height 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
        : 'none';
      lightboxWrapper.style.width = targetW + 'px';
      lightboxWrapper.style.height = targetH + 'px';
      lightboxZoomLevel.textContent = Math.round(scale * 100) + '%';

      var isZoomed = scale > 1.05;
      lightboxWrapper.classList.toggle('is-zoomed', isZoomed);

      if (isZoomed) {
        lightboxImage.style.cursor = 'grab';
        lightboxHint.innerHTML = '<strong>Barras de desplazamiento activadas:</strong> Usa la rueda del ratón, las barras o arrastra para ver toda la hoja &middot; Haz clic para ajustar';
      } else {
        lightboxImage.style.cursor = 'zoom-in';
        lightboxHint.innerHTML = 'Haz clic en la imagen o en "Agrandar" para ampliarla &middot; Toda la hoja visible';
      }

      if (scale > 1.05) {
        setTimeout(function () {
          lightboxStage.scrollLeft = (scrollCenterXRatio * targetW) - (lightboxStage.clientWidth / 2);
          lightboxStage.scrollTop = (scrollCenterYRatio * targetH) - (lightboxStage.clientHeight / 2);
        }, animated ? 25 : 0);
      } else {
        lightboxStage.scrollLeft = 0;
        lightboxStage.scrollTop = 0;
      }
    }

    function resetZoom() {
      applyZoom(1, true);
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      scale = 1;
      baseWidth = 0;
      baseHeight = 0;
      lightboxWrapper.style.width = '';
      lightboxWrapper.style.height = '';
      lightboxImage.src = '';
      lightboxImage.alt = '';
      lightboxTitle.textContent = '';
      lightboxOpenTab.href = '';
      lightboxDownload.href = '';
    }

    function openLightbox(fullImage, title) {
      var safeTitle = title || 'Archivo del trabajo';
      function showImage() {
        computeBaseDimensions();
        applyZoom(1, false);
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      }

      lightboxImage.onload = showImage;
      lightboxImage.src = fullImage;
      lightboxImage.alt = safeTitle;
      lightboxTitle.textContent = safeTitle;
      lightboxOpenTab.href = fullImage;
      lightboxDownload.href = fullImage;
      lightboxDownload.setAttribute('download', fullImage.split('/').pop());

      if (lightboxImage.complete && lightboxImage.naturalWidth) {
        showImage();
      }
    }

    window.openPortfolioImage = openLightbox;

    lightboxZoomIn.addEventListener('click', function (e) {
      e.stopPropagation();
      applyZoom(scale + 0.4, true);
    });

    lightboxZoomOut.addEventListener('click', function (e) {
      e.stopPropagation();
      applyZoom(scale - 0.4, true);
    });

    lightboxZoomReset.addEventListener('click', function (e) {
      e.stopPropagation();
      resetZoom();
    });

    lightboxWrapper.addEventListener('click', function (e) {
      e.stopPropagation();
      if (dragMoved) {
        dragMoved = false;
        return;
      }
      if (scale > 1.05) resetZoom();
      else applyZoom(2.2, true);
    });

    lightboxStage.addEventListener('pointerdown', function (e) {
      if (scale > 1.05 && e.button === 0) {
        isDragging = true;
        dragMoved = false;
        startX = e.clientX;
        startY = e.clientY;
        startScrollLeft = lightboxStage.scrollLeft;
        startScrollTop = lightboxStage.scrollTop;
        lightboxWrapper.classList.add('is-dragging');
        lightboxStage.setPointerCapture(e.pointerId);
      }
    });

    lightboxStage.addEventListener('pointermove', function (e) {
      if (isDragging) {
        var dx = e.clientX - startX;
        var dy = e.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved = true;
        lightboxStage.scrollLeft = startScrollLeft - dx;
        lightboxStage.scrollTop = startScrollTop - dy;
      }
    });

    function endDrag(e) {
      if (isDragging) {
        isDragging = false;
        lightboxWrapper.classList.remove('is-dragging');
        try {
          lightboxStage.releasePointerCapture(e.pointerId);
        } catch (err) { }
      }
    }

    lightboxStage.addEventListener('pointerup', endDrag);
    lightboxStage.addEventListener('pointercancel', endDrag);

    lightboxStage.addEventListener('wheel', function (e) {
      if (e.ctrlKey) {
        e.preventDefault();
        var delta = e.deltaY < 0 ? 0.35 : -0.35;
        applyZoom(scale + delta, true);
      }
    }, { passive: false });

    var touchDist = 0;
    var touchScale = 1;
    lightboxStage.addEventListener('touchstart', function (e) {
      if (e.touches.length === 2) {
        touchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        touchScale = scale;
      }
    }, { passive: true });

    lightboxStage.addEventListener('touchmove', function (e) {
      if (e.touches.length === 2 && touchDist > 0) {
        e.preventDefault();
        var currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        applyZoom(touchScale * (currentDist / touchDist), false);
      }
    }, { passive: false });

    lightboxStage.addEventListener('touchend', function (e) {
      if (e.touches.length < 2) touchDist = 0;
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightboxStage.addEventListener('click', function (e) {
      if (e.target === lightboxStage && scale <= 1.05 && !isDragging && !dragMoved) {
        closeLightbox();
      }
    });

    window.addEventListener('resize', function () {
      if (lightbox.classList.contains('open')) {
        computeBaseDimensions();
        applyZoom(scale, false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === '+' || e.key === '=') applyZoom(scale + 0.4, true);
      else if (e.key === '-' || e.key === '_') applyZoom(scale - 0.4, true);
      else if (e.key === '0') resetZoom();
    });

    document.addEventListener('click', function (event) {
      var viewLink = event.target.closest('.file-item__view[data-full]');
      if (!viewLink) return;
      event.preventDefault();
      var fullImage = viewLink.dataset.full || viewLink.getAttribute('href');
      var title = viewLink.dataset.title || 'Archivo del trabajo';
      openLightbox(fullImage, title);
    });
  }

  // ============================================================
  // INICIALIZACIÓN AUTOMÁTICA POR PÁGINA
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initLightbox();

    var unitsContainer = document.getElementById('unitsList');
    if (!unitsContainer) return;

    var courseKey = unitsContainer.getAttribute('data-course');
    if (!courseKey) return;

    loadPortafolioData().then(function (data) {
      var curso = data && data.cursos && data.cursos[courseKey];
      if (!curso || !Array.isArray(curso.unidades)) return;
      unitsContainer.innerHTML = curso.unidades.map(renderUnit).join('');
      bindAccordions(unitsContainer);
      handleUrlDeepLinks();
    });
  });
}());
