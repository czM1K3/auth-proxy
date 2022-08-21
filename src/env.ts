import { config } from "./deps.ts";

const dotEnv = config({});

// Loading of env variables
export const password = Deno.env.get("PASSWORD") ?? dotEnv["PASSWORD"] ?? "password";
export const serviceAddress = Deno.env.get("SERVICE_ADDRESS") ?? dotEnv["SERVICE_ADDRESS"] ?? "http://localhost";

// Getting of login time in seconds. Defaults to 1 hour (3600 seconds) 
const loginTimeTemp = parseInt(Deno.env.get("LOGIN_TIME") ?? dotEnv["LOGIN_TIME"] ?? "");
export const loginTime = isNaN(loginTimeTemp) ? 3600 : loginTimeTemp;
