### Technical Documentation for CoA_Startup_Dashboard

#### Architecture Overview

The architecture of the CoA_Startup_Dashboard is depicted in the included diagram. Here is a breakdown of the main components and how they interact:

#### Architecture Diagram

![Architecture Diagram](https://github.com/NiDarren6/CoA_Startup_Dashboard/assets/105614327/e00ece7e-5f23-4c9d-8954-853c85963c03)



##### 1. AWS Cloud
- **Raw Data**: Data is stored in S3 buckets.
- **ETL Process**: AWS Glue is used for the ETL processes, transforming raw data into a structured format.
- **AWS Lambda**: Handles the execution of backend processes triggered by events.
- **Amazon Redshift**: Utilized for data warehousing to facilitate complex queries and analysis.
- **VPC Endpoint**: Allows private connections between the VPC and supported AWS services.

##### 2. Backend
- **Express.js**: Manages server-side logic and routes API requests.
- **Integration with AWS**: Backend is configured to communicate with AWS services to retrieve and manipulate data.

##### 3. Frontend
- **React.js**: Powers the interactive UI of the dashboard.
- **Hosted on [Vercel](https://vercel.com/)**: Ensures scalable delivery of the frontend content.
- Vercel is a cloud platform designed to deploy front-end applications quickly and efficiently. Vercel streamlines deployment, providing automatic builds, previews, and production deployments linked directly from a Git repository. This integration facilitates continuous deployment and ensures that updates to the repository translate into live changes without requiring manual intervention.

#### Installation
To set up the environment for development:
```bash
git clone https://github.com/NiDarren6/CoA_Startup_Dashboard
cd CoA_Startup_Dashboard
npm install
```

#### Running Locally
To run the dashboard locally:
```bash
npm start
```

#### Contributing
For developers looking to contribute:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.
