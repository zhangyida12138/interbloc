markdown
# Intebloc Portals

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (which includes npm)

### Something About this Project

1. This project was developed by a team of IT students from the University of Aberdeen, led by Charlie, in collaboration with Intebloc.

2. The project features two portals: an admin portal and a customer portal. By default, the project opens the admin portal. To view the customer portal, you can either set the customer portal as the default page in App.js or change 'admin' to 'customer' in the URL.

3. This project successfully implements all functionalities of the admin portal. The API for the questionnaire functionality is encapsulated in api.js. Once Intebloc finalizes the API development, the corresponding functionality can be integrated within the src/components/admin/ directory.

4. Regarding the customer portal, as the necessary APIs are not yet available, the page currently offers only the login functionality and data display.

5. In the data provided by intebloc, the users PPTest@intebloc.com and paulphillips4@sky.com in Tenant Cairngorm are abnormal and cannot be disabled.

### Installation


1. **Navigate to the project directory**

   ```sh
   cd interbloc
   ```

2. **Install dependencies**

   Run the following command to install the necessary packages:

   ```sh
   npm install
   ```

3. **Start the development server**

   Start the React development server with:

   ```sh
   npm start
   ```

   This will start the application and it should automatically open in your default web browser at `http://localhost:3000`. If it doesn't, open your browser and navigate to that URL.

4. **Run the test**
   If you want to run the Jest test and the behavious test:
    ```sh
   npm install mutationobserver-shim
   npm test
   ```
   Warning: If you install 'mutationobserver-shim' library. It will allow you to run the test, but your project will become slow to run.
   To solove this , you need to delete 'node_modules' folder and 'package-lock.json', then:
    ```sh
   npm install
   npm start
   ```

5. **Package the project**
   Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

   The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
    ```sh
   npm run build
   ```


### Additional Information

- If you encounter any issues during setup, make sure you have the latest versions of Node.js and npm.
- For more advanced usage, refer to the [Create React App documentation](https://create-react-app.dev/docs/getting-started/).

### Contributing

If you would like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
