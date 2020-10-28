'use strict';

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async ver(ctx){
        const user = ctx.state.user

        let imagenes = await strapi.services.imagenes.find({
            user: user.id,
        });
        return imagenes;
    }, 

    async create(ctx){
        let entity;
        const user = ctx.state.user;

        if(ctx.is('multipart')){
            const {data, files} = parseMultipartData(ctx);
            data.user = user.id;

            entity = await strapi.services.imagenes.create(
                data, {
                    files,
                });
        }else{
            const data = ctx.request.body;
            data.user = user.id;
            entity = await strapi.services.imagenes.create(data);
        }

        return sanitizeEntity(entity, {
            model: 
            strapi.models.imagenes
        });
    }, 
};
