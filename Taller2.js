const fs = require('fs');
const axios = require('axios');
const http = require('http');

const urlProve = 'https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json'
const urlClientes = 'https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json'
http
  .createServer(function (request, response) {
    let html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Listado</title>
        <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
    </head>
    <body>
        
    `;

    response.writeHead(200, { 'Content-Type': 'text/html' });
    if (request.url == "/api/proveedores") {
      html = html.concat("<h1 align='center'>Listado de proveedores</h1><table class= 'table table-striped' ><thead><tr><th scope= 'col' >ID</th>"
        + "<th scope= 'col' >Nombre</th>"
        + "<th scope= 'col' >Contacto</th></thead><tbody>")
      axios.get(urlProve).then((res) => {
        res.data.forEach((item)=>{
          html = html.concat(`<tr><th scope="row">${item.idproveedor}</th>
          <td>${item.nombrecompania}</td>
          <td>${item.nombrecontacto}</td></tr>`)
        })
        html = html.concat("</body></html>")
        response.end(html)
      })
    }
    else if (request.url == "/api/clientes") {
      html = html.concat("<h1 align='center'>Listado de clientes</h1><table class= 'table table-striped' ><thead><tr><th scope= 'col' >ID</th>"
        + "<th scope= 'col' >Nombre</th>"
        + "<th scope= 'col' >Contacto</th></thead><tbody>")
      axios.get(urlClientes).then((res) => {
        res.data.forEach((item)=>{
          html = html.concat(`<tr><th scope="row">${item.idCliente}</th>
          <td>${item.NombreCompania}</td>
          <td>${item.NombreContacto}</td></tr>`)
        })
        html = html.concat("</body></html>")
        response.end(html)
      })
    }
    else {
      response.end("Ruta No valida")
    }
  })
  .listen(8081);