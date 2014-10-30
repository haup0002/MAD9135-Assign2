/**
 * MAD9135 Assignment 2 - Android/Blackberry Assignment: Podcast App
 * Group 5: Timotius Oktorio (okto0001) & Ryan Haupt (haup0002)
 */

// Global Variables
var pages = [];
var links = [];
var controls = [];
var numPages = 0;
var numLinks = 0;
var numControls = 0;
var playButton;
var pauseButton;
var rewindButton;
var forwardButton;

var app = {
    
    initialize: function() {
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
        // Initialize all global variables
        pages = document.querySelectorAll("[data-role='page']");
        links = document.querySelectorAll("[data-role='link']");
        controls = document.querySelectorAll("[data-role='control']");
        numPages = pages.length;
        numLinks = links.length;
        numControls = controls.length;
        playButton = document.getElementById("btn_play");
        pauseButton = document.getElementById("btn_pause");
        rewindButton = document.getElementById("btn_rewind");
        forwardButton = document.getElementById("btn_forward");
        
        // Register onClick listener to all links
        for (var l=0; l<numLinks; l++) {
            links[l].addEventListener("click", app.handleLinksClick, false);
        }
        
        // Register onClick listener to all controls
        for (var c=0; c<numControls; c++) {
            controls[c].addEventListener("click", app.handleControlsClick, false)
        }
        
        //Start Ryan Code Thu Oct 30 10:35am
        //Get Last two "XML" Items from Podcast Site and console log them
        var oReq = new XMLHttpRequest();
        oReq.onload = app.reqListener;
        oReq.open("get", "http://feeds.feedburner.com/ThrillingAdventureHour", true);
        oReq.send();
        //End Ryan Code - calls function reqListener
    },
    
    handleLinksClick: function(ev) {
        ev.preventDefault();
        var href = ev.currentTarget.href;
        var parts = href.split("#");
        app.loadPage(parts[1]);
    },
    
    loadPage: function(id) {
        for (var p=0; p<numPages; p++) {
            if (pages[p].id == id) {
                pages[p].className = "active";
            } else {
                pages[p].className = "";
            }
        }
    },
    
    handleControlsClick: function(ev) {
        ev.preventDefault();
        var id = ev.currentTarget.id;
        
        switch (id) {
            case playButton.id: 
                playButton.classList.add("inactive");
                pauseButton.classList.remove("inactive");
                break;
            case pauseButton.id:
                pauseButton.classList.add("inactive");
                playButton.classList.remove("inactive");
                break;
            case rewindButton.id:
                break;
            case forwardButton.id:
                break;
            default:
                console.log("No controls found!");
        }
    },
    
    //Start Ryan Code Thu Oct 30 10:35am
    reqListener: function()
    {           
                    //console.log(this.responseText); outputs entire XML doc in console
                    var xmlDoc = this.responseXML;
                    console.log(xmlDoc); //output entireXML - minimized
                    console.log(xmlDoc.documentElement.tagName);//output Top Tag Name
                    console.log(xmlDoc.getElementsByTagName("item")[0]); //first podcast "Item"
                    console.log(xmlDoc.getElementsByTagName("item")[1]); //second podcast "Item"
                
    },
    //End Ryan Code - Console logs last 2 Podcast Items
    
    downloadFile: function() {
        var fileTransfer = new FileTransfer();
        var uri = encodeURI("https://dl.dropboxusercontent.com/u/887989/test2.mp3");
        var fileURL = "cdvfile://localhost/persistent/path/to/downloads";
        
        fileTransfer.download(uri, fileURL,
            function(entry) {
                console.log("download complete: " + entry.toURL());
                localStorage.setItem("key", "1");
            },
            function(error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("download error code" + error.code);
            }, 
            false,
            {
                headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                }
            }
        );
    }
    
};

app.initialize();