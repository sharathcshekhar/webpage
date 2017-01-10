function loadXMLRecipe(recipe) {
	var recipe_xml_file = 'assets/recipes/' + recipe + '.xml';
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			displayRecipe(this, recipe);
		}
	};
	xmlhttp.open("GET", recipe_xml_file, true);
	xmlhttp.send();
}

function displayRecipe(xml, recipe) {
	var recipe_sum = recipe + '_sum';
	var recipe_table = recipe + '_table';
	var i;
	var xmlDoc = xml.responseXML;

	var rec_node = xmlDoc.getElementsByTagName("RECIPE")[0];
	var name =
		rec_node.getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
	var summary = "<\p>Name: " + name + "<br>";
	var size =
		rec_node.getElementsByTagName("BATCH_SIZE")[0].childNodes[0].nodeValue;
	summary += "Size: " + (parseFloat(size) / 3.76).toFixed(2) + "G<br>"
	var type =
		rec_node.getElementsByTagName("TYPE")[0].childNodes[0].nodeValue;
	summary += "Type: " + type + "<br>"
	var og =
		rec_node.getElementsByTagName("OG")[0].childNodes[0].nodeValue;
	summary += "OG: " + og + "<br>"
	//var srm =
	//	rec_node.getElementsByTagName("SRM")[0].childNodes[0].nodeValue;
	//summary += "SRM: " + srm + "<br>"
	//var ibu =
	//	rec_node.getElementsByTagName("IBU")[0].childNodes[0].nodeValue;
	//summary += "IBU: " + ibu + "<br><\p>"
	summary += "<\p>"

	document.getElementById(recipe_sum).innerHTML = summary;

	var table="<tr><th>Ingridient</th><th>Amount</th></tr>";

	var x =
		xmlDoc.getElementsByTagName("RECIPE")[0].getElementsByTagName("FERMENTABLES")[0].getElementsByTagName("FERMENTABLE");
	table +="<th colspan='2'>Fermentables</th>"
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
	table +="<th colspan='2' style="text-align:center">Hops</th>"
	for (i = 0; i <x.length; i++) { 
		var amount_str = x[i].getElementsByTagName("AMOUNT")[0].childNodes[0].nodeValue;
		var amount = (parseFloat(amount_str) * 35.274).toFixed(2) + ' oz';
		var time = x[i].getElementsByTagName("TIME")[0].childNodes[0].nodeValue;

		table += "<tr><td>" + 
			x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue +
			"</td><td>" + amount + " (" + time + "mins)"
			"</td></tr>";
	}

	document.getElementById(recipe_table).innerHTML = table;
}

function toggleRecipe(recipe) {
	var rec_div = recipe + '_div';
	var x = document.getElementById(rec_div);
	if (x.style.display === 'none') {
		loadXMLRecipe(recipe);
		x.style.display = 'block';
	} else {
		x.style.display = 'none';
	}
}
