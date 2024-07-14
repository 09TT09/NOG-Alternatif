#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Pages & API
if (!fs.existsSync('src/pages')) {
    fs.mkdirSync('src/pages');
}

console.log('Copying the pages and api');
if (!fs.existsSync('src/pages/admin')) {
    fs.mkdirSync('src/pages/admin');
}
if (!fs.existsSync('src/pages/admin/[entity]')) {
    fs.mkdirSync('src/pages/admin/[entity]');
}
if (!fs.existsSync('src/pages/admin/[entity]/edit')) {
    fs.mkdirSync('src/pages/admin/[entity]/edit');
}

fs.copyFileSync(path.resolve(__dirname, '../pages/admin/[entity]/edit/[id].tsx'), 'src/pages/admin/[entity]/edit/[id].tsx');
if (!fs.existsSync('src/pages/admin/[entity]/read')) {
    fs.mkdirSync('src/pages/admin/[entity]/read');
}
fs.copyFileSync(path.resolve(__dirname, '../pages/admin/[entity]/read/[id].tsx'), 'src/pages/admin/[entity]/read/[id].tsx');
fs.copyFileSync(path.resolve(__dirname, '../pages/admin/[entity]/create.tsx'), 'src/pages/admin/[entity]/create.tsx');
fs.copyFileSync(path.resolve(__dirname, '../pages/admin/[entity]/index.tsx'), 'src/pages/admin/[entity]/index.tsx');
if (!fs.existsSync('src/pages/api')) {
    fs.mkdirSync('src/pages/api');
}
fs.copyFileSync(path.resolve(__dirname, '../pages/api/[entity].ts'), 'src/pages/api/[entity].ts');

// Prisma
console.log('Copying prisma singleton');
if (!fs.existsSync('prisma')) {
    throw new Error('You must have a prisma folder at the root of your project to continue.');
}
fs.copyFileSync(path.resolve(__dirname, '../prisma/prisma.ts'), 'prisma/prisma.ts');

// Compoenents
console.log('Copying components');
if (!fs.existsSync('src/components')) {
    fs.mkdirSync('src/components');
}

fs.copyFileSync(path.resolve(__dirname, '../components/TableContainer.tsx'), 'src/components/TableContainer.tsx');
fs.copyFileSync(path.resolve(__dirname, '../components/TableHeader.tsx'), 'src/components/TableHeader.tsx');
fs.copyFileSync(path.resolve(__dirname, '../components/TableRow.tsx'), 'src/components/TableRow.tsx');

if (!fs.existsSync('src/components/Form')) {
    fs.mkdirSync('src/components/Form');
}
fs.copyFileSync(path.resolve(__dirname, '../components/Form/GenericInputNumber.tsx'), 'src/components/Form/GenericInputNumber.tsx');
fs.copyFileSync(path.resolve(__dirname, '../components/Form/GenericInputText.tsx'), 'src/components/Form/GenericInputText.tsx');

// Types
console.log('Copying types');
if (!fs.existsSync('src/types')) {
    fs.mkdirSync('src/types');
}
fs.copyFileSync(path.resolve(__dirname, '../types/CustomStyle.tsx'), 'src/types/CustomStyle.tsx');
fs.copyFileSync(path.resolve(__dirname, '../types/GenericModel.ts'), 'src/types/GenericModel.ts');
fs.copyFileSync(path.resolve(__dirname, '../types/GenericProp.ts'), 'src/types/GenericProp.ts');

// Utils
console.log('Copying utils');
if (!fs.existsSync('src/utils')) {
    fs.mkdirSync('src/utils');
}
fs.copyFileSync(path.resolve(__dirname, '../utils/capitalizeAndRemoveLast.ts'), 'src/utils/capitalizeAndRemoveLast.ts');
fs.copyFileSync(path.resolve(__dirname, '../utils/getModelDefinition.ts'), 'src/utils/getModelDefinition.ts');
fs.copyFileSync(path.resolve(__dirname, '../utils/index.ts'), 'src/utils/index.ts');
fs.copyFileSync(path.resolve(__dirname, '../utils/readJsonSchema.ts'), 'src/utils/readJsonSchema.ts');
fs.copyFileSync(path.resolve(__dirname, '../utils/routesHelpers.ts'), 'src/utils/routesHelpers.ts');


console.log('Visit http://localhost:3000/admin and try out your freshly created admin :)');