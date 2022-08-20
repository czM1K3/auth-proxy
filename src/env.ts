import { config } from "./deps.ts";

const dotEnv = config({});

// Loading of
export const password = Deno.env.get("PASSWORD") ?? dotEnv["PASSWORD"] ?? "password";
export const serviceAddress = Deno.env.get("SERVICE_ADDRESS") ?? dotEnv["SERVICE_ADDRESS"] ?? "http://localhost";
