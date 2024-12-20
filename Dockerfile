FROM node:18
WORKDIR '/app'
COPY . .
RUN apt update

RUN git clone https://github.com/ankitbahl/MangaDownloader.git
WORKDIR MangaDownloader
RUN wget https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip
RUN unzip apache-maven-3.9.6-bin.zip

RUN apache-maven-3.9.6/bin/mvn compile
RUN apache-maven-3.9.6/bin/mvn package

WORKDIR '/app'
RUN mkdir MangaDownloaderAPI
RUN cp MangaDownloader/target/manga-downloader-0.1.0.jar MangaDownloaderAPI/

RUN npm install
RUN npm run build

CMD ["node", "server.js"]