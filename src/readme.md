# next-office-generator

## Installation

Run this command in your nextjs project `npm install next-office-generator`

## Prerequisites
- Prisma 2
- Prisma JSON Schema Generator
- Next.js
- Typescript 

|npm|link|
|---|---|
|prisma|https://www.npmjs.com/package/prisma|
|prisma-json-schema-generator|https://www.npmjs.com/package/prisma-json-schema-generator|
|next.js|https://www.npmjs.com/package/next|
|typescript|https://www.npmjs.com/package/typescript|
- 

## Installation and Setup

### For a New Project with existing database tables

1. **Create a Next.js Project**:
   ```bash
   npx create-next-app my-next-project --typescript
   cd my-next-project
   ```

2. **Install next-office-generator**:
   ```bash
   npm i next-office-generator
   ```

3. **Install Prisma and JSON Schema Generator**:
   ```bash
   npm install @prisma/client prisma prisma-json-schema-generator
   ```

4. **Initialize Prisma**:
   ```bash
   npx prisma init
   ```

5. **Configure .env File**:
   - Set the database URL and other necessary variables.

```env
DATABASE_URL="<DB_TYPE>://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>"  

NEXT_PUBLIC_URL=http://<FRONTEND_HOST>:<FRONTEND_PORT>
NEXT_PUBLIC_FRONTEND_HOST=http://<FRONTEND_HOST>
NEXT_PUBLIC_FRONTEND_PORT=<FRONTEND_PORT>

# Example:
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/my-next-project"
# NEXT_PUBLIC_URL=http://localhost:3000
# NEXT_PUBLIC_FRONTEND_HOST=http://localhost
# NEXT_PUBLIC_FRONTEND_PORT=3000
``
```




6. **Update schema.prisma**:
   - Define your models and include the Prisma JSON Schema Generator settings.
If you want to use the default settings, you can copy the following code snippet into your schema.prisma file. You'll just need to change the database URL and do the following steps.

1. Add a generator for the Prisma Client
```prisma
generator client {
  provider = "prisma-client-js"
  output = "./generated/client" // This is important for next-office-generator
}
```

2. Add a generator for the JSON Schema Generator
```prisma
generator jsonSchema { // This is important for next-office-generator
  provider = "prisma-json-schema-generator" // This is important for next-office-generator
  output  = "./generated/json" // This is important for next-office-generator
}
```
3. Add a datasource for your database
 Change this to your database type (e.g. mysql, postgresql, sqlite, ...)
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

4. Add your models (e.g. User)
```prisma
model User {  
  id            Int       @id @default(autoincrement())  
  username      String  
  email         String  
  password_hash String  
  
  @@map("users")  
}
npx prisma generate
```


```prisma
generator client {
  provider = "prisma-client-js"
  output = "./generated/client" // This is important for next-office-generator
}

generator jsonSchema { // This is important for next-office-generator
  provider = "prisma-json-schema-generator" // This is important for next-office-generator
  output  = "./generated/json" // This is important for next-office-generator
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {  
  id            Int       @id @default(autoincrement())  
  username      String  
  email         String  
  password_hash String  
  
  @@map("users")  
}

```

1. **Generate Prisma Client and Schema**:
   ```bash
   npx prisma generate
   ```







2. **Update Import Path in _app.tsx**:
   - Change to `import '@/src/styles/globals.css';`

3. **Setup next-office-generator**:
   ```bash
   npx next-office-generator setup-next-office-generator
   ```

4.  **Launch the Website**:
    - Run `npm run dev` to start the Next.js server.

### For a New Project without new database tables
Alternatively, you can use prisma to generate the models from an existing database. This is useful if you want to use next-office-generator for an existing project.

The following steps are necessary to generate the models from an existing database. (.env file is already configured, and the project is already configured (tsconfig.json ...))

1. Go to the root directory of your project and run the following command:
   ```bash
   npx prisma db pull
   ```
2. Verify that the models were generated in the `schema.prisma` file.
3. Add the prisma-json-schema-generator to the `schema.prisma` file:
   ```prisma
   generator jsonSchema {
     provider = "prisma-json-schema-generator"
     output   = "./generated/json" // don't forget to add the output also for the client
   }
   ```
4. Run the following command to generate the Prisma Client:
   ```bash
   npx prisma generate
   ```
5.  Go to the root directory of your project and run the following command:
    ```bash
    npx next-office-generator setup-next-office-generator
    ```
6.  Run `npm run dev` to start the Next.js server.
7.  Go to `http://localhost:3000/admin/<your-model-name>` to see the generated admin interface.
## Roadmap
- https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c