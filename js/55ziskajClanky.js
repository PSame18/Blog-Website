/**
 * Created by stefan.kr
 *
 * ziskajClanky means get articles
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Kód, ktorý sa vykoná pri načítaní skriptu:
//Code executed after loading this script:

//Počet naraz zobrazených článkov
//Number of articles per one page
var articlesPerPage=2;

//Doménové meno servera s databázou článkov
//Domain name of the server with the article database
var server="wt.kpi.fei.tuke.sk";

//Výpis prvých článkov a vytvorenie navigačného panela
//Write first articlesPerPage articles to html and create a navigation part
writeArticles2Html(0, articlesPerPage, server, 'clanky', 'navigacia');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Funkcie:
//Functions:


/**
 * Vráti HTML kód pre navigačnú časť stránky
 * @param startIndex - index prvého zo zobrazených článkov
 * @param articlesCount - počet vypísaných článkov
 * @param articlesTotalCount  - celkový počet článkov v databáze servra
 * @returns {string} - HTML kód pre navigačnú časť stránky

 * Creates and returns HTML code for the navigation part of the page
 * @param startIndex - index of the first of the displayed articles
 * @param articlesCount - number of displayed articles
 * @param articlesTotalCount  - total count of articles in the server database
 * @returns {string} - HTML code for the navigation part of the page

 */


function navHtml(startIndex, articlesCount, articlesTotalCount){

    var htmlCode="";
    if(articlesCount>0){
        htmlCode+="<hr> ";
        htmlCode+="Vypisujem články  "+(startIndex+1)+" až "+(startIndex+articlesCount)+" z "+ articlesTotalCount +" článkov. <br />";
        htmlCode+="(Displaying articles  "+(startIndex+1)+" to "+(startIndex+articlesCount)+" from "+ articlesTotalCount  +" articles.) <br /> <br />";
    }

    htmlCode+=" <button id='btn1' onclick=\"writeArticles2Html("+0+
        ", articlesPerPage, server, 'clanky', 'navigacia')\">" +
        "Načítaj znova / Reload</button>";

    if(startIndex > 0)
    {
        htmlCode+=" <button id='btn2' onclick=\"writeArticles2Html("+(startIndex-2)+
            ", articlesPerPage, server, 'clanky', 'navigacia')\">" +
            "Predchádzajúce / Previous</button>";
    }

    if(startIndex < articlesTotalCount)
    {
        htmlCode+=" <button id='btn3' onclick=\"writeArticles2Html("+(startIndex+2)+
            ", articlesPerPage, server, 'clanky', 'navigacia')\">" +
            "Nasledujúce / Next</button>";
    }


    return htmlCode;
}





/**
 * Vráti HTML kód so zoznamom článkov, získaného z objektu articles
 * @param articles  - JSON objekt s článkami
 * @returns {string} - HTML kód pre časť stránky s článkami
 *
 * Creates and returns HTML code with the list of articles, obtained from the object articles
 * @param articles  - JSON object with articles
 * @returns {string} - HTML code with the list of articles
 */
function articlesHtml(articles){
    var count;
    var htmlCode="";
    if(count=articles.articles.length){ //ak su nejake clanky (if there are some articles)
        for(var i=0; i<count; i++)
            htmlCode+="<p>"+articles.articles[i].author+": "+articles.articles[i].title+" </p>";
    }
    return htmlCode;
}

/**
 * Vykona XMLHttpRequest GET ziadost a spracuje odpoved v podobe objektu ziskaneho z odpovede v JSON formate.
 * Tato verzia je funkcna aj pre starsie prehliadace (IE 5, 6)
 * (povodny kod prevzaty z: https://mathiasbynens.be/notes/xhr-responsetype-json).
 * @param url - URL ziadosti
 * @param successHandler - funkcia, ktora spracuje objekt data, ziskany z odpovede v JSON formate.
 *                         Tento objekt by mal byt parametrom funkcie
 * @param errorHandler - funkcia, ktora sa vola, ked dojde k chybe.
 *                       Jej parametrom by malo byt cislo so statusom odpovede
 *
 * Executes XMLHttpRequest GET request and processes the response in the form of an object in the JSON format.
 * This version also works with old browsers (IE 5, 6)
 * (based on the code from: https://mathiasbynens.be/notes/xhr-responsetype-json).
 * @param url - URL of the request
 * @param successHandler - function, which processes the data object, obtained from the response in the JSON format.
 *                         This object is the parameter of that function
 * @param errorHandler - function, which is called when error occurs.
 *                       Its parameter is the error status number
 *
 *
 */
function getJSONAllBr(url, successHandler, errorHandler){


    var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() { //alternativne mozem pouzit xhr.addEventListener("readystatechange",funkcia, false),
        // ale tu je pouzita anonymna funkcia a bolo by to iba neprehladnejsie
        var status;
        var data;
        if (xhr.readyState === 4) { // DONE, alternativne sa da pouzit XMLHttpRequest.DONE
            status = xhr.status;
            if (status === 200) { //uspesne vybavena poziadavka
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();

};

/**
 * Vykona XMLHttpRequest GET ziadost a spracuje odpoved v podobe objektu ziskaneho z odpovede v JSON formate.
 * Tato verzia je funkcna pre novsie prehliadace, ktore poznaju hodnotu "json" pre XMLHttpRequest.responseType
 * (povodny kod prevzaty z: https://mathiasbynens.be/notes/xhr-responsetype-json).
 * @param url - URL ziadosti
 * @param successHandler - funkcia, ktora spracuje objekt data, ziskany z odpovede v JSON formate. Tento objekt by mal byt parametrom funkcie
 * @param errorHandler - funkcia, ktora sa vola, ked dojde k chybe. Jej parametrom by malo byt cislo so statusom odpovede
 *
 *
 * Executes XMLHttpRequest GET request and processes the response in the form of an object in the JSON format.
 * This version works with modern browsers, which know the value "json" of the XMLHttpRequest.responseType
 * (based on the code from: https://mathiasbynens.be/notes/xhr-responsetype-json).
 * @param url - URL of the request
 * @param successHandler - function, which processes the data object, obtained from the response in the JSON format.
 *                         This object is the parameter of that function
 * @param errorHandler - function, which is called when error occurs.
 *                       Its parameter is the error status number
 *
 */
function getJSONModernBr(url, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            successHandler && successHandler(xhr.response);
        } else {
            errorHandler && errorHandler(status);
        }
    };
    xhr.send();
};

/**
 * Zapíše autorov a názvy článkov do daného html elementu
 * @param articles  - pole objektov s článkami
 * @param articlesElmId - Id elementu do ktorého sa články majú vypísať
 * @param navElmId - Id elementu ktorý má obsahovať navigačné linky
 * @param startIndex - index (poradové číslo čláanku od 0) od ktorého sa články vypisujú
 * @param max - maximálny počet článkov.
 *
 * Writes authors and article names to the html element
 * @param articles - array of objects with articles
 * @param articlesElmId - Id of the element to  the articles are to be added
 * @param navElmId - Id of the element to which the navigation links are to be added
 * @param startIndex - the article sequence number (from 0) from which articles are written
 * @param max - maximum number of articles.
 */
function renderListOfArticles(articles, articlesElmId, navElmId, startIndex, max){

    var articlesElm=document.getElementById(articlesElmId);
    var navElm=document.getElementById(navElmId);

    if(articlesElm && navElm){

        //mrenderObjectWithTemplateFromFile(articles, "templates/listOfArticles.mst", articlesElmId);
        mrenderObjectWithTemplateFromElm(articles, "listOfArticlesMTemplate", articlesElmId);
        navElm.innerHTML=navHtml(startIndex, articles.articles.length,articles.meta.totalCount);
    }
}

/**
 * Vykona XMLHttpRequest GET ziadost a spracuje odpoved v podobe retazca (typ DOMString).
 * Pouziva sa na ziskanie Mustache sablony, ktora je v samostatnom subore.
 * Tato verzia je funkcna aj pre starsie prehliadace (IE 5, 6)
 * Je to vlastne funkcia getJSONAllBr bez spracovania odpovede z JSON retazca na JavaScript objekt.
 * @param url - URL ziadosti
 * @param paramObj - objekt s dalsimi parametrami pre handler-y
 * @param successHandler - funkcia, ktora spracuje retazec ziskany z odpovede. Retazec je jej prvym parametrom. Druhym je objekt s nastaveniami a udajmi spracovania.
 * @param errorHandler - funkcia, ktora sa vola, ked dojde k chybe. Jej parametrami su cislo chyby a  objekt s nastaveniami a udajmi spracovania.
 *
 * Executes XMLHttpRequest GET request and processes the response in the form of a string (DOMString type).
 * It is used to get Mustache templates from separate files.
 * This version also works with old browsers (IE 5, 6)
 * It's like the function getJSONAllBr, but without processing the response to JSON.
 * @param url - URL of the request
 * @param paramObj - object with additional parameters for handlers
 * @param successHandler - function, which processes the string, obtained from the response. The string is its first parameter. The second parameter is an object with processing settings and data.
 * @param errorHandler   - function, which is called when error occurs.
 *                       Its parameters are the error status number and the object with processing settings and data.
 *
 */
function getTextFromUrl(url, paramObj, successHandler, errorHandler){
    var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() { //alternatively you can use xhr.addEventListener("readystatechange",function, false),
        var status;
        var data;
        if (xhr.readyState === 4) { // DONE, alternatively you can use XMLHttpRequest.DONE
            status = xhr.status;
            if (status === 200) { //successfully executed request
                successHandler && successHandler(xhr.responseText,paramObj);
            } else {
                errorHandler && errorHandler(status,paramObj);
            }
        }
    };
    xhr.send();


};

/**
 * otvori dialogove okno s chybovym hlasenim
 * @param status -  hodnota XMLHttpRequest.status
 *
 * Opens a dialog window with an error message
 * @param status -  value os XMLHttpRequest.status
 */
function errorDialog(status){
    window.alert("Chyba pri načítaní údajov zo servera/Error when reading server data.\nStatus= "+status);
}

/**
 * Zapíše údaje o článkoch do elementu s id articlesElmId a HTML kód navigácie do elementu s id navElmId
 * @param startIndex - index (poradové číslo čláanku od 0) od ktorého sa články vypisujú
 * @param max - maximálny počet článkov.
 * @param server - doménové meno servera odkiaľ sa majú údaje stiahnuť.
 * @param articlesElmId - Id elementu do ktorého sa články majú vypísať
 * @param navElmId - Id elementu ktorý má obsahovať navigačné linky
 *
 * Writes article data to the element with id=articlesElmId and HTML code for the navigation part to the element with id=navElmId
 * @param startIndex - index of the first article that is displayed. Articles are indexed from 0
 * @param max - maximum number of the displayed articles
 * @param server - domain name of the server with the article database
 * @param articlesElmId - id of the html element to which the authors and names of the articles are written
 * @param navElmId - id of the html element with the navigation part
 */
function writeArticles2Html(startIndex, max, server, articlesElmId, navElmId){
    var restURL ="http://"+server+"/api/article/?max="+max+"&offset="+startIndex;
    console.log(restURL);
    getJSONAllBr(restURL,
        function(JSONObj){renderListOfArticles(JSONObj, articlesElmId, navElmId, startIndex, max)},
        function(status){errorDialog(status)});
}
