# Task Manager

Welcome to the Task Manager! This application helps you manage your tasks efficiently with a clean and user-friendly interface.

## Features

- **Add Tasks**: Easily add new tasks to your todo list.
- **Remove Tasks**: Remove tasks when they're no longer needed.
- **Toggle Completion**: Mark tasks as completed to keep track of your progress.
- **Dynamic Sorting**: Automatically sorts tasks by creation time.
- **Responsive Design**: The app is designed to be mobile-friendly and adapts to different screen sizes.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Router**: For routing and navigation between different pages.
- **CSS**: For styling the application, including a gradient background.
- **Airtable**: Used as a backend to store and manage tasks.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- An Airtable account to set up the backend.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/task-manager.git

2. Navigate to the project directory

   `cd task-manager`

3. Install the dependencies:

   `npm install`

4. Set up your Airtable API

Create an Airtable base and table to store your tasks.

5. Create .env file in the root of the project

Add your Airtable API token and base ID to your environment variables as follows:

VITE_AIRTABLE_API_TOKEN
VITE_AIRTABLE_BASE_ID
VITE_TABLE_NAME

6. Start the application:

`npm run dev`

## Usage

- Open your browser and navigate to http://localhost: (the specified port).
- Use the input field to add tasks, toggle their completion, and remove them as needed.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch `git checkout -b feature/new-feature`
3. Make your changes.
4. Commit your changes `git commit -m 'Add new feature`
5. Push to the branch `git push origin feature/new-feature`
6. Create a new Pull Request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the LICENSE file for details.

## Acknowledgments

- Inspired by various task management applications.
- Special thanks to the developers of [Airtable](https://airtable.com) for providing an easy-to-use API for data storage.




