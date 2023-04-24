// Importar el módulo
const mysql = require('mysql');
const bodyParser = require('body-parser');//json
const express = require('express');//correr aplicacion
const path = require('path');//instanciar html

// Crear la aplicacion rapidamente
const aplication = express();

// Configurar para manejar datos en formato JSON
aplication.use(bodyParser.json());
aplication.use(bodyParser.urlencoded({ extended: true }));

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'proy'
});

// Conectar a la base de datos
connection.connect((error) => {
  if (error) throw error;
  console.log('Conectado a la base de datos');
});

// Agregar el middleware para procesar los datos del formulario
aplication.use(bodyParser.urlencoded({ extended: true }));

//Mostrar el menu
aplication.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href='style.css' type="text/css">
        <title>Opciones para el estudiante</title>
      </head>
      <body>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,300;0,700;1,500&display=swap');

      body{
        background-color: #eeeeee;
        font-family: 'Exo 2', sans-serif;
      }
      .signupFrm{
        width: 50%;
        background-color: white;
        border: 1px solid #D6CACA;
        border-radius: 12px;
        position: relative;
        left: 12%;
        top: 2.5em;
        padding: 30px 30px 60px 60px;
      }
      .item{
        padding-left: 16%;
        margin-top: 12px;
      }
        button {
          width: 7.18em;
          height: 2.81em;
          cursor: pointer;
          background: #000000;
          border: 0.14em solid #0087cd;
          box-shadow: 0px 0.25em 0.25em rgba(0, 0, 0, 0.25);
          border-radius: 0.93em;
          transition: all 0.3s;
          color: white;
          font-size: 1.06em;
          text-transform: uppercase;
        }
        
        button:hover {
          width: 7.18em;
          height: 2.81em;
          box-shadow: 0px 0.81em 0.62em rgba(0, 0, 0, 0.25);
          background: #0087cd;
          /*background: #000000;*/
          border-radius: 0.93em;
          transform: translate(0.38em, -0.37em);
        }
        
        button:active {
          transform: scale(0.90)
        }
        ul {
          list-style-type: none;
        }
      </style>

      <div class="signupFrm">
        <div class='item'>      
          <h1>Menu de opciones</h1>
          <ul>
            <li><button onclick="location.href='/crear'">Crear estudiante</button></li><br>
            <li><button onclick="location.href='eliminar'">Eliminar estudiante</button></li><br>
            <li><button onclick="location.href='/consulta'">Modificar estudiante</button></li>
          </ul>
        </div>
      </div>

      </body>
    </html>
  `);
});

// Mostrar el formulario en la ruta crear estudiante
aplication.get('/crear', (req, res) => {
  res.sendFile(path.join(__dirname, 'crear_estudiante.html'));
});

// Proceso para capturar los datos del estudiante
aplication.post('/estudiantes/index', (req, res) => {
  // Obtener los datos del formulario
  const estudiante = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    carrera: req.body.carrera,
    pais: req.body.pais,
    departamento: req.body.departamento,
    ciudad: req.body.ciudad,
    direccion: req.body.direccion,
    celular: req.body.celular,
    correo: req.body.correo
  };

  // Agregar el nuevo estudiante a la base de datos
  connection.query('INSERT INTO estudiantes SET ?', estudiante, (error, results) => {
    if (error) throw error;
    console.log('Estudiante agregado a la base de datos');
    res.send('Estudiante agregado a la base de datos');
  });
});

// Mostrar el formulario en la ruta eliminar
aplication.get('/eliminar', (req, res) => {
  res.sendFile(path.join(__dirname, 'eliminar.html'));
});

// definir la eliminación del estudiante
aplication.post('/eliminar', (req, res) => {ñ
  const nombreEstudiante = req.body.nombreEstudiante;

  if (!nombreEstudiante) {
    res.status(400).json(res.send('Debe ingresar el nombre del estudiante a eliminar'));
    return;
  }

  // eliminar el estudiante de la base de datos
  connection.query(`DELETE FROM estudiantes WHERE nombre = '${nombreEstudiante}'`, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el estudiante' });
    } else {
      res.send('Estudiante eliminado de la base de datos');
    }
  });
});

// Mostrar el formulario de consulta
aplication.get('/consulta', (req, res) => {
  res.sendFile(path.join(__dirname, 'consulta.html'));
});

// Realizar la consulta del estudiante
aplication.get('/consulta', (req, res) => {
  const nombreEstudiante = req.body.nombreEstudiante;

  // Consultar el estudiante en la base de datos
  connection.query(`SELECT * FROM estudiantes WHERE nombre = '${nombreEstudiante}'`, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al intentar consultar el estudiante' });
    } else if (results.length === 0) {
      res.send('El estudiante no existe en la base de datos');
    } else {
      const estudiante = results[0];
      const nombre = estudiante.nombre;
      const apellido = estudiante.apellido;
      const carrera = estudiante.carrera;
      const pais = estudiante.pais;
      const departamento = estudiante.departamento;
      const ciudad = estudiante.ciudad;
      const direccion = estudiante.direccion;
      const celular = estudiante.celular;
      const correo = estudiante.correo;

      // Actualizar el estudiante en la base de datos
      connection.query(`UPDATE estudiantes SET 
        apellido = '${estudiante.apellido}', 
        carrera = '${estudiante.carrera}', 
        pais = '${estudiante.pais}', 
        departamento = '${estudiante.departamento}', 
        ciudad = '${estudiante.ciudad}', 
        direccion = '${estudiante.direccion}', 
        celular = '${estudiante.celular}', 
        correo = '${estudiante.correo}' 
        WHERE estudiantes.nombre = '${estudiante.nombre}'`, (error, results, fields) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error al intentar actualizar el estudiante' });
          } else {
            res.send('Estudiante actualizado en la base de datos');
          }
        });
    }
  });
});


// Actualizar el estudiante
/*aplication.post('/modificar', (req, res) => {
  const estudiante = {
    nombre:req.body.nombreEstudiante,
    apellido:req.body.apellidoEstudiante,
    carrera:req.body.carreraEstudiante,
    pais:req.body.paisEstudiante,
    departamento:req.body.departamentoEstudiante,
    ciudad:req.body.ciudadEstudiante,
    direccion:req.body.direccionEstudiante,
    celular:req.body.celularEstudiante,
    correo:req.body.correoEstudiante
  };

  
  
});*/

// Definir los datos del nuevo estudiante
/*const estudiante = {
  nombre: 'Juan',
  apellido: 'Pérez',
  carrera: 'Ingeniería de Sistemas',
  Pais: 'colombia',
  Departamento: 'bolivar',
  Ciudad: 'cartagena',
  Direccion: 'chiquinquira mz 44',
  Celular: '3114177022',
  Correo: 'miabuelita@gmail.com'
};

// Agregar el nuevo estudiante a la base de datos
connection.query('INSERT INTO estudiantes SET ?', estudiante, (error, results) => {
  if (error) throw error;
  console.log('Estudiante agregado a la base de datos');
});*/

// Iniciar el servidor
aplication.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

// Cerrar la conexión a la base de datos
/*connection.end((error) => {
  if (error) throw error;
  console.log('Desconectado de la base de datos');
});
*/
