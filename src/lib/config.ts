import invariant from "invariant";

invariant(
  process.env.REACT_APP_API_URL,
  `Missing API_URL key, either set the REACT_APP_API_URL environment variable or add it to a .env file in the root folder of this project`
);
export const API_URL = process.env.REACT_APP_API_URL;

invariant(
  process.env.REACT_APP_API_TOKEN,
  `Missing API_TOKEN key, either set the REACT_APP_API_TOKEN environment variable or add it to a .env file in the root folder of this project`
);
export const API_TOKEN = process.env.REACT_APP_API_TOKEN;

invariant(
  process.env.REACT_APP_AUTH_CODE,
  `Missing AUTH_CODE key, either set the REACT_APP_AUTH_CODE environment variable or add it to a .env file in the root folder of this project`
);
export const AUTH_CODE = process.env.REACT_APP_AUTH_CODE;
