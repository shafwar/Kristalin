# Robust single-stage build for Laravel + React application (Railway optimized)
FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer with multiple fallback methods
RUN set -e; \
    echo "Installing Composer..."; \
    # Method 1: curl installation (primary)
    (curl -sS --connect-timeout 30 --max-time 60 https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer) || \
    # Method 2: apt installation (fallback)
    (echo "curl failed, trying apt..." && apt-get update && apt-get install -y composer) || \
    # Method 3: wget installation (backup)
    (echo "apt failed, trying wget..." && wget --timeout=30 --tries=3 -O /usr/local/bin/composer https://getcomposer.org/composer.phar && chmod +x /usr/local/bin/composer) || \
    # Method 4: manual download (last resort)
    (echo "wget failed, trying manual download..." && curl -sS --connect-timeout 30 --max-time 60 -o /usr/local/bin/composer https://getcomposer.org/composer.phar && chmod +x /usr/local/bin/composer) || \
    (echo "All Composer installation methods failed!" && exit 1); \
    echo "Composer installed successfully!"

# Set working directory
WORKDIR /var/www/html

# Copy package files first
COPY package*.json ./

# Install Node.js dependencies with timeout
RUN set -e; \
    echo "Installing Node.js dependencies..."; \
    npm ci --timeout=300000 || (echo "npm ci failed, trying npm install..." && npm install --timeout=300000)

# Copy composer files
COPY composer*.json ./

# Install PHP dependencies with timeout
RUN set -e; \
    echo "Installing PHP dependencies..."; \
    composer install --optimize-autoloader --no-dev --no-interaction --timeout=300 || \
    (echo "composer install failed, trying with --no-cache..." && composer install --optimize-autoloader --no-dev --no-interaction --no-cache --timeout=300)

# Copy application code
COPY . .

# Build frontend assets with timeout
RUN set -e; \
    echo "Building frontend assets..."; \
    npm run build || (echo "npm run build failed, trying with verbose output..." && npm run build --verbose)

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Configure Apache
RUN a2enmod rewrite
COPY docker/apache.conf /etc/apache2/sites-available/000-default.conf

# Create startup script
COPY docker/startup.sh /usr/local/bin/startup.sh
RUN chmod +x /usr/local/bin/startup.sh

# Expose port
EXPOSE 80

# Start application
CMD ["/usr/local/bin/startup.sh"]
