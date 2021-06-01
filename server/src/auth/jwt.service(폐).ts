// import { HttpException, HttpStatus, Request, Response, UnauthorizedException } from "@nestjs/common";
// import jwt from "jsonwebtoken";
// import { env } from "../../env";
// import { Account } from "../account/account.entity";
// import { NextFunction } from "express";

// export const AccessTokenGenerator = (account: Account) => {
// 	return jwt.sign(
// 		{ 
// 			pk: account.pk,
// 			email: account.email, 
// 			name: account.name, 
// 		},
// 		env.jwt.secret_access_key,
// 		{
// 			expiresIn: "30m",
// 		},
// 	);
// }

// export const RefreshTokenGenerator = (account: Account) => {
// 	return jwt.sign(
// 		{
// 			pk: account.pk,
// 		}, 
// 		env.jwt.secret_refresh_key,
// 		{ 
// 			expiresIn: "14d",
// 		}
// 	);
// }

// export const GoogleAccessTokenGenerator = (account: Account) => {
// 	return jwt.sign(
// 		{ 
// 			email: account.email,
// 			name: account.name, 
// 		},
// 		env.jwt.secret_access_key,
// 		{
// 			expiresIn: "30m",
// 		},
// 	);
// }

// //Verify: 검증
// export const VerifyAccessToken = (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ) => {
// 	try {
// 		res.locals.jwt_payload =
// 			jwt.verify(req.headers.authorization, env.jwt.secret_access_key);
// 	} 
// 	catch(error) {
// 		if (error.name === 'TokenExpiredError') {
// 			throw new HttpException("Forbidden", HttpStatus.FORBIDDEN)
// 		}
// 		throw new UnauthorizedException()
// 	}

// 	next();
// };

// export const VerifyRefreshToken = (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ) => {

// 	try {
// 		res.locals.token = req.body.refresh_token;
// 		res.locals.jwt_payload = 
// 			jwt.verify( req.body.refresh_token, env.jwt.secret_refresh_key );
// 	} 
// 	catch (error) {
// 		throw new HttpException("Forbidden", HttpStatus.FORBIDDEN)
// 	}

// 	next();
// };
