function loadXMLRecipe(recipe) {
	var recipe_xml_file = 'assets/recipes/' + recipe + '.xml';
	var recipe_table = recipe + '_table';
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			displayRecipe(this, recipe_table);
		}
	};
	xmlhttp.open("GET", recipe_xml_file, true);
	xmlhttp.send();
}

function displayRecipe(xml, recipe_table) {
	var i;
	var xmlDoc = xml.responseXML;
	var table="<tr><th>Ingridient</th><th>Amount</th></tr>";
	var x =
		xmlDoc.getElementsByTagName("RECIPE")[0].getElementsByTagName("FERMENTABLES")[0].getElementsByTagName("FERMENTABLE");
	for (i = 0; i <x.length; i++) { 
		var amount_str = x[i].getElementsByTagName("AMOUNT")[0].childNodes[0].nodeValue;
		var amount = (parseFloat(amount_str) * 2.2).toFixed(2) + ' lbs';
		table += "<tr><td>" + 
			x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue +
			"</td><td>" + amount +
			"</td></tr>";
	}
	var x =
		xmlDoc.getElementsByTagName("RECIPE")[0].getElementsByTagName("HOPS")[0].getElementsByTagName("HOP");
	for (i = 0; i <x.length; i++) { 
		var amount_str = x[i].getElementsByTagName("AMOUNT")[0].childNodes[0].nodeValue;
		var amount = (parseFloat(amount_str) * 35.274).toFixed(2) + ' oz';
		table += "<tr><td>" + 
			x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue +
			"</td><td>" + amount +
			"</td></tr>";
	}

	document.getElementById(recipe_table).innerHTML = table;
}

function toggleRecipe(recipe) {
	var recDiv = recipe + '_div';
	var x = document.getElementById(recDiv);
	if (x.style.display === 'none') {
		loadXMLRecipe(recipe);
		x.style.display = 'block';
	} else {
		x.style.display = 'none';
	}
}
