export default () => ({
  documentation: {
    enabled: true,
    config: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'IPH API Documentation',
        description: 'API Documentation for Indochina Plaza Hanoi project',
        termsOfService: 'https://www.iph.vn/terms',
        contact: {
          name: 'IPH Team',
          email: 'contact@iph.vn',
          url: 'https://www.iph.vn'
        },
        license: {
          name: 'Apache 2.0',
          url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        },
      },
      'x-strapi-config': {
        mutateDocumentation: (generatedDocumentationDraft) => {
          Object.keys(generatedDocumentationDraft.paths).forEach((path) => {
            generatedDocumentationDraft.paths[path].servers = [{
              url: process.env.STRAPI_ADMIN_CLIENT_URL || 'http://localhost:1337',
              description: 'Development server',
            }];
          });
        },
      },
      servers: [
        {
          url: process.env.STRAPI_ADMIN_CLIENT_URL || 'http://localhost:1337',
          description: 'Development server',
        }
      ],
    },
  },
});
