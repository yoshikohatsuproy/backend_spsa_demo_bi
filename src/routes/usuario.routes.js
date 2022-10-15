import { Router } from "express";
import {
  login,
  getUsuarios,
  getUsuarioById,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
  cambiarContraUsuario,
} from "../controlador/usuario.controller.js";
const router = Router();

router.get("/api/usuarios", getUsuarios);
router.get("/api/usuario/:idu", getUsuarioById);
router.post("/api/usuario", insertUsuario);
router.put("/api/usuario/:idu", updateUsuario);
router.put("/api/usuario/delete/:idu", deleteUsuario);
router.put("/api/usuario/cambiar/:idu", cambiarContraUsuario);

router.post("/api/login", login);
/*
router.post('/usuario', (req, res) => res.send('Insertar Usuarios by id'))
router.put('/usuario/:idu', (req, res) => res.send('Listar Usuarios by id'))
*/

export default router;
