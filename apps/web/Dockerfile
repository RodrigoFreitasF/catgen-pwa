# apps/web/Dockerfile

# Usar uma imagem base oficial do Nginx
FROM nginx:alpine

# Copiar nossos arquivos estáticos (HTML, CSS, JS) 
# para o diretório padrão que o Nginx serve
COPY . /usr/share/nginx/html

# Expor a porta 80 (padrão do Nginx)
EXPOSE 80