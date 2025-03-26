
#!/bin/bash

# Ensure script fails on any error
set -e

echo "Preparing to publish Java SDK..."

# Check for Maven
if ! command -v mvn &> /dev/null; then
    echo "Maven is not installed. Please install Maven to publish the SDK."
    exit 1
fi

# Check for GPG
if ! command -v gpg &> /dev/null; then
    echo "GPG is not installed. Please install GPG to sign the artifacts."
    exit 1
fi

# Check for environment variables
if [ -z "$OSSRH_USERNAME" ] || [ -z "$OSSRH_PASSWORD" ]; then
    echo "OSSRH_USERNAME and OSSRH_PASSWORD environment variables must be set."
    exit 1
fi

# Clean and package
echo "Cleaning and packaging..."
mvn clean package

# Deploy to Maven Central
echo "Deploying to Maven Central..."
mvn deploy -P release

echo "Java SDK published successfully!"
