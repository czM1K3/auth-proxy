import {
	OpineRequest,
	OpineResponse,
	ParamsDictionary,
	CreateToken,
	VerifyToken,
	getCookies,
} from "./deps.ts";
import { loginTime, password } from "./env.ts";

type reqType = OpineRequest<ParamsDictionary, unknown, unknown>;
type resType = OpineResponse<unknown>;

// Name of cookie
const cookieName = "ProxyAuthorization";

// Generating of key
const key = await crypto.subtle.generateKey(
	{ name: "HMAC", hash: "SHA-512" },
	true,
	["sign", "verify"]
);

// Checking if user has authorized token
export const checkAuth = async (req: reqType): Promise<boolean> => {
	// Parses cookie to object
	const cookies = getCookies(req.headers);
	// Check if cookie exists
	if (!cookies && !cookies[cookieName]) return false;
	// Save token to variable
	const token = cookies[cookieName];
	// Try to verify token
	try {
		await VerifyToken(token, key);
		return true;
	} catch {
		return false;
	}
};

// Creating of token
export const login = async (req: reqType, res: resType) => {
	// Checks for password
	if (!req.parsedBody.password || req.parsedBody.password !== password)
		return false;

	// Generating of token
	const token = await CreateToken(
		{ alg: "HS512" },
		{
			exp: Math.floor(new Date().getTime() / 1000) + loginTime,
		},
		key
	);

	// Sending token to user
	res.cookie({
		name: cookieName,
		value: token,
		httpOnly: true,
		path: "/",
	});
	return true;
};
