const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;

/* 
 * Métodos HTTP: GET, POST, PUT e DELETE
 * get é para BUSCAR uma informação/recurso, quando: listar users, buscar apenas um user etc
 * post é para CRIAR uma informação/recurso, quando: salvar um produto, cadastrar um user etc
 * put é para EDITAR uma informação/recurso
 * delete é para DELETAR uma informação/recurso
 */

/*
 * Tipos de parâmetros:
 * Query Params: (GET) request.query (Filtros, ordenação, paginação, ...)
 * Route Params: (PUT e DELETE) request.params (Identificar um recurso na alteração ou remoção)
 * Body: (POST e PUT) request.body (Dados para criação ou alteração de um registro)
 */