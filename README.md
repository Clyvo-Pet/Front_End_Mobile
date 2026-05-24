# Clyvo Pet

Aplicativo mobile desenvolvido em React Native com Expo como protótipo funcional para a disciplina de Desenvolvimento de Aplicativos Mobile. O app simula uma plataforma de cuidados com pets, oferecendo navegacao entre telas, cadastro de usuario, marketplace de produtos, planos de saude e perfil do animal de estimacao.

---

## Tecnologias utilizadas

- React Native
- Expo SDK 54
- AsyncStorage (`@react-native-async-storage/async-storage`)
- React (hooks: `useState`, `useEffect`)
- Navegacao customizada com controle de estado centralizado no `App.js`

---

## Estrutura de telas

O app conta com sete telas navegaveis, organizadas em um fluxo logico de uso:

| Tela | Descricao |
|---|---|
| Login | Autenticacao do usuario com email e senha. Suporta a opcao de lembrar o email via AsyncStorage. |
| Cadastro | Formulario completo de registro com validacao de campos e persistencia do usuario no AsyncStorage. |
| Home | Tela principal com saudacao ao usuario, banner promocional e acesso rapido aos servicos. |
| Marketplace | Listagem de produtos com busca por texto e filtro por categoria. Adicao de itens ao carrinho com controle de quantidade. |
| Planos | Comparativo de planos de saude pet (Basico, Essencial e Premium) com detalhamento de beneficios. |
| Meu Pet | Perfil do animal de estimacao com abas para informacoes gerais, historico de saude e carteira de vacinas. Dados persistidos via AsyncStorage. |
| Carrinho | Resumo dos produtos adicionados com calculo de subtotal, frete e total. |

---

## Requisitos atendidos

### 1. Navegacao entre telas

A navegacao e gerenciada de forma centralizada no `App.js` por meio de uma funcao `navigate` repassada como prop para todas as telas. A barra de navegacao inferior (tab bar) exibe as rotas principais apos o login. As telas de Login, Cadastro e Carrinho sao acessadas fora da tab bar.

Rotas navegaveis: Login, Cadastro, Home, Marketplace, Planos, Meu Pet e Carrinho (total de 7 rotas).

### 2. Prototipo visual completo

Todas as telas possuem layout funcional e coerente com o fluxo de uso do app. Os dados sao mockados com `useState` onde nao ha persistencia necessaria. As telas estao organizadas seguindo a jornada do usuario: acesso -> exploracao de servicos -> gerenciamento do pet.

### 3. Formulario com manipulacao de estado

A tela de Cadastro (`RegisterScreen`) controla todos os campos do formulario com `useState` e realiza validacoes em tempo real antes do envio. Os dados sao exibidos dinamicamente e o usuario recebe feedback visual de cada campo preenchido. O formulario inclui os campos: nome completo, email, telefone, senha e confirmacao de senha.

### 4. Armazenamento local com AsyncStorage

O app utiliza AsyncStorage em tres contextos distintos:

- `@clyvo_user`: dados de cadastro do usuario (nome, email, telefone, senha). Carregados automaticamente ao abrir o app para manter a sessao.
- `@clyvo_saved_email`: email salvo opcionalmente na tela de Login para preenchimento automatico.
- `@clyvo_pet`: dados do pet preenchidos na tela Meu Pet. Restaurados ao reabrir o aplicativo.
- `@clyvo_cart`: itens do carrinho. Sincronizados a cada alteracao na tela Carrinho.

Todos os dados salvos sao restaurados corretamente apos reinicio do app.

---

## Como executar

**Pre-requisitos:** Node.js, npm e Expo CLI instalados.

```bash
# Instalar dependencias
npm install

# Iniciar o projeto
npx expo start
```

Apos iniciar, escaneie o QR code com o aplicativo Expo Go (Android ou iOS) ou execute em um emulador.

```bash
# Android
npx expo start --android

# iOS
npx expo start --ios
```

---

## Estrutura do projeto

```
clyvopet_v1/
├── App.js                        # Raiz do app, gerencia navegacao e estado global
├── app.json                      # Configuracoes do Expo
├── index.js                      # Ponto de entrada
├── assets/                       # Icones e imagens do app
└── src/
    ├── theme.js                  # Paleta de cores e estilos globais
    └── screens/
        ├── LoginScreen.js
        ├── RegisterScreen.js
        ├── HomeScreen.js
        ├── MarketplaceScreen.js
        ├── PlanosScreen.js
        ├── MeuPetScreen.js
        └── CarrinhoScreen.js
```

---

## Integrantes

Enrico Delesporte
RM: 565760

Vitor Dias dos Santos 
RM: 565422

Felipe Kirschner Modesto
RM: 561810

---

## Disciplina

Desenvolvimento de Aplicativos Mobile — Entrega 1/5
