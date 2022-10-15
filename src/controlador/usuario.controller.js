import { pool } from "../db.js";

export const login = async (req, res) => {
  try {
    const { cor_usuario, pas_usuario } = req.body;
    const [rows] = await pool.query("call sp_verificarCorreo(?)", [
      cor_usuario,
    ]);

    if (rows[0].length <= 0)
      return res.status(404).json({
        msg: "El correo no se encuentra registrado",
        ok: false,
      });

    const id = rows[0][0].idu;
    const idrol = rows[0][0].idrol;
    const activo = rows[0][0].activo;
    const nombre = rows[0][0].nom_usuario;
    const password = rows[0][0].pas_usuario;

    if (activo === 0)
      return res.status(404).json({
        ok: false,
        msg: "El usuario no está activo",
      });

    const validPassword = pas_usuario === password

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "La contraseña es incorrecta",
      });
    }

    return res.status(201).json({
      ok: true,
      token : '12345',
      msg: "Bienvenido Usuario " + nombre,
      data: rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, error: error });
  }
};

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("call sp_listarUsuarios()");

    return res.status(201).json({
      ok: true,
      data: rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, error: error });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const { idu } = req.params;
    const [rows] = await pool.query("call sp_listarUsuarioById(?)", [idu]);

    return res.status(201).json({
      ok: true,
      data: rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, error: error });
  }
};

export const insertUsuario = async (req, res) => {
  try {
    const {
      nom_usuario,
      ape_usuario,
      tel_usuario,
      car_usuario,
      cor_usuario,
      pas_usuario,
      idrol,
      id_create,
    } = req.body;

    const [rows] = await pool.query("call sp_insertUsuario(?,?,?,?,?,?,?,?)", [
      nom_usuario,
      ape_usuario,
      tel_usuario,
      car_usuario,
      cor_usuario,
      pas_usuario,
      idrol,
      id_create,
    ]);

    return res.status(201).json({
      ok: true,
      msg: "Usuario insertado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, error: error });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { idu } = req.params;
    const {
      nom_usuario,
      ape_usuario,
      tel_usuario,
      car_usuario,
      idrol,
      id_update,
    } = req.body;

    const [rows] = await pool.query("call sp_updateUsuario(?,?,?,?,?,?,?)", [
      nom_usuario,
      ape_usuario,
      tel_usuario,
      car_usuario,
      idrol,
      id_update,
      idu,
    ]);

    return res.status(201).json({
      ok: true,
      msg: "Usuario actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, error: error });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { idu } = req.params;
    const { id_update } = req.body;

    console.log(idu, id_update);
    const [rows] = await pool.query("call sp_eliminarUsuario(?,?)", [
      idu,
      id_update,
    ]);

    return res.status(201).json({
      ok: true,
      msg: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, error: error });
  }
};

export const cambiarContraUsuario = async (req, res) => {
  try {
    const { idu } = req.params;
    const { pas_usuario, id_update } = req.body;

    console.log(idu, id_update);
    const [rows] = await pool.query("call sp_actualizarContrasenia(?,?,?)", [
      pas_usuario,
      id_update,
      idu,
    ]);

    return res.status(201).json({
      ok: true,
      msg: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, error: error });
  }
};
