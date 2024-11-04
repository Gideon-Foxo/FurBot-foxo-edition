FROM node:18-alpine

# Install dependencies
WORKDIR /app
COPY package.json ./
RUN npm i

# Copy everything else
COPY . .

# Run
ENV FORCE_COLOR=1
CMD ["node", "src/index.js"]
