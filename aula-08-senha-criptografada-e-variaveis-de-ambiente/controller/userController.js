import userServices from "../services/userServices.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
// Faz a leitura do arquivo .env no projeto
dotenv.config();
// Pegando a variável JWTSECRET do .env
const JWTSecret = process.env.JWTSECRET;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.getOne(email);

    if (user == undefined) {
      // salt = valor que adicionamos a senha para dificultar ataques de força bruta
      const salt = bcrypt.genSaltSync(10);
      // hash = senha embaralhada com o salt (criptografia)
      const hash = bcrypt.hashSync(password, salt);
      // Salva name, email e hash do usuário (senha porém criptografada)
      await userService.Create(name, email, hash);
      res.status(201).json({ success: "Usuário cadastrado com sucesso!" });
      //Cod.201: CREATED
    } else {
      res.status(409).json({ error: "Usuário já cadastrado!" });
      //Cod.409: CONFLITO
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Buscando o usuário com base no email
    const user = await userServices.getOne(email);
    // Se o usuário for encontrado
    if (user != undefined) {
      const correct = bcrypt.compareSync(password, user.password);
      // Se a senha estiver correta
      if (correct) {
        //Gerando o token com JWT
        jwt.sign(
          { id: user.id, email: user.email },
          JWTSecret,
          { expiresIn: "48h" },
          (error, token) => {
            if (error) {
              res.status(400).json({
                error: "Não foi possível o gerar o token de autenticação.",
              });
            } else {
              // Token gerado com sucesso!
              res.status(200).json({ token });
            }
          }
        );
        //Tratamento de senha incorreta
      } else {
        res.status(401).json({ error: "Credenciais informadas incorretas!" });
        //Cod.401: UNAUTHORIZED
      }
    } else {
      res.status(404).json({ error: "Usuário não encontrado!" });
      //Cod.404: NOT FOUND
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default { createUser, loginUser, JWTSecret };
