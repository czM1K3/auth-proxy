import { proxy } from "https://deno.land/x/opineHttpProxy@3.0.1/mod.ts";
import {
	opine,
	urlencoded,
	json,
} from "https://deno.land/x/opine@2.0.2/mod.ts";
import { checkAuth, login } from "./auth.ts";
import { serviceAddress } from "./env.ts";

// Loads HTML file for login page
const loginPageHtml = Deno.readTextFileSync("./login.html");

// Initializes opine
const app = opine();

// Loads plugins for parsing responses
app.use(json());
app.use(urlencoded());

// Middleware for authorization
app.use(async (req, res, next) => {
	// Check if user is auththorized, if so continues to request
	if (await checkAuth(req)) next();

	// If url starts with /auth/login it continues (to be able pass through error messages)
	else if (req.url.startsWith("/auth/login")) next();

	// Else redirects to login page
	else res.redirect("/auth/login");
});

// Login page handler
app.get("/auth/login", (_req, res) => {
	res.send(loginPageHtml);
});

// Login post handler
app.post("/auth/login", async (req, res) => {
	if (await login(req, res)) {
		res.redirect("/");
	} else {
		res.redirect("/auth/login?success=false");
	}
});

// Proxy service
app.use(proxy(serviceAddress));

// Starting of server
app.listen(3000, () => {
	console.log("App is listening on port 3000");
});
