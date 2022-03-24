import { Router } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import response from './response';

const docrouter = Router();

const local = process.env.LOCAL_HOST;
const heroku = process.env.DB_CONNECT;

const paths = {
    ...response,
};

const options = {
    openapi: '3.0.1',
    info: {
        title: 'Barefoot Nomad',
        version: '1.0.0',
        description: 'Barefoot Nomad - Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.',
    },
    host: process.env === 'production' ? heroku : local,
    basePath: '/api/v2',
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
        },
    },
    // apis: ['./routes/*.js'],
    // tags: [{}],
    paths: {
        '/api/v2/users/register': {
            post: {
                tags: ['Users'],
                description: 'Create users',
                parameters: [],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                            example: {
                                FirstName: 'JaneD',
                                LastName: 'DoeS',
                                Email: 'newcheck@gmail.com',
                                UserName: 'DoeS',
                                Password: 'Password@2022',
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    200: {
                        description: 'New User was created successfully',
                    },
                    400: {
                        description: 'Bad Request',
                    },
                },
            },
        },
        components: {
            schemas: {
                User: {
                    type: 'object',

                    properties: {
                        id: {
                            type: 'string',
                            description: 'The auto-generated id of the blog',
                        },
                        firstName: {
                            type: 'string',
                            description: "User's FirstName",
                        },
                        lastName: {
                            type: 'string',
                            description: "User's LastName",
                        },
                        username: {
                            type: 'string',
                            description: "User's UserName",
                        },
                        email: {
                            type: 'string',
                            description: "User's Email",
                        },
                        password: {
                            type: 'string',
                            description: "User's Password",
                        },
                    },
                },
            },
        },
    },
};

// const specs = swaggerJsDoc(options);

docrouter.use('/', serve, setup(options));

export default docrouter;