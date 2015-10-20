FROM mdillon/postgis

# Set locale to UTF-8
RUN localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.utf8
ENV LANG LANG en_US.utf8

# Set user, database and password
ENV POSTGRES_USER="postgres"
ENV POSTGRES_DATABASE="postgres"
ENV POSTGRES_PASSWORD="secret"