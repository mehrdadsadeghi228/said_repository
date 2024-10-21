const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
function SwaggerConfig (app) {
    const swaggerDocument = swaggerJsDoc({
        swaggerDefinition: {
            openapi: "3.0.1",
            info: {
                title: "saied-backend",
                description: "level one if Projects",
                version: "0.1.0",
            },
            servers: [
                {
                  url: "http://localhost:4088",
                },
                {
                  url: "http://localhost:4088",
                },
              ],
      
            
        },
        apis: [process.cwd() + "/src/module/**/*.swagger.js"]
    });
    const swagger = swaggerUi.setup(swaggerDocument, {});
    app.use("/swagger", swaggerUi.serve, swagger);
}

module.exports = SwaggerConfig;