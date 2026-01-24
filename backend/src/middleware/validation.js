const Joi = require('joi');

const validationSchemas = {
  createTask: Joi.object({
    title: Joi.string().trim().required().min(1).max(200),
    description: Joi.string().trim().max(1000).default(''),
    priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
    status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending'),
    dueDate: Joi.date().allow(null).default(null),
    tags: Joi.array().items(Joi.string().trim()).default([]),
    category: Joi.string().trim().default('')
  }),

  updateTask: Joi.object({
    title: Joi.string().trim().min(1).max(200),
    description: Joi.string().trim().max(1000),
    status: Joi.string().valid('pending', 'in-progress', 'completed'),
    priority: Joi.string().valid('low', 'medium', 'high'),
    dueDate: Joi.date().allow(null),
    tags: Joi.array().items(Joi.string().trim()),
    category: Joi.string().trim()
  }).min(1)
};

const validateRequest = (schemaName) => {
  return (req, res, next) => {
    const schema = validationSchemas[schemaName];
    if (!schema) {
      return res.status(400).json({ success: false, message: 'Invalid schema' });
    }

    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messages = error.details.map(d => d.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    req.validatedBody = value;
    next();
  };
};

module.exports = { validateRequest, validationSchemas };
