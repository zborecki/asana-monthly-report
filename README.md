# Asana Monthly Report

## Overview
A command-line application built with TypeScript and Bun that generates monthly reports of completed tasks from an Asana workspace. Reports can be exported to CSV or XLSX.

## Requirements
- Bun 1.2.22

## Installation
1. Install all dependencies using `bun install`. This will create a `node_modules` folder in the project directory.

## Temp
```ts
async function main(): Promise<void> {
  const options = parseCommand();
  validateOptions(options);

  const tasks = await getCompletedTasks(options);


  console.log(tasks);
}
```