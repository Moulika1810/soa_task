FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_URL=http://localhost:8082
ENV VITE_API_URL=$VITE_API_URL
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
