/*This script file contains functions that are used in the login page.
 * Each function should have their own headers for reference to the next
 * developer.*/

/*Event binding for login page init, login button, register button*/
$( document ).on( "pageinit", "#Login", function( event ) {
	$("#RegisterButton").removeClass("ui-btn");
	$("#RegisterButton").addClass("ui-btn-gloss");
	$( "#loginLoader" ).dialog({ create: function( event, ui ) {} });
	if(globalCurrPage == "Config Editor"){
    	loadConfigEditor();
        CommitAction();
        populateCombo();
        outOfFocus();
	}
	$("#configFooter").hide();
});
$(document).on('click', '#LoginButton', function() {
	loading('show');
    $("#LoginButton").addClass('animated wobble');
    setTimeout(function(){
       	$("#LoginButton").removeClass('animated wobble');
    },1500);
    login();
});
$(document).on('click', '#RegisterButton', function() {
	$("#RegisterButton").addClass('animated wobble');
    setTimeout(function(){
    	$("#RegisterButton").removeClass('animated wobble');
    },1500);
    createAccount();
});
/*
 *
 *  FUNCTION NAME : loadLogin
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 10, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : loads the content of login page
 *  PARAMETERS    : 
 *
 */
function loadLogin(){
	$.ajax({
        url: "pages/login.html",
        dataType: 'html',
        success: function(data) {
			$("#Login").append(data);
			$("#Login").trigger('create');
		}
	});
}


/*
 *
 *	FUNCTION NAME : submitenter
 *	AUTHOR		  : 
 *	DATE		  :	
 *	MODIFIED BY	  :	Maricel Louise Sumulong
 *	REVISION DATE : August 30, 2012
 *	REVISION #	  : 1
 *	DESCRIPTION	  :	checks if the key pressed is enter
 *	PARAMETERS	  : key event
 *
*/
function submitenter(e) {

	var keycode;
    
	if(window.event) {
	    keycode = window.event.keyCode;
    } else if(e) {
	    keycode = e.which;
      } else {
	      return true;
	    }

    if (keycode == 13 && $('#logAlert').is(':visible') == false) {
	    login();
        return false;
    } else {
	    return true;
      }
}

function ValidateIPaddress(ipaddress){  
	if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)){
		return "true";
	} else{
	  	error("You have entered an invalid IP address!","Notification");
    	return "false";
	}
} 

/*
 *
 *	FUNCTION NAME : login
 *	AUTHOR		  : 
 *	DATE		  :	
 *	MODIFIED BY	  :	Angeline Bringas
 *	REVISION DATE : December 6,2013
 *	REVISION #	  : 
 *	DESCRIPTION	  :	login user
 *	PARAMETERS	  : 
 *
*/
function login() {
	var usrName = document.getElementById('UserName').value;
	var passWord = document.getElementById('Password').value;
	var IPTxt = $("#ipAddTxt").val();
    if(IPTxt == ""){
        error("Ip Address are required.","Notification");
		loading('hide');
		return;
    }else{
		var vald = ValidateIPaddress(IPTxt);
		if(vald =="true"){
			CURRENT_IP = IPTxt;
		}
    }	
	
	globalUserName = usrName;
	var pass = $.md5(passWord);
	var query = {'QUERY':[{'User':usrName,'Pass':pass}]};
	query = JSON.stringify(query);
	var urls = getURL("ADMIN1","JSON")+"action=Authenticate&query="+query;//User="+usrName+"^Pass="+pass;
	$.ajax({
		url: urls,
		timeout: 120000,
		dataType: 'html',
		success: function(data) {
			globalDeviceType = 'Mobile';
			//data = "Ok";
			data = $.trim(data);
			var dat = data.replace(/'/g,'"');
            var dat2 = $.parseJSON(dat);
            var res = dat2.RESULT[0].Result;
			if(res.toLowerCase() == 'ok' || res==1){				
				globalLoginFlag =1;
				localStorage.usernameNFastMobile = usrName;
				if(globalCurrPage == "Config Editor"){					
					$.mobile.changePage( $("#configEditorPage"), {
			        	transition: "flow",
        	  			reverse: false,
          				changeHash: true
	    			});
					setTimeout(function(){
						loadGridMenuContent();
					},100);
				}else if(globalCurrPage == "RM"){
					$.mobile.changePage($('#rmDialog'),{
			            transition: "pop",
                        changeHash: true
			        });
				}else if(globalCurrPage == "PM"){
					$.mobile.changePage($('#pmDialog'),{
			            transition: "pop",
                        changeHash: true
			        });
				}else if(globalCurrPage == "Admin"){
                    $.mobile.changePage($('#adminDialog'),{
                        transition: "pop",
                        changeHash: true
                    });
                }else if(globalCurrPage == "Statistics"){
                    $.mobile.changePage($('#statsDialog'),{
                        transition: "pop",
                        changeHash: true
                    });
                }
				globalUserName = usrName;
				userInformation2();
				loading('hide');
			}else{
				error("Username and Password invalid.");
				loading('hide');
				globalLoginFlag = 0;
			}
		}
	});
}

/*
 *
 *	FUNCTION NAME : signout
 *	AUTHOR		  : Mark Anthony Elbambo
 *	DATE		  :	12-10-13
 *	MODIFIED BY	  :	
 *	REVISION DATE : 
 *	DESCRIPTION	  : deletes the global variables and redirect to login page
 *	PARAMETERS	  : none
 *
*/
function signout(){
	localStorage.usernameNFastMobile = '';
	globalLoginFlag = 0;
	globalUserName="";
	$.mobile.changePage( $("#Login"), {
    	transition: "flow",
        reverse: true,
        changeHash: true
    });
	$("#configFooter").hide();
	clearCanvas();
	location.reload();
}

/*
 *
 *	FUNCTION NAME :	createAccount
 *	AUTHOR		  :	Angeline Bringas
 *	DATE		  : December 9,2013
 *	MODIFIED BY	  : 
 *	REVISION DATE : 
 *	REVISION #	  : 
 *	DESCRIPTION	  :	
 *	PARAMETERS	  : none
 *
*/

function createAccount() {
	$('#RegisterBtn').empty().load('pages/Register.html',function() {
		$("#loginLoader").dialog("close");
		$('#RegisterBtn').dialog('open');
		$('.ui-dialog :button').blur();
	});

}

