
#!/bin/bash

set -e

# Ensure Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "Maven is not installed. Please install Maven to build the SDK."
    exit 1
fi

# Clean, compile, and package
echo "Building Java SDK..."
mvn clean package

echo "Build completed successfully!"
