const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "E-commerce Backend API",
    version: "1.0.0",
    description: "Basic Ecommerce Backend API",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    "/products": {
      get: {
        summary: "Get all products",
        responses: {
          "200": {
            description: "Success",
          },
        },
      },
      post: {
        summary: "Create a product",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  price: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Product Created",
          },
        },
      },
    },

    "/products/{id}": {
      get: {
        summary: "Get Product By Id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Success",
          },
        },
      },

      put: {
        summary: "Update Product",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  price: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated",
          },
        },
      },

      delete: {
        summary: "Delete Product",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Deleted",
          },
        },
      },
    },
  },
};

export default swaggerDocument;