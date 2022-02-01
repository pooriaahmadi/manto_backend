import "dotenv/config";
const config = {
	port: parseInt(process.env.PORT || "3000"),
	host: process.env.ENDPOINT,
	databaseConfig: {
		host: process.env.DATABASEHOST,
		port: parseInt(process.env.DATABASEPORT || "3306"),
		username: process.env.DATABASEUSERNAME,
		password: process.env.DATABASEPASSWORD,
		databaseName: process.env.DATABASENAME,
	},
};
export default config;
