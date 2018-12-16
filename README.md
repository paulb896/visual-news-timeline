# Visual News Timeline

A tool that renders news articles on a modifiable timeline, also filtered by language, source, and search text. Uses a news aggregator as it's main data source, go to out [News API](https://newsapi.org/) to get an API key.

## Setup

    npm i

## Run Server

    npm start

## Example Queries

### Get all Supported Types and Sources


#### Raw GraphQL Query

```
query languagesAndSources {
  languages {
    name
    id
  }
  articleSources {
    id
    name
    description
  }
}
```

#### Use `curl` to pass query through a post requests and save to `languagesAndSources.json`

```curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"query languagesAndSources {\n  languages {\n    name\n    id\n  }\n  articleSources {\n    id\n    name\n    description\n  }\n}"}' > languagesAndSources.json > languagesAndSources.json```