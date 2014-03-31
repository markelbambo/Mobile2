/****Script for MENU On Canvas****/
/*
 *
 *  FUNCTION NAME : CommitAction 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : send query to RM for Reservation
 *  PARAMETERS    : 
 *
 */
var createDev = "";
var createLineVar = "";
function CommitAction(){

	var doubleFlag = false;
	$('.connectGeneric').click(function() {
//		$("#configContent"+pageCanvas).css("cursor","default");
		$("#Magnify").attr("title","Zoom");
		zoomButtonStatus = "inactive";
		doubleFlag = true;
		var srcN = getMiniModelImage('any','connect');
		createLineVar = srcN;
		srcN =  ($(srcN).attr('src')).split("img")[1];
		$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+srcN+") 10 18,auto");

	    connectivitySideBar2(this,true);
	});
	$('.modelDevice').click( function(event) {
//		$("#configContent"+pageCanvas).css("cursor","default");
		$("#Magnify").attr("title","Zoom");
		zoomButtonStatus = "inactive";
		doubleFlag = true;
//		deviceSideBar(this);
		var srcN = getMiniModelImage($(this).attr('model'));
		srcN =  ($(srcN).attr('src')).split("img")[1];
		createDev = this;
		$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+srcN+") 10 18,auto");
	});
	$('.manufacDevice').click( function(event) {
		$("#Magnify").attr("title","Zoom");
		zoomButtonStatus = "inactive";
		doubleFlag = true;
		var srcN = getMiniModelImage($(this).attr('model'));
		srcN =  ($(srcN).attr('src')).split("img")[1];
		createDev = this;
		$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+srcN+") 10 18,auto");
	//	deviceSideBar(this);
	});
	$('.OSTypeDevice').click( function(event) {
//		$("#configContent"+pageCanvas).css("cursor","default");
		$("#Magnify").attr("title","Zoom");
		zoomButtonStatus = "inactive";
		doubleFlag = true;
		var srcN = getMiniModelImage($(this).attr('model'));
		srcN =  ($(srcN).attr('src')).split("img")[1];
		createDev = this;
		$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+srcN+") 10 18,auto");
//		deviceSideBar(this);
	});
	$('.prodFamilyDevice').click( function(event) {
//		$("#configContent"+pageCanvas).css("cursor","default");
		$("#Magnify").attr("title","Zoom");
		zoomButtonStatus = "inactive";
		doubleFlag = true;
		var srcN = getMiniModelImage($(this).attr('model'));
		srcN =  ($(srcN).attr('src')).split("img")[1];
		$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+srcN+") 10 18,auto");

		createDev = this;
//		deviceSideBar(this);
	});
	$('.connector').click(function() {
//		$("#configContent"+pageCanvas).css("cursor","default");
		$("#Magnify").attr("title","Zoom");
		zoomButtonStatus = "inactive";
		globalFlag = true;
		var srcN = getMiniModelImage($(this).attr('model'),'connect');
		createLineVar = srcN;
		srcN =  ($(srcN).attr('src')).split("img")[1];
		$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+srcN+") 10 18,auto");
		connectivitySideBar2(this,true);
        lineType = $(this).attr('linktype');
        lineName = $(this).attr('model');
        lineSpeed = $(this).attr('speed');					
	});
	$('.icon').click( function() {
//		$("#configContent"+pageCanvas).css("cursor","default");
		$("#Magnify").attr("title","Zoom");
		zoomButtonStatus = "inactive";
//		deviceSideBar(this);
		createDev = this;
		var srcN = getMiniModelImage($(this).attr('model'));
		srcN =  ($(srcN).attr('src')).split("img")[1];
		$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+srcN+") 10 18,auto");

	});
	$(document).on('click', '.manufacTT', function(evt) {
		createdev = this;
		var srcN = getMiniModelImage($(this).attr('model'));
		srcN =  ($(srcN).attr('src')).split("img")[1];
		$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+srcN+") 10 18,auto");

	});
	$(document).on('click', '.prodFamilyTT', function(evt) {
		createDev = this;
		var srcN = getMiniModelImage($(this).attr('model'));
		srcN =  ($(srcN).attr('src')).split("img")[1];
		$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+srcN+") 10 18,auto");
		evt.preventDefault();
	});
	$(document).on('click', '.modelTT', function(evt) {
		var srcN = getMiniModelImage($(this).attr('model'));
		srcN =  ($(srcN).attr('src')).split("img")[1];

		createDev = this;
		$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+srcN+") 10 18,auto");
		evt.preventDefault();
	});
	doubleFlag = false;
	canvasEvent(0);  // functionality for canvas
}
/*
 *
 *  FUNCTION NAME : canvasEvent
 *  AUTHOR        : James Turingan
 *  DATE          :	 March 25, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : add events for canvas
 *  PARAMETERS    : 
 *
 */

function canvasEvent(page){
	$('#configContent'+page).bind("click", function(evt){
	   	if(createDev != ""){
//			var canvas = document.getElementById('canvasID'+pageCanvas);
//		    var context = canvas.getContext('2d');			
			var mousePosX = window['variable' + dynamicVar[pageCanvas]].getPointerPosition().x;
			var mousePosY = window['variable' + dynamicVar[pageCanvas]].getPointerPosition().y;
			imgXPos = mousePosX;
			imgYPos = mousePosY;
			var srcN = getMiniModelImage($(createDev).attr('model'));
			srcN =  ($(srcN).attr('src')).split("img")[1];
			if(globalDeviceType != "Mobile"){
				$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+srcN+") 10 18,auto");
			}
		    deviceSideBar(createDev);
	   }
	});
	$(document).on('mouseleave','.kineticjs-content', function(){
		$("#configContent"+pageCanvas).css("cursor","default");
		createDev = "";	
		createLinveVar = "";		  
		globalFlag = false;
	});
}

/*
 *
 *  FUNCTION NAME : connTbl 
 *  AUTHOR        : James Turingan
 *  DATE          :	 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : ltype
 *
 */
function connTbl(ltype){
	$("#connectivityPaletteSubTr"+ltype+"Sub > td").each(function(index) {
	    var imgTd = $(this).find("img").attr("linktype");
	    if(imgTd == ltype){
	        $(this).parent().show();
	        $(this).show();
	    }else{
	        $(this).hide();
	    }
	});
}

/*
 *
 *  FUNCTION NAME : connectivitySideBar2 
 *  AUTHOR        : James Turingan
 *  DATE          :	 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : thiss 
 *
 */
function connectivitySideBar2(thiss,flag){
	if(globalInfoType == "JSON"){
		var devices = getDevicesNodeJSON();
	}else{
		var devices =devicesArr;
	}
	if(devices.length > 1){
		$(thiss).addClass('animated bounce');
		var id = $(thiss).attr("id");
		setTimeout(function(){
			$("#"+id).removeClass('animated bounce');
		},1500);
	}else if(flag == true){
		if(globalDeviceType == "Mobile"){
			error("Please create two or more devices first.","Notification");
		}else{
			alerts("Please create two or more devices first.");	
		}
		return;
	}
	globalFlag = true;
	lineType = $(thiss).attr('linktype');
	lineName = $(thiss).attr('model');
	lineSpeed = $(thiss).attr('speed');
	if(lineSpeed == 40000 || lineSpeed == 100000){
		lineSubChannel = $(thiss).attr('SubChannel');
	}
}
/*
 *
 *  FUNCTION NAME : specificChcker 
 *  AUTHOR        : James Turingan
 *  DATE          :	 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : ths,ths2,levCur 
 *
 */
function specificChcker(ths,ths2,levCur){
	if(levCur == "Device"){
		$("#"+ths+" > td").each(function(){
			var mn = $(this).find("img").attr("manufacturer");
			if(mn == $(ths2).attr('manufacturer')){
				$(this).show()
			}else{
				$(this).hide();
			}
		});
	}else if(levCur == "OS Type"){
		$("#"+ths+" > td").each(function(){
			var ostpe = $(this).find("img").attr("ostype");
			if(ostpe == $(ths2).attr('ostype')){
				$(this).show()
			}else{
				$(this).hide();
			}	
		});
	}else if(levCur == "Product Family"){
		$("#"+ths+" > td").each(function(){
			var prdf = $(this).find("img").attr("productfamily");
			if(prdf == $(ths2).attr('productfamily')){
				$(this).show()
			}else{
				$(this).hide();
			}
		});
	}else if(levCur == "Model"){
		$("#"+ths+" > td").each(function(){
			var mdl = $(this).find("img").attr("model");
			if(mdl == $(ths2).attr('model')){
				$(this).show()
			}else{
				$(this).hide();
			}
		});
	}
}
/*
 *
 *  FUNCTION NAME : applyAll 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : apply to all devices
 *  PARAMETERS    : 
 *
 */
function applyAll(){

}
/*
 *
 *  FUNCTION NAME : load Active Query
 *  AUTHOR        : James Turingan
 *  DATE          : December 16, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : load action reservation
 *  PARAMETERS    : 
 *
 */
function showActiveTopology(){
	if(globalDeviceType == "Mobile"){
		loading('show');
	}else{
		ajaxLoader('show','Loading Active Reservation...');
	}
	var query = {'QUERY':[{'ResourceId':globalLArId.toString(), 'DateTIME':globalLAdate.toString()}]};
    query = JSON.stringify(query);

	var url = getURL('ConfigEditor2',globalInfoType)+"action=activereservation&query="+query;//ResourceId="+globalLArId+"&DateTIME="+globalLAdate;
	$.ajax({
        url: url,
        dataType: 'html',
        success: function(data) {
			if(globalDeviceType == "Mobile"){
				loading('hide');
			}else{
				ajaxLoader('hide');
			}
			removespecificconfig();
			data = $.trim(data);
			if(globalInfoType == "XML"){
				getDataFromXML(data);
		
			}else{
				data = data.replace(/'/g,'"');
				var obj = jQuery.parseJSON(data);
				getDataFromJSON(obj);
				globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Username = globalUserName;
				globalMAINCONFIG[pageCanvas].MAINCONFIG[0].MainConfigurationUserId = globalUserId;
				if(obj.MAINCONFIG[0].Username != globalUserName){
					window['variable' + dynamicOtherUser[pageCanvas]] = obj.MAINCONFIG[0].Username;
				}		
				globalLArId='';
				globalLA='';
			}
		}
	});

}

/*
 *
 *  FUNCTION NAME : load Active Query
 *  AUTHOR        : James Turingan
 *  DATE          : December 16, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : load action reservation
 *  PARAMETERS    : 
 *
 */
function loadActiveTableQuery(ths){
	if(ths){
		if($(ths).is(":checked") == true){
			globalLAFlag= true;
		}else{
			globalLAFlag = false;
		}
	}
	var InfoType="JSON";
	if(globalDeviceType != "Mobile") {
		globalLAFlag = $('#cbShowLA').is(':checked');	
	}
	if(globalLAFlag == false){
		//var url = getURL('ConfigEditor2',"XML")+"action=loadactive&query=userName="+globalUserName;
		var url = getURL('ConfigEditor2',"JSON")+"action=loadactive&query={'QUERY':[{'userName':"+"'"+globalUserName+"'}]}";
	}else{
		var url = getURL('ConfigEditor2',"JSON")+"action=showallreservation&query={'QUERY':[{'userName':"+"'"+globalUserName+"'}]}";//userName="+globalUserName;
	}

	if(globalDeviceType == "Mobile"){
		setTimeout(function(){
	        $.mobile.changePage($('#loadActivePop'),{
	            transition: "pop"
		        });
	    },1500);
		loading('show');
	}else{
		$("#ActiveTable > tbody").empty().append(loader);
	
	}		
	$.ajax({
        url: url,
        dataType: 'html',
		//method: 'POST',
		//proccessData: false,
		//async:false,
        success: function(data) {
			if(globalDeviceType == "Mobile"){
				loading('hide');
			}
			if(data != ""){
				if(InfoType == "XML"){
		            var mydata = data;
    		        var parser = new DOMParser();
        		    var xmlDoc = parser.parseFromString( mydata , "text/xml" );
					var root = xmlDoc.getElementsByTagName('MAINCONFIG'); 
		            var row = xmlDoc.getElementsByTagName('DEVICE');
					if(row == undefined || row == null || row == "" || row.length == 0){
						error("There are no active resevation as of this time.","Notification","toConfig();");
						return;
					}
    		        var html ='',startRes='',endRes='';
					var btns='';
	    	        for(var a =0; a< row.length; a++){
						html += "<tr class='trSelected' sdate='"+row[a].getAttribute('StartReservationTime')+"' edate='"+row[a].getAttribute('EndReservationTime')+"' rId='"+row[a].getAttribute('ResourceId')+"' >";
						if(globalDeviceType != "Mobile"){

							html +="<td><input type='checkbox' id='cb"+row[a].getAttribute('ResourceId')+"' /></td>";
						}
						html +="<td>"+row[a].getAttribute('ResourceId')+"</td>";
						html +="<td>"+row[a].getAttribute('Status')+"</td>";
						html +="<td>"+row[a].getAttribute('ConfigName')+"</td>";
						html +="<td>"+row[a].getAttribute('StartReservationTime')+"</td>";
						html +="<td>"+row[a].getAttribute('EndReservationTime')+"</td>";
						html +="<td>"+row[a].getAttribute('NumberofDevices')+"</td>";
						html +="<td>"+row[a].getAttribute('Exclusivity')+"</td>";
						html +="<td>"+row[a].getAttribute('UserName')+"</td>";
						html +="</tr>";
					}
				}else{
					var dat = data.replace(/'/g,'"');
    	            var dat2 = $.parseJSON(dat);
					if(dat2.MESSAGE == "" || dat2.MESSAGE == []){
						if(globalDeviceType == "Mobile" ){
                            error("There are no active resevation as of this time.","Notification","toConfig();");
                        }else{
                            alerts("There are no active resevation as of this time.","$('#configPopUp').empty().dialog('destroy')");
                        }
                        return;
	
					}
	                var root = dat2.MAINCONFIG;
					if(dat2.MAINCONFIG == [] || dat2.MAINCONFIG == '' || dat2.MAINCONFIG[0].DEVICE == undefined || dat2.MAINCONFIG[0].DEVICE == null || dat2.MAINCONFIG[0].DEVICE == "" || dat2.MAINCONFIG[0].DEVICE.length == 0 || dat2.MAINCONFIG[0] == []){
						if(globalDeviceType == "Mobile" ){
	                        error("There are no active resevation as of this time.","Notification","toConfig();");
						}else{
	                        aldestroyerts("There are no active resevation as of this time.","$('#configPopUp').empty().dialog('destroy')");
						destroy}
                        return;
                    }
				 	var row = dat2.MAINCONFIG[0].DEVICE;
                    var html ='',startRes='',endRes='';
                    var btns='';
                    for(var a =0; a< row.length; a++){
						if((globalMAINCONFIG[pageCanvas] != null && globalMAINCONFIG[pageCanvas] != undefined && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId != null && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId != "" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId != undefined && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId != row[a].ResourceId) || ((globalMAINCONFIG[pageCanvas] != null && globalMAINCONFIG[pageCanvas] != undefined && (globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId == null || globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId == "" || globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId == undefined )))){	
							if(globalDeviceType == "Mobile" ){
	                        	html += "<tr class='trSelected' sdate='";
							}else{
	                        	html += "<tr sdate='";
							}
							if(row[a].StartReservation){
								html += row[a].StartReservation;
							}else{
								html += row[a].StartReservationTime
							}
							html +="' edate='";
							if(row[a].EndReservation){
								html += row[a].EndReservation;
							}else{
								html += row[a].EndReservationTime;
							}
							html += "' rId='"+row[a].ResourceId+"' >";
	                        if(globalDeviceType != "Mobile"){
	
	                            html +="<td><input type='checkbox' class='trSelected' onclick='checkLoadActive(this,\""+row[a].ResourceId+"\",\"html5\")' id='cb"+row[a].ResourceId+"' /></td>";
							}
	                        html +="<td>"+row[a].ResourceId+"</td>";
	                        html +="<td>"+row[a].Status+"</td>";
	                        html +="<td>"+row[a].ConfigName+"</td>";
							if(row[a].StartReservation){
		                        html +="<td>"+row[a].StartReservation+"</td>";
							}else{
								html +="<td>"+row[a].StartReservationTime+"</td>";
							}
							if(row[a].EndReservation){
		                        html +="<td>"+row[a].EndReservation+"</td>";
							}else{
								html +="<td>"+row[a].EndReservationTime+"</td>";
							}
	                        html +="<td>"+row[a].NumberofDevices+"</td>";
							if(row[a].Exclusivility){
		                        html +="<td>"+row[a].Exclusivility+"</td>";		
							}else{
								html +="<td>"+row[a].Exclusivity+"</td>";
							}
	                        html +="<td>"+row[a].UserName+"</td>";
	                        html +="</tr>";
                    	}
					}
				}
				$("#ActiveTable > tbody").empty().append(html);
				$(".ui-dialog").position({
	    	    	my: "center",
		        	at: "center",
			        of: window
			   	});
				 $('#loadActivePop').trigger('create');
                if(globalDeviceType != "Mobile"){
					$(".trSelected").trigger('click');
					checkLoadActive("","","html5"); 
				}else{
					checkLoadActive("","","mobile");
				}
			}else{
				error("CGI's not responding, please try it again.","Notification");
			}
        }
	});

}

/*
 *
 *  FUNCTION NAME : clearCanvas 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : clear canvas
 *  PARAMETERS    : 
 *
 */
function clearCanvas(){
	if(globalInfoType == "JSON"){
		for(var i = 0 ; i <  globalMAINCONFIG.length; i++){
			if(globalMAINCONFIG[i].MAINCONFIG[0].PageCanvas == pageCanvas){
				globalMAINCONFIG.splice(i,1);
			}
		}
		setJSONData();
	}
	globalSelectedDeviceList = [];
	checkLCArray=[];
	devicesArr = [];
	testToolObj = [];
	checkDevNameTT = [];
	checkPortsTTList = [];
	deviceArr = [];
	rackArr = [];
	slotArr = [];
	moduleArr = [];
	picArr = [];
	portArr = [];
	window['variable' + dynamicLineConnected[pageCanvas]]= [];
	devicesArrBC = [];
	deviceArrBC = [];
	rackArrBC = [];
	slotArrBC = [];
	moduleArrBC = [];
	picArrBC = [];
	portArrBC = [];
	window['variable' + dynamicLineConnected2[pageCanvas]] = [];
	window['variable' + dynamicFlagCommitted[pageCanvas] ] = false;
	deviceCtr = 1;
	idsArray = [];
	lineSpeed="";
	lineName="";
	lineType="";
	MainId = "";
	imgXPos = 152;
	imgYPos = 24;
	ResourceId = "";
	window['variable' + dynamicResourceId[pageCanvas]]="";
	window['variable' + dynamicTopology[pageCanvas]]="";;
	window['variable' + dynamicOtherUser[pageCanvas]]="";;
	window['variable' + dynamicMainId[pageCanvas] ] = "";
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Interval = "";
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Iteration = "";
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DateTIME = "";
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ReservationType = "";
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Offset = "";
	drawImage();
	createConfigName();
	$("#configDialog").dialog("destroy");
	$("#trashBin").hide();
    $("#box").hide();
    $("#box1").hide();
	$("#osxDocUL").html('');
	$("#dockContainer").hide();
}
/*
 *
 *  FUNCTION NAME : createQueryforResevartion 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : create query for reservation
 *  PARAMETERS    : 
 *
 */
function createQueryforResevartion(){
	var startDate = $('#confirm_test').val();
	var startTime = $('#confirm_test1').val();
	var endDate = $('#confirm_test2').val();
	var endTime = $('#confirm_test3').val();
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Interval = $('#interval').val();
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Iteration = $('#iteration').val();
	var timezone = new Date().getTimezoneOffset();
	var mydate = new Date();
	var myDateArr = mydate.toString().split(" ");
	var mytimezone = myDateArr[5];
	var action = "converttoservertime";
//	var query = "StartDateTime=" + startDate + "*" + startTime + "$EndDateTime="+endDate+ "*" + endTime + "$TimeZone="+mytimezone;
	var query =  "{  'QUERY' : [{ 'StartDateTime' : '"+startDate+"*"+startTime+"', 'EndDateTime':'"+endDate+"*"+endTime+"','TimeZone':'"+mytimezone+"' }] }";
	var url = getURL("ADMIN1","JSON");
	$.ajax({
        url: url,
		data: {
			"action":action,
			"query":query,
		},
        dataType: 'html',
		method: 'POST',
		proccessData: false,
		async:false,
        success: function(data) {
			if(data != ""){
				data = $.trim(data);
				var dat = data.replace(/'/g,'"');
                var dat2 = $.parseJSON(dat);
                var RESULT = dat2.RESULT;
                var Result = RESULT[0].Result
				var dataArr = Result.split("*");
	//	createConfigName();
				globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Name =  $("#configText").val();
				globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DateTIME = dataArr[0];
				globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ReservationType = dataArr[1];
				globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Offset = dataArr[2];
				globalMAINCONFIG[pageCanvas].MAINCONFIG[0].UserName = globalUserName;
				globalMAINCONFIG[pageCanvas].MAINCONFIG[0].MainConfigurationUserId = userInformation[0].userId; 
				if(globalInfoType == "JSON"){
				    modifyMainConfigJSON();
					setTimeout(function(){
						window['variable' + dynamicTopology[pageCanvas] ] = globalMAINCONFIG[pageCanvas];
	         	   		var myXml2 = getStringJSON(globalMAINCONFIG[pageCanvas]);
						var myXml = myXml2.replace(/"/g,"'");
						sendQueryToRM("Check",myXml);
					},350);
	        	}else{
            		var myXml = getXmlData();
					sendQueryToRM("Check",myXml);
        		}
			}
        }
     });
}
/*
 *
 *  FUNCTION NAME : cancelOfferReservation 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : cancel offer reservation
 *  PARAMETERS    : 
 *
 */
function cancelOfferReservation(){
	if(ResourceOrig != "" && ResourceOrig != undefined && ResourceOrig != null){
		var action = "Cancel";
		var query = "ResourceId="+ResourceOrig;
		var url = getURL("RM3");
		if(globalDeviceType == "Mobile"){
    	    loading('show');
	    }
		$.ajax({
    	    url: url,
			data: {
				"action":action,
				"query":query,
			},
			method: 'GET',
			proccessData: false,
			async:false,
        	dataType: 'html',
	        success: function(data) {
				if(globalDeviceType == "Mobile"){
			        loading('hide');
			    }
				if(data == "1" || data == 1){
				}
			}
		});
	}
}
/*
 *
 *  FUNCTION NAME : cancelReservation 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : cancel reservation
 *  PARAMETERS    : 
 *
 */
function cancelReservation(flag){
	checkLCArray=[];
	if(window['variable' + dynamicResourceId[pageCanvas] ] != "" && window['variable' + dynamicResourceId[pageCanvas] ] != undefined && window['variable' + dynamicResourceId[pageCanvas] ] != null || window['variable' + dynamicResourceId[pageCanvas] ] != "undefined"){
		var action = "Cancel";
		if(globalInfoType == "XML"){
			var query = "ResourceId="+window['variable' + dynamicResourceId[pageCanvas] ];
		}else{
			var query = "{'RESERVATION':[{'ResourceId':'"+window['variable' + dynamicResourceId[pageCanvas] ]+"'}]}";
		}
		var url = getURL("RM3",globalInfoType);
		if(globalDeviceType == "Mobile"){
        	loading('show');
    	}else{
			ajaxLoader('show','Processing Information...');
		}
		$.ajax({
    	    url: url,
			data: {
				"action":action,
				"query":query,
			},
			method: 'POST',
			proccessData: false,
			async:false,
        	dataType: 'html',
	        success: function(data) {
				data = $.trim(data);
				if(ReleaseFlagLoadActive == true){
					ReleaseFlagLoadActive = false;
					showActiveTopology();
					return;
				}
				if(data == "" ){
					if(globalDeviceType == "Mobile"){
						error("Cancel Failed.","Notification");
					}else{
						alerts("Cancel Failed.","Notification");
					}
				}else if(data != ""){
					data = data.replace(/'/g,'"');
	                var obj = jQuery.parseJSON(data);
					if(obj.MAINCONFIG != null && obj.MAINCONFIG != undefined && obj.MAINCONFIG != ""){
    	            	removespecificconfig();
						if(flag != true){
		                	getDataFromJSON(obj);
						}
						globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Interval = "";
					    globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Iteration = "";
					    globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DateTIME = "";
					    globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ReservationType = "";
					    globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Offset = "";
						window['variable' + dynamicOtherUser[pageCanvas]]="";;
						createConfigName();
					}else{
						checkProcessExecuted(obj,flag);	
					}
				}
				if(globalDeviceType == "Mobile"){
            		loading('hide');
			    }else{
					ajaxLoader('hide');
				}

        	}
     	});
	}
}
/*
 *
 *  FUNCTION NAME : getDevices 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get device
 *  PARAMETERS    : device
 *
 */
function getDevices(device){
	var object = device;
	if(globalInfoType == "JSON"){
    	var devices = getDevicesNodeJSON();
   	}else{
         var devices =devicesArr;
    }
	for(var t=0; t<devices.length; t++){
		if(devices[t].ObjectPath == object){
			object = devices[t];
			break;
		}
	}
	return object;
}
/*
 *
 *  FUNCTION NAME : sendQueryToRM 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : cancel reservation
 *  PARAMETERS    : 
 *
 */
function sendQueryToRM(action,query){
	var url = getURL("RM3");
	if(globalDeviceType == "Mobile"){
		loading('show');
	}else{
		ajaxLoader("show","Processing Information..");
	}
	$.ajax({
        url: url,
		data: {
			"action":action,
			"query":query,
		},
        dataType: 'html',
		method: 'POST',
		proccessData: false,
		async:false,
        success: function(data) {
			if(globalDeviceType == "Mobile"){
				loading('hide');
			}else{
				ajaxLoader('hide');
			}
			if(data != ""){
				window['variable' + dynamicFlagCommitted[pageCanvas] ] = true;
				devicesArr = [];
				deviceArr = [];
				rackArr = [];
				slotArr = [];
				moduleArr = [];
				picArr = [];
				portArr = [];
				window['variable' + dynamicLineConnected[pageCanvas]] = [];
				var redflag = "";
				var redflag2 = "";
				if(globalInfoType == "XML"){
					var parser = new DOMParser();
				    var xmlDoc = parser.parseFromString( data , "text/xml" );
				    var mConfig = xmlDoc.getElementsByTagName('MAINCONFIG');
					if(mConfig.length){
						redflag = mConfig[0].getAttribute("RedFlag");
						redflag2 = mConfig[0].getAttribute("RedFlag2");
					}
					getDataFromXML(data);
				}else{
					data = data.replace(/'/g,'"');
        	        var obj = jQuery.parseJSON(data);
					redflag = obj.MAINCONFIG[0].RedFlag;
					redflag2 = obj.MAINCONFIG[0].RedFlag2;
					ResourceOrig = obj.MAINCONFIG[0].ResourceOrig;
    	            removespecificconfig();
	                getDataFromJSON(obj);
				}

				if(redflag != "" && redflag != undefined && redflag != null){
				/*ok*/
					if(globalDeviceType == "Mobile"){
						error(redflag,"Notification","toConfig();");
					}else{
						alerts(redflag);
					}
				}else if(redflag2 != "" && redflag2 != undefined && redflag2 != null){
					/*yes no*/	
					var msg2 = redflag2.split("`");
					var message = msg2[0].split("^").join("<br/>");
					var todo = "cancelReservation();";
					var todo2= "cancelOfferReservation();";
					if(globalDeviceType == "Mobile"){
						confirmation(message,"Reservation Offer",todo2+"toConfig();",todo+"toConfig();");
					}else{
						alerts(message,todo2,"yesorno","",todo);
					}
				}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DeviceSanity.toString() == "true" || globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity.toString() == "true" || globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString() == "true" || globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "true" || globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == true || StartReservation.toString() == "true" || EndReservation.toString() == "true"){
					if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ReservationType.toString() == "now"){
						showSanityResTab();
					}	
				}else{
					if(globalDeviceType == "Mobile"){
						error("Process Completed","Notification","toConfig();");
					}else{
						alerts("Process Completed");
					}
				}
			}else if(data == "databasetimeout"){
				if(globalDeviceType == "Mobile"){
					error("Cannot continue the process.\n Unable to connect to the database","Notification","toConfig();");
				}else{
					alerts("Cannot continue the process.\n Unable to connect to the database");
				}
			}else if(data == "fail"){
				if(globalDeviceType == "Mobile"){
					error("Reservation Failed","Notification","toConfig();");
				}else{
					alerts("Reservation Failed");
				}
       		}else{
				if(globalDeviceType == "Mobile"){
					error("Reservation Failed, no data received.","Notification","toConfig();");
				}else{
					alerts("Reservation Failed, no data received.");
				}
			}
		},
		error: function(data){
			if(globalDeviceType == "Mobile"){
				error("RM not responding.","Notification","toConfig();");
	            loading('hide');
			}else{
        	     alerts("RM not responding.");
	        }
		}
	});
}
/*
 *
 *  FUNCTION NAME : createConfigName 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : create config name
 *  PARAMETERS    : 
 *
 */
function createConfigName(){
	var date = new Date();
    var month = date.getMonth();
    var day = date.getDay();
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getMilliseconds();
	if(globalMAINCONFIG.length == 0){
		setJSONData();
	}else{
		var flag = false;
		for(var t=0; t<globalMAINCONFIG.length; t++){
			if(globalMAINCONFIG[t].MAINCONFIG[0].PageCanvas == pageCanvas){
				flag = true;
				break;
			}
		}
		if(!flag){
			setJSONData();
		}
	}
	window['variableConfigName'+pageCanvas] = "config_" + year + "-" + month + "-"+ day + "-" + hour + "-" + min + "-" + sec + ".stat";
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Name =  window['variableConfigName'+pageCanvas];
	$("#configText").val(window['variableConfigName'+pageCanvas]);
	return window['variableConfigName'+pageCanvas];
}

/*
 *
 *  FUNCTION NAME : getDeviceName
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : January 8, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : get Device Name
 *  PARAMETERS    : 
 *
 */
function getDeviceName(){
	var ObjectPath = glblDevMenImg;
	if(globalInfoType == "JSON"){
    	var devices = getDevicesNodeJSON();
		var devicesArr = getDevicesNodeJSON();
    }
    	var devices =devicesArr;
		for(var a=0; a<devices.length; a++){
			if(devices[a].Status.toLowerCase() == ""){
				alerts("Please commit your device first.");
				return "error, device not committed.";
			}
		}
    	
    for(var item=0; item<devices.length; item++){
        if(devices[item].ObjectPath == glblDevMenImg){
            DevName = devices[item].DeviceName;
            break;
        }
    }
    return DevName;
}
/*
 *
 *  FUNCTION NAME : showDeviceLogs
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : January 8, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : get Device Logs
 *  PARAMETERS    : 
 *
 */
function showDeviceLogs(){
	var deviceName=getDeviceName();
	if(deviceName =="error, device not committed."){
		return;
	}
	if(globalDeviceType == "Mobile"){
        loading('show');
    }
//    var query ="resourceID="+window['variable' + dynamicResourceId[pageCanvas] ]+"^configname="+Name+"^devicename="+HostName+"^type=devicelogs";
	  var query = '{"QUERY": [{"resourceID": "'+window['variable' + dynamicResourceId[pageCanvas] ]+'", "configname": "'+window['variableConfigName'+pageCanvas]+'", "devicename": "'+HostName+'", "type": "devicelogs"}]}';

	var url = getURL("RM", "JSON");
    var action = "getlogs";
	$.ajax({
        url: url,
        data: {
            "action":action,
            "query":query,
        },
        dataType: 'html',
        method: 'POST',
        proccessData: false,
        async:false,
        success: function(data) {
			if(globalDeviceType == "Mobile"){
        		loading('hide');
		    }
			$("#devicelogsID").html(data);
		}
    });
}
/*
 *
 *  FUNCTION NAME : showLinkLogs
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : Feb. 24,2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : get Link Logs
 *  PARAMETERS    : 
 *
 */
function showLinkLogs(){
	if(globalInfoType == "JSON"){
    	var devices = getDevicesNodeJSON();
		var devicesArrAC = getDevicesNodeJSON();
    }

	if(devicesArrAC.length > 0){
		alerts("Please commit your device first.");
		return;
	}
//    var query ="confname="+Name+"`resID="+window['variable' + dynamicResourceId[pageCanvas] ]+"`devname="+deviceName;
	var query = '{"QUERY": [{"confname": "'+Name+'", "resID": "'+window['variable' + dynamicResourceId[pageCanvas]]+'", "devname": "'+deviceName+'"}]}';
	var url = getURL("RM", "JSON");
	if(globalDeviceType == "Mobile"){
        loading('show');
    }else{
//		ajaxLoader('show', 'Processing Information...');
	}
    var action = "LinkLogs";
	$.ajax({
        url: url,
        data: {
            "action":action,
            "query":query,
        },
        dataType: 'html',
        method: 'POST',
        proccessData: false,
        async:false,
        success: function(data) {
			if(globalDeviceType == "Mobile"){
        		loading('hide');
		    }else{
//				ajaxLoader('hide');
			}
			if(globalDeviceType!="Mobile"){
				$("#devicelogsID").html(data);
			}
        }
    });
}


/*
 *
 *  FUNCTION NAME : showConnectivityLogs
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : January 9, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : get Connectivity logs
 *  PARAMETERS    : 
 *
 */
function showConnectivityLogs(){
//    var query ="resourceID="+window['variable' + dynamicResourceId[pageCanvas] ]+"^configname="+Name+"^devicename="+HostName+"^type=devicelogs";
	var query = '{"QUERY": [{"resourceID": "'+window['variable' + dynamicResourceId[pageCanvas]]+'", "configname": "'+window['variableConfigName'+pageCanvas]+'", "devicename": "'+window['variableHostName'+pageCanvas]+'", "type": "connectivitylogs"}]}';
	var url = getURL("RM", "JSON");
    var action = "getlogs";
	if(globalDeviceType == "Mobile"){
        loading('show');
    }
	$.ajax({
        url: url,
        data: {
            "action":action,
            "query":query,
        },
        dataType: 'html',
        method: 'POST',
        proccessData: false,
        async:false,
        success: function(data) {
			if(globalDeviceType == "Mobile"){
        		loading('hide');
		    }
			var dat = data.replace(/'/g,'"');			
			var data = $.parseJSON(dat);
			var result = data.RESULT[0].Result;
			if(globalDeviceType != "Mobile"){
				if(result==0)	{
					result = "#============Connectivity logs has no record yet.============#";
					$("#connectivitylogsID").html(result);
				}
				else{
					$("#connectivitylogsID").html(result);
				}
			}
        }
    });
}
/*
 *
 *  FUNCTION NAME : showLinkSanityLogs
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : January 9, 2014
 *  MODIFIED BY   : Anna Marie Paulo
 *  REVISION DATE : February 24, 2014
 *  REVISION #    :
 *  DESCRIPTION   : get link sanity logs
 *  PARAMETERS    : 
 *
 */
function showLinkSanityLogs(){
//    var query ="resourceID="+window['variable' + dynamicResourceId[pageCanvas] ]+"^configname="+Name+"^devicename="+HostName+"^type=devicelogs";
 	var query = '{"QUERY": [{"resourceID": "'+window['variable' + dynamicResourceId[pageCanvas]]+'", "configname": "'+window['variableConfigName'+pageCanvas]+'", "devicename": "'+window['variableHostName'+pageCanvas]+'", "type": "linksanitylogs"}]}';
	var url = getURL("RM", "JSON");
    var action = "getlogs";
	if(globalDeviceType == "Mobile"){
        loading('show');
    }
	$.ajax({
        url: url,
        data: {
            "action":action,
            "query":query,
        },
        dataType: 'html',
        method: 'POST',
        proccessData: false,
        async:false,
        success: function(data) {
			if(globalDeviceType == "Mobile"){
        		loading('hide');
			}
			var dat = data.replace(/'/g,'"');
			var data = $.parseJSON(dat);
			var result = data.RESULT[0].Result;
			if(globalDeviceType != "Mobile"){
				if(result==0)	{
					result="#=========Link Sanity logs has no record yet.============#";
					$("#linksanitylogsID").html(result);
				}
				else{
					$("#connectivitylogsID").html(result);
				}
			}
		}
    });
}
/*
 *
 *  FUNCTION NAME : checkProcessExecuted
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 20, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    :
 *  DESCRIPTION   : check process executed
 *  PARAMETERS    : data 
 *
 */
var result2;
function checkProcessExecuted(data,flag){
	result2 = data;
	var resultData = data.RESULT[0].Return;
	resultData = resultData.toString();
	if(globalDeviceType == "Mobile"){
		if(resultData == "1"){
    	    removespecificconfig();
			window['variable' + dynamicResourceId[pageCanvas] ] = "";
			if(flag != true){
				if(window['variable' + dynamicTopology[pageCanvas] ] != "" && window['variable' + dynamicTopology[pageCanvas] ] != undefined){
					var mydata = window['variable' + dynamicTopology[pageCanvas] ];
					if(mydata){
				    	getDataFromJSON(mydata);
					}
				}else{
					setJSONData();
				}
				if(globalMAINCONFIG[pageCanvas] != null && globalMAINCONFIG[pageCanvas] != undefined){
					globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Interval = "";
				    globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Iteration = "";
				    globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DateTIME = "";
		    		globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ReservationType = "";
			    	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Offset = "";
					createConfigName();
				}
			}
			window['variable' + dynamicOtherUser[pageCanvas]]="";;
			drawImage();
			error("Process Completed","Notification");
		}else if(resultData == "0" || result == ""){
			error("Cancel Failed.","Notification");
		}else if(resultData == "-1"){
			error("DPS is down.","Notification");
		}else if(resultData == "databasetimeout"){
			error("Cannot continue the process.\n Unable to connect to the database","Notification");
		}else if(resultData.match(/Alert/gi) != null){
			error(resultData,"Notification");
		}
	}else{
		if(resultData == "1"){
    	    removespecificconfig();
			window['variable' + dynamicResourceId[pageCanvas] ] = "";
			if(flag != true){
				var mydata = window['variable' + dynamicTopology[pageCanvas] ];
				if(mydata){
			    	getDataFromJSON(mydata);
				}
				if(globalMAINCONFIG[pageCanvas] != null && globalMAINCONFIG[pageCanvas] != undefined){
					globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Interval = "";
				    globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Iteration = "";
				    globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DateTIME = "";
		    		globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ReservationType = "";
			    	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Offset = "";
					createConfigName();
				}
			}
			window['variable' + dynamicOtherUser[pageCanvas]]="";;
			drawImage();
			alerts("Process Completed","Notification");
		}else if(resultData == "0" || resultData == ""){
			alerts("Cancel Failed.","Notification");
		}else if(resultData == "-1"){
			alerts("DPS is down.","Notification");
		}else if(resultData == "databasetimeout"){
			alerts("Cannot continue the process.\n Unable to connect to the database","Notification");
		}else if(resultData.match(/Alert/gi) != null){
			alerts(resultData,"Notification");
		}

	}
}
/*
 *
 *  FUNCTION NAME : commitTopology
 *  AUTHOR        : Juvindle C Tina
 *  DATE          :
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    :
 *  DESCRIPTION   : commit topology
 *  PARAMETERS    : 
 *
 */
function commitTopology(){
    checkLCArray=[];
    if(window['variable' + dynamicResourceId[pageCanvas] ] != "" && window['variable' + dynamicResourceId[pageCanvas] ] != undefined && window['variable' + dynamicResourceId[pageCanvas] ] != null){
        commitOptionsOk();
        if(globalInfoType == "JSON"){
            modifyMainConfigJSON();
            setTimeout(function(){
                var myXml2 = getStringJSON(globalMAINCONFIG[pageCanvas]);
                var myXml = myXml2.replace(/"/g,"'");
                sendQueryToRM("Check",myXml);
            },350);
        }else{
            var myXml = getXmlData();
            sendQueryToRM("Check",myXml);
        }
    }else{
        setTimeout(function(){
            $("#committopology").removeClass('animated pulse');
            $.mobile.changePage($('#commitPop'),{
                transition: "pop"
            });
            populateCombo();
            commitOptionsOk();
        },1500);
    }
}
/*
 *
 *  FUNCTION NAME : showSanityResTab
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          :
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function showSanityResTab(){
	if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DeviceSanity.toString() == "true"){
		sanityQuery2('deviceSanity');
		autoTriggerTab = true;
	}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity.toString() == "true"){
		sanityQuery2('accessSanity');
		autoTriggerTab = true;
	}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString() == "true"){
		sanityQuery2('connectivitiy');
		autoTriggerTab = true;
	}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "true"){
		sanityQuery2('linksanity');
		autoTriggerTab = true;
	}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "true"){
		sanityQuery2('enableint');
		autoTriggerTab = true;
	}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "true"){
		sanityQuery2('loadImage');
		autoTriggerTab = true;
	}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "true"){
		sanityQuery2('loadConfig');
		autoTriggerTab = true;
	}
}


/*
 *
 *  FUNCTION NAME : getMiniModelImage 
 *  AUTHOR        : James Turignan
 *  DATE          : March 28, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : source the img for the side bar menu when selecting drag and drop
 *  PARAMETERS    : model
 *
 */

function getMiniModelImage(model,type){
	var imageObj = new Image();
	var retImgObj = function (){
		if(model.match(/asr1/gi) != null || model.match(/isr/gi) != null || model.match(/ios/gi) != null || model.match(/sword/gi) != null || model.match(/dagger/gi) != null || model.match(/utah/gi) != null || model.match(/junos/gi) != null || model.match(/ciscoxe/gi) != null) {
			imageObj.src = dir+"/img/model_icons/25px/qfp_bfcommit_45px.png";
		}else if(model.match(/asr9/gi) != null || model.match(/ciscoasr/gi) != null  || model.match(/ciscoxr/gi) != null ){
	    	imageObj.src = dir+"/img/model_icons/25px/juniper_45px.png";
		}else if(model.match(/124/gi) != null || model.match(/1200/gi) != null || model.match(/128/gi) != null || model.match(/ciscogsr/gi) != null ){
			imageObj.src = dir+"/img/model_icons/25px/GSR_Vivid_45px.png";
		}else if(model.match(/65/gi) != null){
			imageObj.src = dir+"/img/model_icons/25px/6500catalyst_45px_bfcommit.png";
	    }else if(model.match(/760/gi) != null){
	        imageObj.src = dir+"/img/model_icons/25px/7600_45px.png";
	    }else if(model.match(/ix/gi) != null || model.match(/olm/gi) != null || model =="3500" || model.match(/anue/gi) != null || model.match(/breaking/gi) != null || model.match(/xm/gi) != null || model.match(/lsm/gi) != null ){
			imageObj.src = dir+"/img/model_icons/25px/ixia_45px.png";
	    }else if(type == 'connect' && model == 'any'){
			imageObj.src = dir+"/img/model_icons/25px/f-optics_45px.png";

		}else if(type == 'connect' && model == 'direct' ){
			imageObj.src = dir+"/img/model_icons/25px/f-optics_DC_45px.png";
		}else{
			imageObj.src = dir+"/img/model_icons/25px/cisco_vivid_blue_45px.png";
		}
		return imageObj;
	}

	


	return retImgObj();
}

