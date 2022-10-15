create database spsa_bi;

use spsa_bi;

CREATE TABLE tb_rol (
    idr int primary key auto_increment ,
    des_rol varchar(255)
);

insert into tb_rol (des_rol) values('GLOBAL');
insert into tb_rol (des_rol) values('NORMAL');


CREATE TABLE tb_usuario (
    idu int primary key auto_increment ,
    nom_usuario varchar(255),
    ape_usuario varchar(255),
    tel_usuario varchar(255),
    car_usuario varchar(255),
    cor_usuario varchar(255) unique,
    pas_usuario varchar(255),
    idrol int ,
    createAt int,
    dateCreate date,
    updateBy int,
    dateUpdate date,
    activo int,
    FOREIGN KEY (idrol) REFERENCES tb_rol(idr)
);


delimiter //
create procedure sp_insertUsuario( 
    _nom_usuario varchar(255),
    _ape_usuario varchar(255),
    _tel_usuario varchar(255),
    _car_usuario varchar(255),
    _cor_usuario varchar(255),
    _pas_usuario varchar(255),
    _idrol int ,
    _createBy int
)
 begin
 insert into tb_usuario(
    nom_usuario,
    ape_usuario,
    tel_usuario,
    car_usuario,
    cor_usuario,
    pas_usuario,
    idrol,
    createAt,
    dateCreate,
    updateBy,
    dateUpdate,
    activo
 ) values (
    _nom_usuario,
    _ape_usuario,
    _tel_usuario,
    _car_usuario,
    _cor_usuario,
    _pas_usuario,
    _idrol,
    _createBy,
    curdate(),
    _createBy,
    curdate(),
    1
 );
end //
 delimiter ;

  CALL sp_insertUsuario('JONATHAN', 'HUAMBACHANO','938511627','ADMINISTRADOR', 'YOKUN12342@GMAIL.COM','12345678',1,1);

  delimiter //
create procedure sp_updateUsuario( 
    _nom_usuario varchar(255),
    _ape_usuario varchar(255),
    _tel_usuario varchar(255),
    _car_usuario varchar(255),
    _idrol int ,
    _updateBy int,
    _idu int
)
begin
    UPDATE tb_usuario set
    nom_usuario = _nom_usuario,
    ape_usuario = _ape_usuario,
    tel_usuario = _tel_usuario,
    car_usuario = _car_usuario,
    idrol = _idrol ,
    dateUpdate =  curdate(),
    updateBy = _updateBy, 
    activo = 1
    where idu = _idu;
end //
delimiter ;


  delimiter //
 create procedure sp_actualizarContrasenia( 
     _pas_usuario    varchar(255),
     _updateBy int,
     _idu int
 )
 begin
 update tb_usuario set 
 pas_usuario = _pas_usuario,
 updateBy = _updateBy,
 dateUpdate = curdate()
 where idu = _idu;
end //
 delimiter ;

 delimiter //
create procedure sp_eliminarUsuario( 
    _idu int,
    _updateBy int
)
begin
    UPDATE tb_usuario set
    dateUpdate =  curdate(),
    updateBy = _updateBy,
    activo = 0
    where idu = _idu;
end //
delimiter ;

delimiter //
create procedure sp_listarUsuarios( )
 begin
 select * from tb_usuario;
end //
 delimiter ;

  delimiter //
create procedure sp_listarUsuarioById( 
    _idu int
)
begin
    select * from tb_usuario where idu = _idu;
end //
delimiter ;


 delimiter //
create procedure sp_verificarCorreo( 
    _cor_usuario varchar(255)
)
begin
    select * from tb_usuario where cor_usuario = _cor_usuario;
end //
delimiter ;