FROM node:latest

# Install needed packages
RUN apt-get update && apt-get install -y \
  git \
  curl

# Update NPM
RUN npm install npm -g

# Make the code directory a volume, so it could be updated from host and set it to working directory
RUN mkdir /code
WORKDIR /code

# Install latest SpotScore/spotscore code from 'master'
RUN git clone https://github.com/SpotScore/spotscore.git .

# Install application dependencies
RUN npm install


# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]
