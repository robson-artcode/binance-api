
# Binance API

Endpoint de conexão com a plataforma da Binance para busca e inclusão de valor médio em uma tabela de banco Postgres.


## Documentação da API

#### Retorna informações completas sobre os símbolos enviados 

```http
  GET /symbol-information
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `symbol` | `string` | **Obrigatório**. Símbolo para verificação |
| `symbols` | `array` | **Obrigatório**. Símbolos para verificação |

*Utilizar um dos dois símbolos para verificação na API*

#### Analisa preço médio e inclui informação no banco de dados

```http
  POST /average-price
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `symbol` | `string` | **Obrigatório**. Símbolo para verificação e inclusão de informações |
| `symbols` | `array` | **Obrigatório**. Símbolos para verificação e inclusão de informações |

*Utilizar um dos dois símbolos para verificação e inclusão na API*

#### Retornar todos os dados inseridos no banco

```http
  GET /prices
```


## Stack utilizada

**Back-end:** TypeScript/Node/Adonis

**Banco de dados:** Postgres
