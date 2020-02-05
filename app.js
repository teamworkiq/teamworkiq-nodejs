let http = require('https');

const requestHttp = (path, method, api_key, data) => {
	const options = {
		hostname: (process.env.TWIQ_HOST || 'api.teamworkiq.com'),
		port: 443,
		path: path,
		method: method,
		headers: {
			'Content': 'application/json',
      'x-api-key': api_key
		},
	};
	const requestBody = JSON.stringify(data) || '';
	const req = http.request(options, (res) => {
		console.log(`Status code: ${res.statusCode}\n`);

		res.on('data', (d) => {
			console.log('Response:');
			process.stdout.write(d);
			console.log();
		});
	});

	req.on('erorr', (e) => {
		console.error(e);
	});

	req.write(requestBody);
	req.end();
};


module.exports.get_access = (account_no, api_key) => {
	if (account_no && api_key)
		requestHttp(`/api/v3/info/${account_no}/access`, 'GET', api_key);
	else console.log('Missing parameters.');
};

module.exports.get_template_params = (account_no, template_no, api_key) => {
	if (account_no && template_no && api_key)
		requestHttp(`/api/v3/templates/${account_no}/${template_no}/params`, 'GET', api_key);
	else console.log('Missing parameters.');
};

module.exports.post_launch_template = (account_no, template_no, api_key, bodyPath) => {
	if (account_no && template_no && api_key && bodyPath) {
		let launchParams = require(bodyPath);
		requestHttp(`/api/v3/templates/${account_no}/${template_no}/commands/launch`, 'POST', api_key, launchParams);
	}
	else console.log('Missing parameters.');
};
