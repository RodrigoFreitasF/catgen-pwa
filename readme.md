# 🐱 CatGen PWA: Gerador de Imagens de Gato (Bootcamp II)

Este projeto implementa um **Progressive Web App (PWA)** containerizado, orquestrado via Docker Compose e integrado em um pipeline de **CI/CD** com GitHub Actions. O PWA consome um serviço de backend próprio para fornecer imagens de gatos.

---

## 🌐 1. Arquitetura do Projeto

O projeto segue um padrão **Monorepo** e é composto por três principais serviços, todos orquestrados pelo Docker Compose:

| Serviço | Tecnologia | Função | Porta |
| :--- | :--- | :--- | :--- |
| **`web`** | Nginx + Vanilla JS | Serve o PWA (HTML, CSS, JS, Service Worker) e roda no navegador. | 8080 |
| **`api`** | Node.js / Express | Atua como backend próprio. Recebe requisições do PWA e tenta chamar a API externa (`TheCatAPI`). | 3000 |
| **`e2e`** | Playwright | Ambiente de testes End-to-End (E2E) no CI/CD. | N/A |

---

## 🐳 2. Como Rodar Localmente

Para iniciar o ambiente completo (PWA e API) em sua máquina, siga estas instruções:

1.  **Clone** o repositório.
2.  **Certifique-se** de ter o Docker Desktop (Windows/macOS) ou Docker Engine (Linux) instalado e rodando.
3.  Na pasta raiz do projeto (`catgen-pwa/`), execute o comando:
    ```bash
    docker compose up --build -d
    ```
4.  Acesse o PWA no navegador: **`http://localhost:8080`**.

---

## 🔗 3. Endpoint da API

O serviço de backend expõe o seguinte *endpoint* para ser consumido pelo PWA:

* **URL:** `http://localhost:3000/api/gato`
* **Método:** `GET`
* **Resposta Esperada (Sucesso):**
    ```json
    {
      "imageUrl": "URL da imagem de gato gerada pela TheCatAPI"
    }
    ```

> **NOTA DE ENTREGA (Importante):** Devido a restrições de firewall/DNS no ambiente de CI/CD do GitHub, as chamadas para APIs externas estão bloqueadas. A funcionalidade é validada pelo pipeline de teste E2E, que verifica se o botão funciona e a URL da imagem muda, mesmo que a imagem retornada seja a de erro (indicando que a comunicação *web* $\leftrightarrow$ *api* está íntegra).

---

## ⚙️ 4. Prova de Automação e Testes

O projeto utiliza **GitHub Actions** para automação contínua.

* **Arquivo do Workflow:** `.github/workflows/ci.yml`
* **Funcionalidades no CI:** Build dos contêineres, instalação de dependências, execução de testes Playwright e deploy contínuo para o GitHub Pages.

**Link do Workflow de CI/CD: ** **`https://github.com/RodrigoFreitasF/catgen-pwa/actions/runs/19393367539`**