FROM node:latest

# Install needed packages
RUN apt-get update && apt-get install -y \
  git \
  curl

# Update NPM
RUN npm install npm -g

# Install latest SpotScore/spotscore code from 'master'
RUN mkdir /code
WORKDIR /code
RUN git clone https://github.com/SpotScore/spotscore.git .

# Install application dependencies
RUN npm install

# Make the code directory a volume, so it could be updated from host
VOLUME /code

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]
