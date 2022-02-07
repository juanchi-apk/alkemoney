const path = require('path');
const env = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const {sequelize}	 = require('./database/index');
const routes = require("./routes/index");
const cors = require("cors");
const morgan = require("morgan");
const { fixedCategories } = require('./database/categorydata');





//Inicio la sesion de Express
const app = express();
const corsOptions = {
	origin: "http://localhost:3000",
	};

	env.config();



app.use(bodyParser.json());
app.use(cors(corsOptions)); 
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", routes);




async function catCreator(catlist){
	let catLength = catlist.length;

	while(catLength>0){
		const existingcategories = await sequelize.models.Categories.findAll({where:{cat_name: catlist[catLength-1]}})
		if(existingcategories.length==0){
				 await sequelize.models.Categories.create({
					cat_name : catlist[catLength-1]
			})
			}
	catLength--;
	}

}




sequelize
	//.sync({force : true}) 	
	.sync()
	.then(() => {
		catCreator(fixedCategories)
		app.listen(process.env.PORT);
		//pending set timezone
		console.log("App listening on port " + process.env.PORT);
	})
	.catch(err => {
		console.log(err);
	});
