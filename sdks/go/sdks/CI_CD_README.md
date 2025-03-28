# CI/CD for SDK Publishing

This document explains how to use the automated CI/CD pipelines for publishing SDK updates.

## Overview

We use GitHub Actions to automate the publishing process for all SDKs. Each SDK has its own workflow that is triggered when a specific tag format is pushed to the repository.

## Required Secrets

Before using these workflows, you need to set up the following secrets in your GitHub repository:

- `NPM_TOKEN`: For publishing JavaScript and React Native SDKs to npm
- `PYPI_API_TOKEN`: For publishing the Python SDK to PyPI
- `RUBYGEMS_API_KEY`: For publishing the Ruby SDK to RubyGems

## Tag Formats

Each SDK has a specific tag format that triggers its publishing workflow:

- JavaScript SDK: `js-v*.*.*` (e.g., `js-v1.0.1`)
- React Native SDK: `rn-v*.*.*` (e.g., `rn-v1.0.1`)
- Python SDK: `py-v*.*.*` (e.g., `py-v1.0.1`)
- Ruby SDK: `rb-v*.*.*` (e.g., `rb-v1.0.1`)

## Publishing Process

### To publish a new version of an SDK:

1. Update the code with your changes
2. Create and push a tag with the appropriate format and version number

```bash
# For JavaScript SDK
git tag js-v1.0.1
git push origin js-v1.0.1

# For React Native SDK
git tag rn-v1.0.1
git push origin rn-v1.0.1

# For Python SDK
git tag py-v1.0.1
git push origin py-v1.0.1

# For Ruby SDK
git tag rb-v1.0.1
git push origin rb-v1.0.1
```

3. The GitHub Actions workflow will automatically:
   - Build the SDK
   - Run tests (when enabled)
   - Update version numbers in relevant files
   - Publish to the appropriate package registry
   - Create a GitHub release with release notes

## Workflow Files

The workflow files are located in each SDK's directory under `.github/workflows/publish.yml`:

- JavaScript: `/sdks/javascript/.github/workflows/publish.yml`
- React Native: `/sdks/react-native/.github/workflows/publish.yml`
- Python: `/sdks/python/.github/workflows/publish.yml`
- Ruby: `/sdks/ruby/.github/workflows/publish.yml`

## Customizing Release Notes

Before pushing a tag, you can update the workflow file to include specific release notes in the GitHub release. Look for the section that says:

```yaml
body: |
  Release of SDK version ${{ steps.extract_version.outputs.VERSION }}
  
  ## Changes
  <!-- Add release notes here -->
```

Replace the comment with your actual release notes.

## Testing Workflows

To test a workflow without publishing, you can:

1. Create a test branch
2. Modify the workflow to use a test registry (like TestPyPI for Python)
3. Push a test tag to trigger the workflow

## Troubleshooting

If a workflow fails:

1. Check the GitHub Actions logs for error messages
2. Verify that all required secrets are set correctly
3. Ensure the package version is not already published
4. Check that the build process completes successfully