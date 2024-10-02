# Personal-Management

**Personal-Management** es una aplicación web diseñada para la gestión eficiente de gastos e ingresos. Permite a los usuarios llevar un control detallado de sus finanzas personales, facilitando la toma de decisiones financieras informadas.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para la construcción de aplicaciones web.
- **Prisma**: ORM (Object-Relational Mapping) para la gestión de bases de datos.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
- **Ant Design**: Biblioteca de componentes para crear interfaces de usuario elegantes.
- **Tailwind CSS**: Framework CSS para estilos personalizados y responsivos.

## Características

- Registro e inicio de sesión de usuarios.
- Registro de gastos e ingresos con categorías personalizables.
- Visualización de reportes gráficos sobre el estado financiero.
- Interfaz intuitiva y responsiva.
- Integración con bases de datos PostgreSQL para el almacenamiento de datos.

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación en tu entorno local:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/MontiAM/Personal-Management.git
   cd Personal-Management
   ```

2. **Instala las dependencias:**

   ```bash
    npm install
   ```

3. **Configura las variables de entorno: Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:**

   ```bash
    DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_de_la_base_de_datos"
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="tu_secreto_aqui"
   ```

4. **Ejecuta las migraciones:**

   ```bash
    npx prisma migrate dev
   ```

5. **Inicia la aplicación:**

   ```bash
    npm run dev
   ```

6. **IAccede a la aplicación en tu navegador:**
   ```bash
    http://localhost:3000
   ```

## Uso

Una vez que la aplicación esté en funcionamiento, puedes registrarte como nuevo usuario o iniciar sesión si ya tienes una cuenta. Desde el panel principal, podrás agregar, editar y eliminar tus gastos e ingresos. También podrás visualizar tus datos financieros en gráficos para un análisis más fácil.

### Notas:

- Asegúrate de que las secciones estén bien organizadas con títulos y subtítulos.
- Verifica que los comandos de terminal estén correctamente formateados con bloques de código.
