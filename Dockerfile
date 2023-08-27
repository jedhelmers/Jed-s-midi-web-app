# Use a base image with Python
FROM python:3.8

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt-get update && apt-get install -y netcat-openbsd


# Set the working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Node for React app building
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y npm

# Build React app
COPY frontend/ /app/frontend/
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Go back to app root
WORKDIR /app/my_project

# Copy Django project files to container
COPY . .

# Command to run on container start
CMD ["gunicorn", "midi_project.wsgi:application", "--bind", "0.0.0.0:8000"]
