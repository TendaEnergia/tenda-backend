import swaggerJsdoc, { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tenda Solar API",
      version: "1.0.0",
      description: `
        Documentação da API Tenda Solar.
        
        **Segurança implementada:**
        - Validação de input obrigatória.
        - Hash de senhas com bcrypt.
        - Autenticação via JWT Bearer Token (em desenvolvimento).
        - Profiles separados para Admin e Cliente.
      `,
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Insira o token JWT retornado no login.",
        },
      },
      schemas: {
        // --- USUÁRIO ---

        // Entrada para Cadastro de Cliente
        RegisterClientDTO: {
          type: "object",
          required: ["email", "password", "full_name", "cpf", "phone"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "cliente@example.com",
            },
            password: {
              type: "string",
              format: "password",
              minLength: 8,
              example: "SenhaForte123",
            },
            full_name: {
              type: "string",
              example: "João da Silva",
            },
            cpf: {
              type: "string",
              pattern: "^\\d{11}$",
              example: "12345678901",
            },
            phone: {
              type: "string",
              example: "67992999998",
            },
          },
        },

        // Entrada para Cadastro de Admin
        RegisterAdminDTO: {
          type: "object",
          required: ["email", "password", "full_name", "department"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "admin@example.com",
            },
            password: {
              type: "string",
              format: "password",
              minLength: 8,
              example: "SenhaForte123",
            },
            full_name: {
              type: "string",
              example: "Administrador",
            },
            department: {
              type: "string",
              example: "Financeiro",
            },
          },
        },

        // Profile de Cliente
        ClientProfile: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            full_name: {
              type: "string",
            },
            cpf: {
              type: "string",
            },
            phone: {
              type: "string",
            },
            created_at: {
              type: "string",
              format: "date-time",
            },
            updated_at: {
              type: "string",
              format: "date-time",
            },
          },
        },

        // Profile de Admin
        AdminProfile: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            full_name: {
              type: "string",
            },
            department: {
              type: "string",
            },
            created_at: {
              type: "string",
              format: "date-time",
            },
            updated_at: {
              type: "string",
              format: "date-time",
            },
          },
        },

        // Resposta de Usuário Criado
        RegisterClientResponse: {
          type: "object",
          properties: {
            usuario: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  format: "uuid",
                },
                name: {
                  type: "string",
                },
              },
            },
          },
        },

        // --- GERAL ---
        Erro: {
          type: "object",
          properties: {
            mensagem: {
              type: "string",
              example: "Há campos faltando.",
            },
            detalhes: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
      },
    },
    paths: {
      // Rotas de Usuário
      "/register/user": {
        post: {
          tags: ["Usuários"],
          summary: "Registrar novo cliente",
          description:
            "Cria um novo usuário com role 'client' e seu respectivo ClientProfile.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RegisterClientDTO",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Cliente criado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/RegisterClientResponse",
                  },
                },
              },
            },
            "400": {
              description: "Erro de validação ou dados inválidos",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
