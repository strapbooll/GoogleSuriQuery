# Google Suri Query

### Descrição
É uma API Node.JS que importa os dados para o Google BigQuery os dados de um banco MySQL

### Instruções de uso:
**Criar credenciais no Google Cloud API**
* Acesse a página de APIs e Serviços do Google Cloud e crie as credenciais
* [Link da documentação](https://cloud.google.com/video-intelligence/docs/common/auth?hl=pt-br)
* Ao terminar um arquivo .json será baixado
* Mover para pasta /src
* Renomear para key.json

**Instalar dependências**
* clone este repositório
* entre massas do projeto
* digite yarn para instalar como dependências

**Configurar arquivo .env**
* Criar fora da pasta /src o arquivo .env conforme o .env.example
* O banco de dados precisa possuir as tabelas id, initial, final, date_log, user_id, user_name