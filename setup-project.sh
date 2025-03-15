#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Creando estructura del proyecto...${NC}"

# Crear directorios principales
mkdir -p app/api/auth/[...nextauth] \
       app/api/tasks/[id]/comments \
       app/api/tasks/[id]/status \
       app/api/tasks/[id]/assign \
       app/api/users/[id] \
       app/api/notifications/[id] \
       lib/db/models \
       lib/utils \
       lib/services

# Crear archivos de rutas
touch app/api/auth/[...nextauth]/route.js \
      app/api/tasks/route.js \
      app/api/tasks/[id]/route.js \
      app/api/tasks/[id]/comments/route.js \
      app/api/tasks/[id]/status/route.js \
      app/api/tasks/[id]/assign/route.js \
      app/api/users/route.js \
      app/api/users/[id]/route.js \
      app/api/notifications/route.js \
      app/api/notifications/[id]/route.js

# Crear archivos de conexión y modelos
touch lib/db/connect.js \
      lib/db/models/Task.js \
      lib/db/models/User.js \
      lib/db/models/Notification.js

# Crear archivos de utilidades
touch lib/utils/auth.js \
      lib/utils/validators.js \
      lib/utils/formatters.js

# Crear archivos de servicios
touch lib/services/taskService.js \
      lib/services/notificationService.js \
      lib/services/emailService.js

# Dar permisos de ejecución
chmod +x setup-project.sh

echo -e "${GREEN}✓ Estructura del proyecto creada exitosamente${NC}"

# Mostrar estructura del proyecto
echo -e "${BLUE}Estructura del proyecto:${NC}"
tree app lib
