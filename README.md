# Secure Contact - Sistema de Bloqueio de Números

## Descrição do Sistema

O Secure Contact é um sistema desenvolvido para resolver problemas de banimento de números de WhatsApp devido ao envio repetido de mensagens. O sistema oferece as seguintes funcionalidades principais:

### Funcionalidades

- **Armazenamento de Números Bloqueados:** Todos os números bloqueados são armazenados em um banco de dados centralizado, garantindo que a lista negra esteja sempre atualizada e acessível.

- **Interface Gráfica Web:** Usuários podem consultar, cadastrar e descartar números bloqueados através de uma interface intuitiva e fácil de usar.

- **Automação do Bloqueio:** O sistema automatiza o processo de bloqueio de números, evitando que o disparador de mensagens entre em contato com números previamente bloqueados.

- **Geração de Listas Válidas:** O sistema permite a geração de listas de contatos válidos, excluindo automaticamente os números bloqueados, garantindo que apenas números permitidos sejam contatados.

- **Gestão de Usuários:** Funcionalidades de gestão de usuários garantem que apenas pessoas autorizadas possam acessar e modificar a lista de números bloqueados, proporcionando maior segurança e controle.

Com essas funcionalidades, o Secure Contact proporciona uma solução eficiente e automatizada para a gestão de números bloqueados, reduzindo o risco de banimentos e melhorando a organização e eficiência das operações de comunicação.

## Requisitos do Ambiente

Para rodar o projeto localmente, certifique-se de ter a seguinte ferramenta instalada:

- Node.js >= 20.18.0
- MySQL >= 8.x ou outro banco de dados compatível

## Rode Localmente, com os seguintes passos:

### Clone o repositório:

```bash
git clone https://github.com/Maia-th/Secure-Contact.git
cd Secure-Contact
```

### Suba o banco de dados:

> Consulte a documentação em: [Banco de Dados](.github/docs/bancoDeDados.md).

1. Crie o banco de dados:

```sql
CREATE DATABASE SecureContact;
```

2. Importe o esquema do banco de dados:

```bash
mysql -u seu_usuario -p SecureContact < ./backup/SecureContact.sql
```

### Instale as dependências do projeto:

```bash
npm install
```

### Configure o arquivo .env:

- Copie o arquivo `.env.example` e renomeie para `.env`:
- Defina as variáveis de ambiente.

### Inicie o projeto:

```bash
npm run dev
```

## Bibliotecas

- [Axios - HTTP Client](https://axios-http.com/)
- [Lucide - Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)