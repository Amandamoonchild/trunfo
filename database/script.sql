CREATE DATABASE trunfo;

CREATE TABLE cartas (
    carta_id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    caracteristica VARCHAR(100) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    nivel INT,
    xp INT
);

INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('capitão pátria', 'sociopata', 'poder sem limites', 10, 10);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('tempesta', 'fascista', 'eletricidade', 10, 8);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('black noir', 'misterioso', 'superforça', 9, 10);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('rainha maeve', 'rebelde', 'fator cura', 8, 8);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('luz estrela', 'bom coração', 'eletricidade', 8, 10);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('trem bala', 'arrogancia', 'supervalocidade', 6, 6);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('facho de luz', 'misterioso', 'pirocinese', 7, 7);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('translúcido', 'imprudência', 'invisibilidade', 5, 6);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('profundo', 'manipulador', 'telepatia animal', 4, 4);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('soldier boy', 'conservador', 'energia cinética', 9, 9);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('marie moreau', 'inocência', 'transmorfia sanguínea', 8, 7);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('emma meyer', 'insegura', 'fator encolhimento', 6, 6);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('garoto dourado', 'prepotência', 'pirocinese', 9, 10);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('cate dunlap', 'bonita', 'controle mental', 7, 10);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('andre anderson', 'nepotismo', 'magnetismo', 6, 8);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('jordan li', 'versátil', 'gênero fluído', 7, 7);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('gunpowder', 'clareza moral', 'habilidade bélica', 6, 10);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('condessa carmesin', 'musicista', 'pirocinese', 4, 7);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('gemeos tnt', 'hedonismo', 'eletricidade', 5, 10);
INSERT INTO cartas (nome, caracteristica, habilidade, nivel, xp) VALUES ('swatto', 'descuidado', 'metamorfose animal', 6, 7);


CREATE TABLE batalha (
    id SERIAL PRIMARY KEY,
    carta1 INT,
    carta2 INT,
    carta_win INT,
    FOREIGN KEY (carta1) REFERENCES cartas(carta_id),
    FOREIGN KEY (carta2) REFERENCES cartas(carta_id),
    FOREIGN KEY (carta_win) REFERENCES cartas(carta_id)
);

INSERT INTO batalha (carta1, carta2, carta_win) VALUES ('');