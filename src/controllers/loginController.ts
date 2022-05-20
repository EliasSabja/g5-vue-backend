import { User } from "../schemas/user";
import { LoginResponse, UserData } from "../types/login";
import { LoginBody } from "../types/auth";
const jwt = require("jsonwebtoken");

const loginResponse = (message: string, user?: UserData): LoginResponse => {
  return { message, user };
};

const loginUser = async (body: LoginBody): Promise<LoginResponse> => {
  // Validacion de existencia del usuario
  let message = "success";
  const user = await User.findOne({ email: body.email });
  if (!user) return loginResponse("User not found.");

  // Validacion de la contrasena
  const passwordIsCorrect = await user.validatePassword(body.password);
  if (!passwordIsCorrect) return loginResponse("Invalid password.");

  const userData: UserData = {
    email: user.email,
  };
  return loginResponse(message, userData);
}

const generateToken = (user: UserData): string => {
  // Generacion del JSON Web Token
  const token: string = jwt.sign(
    {
      email: user.email,
    },
    process.env.TOKEN
  );

  return token;
};

module.exports = {
  loginResponse,
  loginUser,
  generateToken,
}
