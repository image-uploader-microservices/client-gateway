import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: string;
};

const envsSchemas = joi.object({
  PORT: joi.number().required(),
})
  .unknown(true);

const { error, value } = envsSchemas.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
};

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
};