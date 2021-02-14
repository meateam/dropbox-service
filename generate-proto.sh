
#!/usr/bin/env bash
# run the script after `npm i` using: 
# > ./generate-proto.sh dropbox-service
# common problem with solution: https://github.com/grpc/grpc-node/issues/1014

PROTO_IMPORT_DIR="./proto/$1"
GEN_OUT_DIR="./proto/$1/generated"

# Create the generated output dir if it doesn't exist
if [ ! -d "$GEN_OUT_DIR" ]; then
  mkdir -p ${GEN_OUT_DIR}
fi

FILE_PATHS="./proto/$1/*.proto"

# Generate JavaScript
./node_modules/.bin/grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:${GEN_OUT_DIR} \
  --grpc_out=${GEN_OUT_DIR} \
  --plugin=protoc-gen-grpc=`which ./node_modules/.bin/grpc_tools_node_protoc_plugin` \
  -I ${PROTO_IMPORT_DIR} \
  ${FILE_PATHS}
  

# Generate TypeScript definitions
./node_modules/.bin/grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=${GEN_OUT_DIR} \
  -I ${PROTO_IMPORT_DIR} \
  ${FILE_PATHS}