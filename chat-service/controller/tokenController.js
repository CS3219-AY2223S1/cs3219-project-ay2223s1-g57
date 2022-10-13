import { generateToken } from "../service/tokenService.js";

export function handleGenerateToken(req, res) {
    var user = req.body.username;
    if (user == null) {
        res.status(400).send({
            text: "Missing username"
        })
        return
    }

    var token = generateToken(user)
  
    res.json({
      username: user,
      token: token.toJwt(),
    });
}