/**
 * Validadores de esquemas JSON para la API
 * Garantiza integridad de datos en las solicitudes
 */

// Esquema para login
export const loginSchema = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
      pattern: '^[a-zA-Z0-9_-]+$'
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 255
    }
  },
  additionalProperties: false
};

// Esquema para especies
export const speciesSchema = {
  type: 'object',
  required: ['nombre', 'nombreCientifico', 'estado'],
  properties: {
    id: { type: 'number' },
    nombre: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    nombreCientifico: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    habitat: {
      type: 'string',
      maxLength: 500
    },
    dieta: {
      type: 'string',
      enum: ['Carnívoro', 'Herbívoro', 'Omnívoro', 'Insectívoro']
    },
    estado: {
      type: 'string',
      enum: ['En Peligro de Extincion', 'Amenazada', 'Protegida Especial', 'Fuera de Peligro']
    },
    descripcion: {
      type: 'string',
      maxLength: 1000
    },
    imagen: {
      type: 'string',
      format: 'uri'
    },
    audio: {
      type: 'string',
      format: 'uri'
    }
  }
};

// Esquema para usuarios admin
export const userSchema = {
  type: 'object',
  required: ['username', 'email', 'password'],
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
      pattern: '^[a-zA-Z0-9_-]+$'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 255,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'
    },
    role: {
      type: 'string',
      enum: ['admin', 'editor', 'viewer']
    }
  }
};

/**
 * Función genérica de validación
 */
export function validateSchema(data: any, schema: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Verificar propiedades requeridas
  if (schema.required) {
    for (const field of schema.required) {
      if (!(field in data)) {
        errors.push(`Campo requerido: ${field}`);
      }
    }
  }

  // Verificar propiedades adicionales no permitidas
  if (schema.additionalProperties === false) {
    for (const key in data) {
      if (!(key in schema.properties)) {
        errors.push(`Propiedad no permitida: ${key}`);
      }
    }
  }

  // Validar cada propiedad
  if (schema.properties) {
    for (const [key, value] of Object.entries(schema.properties)) {
      if (key in data) {
        const propSchema = value as any;
        const propValue = data[key];

        // Validar tipo
        if (propSchema.type && typeof propValue !== propSchema.type) {
          errors.push(`${key}: tipo debe ser ${propSchema.type}`);
        }

        // Validar minLength
        if (propSchema.minLength && propValue.length < propSchema.minLength) {
          errors.push(`${key}: longitud mínima ${propSchema.minLength}`);
        }

        // Validar maxLength
        if (propSchema.maxLength && propValue.length > propSchema.maxLength) {
          errors.push(`${key}: longitud máxima ${propSchema.maxLength}`);
        }

        // Validar enum
        if (propSchema.enum && !propSchema.enum.includes(propValue)) {
          errors.push(`${key}: debe ser uno de ${propSchema.enum.join(', ')}`);
        }

        // Validar patrón regex
        if (propSchema.pattern && !new RegExp(propSchema.pattern).test(propValue)) {
          errors.push(`${key}: formato inválido`);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
