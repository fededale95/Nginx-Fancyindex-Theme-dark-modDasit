// addNginxFancyIndexForm.js
// Add a small form to filter through the output of Nginx FancyIndex page
// © 2017, Lilian Besson (Naereen) and contributors,
// open-sourced under the MIT License, https://lbesson.mit-license.org/
// hosted on GitHub, https://GitHub.com/Naereen/Nginx-Fancyindex-Theme
var form = document.createElement('form');
var input = document.createElement('input');

input.name = 'filter';
input.id = 'search';
input.placeholder = 'Type to search...';

form.appendChild(input);

document.querySelector('h1').after(form);

//coloro di rosso i file html
var listTd = [].slice.call(document.querySelectorAll('#list tbody td'));
var found = false;
var found2 = false;
for(i in listTd){
    a = listTd[i].querySelector('a');
    contenuto = listTd[i].textContent;
    if(found2){
        classDate=listTd[i].className;
        listTd[i].className=classDate.replace('date','date htmls');
        found2 = false;
    }else if(found){
        classSize=listTd[i].className;
        listTd[i].className=classSize.replace('size','size htmls');
        found = false;
        found2 = true;
    }
    if(contenuto.endsWith(".html") && !contenuto.startsWith("~$")){
        classA=a.className;
        a.className=classA.replace('','htmls');
        found = true;
    }else if(contenuto.startsWith("~$") && contenuto.endsWith(".html")){ //avviso se qualcuno sta modificando il contenuto
        alert("Qualcuno sta modificando i dati di questa VPN, meglio che accedi più tardi.");
    }
}

var listItems = [].slice.call(document.querySelectorAll('#list tbody tr'));

input.addEventListener('keyup', function () {
    var i,
    // Word sequence _matching_ to input. All, except last, words must be _complete_.
    e = "(^|.*[^\\pL])" + this.value.trim().split(/\s+/).join("([^\\pL]|[^\\pL].*[^\\pL])") + ".*$",
    n = RegExp(e, "i");
    listItems.forEach(function(item) {
        item.removeAttribute('hidden');
    });
    listItems.filter(function(item) {
        i = item.querySelector('td').textContent.replace(/\s+/g, " ");
        return !n.test(i);
    }).forEach(function(item) {
  	    item.hidden = true;
    });
});
 
