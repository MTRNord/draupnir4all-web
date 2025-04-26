# Draupnir4All Admin

Draupnir4All Admin is a private project designed to manage and administer Draupnirs which are provisioned by the Appservice mode.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 18.18.0 or higher is recommended)
- [pnpm](https://pnpm.io/) (a fast, disk space-efficient package manager)

## Installation

To get started, clone the repository and install the dependencies using `pnpm`:

```bash
git clone https://github.com/MTRNord/draupnir4all-web.git
cd draupnir4all-web
pnpm install
```

## Scripts

The project includes several scripts defined in the `package.json` file. You can run these scripts using `pnpm`:

- **Development**: Start the development server with Turbopack.

  ```bash
  pnpm dev
  ```

- **Build**: Build the project for production.

  ```bash
  pnpm build
  ```

- **Start**: Start the production server.

  ```bash
  pnpm start
  ```

- **Lint**: Run linting checks using Next.js.

  ```bash
  pnpm lint
  ```

## Usage

1. Run the development server:

   ```bash
   pnpm dev
   ```

   This will start the application in development mode. You can access it at `http://localhost:3000`.

2. To build the project for production:

   ```bash
   pnpm build
   ```

3. Start the production server:

   ```bash
   pnpm start
   ```

4. Use the linting script to ensure code quality:

   ```bash
   pnpm lint
   ```

## Package Manager

This project uses `pnpm` as the package manager. It is faster and more efficient than traditional package managers like npm or yarn. If you don't have `pnpm` installed, you can install it globally using npm:

```bash
npm install -g pnpm
```

## License

This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for more details.
