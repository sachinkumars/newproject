#!bash/sh

red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`
bold=$(tput bold)
normal=$(tput sgr0)


read -p "${green}${bold}API category [user|restaurant|admin]: ${normal}" category


case $category in
    user|restaurant|admin)
		if [ ! -d "modules/$category-api" ]; then
			mkdir "modules/$category-api";
		fi
	break;;
    *) echo "${red}${bold}Error: '$category' is not in the list [user|restaurant|admin]${reset}"; exit 1;;
esac

read -p "${green}${bold}Choose module name: ${normal}" name

case "$name" in  
	*\ * )
		echo "${red}${bold}Error: Unexpected string"; exit 1;
	break;;
	*)

		if [ -d "modules/$category-api/$name" ]; then
			echo "${red}${bold}Error: module already exists."; exit 1;
		else
			mkdir "modules/$category-api/$name";
		fi

		touch "modules/$category-api/$name/$name.doc.js";
		touch "modules/$category-api/$name/$name.query.js";
		touch "modules/$category-api/$name/$name.test.js";

		cat >  "modules/$category-api/$name/$name.validation.js" <<-EOF
			const { query } = require('express-validator/check');
		EOF

		cat >  "modules/$category-api/$name/$name.router.js" <<-EOF
			const router = require('express').Router();
			const { list } = require('./$name.service');

			var routes = () => {
				router.route('/')
					.get(list);
				return router;
			};
			module.exports = { routes, path: '$name' };
		EOF

		cat >  "modules/$category-api/$name/$name.service.js" <<-EOF
			const list = async (req, res) => {
				return res.status(200).message('success').return([]);
			};

			module.exports = { list };
		EOF
		echo "\n";
		echo "${green}Created: modules/$category-api/$name/$name.doc.js";
		echo "${green}Created: modules/$category-api/$name/$name.query.js";
		echo "${green}Created: modules/$category-api/$name/$name.test.js";
		echo "${green}Created: modules/$category-api/$name/$name.service.js";
		echo "${green}Created: modules/$category-api/$name/$name.validation.js";
		echo "${green}Created: modules/$category-api/$name/$name.router.js\n";
		echo "${red}Note: Need to add this module as a dependency in app.config.js\n";

		echo "${green}${bold}----- Stop looking and start coding ;) ------\n";
	;;
esac