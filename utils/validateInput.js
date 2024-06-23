const Joi = require("joi");

const validateData = (schema, data) => {
  const validation = schema.validate(data);
  const { value, error } = validation;
  if (error) throw new Error(error);
  return value;
};

// validate user data
exports.validateUser = (data) => {
  const schema = Joi.object().keys({
    id: Joi.number(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role_id: Joi.number().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    birthday: Joi.date().required(),
    phone: Joi.string().required(),
    department_id: Joi.number(),
    avatar: Joi.string(),
  });

  return validateData(schema, data);
};

// validate department data
exports.validateDepartment = (data) => {
  const schema = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required(),
  });

  return validateData(schema, data);
};

// validate position data
exports.validatePosition = (data) => {
  const schema = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required(),
  });

  return validateData(schema, data);
};

// validate employee data
exports.validateEmployee = (data) => {
  const schema = Joi.object().keys({
    address: Joi.string().required(),
    birthday: Joi.date().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    role_id: Joi.number().required(),
    password: Joi.string().required(),
    department_id: Joi.number(),
  });
  return validateData(schema, data);
};

// validate client data
exports.validateClient = (data) => {
  const schema = Joi.object().keys({
    id: Joi.number(),
    company: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    position: Joi.string().required(),
    projects: Joi.string().required(),
    avatar: Joi.string(),
  });

  return validateData(schema, data);
};

// validate project data
exports.validateProject = (data) => {
  const schema = Joi.object().keys({
    id: Joi.number(),
    client_id: Joi.number().required(),
    description: Joi.string().required(),
    thumbnail: Joi.string().required(),
    title: Joi.string().required(),
  });

  return validateData(schema, data);
};

// validate project task data
exports.validateProjectTask = (data) => {
  const schema = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    project_id: Joi.number().required(),
    task_status_id: Joi.number().required(),
  });
  return validateData(schema, data);
};

// validate employee task data
exports.validateEmployeeTask = (data) => {
  const schema = Joi.object().keys({
    task_id: Joi.number().required(),
    user_id: Joi.number().required(),
  });
  return validateData(schema, data);
};

// validate project employee
exports.validateProjectEmployee = (data) => {
  const schema = Joi.object().keys({
    user_id: Joi.number().required(),
    project_id: Joi.number().required(),
    project_role_id: Joi.number().required(),
  });
  return validateData(schema, data);
};

// validate task status data
exports.validateTaskStatus = (data) => {
  const schema = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required(),
  });
  return validateData(schema, data);
};

// validate project status data
exports.validateProjectStatus = (data) => {
  const schema = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required(),
  });
  return validateData(schema, data);
};
