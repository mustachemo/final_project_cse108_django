#!/bin/bash

# Create a virtual environment named 'venv'
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install packages from requirements.txt
pip install -r requirements.txt

# You can add any command you need to run after installing the dependencies
echo "Environment setup complete."
