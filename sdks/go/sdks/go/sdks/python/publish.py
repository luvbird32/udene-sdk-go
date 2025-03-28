
#!/usr/bin/env python3
import subprocess
import os
import sys

def run_command(command):
    print(f"Running: {command}")
    result = subprocess.run(command, shell=True)
    if result.returncode != 0:
        print(f"Command failed with exit code {result.returncode}")
        sys.exit(result.returncode)

# Clean previous builds
if os.path.exists("dist"):
    run_command("rm -rf dist")
if os.path.exists("build"):
    run_command("rm -rf build")
if os.path.exists("udene_sdk.egg-info"):
    run_command("rm -rf udene_sdk.egg-info")

# Build the package
run_command("python setup.py sdist bdist_wheel")

# Upload to PyPI
run_command("twine upload dist/*")

print("Package published successfully!")
