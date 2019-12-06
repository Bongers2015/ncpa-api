# Reference API for NCPA

This package generates a reference API for the Nissan Charge Point Application, NCPA for short.

> TL;DR see `./src/swagger/swagger.json` for latest swagger spec. For human readable documentation please look at `./API-DOCS.md`

## Usage

### Requirements

- Node.js v12.8.1 or higher
- yarn v1.17.2 or higher

🔥 First installation of Node.js and yvm? Installing [nvm](https://github.com/nvm-sh/nvm) and [yvm](https://yvm.js.org/docs/overview) will likely make your life easier.

### Installation and usage

- Clone this repository
- Install packages
- Create certificates
- Start application

#### Clone and install

```
$ git clone git@github.com:SpronQ/ncpa-api.git
$ cd ncap-api
$ yarn install
```
#### Create certificates 

If you already have generated certificates for `localhost`, you can skip this step.

A nice common domain name for you app would be `localhost`. You can pick any other domain name, 
but bear in mind that identity providers like Google 
and Github expect a domain name to resolve. When asked for a pass phrase, 
please memorize your choice, you will be prompted for it later.

```
$ cd ./certs
$ openssl genrsa -des3 -out rootCA.key 2048
$ openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.pem
// enter domain for common name (localhost)
$ openssl req -new -sha256 -nodes -out server.csr -newkey rsa:2048 -keyout server.key -config <( cat server.csr.cnf )
$ openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile v3.ext
```

On macos, open the current path in Finder, doubleclick on rootCA.pem, and add it to Keychain. 
Find the cert in Keychain by searching for its common name (`localhost` in this case), open trust, and select `always trust`.

#### Run application

```
$ yarn dev
$ open https://localhost:3000/api-docs
```

for prd start the application as follows. You will need a ssl-offloading loadbalancer as non ssl on port 3000

```
$ yarn serve-prd
```


### OpenAPI specification

Upon launching the application the OpenAPI schema will be created, however,
you are able to create the schema in `./src/swagger/swagger.json`.

```
$ yarn tsoa swagger
```
