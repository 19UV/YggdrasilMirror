# Yggdrasil Mirror
A CORS-friendly server which allows any web client to interact with the Mojang authentication servers.
It, however, currently only supports http requests.

## Configuration
Below is the config.json file.

```json
{
    "yggdrasil_url" : Server to mirror to (default: authserver.mojang.com),
    "server_port" : Port to serve POST server on (default: 1234),
    "get_resp" : String to send if a GET request is made to the server (default: "MOJANG AUTHSERVER MIRROR")
}
```