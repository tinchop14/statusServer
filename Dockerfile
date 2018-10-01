FROM nginx
LABEL Name=statusserver Version=5.0.2
RUN apt-get -y update 
ADD . /usr/share/nginx/html/
