-- A gestacao do casal (uma por casal)
CREATE TABLE IF NOT EXISTS gestacoes (
  id SERIAL PRIMARY KEY,
  data_ultima_menstruacao DATE,
  data_provavel_parto DATE,
  nome_bebe TEXT,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- As contas (a senha fica sempre criptografada, nunca em texto puro)
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  gestacao_id INTEGER REFERENCES gestacoes(id) ON DELETE SET NULL,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  senha_hash TEXT NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- E-mail unico, sem diferenciar maiusculas de minusculas
CREATE UNIQUE INDEX IF NOT EXISTS usuarios_email_unico ON usuarios (LOWER(email));

-- Agenda de consultas
CREATE TABLE IF NOT EXISTS consultas (
  id SERIAL PRIMARY KEY,
  gestacao_id INTEGER NOT NULL REFERENCES gestacoes(id) ON DELETE CASCADE,
  data_hora TIMESTAMPTZ NOT NULL,
  titulo TEXT NOT NULL,
  lugar TEXT,
  observacoes TEXT,
  realizada BOOLEAN NOT NULL DEFAULT FALSE,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS consultas_gestacao_data ON consultas (gestacao_id, data_hora);

-- Diario e memorias
CREATE TABLE IF NOT EXISTS diario (
  id SERIAL PRIMARY KEY,
  gestacao_id INTEGER NOT NULL REFERENCES gestacoes(id) ON DELETE CASCADE,
  autor_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  texto TEXT NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS diario_gestacao_data ON diario (gestacao_id, data);
