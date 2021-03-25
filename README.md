# dropbox-service
**Compiling Protobuf To Golang:**
- `protoc -I proto/ proto/dropbox/dropbox.proto --go_out=:./proto --go-grpc_out=./proto`

## Compiling proto prerequisite
### In order to compile the proto file make sure you have `grpc-tools`, `protoc` and `protoc-gen-go` installed globaly:

`npm i -g grpc-tools`

### In order to compile the proto file make sure you have `protobuf` and `protoc-gen-go`

[https://grpc.io/docs/protoc-installation/](url)

`go get -u github.com/golang/protobuf/protoc-gen-go`

### And make sure to install all the dependencies (including the devDependencies):
`npm i`

## Compiling proto
`./generate-proto.sh`
