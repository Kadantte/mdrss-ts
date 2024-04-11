# MDRSS-TS

Public feed generator for [MangaDex](https://mangadex.org/).

- Outputs RSS 2.0
- Supports filtering by manga, scanlation group, uploader, language, original
  language, tags (inclusive and exclusive)
- Supports filtering by a combination of any of the above
- Will never hit the MangaDex rate limit

## Creating a feed

There is a [generator](https://mdrss.tijlvdb.me/) available that can generate
feed URLs for you.

## Development

This project requires [Bun](https://bun.sh/).

```s
bun i

# Configure .env in `backend/`, then
bun migrate

# Development (watchers)
bun bdev # back-end
bun fdev # front-end

# Production
bun fbuild # build front-end
NODE_ENV=production bun start # start back-end
```
