An open-source web application that I have built as a learning project using React and Node.js. As a student and self-taught programmer, I have created this application to improve my skills and gain practical experience in web development and SQL.

<p align="center">
  <img height="256px" src="https://user-images.githubusercontent.com/69297872/225576519-1128edd8-f3aa-4787-9d13-47fb1dc7bc93.png" />
</p>

# PIXEL Mail

PIXEL Mail is a simple email service that allows users to send and receive emails through a clean and modern user interface. It's a great project for anyone who is looking to learn how to build a full-stack web application from scratch.

This application is a work-in-progress, and I'm constantly making improvements and adding new features. If you're interested in contributing to the project, feel free to fork the repository and submit a pull request. Your feedback and contributions are greatly appreciated!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![](https://img.shields.io/github/actions/workflow/status/saphalpdyl/Gmail_Clone-using-SQL/lint.yml)

## Server Environment Variables

PIXEL Mail server uses the following environment variables for configuration:

- **DB_HOST**: the hostname of the MariaDB server
- **DB_USERNAME**: the username for accessing the MariaDB
- **DB_PASSWORD**: the password for accessing the MariaDB
- **DB_NAME**: the name of the MariaDB
- **JWT_SECRET**: the secret key for JSON Web Tokens (JWT) used for authentication and authorization

Make sure to set these variables before running the server. You can use a `.env` file to store these variables locally or set them directly in your hosting environment.

## MariaDB  Structure
### Table 1: Users

This table stores information about registered users of the PIXEL Mail application.

| Column Name | Data Type | Description |
| --- | --- | --- |
| `id` | INT | Unique identifier for each user |
| `email` | VARCHAR(255) | Email address of the user |
| `password` | VARCHAR(255) | Encrypted password of the user using `bcrypt` package |
| `username` | VARCHAR(255) | Display name of the user |

### Table 2: Emails

This table stores information about the emails sent and received by the users.

| Column Name | Data Type | Description |
| --- | --- | --- |
| `id` | INT | Unique identifier for each email |
| `sender_email` | VARCHAR(255) | Email address of the sender |
| `receiver_email` | VARCHAR(255) | Email address of the receiver |
| `content` | TEXT | The body of the email |
| `sent_at` | DATETIME | The date and time the email was sent |
| `sender` | VARCHAR(255) | The display name of the sender |


## Tech Stack
PIXEL Mail is a web application that uses React for the front-end development, and Node.js with Express as the back-end server. MySQL is used for data storage and management.

- Front-end: **React**
- Back-end: **Node.js** with **Express**
- Database: **MariaDB**

## Screenshots

### Home
![Screenshot from 2023-03-29 22-30-41](https://user-images.githubusercontent.com/69297872/228610818-38e38462-4b92-497c-b4a6-261df17240f3.png)

### Login
![Screenshot from 2023-03-29 22-29-19](https://user-images.githubusercontent.com/69297872/228610684-0cf2166f-5d50-4f79-8826-02388ebf19bb.png)

### Register
![Screenshot from 2023-03-29 22-29-11](https://user-images.githubusercontent.com/69297872/228610731-532a4cc9-5d2d-45f6-8dfb-58716391747f.png)
