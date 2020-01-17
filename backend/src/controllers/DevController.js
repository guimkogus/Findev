const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require ('../websocket')

/*
 * Index: Quando quero mostrar uma LISTA de objetos do recurso
 * Show: Quando quero mostrar um ÚNICO objeto do recurso
 * Store: Quando quero CRIAR um objeto do recurso
 * Update: Quando quero ALTERAR um objeto do recurso
 * Destroy: Quando quero DELETAR um objeto do recurso
 */

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response) {
    const { github_username, techs, latitude, longitude } =  request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = apiResponse.data;

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        })

        // filtrar as conexões que estão há no máximo 10km e possua uma das techs
        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray,
        )

        sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return response.json(dev);
    },

   // async update(){
        //função para atualizar dados do usuário
        // Name
        // avatar_url
        // bio
        // location
        // techs
   // },

  //  async destroy(){
        //função para deletar um usuário
   // },
};