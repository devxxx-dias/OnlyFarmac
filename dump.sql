
create database onlyfarmac; --For localhost only


create table clientes (
  id serial primary key,
  cpf varchar(14) not null unique,
  nome_completo varchar(255) not null,
  data_de_nascimento varchar(10) not null,
  email varchar(255) not null unique,
  senha varchar(255) not null
);


