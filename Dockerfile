FROM nginx
LABEL Name=statusserver Version=5.0.2
ADD . /usr/share/nginx/html/
