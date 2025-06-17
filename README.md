
# Prestamos V2

1. Clonar Proyecto

2. Instalar dependencias

```
npm install
```

3. Clonar archivo `.env.template` y renombrarlo a `.env`

4. Cambiar las variables de entorno

5. Levantar la base de datos

```
docker-compose up -d
```

6. Levantar la aplicación en modo desarrollo

```
npm run start:dev
```

7. Ejecutar el el Seed para crear un usuario root defualt
* El metodo del endpoint debe se Get
```
Get: http:/localhost:3000/api/v1/seed
```

* Credenciales del usuario
```
Email: root@gmail.com
Name: root
Password: rootAdmin34
```

8. Ingresar las credenciales en el login para obtener el token correcspondiente y acceder a cualquier endpoint (Metodo Post)
```
Post: http:/localhost:3000/api/v1/auth/login-user
```
9. Entrar a la documentación de la api a travez de swagger
```
Navegador: http:/localhost:3000/api
```