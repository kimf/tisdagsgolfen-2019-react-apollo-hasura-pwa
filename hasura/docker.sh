 #!/bin/bash

 docker run -p 8080:8080 -d \
  hasura/graphql-engine:latest \
  graphql-engine \
  --database-url postgres://kimf:@host.docker.internal:5432/simple_golftour_development \
  serve \
  --access-key supersecretkey2019
