# Asana Monthly Report

## Overview
A command-line application built with TypeScript and Bun that generates monthly reports of completed tasks from an Asana workspace. Reports can be exported to CSV or XLSX.

## Requirements
- Bun 1.2.22

## Installation
1. Install all dependencies using `bun install`. This will create a `node_modules` folder in the project directory.

## Usage
Launch the CLI using `bun run cli` or, if you're using the compiled version `./asana-monthly-report`. Then, choose the desired action from the menu.

1. Create a report - generates a monthly report based on an Asana Personal Access Token (PAT), selected workspace and assignee, reporting month (YYYY-MM), and timezone (defaults to Europe/Warsaw). The report includes tasks assigned to the selected user and completed during the specified month, exported to XLSX and CSV files.  

2. Exit - terminates the CLI application.