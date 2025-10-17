# ✂️ Barbershop App - Sistema de Agendamentos Moderno

-----

## Tabela de Conteúdo

1.  [Visão Geral do Projeto](https://www.google.com/search?q=%231-vis%C3%A3o-geral-do-projeto)
2.  [Capturas de Tela e Design](https://www.google.com/search?q=%232-capturas-de-tela-e-design)
      * [2.1. Tela de Autenticação](https://www.google.com/search?q=%2321-tela-de-autentica%C3%A7%C3%A3o)
      * [2.2. Visão Mobile (Dashboard)](https://www.google.com/search?q=%2322-vis%C3%A3o-mobile-dashboard)
      * [2.3. Tela de Agendamentos](https://www.google.com/search?q=%2323-tela-de-agendamentos)
      * [2.4. Painel Administrativo](https://www.google.com/search?q=%2324-painel-administrativo)
3.  [Tecnologias Utilizadas](https://www.google.com/search?q=%233-tecnologias-utilizadas)
4.  [Estrutura do Projeto](https://www.google.com/search?q=%234-estrutura-do-projeto)
5.  [Configuração e Instalação Local](https://www.google.com/search?q=%235-configura%C3%A7%C3%A3o-e-instala%C3%A7%C3%A3o-local)
      * [5.1. Pré-requisitos](https://www.google.com/search?q=%2351-pr%C3%A9-requisitos)
      * [5.2. Instalação e Execução](https://www.google.com/search?q=%2352-instala%C3%A7%C3%A3o-e-execu%C3%A7%C3%A3o)
      * [5.3. Scripts Disponíveis](https://www.google.com/search?q=%2353-scripts-dispon%C3%ADveis)
6.  [Funcionalidades Detalhadas](https://www.google.com/search?q=%236-funcionalidades-detalhadas)
      * [6.1. Autenticação e Perfis de Usuário](https://www.google.com/search?q=%2361-autentica%C3%A7%C3%A3o-e-perfis-de-usu%C3%A1rio)
      * [6.2. Fluxo de Agendamento (Booking Flow)](https://www.google.com/search?q=%2362-fluxo-de-agendamento-booking-flow)
      * [6.3. Painéis de Administração](https://www.google.com/search?q=%2363-pain%C3%A9is-de-administra%C3%A7%C3%A3o)
      * [6.4. Componentes de UI (shadcn/ui)](https://www.google.com/search?q=%2364-componentes-de-ui-shadcnui)
7.  [Arquitetura de Dados (Mocks)](https://www.google.com/search?q=%237-arquitetura-de-dados-mocks)
8.  [Licença](https://www.google.com/search?q=%238-licen%C3%A7a)

-----

## 1. Visão Geral do Projeto

Este repositório contém o *front-end* de um sistema de agendamento moderno e responsivo, projetado especificamente para barbearias. A aplicação foi desenvolvida utilizando Next.js com TypeScript, proporcionando uma experiência de usuário rápida e segura em dispositivos móveis e desktop.

O sistema simula uma arquitetura completa com múltiplos perfis de acesso: Cliente e Administrador da Barbearia, cada um com sua interface e permissões específicas.

### Propósito e Funcionalidades Chave

O principal objetivo do projeto é fornecer uma plataforma robusta para:

  * **Agendamento de Serviços:** Fluxo intuitivo para o cliente selecionar barbeiro, serviço, data e horário.
  * **Visualização de Agendamentos:** Clientes podem ver seus próximos e passados agendamentos.
  * **Multi-Role Access:** Implementação de guarda de rotas e dashboards distintos para cada tipo de usuário.
  * **Gestão Administrativa (Mock):** Painéis com simulação de estatísticas, gestão de barbearias e performance.
  * **Design Responsivo:** Experiência otimizada para navegação via dispositivos móveis (`BottomNavigation`) ou desktop (`DesktopSidebar`).

-----

## 2. Capturas de Tela e Design

O design segue a paleta de cores *Dark Mode* com ênfase em tons de azul e cinza escuro, utilizando o framework de utilidades Tailwind CSS.

### 2.1. Tela de Autenticação

A tela de login e registro é a porta de entrada para a aplicação, com um design de duas colunas no desktop e empilhado no mobile, destacando a ilustração da barbearia.

<img width="1920" height="911" alt="{B976E9C5-288F-4511-A139-1D4BA802B465}" src="https://github.com/user-attachments/assets/46951366-3e3d-4440-91ad-5b6f8017efdc" />

### 2.2. Visão Mobile (Dashboard)

A página inicial no mobile apresenta uma visão resumida e funcional para o cliente:

  * **Header:** Saudação personalizada e data atual.
  * **Horários:** Exibição do status da barbearia (Aberto/Fechado).
  * **Próximo Horário:** Destaque para o agendamento mais próximo.
  * **Navegação:** Barra de navegação inferior (`BottomNavigation`) com atalho para agendamento (`Plus` button).


    <img width="322" height="699" alt="{13BBB56C-394C-4B50-9D6F-9C1E03C2D6C7}" src="https://github.com/user-attachments/assets/6b799e56-341c-42fa-b12e-630a3d0069d5" />


### 2.3. Tela de Agendamentos

A seção de agendamentos permite ao cliente visualizar e gerenciar seus horários com filtros por Período, Situação e Barbeiro.

<img width="374" height="808" alt="{75E815D6-B76B-4993-A918-99E147FAC3E8}" src="https://github.com/user-attachments/assets/1920faa6-2460-4ac7-ad14-4df12b2cde95" />


### 2.4. Painel Administrativo

O painel de administrador (`BarbershopDashboard`) é um ambiente em *dark mode* focado em métricas essenciais para o negócio:

  * **Métricas Chave (Cards):** Agendamentos Hoje, Receita Mensal, Taxa de Conclusão e Avaliação Média.
  * **Gestão de Pessoal:** Performance dos Barbeiros (com simulação de receita e agendamentos).
  * **Análise de Serviços:** Serviços Mais Populares (com porcentagem de participação).


<img width="1917" height="911" alt="{7E6E02E5-BD99-4743-80D3-268419256E53}" src="https://github.com/user-attachments/assets/05a48b59-0319-4446-8aeb-1c90015b09a5" />

-----

## 3. Tecnologias Utilizadas

Este projeto foi construído sobre uma pilha de tecnologias modernas e robustas, garantindo alta performance, escalabilidade e manutenibilidade.

### Core Stack

| Tecnologia | Versão | Descrição |
| :--- | :--- | :--- |
| **Next.js** | 15.2.4 | Framework React para produção, com Server Components e roteamento. |
| **React** | ^19 | Biblioteca JavaScript para a construção da interface. |
| **TypeScript** | ^5 | Linguagem estendida que adiciona tipagem estática ao JavaScript. |
| **Tailwind CSS** | ^3.4.17 | Framework CSS utility-first para estilização rápida e responsiva. |

### Componentes e Estilização

O projeto utiliza a filosofia `shadcn/ui`, baseada em componentes headless do Radix UI e estilizados com Tailwind CSS.

  * `class-variance-authority` (cva) e `clsx`/`tailwind-merge`: Utilizados para construção de componentes dinâmicos e fusão inteligente de classes CSS.
  * **Ícones:** `lucide-react`.

### Estado e Formulários

  * `react-hook-form` e `@hookform/resolvers`: Gerenciamento eficiente de formulários e validação de dados.
  * `zod`: Definição de schemas de validação e tipagem.
  * **Context API:** Utilizado para gerenciar o estado global de autenticação (`AuthProvider`) e dados da aplicação (`AppProvider`).

### Outras Bibliotecas de UI/UX

  * `react-day-picker`: Componente de calendário para seleção de datas.
  * `embla-carousel-react`: Implementação de carrossel para a seleção de barbeiros.
  * `vaul`: Utilizado para o componente `Drawer`, ideal para interações móveis.

-----

## 4. Estrutura do Projeto

O projeto segue a estrutura padrão do Next.js App Router, organizada para facilitar a separação de responsabilidades.

```
.
├── app/
│   ├── (auth)/             # Telas de Autenticação (Login/Register)
│   ├── admin/              # Dashboard de Administrador da Barbearia
│   ├── agendamentos/       # Listagem de Agendamentos do Cliente
│   ├── favoritos/          # Página de Favoritos (Em construção)
│   ├── perfil/             # Página de Perfil (Em construção)
│   ├── servicos/           # Listagem de Serviços
│   ├── globals.css         # Arquivo global de estilos (Tailwind/CSS Variables)
│   ├── layout.tsx          # Layout principal (AuthGuard, Providers)
│   └── page.tsx            # Dashboard do Cliente (Página Inicial)
├── components/
│   ├── admin/
│   │   └── barbershop-dashboard.tsx # Painel de Admin da Barbearia
│   ├── auth/               # Componentes de Login, Registro e Guards
│   │   ├── auth-guard.tsx  # Guarda de rotas de autenticação
│   │   └── role-guard.tsx  # Guarda de rotas por nível de permissão
│   ├── booking/            # Fluxo de agendamento (Seleção de Barbeiro/Service)
│   ├── desktop/
│   │   └── desktop-sidebar.tsx # Navegação fixa para desktop
│   ├── mobile/             # Componentes específicos para mobile (e.g., BottomNavigation)
│   ├── notifications/      # Componentes de notificação (e.g., SuccessToast)
│   └── ui/                 # Biblioteca de componentes Shadcn/ui
├── contexts/
│   ├── app-context.tsx     # Contexto de estado de Barbeiros, Serviços e Agendamentos
│   └── auth-context.tsx    # Contexto de estado e lógica de Autenticação
├── hooks/
│   └── use-mobile.tsx      # Lógica de detecção de dispositivo móvel
├── lib/
│   ├── api.ts              # Tipos de dados e simulação de API REST
│   └── utils.ts            # Funções de utilidade (cn - tailwind class merge)
├── public/
│   └── images/             # Ativos de imagem (logos, avatares, ilustrações)
├── services/
│   ├── auth-service.ts     # Lógica de autenticação (Login/Register/Logout com Mocks)
│   └── role-service.ts     # Definição de roles, permissões e dados mockados de barbearias
├── styles/
│   └── globals.css         # Arquivo de estilos para a aplicação
└── tailwind.config.ts      # Configuração do Tailwind CSS
```

-----

## 5. Configuração e Instalação Local

Siga estas etapas para configurar e executar o projeto em seu ambiente de desenvolvimento.

### 5.1. Pré-requisitos

Certifique-se de que você tem as seguintes ferramentas instaladas:

  * Node.js (versão recomendada: >=18.18.0 ou >=20.0.0)
  * pnpm (Gerenciador de pacotes preferencial) ou npm/yarn.

### 5.2. Instalação e Execução

1.  **Clone o repositório:**

    ```bash
    git clone [URL_DO_REPOSITORIO]
    cd front-barbearia
    ```

2.  **Instale as dependências** (utilizando pnpm):

    ```bash
    pnpm install
    ```

    *Ou, se preferir usar npm:*

    ```bash
    npm install
    ```

3.  **Variáveis de Ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto. Embora o projeto utilize dados mockados internamente, ele está configurado para uma futura integração com uma API.

    ```env
    # .env.local
    # URL base para a API (Mock ou real)
    NEXT_PUBLIC_API_URL="http://localhost:3001/api"
    ```

    *Nota: A ausência desta variável fará a aplicação usar "http://localhost:3001/api" como padrão.*

4.  **Inicie o Servidor de Desenvolvimento:**

    ```bash
    pnpm dev
    ```

    O aplicativo estará disponível em `http://localhost:3000`.

### 5.3. Scripts Disponíveis

Os scripts de execução estão definidos no `package.json`:

| Script | Comando | Descrição |
| :--- | :--- | :--- |
| `dev` | `next dev` | Inicia o servidor de desenvolvimento em modo *hot-reloading*. |
| `build` | `next build` | Constrói a aplicação para produção, gerando os artefatos no diretório `.next/`. |
| `start` | `next start` | Inicia o servidor Next.js em modo de produção (deve ser executado após `pnpm build`). |
| `lint` | `next lint` | Executa o linter para verificar problemas de código. |

-----

## 6. Funcionalidades Detalhadas

### 6.1. Autenticação e Perfis de Usuário

A aplicação implementa autenticação baseada em Contexto (`AuthContext`) e simula diferentes níveis de acesso (`UserRole`).

#### Níveis de Acesso

| Role | Descrição | Rota Principal |
| :--- | :--- | :--- |
| `CLIENT` | Usuário padrão que agenda serviços. | `/` |
| `BARBER_ADMIN` | Administrador de uma barbearia específica (Gerencia agendamentos, vê métricas) | `/admin` |

#### Credenciais de Teste (Mock)

A tela de login (`LoginForm`) lista as credenciais mockadas para acesso rápido aos diferentes perfis:

  * **Cliente:** `joao@email.com` / `123456`
  * **Admin Barbearia:** `carlos@barbeariacentral.com` / `123456`

O sistema também oferece a opção de **Continuar sem login**, ativando o perfil `isGuest`, que restringe o acesso às funcionalidades de agendamento e perfil.

### 6.2. Fluxo de Agendamento (Booking Flow)

O processo de agendamento é encapsulado no componente `BookingFlow` e segue uma sequência lógica de 5 etapas:

1.  **Seleção do Barbeiro:** O cliente escolhe um barbeiro (opcional se já veio da tela de seleção).
2.  **Seleção do Serviço:** Seleção de um serviço (e.g., Corte, Barba, Combo Corte + Barba). O preço e a duração são exibidos.
3.  **Data e Horário:** Visualização dos próximos dias e slots de tempo disponíveis (os slots são calculados com base em mocks de horários já agendados).
4.  **Informações de Contato:** Preenchimento ou confirmação do nome e telefone do cliente.
5.  **Confirmação:** Exibição de um resumo final e botão para confirmar a criação do agendamento (`handleConfirm` -> `createAppointment`).

**Notificação de Sucesso:** Após a confirmação, um `SuccessToast` é exibido, permitindo que o cliente visualize os detalhes e compartilhe no WhatsApp.

### 6.3. Painéis de Administração

#### 6.3.1. Dashboard do Administrador da Barbearia (`/admin`)

O `BarbershopDashboard` fornece uma visão gerencial com as seguintes seções e métricas:

  * **Estatísticas (KPIs):** Total de Agendamentos Hoje, Receita Mensal, Taxa de Conclusão e Avaliação Média (dados calculados a partir dos mocks em `AppProvider`).
  * **Agendamentos de Hoje:** Lista rápida dos próximos clientes.
  * **Performance dos Barbeiros:** Ranking e faturamento individual dos barbeiros.
  * **Serviços Populares:** Gráfico simples de distribuição de serviços agendados.

### 6.4. Componentes de UI (shadcn/ui)

O projeto utiliza uma extensa coleção de componentes de interface, todos localizados em `components/ui/`. Estes são extensões e personalizações de primitivas do Radix UI.

| Componente | Uso Principal | Arquivo de Implementação |
| :--- | :--- | :--- |
| `Button` | Botões customizáveis (variants: default, destructive, outline, secondary, ghost, link). | `components/ui/button.tsx` |
| `Card` | Containers para seções e itens (dashboards, agendamentos). | `components/ui/card.tsx` |
| `Badge` | Tags de status (e.g., Agendado, Concluído) e planos de assinatura. | `components/ui/badge.tsx` |
| `Sheet` / `Drawer` | Modal lateral (Sheet, desktop) e modal inferior (Drawer, mobile) para menus e fluxos secundários. | `components/ui/sheet.tsx` e `components/ui/drawer.tsx` |
| `Form` | Abstração para formulários com `react-hook-form`. | `components/ui/form.tsx` |
| `Avatar` | Exibição de imagens de perfil de usuários e barbeiros. | `components/ui/avatar.tsx` |

-----

## 7. Arquitetura de Dados (Mocks)

O projeto opera em modo *front-end only*, utilizando serviços e dados mockados para simular a interação com um *backend* real.

### Serviços Mockados

  * `lib/api.ts`: Define as interfaces de dados (`User`, `Barber`, `Appointment`, `Service`, `Offer`, `Schedule`) e a classe `ApiService` que simula chamadas `fetch` a endpoints.
  * `services/auth-service.ts`: Gerencia a autenticação, simulando login, registro e armazenamento de usuário no `localStorage` (`getStoredUser`).
      * **Dados Iniciais (Clientes/Admins):** Os usuários de demonstração estão definidos e inicializados no construtor de `AuthService`.
  * `services/role-service.ts`: Contém a definição das permissões (`PERMISSIONS`) e os perfis (`ROLES`) para gestão de acesso.

### Dados de Aplicação Mockados (App Context)

O `AppProvider` carrega os dados simulados de barbeiros, serviços e agendamentos, e gerencia as ações CRUD (Create, Read, Update, Delete) para os agendamentos:

| Tipo de Dado | Exemplo de ID (Mock) | Origem do Dado |
| :--- | :--- | :--- |
| **Barbeiros** | `id: "1"` (Jardel), `id: "2"` (Carlos), etc. | `mockBarbers` (Hardcoded) |
| **Serviços** | `id: "3"` (Corte + Barba, R$ 35.0, 45min) | `mockServices` (Hardcoded) |
| **Agendamentos** | `id: "1"` (Agendado), `id: "2"` (Concluído c/ Rating) | `initialAppointments` (Carregados no `useEffect` e armazenados no `localStorage`) |

A função `getAvailableSlots` simula a busca por horários, filtrando os horários já `scheduled` para um dado barbeiro e data.

-----

## 8. Licença

Este projeto é de código aberto e está licenciado sob a licença MIT.

-----
