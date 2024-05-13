
create database onlyfarmac; --For localhost only


create table clientes (
  id serial primary key,
  cpf varchar(14) not null unique,
  nome_completo varchar(255) not null,
  data_de_nascimento varchar(10) not null,
  email varchar(255) not null unique,
  senha varchar(255) not null
);

create table pedidos (
  id serial primary key,
  cliente_id integer references clientes(id) not null,
  observacao text,
  valor_total integer not null
  );

  create table produtos(
id serial primary key,
descricao text not null,
quantidade_estoque integer not null,
valor integer not null
);
  
  create table pedido_produtos (
    id serial primary key,
    pedido_id integer references pedidos (id) not null,
    produto_id integer references produtos(id) not null,
    quantidade_produto integer not null,
    valor_produto integer not null
);
    
   
  


