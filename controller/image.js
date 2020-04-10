const Clarifi = require('clarifai');

const app = new Clarifai.App({
	apiKey: '8ef369e15980408aa348f0ca3073c392'
});

const handleApiCall = (req, res) => {
	app.models
	.predict(
		Clarifai.FACE_DETECT_MODEL,
	        // "a403429f2ddf4b49b307e318f00e528b", 
			// "https://samples.clarifai.com/face-det.jpg"
			req.body.input 					//this.imageUrl will give error - setState Advanced concept
			)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json("unable to work with API"))
}
const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports =  {
	handleImage,
	handleApiCall
};