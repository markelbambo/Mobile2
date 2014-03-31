
/*
var nzoom ="";
$(document).on('dblclick','#Magnify', function(){
	if (zoomButtonStatus == "inactive")
		return;

	if (zoomInOutSelected == ""){
		zoomInOutSelected = "zoomin";
		$("#configContent0").css("cursor","url("+dir+"/img/zoomin.png) 10 18,auto");
	}else if (zoomInOutSelected =="zoomin"){
		zoomInOutSelected = "zoomout";
		$("#configContent0").css("cursor","url("+dir+"/img/zoomout.png) 10 18,auto");
	}else if (zoomInOutSelected == "zoomout"){
		zoomInOutSelected = "default";
		$("#configContent0").css("cursor","alias");
	}

});
*/
var zoomInOutSelected = "zoomin";
$(document).on('click','#Magnify', function(){
	addEvent2History("Click Magnify"); //add event to history
//	if(zoomButtonStatus =="inactive"){
//		zoomButtonStatus = "active";
		if (zoomInOutSelected == "default"){
			zoomInOutSelected ="zoomin";
			zoomButtonStatus = "active";
			$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/zoomin.png) 10 18,auto");
			$("#Magnify").attr("title","Zoom IN");
			$("#Magnify a").empty().append("<img src='img/zoomin-b.png' class='imgReflect'>");
		}else if (zoomInOutSelected == "zoomin"){
			zoomInOutSelected ="zoomout";
			zoomButtonStatus = "active";
			$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/zoomout.png) 10 18,auto");
			$("#Magnify a").empty().append("<img src='img/zoomout-b.png' class='imgReflect'>");
			$("#Magnify").attr("title","Zoom OUT");
		}else if (zoomInOutSelected == "zoomout"){
			zoomInOutSelected = "default";
			zoomButtonStatus = "active";
			$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/zoomdefault.png) 10 18,auto");
			$("#Magnify a").empty().append("<img src='img/mainNav/magnify_default.png' class='imgReflect'>");
			$("#Magnify").attr("title","Zoom DEFAULT");
		}
/*	}else{
		$("#configContent0").css("cursor","default");
		$("#Magnify").attr("title","Zoom : INACTIVE");
		zoomButtonStatus = "inactive";
	}
*/

});
/*
 *
 *  FUNCTION NAME : checkInputLeave
 *  AUTHOR        : Krisfen G. Ducao 
 *  DATE          : March 30, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkInputLeave(ths){
	var str = $(ths).val();
	var id = $(ths).attr('id');
	var vlan = str.split(",");
	var value = [];
	console.log(ths);
	for(var a=0;a<vlan.length;a++){	
		console.log("vlan",vlan[a]);
		if (vlan[a]>4094){
			alerts("Input cannot be greater than 4094")
			$("#"+id).val(value);
			console.log("ID",id);	
			return 0;
		}
		value.push(vlan[a]);
	}

}
/*
 *
 *  FUNCTION NAME : checkInputReservedVlan
 *  AUTHOR        : Krisfen G. Ducao 
 *  DATE          : March 30, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkInputReservedVlan(evt,ths){
	evt = (evt) ? evt : window.event;
	var str = "";var vlan = "";
	var charCode = (evt.which) ? evt.which : evt.keyCode;
    var asciiCode = String.fromCharCode(charCode);
	var value = [];
	if (charCode==44){
		str = $(ths).val();
		//console.log('comma');
		//console.log('str',str);
		vlan = str.split(",");
		for(var a=0;a<vlan.length;a++){
			if (vlan[a]>4094){
				alerts("Input cannot be greater than 4094")
				var id = $(ths).id
				$("#"+id).val(value);
				return false;
			}
			value.push(vlan[a]);
		}
		return true;
	}
	if (charCode >= 48 && charCode <=57 ) {
		return true;
	}
	return false;

}
/*
 * 
 *  FUNCTION NAME : error
 *  AUTHOR        : Apple Kem
 *  DATE          : February 27, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : popUp for warning message with Ok Button
 *  PARAMETERS    : msg,header
 * 
 */
function error(msg,header,execFunc) {
	$(".ui-popup").popup("close");
	if(globalDeviceType == "Mobile"){
		$('#errorPromptHeader').empty().append(header);
		$('#errorPromptBody').empty().append(msg);
	}else{
		$('#errordialogheader').empty().append(header);
		$('#errordialogbody').empty().append(msg);
	}
	if(globalDeviceType == "Mobile"){
		$('#errorPrompt').popup( {create: function(){}});
		setTimeout(function(){
	  		$('#errorPrompt').show().popup("open");
			$(document).on('click','#errorPromptOk', function(){
				if(execFunc!=undefined){
       				eval(execFunc);
					execFunc = "";
       			}
				$('#errorPrompt').popup("close").hide();
			});
		},200);
	}else{
		$( "#errordialog" ).dialog({
			modal: true,
			autoResize:true,
			width: 400,
			height: 200,
		});		
		$('#errordialog').dialog("open");
	}
	if(globalDeviceType != "Mobile"){
		$(document).on('click','#errordialogtOk', function(){
			$('#errordialog').dialog('destroy');
		});
	}
}

/*
 * 
 *  FUNCTION NAME : confirmation
 *  AUTHOR        : Apple Kem
 *  DATE          : February 27, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : confirmation with yes or no button
 *  PARAMETERS    : msg,header,execFunc
 * 
 */
function confirmation(msg,header,execFunc,doCancel, forCancel) {
	$(".ui-popup").popup("close");
	setTimeout(function(){
		if(globalDeviceType == "Mobile"){			
			if(forCancel == true){
				$("#cancelResCheckbox").show();
			}else{
				$("#cancelResCheckbox").hide();
			}
			$('#confirmationHeader').empty().append(header);
			$('#confirmationBody').empty().append(msg);
			$('#confirmation').popup( {create: function(){ }});	
			setTimeout(function(){
	    	    $('#confirmation').show().popup("open");	
				$(document).on('click','#confirmYes', function(){
					$('#confirmation').popup('close').hide();
					if(execFunc){
						eval(execFunc);
						execFunc = "";
					}
					if($("#clearCanvasCancelPrompt").is(":checked") == true){
						clearCanvas();
					}
				});
				$(document).on('click','#confirmNo', function(){
					$('#confirmation').popup("close").hide();
					if(doCancel){
						eval(doCancel);
						doCancel = "";
					}
				});
			},200);
		}else{
			$('#confirmationHeaderdialog').empty().append(header);
			$('#confirmationBodydialog').empty().append(msg);
			$( "#confirmationdialog" ).dialog({
				modal: true,
				autoResize:true,
				width: 400,
				height: 200,
			});		
			$('#confirmationdialog').dialog("open");
		}
		if(globalDeviceType != "Mobile"){	
			$(document).on('click','#confirmdialogYes', function(){
				$('#confirmationdialog').dialog('destroy');
				if(execFunc){
					eval(execFunc);
					execFunc = "";
				}
			});
			$(document).on('click','#confirmdialogNo', function(){
				$('#confirmationdialog').dialog('destroy');
			});
		}
	},200);
}
/*
 *
 *  FUNCTION NAME : closeDeviceTypePopUp 
 *  AUTHOR        : Krisfen G Ducao
 *  DATE          : March 9, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : close popup
 *  PARAMETERS    : 
 *
 */
function closeDeviceTypePopUp(){
	$('#devicetypePopUp').dialog('destroy');
}
/*
 *
 *  FUNCTION NAME : closeDeviceTypePopUp 
 *  AUTHOR        : Krisfen G Ducao
 *  DATE          : March 9, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : close popup
 *  PARAMETERS    : 
 *
 */
function newPopUPCancel(pop){	
	if(pop=="newdev"){
		$('#newdevicePopUp').empty().dialog('destroy');
	}else if(pop=="newtest"){
		$('#newtesttolPopUp').empty().dialog('destroy');
	}else{
		$('#newserverPopup').empty().dialog('destroy');
	}
}

function newDeviceAutoDSave(opt){
	if(!opt){return;}
	if(!gatherDataAutoD(opt)){return;}
	checkDeviceInDbAutoD();
}

/*
 *
 *  FUNCTION NAME : closeDeviceTypePopUp 
 *  AUTHOR        : Krisfen G Ducao
 *  DATE          : March 9, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : close popup
 *  PARAMETERS    : 
 *
 */
function okdevicetype(){	
	$('#devicetypePopUp').dialog('destroy');
	$('#dropdownip').attr("disabled",false);
	$('#ipaddress').attr("disabled",false);
	//$('#portcheckbox').attr("disabled",false);
}
/*
 *
 *  FUNCTION NAME : ckIcon 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : click icon on sidebar
 *  PARAMETERS    : src
 */
function clickIcon(src){
    var did =  $(src).attr('did');
	switch(did.toLowerCase()){
		case "device":
			deviceCtr = 1;
			createDevice(src);
		break;
		case "devicelist":
		break;
		case "serverlist":
		break;
		case "testtoollist":
		break;
		case "interface":
			createInterface(src);
        break;
	}
}

/*
 *
 *  FUNCTION NAME : addHistory
 *  AUTHOR        : Rose Anne Dominguez
 *  DATE          :  
 *  MODIFIED BY   : Mark Anthony Elbambo
 *  REVISION DATE : February 27, 2014
 *  REVISION #    : 1
 *  DESCRIPTION   : add message to the history panel
 *  PARAMETERS    : msg
 *  MODIFIED BY   : kmmabignay
 *  REVISION DATE : March 21, 2014
 *  REVISION #    : 2
 *
 */
function addHistory() {
	var history = window['variableHistory'+pageCanvas];
	if(history!=[]){
		var str = "";
		for(var a=0; a<history.length; a++){
	   		str += "<li><a href='#'>"+history[a]+"</a></li>"
		}
   		$("#historyDiv .ulDeco").html(str);
	}
	if($('.ulDeco li').length == 0){
    	$('#clearHistory').hide();
	}else{
		$('#clearHistory').show();
    }
}

/*
 *
 *  FUNCTION NAME : initDialog
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December , 2013
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 */
function initDialog(){
    $( "#testToolList" ).dialog({ create: function( event, ui ) {} });
    $( "#ResourcePop" ).dialog({ create: function( event, ui ) {} });
    $( "#deviceMenuPop" ).dialog({ create: function( event, ui ) {} });
    $( "#commitPop" ).dialog({ create: function( event, ui ) {} });
    $( "#CancelPopup" ).dialog({ create: function( event, ui ) {} });
    $( "#LogsPop" ).dialog({ create: function( event, ui ) {} });
    $( "#debugPopup" ).dialog({ create: function( event, ui ) {} });
    $( "#DeviceConfigStatus" ).dialog({ create: function( event, ui ) {} });
    $( "#StartOfReservation" ).dialog({ create: function( event, ui ) {} });
    $( "#LinkSanity" ).dialog({ create: function( event, ui ) {} });
    $( "#activedeviceConfigpopup" ).dialog({ create: function( event, ui ) {} });

    $( "#OpenConsole" ).dialog({ create: function( event, ui ) {} });
    $( "#configDialog" ).dialog({ create: function( event, ui ) {} });
    $( "#adminDialog" ).dialog({ create: function( event, ui ) {} });
    $( "#pmDialog" ).dialog({ create: function( event, ui ) {} });
    $( "#rmDialog" ).dialog({ create: function( event, ui ) {} });
    $( "#statsDialog" ).dialog({ create: function( event, ui ) {} });
    $( "#ConfigManageDevice" ).dialog({ create: function( event, ui ) {} });
    $("#loadConfig").dialog({ create: function( event, ui ) {} });
    $('#deleteConfig').dialog({ create: function( event, ui ) {} });
    $("#editGridPopup").dialog({ create: function( event, ui ) {} });
    $('#saveConfig').dialog({ create: function( event, ui ) {} });
    $("#deviceConfig").dialog({ create: function( event, ui ) {} });
    $("#autoDisDevConfig").dialog({ create: function( event, ui ) {} });
    $("#newDeviceDialog").dialog({ create: function( event, ui ) {} });
    $("#newTestToolDialog").dialog({ create: function( event, ui ) {} });
    $("#newServerDialog").dialog({ create: function( event, ui ) {} });
    $("#editConfigName").dialog({ create: function( event, ui ) {} });
    $( "#commitOptions" ).dialog({ create: function( event, ui ) {} });
    $("#lineTableDiv").dialog({ create: function( event, ui ) {} });
    $("#flapPopupDiv").dialog({ create: function( event, ui ) {} });
    $("#statsUser").dialog({ create: function( event, ui ) {} });
    $("#StatisticOption").dialog({ create: function( event, ui ) {} });
    $("#NoItemSelected").dialog({ create: function( event, ui ) {} });
    $("#StatisticOption2").dialog({ create: function( event, ui ) {} });
    $("#statsUser").dialog({ create: function( event, ui ) {} });
    $("#StatisticOption").dialog({ create: function( event, ui ) {} });
    //$("#autoDSaveDialog").dialog({ create: function( event, ui ) { } });
	/* FOR ADMINISTRATION PAGE */
    $("#adminAccessPop").dialog({ create: function( event, ui ) {} });
	$("#addUserPopUp").dialog({ create: function( event, ui ) {} });
	$("#startEndReserve").dialog({ create: function( event, ui ) {} });
	$("#startEndReserve").dialog({ create: function( event, ui ) {} });
	$("#PMPopUp").dialog({ create: function( event, ui ) {} });
/*	$("#customPage").dialog({ 
		create: function( event, ui ) {},
	});
	$("#customPage").on("pagehide",function(){
		clearTimeout(initAutoD);
	});*/
}

/*
 *
 *  FUNCTION NAME : deviceSideBar
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : February 27, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : this - icon element click/taphold
 *
 */
function deviceSideBar(thiss){
    $(thiss).addClass('animated bounce');
    var iconId = $(thiss).attr("id");
    setTimeout(function(){
        $("#"+iconId).removeClass('animated bounce');
    },1500);

	createDev = thiss;
    clickIcon(thiss);
    globalFlag = false;
    checkLCArray=[];

}


/*
 *
 *  FUNCTION NAME : connectivitySideBarScripts
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : February 27, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : this - icon element click/taphold
 *
 */
function connectivitySideBarScripts(thiss){
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
    }else{
        error("Please create two or more devices first.","Notification");
        return;
    }
	createLineVar = thiss;
	createDev = "";
    globalFlag = true;
    lineType = $(thiss).attr('linktype');
    lineName = $(thiss).attr('model');
    lineSpeed = $(thiss).attr('speed');
    if(lineSpeed == 40000 || lineSpeed == 100000){
        lineSubChannel = $(thiss).attr('SubChannel');
    }
		
}

function clearCreateLineVar(){
	lineType = "";
    lineName = "";
    lineSpeed = "";
    lineSubChannel = "";
	createLineVar = "";
}

/*
 *
 *  FUNCTION NAME : checkValConfigText
 *  AUTHOR        : Marlo Agapay
 *  DATE          : December 10, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkValConfigText(event){
	var allowedChar = "abcdefghijklmnopqrstiuwxvyzABCDEFGHIJKLMNOPQRSTUVWXYZV1234567890-_";
    var keyCode = event.keyCode;
    var asciiCode = String.fromCharCode(keyCode);

    if (allowedChar.indexOf(asciiCode) == -1){
		if(globalDeviceType!="Mobile"){
	        alerts('Special Characters and spaces  are not Allowed');
		}
        return false;
    } else{
   		return true; 
    }	
}
/*
 *
 *  FUNCTION NAME : PortTestToolTable 
 *  AUTHOR        : James Turingan
 *  DATE          : December 27, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
var checkPortsTTList = [];
function PortTestToolTable(){
	globalFlag = false;
	var checkType=[];
	checkLCArray=[];
	var opStr='';
//	var url = "/cgi-bin/Final/AutoCompletePythonCGI/FastQueryCgi.py"
	var query = "{'QUERY':[{'Ip':'"+HostName+"','user':'"+globalUserName+"'}]}";
//	var url = "https://"+CURRENT_IP+url;
	var url = getURL('ConfigEditor2',"JSON");	
	var action = "gettesttoolports";
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
			var mydata = data;
			if(globalInfoType == "XML"){
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString( mydata , "text/xml" );
				var row = xmlDoc.getElementsByTagName('PORT');
			}else{
				var dat = data.replace(/'/g,'"');
			    var dat2 = $.parseJSON(dat);
			    var row = dat2.MAINCONFIG[0].PORT;

			}
			var html =''
			var ttype='';
			var btns='';
			
			checkPortTestToolList(row,html,checkType,opStr);
			$(".trPortTestTool").on("click",function(){
				if($(this).hasClass('highlight') == false){
					var portname =$(this).attr('portname');
					var did = $(this).attr('did');
					if(!$('#'+did).is(':checked')){
						$('#'+did).prop('checked',true);
					}
					$(this).addClass('highlight');		
					for(var i = 0; i < testToolObj.length; i++){
						if(HostName == testToolObj[i].DeviceName){
							testToolObj[i].Ports.push($(this).attr('portname'));
							checkPortsTTList.push($(this).attr('portname'));
						}

					}
				}else{
					$(this).removeClass('highlight');
					removeObj($(this).attr('portname'),'port');
					var portname =$(this).attr('portname');
					$('#'+portname).prop('checked', false);
					if(checkPortsTTList.indexOf($(this).attr('portname')) != -1){
						var indx = checkPortsTTList.indexOf($(this).attr('portname'));
						checkPortsTTList.splice(indx,1);	

					}
				}
			});
		}

	});
}
/*
 *
 *  FUNCTION NAME : checkPortTestToolList 
 *  AUTHOR        : James Turingan
 *  DATE          : December 28, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkPortTestToolList(row,html,checkType,opStr){
	var ttype='';
	var porttype='';
	for(var a =0; a< row.length; a++){
		if(globalInfoType == "XML"){
			ttype = row[a].getAttribute('ConnectivityType');
			porttype = row[a].getAttribute('Type');
			var linc = row[a].getAttribute('License');
			var portsname = row[a].getAttribute('Ports');
		}else{
			ttype = row[a].ConnectivityType;
			porttype = row[a].Type;
			var linc = row[a].License;
			var portsname = row[a].Ports;
		}
		if(checkType.indexOf(ttype) == -1){
			checkType.push(ttype);
			if(a == 0){
				opStr += "<option value='"+ttype+"' selected >"+ttype+"</option>";
			}else{
				opStr += "<option value='"+ttype+"'>"+ttype+"</option>";

			}
		}
		
		if(checkPortsTTList.indexOf(row[a].Ports) == -1){
			if(globalInfoType == "XML"){
				html += "<tr class='trPortTestTool "+tableClass+" ' ";
				html += "portname='"+row[a].getAttribute('Ports')+"' ";
				html += "did='portsid"+a+"' ";
				html+= ">";
			}else{
				html += "<tr class='trPortTestTool "+tableClass+" ' ";
				html += "portname='"+row[a].Ports+"' ";
				html += "did='portsid"+a+"' ";
				html+= ">";
			}
			if(globalDeviceType != "Mobile"){
				if(globalInfoType == "XML"){
					html += "<td><input type='checkbox' id='portsid"+a+"' value='"+row[a].getAttribute('Ports')+"' onclick='' /></td>";
				}else{
					html += "<td><input type='checkbox' id='portsid"+a+"' value='"+row[a].Ports+"' onclick='' /></td>";
				}
			}
			if(porttype == "fusion"){	
				if(linc == "true"){
//					html += "<td class=''>"+row[a].getAttribute('Ports')+"("+porttype+",licensedv)</td>";
					if(globalInfoType == "XML"){
						html += "<td class='toolTip' did ='td"+a+"port' >"+row[a].getAttribute('Ports')+"("+porttype+",licensed)<div class='tableToolTip' id='divtoolTip"+a+"port' style='display:none;'><ul>";
					}else{
						html += "<td class='toolTip' did ='td"+a+"port' >"+row[a].Ports+"("+porttype+",licensed)<div class='tableToolTip' id='divtoolTip"+a+"port' style='display:none;'><ul>";


					}
					html += getToolTip(row[a]);
					html +="</ul></div></td>";
				}else{
					if(globalInfoType == "XML"){
						html += "<td class='toolTip' did ='td"+a+"port' >"+row[a].getAttribute('Ports')+"("+porttype+"<div class='tableToolTip' id='divtoolTip"+a+"port' style='display:none;'><ul>";
					}else{
						html += "<td class='toolTip' did ='td"+a+"port' >"+row[a].Ports+"("+porttype+"<div class='tableToolTip' id='divtoolTip"+a+"port' style='display:none;'><ul>";

					}
					html += getToolTip(row[a]);
					html +="</ul></div></td>";

				}
			}else{
				if(globalInfoType == "XML"){
					html += "<td class='toolTip' did ='td"+a+"port' >"+row[a].getAttribute('Ports')+"<div class='tableToolTip' id='divtoolTip"+a+"port' style='display:none;'><ul>";
				}else{
					html += "<td class='toolTip' did ='td"+a+"port' >"+row[a].Ports+"<div class='tableToolTip' id='divtoolTip"+a+"port' style='display:none;'><ul>";

				}
				html += getToolTip(row[a],'port');
				html +="</ul></div></td>";
			}
			if(globalInfoType == "XML"){
				html += "<td>"+row[a].getAttribute('Speed')+"</td>";
				html += "<td class='conntype'>"+row[a].getAttribute('ConnectivityType')+"</td>";
				html += "<td>"+row[a].getAttribute('PartnerPort')+"</td>";
				html += "<td>"+row[a].getAttribute('Status')+"</td>";
				html += "<td>"+row[a].getAttribute('User')+"</td>";
			}else{
				html += "<td>"+row[a].Speed+"</td>";
				html += "<td class='conntype'>"+row[a].ConnectivityType+"</td>";
				html += "<td>"+row[a].PartnerPort+"</td>";
				html += "<td>"+row[a].Status+"</td>";
				html += "<td>"+row[a].User+"</td>";
			}
			html +="</tr>";
		}
		
	}
	$("#PortTestTool-table > tbody").empty().append(html);	
	$('#portTypeTT').empty().append(opStr);
	hoverTable();
	var myselect = $("#portTypeTT");
	myselect[0].selectedIndex =0;
	if(globalDeviceType == "Mobile"){
		myselect.selectmenu("refresh");
	}

	setTimeout(function(){
		connTypeFilter();
	},1000);
}



/*
 *
 *  FUNCTION NAME : TestToolListTable 
 *  AUTHOR        : James Turingan
 *  DATE          : December 27, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
var checkDevNameTT = [];
function TestToolListTable(load){
	globalFlag = false;
	checkLCArray=[];
	imgXPos = 152;
	imgYPos = 24;

	var query = "{'QUERY':[{'devtype':'testtool','manufacturer':'','user':'"+globalUserName+"','domainname':'"+window['variable' + dynamicDomain[pageCanvas] ]+"','zone':'','imported':'0','hostname':''}]}";
	var url = getURL("ConfigEditor2","JSON");
//	var url = "https://"+CURRENT_IP+url;
	var action = "devicelist";
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
				loading("hide");
			}
			var mydata = data;
			if(globalInfoType == "XML"){
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString( mydata , "text/xml" );
				var root = xmlDoc.getElementsByTagName('root'); 
				var row = xmlDoc.getElementsByTagName('DEVICES');
			}else{
//				error("No functionalities to handle json for this yet.","Notification","toConfig();");
				var dat = data.replace(/'/g,'"');
			    var dat2 = $.parseJSON(dat);
			    var row = dat2.MAINCONFIG[0].DEVICES;
//				var mConfig = dat2.MAINCONFIG;
//				return;
			}
			var html ='',startRes='',endRes='';
			var btns='';
			for(var a =0; a< row.length; a++){
				if(a % 2 == 0){
					tableClass = 'alt';
				}else{
					tableClass = '';
				}
				if(globalInfoType == "XML"){
					html += "<tr class='trManageTestTool "+tableClass+"' ";
					html += "devname='"+row[a].getAttribute('DeviceName')+"' ";
					html += "DeviceId='"+row[a].getAttribute('DeviceId')+"' ";
					html+= ">";
					if(globalDeviceType != "Mobile"){
						html += "<td><input type='checkbox' id='"+row[a].getAttribute('DeviceId')+"' value='"+row[a].getAttribute('DeviceId')+"' onclick='' /></td>";
					}
					html += "<td class='toolTip' did ='td"+a+"' >"+row[a].getAttribute('DeviceName')+"<div class='tableToolTip' id='divtoolTip"+a+"' style='display:none;'><ul>";
					html += getToolTip(row[a]);	
					html +="</ul></div></td>";
					html += "<td>"+row[a].getAttribute('ManagementIp')+"</td>";
					html += "<td>"+row[a].getAttribute('ConsoleIp')+"</td>";
					html += "<td>"+row[a].getAttribute('Manufacturer')+"</td>";
					html += "<td>"+row[a].getAttribute('Model')+"</td>";
					html += "<td>"+row[a].getAttribute('Status')+"</td>";
					html += "<td>"+row[a].getAttribute('UserName')+"</td>";
					html += "<td>"+row[a].getAttribute('RemainingTime')+"</td>";
					html += "<td>"+row[a].getAttribute('AvailablePort')+"</td>";
					html += "<td>"+row[a].getAttribute('PortType')+"</td>";
					html +="</tr>";		
				}else{
					html += "<tr class='trManageTestTool "+tableClass+"' ";
					html += "devname='"+row[a].HostName+"' ";
					html += "DeviceId='"+row[a].DeviceId+"' ";
					html+= ">";
					if(globalDeviceType != "Mobile"){
						html += "<td><input type='checkbox' id='"+row[a].DeviceId+"' value='"+row[a].DeviceId+"' onclick='' /></td>";
					}
		            html += "<td class='toolTip' did ='td"+a+"' >"+row[a].HostName+"<div class='tableToolTip' id='divtoolTip"+a+"' style='display:none;'><ul>";
		            html += getToolTip(row[a]);
		            html +="</ul></div></td>";
    		        html += "<td>"+row[a].ManagementIp+"</td>";
		            html += "<td>"+row[a].ConsoleIp+"</td>";
		            html += "<td>"+row[a].Manufacturer+"</td>";
        		    html += "<td>"+row[a].Model+"</td>";
		            html += "<td>"+row[a].Status+"</td>";
		            html += "<td>"+row[a].UserName+"</td>";
		            html += "<td>"+row[a].RemainingTime+"</td>";
	    	        html += "<td>"+row[a].AvailablePort+"</td>";
		            html += "<td>"+row[a].PortType+"</td>";
					html +="</tr>";		
				}
			}
			$("#manageTestToolTable > tbody").empty().append(html);
			$(".trManageTestTool").on("click",function(){
				if($(this).hasClass('highlight') == false){
					if(globalDeviceType == "Mobile"){
						loading("show");
						$.mobile.changePage("pages/ConfigEditor/PortTestTool.html", {
							transition: "flow",
							reverse: false,
							changeHash: true
						});
					}
					var devId= $(this).attr('DeviceId');
					HostName = $(this).attr('devname');
					if(!$('#'+devId).is(':checked')){
						$('#'+devId).prop('checked',true);
					}

					$(this).addClass('highlight');
					if(checkDevNameTT.indexOf(HostName) == -1){	
						checkDevNameTT.push(HostName);
						testToolObj.push({
							DeviceName: HostName,
							Ports: [],
							Flag: 0
						});				
					}

					portTablePopUp();
				}else{
					$(this).removeClass('highlight');
					removeObj($(this).attr('devname'));
					var devId= $(this).attr('DeviceId');
					if(checkDevNameTT.indexOf(HostName) != -1){
						var i = checkDevNameTT.indexOf($(this).attr('devname'));
						checkDevNameTT.splice(i,1);
					}
					$('#'+devId).prop('checked', false);
				}
			});

			hoverTable();

		}
	 });
	filterManageDevice('testTool');

}
/*
 *
 *  FUNCTION NAME : removeObj 
 *  AUTHOR        : James Turingan
 *  DATE          : December 27, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function removeObj(val,type){
	if(type != 'port'){
		for(var i = 0; i < testToolObj.length; i++){
			if(val == testToolObj[i].DeviceName){
				testToolObj.splice(i,1);	
			}

		}
	}else{
		for(var i = 0; i < testToolObj.length; i++){
			if(HostName == testToolObj[i].DeviceName){
				for(var x = 0 ; x < testToolObj[i].Ports.length; x++){
					testToolObj[i].Ports.splice(x,1);	
				}
			}

		}

	}

}
/*
 *
 *  FUNCTION NAME : removeObj 
 *  AUTHOR        : James Turingan
 *  DATE          : December 27, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function createTestToolObj(){
	//var url = "/cgi-bin/Final/AutoCompletePythonCGI/FastQueryCgi.py"
//	var url = "/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/getTTPorts.fcgi"
	var query = '';
	for(var i = 0; i < testToolObj.length; i++){
		if(i == 0){
			query = '{"QUERY":[{"Ip":"'+testToolObj[i].DeviceName;
			query += '","PortList":"'+testToolObj[i].Ports;
			query += '","Flag":"'+testToolObj[i].Flag;
		}else{
			query += ',"Ip":"'+testToolObj[i].DeviceName;
			query += '","PortList":"'+testToolObj[i].Ports;
			query += '","Flag":"'+testToolObj[i].Flag;
		}

	}
	query += '"}]}';
//	var url = "https://"+CURRENT_IP+url;
	var url = getURL("ConfigEditor2","JSON");
	var action = "getttports";
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
		dataType: 'html',
		method: 'POST',
		proccessData: false,
		async:false,
		success: function(data) {
			var mydata = data;
			if(globalInfoType == "XML"){
				getDataForDeviceList(mydata);
			}else{
				data = data.replace(/'/g,'"');
				var obj = jQuery.parseJSON(data);
				getDataForDeviceListJSON(obj);
			}

			if(globalDeviceType == "Mobile"){
				loading('hide');
			}else{
				ajaxLoader('hide');
			}

		}
	});
}
/*
 *
 *  FUNCTION NAME : deviceListPopupTable 
 *  AUTHOR        : Marlo Agapay
 *  DATE          : December 10, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
var globalDeviceListLoad="";
var importLocalFlag = [],globalDevListType='tableview';
function deviceListPopupTable(load,tab){
	if(globalDeviceType == "Mobile"){
		loading("show");
	}
	imgXPos = 152;
	imgYPos = 24;
	globalDeviceListLoad = load;
	globalFlag = false;
	checkLCArray=[]
	var hasDevName = getHasDevNameOnArray();
	if (tab == "import"){
		globalDevListTab ='import';
		var query = "{'QUERY':[{'user':'"+globalUserName+"','domainname':'"+window['variable' + dynamicDomain[pageCanvas] ]+"','zone':'','imported':'1','hostname':'"+hasDevName+"'}]}";
	}else{
		globalDevListTab ='local';
		var query = "{'QUERY':[{'user':'"+globalUserName+"','domainname':'"+window['variable' + dynamicDomain[pageCanvas] ]+"','zone':'','imported':'0','hostname':'"+hasDevName+"'}]}";
	}
	var url = getURL("ConfigEditor","JSON");
	var action = "devicelist";
    
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
			data = $.trim(data);
			if (data == "nodevice"){
				if(globalDeviceType == "Mobile"){
					loading("hide");
					$.mobile.changePage($('#configEditorPage'),{
						transition: "pop"
					});
				}
				if(globalDeviceType == "Mobile"){
					error("No Available Device","Notification");
				}else{
					alerts("No Available Device");
				}
				$( "#configPopUp" ).dialog('destroy');
				return;
			}else if (data == "databasetimeout"){
				if(globalDeviceType == "Mobile"){
					loading("hide");
				}
				if(globalDeviceType == "Mobile"){
					alert ("Database Timeout");
				}else{
					alerts ("Database Timeout");
				}

				if(globalDeviceType == "Mobile"){
					$.mobile.changePage($('#configEditorPage'),{
						transition: "pop"
					});
				}
				return;
			}else if (data == ""){
				if(globalDeviceType == "Mobile"){
					loading("hide");
					$.mobile.changePage($('#configEditorPage'),{
						transition: "pop"
					});
					alert ("Database Timeout");
				}else{
					alerts("Database Timeout");	
					$( "#configPopUp" ).dialog('destroy');	
				}
				return;
			}else if(data != "") {
				var condition = checkIfTabAvailable(data);
				if(globalDeviceType == "Mobile"){
					loading("hide");
					if(globalDevListType == "graphical"){
						if((browserInfoObj[0].BrowserName.toLowerCase() == "chrome" && Number(browserInfoObj[0].MajorVersion) > 31) || (browserInfoObj[0].BrowserName.toLowerCase() == "safari" && Number(browserInfoObj[0].MajorVersion)  >=7 && browserInfoObj[0].WebView == false) || (browserInfoObj[0].BrowserName.toLowerCase() == "safari" || browserInfoObj[0].BrowserName.toLowerCase() == "netscape" && Number(browserInfoObj[0].MajorVersion)  >=5 && browserInfoObj[0].WebView == true)){
							setTimeout(function(){
								$("#DevlistGraphical").addClass("ui-btn-active");
							},300);
							appendToDeviceListTable(data,condition,load,tab);
						}else{
							setTimeout(function(){
								$("#DevlistTableView").addClass("ui-btn-active");
							},300);
							appendToDeviceListTable2(data,condition,load,tab);
						}
					}else{
						appendToDeviceListTable2(data,condition,load,tab);
					}
				}else{	
					if(globalDevListType == "graphical"){
						if((browserInfoObj[0].BrowserName.toLowerCase() == "chrome" && Number(browserInfoObj[0].MajorVersion) > 31) || (browserInfoObj[0].BrowserName.toLowerCase() == "safari" && Number(browserInfoObj[0].MajorVersion)  >=7 && browserInfoObj[0].WebView == false) || (browserInfoObj[0].BrowserName.toLowerCase() == "safari" || browserInfoObj[0].BrowserName.toLowerCase() == "netscape" && Number(browserInfoObj[0].MajorVersion)  >=5 && browserInfoObj[0].WebView == true)){
                            appendToDeviceListTable(data,condition,load,tab);
                        }else{
                            appendToDeviceListTable2(data,condition,load,tab);
                        }
                        appendToDeviceListTable(data,condition,load,tab);
                    }else{
                        appendToDeviceListTable2(data,condition,load,tab);
                    }
				}
			}		
		}
	 });
	filterManageDevice();
}

/*
 *
 *  FUNCTION NAME : browserInfo 
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : March 26, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : for getting then browser infos
 *  PARAMETERS    : 
 *
 */
var browserInfoObj=[];
function browserInfo(){
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var	fullVersion  = ''+parseFloat(navigator.appVersion); 
	var majorVersion = parseInt(navigator.appVersion,10);
	var nameOffset,verOffset,ix;

	if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
		browserName = "Opera";
		fullVersion = nAgt.substring(verOffset+6);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
			fullVersion = nAgt.substring(verOffset+8);
	}

	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
		browserName = "Microsoft Internet Explorer";
		fullVersion = nAgt.substring(verOffset+5);
	}

	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
		browserName = "Chrome";
		fullVersion = nAgt.substring(verOffset+7);
	}

	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
		browserName = "Safari";
		fullVersion = nAgt.substring(verOffset+7);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
			fullVersion = nAgt.substring(verOffset+8);
	}

	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
		browserName = "Firefox";
		fullVersion = nAgt.substring(verOffset+8);
	}

	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
          (verOffset=nAgt.lastIndexOf('/')) ) 
	{
		browserName = nAgt.substring(nameOffset,verOffset);
		fullVersion = nAgt.substring(verOffset+1);
		if (browserName.toLowerCase()==browserName.toUpperCase()) {
			browserName = navigator.appName;
		}
	}

	if ((ix=fullVersion.indexOf(";"))!=-1)
		fullVersion=fullVersion.substring(0,ix);
	if ((ix=fullVersion.indexOf(" "))!=-1)
		fullVersion=fullVersion.substring(0,ix);
		majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) {
		fullVersion  = ''+parseFloat(navigator.appVersion); 
		majorVersion = parseInt(navigator.appVersion,10);
	}	

	

    var is_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
    //var is_safari_or_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent);
    browserInfoObj.push({"BrowserName":browserName,"FullVersion":fullVersion,"MajorVersion":majorVersion,"NavigatorAppName":navigator.appName,"NavigatorUserAgent":navigator.userAgent,"WebView":is_uiwebview});
}

/*
 *
 *  FUNCTION NAME : getHasDevNameOnArray
 *  AUTHOR        : Marlo Agapay
 *  DATE          : January 14, 2013
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get all device name to string
 *  PARAMETERS    : 
 *
 */
function getHasDevNameOnArray(){
	var str =[];
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var a=0; a<devices.length; a++){
		if (devices[a].DeviceName!=""){
			var name = devices[a].DeviceName;
			str.push(name);
		}	
	}
	return str;
}
/*
 *
 *  FUNCTION NAME : appendToDeviceListTable
 *  AUTHOR        : Marlo Agapay
 *  DATE          : January 13, 2014
 *  MODIFIED BY   : Mark Anthony O. Elbambo
 *  REVISION DATE : March ,2104
 *  REVISION #    : 2
 *  DESCRIPTION   : for showing the graphical view of device list
 *  PARAMETERS    : data,condition,load, tabSelected
 *	MODIFICATION  : added the carousel
 */
globalSelectedDeviceList= [];
var devListFilterId =[];
var globalDevListRow =[];
var devListObj = [];
function appendToDeviceListTable(data,condition,load, tabSelected){
	$(".arrwImg").show();
	$('#tabsDevlist').tabs();
//    $('#ulDevListTabs').removeAttr("style");
	var mydata = data;
	var html ='',startRes='',endRes='';
	var btns='';
	var deg = 0;
	var InfoType = "JSON";
	if(InfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString( mydata , "text/xml" );
		var row = xmlDoc.getElementsByTagName('DEVICES');
	}else{
		var dat = data.replace(/'/g,'"');
        var dat2 = $.parseJSON(dat);
        var row = dat2.MAINCONFIG[0].DEVICES;
	}

	if(globalDevListRow.length ==0){
		globalDevListRow.push({data:data,condition:condition,load:load, tabSelected:tabSelected});
	}
	if(devListFilterId.length > 0){
		var panelCtr = (row.length - devListFilterId.length);
	}else{
		var panelCtr = row.length;
	}
	var panelSize = 400;
	var degAddtnl = 360/panelCtr;
	var tz = Math.round( ( panelSize / 2 ) / Math.tan( Math.PI / panelCtr ) )+'px';
	if(devListFilterId.length == (row.length -2)){
		tz = '10px';
	}

	if(panelCtr > 50){
		appendToDeviceListTable2(data,condition,load, tabSelected);
//		globalDevListType = "tableview";
//        deviceListPopupTable(globalDeviceListLoad,globalDevListTab);
		if(globalDeviceType == "Mobile"){
			$("#devlistview").hide();
		}
		return;
	}else{
		if(globalDeviceType == "Mobile"){
            $("#devlistview").show();
        }
	}

//	document.getElementById('carousel').setAttribute("style", "-webkit-transform: translateZ(-"+tz+") rotateY(0deg);");
//	document.getElementById('carouselImport').setAttribute("style", "-webkit-transform: translateZ(-"+tz+") rotateY(0deg);");
	html += '<div style="">';
	html += '<section class="container">';	
	html += '<div id="carousel'+condition+'">';
	html += '</div>';
    html += '</section>';
	html += '</div>';
	if (tabSelected == "import" || condition == 'import'){
        document.getElementById('tabImport').innerHTML=html;
		$("#tabImport").show();
        $("#tabLocal").hide();
    }else{
        document.getElementById('tabLocal').innerHTML=html;
		$("#tabImport").hide();
        $("#tabLocal").show();
    }
	document.getElementById('carousel'+condition).setAttribute("style", "-webkit-transform: translateZ(-"+tz+") rotateY(0deg);");
	html ='';
	loop:
	for(var a =0; a< row.length; a++){
			var devId = row[a].DeviceId;
            if(devListFilterId.indexOf(devId) =='-1'){
                if(devListFilterId.length == (row.length -1)){
                    deg = '360';
                    var deg2 = true;
                    var web = '-webkit-transform: rotateY('+deg+'deg) translateZ(none); -moz-transform: rotateY('+deg+'deg) translateZ(none); -o-transform: rotateY('+deg+'deg) translateZ(none); transform: rotateY('+deg+'deg) translateZ(none);';
                }else{
                    var deg2 = false;
                    var web = '-webkit-transform: rotateY('+deg+'deg) translateZ( '+tz+' ); -moz-transform: rotateY('+deg+'deg) translateZ( '+tz+' ); -o-transform: rotateY('+deg+'deg) translateZ( '+tz+' ); transform: rotateY('+deg+'deg) translateZ( '+tz+' );';
                }
                var devName = row[a].HostName;
                var con = checkDeviceIfExist(devName);
                if (con== true){
                    continue loop;
                }
                var imgObj = getModelImage(row[a].Model,true,false);
                var src = imgObj.src;
                if (tabSelected == "import" || condition== 'import'){ var rowspn=13;}else{ var rowspn=11; }
                html += '<figure data-degree="-'+deg+'deg" style="background: hsla('+deg+', 0%, 83%, 0.9 );'+web;
				if (tabSelected != "import" || condition != 'import'){
                    html += 'height:325px;';
                }
				html += '" ';
                html += "LoadType='"+load+"' ";
                html += "DeviceType='"+row[a].DeviceType+"' ";
                html += "DeviceId='"+row[a].DEVICE[0].DeviceId+"' ";
                html += "HostName='"+row[a].HostName+"' ";
                html += "PortType='"+row[a].PortType+"' ";
                html += '>';
				html += '<div style="width: 100%; height: 100%; line-height: 13px;  font-size: 12px;  font-weight: normal; color: black; ">';
                html += '<img src="'+src+'" style="width: 150px;margin: 0 auto;">';
                html += '<table style="text-align:left;min-width: 215px;width: 100%;padding: 0px 20px;margin-top: -10px;">';
                html += "<tr><th>Device ID</th><td style='text-align: left;'>"+row[a].DEVICE[0].DeviceId+"</td>";
				html += "</tr>";

                html += "<tr><th>Device Name</th><td style='text-align: left;'>"+row[a].HostName+"</td></tr>";
                html += "<tr><th>Mgmt. IP</th><td style='text-align: left;'>"+row[a].ManagementIp+"</td></tr>";
                html += "<tr><th>Console IP</th><td style='text-align: left;'>"+row[a].ConsoleIp+"</td></tr>";
                html += "<tr><th>Manufacturer</th><td style='text-align: left;'>"+row[a].Manufacturer+"</td></tr>";
                html += "<tr><th>Model</th><td style='text-align: left;'>"+row[a].Model+"</td></tr>";
				
				html += "<tr><th>Status</th><td style='text-align: left;'>"+row[a].Status+"</td></tr>";
                html += "<tr><th>UserName</th><td style='text-align: left;'>"+row[a].UserName+"</td></tr>";
                html += "<tr><th>Remaining Time</th><td style='text-align: left;'>"+row[a].RemainingTime+"</td></tr>";
                html += "<tr><th>Available Port/s</th><td style='text-align: left;'>"+row[a].AvailablePort+"</td></tr>";
                html += "<tr><th>Port Type</th><td style='text-align: left;'>"+row[a].PortType+"</td></tr></tr>";
                if (tabSelected == "import" || condition== 'import'){
                    html += "<tr><th>Available Day</th></tr><td style='text-align: left;'>"+row[a].AvailabilityDay+"</td></tr>";
                    html += "<tr><th>Available Date</th></tr><td style='text-align: left;'>"+row[a].AvailabilityDate+"</td></tr>";
                    html += "<tr><th>Available Time</th></tr><td style='text-align: left;'>"+row[a].AvailabilityTime+"</td></tr>";
                }
                html += '</table>';
                html += '</div>';
                html += '</figure>';
                deg = deg+degAddtnl;
            }
	}
    setTimeout(function(){
        init();
    },1000);
    if (tabSelected == "import" || condition == 'import'){
		var carousel2 = document.getElementById('carousel'+condition);
		document.getElementById('carousel'+condition).innerHTML=html;
	}else{
		var carousel2 = document.getElementById('carousel'+condition);
		document.getElementById('carousel'+condition).innerHTML=html;
	}
	if(globalDeviceType !="Mobile"){
        $("#configPopUp").dialog( "option", "width", "95%" );
		$("#configPopUp").css({"overflow": "hidden"});
		setTimeout(function(){
			$("#configPopUp").dialog( "option", "height", 600 );
		},300);
//		if(row.length > 30){
//			$("#configPopUp").parent().css({"width":"95%"});
//		}
	}

	var init = function() {
		var carousel = carousel2,//document.getElementById('carousel'),
		arrowButtons = document.querySelectorAll('.arrwImg'),
		panelCount = carousel.children.length,
		transformProp = Modernizr.prefixed('transform'),
		theta = 0,         

		onNavButtonClick = function( event ){
			var increment = parseInt( event.target.getAttribute('data-increment') );
			if(deg2== true ){
				theta += 360;
			}else{
				theta += ( 360 / panelCount ) * increment * -1;
			}
			carousel.style[ transformProp ] = 'translateZ( -'+tz+' ) rotateY(' + theta + 'deg)';
		};
	 
	  	for (var i=0; i < 2; i++) {
			arrowButtons[i].addEventListener( 'click', onNavButtonClick, false);
	  	}
		$("figure").each(function(){
        	$(this).on( "swipeleft", function( evt ) {
				var increment = Math.abs(1);
				swipeCarou(increment);
	        });
    	    $(this).on( "swiperight", function( evt ) {	
				var increment = -Math.abs(1);
				swipeCarou(increment);
        	});
		});
		function swipeCarou(inc){			
			if(deg2== true ){
                theta += 360;
            }else{
                theta += ( 360 / panelCount ) * inc * -1;
            }
            carousel.style[ transformProp ] = 'translateZ( -'+tz+' ) rotateY(' + theta + 'deg)';
		}
	};
	
	$("figure").each(function(){
		var dName = $(this).attr('HostName');
		for(var q=0; q<globalSelectedDeviceList.length; q++){
			if(globalSelectedDeviceList[q] == dName){
				$(this).addClass('highlight');
			}
		}
	 });
	 $("figure").on("click",function(){
		if (load.toLowerCase()=="tooltipdevice" ){
			$('.trManageDevice').each(function(){
				$(this).removeClass('highlight');
			});
			if($(this).hasClass('highlight') == false){
				$(this).addClass('highlight');
				var devName = $(this).attr('HostName');
				if ($.inArray(devName,globalSelectedDeviceList)== -1){
					globalSelectedDeviceList.push(devName);
				}
			}else{
				$(this).removeClass('highlight');
				var devName1 = $(this).attr('HostName');
				for(var a=0; a<globalSelectedDeviceList.length; a++){
					if(globalSelectedDeviceList[a] == devName1){
						globalSelectedDeviceList.splice(a,1);
					}
				}
			}
		}else{
			if($(this).hasClass('highlight') == false){
				$(this).addClass('highlight');
				var devName = $(this).attr('HostName');
				globalSelectedDeviceList.push(devName);
			}else{
				$(this).removeClass('highlight');
				 var devName1 = $(this).attr('HostName');
				 for(var a=0; a<globalSelectedDeviceList.length; a++){
					 if(globalSelectedDeviceList[a] == devName1){
						globalSelectedDeviceList.splice(a,1);
					 }
				 }
			}
		}
		setTimeout(function(){
			fullHubDisEna();	
		},100);
	});
}

/*
 *
 *  FUNCTION NAME : fullHubDisEna
 *  AUTHOR        : Mark Anthony ELbambo
 *  DATE          : March 26, 2014
 *  DESCRIPTION   : for disable/enable of checbox for fullmesh/hub device list
 *  PARAMETERS    : 
 */
function fullHubDisEna(){
	if(globalDeviceType == "Mobile"){
        if(globalSelectedDeviceList.length > 1){
        	$("#hubspokedev").removeAttr("disabled").checkboxradio('enable').checkboxradio("refresh");
            $("#fulmeshdev").removeAttr("disabled").checkboxradio('enable').checkboxradio("refresh");
        }else{
        	$("#hubspokedev").attr("disabled",true).checkboxradio('disable').checkboxradio("refresh");
            $("#fulmeshdev").attr("disabled",true).checkboxradio('disable').checkboxradio("refresh");
        }
		if(globalSelectedDeviceList.length >= 1){
			$("#dlistDone").removeAttr("disabled");
		}else{
			$("#dlistDone").attr("disabled","disabled");
		}
	}else{
    	if(globalSelectedDeviceList.length > 1){
        	$("#cbFull").removeAttr("disabled");
            $("#cbHub").removeAttr("disabled");
        }else{
        	$("#cbFull").removeAttr("checked");
            $("#cbFull").attr("disabled",true);
            $("#cbHub").attr("disabled",true);
            $("#cbHub").removeAttr("checked");
       	}
	}
}

/*
 *
 *  FUNCTION NAME : appendToDeviceListTable2
 *  AUTHOR        : Marlo Agapay
 *  DATE          : January 13, 2014
 *  MODIFIED BY   : Mark  Anthony Elbambo
 *  REVISION DATE : March 0 ,2014
 *  REVISION #    : 2
 *  DESCRIPTION   : for showing table view of device list
 *  PARAMETERS    : data,condition,load, tabSelected
 *	MODIFICATION  : added the carousel
 */
globalSelectedDeviceList= [];
var devListFilterId =[];
var globalDevListRow =[];
function appendToDeviceListTable2(data,condition,load, tabSelected)	{
	var mydata = data;
	var InfoType = "JSON";
	if(InfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString( mydata , "text/xml" );
		var row = xmlDoc.getElementsByTagName('DEVICES');
		var mConfig = xmlDoc.getElementsByTagName('MAINCONFIG');
		importLocalFlag.push(mConfig[0].getAttribute('LocalFlag'),mConfig[0].getAttribute('ImportedFlag'));
	}else{
		var dat = data.replace(/'/g,'"');
        var dat2 = $.parseJSON(dat);
        var row = dat2.MAINCONFIG[0].DEVICES;
		var mConfig = dat2.MAINCONFIG;
		devListObj = $.parseJSON(dat);
		importLocalFlag.push(mConfig[0].LocalFlag,mConfig[0].ImportedFlag);
	}
	var html ='';
	var btns='';

	html += '<div style="overflow:auto;height: 300px;" class = "datagrid">';
	html += '<table data-role="table" id="manageConfigTable'+condition+'" style="width:100%" class="table-stroke ui-body-d ui-shadow ui-responsive" data-column-btn-theme="a" data-column-popup-theme="a" data-mini="true">';
	html += '<thead class="header">';
	html += '<tr class="ui-bar-d">';
	html += '<th><input id="checkAll'+condition+'" class="checkAll" type="checkbox" onclick="selectAll(\'deviceListCheck\')"  /></th>';
	html += '<th data-priority="1">HostName</th>';
	html += '<th data-priority="1">MgmtIp</th>';
	html += '<th data-priority="1">Console IP</th>';
	html += '<th data-priority="1">Manufacturer</th>';
	html += '<th data-priority="1">Model</th>';
	if (tabSelected == "import" || condition== 'import'){
    	html += "<th>Availability Day</td>";
        html += "<th>Availability Date</td>";
        html += "<th>Availability Time</th>";
    }
	html += '<th data-priority="1">Status</th>';	
	html += '<th data-priority="1">User</th>';
	html += '<th data-priority="1">Remaining time</th>';
	html += '<th data-priority="1">Av Ports</th>';
	html += '<th data-priority="1">Connectivity</th>';
	html += '</tr>';
	html += '</thead>';
	html += '<tbody>';
	$(".arrwImg").hide();
	if (tabSelected == "import" || condition == 'import'){
		$("#tabImport").show();
		$("#tabLocal").hide();
        document.getElementById('tabImport').innerHTML=html;
    }else{
		$("#tabImport").hide();
        $("#tabLocal").show();
        document.getElementById('tabLocal').innerHTML=html;
    }
	html ='';	

	loop:
	for(var a =0; a< row.length; a++){
		if(InfoType == "XML"){
			var devName = row[a].getAttribute('DeviceName');	
			if(a % 2 == 0){
					tableClass = 'alt';
			}else{
					tableClass = '';
			}
			var con = checkDeviceIfExist(devName);
			if (con== true){
				continue loop;				
			}
			html += "<tr class='trManageDevice "+tableClass+"' ";
			html += "LoadType='"+load+"' ";
			html += "DeviceType='"+row[a].getAttribute('DeviceType')+"' ";
			html += "DeviceId='"+row[a].getAttribute('DeviceId')+"' ";
			html += "DeviceName='"+row[a].getAttribute('HostName')+"' ";
			html += "PortType='"+row[a].getAttribute('PortType')+"' ";
			html+= ">";
			
			html += "<td><input type='checkbox' id='"+row[a].getattribute('deviceid')+"' devicename='"+row[a].getattribute('hostname')+"' value='"+row[a].getattribute('deviceid')+"' name='devicelistcheck' /></td>";
			html += "<td class='toolTip' did ='td"+a+"' >"+row[a].getAttribute('HostName')+"<div class='tableToolTip' id='divtoolTip"+a+"' style='display:none;'><ul>";
			html += getToolTip(row[a]);
			html +="</ul></div></td>";
	
			html += "<td>"+row[a].getAttribute('ManagementIp')+"</td>";
			html += "<td>"+row[a].getAttribute('ConsoleIp')+"</td>";
			html += "<td>"+row[a].getAttribute('Manufacturer')+"</td>";
			html += "<td>"+row[a].getAttribute('Model')+"</td>";
			if (tabSelected == "import" || condition== 'import'){
				html += "<td>"+row[a].getAttribute('AvailabilityDay')+"</td>";
				html += "<td>"+row[a].getAttribute('AvailabilityDate')+"</td>";
				html += "<td>"+row[a].getAttribute('AvailabilityTime')+"</td>";
			}
			html += "<td>"+row[a].getAttribute('Status')+"</td>";
			html += "<td>"+row[a].getAttribute('UserName')+"</td>";
			html += "<td>"+row[a].getAttribute('RemainingTime')+"</td>";	
			html += "<td>"+row[a].getAttribute('AvailablePort')+"</td>";
			html += "<td>"+row[a].getAttribute('PortType')+"</td>";
			html +="</tr>";
		}else{
			var devName = row[a].DeviceName;
            if(a % 2 == 0){
                    tableClass = 'alt';
            }else{
                    tableClass = '';
            }
            var con = checkDeviceIfExist(devName);
            if (con== true){
                continue loop;
            }
            html += "<tr class='trManageDevice "+tableClass+"' ";
            html += "LoadType='"+load+"' ";
            html += "DeviceType='"+row[a].DeviceType+"' ";
            html += "DeviceId='"+row[a].DeviceId+"' ";
            html += "DeviceName='"+row[a].HostName+"' ";
            html += "PortType='"+row[a].PortType+"' ";
            html+= ">";

            html += "<td><input type='checkbox' id='"+row[a].DeviceId+"' DeviceName='"+row[a].HostName+"' value='"+row[a].DeviceId+"' name='deviceListCheck' /></td>";
            html += "<td class='toolTip' did ='td"+a+"' >"+row[a].HostName+"<div class='tableToolTip' id='divtoolTip"+a+"' style='display:none;'><ul>";
            html += getToolTip(row[a]);
            html +="</ul></div></td>";

            html += "<td>"+row[a].ManagementIp+"</td>";
            html += "<td>"+row[a].ConsoleIp+"</td>";
            html += "<td>"+row[a].Manufacturer+"</td>";
            html += "<td>"+row[a].Model+"</td>";
            if (tabSelected == "import" || condition== 'import'){
                html += "<td>"+row[a].AvailabilityDay+"</td>";
                html += "<td>"+row[a].AvailabilityDate+"</td>";
                html += "<td>"+row[a].AvailabilityTime+"</td>";
            }
            html += "<td>"+row[a].Status+"</td>";
            html += "<td>"+row[a].UserName+"</td>";
            html += "<td>"+row[a].RemainingTime+"</td>";
            html += "<td>"+row[a].AvailablePort+"</td>";
            html += "<td>"+row[a].PortType+"</td>";
            html +="</tr>";
		}
	}
	html += '</tbody>';
	html += '</table>';
	html += '</div>';
	if (tabSelected == "import" || condition == 'import'){
		$("#manageConfigTable"+condition+" > tbody").empty().append(html);
	}else{
		$("#manageConfigTable"+condition+" > tbody").empty().append(html);
	}
	if(globalDeviceType != "Mobile"){
		hoverTable();
	}
	$(".trManageDevice").each(function(){
		var dName = $(this).attr('DeviceName');
		for(var q=0; q<globalSelectedDeviceList.length; q++){
			if(globalSelectedDeviceList[a] == dName){				
				$(this).addClass('highlight');
			}
		}
	});	
	$(".trManageDevice").on("click",function(){	
		if (load.toLowerCase()=="tooltipdevice" ){
			$('.trManageDevice').each(function(){
				$(this).removeClass('highlight');
			});
			if($(this).hasClass('highlight') == false){
				$(this).addClass('highlight');
				var devName = $(this).attr('DeviceName');
				if ($.inArray(devName,globalSelectedDeviceList)== -1){
					globalSelectedDeviceList.push(devName);
				}
			}else{
				$(this).removeClass('highlight');
				var devName1 = $(this).attr('DeviceName');
				for(var a=0; a<globalSelectedDeviceList.length; a++){
					if(globalSelectedDeviceList[a] == devName1){
						globalSelectedDeviceList.splice(a,1);
					}
				}
			}
		}else{                     		
			if($(this).hasClass('highlight') == false){
				var devName = $(this).attr('DeviceName');
				var devId= $(this).attr('DeviceId');
				$('#'+devId).prop('checked', true);
				$(this).addClass('highlight');
				if(globalSelectedDeviceList.indexOf(devName) == -1){
					globalSelectedDeviceList.push(devName);
				}
			}else{
				$(this).removeClass('highlight');
				var devId= $(this).attr('DeviceId');
				var devName1 = $(this).attr('DeviceName');
				for(var a=0; a<globalSelectedDeviceList.length; a++){
					if(globalSelectedDeviceList[a] == devName1){
						globalSelectedDeviceList.splice(a,1);
					}
				}
				$('#'+devId).prop('checked', false);
			}
		}
		fullHubDisEna();
	});
}

/*
 *
 *  FUNCTION NAME : checkDeviceIfExist 
 *  AUTHOR        : Marlo Agapay
 *  DATE          : January 13, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : checks if the device wan on the canvass
 *  PARAMETERS    : devName
 *
 */
function checkDeviceIfExist(devName,type){
	var myReturn = false;
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	if(devName == ""){
		for(var a=0; a < window['variable' + dynamicLineConnected[pageCanvas]].length;a++){
			if(pageCanvas == window['variable' + dynamicLineConnected[pageCanvas]][a].Page){
				myReturn = true;
			}
		}	
	}else{
		for(var a=0; a<devices.length;a++){
			if (devName == devices[a].DeviceName && type != "createdev"){
				myReturn = true;
			}else if(devName == devices[a].DeviceName && type == "createdev"){ 
				myReturn = true;
			}	
		}
	}
	return myReturn;
}

/*
 *
 *  FUNCTION NAME : reCreateDock() 
 *  AUTHOR        : Mark Anthony ELbambo
 *  DATE          : March 29, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : recreate the dock
 *  PARAMETERS    
 *
 */
var dynamicGreenRouletteArr =[];
function reCreateDock(){
	$("#osxDocUL").html('');
    var dckCtr=0;
    var str='';
    for(var a=0; a < dynamicGreenRouletteArr.length; a++){
        var dkArr = dynamicGreenRouletteArr[a];
        
        if(dkArr.pageCanvas == pageCanvas){
            dckCtr++;
            var model = dkArr.model;
            var manufac = dkArr.manufac;
            var ostyp = dkArr.ostyp;
            var prdfmly = dkArr.prdfmly;
            var ipadd = dkArr.ipadd;
            var prot = dkArr.prot;
            var hostnme = dkArr.hostnme;
            var devtype = dkArr.devtype;
            var text = createDeviceTooltip(devPath);
            var imageObj =getModelImage(model);
            str += '<li>';
            str += '<div class="divTooltipDock">'+text+'</div>';
            str += '<a href="#" title="'+devPath+'"><img id="'+devPath+hostnme+pageCanvas+'" alt="'+devPath+' icon" src="'+imageObj.src+'" devpath="'+devPath+'" class="dockImg" width="62px" hostname="'+hostnme+'" proto="'+prot+'" devtype="'+devtype+'" ipAdd="'+ipadd+'" productFamily="'+prdfmly+'" ostype="'+ostyp+'" manufacturer="'+manufac+'" did="device" model="'+model+'"/></a>';
            str += '</li>';
                               
            if(globalDeviceType != "Mobile"){
                $("#"+devPath+hostnme+pageCanvas).click(function(e){
                createdev = this;
                var srcN = getMiniModelImage($(this).attr('model'));
                srcN =  ($(srcN).attr('src')).split("img")[1];
                $("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+srcN+") 10 18,auto");
                clickIcon(this);
                });
            }else{
                $.mobile.document.on( "taphold","#"+devPath+hostnme+pageCanvas, function(e){
                    createdev = this;
                    clickIcon(this);
                });
            }
        }
    }
    if(dckCtr > 0){
        $("#dockContainer").show();
    }else{
        $("#dockContainer").hide();
        return;
    }
    $("#osxDocUL").append(str);
	var tots = 40 * devCounter;
	var el = $("#dockWrapper");
    var w = el.width() + tots;
	var dvded = -Math.abs(w / 2);
	var css = {"position": 'absolute', "left": "50%","width": w+"px","margin-left":dvded};
    $("#dockContainer").css(css);
}

/*
 *
 *  FUNCTION NAME : createDevice 
 *  AUTHOR        : James Turingan
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : create device in canvas
 *  PARAMETERS    : src
 */
function createDevice(src){
	var devPath = "Device_" + deviceCtr;
	idsArray = [];
	idsArray = getalldevicepath(idsArray);
	if(idsArray.length == 0){
		createConfigName(); 
	}
	addEvent2History("Created a device.");
	var str ='';
	if(idsArray.indexOf(devPath) == -1){
		var imageObj = new Image();
		var srcN =  ($(src).attr('src')).split("img");
		imageObj.src = dir+"/img"+srcN[1];
		var id =  $(src).attr('id');
		var model =  $(src).attr('model');
		var manufac = $(src).attr('manufacturer');
		var ostyp = $(src).attr('ostype');
		var prdfmly = $(src).attr('productfamily');
		var ipadd = $(src).attr('ipAdd');
		var prot = $(src).attr('proto');
		var hostnme = $(src).attr('hostname');
		var devtype = $(src).attr('devtype');
		var rTr=0;
		var devices = getDevicesNodeJSON();
		for(var a=0; a < devices.length; a++){
			if(devices[a].HostName == hostnme && hostnme != "" && devtype.toLowerCase() == "dut"){
				return;
			}else if(devices[a].ManagementIp == ipadd && ipadd != "" && devtype.toLowerCase() == "testtool"){
				return;
			}
		}

		if(globalInfoType == "JSON"){
			setJSONData();
			setDeviceInformation(devPath,model,imageObj,manufac,ostyp,prdfmly,ipadd,prot,hostnme,devtype);
			imgXPos+=70;
       			idsArray.push(devPath);
		        deviceCtr++;
		        drawImage();
		}else{
			var devices = devicesArr;
			imageObj.onload = function() {
				setDeviceInformation(devPath,model,imageObj,manufac,ostyp,prdfmly,ipadd,prot,hostnme);
				imgXPos+=70;
				idsArray.push(devPath);
				deviceCtr++;
				drawImage();
			};
		}
		setTimeout(function(){
            var ctrDck=0;
            for(var a=0; a < dynamicGreenRouletteArr.length; a++){
                var dkArr = dynamicGreenRouletteArr[a];
                if(dkArr.pageCanvas == pageCanvas){
                   if(dkArr.model == model && dkArr.manufac == manufac && dkArr.ostyp == ostyp && dkArr.prdfmly == prdfmly && dkArr.ipadd==ipadd && dkArr.prot == prot && dkArr.hostnme == hostnme && dkArr.devtype == devtype){
                        ctrDck++;
                        a =dynamicGreenRouletteArr.length;
                   }else if(dkArr.model == model && manufac == undefined && ostyp == undefined && prdfmly == undefined && ipadd== undefined && prot == undefined && hostnme && hostnme == undefined){
                        ctrDck++;
                        a =dynamicGreenRouletteArr.length;
                   }
                }
            }
            if(ctrDck == 0){
            dynamicGreenRouletteArr.push({"pageCanvas":pageCanvas,"devPath":devPath,"model":model,"imageObj":imageObj,"manufac":manufac,"ostyp":ostyp,"prdfmly":prdfmly,"ipadd":ipadd,"prot":prot,"hostnme":hostnme,"devtype":devtype});
            }else{
                return;
            }
			$("#dockContainer").show();
			var text = createDeviceTooltip(devPath);
			str += '<li>';
			str += '<div class="divTooltipDock">'+text+'</div>';
			str += '<a href="#" title="'+devPath+'"><img id="'+devPath+hostnme+pageCanvas+'" alt="'+devPath+' icon" src="'+imageObj.src+'" devpath="'+devPath+'" class="dockImg" width="62px" hostname="'+hostnme+'" proto="'+prot+'" devtype="'+devtype+'" ipAdd="'+ipadd+'" productFamily="'+prdfmly+'" ostype="'+ostyp+'" manufacturer="'+manufac+'" did="device" model="'+model+'"/></a>';
			str += '</li>';
			$("#osxDocUL").append(str);
            
            if(globalDeviceType != "Mobile"){
                $("#"+devPath+hostnme+pageCanvas).click(function(e){
					createdev = this;
		        	var srcN = getMiniModelImage($(this).attr('model'));
					srcN =  ($(srcN).attr('src')).split("img")[1];
					$("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+srcN+") 10 18,auto");
                    clickIcon(this);
                });
            }else{
                $.mobile.document.on( "taphold","#"+devPath+hostnme+pageCanvas, function(e){
                //$("#"+devPath+hostnme).dblclick(function(e){
                createdev = this;
            	clickIcon(this);
		        });
            }
			var el = $("#dockWrapper");
            var w = el.width() + 40;
            var dvded = -Math.abs(w / 2);
            var css = {"position": 'absolute', "left": "50%","width": w+"px","margin-left":dvded};
            $("#dockContainer").css(css);
			
		},100);
	}else{
		deviceCtr++;
		createConfigName();
		createDevice(src);
	}
}/*
 *
 *  FUNCTION NAME : getModelImage
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : Feb 20, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : create image object with the corresponding image source
 *  PARAMETERS    : model
 *
 */
function getModelImage(model,biggie,ac){
	var imageObj = new Image();
	var retImgObj = function (){
		if(model.match(/asr1/gi) != null || model.match(/isr/gi) != null || model.match(/ios/gi) != null || model.match(/sword/gi) != null || model.match(/dagger/gi) != null || model.match(/utah/gi) != null || model.match(/junos/gi) != null || model.match(/ciscoxe/gi) != null) {
			if(biggie){
				imageObj.src = dir+"/img/model_icons/150px/qfp_bfcommit_150px.png";
			}else{
				if(ac){
					imageObj.src = dir+"/img/model_icons/62px/qfp_afcommit_62px.png";
				}else{
					imageObj.src = dir+"/img/model_icons/62px/qfp_bfcommit_62px.png";
				}
			}

		}else if(model.match(/asr9/gi) != null || model.match(/ciscoasr/gi) != null  || model.match(/ciscoxr/gi) != null ){
			if(biggie){
                imageObj.src = dir+"/img/model_icons/150px/juniper_150px.png";
			}else{
				if(ac){
                    imageObj.src = dir+"/img/model_icons/62px/juniper_green_62px.png";
				}else{
					imageObj.src = dir+"/img/model_icons/62px/juniper_62px.png";
				}
			}
		}else if(model.match(/124/gi) != null || model.match(/1200/gi) != null || model.match(/128/gi) != null || model.match(/ciscogsr/gi) != null ){
			if(biggie){
                imageObj.src = dir+"/img/model_icons/150px/GSR_Vivid-150px.png";
			}else{
				if(ac){
                    imageObj.src = dir+"/img/model_icons/62px/gsr_cisco_green-62px.png"
				}else{
					imageObj.src = dir+"/img/model_icons/62px/GSR_Vivid-62px.png";
				}
			}
		}else if(model.match(/65/gi) != null){
			if(biggie){
                imageObj.src = dir+"/img/model_icons/150px/6500catalyst_150px_bfcommit.png";
			}else{
				if(ac){
                    imageObj.src = dir+"/img/model_icons/62px/6500catalyst_62px_afcommit.png";
				}else{
					imageObj.src = dir+"/img/model_icons/62px/6500catalyst_62px_bfcommit.png";
				}
			}
	    }else if(model.match(/760/gi) != null){
			if(biggie){
                imageObj.src = dir+"/img/model_icons/150px/7600_bfcommit_150px.png";
			}else{
				if(ac){
                    imageObj.src = dir+"/img/model_icons/62px/7600_afcommit_62px.png";
				}else{
					imageObj.src = dir+"/img/model_icons/62px/7600_bfcommit_62px.png";
				}
			}
	    }else if(model.match(/ix/gi) != null || model.match(/olm/gi) != null || model =="3500" || model.match(/anue/gi) != null || model.match(/breaking/gi) != null || model.match(/xm/gi) != null || model.match(/lsm/gi) != null ){
			if(biggie){
                imageObj.src = dir+"/img/model_icons/150px/ixia_blue_150px.png";
			}else{
				if(ac){
                    imageObj.src = dir+"/img/model_icons/62px/ixia_black_62px.png";
				}else{
					imageObj.src = dir+"/img/model_icons/62px/ixia_blue_62px.png";
				}
			}
	    }else if(model.toLowerCase() == 'none'){
			imageObj.src = dir+"/img/model_icons/server_linux.png";
		}else if(model.toLowerCase() == 'n/a'){
			imageObj.src = dir+"/img/model_icons/server_linux.png";
		}else if(model.toLowerCase() == 'ubuntu'){
			imageObj.src = dir+"/img/model_icons/server_linux.png";
		}else if(model.toLowerCase() == 'centos'){
			imageObj.src = dir+"/img/model_icons/server_centOS_62px.png";
		}else if(model.toLowerCase() == 'vm ware'){
			imageObj.src = dir+"/img/model_icons/server_linux.png";
		}else{
			if(biggie){
                imageObj.src = dir+"/img/model_icons/150px/cisco_vivid_blue-150px.png";
			}else{
				if(ac){
					imageObj.src = dir+"/img/model_icons/62px/cisco_vivid_62px.png";
				}else{
					imageObj.src = dir+"/img/model_icons/cisco_vivid_blue_55.png";
				}
			}
		}
		return imageObj;
	}
	return retImgObj();
}

/*
 *
 *  FUNCTION NAME : createInterface
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 27, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : create interface in canvas
 *  PARAMETERS    : src
 *
 */
function createInterface(src){
	var devPath = "Device_"+deviceCtr;
    if(idsArray.indexOf(devPath) == -1){
        var imageObj = new Image();
        var srcN =  ($(src).attr('src')).split("img");
        imageObj.src = dir+"/img"+srcN[1];
        var id =  $(src).attr('id');
        var model =  $(src).attr('model');
		if(globalInfoType == "JSON"){
	        var devices = getDevicesNodeJSON();
	    }else{
    	     var devices =devicesArr;
	    }
        imageObj.onload = function() {
            setDeviceInformation(devPath,model,imageObj);
            imgXPos+=50;
  //          if(devices.length == 9){
    //            imgYPos+=50;
      //          imgXPos=152;
        //    }else if(devices.length == 18){
          //      imgYPos+=50;
            //    imgXPos=152;
            //}
            idsArray.push(devPath);
            deviceCtr++;
            drawImage();
        };
    }else{
        deviceCtr++;
        createInterface(src);
    }
}


/*
 *
 *  FUNCTION NAME : draw 
 *  AUTHOR        : James Turingan
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : draw canvas
 *  PARAMETERS    : 
 *
 */
var pdragY = 0;
var pdragX = 0;
var prectX = 0;
var prectY = 0;
var sdragY = 0;
var sdragX = 0;
var srectX = 0;
var srectY = 0;
function draw() {
	trashW = ((window.innerWidth) -40)-80;
	trashH = ((window.innerHeight) - 100)-80;
	window['variable' + dynamicFlagCommitted[pageCanvas] ]= false;
	if($("#configCanvas").length != 0){
//		var canvas = document.getElementById("configCanvas");
//		var context = canvas.getContext("2d");
		gblCanvasWidth = (window.innerWidth) -40;
		gblCanvasHeight = (window.innerHeight) - 120;
		rectX = (gblCanvasWidth*.2)/4;
		rectY = (gblCanvasHeight*.2)/4;
		window['variable' + dynamicResourceId[pageCanvas] ]= '';
		window['variable' + dynamicMainId[pageCanvas] ]= '';
		window['variable' + dynamicZoomOrigin[pageCanvas]] = makePos(0,0);
		window['variable' + dynamicZoomFactor[pageCanvas]] =1.1;
		window['variable' +dynamicPinchLastDist[pageCanvas]] = "";
		window['variable' + dynamicPinchStartCenter[pageCanvas]] ="";
		if(window['variable' + dynamicVar[pageCanvas]] == null || window['variable' + dynamicVar[pageCanvas]] == undefined || window['variable' + dynamicVar[pageCanvas]] == ""){
			var pagecon ="configContent"+pageCanvas;
			if(globalDeviceType != "Mobile"){
				var wdth = gblCanvasWidth;
				var hght = gblCanvasHeight;
			}else{
				var wdth = (window.innerWidth) -40;
				var hght = (window.innerHeight) - 120;
			}
			window['variable' + dynamicVar[pageCanvas]] = new Kinetic.Stage({ // initialize the canvas
				container: pagecon,
				width: wdth,
				height: hght,
				draggable: true,
				border : "4px solid gray"
				
			});	
			/*************************ON DRAG CANVAS***********************/
			window['variable' + dynamicVar[pageCanvas]].on('dragend', function() {
				dragX= -this.getX();
				dragY = -this.getY();
				window['variable' + dynamicMinimap[pageCanvas]].clear().clearCache();	
				var miniLayerCloned = window['variable' + dynamicLayer[pageCanvas]].clone();
				var scle = 0.1*globalscale;
				miniLayerCloned.setScale(scle);
				var rectnglLayer = new Kinetic.Layer();
				var rectngl = new Kinetic.Rect({
					width: gblCanvasWidth * 0.1,
					height: gblCanvasHeight * 0.1,
					fill: 'transparent',
					stroke: 'black',
					strokeWidth: 1,
					draggable: true
				});
				rectX = -this.getX()*.10;
				rectY = -this.getY()*.10;	
//				console.log("dragonC",dragX,dragY);
//				console.log("pdragOnC",pdragX,pdragY);
				rectX = ((dragX - pdragX) * .1);
				rectY = ((dragY - pdragY) * .1);
//				console.log("RECT After computation",rectX,rectY);
				rectngl.setAttrs({x:rectX, y:rectY});
				/***************ON DRAG RECTANGLE******************/
				rectngl.on('dragend', function() {
					
					rectX = -this.getX();
					rectY = -this.getY();
//					console.log("from stage drag rectangle rect",rectX,rectY);
					dragX = ((rectX) - (-srectX)) *10;
					dragY = ((rectY) - (-srectY)) *10;
//					console.log("from stage drag rectabgle DRAG",dragX,dragY);
					window['variable' + dynamicLayer[pageCanvas]].setAttrs({x: dragX, y:dragY});
					drawImage("true");
					window['variable' + dynamicLayer[pageCanvas]].draw();

				});

				/****************************************************/
				rectnglLayer.add(rectngl);
				miniLayerCloned.setAttrs({x:0,y:0});
				window['variable' + dynamicMinimap[pageCanvas]].add(rectnglLayer);
				window['variable' + dynamicMinimap[pageCanvas]].add(miniLayerCloned);
				fromNavigator = "stage";
				srectX = rectX;
				srectY = rectY;
				sdragX = dragX;
				sdragY = dragY;
//				console.log("set srect",srectX,srectY);
//				console.log("set sdrag",sdragX,sdragY);
			});

			/**********************************************/	
			if (globalDeviceType != "Mobile"){
				window['variable' + dynamicMinimap[pageCanvas]] = new Kinetic.Stage({ // initialize the canvas
					container: "miniMap0",
					width: gblCanvasWidth * 0.2,
					height: gblCanvasHeight * 0.2,
//					draggable:true,
					border : "2px solid gray"
				});	
			}
			window['variable' + dynamicLayer[pageCanvas]]="";
			window['variable' + dynamicLayer[pageCanvas]] = new Kinetic.Layer(); // initialize per layer of images or object in canvas
			if (globalDeviceType != "Mobile"){
				window['variable' + dynamicMiniLayer[pageCanvas]]="";
				window['variable' + dynamicMiniLayer[pageCanvas]] = new Kinetic.Layer(); // initialize per layer of images or object in canvas
			}
			$(document).ready(function(){
				var view = new initZoom();
			});
		}
		
		window['variable' + dynamicVar[pageCanvas]].add(window['variable' + dynamicLayer[pageCanvas]]);
		$("#configContent"+pageCanvas+" canvas").removeAttr("class", "canvasID"+pageCanvas);
		$("#configContent"+pageCanvas+" canvas").attr("class", "canvasID"+pageCanvas);
		$("#configContent"+pageCanvas+" canvas").attr("id", "canvasID"+pageCanvas);

	}else{
		$(".kineticjs-content canvas").attr({
		  height: (window.innerHeight) - 100,
		  width: (window.innerWidth) -40
		});
		$(".kineticjs-content canvas").removeAttr("style");
		$(".kineticjs-content").css({
		  "height": (window.innerHeight) - 100,
		  "width": (window.innerWidth) -40
		});
		if(window['variable' + dynamicVar[canvasPage]] == null || window['variable' + dynamicVar[canvasPage]] == undefined || window['variable' + dynamicVar[canvasPage]] == ""){
			var pagecon ="configContent"+pageCanvas;
			window['variable' + dynamicVar[canvasPage]] = new Kinetic.Stage({ // initialize the canvas
				container: pagecon,
				width: gblCanvasWidth,
				height: gblCanvasHeight,
				draggable: true,
				border : "4px solid gray"
			});
			window['variable' + dynamicMinimap[pageCanvas]] = new Kinetic.Stage({ // initialize the canvas
				container: "miniMap",
				width: gblCanvasWidth * 0.2,
				height: gblCanvasHeight * 0.2,
//				draggable: true,
				border : "4px solid gray"
			});	

			window['variable' + dynamicLayer[pageCanvas]]="";	
			window['variable' + dynamicLayer[pageCanvas]] = new Kinetic.Layer({
				draggable:true
			}); // initialize per layer of images or object in canvas
	//		window['variable' + dynamicTipLayer[pageCanvas] ] = new Kinetic.Layer(); // initialize per layer of images or object in canvas
			window['variable' + dynamicResourceId[pageCanvas] ]= '';
			window['variable' + dynamicMainId[pageCanvas] ]= '';
			window['variable' + dynamicVar[pageCanvas]].add(window['variable' + dynamicLayer[pageCanvas]]);
			$$("#configContent"+pageCanvas+" canvas").removeAttr("class", "canvasID"+pageCanvas);
			$("#configContent"+pageCanvas+" canvas").attr("class", "canvasID"+pageCanvas);
			$("#configContent"+pageCanvas+" canvas").attr("id", "canvasID"+pageCanvas);
			$(document).ready(function(){
				var view = new initZoom();
			});

		}
	}
	
	$("#divCanvas").append('<img id="trashBin" src="img/Trashbin.png" style="z-index:0;position: absolute;bottom:22px;right: 13px;display:none;width:75px;">');
	if(globalDeviceType != "Mobile") {
		$('#trashBin').css({'z-index':'-100'});
	}
	canvasSwipe("configContent0");
}

/*
*
 *  FUNCTION NAME : showGrid 
 *  AUTHOR        : Reynil Val Sopot
 *  DATE          : December 21, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : draw/hide gridlines
 *  PARAMETERS    : 
 *
 */

var globalGridSize = 10;
var grid; 
function showGrid(size){
//	window['variable' + dynamicVar[pageCanvas]].remove();
	if(size == null || size ==undefined || size == ""){
		globalGridSize=10;
	}else{
		globalGridSize=size;
	}

	if(clearGrid == true && (grid != null || grid != undefined)){
		grid.hide();
		window['variable' + dynamicVar[pageCanvas]].add(grid);
		clearGrid = false;
	}
	var height_mm = gblCanvasHeight;
	var width_mm = gblCanvasWidth;
	selectedGroup = new Kinetic.Shape({name:'emptyNode'});
	grid = new Kinetic.Layer();
	var CELL_SIZE = ($('#configContent0').width()/globalGridSize)*2,
	w = width_mm,
	h = height_mm,
	W = w * CELL_SIZE,
	H = h * CELL_SIZE;
	
	var r = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: W,
		height: H,
		fill: 'transparent',
	});
	grid.add(r);
	for (i = 0; i < (window['variable' + dynamicVar[pageCanvas]].getWidth()-20)/CELL_SIZE + 1; i++) {
		var I = i * CELL_SIZE;
		var l = new Kinetic.Line({
			stroke: "#999",
			strokeWidth: 1,
			points: [I, 0, I, window['variable' + dynamicVar[pageCanvas]].getHeight()]
		});
		grid.add(l);
	}

	for (j = 0; j < (window['variable' + dynamicVar[pageCanvas]].getHeight()-20)/CELL_SIZE + 1; j++) {
		var J = j * CELL_SIZE;
		var l2 = new Kinetic.Line({
			stroke: "#999",
			strokeWidth: 1,
			points: [0, J, window['variable' + dynamicVar[pageCanvas]].getWidth(), J]
		});
		grid.add(l2);
	}
	window['variable' + dynamicVar[pageCanvas]].add(grid);      
	reDrawImage();	
			
	$(document).on('click', '#hideGridline', function() {
		$("#hideGridline").addClass('animated pulse');
		setTimeout(function(){
			grid.hide();
			window['variable' + dynamicVar[pageCanvas]].batchDraw();
			clearGrid = false;
		},1500);
	});
}

function checkNum(num){
		if(num < 10){
			return true;
		}else if(num > 10){
			return false;
		}		
}

function reDrawImage(){
	var x = 0 ;
	window['variable' + dynamicLayer[pageCanvas]] = new Kinetic.Layer({draggable:true});
	createLine('canvasID');
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
    for(var i=0 ; i < devices.length; i++){
		 window['variable' + dynamicLayer[pageCanvas]].clearCache();
   		var x2 =  parseInt(devices[i].XLocation);
        var y2 =  parseInt(devices[i].YLocation);
		var group = new Kinetic.Group({
            id: devices[i].ObjectPath,
            hostname: devices[i].DeviceName,
            x:x2,
            y:y2,
            draggable: true,
            dragBoundFunc: function(pos) {
                var newY = pos.y < 10 ? 10 : pos.y;
                return {
                   x: pos.x,
                   y: newY
                };
            }
        });
		group = drawOneImage(x2,y2,devices[i],group);
		window['variable' + dynamicLayer[pageCanvas]].add(group);

		initImages(group); // initialize the image in canvas

	}
	window['variable' + dynamicVar[pageCanvas]].add(window['variable' + dynamicLayer[pageCanvas]]);
    $('.canvasID'+pageCanvas).remove();
    $("#configContent"+pageCanvas+" canvas").attr("class", "canvasID"+pageCanvas);
    $("#configContent"+pageCanvas+" canvas").attr("id", "canvasID"+pageCanvas);

}
	
/*
 *
 *  FUNCTION NAME : drawImage 
 *  AUTHOR        : James Turingan
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : draw image on canvas
 *  PARAMETERS    : 
 *
 */
var layerOffsetX="";
var layerOffsetY="";
var layerScale = "";
var dragX = 0;
var dragY =0;
//var canvasRedraw = setInterval(function(){drawImage();},500);
function drawImage(flag,newscale){
    var countXpos = 50;
    var countYpos = 50;
	if(globalDeviceType == "Mobile"){
    	if(createDev != ""){
        	var src = $(createDev).attr("src");
            $("#activeSelected").attr("src",src);
            $("#activeSelected").attr("type","dev");
            $("#activeSelected").show();
       	}else if(createLineVar != ""){
        	var src = $(createLineVar).attr("src");
            $("#activeSelected").attr("src",src);
            $("#activeSelected").attr("type","line");
            $("#activeSelected").show();
        }else{
        	$("#activeSelected").hide();
        }
    }
    if(window['variable' + dynamicLayer[pageCanvas]] != undefined){
        window['variable' + dynamicVar[pageCanvas]].clear().clearCache();
        window['variable' + dynamicLayer[pageCanvas]].remove().clearCache();
        if (globalDeviceType != "Mobile"){
            window['variable' + dynamicMinimap[pageCanvas]].clear().clearCache();
            window['variable' + dynamicMiniLayer[pageCanvas]].remove().clearCache();
        }
    }
    window['variable' + dynamicLayer[pageCanvas]] = new Kinetic.Layer();
    createLine('canvasID');
    if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
        var devices = devicesArr;
    }
    if(devices != null && devices != undefined){
        if(devices.length > 0){
            $("#trashBin").show();
        }else{
            $("#trashBin").hide();
        }
        for(var i=0 ; i < devices.length ; i++){
            var x2 =  parseInt(devices[i].XLocation);
            var y2 =  parseInt(devices[i].YLocation);
            if(x2 > (gblCanvasWidth - 100) && frmMapLink == true){
	            imgXPos = 139;
                if(countXpos > (gblCanvasWidth - 200)){
    	            imgXPos = 139;
                    countXpos = 0;
                    countYpos += 50;
                }
                y2 = y2 + countYpos;
                x2 = imgXPos;
                x2 = x2 + countXpos
                countXpos +=50;
			}
            if(y2 > (gblCanvasHeight - 100) && frmMapLink == true){
	            y2 = 24;
            }
            var group = new Kinetic.Group({
	            id: devices[i].ObjectPath,
                hostname: devices[i].DeviceName,
                x:x2,
                y:y2,
    	        draggable: true,
                dragBoundFunc: function(pos) {
        	        if(pos.y > (gblCanvasHeight - 45)){
            	        var newY = gblCanvasHeight - 45;
                    }else if(pos.y < 10){
                        var newY = 10;
                    }else{
                        var newY = pos.y;
                    }
                	if(pos.x > (gblCanvasWidth - 65)){
                    	var newX = gblCanvasWidth - 65;
                    }else if(pos.x < 10){
                        var newX = 10;
                    }else{
                        var newX = pos.x;
                    }
                    return {
                    	x: newX,
                        y: newY
                    };
               }
	});

            if (devices[i].UpdateFlag !="delete"){
            	group = drawOneImage(x2,y2,devices[i],group);
                window['variable' + dynamicLayer[pageCanvas]].add(group);
               	initImages(group);
            
            	initZoom("reload");
            	setTimeout(function(){
			window['variable' + dynamicVar[pageCanvas]].add(window['variable' + dynamicLayer[pageCanvas]]);
			window['variable' + dynamicLayer[pageCanvas]].batchDraw();
		},50);
	    }
        }
    }else{
        $("#showTooltipInfo").hide();
    }
    $('.canvasID'+pageCanvas).remove();
    $("#configContent"+pageCanvas+" canvas").attr("class", "canvasID"+pageCanvas);
    $("#configContent"+pageCanvas+" canvas").attr("id", "canvasID"+pageCanvas);

    if (flag=="true"){
        window['variable' + dynamicLayer[pageCanvas]].setAttrs({x: dragX, y:dragY});
        duplicateOnMinimap("true");
        return;
	}else if(flag == "zoom"){
		duplicateOnMinimap("scale",newscale);
		return;
    }else{
        duplicateOnMinimap();
		return;
    }
}


/*######################################################################
 *
 *	FUNCTION NAME	: duplicateOnMinimap
 *	DATE CREATED	: March 15,2014
 *	AUTHOR		: Marlo Agapay
 *	MODIFIED BY	:
 *	REVISION DATE	:
 *	REVISION NO.	:
 *	DATE MODIFIED	:
 *	DESCRIPTION	: duplicates devices and positions on canvas to minipmap
 *	PARAMETERS	: 
 *
 * #####################################################################
 */
var rectX = 0;
var rectY = 0;
function duplicateOnMinimap(from,newscale){
	if (globalDeviceType == "Mobile"){
		return;
	}
	window['variable' + dynamicMinimap[pageCanvas]].clear().clearCache();
/*******************************CLONE CANVAS*******************************/
	if(from != "scale"){
		var miniLayerCloned = window['variable' + dynamicLayer[pageCanvas]].clone();
		var scle = 0.1*globalscale;
		miniLayerCloned.setScale(scle);
	}
/*******************************CREATE RECTANGLE***************************/
	var rectnglLayer = new Kinetic.Layer();
	var rectngl = new Kinetic.Rect({
		width: gblCanvasWidth * 0.1,
		height: gblCanvasHeight * 0.1,
		fill: 'transparent',
		stroke: 'black',
		strokeWidth: 1,
		draggable: true
	});	
	rectnglLayer.add(rectngl);
/**************************************************************************/
/*************************************************************************/
/*	if(from == "" && fromNavigator == "rectangle"){
		rectngl.setPosition(-(rectX), -(rectY));
		rectnglLayer.clear().add(rectngl);
		miniLayerCloned.setAttrs({x:0,y:0});
		window['variable' + dynamicMinimap[pageCanvas]].add(rectnglLayer);
		window['variable' + dynamicMinimap[pageCanvas]].add(miniLayerCloned);
		fromNavigator = "rectangle";		
		pdragX = dragX;
		pdragY = dragY;
		prectX = rectX;
		prectY = rectY;
		return;
	}
	if(from == "" && fromNavigator == "stage"){
		rectX = ((dragX - pdragX) * .1);
		rectY = ((dragY - pdragY) * .1);						
		rectngl.setAttrs({x:rectX, y:rectY});
		rectnglLayer.clear().add(rectngl);
		miniLayerCloned.setAttrs({x:0,y:0});
		window['variable' + dynamicMinimap[pageCanvas]].add(rectnglLayer);
		window['variable' + dynamicMinimap[pageCanvas]].add(miniLayerCloned);
		fromNavigator = "stage";
		srectX = rectX;
		srectY = rectY;
		sdragX = dragX;
		sdragY = dragY;
		return;
p
	}
*/
/*******************************DRAG RECTANGLE*****************************/

	rectngl.on('dragend', function() {
					
		rectX = -this.getX();
		rectY = -this.getY();
//		console.log("rect this", rectX,rectY);
		dragX = ((rectX) - (-srectX)) *10;
		dragY = ((rectY) - (-srectY)) *10;
//		console.log("drag after computation",dragX,dragY);
		window['variable' + dynamicLayer[pageCanvas]].setAttrs({x: dragX, y:dragY});
		drawImage("true");
		window['variable' + dynamicLayer[pageCanvas]].draw();

	});

/**************************ON DRAG SET NEW POSITION***************************/
	if(from == "true"){
		rectngl.setPosition(-(rectX), -(rectY));
		rectnglLayer.clear().add(rectngl);
		miniLayerCloned.setAttrs({x:0,y:0});
		window['variable' + dynamicMinimap[pageCanvas]].add(rectnglLayer);
		window['variable' + dynamicMinimap[pageCanvas]].add(miniLayerCloned);
		fromNavigator = "rectangle";		
		pdragX = dragX;
		pdragY = dragY;
		prectX = rectX;
		prectY = rectY;
//		console.log("set pdrag", pdragX, pdragY);
//		console.log("set prect", prectX,prectY);
		return;
	}
/*************************ON ZOOM SET POSITION*******************************/
	if(from == "scale"){
		rectX = ((dragX - pdragX) * .1);
		rectY = ((dragY - pdragY) * .1);
		globalscale = newscale;
		var miniLayerCloned = window['variable' + dynamicLayer[pageCanvas]].clone();
		scl = 0.1*newscale;
		miniLayerCloned.setScale(scl);
		rectngl.setPosition(-(rectX),-(rectY));
		rectnglLayer.clear().add(rectngl);
		miniLayerCloned.setAttrs({x:0, y:0});
		window['variable' + dynamicMinimap[pageCanvas]].add(rectnglLayer);
		window['variable' + dynamicMinimap[pageCanvas]].add(miniLayerCloned);
		fromNavigator = "zoom";
		pdragX = dragX;
		pdragY = dragY;
		prectX = rectX;
		prectY = rectY;
		return;
	}
/********************************* START CREATE DEVICE *********************************/

/***************************SET INITIAL POSITION*******************************/
	if(from != "scale" && fromNavigator == ""){
		window['variable' + dynamicMinimap[pageCanvas]].add(rectnglLayer).setPosition(rectX,rectY);
		window['variable' + dynamicMinimap[pageCanvas]].add(miniLayerCloned);
	}

}
/*######################################################################
 *
 *	FUNCTION NAME	: initZoom
 *	DATE CREATED	: March 10,2014
 *	AUTHOR		: Marlo Agapay
 *	MODIFIED BY	:
 *	REVISION DATE	:
 *	REVISION NO.	:
 *	DATE MODIFIED	:
 *	DESCRIPTION	: triggers the zooming function on both HTML5 and MOBILE
 *	PARAMETERS	: action
 *
 * #####################################################################
 */
var zoomOrigin = makePos(0, 0),zoomFactor = 1.1,pinchLastDist, pinchStartCenter;
var zoomButtonStatus = "inactive";
function initZoom(action) {
	if (action =="reload"){
		zoomOrigin = window['variable'+dynamicZoomOrigin[pageCanvas]];
		layerOffsetX = window['variable' + dynamiclayerScale[pageCanvas]];
		layerScale =  window['variable' + dynamiclayerScale[pageCanvas]];
		layerOffsetY = window['variable' + dynamiclayerOffsetY[pageCanvas]];
		if (layerOffsetX!=""&&layerOffsetY!="" && layerScale!=""){
			zoom("","");	
		}
		return;
	}

        // register events and proxy to methods

/*        $(window['variable' + dynamicVar[pageCanvas]].content).on('mousewheel', function(e) {
            e.preventDefault();
          	var evt = e.originalEvent;
	   		stageMouseWheel(evt.deltaY, makePos(evt.clientX, evt.clientY));
  
        });
*/
	var caX = window['variable' + dynamicVar[pageCanvas]].getWidth()/2;
	var caY = window['variable' + dynamicVar[pageCanvas]].getHeight()/2;
	$(window['variable' + dynamicVar[pageCanvas]].content).on('click', function(e) {
           e.preventDefault();
         	var evt = e.originalEvent;
			if (zoomInOutSelected == "zoomin" && zoomButtonStatus == "active"){
		
				var scale = 100;
//          		stageMouseWheel(scale, makePos(evt.clientX, evt.clientY));
          		stageMouseWheel(scale, makePos(caX, caY));

//				drawImage("zoom");				
  			}else if (zoomInOutSelected == "zoomout" && zoomButtonStatus =="active"){
				var scale = -100;
          //		stageMouseWheel(scale, makePos(evt.clientX, evt.clientY));
          		stageMouseWheel(scale, makePos(caX, caY));
//				drawImage("zoom");				
			}else if (zoomInOutSelected == "default" && zoomButtonStatus == "active"){
		zoomOrigin = makePos(0, 0),zoomFactor = 1.1,pinchLastDist="", pinchStartCenter="";
				window['variable' + dynamiclayerScale[pageCanvas]] = "";	// GLOBAL FOR RETURN ZOOM ON fcn drawImage function
				window['variable' +dynamiclayerOffsetX[pageCanvas]] = ""; // GLOBAL FOR RETURN ZOOM ON fcn drawImage function
				window['variable' + dynamiclayerOffsetY[pageCanvas]] = ""; // GLOBAL FOR RETURN ZOOM ON fcn drawImage function
			window['variable' + dynamicZoomOrigin[pageCanvas]] = zoomOrigin;
			window['variable' + dynamicLayer[pageCanvas]].setOffset(0,0);
			window['variable' + dynamicLayer[pageCanvas]].setScale(1);
			drawImage("zoom",1);
		//		stageMouseWheel(scale, makePos(evt.clientX, evt.clientY));
			}else{
				$("#configContent0").css("cursor","default");
				$("#Magnify").attr("title","Zoom");
				zoomButtonStatus = "inactive";
			}

        });


        window['variable' + dynamicVar[pageCanvas]].getContent().addEventListener('touchmove', function(e) {
            e.preventDefault(); // prevent iPAD panning
            var touch1 = e.touches[0];
            var touch2 = e.touches[1];
            if (touch1 && touch2) {
                touch1.offsetX = touch1.pageX - $(touch1.target).offset().left;
                touch1.offsetY = touch1.pageY - $(touch1.target).offset().top;
                touch2.offsetX = touch2.pageX - $(touch2.target).offset().left;
                touch2.offsetY = touch2.pageY - $(touch2.target).offset().top;
                stagePinch(makePos(touch1.offsetX, touch1.offsetY), makePos(touch2.offsetX, touch2.offsetY));
            }
        }, false);
        window['variable' + dynamicVar[pageCanvas]].getContent().addEventListener('touchend', function(e) {
            stageTouchEnd();
//			drawImage("zoom");
        }, false);
        $(window).on("orientationchange", function(event) {
            window.scrollTo(0, 0); // scroll to top left on orientation change
        });
    }
/*
 *FUNCTION NAME : zoom
 *AUTHOR        : marlo agapay
 *DATE          : march 12, 2014
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #		:
 *DESCRIPTION   : sets the scale and offest of the dynamic layerto ZOOM
 *PARAMETERS    : newsacle , center
 *
*/
function zoom(newscale, center) { // zoom around center
		if (newscale.toFixed > 2 && newscale.toFixed(2) < 0.25){
			return;
		}
		var caX = window['variable' + dynamicVar[pageCanvas]].getWidth()/2;
		var caY = window['variable' + dynamicVar[pageCanvas]].getHeight()/2;
		zoomOrigin = window['variable'+dynamicZoomOrigin[pageCanvas]];
		layerOffsetX = window['variable' + dynamiclayerScale[pageCanvas]];
		layerScale =  window['variable' + dynamiclayerScale[pageCanvas]];
		layerOffsetY = window['variable' + dynamiclayerOffsetY[pageCanvas]];
		if(layerOffsetX!="" && layerScale!="" && newscale==""){
			window['variable' + dynamicLayer[pageCanvas]].setOffset(layerOffsetX, layerOffsetY);
			window['variable' + dynamicLayer[pageCanvas]].setScale(layerScale);
			return;
		}	
        var mx = center.x - window['variable' + dynamicLayer[pageCanvas]].getX(),
            my = center.y - window['variable' + dynamicLayer[pageCanvas]].getY(),
            oldscale = window['variable' + dynamicLayer[pageCanvas]].getScaleX();
		if (newscale.toFixed(2) >0.25 && newscale.toFixed(2) < 2){	
			zoomOrigin = makePos(mx / oldscale + zoomOrigin.x - mx / newscale, my / oldscale + zoomOrigin.y - my / newscale);

			window['variable' + dynamiclayerScale[pageCanvas]] = newscale;	// GLOBAL FOR RETURN ZOOM ON fcn drawImage function
			window['variable' +dynamiclayerOffsetX[pageCanvas]] = zoomOrigin.x; // GLOBAL FOR RETURN ZOOM ON fcn drawImage function
			window['variable' + dynamiclayerOffsetY[pageCanvas]]  = zoomOrigin.y; // GLOBAL FOR RETURN ZOOM ON fcn drawImage function

			window['variable' + dynamicLayer[pageCanvas]].setOffset(caX,caY);	
			window['variable' + dynamicLayer[pageCanvas]].setScale(newscale);			
			drawImage("zoom",newscale);
		}else{ return;}
    }

/*
 *FUNCTION NAME : stageMouseWheel
 *AUTHOR        : marlo agapay
 *DATE          : march 12, 2014
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #		:
 *DESCRIPTION   : sets the scale and offest of the dynamic layerto ZOOM
 *PARAMETERS    : newsacle , center
 *
*/

function stageMouseWheel(factor, p) {
	var oldscale = window['variable' + dynamicLayer[pageCanvas]].getScaleX(),
        newscale = oldscale - (factor < 0 ? 0.25 : -0.25);
        zoom(newscale, p);
    }

/*
 *FUNCTION NAME : stagePinch
 *AUTHOR        : marlo agapay
 *DATE          : march 12, 2014
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #		:
 *DESCRIPTION   : sets the scale and offest of the dynamic layerto ZOOM in MOBILE by TOUCH
 *PARAMETERS    : newsacle , center
 *
*/

function stagePinch(p1, p2) {
		pinchLastDist = window['variable' +dynamicPinchLastDist[pageCanvas]];
		pinchStartCenter =  window['variable' + dynamicPinchStartCenter[pageCanvas]];
        var dist = Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
        if (!pinchLastDist) window['variable' +dynamicPinchLastDist[pageCanvas]] = dist;
        var newscale = window['variable' + dynamicLayer[pageCanvas]].getScale().x * dist / pinchLastDist;

        var center = makePos(Math.abs((p1.x + p2.x) / 2), Math.abs((p1.y + p2.y) / 2));
        if (!pinchStartCenter) window['variable' +dynamicPinchLastDist[pageCanvas]] = center;

        zoom(newscale, window['variable' + dynamicPinchStartCenter[pageCanvas]]);
        window['variable' +dynamicPinchLastDist[pageCanvas]] = dist;
    }

/*
 *FUNCTION NAME : stageTouchEnd
 *AUTHOR        : marlo agapay
 *DATE          : march 12, 2014
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #		:
 *DESCRIPTION   : sets the global pinchLastDist
 *PARAMETERS    : 
 *
*/

function stageTouchEnd() {
	window['variable' +dynamicPinchLastDist[pageCanvas]] = window['variable' + dynamicPinchStartCenter[pageCanvas]] = 0;
}

/*
 *FUNCTION NAME : makePos
 *AUTHOR        : marlo agapay
 *DATE          : march 12, 2014
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #		:
 *DESCRIPTION   : returns x,y array
 *PARAMETERS    : 
 *
*/
function makePos(x, y) {
    return {
        'x': x,
        'y': y
    };
}
/*
 *
 *  FUNCTION NAME : drawOneImage
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : December 11, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : draw image with label
 *  PARAMETERS    : 
 *
 */
function drawOneImage(x2,y2,devObject,group){
	if($("#checkConfigname") == true){
		viewconfigname = true;
	}
	if($("#checkhostname") == true){
		viewhostname = true;
	}
	if($("#checkmanagementip") == true){
		viewmanagementip = true;
	}
	if($("#checkconsoleip") == true){
		viewconsoleip = true;
	}
	if($("#checkloopbackadd") == true){
		viewloopbackadd = true;
	}
	if($("#checkosversion") == true){
		viewosversion = true;	
	}
	if($("#checksoftwarepack") == true){
		viewsoftwarepack = true;	
	}
	if($("#checkinterfaceip") == true){
		viewinterfaceip = true;
	}	
	if($("#checkinterfacename") == true){
		viewinterfacename = true;
	}
	if(globalInfoType == "JSON"){
		if(devObject.Status == "Reserved"){
			var imgObj = getModelImage(devObject.Model,false,true);
		}else{
			var imgObj =getModelImage(devObject.Model);
		}
	}else{
		var imgObj =devObject.Source;
	}
	var devImg = new Kinetic.Image({ // initialize the image(s) in canvas
	   	image: imgObj,
        width: 50,
        height: 50,
	    id: devObject.ObjectPath,
    });
	var mytext = "";
	if(devObject.HostName != "" && viewhostname == true){
		mytext = devObject.HostName;
	}else if(devObject.DeviceName != "" && viewconfigname == true){
		mytext = devObject.DeviceName;
	}else{
		mytext = devObject.ObjectPath;
	}
	if(devObject.ManagementIp != "" && viewmanagementip == true){
		mytext += "\n" + devObject.ManagementIp;
	}
	if(devObject.ConsoleIp != "" && viewconsoleip == true){
		mytext += "\n" + devObject.ConsoleIp;
	}
	var y = -10;
	if(devObject.DeviceName != ""){
		y = -40;
	}
	var simpleLabel = new Kinetic.Label({
		x: 0,
		y: y,
		opacity: 0.75
	});
	simpleLabel.add(new Kinetic.Text({
		text: mytext,
		fontFamily: 'Arial',
		fontSize: 10,
		padding: 5,
		fill: 'black'
	}));
	group.add(simpleLabel);
	group.add(devImg);
	return group;
}
/*
 *
 *  FUNCTION NAME : initImages
 *  AUTHOR        : James Turingan
 *  DATE          : December 6, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize the images in canvas
 *  PARAMETERS    : 
 *
 */
function initImages(devImg){
	var dev = function(){
		devImg.on('dblclick dbltap',function(){
			var yPost = this.getPosition().y;
			if(globalDeviceType == "Mobile"){
				$("#deviceMenuPanel").css({"right":yPost,"top":"0px"});
				$("#deviceMenuPanel").popup("open");
				$("#deviceMenuPanel").popup({positionTo: "window"});
				gblDevMenY = this.getPosition().y;
				gblDevMenX = this.getPosition().x;
			}else{
				showDevMenuPop();
			}
			glblDevMenImg = this.getAttr('id');
			HostName = this.getAttr('hostname');
			zoomButtonStatus = "inactive";
			addEvent2History("Device menu opened.");
//			drawImage();
		});
		devImg.on('mouseup touchend', function(){
			var imgId = this.getAttr('id');
			var imgXpos2 = this.getPosition().x;
			var imgYpos2 = this.getPosition().y;
			checkDevicesToCreateLink(imgId,imgXpos2,imgYpos2);
			$('#showTooltipInfo').hide();
			duplicateOnMinimap();
			zoomButtonStatus = "inactive";
			addEvent2History("Device dragged");
//			drawImage(); //for hang issue
		});	
		devImg.on('mouseover mousedown touchstart', function() {
			addEvent2History("Device clicked");
			var imgId = this.getAttr('id');
			$('#showTooltipInfo').show();	 
			var imgXpos2 = this.getPosition().x;
			var imgYpos2 = this.getPosition().y;
			var text = createDeviceTooltip(imgId);
			//used for map device
			gblDevMenY = this.getPosition().y;
			gblDevMenX = this.getPosition().x;
			// test tooltip using DIV */
			$('#showTooltipInfo').css({
				background : '#DFEFF0',
				'border-radius' : '5px',	
				border: '1px solid #555',	
				padding : '5px',	
				'max-width': '200px',
				'font-size' : '10px',
				'font-family': 'Arial',
        		position:'absolute',
	       	});
			var mTop = imgYpos2+150;
			if (globalDeviceType =="Mobile"){
				$('#showTooltipInfo').css({
	 				top :mTop,
   					left:imgXpos2+50
        		});
			}else{
				$('#showTooltipInfo').css({
					top : imgYpos2+150,
   					left:imgXpos2+50
        		});
			}
	        $('#showTooltipInfo').empty().append(text);		
		});
		devImg.on('mouseout', function(){
			$('#showTooltipInfo').hide();
		});
		devImg = null;
	}
	return dev();
}

/*
 *
 *  FUNCTION NAME : dragtoTrash
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 13, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : deletes devices on the canvas
 *  PARAMETERS    : imgId,imgXpos2,imgYpos2
 *
 */
var devPath = "";
function dragtoTrash(imgId,imgXpos2,imgYpos2,devMenu){
	var flag = true;
	var trashW2 = imgXpos2 + 25;
	var trashH2 = imgYpos2 + 25; 
	var device = getDevicesNodeJSON();
	var devName = imgId;
	for(var t=0; t<device.length; t++){
		if(device[t].ObjectPath == imgId && device[t].DeviceName != ""){
			devName = device[t].DeviceName;
			break;
		}
	}
	devPath = imgId;
	var msg = "Are you sure you want to delete " + devName + "?";
	var todo = 'deleteDevSub("'+imgId+'");';
	if(devMenu == "true"){
		if(window['variable' + dynamicResourceId[pageCanvas]] != "" && device.length == 1){
			todo += " cancelReservation(true);";
			if(globalDeviceType == "Mobile"){
				confirmation(msg,"Notification",todo);
			}else{
				alerts(msg,"","deleterelease");
			}
		}else{
			 if(globalDeviceType == "Mobile"){
                confirmation(msg,"Notification",todo);
            }else{
				alerts(msg,"","yesno");
			}
		}
		flag = false;
		return flag;
	}else if(trashW2 >= trashW && trashH2 >= trashH){
		if(window['variable' + dynamicResourceId[pageCanvas]] != "" && device.length == 1){
			if(globalDeviceType == "Mobile"){
                confirmation(msg,"Notification",todo);
            }else{
				alerts(msg,"","deleterelease");	
			}
		}else{
			if(globalDeviceType == "Mobile"){
                confirmation(msg,"Notification",todo);
            }else{
				alerts(msg,"","yesno");
			}
		}
		flag = false;
		return flag;
	}
}


/*
 *
 *  FUNCTION NAME : deleteDevSub
 *  AUTHOR        : Mark Elbambo 
 *  DATE          : Jan 0, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : imgId
 *
 */
function deleteDevSub(imgId){
	if(globalInfoType == "JSON"){
   		var devices = getDevicesNodeJSON();
		for(var a=0; a<devices.length;a++){
			if(devices[a].Status == "Reserved" && devices[a].ObjectPath == imgId){
				devices[a].UpdateFlag = "delete";
				deleteLinkFromDev(devices[a].ObjectPath);
				devices.splice(a,1);
				addEvent2History("Device deleted");
				a = devices.length;
			}else if(devices[a].ObjectPath == imgId && devices[a].Status != "Reserved"){
				deleteLinkFromDev(devices[a].ObjectPath);
				devices.splice(a,1);
				addEvent2History("Device deleted");
				a = devices.length;
			}
		}
   	}
	drawImage();
}

/*
 *
 *  FUNCTION NAME : dragtoTrashDeviceOnly
 *  AUTHOR        : Marlo Agapay
 *  DATE          : Jan 0, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : delete device in device map
 *  PARAMETERS    : imgId,imgXpos2,imgYpos2,devMenu
 *
 */
function dragtoTrashDeviceOnly(imgId,imgXpos2,imgYpos2,devMenu){
	var trashW2 = imgXpos2 + 25;
	var trashH2 = imgYpos2 + 25; 
	if(globalInfoType == "JSON"){
        var devsArr = getDevicesNodeJSON();
    }else{
         var devsArr =devicesArr;
    }
	var devArr = devsArr;//deviceArr;
	if(devMenu == "true"){
		for(var i = 0; i  < devsArr.length; i++){
        	if(devsArr[i].ObjectPath == imgId){
				devsArr[i].UpdateFlag = "delete";
				addEvent2History("Device Deleted");
    //        	devsArr.splice(i,1);

            }
    	}
        for(var i = 0; i  < devsArr.length; i++){
        	if(devArr[i].DevName == imgId){
      //      	deviceArr.splice(i,1);
            }
        }
//        drawImage();
        return;
	}else{
		if(trashW2 >= trashW && trashH2 >= trashH){
			for(var i = 0; i  < devsArr.length; i++){
				if(devsArr[i].ObjectPath == imgId){
					devices[i].UpdateFlag = "delete";
//					devices.splice(i,1);
				}
			}
			for(var i = 0; i  < deviceArr.length; i++){
				if(devArr[i].DevName == imgId){
//                	deviceArr.splice(i,1);
				}
			}
			drawImage();
			return;
		}
	}
}

/*
 *
 *  FUNCTION NAME : deleteLink
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 16, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : deletes link on the canvas
 *  PARAMETERS    : source,destination
 *
 */
function deleteLink(source,destination){
	if(globalInfoType == "JSON"){
		var devices = getDevicesNodeJSON();
        var prtArr =[];
        for(var s=0;s < devices.length; s++){
            prtArr = getDeviceChildPort(devices[s],prtArr);
        }
    }else{
         var prtArr= portArr;
    }
	for(var i = 0; i  < window['variable' + dynamicLineConnected[pageCanvas]].length; i++){
		if(window['variable' + dynamicLineConnected[pageCanvas]][i].Destination  == destination && window['variable' + dynamicLineConnected[pageCanvas]][i].Source == source){
			if(window['variable' + dynamicLineConnected[pageCanvas]][i].DestinationDeviceName != "" || window['variable' + dynamicLineConnected[pageCanvas]][i].SourceDeviceName != ""){
				for(var a=0; a < prtArr.length; a++){
					if(prtArr[a].ObjectPath == destination || prtArr[a].ObjectPath == source){
						if(prtArr[a].Status == "Reserved"){
							addEvent2History("Device Link Deleted");
							prtArr[a].UpdateFlag = "delete";
						}else{
							addEvent2History("Device Link Deleted");
							prtArr.splice(a,1);
						}
					}
				}
				window['variable' + dynamicLineConnected[pageCanvas]].splice(i,1);
			}else{
				window['variable' + dynamicLineConnected[pageCanvas]].splice(i,1);
			}
		}
	}
	drawImage();
}

/*
 *
 *  FUNCTION NAME : deleteLinkFromDev
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : March 21, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : deletes link on the canvas when device is deleted
 *  PARAMETERS    : dev
 *
 */
function deleteLinkFromDev(dev){
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	var allline =[];
	for(var i = 0; i  < devices.length; i++){ // checks if the hitted object is equal to the array
		allline = gettargetmap(devices[i].ObjectPath,allline);
	}
	for(var t=0; t<allline.length; t++){
		var source = allline[t].Source;
		var destination = allline[t].Destination;
		var srcArr = source.split(".");
		var dstArr = destination.split(".");
		if(srcArr[0] == dev){
			var portobject = getPortObject2(destination);
			addEvent2History("Device Link Deleted");
			portobject.PORTMAP = [];
		}
		if(dstArr[0] == dev){
			var portobject = getPortObject2(source);
			addEvent2History("Device Link Deleted");
			portobject.PORTMAP = [];
		}
	}
	drawImage();
}

/*
 *
 *  FUNCTION NAME : loadDeviceConfig
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 18, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : loads the device configuration
 *  PARAMETERS    : 
 *
 */
function loadDeviceConfig(glblDevMenImg){
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var a=0; a < devices.length; a++){
		if(devices[a].ObjectPath == glblDevMenImg){
			var hName = devices[a].HostName;
			if(devices[a].HostName == ""){
				var hName = devices[a].ObjectPath;
			}
			var OSVers = devices[a].OSVersion;
			var ManagementIp = devices[a].ManagementIp;
			var ConsoleIp = devices[a].ConsoleIp;
			var Model = devices[a].Model;
			var Manufacturer = devices[a].Manufacturer;
			var Exclusivity = devices[a].Exclusivity;
			var Statuss = devices[a].Status;
			if(OSVers =="" || OSVers ==undefined){ 
				OSVers="N/A";
			}
			if(ManagementIp =="" || ManagementIp ==undefined){ 
				ManagementIp = "N/A";
			}
			if(ConsoleIp =="" || ConsoleIp ==undefined){ 
				ConsoleIp="N/A";
			}
			if(Statuss =="" || Statuss ==undefined){ 
				Statuss="N/A";
			}
			if(Manufacturer =="" || Manufacturer ==undefined){ 
				Manufacturer="N/A";
			}
			$("#hostnameDevConf").html(hName);
			$("#OSVerDevConf").html(OSVers);
			$("#mangmntIPDevConf").html(ManagementIp);
			$("#consoleIPDevConf").html(ConsoleIp);
			$("#modelDevConf").html(Model);
			$("#manufacturerDevConf").html(Manufacturer);
			if(Exclusivity == "Exclusive"){
				var exc = "<input type='checkbox' checked='checked' id='exclusivityChk'>";
			}else{
				var exc = "<input type='checkbox' id='exclusivityChk'>";
			}
			$("#exclusivityDevConf").html(exc);
			$("#statusDevConf").html(Statuss);
			$("#devNameDevConf").html(hName);
			addEvent2History("Device Configuration loaded.");
			return;
		}else if(devices[a].ObjectPath == glblDevMenImg && a == (devices.length - 1)){
			alert("There is no such device in the canvas.");
		}
	}
}

/*
 *
 *  FUNCTION NAME : checkCommitOptions
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 27, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : show/hide commits options
 *  PARAMETERS    : 
 *
 */
function checkCommitOptions(){
	var allline = [];
	var devices = getDevicesNodeJSON();

	for(var t=0; t<devices.length ; t++){
		allline = gettargetmap(devices[t].ObjectPath,allline);
	}
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
		var prtArr =[];
		for(var s=0;s < devices.length; s++){
  	    	prtArr = getDeviceChildPort(devices[s],prtArr);
		}
    }else{
        var devices =devicesArr;
		var prtArr= portArr;
    }
	
	for(var a=0; a < devices.length;a++){
		if(devices[a].DeviceType.toLowerCase() == "testtool" ||  devices[a].DeviceType.toLowerCase() == "dut" && devices[a].Status.toLowerCase() != "reserved"){ 
			$("#comOpDevSanityTr").removeAttr("style");
			$("#comOpAccSanityTr").removeAttr("style");
			$("#comOpStartResTr").removeAttr("style");
			$("#comOpEndResTr").removeAttr("style");
		}else{
			$("#comOpDevSanityTr").css({"display":"none"});
			$("#comOpAccSanityTr").css({"display":"none"});
			$("#comOpStartResTr").css({"display":"none"});
			$("#comOpEndResTr").css({"display":"none"});

		}
		if(devices[a].Status.toLowerCase() != "reserved" && allline.length > 0){
			if(devices[a].DeviceName == ""){
				$("#comOpConnectivityTr").removeAttr("style");
			}else{
				$("#comOpConnectivityTr").css({"display":"none"});
				$("#comOpConnectivity").prop('checked',false);
				for(var b=0; b < prtArr.length; b++){
					if(prtArr[b].SwitchInfo != ""){
						$("#comOpConnectivityTr").removeAttr("style");
						break;
					}
				}
			}
		}
		if(devices[a].Status.toLowerCase() != "reserved" && allline.length > 0 && devices[a].Model != "3750"){ 
			var dut= 0;var testool= 0;var others= 0;var all= 0;
			for(var c=0; c < devices.length;c++){
				all++;
				if(devices[c].DeviceType.toLowerCase() == "dut"){
					dut++;
				}else if(devices[c].DeviceType.toLowerCase() == "testtool"){
					testool++;
				}else{
					others++;
				}
			}
			if((dut + testool) == all){
				$("#comOpLinkSanityTr").removeAttr("style");
			}else{
				$("#comOpLinkSanityTr").css({"display":"none"});
			}
		}
		if(devices[a].Status.toLowerCase() != "reserved" && allline.length > 0 && devices[a].Model != "3750"){
			var dut= 0;var testool= 0;var others= 0;var all= 0;var vlanVar =0;var vlansArr="";
            for(var c=0; c < devices.length;c++){
                all++;
                if(devices[c].DeviceType.toLowerCase() == "dut"){
                    dut++;
				}else if(devices[c].DeviceType.toLowerCase() == "vlan"){
					vlansArr = devices[c].ObjectPath;
					vlanVar++;
				}else{
					others++;
				}
			}
			
			if(dut == all || dut >1){
				if(vlanVar == 0){
					$("#comOpEnaInterfaceTr").removeAttr("style");
				}else{
					var vlanCtr=0;
					for(var d=0; d < allline.length; d++){
						var source = allline[d].Source;
				        var destination = allline[d].Destination;
				        var srcArr = source.split(".");
						var srcObj = getDeviceObject2(srcArr[0]);
				        var dstArr = destination.split(".");
						var dstObj = getDeviceObject2(dstArr[0]);
						if(allline[d].Destination.split(".")[0] == vlansArr){
							if(srcObj.DeviceType.toLowerCase() == "dut"){
								vlanCtr++;
							}
						}else if(allline[d].Source.split(".")[0] == vlansArr){
							if(dstObj.DeviceType.toLowerCase() == "dut"){
								vlanCtr++;
							}
						}
					}
					if(vlanCtr > 1){
						$("#comOpEnaInterfaceTr").removeAttr("style");
					}
				}
			}else{
				$("#comOpEnaInterfaceTr").css({"display":"none"});
			}
		}
	}	
}

/*
 *
 *  FUNCTION NAME : commitOptionsOk
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : January 3, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : modifies MAINCONFIG xml sanity flag
 *  PARAMETERS    : 
 *
 */
function commitOptionsOk(){
	var devSan = $("#comOpDevSanity").is(":checked");
	var accSan = $("#comOpAccSanity").is(":checked");
	var connec = $("#comOpConnectivity").is(":checked");
	var enaInt = $("#comOpEnaInterface").is(":checked");
	var lnkSan = $("#comOpLinkSanity").is(":checked");
	var startR = $("#comOpStartRes").is(":checked");
	var endR = $("#comOpEndRes").is(":checked");
	for(var t=0; t<globalMAINCONFIG.length; t++){
		if(globalMAINCONFIG[t].MAINCONFIG[0].PageCanvas == pageCanvas){
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DeviceSanity = devSan.toString();
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity = accSan.toString();
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable = lnkSan.toString();
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface = enaInt.toString();
			StartReservation = startR.toString();
			EndReservation = endR.toString();
		}
	}
	StartReservation = startR.toString();
	EndReservation = endR.toString();
	if($("#comOpConnectivity").is(":visible")){
		globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity = connec.toString();
	}
	if($("#comOpConnectivity").parent().parent().parent().attr('style') == "display: none;"){
		globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity = "false";
	}
//	if($("#comOpStartRes").is(":visible")){
//		StartReservation = startR;
//	}
	if(lnkSan == "true" || lnkSan == true){
		lnkSan = "yes";
	}else{
		lnkSan = "no";
	}
	if(globalInfoType == "JSON"){
		var devices = getDevicesNodeJSON();
    }else{
        var devices =devicesArr;
	}
	for(var a=0;a < devices.length; a++){
		devices[a].ConnectivityFlag = lnkSan;
	}
	for(var b=0;b < window['variable' + dynamicLineConnected[pageCanvas]].length; b++){
		window['variable' + dynamicLineConnected[pageCanvas]][b].ConnectivityFlag = lnkSan;
	}
	window['variable' + ConnectivityFlag[pageCanvas]] = lnkSan;
//	enablePort = enaInt;
//	if(ConnectivityFlag == "yes"){
//		enablePort = true;
//	}
	setTimeout(function(){
    	if(TimePicker == false){
        	$("#RequestButton").trigger("click");
         }
   	},1000);
	showPickerOption();
}

/*
 *
 *  FUNCTION NAME : resetOptionsOk
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : January 3, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : resets checkboxs in the commit options
 *  PARAMETERS    : 
 *
 */
function resetCommitOptions(){
	$("#comOpDevSanity").prop('checked',true);
	$("#comOpAccSanity").prop('checked',true);
	$("#comOpConnectivity").prop('checked',true);
	$("#comOpConnectivity").parent().parent().parent().css({'display':'none'});
	$("#comOpEnaInterface").prop('checked',false);
	$("#comOpEnaInterface").parent().parent().parent().css({'display':'none'});
	$("#comOpLinkSanity").prop('checked',false);
	$("#comOpLinkSanity").parent().parent().parent().css({'display':'none'});
	$("#comOpStartRes").prop('checked',false);
	$("#comOpEndRes").prop('checked',false);
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DeviceSanity = "true";
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity = "true";
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity = "false";
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable = "false";
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface = "false";
}

/*
 *
 *  FUNCTION NAME : newDevice
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 26, 2013 
 *  MODIFIED BY   : Cathyrine C. Bobis 
 *  REVISION DATE : March 10, 2014
 *  REVISION #    : 
 *  DESCRIPTION   : sends query getalldevices
 *  PARAMETERS    : 
 *
 */
function newDevice(devtype){
	if(globalDeviceType == "Mobile"){
        loading('show');
//    }else{
//		ajaxLoader('show','Processing Information ...')
	}
	$.ajax({
		url: getURL("ConfigEditor2","JSON"),
		data : {
			"action": "getalldevices",
			//"query": "user="+globalUserName,
			"query": "{  'QUERY' : [{ 'user' : '"+globalUserName+"' }] }"
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			if(globalDeviceType == "Mobile"){
        		loading('hide');
//			}else{
//				ajaxLoader('hide');
		    }
				var dat = data.replace(/'/g,'"');
		        var dat2 = $.parseJSON(dat);
				var MAINCONFIG = dat2.MAINCONFIG;
				
				var domavail = MAINCONFIG[0].Domain.split(",");
				var devinfos = MAINCONFIG[0].Info.split("^");

				//add domain selection
				var domopt = '<option>Select</option>';
				$.each(domavail , function(i, v) {
					var tmpdom = v.split(":");
					domopt += "<option value='"+tmpdom[1]+"'>"+tmpdom[0]+"</option>";
				});

				if(devtype=="device"){
					$('#addNewDevDomainOpt').empty().append(domopt);
				}else if(devtype=="testtool"){
					$('#addNewTestTDomainOpt').empty().append(domopt);
				}

				//add partner address selection
				var networkdevs = [];
				var l1switch = [];
				var l2switch = [];
				var appliance = [];
				var termserver = [];
				var passthrough = []; 
				autoDDevLists = [];

				for(var i=0; i<devinfos.length; i++){
					var tempdata = devinfos[i].split(",");
					var type = tempdata[tempdata.length-1];
					var devOpt = "";
					if(tempdata[1] != ""){devOpt = "<option value='"+tempdata[0]+"'>"+tempdata[1]+"</option>";}
				
					switch(type) {
						case "Networking Device":
							networkdevs.push({devicename: tempdata[0], info: tempdata.slice(0,tempdata.length-1).join(","), opt: devOpt});
						break;
						case "Layer 1 Switch":
							l1switch.push({devicename: tempdata[0], info: tempdata.slice(0,tempdata.length-1).join(","), opt: devOpt});
						break;
						case "Layer 2 Switch":
							l2switch.push({devicename: tempdata[0], info: tempdata.slice(0,tempdata.length-1).join(","), opt: devOpt});
						break;
						case "Appliance":
							appliance.push({devicename: tempdata[0], info: tempdata.slice(0,tempdata.length-1).join(","), opt: devOpt});
						break;
						case "Terminal Server":
							termserver.push({devicename: tempdata[0], info: tempdata.slice(0,tempdata.length-1).join(","), opt: devOpt});
						break;
						case "Pass through device":
							passthrough.push({devicename: tempdata[0], info: tempdata.slice(0,tempdata.length-1).join(","), opt: devOpt});
						break;
					}
				}
				autoDDevLists.push({NetworkingDevices: networkdevs, L1Switch: l1switch, L2Switch: l2switch, Appliance: appliance, TermServer: termserver, PassThrough: passthrough});
				autoDDomainOptions = domopt;

		}
	});	
}

/*
 *
 *  FUNCTION NAME : checkDeviceInDbAutoD
 *  AUTHOR        : Cathyrine C. Bobis 
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : sends query autodiscover
 *  PARAMETERS    : 
 *
 */
function checkDeviceInDbAutoD(){
	var infoType = globalInfoType;
	if(globalDeviceType == "Mobile"){
        loading('show');
    }

	if(infoType=="XML"){
		var urlx = getURL("RM");
		var queryS = "managementip="+autoDDevData[0].ManagementIp+"^"+
			"consoleip="+autoDDevData[0].ConsoleIp+"^"+
			"hostname="+autoDDevData[0].HostName;
	}else{
		var urlx = getURL("ConfigEditor2","JSON");
		var queryS = "{  'QUERY' : [{ 'managementip' : '"+autoDDevData[0].ManagementIp
			+"', 'consoleip' : '"+conip+"', 'hostname' : '"
			+autoDDevData[0].HostName+"' }] }";
	}

	var conip = autoDDevData[0].ConsoleIp+":"+autoDDevData[0].ConsolePort;
	if(conip==":"){conip = "";}
	
	$.ajax({
		url: urlx,
		data : {
			"action": "checkdeviceindb",
			"query": queryS,
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			if(globalDeviceType == "Mobile"){
        		loading('hide');
		    }
			if(!data){
/*				if(globalDeviceType == "Mobile"){
					doSaveAutoDevice();
				}else{
					doSaveAutoDeviceMain();
				}			
*/				error("Process Failed!","Notification"); return;
			}
			if(globalInfoType!="XML"){
				data = $.trim(data);
				var dat = data.replace(/'/g,'"');
		        var dat2 = $.parseJSON(dat);
				var RESULT = dat2.RESULT;
				var Result = RESULT[0].Result

				if(Result=="1"){
					if(globalDeviceType == "Mobile"){
						doSaveAutoDevice();
					}else{
						doSaveAutoDeviceMain();
					}
				}else if(Result.match(/already exists in the database/g)){
					//prompt if update or overwrite
					confirmAutoDExec(Result);
				}else{
					error(Result,"Notification");
					return;
				}
			}else{
				if(data=="") {
				/*}else if(data.match(/already exists in the database/g)){
					//prompt if update or overwrite
					if(flag=="update"){
						autoDDevData[0].SaveOption = 'Update';
					}else if(flag=="overwrite"){
						autoDDevData[0].SaveOption = 'Overwrite';
					}else{return false;}*/
					return true;
				}else{
					error(data,"Notification")
					return false;
				}	
			}
		}
	});
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/18/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function confirmAutoDExec(msg){

	//$('#autoDconfirmHeader').empty().append(header);
	
	if(globalDeviceType == "Mobile"){
		$('#autoDconfirmBody').empty().append(msg);
		$('#autoDConfirmChange').popup( {create: function(){
			$(document).on('click','#confirmOverwrite', function(){
				//$('#autoDConfirmChange').popup('close');
				$('#autoDConfirmChange').popup('close').hide();
				autoDDevData[0].SaveOption = 'Overwrite';
				doSaveAutoDevice();
			});
			$(document).on('click','#confirmUpdate', function(){
				$('#autoDConfirmChange').popup("close").hide();
				autoDDevData[0].SaveOption = 'Update';
				doSaveAutoDevice();
			});
			$(document).on('click','#confirmCancel', function(){
				$('#autoDConfirmChange').popup("close").hide();
				//loadNewDeviceContent("Manual");
				//$("#autoDConfirmChange").popup('destroy');
			});
		}});

		setTimeout(function(){
     		//$('#autoDConfirmChange').popup("open");
	     	$('#autoDConfirmChange').show().popup("open");
		},300);
	}else{
		var todo="autoDDevData[0].SaveOption = 'Overwrite'; doSaveAutoDeviceMain();"
		var todo2="autoDDevData[0].SaveOption = 'Update'; doSaveAutoDeviceMain();"
		alerts(msg,todo,"confirmautod","",todo2);
	}

}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/19/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function doSaveAutoDeviceMain() {
	var autoDArg = createDataAutoD();
	if(newDeviceAutoD(autoDArg)==false){
		return;
	}else{
	//if(newDeviceAutoD(autoDDevData[0])==false){return;}

		/* showPopup auto-d logs */
		var tmpip = autoDDevData[0].ManagementIp;
		if(tmpip==""){tmpip = autoDDevData[0].ConsoleIp+":"+autoDDevData[0].ConsolePort}
		showAutoLogPage(autoDDevData[0].LogsName,globalUserName,tmpip,autoDDevData[0].PartnerIp);
		autoDcomplete = false;
	}
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/19/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function showAutoLogPage(fname,user,ip,pIp){
	var h = $(window).height() - 100;

	$( "#autoDLogsDialog" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		//title: "Auto Discovery"
	});
	$( "#autoDLogsDialog" ).empty().append("<center id='processingPage'><div  style='text-align:center;'>Processing Information...<br /><img src='img/ajax-loader.gif'/></div></center>");
	$( "#autoDLogsDialog" ).load('pages/ConfigEditor/AutoDTableLogs.html',function(){
		//$('.ui-dialog-title').css({'margin-left':'10px','text-align':'center','margin-top':'7px'});
		//$('span.ui-dialog-title').text('Auto Discovery');
		if(fname!='' && user!='' && ip!=''){
			queryAutoDiscoveryLogs(fname,user,ip,pIp);
		}else{
			alertUser("Process Failed.","Notification");
		}

		$(".ui-dialog").position({
		   my: "top",
		   at: "top",
		   of: window
		});
		$('#processingPage').remove();
	});
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/19/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function getStatusAutoD(){
	if(autoDcomplete){
		showAutoSavePage();
		autoDcomplete = false;	
	}else{
		initAutoD = "";
/*	do not delete
 *		if(AutoDType!="admin"){
			$('#newdevicePopUp').dialog('destroy');
		}
*/
		$('#autoDLogsDialog').dialog('destroy');
		autoDcomplete = false;
		clearTimeout(initAutoD);
	}
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/20/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function cancelOnLogsAutoD(){
	var execFunc = "clearTimeout\(initAutoD\);";
	execFunc += "if(cancelAutoDQuery()==false){return;}";
	execFunc += "$('#autoDLogsDialog').dialog('destroy');";
	var msg = "Cancel auto discovery of the device?";
	alerts(msg,execFunc,"yesno");
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/20/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function showAutoSavePage(){
	var h = $(window).height() - 100;

	//$( "#autoDLogsDialog" ).dialog({
	$( "#autoDSaveDialog" ).dialog({
		modal: true,
		autoResize:false,
		//min-width:800,
		//min-height:500,
		width: "auto",
		//title: "Optional Device Information"
	});
	$( "#autoDSaveDialog" ).empty().append(loader);
	$('.ui-dialog-title').css({'margin-left':'10px','text-align':'center','margin-top':'7px'});
	$('span.ui-dialog-title').text('Optional Device Information');
	autoDCompleteDevInfo(autoDDevData[0].ManagementIp);
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/21/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function toSaveAddInfoAutoD() {
	var saveargs = gatherAddInfoAutoD();
//	$( "#alertPopUp" ).empty().append("<center id='processingPage'><div  style='text-align:center;'>Processing Information...<br /><img src='img/ajax-loader.gif'/></div></center>");
	if(saveAutoDAddInfoQuery(saveargs)==false){
		return;
	}
	alerts("Process Complete");	
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/21/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function cancelSaveAutoD() {
	var todo = "$('#autoDSaveDialog').dialog('destroy'); ";
	todo += "getDataForDeviceListJSON(saveAutoDDevNode); drawImage(); saveAutoDDevNode = [];autoDCurIdx = -1;";
	alerts("Cancel saving optional device info?",todo,"yesorno");
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/15/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function gatherAddInfoAutoD() {
	var autoDS = [];
	var autoDS2 = [];
	var tag = ["hostname","netmask","managemenint","tftpip","tftpgateway","rp1console",
		"rp1consoleport","rp1aux","rp2console","rp2consoleport","rp2aux","primarybootimage",
		"secondarybootimage","primaryconfig","secondaryconfig","mgmtip"]
		//,"powerinfo","access","prototypeflag"];
	var objs = [$('#autoDSaveHost'),$('#autoDSaveNetMask'),$('#autoDSaveMgmtIntf'),
		$('#autoDSaveTftpServer'),$('#autoDSaveGateway'),$('#autoDSaveRP1ConAdd'),
		$('#autoDSaveRP1ConPort'),$('#autoDSaveRP1AuxAdd'),$('#autoDSaveRP2ConAdd'),
		$('#autoDSaveRP2ConPort'),$('#autoDSaveRP2AuxAdd'),$('#autoDSaveSoftPriImg'),
		$('#autoDSaveSoftSecImg'),$('#autoDSaveConfPriImg'),$('#autoDSaveConfSecImg'),
		$('#autoDSaveMgmtIp')];

	for(var i=0;i<tag.length;i++){
		if(objs[i].val()!=undefined){
			autoDS.push(tag[i]+"="+objs[i].val());
			autoDS2.push("'"+tag[i]+"': '"+objs[i].val()+"'");
		}
	}
	if($('#autoDSaveNATContent > tr').length>0){
		var tmpnat = [];
		$.each($('#autoDSaveNATContent > tr'), function(index,object){
			var atype = object.children[0].children[0];
			var ipadd = object.children[1].children[0];
			var ipport = object.children[2].children[0];
			if(atype==undefined) {atype = ""}
			if(ipadd==undefined) {ipadd = ""}
			if(ipport==undefined) {ipport = ""}
			if( atype != "" && ipadd != "" ){
				tmpnat.push(atype+","+ipadd+","+ipport);
			}
		});
		autoDS.push("nat="+tmpnat.join(":"));
		autoDS2.push("'nat': '"+tmpnat.join(":")+"'");
	}
	if($('#autoDSavePowerTbody > tr').length>0){
		var tmppwr = [];
		$.each($('#autoDSavePowerTbody > tr'), function(index,object){
			var ipadd = object.children[0].children[0];
			var user = object.children[1].children[0];
			var pass = object.children[2].children[0];
			var outlet = object.children[3].children[0];
			if(ipadd==undefined) {ipadd = ""}
			if(user==undefined) {user = ""}
			if(pass==undefined) {pass = ""}
			if(outlet==undefined) {outlet = ""}
			if(ipadd!=="" && user!="" && pass!="" && outlet!=""){
				tmppwr.push(ipadd+","+user+","+pass+","+outlet);
			}
		});
		autoDS.push("powerinfo="+tmppwr.join(":"));
		autoDS2.push("'powerinfo': '"+tmppwr.join(":")+"'");
	}
	autoDS.push("prototypeflag="+$('#autoDSaveProtoChk').is(':checked'));
	autoDS2.push("'prototypeflag': '"+$('#autoDSaveProtoChk').is(':checked')+"'");
	if(globalInfoType=="XML"){
		return autoDS.join("&");
	}else{
		return "{ 'QUERY' : [{ "+autoDS2.join(", ")+"}  ] }";
	}
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/26/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function createPowerManAutoD(evt,obj){
	var key = event.keyCode;
    var asciiCode = String.fromCharCode(key);
	if (key == 13 && $(obj).val()!="" ) {
		docreatePowerManAutoD($(obj).val());
	}else{
		if(!checkNumberInputChar(evt)){ return false; }
	}
	return true;
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/26/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function docreatePowerManAutoD(count){
	if(count==undefined || count==""){
		return;
	}
	var content = "";
	for(var i=0; i<parseInt(count); i++){
		content += "<tr id='autoDPower"+i+"'>"
		content += "<td><input type='text' style='border:none;font-size:16px;width:100%;' placeholder='Ip Address:' onKeyPress='return checkIPInputChar(event)'></td>"
		content += "<td><input type='text' style='border:none;font-size:16px;width:100%;' placeholder='Username:' onKeyPress='return checkValConfigText(event)'></td>"
		content += "<td><input type='Password' style='border:none;font-size:16px;width:100%;' placeholder='Password:' onKeyPress='return checkValConfigText(event)'></td>"
		content += "<td><input type='text' style='border:none;font-size:16px;width:100%;' placeholder='Port:' onKeyPress=\"return checkNumberInputChar(event,this,'20');\" ></td>"
		content += "</tr>"
	}
	$('#autoDSavePowerTbody').empty().append(content);
	$('#autoDSavePowerTableCont').show();
	var aswidth = $('#autoDSavePowerTableCont').width()/4;
	$('#autoDSavePowerIp').width(aswidth);
	$('#autoDSavePowerUser').width(aswidth);
	$('#autoDSavePowerPass').width(aswidth);
	$('#autoDSavePowerPort').width(aswidth);
	
}

/*
 *
 *  FUNCTION NAME : newDeviceAutoD
 *  AUTHOR        : Cathyrine C. Bobis 
 *  DATE          : March 13, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : sends query autodiscover
 *  PARAMETERS    : 
 *
 */
function newDeviceAutoD(args,idx){
	if(globalDeviceType == "Mobile"){
        loading('show');
//    }else{
//		ajaxLoader('show','Processing Information ...')
	}
	var urlx = "";
	if(globalInfoType == "JSON"){
		urlx = getURL("ConfigEditor2","JSON");
	}else{
		urlx = getURL("RM");
	}
	$.ajax({
		url: urlx,
		data : {
			"action": "autodiscover",
			"query": args,
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			data = $.trim(data);
			if(globalDeviceType == "Mobile"){
        		loading('hide');
//			}else{
//				ajaxLoader('hide');
		    }
			if(!data){error("Process Failed!","Notification");return false;}
			if(AutoDType.toLowerCase()=="testtool"){
				$('#newtesttolPopUp').empty().dialog('destroy');
			}else if(AutoDType.toLowerCase()=="server"){
				$('#newserverPopUp').empty().dialog('destroy');
			}else if(AutoDType.toLowerCase()=="admin"){
				$('#Alert2').empty().dialog('destroy');
			}else{
				$('#newdevicePopUp').empty().dialog('destroy');
			}

			if(globalInfoType == "JSON"){
				var dat = data.replace(/'/g,'"');
		        var dat2 = $.parseJSON(dat);
				var RESULT = dat2.RESULT;
				var Result = RESULT[0].Result

				if(Result=="1"){
					return true;
				}else{
					alertUser("Process failed.");
					return false;
				}
			}else{
				if(data=="1") {
					return true;
				}else{
					alertUser("Process failed.");
					return false;
				}	
			}
		}
	});
}

/*
 *
 *  FUNCTION NAME : cancelAutoDQuery
 *  AUTHOR        : Cathyrine C. Bobis 
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : sends query canceldiscovery
 *  PARAMETERS    : 
 *
 */
function cancelAutoDQuery(idx){
	if(globalDeviceType == "Mobile"){
        loading('show');
    }
	if(globalInfoType=="XML"){
		var urlx = getURL("RM");
		var queryS = "ip="+autoDDevData[0].ManagementIp+"&"+
			"option=&partnerip="+autoDDevData[0].PartnerIp;
	}else{
		var urlx = getURL("ConfigEditor2","JSON");
		var queryS = "{'QUERY':[{'logname':'"+autoDDevData[0].LogsName+
			"', 'ipaddress' : '"+autoDDevData[0].ManagementIp+"', 'domain': '"+
			autoDDevData[0].Domain+"'}]}";
	}
	$.ajax({
		url: urlx,
		data : {
			"action": "cancelautodiscover",
			"query": queryS,
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			data = $.trim(data);
			if(globalDeviceType == "Mobile"){
        		loading('hide');
		    }
			if(!data){error("Process Failed!","Notification");}
			if(globalInfoType == "JSON"){
				var dat = data.replace(/'/g,'"');
		        var dat2 = $.parseJSON(dat);
				var RESULT = dat2.RESULT;
				var Result = RESULT[0].Result

				if(Result=="1"){
					return true;
					autoDCurIdx = -1;
				}else{
					alertUser("Process failed.");
					return false;
				}
			}else{
				if(data=="1") {
					return true;
				}else{
					alertUser("Process failed.");
					return false;
				}	
			}

		}
	});
}

/*
 *
 *  FUNCTION NAME : saveAutoDAddInfoQuery
 *  AUTHOR        : Cathyrine C. Bobis 
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : sends query 
 *  PARAMETERS    : 
 *
 */
function saveAutoDAddInfoQuery(args,idx){
	if(globalDeviceType == "Mobile"){
        loading('show');
//    }else{
//		ajaxLoader('show','Processing Information ...');
	}
	if(globalInfoType=="XML"){
		var urlx = getURL("ConfigEditor2","XML");
	}else{
		var urlx = getURL("ConfigEditor2","JSON");
	}
	$.ajax({
		url: urlx,
		data : {
			"action": "saveadditionalinfo",
			"query": args,
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			if(globalDeviceType == "Mobile"){
        		loading('hide');
		    }else{
				$('#autoDSaveDialog').dialog('destroy');
//				ajaxLoader('hide');
//				$("#alertPopUp").dialog('destroy');
			}
			data = $.trim(data);
			if(globalInfoType == "JSON"){
				var dat = data.replace(/'/g,'"');
		        var dat2 = $.parseJSON(dat);
				var RESULT = dat2.RESULT;
				var Result = RESULT[0].Result

				if(Result=="1"){
					if(!autoDDevData[0].Type.toLowerCase().match(/switch/g)
						&& !autoDDevData[0].Type.toLowerCase().match(/terminal server/g)
						&& !autoDDevData[0].Type.toLowerCase().match(/power/g)
						) {
						if(AutoDType != "admin"){
							autoDCompleteDevInfo(autoDDevData[0].ManagementIp,"load");
						}
					}
					//saveAutoDFlag = 0;
					autoDCurIdx = -1;
					alertUser("Process Complete.");
					return true;
				}else{
					alertUser("Process failed.");
					return false;
				}
			}else{
				if(data=="1") {
					if(!autoDDevData[0].Type.toLowerCase().match(/switch/g)
						&& !autoDDevData[0].Type.toLowerCase().match(/terminal server/g)
						&& !autoDDevData[0].Type.toLowerCase().match(/power/g)
						) {
						if(AutoDType != "admin"){
							autoDCompleteDevInfo(autoDDevData[0].ManagementIp,"load");
						}
					}
					//saveAutoDFlag = 0;
					alerts("Process Complete.");
					return true;
				}else{
					alerts("Process failed.");
					return false;
				}
			}	
		}
	});
}


/*
 *
 *  FUNCTION NAME : autoDCompleteDevInfo
 *  AUTHOR        : Cathyrine C. Bobis 
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : sends query autodiscover
 *  PARAMETERS    : 
 *
 */
function autoDCompleteDevInfo(ip,type,idx){
	if(globalInfoType == "XML"){
		var urlx = getURL("ConfigEditor2");
		var queryS = "hostname="+ip;
	}else{
		var urlx = getURL("ConfigEditor","JSON");
		var queryS = "{ 'QUERY': [{ 'hostname': '"+ip+"' ,"
		if(type){
			if(type=="load"){
				queryS += "'type': 'fetch' ,";
			}
		}else{
			queryS += "'type': 'save' ,";
		}
		queryS+= "'logsname': '"+autoDDevData[0].LogsName+"'}]}";
	}
	if(globalDeviceType=="Mobile"){
		loading("show");
/*    }else{
		if(type){
			if(type=="load"){
				ajaxLoader('show','Processing Information ...');
			}
		}else{
			ajaxLoader('show','Saving Discovered Information ...');
		}
*/
	}
	$.ajax({
		url: urlx,
		data : {
			"action": "getmaplinkusingip",
			"query": queryS,
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			data = $.trim(data);
			if(globalDeviceType=="Mobile"){
				loading("hide");
		    //}else{
			//	ajaxLoader('hide');
			}
			if(data){
				//show data in #autoDSaveDialog 
				if (globalInfoType == "XML"){
					var parser = new DOMParser();
					var xmlDoc = parser.parseFromString(data , "text/xml" );
					var DEVICES = xmlDoc.getElementsByTagName('DEVICES');
					var DEVICE = xmlDoc.getElementsByTagName('DEVICE');

					var host = DEVICE[0].getAttribute("DeviceName");
					if(autoDDevData[0].HostName != host && autoDDevData[0].HostName!="") {
						var doCancel = "$('#autoDSaveHost').val('"+autoDDevData[0].HostName+"');";
						var execFunc = "$('#autoDSaveHost').val('"+host+"');";
						confirmation("Different Device Name '"+host+"' found. Do you want to use this?","Confirmation",execFunc,doCancel);
					}else{
						$('#autoDSaveHost').val(host);
					}
					$('#autoDSaveUsername').val(DEVICE[0].getAttribute("Username"));
					$('#autoDSavePassword').val(DEVICE[0].getAttribute("Password"));
					$('#autoDSaveMgmtIp').val(DEVICES[0].getAttribute("IpAddress"));
					$('#autoDSaveNetMask').val(DEVICES[0].getAttribute("SubnetMask"));
					$('#autoDSaveMgmtIntf').val(DEVICES[0].getAttribute("ManagementInterface"));
					$('#autoDSaveTftpServer').val(DEVICES[0].getAttribute("TbTftpServerAddress"));
					$('#autoDSaveGateway').val(DEVICES[0].getAttribute("TFTPGateway"));
					var rpCtr = (DEVICE[0].getAttribute("RouteProcessor").split(",")).length;

					if(rpCtr>0) {
						$('#autoDSaveRP1').show();
						var rp1 = DEVICES[0].getAttribute("RP0ConsoleIp").split(":");
						if(rp1==""){rp1 = DEVICES[0].getAttribute("ConsoleIp").split(":");}
						if(rp1!=""){$('#autoDSaveRP1ConAdd').val(rp1[0]);}
						if(rp1!="" && rp1.length>1){$('#autoDSaveRP1ConPort').val(rp1[1]);}
						//$('#autoDSaveRP1AuxAdd').val();
						//$('#autoDSaveRP1AuxPort').val();
					}else{$('#autoDSaveRP1').hide();}

					if(rpCtr>1) {
						$('#autoDSaveRP2').show();
						var rp2 = DEVICES[0].getAttribute("RP1ConsoleIp").split(":");
						if(rp2!=""){$('#autoDSaveRP2ConAdd').val(rp2[0]);}
						if(rp2!="" && rp2.length>1){$('#autoDSaveRP2ConPort').val(rp2[1]);}
						//$('#autoDSaveRP2AuxAdd').val();
						//$('#autoDSaveRP2AuxPort').val();
					}else{$('#autoDSaveRP2').hide();}

					$('#autoDSaveSoftPriImg').val(DEVICES[0].getAttribute("SystemImageName"));
					//$('#autoDSaveSoftSecImg').val();
					
					$('#autoDSaveConfPriImg').val(DEVICES[0].getAttribute("SystemConfigName"));
					//$('#autoDSaveConfSecImg').val();
					var rp1 = DEVICES[0].getAttribute("RP0ConsoleIp").split(":");
					if(rp1!=""){$('#autoDSaveRP1ConAdd').val(rp1[0]);}
					if(rp1!="" && rp1.length>1){('#autoDSaveRP1ConPort').val(rp1[1]);}
					//$('#autoDSaveRP1AuxAdd').val();
					//$('#autoDSaveRP1AuxPort').val();

					var rp2 = DEVICES[0].getAttribute("RP1ConsoleIp").split(":");
					if(rp2!=""){$('#autoDSaveRP2ConAdd').val(rp2[0]);}
					if(rp2!="" && rp2.length>1){$('#autoDSaveRP2ConPort').val(rp2[1]);}
					//$('#autoDSaveRP2AuxAdd').val();
					//$('#autoDSaveRP2AuxPort').val();
					//$('#').val();
				}else{
					console.log(data);
					var dat = data.replace(/'/g,'"');
			        var dat2 = $.parseJSON(dat);
					if(type){
						if(type=="load"){
							saveAutoDDevNode = [];
							//pushdevices(DEVICES);
							getDataForDeviceListJSON(dat2);
							drawImage();
							return;
						}
					}else{saveAutoDDevNode = dat2;}
					if(globalDeviceType=="Mobile"){
						assignValAutoDSave(dat2);
					}else{
				
						$( "#autoDSaveDialog" ).empty().append("<center id='processingPage'><div  style='text-align:center;'>Processing Information...<br /><img src='img/ajax-loader.gif'/></div></center>");
						$( "#autoDSaveDialog" ).load('pages/ConfigEditor/autoDSaveInfo.html',function(){
							$('.ui-dialog-title').css({'margin-left':'10px','text-align':'center','margin-top':'7px'});
							$('span.ui-dialog-title').text('Optional Device Information');
							$('#accordion').accordion();
							$("#autoDSaveDialog").trigger('create');

							//$('#autoDSavePowerMan').hide();
							$('#autoDSaveFusionInfo').hide();
							$('#autoDSaveNATTableCont').hide();
							assignValAutoDSave(dat2);

							$(".ui-dialog").position({
							   my: "top",
							   at: "top",
							   of: window
							});
							$('#processingPage').remove();
							$( "#autoDSaveDialog" ).width(1000);
						});
					}
				}
			}else{
				if(globalDeviceType=='Mobile'){
				}else{
					//$('#autoDSaveDialog').dialog('destroy');
					$('#autoDLogsDialog').dialog('destroy');
				}
				if(type==load){
					if(globalDeviceType=="MOBILE"){
					}else{
						$('#autoDSaveDialog').dialog('destroy');
					}
				}
				alerts("Process failed.");return;
			}
		}
	});
}

function assignValAutoDSave(dat2){
	$('#autoDLogsDialog').dialog('destroy');

	var DEVICES = dat2.MAINCONFIG[0].DEVICES;
	var DEVICE = DEVICES[0].DEVICE;
	var MAINCONFIG = dat2.MAINCONFIG;
	var host = DEVICE[0].DeviceName;

	if(autoDDevData[0].HostName != host && autoDDevData[0].HostName!="") {
		var doCancel = "$('#autoDSaveHost').val('"+autoDDevData[0].HostName+"');";
		var execFunc = "$('#autoDSaveHost').val('"+host+"');";
		confirmation("Different Device Name '"+host+"' found. Do you want to use this?","Confirmation",execFunc,doCancel);
	}else{
		$('#autoDSaveHost').val(host);
	}
	$('#autoDSaveUsername').val(DEVICE[0].Username)
	$('#autoDSavePassword').val(DEVICE[0].Password);
	$('#autoDSaveMgmtIp').val(DEVICES[0].IpAddress);
	$('#autoDSaveNetMask').val(DEVICES[0].SubnetMask);
	$('#autoDSaveMgmtIntf').val(DEVICES[0].ManagementInterface);
	$('#autoDSaveTftpServer').val(DEVICES[0].TbTftpServerAddress);
	$('#autoDSaveGateway').val(DEVICES[0].TFTPGateway);
	var rpCtr = (DEVICE[0].RouteProcessor.split(",")).length;

	if(rpCtr>0) {
		$('#autoDSaveRP1').show();
		var rp1 = DEVICES[0].RP0ConsoleIp.split(":");
		if(rp1==""){rp1 = DEVICES[0].ConsoleIp.split(":");}
		if(rp1!=""){$('#autoDSaveRP1ConAdd').val(rp1[0]);}
		if(rp1!="" && rp1.length>1){$('#autoDSaveRP1ConPort').val(rp1[1]);}
		//$('#autoDSaveRP1AuxAdd').val();
		//$('#autoDSaveRP1AuxPort').val();
	}else{$('#autoDSaveRP1').hide();}

	if(rpCtr>1) {
		$('#autoDSaveRP2').show();
		var rp2 = DEVICES[0].RP1ConsoleIp.split(":");
		if(rp2!=""){$('#autoDSaveRP2ConAdd').val(rp2[0]);}
		if(rp2!="" && rp2.length>1){$('#autoDSaveRP2ConPort').val(rp2[1]);}
		//$('#autoDSaveRP2AuxAdd').val();
		//$('#autoDSaveRP2AuxPort').val();
	}else{$('#autoDSaveRP2').hide();}

	$('#autoDSaveSoftPriImg').val(DEVICES[0].SystemImageName);
	//$('#autoDSaveSoftSecImg').val();
					
	$('#autoDSaveConfPriImg').val(DEVICES[0].SystemConfigName);
	//$('#autoDSaveConfSecImg').val();
	var rp1 = DEVICES[0].RP0ConsoleIp.split(":");
	if(rp1!=""){$('#autoDSaveRP1ConAdd').val(rp1[0]);}
	if(rp1!="" && rp1.length>1){('#autoDSaveRP1ConPort').val(rp1[1]);}
	//$('#autoDSaveRP1AuxAdd').val();
	//$('#autoDSaveRP1AuxPort').val();

	var rp2 = DEVICES[0].RP1ConsoleIp.split(":");
	if(rp2!=""){$('#autoDSaveRP2ConAdd').val(rp2[0]);}
	if(rp2!="" && rp2.length>1){$('#autoDSaveRP2ConPort').val(rp2[1]);}
	//$('#autoDSaveRP2AuxAdd').val();
	//$('#autoDSaveRP2AuxPort').val();
	//$('#').val();

}

/*
 *
 *  FUNCTION NAME : loadLoadConfigOk
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 17, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : change the exclusivity of the device
 *  PARAMETERS    : 
 *
 */
function loadDeviceConfigOk(glblDevMenImg,chk){
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var a=0; a < devices.length; a++){
        if(devices[a].ObjectPath == glblDevMenImg){
			if(chk == true){
				devices[a].Exclusivity = "Exclusive";
			}else{
				devices[a].Exclusivity = "Non-Exclusive";
			}
		}
	}
}
/*
 *
 *  FUNCTION NAME : loadLoadConfig
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 17, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : loads the configuration saved by the user
 *  PARAMETERS    : 
 *
 */
function loadLoadConfig(){
	$('#fileInput').hide();
	var vw="";
	 var InfoType = "JSON";
    $.ajax({
        url: getURL("ConfigEditor","JSON"),
		data : {
            "action": "fetch",
//            "query": "UserName="+globalUserName+"&Id="+globalUserId
			"query": "{'QUERY':[{'UserName':'"+globalUserName+"', 'Id':'"+globalUserId+"'}]}"
            
        },
        method: 'POST',
        proccessData: false,
        async:false,
        dataType: 'html',
        success: function(data) {
            var type = $('#loadConfTypeSelect > option:selected').html();
            var selOpt="";
            selOpt += "<option>Select Configuration</option>";

            if(InfoType == "XML"){
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(data , "text/xml" );
                var MAINCONFIG = xmlDoc.getElementsByTagName('MAINCONFIG');
                var CONFIGURATION = xmlDoc.getElementsByTagName('CONFIGURATION');

                for (var x=0; x<CONFIGURATION.length; x++){
                    var typeFrmName = CONFIGURATION[x].getAttribute("TopologyName").split(".")[1];
                    if((type=='Static' || type=='undefined') && CONFIGURATION[x].getAttribute("FileType").toLowerCase() == 'static'){
                        selOpt += "<option>"+CONFIGURATION[x].getAttribute('TopologyName')+"</option>";
                    }
                }
            }else{
                    if (type == 'Static' || type == 'undefined'){
                        if(typeFrmName == "stat")vw = "display:block";
                        else vw = "display:none";
                        $('.fileType').hide();
						$('#fileInput').hide();
                    }else if(type == 'Dynamic'){
                        if(typeFrmName == "dyn") vw = "display:block";
                        else vw = "display:none";
                        $('.fileType').hide();
						$('#fileInput').hide();
                    }else if(type == 'Testbed'){
                        if(typeFrmName == "tb") vw = "display: block";
                        else vw = "display:none";
                        $('.fileType').hide();
                    }else if(type == 'File'){
                        $('.fileType').show();
						$('#fileInput').show();
                    }else{
                        $('.fileType').hide();
                    }
				var dat = data.replace(/'/g,'"');
                var data2 = $.parseJSON(dat);
                var CONFIGURATION = data2.MAINCONFIG[0].CONFIGURATION;
                for (var x=0; x<CONFIGURATION.length; x++){
                    var typeFrmName = CONFIGURATION[x].Name.split(".")[1];
                    selOpt += "<option style='"+vw+"' value='"+CONFIGURATION[x].Name+"' type='"+typeFrmName+"' id='"+CONFIGURATION[x].Id+"' filetype='"+CONFIGURATION[x].FileType+"'>"+CONFIGURATION[x].Name+"</option>";
                }
            }
            $("#loadConfSelect").html(selOpt);
            if (globalDeviceType == "Mobile"){
                $("#loadConfSelect").trigger("create");
            }
        }
    });
    if(globalDeviceType!="Mobile"){
        $(".ui-dialog").position({
            my: "center",
            at: "center",
            of: window
        });
    }

} 

/*
 *
 *  FUNCTION NAME : loadLoadConfigOk
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 17, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : loads the configuration saved by the user
 *  PARAMETERS    : 
 *
 */
function loadLoadConfigOk(confName,mainid,fileType){
			$("#configPopUp").dialog('close');
	if(globalDeviceType=="Mobile"){
		loading('show');
	}else{
		ajaxLoader('show','Processing Information ...')
	}
	mainid = $('#loadConfSelect option:selected').attr('id');
    confName = $('#loadConfSelect').val();
    fileType = $('#loadConfSelect option:selected').attr('filetype');

	var val = $('#loadConfTypeSelect').val();
	if (globalInfoType == "XML"){
		if(val == "file"){
			uploadXML();
			return;
		}
	}
	//get extension of filename and store it in global variable
	var fileTypeValue=$("#fileInput").val();
	var newfilename = fileTypeValue.split(/(\\|\/)/g).pop();
	var ext = newfilename.split(".");
	Application = ext.pop();
	//clearCanvas
	if($("#clearCanvasCheckbox").is(":checked")){
		clearCanvas();				
	}
	loadConfigName = '';
	loadConfigName = confName;

	$.ajax({
		url: getURL("ConfigEditor", "JSON"),
		data : {
			"action": "load",
			"query": "{'QUERY' : [{'ConfigName': '"+confName+"', 'MainId': '"+mainid+"', 'FileType': '"+fileType+"'}]}" 
			 
		},
		method: 'POST',
		proccessData: false,
   //     async:false,
		dataType: 'html',
		success: function(data) {
			var dat = data.replace(/'/g,'"');
            var dat2 = $.parseJSON(dat);
			if(globalDeviceType=="Mobile"){
				loading('hide');
				$("#loadConfig").dialog('close');
			}else{
				ajaxLoader('hide');
			}
			if (globalInfoType == "XML"){	
				getDataFromXML(data);
			}else{
				removespecificconfig();
				getDataFromJSON(dat2);
			}
		}
	});
}

/*
 *
 *  FUNCTION NAME : uploadXML
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 20, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : loads the xml configuration uploaded by the user
 *  PARAMETERS    : 
 *
 */
function uploadXML(){
	var fileInput = document.getElementById('fileInput');
	var file = fileInput.files[0];
	var textType = /xml.*/;

	//get extension of filename and store it in global variable
	var fileTypeValue=$("#fileInput").val();
	var newfilename = fileTypeValue.split(/(\\|\/)/g).pop();
	var ext = newfilename.split(".");
	var fileName = fileTypeValue.split('\\').pop();
	Application = ext.pop();

	if($("#clearCanvasCheckbox").is(":checked")){
		clearCanvas();				
	}

	if (file.type.match(textType)) {
		var reader = new FileReader();
		reader.onload = function(e) {
			getDataFromXML(reader.result);
			if(globalDeviceType=="Mobile"){
				loading('hide');
				$("#loadConfig").dialog('destroy');
			}
			$("#configPopUp").dialog('destroy');
			$("#fileType").dialog('destroy');
		}

		reader.readAsText(file);	
	}else if(Application == "titan"){ 
		loadTitanFromLocDir(fileName);	
	}else {
		alert("File not supported!");
		if(globalDeviceType=="Mobile"){
			loading('hide');
			$("#loadConfig").dialog('destroy');
		}
		$("#configPopUp").dialog('destroy');
		$("#fileType").dialog('destroy');
	}
}

/*
 *
 *  FUNCTION NAME : loadDeleteConfig
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 17, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : loads the configuration saved by the user
 *  PARAMETERS    : 
 *
 */
function loadDeleteConfig(){
	var vw="";
	var InfoType = "JSON";
	$.ajax({
		url: getURL("ConfigEditor","JSON"),
		data : {
			"action": "fetch",
			"query": "{'QUERY':[{'UserName':'"+globalUserName+"', 'Id':'"+globalUserId+"'}]}"
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			var selOpt="";
			var type=$('#deleteConfTypeSelect > option:selected').html();

			selOpt += "<option value='default'>Select Configuration</option>";
			selOpt += "<option value='all'>All</option>";
			if(InfoType == "XML"){
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(data , "text/xml" );
				var MAINCONFIG = xmlDoc.getElementsByTagName('MAINCONFIG');
				var CONFIGURATION = xmlDoc.getElementsByTagName('CONFIGURATION');
				for (var x = 0; x < CONFIGURATION.length; x++){
					globalConfgName.push(CONFIGURATION[x].getAttribute("TopologyName"));
					globalConfgId.push(CONFIGURATION[x].getAttribute('Id'));
					var typeFrmName = CONFIGURATION[x].getAttribute("TopologyName").split(".")[1];
					selOpt += "<option value='"+CONFIGURATION[x].getAttribute('TopologyName')+"' type='"+typeFrmName+"' id='"+CONFIGURATION[x].getAttribute('Id')+"' filetype='"+CONFIGURATION[x].getAttribute("FileType")+"'>"+CONFIGURATION[x].getAttribute('TopologyName')+"</option>";
				}
			}else{
				var dat = data.replace(/'/g,'"');
				var data2 = $.parseJSON(dat);
				var main = data2.MAINCONFIG[0];
				var CONFIGURATION = data2.MAINCONFIG[0].CONFIGURATION;
				for (var x = 0; x < CONFIGURATION.length; x++){
					globalConfgName.push(CONFIGURATION[x].Topology);
					globalConfgId.push(CONFIGURATION[x].Id);
					var typeFrmName = CONFIGURATION[x].Name.split(".")[1];
		
					if(type=='Static' || type=='undefined'){
						if(typeFrmName == 'stat')vw = "display:block";
						else vw = "display:none";
					}else if(type == 'Dynamic'){
						if(typeFrmName == 'dyn')vw = "display:block";
						else vw = "display: none";
					}else if(type == "Testbed"){
						if(typeFrmName == 'tb')vw = "display:block";
						else vw = "display:none";
					}
					selOpt += "<option style='"+vw+"' value='"+CONFIGURATION[x].Name+"' type='"+typeFrmName+"' id='"+CONFIGURATION[x].Id+"' filetype='"+CONFIGURATION[x].FileType+"'>"+CONFIGURATION[x].Name+"</option>";
				}
			}
			$("#deleteConfSelect").html(selOpt);
//			$("#deleteConfSelect").selectmenu();
			if (globalDeviceType == "Mobile"){
				$("#deleteConfSelect").trigger("create");
			}	
			//$("#deleteConfSelect").selectmenu( "refresh" );
		}
	});
	if(globalDeviceType!="Mobile"){
		$(".ui-dialog").position({
    	    my: "center",
        	at: "center",
	        of: window
	   	});
	}

} 

/*
 *
 *  FUNCTION NAME : loadDeleteConfigOk
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 17, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : deletes configuration
 *  PARAMETERS    : 
 *
 */
function loadDeleteConfigOk(confName,mainid,fileType,all){
	if(globalDeviceType=="Mobile"){
		loading('show');
	}
	if (globalInfoType == "XML"){
		if(all == true){
			var qry = "ConfigName="+confName+"&MainId="+mainid;
		}else{
			var qry = "ConfigName="+confName+"&MainId="+mainid+"&FileType="+fileType;
		}
	}else{
		confName = $('#deleteConfSelect option:selected').val();
		mainid = $('#deleteConfSelect option:selected').attr('id');
		fileType = $('#deleteConfSelect option:selected').attr('filetype');
		if(confName=="all"){
			var qry = '{"QUERY": [{"ConfigName": "'+confName+'", "MainId": "'+mainid+'"}]}';
		}else{
			var qry = '{"QUERY": [{"ConfigName": "'+confName+'", "MainId": "'+mainid+'", "FileType": "'+fileType+'"}]}';
		}
	}
	$.ajax({
		url: getURL("ConfigEditor", "JSON"),
		data : {
			"action": "delete",
			"query": qry
		},
		method: 'POST',
		proccessData: false,
		dataType: 'html',
		success: function(data) {
			if(data){
				alertUser("Configuration successfully deleted.");
			}else{
				alertUser("Something went wrong, config deletion failed.");
			}
			if(globalDeviceType=="Mobile"){
				loading('hide');
				$("#deleteConfig").dialog('close');
			}
			$("#configPopUp").dialog('destroy');
		}
	});
}

/*
 *
 *  FUNCTION NAME : loadSaveConfig
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 17, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : save the configuration
 *  PARAMETERS    : 
 *
 */
function loadSaveConfig(){
	if(globalDeviceType=="Mobile"){
		loading('show');
	}
	if(globalDeviceType=="Mobile"){
		staticDynamic();
	}
	$.ajax({
		url: getURL("ConfigEditor","JSON"),
		data : {
			"action": "getfilenames",
			"query": "{'QUERY': [{'userid':'"+globalUserId+"'}]}"
		},
		method: 'POST',
		proccessData: false,
//        async:false,
		dataType: 'html',
		success: function(data) {
			if(globalInfoType == "XML"){
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(data , "text/xml" );
				var MAINCONFIG = xmlDoc.getElementsByTagName('MAINCONFIG');
				var topo = MAINCONFIG[0].getAttribute("TopologyNames");
				var names = MAINCONFIG[0].getAttribute("Names");
			}else{
				var dat = data.replace(/'/g,'"');
        		var dat2 = $.parseJSON(dat);
				var MAINCONFIG = dat2.FILE;
				var topo = dat2.MAINCONFIG[0].TopologyNames;
				var names = dat2.MAINCONFIG[0].Names;
			}
			for(var a=0; a < topo.length; a++){
				if(Name == ""){
					createConfigName();
				}else{
					if(topo[a] == Name){
						createConfigName();
					}
				}
			}
			for(var b=0; b < names.length; b++){
				if(Name == ""){
					createConfigName();
				}else{
					if(names[b] == Name){
						createConfigName();
					}
				}
			}
			if(globalDeviceType=="Mobile"){
				loading('hide');
			}else{
				$("#saveConfFileName").val(Name);
			}
		}
	});
	if(globalDeviceType!="Mobile"){
		$(".ui-dialog").position({
    	    my: "center",
        	at: "center",
	        of: window
	   	});
	}
//	createConfigName();
//	$("#saveConfFileName").val(Name);
} 

/*
 *
 *  FUNCTION NAME : createTopo
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : January 2, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : sends xml file to create topo file
 *  PARAMETERS    : 
 *
 */
function createTopo(){
	if(globalDeviceType=="Mobile"){
		loading("show");
	}

	var qry = getStringJSON(globalMAINCONFIG[pageCanvas]);

	$.ajax({
		url: getURL("ConfigEditorTopo", "JSON"),
//		url: "https://"+CURRENT_IP+"/cgi-bin/Final/RM_CGI_AutoComplete/AutoCompleteCgiQuerryjayson/FindResource2.cgi",
		data : {
			"action": "savetopomap",
			"query": qry
		},
		method: 'POST',
		proccessData: false,
		dataType: 'html',
		success: function(data) {
			if(data){
				if(globalDeviceType=="Mobile"){
					alert("Configuration successfully converted to topo file and is now ready to be downloaded.");
					topoMapVar = data;
				}
//				convertTopoToXml(Name);
				downloadFileWeb('topo');;
			}else{
				alert("Something went wrong, config convertion failed.");
			}
			if(globalDeviceType=="Mobile"){
				loading('hide');
			}
		}
	});
}


/*
 *
 *  FUNCTION NAME : createTitan
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : January 10, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : sends xml file to create titan file
 *  PARAMETERS    : 
 *
 */
function createTitan(){
	var fname = $("#saveConfFileName").val();
	if(globalDeviceType=="Mobile"){
		loading("show");
	}
	var qry = '{"QUERY": [{"filename": "'+fname+'", "data": "'+getStringJSON(globalMAINCONFIG[pageCanvas])+'"}]}';
	$.ajax({
		url: getURL("ConfigEditorTopo", "JSON"),
		data : {
			"action": "convertxmltotitan",
			"query": qry
		},
		method: 'POST',
		proccessData: false,
		dataType: 'html',
		success: function(data) {
			if(data){
				if(globalDeviceType=="Mobile"){
					alert("Configuration successfully converted to titan file and is now ready to be downloaded.");
				}
				titanVar = data;
				saveTitanToHome(fname,"save");
			}else{
				alert("Something went wrong, config convertion failed.");
			}
		}
	});
}


 /*
 *  FUNCTION NAME : loadTitanFromLocDir
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : January 13, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  VISIORE #    : 
 *  DESCRIPTION   : loads the local copy of titan file to be save in home dir
 *  PARAMETERS    : 
 *
 */
function loadTitanFromLocDir(fname){
//	var url = "/cgi-bin/Final/RM_CGI_AutoComplete/AutoCompleteCgiQuerryjayson/FindResource2.cgi?action=gettitanfile&query=filename="+fname+"^user="+globalUserName;
//	var InfoType = "XML";
//	if(InfoType == "XML"){
//		var url = getURL("ConfigEditorTopo")+"action=gettitanfile&query=filename="+fname+"^user="+globalUserName;
//	}else{
		var url = getURL('ConfigEditorTopo', 'JSON')+'action=gettitanfile&query={"QUERY":[{"filename": "'+fname+'", "user": "'+globalUserName+'"}]}';
//	}
	$.ajax({
		url: url,
		proccessData: false,
		dataType: 'html',
		success: function(data){
			if(data){
//				getDataFromXML(data);
				getStringJSON(globalMAINCONFIG[pageCanvas]);
			}else{
				alert('Something went wrong, CGI did not return anything.');
			}
			$("#loadConfig").dialog('close');
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(xhr.status+" : "+thrownError);
		}
	});
}

/*
 *
 *  FUNCTION NAME : saveTitanToHome
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : January 10, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : sends titan to be saved in home
 *  PARAMETERS    : 
 *
 */
function saveTitanToHome(fname,type){
//	var titanSplt = titanVar.split("\n").join("^");
	var qry = '{"QUERY": [{"filename": "'+fname+'", "user": "'+globalUserName+'", "titan": "'+titanVar+'"}]}';
	$.ajax({
		url: getURL("RM", "JSON"),
		data : {
			"action": "loadtitan",
			"query": qry
		},
		method: 'POST',
		proccessData: false,
		dataType: 'html'
/*        success: function(data) {
			if(data){
				alert("Configuration successfully converted to titan file and is now ready to be downloaded.");
				downloadFile(fName,titanVar,"titan")
			}else{
				alert("Something went wrong, config convertion failed.");
			}
			loading('hide');
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(xhr.status+" : "+thrownError);
		}*/
	});
	setTimeout(function(){
		if(type=="save"){
			if(globalDeviceType=="Mobile"){
				downloadFile(fname,titanVar,"titan");
			}
			downloadFileWeb('titan');
		}else if(type=="load"){
			loadTitanFromLocDir(fname);
		}
		if(globalDeviceType=="Mobile"){	
			loading('hide');
		}
	},500);
}
/*
 *
 *  FUNCTION NAME : downloadFile
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 30, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : download configuration as xml/topo file
 *  PARAMETERS    : confName,content,ext
 *
 */
function downloadFile(confName,cont,ext){
	if(ext == "xml"){
		var content = getXmlData();
	}else if(ext == "topo"){
		var content = topoMapVar;
	}else if(ext == "titan"){
		var content = titanVar;
	}else{
		var content = cont;
	}
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

	function gotFS(fileSystem) {
		fileSystem.root.getFile(confName+"."+ext, {create: true, exclusive: false}, gotFileEntry, fail);
	}

	function gotFileEntry(fileEntry) {
		fileEntry.createWriter(gotFileWriter, fail);
	}

	function gotFileWriter(writer) {
		writer.onwriteend = function(evt) {
			$("#saveConfig").dialog('destroy');
			$("#configPopUp").dialog('destroy');
		};
		writer.write(content);
		
	}

	function fail(error) {
		alert(error.code);
	}
}

/*
 *
 *  FUNCTION NAME : showDirectory
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 31, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : shows the files saved in the directory
 *  PARAMETERS    : 
 *
 */
function showDirectory(){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
//    	alert("Root = " + fs.root.fullPath);
		var directoryReader = fs.root.createReader();
		directoryReader.readEntries(success,failDir);
	}, function (error) {
		alert(error.code);
	});
	function success(entries) {
		var ent="<option>Select File</option>";
		for (var i=0; i<entries.length; i++) {
			ent += "<option value="+entries[i].name+">"+entries[i].name+"</option>";
		}
		$("#loadConfSelect").html(ent);		
//		alert("pasok sa success?"+ent);
	}
	function failDir(error) {
		alert("Failed to list directory contents: " + error.code);
	}
}

/*
 *
 *  FUNCTION NAME : showFile
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 31, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : upload configuration as file
 *  PARAMETERS    : confName
 *
 */
function showFile(confName){
	var ext = confName.split(".")[1];
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSRead, failRead);
	function gotFSRead(fileSystem) {
		//alert("Pasok sa gotFSRead?"+fileSystem);
		fileSystem.root.getFile(confName, null, gotFileEntryRead, failRead);
	}

	function gotFileEntryRead(fileEntry) {
		//alert("Pasok sa gotFileEntryRead?"+fileEntry);
		fileEntry.file(gotFileRead, failRead);
	}

	function gotFileRead(file){
		//alert("Pasok sa gotFileRead?"+file);
		readAsText(file);
	}

	function readAsText(file) {
		//alert("Pasok sa readAsText?"+file);
		var reader = new FileReader();
		reader.onload = function(e) {
			if(ext == "xml"){
				getDataFromXML(reader.result);
			}else if(ext =="topo"){
				convertTopoToXml(confName);
			}else if(ext == "titan"){
				saveTitanToHome(confName,"load");
				titanVar = reader.result;
			}
			//loading('hide');
			$("#loadConfig").dialog('destroy');
		}
		reader.readAsText(file);
	}

	function failRead(evt) {
		alert(evt.target.error.code);
	}
}

/*
 *
 *  FUNCTION NAME : convertTopoToXml
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : January 2, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : convert topo to xml
 *  PARAMETERS    : fName
 *
 */
function convertTopoToXml(fname){
	$.ajax({
		url: getURL("ConfigEditorTopo", "JSON"),
		data : {
			"action": "gettopofile",
			"query": '{"QUERY": [{"filename": "'+fname+'", "username": "'+globalUserName+'"}]}'
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			var dat = data.replace(/'/g, '"');
			var data = $.parseJSON(dat);
			var result = data.RESULT[0].Result;
		}
	});
}

/*
 *
 *  FUNCTION NAME : saveConfigtoDB
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 17, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : saves configuration to DB
 *  PARAMETERS    : confName
 *
 */
function saveConfigtoDB(confName,ftype){
	for(var a=0; a< globalMAINCONFIG.length;a++){
		globalMAINCONFIG[a].MAINCONFIG[0].Flag = 0;
		if(globalMAINCONFIG[a].MAINCONFIG[0].PageCanvas == pageCanvas){
			globalMAINCONFIG[a].MAINCONFIG[0].FileType = $('#saveConfFileTypeDBType > option:selected').html().toString();
			globalMAINCONFIG[a].MAINCONFIG[0].Name = confName;
		}
	}
	var qry = getStringJSON(globalMAINCONFIG[pageCanvas]);
	$.ajax({
		url: getURL("ConfigEditor", "JSON"),
		data : {
			"query": qry,			
			"action": "insert"
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			var dat = data.replace(/'/g, '"');
			var data = $.parseJSON(dat);
			var result = data.RESULT[0].Result;
			if(result==1){
				alerts("Configuration saved to the database.","todo", "graph");
				globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Flag =1;
				FileType ="";
				var todo = "if(globalDeviceType=='Mobile'){";
					todo += "$('#saveConfig').dialog('destroy');";
					todo +=	"}else{";
					todo +=	"$('#configPopUp').dialog('destroy');"
					todo += "}";
			}else{
				alerts("Something went wrong. \nConfiguration NOT saved on the database.");
			}
		}
	});
}

/*
 *
 *  FUNCTION NAME : saveConfigtoDBTestbed
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 29, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : saves testbed configuration to DB
 *  PARAMETERS    : confName
 *
 */
function saveConfigtoDBTestbed(confName){
	if(globalDeviceType=="Mobile"){
		loading("show");
	}
//	MainFlag = 0;
	//FileType = "Dynamic";
	for(var a=0; a< globalMAINCONFIG.length;a++){
		globalMAINCONFIG[a].MAINCONFIG[0].Flag = 0;
		if(globalMAINCONFIG[a].MAINCONFIG[0].PageCanvas == pageCanvas){
			globalMAINCONFIG[a].MAINCONFIG[0].FileType = $('#saveConfFileTypeDBType > option:selected').html().toString();
			globalMAINCONFIG[a].MAINCONFIG[0].Name = confName;
		}
	}

	var qry =  getStringJSON(globalMAINCONFIG[pageCanvas]);
	$.ajax({
		url: getURL("ConfigEditor", "JSON"),
		data : {
			"action": "savetopology",
			"query": qry
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			var dat=data.replace(/'/g,'"');
			var data = $.parseJSON(dat);
			var result = data.RESULT[0].Result;
			if(result == 1){
				if(globalDeviceType=="Mobile"){
					loading("hide");
				}
				alerts("Configuration saved to the database.", "todo", "graph");
				MainFlag =1;
				FileType ="";
				var todo = "if(globalDeviceType!='Mobile'){";
				todo +=	"$('#deviceMenuPopUp').dialog('destroy');";
				todo += "$('#configPopUp').dialog('destroy');";
				todo += "}else{";
				todo +=	"$('#saveConfig').dialog('destroy');";
				todo += "}";
			}else{
				alerts("Something went wrong, configuration could not be save.");
			}
		}
	});
}


/*
 *
 *  FUNCTION NAME : checkDevicesToCreateLink 
 *  AUTHOR        : James Turingan
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : create line in devices
 *  PARAMETERS    : imgId 
 *
 */
function checkDevicesToCreateLink(imgId,imgXpos2,imgYpos2){
	var flag = dragtoTrash(imgId,imgXpos2,imgYpos2);
	if(flag == false){
		return;
	}
	var obj;
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	var allline =[];
	for(var i = 0; i  < devices.length; i++){ // checks if the hitted object is equal to the array
		if(devices[i].ObjectPath == imgId){ //&& devices[i].Page == pageCanvas){ // change the X and Y Position of object
	        devices[i].XLocation = imgXpos2;
    	    devices[i].YLocation = imgYpos2;
			obj = devices[i];
			allline = gettargetmap(devices[i].ObjectPath,allline);
			break;
		}
	}
	lineConnectorVar(obj); // this function is to hold the variable for connecting devices 
	if(allline.length == 0){
		drawImage();
		return
	}
	for(var i = 0; i  < allline.length; i++){
		var srcArr = allline[i].Source.split(".");
		var dstArr = allline[i].Destination.split(".");
		var source = getDeviceObject2(srcArr[0]);
		var destination = getDeviceObject2(dstArr[0]);
		if(source.ObjectPath == imgId){
			source.XLocation = imgXpos2;
			source.YLocation = imgYpos2;
		}else if(destination.ObjectPath == imgId){
			destination.XLocation = imgXpos2;
			destination.YLocation = imgYpos2;
		}
	}
	drawImage();
}
/*
 *
 *  FUNCTION NAME : createLine 
 *  AUTHOR        : James Turingan
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : create line in devices
 *  PARAMETERS    : 
 *
 */
function createLine(id){
/* ======= THIS IS FOR TOOLTIP DIV ====== */
	$('#showTooltipInfo').css({
		background : '#DFEFF0',
		'border-radius' : '5px',	
		border: '1px solid #555',	
		padding : '5px',	
		'max-width': '200px',
		'font-size' : '10px',
		'font-family': 'Arial',
        position:'absolute',
   	});
/* ======================================= */
	var allline = [];
	var devices = getDevicesNodeJSON();

	for(var t=0; t<devices.length ; t++){
		allline = gettargetmap(devices[t].ObjectPath,allline);
	}
	for(var i = 0 ; i < allline.length; i++){
		var src = allline[i].Source;
		var dst = allline[i].Destination;
		var srcDev = src.split(".");
		var dstDev = dst.split(".");
		var srcDevObject = getDeviceObject2(srcDev[0]);
		var dstDevObject = getDeviceObject2(dstDev[0]);
		var pointX = parseInt(srcDevObject.XLocation)+17;	
		var pointY = parseInt(srcDevObject.YLocation)+17;	
		var pointX2 = parseInt(dstDevObject.XLocation)+17;	
		var pointY2 = parseInt(dstDevObject.YLocation)+17;	
		var myId = dst + "||" + src + "||"+ allline[i].Name;
		var wid = 3;
		if (globalDeviceType != 'Mobile'){
			wid = 2;
		}
		var redLine = new Kinetic.Line({
			points: [pointX, pointY, pointX2, pointY2],
			stroke: 'black',
			strokeWidth: wid,
			lineCap: 'round',
			lineJoin: 'round',
			id : myId,
			Destination : dst,
			Source : src 
		});

		var DT = Math.sqrt((pointX2 - pointX) * (pointX2 - pointX) + (pointY2 - pointY) * (pointY2 - pointY));
		var T1 = 50/DT;
		var xTp1 = (1-T1)*pointX+(T1*pointX2);
		var yTp1 = (1-T1)*pointY+(T1*pointY2);
		var tooltip = new Kinetic.Label({
			x: xTp1,
			y: yTp1
		});
		var tp1 = checkLineCount(allline[i],"destination");
		tooltip.add(new Kinetic.Text({
			text: tp1,
			fontFamily: 'Arial',
			fontSize: 10,
			padding: 5,
			fill: 'black'
		}));
		var xTp2 = (1-T1)*pointX2+(T1*pointX);
        var yTp2 = (1-T1)*pointY2+(T1*pointY);
		var tooltip2 = new Kinetic.Label({
			x: xTp2,
            y: yTp2,
			opacity: 0.75
		});
		var tp2 = checkLineCount(allline[i],"source");					
		tooltip2.add(new Kinetic.Text({
			text: tp2,
			fontFamily: 'Arial',
			fontSize: 10,
			padding: 5,
			fill: 'black'
		}));
		window['variable' + dynamicLayer[pageCanvas]].add(redLine);
		window['variable' + dynamicLayer[pageCanvas]].add(tooltip);
		if(globalInfoType == "JSON"){
			var json1 = getAllPortOfDevice(srcDev[0]);
	        var json2 = getAllPortOfDevice(dstDev[0]);
    	    var prtArr = json1.concat(json2);
		}else{
			var prtArr= portArr;
		}
		for(var a=0; a < prtArr.length; a++){
			if(allline[i].Destination == prtArr[a].ObjectPath){
				var portLabel2 = "Portname: "+tp2+"\n";
				portLabel2 += "Speed: "+prtArr[a].Speed;

			}else if(allline[i].Source == prtArr[a].ObjectPath){
				var portLabel = "Portname: "+tp1+"\n";
				portLabel += "Speed: "+prtArr[a].Speed;

			}
		}
		tooltip.on('click tap',function(){
			var imgXpos2 = this.getPosition().x;
			var imgYpos2 = this.getPosition().y;
			var text = portLabel;			
			$('#showTooltipInfo').css({
				top: imgYpos2,
				left: imgXpos2
			});
			 $('#showTooltipInfo').show().empty().append(text);
		});
		window['variable' + dynamicLayer[pageCanvas]].add(tooltip2);
		tooltip2.on('click tap',function(){
			var imgXpos2 = this.getPosition().x;
			var imgYpos2 = this.getPosition().y;
			var text = portLabel2;
			$('#showTooltipInfo').show().empty().append(text);
		});

		redLine.on('mouseup mouseout touchend', function(){
	        document.body.style.cursor = 'default';
			$('#showTooltipInfo').hide();
    	});
    	redLine.on('mousedown mouseover touchstart', function() {
        	document.body.style.cursor = 'pointer';
        	var touchPos = window['variable' + dynamicVar[pageCanvas]].getPointerPosition();
        	var imgXpos2 = touchPos.x+40;
        	var imgYpos2 = touchPos.y+50;
	        var s = this.getId();
    	    var text = createLineTooltip(s);
			$('#showTooltipInfo').css({
				top: imgYpos2,
				left: imgXpos2  + 50
			});
			$('#showTooltipInfo').show().empty().append(text);
	    });
		redLine.on('click tap',function(){
			var lineId = this.getId();
			var condition = checkLineIfCommited(lineId);
			gblCondition = condition;
			if (condition == true){
				$('#linkConnect').show();
				$('#linkDisconnect').show();
				$('#linkFlap').show();
			}else if (condition == false){
				$('#linkConnect').hide();
				$('#linkDisconnect').hide();
				$('#linkFlap').hide();
			}

			if (globalDeviceType == 'Mobile'){
				$("#linkMenuPanel").popup("open");
				$("#linkMenuPanel").trigger('create');
				$("#linkMenuPanel").popup({positionTo: "window"});
			}else{
				linkMenuPopUp();	
			}
			gblLinkDestination = this.getAttr('Destination');
			gblLinkSource = this.getAttr('Source');

			// this is for on lick function
			allLinkMenu(lineId);
		});
	}
}
/*
 *  
 * FUNCTION NAME : allLinkMenu
 * AUTHOR        : Marlo Agapay
 * DATE          : March 4, 2014
 * MODIFIED BY   :
 * REVISION DATE :
 * REVISION #    :
 * DESCRIPTION   : for click functions 
 * PARAMETERS    : line Id
 * 
 */
function allLinkMenu(lineId){
	$(document).on("click","#linkConnect", function(){
		if (globalDeviceType == 'Mobile'){
			showLineTable("connect",lineId);
			$("#linkMenuPanel").popup('destroy');
		}else{
			$("#divAlert").dialog('close');
			createLinkPopUp("connect",lineId);
		}
	});

	$(document).on("click","#linkDisconnect", function(){
		if (globalDeviceType == 'Mobile'){
			showLineTable("disconnect",lineId);
			$("#linkMenuPanel").popup('destroy');
		}else{
			$("#divAlert").dialog('close');
			createLinkPopUp("disconnect",lineId);
		}
	});
	$(document).on("click","#linkFlap", function(){
		if (globalDeviceType == 'Mobile'){
			showLineTable("flap",lineId);
			$("#linkMenuPanel").popup('destroy');
		}else{
			$("#divAlert").dialog('close');
			createLinkPopUp("flap",lineId);
		}
	});
	$(document).on("click","#alinkMap", function(){
		fetchPortForManageConnectivity(lineId);
		if (globalDeviceType == 'Mobile') {
			$("#linkMenuPanel").popup('destroy');
		} else {
			$('#divAlert').dialog('close');
		}
	});
	$(document).on("click","#delLinkDevMenu", function(){
		if (globalDeviceType == 'Mobile'){
			deleteLink(gblLinkSource,gblLinkDestination);
			$("#linkMenuPanel").popup('destroy');
		}else{
			showLinkInformation(gblLinkSource,gblLinkDestination);
			$("#divAlert").empty();
			$("#divAlert").dialog('close');
		}
	});
}
/*
 *  
 * FUNCTION NAME : checkLineCount
 * AUTHOR        : Marlo Agapay
 * DATE          : January 10, 2013
 * MODIFIED BY   :
 * REVISION DATE :
 * REVISION #    :
 * DESCRIPTION   : 
 * PARAMETERS    :
 * 
 */
function checkLineCount(line,portlocation){
	var lineCon = window['variable' + dynamicLineConnected[pageCanvas]];
	var count = 0;

	var str ="";
	for(var a=0; a<lineCon.length; a++){
		if (line.DestinationDeviceObjectPath == lineCon[a].DestinationDeviceObjectPath && line.SourceDeviceObjectPath == lineCon[a].SourceDeviceObjectPath){
			count +=1;	
		}
	}
	if (count>1){
			str = count+" ports";
	}else{
		if (portlocation =="source" && line.SourceDeviceDeviceName == ""){
			str = getPortName(line.Source);
		}else if (portlocation =="source" && line.SourceDeviceDeviceName != ""){
			str = getPortName2(line.Source);
		}else if (portlocation == "destination" && line.DestinationDeviceDeviceName == ""){
			str = getPortName(line.Destination);
		}else if (portlocation == "destination" && line.DestinationDeviceDeviceName != ""){
			str = getPortName2(line.Destination);
		}
	}
	return str;
}

/*
 *  
 * FUNCTION NAME : showLineTable
 * AUTHOR        : Marlo Agapay
 * DATE          : December 26, 2013
 * MODIFIED BY   :
 * REVISION DATE :
 * REVISION #    :
 * DESCRIPTION   : show table to select
 * PARAMETERS    :
 * 
 */
function showLineTable(action,lineId){
	setTimeout(function(){
		$.mobile.changePage($("#lineTableDiv"),{
			transition: "pop",
			changeHash : false
	   });

		var headi ="";
		if (action=="connect"){
			headi = "Connect Line";
		}else if(action =="disconnect"){
			headi = "Disconnect Line";
		}else if (action =="flap"){
			headi = "Flap Line";
		}

		$("#lineHeader").empty().append(headi);
		$("#lineTableDiv").trigger('create');
		createLineTable(action,lineId)
	},1500);
}

/*
 *  
 * FUNCTION NAME : createLinkPopUp
 * AUTHOR        : Apple Kem E. Eguia
 * DATE          : MArch 7, 2014
 * MODIFIED BY   : 
 * REVISION DATE :
 * REVISION #    :
 * DESCRIPTION   : 
 * PARAMETERS    :
 * 
 */
function createLinkPopUp(action,lineId){
	var headi ="";
	if (action=="connect"){
		headi = "Connect Line";
	}else if(action =="disconnect"){
		headi = "Disconnect Line";
	}else if (action =="flap"){
		headi = "Flap Line";
	}
	
	$( "#configPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		title: headi
	});
	$( "#configPopUp" ).dialog("open");
	$( "#configPopUp" ).empty().load('pages/ConfigEditor/lineTable.html',function(){
		globalLinkAction = action;
		createLineTable(action,lineId);
	});
}

/*
 *
 *  FUNCTION NAME : createLineTable
 *  AUTHOR        : Marlo Agapay
 *  DATE          : December 27, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : append information on the line table
 *  PARAMETERS    : action, lineId
 *
 */
function createLineTable(action,lineId){
	var dv = lineId.split("||");
	var dev1 = dv[0].split(".");
	var dev2 = dv[1].split(".");
	var deviceDestination = dev1[0];
	var deviceSource = dev2[0];
	var portDestination = dev1[1];
	var portSource = dev2[1];
	var html ="";
	
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	var lineCon = new Array();
	for(var i=0;i<devices.length;i++){
		lineCon = gettargetmap(devices[i].ObjectPath,lineCon);
	}
	for (var a=0;a<lineCon.length; a++){
		var destinationObj1 = lineCon[a].Destination.split('.')[0];
		var sourceObj1 = lineCon[a].Source.split('.')[0];
		var destinationObj = lineCon[a].Destination;
		var sourceObj = lineCon[a].Source;
		var portDes = "";
		var portSor = "";
		var portDesRes = "";
		var portSorRes = "";
		if(destinationObj1 == deviceDestination &&  sourceObj1 == deviceSource){

			if(globalInfoType == "JSON"){
				var devices = getDevicesNodeJSON();
		        var prtArr =[];
        		for(var s=0;s < devices.length; s++){
		            prtArr = getDeviceChildPort(devices[s],prtArr);
        		}
//	            var prtArr = getAllAvaiPortNodeJSON();
    	    }else{
        	    var prtArr= portArr;
	        }
			for (var q=0; q<prtArr.length; q++){
				var portObj = prtArr[q].ObjectPath;

				if (destinationObj == portObj){
					portDes = prtArr[q].PortName;
					portDesRes = prtArr[q].PortResId;
				}else if(sourceObj == portObj){
					portSor = prtArr[q].PortName;
					portSorRes = prtArr[q].PortResId;
				}
			}
		}
		html += "<tr class='trLineList' portresdestination='"+portDesRes+"' portressource='"+portSorRes+"'>";
		if (globalDeviceType != 'Mobile'){
			html += "<td><input type='checkbox' class='cbLineList' /></td>";
		}
		html +="<td>"+portDes+" --> "+portSor+"</td>";
		html+="</tr>";
	}
	$("#tablineTable > tbody").empty().append(html);

	if (globalDeviceType == 'Mobile'){
		$(".trLineList").on("tap",function(){
			if($(this).hasClass('highlight') == false){
				$(this).addClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
		});
	} else {
		$(".cbLineList").each(function(){
			if($(this).is(":checked") == true){
				$(this).parent().parent().addClass('highlight');
			}else{
				$(this).parent().parent().removeClass('highlight');
			}
		});
	}
}

function linekOk(){
	var resArr = [];
	if (globalDeviceType == 'Mobile'){
		$(".trLineList").each(function(){
			if ($(this).hasClass('highlight') == true){
				var dRes = "";
				var sRes = "";
				if ($(this).attr('portresdestination') != undefined || $(this).attr('portresdestination') != null){
					dRes = $(this).attr('portresdestination');
				}
				if ($(this).attr('portressource') != undefined || $(this).attr('portressource') != null){
					sRes = $(this).attr('portressource');
				}
				resArr.push({pDestination : dRes, pSource : sRes });
			}
		});
	}else{
		$(".cbLineList").each(function(){
		if ($(this).is(':checked') == true){
			var dRes = "";
			var sRes = "";
			if ($(this).parent().parent().attr('portresdestination') != undefined || $(this).parent().parent().attr('portresdestination') != null){
				dRes = $(this).parent().parent().attr('portresdestination');
			}
			if ($(this).parent().parent().attr('portressource') != undefined || $(this).parent().parent().attr('portressource') != null){
				sRes = $(this).parent().parent().attr('portressource');
			}
			resArr.push({pDestination : dRes, pSource : sRes });
		}
	});
	}
	if (globalLinkAction=="flap"){
		if (globalDeviceType == 'Mobile'){
			showPopupFlap(action,resArr);
		}else{
			createFlapPopUp(globalLinkAction,resArr);
		}
	}else{
		lineConnectionQuery(globalLinkAction,resArr);
	}
}

/*
 *
 *  FUNCTION NAME : showPopupFlap
 *  AUTHOR        : Marlo Agapay
 *  DATE          : December 27, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : show popup for flap (inut count and delay)
 *  PARAMETERS    : action, resArr
 *
 */
function showPopupFlap(action,resArr){
	setTimeout(function(){
		$.mobile.changePage($("#flapPopupDiv"),{
			transition: "pop",
			changeHash : false
		});
		$('.numbersOnly').keyup(function () { 
			this.value = this.value.replace(/[^0-9\.]/g,'');
		});

	},1500);

	$(document).on("click","#okFlap", function(){
		var count = $("#flapCount").val();
		var delay = $("#flapDelay").val();
		lineConnectionQuery(action,resArr,count,delay);
	});
}

/*
 *
 *  FUNCTION NAME : createFlapPopUp
 *  AUTHOR        : Apple Kem E. Eguia
 *  DATE          : March 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : show popup for flap (input count and delay)
 *  PARAMETERS    : action, resArr
 *
 */
function createFlapPopUp(action,resArr){
	setTimeout(function(){
		if (globalDeviceType== 'Mobile'){
			$.mobile.changePage($("#flapPopupDiv"),{
				transition: "pop",
				changeHash : false
			});
			$('.numbersOnly').keyup(function () { 
				this.value = this.value.replace(/[^0-9\.]/g,'');
			});
		} else {
			$( "#divAlert" ).dialog({
				modal: true,
				autoResize:true,
				width: "auto",
				height: "auto",
				title: "Flap Line"
			});
			$( "#divAlert" ).dialog("open");
			$( "#divAlert" ).empty().load('pages/ConfigEditor/flapPopUp.html',function(){
				$('.numbersOnly').keyup(function () { 
					this.value = this.value.replace(/[^0-9\.]/g,'');
				});
			});
		}
	},1500);

	$(document).on("click","#okFlap", function(){
		var count = $("#flapCount").val();
		var delay = $("#flapDelay").val();
		lineConnectionQuery(action,resArr,count,delay);
	});


}

/*
 *
 *  FUNCTION NAME : lineConnectionQuery
 *  AUTHOR        : Marlo Agapay
 *  DATE          : December 27, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :create query to cgi
 *  PARAMETERS    : action, resArr,count, delay
 *
 */
function lineConnectionQuery(action,resArr,count,delay){
	if(count==null || count=="" || count == undefined)
		count =1;
	if(delay == null || delay == undefined || delay == "")
		delay = 0;
//	var url = "/cgi-bin/Final/AutoCompletePythonCGI/FastQueryCgi.py"
	if (globalInfoType == "XML"){
		var query = "Port1="+resArr[0].pDestination+"^Port2="+resArr[0].pSource+"^Count="+count+"^Delay="+delay+"^ResourceId="+window['variable' + dynamicResourceId[pageCanvas] ]+"^ConfigName="+Name;
		var url = getURL("ConfigEditor");
	} else {
		var query =  "{'QUERY':[{'Port1':'"+resArr[0].pDestination+"','Port2':'"+resArr[0].pSource+"','Count':'"+count+"','Delay':'"+delay+"','ResourceId':'";
		query += window["variable" + dynamicResourceId[pageCanvas]];
		query += "','ConfigName':'"+Name+"'}]}";
		var url = getURL("ConfigEditor","JSON");
	}
//	var url = "https://"+CURRENT_IP+url;
	$.ajax({
		url: url,
		data:{
			"action":action,
			"query":query,
		},
		dataType: 'html',
		method: 'POST',
		proccessData: false,
		async:false,
		success: function(data) {
			data = $.trim(data);
			if (globalInfoType == "XML"){
				if (data=="1"){
					if (globalDeviceType == 'Mobile'){
						error(action+" Successful",action);
					} else {
						alerts(action+" Successful");
					}
				}else{
					if (globalDeviceType == 'Mobile'){
						error("Failed to "+action,action);
					} else {
						alerts("Failed to "+action);
					}
				}
			} else {
				data = data.replace(/'/g,'"');
				var jsonData = jQuery.parseJSON(data);	
				var row = jsonData.RESULT[0];
				if (row=="1"){
					if (globalDeviceType == 'Mobile'){
						error(action+" Successful",action);
					} else {
						alerts(action+" Successful");
					}
				}else{
					if (globalDeviceType == 'Mobile'){
						error("Failed to "+action,action);
					} else {
						alerts("Failed to "+action);
					}
				}
			}
			setTimeout(function(){
				if (globalDeviceType == 'Mobile'){
					$.mobile.changePage($('#configEditorPage'),{
						transition: "pop"
					});
				} else {
					$('#configPopUp').dialog('destroy');
				}
			},1000);

		}
	});		
}
/*
 *
 *  FUNCTION NAME : checkLineIfCommited
 *  AUTHOR        : Marlo Agapay
 *  DATE          : December 26, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : checks if line is already committed
 *  PARAMETERS    : 
 *
 */
function checkLineIfCommited(id){
	var dv = id.split("||");
	var dev1 = dv[0].split(".");
	var dev2 = dv[1].split(".");
	var device1 = dev1[0];
	var device2 = dev2[0];
	var dev1Condition = false;
	var dev2Condition  = false;
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for (var a=0; a<devices.length; a++){
		if (devices[a].ObjectPath== device1 && devices[a].Status.toLowerCase() == "reserved"){
			dev1Condition = true;
		}
		if (devices[a].ObjectPath== device2 && devices[a].Status.toLowerCase() == "reserved"){
			dev2Condition = true;
		}
	}
	if (dev1Condition == true && dev2Condition == true){
		return true;
	}else{
		return false;
	}
}


/*
 *
 *  FUNCTION NAME : lineConnectorVar
 *  AUTHOR        : James Turingan
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : create line in devices
 *  PARAMETERS    : 
 *
 */

function lineConnectorVar(obj){
	if(checkLCArray.length == 0 && globalFlag == true && !checkObjectArray(obj.ObjectPath,checkLCArray)){
		var checkPort = checkAvaiablePortOfEveryDevice(obj);
		if(checkPort != "" && obj.DeviceName != ""){
			if(globalDeviceType == "Mobile"){
				error(checkPort,"Notification");
			}else{
				alerts(checkPort);
			}
		}else{
			checkLCArray.push(obj);
			var src =  ($(createLineVar).attr('src')).split("img")[1];

            $("#configContent"+pageCanvas).css("cursor","url("+dir+"/img/"+src+") 10 18,auto");
	
		}
	}else if(checkLCArray.length == 1 && globalFlag == true && !checkObjectArray(obj.ObjectPath,checkLCArray)){
		var checkPort = checkAvaiablePortOfEveryDevice(obj);
		if(checkPort != "" && obj.DeviceName != ""){
			if(globalDeviceType == "Mobile"){
				error(checkPort,"Notification");
			}else{
				alerts(checkPort);
			}
			return;
		}
		sourcePath = "";
		dstPath = "";
		portflag = false;
		portflag2 = false;
		portspeedflag = false;
		portspeedflag2 = false;
		connectedSwitch = false;
		checkLCArray.push(obj);
		linkcounter++;
		var name = lineName+"_"+linkcounter;
		if(!checkLinkNameExist(name,window['variable' + dynamicLineConnected[pageCanvas]])){
			if(checkLCArray[0].DeviceName == "" && checkLCArray[1].DeviceName == ""){
				setPortForDragandDrop(checkLCArray[0],"source");
				setPortForDragandDrop(checkLCArray[1],"destination");
				portflag = true;
				portflag2 = true;
			}else{
				createLinkForDevicelist(checkLCArray[0],checkLCArray[1]);
				if(portflag && portflag2){
					if(checkLCArray[0].DeviceName == ""){
						setPortForDragandDrop(checkLCArray[0],"source");
					}else if(checkLCArray[1].DeviceName == ""){
						setPortForDragandDrop(checkLCArray[1],"destination");
					}
				}
			}
			if(portflag && portflag2){
				setPortFlagToTrue(dstPath,sourcePath);
				storeLinkInformation(name,checkLCArray[0],checkLCArray[1],"","","","","","","",dstPath,sourcePath,"","","","","","","","","");
				drawImage();
				//createLine('canvasID');
			}else{
				validationinCreatingLink(checkLCArray[0],checkLCArray[1]);
			}
			checkLCArray=[];
//			createLineVar = '';
//			$("#configContent"+pageCanvas).css("cursor","default");
//			globalFlag = false;
		}
	}
}
/*
 *
 *  FUNCTION NAME : checkAvaiablePortOfEveryDevice
 *  AUTHOR        : Juvindle C. Tina
 *  DATE          : December 13, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : check available port for every device
 *  PARAMETERS    : device
 *
 */
var available = false;
var SwitchFlag = false;
function checkAvaiablePortOfEveryDevice(device){
	var message = "";
	available = false;
	SwitchFlag = false;
	if(globalInfoType == "JSON"){
		var portObjArr = getAllPortOfDevice(device.ObjectPath);
//		portObjArr = portObjArr[0];
	}else{
		var portObjArr = getPortDevice(device.ObjectPath);
	}
	if(lineType != "Any"){
		getAvailablePorts(lineType,portObjArr);
	}else if(lineType != null && lineType != undefined && lineType != ""){
		getAvailablePorts("L1",portObjArr);
		if(available == false){
			getAvailablePorts("L2",portObjArr);
		}
	}
	if(available == false && lineType != null && lineType != undefined && lineType != ""){
		message = device.DeviceName + " has no available ports.";
	}else if(SwitchFlag == false && lineType != null && lineType != undefined && lineType != ""){
		message = device.DeviceName + " has no ports connected to " + lineType.toUpperCase() + " switch.";
		
	}
	return message;
}
/*
 *
 *  FUNCTION NAME : setPortForDragandDrop
 *  AUTHOR        : Juvindle C. Tina
 *  DATE          : December 13, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : set port for drag and drop
 *  PARAMETERS    : device
 *
 */
function setPortForDragandDrop(device,action){
	setSlotForDragandDrop(device);
	var cnt = 0;
	var prtArr = [];
	if(globalInfoType == "JSON"){
		prtArr = getDeviceChildPort(device,prtArr);
    }else{
        prtArr = device.PortArr;
    }
	var flag = false;
	for(var t=0 ; t<prtArr.length; t++){
		if(prtArr[t].PORTMAP != undefined && prtArr[t].PORTMAP != null && prtArr[t].PORTMAP.length == 0){
			if(action == "source"){
		        sourcePath = prtArr[t].ObjectPath;
		    }else{
        		dstPath = prtArr[t].ObjectPath;
    		}
			flag = true;
			break;
		}
	}
	if(flag == false){
		var slotcnt = 0;
		slotcnt = getSlotCount(device,slotcnt);	
		cnt = getPortNumber(prtArr,cnt);
		var portpath = device.ObjectPath+ ".Slot_"+slotcnt+ ".Port_"+cnt;
		if(action == "source"){
			sourcePath = portpath;
		}else{
			dstPath = portpath;
		}
		var portname = "Port_" + cnt;
		storePortInformation("","","","","","","","","",portname,"new","true",portpath,"","","","","",lineSpeed,enablePort,"Exclusive","","",lineType,"false","","","","","","","","","","","","","","","",device.ObjectPath+".Slot_"+cnt);
	}
}

/*
 *
 *  FUNCTION NAME : setSlotForDragandDrop
 *  AUTHOR        : Mark Elbambo
 *  DATE          : Feb 18, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : set slot for drag and drop
 *  PARAMETERS    : device
 *
 */
function setSlotForDragandDrop(device){
	var cnt = 0;
	if(device.SLOT == null || device.SLOT == undefined || device.SLOT.length == 0){
		var slotpath = device.ObjectPath+ "." + "Slot_"+cnt;
		var slotname = "Slot_" + cnt;
		var devName = (device.ObjectPath).split(".")[0];
		storeSlotInformation("","",slotname,slotpath,"","","","","",device.ObjectPath,"","","new","");
	}
}

/*
 *
 *  FUNCTION NAME : getSlotCount
 *  AUTHOR        : Juvindle C. Tina
 *  DATE          : March 22, 014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get slot count of device
 *  PARAMETERS    : device,slotcnt
 *
 */
function getSlotCount(device,slotcnt){
	if(device.SLOT != null && device.SLOT != undefined){
		for(var t=0; t<device.SLOT.length; t++){
			var slotpath = device.SLOT[t].ObjectPath.split(".");
			var pathArr = slotpath[slotpath.length -1].split("_");
			slotcnt = pathArr[1];
		}
	}
	return slotcnt;
}

/*
 *
 *  FUNCTION NAME : validationinCreatingLink
 *  AUTHOR        : Juvindle C. Tina
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : validation in creating links
 *  PARAMETERS    : device,device2
 *
 */
function validationinCreatingLink(device,device2){
	var message = "";
	if(connectedSwitch == true){
		message = device.DeviceName + " and " + device2.DeviceName + " have no port connected on same switch.";	
		if(globalDeviceType == "Mobile"){
			error(message,"Notification");
		}else{
			alerts(message);
		}
	}else if(portspeedflag == false && portspeedflag2 == false){
		message = device.DeviceName + " and " + device2.DeviceName + " have no available port with speed of " + lineSpeed;	
		if(globalDeviceType == "Mobile"){
			error(message,"Notification");
		}else{
			alerts(message);
		}
	}else if(portspeedflag == false){
		message = device.DeviceName + " has no available speed of " + lineSpeed;	
		if(globalDeviceType == "Mobile"){
			error(message,"Notification");
		}else{
			alerts(message);
		}
	}else if(portspeedflag2 == false){
		message = device2.DeviceName + " has no available speed of " + lineSpeed;	
		if(globalDeviceType == "Mobile"){
			error(message,"Notification");
		}else{
			alerts(message);
		}
	}else if(portflag == false && portflag2){
		message = device.DeviceName + " and " + device2.DeviceName + " have no available ports.";	
		if(globalDeviceType == "Mobile"){
			error(message,"Notification");
		}else{
			alerts(message);
		}
	}else if(portflag == false){
		message = device.DeviceName + " has no available ports.";	
		if(globalDeviceType == "Mobile"){
			error(message,"Notification");
		}else{
			alerts(message);
		}
	}else if(portflag2){
		message = device2.DeviceName + " has no available ports.";	
		if(globalDeviceType == "Mobile"){
			error(message,"Notification");
		}else{
			alerts(message);
		}
	}
}
/*
 *
 *  FUNCTION NAME : createLinkForDevicelist
 *  AUTHOR        : Juvindle C. Tina
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : check available device
 *  PARAMETERS    : device,device2
 *
 */
function createLinkForDevicelist(device,device2){
	if(device.DeviceName != "" && device2.DeviceName != ""){
		if(lineName != "" && lineName != null && lineName != undefined && (lineName.toLowerCase() == "ethernet" || lineType == "Any")){
			checkPortOfDeviceList2(device.ObjectPath,device2.ObjectPath);
		}else if(lineName != "" && lineName != null && lineName != undefined && lineName.toLowerCase() == "ethernet2"){
			getPort2(device.ObjectPath,"source","L2");
			getPort2(device.ObjectPath,"destination","L2");
		}else{
			checkPortOfDeviceList(device.ObjectPath,"source");
			checkPortOfDeviceList(device2.ObjectPath,"destination");
		}
		if(sourceSwitch != "" && destSwitch != "" && destSwitch.toLowerCase() != sourceSwitch.toLowerCase()){
			portflag = false;
			portflag2 = false;
			connectedSwitch = true;
		}
	}else if(device.DeviceName != "" || device2.DeviceName != ""){
		if(device.DeviceName != ""){
			checkPortOfDeviceList(device.ObjectPath,"source");
			portflag2 = true;
		}else if(device2.DeviceName != ""){
			checkPortOfDeviceList(device2.ObjectPath,"destination");
			portflag = true;
		}
	}
}
/*
 *
 *  FUNCTION NAME : checkPortOfDeviceList2
 *  AUTHOR        : Juvindle C. Tina
 *  DATE          : December 13, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : check available port
 *  PARAMETERS    : devPath,devPath2
 *
 */
function checkPortOfDeviceList2(devPath,devPath2){
	getPort(devPath,"source","1000","L1");
	getPort(devPath2,"destination","1000","L1");
	if(!portflag || !portflag){
		getPort(devPath,"source","10000","L1");
		getPort(devPath2,"destination","10000","L1");
		if(!portflag || !portflag){
			getPort(devPath,"source","40000","L1");
			getPort(devPath2,"destination","40000","L1");
			if(!portflag || !portflag){
				getPort(devPath,"source","100000","L1");
				getPort(devPath2,"destination","100000","L1");
				if(!portflag || !portflag){
					getPort(devPath,"source","10-100","L1");
					getPort(devPath2,"destination","10-100","L1");
					if((!portflag || !portflag) && lineType == "Any"){
						getPort2(devPath,"source","L2");
						getPort2(devPath2,"destination","L2");
					}
				}
			}
		}
	}
}
/*
 *
 *  FUNCTION NAME : checkPortOfDeviceList
 *  AUTHOR        : Juvindle C. Tina
 *  DATE          : December 13, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : check available port
 *  PARAMETERS    : devPath,action
 *
 */
function checkPortOfDeviceList(devPath,action){
	if(lineName != "" && lineName != null && lineName != undefined && (lineName.toLowerCase() == "ethernet" || lineType == "Any")){
		getPort(devPath,action,"1000","L1");
		if(!portflag &&  action == "source"){
			getPort(devPath,action,"10-100","L1");
		}else if(!portflag2 &&  action == "destination"){
			getPort(devPath,action,"10-100","L1");
		}else if(!portflag &&  action == "source"){
			getPort(devPath,action,"10000","L1");
		}else if(!portflag2 &&  action == "destination"){
			getPort(devPath,action,"10000","L1");
		}else if(!portflag &&  action == "source"){
			getPort(devPath,action,"40000","L1");
		}else if(!portflag2 &&  action == "destination"){
			getPort(devPath,action,"40000","L1");
		}else if(!portflag &&  action == "source"){
			getPort(devPath,action,"100000","L1");
		}else if(!portflag2 &&  action == "destination"){
			getPort(devPath,action,"100000","L1");
		}
	}else{
		getPort(devPath,action,lineSpeed,lineType);
	}
}
/*
 *
 *  FUNCTION NAME : getPort
 *  AUTHOR        : Juvindle C. Tina
 *  DATE          : December 13, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get available port
 *  PARAMETERS    : devPath,action,speed
 *
 */
function getPort(devPath,action,speed,type){
	if(globalInfoType == "JSON"){
		var prtArr = getAllPortOfDevice(devPath);
    }else{
    	var prtArr= getPortDevice(devPath);
    }
	for(var t=0; t<prtArr.length; t++){
		var port = prtArr[t];
		if(port.PortFlag != "true" && speed == "10-100" && (port.Speed == "10" || port.Speed == "100") && type == port.PortType){
			setPortObject(port,action);
			t = prtArr.length;
		}else if(port.PortFlag != "true" && speed == port.Speed && type == port.PortType){
			setPortObject(port,action);
			t = prtArr.length;
		}
	}
}
/*
 *
 *  FUNCTION NAME : getPort2
 *  AUTHOR        : Juvindle C. Tina
 *  DATE          : December 13, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get available port
 *  PARAMETERS    : devPath,action,speed,type
 *
 */
function getPort2(devPath,action,type){
	if(globalInfoType == "JSON"){
    	var prtArr = getAllPortOfDevice(devPath);
    }else{
    	var prtArr= getPortDevice(devPath);
    }
	for(var t=0; t<prtArr.length; t++){
		var port = prtArr[t];
		if(port.PortFlag != "true" && type == port.PortType){
			setPortObject(port,action);
			t = prtArr.length;
		}else if(port.PortFlag != "true" && type == port.PortType){
			setPortObject(port,action);
			t = prtArr.length;
		}
	}
}
/*
 *
 *  FUNCTION NAME : setPortObject
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : set selected port
 *  PARAMETERS    : port,action 
 *
 */
function setPortObject(port,action){
	if(action == "source"){
		portspeedflag = true;
		portflag = true;
		sourcePath = port.ObjectPath;
		if(port.SwitchInfo != ""){
			var switchArr2 = port.SwitchInfo.split("^");
			sourceSwitch = switchArr2[0];
		}
	}else{
		portspeedflag2 = true;
		portflag2 = true;
		dstPath = port.ObjectPath;
		if(port.SwitchInfo != ""){
			var switchArr2 = port.SwitchInfo.split("^");
			destSwitch = switchArr2[0];
		}
	}
}
/*
 *
 *  FUNCTION NAME : checkObjectArray
 *  AUTHOR        : James Turingan
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : check if the device is already exist in the array
 *  PARAMETERS    : path,myArray 
 *
 */
function checkObjectArray(path,myArray,type){
	var flag = false;
	if(type != 'device'){
		for(var t=0; t<myArray.length; t++){
			if(myArray[t].ObjectPath == path){
				flag = true;
				break;
			}
		}
	}else{
		for(var t=0; t<myArray.length; t++){
			if(myArray[t].DeviceName == path){
				flag = true;
				break;
			}
		}

	}
	return flag;
}
/*
 *
 *  FUNCTION NAME : setDeviceInformation 
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 6, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : store device information
 *  PARAMETERS    : devPath
 *
 */
function setDeviceInformation(devPath,model,src,manufac,ostyp,prdfmly,ipadd,prot,hostnme,devtype){
//	var devtype = getDeviceType(model);
	if(manufac){
		var manu = manufac;
	}else{
		var manu = getManufacturer(model);
	}
	var myPortDev = [];
	if(globalInfoType == "JSON"){
		setDevicesInformationJSON("",devtype,devPath,model,model,"","",ostyp,"","","","",hostnme,"new","","",ipadd,"","","","Exclusive",imgXPos,imgYPos,"","","","","","","","","","","","","","","","","","",manu,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",prdfmly,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",window['variable' + dynamicDomain[pageCanvas] ],"","","","",src,myPortDev,"","");
		setDevicesChildInformationJSON("","","","","","",devPath,"","",devPath,"","",model,model,manu,"","","",hostnme,"new","","","","","","","","","","","","","","","","",prot,"","","");
	}else{
		storeDeviceInformation("",devtype,devPath,model,model,"","",ostyp,"","","","",hostnme,"new","","",ipadd,"","","","Exclusive",imgXPos,imgYPos,"","","","","","","","","","","","","","","","","","",manu,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",prdfmly,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",window['variable' + dynamicDomain[pageCanvas] ],"","","","",src,myPortDev,"","");

		storeChildDevicesInformation("","","","","","",devPath,"","",devPath,"","",model,model,manu,"","","",hostnme,"new","","","","","","","","","","","","","","","","",prot,"","","");
	}
}

/*
 *
 *  FUNCTION NAME : getDomainInfo 
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : January 07, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : gets the info of the Active Resource Domain
 *  PARAMETERS    : 
 *
 */
function getDomainInfo(){
	var url = getURL("ConfigEditor","JSON");
	if(globalDeviceType == "Mobile"){
        loading('show');
    }
	var InfoType = "JSON";
	var query = {"QUERY":[{"user":globalUserName}]};
    query = JSON.stringify(query);
	console
	$.ajax({
		url: url,
		data : {
			"action": "domaininfo",
			"query": query//"user="+globalUserName,
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			if(globalDeviceType == "Mobile"){
        		loading('hide');
		    }
			window['variable' + dynamicDomain[pageCanvas] ] = "Auto"
			data = $.trim(data);
			var domainArray = [];
			var zoneArray = [];
			var groupArrat = [];
			if(InfoType == "XML"){
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(data , "text/xml" );
				var mainconfig = xmlDoc.getElementsByTagName('MAINCONFIG');
				var domain = xmlDoc.getElementsByTagName('DOMAIN');
				var selVal='<option value="" data-placeholder="true">Resource Domain</option>';
				var startUpDom = mainconfig[0].getAttribute('StartUpDomain');
				for(var a=0; a < domain.length; a++){
	                if(startUpDom == domain[a].getAttribute('DomainName')){
    	                var sel = 'selected';
        	        }else{
            	        var sel = '';
                	}
	                selVal += "<option "+sel+" value='"+domain[a].getAttribute('DomainName')+"'>"+domain[a].getAttribute('DomainName')+"</option>";
            	}
			}else{
				var dat = data.replace(/'/g,'"');
                var dat2 = $.parseJSON(dat);
				var domain = dat2.MAINCONFIG[0].DOMAIN;
				var startUpDom = dat2.MAINCONFIG[0].StartUpDomain;
				for(var a=0; a < domain.length; a++){
                    if(startUpDom == domain[a].DomainName){
                        var sel = 'selected';
                    }else{
                        var sel = '';
                    }
                    selVal += "<option "+sel+" value='"+domain[a].DomainName+"'>"+domain[a].DomainName+"</option>";
                }
			}
			if(globalDeviceType == "Mobile"){
				if(domain.length <= 1 ){
					$("#resDomChkbox").hide();
					$('#resDomSelect').selectmenu('disable');
				}
				$("#resDomSelect").html(selVal).selectmenu( "refresh" );
				$("#resDomSelect").parent().css({"width":"100px"});
			}else{
				$("#resDomSelect").html(selVal);
				if(domain.length <= 1 ){
					$(".squaredTwo").hide();
					$('#resDomSelect').attr('disabled',true);
					$('#resDomSelect').css({"background":"#ccc"});
					window['variable' + dynamicDomain[pageCanvas] ] =  $('#resDomSelect').val();
					domainFlag = true;
				}
				$("#resDomSelect").parent().css({"width":"100px"});			
				//$("#resDomSelect").attr('disabled', true);
			}
		}
	});
}
/*
 *
 *  FUNCTION NAME : domainEnaDis
 *  AUTHOR        : James Turingan
 *  DATE          : February 27, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */

function domainEnaDis(src){
	if(src.checked == true){
		$("#resDomSelect").attr('disabled', false);
		window['variable' + dynamicDomain[pageCanvas] ] = $('#resDomSelect').val();			
		domainFlag= true;
	}else{
		$("#resDomSelect").attr('disabled', true);
		window['variable' + dynamicDomain[pageCanvas] ] = "Auto";
		domainFlag= false;
	}
	loadGridMenuContent();
}

/*
 *
 *  FUNCTION NAME : userInformation2 
 *  AUTHOR        : Angeline Bringas
 *  DATE          : December 6, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : gets all domain,zone and group that was binded from user
 *  PARAMETERS    : 
 *
 **/
function userInformation2(){
	getDomainInfo();
	var InfoType = "JSON";
	$('#spanUserLabel').empty().append(globalUserName);
	if(InfoType == "XML"){
		var urls = getURL("RM")+"action=getuser2mobile&query="+globalUserName;	
	}else{
		var urls = getURL("RM","JSON")+"action=getuser2mobile&query={'user':'"+globalUserName+"'}&version=3";
	}
	if(globalDeviceType == "Mobile"){
        loading('show');
    }
	$.ajax({
		url: urls,
		timeout: 120000,
		dataType: 'html',
		success: function(data) {
			if(globalDeviceType == "Mobile"){
        		loading('hide');
		    }
			window['variable' + dynamicDebug[pageCanvas] ]= 'false';
			data = $.trim(data);
			var domainArray = [];
			var zoneArray = [];
			var groupArrat = [];
			if(InfoType == "XML"){
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(data , "text/xml" );
				var mainconfig = xmlDoc.getElementsByTagName('MAINCONFIG'); 
				var domain = xmlDoc.getElementsByTagName('DOMAIN');
				for (var x = 0; x < domain.length; x++){
					domainArray.push(domain[x].getAttribute('DomainName'));
				}
				globalDomainArray = domainArray;
				globalUserId = mainconfig[0].getAttribute('UserId');
				var userId= mainconfig[0].getAttribute('UserId');
				var userLevel =mainconfig[0].getAttribute('UserLevel');
			}else{
				var dat = data.replace(/'/g,'"');
		        var dat2 = $.parseJSON(dat);
        		var domain = dat2.MAINCONFIG[0].DOMAIN;
				for (var x = 0; x < domain.length; x++){
                    domainArray.push(domain[x].DomainName);
                }
				globalDomainArray = domainArray;
                globalUserId = dat2.MAINCONFIG[0].UserId;
				var userId= dat2.MAINCONFIG[0].UserId;
                var userLevel = dat2.MAINCONFIG[0].UserLevel;
			}
			userInformation.push({
                userId: userId,
                userLevel:userLevel,
            	resourceDomain:domainArray
            });	
			setJSONData();
//			if(globalDeviceType != "Mobile"){
				loadGridMenuContent();
//			}
		}
	});

}

/*
 *
 *  FUNCTION NAME : loadGridMenu
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 6, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : loads the content of grid menu
 *  PARAMETERS    : 
 *
 */
function loadGridMenu(){
	$.ajax({
		url: "pages/ConfigEditor/gridPopup.html",
		dataType: 'html',
		success: function(data) {
			$("#gridPanel").append(data);
//			$( "#configEditorPage" ).trigger('create');
			loadBarsMenu();
		}
	});
}
/*
 *
 *  FUNCTION NAME : loadBarsMenu
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 6, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : loads the content of bars menu
 *  PARAMETERS    : 
 *
 */
function loadBarsMenu(){
	$.ajax({
		url: "pages/ConfigEditor/barsPopup.html",
		dataType: 'html',
		success: function(data) {
			$("#barsPanel").append(data);
			$( "#configEditorPage" ).trigger('create');
			$.ajax({
	        url: "pages/ConfigEditor/leftsidebar.html",
    	    dataType: 'html',
        	success: function(data2) {
				$( "#configEditorPage" ).append(data2);
				var h = (window.innerHeight) - 3;
				$(".menu-hover").css({"height":h+"px"});
			}
			});
		}
	});
}
/*
 *
 *  FUNCTION NAME : loadConfigEditor
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 10, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : loads the content of config page
 *  PARAMETERS    : 
 *
 */
function loadConfigEditor(){
	$.ajax({
		url: "pages/ConfigEditor/ConfigEditor.html",
		dataType: 'html',
		success: function(data) {
			$("#configEditorPage").append(data);
			loadGridMenu();
			draw();
		}
	});
}
/*
 *
 *  FUNCTION NAME : getPortNumber
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 9, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : getPortNumber
 *  PARAMETERS    : portArr,cnt
 *
 */
function getPortNumber(portsArr,cnt){
	if(ForNumberExist(portsArr,cnt)){
		cnt++;
		cnt = getPortNumber(portsArr,cnt);
	}
	return cnt;
}

/*
 *
 *  FUNCTION NAME : ForNumberExist
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 9, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : getPortNumber
 *  PARAMETERS    : portArr,cnt
 *
 */
function ForNumberExist(portsArr,cnt){
	var flag = false;
	for(var t=0; t<portsArr.length; t++){
		if(portsArr[t].Number != "" && portsArr[t].Number == cnt){
			flag = true;	
			t = portsArr.length;
		}else if(portsArr[t].ObjectPath != ""){
			var path = portsArr[t].ObjectPath.split(".");
			var portnum = path[path.length -1].split("_");
			var num = parseInt(portnum[1]);
			if(num == cnt){
				flag = true;
				t = portsArr.length;
			}
		}
	}
	return flag;
}
/*
 *
 *  FUNCTION NAME : checkLinkNameExist
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 9, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : check link name is already exist
 *  PARAMETERS    : name,myArray
 *
 */
function checkLinkNameExist(name,myArray){
	var flag = false;
	for(var t=0; t<myArray.length; t++){
		var linkName = myArray[t].Name;
		if(name == linkName){
			flag = true;
			t = myArray.length;
		}
	}
	return flag;
}

/*
 *
 *  FUNCTION NAME : loadGridMenuContent
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 6, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  q
 *  REVISION #    : 
 *  DESCRIPTION   : loads the content of bars menu
 *  PARAMETERS    : 
 *
 */
var domainFlag = false;
function loadGridMenuContent(){
	if(globalDeviceType == "Mobile"){
		loading("show");
	}
	var selDomain = $('#resDomSelect').val();
	var query = {'QUERY':[{'user':globalUserName,'domainname':window['variable' + dynamicDomain[pageCanvas] ],'selecteddomain':selDomain,'enabledomain':domainFlag.toString() }]};
	query = JSON.stringify(query);
	var dat = query.replace(/"/g,"'");
	$.ajax({
		url: getURL("ConfigEditor","JSON"),
		data : {
			"action": "instantiate",
			"query": dat
		},
		method: 'POST',
		proccessData: false,
//        async:false,
		dataType: 'html',
		success: function(data) {
			if(globalDeviceType == "Mobile"){
				loading("hide");
			}
				if(data == ""){
				$('#testtoolSubDiv').hide();
				$('#deviceSubDiv').hide();
				$('#serverSubDiv').hide();
				$('#connectivitySubDiv').hide();
				$('#interfaceSubDiv').hide();
			}
			var domainArray = [];
			var zoneArray = [];
			var groupArrat = [];
			var hostDut='',dut='',ixia='',manuTd='',ostpe='',prdfam='';
			var manuTd2='',prdfam2='',modelTT='', IPAddTT='';
			var manuCtr =[],manuCtr2=[],ostpeCtr=[],prdfamCtr=[],prdfamCtr2=[], modCtr=[];
			var devFlag=false, testTlFlag=false, serverFlag=false,l1Flg=false,l2flag=false;
			var InfoType = "JSON";
			var testtoolFlag = false;
			var serverFlag= false;
			var deviceFlag = false;
			var connectivityFlag = false;

			var dat = data.replace(/'/g,'"');
		        var dat2 = $.parseJSON(dat);
			var root = dat2.root;
			var info = dat2.root[0].info;
			var conn;
			if(dat2.root[1] != null && dat2.root[1] != undefined){
				conn = dat2.root[1].conn;
				if(conn != null && conn != undefined){
					connectivityFlag = true;	
				}
			}
			for (var x = 0; x < info.length; x++){
				var type = info[x].DeviceType;
				type = type.toLowerCase();
				if(type.toLowerCase() == "testtool"){
					testtoolFlag = true;
				}
				if(type.toLowerCase() == "dut"){
					deviceFlag = true;
				}
				if(type.toLowerCase() == "server"){
					serverFlag = true;
				}
			}
			var subChnl;
			if(dat2.root[2] != null && dat2.root[2] != undefined){
				subChnl = dat2.root[2].SubChannel;
			}
			if(globalDeviceType != "Mobile"){
				showSideBarMenu(testtoolFlag,deviceFlag,serverFlag,connectivityFlag);
			}
			for (var x = 0; x < info.length; x++){
    	        		var model = info[x].Model;
                		var hostname = info[x].HostName;
               			var manu = info[x].Manufacturer;
                		var type = info[x].DeviceType;
                		var OStype = info[x].OSType;
                		var ProductFamily = info[x].ProductFamily;
                		var protoFlg = info[x].ProtoTypeFlag;
                		type = type.toLowerCase();
                		var imgObj = getModelImage(model);
                		var imgSrc = imgObj.src;
                		if(type.toLowerCase() == "testtool"){
					testtool = true;
                    			var mod1 = model;
                    			var mod2 = info[x].ManagementIp;
                		}
			    	var imgObj2 = getModelImage(manu);
               			var imgSrc2 = imgObj2.src;
               			if(manu != "" && manu != undefined){
                   			if(manuCtr.indexOf(manu) == '-1' && type == "dut"){
    	               				manuCtr.push(manu);
                       				manuTd += '<div style="float: left;"><img hostname="" proto="" class="manufacDevice devicePaletteTr" ostype="" ipAdd="" productfamily="" did="device" manufacturer="'+manu+'" devtype="dut" model="'+manu+'" id="deviceSub'+model+'" src="'+imgSrc2+'" /><p>'+manu+'</p></div>';
                    		}
                    		if(manuCtr2.indexOf(manu) == '-1' && type == "testtool"){
        	            		manuCtr2.push(manu);
                        		manuTd2 += '<div style="float: left;"><img hostname="" proto="" class="manufacTT testToolPaletteTr" ostype="" ipAdd="" productfamily="" did="device" devtype="testtool" manufacturer="'+manu+'" model="'+manu+'" id="testToolSub'+manu+'" src="'+imgSrc2+'" /><p>'+manu+'</p></div>';
                    }
               	}
               	if(OStype != "" && OStype != undefined){
               		if(ostpeCtr.indexOf(OStype) == '-1' && type == "dut"){
                		ostpeCtr.push(OStype);
	                    ostpe += '<div style="float: left;"><img hostname="" proto="" class="OSTypeDevice devicePaletteTr" ipAdd="" manufacturer="'+manu+'" ostype="'+OStype+'" devtype="dut" productfamily="" did="device" model="'+manu+'" id="deviceSub'+model+"_"+OStype+'" src="'+imgSrc2+'" /><p>'+OStype+'</p></div>';
               		}
                }
                if(ProductFamily != "" && ProductFamily!= undefined){
                	if(prdfamCtr.indexOf(ProductFamily) == '-1' && type == "dut"){
                    	prdfamCtr.push(ProductFamily);
                        prdfam += '<div style="float: left;"><img hostname="" proto="" class="prodFamilyDevice devicePaletteTr" ipAdd="" manufacturer="'+manu+'" ostype="'+OStype+'" devtype="dut" productfamily="'+ProductFamily+'" did="device" model="'+manu+'" id="deviceSub'+model+"_"+ProductFamily+'" src="'+imgSrc2+'" /><p>'+ProductFamily+'</p></div>';
                    }
                    if(prdfamCtr2.indexOf(ProductFamily) == '-1' && type == "testtool"){
                    	prdfamCtr2.push(ProductFamily);
                        prdfam2 += '<div style="float: left;"><img hostname="" proto="" class="prodFamilyTT testToolPaletteTr" manufacturer="'+manu+'" ostype="" ipAdd="" devtype="testtool" productfamily="'+ProductFamily+'" did="device" model="'+ProductFamily+'" id="testToolSub'+model+"_"+ProductFamily+'" src="'+imgSrc2+'" /><p>'+ProductFamily+'</p></div>';
                    }
               	}
				if(type == "dut"){
                	$('#tdDragDrop').show();
                    $('#tdDeviceList').show();
               		if(modCtr.indexOf(model) == "-1"){
                    	modCtr.push(model);
                        devFlag = true;
                        dut += '<div style="float: left;"><img hostname="" proto="'+protoFlg+'" class="modelDevice devicePaletteTr" devtype="dut" ipAdd="" productFamily="'+ProductFamily+'" ostype="'+OStype+'" manufacturer="'+manu+'" did="device" model="'+model+'" src="'+imgSrc+'" id="device'+model+'"><p>'+model+'</p></div>';
                    }
					if(hostname != "" && hostname != undefined){
	                	hostDut += '<div style="float: left;"><img hostname="'+hostname+'" proto="'+protoFlg+'" class="icon" devtype="dut" ipAdd="" productFamily="'+ProductFamily+'" ostype="'+OStype+'" manufacturer="'+manu+'" did="device" model="'+model+'" src="'+imgSrc+'" id="device'+model+'"><p>'+hostname+'</p></div>';
					}
                }else if(type == "testtool"){
                	testTlFlag = true;
                    $('#tdTestToolList').show()
                    $('#tdIxiaDrag').show()
                    if(mod1 != "" && mod1!= undefined){
                    	modelTT += '<div style="float: left;"><img hostname="" proto="'+protoFlg+'" productfamily="'+ProductFamily+'" ipAdd="" manufacturer="'+manu+'" ostype="" devtype="testtool" class="modelTT testToolPaletteTr" did="device" model="'+mod1+'" src="'+imgSrc+'" id="device'+model+'"><p>'+mod1+'</p></div>';
                    }
                    if(mod2 != "" && mod2 != undefined){
                    	IPAddTT += '<div style="float: left;"><img hostname="" proto="'+protoFlg+'" class="icon" devtype="testtool" ostype="" did="device" productfamily="'+ProductFamily+'" ipAdd="'+mod2+'" manufacturer="'+manu+'" model="'+mod1+'" src="'+imgSrc+'" id="device'+mod2+'"><p>'+mod2+'</p></div>';
                    }
                }else if(type == "server"){
                	serverFlag = true;
                    $('#tdServerList').show();
                }
            }

			connectivitySideBar(conn,subChnl); // for connectivity
			manuTd += '<div style="float: left;"><img did="device" model="cisco" id="deviceSubList" src="img/model_icons/cisco_vivid_blue_55.png" onclick="deviceTablePopUp(\'devicelist\')" /><p>Device List</p></div><div style="float: left;"><img did="device" model="cisco" id="deviceSubNew" src="img/model_icons/cisco_vivid_blue_55.png" onclick="newDevicePopUp()"/><p>New Device</p></div>';
			manuTd2 += '<div style="float: left;"><img did="devicelist" id="testToolSubList" onclick="testToolTablePopUp()" src="img/model_icons/juniper_55px.png" /><p>TestTool List</p></div><div style="float: left;"><img did="newtesttool" id="testToolSubNew" src="img/model_icons/juniper_55px.png" onclick="newTestToolPopUp()"/><p>New TestTool</p></div>';
			$("#devicePaletteSubTrMain").html(manuTd);
			$("#devicePaletteSubTrOSType").html(ostpe);
			$("#devicePaletteSubTrProdFamily").html(prdfam);
			$("#devicePaletteSubTrModel").html(dut);
			$("#devicePaletteSubTrHostname").html(hostDut);
			$("#testToolPaletteSubTrMain").html(manuTd2);
			$("#testToolPaletteSubTrProdFamily").html(prdfam2);
			$("#testToolPaletteSubTrModel").html(modelTT);
			$("#testToolPaletteSubTrIPAdd").html(IPAddTT);
			setTimeout(function(){
				$( "#configEditorPage" ).trigger('create');
				$('#domainText').empty().append(window['variable' + dynamicDomain[pageCanvas] ]);

				if(devFlag == false && userInformation[0].userLevel == "Administrator"){
					$("#deviceIcoDiv").show();
					$("#deviceSubList").hide();
					$("#device-Last").hide();
					$("#device-First").hide();
					$("#deviceSubList").parent().find("p").hide();
					$("#deviceSubNew").show();
				}else if(devFlag == true){
					$("#deviceIcoDiv").show();
					$("#deviceSubNew").show();
		                    	$("#deviceSubList").show();
					$("#device-Last").show();
                                        $("#device-First").hide();
                			$("#deviceSubList").parent().find("p").show();
				}else{
					$("#deviceIcoDiv").hide();
					$("#deviceSubNew").show();
					$("#device-Last").hide();
                                        $("#device-First").hide();
					$("#deviceSubNew").parent().find("p").show();
				}
				if(testTlFlag == false && userInformation[0].userLevel == "Administrator"){
					$("#testToolIcoDiv").show();
					$("#testToolSubList").hide();
					$("#testTool-Next").hide();
					$("#testTool-Last").hide();
					$("#testToolSubList").parent().find("p").hide();
					$("#testToolSubNew").show();
				}else if(testTlFlag == true){
					$("#testToolIcoDiv").show();
					$("#testToolSubNew").show();
					$("#testToolSubList").show();
					$("#testTool-Next").show();
					$("#testTool-Last").show();
                    			$("#testToolSubList").parent().find("p").show();
				}else{
					$("#testToolIcoDiv").hide();
					$("#testToolSubNew").show();
					$("#testTool-Next").hide();
                                        $("#testTool-Last").hide();
					$("#testToolSubNew").parent().find("p").show();
				}
				if((serverFlag == false && userInformation[0].userLevel == "Administrator") || (serverFlag == true)){
					$("#serverIcoDiv").show();
				}else{
					$("#serverIcoDiv").hide();
				}
			},100);
			if(globalDeviceType != "Mobile"){
				toggleSideMenu();
				CommitAction();
			}
		}
	});
}

/*
 *
 *  FUNCTION NAME : showSideBarMenu
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 13, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : testtoolFlag,deviceFlag,serverFlag,connectivityFlag
 *
 */
function showSideBarMenu(testtoolFlag,deviceFlag,serverFlag,connectivityFlag){
	if(userInformation[0].userLevel != "Administrator" && globalDeviceType != "Mobile"){
		var sideStr = "";
		if(!testtoolFlag){
			$('#testToolIn').hide();
		}
		if(!deviceFlag){
			$('#deviceIn').hide();
		}
		if(!serverFlag){
			$('#serverIn').hide();
		}
		if(!connectivityFlag){
			$('#connectivityIn').hide();
		}
	}
}
/*
 *
 *  FUNCTION NAME : connectivitySideBar
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 6, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : append connectivity infos
 *  PARAMETERS    : conn,subChnl
 *
 */
function connectivitySideBar(conn,subChnl){
	var InfoType = "JSON";
	if(conn != null && conn != undefined && conn[0].Speed != ""){
	var subChn = [];
	if(subChnl != undefined && subChnl != null){
		var subChn = subChnl[0].SubChannel.split(",");
	}
	var conVal = conn[0].Connectivity.split(",");
	var spd = conn[0].Speed.split(",");
	var l1Str="",l2Str="",L1AnyChild="",L2AnyChild="",l1StrSub="",l2StrSub="";
	for(var a =0; a< spd.length; a++){
		var convalval = spd[a].split("-");
		if(convalval[0] == 100 || convalval[0] == "100"){
			var modCon = "t10-100";
			var idCon = "10/100MBPS";
			var srcCon = "img/connectivity/10-100mbps.png";
		}else if(convalval[0] == 1000){
			var modCon = "t1gb";
            var idCon = "1GB";
            var srcCon = "img/connectivity/1gb.png";
		}else if(convalval[0] == 10000){
			var modCon = "t10gb";
            var idCon = "10GB";
            var srcCon = "img/connectivity/10gb.png";
		}else if(convalval[0] == 40000){
        	var modCon = "t40gb";
            var idCon = "40GB";
            var srcCon = "img/connectivity/40gb.png";
        }else if(convalval[0] == 100000){
        	var modCon = "t100gb";
            var idCon = "100GB";
            var srcCon = "img/connectivity/100gb.png";
        }
		if(convalval[1].toLowerCase() == "l1"){
			l1Flg = true;
			L1AnyChild = '<td><img class="toggle connPaletteTr connectGeneric" style="width: 45px;" model="ethernet" did="connectivity" speed="1000" linktype="L1" id="connectivitySubL1" src="img/connectivity/L1.png"><p>L1</p></td>';
			if(idCon == "10/100MBPS" || idCon == "1GB"){
				l1Str += '<td><img style="width: 45px;" did="connectivity" model="'+modCon+'" did2="liSub" speed="'+convalval[0]+'" linktype="L1" class="toggle linkParent connectGeneric" id="connectivitySubL1'+idCon+'" src="'+srcCon+'" /><p>'+idCon+'</p></td>';
				l1StrSub += '<td style="display:none;"><img style="width: 45px;" did="connectivity" model="rj45" speed="'+convalval[0]+'" linktype="L1" class="connector" id="connectivitySubL1'+idCon+'_RJ45" src="img/connectivity/rj45.png" /><p>RJ45'+idCon+'</p></td>';
				l1StrSub += '<td style="display:none;"><img style="width: 45px;" did="connectivity" model="sfp" speed="'+convalval[0]+'" linktype="L1" class="connector" id="connectivitySubL1'+idCon+'_SFP" src="img/connectivity/rj45.png" /><p>SFP'+idCon+'</p></td>';
			}else if(idCon == "10GB"){
				l1Str += '<td><img style="width: 45px;" did="connectivity" model="'+modCon+'" speed="'+convalval[0]+'" linktype="L1" class="connector" id="connectivitySubL1'+idCon+'" src="'+srcCon+'" /><p>'+idCon+'</p></td>';
			}else if(idCon == "100GB" || idCon == "40GB"){
				l1Str += '<td><img style="width: 45px;" did="connectivity" model="'+modCon+'" speed="'+convalval[0]+'" linktype="L1" class="linkParent connectGeneric" id="connectivitySubL1'+idCon+'" src="'+srcCon+'" /><p>'+idCon+'</p></td>';
				for(var b=0; b < subChn.length; b++){
	                l1StrSub += '<td style="display:none;"><img style="width: 45px;" did="connectivity" model="'+modCon+'" speed="'+convalval[0]+'" linktype="L1" class="connector" id="connectivitySubL1'+idCon+'_RJ45" src="img/connectivity/rj45.png" SubChannel="'+subChn[b]+'" /><p>SubChannel'+subChn[b]+'</p></td>';
				}
			}
		}else if(convalval[1].toLowerCase() == "l2"){
			l2Flg = true;
			L2AnyChild ='<td><img class="connPaletteTr connectGeneric" style="width: 45px;" model="ethernetl2" did="connectivity" speed="1000" linktype="L2" id="connectivitySubL2" src="img/connectivity/L2.png"><p>L2</p></td>';
			if(idCon == "10/100MBPS" || idCon == "1GB"){
				l2Str += '<td><img style="width: 45px;" did="connectivity" model="'+modCon+'" speed="'+convalval[0]+'" linktype="L2" class="linkParent connectGeneric" id="connectivitySubL2'+idCon+'" src="'+srcCon+'" /><p>'+idCon+'</p></td>';
				l2StrSub += '<td style="display:none;"><img style="width: 45px;" did="connectivity" model="rj45" speed="'+convalval[0]+'" linktype="L2" class="connector" id="connectivitySubL2'+idCon+'_RJ45" src="img/connectivity/rj45.png" /><p>RJ45'+idCon+'</p></td>';
                l2StrSub += '<td style="display:none;"><img style="width: 45px;" did="connectivity" model="sfp" speed="'+convalval[0]+'" linktype="L2" class="connector" id="connectivitySubL2'+idCon+'_SFP" src="img/connectivity/rj45.png" /><p>SFP'+idCon+'</p></td>';
			}else if(idCon == "10GB"){
                l2Str += '<td><img style="width: 45px;" did="connectivity" model="'+modCon+'" speed="'+convalval[0]+'" linktype="L2" class="connector" id="connectivitySubL2'+idCon+'" src="'+srcCon+'" /><p>'+idCon+'</p></td>';
			}else if(idCon == "100GB" || idCon == "40GB"){
                l2Str += '<td><img style="width: 45px;" did="connectivity" model="'+modCon+'" speed="'+convalval[0]+'" linktype="L2" class="linkParent connectGeneric" id="connectivitySubL2'+idCon+'" src="'+srcCon+'" /><p>'+idCon+'</p></td>';
				for(var b=0; b < subChn.length; b++){
	                l2StrSub += '<td style="display:none;"><img style="width: 45px;" did="connectivity" model="'+modCon+'" speed="'+convalval[0]+'" linktype="L2" class="connector" id="connectivitySubL2'+idCon+'_RJ45" src="img/connectivity/rj45.png" SubChannel="'+subChn[b]+'" /><p>SubChannel'+subChn[b]+'</p></td>';
				}
            }
		}
	}
	var concatAny = L1AnyChild+L2AnyChild;
	$("#connectivityPaletteSubTrL1L2").html(concatAny);
	$("#connectivityPaletteSubTrL1").html(l1Str);
	$("#connectivityPaletteSubTrL1Sub").html(l1StrSub);
	$("#connectivityPaletteSubTrL2").html(l2Str);
	$("#connectivityPaletteSubTrL2Sub").html(l2StrSub);
	$("#connectivity-Next").show();
        $("#connectivity-Last").show();
	}else{
		$("#connectivity-Next").hide();
		$("#connectivity-Last").hide();
		return;
	}
}


/*
 *
 *  FUNCTION NAME : populateCombo
 *  AUTHOR        : 
 *  DATE          :  
 *  MODIFIED BY   : James Turingan
 *  REVISION DATE : December 09, 2013
 *  REVISION #    : 
 *  DESCRIPTION   : populates the value of combo box of days,hours and minutes
 *  PARAMETERS    : 
 *
 */

function populateCombo() {
	var strDay = '';
	for (var a=0; a<365; a++) {
		if (!a) {
			strDay += "<option value='dd'>dd</option>";
		} else {
			strDay += "<option value='"+a+"'>"+a+"</option>";
		}
	}
	$('#durationD').empty().append(strDay);

	var strHour = '';
	for (var a=0; a<24; a++) {
		if (!a) {
			strHour += "<option value='hh'>hh</option>";
		}else if(a == 2){
			strHour += "<option value='"+a+"' selected>"+a+"</option>";

		} else {
			strHour += "<option value='"+a+"'>"+a+"</option>";
		}
	}
	$('#durationH').empty().append(strHour);

	var strMin = '';
	for (var a=0; a<60; a++) {
		if (!a) {
			strMin += "<option value='mm'>mm</option>";
		} else {
			strMin += "<option value='"+a+"'>"+a+"</option>";
		}
	}
	$('#durationM').empty().append(strMin);

}
/*
 *
 *  FUNCTION NAME : outOfFocus
 *  AUTHOR        : 
 *  DATE          :  
 *  MODIFIED BY   : James Turingan
 *  REVISION DATE : December 09, 2013
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */


function outOfFocus(){
	
	var testVal = $('#FlashDurationSel').val();
	if ($('#FlashDurationSel').val() == 'datetime'){
		//var d1 = $('#confirm_test').val().split('/');
		var startDate   = $("#confirm_test").val().split("-");
		var sdate;
		if (startDate.length == 1) {
			sdate = startDate[0];
		} else {
			sdate = startDate[1]+"/"+startDate[2]+"/"+startDate[0];
		  }
		$("#confirm_test").val(sdate);

		var sDate = $("#confirm_test").val();
		var sTime = $("#confirm_test1").val();
		var eTime = $("#confirm_test3").val();

		var sDateArr = sDate.split(/\//);
		if (sDateArr.length != 3) {
			displayWarning3("<b>Please enter valid Start Date.</b>");
			$('#confirm_test').focus();
			return;
		}
		var smonth = sDateArr[0];
		var sday = sDateArr[1];
		var syear = sDateArr[2];
		if (syear.length < 4) {
//			displayWarning3("<b>Please enter valid year for Start Date.</b>");
			$('#confirm_test').focus();
			return;
		}
		var sTimeArr = sTime.split(":");
		if(sTimeArr.length == 2){
			var val = $('#confirm_test1').val();
			$('#confirm_test1').val(val+':'+'00');
			sTime = $('#confirm_test1').val();
			sTimeArr = sTime.split(":");

		}

		if (sTimeArr.length != 3) {
//			displayWarning3("<b>Please enter valid Start Time.</b>");
			$('#confirm_test1').focus();
			return;
		}
		var shour = sTimeArr[0];
		var smin = sTimeArr[1];
		var ssec = sTimeArr[2];
		var eDateArr = $('#confirm_test2').val().split(/\//);
		if (eDateArr.length != 3) {
//			displayWarning3("<b>Please enter valid Start Date.</b>");
			$('#confirm_test2').focus();
			return;
		}
		var emonth = eDateArr[0];
		var eday = eDateArr[1];
		var eyear = eDateArr[2];
		if (eyear.length < 4) {
//			displayWarning3("<b>Please enter valid year for End Date.</b>");
			$('#confirm_test2').focus();
			return;
		}

		var eTimeArr = eTime.split(":");

		if(eTimeArr.length == 2){
			var val = $('#confirm_test3').val();
			$('#confirm_test3').val(val+':'+'00');
			eTime = $('#confirm_test3').val();
			eTimeArr = eTime.split(":");

		}

		if (eTimeArr.length != 3) {
//			displayWarning3("<b>Please enter valid End Time.</b>");
			$('#confirm_test3').focus();
			return;
		}
		var ehour = eTimeArr[0];
		var emin = eTimeArr[1];
		var esec = eTimeArr[2];
			emonth = parseInt(emonth,10);
			smonth = parseInt(smonth,10);
		var enddate = new Date(eyear,emonth,eday,ehour,emin,esec);
		var startdate = new Date(syear,smonth,sday,shour,smin,ssec);
		var diff = enddate.getTime() - startdate.getTime();
		var daysDiff = Math.floor(diff/1000/60/60/24);
		diff -= daysDiff*1000*60*60*24
		var hoursDiff = Math.floor(diff/1000/60/60);
		diff -= hoursDiff*1000*60*60
		var minsDiff = Math.floor(diff/1000/60);
		if (daysDiff >= 0) {
			if (daysDiff) {
				$('#durationD').val(daysDiff);
			}
			if (hoursDiff) {
				$('#durationH').val(hoursDiff);
			}
			if (minsDiff) {
				$('#durationM').val(minsDiff);
			}
		} else {
			$('#durationD').val('dd');
			$('#durationH').val('hh');
			$('#durationM').val('mm');
		}
	} else {
		var startDate = $("#confirm_test").val().split("-");
		var sdate;
		if (startDate.length == 1) {
			sdate = startDate[0];
		} else {
			sdate = startDate[1]+"/"+startDate[2]+"/"+startDate[0];
		  }
		$("#confirm_test").val(sdate);
		var sDate = $("#confirm_test").val();
		var sTime = $("#confirm_test1").val();
		var sDateArr = sDate.split(/\//);
		if (sDateArr.length != 3) {
		//	displayWarning3("<b>Please enter valid Start Date.</b>");
			$('#confirm_test').focus();
			return;
		}
		var smonth = sDateArr[0];
		var sday = sDateArr[1];
		var syear = sDateArr[2];
		if (smonth > 12 || smonth == 0) {
		//	displayWarning3("<b>Please enter valid month for Start Date.</b>");
			$('#confirm_test').focus();
			return;
		}
		if (sday > 31 || sday == 0) {
		//	displayWarning3("<b>Please enter valid day for Start Date.</b>");
			$('#confirm_test').focus();
			return;
		}
		if (syear.length < 4) {
		//	displayWarning3("<b>Please enter valid year for Start Date.</b>");
			$('#confirm_test').focus();
			return;
		}
		var sTimeArr = sTime.split(":");
		if(sTimeArr.length == 2){
			var val = $('#confirm_test1').val();
			$('#confirm_test1').val(val+':'+'00');
			sTime = $('#confirm_test1').val();
			sTimeArr = sTime.split(":");
		}
		if (sTimeArr.length != 3) {
		//	displayWarning3("<b>Please enter valid Start Time.</b>");
			$('#confirm_test1').focus();
			return;
		}
		calculateEndDate();
	}
//	validateDate();
}
/*
 *
 *  FUNCTION NAME : calculateDate
 *  AUTHOR        : 
 *  DATE          :  
 *  MODIFIED BY   : James Turingan
 *  REVISION DATE : December 09, 2013
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */



function calculateDate(ndate,d,h,m){
	var date1 = ndate;
	if (!isNaN(m)){
		date1.setMinutes(date1.getMinutes()+m);
	}
	if (!isNaN(h)){
		date1.setHours(date1.getHours()+h);
	}
	if (!isNaN(d)){
		date1.setDate(date1.getDate()+d);
	}
	return date1;
}


/*
 *
 *  FUNCTION NAME : calculateEndDate
 *  AUTHOR        : 
 *  DATE          :  
 *  MODIFIED BY   : James Turingan
 *  REVISION DATE : December 09, 2013
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */


function calculateEndDate(){

	var d1 = new Array();
	d1 = $('#confirm_test').val().split('/');
	var t1 = $('#confirm_test1').val();

	var d1str = "";
	if ( d1.length != 3 ) {
		d1 = $('#confirm_test').val().split('-');
		if ( d1.length != 3 ) {
			displayWarning("<b>Invalid Date Provided</b>");
			$('#confirm_test').val('');
			return;
		} else {
			var eyear = d1[0];
			if (eyear.length < 4) {
				displayWarning("<b>Please enter valid year for Start Date.</b>");
				$('#confirm_test').focus();
				return;
			}
			d1str = new Date(d1[0]+'/'+d1[1]+'/'+d1[2]+' '+t1); 
			var newDate = d1[1]+'/'+d1[2]+'/'+d1[0];
			$('#confirm_test').val(newDate);
		}
	} else {
		var eyear = d1[2];
		if (eyear.length < 4) {
			displayWarning("<b>Please enter valid year for Start Date.</b>");
			$('#confirm_test').focus();
			return;
		}
		d1str = new Date(d1[2]+'/'+d1[0]+'/'+d1[1]+' '+t1); 
	}

	var day = $('#durationD').val();
	var hour = $('#durationH').val();
	var min = $('#durationM').val();

	if (day == "dd" && hour == "hh" && min=="mm") {
		$('#confirm_test2').val($('#confirm_test').val());
		$('#confirm_test3').val($('#confirm_test1').val());
	} else {
		var newdt = calculateDate(d1str,parseInt(day),parseInt(hour),parseInt(min));
		var dstring = (newdt.getMonth()+1)+'/'+newdt.getDate()+'/'+newdt.getFullYear();
		$('#confirm_test2').val(dstring);
		$('#confirm_test3').val(newdt.toString().split(' ')[4]);
	}

}
/*
 *
 *  FUNCTION NAME : calculateDHM
 *  AUTHOR        : 
 *  DATE          :  
 *  MODIFIED BY   : James Turingan
 *  REVISION DATE : December 09, 2013
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */


function calculateDHM(milisec){
	//DHM = Day, Hour, Minutes
	var newMili = parseInt(milisec);
	var DHMconv = [86400000,3600000,60000];
	var DHM = ['dd','hh','mm'];
	if (isNaN(newMili)){
		return DHM;
	}
	for (var i=0;i<DHMconv.length;i++){
		if (newMili < DHMconv[i]){
			continue;
		}
		DHM[i]= (newMili/DHMconv[i]).toString().split('.')[0];
		newMili = newMili % DHMconv[i];	
	}	
	return DHM;
}
/*
 *
 *  FUNCTION NAME : durationOnChange
 *  AUTHOR        : 
 *  DATE          :  
 *  MODIFIED BY   : James Turingan
 *  REVISION DATE : December 09, 2013
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */


function durationOnChange (val) {
	if (val.toLowerCase() == "duration") {
		if(globalDeviceType == "Mobile"){
			$('#durationD').selectmenu('enable');
			$('#durationM').selectmenu('enable');
			$('#durationH').selectmenu('enable');
			$('#confirm_test2').textinput('disable');
			$('#confirm_test3').textinput('disable');

		}else{
			$('#durationD').removeAttr('disabled');
			$('#durationM').removeAttr('disabled');
			$('#durationH').removeAttr('disabled');
			$('#confirm_test2').attr('disabled', true);
			$('#confirm_test3').attr('disabled', true);
		}

	} else {
		if(globalDeviceType == "Mobile"){
			$('#durationD').selectmenu('disable');
			$('#durationM').selectmenu('disable');
			$('#durationH').selectmenu('disable');
			$('#confirm_test2').textinput('enable');
			$('#confirm_test3').textinput('enable');
		}else{
			$('#durationD').attr('disabled', true);
			$('#durationM').attr('disabled', true);
			$('#durationH').attr('disabled', true);
			$('#confirm_test2').attr('disabled', false);
			$('#confirm_test3').attr('disabled', false);
		}

	}
}
/*
 *
 *  FUNCTION NAME : rebuilCanvas 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : December 5, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : rebuild canvas for new topology
 *  PARAMETERS    : 
 *
 */
function rebuilCanvas(){
	drawImage();
}
/*
 *
 *  FUNCTION NAME : initDate
 *  AUTHOR        : James Turingan
 *  DATE          : December 10, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initialize the date picker inwImage commit popUp 
 *  PARAMETERS    : 
 *
 */
function initDate(flag){
	var date = new Date();
	var dateToday = date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear()
	var timeH = date.getHours();
	var timeM = date.getMinutes();
	var timeS = date.getSeconds();
	if(timeH == 0){
		timeH = '00';
	}
	if(timeM == 0){
		timeM = '00';
	}
	if(timeS == 0){
		timeD = '00';
	}
	var time = timeH+':'+timeM+':'+timeS;
	var ntime = convertTime(time);
	if(flag != 'true'){
		$('#confirm_test').val(dateToday);
	}
	$('#confirm_test1').val(ntime);
	outOfFocus();
}
/*
 *
 *  FUNCTION NAME : validateDate
 *  AUTHOR        : 
 *  DATE          : December 10, 2013 
 *  MODIFIED BY   : James Turingan
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function validateDate(){
	var startDate	= $("#confirm_test").val();
	var startTime	= $("#confirm_test1").val();
	var endTime		= $("#confirm_test3").val();
	var endDate		= $("#confirm_test2").val();
	var sDate = new Array();
		sDate = startDate.split("/");
	var sTime = new Array();
		sTime = startTime.split(":");
	var eDate = new Array();
		eDate = endDate.split("/");
	var eTime = new Array();
		eTime = endTime.split(":");

	var EndStart = DateChecker( eDate[2] , eDate[0] , eDate[1] , eTime[0] , eTime[1] , eTime[2] , sDate[2] , sDate[0] , sDate[1] , sTime[0] , sTime[1] , sTime[2], 1 );
	if ( EndStart == 0 ) {
		alerts( "Reservation end time cannot be less than reservation start time." );
		outOfFocus();	
		return 1;
	} else if ( EndStart == 2 ) {
		alerts( "Reservation end time cannot be equal to reservation start time." );
		outOfFocus();	
		return 1;
	} else if ( EndStart == 3 ) {
		alerts( "Minimum reservation time is 10 minutes. Please adjust time of reservation." );
		outOfFocus();	
		return 1;
	} 

	else {
		var val = timeCheck();
		if(val == 1){			
			alerts( "Reservation time has already lapsed. Do you want to use the current time as the start time?", '','alert2');
			return 1;
		}

	
	}

}
function timeCheck(){
	var retVal = 0;
	var startTime	= $("#confirm_test1").val();
	var timeArr = startTime.split(':');
	var pastTime = parseInt(timeArr[0]) + parseInt(timeArr[1]);
	var serverTime = convertTime(startTime);	
	var timeArr2 = serverTime.split(':');
	var currTime = parseInt(timeArr2[0]) + parseInt(timeArr2[1]);
	if(currTime != pastTime){
		
		retVal = 1;
	}
	return retVal
}

/*
 *
 *  FUNCTION NAME : DateChecker
 *  AUTHOR        : 
 *  DATE          : December 10, 2013 
 *  MODIFIED BY   : James Turingan
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */


function DateChecker ( gYear , gMonth , gDay , gHour , gMin , gSec,  lYear , lMonth , lDay , lHour , lMin , lSec , intervalFlag ) {

	gMonth = appendZero( gMonth );
	gDay = appendZero( gDay );
	gHour = appendZero ( gHour );
	gMin = appendZero ( gMin );
	gSec = appendZero ( gSec );
	lMonth = appendZero( lMonth );
	lDay = appendZero( lDay );
	lHour = appendZero ( lHour );
	lMin = appendZero ( lMin );
	lSec = appendZero ( lSec );	

	var greaterDate = gYear + gMonth + gDay + gHour + gMin + gSec;
		greaterDate = parseInt( greaterDate );
	var lesserDate = lYear + lMonth + lDay + lHour + lMin + lSec;
		lesserDate = parseInt( lesserDate );

	var gDate = formatDate( gYear , gMonth , gDay , gHour , gMin , gSec );
	var lDate = formatDate( lYear , lMonth , lDay , lHour , lMin , lSec );

	var retVal;
	if ( greaterDate == lesserDate ) {
		retVal = 2;
	} else if ( greaterDate > lesserDate ) {
		if ( intervalFlag == 1 ) {
			retVal = checkInterval( gDate , lDate, 1 );
		} else {
			//retVal = checkInterval( gDate , lDate, 0 );
			retVal = 1;
		}
	} else {
		if (intervalFlag == 1) {
			retVal = 0;
		} else {
			retVal = checkInterval( gDate , lDate, 0 );
		}
	}

	return retVal;

}

/*
 *
 *  FUNCTION NAME : appendZero
 *  AUTHOR        : 
 *  DATE          : December 10, 2013 
 *  MODIFIED BY   : James Turingan
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */


function appendZero( dateValue ) {

	if ( dateValue.length == 1 ) {
		retVal = "0" + dateValue;
	} else {
		retVal = dateValue;
	}

	return retVal;

}
/*
 *
 *  FUNCTION NAME : formatDate
 *  AUTHOR        : 
 *  DATE          : December 10, 2013 
 *  MODIFIED BY   : James Turingan
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */


function formatDate ( year , month , day , hour , minute , second ) {

//	var myDate = new Date("July 1, 1978 02:30:00"); // Your timezone!
//	var myEpoch = myDate.getTime()/1000.0;

	// CONVERT MONTH VALUE TO WORD
	var newMonth;
	if ( month == 1 ) {
		newMonth = "January";
	} else if ( month == 2 ) {
		newMonth = "February";
	} else if ( month == 3 ) {
		newMonth = "March";
	} else if ( month == 4 ) {
		newMonth = "April";
	} else if ( month == 5 ) {
		newMonth = "May";
	} else if ( month == 6 ) {
		newMonth = "June";
	} else if ( month == 7 ) {
		newMonth = "July";
	} else if ( month == 8 ) {
		newMonth = "August";
	} else if ( month == 9 ) {
		newMonth = "September";
	} else if ( month == 10 ) {
		newMonth = "October";
	} else if ( month == 11 ) {
		newMonth = "November";
	} else if ( month == 12 ) {
		newMonth = "December";
	}

	var newDate = newMonth+" "+day+", "+year+" "+hour+":"+minute+":"+second;

	return newDate;

}
/*
 *
 *  FUNCTION NAME : checkInterval
 *  AUTHOR        : 
 *  DATE          : December 10, 2013 
 *  MODIFIED BY   : James Turingan
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */



function checkInterval( gDate , lDate, flag ) {

//	var myDate = new Date("July 1, 1978 02:30:00"); // Your timezone!
//	var myEpoch = myDate.getTime()/1000.0;

	var greaterDate = new Date( gDate );
	var greaterEpoch = greaterDate.getTime()/1000.0;
		greaterEpoch = parseInt( greaterEpoch );
	var lesserDate = new Date( lDate );
	var lesserEpoch = lesserDate.getTime()/1000.0;
		lesserEpoch = parseInt( lesserEpoch );


	var retVal = 1;
	if ( flag == 1 ) {
		var deltaTime = greaterEpoch - lesserEpoch;
			deltaTime = parseInt( deltaTime );
		if ( deltaTime < 600 ) {
			retVal = 3;
		}
	} else {
		var deltaTime = lesserEpoch - greaterEpoch;
			deltaTime = parseInt( deltaTime );
		if ( deltaTime >= 60 ) {
			retVal = 3;
		} else {
			retVal = 5;
		  }
	}
	return retVal;

}
/*
 *
 *  FUNCTION NAME : createDeviceTooltip 
 *  AUTHOR        : Apple Kem E. Eguia
 *  DATE          : December 10, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : creates tooltip on tap and hold on device
 *  PARAMETERS    : imgId, imgXpos2, imgYpos2, action 
 *
 */
function createDeviceTooltip(imgId){
	var myText = "";	
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var i = 0; i  < devices.length; i++){ // checks if the hitted object is equal to the array
		if(devices[i].ObjectPath == imgId){ // get the device name and model
			if (devices[i].Status == 'Reserved'){
				if (devices[i].HostName != ""){
					myText = "Host Name: " + devices[i].HostName;
				}
				if (devices[i].Model != ""){
					myText += "<br />Model: " + devices[i].Model;
				}
				if (devices[i].OSVersion != ""){
					myText += "<br/>OS Version: " + devices[i].OSVersion;
				}
				if (devices[i].ManagementIp != ""){
					myText += "<br/>Management IP: " + devices[i].ManagementIp;
				}
				if (devices[i].ConsoleIp != ""){
					myText += "<br/>Console IP: " + devices[i].ConsoleIp;
				}
				if (devices[i].Status != "" && devices[i].Status != undefined){
					myText += "<br/>Reservation Status: " + devices[i].Status;
				}
			} else if(devices[i].Status == "" || devices[i].Status == undefined || devices[i].Status == null )  {
				if (devices[i].HostName != ""){
                    myText = "Host Name: " + devices[i].HostName;
                }else if (devices[i].DeviceName != ""){
					myText = devices[i].DeviceName;
				}else{
					myText = devices[i].ObjectPath;
				}
				if (devices[i].Model != ""){
					myText += "<br />Model: " + devices[i].Model;
				}
				if (devices[i].OSVersion != ""){
					myText += "<br />OS Version: " + devices[i].OSVersion;
				}
				if (devices[i].ManagementIp != ""){
					myText += "<br />Management IP: " + devices[i].ManagementIp;
				}
				if (devices[i].ConsoleIp != ""){
					myText += "<br />Console IP: " + devices[i].ConsoleIp;
				}
				if (devices[i].Status != "" && devices[i].Status != undefined){
					myText += "<br />Reservation Status: " + devices[i].Status;
				}

			}
		}
	}
	return myText;
}	

/*
 *
 *  FUNCTION NAME : createLineTooltip
 *  AUTHOR        : marlo agapay
 *  DATE          : December 11, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : id
 */
function createLineTooltip(id){
	var t = id.split('||');
	var destination = t[0];
	var source = t[1];
	var type = t[2].split("_");
	var s = t[0].split(".");
	var d = t[1].split(".");
	var t3 = type[0];
	var text = "";
	text = getPortInfo2(s[0],d[0],source,destination,t3,text);
	text = getOtherPorts(s[0],d[0],t[2],text);
	return text;
}
/*
 *
 *  FUNCTION NAME : filterManageDevice
 *  AUTHOR        : Jvsantiago
 *  DATE          : December 11, 2013 
 *  MODIFIED BY   : Mark Anthony Elbambo
 *  REVISION DATE : Jan. 28, 2014
 *  REVISION #    : 2
 *  DESCRIPTION   : filter devicelist tables
 *  PARAMETERS    : type
 *	MODIFICATIONS : added resend to appendToDeviceListTable
 */
function filterManageDevice(type){
	$('.dFilter').keyup(function() {
		devListFilterId=[];
		
		var val ='^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
			reg = RegExp(val, 'i'),
			text;

		if(type == 'testTool'){
			var colval = $('#testlistddown').val();
			var $rows = $('#manageTestToolTable tr:gt(0)');
		}else{
			var colval = $('#dlistddown').val();
			var $rows = $("#tabsDevlist figure");//$('#manageConfigTable tr:gt(0)');
		}

		var colnum = '';
		if(colval == "hostname"){
			colnum = 1
		}else if(colval == "model"){
			colnum = 5
		}else if(colval == "managementip"){
			colnum = 2
		}else if(colval == "manufacturer"){
			colnum = 4
		}else if(colval == "consoleip"){
			colnum = 3
		}
		$rows.show().filter(function() {
			if(colnum != ''){
				text = $(this).find("td").eq(colnum).text().replace(/\s+/g, ' ');
			}else{
				text = $(this).text().replace(/\s+/g, ' ');
			}
			var devId = $(this).attr('deviceid');
			if(!reg.test(text) && devListFilterId.indexOf(devId) =='-1'){
				devListFilterId.push(devId);
			}
			return !reg.test(text);
		}).hide();
		subAppednd();
	});
	$(document).on("change", "#dlistddown", function () {
		devListFilterId=[];
		$('.dFilter').val("");
		subAppednd();
	});
	$(document).on("change", "#testlistddown", function () {
		devListFilterId=[];
		$('.dFilter').val("");
		subAppednd();
	});
	function subAppednd(){
		if(globalDevListRow.length > 0){
		var data = globalDevListRow[0].data;
		var condition = globalDevListRow[0].condition;
		var load = globalDevListRow[0].load;
		var tabSelected = globalDevListRow[0].tabSelected;
		appendToDeviceListTable(data,condition,load, tabSelected);
		}
	}
}
/*
 *
 *  FUNCTION NAME : createQueryMapLink
 *  AUTHOR        : marlo agapay
 *  DATE          : December 13, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : filter devicelist tables
 *  PARAMETERS    : 
 *
 */
var frmMapLink = false;
function createQueryMapLink(deviceArrDev){
	var str = deviceArrDev.join(',');
	var query = {"QUERY":[{"hostname":str}]};
    query = JSON.stringify(query); 
	var url = getURL("ConfigEditor2","JSON")+"action=getmaplink&query="+query//hostname="+str;;
	if(globalDeviceType == "Mobile"){
        loading('show');
	}
	$.ajax({
		url: url,
		dataType: 'html',
		method 	: 'GET',
		processData : false,
		async : false,
		success : function(data){
			setJSONData();
			globalSelectedDeviceList=[];
			var mydata = data;
			if(globalInfoType == "XML"){
				getDataForDeviceList(mydata);
			}else{
				data = data.replace(/'/g,'"');
				var obj = jQuery.parseJSON(data);
				getDataForDeviceListJSON(obj);
			}
			frmMapLink = true;
			setTimeout(function(){
				if (globalManageDeviceShow.toLowerCase()=="tooltipdevice"){
					updateLineConnectionIfExist();
				}
				autoCreateLine();	
				drawImage();
				frmMapLink = false;
				if(globalDeviceType == "Mobile"){
	        		loading('hide');
			    }else{
					ajaxLoader('hide');
				}
			},1000);

		}	
	});	
}

/*
 *
 *  FUNCTION NAME : updateLineConnectionIfExist
 *  AUTHOR        : marlo agapay
 *  DATE          : December 18, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get coresponding line connected object
 *  PARAMETERS    : 
 *
 */
function updateLineConnectionIfExist(){
	var lineSrc = "";
	var lineDes = "";
	if (window['variable' + dynamicLineConnected[pageCanvas]].length!=0){
//		glblDevMenImg
		for (var a=0; a<window['variable' + dynamicLineConnected[pageCanvas]].length; a++){
			var desDev = window['variable' + dynamicLineConnected[pageCanvas]][a].DestinationDeviceObjectPath;
			var sourceDev = window['variable' + dynamicLineConnected[pageCanvas]][a].SourceDeviceObjectPath;						
			var srcObj = window['variable' + dynamicLineConnected[pageCanvas]][a].Source;
			var devObj = window['variable' + dynamicLineConnected[pageCanvas]][a].Destination;
			var dev
			if (glblDevMenImg == desDev){
				setLineConnectedAttributes(window['variable' + dynamicLineConnected[pageCanvas]][a],desDev,"destination",srcObj,devObj);
			}else if (glblDevMenImg == sourceDev){
				setLineConnectedAttributes(window['variable' + dynamicLineConnected[pageCanvas]][a],sourceDev,"source",srcObj,devObj);
			}
		}
	}else{
		return;
	}	
}

/*
 *
 *  FUNCTION NAME : setLineConnectedAttributes
 *  AUTHOR        : marlo agapay
 *  DATE          : December 18, 2013 
 *  MODIFIED BY   : James Turingan
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function setLineConnectedAttributes(LineConnected, devObjPath,lineLocation,srcObj,devObj){
	if (lineLocation =="destination"){
		checkAvPortForConnect(LineConnected.Source,devObjPath,lineLocation,srcObj,devObj);
	}else if (lineLocation == "source"){
		checkAvPortForConnect(LineConnected.Destination,devObjPath,lineLocation,srcObj,devObj);
	}	
}
/*
 *
 *  FUNCTION NAME : checkAvPortForConnect
 *  AUTHOR        : marlo agapay
 *  DATE          : December 18, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkAvPortForConnect(lineConnectedDevice, toConnectDevice,lineLocation,srcObj,devObj){
	console.log('??????>>>',lineConnectedDevice);
	if(globalInfoType == "JSON"){
		var pathArr = lineConnectedDevice.split(".");
    	var prtArr = getAllPortOfDevice(pathArr[0]);
    }else{
         var prtArr= portArr;
   	}
	var portTempArr = prtArr;
	var foundMatch = false;
	for(var a=0; a<prtArr.length; a++){
		var dev = prtArr[a].ObjectPath.split(".");
		var portDev=dev[0];
		if(portDev == lineConnectedDevice){
			var LCPortName = prtArr[a].PortName;
			var LCPortFlag = prtArr[a].PortFlag;
			var LCSpeed = prtArr[a].Speed;
			var LCPortType = prtArr[a].PortType;
			for (var q=0; q<portTempArr.length; q++){
				var TCPortName = portTempArr[q].PortName;
				var TCSpeed = portTempArr[q].Speed;
				var TCPortType = portTempArr[q].PortType;
				var TCPortFlag = portTempArr[q].PortFlag;
				var portDevName = portTempArr[q].PortDevName.split(".");
				if(LCSpeed == TCSpeed && TCPortType == LCPortType && TCPortFlag ==""){
					UpdateLineConnection(TCPortName,portDevName,lineLocation);
					foundMatch = true;
				}				
			}
		}
	}
	if (foundMatch==false){
		deleteLink(srcObj,devObj);
	}
	
}

/*
 *
 *  FUNCTION NAME : drawOneImage
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : December 11, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : draw image with label
 *  PARAMETERS    : 
 *
 */
function UpdateLineConnection(toInsertPort,portDevName,lineLocation){
	var device = getDeviceObject();
	var devObj = glblDevMenImg+"."+toInsertPort;
	for (var a=0; a<window['variable' + dynamicLineConnected[pageCanvas]].length; a++){
		if(window['variable' + dynamicLineConnected[pageCanvas]][a].SourceDeviceObjectPath == glblDevMenImg){
			window['variable' + dynamicLineConnected[pageCanvas]][a].Source = devObj;
			window['variable' + dynamicLineConnected[pageCanvas]][a].SourceDeviceXLocation = device.XLocation;
	        window['variable' + dynamicLineConnected[pageCanvas]][a].SourceDeviceYLocation = device.YLocation;
    	    window['variable' + dynamicLineConnected[pageCanvas]][a].SourceDeviceObjectPath = device.ObjectPath;
//			lineConnected[a].SourceDevice = device;
		} else if (window['variable' + dynamicLineConnected[pageCanvas]][a].DestinationDeviceObjectPath == glglDevMenImg){
			window['variable' + dynamicLineConnected[pageCanvas]][a].Destination = devObj;
			window['variable' + dynamicLineConnected[pageCanvas]][a].DestinationDeviceXLocation = device.XLocation;
	        window['variable' + dynamicLineConnected[pageCanvas]][a].DestinationDeviceYLocation = device.YLocation;
    	    window['variable' + dynamicLineConnected[pageCanvas]][a].DestinationDeviceObjectPath = device.ObjectPath;
//			lineConnected[a].DestinationDevice = device;
		}
	}
}

/*
 *
 *  FUNCTION NAME : getDeviceObject
 *  AUTHOR        : marlo agapay
 *  DATE          : December 13, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get corresponfding image src
 *  PARAMETERS    : type,manu,model
 *
 */
function getDeviceObject(){
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var a=0; a<devices.length; a++){
		if (devices[a].ObjectPath == glblDevMenImg){
			return devices[a];
		}
	}
}
/*
 *
 *  FUNCTION NAME : findImageDevice
 *  AUTHOR        : marlo agapay
 *  DATE          : December 13, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get corresponfding image src
 *  PARAMETERS    : type,manu,model
 *
 */

function findImageDevice(type,manu,model){
	var st = "";
	type = type.toLowerCase();
	manu = manu.toLowerCase();
	model = model.toLowerCase();
	if(type.toLowerCase() == "dut"){
/*		if(manu == "cisco"){
			var mtch = model.match(/asr/g);
			if(mtch =="" || mtch != "asr"){
				st = '/device/cisco_vivid_blue_40.png';
			}else{							
				st= '/device/asr-1k-40px.png';
			}
		}else if(manu == "ixia"){
			st= '/testtool/ixia-40px.png';
		}*/
	}else if(type == "testtool"){
		if(manu == "ixia"){
			st= '/model_icons/ixia-40px.png';
		}
	}
	return st;
		
}
/*
 *
 *  FUNCTION NAME : deviceMenuPopup
 *  AUTHOR        : Clarice Salanda
 *  DATE          : December 16, 2013 
 *  MODIFIED BY   : Penn G. Ducao
 *  REVISION DATE :	January 8, 2014
 *  REVISION #    : 1
 *  DESCRIPTION   : Update for query function 
 *  PARAMETERS    : 
 *
 */
function deviceMenuPopup(){
	setTimeout(function(){
		$.mobile.changePage($('#deviceMenuPop'),{
			transition: "pop",
			changeHash: false
		});
	},1500);
}
/*
 *
 *  FUNCTION NAME : loadFilterDevices()
 *  AUTHOR        : James Turingan
 *  DATE          : December 18, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function loadFilterDevices(){
	var query = {"QUERY":[{"user":globalUserName,"domainname":window['variable' + dynamicDomain[pageCanvas] ],"zone":"Default"}]};
    query = JSON.stringify(query);
	$.ajax({
		url: getURL("ConfigEditor","JSON"),
		data : {
			"action": "getdeviceinfo",
			"query": query
		},
		method: 'POST',
		proccessData: false,
		dataType: 'html',
		success: function(data) {
			getDevInfoFilter(data);		
		}
	});
}
/*
 *
 *  FUNCTION NAME : getDevInfoFilter()
 *  AUTHOR        : James Turingan
 *  DATE          : December 18, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : xml parsing and stores the data into json
 *  PARAMETERS    : data
 *
 */
var checkLineCard = [];
var checkPort = [];
var checkRoute = [];
function getDevInfoFilter(data){
	var InfoType = "JSON";
	if(InfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(data,'text/xml');
		var DEV = xmlDoc.getElementsByTagName('DEVICE');
	}else{
		var dat = data.replace(/'/g,'"');
		var dat2 = $.parseJSON(dat);
		var DEV = dat2.MAINCONFIG[0].DEVICE;
	}
	for(var i = 0; i < DEV.length; i++){
		if(InfoType == "XML"){
			devicesFilter.push({
				Hostname: DEV[i].getAttribute('HostName'),
				OSType: DEV[i].getAttribute('OSType'),		
				OSVersion: DEV[i].getAttribute('OSVersion'),
				SWPackage: DEV[i].getAttribute('SoftwarePackage'),
				SystemName: DEV[i].getAttribute('Model'),
				ProductId: DEV[i].getAttribute('ProductIdentifier'),
				VersionId: DEV[i].getAttribute('VersionId'),
				LineCard:[],		
				Module:[],
				Route:[],
				Embedded:[],
				Port:[]
			});
			setChildDevice(DEV[i],DEV[i].getAttribute('HostName'),parseInt(i)); // Port and LineCard
	        setChildDevice2(DEV[i],DEV[i].getAttribute('HostName'),parseInt(i)); // Embedded, Route and Module
		}else{
			devicesFilter.push({
				Hostname: DEV[i].HostName,
                OSType: DEV[i].OSType,
                OSVersion: DEV[i].OSVersion,
                SWPackage: DEV[i].SoftwarePackage,
                SystemName: DEV[i].Model,
                ProductId: DEV[i].ProductIdentifier,
                VersionId: DEV[i].VersionId,
                LineCard:[],
                Module:[],
                Route:[],
                Embedded:[],
                Port:[]
			});
			setChildDevice(DEV[i],DEV[i].HostName,parseInt(i)); // Port and LineCard
    	    setChildDevice2(DEV[i],DEV[i].HostName,parseInt(i)); // Embedded, Route and Module
		}
	}

}
/*
 *
 *  FUNCTION NAME : setChildDevice()
 *  AUTHOR        : James Turingan
 *  DATE          : December 18, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : stores the data from cgi to json => devicesFilter
 *  PARAMETERS    : DEV,hostname,ctr
 *
 */

function setChildDevice(DEV,hostname,ctr){
	var hname = hostname;
	var InfoType = "JSON";
	if(InfoType == "XML"){
		var device = DEV.childNodes;
		for(var i = 0; i < device.length; i++){
			if(device[i].nodeName == "LINECARD" ){
				var newLC = device[i];
				var LineCardVid = newLC.getAttribute('LineCardVid');
				var ProductId = newLC.getAttribute('ProductIdentifier');
				var name = newLC.getAttribute('Name');
				var num = newLC.getAttribute('Number');
				if(hname = devicesFilter[ctr].Hostname ){
					devicesFilter[ctr].LineCard.push({
						LineCardVid:LineCardVid,
						ProductId: ProductId,
						Name: name,
						Number: num 
					});				
				}
			}
			if(device[i].nodeName == "PORT"){
				var newPort = device[i];
				var band = newPort.getAttribute('Bandwidth');
				var speed = newPort.getAttribute('Speed');
				var name = newPort.getAttribute('PortName');
				var media = newPort.getAttribute('MediaType');
				if(hname = devicesFilter[ctr].Hostname ){
					devicesFilter[ctr].Port.push({
						BandWidth: band,
						Speed: speed,
						PortName: name,
						MediaType: media 
					});
				}
			}
		}
	}else{
		var device = DEV;
		for(var i = 0; i < device.length; i++){
//            if(device[i].nodeName == "LINECARD" ){
                var newLC = device[i];
                var LineCardVid = newLC.LINECARD.LineCardVid;
                var ProductId = newLC.LINECARD.ProductIdentifier;
                var name = newLC.LINECARD.Name;
                var num = newLC.LINECARD.Number;
                if(hname = devicesFilter[ctr].Hostname ){
                    devicesFilter[ctr].LineCard.push({
                        LineCardVid:LineCardVid,
                        ProductId: ProductId,
                        Name: name,
                        Number: num
                    });
                }
//            }
//            if(device[i].nodeName == "PORT"){
                var newPort = device[i];
                var band = newPort.PORT.Bandwidth;
                var speed = newPort.PORT.Speed;
                var name = newPort.PORT.PortName;
                var media = newPort.PORT.MediaType;
                if(hname = devicesFilter[ctr].Hostname ){
                    devicesFilter[ctr].Port.push({
                        BandWidth: band,
                        Speed: speed,
                        PortName: name,
                        MediaType: media
                    });
                }
//            }
        }
	}
}
/*
 *
 *  FUNCTION NAME : setChildDevice2()
 *  AUTHOR        : James Turingan
 *  DATE          : December 18, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : stores the data from cgi to json => devicesFilter
 *  PARAMETERS    : DEV,hostname,ctr
 *
 */

function setChildDevice2(DEV,hostname,ctr){
	var hname = hostname;
	var InfoType = "JSON";
	if(InfoType == "XML"){
		var device = DEV.childNodes;
		for(var i = 0; i < device.length; i++){
			if(device[i].nodeName == "MODULE"){
				var newModule = device[i];
				var vId = newModule.getAttribute('ModuleVid');
				var name = newModule.getAttribute('Module');
				var pId = newModule.getAttribute('ModulePid');
				if(hname = devicesFilter[ctr].Hostname ){
					devicesFilter[ctr].Module.push({
						VersionId: vId,
						ProductId: pId,
						ModuleName: name
					});
				}
			}
			if(device[i].nodeName == "ROUTEPROCESSOR"){
				var newRoute = device[i];
				var versionId = newRoute.getAttribute('RouteProcessorVid');
				var memory = newRoute.getAttribute('TotalMemory');
				var name = newRoute.getAttribute('RouteProcessorName');
				var productId = newRoute.getAttribute('RouteProcessorPid');
				if(hname = devicesFilter[ctr].Hostname){
					devicesFilter[ctr].Route.push({
						VersionId: versionId,
						Memory: memory,
						RouteName: name,
						ProductId: productId 
					});
				}
			}
			if(device[i].nodeName == "EMBEDDEDPROCESSOR"){
				var newProcessor = device[i];
				var versionId = newProcessor.getAttribute('EmbeddedProcessorVid');
				var name = newProcessor.getAttribute('EmbeddedProcessorName');
				var productId = newProcessor.getAttribute('EmbeddedProcessorVid');
				var nitrox = newProcessor.getAttribute('Nitrox');
				var octeon = newProcessor.getAttribute('Octeon');
				if(hname = devicesFilter[ctr].Hostname ){
					devicesFilter[ctr].Route.push({
						VersionId: versionId,
						Nitrox: nitrox,
						Octeon: octeon,
						EmbeddedName: name,
						ProductId: productId 
					});
				}
			}
		}
	}else{
		var device = DEV;
        for(var i = 0; i < device.length; i++){
//            if(device[i].nodeName == "MODULE"){
                var newModule = device[i];
                var vId = newModule.MODULE.ModuleVid;
                var name = newModule.MODULE.Module;
                var pId = newModule.MODULE.ModulePid;
                if(hname = devicesFilter[ctr].Hostname ){
                    devicesFilter[ctr].Module.push({
                        VersionId: vId,
                        ProductId: pId,
                        ModuleName: name
                    });
                }
//            }
//            if(device[i].nodeName == "ROUTEPROCESSOR"){
                var newRoute = device[i];
                var versionId = newRoute.ROUTEPROCESSOR.RouteProcessorVid;
                var memory = newRoute.ROUTEPROCESSOR.TotalMemory;
                var name = newRoute.ROUTEPROCESSOR.RouteProcessorName;
                var productId = newRoute.ROUTEPROCESSOR.RouteProcessorPid;
                if(hname = devicesFilter[ctr].Hostname){
                    devicesFilter[ctr].Route.push({
                        VersionId: versionId,
                        Memory: memory,
                        RouteName: name,
                        ProductId: productId
                    });
                }
//            }
//            if(device[i].nodeName == "EMBEDDEDPROCESSOR"){
                var newProcessor = device[i];
                var versionId = newProcessor.EMBEDDEDPROCESSOR.EmbeddedProcessorVid;
                var name = newProcessor.EMBEDDEDPROCESSOR.EmbeddedProcessorName;
                var productId = newProcessor.EMBEDDEDPROCESSOR.EmbeddedProcessorVid;
                var nitrox = newProcessor.EMBEDDEDPROCESSOR.Nitrox;
                var octeon = newProcessor.EMBEDDEDPROCESSOR.Octeon;
                if(hname = devicesFilter[ctr].Hostname ){
                    devicesFilter[ctr].Route.push({
                        VersionId: versionId,
                        Nitrox: nitrox,
                        Octeon: octeon,
                        EmbeddedName: name,
                        ProductId: productId
                    });
                }
//            }
        }
	}
}

/*
 *
 *  FUNCTION NAME : connTypeFilter()
 *  AUTHOR        : James Turingan
 *  DATE          : December 27, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function connTypeFilter(){
	var val = $('#portTypeTT').val();
	$('tr').show();

	$('tr td.conntype').each(function() {
		if ($(this).text() != val)
		{
			$(this).parent().hide();
		}
	});
}
/*
 *
 *  FUNCTION NAME : validationTTList()
 *  AUTHOR        : James Turingan
 *  DATE          : January 2, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : validates for the test tool that has no selected ports 
 *  PARAMETERS    : 
 *  First function for this YEAR!! :)
 *
 */

function validationTTList(){
	var msgStr = '';
	var ctr = 0;
	for(var x = 0; x < testToolObj.length; x++){
		if(testToolObj[x].Ports.length == 0){
			ctr++;
			if(ctr == 1){
				msgStr = testToolObj[x].DeviceName;
			}else if(ctr == 2 && x == testToolObj.length){
				msgStr += 'and' + testToolObj[x].DeviceName;
			}else if(ctr > 2){
				if(x == testToolObj.length){
					msgStr += 'and' + testToolObj[x].DeviceName;
				}else{
					msgStr += ',' + testToolObj[x].DeviceName;
				}
			}
		}	
	}
	if(msgStr != ''){
		var msg = msgStr + " has no selected port(s). Do you want to select port(s)?";
		$('#msgAlert').empty().append(msg);
		if(globalDeviceType == "Mobile"){
			$.mobile.changePage("#warning", {
				transition: "flow",
				reverse: false,
				changeHash: true
			});
		}
	}else{	
		$("#testToolPaletteSubTrList").hide();
		createTestToolObj();
		if(globalDeviceType == "Mobile"){
			$.mobile.changePage("#configEditorPage", {
				transition: "flow",
				reverse: false,
				changeHash: true
			});
		}
	}

}

/*
 *  
 * FUNCTION NAME : showSelectPartnerDevice
 * AUTHOR        : Marlo Agapay
 * DATE          : January 2, 2014
 * MODIFIED BY   :
 * REVISION DATE :
 * REVISION #    :
 * DESCRIPTION   : 
 * PARAMETERS    :
 * 
 */
function showSelectPartnerDevice(condition){
	var action="";
	var query ="";
	
	var conType = $("#connectType").val();
	if ((conType == null || conType=="" || conType == undefined)&& condition == "connecttype"){
		conType = "Open";
			
	}
	if (condition == "connecttype"){
		query = "type="+conType;
		action = "getpartnerdevices";
	}else if (condition == "showtype"){
		query = "resourceid="+window['variable' + dynamicResourceId[pageCanvas] ];
		action = "getaddpartnerport";
	}else if (condition=="manageconnectivity"){
		var host = $('#partnerHostname').val();
		var slot = $('#slotDropDown').val();
		var conType = $('#connectType').val(); 
		query = "getswitchports";
		action = "hostname="+host+"^"+slot+"^"+conType;
	}
	if(globalDeviceType == "Mobile"){
        loading('show');
    }
	$.ajax({
		url: getURL("ConfigEditor2"),
//		url: "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompletePythonCGI/querYCgi.fcgi",
		data : {
			"action": action,
			"query": query
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			if(globalDeviceType == "Mobile"){
        		loading('hide');
		    }
			var aler =	data.match(/Alert:/g);           
			if (aler!= null || aler != undefined){
				alert(data);
			}else{
				if(condition=="connecttype"){
					pushToArrayPartnerDevice(data);
//					changePopUpPartnerDevice(data);				
				}else if (condition == "showtype"){
					addPartnerPort(data);
				}else if (condition == "manageconnectivity"){
					manageConnectivityTable(data);
				}
			}
		}
	});	

}
/*
 *  
 * FUNCTION NAME : pushToArrayPartnerDevice
 * AUTHOR        : Marlo Agapay
 * DATE          : January 2, 2014
 * MODIFIED BY   :
 * REVISION DATE :
 * REVISION #    :
 * DESCRIPTION   : 
 * PARAMETERS    :
 * 
 */
var globalPartnerArr =[];
function pushToArrayPartnerDevice(data){
	var partnerArr = [];
	var globalPartnerArr = [];
	if(globalInfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(data , "text/xml" );
		var mConfig = xmlDoc.getElementsByTagName('DEVICES');
	}else{
		error("No functionalities to handle json for this yet.","Notification","toConfig();");
        return;
	}
	for (var a=0; a<mConfig.length; a++){
		var hostname = mConfig[a].getAttribute("HostName");
		var ipaddress = mConfig[a].getAttribute("IpAddress");
		var slots = mConfig[a].getAttribute("Slots");
		partnerArr.push({HostName: hostname, IpAddress: ipaddress, Slots: slots});
	}
	globalPartnerArr = partnerArr;
	changePopUpPartnerDevice(partnerArr);
}
/*
 *  
 * FUNCTION NAME : changePopUpPartnerDevice
 * AUTHOR        : Marlo Agapay
 * DATE          : January 2, 2014
 * MODIFIED BY   :
 * REVISION DATE :
 * REVISION #    :
 * DESCRIPTION   : 
 * PARAMETERS    :
 * 
 */

function changePopUpPartnerDevice(partnerArr){
	setTimeout(function(){
		$.mobile.changePage($("#selectPartnerDevDiv"), {
			transition: "flow",
			reverse: false,
			changeHash: false
		});
		var strIp = "<select id='selectIp' onchange='changeSlot()'>";
		var ahost = "";
		var strSlot = "";
		for (var a=0; a<partnerArr.length; a++){
			if (ahost==""){
				ahost = partnerArr[a].HostName;
				strSlot += getListSlot(partnerArr[a].Slots);
			}
			strIp+="";
			strIp+="<option value='"+partnerArr[a].IpAddress+"'>"+partnerArr[a].IpAddress+"</option>";
		}
		strIp+="</select>";
		$('#partnerIpAddress').empty().append(strIp);
		$('#partnerHostname').empty().append(ahost);
		$('#slotDropDown').empty().append(strSlot);
		$("#selectPartnerDevDiv").trigger("create");
	},1500);
}
/*
 *  
 * FUNCTION NAME : getListSlot
 * AUTHOR        : Marlo Agapay
 * DATE          : January 2, 2014
 * MODIFIED BY   :
 * REVISION DATE :
 * REVISION #    :
 * DESCRIPTION   : 
 * PARAMETERS    :
 * 
 */

function getListSlot(slt){
	var slot = slt.split(",");
	var str = "<select id='selectSlot' >";
	for(var a=0; a<slot.length; a++){
		str += "<option value='"+slot[a]+"'>"+slot[a]+"</option";
	}		
	str +="</select>";
	return str;
}
/*
 *  
 * FUNCTION NAME : addPartnerPort
 * AUTHOR        : Marlo Agapay
 * DATE          : January 2, 2014
 * MODIFIED BY   :
 * REVISION DATE :
 * REVISION #    :
 * DESCRIPTION   : 
 * PARAMETERS    :
 * 
 */

function addPartnerPort(data){
	setTimeout(function(){
		$.mobile.changePage($("#connectTypeDiv"), {
			transition: "flow",
			reverse: false,
			changeHash: false
		});
		if(globalInfoType == "XML"){
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(data , "text/xml" );
			var mConfig = xmlDoc.getElementsByTagName('DEVICE');
		}else{
			error("No functionalities to handle json for this yet.","Notification","toConfig();");
            return;
		}
		var str = "<SELECT id='connectType' >";
		for(var a=0; a<mConfig.length; a++){
			var type = mConfig[a].getAttribute("Type");			
			str +="<option value='"+type+"'>"+type+"</option>";
		}
		str+="</SELECT>";
		$("#appendConnectype").empty().append(str);
		$("#connectTypeDiv").trigger("create");
	},1500);
}

/*
 *  
 * FUNCTION NAME : changeSlot
 * AUTHOR        : Marlo Agapay
 * DATE          : January 3, 2014
 * MODIFIED BY   :
 * REVISION DATE :
 * REVISION #    :
 * DESCRIPTION   : 
 * PARAMETERS    :
 * 
 */
function changeSlot(){
	var ip=$('#selectIp').val();	
//	var strIp = "<select id='selectIp' onchange='changeSlot()'>";
	var ahost = "";
	var strSlot = "";
	for (var a=0; a<globalPartnerArr.length; a++){
		if (globalPartnerArr[a].IpAddress == ip){
			ahost = globalPartnerArr[a].HostName;
			strSlot += getListSlot(globalPartnerArr[a].Slots);
		}
	}
	$('#partnerHostname').empty().append(ahost);
	$('#slotDropDown').empty().append(strSlot);
	$("#selectPartnerDevDiv").trigger("create");
}

/*
 *  
 * FUNCTION NAME : pushToArrayPartnerDevice
 * AUTHOR        : Marlo Agapay
 * DATE          : January 2, 2014
 * MODIFIED BY   :
 * REVISION DATE :
 * REVISION #    :
 * DESCRIPTION   : 
 * PARAMETERS    :
 * 
 */
function manageConnectivityTable(data){
	if(globalInfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(data , "text/xml" );
		var mConfig = xmlDoc.getElementsByTagName('PORT');
	}else{
		error("No functionalities to handle json for this yet.","Notification","toConfig();");
        return;
	}
	var managePortArr = [];
	for (var a=0; a<mConfig.length; a++){
		var portid  = mConfig[a].getAttribute("PortId");
		var number = mConfig[a].getAttribute("Number");
		var portname = mConfig[a].getAttribute("PortName");
		var porttype = mConfig[a].getAttribute("PortType");
		var partnerport = mConfig[a].getAttribute("PartnerPort");
		var tunnel = mConfig[a].getAttribute("TunnelServicePIC");
	}
}
/*
 *
 *  FUNCTION NAME : ipv4PopUp
 *  AUTHOR        : James Turingan
 *  DATE          : January 2, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function ipv4PopUp(){
	if((globalIPV4Flag == false && globalApplyAll == "deactive") || globalApplyAll == "deactive" ){
		return false
	}
	$.mobile.changePage($("#applyAllPop"),{
		transition: "pop",
		changeHash : false
	});

}
/*
 *
 *  FUNCTION NAME : sanityQuery
 *  AUTHOR        : James Turingan
 *  DATE          : January 3, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function sanityQuery(type){
	if(globalDeviceType == "Mobile"){
		loading("show");
	}
	if(globalInfoType == "XML"){	
		var url = getURL("ConfigEditor")+"action=checkdevicestatus&query=resourceid="+window['variable' + dynamicResourceId[pageCanvas] ]+"^user="+globalUserName+"^feature="+type+"^result=true";
	}else{
		var url = getURL("ConfigEditor","JSON")+'action=checkdevicestatus&query={"TOPOLOGY":[{"resourceid": "'+window['variable' + dynamicResourceId[pageCanvas]]+'", "user": "'+globalUserName+'", "feature": "'+type+'", "result":"true"}]}';
	}
	$.ajax({
		url: url,
		dataType: 'html',
		proccessData: false,
		success: function(data) {
			if(globalDeviceType == "Mobile"){
				 loading("hide");
			}
			data = $.trim(data);
			var returnflag = false;
			if(data == ""){
					returnflag = false;	
			}else if(globalInfoType == "JSON"){	
				var data2 = data.replace(/'/g,'"');
				var b = $.parseJSON(data2);
				if(b.RESULT){
					var alertret = b.RESULT[0].Result;
					if(alertret.match(/Alert/gi) != null){
						returnflag = true;
						alertUser(b.RESULT[0].Result);
						return;
                	}else if(alertret == 1 || alertret == '1' || alertret == NULL){
						returnflag = false;
					}else{
						returnflag = true;
						alertUser("Process Completed");
						return;
					}
				}
			}	
			if(returnflag == false){
				if(type == 'connectivity' && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString() == "true"){
					connSanFlag = "true";
					connSanityData(data);
					return;
				}else if(type == 'accessSanity' && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity.toString() == "true"){
					accSanFlag = "true";
					accSanityData(data);
					return;
				}else if(type == 'linksanity' && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "true"){
					linkSanFlag = "true";
					linkSanityData(data);
					return;
				}else if(type == 'enableint' && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "true"){
					enableFlagSan = "true";
					enableSanityData(data);
					return;
				}else if(type == 'deviceSanity' && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DeviceSanity.toString() == "true"){
					devSanFlag = "true";
					devSanityData(data);
					return;
				}else if(type == 'loadImage' && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "true"){	
					LoadImageFlag = "true";
					loadImgData(data);
					return;
				}else if(type == 'loadConfig' && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "true"){	
					LoadConfigFlag = "true";
					loadConfigData(data);
					return;
				}else if(type == 'saveImage'){
					saveImgData(data);
				}else if(type == 'saveConfig'){
					saveConfigData(data);
				}
			}
		}
	});
	$(".ui-dialog").position({
	    my: "center",
	  	at: "center",
	    of: window
	});
	return;
}
/*
 *
 *  FUNCTION NAME : devSanityData
 *  AUTHOR        : James Turingan
 *  DATE          : January 3, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function devSanityData(data){
	var mydata = data;
	if(globalInfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString( mydata , "text/xml" );
		var row = xmlDoc.getElementsByTagName('MAINCONFIG');
		var uptable = xmlDoc.getElementsByTagName('DEVICE');
		var lowtable = xmlDoc.getElementsByTagName('STATUS');
	}else{
		data = data.replace(/'/g,'"');
		var json = jQuery.parseJSON(data);	
		if(!json.RESULT){
			var uptable = json.MAINCONFIG[0].DEVICE;
			var lowtable = json.MAINCONFIG[0].STATUS;
		}
	}
	var devStat='';
	var devSanityStat='';
	if(!json.RESULT){
		clearTimeout(TimeOut);
		TimeOut = setTimeout(function(){
			devSanXML(uptable,lowtable);
		},5000);
		return;
	}
	devSanInit();
	TimeOut = setTimeout(function(){
		sanityQuery('deviceSanity');
	},5000);
}
/*
 *
 *  FUNCTION NAME : devSanXML
 *  AUTHOR        : James Turingan
 *  DATE          : January 4, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function devSanXML(uptable,lowtable){
	var devStat='';
	var devSanityStat='';
	var devFlag = false;
	if(globalInfoType == "XML"){
		for(var i = 0; i < uptable.length; i++){
			devStat+="<tr>";
			devStat+="<td>"+uptable[i].getAttribute('HostName')+"</td>";
			devStat+="<td>"+uptable[i].getAttribute('ManagementIP')+"</td>";
			devStat+="<td>"+uptable[i].getAttribute('ConsoleIP')+"</td>";
			devStat+="<td>"+uptable[i].getAttribute('Manufacturer')+"</td>";
			devStat+="<td>"+uptable[i].getAttribute('Model')+"</td>";
			devStat+="<td>"+uptable[i].getAttribute('Login')+"</td>";
			devStat+="<td>"+uptable[i].getAttribute('HostNameVerification')+"</td>";
			devStat+="<td>"+uptable[i].getAttribute('ManagementIPVerification')+"</td>";
			devStat+="<td>"+uptable[i].getAttribute('ShowCommands')+"</td>";
			devStat+="</tr>";
			if(window['variable' + DeviceSanity[pageCanvas] ].toString() == "true" && uptable[i].getAttribute('ShowCommands').toLowerCase() != 'fail' && uptable[i].getAttribute('ShowCommands').toLowerCase() != 'completed' && uptable[i].getAttribute('ShowCommands').toLowerCase() != 'cancelled' && uptable[i].getAttribute('ShowCommands').toLowerCase() != 'device not accessible'){
				devFlag = true;

			}
		}
		//2nd Table of Device Sanity
		for(var i = 0; i < lowtable.length; i++){
			devSanityStat+="<tr>";
			devSanityStat+="<td>"+lowtable[i].getAttribute('TimeStamp')+"</td>";
			devSanityStat+="<td>"+lowtable[i].getAttribute('HostName')+"</td>";
			devSanityStat+="<td>"+lowtable[i].getAttribute('ManagementIP')+"</td>";
			devSanityStat+="<td>"+lowtable[i].getAttribute('ManagementInterface')+"</td>";
			devSanityStat+="<td>"+lowtable[i].getAttribute('OSVersion')+"</td>";
			devSanityStat+="<td>"+lowtable[i].getAttribute('State')+"</td>";
			devSanityStat+="<td>"+lowtable[i].getAttribute('Status')+"</td>";
			devSanityStat+="</tr>";
		}
	}else{
//		for(var i = 0;i<uptable.length;i++){
//			devStat+="<tr>";
//			for(key in upArr){
//				devStat+="<td>"+uptable[i][key]+"<td>";
//			}
//			devStat+="<tr>";
		for(var i = 0; i < uptable.length; i++){
            devStat+="<tr>";
            devStat+="<td>"+uptable[i].HostName+"</td>";
            devStat+="<td>"+uptable[i].ManagementIP+"</td>";
            devStat+="<td>"+uptable[i].ConsoleIP+"</td>";
            devStat+="<td>"+uptable[i].Manufacturer+"</td>";
            devStat+="<td>"+uptable[i].Model+"</td>";
            devStat+="<td>"+uptable[i].Login+"</td>";
            devStat+="<td>"+uptable[i].HostNameVerification+"</td>";
            devStat+="<td>"+uptable[i].ManagementIPVerification+"</td>";
            devStat+="<td>"+uptable[i].ShowCommands+"</td>";
            devStat+="</tr>";
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DeviceSanity.toString() == "true" && uptable[i].ShowCommands.toLowerCase() != 'fail' && uptable[i].ShowCommands.toLowerCase() != 'completed' && uptable[i].ShowCommands.toLowerCase() != 'cancelled' && uptable[i].ShowCommands.toLowerCase() != 'device not accessible'){
				devFlag = true;
			}
		}
//		for(var i = 0;i<lowtable.length;i++){
//			devStat+="<tr>";
//			for(key in lowArr){
//				devStat+="<td>"+lowtable[i][key]+"<td>";
//			}
//			devStat+="<tr>";
//		}

		for(var i = 0; i < lowtable.length; i++){
            devSanityStat+="<tr>";
            devSanityStat+="<td>"+lowtable[i].TimeStamp+"</td>";
            devSanityStat+="<td>"+lowtable[i].HostName+"</td>";
            devSanityStat+="<td>"+lowtable[i].ManagementIP+"</td>";
            devSanityStat+="<td>"+lowtable[i].ManagementInterface+"</td>";
            devSanityStat+="<td>"+lowtable[i].OSVersion+"</td>";
            devSanityStat+="<td>"+lowtable[i].State+"</td>";
            devSanityStat+="<td>"+lowtable[i].Status+"</td>";
            devSanityStat+="</tr>";
        }
	}	
	if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "no" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "false"){
		devSanFlag = "false";
	}
	$("#devSanTableStat > tbody").empty().append(devSanityStat);
	$("#devSanTable > tbody").empty().append(devStat);
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#devTotalNo').empty().append(devices.length);
	if(globalDeviceType == "Mobile"){
		$("#devSanTableStat").table("refresh");
		$("#devSanTable").table("refresh");
	}
	if(devFlag == true){
		devSanFlag = true;
		devSanXML2(devFlag);
	}else{
		clearTimeout(TimeOut);
		devSanFlag = "false";
		for(var i = 0; i < uptable.length; i++){
			if(uptable[i].ShowCommands.toLowerCase() != 'completed' && uptable[i].ShowCommands.toLowerCase() != 'cancelled'){
				var msg = "One/All of the devices have\n failed in device sanity.\nDo you want to continue the test? <br/><input type='checkbox' id='devsancb'/>  Release Reservation\n(Reservation will be released when you select No.)";
				if(globalDeviceType != "Mobile"){
					alerts(msg,'','YN');
				}else{
					confirmation(msg,'','devSanityFail("yes")','devSanityFail("no")');
				}
			}else{
				devSanXML2(devFlag);
			}
		}
	}	
}

/*
 *
 *  FUNCTION NAME : accSanityData
 *  AUTHOR        : James Turingan
 *  DATE          : January 3, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function accSanityData(data){
	var accStat='';
	var accSanityStat='';
	var mydata = data;
	if(globalInfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString( mydata , "text/xml" );
		var row = xmlDoc.getElementsByTagName('MAINCONFIG');
		var uptable = xmlDoc.getElementsByTagName('DEVICE');
		var lowtable = xmlDoc.getElementsByTagName('STATUS');
	}else{
		data = data.replace(/'/g,'"');
		var json = jQuery.parseJSON(data);
        if(json.MAINCONFIG){
            var uptable = json.MAINCONFIG[0].DEVICE;
            var lowtable = json.MAINCONFIG[0].STATUS;
        }
	}
	if(json.MAINCONFIG){
		clearTimeout(TimeOut);
		TimeOut = setTimeout(function(){
			accSanXML(uptable,lowtable);
		 },5000);
		return;
	}
	accSanInit();
	TimeOut = setTimeout(function(){
		sanityQuery('accessSanity');
	},5000);
}
/*
 *
 *  FUNCTION NAME : accSanXML
 *  AUTHOR        : James Turingan
 *  DATE          : January 3, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function accSanXML(uptable,lowtable){
	var accStat='';
	var accSanityStat='';
	var devFlag = false;
	var upArr = ['HostName' , 'ConsoleIp1','ConsoleIp2','ManagementIp','Login']
	if(globalInfoType == "XML"){
		for(var i = 0; i < uptable.length; i++){
			accStat+="<tr>";
			accStat+="<td>"+uptable[i].getAttribute('HostName')+"</td>";
			accStat+="<td>"+uptable[i].getAttribute('ConsoleIp1')+"</td>";
			accStat+="<td>"+uptable[i].getAttribute('ConsoleIp2')+"</td>";
			accStat+="<td>"+uptable[i].getAttribute('ManagementIp')+"</td>";
			accStat+="<td>"+uptable[i].getAttribute('Login')+"</td>";
			accStat+="</tr>";
			if(window['variable' + AccessSanity[pageCanvas] ].toString() == "true" && uptable[i].getAttribute('Login').toLowerCase() != 'fail' && uptable[i].getAttribute('Login').toLowerCase() != 'completed' && uptable[i].getAttribute('Login').toLowerCase() != 'cancelled' && uptable[i].getAttribute('Login').toLowerCase() != 'device not accessible'){
				devFlag = true;
			}
		}
		for(var i = 0; i < lowtable.length; i++){
		//2nd Table of Device Sanity
			accSanityStat+="<tr>";	
			accSanityStat+="<td>"+lowtable[i].getAttribute('TimeStamp')+"</td>";
			accSanityStat+="<td>"+lowtable[i].getAttribute('HostName')+"</td>";
			accSanityStat+="<td>"+lowtable[i].getAttribute('AccessType')+"</td>";
			accSanityStat+="<td>"+lowtable[i].getAttribute('IpAddress')+"</td>";
			accSanityStat+="<td>"+lowtable[i].getAttribute('Status1')+"</td>";
			accSanityStat+="<td>"+lowtable[i].getAttribute('Status2')+"</td>";
			accSanityStat+="<td>"+lowtable[i].getAttribute('Status3')+"</td>";
			accSanityStat+="<td>"+lowtable[i].getAttribute('State')+"</td>";
			accSanityStat+="<td>"+lowtable[i].getAttribute('Status')+"</td>";
			accSanityStat+="</tr>";
		}
	}else{
		for(var i = 0; i < uptable.length; i++){
			accStat+="<tr>";
			accStat+="<td>"+uptable[i].HostName+"</td>";
			accStat+="<td>"+uptable[i].ConsoleIp1+"</td>";
			accStat+="<td>"+uptable[i].ConsoleIp2+"</td>";
			accStat+="<td>"+uptable[i].ManagementIp+"</td>";
			accStat+="<td>"+uptable[i].Login+"</td>";
			accStat+="</tr>";
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity.toString() == "true" && uptable[i].Login.toLowerCase() != 'fail' && uptable[i].Login.toLowerCase() != 'completed' && uptable[i].Login.toLowerCase() != 'cancelled' && uptable[i].Login.toLowerCase() != 'device not accessible'){
				devFlag = true;
			}
		}
		for(var i = 0; i < lowtable.length; i++){
		//2nd Table of Device Sanity
			accSanityStat+="<tr>";	
			accSanityStat+="<td>"+lowtable[i].TimeStamp+"</td>";
			accSanityStat+="<td>"+lowtable[i].HostName+"</td>";
			accSanityStat+="<td>"+lowtable[i].AccessType+"</td>";
			accSanityStat+="<td>"+lowtable[i].IpAddress+"</td>";
			accSanityStat+="<td>"+lowtable[i].Status1+"</td>";
			accSanityStat+="<td>"+lowtable[i].Status2+"</td>";
			accSanityStat+="<td>"+lowtable[i].Status3+"</td>";
			accSanityStat+="<td>"+lowtable[i].State+"</td>";
			accSanityStat+="<td>"+lowtable[i].Status+"</td>";
			accSanityStat+="</tr>";
		}
	}
	$("#accSanTableStat > tbody").empty().append(accSanityStat);
	$("#accSanTable > tbody").empty().append(accStat);
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#accTotalNo').empty().append(devices.length);
	if(globalDeviceType == "Mobile"){
		$("#accSanTableStat").table("refresh");
		$("#accSanTable").table("refresh");
	}
	TimeOut = setTimeout(function(){
		accSanXML2(devFlag);
	},2000);
	return;
}
function accSanXML2(devFlag){
	if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "false" && EnableInterface.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "false"){
		accSanFlag = "false";
	}
	if(devFlag == true){
		accSanFlag = "true";
	}else{
		clearTimeout(TimeOut);
	}
	if(autoTriggerTab.toString() == "true"){
		if(devFlag == true){
			checkFromSanity = "true";
			$('#liAccSan a').trigger('click');
		}else if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString() == "true" && connSanFlag.toString() == "false"){
			checkFromSanity = "true";
			connSanFlag = "true";
			$('#liConn a').trigger('click');
		}else if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "true" && linkSanFlag.toString() == "false"){
			checkFromSanity = "true";
			linkSanFlag = "true";
			$('#liLinkSan a').trigger('click');	
		}else if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "true" && enableFlagSan.toString() == "false"){
			checkFromSanity = "true";
			enableFlagSan = "true";
			$('#liEnaInt a').trigger('click');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString()== "true" && devFlag == false && LoadImageFlag.toString() == "false"){
			checkFromSanity = "true";
			LoadImageFlag = "true";
			$('#liLoadImg a').trigger('click');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "true" && devFlag == false && LoadConfigFlag.toString() == "false"){
			checkFromSanity = "true";
			LoadConfigFlag = "true";
			$('#liLoadConf a').trigger('click');
		}
	}else{
		if(devFlag == true){
			autoTrigger('accessSanity');
		}
	}
	
	return;
}
/*
 *
 *  FUNCTION NAME : connSanityData
 *  AUTHOR        : James Turingan
 *  DATE          : January 3, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function connSanityData(data){
	var connStat='';
	var connSanityStat='';	
	var mydata = data;
	if(globalInfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString( mydata , "text/xml" );
		var row = xmlDoc.getElementsByTagName('MAINCONFIG');
		var uptable = xmlDoc.getElementsByTagName('DEVICE');
		var lowtable = xmlDoc.getElementsByTagName('STATUS');	 
	}else{
		if(data != ""){
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
	        if(json.MAINCONFIG){
    	        var uptable = json.MAINCONFIG[0].DEVICE;
        	    var lowtable = json.MAINCONFIG[0].STATUS;
				clearTimeout(TimeOut);
				TimeOut = setTimeout(function(){
					connSanXML(uptable,lowtable);
				},5000);
				return;
	        }
		}
	}
	connSanInit();
	TimeOut = setTimeout(function(){
		sanityQuery('connectivity');
	},5000);
}
/*
 *
 *  FUNCTION NAME : connSanXML
 *  AUTHOR        : James Turingan
 *  DATE          : January 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function connSanXML(uptable,lowtable){
	var connStat='';
	var connSanityStat='';
	var devFlag = false;
	if(globalInfoType == "XML"){
		for(var i = 0; i < uptable.length; i++){
			connStat+="<tr>";
			connStat+="<td>"+uptable[i].getAttribute('HostName')+"</td>";
			connStat+="<td>"+uptable[i].getAttribute('ManagementIp')+"</td>";
			connStat+="<td>"+uptable[i].getAttribute('ConsoleIp')+"</td>";
			connStat+="<td>"+uptable[i].getAttribute('Manufacturer')+"</td>";
			connStat+="<td>"+uptable[i].getAttribute('Model')+"</td>";
			connStat+="<td>"+uptable[i].getAttribute('PortMapping')+"</td>";
			connStat+="</tr>";
			if(window['variable' + Connectivity[pageCanvas] ].toString() == "true" && uptable[i].getAttribute('PortMapping').toLowerCase() != 'fail' && uptable[i].getAttribute('PortMapping').toLowerCase() != 'completed' && uptable[i].getAttribute('PortMapping').toLowerCase() != 'cancelled' && uptable[i].getAttribute('PortMapping').toLowerCase() != 'device not accessible'){
				devFlag = true;
			}
		}
		for(var i = 0; i < lowtable.length; i++){
//2nd Table of Device Sanity
			connSanityStat+="<tr>";	
			connSanityStat+="<td>"+lowtable[i].getAttribute('TimeStamp')+"</td>";
			connSanityStat+="<td>"+lowtable[i].getAttribute('SrcDevName')+"</td>";
			connSanityStat+="<td>"+lowtable[i].getAttribute('SrcPortName')+"</td>";
			connSanityStat+="<td>"+lowtable[i].getAttribute('SrcSwitchPort')+"</td>";
			connSanityStat+="<td>"+lowtable[i].getAttribute('SrcPortStatus')+"</td>";
			connSanityStat+="<td>"+lowtable[i].getAttribute('DstDevName')+"</td>";
			connSanityStat+="<td>"+lowtable[i].getAttribute('DstPortName')+"</td>";
			connSanityStat+="<td>"+lowtable[i].getAttribute('DstSwitchPort')+"</td>";
			connSanityStat+="<td>"+lowtable[i].getAttribute('DstPortStatus')+"</td>";
			connSanityStat+="<td>"+lowtable[i].getAttribute('SwitchHostName')+"</td>";
			connSanityStat+="<td>"+lowtable[i].getAttribute('ConnectivityType')+"</td>";
			connSanityStat+="<td>"+lowtable[i].getAttribute('Status')+"</td>";
			connSanityStat+="</tr>";

		}
	}else{
		for(var i = 0; i < uptable.length; i++){
			connStat+="<tr>";
			connStat+="<td>"+uptable[i].HostName+"</td>";
			connStat+="<td>"+uptable[i].ManagementIp+"</td>";
			connStat+="<td>"+uptable[i].ConsoleIp+"</td>";
			connStat+="<td>"+uptable[i].Manufacturer+"</td>";
			connStat+="<td>"+uptable[i].Model+"</td>";
			connStat+="<td>"+uptable[i].PortMapping+"</td>";
			connStat+="</tr>";
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString() == "true" && uptable[i].PortMapping.toLowerCase() != 'fail' && uptable[i].PortMapping.toLowerCase() != 'completed' && uptable[i].PortMapping.toLowerCase() != 'cancelled' && uptable[i].PortMapping.toLowerCase() != 'device not accessible'){
				devFlag = true;
			}
		}
		for(var i = 0; i < lowtable.length; i++){
//2nd Table of Device Sanity
			connSanityStat+="<tr>";	
			connSanityStat+="<td>"+lowtable[i].TimeStamp+"</td>";
			connSanityStat+="<td>"+lowtable[i].SrcDevName+"</td>";
			connSanityStat+="<td>"+lowtable[i].SrcPortName+"</td>";
			connSanityStat+="<td>"+lowtable[i].SrcSwitchPort+"</td>";
			connSanityStat+="<td>"+lowtable[i].SrcPortStatus+"</td>";
			connSanityStat+="<td>"+lowtable[i].DstDevName+"</td>";
			connSanityStat+="<td>"+lowtable[i].DstPortName+"</td>";
			connSanityStat+="<td>"+lowtable[i].DstSwitchPort+"</td>";
			connSanityStat+="<td>"+lowtable[i].DstPortStatus+"</td>";
			connSanityStat+="<td>"+lowtable[i].SwitchHostName+"</td>";
			connSanityStat+="<td>"+lowtable[i].ConnectivityType+"</td>";
			connSanityStat+="<td>"+lowtable[i].Status+"</td>";
			connSanityStat+="</tr>";
		}
	}
	$("#connSanityTableStat > tbody").empty().append(connSanityStat);
	$("#connSanityTable > tbody").empty().append(connStat);
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#connTotalNo').empty().append(devices.length);
	if(globalDeviceType=="Mobile"){
		$("#connSanityTableStat").table("refresh");
		$("#connSanityTable").table("refresh");	
	}
	TimeOut = setTimeout(function(){
		connSanXML2(devFlag);
	},2000);
	return;	
}
function connSanXML2(devFlag){
	if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "false"){
		connSanFlag = "false";
	}
	if(devFlag == true){
		connSanFlag = "true";
	}else{
		clearTimeout(TimeOut);
	}
	if(autoTriggerTab.toString() == "true"){
		if(devFlag == true){
			checkFromSanity = "true";
			$('#liConn a').trigger('click');
		}else if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "true" && linkSanFlag.toString() == "false"){
			checkFromSanity = "true";
			linkSanFlag = "true";
			$('#liLinkSan a').trigger('click');	
		}else if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "true" && enableFlagSan.toString() == "false"){
			checkFromSanity = "true";
			enableFlagSan = "true";
			$('#liEnaInt a').trigger('click');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "true" && devFlag == false && LoadImageFlag.toString() == "false"){
			checkFromSanity = "true";
			LoadImageFlag = "true";
			$('#liLoadImg a').trigger('click');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "true" && devFlag == false && LoadConfigFlag.toString() == "false"){
			checkFromSanity = "true";
			LoadConfigFlag = "true";
			$('#liLoadConf a').trigger('click');
		}
	}else{
		if(devFlag == true){
			autoTrigger('connectivity');
		}
	}
	
	return;
}
/*
 *
 *  FUNCTION NAME : linkSanityData
 *  AUTHOR        : James Turingan
 *  DATE          : January 3, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function linkSanityData(data){
	var linkStat='';
	var linkSanityStat='';	
	var mydata = data;
	if(globalInfoType =="XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString( mydata , "text/xml" );
		var row = xmlDoc.getElementsByTagName('MAINCONFIG');
		var uptable = xmlDoc.getElementsByTagName('DEVICE');
		var lowtable = xmlDoc.getElementsByTagName('STATUS');	 
	}else{
		data = data.replace(/'/g,'"');
        var json = jQuery.parseJSON(data);
		if(json.MAINCONFIG){
            var uptable = json.MAINCONFIG[0].DEVICE;
            var lowtable = json.MAINCONFIG[0].STATUS;
        }
	}
	if(json.MAINCONFIG){
		clearTimeout(TimeOut);
		TimeOut = setTimeout(function(){
			linkSanXML(uptable,lowtable);
		},5000);
		return;
	}
	linkSanInit();
	TimeOut = setTimeout(function(){
		sanityQuery('linksanity');
	},5000);
}
/*
 *
 *  FUNCTION NAME : linkSanXML
 *  AUTHOR        : James Turingan
 *  DATE          : January 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function linkSanXML(uptable,lowtable){
	var linkStat='';
	var linkSanityStat='';
	var devFlag = false;
	if(globalInfoType == "XML"){
		for(var i = 0; i < uptable.length; i++){
			linkStat+="<tr>";
			linkStat+="<td>"+uptable[i].getAttribute('HostName')+"</td>";
			linkStat+="<td>"+uptable[i].getAttribute('ManagementIp')+"</td>";
			if(globalInfoType == "JSON"){
	    	    var devices = getDevicesNodeJSON();
		    }else{
	    	     var devices =devicesArr;
		    }
			for(var x = 0; x < devices.length; x++){
				if(uptable[i].getAttribute('HostName') == devices[x].HostName){
					linkStat+="<td>"+devices[x].ConsoleIp+"</td>";
					linkStat+="<td>"+devices[x].Manufacturer+"</td>";
					linkStat+="<td>"+devices[x].Model+"</td>";
				}
			}
			//linkStat+="<td>"+uptable[i].getAttribute('ConsoleIp')+"</td>";
			//linkStat+="<td>"+uptable[i].getAttribute('Manufacturer')+"</td>";
			//linkStat+="<td>"+uptable[i].getAttribute('Model')+"</td>";
			linkStat+="<td>"+uptable[i].getAttribute('Configuration')+"</td>";
			linkStat+="<td>"+uptable[i].getAttribute('Learning_Packets')+"</td>";
			linkStat+="<td>"+uptable[i].getAttribute('Forwarding_Test')+"</td>";
			linkStat+="</tr>";
			if(window['variable' + ConnectivityFlag[pageCanvas] ].toString() == "yes" && uptable[i].getAttribute('Forwarding_Test').toLowerCase() != 'fail' && uptable[i].getAttribute('Forwarding_Test').toLowerCase() != 'completed' && uptable[i].getAttribute('Forwarding_Test').toLowerCase() != 'cancelled' && uptable[i].getAttribute('Forwarding_Test').toLowerCase() != 'device not accessible'){
				devFlag = true;
			}
		}
		for(var i = 0; i < lowtable.length; i++){
		//2nd Table of Device Sanity
			linkSanityStat+="<tr>";	
			linkSanityStat+="<td>"+lowtable[i].getAttribute('TimeStamp')+"</td>";
			linkSanityStat+="<td>"+lowtable[i].getAttribute('SrcDevName')+"</td>";
			linkSanityStat+="<td>"+lowtable[i].getAttribute('SrcPortName')+"</td>";
			linkSanityStat+="<td>"+lowtable[i].getAttribute('SrcPortIpAdress')+"</td>";
			linkSanityStat+="<td>"+lowtable[i].getAttribute('SrcPortStatus')+"</td>";
			linkSanityStat+="<td>"+lowtable[i].getAttribute('DstDevName')+"</td>";
			linkSanityStat+="<td>"+lowtable[i].getAttribute('DstPortName')+"</td>";
			linkSanityStat+="<td>"+lowtable[i].getAttribute('DstPortIpAddress')+"</td>";
			linkSanityStat+="<td>"+lowtable[i].getAttribute('DstPortStatus')+"</td>";
			linkSanityStat+="<td>"+lowtable[i].getAttribute('State')+"</td>";
			linkSanityStat+="<td>"+lowtable[i].getAttribute('Receive')+"</td>";
			linkSanityStat+="<td>"+lowtable[i].getAttribute('Transmit')+"</td>";
			linkSanityStat+="<td>"+lowtable[i].getAttribute('MinAveMax')+"</td>";
			linkSanityStat+="<td>"+lowtable[i].getAttribute('Status')+"</td>";
			linkSanityStat+="</tr>";
		}
	}else{
		for(var i = 0; i < uptable.length; i++){
			linkStat+="<tr>";
			linkStat+="<td>"+uptable[i].HostName+"</td>";
			linkStat+="<td>"+uptable[i].ManagementIp+"</td>";
			if(globalInfoType == "JSON"){
	    	    var devices = getDevicesNodeJSON();
		    }else{
	    	     var devices =devicesArr;
		    }
			for(var x = 0; x < devices.length; x++){
				if(uptable[i].getAttribute('HostName') == devices[x].HostName){
					linkStat+="<td>"+devices[x].ConsoleIp+"</td>";
					linkStat+="<td>"+devices[x].Manufacturer+"</td>";
					linkStat+="<td>"+devices[x].Model+"</td>";
				}
			}
			//linkStat+="<td>"+uptable[i].getAttribute('ConsoleIp')+"</td>";
			//linkStat+="<td>"+uptable[i].getAttribute('Manufacturer')+"</td>";
			//linkStat+="<td>"+uptable[i].getAttribute('Model')+"</td>";
			linkStat+="<td>"+uptable[i].Configuration+"</td>";
			linkStat+="<td>"+uptable[i].Learning_Packets+"</td>";
			linkStat+="<td>"+uptable[i].Forwarding_Test+"</td>";
			linkStat+="</tr>";
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "true" && uptable[i].Forwarding_Test.toLowerCase() != 'fail' && uptable[i].Forwarding_Test.toLowerCase() != 'completed' && uptable[i].Forwarding_Test.toLowerCase() != 'cancelled' && uptable[i].Forwarding_Test.toLowerCase() != 'device not accessible'){
				devFlag = true;
			}
		}
		for(var i = 0; i < lowtable.length; i++){
		//2nd Table of Device Sanity
			linkSanityStat+="<tr>";	
			linkSanityStat+="<td>"+lowtable[i].TimeStamp+"</td>";
			linkSanityStat+="<td>"+lowtable[i].SrcDevName+"</td>";
			linkSanityStat+="<td>"+lowtable[i].SrcPortName+"</td>";
			linkSanityStat+="<td>"+lowtable[i].SrcPortIpAdress+"</td>";
			linkSanityStat+="<td>"+lowtable[i].SrcPortStatus+"</td>";
			linkSanityStat+="<td>"+lowtable[i].DstDevName+"</td>";
			linkSanityStat+="<td>"+lowtable[i].DstPortName+"</td>";
			linkSanityStat+="<td>"+lowtable[i].DstPortIpAddress+"</td>";
			linkSanityStat+="<td>"+lowtable[i].DstPortStatus+"</td>";
			linkSanityStat+="<td>"+lowtable[i].State+"</td>";
			linkSanityStat+="<td>"+lowtable[i].Receive+"</td>";
			linkSanityStat+="<td>"+lowtable[i].Transmit+"</td>";
			linkSanityStat+="<td>"+lowtable[i].MinAveMax+"</td>";
			linkSanityStat+="<td>"+lowtable[i].Status+"</td>";
			linkSanityStat+="</tr>";
		}
	}
	$("#linkSanityTableStat > tbody").empty().append(linkSanityStat);
	$("#linkSanityTable > tbody").empty().append(linkStat);
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#linkTotalNo').empty().append(devices.length);
	if(globalDeviceType=="Mobile"){
		$("#linkSanityTableStat").table("refresh");
		$("#linkSanityTable").table("refresh");			
	}
	if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "false"){
		linkSanFlag = "false";
	}
	if(devFlag == true){
		linkSanFlag = "true";
	}else{
		clearTimeout(TimeOut);
	}
	if(autoTriggerTab.toString() == "true"){
		if(devFlag == true){
			checkFromSanity = "true";
			$('#liLinkSan a').trigger('click');	
		}else if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "true" && enableFlagSan.toString() == "false"){
			checkFromSanity = "true";
			enableFlagSan = "true";
			$('#liEnaInt a').trigger('click');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "true" && devFlag == false && LoadImageFlag.toString() == "false"){
			checkFromSanity = "true";
			LoadImageFlag = "true";
			$('#liLoadImg a').trigger('click');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "true" && devFlag == false && LoadConfigFlag.toString() == "false"){
			checkFromSanity = "true";
			LoadConfigFlag = "true";
			$('#liLoadConf a').trigger('click');
		}
	}else{
		if(devFlag == true){
			autoTrigger('linksanity');
		}
	}
	
	
	return;
}
/*
 *
 *  FUNCTION NAME : enableSanityData
 *  AUTHOR        : James Turingan
 *  DATE          : January 3, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function enableSanityData(data){
	var enableStat='';
	var enableSanityStat='';	
	var mydata = data;
	if(globalInfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString( mydata , "text/xml" );
		var row = xmlDoc.getElementsByTagName('MAINCONFIG');
		var uptable = xmlDoc.getElementsByTagName('DEVICE');
		var lowtable = xmlDoc.getElementsByTagName('STATUS');	 
	}else{
		data = data.replace(/'/g,'"');
        var json = jQuery.parseJSON(data);
		if(json.MAINCONFIG){
            var uptable = json.MAINCONFIG[0].DEVICE;
            var lowtable = json.MAINCONFIG[0].STATUS;
        }
	}
	if(json.MAINCONFIG){
		clearTimeout(TimeOut);
		TimeOut = setTimeout(function(){
			enableSanXML(uptable,lowtable);
		},5000);
		return;
	}
	enableIntInit();
	TimeOut = setTimeout(function(){
		sanityQuery('enableint');
	},5000);
}
/*
 *
 *  FUNCTION NAME : enableSanXML
 *  AUTHOR        : James Turingan
 *  DATE          : January 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function enableSanXML(uptable,lowtable){
	var enableStat='';
	var enableSanityStat='';
	var devFlag = false;
	if(globalInfoType == "XML"){
		for(var i = 0; i < uptable.length; i++){
			enableStat+="<tr>";
			enableStat+="<td>"+uptable[i].getAttribute('HostName')+"</td>";
			enableStat+="<td>"+uptable[i].getAttribute('ManagementIP')+"</td>";
			enableStat+="<td>"+uptable[i].getAttribute('ConsoleIP')+"</td>";
			enableStat+="<td>"+uptable[i].getAttribute('Manufacturer')+"</td>";
			enableStat+="<td>"+uptable[i].getAttribute('Model')+"</td>";
			enableStat+="<td>"+uptable[i].getAttribute('Login')+"</td>";
			enableStat+="<td>"+uptable[i].getAttribute('EnableInterface')+"</td>";
			enableStat+="<td>"+uptable[i].getAttribute('Verification')+"</td>";
			enableStat+="</tr>";
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "true" && uptable[i].getAttribute('Verification').toLowerCase() != 'fail' && uptable[i].getAttribute('Verification').toLowerCase() != 'completed' && uptable[i].getAttribute('Verification').toLowerCase() != 'cancelled' && uptable[i].getAttribute('Verification').toLowerCase() != 'device not accessible'){
				devFlag = true;		
			}
		}
		for(var i = 0; i < lowtable.length; i++){
		//2nd Table of Device Sanity
			enableSanityStat+="<tr>";	
			enableSanityStat+="<td>"+lowtable[i].getAttribute('TimeStamp')+"</td>";
			enableSanityStat+="<td>"+lowtable[i].getAttribute('SrcDevName')+"</td>";
			enableSanityStat+="<td>"+lowtable[i].getAttribute('SrcPortName')+"</td>";
			enableSanityStat+="<td>"+lowtable[i].getAttribute('SrcAdminStatus')+"</td>";
			enableSanityStat+="<td>"+lowtable[i].getAttribute('SrcPortStatus')+"</td>";
			enableSanityStat+="<td>"+lowtable[i].getAttribute('SrcSpeed')+"</td>";
			enableSanityStat+="<td>"+lowtable[i].getAttribute('SrcMediaType')+"</td>";
			enableSanityStat+="<td>"+lowtable[i].getAttribute('DstDevName')+"</td>";
			enableSanityStat+="<td>"+lowtable[i].getAttribute('DstPortName')+"</td>";
			enableSanityStat+="<td>"+lowtable[i].getAttribute('DstAdminStatus')+"</td>";
			enableSanityStat+="<td>"+lowtable[i].getAttribute('DstPortStatus')+"</td>";
			enableSanityStat+="<td>"+lowtable[i].getAttribute('DstSpeed')+"</td>";
			enableSanityStat+="<td>"+lowtable[i].getAttribute('DstMediaType')+"</td>";
			enableSanityStat+="</tr>";
		}
	}else{
		for(var i = 0; i < uptable.length; i++){
			enableStat+="<tr>";
			enableStat+="<td>"+uptable[i].HostName+"</td>";
			enableStat+="<td>"+uptable[i].ManagementIP+"</td>";
			enableStat+="<td>"+uptable[i].ConsoleIP+"</td>";
			enableStat+="<td>"+uptable[i].Manufacturer+"</td>";
			enableStat+="<td>"+uptable[i].Model+"</td>";
			enableStat+="<td>"+uptable[i].Login+"</td>";
			enableStat+="<td>"+uptable[i].EnableInterface+"</td>";
			enableStat+="<td>"+uptable[i].Verification+"</td>";
			enableStat+="</tr>";
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "true" && uptable[i].Verification.toLowerCase() != 'fail' && uptable[i].Verification.toLowerCase() != 'completed' && uptable[i].Verification.toLowerCase() != 'cancelled' && uptable[i].Verification.toLowerCase() != 'device not accessible'){
				devFlag = true;		
			}
		}
		for(var i = 0; i < lowtable.length; i++){
		//2nd Table of Device Sanity
			enableSanityStat+="<tr>";	
			enableSanityStat+="<td>"+lowtable[i].TimeStamp+"</td>";
			enableSanityStat+="<td>"+lowtable[i].SrcDevName+"</td>";
			enableSanityStat+="<td>"+lowtable[i].SrcPortName+"</td>";
			enableSanityStat+="<td>"+lowtable[i].SrcAdminStatus+"</td>";
			enableSanityStat+="<td>"+lowtable[i].SrcPortStatus+"</td>";
			enableSanityStat+="<td>"+lowtable[i].SrcSpeed+"</td>";
			enableSanityStat+="<td>"+lowtable[i].SrcMediaType+"</td>";
			enableSanityStat+="<td>"+lowtable[i].DstDevName+"</td>";
			enableSanityStat+="<td>"+lowtable[i].DstPortName+"</td>";
			enableSanityStat+="<td>"+lowtable[i].DstAdminStatus+"</td>";
			enableSanityStat+="<td>"+lowtable[i].DstPortStatus+"</td>";
			enableSanityStat+="<td>"+lowtable[i].DstSpeed+"</td>";
			enableSanityStat+="<td>"+lowtable[i].DstMediaType+"</td>";
			enableSanityStat+="</tr>";
		}
	}
	$("#enaSanityTableStat > tbody").empty().append(enableSanityStat);
	$("#enaSanityTable > tbody").empty().append(enableStat);	
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#enableTotalNo').empty().append(devices.length);
	if(globalDeviceType=="Mobile"){
		$("#enaSanityTableStat").table("refresh");
		$("#enaSanityTable").table("refresh");
	}
	if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "false"){
		enableFlagSan = "false";
	}
	if(devFlag == true){
		enableFlagSan = "true";
	}else{
		clearTimeout(TimeOut);
	}
	if(autoTriggerTab.toString() == "true"){
		if(devFlag == true){
			checkFromSanity = "true";
			$('#liEnaInt a').trigger('click');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "true" && devFlag == false && LoadImageFlag.toString() == "false"){
			checkFromSanity = "true";
			LoadImageFlag = "true";
			$('#liLoadImg a').trigger('click');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "true" && devFlag == false && LoadConfigFlag.toString() == "false"){
			checkFromSanity = "true";
			LoadConfigFlag = "true";
			$('#liLoadConf a').trigger('click');
		}
	}else{
		if(devFlag == true){
			autoTrigger('enableint');
		}
	}
	
	return;
}


/*
 *
 *  FUNCTION NAME : fetchPortForManageConnectivity
 *  AUTHOR        : marlo agapay
 *  DATE          : January 6, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get all available ports connected and available on the on the line 
 *  PARAMETERS    : lineId
 *
 */
function fetchPortForManageConnectivity(lineId){
	window['variable' + dynamicManagePortArr[pageCanvas]] = [];
	var line = lineId.split("||");
	var des = line[0];
	var destSplit = des.split(".");
	var sor = line[1];
	var sorSplit = sor.split(".");
	var destinationDevice = destSplit[0];
	var sourceDevice = sorSplit[0];
	if(globalInfoType == "JSON"){
		var json1 = getAllPortOfDevice(destinationDevice);
		var json2 = getAllPortOfDevice(sourceDevice);
        var prtArr = json1.concat(json2);
    }else{
         var prtArr= portArr;
    }
	for (var a=0; a<prtArr.length; a++){
		var ob = prtArr[a].ObjectPath;
		var portObj = ob.split(".");
		var portDev = portObj[0];
		if (portDev == destinationDevice || portDev==sourceDevice){
			var position = "";
			if (portDev == destinationDevice)
				position = "right";
			if (portDev == sourceDevice)
				position = "left";

			window['variable' + dynamicManagePortArr[pageCanvas]].push({DevicePortObject : portDev, ObjectPath: prtArr[a].ObjectPath, PortName: prtArr[a].PortName, Description: prtArr[a].Description, PortType : prtArr[a].PortType, Position: position, Speed: prtArr[a].Speed, SwitchInfo: prtArr[a].SwitchInfo});
		}	
	}
	if (window['variable' + dynamicManagePortArr[pageCanvas]].length != 0){
		appendListToTable(window['variable' + dynamicManagePortArr[pageCanvas]],lineId,destinationDevice,sourceDevice);
	}
}

/*
 *
 *  FUNCTION NAME : showLinkInformation
 *  AUTHOR        : marlo agapay
 *  DATE          : January 6, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : append dynamic list to table
 *  PARAMETERS    : mPortArr
 *
 */
function showLinkInformation(destinationDevice,sourceDevice){	
	$( "#deleteLinkPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "40%",
		height: "auto"
	});
	$( "#deleteLinkPopUp" ).dialog("open");
	$( "#deleteLinkPopUp" ).empty().load('pages/ConfigEditor/deleteConnectivity.html',function(){
		$('span.ui-dialog-title').text('Delete Link');
		$('.ui-dialog-title').css({'margin-left':'14px','margin-top':'7px','text-align':'center'});
		$('#deletelink2 div[role="dialog"]').css({"max-width":"60%"});
		setDataToBeDeleted(destinationDevice,sourceDevice);
	});
}

/*
 *
 *  FUNCTION NAME : setDataToBeDeleted
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 22, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : show data to be deleted
 *  PARAMETERS    : destination,source
 *
 */
function setDataToBeDeleted(destination,source){
    var devices = getDevicesNodeJSON();
	var allline =[];
	var dstArr2 = destination.split(".");
	var srcArr2 = source.split(".");
	for(var i = 0; i  < devices.length; i++){
		if(dstArr2[0] == devices[i].ObjectPath || srcArr2[0] == devices[i].ObjectPath){
			allline = gettargetmap(devices[i].ObjectPath,allline);
		}
	}
	var linkData = "";
	for(var t=0; t<allline.length; t++){
		var source = allline[t].Source;	
		var destination = allline[t].Destination;	
		var srcArr = source.split(".");
		var dstArr = destination.split(".");
		var portobject;
		var portobject2;
		var srcName = "";
		var dstName = "";
		var srcPortName = "";
		var dstPortName = "";
		if((srcArr[0] == srcArr2[0] && dstArr[0] == dstArr2[0]) || (dstArr[0] == srcArr2[0] && srcArr[0] == dstArr2[0])){
			portobject = getPortObject2(source);
			portobject2 = getPortObject2(destination);
			if(portobject.PortName != ""){
				srcPortName = portobject.PortName;
			}else{
				var pathArr = source.split("_");
				var portPath = pathArr[pathArr.length-1].split("_");
				srcPortName = pathArr[pathArr.length-1];
				if(portPath[0] != "Port"){
					srcPortName = "Port_"+portPath[1];
				}
			}
			if(portobject2.PortName != ""){
				dstPortName = portobject2.PortName;
			}else{
				var pathArr = destination.split("_");
				var portPath = pathArr[pathArr.length-1].split("_");
				dstPortName = pathArr[pathArr.length-1];
				if(portPath[0] != "Port"){
					dstPortName = "Port_"+portPath[1];
				}
			}
			var srcDevice = getDeviceObject2(srcArr[0]);
			var dstDevice = getDeviceObject2(dstArr[0]);
			if(srcDevice.DeviceName != ""){
				srcName = srcDevice.DeviceName;
			}else{
				srcName = srcDevice.ObjectPath;
			}
			if(dstDevice.DeviceName != ""){
				dstName = dstDevice.DeviceName;
			}else{
				dstName = dstDevice.ObjectPath;
			}
			var path = source + "::" + destination;
			var linkName = srcName + "->" + srcPortName + "<-->" + dstName + "->" + dstPortName;
			linkData += "<tr><td><input type='checkbox' class='linkiddelete' did='"+path+"' onclick='selectAllConnectivivty(this)'/></td>";
			linkData += "<td><span>"+linkName+"</span></td></tr>";
		}
	}
	$('#deleteLinkTable > tbody').empty().append(linkData)
}
/*
 *
 *  FUNCTION NAME : selectAllConnectivivty
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 22, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : selec all connectivity
 *  PARAMETERS    : src,level
 *
 */
function selectAllConnectivivty(src,level,srcid){
	if(level == "all"){
		$('.'+srcid).each(function(){
			if($(src).is(':checked')){
				$(this).prop('checked',true);
			}else{
				$(this).prop('checked',false);
			}
		});
	}else{
		var len = 0;
		var cnt = 0;
		$('.linkiddelete').each(function(){
			if($(this).is(':checked')){
				cnt ++;
			}
			len ++;
		});
		if(cnt == len && len != 0){
			$('#deleteAllLink').prop('checked',true);
		}else{
			$('#deleteAllLink').prop('checked',false);
		}
	}
}
/*
 *
 *  FUNCTION NAME : deleteSelectedLink
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 22, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : append dynamic list to table
 *  PARAMETERS    : level 
 *
 */
function deleteSelectedLink(level,id){
	switch(level){
		case "cancel":
			switch(id){
				case "openConsoleSelect":
					validDevices = [];
					validSessionDevices = [];
				break;
				case "invitePeoplePopUp":
					userExistArray = [];
					userNotExistArray = [];
				break;
			}
			$('#'+id).empty();
			closeDialog(id);
		break;
		default:
			switch(id){
				case "deleteLinkPopUp":
					deleteSpecificLink();
				break;
				case "openConsoleSelect":
					selectDataforOpenConsole(id);
				break;
				case "invitePeoplePopUp":
					savedatainsession(id);
				break;
			}
		break;
	}
}

/*
 *
 *  FUNCTION NAME : deleteSpecificLink
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : delete specific link
 *  PARAMETERS    : 
 *
 */
function deleteSpecificLink(){
	var linkArray = new Array();
	$('.linkiddelete').each(function(){
		if($(this).is(':checked')){
			linkArray.push($(this).attr('did'));
		}
	});
	if(linkArray.length == 0){
		alerts("Please select one entry.");
		return;
	}
	for(var t=0; t<linkArray.length; t++){
		var pathArr = linkArray[t].split("::");
		var port= getPortObject2(pathArr[0]);
		var port2= getPortObject2(pathArr[1]);
		port.PORTMAP = [];
		port2.PORTMAP = [];
	}
	drawImage();
	$('#deleteLinkPopUp').empty();
	closeDialog("deleteLinkPopUp");
}
/*
 *
 *  FUNCTION NAME : appendListToTable
 *  AUTHOR        : marlo agapay
 *  DATE          : January 6, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : append dynamic list to table
 *  PARAMETERS    : mPortArr
 *
 */
function appendListToTable(mPortArr,lineId,destinationDevice,sourceDevice){	
	setTimeout(function(){
		if (globalDeviceType == 'Mobile'){
			$(document).on('pagebeforeshow', '#manageConnectionDiv', function (e, ui) {
				$('#manageConnectionDiv div[role="dialog"]').css({"max-width":"60%"});
				$('ul').css({"max-width":"350px"});
			});	
			$.mobile.changePage($('#manageConnectionDiv'),{
				transition: "pop"
			});
			subAppendToList(mPortArr,lineId,destinationDevice,sourceDevice);
		} else {
			$( "#configPopUp" ).dialog({
				modal: true,
				autoResize:true,
				width: "500px",
				height: "auto"
			});
			$( "#configPopUp" ).dialog("open");
			$( "#configPopUp" ).empty().load('pages/ConfigEditor/manageConnectivity.html',function(){
				setTimeout(function(){
					$('#manageConnectionDiv div[role="dialog"]').css({"max-width":"60%"});
					$('ul').css({"max-width":"350px"});		
					subAppendToList(mPortArr,lineId,destinationDevice,sourceDevice);
				},1000);
			});
		}
		
	},1500);
		
}

function subAppendToList(mPortArr,lineId,destinationDevice,sourceDevice){
	gstrLeft = "";
	gstrRight = "";
	gstrCenter ="";
	var listTypeLeft = [];
	var listTypeRight = [];
	for(var a =0; a < mPortArr.length; a++){
		if(destinationDevice == mPortArr[a].DevicePortObject){
			gstrRight+= "<li data-name='"+mPortArr[a].ObjectPath+"' portType='"+mPortArr[a].PortType+"'>"+mPortArr[a].PortType+"-"+mPortArr[a].PortName+"("+mPortArr[a].Description+")</li>";
			if($.inArray(mPortArr[a].PortType,listTypeRight) == -1){
				listTypeRight.push(mPortArr[a].PortType);
			}
		}
		else if (sourceDevice == mPortArr[a].DevicePortObject){
			gstrLeft += "<li data-name='"+mPortArr[a].ObjectPath+"' portType='"+mPortArr[a].PortType+"'>"+mPortArr[a].PortType+"-"+mPortArr[a].PortName+"("+mPortArr[a].Description+")</li>";	

			if($.inArray(mPortArr[a].PortType,listTypeLeft) == -1){
				listTypeLeft.push(mPortArr[a].PortType);
			}
		}
	}
	$('#deviceCenter').empty().append(gstrCenter);
	if (globalDeviceType == 'Mobile'){
		$('#deviceCenter').listview('refresh');	
	}
	$('#deviceLeft').empty().append(gstrLeft);
	if (globalDeviceType == 'Mobile'){
		$('#deviceLeft').listview('refresh');	
	}
	$('#deviceRight').empty().append(gstrRight);
	if (globalDeviceType == 'Mobile'){
		$('#deviceRight').listview('refresh');	
	}
	$('#spanDeviceLeft').empty().append(sourceDevice);
	$('#spanDeviceRight').empty().append(destinationDevice);
	/* FOR DYNAMIC LIST SELECTION OF DEVICE TYPE */ 
	var strlistL = "<select id='selectLeftType'><option value='all'>all</option>";
	var strlistR = "<select id='selectRightType'><option value='all'>all</option>";	
	for(var q=0; q<listTypeLeft.length; q++){
		strlistL += "<option value='"+listTypeLeft[q]+"' >"+listTypeLeft[q]+"</option>";			
	}
	strlistL +="</select>";
	for (var z=0; z<listTypeRight.length; z++){
		strlistR += "<option value='"+listTypeRight[z]+"'>"+listTypeRight[z]+"</option>";
	}
	strlistR +="</select>";
	$("#leftSelection").empty().append(strlistL);
	$("#rightSelection").empty().append(strlistR);
	if (globalDeviceType == 'Mobile'){
		$("#manageConnectionDiv").trigger('create');
	}
	drawMapImage();
	//dragAndHighlight();	
}

function manageConnectivity(){
//	$(document).on('click', '#doneManageConnectivity', function() {
	getAllSelectedManageConnectivity();	
	setTimeout(function(){
		if (globalDeviceType == 'Mobile'){
			$.mobile.changePage($('#configEditorPage'),{
				transition: "pop",
				changeHash : true
			});
		}else{
			$('#configPopUp').dialog('destroy');
		}
	},2000);
	drawImage();
	createLine('canvasID');
}

/*
 *
 *  FUNCTION NAME : dragAngHighlight
 *  AUTHOR        : Marlo Agapay
 *  DATE          : January 9, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 *
 */
function dragAndHighlight(){
		$('li').removeClass('ui-corner-bottom');
		$('#deviceRight')
			.addClass('ui-corner-top')
			.removeClass('ui-corner-all')
			.sortable({
				'containment': 'parent',
				'opacity': 0.6,
				update: function(event, ui) {
					$('#deviceLeft').children('li').each(function () {
						var selected_index = $(this).index();
						if ($('#deviceLeft li a').eq(selected_index).hasClass('highlight') && !$('#deviceRight li').eq(selected_index).hasClass('highlight') ){
							$('#deviceLeft li a').eq(selected_index).removeClass('highlight');
							$('#deviceCenter li').eq(selected_index).removeClass('highlight');
						}
					});
					$('#deviceRight').children('li').each(function(){
						var sIndex = $(this).index();
						if (!$('#deviceLeft li a').eq(sIndex).hasClass('highlight')){
							$('#deviceRight li').eq(sIndex).removeClass('highlight');
							$('#deviceCenter li').eq(sIndex).removeClass('highlight');
						}
					});	
				}
			});
/* THIS FUNCTION GETS THE SELECTED INDEX ON THE LIST */
		$('#deviceLeft').children('li').on('click', function () {
			var selected_index = $(this).index();
			if ($('#deviceLeft li a').eq(selected_index).hasClass('highlight')){
				$('#deviceLeft li a').eq(selected_index).removeClass('highlight');
				$('#deviceRight li').eq(selected_index).removeClass('highlight');
				$('#deviceCenter li').eq(selected_index).removeClass('highlight');	
			}
			else{
				$('#deviceCenter li').eq(selected_index).addClass('highlight');
				$('#deviceRight li').eq(selected_index).addClass('highlight');	
				$('#deviceLeft li a').eq(selected_index).addClass('highlight');	
			}
		});	

}
/*
 *
 *  FUNCTION NAME : getAllSelectedManageConnectivity
 *  AUTHOR        : Marlo Agapay
 *  DATE          : January 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function getAllSelectedManageConnectivity(){
	$('#deviceLeft').children('li').each(function () {
		var selected_index = $(this).index();
		var type = $('#deviceLeft li').eq(selected_index).attr('portType');
		var pLeftObjPath = $('#deviceLeft li').eq(selected_index).attr('data-name');
		var pRightObjPath = $('#deviceRight li').eq(selected_index).attr('data-name');
		/* to get the sourceDEvice */
		if (pRightObjPath == undefined || pRightObjPath == null || pRightObjPath == ""){
			return;
		}
		var rObj = pRightObjPath.split(".");
		var destinationDevice = rObj[0];
		/* to get the destinationDEvice */
		var lObj = pLeftObjPath.split(".");
		var sourceDevice = lObj[0];
		var condition = checkPortTypeMatch(selected_index, type, pLeftObjPath)
		if (condition == true && $('#deviceLeft li a').eq(selected_index).hasClass('highlight'))
			pushToLineConnect(selected_index,type,pLeftObjPath,destinationDevice,sourceDevice);
	});	

}
/*
 *
 *  FUNCTION NAME : checkPortTypeMatch(selIndex,leftDevType, lefObjPath)
 *  AUTHOR        : Marlo Agapay
 *  DATE          : January 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkPortTypeMatch(selIndex,leftDevType, leftObjPath){
	var conReturn =  false;
	var	pRightObjPath = $('#deviceRight li').eq(selIndex).attr('data-name');
	var devRightType = $('#deviceRight li').eq(selIndex).attr('portType');
	if (leftDevType.toLowerCase() == "l2"){
		conReturn = true;
	}
	if (leftDevType.toLowerCase() == "l1" && devRightType.toLowerCase() == "l1"){
		conReturn = checkPortSpeedIfMatch(leftObjPath,pRightObjPath)	
	}	
	if ((leftDevType.toLowerCase() == "open" && devRightType.toLowerCase() == "l1") ||(leftDevType.toLowerCase() == "l1" && devRightType.toLowerCase() == "open")) {
		confirmation("Are you sure you want to connect "+leftDevType+" port to "+devRightType+"?",Notification,"conReturn = true;");
	}	
	return conReturn;
}

/*
 *
 *  FUNCTION NAME : checkPortSpeedIfMatch
 *  AUTHOR        : Marlo Agapay
 *  DATE          : January 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkPortSpeedIfMatch(leftObjPath,rightObjPath){
	var d = rightObjPath.split(".");
	var rightDevicePath = d[0];
	var leftSpeed = "";
	var rightSpeed ="";
	var rightDeviceName = "";
	var condition = true;
	if(globalInfoType == "JSON"){
		var pathArr = leftObjPath.split(".");
		var pathArr2 = rightObjPath.split(".");
		var json1 = getAllPortOfDevice(pathArr[0]);
        var json2 = getAllPortOfDevice(pathArr2[0]);
        var prtArr = json1.concat(json2);
    }else{
         var prtArr= portArr;
    }
	for(var a=0; a<prtArr.length; a++){
		if (prtArr[a].ObjectPath == leftObjPath){
			leftSpeed = prtArr[a].Speed;
		}else if (prtArr[a].ObjectPath	== rightObjPath){
			rightSpeed = prtArr[a].Speed;
		}
	}	
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for (var q=0; q<devices.length; q++){
		if (devices[q].ObjectPath == rightObjPath){
			rightDeviceName = devices[q].DeviceName;
		}
	}
	if (leftSpeed != rightSpeed){
		alert("Device "+rightDeviceName+" have no speed of "+leftSpeed);
		condition = false;
	}
	return condition;
}

/*
 *
 *  FUNCTION NAME : closeDialog
 *  AUTHOR        : Apple Kem E. Eguia
 *  DATE          : March 11, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */ 
function closeDialog(popUp){
	$('#'+popUp).dialog('destroy');
	$(".ui-dialog-titlebar-close").hide();
	$("#linkBack").remove();
}

/*
 *
 *  FUNCTION NAME : pushToLineConnect
 *  AUTHOR        : Marlo Agapay
 *  DATE          : January 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function pushToLineConnect (selIndex, devLeftType, pLeftObjPath,destinationDevice,sourceDevice){
	var	pRightObjPath = $('#deviceRight li').eq(selIndex).attr('data-name');
	var devRightType = $('#deviceRight li').eq(selIndex).attr('portType');
		var tempLineArr = [];
		loop:
		for (var q=0; q<window['variable' + dynamicLineConnected[pageCanvas]].length; q++){
			if (window['variable' + dynamicLineConnected[pageCanvas]][q].DestinationDeviceObjectPath == destinationDevice&& window['variable' + dynamicLineConnected[pageCanvas]][q].SourceDeviceObjectPath == sourceDevice){
				pushPortToLineConnected(window['variable' + dynamicLineConnected[pageCanvas]][q], pLeftObjPath,pRightObjPath);
				break loop;	
			}
		}

}
/*
 *
 *  FUNCTION NAME : pushPortToLineConnected
 *  AUTHOR        : marlo agapay
 *  DATE          : January 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function pushPortToLineConnected(lineConnectedArr,pLeftObjPath,pRightObjPath){
	var hasIt = false;
	var destinationDeviceObj = [{"DestinationDeviceXLocation":lineConnectedArr.DestinationDeviceXLocation,"DestinationDeviceYLocation":lineConnectedArr.DestinationDeviceYLocation,"DestinationDeviceObjectPath":lineConnectedArr.DestinationDeviceObjectPath,"DestinationDeviceDeviceName":lineConnectedArr.DestinationDeviceDeviceName}];
	var sourceDeviceObj = 	[{"SourceDeviceXLocation":lineConnectedArr.SourceDeviceXLocation,"SourceDeviceYLocation":lineConnectedArr.SourceDeviceYLocation,"SourceDeviceObjectPath":lineConnectedArr.SourceDeviceObjectPath,"SourceDeviceDeviceName":lineConnectedArr.SourceDeviceDeviceName}];	
	$.each(lineConnectedArr, function(index,object){
		if (object.Destination == pRightObjPath && object.Source == pLeftObjPath){
			hasIt = true;
			return false;
		}
	});
	if (hasIt == false)
		var portId1 = getPortIdforManageConnectivity(pLeftObjPath);
		var portId2 = getPortIdforManageConnectivity(pRightObjPath);
		var lineName = getPortIdforManageConnectivity(pLeftObjPath,"lineName");
		storeLinkInformation(lineName,sourceDeviceObj,destinationDeviceObj,pLeftObjPath,pRightObjPath,"","","",portId1,portId2,pLeftObjPath,pRightObjPath,"","","","","","","","","false");
}
/*
 *
 *  FUNCTION NAME : convertTime
 *  AUTHOR        : James Turingan
 *  DATE          : January 3, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function convertTime(time){
	var mydate = new Date();
	var myDateArr = mydate.toString().split(" ");
	var mytimezone = myDateArr[5];
	var timeVal='';
	var action = "converttime";
	var query = '{"QUERY":[{"TimeZone":"'+mytimezone+'"}]}';
	$.ajax({
		url: getURL("RM"),
		data: {
			"action":action,
			"query":query,
		},
		dataType: 'html',
		method: 'POST',
		proccessData: false,
		async:false,
		success: function(data) {
			var dat = data.replace(/'/g,'"');
        	var dat2 = $.parseJSON(dat);
			timeVal = dat2.RESULT[0].Result;	
		}
	});
	return timeVal;
}
/*
 *
 *  FUNCTION NAME : toggle1
 *  AUTHOR        : Rose Anne Dominguez
 *  DATE          : January 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : Hide and show of the Configuration Name panel. 
 *  PARAMETERS    : 
 *
 */


function toggle1(id) {
	var el = document.getElementById(id);
	var img = document.getElementById("arrow1");
	var box = el.getAttribute("class");
	if(box == "hideMenu1"){
		el.setAttribute("class", "showMenu1");
		delay(img, "img/arrowright1.png", 400);
	}
	else{
		el.setAttribute("class", "hideMenu1");
		delay(img, "img/arrowleft1.png", 400);
	}
}
/*
 *
 *  FUNCTION NAME : delay
 *  AUTHOR        : Rose Anne Dominguez
 *  DATE          : January 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : animation of hide and show in the side panel.
 *  PARAMETERS    : 
 *
 */


function delay(elem, src, delayTime){
	window.setTimeout(function() {elem.setAttribute("src", src);}, delayTime);
}


/*
 *
 *  FUNCTION NAME : toggle
 *  AUTHOR        : Rose Anne Dominguez
 *  DATE          : January 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : Hide and show of the History panel.
 *  PARAMETERS    : 
 *
 */


function toggle(id) {
	var el = document.getElementById(id);
	var img = document.getElementById("arrow");
	var box = el.getAttribute("class");
	if(box == "hideMenu"){
		el.setAttribute("class", "showMenu");
		delay(img, "img/arrowright1.png", 400);
	}
	else{
		el.setAttribute("class", "hideMenu");
		delay(img, "img/arrowleft1.png", 400);
	}
}


/*
 *
 *  FUNCTION NAME : getPortIdforManageConnectivity
 *  AUTHOR        : marlo agapay
 *  DATE          : January 10, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function getPortIdforManageConnectivity(portObj,action){
	var port ="";
	if(globalInfoType == "JSON"){
		var ojb = portObj.split(".")[0];
		var objArr = obj.split(".");
        var prtArr = getAllPortOfDevice(objArr[0]);
    }else{
         var prtArr= portArr;
    }
	for (var a=0; a<prtArr.length; a++){
		if (prtArr[a].ObjectPath == portObj){

			if (action == "lineName"){
				port = "t"+prtArr[a].Speed+"_"+window['variable' + dynamicLineConnected[pageCanvas]].length+1;				
			}else{
				port = prtArr[a].PortId;
			}
		}
	}
	return port;
}

/*
 *
 *  FUNCTION NAME : checkIfTabAvailable
 *  AUTHOR        : marlo agapay
 *  DATE          : January 13, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkIfTabAvailable(data){
	var InfoType= "JSON";
	if(InfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(data, "text/xml");
		var mConfig =xmlDoc.getElementsByTagName('MAINCONFIG');
		var localFlag = mConfig[0].getAttribute('LocalFlag');
		var importFlag = mConfig[0].getAttribute('ImportedFlag');
	}else{
		var dat = data.replace(/'/g,'"');
        var dat2 = $.parseJSON(dat);
        var localFlag = dat2.MAINCONFIG[0].LocalFlag;
		var importFlag = dat2.MAINCONFIG[0].ImportedFlag;
	}
	var myReturn = '';
	if (localFlag == '1' && importFlag == '0'){
		myReturn ='local';
		$("#ulDevListTabs").hide();
		$('#tabImport').hide();
		$('#tabLocal').show();
	}else if (localFlag == '0' && importFlag =='1'){
		myReturn = 'import';
		$("#ulDevListTabs").hide();
		$('#tabImport').show();
		$('#tabLocal').hide();
	}else if (localFlag == '1' && importFlag == '1'){
		myReturn = 'both';
		$("#ulDevListTabs").show();
	}

	return myReturn;	
}
/*
 *
 *  FUNCTION NAME : testToolTablePopUp
 *  AUTHOR        : James Turingan
 *  DATE          : January 16, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function testToolTablePopUp(){
	$( "#configPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto"
	});
	$( "#configPopUp" ).empty().load('pages/ConfigEditor/TestToolTable.html',function(){
		setTimeout(function(){
			TestToolListTable();
			$(".ui-dialog").position({
			   my: "center",
			   at: "center",
			   of: window
			});

		},1000);
	});
}
/*
 *
 *  FUNCTION NAME : deviceTablePopUp
 *  AUTHOR        : James Turingan
 *  DATE          : January 16, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */


function deviceTablePopUp(type){
	var h = $(window).height() - 100;

	$( "#configPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
	});
	$( "#configPopUp" ).empty().load('pages/ConfigEditor/DeviceListTable.html',function(){
		if(type == 'devicelist'){
			deviceListPopupTable('deviceMenu','local');
		}else{
			serverListPopupTable('deviceMenu','local');
		}
				
		if(importLocalFlag[0] == "1" && importLocalFlag[1] == "1"){
			$('#tabsDevlist').tabs();
			$('#ulDevListTabs').removeAttr("style");
		}
		if(importLocalFlag[0] == "1" && importLocalFlag[1] == "0"){
			$('#ulDevListTabs').hide();
			$('#tabLocal').show();
			$('#tabImport').hide();
		}
		if(importLocalFlag[0] == "0" && importLocalFlag[1] == "0"){
			$('#ulDevListTabs').hide();
			$('#tabLocal').hide();
			$('#tabImport').show();
		}

		$(".ui-dialog").position({
		   my: "center",
		   at: "center",
		   of: window
		});
	});
}
/*
 *
 *  FUNCTION NAME : doneDevListTable
 *  AUTHOR        : James Turingan
 *  DATE          : January 16, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */


function doneDevListTable(type){
	dragtoTrashDeviceOnly(glblDevMenImg,gblDevMenX,gblDevMenY,"true");
	var load ="";
	var device = [];
	ajaxLoader('show','Processing Information...');
	setTimeout(function(){
		createQueryMapLink(globalSelectedDeviceList);
		configEditorManageDevice = false // to stop objpath
	},1500);
	if(type != "apply"){
		$( "#configPopUp" ).dialog('destroy');
	}else{
		setTimeout(function(){
			$( "#configPopUp" ).dialog('destroy');
			deviceListPopupTable('deviceMenu','local');	
		}, 2000);
	}

}
/*
 *
 *  FUNCTION NAME : portContentMobile
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : January 16, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function portContentMobile(){
	var content = "";
	content += "<table ";
	content += " class='infoshowhide' style='width: 100%;'>";
	content += "<tr><td><table><tr>"
	content += "<td  style='width: 20px;' !important;></td>";
	content += "<td style='width: 150px;'>";
	content += "Port type: <br></td><td><br>";
	content += "<select id='porttypeinfo1' onchange='appendToArrayInfo()'";
	content += " data-mini='true' style='width: 150px;'>";
	content += "<option value=''></option>"+GlobalDevicePortType+"</select>";
	content += "<br></td><td><br>Media type<br></td>";
	content += "<td><br><select id='mediatype' onchange='appendToArrayInfo()'><option value=''></option>"+GlobalMedia+"</select><br /></td>";
	content += "</tr><tr><td  style='width: 20px;'></td>";
	content += "<td  style='width: 150px;'>Port name: <br></td><td>";
	content += "<input id='portnamenumber' ";
	content += "type='text' onblur='appendToArrayInfo()'/><br>";
	content += "</td></tr><tr><td  style='width: 20px;'></td></tr></table></td></tr>";
	content += "<tr><td><table style='width: 100%;'  cellspacing='10'><tr><td  style='width: 100%;'>            <fieldset style='border:2px solid #1c5a8d;border-radius:10px;overflow:auto;'>";
    content += "<legend style='margin-left:20px;'>Map Partner Port</legend>";
    content += "<table cellspacing='10' id='newDeviceinfo' style='width: 100%; overflow:auto;margin-left:15px;text-align:center;width:95%'><br><tr><td>";
	content += "Host Name: <select id='partnerhostname' onchange='appendToArrayInfo();checkHostIpaddress(this.value);'";
    content += "data-mini='true' style='width: 150px;'></select>";
	content += "Ip Address: <input id='partneripaddress' onchange='appendToArrayInfo()'";
    content += " style='width: 150px;'></input>";
	content += "</td><td>Slot Number: <select id='partnerslot' onchange='appendToArrayInfo(); checkSlotPortNumber();' data-mini='true' style='width: 150px;'></select>";
	content += "Port Name: <select id='partnerportinfo' onchange='appendToArrayInfo();' data-mini='true' style='width: 150px;'></select>";
	content += "</td></tr></table>"
	content += "</fieldset></td></tr></table></td></tr>";
	content +=	"</table>";
	return content
}
/*
 *
 *  FUNCTION NAME : deviceTablePopUp
 *  AUTHOR        : James Turingan
 *  DATE          : January 16, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function portTablePopUp(){
	$( "#testToolPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		maxHeight: 500
	});
	$( "#testToolPopUp" ).load('pages/ConfigEditor/PortTestTool.html',function(){
		//deviceListPopupTable('deviceMenu','local');
		$('#PortTitle').text(HostName);	
		setTimeout(function(){
			PortTestToolTable();
		},100);

		$(".ui-dialog").position({
		   my: "center",
		   at: "center",
		   of: window
		});
	});
}

/*
 *
 *  FUNCTION NAME : showPortDevices
 *  AUTHOR        : James Turingan
 *  DATE          : January 16, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function showPerDevicesPort(src){
	if(src.checked){
		for(var i = 0; i < testToolObj.length; i++){
			if(HostName == testToolObj[i].DeviceName){
				testToolObj[i].Flag = 1;
			}
		}
	}else{
		for(var i = 0; i < testToolObj.length; i++){
			if(HostName == testToolObj[i].DeviceName){
				testToolObj[i].Flag = 0;
			}
		}
	}


}
/*
 *
 *  FUNCTION NAME : closePopUp
 *  AUTHOR        : James Turingan
 *  DATE          : January 16, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function closePopUp(table,type){
	if(table == "porttesttool"){
		$( "#testToolPopUp" ).dialog('close');
//		if(type == "cancel"){
			TestToolListTable(); 
//		}
	}else if(table == "testtool"){
		if(type == "done"){
			validationTTList();
		}else{
			testToolObj	= [];
			checkPortsTTList = [];
		}
		$( "#configPopUp" ).dialog('destroy');
	}else if(table == "devlist"){
		$( "#configPopUp" ).dialog('destroy');

	}else if(table == "loadactive"){
		if(type == "done"){
			if(ReleaseFlagLoadActive == true){
				cancelReservation();
			}else{
				showActiveTopology();
			}
		}else{
			ReleaseFlagLoadActive = false;
		}

		$( "#configPopUp" ).dialog('destroy');
	}else if(table == "commit"){
		ajaxLoader('show','Processing Information...');
		if(type == "done"){
			if(validateDate() == 1){
				return
			}
			$("#confirm_test").datepicker("destroy");    
			$("#confirm_test2").datepicker("destroy");    
			$("#confirm_test3").timepicker("destroy");    
			$("#confirm_test1").timepicker("destroy");    
			globalSelectedDeviceList = [];
			createQueryforResevartion();
			$( "#configPopUp" ).dialog('destroy');
		}else{
			ajaxLoader('hide');
			$( "#configPopUp" ).dialog('destroy');
		}
	}else if(table == "devMenu"){
		$( "#deviceMenuPopUp" ).dialog('destroy');

	}else if(table == "sanity" ){
		$('#divAlert').empty();
		$('#divAlert').dialog('destroy');
//		window['variable' + SanityFlag[pageCanvas] ] = false;
	}else if(table =="filter"){
		$('#divAlert').dialog('destroy');
	}
}
/*
 *
 *  FUNCTION NAME : actionButton
 *  AUTHOR        : James Turingan
 *  DATE          : January 16, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function actionButton(type){
	$("#configContent"+pageCanvas).css("cursor","default");
	$("#Magnify").attr("title","Zoom");
	createDev ="";
	zoomButtonStatus = "inactive";
	addEvent2History("Click "+type); //add event to history
	if(type == "applyall"){
		$('#applyall').attr("src","img/action_buttons/applyallActive.png");
		$("#loadactive").attr("src","img/action_buttons/loadactive.png");
		$("#clearcanvas").attr("src","img/action_buttons/clear.png");
		$("#committopology").attr("src","img/action_buttons/commit.png");
		$("#cancelreservation").attr("src","img/action_buttons/cancel.png");
		if(globalApplyAll == "deactive"){
			globalApplyAll = "active";
		}else{
			globalApplyAll = "deactive";
		}
	}else if(type == "loadactive"){
		$("#loadactive").attr("src","img/action_buttons/loadactiveActive.png");
		$("#applyall").attr("src","img/action_buttons/applyall.png");
		$("#clearcanvas").attr("src","img/action_buttons/clear.png");
		$("#committopology").attr("src","img/action_buttons/commit.png");
		$("#cancelreservation").attr("src","img/action_buttons/cancel.png");
       	var devices = getDevicesNodeJSON();
		if(devices.length > 0 && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId != null && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId != "" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId != undefined){
			alerts("Device/s on the canvas will be cleared for this action. Do you still want to continue?","showloadActive()","deleteload");
		}else if(devices.length > 0){
			alerts("Device/s on the canvas will be cleared for this action. Do you still want to continue?","showloadActive()","deleteload");
		}else{ 
			showloadActive();	
		}

	}else if(type == "clearcanvas"){
		$("#clearcanvas").attr("src","img/action_buttons/clearActive.png");
		$("#loadactive").attr("src","img/action_buttons/loadactive.png");
		$("#applyall").attr("src","img/action_buttons/applyall.png");
		$("#committopology").attr("src","img/action_buttons/commit.png");
		$("#cancelreservation").attr("src","img/action_buttons/cancel.png");
		if(globalMAINCONFIG.length > 0){
			for(var i = 0 ; i < globalMAINCONFIG.length; i++){
				if(globalMAINCONFIG[i].MAINCONFIG[0].DEVICES.length > 0){
					alerts("Are you sure you want to clear canvas?","clearCanvas()","yesno");
					break;
				}
			}
		
		}
		
	}else if(type == "committopology"){
		if(globalInfoType == "JSON"){
        	var devices = getDevicesNodeJSON();
	    }else{
    	     var devices =devicesArr;
	    }
		if(devices.length > 0){
	        $("#committtopology").attr("src","img/action_buttons/commitActive.png");
    	    $("#applyall").attr("src","img/action_buttons/applyall.png");
        	$("#clearcanvas").attr("src","img/action_buttons/clear.png");
	        $("#cancelreservation").attr("src","img/action_buttons/cancel.png");
			$("#loadactive").attr("src","img/action_buttons/loadactive.png");

			resetCommitOptions();
			setTimeout(function(){
				commitOptPopUp('commitoption');
		//	    $("#committopology").removeClass('animated pulse');
				populateCombo();
			},1500);
		}else{
			if(globalDeviceType != "Mobile"){
				alerts("No device/s to commit, please create one first.");
			}else{
				alert("No device/s to commit, please create one first.");

			}
		}
	}else if(type == "cancelreservation"){
		addHistory('Cancel Reservation');
		$("#cancelreservation").attr("src","img/action_buttons/cancelActive.png");
		$("#loadactive").attr("src","img/action_buttons/loadactive.png");
		$("#applyall").attr("src","img/action_buttons/applyall.png");
		$("#clearcanvas").attr("src","img/action_buttons/clear.png");
		$("#committopology").attr("src","img/action_buttons/commit.png");
		var dev = getDevicesNodeJSON();
		if(dev != null && dev != undefined && dev != "" && dev.length > 0 && window['variable' + dynamicResourceId[pageCanvas] ] != ""){
			alerts("Are you sure you want to release your reservation?","","cancel");
		}else{
			alerts("Nothing to cancel");
		}
	}

}
/*
 *
 *  FUNCTION NAME : loadActive 
 *  AUTHOR        : James Turingan
 *  DATE          : January 16, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : loads the popUp
 *  PARAMETERS    : 
 *
 */
function showloadActive(){
	$( "#configPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		maxHeight: 500
	});
	$( "#configPopUp" ).empty().load('pages/ConfigEditor/LoadActiveTable.html',function(){
		//deviceListPopupTable('deviceMenu','local');
		$('#PortTitle').text(HostName);	
		setTimeout(function(){
			loadActiveTableQuery();
			$(".ui-dialog").position({
			   my: "center",
			   at: "center",
			   of: window
			});

		},1000);

	});

}
/*
 *
 *  FUNCTION NAME : commitOptPopUp 
 *  AUTHOR        : James Turingan
 *  DATE          : January 17, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : shows pop Up for commit options and date picker
 *  PARAMETERS    : 
 *
 */

function commitOptPopUp(page){
	var toShow = page;
	$( "#configPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		maxHeight: 500
	});
	
	$( "#configPopUp" ).empty().load('pages/ConfigEditor/CommitPopUp.html',function(){
		if(toShow == "commitoption"){
			$('#commitPop').hide();	
			$('#commitOptions').show();	
		}else{
			$('#commitPop').show();	
			$('#commitOptions').hide();
			populateCombo();
	//		clickPicker();
//			commitOptionsOk();
			populateCombo();
			outOfFocus();
			initDate();
		}
		setTimeout(function(){
			checkCommitOptions();
		},100);

		$(".ui-dialog").position({
		   my: "center",
		   at: "center",
		   of: window
		});
	});

}
/*
 *
 *  FUNCTION NAME : showPickerOption
 *  AUTHOR        : James Turingan
 *  DATE          : January 17, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : shows pop Up for commit options and date picker
 *  PARAMETERS    : 
 *
 */
function showPickerOption(){
	$( "#configPopUp" ).dialog('destroy');
	checkLCArray=[];
	if(window['variable' + dynamicResourceId[pageCanvas] ] != "" && window['variable' + dynamicResourceId[pageCanvas] ] != undefined && window['variable' + dynamicResourceId[pageCanvas] ] != null){
		var myXml2 = getStringJSON(globalMAINCONFIG[pageCanvas]);
        var myXml = myXml2.replace(/"/g,"'");
		sendQueryToRM("Check",myXml);
	}else{
		commitOptPopUp('showpicker');
	}
}

/*
 *
 *  FUNCTION NAME : sanityResultTable
 *  AUTHOR        : James Turingan
 *  DATE          : January 17, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : shows pop Up for commit options and date picker
 *  PARAMETERS    : 
 *
 */

function sanityResultTable(){
	$("#divAlert").dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		maxHeight: 700
	});
	$("#divAlert").load('pages/ConfigEditor/SanityResultTable.html?',function(){
		if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DeviceSanity.toString() == "false"){
			$('#liDevSan').hide();	
		}
		if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity.toString() == "false"){
			$('#liAccSan').hide();	
		}
		if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString() == "false"){
			$('#liConn').hide();	
		}
		if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "false"){
			$('#liEnaInt').hide();	
		}
		if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "false"){
			$('#liLinkSan').hide();	
		}
		if(StartReservation.toString() == "false"){
			$('#liLoadImg').hide();
			$('#liLoadConf').hide();
		}else{
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "false" || globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == ""){
				$('#liLoadImg').hide();
			}
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "false" || globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == ""){
				$('#liLoadConf').hide();
			}
		}
		checkFromSanity = "true";	
		$('#santabs').tabs();
		if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DeviceSanity.toString() == "true"){
			devSanInit();
			$('#liDevSan a').trigger('click');
//			sanityQuery('deviceSanity');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity.toString() == "true"){
			accSanInit();
			$('#liAccSan a').trigger('click');			
//			sanityQuery('accessSanity');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString() == "true"){
			connSanInit();
			$('#liConn a').trigger('click');
//			sanityQuery('connectivitiy');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "true"){
			linkSanInit();
			$('#liLinkSan a').trigger('click');
//			sanityQuery('linksanity');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "true"){
			 enableIntInit();
			 $('#liLinkSan a').trigger('click');
//			sanityQuery('enableint');
		}else if(StartReservation.toString() == "true"){
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "true"){
				loadImgInit();
				$('#liLoadImg a').trigger('click');
//				sanityQuery('loadConfig');			
			}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "true"){
				loadConfInit();
				$('#liLoadConf a').trigger('click');
//				sanityQuery('loadConfig');
			}
		}
		$(".ui-dialog").position({
		   my: "center",
		   at: "center",
		   of: window
		});
	});
	$("#divAlert").dialog('open');
}
/*
 *
 *  FUNCTION NAME : alertPopUp()
 *  AUTHOR        : James Turingan
 *  DATE          : January 20, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : loads the popUp
 *  PARAMETERS    : 
 *
 */
function alertPopUp(){
	$( "#alertPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		maxHeight: 500
	});
	$(".ui-dialog").position({
	   my: "center",
		at: "center",
		   of: window
	});

}
/*
 *
 *  FUNCTION NAME : showDevMenPop()
 *  AUTHOR        : James Turingan
 *  DATE          : January 20, 2014 
 *  MODIFIED BY   : Anna Marie Paulo
 *  REVISION DATE : February 21, 2014
 *  REVISION #    : 
 *  DESCRIPTION   : loads the popUp
 *  PARAMETERS    : 
 *
 */
function showDevMenuPop(){
	$( "#deviceMenuPopUp" ).dialog({
		modal: true,
		width: "auto",
		maxHeight: 500,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").show(); }
	});
	$("#deviceMenuPopUp").empty().load("pages/ConfigEditor/deviceMenu.html", function(){
		var devices = getDevicesNodeJSON();
		$('span.ui-dialog-title').text('DEVICE');
		$('.ui-dialog-title').css({'margin-top':'7px','text-align':'center'});
		var bck2 = '<div id="go-Back" style="display:none;position:absolute;cursor:pointer;" onclick="goBack()"><img src="img/backArrow.png" style="width: 20px;margin-left:10px;margin-top:5px;"></div>';
			$('.ui-dialog-titlebar').prepend(bck2);

		for(var a=0; a<devices.length; a++){
			if(devices[a].Status.toLowerCase()=="reserved"){
				$("#logsList").show();
				$("#devList").show();
				$("#deviceToolsList").show();
			}else{
				$("#logsList").hide();
				$("#devList").hide();
				$("#deviceToolsList").hide();
			}
		}
		$(".ui-dialog").position({
			my: "center",
			at: "center",
			of: window
		});
	});
}
function goBack(){
	if($("#deviceMainList").is(':visible')){
		$('#go-Back').hide();
	}else if($('#deviceLogsMain').is(':visible')){
		$('#deviceMainList').show();
		$('#deviceLogsMain').hide();
		$('#go-Back').hide();
		$('span.ui-dialog-title').text('DEVICE');
	}else if($('#logsDeviceMain').is(':visible')){
		$('#deviceLogsMain').show(); 
		$('#logsDeviceMain').hide();
		$('span.ui-dialog-title').text('LOGS MENU');
	}else if($("#logsConnectivityMain").is(':visible')){
		$("#logsConnectivityMain").hide();
		$('#deviceLogsMain').show();
		$('span.ui-dialog-title').text('LOGS MENU');
	}else if($("#logsLinkSanityMain").is(':visible')){
		$("#logsLinkSanityMain").hide();
		$('#deviceLogsMain').show(); 
		$('span.ui-dialog-title').text('LOGS MENU');
	}else if($("#deviceDeviceMenu").is(':visible')){
		$("#deviceDeviceMenu").hide();
		$('#deviceMainList').show();
		$('#go-Back').hide();
		$('span.ui-dialog-title').text('DEVICE');
	}else if($("#deviceToolsMenuMain").is(':visible')){
		$("#deviceToolsMenuMain").hide();
		$('#deviceMainList').show();
		$('#go-Back').hide();
		$('span.ui-dialog-title').text('DEVICE');
	}else if($("#linkSanitySubmenu_popup").is(':visible')){
		$("#linkSanitySubmenu_popup").hide();
		$("#deviceToolsMenuMain").show();
		$('span.ui-dialog-title').text('TOOLS MENU');
	}else if($('#softwareDevMenu').is(':visible')){
		$('#softwareDevMenu').hide();
		$("#deviceToolsMenuMain").show();
		$('span.ui-dialog-title').text('TOOLS MENU');	
	}else if( $('#configurationDevMenu').is(':visible')){
		$('#configurationDevMenu').hide();
		$("#deviceToolsMenuMain").show();
		$('span.ui-dialog-title').text('TOOLS MENU'); 
	}
}
/*
 *
 *  FUNCTION NAME : dynamicCanvas()
 *  AUTHOR        : James Turingan
 *  DATE          : January 22, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE :  
 *  REVISION #    : 
 *  DESCRIPTION   : creates another canvas
 *  PARAMETERS    : 
 *
 */

var divctr = 1;
function dynamicCanvas(num){
	createDev="";
	$("#configContent"+pageCanvas).css("cursor","default");
    $("#Magnify").attr("title","Zoom");
    zoomButtonStatus = "inactive";
	if(globalDeviceType == "Mobile" && divctr == 3){
        error("Canvas limit reached.","Notification");
        return;
    }
	dynamicVar.push("stage_"+divctr);
	dynamicMinimap.push("ministage_"+divctr);
	var str ="<div class='canvasBorder' id='configContent"+divctr+"' style='display:none;'></div>"
	var ministr ="<div class='screen minicanvas' id='miniMap"+divctr+"' style='display:none;'></div>"
	dynamicLineConnected.push("lineConnected"+divctr);
	dynamicLineConnected2.push("lineConnected2"+divctr);
	dynamicLayer.push("layer"+divctr);
	dynamicMiniLayer.push("layer"+divctr);
	dynamicLine.push("redLine"+divctr);
	dynamicResourceId.push("ResourceId"+divctr);
	ConnectivityFlag.push("ConnectivityFlag"+divctr);

	dynamicZoomOrigin.push("zoomOrigin"+divctr)
	dynamicZoomFactor.push("zoomFactor"+divctr);
	dynamicPinchLastDist.push("pinchLastDist"+divctr);
	dynamicPinchStartCenter.push("pinchStartCenter"+divctr);

	dynamicTopology.push("Topology"+divctr);
//	checkFromSanity2.push("checkFromSanity"+divctr);
	dynamicMainId.push("MainId"+divctr);
	dynamicDebug.push("Debug"+divctr);
	dynamicDomain.push("Domain"+divctr);
	if(globalDeviceType != "Mobile"){
		$('#divCanvas').prepend(str);
	}else{
		$("#sideOpener").after(str);
	}
	canvasSwipe("configContent"+divctr);
	$('#divMiniCanvas').append(ministr);
	var str2='';
	for(var i = 0; i < dynamicVar.length; i++){
		var page = dynamicVar[i].split('_')[1];
		if(pageCanvas == page && dynamicVar[i] != ""){
	        str2+="<li id='lipagecanvas"+page+"'><a id='a"+page+"' class='active' onclick='pageCanvas="+page+";paginateCanvas()' >"+page+"</a></li>";
        }else if(dynamicVar[i] != ""){
        	str2+="<li id='lipagecanvas"+page+"'><a id='a"+page+"' onclick='pageCanvas="+page+";paginateCanvas()' >"+page+"</a></li>";
        }
	}
	if(dynamicVar.length > 1){
		$('#closCanvaseBtn').show();
	}

	window['variable' + dynamicVar[divctr] ] = new Kinetic.Stage({ // initialize the canvas
		container: "configContent"+divctr,
		width: gblCanvasWidth,
		height: gblCanvasHeight,
		border : "4px solid gray"
	});
	window['variable' + dynamicMinimap[divctr] ] = new Kinetic.Stage({ // initialize the canvas
		container: "miniMap"+divctr,
		width: gblCanvasWidth * 0.2,
		height: gblCanvasHeight * 0.2,
		border : "0px"
	});	

	window['variable' + dynamicLayer[divctr]] = new Kinetic.Layer(); // initialize per layer of images or object in canvas
	window['variable' + dynamicMiniLayer[pageCanvas]] = new Kinetic.Layer(); // initialize per layer of images or object in canvas
	window['variable' + dynamicResourceId[divctr] ]= '';
	window['variable' + dynamicMainId[divctr] ]= '';
	window['variable' + dynamicFlagCommitted[divctr] ]= '';
	window['variable' + ConnectivityFlag[divctr] ]= '';
	window['variable' + dynamicLineConnected[divctr]] = [];
	window['variable' + dynamicLineConnected2[divctr]] = [];
	window['variable' + dynamicDebug[divctr] ]= 'false';
	window['variable' + dynamicDomain[divctr] ]= window['variable' + dynamicDomain[pageCanvas] ];
	window['variable' + dynamicVar[divctr]].add(window['variable' + dynamicLayer[divctr]]);
	$("#configContent"+divctr+" canvas").attr("id", "canvasID"+divctr);
	window['variable' + dynamicGreenRouletteArr[divctr]] = [];
	$('#paginationcanvas').empty().append(str2);
	canvasEvent(divctr); // add click event on canvas
	pageCanvas = divctr;
	paginateCanvas();
	divctr++;
	if(globalInfoType != "XML"){
		setJSONData();
	}
//	if(globalDeviceType != "Mobile"){
		autoResizeCanvas();
//	}
}

/*
 *
 *  FUNCTION NAME : canvasSwipe()
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : March 24, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : for swipe event pagination when the canvas is empty
 *  PARAMETERS    : ids - id of canvas
 *
 */
function canvasSwipe(ids){
	$("#"+ids).on("swiperight", function(){
		if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DEVICES.length == 0){
	       	var cnvasLngt = $("#paginationcanvas li").length;
	        if(pageCanvas > 0){
    	        pageCanvas = pageCanvas - 1;
        	}else{
	            pageCanvas = 0;
    	    }
        	paginateCanvas();
		}
	});
    $("#"+ids).on("swipeleft", function(){
		if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DEVICES.length == 0){
    	    var cnvasLngt = $("#paginationcanvas li").length;
	        if(pageCanvas < cnvasLngt-1 ){
        	    pageCanvas = pageCanvas + 1;
	        }else{
    	        pageCanvas = cnvasLngt-1;
        	}
	        paginateCanvas();
		}
    });
}

/*
 *
 *  FUNCTION NAME : paginateCanvas()
 *  AUTHOR        : James Turingan
 *  DATE          : January 22, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : pagination of the canvas
 *  PARAMETERS    : 
 *
 */
function paginateCanvas(){
	createDev="";
	$("#configContent"+pageCanvas).css("cursor","default");
    $("#Magnify").attr("title","Zoom");
   	zoomButtonStatus = "inactive";

//	if(globalDeviceType != "Mobile"){
        autoResizeCanvas();
//    }
	for(var i = 0;i < dynamicVar.length; i++){
		var page = dynamicVar[i].split('_')[1];
		if(parseInt(page) == pageCanvas){
			$('#a'+page).addClass('active');
			$('#configContent'+page).show('slide', {direction: 'left'}, 1000);
			$('#miniMap'+page).show('slide', {direction: 'left'}, 1000);
		}else{
			$('#a'+page).removeClass('active');
			$('#configContent'+page).hide('slide', {direction: 'left'}, 1000);
			$('#miniMap'+page).hide('slide', {direction: 'left'}, 1000);
		}
	}
	if(globalInfoType != "XML"){
		setJSONData();
	}
	/*-----kmmabignay-history global-----*/
	if(window['variableHistory'+pageCanvas]==undefined){
		window['variableHistory'+pageCanvas] = new Array();
	}
	/*-----kmmabignay-configuration name global-----*/
	if(window['variableConfigName'+pageCanvas]==undefined){
		window['variableConfigName'+pageCanvas] = new Array();
	}
	/*-------------------------------------------*/
	if(globalInfoType == "JSON"){
		var devices = getDevicesNodeJSON();
	}else{
		var devices = devicesArr;
	}
	if(devices != undefined || devices != null || devices != '' ){
		if(devices.length > 0){
			$("#trashBin").show();
		}else{
			$("#trashBin").hide();
		}
	}else{
		$("#trashBin").hide();
	}
	reCreateDock();
	drawImage();
//	greenRoulette2();
}

/*
 * 	FUNCTION NAME	:	showPopup()	
 *	AUTHOR			:	Anna Marie Paulo
 *	DATE			:	February 13, 2014
 *	MODIFIED BY		:
 *	REVISION DATE	:
 *	REVISION #		:
 *	DESCRIPTION		:	shows all the popup boxes in sub menu
 * 	PARAMETERS		:
 *
 */

function showPopup(sub){
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}
	var title="";
	//CONFIG MENU
	if(sub=="load"){
		$("#configPopUp").empty().load("pages/ConfigEditor/PopUp.html", function(){ 
		$('span.ui-dialog-title').text('Load Configuration');
		$('.ui-dialog-title').css({'margin-left':'14px','margin-top':'7px','text-align':'center'});
			if(devicesArr==[] || devicesArr.length == 0){
				$("#clearCanvasTd").hide();
			}else{
				$("#alertMsg").show();
				$("#clearCanvasTd").show();
			}
			loadLoadConfig();
		});
	}else if(sub=="save"){
		
		if(devicesArr==[] || devicesArr.length == 0){
			alertUser("No device/configuration to save, please create one first.",'$(".ui-dialog-titlebar-close").show()');
			return;
		}else{
					$("#configPopUp").empty().load("pages/ConfigEditor/save.html", function(){
				for(var a=0; a<devicesArr.length; a++){
					if(devicesArr[a].DeviceName == "" || devicesArr[a].Status.toLowerCase()!=""){
						$("#staticID").remove();
					}else{
						$("#staticID").remove();
						$("#saveConfFileTypeDBType").prepend("<option value='static' id='staticID'>Static</option>");
					}
				}
				$('span.ui-dialog-title').text('Save Configuration');
				$('.ui-dialog-title').css({'margin-left':'20px','margin-top':'7px','text-align':'center'});
				loadSaveConfig();
				saveFileType();
			});	
		}
	}else if(sub=="saveUs"){
		if(devicesArr==[] || devicesArr.length == 0){
			alertUser("No device/configuration to save, please create one first.");
			return;
		}else{
				$("#configPopUp").empty().load("pages/ConfigEditor/saveAs.html", function(){
				$('span.ui-dialog-title').text('Save As Configuration');
				$('.ui-dialog-title').css({'margin-left':'20px','margin-top':'7px','text-align':'center'});
				loadSaveConfig(); saveFileType(); });	
		}
	}else if(sub=="delete"){
				$("#configPopUp").empty().load("pages/ConfigEditor/deleteConfig.html", function(){
				$('span.ui-dialog-title').text('Delete Configuration');
				$('.ui-dialog-title').css({'margin-left':'20px','margin-top':'7px','text-align':'center'});
				loadDeleteConfig();});
	}

	//VIEW OPTIONS MENU
	else if(sub=="customview"){
		$("#configPopUp").empty().load("pages/ConfigEditor/customView.html");
		setTimeout(function(){
			$('span.ui-dialog-title').text('CUSTOM VIEW');
			$('.ui-dialog-title').css({'margin-left':'20px','margin-top':'7px','text-align':'center'});
			checkCustomView();
		},1000);
	}else if(sub=="edit"){
		$("#configPopUp").empty().load("pages/ConfigEditor/editGrid.html", function(){	$(".ui-dialog").position({ my: "center",at: "center", of: window});
			$('span.ui-dialog-title').text('EDIT GRID');
			$('.ui-dialog-title').css({'margin-left':'20px','margin-top':'7px','text-align':'center'});
});
	}
	//SHOW ACTIVITY SUBMENU
	else if(sub=="start"){
		if(deviceArr ==[] || deviceArr.length == 0){
			alertUser("No device on canvas.");return;
		}else{
			for(var a=0; a<deviceArr.length; a++){
				if(deviceArr[a].Status.toLowerCase()=="reserved"){
					if(StartReservation==true){startRes('start');return;}
					else{ alertUser("No Start Reservation has been saved.");return;}
				}else{ alertUser("Device/s should be committed.");return;}
			}
		}return;
	}else if(sub=="end"){
		if(deviceArr ==[] || deviceArr.length == 0){
			alertUser("No device on canvas.");return;
		}else{
			for(var a=0; a<deviceArr.length; a++){
				if(deviceArr[a].Status.toLowerCase()=="reserved"){
					if(EndReservation==true){startRes('end');return;}
					else{ alertUser("No End Reservation has been saved.");return;}
				}else{ alertUser("Device/s should be committed.");return;}
			}
		}return;
	}else if(sub=="conn"){
		if(deviceArr ==[] || deviceArr.length == 0){
			alertUser("No device on canvas.");return;
		}else{
			for(var a=0; a<deviceArr.length; a++){
				if(deviceArr[a].Status.toLowerCase()=="reserved"){
					if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString()=="true"){
						loadResultTable('connectivity');
						return;
					}else{ alertUser("Connectivity is disabled.");return;}
				}else{ alertUser("Device/s should be committed.");return;}
			}
		}
	}else if(sub=="devsan"){
		if(deviceArr ==[] || deviceArr.length == 0){
			alertUser("No device on canvas.");return;
		}else{
			for(var a=0; a<deviceArr.length; a++){
				if(deviceArr[a].Status.toLowerCase()=="reserved"){
					if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DeviceSanity.toString()=="true"){
						loadResultTable('deviceSanity');
						return;
					}
					else{ alertUser("Device Sanity is disabled.");return;}
				}else{ alertUser("Device/s should be committed.");return;}
			}
		}
	}else if(sub=="enport"){
		if(deviceArr ==[] || deviceArr.length == 0){
			alertUser("No device on canvas.");return;
		}else{
			for(var a=0; a<deviceArr.length; a++){
				if(deviceArr[a].Status.toLowerCase()=="reserved"){
					if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString()=="true"){
						loadResultTable('enableint');
						return;
					}else{ alertUser("Enable Interface is disabled.");return;}
				}else{ alertUser("Device/s should be committed.");return;}
			}
		}
	}else if(sub=="linksan"){
		if(deviceArr ==[] || deviceArr.length == 0){
			alertUser("No device on canvas.");return;
		}else{
			for(var a=0; a<deviceArr.length; a++){
				if(deviceArr[a].Status.toLowerCase()=="reserved"){
					if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString()=="true"){
						loadResultTable('linksanity');
						return;
					}else{ alertUser("Link Sanity is disabled.");return;}
				}else{ alertUser("Device/s should be committed.");return;}
			}
		}
	}else if(sub=="linksan_run"){
		if(deviceArr ==[] || deviceArr.length == 0){
			alertUser("No device on canvas.");return;
		}else{
			for(var a=0; a<deviceArr.length; a++){
				if(deviceArr[a].Status.toLowerCase()=="reserved"){
					if(window['variable' + ConnectivityFlag[pageCanvas] ].toString()=="true"){
						window['variable' + SanityFlag[pageCanvas] ]="true";
						linkSanRunValid();
						return;
					}else{ alertUser("Link Sanity is not allowed to run.");return;}
				}else{ alertUser("Device/s should be committed.");return;}
			} 
		}
		return;
	}else if(sub=="linksan_result"){
		if(deviceArr ==[] || deviceArr.length == 0){
			alertUser("No device on canvas.");return;
		}else if (globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "false"){
			alertUser("No Running Sanity"); 
			return;
		}else{
			for(var a=0; a<deviceArr.length; a++){
				if(deviceArr[a].Status.toLowerCase()=="reserved"){
					if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString()=="true"){
						loadResultTable('linksanity');
						return;
					}else{ alertUser("No Runnning Sanity.");return;}
				}else{ alertUser("Device/s should be committed.");return;}

			}
		}
	}else if(sub=="access"){
		if(deviceArr ==[] || deviceArr.length == 0){
			alertUser("No device on canvas.");return;
		}else{
			for(var a=0; a<deviceArr.length; a++){
				if(deviceArr[a].Status.toLowerCase()=="reserved"){
					if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity.toString()=="true"){
						loadResultTable('accessSanity');
						return;
					}else{ alertUser("Access Sanity is disabled.");return;}
				}else{ alertUser("Device/s should be committed.");return;}
			}
		}
	}

	//DEVICE M-theme="c" style="min-width: 300px;"ENU
	else if(sub=="deviceMenu"){
		$("#deviceMainList").hide();
		$("#deviceDeviceMenu").show();
		$("#go-Back").show();
		$('span.ui-dialog-title').text('DEVICE MENU');
		return;
    }
    else if(sub=="toolsMenu"){
		$("#deviceMainList").hide();
		$("#deviceToolsMenu").show();
		$('#deviceToolsMenuMain').show();
		$("#go-Back").show();
		$('span.ui-dialog-title').text('TOOLS MENU');
		return;
    } else if(sub=="toolsMenuPopup_LinkSantity"){
		$("#deviceToolsMenuMain").hide();
		$("#linkSanitySubmenu_popup").show();
		$('#go-Back').show();
		return;
    }

    else if(sub=="logsMenu"){
		$("#logsList").click(function(){
			$("#deviceMainList").hide();
			$("#deviceLogsMenu").show();
			$('#deviceLogsMain').show();
			$('#go-Back').show();
			$('span.ui-dialog-title').empty().text('LOGS MENU');
				var allline = [];
		    	for(var t=0; t<devicesArr.length ; t++){
			        allline = gettargetmap(devicesArr[t].ObjectPath,allline);
				}
				if(allline.length!=0){
					$('#logsConnectivity').show();
					$('#logsLinkSanity').show();
				}else{
					$('#logsConnectivity').hide();
					$('#logsLinkSanity').hide();
				}
			
		});
		setTimeout(function(){
			$("#logsDevice").click(function(){
				$("span.ui-dialog-title").text("DEVICE LOGS");
				$("#logsDeviceMain").show();
				$("#deviceLogsMain").hide();
				showDeviceLogs();
			});
		}, 1000);
		//go to Logs>>Connectivity Logs
		setTimeout(function(){
			$("#logsConnectivity").click(function(){
				$("#logsConnectivityMain").show();
				$("#deviceLogsMain").hide();
				$('span.ui-dialog-title').text('CONNECTIVITY LOGS');
				showConnectivityLogs();
			});
		}, 1000);
		setTimeout(function(){
			$("#logsLinkSanity").click(function(){
				$("#logsLinkSanityMain").show();
				$("#deviceLogsMain").hide();
				$('span.ui-dialog-title').text('LINK SANITY LOGS');
				showLinkSanityLogs();
			});
		}, 1000);
		return;
    }
	$("#configPopUp").dialog({
		modal: true,
		width: "auto",
		autoResize: true,
		maxHeight: 500,
		open: function(event, ui){
			$(this).parent().css('position', 'fixed');
		},
		open: function(event, ui) { $(".ui-dialog-titlebar-close").show(); }
	});

}
/*
 * 	FUNCTION NAME	:	testbedOptionSave()	
 *	AUTHOR			:	Anna Marie Paulo
 *	DATE			:	March 12, 2014
 *	MODIFIED BY		:
 *	REVISION DATE	:
 *	REVISION #		:
 *	DESCRIPTION		:	popUp for loading testbed option
 * 	PARAMETERS		:
 */

function testbedOptionSave(){
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}

    $("#deviceMenuPopUp").dialog({
        modal: true,
        width: "auto",
        autoResize: true,
        maxHeight: 500,
        open: function(event, ui){
            $(this).parent().css('position', 'fixed');
        },
		open: function(event, ui) { $(".ui-dialog-titlebar-close").show(); }
    });
    $("#deviceMenuPopUp").empty().load("pages/ConfigEditor/testbedOption.html", function(){
        window['variable' + DeviceSanity[pageCanvas] ] = "true";
        for(var a=0; a<devicesArr.length; a++){
            if(devicesArr[a].DeviceName == "" || devicesArr[a].Status.toLowerCase() != ""){
                $("#bothTbID").remove();
                $("#staticTbID").remove();
                tbSelectOption();
            }else{
                $("#bothTbID").remove();
                $("#staticTbID").remove();
                $("#fileTypeSelectID").prepend("<option value='both' id='bothTbID'>Both</option> <option value='static' id='staticTbID'>Static</option>");
                tbSelectOption();
            }
        }
        for(var b=0; b<window['variable' + dynamicLineConnected[pageCanvas]].length; b++){
            if(window['variable' + dynamicLineConnected[pageCanvas]][b].DestinationDeviceObjectPath != "" || window['variable' + dynamicLineConnected[pageCanvas]][b].SourceDeviceObjectPath != ""){
                $("#checkenableint").attr("disabled", false);
                $("#checkconnectivity").attr("disabled", false);
                $("#checklinksanity").attr("disabled", false);
                $("#checkportmapping").attr("disabled", false);
                $("#checktgenconfig").attr("disabled", false)

            }else{
                $("#checkenableint").attr("disabled", true);
                $("#checkconnectivity").attr("disabled", true);
                $("#checklinksanity").attr("disabled", true);
                $("#checkportmapping").attr("disabled", true);
                $("#checktgenconfig").attr("disabled", true)
            }
        }
/*		if(lineConnected==[] || lineConnected.length==0){
            $("#checkenableint").attr("disabled", true);
            $("#checkconnectivity").attr("disabled", true);
            $("#checklinksanity").attr("disabled", true);
            $("#checkportmapping").attr("disabled", true);
            $("#checktgenconfig").attr("disabled", true)
        }*/
        if(window['variable' + DeviceSanity[pageCanvas] ].toString()=="true")$("#checkdevsanity").prop('checked', true);
        if(Commit=="true")$("#checkcommit").prop('checked',true);


        $(".ui-dialog").position({
            my: "center",
            at: "center",
            of: window
        });
    });
    return;


}
/*
 * 	FUNCTION NAME	:	hardwareInfo()	
 *	AUTHOR			:	Anna Marie Paulo
 *	DATE			:	March 12, 2014
 *	MODIFIED BY		:
 *	REVISION DATE	:
 *	REVISION #		:
 *	DESCRIPTION		:	popUp for loading hardware info 
 * 	PARAMETERS		:
 */

function hardwareInfo(){
	var info="";
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}

	$("#hardDivPopup").dialog({
		modal: true,
		width: "auto",
		autoResize: true,
		maxHeight: 500,
		open: function(event, ui){
			$(this).parent().css('position', 'fixed');
		}
	});

	$("#hardDivPopup").empty().load("pages/ConfigEditor/hardwareInfor.html", function(){
		for(var a=0; a<devicesArr.length; a++){
			if(devicesArr[a].DeviceName != ""){
				var host=devicesArr[a].DeviceName;}
			else{
				var host="N/A";}
			if(devicesArr[a].Model != ""){
				var model = devicesArr[a].Model;}
			else{
				var model="N/A";}
			if(devicesArr[a].ConsoleIp != ""){
				var console = devicesArr[a].ConsoleIp;}
			else{
				var console = "N/A";}
			if(devicesArr[a].ManagementIp != ""){
				var mngt = devicesArr[a].ManagementIp;}
			else{
				var mngt = "N/A";}
			info += "<tr><td><input type='checkbox' class='hardwareCheckbox' onclick='filterPopUp();'></td>";	
			info += "<td>"+host+"</td>";
			info += "<td>"+model+"</td>";
			info += "<td>"+console+"</td>";
			info += "<td>"+mngt+"</td>";
		}
		$("#hardwareBody").html(info);
		$(".ui-dialog").position({
		    my: "center",
	    	at: "center",
	    	of: window
		});
	});
}
/*
 * FUNCTION NAME   :   tbSelectOption()
 * AUTHOR          :   Anna Marie Paulo
 * DATE            :   March 15, 2014
 * MODIFIED BY     :
 * REVISION DATE   :
 * REVISION #      :
 * DESCRIPTION     :   get selected option for testbed
 * PARAMETERS      :
 */

function tbSelectOption(){
    var tbOption = document.getElementById("fileTypeSelectID");
    var tbOption2=tbOption.options[tbOption.selectedIndex].value;
    var nameSplit = Name.split('.');
    if(tbOption2 == 'static'){
        Name = nameSplit[0]+".stat";
        $("#hardwareInfo").hide();
    }else if(tbOption2 == 'dynamic'){
        Name = nameSplit[0]+".dyn";
        $("#hardwareInfo").show();
    }else if(tbOption2 == 'both'){
        Name = nameSplit[0]+".dyn";
        $("#hardwareInfo").hide();
    }
    $("#topoName").val(Name);
}

/*
 * 	FUNCTION NAME	:	saveFileType()	
 *	AUTHOR			:	Anna Marie Paulo
 *	DATE			:	February 14, 2014
 *	MODIFIED BY		:
 *	REVISION DATE	:
 *	REVISION #		:
 *	DESCRIPTION		:	function for showing the different extension files 
 * 	PARAMETERS		:
 *
 */
function saveFileType(val){
	var select=document.getElementById("saveConfFileType");
	var selectedValue=select.options[select.selectedIndex].value;
	var tb=document.getElementById("saveConfFileTypeDBType");
	var tbValue=tb.options[tb.selectedIndex].value;
	var nameSplit = Name.split('.');
	var fileExt=document.getElementById("saveConfFileTypeFileExt");
	var ext = fileExt.options[fileExt.selectedIndex].value;
	
	if(selectedValue=="file"){
		if(tbValue=="testBed"){
			$(".fileType").show();
			$("#saveConfFileType").show();
			$(".testBed").hide();
			$(".dbType").hide();
			$("#okSaveConf").hide();
		}
		else{
			$(".fileType").show();
			$(".dbType").hide();
			$(".testBed").hide();
			$("#okSaveConf").hide();
		}
	}
	else if(selectedValue=="database"){
		$(".fileType").hide();
		$(".dbType").show();
		$("#okSaveConf").show();
	}
	if(selectedValue=="database"){
		if(tbValue == 'static'){
			Name = nameSplit[0]+".stat";
		}else if(tbValue == 'dynamic'){
			Name = nameSplit[0]+".dyn";
		}else if(tbValue == 'testbed'){
			Name = nameSplit[0]+".tb";
		}else if(tbValue == 'both'){
			Name = nameSplit[0]+".dyn";
		}
		$("#saveConfFileName").val(Name);
	}else if(selectedValue=="file" && (tbValue == "dynamic" || tbValue=="both")){
		if(ext=='xml'){
			Name = nameSplit[0]+".xml";
		}else if(ext=='titan'){
			Name = nameSplit[0]+".titan";
		}else if(ext=='topo'){
			Name = nameSplit[0]+".topo";
		}
		$("#saveConfFileName").val(Name);
	}
	if(tbValue=="testbed"){
		if(selectedValue=="file"){
			$(".fileType").show();
			$("#saveConfFileType").show();
			$(".testBed").hide();
			$(".dbType").hide();
			$("#okSaveConf").hide();
		}
		else{
			$(".testBed").show();
			$("#saveConfFileType").show();
			$(".fileType").hide();
			$(".dbType").show();
			$("#okSaveConf").show();
		}
	}else{
		$(".testBed").hide();
	}
}

/*
 * 	FUNCTION NAME	:	cancelPopup()	
 *	AUTHOR			:	Anna Marie Paulo
 *	DATE			:	February 13, 2014
 *	MODIFIED BY		:
 *	REVISION DATE	:
 *	REVISION #		:
 *	DESCRIPTION		:	closes all dialog boxes in menu
 * 	PARAMETERS		:
 *
 */
function cancelPopup(){
	$("#configPopUp").dialog('destroy');
	return;
}
function cancelHardware(){
	$("#hardDivPopup").dialog('destroy');
	return;
}
function cancelstartEndReserve(flag,mainMenuFlag){
	if(flag=="start"){
		StartReservation="false";
		$("#comOpStartRes").prop('checked', false);
	}else{
		EndReservation="false";
		$("#comOpEndRes").prop('checked', false);
	}
	if(globalDeviceType == "Mobile"){
		if(flag=="start" && mainMenuFlag==undefined){
			changePageWithTimeout('commitOptions','comOpStartRes',false);
		}else if(flag=="end" && mainMenuFlag==undefined){
			changePageWithTimeout('commitOptions','comOpEndRes',false);
		}else{
			toConfig();
		}
	}else{
		$("#startEndReserve").dialog('destroy');
	}
	return;
}
function cancelPopupSanity(){
	$('#configPopUp').empty();
	$("#configPopUp").dialog('destroy');
	window['variable' + SanityFlag[pageCanvas] ] = false;
	return;
}
function cancelPowerAlert(){
	$("#deviceMenuPopUp").dialog('destroy');
	return;
}
function cancelConPowerPopup(type){
	if(type=='img'){
		$("#imgconIDOn").prop('checked', false);
		$("#imgconIDCycle").prop('checked', false);
	}else{
		$("#devconIDOff").prop('checked',false);
		$("#devconIDOn").prop('checked', false);
		$("#devconIDCycle").prop('checked', false);
	}
	$("#divAlert").dialog('destroy');
	return;
}
function cancelPowerInfo(){
	clearInterval(MyRefresh);
	MyRefresh = "";
	$("#configPopUp").dialog('destroy');
	if(globalDeviceType == "Mobile"){
		toConfig();
	}
	return;
}

/*
 * 	FUNCTION NAME	:	getSaveFileType()	
 *	AUTHOR			:	Anna Marie Paulo
 *	DATE			:	February 13, 2014
 *	MODIFIED BY		:
 *	REVISION DATE	:
 *	REVISION #		:
 *	DESCRIPTION		:	
 *	PARAMETERS		:
 *
 */

function getSaveFileType(origin){
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}

	var filenameValue = document.getElementById("saveConfFileName").value;
	var data=document.getElementById("saveConfFileType");
	var dataFile=data.options[data.selectedIndex].value;

	var db=document.getElementById("saveConfFileTypeDBType");
	var dbType=db.options[db.selectedIndex].value;
	
	var file=document.getElementById("saveConfFileTypeFileExt");
	var fileType=file.options[file.selectedIndex].value;
	if(origin=='save'){
		var error="";	
		for(var a=0; a<devicesArr.length; a++){
			var devName = devicesArr[a].HostName;
			if(devicesArr[a].HostName=="" && dataFile != "database"){
				error += devicesArr[a].ObjectPath+"<br/>";
			}
		}
		if(error!=""){
			alertUser("The following devices can only be save on database.<br/><br/>"+error+"");
			return;
		}
	}
	if(dataFile=="database" && dbType=="dynamic"){
		saveConfigtoDB(filenameValue, "dynamic");
	}else if(dataFile=="database" && dbType=="testbed"){
		saveConfigtoDBTestbed(filenameValue);
	}else if(dataFile=="database" && dbType=="static"){
		saveConfigtoDB(filenameValue, "static");
	}else if(dataFile=="file" && fileType=="topo"){
		if(origin=='save'){
			if(Application == "" || Application == undefined){
				createTopo();return;
			}else{
				if(Application.toLowerCase() == 'topo' && devName != ""){
					createTopo();
					return;
				}else{
					alert("Please save on the same file as the Load Configuration");
					return;
				}
			}
		}else if(origin=='saveAs'){
			createTopo();return;
		}
	}
	else if(dataFile=="file" && fileType=="titan"){
		if(origin=='save'){
			if(Application=="" || Application == undefined){
				createTitan();
			}else{
				if(Application.toLowerCase() == 'titan' && devName != ""){
					createTitan();
					return;
				}else{ 
					alert("Please save on the same file as the Load Configuration"); return;
				}
			}
		}else if(origin=='saveAs'){
			createTitan(); return;
		}
	}
	else if(dataFile=="file" && fileType=="xml"){
		if(origin=='save'){
			if(Application == "" || Application == undefined){
				downloadFileWeb('xml');return;
			}else{
				if(Application.toLowerCase() == 'xml' && devName != ""){
					downloadFileWeb('xml');
					return;
				}else{
					alert("Please save on the same file as the Load Configuration"); return;
				}
			}
		}else if(origin=='saveAs'){
			downloadFileWeb('xml');
		}
	}
	$("#configPopUp").dialog('destroy');
	return;
}
/*
 * 	FUNCTION NAME	:	saveDiagram()	
 *	AUTHOR			:	Anna Marie Paulo
 *	DATE			:	February 13, 2014
 *	MODIFIED BY		:
 *	REVISION DATE	:
 *	REVISION #		:
 *	DESCRIPTION		:	dialog box for Config SubMenu 
 * 	PARAMETERS		:
 *
 */

function saveDiagram(){
	var x="";
	var y=confirm("Save diagram as JPEG?");
	var canvas=$("canvas");

	if(y==true){
		$("#configPopUp").dialog({
			modal: true,
			width: "auto",	
			autoResize: true,
			maxHeight: 500,
			open: function(event, ui) { $(".ui-dialog-titlebar-close").show(); }
		});
		$("#configPopUp").empty().load("pages/ConfigEditor/diagramFilename.html");
		$('span.ui-dialog-title').text('SAVE DIAGRAM');	
		$(".ui-dialog").position({
    	    my: "center",
        	at: "center",
	        of: window
	   	});	
	}
	return;
}
/*
 * 	FUNCTION NAME	:	getToolTip	
 *	AUTHOR			:	James Turingan
 *	DATE			:	February 17, 2014
 *	MODIFIED BY		:
 *	REVISION DATE	:
 *	REVISION #		:
 *	DESCRIPTION		:	tool tip for table
 * 	PARAMETERS		:
 *
 */
function getToolTip(row,type){
	var html='';
	var InfoType = "JSON";
    if(InfoType == "XML"){
		if(type != 'port'){
			var child = row.childNodes[1];
			html +="<li>HostName: "+row.getAttribute('HostName');+"</li>";
			html +="<li>Model: "+row.getAttribute('Model');+"</li>";
			html +="<li>Management IP: "+row.getAttribute('ManagementIp');+"</li>";
			html +="<li>Console IP: "+row.getAttribute('ConsoleIp');+"</li>";
//			html +="<li>Break Out: "+child.getAttribute('BreakOut');+"</li>";
//			html +="<li>Switch Information: "+child.getAttribute('SwitchInfo');+"</li>";
		}else{
			html +="<li>PorttName: "+row.getAttribute('Ports');+"</li>";
			html +="<li>Speed: "+row.getAttribute('Speed');+"</li>";
			if(row.getAttribute('Type') != null){
			}
		}
	}else{
		if(type != 'port'){
	        html +="<li>HostName: "+row.HostName+"</li>";
    	    html +="<li>Model: "+row.Model+"</li>";
        	html +="<li>Management IP: "+row.ManagementIp+"</li>";
	        html +="<li>Console IP: "+row.ConsoleIp+"</li>";		
		}else{
    	    html +="<li>PorttName: "+row.Ports+"</li>";
    	    html +="<li>Speed: "+row.Speed+"</li>";
	        if(row.Type!= null){
	        }
    	}
	}
	return html;
}

/*
 * 	FUNCTION NAME	:	hoverTable
 *	AUTHOR			:	James Turingan
 *	DATE			:	February 17, 2014
 *	MODIFIED BY		:
 *	REVISION DATE	:
 *	REVISION #		:
 *	DESCRIPTION		:	shows the tool tip in table
 * 	PARAMETERS		:
 *
 */

function hoverTable(type){
	var id = '';	
	$('.toolTip').hover(
		function(){
			id = $(this).attr('did').split('td');
			$('#divtoolTip'+id[1]).show();
		},
		function(){
			id = $(this).attr('did').split('td');
			$('#divtoolTip'+id[1]).hide();
		}
	);
}

/*
 * FUNCTION NAME	:	enableDisable
 * AUTHOR			:	Anna Marie Paulo
 * DATE				:	February 18, 2014
 * MODIFIED BY		:
 * REVISION DATE	:
 * REVISION #		:
 * DESCRIPTION		:	enable/disables filter and time picker
 * PARAMETERS		:
 */
function enableDisable(val, type){
	if(val=="enable"){
		if(type=="filter"){
			enDisFilter = true;
			alert("Filter is successfully enabled");
			$("#enableFilter").addClass("activeIcon");
			$("#disableFilter").removeClass("activeIcon");
		}else if(type=="picker"){
			enDisTimepicker = true;
			alert("Time picker is successfully enabled");
			$("#enablePicker").addClass("activeIcon");
			$("#disablePicker").removeClass("activeIcon");
		}else if(type=="debug"){
			window['variable' + dynamicDebug[pageCanvas] ]  = "true";
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DebugMode = "true";
			alert("Debug mode is successfully enabled");
			$("#enableDebug").addClass("activeIcon");
			$("#disableDebug").removeClass("activeIcon");
		}
	}else{
		if(type=="filter"){
			enDisFilter = false;
			alert("Filter is successfully disabled");
			$("#disableFilter").addClass("activeIcon");
			$("#enableFilter").removeClass("activeIcon");
		}else if(type=="picker"){
			enDisTimepicker = false;
			alert("Time Picker is successfully disabled");
			$("#disablePicker").addClass("activeIcon");
			$("#enablePicker").removeClass("activeIcon");
		}else if(type=="debug"){
			window['variable' + dynamicDebug[pageCanvas] ]  = "false";
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DebugMode = "false";
			alert("Debug Mode is successfully disabled");
			$("#disableDebug").addClass("activeIcon");
			$("#enableDebug").removeClass("activeIcon");
		}
	}
}

/*
* FUNCTION NAME		:	downloadFileWeb
* AUTHOR			:	Anna Marie Paulo
* DATE				:	February 18, 2014
* MODIFIED BY		:
* REVISION DATE	:
* REVISION #		:
* DESCRIPTION		: 	download file in different types(for WEB used only)
* PARAMETERS		:	ext
*/
function downloadFileWeb(ext){
	var text = getStringJSON(globalMAINCONFIG[pageCanvas]);
	var filename = document.getElementById("saveConfFileName").value;
	var blob = new Blob([text], {type: "text/plain;charset=utf-8"});

	var splitfile=filename.split(".");
	if(splitfile.length==1){
		if(ext=="titan"){
			saveAs(blob, filename+".titan");
		}
		else if(ext=="topo"){
			saveAs(blob, filename+".topo");
		}
		else{
			saveAs(blob, filename+".xml");
		}
	}else{
		if(ext=="titan"){
			saveAs(blob, filename);
		}
		else if(ext=="topo"){
			saveAs(blob, filename);
		}
		else{
			saveAs(blob, filename);
		}
	}
	$("#configPopUp").dialog('destroy');
}

/*
* FUNCTION NAME		:	editGrid
* AUTHOR			:	Anna Marie Paulo
* DATE				:	February 18, 2014
* MODIFIED BY		:
* REVISION DATE	:
* REVISION #		:
* DESCRIPTION		: 	resize grid 
* PARAMETERS		:	
*/
function editGrid(){
	var size=document.getElementById("gridsize").value;
	clearGrid=true;
	showGrid(size);
	$("#configPopUp").dialog('destroy');
	return;
}

/* FUNCTION NAME   :   convertCanvastoImage()
   AUTHOR          :   Anna Marie Paulo
   DATE            :   February 19, 2014
   MODIFIED BY     :
   REVISION DATE   :
   REVISION #      :
   DESCRIPTION     :   get image on canvas
   PARAMETERS      :
*/
function convertCanvastoImage(){
    var filename=document.getElementById("filename").value;
    var canvas=document.getElementById("canvasID"+pageCanvas);
    canvas.toBlob(function(blob){
	    saveAs(blob, filename +".jpg");
    }, "image/jpg");
    $("#configPopUp").dialog('destroy');
	return;
}
/* FUNCTION NAME   :   showTools()
 * AUTHOR          :   Anna Marie Paulo
 * DATE            :   February 19, 2014
 * MODIFIED BY     :
 * REVISION DATE   :
 * REVISION #      :
 * DESCRIPTION     :   show popup for device tools
 * PARAMETERS      :
 */

function showTools(){
	$("#linkSanity").mouseover(function(){
        $("#subLinkSanity").show();
    });
    $("#softImg").mouseover(function(){
        $("#subSoftImg").show();
    });
    $("#config").mouseover(function(){
        $("#subConfig").show();
    });
	return;
}


/*
 *FUNCTION NAME : emailOption()
 *AUTHOR        :Mary Grace P. Delos Reyes
 *DATE          :March 26, 2014
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #     :
 *DESCRIPTION   :
 *PARAMETERS    :
*/

function emailOption(){
	$( "#emailPopup" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		open: function(event, ui){ 
			$(".ui-dialog-titlebar-close").show();
			$('.ui-button-text').click(function(){clearInterval(sentInt);});
		}
		});
		$(document).on("click", "#sendTo", function(){
		$('#sendTo').show();
		$('#sendCc').show();
		});
	$("#emailPopup").empty().load("pages/ConfigEditor/emailOption.html",function (){
		$('span.ui-dialog-title').text('Email');
		setTimeout(function(){
			$(".ui-dialog").position({
				my:"center",
				at:"center",
				of:window
				});
			},1000);
			getEmail();
			$("#emailAccount").multiselect();
			$("#emailAccountCC").multiselect();
			getOnlineUsers();	
			$("#user").multiselect();
//			$("#groups").multiselect();
//			$("#deviceLogs").multiselect();

		});
}

/*
 *FUNCTION NAME : attach()
 *AUTHOR        :Mary Grace P. Delos Reyes
 *DATE          :March 26, 2014
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #     :
 *DESCRIPTION   :
 *PARAMETERS    :
*/

function attach(){
//	var file = document.getElementById("").value;
//	var	blob= new Blob ([text], {type: "text/plain;charset=utf-8"});
//			saveAs(blob, text+"NFast.txt");	
	$('#fileattach').show();
	if($('#fileattach').is(':visible')){
		$('#addAttach').hide();
		$('#cancelattach').show();
	}
	$(document).on("click", "#cancelattach", function(){
		$('#addAttach').show();
		$('#fileattach').hide();
		$('#cancelattach').hide();

	});

}
/*
 *FUNCTION NAME : sendEmail()
 *AUTHOR        :Mary Grace P. Delos Reyes
 *DATE          :March 26, 2014
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #     :
 *DESCRIPTION   :
 *PARAMETERS    :
*/

function sendEmail(){
	var userTo = $('#sendTo').val();
	var cc = $('#sendCc').val();
	var subject =$('#Subject').val();
	var msg =$('#emailMsg').val(); 
	var url ="https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/FastConsoleCgi.py?action=sendemail&query={'QUERY': [{'userFrom':'"+globalUserName+"','cc':'"+cc+"','userTo':'"+userTo+"','msg':'"+msg+"','subject':'"+subject+"'}]}";

  $.ajax({
        url: url,
        dataType: 'html',
        method: 'POST',
        proccessData: false,
        async:false,
        success: function(data) {
            data = $.trim(data);
			var data = data.replace(/'/g,'"');
			var json = $.parseJSON(data);
			var msg = json.RESULT[0].Result;
			alerts(msg);
			$("#consolePopUpClose").dialog();	
		}
			
	});	
}

/*
 *FUNCTION NAME : getEmail()
 *AUTHOR        :Mary Grace P. Delos Reyes
 *DATE          :March 26, 2014
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #     :
 *DESCRIPTION   :
 *PARAMETERS    :
*/


var globalparsedjson = [];
function getEmail(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/FastConsoleCgi.py?action=emailList";

	 $.ajax({
		 url: url,
		 dataType: 'html',
		 method: 'POST',
 		 proccessData: false,
		 async:false,
	 	success: function(data) {
 		   var dat = data.replace(/'/g,'"');
			globalparsedjson = dat
            var json = jQuery.parseJSON(dat);
            var parsed = json.RESULT[0].Email;
			var	w = parsed.split(",");
			var	str='';
	 		for(var i=0; i< w.length; i++){
				str+="<option >"+w[i]+"</option>"
				console.log("email",str);
			}
			$('#emailAccount').empty().append(str);			 	
			$('#emailAccountCC').empty().append(str);
		}
		
	});	
}

/*
 *FUNCTION NAME :hideChat()
 *AUTHOR        :Mary Grace P. Delos Reyes
 *DATE          :March 19, 2014
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #     :
 *DESCRIPTION   :
 *PARAMETERS    :
*/

function hideChat(){
	$(document).on("click","#hideChat", function(){
		if(ChatMax==true){
			$('#chatTableMainDiv').hide();
			ChatMax=false;
		}else{
			$('#chatTableMainDiv').show();
			ChatMax=true;
			}
			
		});
}

/*
 *FUNCTION NAME :deviceQstr()
 *AUTHOR        :Mary Grace P. Delos Reyes
 *DATE          :March 19, 2014
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #     :
 *DESCRIPTION   :
 *PARAMETERS    :
*/
function deviceQstr(device){
	var devicesStr = "[";
	for(var t=0; t<device.length; t++){
		if(t == device.length - 1){
			devicesStr += "{ 'DeviceId':'"+device[t].DeviceId+"','Type': '"+device[t].Type+"' }";
		}else{
			devicesStr += "{ 'DeviceId':'"+device[t].DeviceId+"','Type': '"+device[t].Type+"' },";
		}
	}
	devicesStr += "]";
	return devicesStr;		  
}

/*######################################################################
 *
 *FUNCTION NAME	: createGroup
 *DATE CREATED	: March 8,2014
 *AUTHOR		: Angeline Bringas
 *MODIFIED BY	:
 *REVISION DATE	:
 *REVISION NO.	:
 *DATE MODIFIED	:
 *DESCRIPTION	: enables the user to add group
 *PARAMETERS	: none
 *
 * #####################################################################
 */

function createGroup(){
	$('#groups').show();
	$('.addtogroup').show();
	$('#createdgroups').hide();
}
/*######################################################################
 *
 *FUNCTION NAME	: getOnlineUsers
 *DATE CREATED	: March 8,2014
 *AUTHOR		: Angeline Bringas
 *MODIFIED BY	:
 *REVISION DATE	:
 *REVISION NO.	:
 *DATE MODIFIED	:
 *DESCRIPTION	:function to load active users
 *PARAMETERS	:none
 *
 * #####################################################################
 */
function getOnlineUsers(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/FastConsoleCgi.py?action=getuseronline";
//	var url = getURL('Console', 'JSON')+action=getuseronline;

	$.ajax({
		url: url,
		dataType:'html',
		async: false,
		success: function(data){
			data = $.trim(data);
			var str = "";
		/*	var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(data, "text/xml");
			var row = xmlDoc.getElementsByTagName("row");*/
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

			for(var i = 0; i < json.data[0].row.length; i++){
				var name = json.data[0].row[i].Name;	
				str += "<li style='font-size:12px;list-style:none;cursor:pointer;text-align:left;margin-left:4px;' class='activeUser'><input type='checkbox' class='addtogroup' style='display:none;' value='"+name+"' />"+name+"</li>"
			}
			if(globalDeviceType=="Mobile"){
				$('#listonline').html(str);	
			}else{
				$('#onlineUser').empty().append(str);
				$("#user").multiselect();
			}
		}
	});
}
/*######################################################################
 *
 *FUNCTION NAME	: addUserToGroup
 *DATE CREATED	: March 8,2014
 *AUTHOR		: Angeline Bringas
 *MODIFIED BY	:
 *REVISION DATE	:
 *REVISION NO.	:
 *DATE MODIFIED	:
 *DESCRIPTION	: function that adds the selected user to group
 *PARAMETERS	: none
 *
 * #####################################################################
 */
function addUserToGroup(){
	var str = "";
	$('.addtogroup').each(function(){
		if($(this).is(':checked')){
			var add = $(this).val();	
			str+= "<li style='font-size:12px;' class='groupmembers'><input type='checkbox' class='checkboxdeleteuser' style='display:none;'/>"+add+"</li>"
		}
	});
	$('#listmembers').html(str);	
}
/*######################################################################
 *
 *FUNCTION NAME	: saveGroup
 *DATE CREATED	: March 8,2014
 *AUTHOR		: Angeline Bringas
 *MODIFIED BY	:
 *REVISION DATE	:
 *REVISION NO.	:
 *DATE MODIFIED	:
 *DESCRIPTION	: function tahe saves created group
 *PARAMETERS	: none
 *
 * #####################################################################
 */
function saveGroup(){
	$('#groups').hide();
	$('#createdgroups').show();
	$('.addtogroup').hide();
	var groupName = new Array();
	$('.groupmembers').each(function(){
		groupName.push($(this).text());
	});
	var url ="https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/FastConsoleCgi.py?action=createSessionId&query={'QUERY':[{'userhost':'"+globalUserName+"','groupname':'"+$('#groupcreatedname').val()+"','usernames':'"+groupName+"'}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data)	{
			data = data.replace(/'/g,'"')
			var json = jQuery.parseJSON(data);
//			data = $.trim(data);
			if(json.RESULT[0].Result == "1"){
				error('Group name successfully added!!');		
				showGroupName();	
			}else if(json.RESULT[0].Result == "0"){
				error("Group name already exist!");
			}
		}
	});
}

/*######################################################################
 *
 *FUNCTION NAME	: getOnlineUsers
 *DATE CREATED	: March 8,2014
 *AUTHOR		: Angeline Bringas
 *MODIFIED BY	:
 *REVISION DATE	:
 *REVISION NO.	:
 *DATE MODIFIED	:
 *DESCRIPTION	:function to load active users
 *PARAMETERS	:none
 *
 * #####################################################################
 */
function searchUser(){
	var val = $('#SearchUser').val();
		$('li').show();
		$('li.activeUser').each(function() {
			if ($(this).text() != val)
			{
				$(this).parent().hide();
			}
		});
}

function deleteUserfromGroup(){
	var url ="https://"+CURRENT_IP+"/cgi-bin/Final/NFast_RM/NFastRMCGI.py?action=deletemember&query={'QUERY':[{'username':'"+globalUserName+"','usertodelete':'groupname':'+$('#groupname')}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		async: false,
		success: function(data){
			data = $.trim(data);
			if(data == "1"){
				error('User deleted!');
			}	
		}
	});
}
function deleteSelectedUser(){
	$('#deleteuser').show();
	$('#createdgroups').hide();
	$('#checkboxdeleteuser').show();
	$('#saveGroup')	.hide();
	$("#deleteUserFromGroup").hide();
	$("#deleteUser").show();
}
function deleteUserToGroup(){
	var str = "";
	$('.addtogroup').each(function(){
		if($(this).is(':checked')){
			var add = $(this).val();	
			str+= "<li class='groupmembers'>"+add+"</li>"
		}
	});
	$('#listmembers').html(str);	
}
/*
 * FUNCTION NAME     :   checkDeviceStatus
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 6, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   validation for config and software device status
 * PARAMETERS        :
 */
function checkDeviceStatus(flag, type){
    var txt1="";
	saveresmain = 1;		
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}
	//if(!checkRunningSanity("saveconfig")){return;}
 	for(var a=0; a<devicesArr.length; a++){
    	if(devicesArr[a].DeviceType.toLowerCase()== "dut" && devicesArr[a].Status.toLowerCase() == "reserved"){
			startRes(flag, type);
        }
        else{
           if(devicesArr[a].DeviceType.toLowerCase() != "dut"){
				txt1 = "Device is not DUT.<br/>";
			}if(devicesArr[a].Status.toLowerCase() != "reserved"){
				txt1 = "Device should be reserved.<br/>";
			}
        }
    }
	if(deviceArr==[] || deviceArr==0){
		if(globalDeviceType == "Mobile"){
			error("No device on canvas.","Notification");
		}else{
			alert("No device on canvas.");
		}
	}
    if(txt1 != "" && (deviceArr!=[] || deviceArr!=0)){
		if(globalDeviceType == "Mobile"){
        	error(txt1,"Notification");
		}else{
        	alert(txt1);
		}
    }
}
/*
 * FUNCTION NAME     :   resultConfigSoftware
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 6, 2014
 * MODIFIED BY       :	 Clarice Salanda
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   show result for load and image save config
 * PARAMETERS        :
 */

function resultConfigSoftware(type){
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}

	var txt="";var txt2="";
	for(var a=0; a<devicesArr.length; a++){
		if(type=="saveImage"){
			if(devicesArr[a].SaveImageUrl != ""){
				$("#configPopUp").empty().load("pages/ConfigEditor/SoftwareResults.html?", function(){
					$("#softwareSaveImageMainDiv").show();
					configImageQuery("saveImage");
				});
			}else{alertUser("No Software Image has been save yet.");return;}
			return;
		}else if(type=="loadImage"){
			if(devicesArr[a].ImageUrl != "" || devicesArr[a].ImageServer != ""){
				loadResultTable('loadImage');
				return;
			}else{
				if(globalDeviceType == "Mobile"){
					error("No Software has been save yet.","Notification");return;
				}else{
					alerts("No Load Image has been save yet.");return;
				}
			}
			return;
		}else if(type=="saveConfig"){
			if(devicesArr[a].SaveConfigUrl != ""){
				$("#configPopUp").empty().load("pages/ConfigEditor/SoftwareResults.html", function(){
					$("#softwareLoadImageMainDiv").show();
					configImageQuery("saveConfig");
					return;
				});
			}else{
				if(globalDeviceType == "Mobile"){
					error("No configuration has been save yet.","Notification");return;
				}else{
					alerts("No configuration has been save yet.");return;
				}
			}
			return;
		}else if(type=="loadConfig"){
			if(devicesArr[a].ConfigUrl != "" || devicesArr[a].ConfigServer != ""){
				loadResultTable('loadConfig');
				return;
			}else{
				if(globalDeviceType == "Mobile"){
					error("No configuration has been save yet.","Notification");return;
				}else{
					alerts("No configuration has been save yet.");return;
				}
			}
			return;
		}
	}
	if(deviceArr==[] ||deviceArr==0){
		if(globalDeviceType == "Mobile"){
			error("No device on canvas.","Notification");
		}else{
			alertUser("No device on canvas.");
		}
		return;
	}
	$("#configPopUp").dialog({
		modal: true,
		width: "auto",
		autoResize: true,
		maxHeight: "auto",
	});
}

/*
 * FUNCTION NAME     :   showPower
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 20, 2014
 * MODIFIED BY       :
 * REVISION DATE	 :
 * REVISION #        :
 * DESCRIPTION       :   show popup for power info
 * PARAMETERS        :
 */
function showPower(){
 	var txt="";
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}
	if(devicesArr==[] || devicesArr==0){
		alertUser("No device on canvas.");
		return;
	}
	for(var a=0; a<devicesArr.length; a++){
        if(devicesArr[a].DeviceType.toLowerCase()=="dut" && devicesArr[a].Status.toLowerCase() == "reserved" && (devicesArr[a].DEVICE[0].ControllerInfo != "" && devicesArr[a].DEVICE[0].ObjectPath != "")){
			$("#configPopUp").empty().load("pages/ConfigEditor/powerInfo.html", function(){
				$('span.ui-dialog-title').text('POWER INFORMATION');
				clearInterval(MyRefresh);
				MyRefresh="";
				powerQuery();
				$(".ui-dialog").position({my: "center",at: "center",of: window});
			});				
        }else{
            if(devicesArr[a].DeviceType.toLowerCase()!="dut"){
				txt = "Device is not DUT.<br/>";
			}if(devicesArr[a].Status.toLowerCase() !="reserved"){
				txt = "Device should be reserved.<br/>";
			}if(devicesArr[a].DEVICE[0].ControllerInfo =="" || deviceArr[a].DEVICE[0].ObjectPath ==""){
				txt = "Device has no power information.<br/>";
			}
        }
    }
    if(txt!= "" && (devicesArr!=[]||devicesArr!=0)){
		alertUser(txt);
		return;
    }
	$("#configPopUp").dialog({
		modal: true,
		width: "90%",
		autoResize: true,
		maxHeight: "auto",
	});
	return;
}
/*
 * FUNCTION NAME     :   powerQuery
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 4, 2014
 * MODIFIED BY       :
 * REVISION DATE	 :
 * REVISION #        :
 * DESCRIPTION       :   query for power info
 * PARAMETERS        :
 */

function powerQuery(){
	var devInfo="";
	var devName=[];
	if(globalInfoType == "JSON"){
        var devicesArr = getDevicesNodeJSON();
	}
	for(var a=0; a<devicesArr.length; a++){
		if(a % 2 == 0){
            tableClass = 'alt';
        }else{
            tableClass = '';
        }
		devName.push(devicesArr[a].DeviceName);
		devInfo += "<tr class='"+tableClass+"'><td>"+devicesArr[a].DeviceId+"</td>"
		devInfo += "<td>"+devicesArr[a].DeviceName+"</td>"
		devInfo += "<td>"+devicesArr[a].ManagementIp+"</td>"
		devInfo += "<td>"+devicesArr[a].ConsoleIp+"</td>"
		devInfo += "<td>"+devicesArr[a].Manufacturer+"</td>"
		devInfo += "<td>"+devicesArr[a].Model+"</td></tr>";
	}
	MyRefresh = setInterval(function(){
	var tdPower="";
	var url= getURL("Power", "JSON");
	var action="getpowerinformation";
//	var query="hostname^"+devName;		
	var query = '{"QUERY": [{"hostname": "'+devName+'"}]}';
	$.ajax({
        url: url,
		data: {
			"action": action,
			"query": query,
		},
        dataType: 'html',
		method: 'POST',
		proccessData: false,
		async:false,
        success: function(data) {
			var data =  data.replace(/'/g,'"');
            var data2 = $.parseJSON(data);
            var stat = data2.MAINCONFIG[0].STATISTICS;
            for(var i=0; i<stat.length; i++){
                tdPower += "<tr class='"+tableClass+"'><td><input type='checkbox' name='powerCheck' id='"+stat[i].HostName+"' value='"+stat[i].ControllerIp+"' class='powerCheck' onclick='powerManButton(\""+stat[i].Status+"\",\""+stat[i].State+"\");'></td>";
                tdPower += "<td>"+stat[i].HostName+"</td>";
                tdPower += "<td>"+stat[i].PowerSupply+"</td>";
                tdPower += "<td>"+stat[i].ControllerName+"</td>";
                tdPower += "<td>"+stat[i].ControllerIp+"</td>";
                tdPower += "<td>"+stat[i].State+"</td>";
                tdPower += "<td>"+stat[i].Status+"</td>";
                tdPower += "<td>"+stat[i].OutletName+"</td>";
                tdPower += "<td>"+stat[i].OutletNumber+"</td>";
                tdPower += "<td>"+stat[i].RMSCurrent+"</td>";
                tdPower += "<td>"+stat[i].RMSVoltage+"</td>";
                tdPower += "<td>"+stat[i].PowerFactor+"</td>";
                tdPower += "<td>"+stat[i].ActivePower+"</td>";
                tdPower += "<td>"+stat[i].ApparentPower+"</td>";
                tdPower += "<td>"+stat[i].ActiveEnergy+"</td>";
                if(stat[i].Status=="Completed"){
                    clearInterval(MyRefresh);
                    MyRefresh = "";
                }
            }
		}

	});
		$("#powerStats").html(tdPower);
	}, 5000);
	$("#devPowerInfo").html(devInfo);
}

/*
 * FUNCTION NAME     :   powerManButton
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 4, 2014
 * MODIFIED BY       :
 * REVISION DATE	 :
 * 
 * REVISION #        :
 * DESCRIPTION       :   validation of power info of device
 * PARAMETERS        :
 */

function powerManButton(statusP,stateP){
	var statusP=$.trim(statusP);
	var stateP=$.trim(stateP);
	if($(".powerCheck").is(":checked")){
		if(statusP.toLowerCase()=="completed" && stateP.toLowerCase()=="on"){
			$("#offID").show();
			$("#cycleID").show();
		}else if(statusP.toLowerCase()=="completed" && stateP.toLowerCase()=="off"){
			$("#onID").show();
		}else if(statusP.toLowerCase()=="failed" && stateP.toLowerCase()=="off"){
			$("#offID").show();
			$("#cycleID").show();
		}else if(statusP.toLowerCase()=="failed" && stateP.toLowerCase()=="on"){
			$("#onID").show();
		}
	}else{
		$("#offID").hide();
		$("#onID").hide();
		$("#cycleID").hide();
	}
}
/*
 * FUNCTION NAME     :   getControllerInfo
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 24, 2014
 * MODIFIED BY       :
 * REVISION DATE	 :
 * REVISION #        :
 * DESCRIPTION       :   
 * PARAMETERS        :
 */

function getControllerInfo(host){
	var ctrlArr=[];
	
	$("input:checkbox[name='powerCheck']").each(function(){
		if($(this).is(":checked") && host == $(this).attr('id')){
			ctrlArr.push($(this).val());
		}
	});
	return ctrlArr;
}
/*
 * FUNCTION NAME     :   powerAlert
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 9, 2014
 * MODIFIED BY       :
 * REVISION DATE	 :
 * REVISION #        :
 * DESCRIPTION       :   
 * PARAMETERS        :
 */

function powerAlert(type){
	$("#deviceMenuPopUp").dialog({
		modal: true,
		width: 250,
		autoResize: true,
		maxHeight: "auto",
		
	});
	$("#deviceMenuPopUp").empty().load("pages/ConfigEditor/powerAlert.html", function(){
		$("span.ui-dialog-title").text("Alert");
		if(type=='offVal'){
			$("#alertForPowerOff").show();
		}else if(type=='onVal'){
			$("#alertForPowerOn").show();
		}else if(type=='cycleVal'){
			$("#alertForPowerCycle").show();
		}
	});
	$(".ui-dialog").position({
		    my: "center",
	    	at: "center",
	    	of: window
	});
}		
/*
 * FUNCTION NAME     :   devconFunctionForOff
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 10, 2014
 * MODIFIED BY       :
 * REVISION DATE	 :
 * REVISION #        :
 * DESCRIPTION       :   
 * PARAMETERS        :
 */

function devconFunction(type){
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}

	$("#divAlert").dialog({
		modal: true,
		width: "auto",
		autoResize: true,
		maxHeight: "auto",
	});
	$("#divAlert").empty().load("pages/ConfigEditor/PopupForPower.html", function(){
		$("#devconPopupMainDiv").show();
		if(type=='offType'){
			$("#imgconPopup").hide();	
			$("#savedevPopup").show();
		}else{
			$("#imgconPopup").hide();
			$("#loaddevPopup").show();
			$("#savedevPopup").show();
		}
		var txt="";var txt2="";
		for(var a=0; a<devicesArr.length; a++){
			txt += "<tr><td><input type='checkbox' onclick='enableText(\""+devicesArr[a].DeviceId+"\", \"check1\");' name='checkName'></td>";
			txt += "<td>"+devicesArr[a].DeviceName+"</td>";
			txt += "<td>"+devicesArr[a].Model+"</td>";
			txt += "<td><input type='text' style='width: 300px;' id='url"+devicesArr[a].DeviceId+"' disabled='disabled'></td></tr>";

			txt2 += "<tr><td><input type='checkbox' onclick='enableText(\""+devicesArr[a].DeviceId+"\", \"check2\");' name='loadCheckName'></td>";
			txt2 += "<td>"+devicesArr[a].DeviceName+"</td>";
			txt2 += "<td>"+devicesArr[a].Model+"</td>";
			txt2 += "<td><input type='text' style='width:300px;' id='lodurl"+devicesArr[a].DeviceId+"' disabled='disabled'></td></tr>";
		}
		$("#devconPopupBody").html(txt);
		$("#loadconPopupBody").html(txt2);

		$(".ui-dialog").position({
		    my: "center",
	    	at: "center",
	    	of: window
		});
	});
}
/*
 * FUNCTION NAME     :   imgconFunctionForOff
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 10, 2014
 * MODIFIED BY       :
 * REVISION DATE	 :
 * REVISION #        :
 * DESCRIPTION       :   
 * PARAMETERS        :
 */

function imgconFunction(){
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}

	$("#divAlert").dialog({
		modal: true,
		width: "auto",
		autoResize: true,
		maxHeight: "auto",
	});
	$("#divAlert").empty().load("pages/ConfigEditor/PopupForPower.html", function(){
		$("#imgconPopup").show();
		var txt1="";
		for(var a=0; a<devicesArr.length; a++){
			txt1 += "<tr><td><input type='checkbox' onclick='enableText(\""+devicesArr[a].DeviceId+"\", \"check3\");' name='imgcheckName'></td>";
			txt1 += "<td>"+devicesArr[a].DeviceName+"</td>";
			txt1 += "<td>"+devicesArr[a].Model+"</td>";
			txt1 += "<td><input type='text' style='width: 300px' id='imgurl"+devicesArr[a].DeviceId+"' disabled='disabled'></td>";
			txt1 += "<td><select disabled='disabled' id='imgdestination"+devicesArr[a].DeviceId+"'><option value='boot-image'>boot-image</option><option value='bootflash'>bootflash</option><option value='bootflash0'>bootflash0</option><option value='bootflash1'>bootflash1</option><option value='flash'>flash</option><option value='flash0'>flash0</option><option value='flash1'>flash1</option><option value='flash2'>flash2</option><option value='disk0'>disk0</option><option value='disk1'>disk1</option><option value='disk2'>disk2</option><option value='slot0'>slot0</option><option value='slot1'>slot1</option><option value='slot2'>slot2</option>/select></td></tr>";
		}
		$("#imgconPopupBody").html(txt1);
		$(".ui-dialog").position({
		    my: "center",
	    	at: "center",
	    	of: window
		});
	});
}
/*
 * FUNCTION NAME     :   enableText
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 10, 2014
 * MODIFIED BY       :
 * REVISION DATE	 :
 * REVISION #        :
 * DESCRIPTION       :   
 * PARAMETERS        :	id, no
 */

function enableText(id, no){
	if(no=='check1'){
	$("input:checkbox[name='checkName']").each(function(){
		if($(this).is(":checked")){
			$("#url"+id+"").attr("disabled", false);
			$(this).prop('checked',true);
			$(this).parent().parent().addClass('highlight');
		}else{
			$("#url"+id+"").attr("disabled", true);
			$(this).prop('checked',false);
			$(this).parent().parent().removeClass("highlight");
		}
	});
	}else if(no=='check3'){
	$("input:checkbox[name='imgcheckName']").each(function(){
		if($(this).is(":checked")){
			$("#imgurl"+id+"").attr("disabled", false);
			$("#imgdestination"+id+"").attr("disabled", false);
			$(this).prop('checked', true);
			$(this).parent().parent().addClass('highlight');
		}else{
			$("#imgurl"+id+"").attr("disabled", true);
			$("#imgdestination"+id+"").attr("disabled", true);
			$(this).prop('checked', false);
			$(this).parent().parent().removeClass('highlight');
		}
	});
	}else if(no=='check2'){
	$("input:checkbox[name='loadCheckName']").each(function(){
		if($(this).is(":checked")){
			$("#lodurl"+id+"").attr("disabled", false);
			$(this).prop('checked', true);
			$(this).parent().parent().addClass('highlight');
		}else{
			$("#lodurl"+id+"").attr("disabled", true);
			$(this).prop('checked', true);
			$(this).parent().parent().removeClass('highlight');
		}
	});
	}
}
/*
 * FUNCTION NAME     :   devconCheck
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 10, 2014
 * MODIFIED BY       :
 * REVISION DATE	 :
 * REVISION #        :
 * DESCRIPTION       :   
 * PARAMETERS        :
 */

function devconCheck(){
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}

	var data="";
	data  += "Make sure that URL is correct. Do you wish to continue?";
	data += "Sample URL: TFTP://172.24.1.11/Filename";
	PowerDeviceCon=[];
	PowerLoadImage=[];
	PowerImageCon=[];

	$("#powerNotification").dialog({
		modal: true,
		width: 400,
		autoResize: true,
		maxHeight: "auto",
		buttons: {
			'OK': function(){		
				for(var a=0; a<devicesArr.length; a++){
					var devUrl = $("#url"+devicesArr[a].DeviceId+"").val();
					var loadUrl = $("#lodurl+devicesArr[a].DeviceId+").val();
		
					PowerDeviceCon.push({name: devicesArr[a].DeviceName, url: devUrl});
					PowerLoadImage.push({name: devicesArr[a].DeviceName, url: loadUrl});

					var imgUrl=$("#imgurl"+devicesArr[a].DeviceId+"").val();
					var imgDest=$("#imgdestination"+devicesArr[a].DeviceId+"").val();
					var imgValue=imgUrl+"&"+imgDest;
					PowerImageCon.push({name: devicesArr[a].DeviceName, url: imgValue});
				}
				$("#divAlert").dialog('destroy');
				$(this).dialog('destroy');
			},
			'Cancel': function(){$(this).dialog('destroy');}
		}
	});
	$("#powerNotification").text(data);
}

/*
 * FUNCTION NAME     :   offPower
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 10, 2014
 * MODIFIED BY       :
 * REVISION DATE	 :
 * REVISION #        :
 * DESCRIPTION       :   
 * PARAMETERS        :
*/

function offPower(){
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}

	var url= getURL("Power", "JSON");
	var action="poweroff2";
	if($("#gracefulIDOff").is(":checked")){
		var graceful=true;
	}else{
		var graceful=false;
	}
	var devQuery="";
	for(var a=0; a<devicesArr.length; a++){
		var hostOff = devicesArr[a].DeviceName;
		var mngtIPOff = devicesArr[a].ManagementIp;
		var newCtrl = getControllerInfo(hostOff);
		if(PowerDeviceCon.length!=0){
			if(PowerDeviceCon[a].name == hostOff){
				var saveconOff=PowerDeviceCon[a].url;
			}else{
				var saveconOff="";
			}
		}else{
			var saveconOff="";
		}
		if(globalInfoType=="XML"){
            devQuery += "<DEVICES Hostname='"+hostOff+"' ManagementIp='"+mngtIPOff+"' ControllerInfo='"+newCtrl+"' SaveConfigPath='"+saveconOff+"' LoadConfigPath='' LoadImagePath='' Destination='' GracefulShutdown='"+graceful+"'/>";
        }else{
            devQuery += "'DEVICES': [{'Hostname': '"+hostOff+"', 'ManagementIp': '"+mngtIPOff+"', 'ControllerInfo': '"+newCtrl+"', 'SaveConfigPath': '"+saveconOff+"', 'LoadConfigPath': '', 'LoadImagePath': '', 'Destination': '', 'GracefulShutdown': '"+graceful+"'}]";
        }		
	}
	if(UserName==globalUserName){
		var email = false;
		var newUser = "";
	}else{
		var email= true;
		var newUser = UserName;
	}
	if(globalInfoType=='XML'){
        var query = "<MAINCONFIG ResourceId='"+window['variable' + dynamicResourceId[pageCanvas]]+"' ConfigName='"+Name+"' User='"+globalUserName+"' Delay='5' Email='"+email+"' NewUser='"+newUser+"'>"+devQuery+"</MAINCONFIG>";
    }else{
        var query = "{'MAINCONFIG': [{'ResourceId': '"+window['variable' + dynamicResourceId[pageCanvas]]+"', 'ConfigName': '"+Name+"', 'User': '"+globalUserName+"', 'Delay': '5', 'Email': '"+email+"', "+devQuery+"}]}";
    }

	$.ajax({
        url: url,
		data: {
			"action": action,
			"query": query,
		},
        dataType: 'html',
		method: 'POST',
		proccessData: false,
		async:false,
        success: function(data) {
			var dat = data.replace(/'/g, '"');
			var data = $.parseJSON(dat);
			var result = $.trim(data.RESULT[0].Result);
			if(result != 1){
				$("#powerAlertDiv").dialog({
					modal: true,
					width: 300,
					autoResize: true,
					maxHeight: "auto",
					buttons: {
						'OK': function(){$(this).dialog('destroy');},
						'Cancel': function(){$(this).dialog('destroy');}
					}
				});
				$("#powerAlertDiv").text(result);
			}else{
				showPower();
				$("#deviceMenuPopUp").dialog('destroy');
			}
		}
	});
}
/*
 * FUNCTION NAME     :   onPower
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 11, 2014
 * MODIFIED BY       :
 * REVISION DATE	 :
 * REVISION #        :
 * DESCRIPTION       :   
 * PARAMETERS        :
 */
function onPower(){
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}

	var url= getURL("Power", "JSON");
	var action="poweron2";
	var devQuery="";
	for(var a=0; a<devicesArr.length; a++){
		var hostOff = devicesArr[a].DeviceName;
		var mngtIPOff = devicesArr[a].ManagementIp;
		var newCtrl = getControllerInfo(hostOff);
		if(PowerDeviceCon.length!=0){
			if(PowerDeviceCon[a].name == hostOff){
				var devconON=PowerDeviceCon[a].url;
			}else{
				var devconON="";
			}
		}else{
			var devconON="";
		}
		if(PowerImageCon.length!=0){
			if(PowerImageCon[a].name == hostOff){
				var imgconON=PowerImageCon[a].url.split("&");
				var newImgconON=imgconON[0];
				var dest=imgconON[1];
			}else{
				var newImgconON="";
				var dest="";
			}
		}else{
			var newImgconON="";
			var dest="";
		}
		if(globalInfoType=='XML'){
            devQuery += "<DEVICES Hostname='"+hostOff+"' ManagementIp='"+mngtIPOff+"' ControllerInfo='"+newCtrl+"' SaveConfigPath='"+devconON+"' LoadConfigPath='' LoadImagePath='"+newImgconON+"' Destination='"+dest+"' GracefulShutdown='false'/>";
        }else{
            devQuery += "'DEVICES': [{'Hostname': '"+hostOff+"', 'ManagementIp': '"+mngtIPOff+"', 'ControllerInfo': '"+newCtrl+"', 'SaveConfigPath': '"+devconON+"', 'LoadConfigPath': '', 'LoadImagePath': '"+newImgconON+"', 'Destination': '"+dest+"', 'GracefulShutdown': 'false'}]";
        }
	}
	for(var a=0; a<globalMAINCONFIG.length; a++){
		if(globalMAINCONFIG[a].MAINCONFIG[0].UserName==globalUserName){
			var email = false;
			var newUser = "";
		}else{
			var email= true;
			var newUser = UserName;
		}
	}
	if(globalInfoType=='XML'){
        var query = "<MAINCONFIG ResourceId='"+window['variable' + dynamicResourceId[pageCanvas]]+"' ConfigName='"+Name+"' User='"+globalUserName+"' Delay='5' Email='"+email+"' NewUser='"+newUser+"'>"+devQuery+"</MAINCONFIG>";
    }else{
        var query = "{'MAINCONFIG': [{'ResourceId': '"+window['variable' + dynamicResourceId[pageCanvas]]+"', 'ConfigName': '"+Name+"', 'User': '"+globalUserName+"', 'Delay': '5', 'Email': '"+email+"', 'NewUser': '"+newUser+"', "+devQuery+"}]}";
    }

	$.ajax({
        url: url,
		data: {
			"action": action,
			"query": query,
		},
        dataType: 'html',
		method: 'POST',
		proccessData: false,
		async:false,
        success: function(data) {
			var dat = data.replace(/'/g, '"');
			var data = $.parseJSON(dat);
			var result = data.RESULT[0].Result;
			if(result != 1){
				$("#powerAlertDiv").dialog({
					modal: true,
					width: 300,
					autoResize: true,
					maxHeight: "auto",
					buttons: {
						'OK': function(){$(this).dialog('destroy');},
						'Cancel': function(){$(this).dialog('destroy');}
					}
				});
				$("#powerAlertDiv").text(result);
			}else{
				showPower();
				$("#deviceMenuPopUp").dialog('destroy');
			}
		}
	});
}
/*
 * FUNCTION NAME     :   cyclePower
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 11, 2014
 * MODIFIED BY       :
 * REVISION DATE	 :
 * REVISION #        :
 * DESCRIPTION       :   
 * PARAMETERS        :
 */

function cyclePower(){
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}

	var url= getURL("Power", "JSON");
	var action="powercycle2";
	var devQuery="";
	if($("#gracefulIDCycle").is(":checked")){
		var gracefulCycle=true;
	}else{
		var gracefulCycle=false;
	}
	for(var a=0; a<devicesArr.length; a++){
		var hostOff = devicesArr[a].DeviceName;
		var mngtIPOff = devicesArr[a].ManagementIp;
		var newCtrl = getControllerInfo(hostOff);
		if(PowerDeviceCon.length!=0){
			if(PowerDeviceCon[a].name == hostOff){
				var devconCycle=PowerDeviceCon[a].url;
			}else{
				var devconCycle="";
			}
		}else{
			var devconCycle="";
		}
		if(PowerLoadImage.length!=0){
			if(PowerLoadImage[a].name == hostOff){
				var loadImgCycle=PowerLoadImage[a].url;
			}else{
				var loadImgCycle="";
			}
		}else{
			var loadImgCycle="";
		}
		if(PowerImageCon.length!=0){
			if(PowerImageCon[a].name == hostOff){
				var imgconCycle=PowerImageCon[a].url.split("&");
				var newImgconCycle=imgconCycle[0];
				var destCycle=imgconCycle[1];
			}else{
				var newImgconCycle="";
				var destCycle="";
			}
		}else{
			var newImgconCycle="";
			var destCycle="";
		}
		if(globalInfoType=='XML'){
            devQuery += "<DEVICES Hostname='"+hostOff+"' ManagementIp='"+mngtIPOff+"' ControllerInfo='"+newCtrl+"' SaveConfigPath='"+devconCycle+"' LoadConfigPath='"+loadImgCycle+"' LoadImagePath='"+newImgconCycle+"' Destination='"+destCycle+"' GracefulShutdown='"+gracefulCycle+"'/>";
        }else{
            devQuery += "'DEVICES': [{'Hostname': '"+hostOff+"', 'ManagementIp': '"+mngtIPOff+"', 'ControllerInfo': '"+newCtrl+"', 'SaveConfigPath': '"+devconCycle+"', 'LoadConfigPath': '"+loadImgCycle+"', 'LoadImagePath': '"+newImgconCycle+"', 'Destination': '"+destCycle+"', 'GracefulShutdown': '"+gracefulCycle+"'}]";
        }
	}
	for(var a=0; a<globalMAINCONFIG.length;a++){
		if(globalMAINCONFIG[a].MAINCONFIG[0].UserName==globalUserName){
			var email = false;
			var newUser = "";
		}else{
			var email= true;
			var newUser = UserName;
		}
	}
	if(globalInfoType=='XML'){
        var query = "<MAINCONFIG ResourceId='"+window['variable' + dynamicResourceId[pageCanvas]]+"' ConfigName='"+Name+"' User='"+globalUserName+"' Delay='5' Email='"+email+"' NewUser='"+newUser+"'>"+devQuery+"</MAINCONFIG>";
    }else{
        var query = "{'MAINCONFIG': [{'ResourceId': '"+window['variable' + dynamicResourceId[pageCanvas]]+"', 'ConfigName': '"+Name+"', 'User': '"+globalUserName+"', 'Delay': '5', 'Email': '"+email+"', 'newUser': '"+newUser+"', "+devQuery+"}]}";
    }
	
	$.ajax({
        url: url,
		data: {
			"action": action,
			"query": query,
		},
        dataType: 'html',
		method: 'POST',
		proccessData: false,
		async:false,
        success: function(data) {
			var dat = data.replace(/'/g,'"');
			var data = $.parseJSON(dat);
			var result = $.trim(data.RESULT[0].Result);
			if(result != 1){
				$("#powerAlertDiv").dialog({
					modal: true,
					width: 300,
					autoResize: true,
					maxHeight: "auto",
					buttons: {
						'OK': function(){$(this).dialog('destroy');},
						'Cancel': function(){$(this).dialog('destroy');}
					}
				});
				$("#powerAlertDiv").text(result);
			}else{
				showPower();
				$("#deviceMenuPopUp").dialog('destroy');
			}
		}
	});


}
/*
 * FUNCTION NAME     :   selectAll
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 5, 2014
 * MODIFIED BY       :
 * REVISION DATE	 :
 * REVISION #        :
 * DESCRIPTION       :   select and deselect all checkbox in config
 * PARAMETERS        :
 */

function selectAll(flag){
	var ctr=0;
	$('input:checkbox[name="'+flag+'"]').each(function(){
		if($(".checkAll").is(":checked")){
			$(this).trigger('click');
//			$(this).prop('checked', true);
			$(this).parent().parent().addClass("highlight");
//			$(this).parent().parent().removeClass("alt");
		}else{
			//$(this).prop('checked', false);	
			$(this).trigger('click');
//			if(ctr % 2 == 0){
//				$(this).parent().parent().addClass("alt");
//			}
			$(this).parent().parent().removeClass("highlight");
		}
		ctr++;
	});
}

/*
 * FUNCTION NAME     :   deleteDevice
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 20, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   deleting one device
 * PARAMETERS        :
 */
function deleteDevice(){
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
	}
    for(var a=0; a<devicesArr.length; a++){
        if(devicesArr[a].Status.toLowerCase() != "reserved"){
			if(glblDevMenImg==devicesArr[a].ObjectPath){
				deleteLinkFromDev(devicesArr[a].ObjectPath);
			    devicesArr.splice(a, 1);
            }
        }else{
			deleteLinkFromDev(devicesArr[a].ObjectPath);
            devicesArr[a].UpdateFlag = "delete";
        }
    }
    drawImage();
   // $("#configPopUp").dialog('destroy');
    $("#deviceMenuPopUp").dialog('destroy');
}
/*
 * FUNCTION NAME     :   mapDevice
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   March 8, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       : 	 mapping of device
 * PARAMETERS        :
 */
function mapDevice(){
	globalManageDeviceShow = "tooltipdevice";	

	$("#configPopUp").empty().load("pages/ConfigEditor/DeviceListTable.html", function(){
		deviceListPopupTable('deviceMenu', 'local');
		$(".ui-dialog").position({ my: "center",at: "center", of: window});
	});
	
	if(globalManageDeviceShow=="tooltipdevice"){
		$("#deviceMenuPopUp").dialog('destroy');
	}

	$("#configPopUp").dialog({
		modal: true,
		width: "auto",
		autoResize: true,
		maxHeight: 500,
	});
}

/*
 * FUNCTION NAME     :   customView
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 20, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       : 	setting values of checkboxes
 * PARAMETERS        :
 */

function customView(){
    var values=$(".custom:checked");
    var novalues=$(".custom:not(:checked)");
    if(values.length){
        var c=values.map(function(){
            return this.value;
        }).get();
        for(var i=0; i<c.length; i++){
			if(c[i] == "configName") viewconfigname = true;
            if(c[i]== "hostName")viewhostname = true;
            if(c[i]=="managementIP")viewmanagementip = true;
            if(c[i]=="consoleIP") viewconsoleip = true;
            if(c[i]=="loopbackAdd") viewloopbackadd = true;
            if(c[i]=="osVersion") viewosversion = true;
            if(c[i]=="softPack") viewsoftwarepack = true;
            if(c[i]=="interfaceIP") viewinterfaceip = true;
            if(c[i]=="interfaceName") viewinterfacename = true;
        }
    }
	if(novalues.length){
		var noval=novalues.map(function(){
            return this.value;
        }).get();
        for(var j=0; j<noval.length; j++){
            if(noval[j] == "configName")viewconfigname = false;
            if(noval[j]== "hostName")viewhostname = false;
            if(noval[j]=="managementIP")viewmanagementip = false;
            if(noval[j]=="consoleIP")viewconsoleip = false;
            if(noval[j]=="loopbackAdd")viewloopbackadd = false;
            if(noval[j]=="osVersion")viewosversion = false;
            if(noval[j]=="softPack")viewsoftwarepack = false;
            if(noval[j]=="interfaceIP")viewinterfaceip = false;
            if(noval[j]=="interfaceName")viewinterfacename = false;
        }
    }
	drawImage();
    $("#configPopUp").dialog('destroy');
 }
/*
 * FUNCTION NAME     :   checkCustomView
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 21, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       : check checkbox if it is true
 * PARAMETERS        :
 */

function checkCustomView(){
	if(viewconfigname==true)$("#checkConfigName").prop('checked', true);
	if(viewhostname==true)$("#checkhostname").prop('checked', true);
	if(viewmanagementip==true)$("#checkmanagementip").prop('checked', true);
	if(viewconsoleip==true)$("#checkconsoleip").prop('checked', true);
	if(viewloopbackadd==true)$("#checkloopbackadd").prop('checked', true);
	if(viewosversion==true)$("#checkosversion").prop('checked', true);
	if(viewsoftwarepack==true)$("#checksoftwarepack").prop('checked', true);
	if(viewinterfaceip==true)$("#checkinterfaceip").prop('checked', true);
	if(viewinterfacename==true)$("#checkinterfacename").prop('checked', true);
		$(".ui-dialog").position({
    	    my: "center",
        	at: "center",
	        of: window
	   	});

}
/*
 * FUNCTION NAME     :   startRes
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 25, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :  loads Popup for start and end reservation
 * PARAMETERS        :
 */
function startRes(flag, type){	
	$("#startEndReserve").dialog({
		modal: true,
		width: "auto",
		autoResize: true,
		maxHeight: "auto",
	});
	if(flag=="start"){
		$("#startEndReserve").empty().load("pages/ConfigEditor/startReservation.html", function(){
			if(type=="loadImg"){
				$("#ReserveOptionLoadConfigDiv").hide();
			}
			if(type=="loadCon"){
				$("#ReserveOptionLoadImageDiv").hide();
			}
			loadImage2(type);
			loadConfig2(type);
//			loadPie();
			if(globalDeviceType != "Mobile"){
				$(".ui-dialog").position({
				   my: "center",
				   at: "center",
				   of: window
				});
			}
		});
	}else{
		$("#startEndReserve").empty().load("pages/ConfigEditor/endReservation.html", function(){
			if(type=="saveImg"){
				$("#ReserveOptionSaveConfigDiv").hide();
			}
			if(type=="saveCon"){
				$("#ReserveOptionSaveImageDiv").hide();
			}
			saveImage2(type);
			saveConfigImage(type);
			if(globalDeviceType != "Mobile"){
				$(".ui-dialog").position({
				   my: "center",
			   	   at: "center",
				   of: window
				});
			}
		});
	}	
}
/*
 * FUNCTION NAME     :   loadQuery
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 25, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   get device name and model type per device	
 * PARAMETERS        :	 
 */
function loadQuery(action){
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}

	var query="";
	var arr=[];
	var arr2=[];
	for(var a=0; a<deviceArr.length; a++){
		if (deviceArr[a].DeviceName){
			arr.push(deviceArr[a].DeviceName);
		}else{
			arr.push(deviceArr[a].ObjectPath);
		}
		arr2.push(deviceArr[a].ModelType);
	}
	var user=userInformation[0].userLevel;
	if(action == "image"){
		query="deviceid="+arr+"^"+user+"^"+arr2;
	} else if(action == "config"){
		query="deviceid="+arr+"^"+globalUserName+"^"+user+"^"+arr2;
	} else {
		query="deviceid="+arr+"^"+arr2;
	}
	return query;
}
/*-----kmmabignay - mar19 - query in JSON format--------------------------------*/
function loadQueryJSON(action,page){
	var query="";
	var valArr=[];
	var dynCtr = 0;
	var devObj = {'DEVICE':valArr};
	var queryObj = {'DEVICES':[devObj]};
	if(page == "RM"){
		devicesArr = RMLoadObject;
	}else{
		devicesArr = getDevicesNodeJSON();
	}
	for(var a=0; a<devicesArr.length; a++){
		var attrKeyVal = {};
		if (devicesArr[a].HostName!=''){
			attrKeyVal['deviceid'] = devicesArr[a].HostName;
		}else{
			attrKeyVal['deviceid'] = devicesArr[a].ObjectPath;
			dynCtr++;
		}
		attrKeyVal['user'] = userInformation[0].userLevel;
		attrKeyVal['usertype'] = globalUserName;
		attrKeyVal['model'] = devicesArr[a].Model;
		valArr.push(attrKeyVal);
	}
	if(dynCtr==devicesArr.length){return 0;}
	return JSON.stringify(queryObj);
}

/*-----kmmabignay - mar19 - createRowData in JSON format---------------*/
function createRowObjforDyn(type,opt,pmDevArr){
	var now = new Date();
	var rowArr = [];
	var rowObj = {'row':rowArr};
	var dataObj = {'data':[rowObj]};
	var pmFlag = false;
	devicesArr = getDevicesNodeJSON();
	if(pmDevArr!=undefined){devicesArr = pmDevArr; pmFlag = true;}
	for(var a=0; a<devicesArr.length; a++){
		var epoc = now.getTime();
		var rowKeyVal = {};
		var devId = devicesArr[a].DeviceId;
		var devResId = devicesArr[a].DeviceResId;
		var hName = devicesArr[a].HostName;
		if(hName!=undefined && hName!=""){
			rowKeyVal['Hostname'] = hName;
		}else{
			rowKeyVal['Hostname'] = devicesArr[a].ObjectPath;
		}
		if(devId!=undefined && devId!=""){
			rowKeyVal['DeviceId'] = devId;
		}else if(devResId!=undefined && devResId!=""){
			rowKeyVal['DeviceId'] = devResId;
		}else{
			rowKeyVal['DeviceId'] = epoc+a;
		}
		rowKeyVal['Model'] = devicesArr[a].Model;
		rowArr.push(rowKeyVal);
	}
	var data = JSON.stringify(dataObj);
	if(opt=="Save"){
		saveConfigAndImageJSON(data,type,pmFlag);
	}else{
		loadConfigAndImageJSON(data,type,pmFlag);
	}
	return;
}

/*------------------------------------------------------------------*/
/*
 * FUNCTION NAME     :   loadImage
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 25, 2014
 * MODIFIED BY       :	 Angeline M. Bringas
 * REVISION DATE 	 :	 March 22,2014
 * REVISION #        :
 * DESCRIPTION       :   load table for load Image in start reservation
 * PARAMETERS        :	 
 */
/*--revised-kmmabignay-mar17---*/
function loadImage2(type){
	if(type == "2"){
		var queryx = loadQueryJSON("load","RM");
	}else{
		createRowObjforDyn("Image","Load");return;
	}
	if(!queryx){createRowObjforDyn("Image","Load");return;}
	menuToolsConfigQueryJSON("getLoadImage",queryx,"Image","Load");
}
/*-------------------------------------------------*/

/*
 * FUNCTION NAME     :   loadConfig
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 26, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   load table for load Config in start reservation
 * PARAMETERS        :	 
 */
/*--revised-kmmabignay-mar17---*/
function loadConfig2(type){
	if(type == "2"){
		var queryx = loadQueryJSON("load","RM");
	}else{
		createRowObjforDyn("Config","Load");return;
	}
	if(!queryx){createRowObjforDyn("Config","Load");return;}
	menuToolsConfigQueryJSON("getLoadConfig",queryx,"Config","Load");
}
/*-------------------------------*/
/*
 * FUNCTION NAME     :   saveImage
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 27, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   load table for save image in end reservation
 * PARAMETERS        :	 
 */
/*--revised-kmmabignay-mar17---*/
function saveImage2(type){
	if(type == "2"){
		var queryx = loadQueryJSON("image","RM");
	}else{
		createRowObjforDyn("Image","Save"); return;
	}
	if(!queryx){createRowObjforDyn("Image","Save");return;}
	menuToolsConfigQueryJSON("getSaveImage",queryx,"Image","Save");
}
/*---------------------------------------*/

/*
 * FUNCTION NAME     :   saveConfig
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 27, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   load table for save config in end reservation
 * PARAMETERS        :	 
 */
/*--revised-kmmabignay-mar17---*/
function saveConfigImage(type){
	if(type == "2"){
		var queryx = loadQueryJSON("config","RM");
	}else{
		createRowObjforDyn("Config","Save"); return;
	}
	if(!queryx){createRowObjforDyn("Config","Save");return;}
	menuToolsConfigQueryJSON("getSaveConfig",queryx,"Config","Save");
}
/*------------------------------------------------------------------------*/

/*
 * FUNCTION NAME     :   detailedView
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 27, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   change table into detailed view
 * PARAMETERS        :	 flag
 */
function detailedView( flag ) {
    if ( flag == "loadImage" ) {
        if ( $("#LoadImageDetailedView").is(':checked') ) {
            var prevdata = getDataFromPreviousPage("Detail","LoadImage","loadImage");
            if ($.inArray(1,prevdata) != -1) {
                alerts("Please provide correct input for the URL. (Sample: TFTP://Server/Directory/Filename or bootflash:/Filename)");
                return;
            }
            $('#ReservationDevicesLoadImageDetail').removeAttr('style');
            $('#ReservationDevicesLoadImageDetail').attr('style','height:155px;width:98%;overflow:auto;');
            $('#ReservationDevicesLoadImage').attr('style','display:none');
            applyDataFromPreviousPage("Detail","LoadImage","loadImage",prevdata);
        } else {
            var prevdata = getDataFromPreviousPage("Detail","LoadImage","loadImage");
            if ($.inArray(1,prevdata) != -1) {
                alerts("Please provide correct input for the URL. (Sample: TFTP://Server/Directory/Filename or bootflash:/Filename)");
                return;
            }
            $('#ReservationDevicesLoadImage').removeAttr('style');
            $('#ReservationDevicesLoadImage').attr('style','height:155px;width:98%;overflow:auto;');
            $('#ReservationDevicesLoadImageDetail').attr('style','display:none');
            applyDataFromPreviousPage("URL","LoadImage","loadImage",prevdata);
        }
    } else if ( flag == "loadConfig" ) {
        if ( $("#LoadConfigDetailedView").is(':checked') ) {
            var prevdata = getDataFromPreviousPage("URL","LoadConfig","loadConfig");
            if ($.inArray(1,prevdata) != -1) {
                alerts("Please provide correct input for the URL. (Sample: TFTP://Server/Directory/Filename or bootflash:/Filename)");
                return;
            }
            $('#ReservationDevicesLoadConfigDetail').removeAttr('style');
            $('#ReservationDevicesLoadConfigDetail').attr('style','height:155px;width:98%;overflow:auto;');
            $('#ReservationDevicesLoadConfig').attr('style','display:none');
            applyDataFromPreviousPage("Detail","LoadConfig","loadConfig",prevdata);
        } else {
            var prevdata = getDataFromPreviousPage("Detail","LoadConfig","loadConfig");
            if ($.inArray(1,prevdata) != -1) {
                alerts("Please provide correct input for the URL. (Sample: TFTP://Server/Directory/Filename or bootflash:/Filename)");
                return;
            }
			$('#ReservationDevicesLoadConfig').removeAttr('style');
            $('#ReservationDevicesLoadConfig').attr('style','height:155px;width:98%;overflow:auto;');
            $('#ReservationDevicesLoadConfigDetail').attr('style','display:none');
            applyDataFromPreviousPage("URL","LoadConfig","loadConfig",prevdata);
        }
     } else if ( flag == "loadPie" ) {
        if ( $("#LoadPieDetailedView").is(':checked') ) {
            var prevdata = getDataFromPreviousPage("URL","LoadPie","loadPie");
            if ($.inArray(1,prevdata) != -1) {
                alerts("Please provide correct input for the URL. (Sample: TFTP://Server/Directory/Filename or bootflash:/Filename)");
                return;
            }
            $('#ReservationDevicesLoadPieDetail').removeAttr('style');
            $('#ReservationDevicesLoadPieDetail').attr('style','height:155px;width:98%;overflow:auto;');
            $('#ReservationDevicesLoadPie').attr('style','display:none');
            applyDataFromPreviousPage("Detail","LoadPie","loadPie",prevdata);
        } else {
            var prevdata = getDataFromPreviousPage("Detail","LoadPie","loadPie");
            if ($.inArray(1,prevdata) != -1) {
                alerts("Please provide correct input for the URL. (Sample: TFTP://Server/Directory/Filename or bootflash:/Filename)");
                return;
            }
			$('#ReservationDevicesLoadPie').removeAttr('style');
            $('#ReservationDevicesLoadPie').attr('style','height:155px;width:98%;overflow:auto;');
            $('#ReservationDevicesLoadPieDetail').attr('style','display:none');
            applyDataFromPreviousPage("URL","LoadPie","loadPie",prevdata);
        }
   } else if ( flag == "saveImage" ) {
        if ( $("#SaveImageDetailedView").is(':checked') ) {
            var prevdata = getDataFromPreviousPage("URL","SaveImage","saveImage");
            if ($.inArray(1,prevdata) != -1) {
                alerts("Please provide correct input for the URL. (Sample: TFTP://Server/Directory/Filename or bootflash:/Filename)");
                return;
            }
            $('#ReservationDevicesSaveImageDetail').removeAttr('style');
            $('#ReservationDevicesSaveImageDetail').attr('style','height:155px;width:98%;overflow:auto;');
            $('#ReservationDevicesSaveImage').attr('style','display:none');
            applyDataFromPreviousPage("Detail","SaveImage","saveImage",prevdata);
        } else {
            var prevdata = getDataFromPreviousPage("Detail","SaveImage","saveImage");
            if ($.inArray(1,prevdata) != -1) {
                alerts("Please provide correct input for the URL. (Sample: TFTP://Server/Directory/Filename or bootflash:/Filename)");
                return;
            }
            $('#ReservationDevicesSaveImage').removeAttr('style');
            $('#ReservationDevicesSaveImage').attr('style','height:155px;width:98%;overflow:auto;');
            $('#ReservationDevicesSaveImageDetail').attr('style','display:none');
            applyDataFromPreviousPage("URL","SaveImage","saveImage",prevdata);
        }
    } else if ( flag == "saveConfig" ) {
		if ( $("#SaveConfigDetailedView").is(':checked') ) {
            var prevdata = getDataFromPreviousPage("URL","SaveConfig","saveConfig");
            if ($.inArray(1,prevdata) != -1) {
                alerts("Please provide correct input for the URL. (Sample: TFTP://Server/Directory/Filename or bootflash:/Filename)");
                return;
            }
            $('#ReservationDevicesSaveConfigDetail').removeAttr('style');
            $('#ReservationDevicesSaveConfigDetail').attr('style','height:155px;width:98%;overflow:auto;');
            $('#ReservationDevicesSaveConfig').attr('style','display:none');
            applyDataFromPreviousPage("Detail","SaveConfig","saveConfig",prevdata);
        } else {
            var prevdata = getDataFromPreviousPage("Detail","SaveConfig","saveConfig");
            if ($.inArray(1,prevdata) != -1) {
                alerts("Please provide correct input for the URL. (Sample: TFTP://Server/Directory/Filename or bootflash:/Filename)");
                return;
            }
            $('#ReservationDevicesSaveConfig').removeAttr('style');
            $('#ReservationDevicesSaveConfig').attr('style','height:155px;width:98%;overflow:auto;');
            $('#ReservationDevicesSaveConfigDetail').attr('style','display:none');
            applyDataFromPreviousPage("URL","SaveConfig","saveConfig",prevdata);
        }
    }

}
/*
 * FUNCTION NAME     :   getDataFromPreviousPage
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 27, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   
 * PARAMETERS        :	 from, opt, opt2
 */
function getDataFromPreviousPage(from,opt,opt2) {

    var retArr = new Array();
    switch (from) {
        case "URL":
            $('input[name="'+opt2+'Sel"]').each(function() {
                var dev = $(this).val();
                var filename = $(this).parent().parent().find('td').eq(4).find('input').val();
                var destination = $(this).parent().parent().find('td').eq(5).find('select').val();
                var checked = $(this).prop('checked');
                var loc = $(this).parent().parent().find('td').eq(3).find('select').val();
                if (/tftp|ftp/i.test(filename) && /\/bootflash:|\/flash:|\flash0:|\/flash1:|\/flash2:|\/disk0:|\/disk1:|\/disk2:|\/slot0:|\/slot1:|\/slot2/i.test(filename)) {
                    retArr.push(1);
                } else {
                    retArr.push(dev+"^"+filename+"^"+destination+"^"+checked+"^"+loc);
                  }
            });
        break;
        case "Detail":
            $('input[name="'+opt2+'DetailSel"]').each(function() {
                var dev = $(this).val();
                var proto2 = $(this).parent().parent().find('td').eq(4).find('input').val();
                var server = $(this).parent().parent().find('td').eq(5).find('input').val();
                var path = $(this).parent().parent().find('td').eq(6).find('input').val();
                var filename = $(this).parent().parent().find('td').eq(7).find('input').val();
                var destination = $(this).parent().parent().find('td').eq(8).find('select').val();
                var checked = $(this).prop('checked');
                var loc = $(this).parent().parent().find('td').eq(3).find('select').val();
                if (/tftp|ftp/i.test(proto2) && /\/bootflash:|\/flash:|\flash0:|\/flash1:|\/flash2:|\/disk0:|\/disk1:|\/disk2:|\/slot0:|\/slot1:|\/slot2/i.test(path)) {
                    retArr.push(1);
                } else {
                    retArr.push(dev+"^"+proto2+"^"+server+"^"+path+"^"+filename+"^"+destination+"^"+checked+"^"+loc);
                  }
            });
        break;
    }
    return retArr;
}
/*
 * FUNCTION NAME     :   applyDataFromPreviousPage 
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 27, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   
 * PARAMETERS        :	 from, opt, opt2, data
 */
function applyDataFromPreviousPage(from,opt,opt2,data) {

    var retArr = new Array();
    switch (from) {
        case "URL":
            for (var y=0; y < data.length; y++) {
                var dev = data[y].split("^")[0];
                var proto2 = data[y].split("^")[1];
                var server = data[y].split("^")[2];
                var path = data[y].split("^")[3];
                var filename = data[y].split("^")[4];
                var destination = data[y].split("^")[5];
                var checked = data[y].split("^")[6];
                var loc = data[y].split("^")[7];
                switch (checked) {
                    case "true":
                        $('#tr'+opt2+dev).find('td').eq(0).find('input:checkbox').prop('checked',true);
                        enableRow1(opt2,dev);
                    break;
                    case "false":
                        $('#tr'+opt2+dev).find('td').eq(0).find('input:checkbox').prop('checked',false);
                        enableRow1(opt2,dev);
                    break;
                }
                var str = "";
                if (proto2 != "") {
                    str += proto2+"://"+server+"/";
                    if (/^disk[0-2]|disk$/.test(path) == true || /^slot[0-1]$/.test(path) == true || /^NVRAM$/.test(path) == true || /^bootflash$/.test(path) == true || /^flash[0-1]|flash$/.test(path) == true) {
                        str += path+":"+filename;
                    } else {
                        str += path+"/"+filename;
                      }
				} else if (server != "") {
                    str += server+"/";
                    if (/^disk[0-2]|disk$/.test(path) == true || /^slot[0-1]$/.test(path) == true || /^NVRAM$/.test(path) == true || /^bootflash$/.test(path) == true || /^flash[0-1]|flash$/.test(path) == true) {
                        str += path+":"+filename;
                    } else {
                        str += path+"/"+filename;
                      }
                  } else if (path != "") {
                        if (/^disk[0-2]|disk$/.test(path) == true || /^slot[0-1]$/.test(path) == true || /^NVRAM$/.test(path) == true || /^bootflash$/.test(path) == true || /^flash[0-1]|flash$/.test(path) == true) {
                            str += path+":"+filename;
                        } else {
                            str += path+"/"+filename;
                          }
                    } else {
                        str += filename;
                      }
                $('#tr'+opt2+dev).find('td').eq(4).find('input').val(str);
                $('#tr'+opt2+dev).find('td').eq(5).find('select').val(destination);
                $('#tr'+opt2+dev).find('td').eq(3).find('select').val(loc);
            }
        break;
		case "Detail":
            for (var y=0; y < data.length; y++) {
                var dev = data[y].split("^")[0];
                var filename = data[y].split("^")[1];
                var destination = data[y].split("^")[2];
                var checked = data[y].split("^")[3];
                var loc = data[y].split("^")[4];
                switch (checked) {
                    case "true":
                        $('#tr'+opt2+'Detail'+dev).find('td').eq(0).find('input:checkbox').prop('checked',true);
                        enableRow1(opt2+"Detail",dev);
                    break;
                    case "false":
                        $('#tr'+opt2+'Detail'+dev).find('td').eq(0).find('input:checkbox').prop('checked',false);
                        enableRow1(opt2+"Detail",dev);
                    break;
                }
                $('#tr'+opt2+'Detail'+dev).find('td').eq(7).find('input').val(filename);
                $('#tr'+opt2+'Detail'+dev).find('td').eq(5).find('input').val("");
                $('#tr'+opt2+'Detail'+dev).find('td').eq(4).find('input').val("");
                parseURL2(opt,opt2,dev);
                $('#tr'+opt2+'Detail'+dev).find('td').eq(8).find('select').val(destination);
                $('#tr'+opt2+'Detail'+dev).find('td').eq(3).find('select').val(loc);
            }
        break;
    }
    return retArr;
}
/*
 * FUNCTION NAME     :   openAddPie
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 27, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   popup for adding pie
 * PARAMETERS        :	 
 */
function openAddPie() {
    $("#addPiePopUp").dialog({
        autoOpen: false,
        width: 300,
        height: 175,
        modal: true,
        resizable: false,
        open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
        buttons: {
            "Ok": function() {
                addPieColumn();
                $(this).dialog('destroy');
            },
            "Cancel": function(){
                $(this).dialog('destroy');
            }
        }
    });

    $("#addPiePopUp").load("../popUp/addPie.php", function() {
        var tmpstr = "<option> select </option>";
        for (var h = 0; h < globalPieArray.length; h++) {
            var tmparray = globalPieArray[h].split("*")
            tmpstr += "<option value='"+globalPieArray[h]+"'> "+tmparray[0]+"</option>";
        }
        $("#addpie").empty().append(tmpstr);
    });

    $("#addPiePopUp").dialog("open");

}
/*
 * FUNCTION NAME     :   LoadSaveOption
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 27, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   
 * PARAMETERS        :	 source, opt, opt2, from
 */
function LoadSaveOption(source,opt,opt2,from) {
    if (source.checked == true) {
        $('input[name="'+opt2+from+'Sel"]').each(function() {
            $(this).prop('checked',true);
            $(this).parent().parent().addClass('highlight');
            var dev = $(this).val();
            enableRow1(opt2+from,dev);
        });
    } else {
        $('input[name="'+opt2+from+'Sel"]').each(function() {
            $(this).parent().parent().removeClass('highlight');
            $(this).prop('checked',false);
            var dev = $(this).val();
            enableRow1(opt2+from,dev);
        });
      }
}
/*
 * FUNCTION NAME     :   enableRow1
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 28, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   used in enable or disable textbox
 * PARAMETERS        :	 falg, id
 */
function enableRow1( flag , id ) {
    var checkCtr = 0;
    var checkBoxCtr = 0;
    if ( flag == "loadImage" ) {
        $('#LoadImageTable input:checkbox[name="loadImageSel"]').each(function() { 
			if ( $(this).is(':checked') ) {checkCtr++;}
            if ( $(this).val() == id ) {
                if ( $(this).is(':checked') ) {
                    $('#tbLoadImageURL'+id).attr('disabled',false);
                    $(this).prop('checked',true);
                    $(this).parent().parent().addClass('highlight');
                    $('#tbLoadImageDestination'+id).attr('disabled',false);
                    $('#'+flag+'Location'+id).attr('disabled',false);
                } else {
                    $(this).prop('checked',false);
                    $(this).parent().parent().removeClass('highlight');
                    $('#tbLoadImageURL'+id).attr('disabled',true);
                    $('#tbLoadImageDestination'+id).attr('disabled',true);
                    $('#'+flag+'Location'+id).attr('disabled',true);
                }
            }
			checkBoxCtr++;
        });
		enableRow1SubProc("LoadImageAll","LoadImageSetValues",checkCtr,checkBoxCtr);
    } else if ( flag == "loadConfig" ) {
        $('#LoadConfigTable input:checkbox[name="loadConfigSel"]').each(function() {
			if ( $(this).is(':checked') ) {checkCtr++;}
            if ( $(this).val() == id ) {
                if ( $(this).is(':checked') ) {
                    $(this).prop('checked',true);
                    $(this).parent().parent().addClass('highlight');
                    $('#tbLoadConfigURL'+id).attr('disabled',false);
                    $('#tbLoadConfigDestination'+id).attr('disabled',false);
                    $('#'+flag+'Location'+id).attr('disabled',false);
                } else {
                    $(this).is(':checked',false);
                    $(this).parent().parent().removeClass('highlight');
                    $('#tbLoadConfigURL'+id).attr('disabled',true);
                    $('#tbLoadConfigDestination'+id).attr('disabled',true);
                    $('#'+flag+'Location'+id).attr('disabled',true);
                }
            }
			checkBoxCtr++;
        });
		enableRow1SubProc("LoadConfigAll","LoadConfigSetValues",checkCtr,checkBoxCtr);
    } else if ( flag == "loadImageDetail" ) {
        $('#LoadImageDetailTable input:checkbox[name="loadImageDetailSel"]').each(function() {
			if ( $(this).is(':checked') ) {checkCtr++;}
            if ( $(this).val() == id ) {
                if ( $(this).is(':checked') ) {
                    $('#tbLoadImageDetailPath'+id).attr('disabled',false);
                    $('#tbLoadImageDetailFilename'+id).attr('disabled',false);
                    $('#tbLoadImageDetailIp'+id).attr('disabled',false);
                    $('#tbLoadImageDetailProtocol'+id).attr('disabled',false);
                    $('#tbLoadImageDetailDestination'+id).attr('disabled',false);
                    $('#'+flag+'Location'+id).attr('disabled',false);
                } else {
                    $('#tbLoadImageDetailPath'+id).attr('disabled',true);
                    $('#tbLoadImageDetailFilename'+id).attr('disabled',true);
                    $('#tbLoadImageDetailIp'+id).attr('disabled',true);
                    $('#tbLoadImageDetailProtocol'+id).attr('disabled',true);
                    $('#tbLoadImageDetailDestination'+id).attr('disabled',true);
                    $('#'+flag+'Location'+id).attr('disabled',true);
                }
            }
			checkBoxCtr++;
        });
		enableRow1SubProc("LoadImageDetailAll","LoadImageSetValues",checkCtr,checkBoxCtr);
    } else if ( flag == "loadConfigDetail" ) {
        $('#LoadConfigDetailTable input:checkbox[name="loadConfigDetailSel"]').each(function() {
			if ( $(this).is(':checked') ) {checkCtr++;}
            if ( $(this).val() == id ) {
                if ( $(this).is(':checked') ) {
                    $('#tbLoadConfigDetailPath'+id).attr('disabled',false);
                    $('#tbLoadConfigDetailFilename'+id).attr('disabled',false);
                    $('#tbLoadConfigDetailIp'+id).attr('disabled',false);
                    $('#tbLoadConfigDetailProtocol'+id).attr('disabled',false);
                    $('#tbLoadConfigDetailDestination'+id).attr('disabled',false);
                    $('#'+flag+'Location'+id).attr('disabled',false);
                } else {
                    $('#tbLoadConfigDetailPath'+id).attr('disabled',true);
                    $('#tbLoadConfigDetailFilename'+id).attr('disabled',true);
                    $('#tbLoadConfigDetailIp'+id).attr('disabled',true);
                    $('#tbLoadConfigDetailProtocol'+id).attr('disabled',true);
                    $('#tbLoadConfigDetailDestination'+id).attr('disabled',true);
                    $('#'+flag+'Location'+id).attr('disabled',true);
                }
            }
			checkBoxCtr++;
        });
        makeReadOnly(flag);
		enableRow1SubProc("LoadConfigDetailAll","LoadConfigSetValues",checkCtr,checkBoxCtr);
    } else if ( flag == "saveImage" ) {
        $('#SaveImageTable input:checkbox[name="saveImageSel"]').each(function() {
			if ( $(this).is(':checked') ) {checkCtr++;}
            if ( $(this).val() == id ) {
                if ( $(this).is(':checked') ) {
                    $(this).prop('checked',true);
                    $(this).parent().parent().addClass('highlight');
                    $('#tbSaveImageURL'+id).attr('disabled',false);
                    $('#tbSaveImageDestination'+id).attr('disabled',false);
                    $('#'+flag+'Location'+id).attr('disabled',false);
                } else {
                    $(this).prop('checked',false);
                    $(this).parent().parent().removeClass('highlight');
                    $('#tbSaveImageURL'+id).attr('disabled',true);
                    $('#tbSaveImageDestination'+id).attr('disabled',true);
                    $('#'+flag+'Location'+id).attr('disabled',true);
                }
            }
			checkBoxCtr++;
        });
		enableRow1SubProc("SaveImageAll","SaveImageSetValues",checkCtr,checkBoxCtr);
    } else if ( flag == "saveConfig" ) {
        $('#SaveConfigTable input:checkbox[name="saveConfigSel"]').each(function() {
			if ( $(this).is(':checked') ) {checkCtr++;}
            if ( $(this).val() == id ) {
                if ( $(this).is(':checked') ) {
                    $(this).prop('checked',true);
                    $(this).parent().parent().addClass('highlight');
                    $('#tbSaveConfigURL'+id).attr('disabled',false);
                    $('#tbSaveConfigDestination'+id).attr('disabled',false);
                    $('#'+flag+'Location'+id).attr('disabled',false);
                } else {
                    $(this).prop('checked',false);
                    $(this).parent().parent().removeClass('highlight');
                    $('#tbSaveConfigURL'+id).attr('disabled',true);
                    $('#tbSaveConfigDestination'+id).attr('disabled',true);
                    $('#'+flag+'Location'+id).attr('disabled',true);
                }
            }
			checkBoxCtr++;
        });
		enableRow1SubProc("SaveConfigAll","SaveConfigSetValues",checkCtr,checkBoxCtr);
    } else if ( flag == "saveImageDetail" ) {
        $('#SaveImageDetailTable input:checkbox[name="saveImageDetailSel"]').each(function() {
			if ( $(this).is(':checked') ) {checkCtr++;}
            if ( $(this).val() == id ) {
                if ( $(this).is(':checked') ) {
                    $('#tbSaveImageDetailPath'+id).attr('disabled',false);
                    $('#tbSaveImageDetailFilename'+id).attr('disabled',false);
                    $('#tbSaveImageDetailIp'+id).attr('disabled',false);
                    $('#tbSaveImageDetailProtocol'+id).attr('disabled',false);
                    $('#tbSaveImageDetailDestination'+id).attr('disabled',false);
                    $('#'+flag+'Location'+id).attr('disabled',false);
                } else {
                    $('#tbSaveImageDetailPath'+id).attr('disabled',true);
                    $('#tbSaveImageDetailFilename'+id).attr('disabled',true);
                    $('#tbSaveImageDetailIp'+id).attr('disabled',true);
                    $('#tbSaveImageDetailProtocol'+id).attr('disabled',true);
                    $('#tbSaveImageDetailDestination'+id).attr('disabled',true);
                    $('#'+flag+'Location'+id).attr('disabled',true);
                }
            }
			checkBoxCtr++;
        });
		enableRow1SubProc("SaveImageDetailAll","SaveImageSetValues",checkCtr,checkBoxCtr);
    } else if ( flag == "saveConfigDetail" ) {
        $('#SaveConfigDetailTable input:checkbox[name="saveConfigDetailSel"]').each(function() {
			if ( $(this).is(':checked') ) {checkCtr++;}
            if ( $(this).val() == id ) {
                if ( $(this).is(':checked') ) {
                    $('#tbSaveConfigDetailPath'+id).attr('disabled',false);
                    $('#tbSaveConfigDetailFilename'+id).attr('disabled',false);
                    $('#tbSaveConfigDetailIp'+id).attr('disabled',false);
                    $('#tbSaveConfigDetailProtocol'+id).attr('disabled',false);
                    $('#tbSaveConfigDetailDestination'+id).attr('disabled',false);
                    $('#'+flag+'Location'+id).attr('disabled',false);
                } else {
                    $('#tbSaveConfigDetailPath'+id).attr('disabled',true);
                    $('#tbSaveConfigDetailFilename'+id).attr('disabled',true);
                    $('#tbSaveConfigDetailIp'+id).attr('disabled',true);
                    $('#tbSaveConfigDetailProtocol'+id).attr('disabled',true);
                    $('#tbSaveConfigDetailDestination'+id).attr('disabled',true);
                    $('#'+flag+'Location'+id).attr('disabled',true);
                }
            }
			checkBoxCtr++;
        });
		enableRow1SubProc("SaveConfigDetailAll","SaveConfigSetValues",checkCtr,checkBoxCtr);
    } else if ( flag == "loadPie" ) {
        $('#LoadPieTable input:checkbox[name="loadPieSel"]').each(function() {
			if ( $(this).is(':checked') ) {checkCtr++;}
            if ( $(this).val() == id ) {
                if ( $(this).is(':checked') ) {
                    $('#tbLoadPieURL'+id).removeAttr('disabled');
                    $('#tbLoadPieDestination'+id).removeAttr('disabled');
                    $('#'+flag+'Location'+id).removeAttr('disabled');
                } else {
                    $('#tbLoadPieURL'+id).attr('disabled',true);
                    $('#tbLoadPieDestination'+id).attr('disabled',true);
                    $('#'+flag+'Location'+id).attr('disabled',true);
                }
            }
			checkBoxCtr++;
        });
        makeReadOnly(flag);
		enableRow1SubProc("LoadPieAll","LoadPieSetValues",checkCtr,checkBoxCtr);
    } else if ( flag == "loadPieDetail" ) {
        $('#LoadPieDetailTable input:checkbox[name="loadPieDetailSel"]').each(function() {
			if ( $(this).is(':checked') ) {checkCtr++;}
            if ( $(this).val() == id ) {
                if ( $(this).is(':checked') ) {
                    $('#tbLoadPieDetailPath'+id).attr('disabled',false);
                    $('#tbLoadPieDetailFilename'+id).attr('disabled',false);
                    $('#tbLoadPieDetailIp'+id).attr('disabled',false);
                    $('#tbLoadPieDetailProtocol'+id).attr('disabled',false);
                    $('#tbLoadPieDetailDestination'+id).attr('disabled',false);
                    $('#'+flag+'Location'+id).attr('disabled',false);
                } else {
                    $('#tbLoadPieDetailPath'+id).attr('disabled',true);
                    $('#tbLoadPieDetailFilename'+id).attr('disabled',true);
                    $('#tbLoadPieDetailIp'+id).attr('disabled',true);
                    $('#tbLoadPieDetailProtocol'+id).attr('disabled',true);
                    $('#tbLoadPieDetailDestination'+id).attr('disabled',true);
                    $('#'+flag+'Location'+id).attr('disabled',true);
                }
            }
			checkBoxCtr++;
        });
        makeReadOnly(flag);
		enableRow1SubProc("LoadPieDetailAll","LoadPieSetValues",checkCtr,checkBoxCtr);
	}

}
/*
 * FUNCTION NAME     :   saveReservation 
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 28, 2014
 * MODIFIED BY       :	 kmmabignay
 * REVISION DATE 	 :	 March 14, 2014
 * REVISION #        :	 1
 * DESCRIPTION       :   used in saving reservation
 * PARAMETERS        :	 
 */
function saveReservation(mainMenu){
	var imgFlag = ($("#ReserveOptionLoadImageDiv").is(":visible"));
	var conFlag = ($("#ReserveOptionLoadConfigDiv").is(":visible"));
	var MainEndArr = new Array();
	switch(true){
		case (conFlag && !imgFlag):
			var MainEndConArr = saveEndReservationInfo("Config","Load");
			if(MainEndConArr==""){ return; }
			saveEndReservationAlertConditions(MainEndConArr,"Config",mainMenu,"Load");
			break;
		case (imgFlag && !conFlag):
			var MainEndImgArr = saveEndReservationInfo("Image","Load");
			if(MainEndImgArr==""){ return; }
			saveEndReservationAlertConditions(MainEndImgArr,"Image",mainMenu,"Load");
			break;
		case (imgFlag && conFlag):
			var MainEndConArr = saveEndReservationInfo("Config","Load");
			var MainEndImgArr = saveEndReservationInfo("Image","Load");	
			if(MainEndConArr!=""){MainEndArr.push(MainEndConArr);}
			if(MainEndImgArr!=""){MainEndArr.push(MainEndImgArr);}
			if(MainEndArr==[]){ return; }
			if(MainEndConArr=="" && MainEndImgArr!=""){
				saveEndReservationAlertConditions(MainEndImgArr,"Image",mainMenu,"Load");
			}else if(MainEndImgArr=="" && MainEndConArr!=""){
				saveEndReservationAlertConditions(MainEndConArr,"Config",mainMenu,"Load");
			}else{
				saveEndReservationAlertConditions(MainEndArr,"both",mainMenu,"Load");
			}
			break;
	}
}

/*
 * FUNCTION NAME     :   saveEndReservation
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 28, 2014
 * MODIFIED BY       :	 kmmabignay
 * REVISION DATE 	 :	 March 14, 2014
 * REVISION #        :	 1
 * DESCRIPTION       :   function in saving end reservation
 * PARAMETERS        :	 
 */
function saveEndReservation(mainMenu){
	var imgFlag = ($("#ReserveOptionSaveImageDiv").is(":visible"));
	var conFlag = ($("#ReserveOptionSaveConfigDiv").is(":visible"));
	var MainEndArr = new Array();
	switch(true){
		case (conFlag && !imgFlag):
			var MainEndConArr = saveEndReservationInfo("Config","Save");
			if(MainEndConArr==""){ return; }
			saveEndReservationAlertConditions(MainEndConArr,"Config",mainMenu,"Save");
			break;
		case (imgFlag && !conFlag):
			var MainEndImgArr = saveEndReservationInfo("Image","Save");
			if(MainEndImgArr==""){ return; }
			saveEndReservationAlertConditions(MainEndImgArr,"Image",mainMenu,"Save");
			break;
		case (imgFlag && conFlag):
			var MainEndConArr = saveEndReservationInfo("Config","Save");
			var MainEndImgArr = saveEndReservationInfo("Image","Save");	
			if(MainEndConArr!=""){MainEndArr.push(MainEndConArr);}
			if(MainEndImgArr!=""){MainEndArr.push(MainEndImgArr);}
			if(MainEndArr==[]){ return; }
			if(MainEndConArr=="" && MainEndImgArr!=""){
				saveEndReservationAlertConditions(MainEndImgArr,"Image",mainMenu,"Save");
			}else if(MainEndImgArr=="" && MainEndConArr!=""){
				saveEndReservationAlertConditions(MainEndConArr,"Config",mainMenu,"Save");
			}else{
				saveEndReservationAlertConditions(MainEndArr,"both",mainMenu,"Save");
			}
			break;
	}
}

/*
 * FUNCTION NAME     :   validateProtocol
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 28, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   validate protocol in detailed view
 * PARAMETERS        :	 proto2, url
 */
function validateProtocol(proto2,url2) {
 if (proto2 == "" && (/^disk[0-2]|disk$/.test(url2) == true || /^slot[0-1]$/.test(url2) == true || /^NVRAM$/.test(url2) == true || /^bootflash$/.test(url2) == true || /^flash[0-1]|flash$/.test(url2) == true)) {
        return 0;
    } else if (/^FTP$/i.test(proto2) == false && /^TFTP$/i.test(proto2) == false) {
        return 1;
    } else {
        return 0;
    }

}
/*
 * FUNCTION NAME     :   validatePath
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 28, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   validate path in detailed view
 * PARAMETERS        :	 path
 */
function validatePath(path) {
    if ( path == "" ) {
        return 1;
	} else if (/^disk[0-2]|disk$/.test(path) == true || /^slot[0-1]$/.test(path) == true || /^NVRAM$/.test(path) == true || /^bootflash$/.test(path) == true || /^flash[0-1]|flash$/.test(path) == true) {
        return 0;
    } else {
        var pathArr = path.split("\/");
        var isinvalid = 0;
        for (var x = 0 ; x < pathArr.length; x++) {
            if (/^[a-z|A-Z][0-9|a-z|\-|\_|A-Z|\.]+$/.test(pathArr[x]) == false) {
                isinvalid = 1;
            }
        }
        return isinvalid;
    }
}
/*
 * FUNCTION NAME     :   validateFileName
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 28, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   validate filename in detailed view
 * PARAMETERS        :	 path
 */
function validateFileName(fname,path) {
	if ( fname == "" ) {
        return 1;
    } else {
        var isinvalid = 0;
        if (/^disk[0-2]|disk$/.test(path) == true || /^slot[0-1]$/.test(path) == true || /^NVRAM$/.test(path) == true || /^bootflash$/.test(path) == true || /^flash[0-1]|flash$/.test(path) == true) {
            if (/^[a-z|A-Z|0-9][0-9|a-z|\-|\_|A-Z|\.]+$/.test(fname) == false) {
                if (/^[\/][0-9|a-z|\-|\_|A-Z|\.]+$/.test(fname) == false) {
                    isinvalid = 1;
                }
            }
        } else if (/^[a-z|A-Z|0-9][0-9|a-z|\-|\_|A-Z|\.]+$/.test(fname) == false) {
            isinvalid = 1;
          }
        return isinvalid;
    }
}
/*
 * FUNCTION NAME     :   alerts
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 27, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   alerts in start and end reservation
 * PARAMETERS        :	 msg, todo, type
 */
function alerts(msg,todo,type,source,todo2,todo3) {
    var res=false;
    switch(type) {
        case "prompt":
			$( "#msg" ).remove();
            $("body").append("<div id='msg' style='display:none' class='label'><center>"+msg+"</msg>");
            $( "#msg" ).dialog({
                height: "auto",
				width: 350,
                resizable: false,
                closeOnEscape: false,
                open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); $(".ui-dialog :button").blur(); },
                buttons: {
                    "OK": function() {
                        res=true;
                        eval(todo);
                        $(this).dialog('destroy');
                    },
                    "Cancel": function() {
                        res=false;
                        $(this).dialog('destroy');
                    }
                }
            });
		 break;
        case "alert2":
            $( "#msg" ).remove();
            $("body").append("<div id='msg' style='display:none' class='label'><center>"+msg+"</msg>");
            $( "#msg" ).dialog({
                height: "auto",
				width: 350,
                resizable: false,
                modal: true,
                closeOnEscape: false,
                open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); $(".ui-dialog :button").blur();},
                buttons: {
                    "Yes": function() {
						initDate('true');								
                        $(this).dialog('destroy');
                        eval(todo);
                    },
                    "No": function() {
                        res=false;
                        $(this).dialog('destroy');
                    }
                }
             });
        break;
		case "cancel":
		case "deleterelease":
            $( "#msg" ).remove();
			var msg2 = "Clear Canvas";
			var myid = "msg";
			if(type == "deleterelease"){
				msg2 = "Release Reservation<br/><span style='font-size:10.5px;color:red'>Note :</span><span style='font-size:10.5px'>Release Reservation will take effect upon clicking Yes.</span>";
			}
            $("body").append("<div id="+myid+" style='display:none' class='label'><center>"+msg+"</msg><br/><br/><input type='checkbox' id='cancelclearcanvas'/>  "+msg2);
            $( "#msg" ).dialog({
                height: "auto",
				width: 350,
                resizable: false,
                modal: true,
                closeOnEscape: false,
                open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); $(".ui-dialog :button").blur();},
                buttons: {
                    "Yes": function() {
						if(type == "deleterelease"){
							if(todo == "" && devPath != ""){
								deleteDevSub(devPath);
								devPath = "";
							}
						}
						if($('#cancelclearcanvas').is(':checked')){
							cancelReservation(true);
						}else if(type == "cancel"){
							cancelReservation();
						}
                        $(this).dialog('close');
                    },
                    "No": function() {
                        res=false;
                        $(this).dialog('close');
                    }
                }
                });
        break;
        case "graph":
            $( "#msg" ).remove();
            $("body").append("<div id='msg' style='display:none' class='label'><center>"+msg+"</msg>");
            $( "#msg" ).dialog({
                height: 140,
                modal: true,
                zIndex: 11003,
                resizable: false,
                closeOnEscape: false,
                open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); $(".ui-dialog :button").blur();},
                buttons: {
                    "OK": function() {
                       	$('#configPopUp').dialog('destroy');
                        $("#selectedDevStat").dialog('destroy');
                        $(this).dialog('destroy');
                    }
                }
            });
        break;
		case "yesno":
            $( "#msg" ).remove();
            $("body").append("<div id='msg' style='display:none' class='label'><center>"+msg+"</msg>");
            $( "#msg" ).dialog({
                height: "auto",
				width: 350,
                resizable: false,
                modal: true,
                closeOnEscape: false,
                open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); $(".ui-dialog :button").blur();},
                buttons: {
                    "Yes": function() {
                        $(this).dialog('destroy');
						if(todo == "" && devPath != ""){
							deleteDevSub(devPath);
							devPath = "";
						}else if(source == "canceldev"){
							cancelDevStat(todo);
						}else{
							eval(todo);
						}
                    },
                    "No": function() {
                        $(this).dialog('destroy');
                    }
                }
                });
        break;
		case "yesorno":
            $( "#msg" ).remove();
            $("body").append("<div id='msg' style='display:none' class='label'><center>"+msg+"</msg>");
            $( "#msg" ).dialog({
                height: "auto",
				width: 350,
                resizable: false,
                modal: true,
                closeOnEscape: false,
                open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); $(".ui-dialog :button").blur();},
                buttons: {
                    "Yes": function() {
                        $(this).dialog('destroy');
						eval(todo);
                    },
                    "No": function() {
                        $(this).dialog('destroy');
						if(todo2){
							eval(todo2);
						}
                    }
                }
                });
        break;
		case "console":
            $( "#msg" ).remove();
            $("body").append("<div id='msg' style='display:none;overflow:auto' class='label'><center>"+msg+"</msg>");
            $( "#msg" ).dialog({
                height: 350,
				width: 350,
                resizable: false,
                modal: true,
                closeOnEscape: false,
                open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); $(".ui-dialog :button").blur();},
                buttons: {
                    "Yes": function() {
                        $(this).dialog('destroy');
                    },
                    "No": function() {
                        $(this).dialog('destroy');
                    }
                }
                });
        break;

		case "confirmautod":
            $( "#msg" ).remove();
            $("body").append("<div id='msg' style='display:none' class='label'><center>"+msg+"</msg>");
            $( "#msg" ).dialog({
                height: "auto",
				width: 350,
                resizable: false,
                modal: true,
                closeOnEscape: false,
                open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); $(".ui-dialog :button").blur();},
                buttons: {
                    "Overwrite": function() {
                        $(this).dialog('destroy');
						eval(todo)
                    },
                    "Update": function() {
                        $(this).dialog('destroy');
						eval(todo2)
                    },
                    "Cancel": function() {
                        $(this).dialog('destroy');
                    }
                }
                });
        break;
		case "YN":
            $( "#msg" ).remove();
            $("body").append("<div id='msg' style='display:none' class='label'><center>"+msg+"</msg>");
            $( "#msg" ).dialog({
                height: "auto",
				width: 350,
                resizable: false,
                modal: true,
                closeOnEscape: false,
                open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); $(".ui-dialog :button").blur();},
                buttons: {
                    "Yes": function() {	
                        $(this).dialog('destroy');
						devSanityFail('yes');
                    },
                    "No": function() {
                        $(this).dialog('destroy');
						devSanityFail('no');
                    }
                }
            });
        break;
		case "deleteload":
            $( "#msg" ).remove();
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId != null && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId != "" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId != undefined){
				msg += "<br/></br><input type='checkbox' id='cancelclearcanvas'/>  Release Reservation<br/><span style='font-size:10.5px;color:red'>Note : </span><span style='font-size:10.5px'>Reservation of the device/s in the canvas will be released.</span>";
			}
           	$("body").append("<div id='msg' style='display:none' class='label'><center>"+msg+"</msg>");
            $( "#msg" ).dialog({
                height: "auto",
				width: 350,
                resizable: false,
                modal: true,
                closeOnEscape: false,
                open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); $(".ui-dialog :button").blur();},
                buttons: {
                    "Yes": function() {	
                        $(this).dialog('destroy');
						if($('#cancelclearcanvas').is(':checked')){
							ReleaseFlagLoadActive = true;
						}
						eval(todo);
                    },
                    "No": function() {
						ReleaseFlagLoadActive = false;
                        $(this).dialog('destroy');
                    }
                }
            });
        break;
        default:
		 $( "#msg" ).remove();
            $("body").append("<div id='msg' style='display:none;' class='label'><center>"+msg+"</msg>");
            $( "#msg" ).dialog({
                height: "auto",
				width: "auto",
                modal: true,
                zIndex: 11503,
                resizable: false,
                closeOnEscape: false,
                open: function(event, ui) { $("#msg.ui-dialog-titlebar-close").hide(); $(".ui-dialog :button").blur();},
                buttons: {
                    "OK": function() {
                        $(this).dialog('close');
                        eval(todo);
                    }
                }
            });
        break;
    }
}
/*
 * FUNCTION NAME     :   withModal
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 28, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   setting modal
 * PARAMETERS        :	 
 */
function withModal(){
    if(!addingModal){

    }else{
        $('#modalID').remove();
        addingModal = false;
    }
}
/*
 * FUNCTION NAME     :   makeReadOnly
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 28, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   disables' textbox 
 * PARAMETERS        :	 opt
 */
function makeReadOnly(opt) {
    if (userInformation[0].userLevel != 'Administrator') {
        switch (opt) {
            case "loadImage":
                $('#LoadImageTable input:checkbox[name="loadImageSel"]').each(function() {
                    var dev = $(this).val();
                    if ($('#loadImageLocation'+dev).val() != "Custom") {
                        $('#tbLoadImageURL'+dev).attr('readonly','yes');
                        $('#tbLoadImageDestination'+dev).attr('disabled',true);
                    }
                });
            break;
            case "loadConfig":
                $('#LoadConfigTable input:checkbox[name="loadConfigSel"]').each(function() {
                    var dev = $(this).val();
                    if ($('#loadConfigLocation'+dev).val() != "Custom") {
                        $('#tbLoadConfigURL'+dev).attr('readonly','yes');
                        $('#tbLoadConfigDestination'+dev).attr('disabled',true);
                    }
                });
            break;
            case "loadPie":
                $('#LoadPieTable input:checkbox[name="loadPieSel"]').each(function() {
                    var dev = $(this).val();
                    if ($('#loadPieLocation'+dev).val() != "Custom") {
                        $('#tbLoadPieURL'+dev).attr('readonly','yes');
                        $('#tbLoadPieDestination'+dev).attr('disabled',true);
                    }
                });
            break;
           case "loadImageDetail":
                $('#LoadImageDetailTable input:checkbox[name="loadImageDetailSel"]').each(function() {
                    var dev = $(this).val();
                    if ($('#loadImageDetailLocation'+dev).val() != "Custom") {
                        $('#tbLoadImageDetailFilename'+dev).attr('readonly','yes');
                        $('#tbLoadImageDetailPath'+dev).attr('readonly','yes');
                        $('#tbLoadImageDetailIp'+dev).attr('readonly','yes');
                        $('#tbLoadImageDetailProtocol'+dev).attr('readonly','yes');
                        $('#tbLoadImageDetailDestination'+dev).attr('disabled',true);
                    }
                });
            break;
 			case "loadConfigDetail":
                $('#LoadConfigDetailTable input:checkbox[name="loadConfigDetailSel"]').each(function() {
                    var dev = $(this).val();
                    if ($('#loadConfigDetailLocation'+dev).val() != "Custom") {
                        $('#tbLoadConfigDetailFilename'+dev).attr('readonly','yes');
                        $('#tbLoadConfigDetailPath'+dev).attr('readonly','yes');
                        $('#tbLoadConfigDetailIp'+dev).attr('readonly','yes');
                        $('#tbLoadConfigDetailProtocol'+dev).attr('readonly','yes');
                        $('#tbLoadConfigDetailDestination'+dev).attr('disabled',true);
                    }
                });
            break;
  			case "loadPieDetail":
                $('#LoadPieDetailTable input:checkbox[name="loadPieDetailSel"]').each(function() {
                    var dev = $(this).val();
                    if ($('#loadPieDetailLocation'+dev).val() != "Custom") {
                        $('#tbLoadPieDetailFilename'+dev).attr('readonly','yes');
                        $('#tbLoadPieDetailPath'+dev).attr('readonly','yes');
                        $('#tbLoadPieDetailIp'+dev).attr('readonly','yes');
                        $('#tbLoadPieDetailProtocol'+dev).attr('readonly','yes');
                        $('#tbLoadPieDetailDestination'+dev).attr('disabled',true);
                    }
                });
            break;
       }
    }
}
/*
 * FUNCTION NAME     :   parseURL2
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 28, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   
 * PARAMETERS        :	 option, option2, dev
 */
function parseURL2(option,option2,dev) {

    $('input[name="'+option2+'DetailSel"]').each(function() {
        if ($(this).val() == dev) {
			var fname = $('#tb'+option+'DetailFilename'+dev).val();
                if (/:\/\//.test(fname) == true) {
                    var url = $('#tb'+option+'DetailFilename'+dev).val().split("://")[0];
                    $('#tb'+option+'DetailProtocol'+dev).val(url);
                    var restdet = $('#tb'+option+'DetailFilename'+dev).val().split("://")[1];
                    var restdet1 = restdet.split("\/");
                    if (restdet1.length == 3) {
                        $('#tb'+option+'DetailIp'+dev).val(restdet1[0]);
                        $('#tb'+option+'DetailPath'+dev).val(restdet1[1]);
                        $('#tb'+option+'DetailFilename'+dev).val(restdet1[2]);
                    } else {
                        $('#tb'+option+'DetailIp'+dev).val(restdet1[0]);
                        var ctr = 1;
                        var str = "";
                        for (var t = 1; t < restdet1.length - 1; t++) {
                            if (ctr == restdet1.length - 2) {
                                str += restdet1[t];
                            } else {
                                str += restdet1[t]+"\/";
                              }
                            ctr++;
                        }
                        $('#tb'+option+'DetailPath'+dev).val(str);
                        $('#tb'+option+'DetailFilename'+dev).val(restdet1[restdet1.length-1]);
                      }
				} else {
                    var urlmain = $('#tb'+option+'DetailFilename'+dev).val().split(":");
                    if ($('#tb'+option+'DetailFilename'+dev).val() == "") {
                        $('#tb'+option+'DetailPath'+dev).val("");
                        $('#tb'+option+'DetailIp'+dev).val("");
                        $('#tb'+option+'DetailProtocol'+dev).val("");
                        $('#tb'+option+'DetailFilename'+dev).val("");
                    } else if (urlmain.length > 1) {
                        var url = $('#tb'+option+'DetailFilename'+dev).val().split(":")[0];
                        var fname = $('#tb'+option+'DetailFilename'+dev).val().split(":")[1];
                        $('#tb'+option+'DetailPath'+dev).val(url);
                        $('#tb'+option+'DetailFilename'+dev).val(fname);
                    } else {
                        var url = $('#tb'+option+'DetailFilename'+dev).val().split(":")[0];
                        var isip = checkIP(url);

                        if (isip == 1) {//CHECK KUNG IP
                            if (/^TFTP|FTP$/i.test(url) == true) { //CHECK KUNG PROTOCOL
                                $('#tb'+option+'DetailProtocol'+dev).val(url);
                                $('#tb'+option+'DetailFilename'+dev).val("");
                                $('#tb'+option+'DetailPath'+dev).val("");
                                $('#tb'+option+'DetailIp'+dev).val("");
                            } else {
                                var islocal = validatePath(url);
                                if (islocal == 1) { //PARA SA PATH NA HINDI LOCAL STORAGE
                                    var urlArr = url.split("\/");
                                    if (urlArr.length == 1) {
                                        $('#tb'+option+'DetailFilename'+dev).val(url);
                                        $('#tb'+option+'DetailPath'+dev).val("");
                                        $('#tb'+option+'DetailProtocol'+dev).val("");
                                        $('#tb'+option+'DetailIp'+dev).val("");
                                    } else {
                                        if (/\./.test(urlArr[urlArr.length - 1]) == true ) {
                                            var patharr = new Array();
                                            for (var y = 0; y < urlArr.length; y++) {
                                                if (y != urlArr.length - 1) {
                                                    patharr.push(urlArr[y]);
                                                }
                                            }
											$('#tb'+option+'DetailPath'+dev).val(patharr.join("\/"));
                                            $('#tb'+option+'DetailFilename'+dev).val(urlArr[urlArr.length - 1]);
                                            $('#tb'+option+'DetailProtocol'+dev).val("");
                                            $('#tb'+option+'DetailIp'+dev).val("");
                                        } else {
                                            $('#tb'+option+'DetailPath'+dev).val(url);
                                            $('#tb'+option+'DetailFilename'+dev).val("");
                                            $('#tb'+option+'DetailProtocol'+dev).val("");
                                            $('#tb'+option+'DetailIp'+dev).val("");
                                          }
                                      }
                                } else {
                                    $('#tb'+option+'DetailPath'+dev).val(url);
                                    $('#tb'+option+'DetailFilename'+dev).val("");
                                    $('#tb'+option+'DetailProtocol'+dev).val("");
                                    $('#tb'+option+'DetailIp'+dev).val("");
                                  }
                              }
                        } else {
                            $('#tb'+option+'DetailIp'+dev).val(url);
                            $('#tb'+option+'DetailFilename'+dev).val("");
                            $('#tb'+option+'DetailProtocol'+dev).val("");
                            $('#tb'+option+'DetailPath'+dev).val("");
                          }
                      }
                  }
    }
    });

}
/*
 * FUNCTION NAME     :   getImageConfigLocation
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 28, 2014
 * MODIFIED BY       :	 kmmabignay
 * REVISION DATE 	 :	 March 21, 2014
 * REVISION #        :
 * DESCRIPTION       :   get location of file
 * PARAMETERS        :	 opt, opt2, val, from, dev, index
 */
function getImageConfigLocation(opt,opt2,val,from,index) {
	var devicesArr = getDevicesNodeJSON();
	for(var a=0; a<devicesArr.length; a++){
		var devIdFlag = (devicesArr[a].DeviceId!=undefined);
		var devresIdFlag = (devicesArr[a].DeviceResId!=undefined);
		var devId = devicesArr[a].DeviceId;
		var devResId = devicesArr[a].DeviceResId;
		if(devIdFlag && devId!='' && devId!=index
		|| devId=="" && devresIdFlag && devResId!='' && devResId!=index
		|| !devIdFlag && devresIdFlag && devResId!='' && devResId!=index){
			continue;
		}
		val = $("#"+opt2+"Location"+index).val();
		switch(true){
			case (from=="URL" && val=="Primary"):
				if(opt2=="loadImage"){
					$("#tbLoadImageURL"+index).val(devicesArr[a].SystemImageFile);
				}else if(opt2=="loadConfig"){
					$("#tbLoadConfigURL"+index).val(devicesArr[a].SystemConfigName);
				}else if(opt2=="loadPie"){
					$("#tbLoadPieURL"+index).val(devicesArr[a].SystemConfigName);
				}else if(opt2=="saveImage"){
					$("#tbSaveImageURL"+index).val(devicesArr[a].SystemImageFile);
				}else if(opt2=="saveConfig"){
					$("#tbSaveConfigURL"+index).val(devicesArr[a].SystemConfigName);
				}
				break;
			case (from=="URL" && val!="Primary"):
				$("#tb"+opt+"URL"+index).val("");
				break;
			case (from!="URL" && val=="Primary"):
				var imgpath=devicesArr[a].SystemImageFile.split(":");
				var conpath=devicesArr[a].SystemConfigName.split(":");
				if(opt2=="loadImage"){
					$("#tbLoadImageDetailPath"+index).val(imgpath[0]);
					$("#tbLoadImageDetailFilename"+index).val(imgpath[1]);
				}else if(opt2=="loadConfig"){
					$("#tbLoadConfigDetailPath"+index).val(conpath[0]);
					$("#tbLoadConfigDetailFilename"+index).val(conpath[1]);
				}else if(opt2=="loadPie"){
					$("#tbLoadPieDetailPath"+index).val(conpath[0]);
					$("#tbLoadPieDetailFilename"+index).val(conpath[1]);
				}else if(opt2=="saveImage"){
					$("#tbSaveImageDetailPath"+index).val(imgpath[0]);
					$("#tbSaveImageDetailFilename"+index).val(imgpath[1]);
				}else if(opt2=="saveConfig"){
					$("#tbSaveConfigDetailPath"+index).val(conpath[0]);
					$("#tbSaveConfigDetailFilename"+index).val(conpath[1]);
				}
				break;
			case (from!="URL" && val!="Primary"):
				$("#tb"+opt+"DetailPath"+index).val("");
				$("#tb"+opt+"DetailFilename"+index).val("");
				break;
		}
	}
}
/*
 * FUNCTION NAME     :   checkIP
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 28, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   validate IP
 * PARAMETERS        :	 entry
 */
function checkIP(entry) {
    var isOk = 0;

    var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (re.test(entry)) {
        if ( entry == "0.0.0.0" || entry == "255.255.255.255") {
            isOk = 1;
        } else {
            var parts = entry.split(".");
            if (parseInt(parseFloat(parts[0])) == 0) {
                isOk = 1;
            } else {
                  var ctrOctet = 0;
                  for (var i=0; i<parts.length; i++) {
                     if (parseInt(parseFloat(parts[i])) > 255) {
                        ctrOctet = 1;
                     }
                  }
                  if (ctrOctet == 1) {
                    isOk = 1;
                  }
             }
          }
    } else {
        isOk = 1;
      }

    if (isOk == 1) {
        return 1;
    } else {
        return 0;
    }
}
/*
 * FUNCTION NAME     :   validateReservationOption
 * AUTHOR            :   Anna Marie Paulo
 * DATE              :   February 28, 2014
 * MODIFIED BY       :
 * REVISION DATE 	 :
 * REVISION #        :
 * DESCRIPTION       :   validation in srat and end reservation
 * PARAMETERS        :	 imgarr, flag, opt, opt2, opt3
 */
function validateReservationOption(imgarr,flag,opt,opt2,opt3) {
    var hostname = new Array();
    var hostname2 = new Array();
    for ( var t=0 ; t < imgarr.length ; t++) {
        switch (flag) {
            case 0:
				if ($('#tb'+opt+opt3+'URL'+imgarr[t]).val() == "") {
                    var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                    hostname.push(host);
                } else {
                    var url = $('#tb'+opt+opt3+'URL'+imgarr[t]).val();
                    var url2 = url.split(":");
                    if ( url2.length != 2 ) {
                        var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                        hostname.push(host);
                    } else {
                        url2 = url.split(":")[0];
                        url2 = url2.toLowerCase();
                        if (/^disk[0-2]|disk$/.test(url2) == false && /^slot[0-1]$/.test(url2) == false && /^NVRAM$/.test(url2) == false && /^bootflash$/.test(url2) == false && /^FTP$/i.test(url2) == false && /^TFTP$/i.test(url2) == false && /^flash[0-1]|flash$/.test(url2) == false) {
                            var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                            hostname.push(host);
                        //} else if ( /^FTP$/i.test(url2) == true ||  /^TFTP$/i.test(url2) == true ) {
                            var url3 = url.split(":\/\/")[1].split("\/");
							if (url3.length < 3) {
                                var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                                hostname.push(host);
                            } else {
                                var ip = url3[0];
                                var isvalidIP = checkIP(ip);
                                if (isvalidIP == 1) {
                                    var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                                    hostname.push(host);
                                } else {
                                    var ctr = 1;
                                    var str = "";
                                    for (var k = 1; k < url3.length - 1; k++) {
                                        if (ctr == url3.length - 2) {
                                            str += url3[k];
                                        } else {
                                            str += url3[k]+"\/";
                                        }
                                        ctr++;
                                    }
                                    var isvalidpath = validatePath(str);
                                    if ( isvalidpath == 1 ) {
										 var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                                        hostname.push(host);
                                    } else {
                                        var fname = url3[url3.length - 1];
                                        var isvalidfile = validateFileName(fname,str);
                                        if (isvalidfile == 1) {
                                            var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                                            hostname.push(host);
                                        }
                                    }
                                }
                            }
                        } else if (/^disk[0-2]|disk$/.test(url2) == true || /^slot[0-1]$/.test(url2) == true || /^NVRAM$/.test(url2) == true || /^bootflash$/.test(url2) == true || /^flash[0-1]|flash$/.test(url2) == true) {
                        }
                    }
                }
				 if ($('#tb'+opt+opt3+'Destination'+imgarr[t]).val() == "") {
                    var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                    hostname2.push(host);
                } else {
                    if (opt2.toLowerCase() == 'loadimage') {
                        var url = $('#tb'+opt+opt3+'Destination'+imgarr[t]).val();
                        var filename = $('#tb'+opt+opt3+'URL'+imgarr[t]).val();
                        if (filename.indexOf(url) !== -1) {
                            var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                            hostname2.push(host);
                        }
                    }
                }
            break;
            case 1:
				var proto2 = $('#tb'+opt+opt3+'DetailProtocol'+imgarr[t]).val();
                var ip = $('#tb'+opt+opt3+'DetailIp'+imgarr[t]).val();
                var path = $('#tb'+opt+opt3+'DetailPath'+imgarr[t]).val();
                var fname = $('#tb'+opt+opt3+'DetailFilename'+imgarr[t]).val();
                var dest = $('#tb'+opt+opt3+'DetailDestination'+imgarr[t]).val();
                if (proto2 == "" && ip == "" && path == "" && fname == "" && dest == "") {
                    var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                    hostname.push(host);
                } else { //PROTOCOL
                    var isvalidproto = validateProtocol(proto2,path);
                    if (isvalidproto == 1) {
                        var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                        hostname.push(host);
                    } else {
						if (/^disk[0-2]|disk$/.test(path) == true || /^slot[0-1]$/.test(path) == true || /^NVRAM$/.test(path) == true || /^bootflash$/.test(path) == true || /^flash[0-1]|flash$/.test(path) == true) {
                            var isvalidip = 0;
                        } else {
                            var isvalidip = checkIP(ip);
                        }
                        if (isvalidip == 1) {
                            var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                            hostname.push(host);
                        } else {
							var isvalidpath = validatePath(path);
                            if (isvalidpath == 1) {
                                var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                                hostname.push(host);
                            } else {
								var isvalidfile = validateFileName(fname,path);
                                if (isvalidfile == 1) {
                                    var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                                    hostname.push(host);
                                }
                              }
                          }
                      }
                  }
				 if ($('#tb'+opt+opt3+'Destination'+imgarr[t]).val() == "") {
                    var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                    hostname2.push(host);
    	         } else {
	                 if (opt2.toLowerCase() == 'loadimage') {
                        var proto2 = $('#tb'+opt+opt3+'DetailProtocol'+imgarr[t]).val();
                        var path = $('#tb'+opt+opt3+'DetailPath'+imgarr[t]).val();
                        var url = $('#tb'+opt+opt3+'Destination'+imgarr[t]).val();
                        if (proto2.toLowerCase() == url) {
                            var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                            hostname2.push(host);
                        } else if (path.toLowerCase() == url) {
                            var host = $('#tr'+opt2+opt3+imgarr[t]).find('td').eq(1).text();
                            hostname2.push(host);
                          }
                    }
                }
            break;
        }
    }
	var msg = "";
    if (hostname.length > 0) {
        msg = "Invalid "+opt3+" URL for the following device(s):<br/><br/>";
        for (var u= 0; u < hostname.length; u++) {
            msg += hostname[u]+"<br/>";
        }
        msg += "<br/>(sample: TFTP://"+CURRENT_IP+"/Directory/FileName or disk0:FileName)<br/>";
		if (hostname2.length > 0) {
            msg += "<br/>Invalid "+opt3+" Destination for the following device(s):<br/><br/>";
            for (var u= 0; u < hostname2.length; u++) {
                msg += hostname2[u]+"<br/>";
            }
        }
	} else if (hostname2.length > 0) {
        msg = "Invalid "+opt3+" Destination for the following device(s):<br/><br/>";
        for (var u= 0; u < hostname2.length; u++) {
            msg += hostname2[u]+"<br/>";
        }
      }
    if (msg != "") {
/*        $('#manualAlert').dialog({
            autoOpen: false,
            resizable: false,
            modal: true,
            height: 250,
            width: 350,
            closeOnEscape: false,
            open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
            buttons: {
                "OK": function() {
                    $(this).dialog('destroy');
                }
            }
        });
        $('#manualAlert').empty().append(msg);
        $('#manualAlert').dialog("open");
        $('.ui-dialog :button').blur();*/
		return msg;
      }
	return;
}

 
/*
 *FUNCTION NAME : deviceSession() 
 *AUTHOR 		:Mary Grace P. Delos Reyes
 *DATE			:January 29, 2014
 *MOTIFIED BY	:
 *REVISON DATE	:
 *REVISON # 	:
 *DESCRIPTION	:To Configuration for device
 *PARAMETERS	:(e,val)
*/
function deviceSession(e,val){
	if (e.keyCode == 13 ||  e == 'send'){
		var selectArr = seletedSessionId.split("__");
		var msg = $('#consoledevice').val();
		 var url ="https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/FastConsoleCgi.py?action=consolesocketsender&query={'row':[{'username':'"+globalUserName+"','deviceId':'"+selectArr[0]+"','sessionId':'"+selectArr[1]+"','type':'"+selectArr[2]+"','message':'"+val+"'}]}";
		$.ajax({
        	url: url,
	        dataType: 'html',
			method: 'POST',
			proccessData: false,
			async:false,
    	    success: function(data) {
				/*var dat = data.replace(/'/g,'"');
				dat = dat.split(">").join(",,");
				var json = $.parseJSON(dat);
				var parsed =json.RESULT[0].Result;
				if(parsed != ""){
					parsed = parsed.split(",,").join(">");*/
				if(data != ""){
					data = data.split("::").join("\n");
					$("#consoledevice").val(data);
					getActiveUser();
					clearInterval(setInt);
					setInt ="";
					globalRefresh = true;
            		refreshConsole();
				}
			}
		});
		$('#consoletext').val("");
	}
}
/*FUNCTION NAME :refreshConsole
 *AUTHOR        :Mary Grace P. Delos Reyes
 *DATE          :March 14, 2014
 *MOTIFIED BY   :
 *REVISON DATE  :
 *REVISON #     :
 *DESCRIPTION   : refresh for console
 *PARAMETERS    :
 *
*/

function refreshConsole(){
    if (globalRefresh == true){
        clearInterval(setInt);
		setInt ="";
        setInt = setInterval(function(){
                loadConsole();
        },8000);
    }else if (globalRefresh == false){
        clearInterval(setInt);
            setInt ="";
    }
}
/*FUNCTION NAME :refreshChat
 *AUTHOR        :Mary Grace P. Delos Reyes
 *DATE          :March 14, 2014
 *MOTIFIED BY   :
 *REVISON DATE  :
 *REVISON #     :
 *DESCRIPTION   : refresh for chat
 *PARAMETERS    :
 *
*/

function refreshChat(){
    if (globalRefresh == true){
        clearInterval(setInt);
		setInt ="";
        setInt = setInterval(function(){
                loadChatSession();
        },8000);
    }else if (globalRefresh == false){
        clearInterval(setInt);
            setInt ="";
    }
}


/*FUNCTION NAME	:readuserlogs 
 *AUTHOR		:Mary Grace P. Delos Reyes
 *DATE			:March 13, 2014
 *MOTIFIED BY 	:
 *REVISON DATE	:
 *REVISON #		:
 *DESCRIPTION 	:refresh for console 
 *PARAMETERS	:
 *
*/


function loadConsole(){
	var selectArr = seletedSessionId.split("__");
	//var url =getURL('Console') + "action=readuserlogs&query={'row':[{'username':'"+globalUserName+"','sessionId':'"+selectArr[1]+"'}]}" 
	var devicesStr = deviceQstr(device); 
 	var url = getURL('Console') + "action=sessionIdCreator&query={'MAINCONFIG': [{'UserName': '"+globalUserName+"','ResourceId': '"+globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId+"','To': '','ActiveSession':'"+selectArr[1]+"','DEVICE' : "+devicesStr + "}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		method: 'POST',
		proccessData : false,
		async:false,
		success: function(data) {
			var str ='' ;
			/*var dat = data.split("(\"").join(",:,");
			dat = dat.split("\")").join(":,:");
			dat = data.replace(/'/g,'"');
			dat = dat.split(">").join(",,");
			var json = $.parseJSON(dat);
			var parsed =json.RESULT[0].Result;
			if(parsed != ""){
				parsed = parsed.split(",,").join(">");
				parsed = parsed.split("::").join("\n");
				parsed = parsed.split(":,:").join("\")");
				parsed = parsed.split(",:,").join("(\"");*/
			if(data != ""){
				data = data.split("::").join("\n");
				$("#consoledevice").val(data);
			}
			getActiveUser();
			//}
		}
	});		
													
}

/*FUNCTION NAME	: chatList
 *AUTHOR		:Mary Grace P. Delos Reyes
 *DATE			:February 1, 2014
 *MOTIFIED BY 	:
 *REVISON DATE	:
 *REVISON #		:
 *DESCRIPTION 	:Chat Session 
 *PARAMETERS	:(e,val)
 *
*/


function chatSession(e,val){
if (e.charCode == 13 || e=='send') {
	var msg = $('chatMsg').val();
	val = $('#textLogs').val();
//	var url ="https://"+CURRENT_IP +"/cgi-bin/Final/NFast_RM/NFastRMCGI.py?"
//	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/FastConsoleCgi.py?action=sendmessage&query=usernameSender='+globalUserName+'^usernameReceiver='+globalReciever+'^message='+val;
	var url = "https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/FastConsoleCgi.py?action=sendmessage&query={'QUERY': [{'message': '"+val+"', 'usernameSender': '"+globalUserName+"', 'usernameReceiver': '"+globalReciever+"'}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		method: 'POST',
		proccessData : false,
		async:false,
		success: function(data) {
		    var str ='' ;
			/*var parser = new DOMP
			var xmlDoc =parser.parseFromString(data, "text/xml");
			var row = xmlDoc.getElementsByTagName("row");*/
			dat = data.replace(/'/g,'"');
			var json = $.parseJSON(dat);
			var parsed =json.data[0].row;
			for (var i=0; i<parsed.length; i++){
				var sender = parsed[i].usernameSender;
				var receiver = parsed[i].usernameReceiver;
				var time = parsed[i].timestamp;
				var message = parsed[i].message;
				if (sender == globalUserName){
					str += "<div style ='text-align:right; border-bottom:1px solid #bdbdbd;'><div style='text-align:left; width:10px;'> "+ time +" </div> "+ message +" </div>";
				}else{
					str += "<div style ='text-align:right; border-bottom:1px solid #bdbdbd;'> "+ message +" <div style ='text-align:left;width:10px;'> "+ time +" </div></div>";
				}
			}
				$("#chatMsg").append(str);
				loadChatSession();
			}
	  				
	});
	$("#textLogs").val(globalReciever);
	}
}

/*FUNCTION NAME	:multipleSession 
 *AUTHOR		:Mary Grace P. Delos Reyes
 *DATE			:mach 26, 2014
 *MOTIFIED BY 	:
 *REVISON DATE	:
 *REVISON #		:
 *DESCRIPTION 	:Chat group Conversation
 *PARAMETERS	:
 *
*/



/*FUNCTION NAME	: loadChatSession
 *AUTHOR		:Mary Grace P. Delos Reyes
 *DATE			:February 1, 2014
 *MOTIFIED BY 	:
 *REVISON DATE	:
 *REVISON #		:
 *DESCRIPTION 	:Chat load
 *PARAMETERS	:
 *
*/



function loadChatSession(){
//	var url ="https://"+CURRENT_IP +"/cgi-bin/Final/NFast_RM/NFastRMCGI.py?"
//	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/FastConsoleCgi.py?action=getmessage&query=username='+globalReciever+'^userFrom='+globalUserName;
//	var query = "username="+globalReciever+"^userfrom="+globalUserName";
	var url = "https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/FastConsoleCgi.py?action=getmessage&query={'QUERY': [{'userName':'"+globalReciever+"','userFrom:'"+globalUserName+"'}]}";

	$.ajax({
		url: url,
		dataType: 'html',
		method: 'POST',
		proccessData : false,
		async:false,
		success: function(data) {
		    var str ='' ;
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data); 
			var parsed = json.data[0].row;
			for (var i = 0;i<parsed.length; i++){
				var sender = parsed[i].UsernameTo;
				var receiver = parsed[i].UsernameFrom;
				var time = parsed[i].TimeStamp;
				var message = parsed[i].Message;	
				if (receiver == globalUserName || sender== globalUserName){
			str += "<div style ='text-align:right; border-bottom:1px solid #bdbdbd;'><div style='text-align:left; width:10px;'> "+ time +" </div> "+ message +" </div>";
				}else{
					str += "<div style ='text-align:right; border-bottom:1px solid #bdbdbd;'> "+ message +" <div style ='text-align:left;width:10px;'> "+ time +" </div></div>";
				}
			}
			$("#chatMsg").html(str);
			data = $.trim(data);
			if (data != "0"){
			$("#textLogs").html(data);
			}	
		}		
	});
}


/*FUNCTION NAME	:SearchUserName
 *AUTHOR		:Mary Grace P. Delos Reyes
 *DATE			:February 20, 2014
 *MOTIFIED BY 	:
 *REVISON DATE	:
 *REVISON #		:
 *DESCRIPTION 	:
 *PARAMETERS	:
 *
*/

function searchUserName(){
//	var url ="https://"+CURRENT_IP +"/cgi-bin/Final/NFast_RM/NFastRMCGI.py?"
	var url = getURL('RM');
	var action = "searchuseradd"
	var query = "<data username = '"+globalUserName+"' userToSearch = 'graceeh'  groupChatFlag = '0' addFlag = '0' sessionId = '0' sessionCookie = '0' sessionDate = '0' deviceName = '0' userHost = '0'/>";

	$.ajax({
		url: url,
		data: {
			"action":action,
			"query":query,
		},
		dataType: 'html',
		method: 'POST',
		proccessData : false,
		async:false,
		success: function(data) {
			data = $.trim(data);
	//		str = "";
	//		$("#).each({
	//		for (var  i=0; i<listonline.length; i++ ){
	//			str+= "<li><a href='#listonline'>"+globalUserName+"</a></li>";
	//		}				
		}
	});
}
/*FUNCTION NAME	:SearchUserName
 *AUTHOR		:Mary Grace P. Delos Reyes
 *DATE			:March 6, 2014
 *MOTIFIED BY 	:
 *REVISON DATE	:
 *REVISON #		:
 *DESCRIPTION 	:Search for User 
 *PARAMETERS	:
 
*/


function SearchUserName(){
var val =$('#SearchUserName').val();
if (e.charCode == 13){
//	var url ="https://"+CURRENT_IP +"/cgi-bin/Final/NFast_RM/NFastRMCGI.py?"
	var url = getURL('RM');
	var action = "autocomplete"
	var query = "<data search = '"+val+"' />"
		$.ajax({
		url: url,
		data: {
			"action":action,
			"query":query,
		},
		dataType: 'html',
		method: 'POST',
		proccessData : false,
		async:false,
		success: function(data) {
			data = $.trim(data);
		//	$('#SearchUserName').autocomplete({
		//	data: UserName,
		//	onSelect: function(){	
		//		var UserName ='<strong>UserName:</strong>'+ query +' <br>;
		//		$('#SearchUserName').val(UserName);
		//	});
//				}	
				$('#listonline').append(str);
			}
		});
				
	}
}


/*FUNCTION NAME	:pdfDownload
 *AUTHOR		:Mary Grace P. Delos Reyes
 *DATE			:February 20, 2014
 *MOTIFIED BY 	:
 *REVISON DATE	:
 *REVISON #		:
 *DESCRIPTION 	:Print Console Device Information
 *PARAMETERS	:
 *
*/

function pdfDownload(){ 
	var url = "https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/FastConsoleCgi.py?action=configdlpdf&query={'QUERY':[{'username':'"+globalUserName+"'}]}";
 
		window.location.href = url + query ;
}



/*FUNCTION NAME	:delHistory
 *AUTHOR		:Mary Grace P. Delos Reyes
 *DATE			:March 4, 2014
 *MOTIFIED BY 	:
 *REVISON DATE	:
 *REVISON #		:
 *DESCRIPTION 	:
 *PARAMETERS	:
 *
*/

function delHistory(){
	 $("#textHistory").empty();
}
/*
 *
 *  FUNCTION NAME :showGroupName
 *  AUTHOR        :Mary Grace P. Delos Reyes
 *  DATE          :march 11,2014
 *  MODIFIED BY   :Angeline Bringas
 *  REVISION DATE :March 11,2014
 *  REVISION #    :1
 *  DESCRIPTION   :group namelist 
 *  PARAMETERS    :shows group name that was created 
 *
 */
function showGroupName(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/RESERVATIONMANAGER/FastConsoleCgi.py?action=getgroupnamelist&query={'QUERY':[{'username':'"+globalUserName+"'}]}";
		$.ajax({
		url: url,
		dataType: 'html',
		method: 'POST',
		proccessData : false,
		async:false,
		success: function(data) {
			data = $.trim(data);
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
				for (var i = 0; i< json.data[0].row.length; i++ ){
					var groupname = json.data[0].row[i].GroupName;
					var hostname =	json.data[0].row[i].HostName;
					var usermember = json.data[0].row[i].UserMember;
				str += "<li style='font-size:10px;list-style:none;cursor:pointer;text-align:left;margin-left:4px;' class='createdGroup'>"+groupname+"</li>"				
				}
				$('#grouplist').html(str);
			}
	});
}

/*
 *
 *  FUNCTION NAME : clickPicker
 *  AUTHOR        : James Turingan
 *  DATE          : February 21, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : show picker
 *  PARAMETERS    : 
 *
 */

$('#').hover(function(){
	$('#addBtn').show(1000);
});
function clickPicker(){
	$( "#confirm_test" ).datepicker();
	$( "#confirm_test2" ).datepicker();
	$("#confirm_test1").timepicker({
		ampm: false,
		showTime: true,
		datepicker:false,
		timeFormat: 'hh:mm:ss',
		showSecond: true,
		hourGrid: 6,
		minuteGrid: 10,
	   secondGrid: 10
	});
	$("#confirm_test3").timepicker({
		ampm: false,
		showTime: true,
		datepicker:false,
		timeFormat: 'hh:mm:ss',
		showSecond: true,
		hourGrid: 6,
		minuteGrid: 10,
	   secondGrid: 10
	});

}



	
/*
 *
 *  FUNCTION NAME : autoCreateLine
 *  AUTHOR        : James Turingan
 *  DATE          : February 21, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : auto creates link or line when selecting full mesh or hub and spoke in Device List
 *  PARAMETERS    : 
 *
 */
function autoCreateLine(){
	if(globalInfoType == "XML"){
		var dev = devicesArr;
	}else{
		var dev = getDevicesNodeJSON();
	}
	var type='';
	$('input:checkbox[name="radio"]').each(function(){
		if($(this).is(":checked")){
			type = $(this).val();
		}
	});
	if(type == "hubspoke"){
		for(var i = 1 ; i < dev.length; i++){
			var lineInfo = checkSamePort(dev[0],dev[i])
			var name = lineInfo[0]+"_"+i;
			if(lineInfo.length > 0){
				storeLinkInformation(name,dev[0],dev[i],"","","","","","","",lineInfo[2],lineInfo[1],"","","","","","","","","");
			}
		}
	}else if(type == "fullmesh"){
		for(var i = 0 ; i < dev.length; i++){
			for(var x = 0 ; x < dev.length; x++){
				if(dev[i].HostName != dev[x].HostName){
					var lineInfo = checkSamePort(dev[i],dev[x]);
					var name = lineInfo[0]+"_"+i;
					if(lineInfo.length > 0){
						storeLinkInformation(name,dev[i],dev[x],"","","","","","","",lineInfo[2],lineInfo[1],"","","","","","","","","");	
					}
				}
			}
		}
	
	}
}
/*
 *
 *  FUNCTION NAME : checkSamePort
 *  AUTHOR        : James Turingan
 *  DATE          : February 21, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : checks for them same port of each devices
 *  PARAMETERS    : 
 *
 */

function checkSamePort(devices,devices2){
	var dataArr = [];
    var prtArr = getAllPortOfDevice(devices.ObjectPath);
    var portTempArr = getAllPortOfDevice(devices2.ObjectPath);

	for(var a=0; a<prtArr.length; a++){
		var dev = prtArr[a].ObjectPath.split(".");
		var portDev=dev[0];
			var LCPortName = prtArr[a].PortName;
			var LCPortFlag = prtArr[a].PortFlag;
			var LCSpeed = prtArr[a].Speed;
			var LCPortType = prtArr[a].PortType;
			var LCPath = prtArr[a].ObjectPath;
			var LCSwitch = prtArr[a].SwitchInfo;
			for (var q=0; q<portTempArr.length; q++){
				var TCPortName = portTempArr[q].PortName;
				var TCSwitch = portTempArr[q].SwitchInfo;
				var TCSpeed = portTempArr[q].Speed;
				var TCPortType = portTempArr[q].PortType;
				var TCPortFlag = portTempArr[q].PortFlag;
				var TCPath = portTempArr[q].ObjectPath;
				var name= 't'+TCSpeed.substring(0,TCSpeed.length - 3)+'gb';
				if(LCPortType == "L1" && LCSpeed == TCSpeed && TCPortType == LCPortType && TCPortFlag ==""){
					
					portTempArr[q].PortFlag = true;
					prtArr[a].PortFlag = true;
					q = portTempArr.length;
					a = prtArr.length;
					dataArr.push(name,LCPath,TCPath);
					
				}				
			}
	}
	
/// SOURCE
/*	if(devices.PORT){
		for(var a = 0; a < devices.PORT.length; a++){
			if(devices.PORT[a].PortFlag == "" && devices.PORT[a].PortType.toLowerCase() != 'open'){
				var type = devices.PORT[a].PortType;
				var speed = devices.PORT[a].Speed;
				var switchinfo = devices.PORT[a].SwitchInfo.split('^');
				var sourcePath = devices.PORT[a].ObjectPath;
				var sourceFlag = devices.PORT[a];			        	
				a = devices.PORT.length;
				break;
			}

		}
		dataArr = destinationPort(devices2,type,speed,sourcePath,switchinfo,sourceFlag);
		return dataArr;

	}else if(devices.SLOT){
		for(var a = 0; a < devices.SLOT.length; a++){
			if(devices.SLOT[a].MODULE){
				for(var b=0; b < devices.SLOT[a].MODULE.length; b++){
					for(var c = 0; c < devices.SLOT[a].MODULE[b].PORT.length; c++){
						if(devices.SLOT[a].MODULE[b].PORT[c].PortFlag == "" && devices.SLOT[a].MODULE[b].PORT[c].PortType.toLowerCase() != 'open'){
							var type = devices.SLOT[a].MODULE[b].PORT[c].PortType;
							var speed = devices.SLOT[a].MODULE[b].PORT[c].Speed;
							var switchinfo =devices.SLOT[a].MODULE[b].PORT[c].SwitchInfo.split('^');
							var sourcePath = devices.SLOT[a].MODULE[b].PORT[c].ObjectPath;
							var sourceFlag = devices.SLOT[a].MODULE[b].PORT[c];			        	
							break;
							a = devices.SLOT.length;
						}
					}
				}
				dataArr = destinationPort(devices2,type,speed,sourcePath,switchinfo,sourceFlag);
				return dataArr;

			}else if(devices.SLOT[a].PORT){
				for(var b=0; b < devices.SLOT[a].PORT.length; b++){
					if(devices.SLOT[a].PORT[b].PortFlag == "" && devices.SLOT[a].PORT[b].PortType.toLowerCase() != 'open'){
						var type = devices.SLOT[a].PORT[b].PortType;
						var speed = devices.SLOT[a].PORT[b].Speed;
						var switchinfo =devices.SLOT[a].PORT[b].SwitchInfo.split('^');
						var sourcePath = devices.SLOT[a].PORT[b].ObjectPath;
						var sourceFlag = devices.SLOT[a].PORT[b];
						break;
						a = devices.SLOT.length;
					}

				}
				dataArr = destinationPort(devices2,type,speed,sourcePath,switchinfo,sourceFlag);

			}
		}
	}*/
// DESTINATION
	return dataArr;
}
function destinationPort(devices2,type,speed,sourcePath,switchinfo,sourceFlag){
	var dataArr=[];
	if(devices2.PORT){
		for(var x = 0; x < devices2.PORT.length; x++){
			if(devices2.PORT[x].PortFlag == "" && devices2.PORT[x].PortType.toLowerCase() != 'open'){
				var type2 = devices2.PORT[x].PortType;
				var speed2 = devices2.PORT[x].Speed;
				var switchinfo2 = devices2.PORT[x].SwitchInfo.split('^');
				if(devices2.PORT[x].PortType == "L1" && devices2.PORT[x].PortFlag == "" && type == type2 && speed == speed2 && switchinfo[0] == switchinfo2[0] ){  /// L1 checking
					var destPath = devices2.PORT[x].ObjectPath;
					var name= 't'+speed2.substring(0,speed2.length - 3)+'gb';
//			    	        if(sourcePath != destPath){
							dataArr = [];		    	        				
						dataArr.push(name,sourcePath,destPath);
						devices2.PORT[x].PortFlag = "true";
						sourceFlag = "true";
						break;
						x =  devices2.PORT.length;
//		                	}
				}else if(type == type2 && switchinfo[0] == switchinfo2[0] && devices2.PORT[x].PortType == "L2" ){ // L2 checking
					var destPath = devices2.PORT[x].ObjectPath;
					var name= 't'+speed2.substring(0,speed2.length - 3)+'gb';
							dataArr = [];		    	        				
					dataArr.push(name,sourcePath,destPath);
					devices2.PORT[x].PortFlag = "true";
					x =  devices2.PORT.length;
					sourceFlag = "true";
					break;
				}
			}

		}
		return dataArr;
	}else if( devices2.SLOT){
		dataArr =  destinationSlotChild(devices2, type,speed,sourcePath,switchinfo,sourceFlag);
		return dataArr;
	}else if(device2.RACK){

	}else if(devices2.MODULE){

	}
}

function destinationSlotChild(devices2,type,speed,sourcePath,switchinfo,sourceFlag){
	
	var dataArr=[];
	for(var x = 0; x < devices2.SLOT.length; x++){
		if(devices2.SLOT[x].MODULE){
			for(var y=0; y < devices2.SLOT[x].MODULE.length; y++){
				for(var z = 0; z < devices2.SLOT[x].MODULE[y].PORT.length; z++){
					if(devices2.SLOT[x].MODULE[y].PORT[z].PortFlag == "" && devices2.SLOT[x].MODULE[y].PORT[z].PortType.toLowerCase() != 'open'){
						var type2 = devices2.SLOT[x].MODULE[y].PORT[z].PortType;
						var speed2 = devices2.SLOT[x].MODULE[y].PORT[z].Speed;
						var switchinfo2 = devices2.SLOT[x].MODULE[y].PORT[z].SwitchInfo.split('^');
						if(devices2.SLOT[x].MODULE[y].PORT[z].PortType == "L1" && devices2.SLOT[x].MODULE[y].PORT[z].PortFlag == "" && type == type2 && speed == speed2 && switchinfo[0] == switchinfo2[0] ){  /// L1 checking
							var destPath = devices2.SLOT[x].MODULE[y].PORT[z].ObjectPath;
							var name= 't'+speed2.substring(0,speed2.length - 3)+'gb';
//			    	        if(sourcePath != destPath){
								dataArr = [];			    	        
								dataArr.push(name,sourcePath,destPath);
								devices2.SLOT[x].MODULE[y].PORT[z].PortFlag = "true";
								sourceFlag = "true";
								break;
								x = devices2.SLOT.length;
//		                	}
						}else if(type == type2 && switchinfo[0] == switchinfo2[0] && devices2.SLOT[x].MODULE[y].PORT[z].PortType == "L2" ){ // L2 checking
							var destPath = devices2.SLOT[x].MODULE[y].PORT[z].ObjectPath;
							var name= 't'+speed2.substring(0,speed2.length - 3)+'gb';
//			    	        if(sourcePath != destPath){
								dataArr = [];			    	        
								dataArr.push(name,sourcePath,destPath);
								devices2.SLOT[x].MODULE[y].PORT[z].PortFlag = "true";
								sourceFlag = "true";
								break;
								x = devices2.SLOT.length;
//		                	}
						}
					}

				}

			}
		}else if(devices2.SLOT[x].PORT){
			for(var x1=0; x1 < devices2.SLOT[x].PORT.length; x1++){
				if(devices2.SLOT[x].PORT[x1].PortFlag == "" && devices2.SLOT[x].PORT[x1].PortType.toLowerCase() != 'open'){
					var type2 = devices2.SLOT[x].PORT[x1].PortType;
					var speed2 =devices2.SLOT[x].PORT[x1].Speed;
					var switchinfo2 = devices2.SLOT[x].PORT[x1].SwitchInfo.split('^');
					if(devices2.SLOT[x].PORT[x1].PortType == "L1" && devices2.SLOT[x].PORT[x1].PortFlag == "" && type == type2 && speed == speed2 && switchinfo[0] == switchinfo2[0] ){  /// L1 checking
						var destPath = devices2.SLOT[x].PORT[x1].ObjectPath;
						var name= 't'+speed2.substring(0,speed2.length - 3)+'gb';
//		    	        if(sourcePath != destPath){
							dataArr = [];			    	        
							dataArr.push(name,sourcePath,destPath);
							devices2.SLOT[x].PORT[x1].PortFlag = "true";
							sourceFlag = "true";
							break;
							x =  devices2.SLOT.length;
//		               	}
					}else if(type == type2 && switchinfo[0] == switchinfo2[0] && devices2.SLOT[x].PORT[x1].PortType == "L2" ){ // L2 checking
						var destPath = devices2.SLOT[x].PORT[x1].ObjectPath;
						var name= 't'+speed2.substring(0,speed2.length - 3)+'gb';
//		    	        if(s	ourcePath != destPath){
							dataArr = [];		    	        				
							dataArr.push(name,sourcePath,destPath);
							devices2.SLOT[x].PORT[x1].PortFlag = "true";
							sourceFlag = "true";
							break;
							x =  devices2.SLOT.length;
//		               	}

					}
				}

			}
		}
	}
	return dataArr;
} 
/*
 *
 *  FUNCTION NAME : checkAvailablePorts
 *  AUTHOR        : James Turingan
 *  DATE          : February 22, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : checks if there's available ports
 *  PARAMETERS    : src,dest
 *
 */
var counterPort=0;
function checkAvailablePorts(){
	
}
function getSelectedDomain(val){
	window['variable' + dynamicDomain[pageCanvas] ] = val;
//	loadGridMenuContent();
}

/*
 *
 *  FUNCTION NAME : serverListPopupTable 
 *  AUTHOR        : James Turingan
 *  DATE          : February 28, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function serverListPopupTable(load,tab){
	if(globalDeviceType == "Mobile"){
		$("#configFooter").hide();
	}
	globalDeviceListLoad = "";
	globalDeviceListLoad = load;
	imgXPos = 152;
	imgYPos = 24;

	globalFlag = false;
	checkLCArray=[]
	var hasDevName = getHasDevNameOnArray();
//	var url = "/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi"
	if (tab == "import"){
		var query = "manual=server^user="+globalUserName+"^domainname="+window['variable' + dynamicDomain[pageCanvas] ]+"^zone=^imported=1^hostname="+hasDevName;
	}else{
		var query = "manual=server^user="+globalUserName+"^domainname="+window['variable' + dynamicDomain[pageCanvas] ]+"^zone=^imported=0^hostname="+hasDevName;
	}
	if(globalDeviceType == "Mobile"){
        loading('show');
    }
//	var url = "https://"+CURRENT_IP+url;
	var action = "devicelist";
	$.ajax({
		url: getURL("ConfigEditor","JSON"),
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
			data = $.trim(data);
			if (data == "nodevice"){
				if(globalDeviceType == "Mobile"){
					loading("hide");
					$.mobile.changePage($('#configEditorPage'),{
								transition: "pop"
							});
				}
				alerts("No Available Device");
				$( "#configPopUp" ).dialog('destroy');
				return;
			}else if (data == "databasetimeout"){
				if(globalDeviceType == "Mobile"){
					loading("hide");
				}
				alerts("Database Timeout");
				if(globalDeviceType == "Mobile"){
					$.mobile.changePage($('#configEditorPage'),{
							transition: "pop"
					});
				}
				return;
			}else if (data == ""){
				if(globalDeviceType == "Mobile"){
					loading("hide");
					$.mobile.changePage($('#configEditorPage'),{
								transition: "pop"
							});
				}
				alerts("Database Timeout");
				return;
			}
			var condition = checkIfTabAvailable(data);
			if(globalDeviceType == "Mobile"){
				loading("hide");
				appendToDeviceListTable(data,condition,load,tab);
			}else{
				appendToDeviceListTable2(data,condition,load,tab);
			}
		
		}
	 });
	filterManageDevice();

}

/*
 *
 *  FUNCTION NAME : linkMenuPopUp 
 *  AUTHOR        : Apple Kem E. Eguia
 *  DATE          : March 6, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function linkMenuPopUp(){
	$("#divAlert").dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		open: function(event, ui) { $(".ui-dialog-titlebar-close").show(); },
		title: "Link Menu"
	});
	$("#divAlert").dialog("open");
	$( "#divAlert" ).empty().load('pages/ConfigEditor/linkMenuPanel.html',function(){
		setTimeout(function(){
			$('.ui-dialog-title').css({'margin-left': '13px','margin-top': '6px'});
			if (gblCondition == true){
				$('#sublinkA').show();
				$('#linkConnect').show();
				$('#linkDisconnect').show();
				$('#linkFlap').show();
			}else if (gblCondition == false){
				$('#sublinkA').hide();
				$('#linkConnect').hide();
				$('#linkDisconnect').hide();
				$('#linkFlap').hide();
			}
		},1000);
	});

}

function linkBackBtn(){
	$("#linkMenu").show();
	$("#subLink").hide();
	$("#linkBack").remove();
}



/*
 *
 *  FUNCTION NAME : chooseHubFull
 *  AUTHOR        : James Turingan
 *  DATE          : March 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function chooseHubFull(type){
	if(type == 'hub'){
		$('#cbFull').prop('checked',false);		
	}else{
		$('#cbHub').prop('checked',false);		
	}
}

/*
 *
 *  FUNCTION NAME : closeCanvas
 *  AUTHOR        : James Turingan
 *  DATE          : March 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function closeCanvas(){
	for(var i = 0 ; i < globalMAINCONFIG.length; i++){
		if(pageCanvas == globalMAINCONFIG[i].MAINCONFIG[0].PageCanvas){
//	globalMAINCONFIG.splice(i,1);
		}
	}
	var stage = "stage_"+pageCanvas;
	var ctr = 0;
	$('#lipagecanvas'+pageCanvas).remove();
	$('#configContent'+pageCanvas).effect("explode").remove();
	$('.ui-effects-wrapper').remove();
	for(var x = 0 ; x < dynamicVar.length; x++){
		if(stage == dynamicVar[x]){
			dynamicVar[x] = "";
		}
		if(dynamicVar[x] != ""){
			ctr++;
			pageCanvas = parseInt(dynamicVar[x].split('_')[1]);
		}
	}
	if(ctr == 1){
		$('#closCanvaseBtn').hide();
	}
	setTimeout(function(){
		//clearCanvas();
		paginateCanvas();	
	},1000);

}

/*
 *
 *  FUNCTION NAME : showHideLinkMenu
 *  AUTHOR        : Apple Kem E. Eguia
 *  DATE          : March 07, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function showHideLinkMenu(id){
	switch(id){
		case "linkList":
			$("#linkMenu").hide();
            $("#subLink").show();
			var bck = '<div id="linkBack" style="position:absolute;cursor:pointer;" onclick="linkBackBtn()"><img src="img/backArrow.png" style="width: 20px;margin-left: 3px;margin-top: 6px;"></div>';
			$('.ui-dialog-titlebar').prepend(bck);
			$('.ui-dialog-title').css({'margin-left': '13px','margin-top': '6px'});
		break;
		case "linkToolsList":
			$("#linkMenu").hide();
			$("#subToolsLink").show();
			var bck = '<div id="linkBack" style="position:absolute;cursor:pointer;" onclick="linkBackBtn()"><img src="img/backArrow.png" style="width: 20px;margin-left: 3px;margin-top: 6px;"></div>';
			$('.ui-dialog-titlebar').prepend(bck);
			$('.ui-dialog-title').css({'margin-left': '13px','margin-top': '6px'});
		break;
		case "linkLogsList":
			$("#divAlert").dialog('destroy');
			linkConnectivityLogs();
		break;
	}
}


/*
 *
 *  FUNCTION NAME : newDevicePopUp
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 07, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */


function newDevicePopUp(){
	var h = $(window).height() - 100;
	$( "#newdevicePopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		closeOnEscape: false
	});
	$( "#newdevicePopUp" ).empty().append("<center id='processingPage'><div  style='text-align:center;'>Processing Information...<br /><img src='img/ajax-loader.gif'/></div></center>");
	$( "#newdevicePopUp" ).load('pages/ConfigEditor/NewDevice.html',function(){
		$('.ui-dialog').css({'width':'680px'});
		$('.ui-dialog-title').css({'margin-left':'14px','margin-top':'7px','text-align':'center'});
		$("span.ui-dialog-title").text("ADD NEW DEVICE");
		setTimeout(function(){
			newDevice('device');
		},1000);
		$(document).on("change", "#dropdowntypeDevice", function(){
			if($("#dropdowntypeDevice option:selected").val()=="Manual"){
				$(".manualDeviceClass").show();
				$("#autoDMainDiv").hide();	
			}else{
				setAutoDVariable();
				AutoDType = "Device";
				$(".manualDeviceClass").hide();
				$("#autoDMainDiv").show();
				$('#addDevTypeOpt').val('Select');
				$('#addNewDevManuOpt').val('Select');
				checkDeviceType();
				checkManuType();
				$('#addNewDevDomainOpt').html(autoDDomainOptions);
			}
		});
		$(".deviceInfoHideAndShow").hide();
		getMapPartnerPortInfo();
		newDeviceAvailableDom();
		newDevAttribute();
		$(".ui-dialog").position({
		   my: "top",
		   at: "top",
		   of: window
		});
		$('#processingPage').remove();
	});
}


/*
 *
 *  FUNCTION NAME : linkConnectivityLogs 
 *  AUTHOR        : Apple Kem E. Eguia
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function linkConnectivityLogs(){
	$("#configPopUp").dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		open: function(event, ui) { $(".ui-dialog-titlebar-close").show(); },
		title: "Link Connectivity Logs"
	});
	$("#configPopUp").dialog("open");
	$( "#configPopUp" ).empty().load('pages/ConfigEditor/deviceMenu.html',function(){
		setTimeout(function(){
			$("#deviceMainList").hide();
			$("#deviceMenu").hide();
			$("#deviceLogsMenu").show();
			$("#deviceLogsMain").hide();
			$("#logsConnectivityMain").show();
			showConnectivityLogs();
		},1000);
	});
}

/*
 *
 *  FUNCTION NAME : checkDeviceType
 *  AUTHOR        : Anna Marie Paulo
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : change of type auto/manual
 *  PARAMETERS    : 
 *
 */

function checkDeviceType(){
	var devType=$("#addDevTypeOpt option:selected").val();
	var addOption = "";
	addOption += "<option>Select</option>";
	switch(devType){
		case "Select":
		break;
		case "Networking Device": case "L2 Switch": case "Appliance": case "Terminal Server":
			addOption += "<option>Cisco</option><option>Juniper</option>";
		break;
		case "L1 Switch":
			addOption += "<option>MRV</option><option>NetScout</option><option>GLX</option>";
		break;
	}
	$("#addNewDevManuOpt").html(addOption);
}
/*
 *
 *  FUNCTION NAME : checkManuType
 *  AUTHOR        : Anna Marie Paulo
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : change of type auto/manual
 *  PARAMETERS    : 
 *
 */

function checkManuType(){
	var manuType = $("#addNewDevManuOpt option:selected").val().toLowerCase();
	if(manuType=="select"){
		$("#addNewDevMmgmtIp").attr("disabled", true);
		$("#addNewDevMmgmtIp").val("");
		$("#addNewDevMmgmtIpPortChk").attr("disabled", true);
		$("#addNewDevMmgmtIpPort").attr("disabled", true);
		$("#addNewDevMmgmtIpPort").val("");
		$("#addNewDevConIp").attr("disabled", true);
		$("#addNewDevConIp").val("");
		$("#addNewDevConIpPortChk").attr("disabled", true);
		$("#addNewDevConIpPortChk").prop('checked', true);
		$("#addNewDevConIpPort").attr("disabled", true);
		$("#addNewDevConIpPort").val("");
		$("#addNewDevUserN").attr("disabled", true);
		$("#addNewDevUserN").val("");
		$("#addNewDevCPassW").attr("disabled", true);
		$("#addNewDevCPassW").val("");
		$("#addNewDevTypeHOpt").attr("disabled", true);
		$("#addNewDevTypeHOpt > option:contains('Select')").prop('selected',true);
		$("#addNewDevDomainOpt").attr("disabled", true);
		$("#addNewDevDomainOpt > option:contains('Select')").prop('selected',true);
		$("#addNewDevOptValChk").attr("disabled", true);
		$("#addNewDevOptValChk").prop('checked', false);
		$("#addNewDevIncPartPChk").attr("disabled", true);
		$("#addNewDevIncPartPChk").prop('checked', false);
		$("#addNewDevAuxIpPort").attr("disabled", true);
		$("#addNewDevAuxIpPort").val("");
		//$("#addNewDevAuxIp").attr("disabled", true);
		$("#addNewDevAuxIp").val("");
		$("#addNewDevAuxIpPortChk").prop('checked', false);
		$("#autoDPartnerInfoCont").hide();
		//$("#autoDDevSlotsIncCont").hide();
		getAutoDSelectedPartnerAdd("Select","device");
		$('#addNewDevOSTOpt').val('select');
		$('#addNewDevOSTOptAuto').hide();
		$('#useNAutoD').attr('style','color:transparent;');
		//$('#useNAutoD').attr('style','color:red;');
	}else{
/*		if(manuType=="cisco" && $('#addDevTypeOpt > option:selected').text()=="Networking Device"
			&& $('#addNewDevOSTOptAuto').is(':visible')==false) {
			var orgManu = $("#addNewDevManuOpt option:selected").val();
			$("#addNewDevManuOpt > option:contains('Select')").prop('selected',true);
			checkManuType();
			$("#addNewDevManuOpt > option:contains('"+orgManu+"')").prop('selected',true);
			$('#useNAutoD').attr('style','color:transparent;');
			$('#addNewDevOSTOpt').val('select');
			$('#addNewDevOSTOptAuto').show();
		}else{
			$('#addNewDevOSTOptAuto').hide();
			$('#addNewDevOSTOpt').val('select');
			//$('#useNAutoD').attr('style','color:transparent;');
			$('#useNAutoD').attr('style','color:red;');
		}
*/
		$("#addNewDevMmgmtIp").attr("disabled", false);
		$("#addNewDevConIp").attr("disabled", false);
		$("#addNewDevUserN").attr("disabled", false);
		$("#addNewDevCPassW").attr("disabled", false);
		$("#addNewDevTypeHOpt").attr("disabled", false);
		$("#addNewDevDomainOpt").attr("disabled", false);
		$("#addNewDevOptValChk").attr("disabled", false);
	}
	//Management IP validation
	$("#addNewDevMmgmtIp").keyup(function(){
		if($.trim($('#addNewDevMmgmtIp').val()) != ""){
			$("#addNewDevMmgmtIpPortChk").attr("disabled", false);
			$("#addNewDevIncPartPChk").attr("disabled", false);
		}else{
			$("#addNewDevMmgmtIpPortChk").attr("disabled", true);
			$("#addNewDevIncPartPChk").attr("disabled", true);
		}
	});
	$("#addNewDevMmgmtIpPortChk").click(function(){
		if($('#addNewDevMmgmtIpPortChk').is(':checked')){
			$("#addNewDevMmgmtIpPort").attr("disabled", false);
		}else{
			$("#addNewDevMmgmtIpPort").attr("disabled", true);
		}
	});
	//Console IP validation
	$('#addNewDevConIp').keyup(function(){
		if($.trim($('#addNewDevConIp').val()) != ""){
			$("#addNewDevConIpPort").attr("disabled", false);
		}else{
			$("#addNewDevConIpPort").attr("disabled", true);
		}
	});
	//Optional Values
	$("#addNewDevOptValChk").click(function(){
		if($('#addNewDevOptValChk').is(':checked'))
			$('#addNewDevAuxIpTR').show();
		else
			$('#addNewDevAuxIpTR').hide();
	});
	//Auxiliary validation
	$('#addNewDevAuxIp').keyup(function(){
		if($.trim($('#addNewDevAuxIp').val()) != ""){
			$('#addNewDevAuxIpPortChk').attr('disabled', false);
		}else{
			$('#addNewDevAuxIpPortChk').attr('disabled', true);
		}
	});
	$('#addNewDevAuxIpPortChk').click(function(){
		if($('#addNewDevAuxIpPortChk').is(':checked'))
			$('#addNewDevAuxIpPort').attr('disabled', false);
		else
			$('#addNewDevAuxIpPort').attr('disabled', true);
	});
	//Partnerport validation
	$('#addNewDevIncPartPChk').click(function(){
		getAutoDSelectedPartnerAdd("Select","device");
		if($("#addNewDevIncPartPChk").is(":checked")){
			 switchDevicePartnerAutoD($('#addDevTypeOpt > option:selected').val());
	        $("#autoDPartnerInfoCont").show();
	    }else{
    	    $("#autoDPartnerInfoCont").hide();
	    }
	});
	//Partner Type
	$(document).on("change","#autoDPartTypeOpt", function () {
		getAutoDSelectedPartnerAdd("Select","device");
        getAutoDSelectedPartnerAdd($('#autoDPartTypeOpt > option:selected').text(),"device");
    });
	//partner address
	$(document).on("change","#autoDPartAddOpt", function () {
//        showautoDPortSrchTableByNum(3);
        showNewPartnerInfo($('#autoDPartTypeOpt > option:selected').text(),"device");
    });
	//optional search details
	$('#autoDOptSrchDetailsChk').click(function(){
		if($('#autoDOptSrchDetailsChk').is(':checked')){
			$('#autoDPartPortsSrchLblCont').show();	
		}else{
			$('#autoDPartPortsSrchLblCont').hide();	
		}
	});
/*	$(document).on("change", "#autoDPartPortsSrchOpt", function(){
		if($('#autoDPartPortsSrchOpt > option:selected').text()=="Per Slot"){
            showautoDPortSrchTableByNum(3);
            $('#autoDPartPortsSrchNumLbl').hide();
            $('#autoDPartPortsSrchNumCont').hide();
        }else if($('#autoDPartPortsSrchOpt > option:selected').text()=="On Selected Slots"){
            showautoDPortSrchTableByNum(2);
            $('#autoDPartPortsSrchNumLbl').show();
            $('#autoDPartPortsSrchNumCont').show();
        }else{
            $('#autoDPartPortsSrchNumLbl').hide();
            $('#autoDPartPortsSrchNumCont').hide();
        }
	
	});
*/
	$('#autoDDevSlotsIncChk').click(function(){
		if($('#autoDDevSlotsIncChk').is(':checked')){
			$('#autoDDevSlotsIncCountCont').show();
		}else{
			$('#autoDDevSlotsIncCountCont').hide();
			$('#autoDDevSlotInfoTableCont').hide();
			$('#autoDDevSlotInfoTbody').empty();
			$('#autoDDevSlotsIncCount').val('');
		}
	});
	$(document).on("keypress","#autoDDevSlotsIncCount", function () {
        var key = event.keyCode;
        if (key == 13) {
            createDevSlotTbodyAutoD($(this).val(),"device");
        }
    });
	$(document).on("blur","#autoDDevSlotsIncCount", function () {
        createDevSlotTbodyAutoD($(this).val(),"device");
    });

}

function serverValidation(){
	$("#addNewTestTManuOpt").attr("disabled", true);
	$('#newTestTHostname').keyup(function(){
		if($('#newTestTHostname').val() != ""){
			$("#addNewTestTManuOpt").attr("disabled", false);
			$("#addNewTestTManuOpt option:selected").html("Select");
		}else{
			$("#addNewTestTManuOpt").attr("disabled", true);
		}
	});
}
function changeServerManuType(){
	var serverManu = $("#addNewTestTManuOpt option:selected").val();
	if(serverManu.toLowerCase()=="select"){
		$('#addNewTestTMmgmtIp').attr('disabled', true);
		$('#addNewTestTMmgmtIp').val('');
		$('#addNewTestTMmgmtIpPortChk').attr('disabled', true);
		$('#addNewTestTMmgmtIpPort').attr('disabled', true);
		$('#addNewTestTMmgmtIpPort').val('');
		$('#addNewTestTConIp').attr('disabled', true);
		$('#addNewTestTConIp').val('');
		$('#addNewTestTConIpPortChk').attr('disabled', true);
		$('#addNewTestTConIpPortChk').prop('checked', true);
		$('#addNewTestTConIpPort').attr('disabled', true);
		$('#addNewTestTConIpPort').val('');
		$('#addNewTestTUserN').attr('disabled', true);
		$('#addNewTestTUserN').val('');
		$('#addNewTestTPassW').attr('disabled', true);
		$('#addNewTestTPassW').val('');
		$('#addNewTestTDomainOpt').attr('disabled', true);
		$('#addNewTestTDomainOpt > option:contains("Select")').prop('selected',true);
		$('#addNewTestTOptValChk').attr('disabled', true);
		$('#addNewTestTIncPartPChk').attr('disabled', true);
		$('#addNewTestTAuxIp').attr('disabled', false);
		$('#addNewTestTAuxIp').val('');
		$('#addNewTestTAuxIpPortChk').attr('disabled', true);
		$('#addNewTestTAuxIpPort').attr('disabled', true);
		$('#addNewTestTAuxIpPort').val('')
		$('#addNewTestTTypeHOptCont').hide();
		$('#addNewTestTTypeHOptLbl').hide();
	}else{
		$('#addNewTestTMmgmtIp').attr('disabled', false);
		$('#addNewTestTConIp').attr('disabled', false);
		$('#addNewTestTDomainOpt').attr('disabled', false);
		$('#addNewTestTTypeHOpt').attr('disabled', false);
		//$('#addNewTestTUserN').attr('disabled', false);
		//$('#addNewTestTOptValChk').attr('disabled', false);
		//$('#addNewTestTIncPartPChk').attr('disabled', false);
		//$('#addNewTestTPassW').attr('disabled', false);
	}
	//ManagementIP
	$("#addNewTestTMmgmtIp").keyup(function(){
		if($.trim($('#addNewTestTMmgmtIp').val()) != "" || 
			$.trim($('#addNewTestTConIp').val()) != ""){
			$('#addNewTestTMmgmtIpPortChk').attr('disabled', false);
			$('#addNewTestTUserN').attr('disabled', false);
			$('#addNewTestTOptValChk').attr('disabled', false);
			$('#addNewTestTIncPartPChk').attr('disabled', false);
			$('#addNewTestTPassW').attr('disabled', false);
		}else{
			$('#addNewTestTMmgmtIpPortChk').attr('disabled', true);
			$('#addNewTestTUserN').attr('disabled', true);
			$('#addNewTestTOptValChk').attr('disabled', true);
			$('#addNewTestTIncPartPChk').attr('disabled', true);
			$('#addNewTestTPassW').attr('disabled', true);
		}
	});
	$('#addNewTestTMmgmtIpPortChk').click(function(){
		if($('#addNewTestTMmgmtIpPortChk').is(':checked'))
			$('#addNewTestTMmgmtIpPort').attr('disabled', false);
		else
			$('#addNewTestTMmgmtIpPort').attr('disabled', true);
	});
	//ConsoleIP
	$("#addNewTestTConIp").keyup(function(){
		if($.trim($('#addNewTestTConIp').val()) != "" || 
			$.trim($('#addNewTestTMmgmtIp').val()) != ""){
			$('#addNewTestTConIpPort').attr('disabled', false);
			$('#addNewTestTUserN').attr('disabled', false);
			$('#addNewTestTOptValChk').attr('disabled', false);
			$('#addNewTestTIncPartPChk').attr('disabled', false);
			$('#addNewTestTPassW').attr('disabled', false);
		}else{
			$('#addNewTestTConIpPort').attr('disabled', true);
			$('#addNewTestTUserN').attr('disabled', true);
			$('#addNewTestTOptValChk').attr('disabled', true);
			$('#addNewTestTIncPartPChk').attr('disabled', true);
			$('#addNewTestTPassW').attr('disabled', true);
		}
	});
	$('#addNewTestTConIpPortChk').click(function(){
		if($('#addNewTestTConIpPortChk').is(':checked'))
			$('#addNewTestTConIpPort').attr('disabled', false);
		else
			$('#addNewTestTConIpPort').attr('disabled', true);
	});
	//Optional Values
	$("#addNewTestTOptValChk").click(function(){
		$('#addNewTestTAuxIp').attr('disabled', false);
		if($('#addNewTestTOptValChk').is(':checked'))
			$('#addNewTestTAuxIpTR').show();
		else
			$('#addNewTestTAuxIpTR').hide();
	});
	$('#addNewTestTAuxIp').keyup(function(){
		if($.trim($(this).val()) != ""){
			$('#addNewTestTAuxIpPortChk').attr('disabled', false);
		}else{
			$('#addNewTestTAuxIpPortChk').attr('disabled', true);
		}
	});
	$('#addNewTestTAuxIpPortChk').click(function(){
		if($(this).is(':checked')){
			$('#addNewTestTAuxIpPort').attr('disabled', false);
		}else{
			$('#addNewTestTAuxIpPort').attr('disabled', true);
		}
	});
	//include partner port
	$('#addNewTestTIncPartPChk').click(function(){
		getAutoDSelectedPartnerAdd("Select","testtool");
		$('#autoDTestTPartTypeOpt').val("Select");
		if($(this).is(':checked')){
			$('#autoDTestTPartnerInfoCont').show();
		}else{
			$('#autoDTestTPartnerInfoCont').hide();
		}
	}); 	
	//partner type
	$(document).on("change","#autoDTestTPartTypeOpt", function() {
        var opt = $('#autoDTestTPartTypeOpt > option:selected').text();
		getAutoDSelectedPartnerAdd("Select","testtool");
        getAutoDSelectedPartnerAdd(opt,"testtool");
        $('#autoDTestTSlotsIncCountCont').hide()
    });

	$(document).on("change", "#autoDTestTPartAddOpt", function(){
		showautoDPortSrchTableByNum(3);
		showNewPartnerInfo($('#autoDTestTPartTypeOpt > option:selected').text(),"testtool");
		$('#autoDTestTSlotsIncCountCont').hide();
	});
	$("#autoDTestTOptSrchDetailsChk").click(function(){
		if($(this).is(':checked')){
			$("#autoDTestTPartPortsSrchLblCont").show();
		}else{
			$("#autoDTestTPartPortsSrchLblCont").hide();
		}
	});
	$("#autoDTestTSlotsIncChk").bind("click", function () {
		$('#autoDTestTSlotInfoTbody').empty();
		$('#autoDTestTSlotsIncCount').val("");
        if($("#autoDTestTSlotsIncChk").is(':checked')){
            $('#autoDTestTSlotsIncCountCont').show()
            $('#autoDTestTSlotInfoTableCont').hide();
        }else{
            $('#autoDTestTSlotsIncCountCont').hide();
            $('#autoDTestTSlotInfoTableCont').hide();
        }
    });
	$(document).on("keypress","#autoDTestTSlotsIncCount", function () {
        var key = event.keyCode;
        if (key == 13) {
            createDevSlotTbodyAutoD($(this).val(),"testtool");
        }
	});
	 $(document).on("blur","#autoDTestTSlotsIncCount", function () {
        createDevSlotTbodyAutoD($(this).val(),"testtool");
    });

}
/*
 *
 *  FUNCTION NAME : getAutoDSelectedPartnerAdd
 *  AUTHOR        : Cathyrine Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function getAutoDSelectedPartnerAdd(opt,type){
    var optAdd = "<option value=''>Select</option>";
    switch(opt) {
        case "Select":
            if(type=="device"){
                $('#autoDPartnerInfoTable > tbody').empty();
                $('#autoDPartnerInfoTableCont').hide();
                $('#autoDPartInfo1').hide();
        		$('#newDevPartnerDevModel').empty().append("<input id='newDevPartnerDevModelS' type='text' value='' disabled='disabled'/>");
				$('#newDevPartnerDevHost').empty().append("<input id='newDevPartnerDevHostS' type='text' value='' disabled='disabled'/>");
				$('#newDevPartnerDevManu').empty().append("<input id='newDevPartnerDevManuS' type='text' value='' disabled='disabled'/>");
                $('#autoDPartInfo2').hide();
				$("#autoDPartAddOpt > option:contains('Select')").prop('selected',true);
                $('#autoDOptIncMappChk').hide();
                $('#autoDPartPortsSrchLblCont').hide();
                $('#autoDDevSlotsIncCont').hide();
                $('#autoDDevSlotsIncCountCont').hide()
				$('#autoDDevSlotInfoTableCont').hide();
				$('#autoDDevSlotInfoTbody').empty();
				$('#autoDDevSlotsIncCount').val('');
				$('#autoDDevSlotsIncChk').prop('checked',false);
				$('#addNewDevAuxIpTR').hide();

            }else if(type=="testtool"){
                $('#autoDTestTPartnerInfoTable > tbody').empty();
                $('#autoDTestTPartnerInfoTableCont').hide();
                $('#autoDTestTPartInfo1').hide();
		        $('#newTestTPartnerDevHost').empty().append("<input id='newTestTPartnerDevHostS' type='text' value='' disabled='disabled'/>");
    	    	$('#newTestTPartnerDevManu').empty().append("<input id='newTestTPartnerDevManuS' type='text' value='' disabled='disabled'/>");
    	    	$('#newTestTPartnerDevModel').empty().append("<input id='newTestTPartnerDevModelS' type='text' value='' disabled='disabled'/>");
                $('#autoDTestTPartInfo2').hide();
                $('#autoDTestTPartAddOpt-button > span').empty().append("Select");
                $('#autoDTestTOptIncMappChk').hide();
                $('#autoDTestTPartPortsSrchLblCont').hide();
                $('#autoDTestTSlotsIncCont').hide();
                $('#autoDTestTSlotsIncCountCont').hide();
				$('#autoDTestTSlotInfoTableCont').hide();
				$('#autoDTestTSlotInfoTbody').empty();
				$('#autoDTestTSlotsIncChk').prop('checked',false);
				$('#autoDTestTSlotsIncCount').val("");
		    }
        break;
        case "Networking Device":
            var dataS = autoDDevLists[0].NetworkingDevices;
            for(var i=0; i<dataS.length; i++){
                optAdd += dataS[i].opt;
            }
		 break;
        case "L1 Switch":
            var dataS = autoDDevLists[0].L1Switch;
            for(var i=0; i<dataS.length; i++){
                optAdd += dataS[i].opt;
            }
		 break;
        case "L2 Switch":
            var dataS = autoDDevLists[0].L2Switch;
            for(var i=0; i<dataS.length; i++){
                optAdd += dataS[i].opt;
            }
		 break;
    }
    if(type=="device"){$('#autoDPartAddOpt').empty().append(optAdd);}
    if(type=="testtool"){$('#autoDTestTPartAddOpt').empty().append(optAdd);}
	if(type=="admin"){$('#partipadd').empty().append(optAdd);}

}

/*
 *
 *  FUNCTION NAME : setAutoDVariable
 *  AUTHOR        : Cathyrine Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function setAutoDVariable() {
	autoDDevData=[];
    autoDDevData.push({Access: '', DeviceType: '', Domain: '', DomainId: '', ConsoleIp: '',
        Manufacturer: '', ConsolePort: '', HostName: '', LogsName: '', MTM: CURRENT_IP,
        ManagementIp: '', PartnerIp: '', ManagementPort: '', AuxiliaryIp: '', AuxiliaryPort: '',
        PartnerManufacturer: '', PartnerSlotNumber: '', PartnerType: '', Password: '',
        Username: '', SaveOption: 'Save', TotalPortsToSearch: '', Type: '',
        User: globalUserName});
}
/*
 *
 *  FUNCTION NAME : createDataAutoD
 *  AUTHOR        : Cathyrine Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function createDataAutoD(idx){

    var d = autoDDevData[0];
	if(globalInfoType=="XML"){
    var autoDS = "<MAINCONFIG>";
    autoDS += "<DEVICE ";
    autoDS += "DeviceType='"+d.DeviceType+"' ";
    autoDS += "Domain='"+d.Domain+"' ";
    autoDS += "DomainId='"+d.DomainId+"' ";
    autoDS += "ConsoleIp='"+d.ConsoleIp+"' ";
    autoDS += "Manufacturer='"+d.Manufacturer+"' ";
    autoDS += "ConsolePort='"+d.ConsolePort+"' ";
    autoDS += "HostName='"+d.HostName+"' ";
    autoDS += "LogsName='"+d.LogsName+"' ";
    autoDS += "MTM='"+d.MTM+"' ";
    autoDS += "ManagementIp='"+d.ManagementIp+"' ";
    autoDS += "PartnerIp='"+d.PartnerIp+"' ";
    autoDS += "ManagementPort='"+d.ManagementPort+"' ";
	autoDS += "PartnerManufacturer='"+d.PartnerManufacturer+"' ";
    if(d.PartnerSlotNumber!=""){d.PartnerSlotNumber = ";"+d.PartnerSlotNumber}
    autoDS += "PartnerSlotNumber='"+d.PartnerSlotNumber+"' ";
    autoDS += "PartnerType='"+d.PartnerType+"' ";
    autoDS += "Password='"+d.Password+"' ";
    autoDS += "Username='"+d.Username+"' ";
    autoDS += "SaveOption='"+d.SaveOption+"' ";
    autoDS += "TotalPortsToSearch='"+d.TotalPortsToSearch+"' ";
    autoDS += "Type='"+d.Type+"' ";
    autoDS += "User='"+d.User+"' ";
	autoDS += "></DEVICE>";
    autoDS += "</MAINCONFIG>";
	}else{

	var autoDS2 = "{ 'MAINCONFIG': [{ 'DEVICE': [{ ";
	autoDS2 += "'DeviceType': '"+d.DeviceType+"', ";
	autoDS2 += "'Domain': '"+d.Domain+"', ";
	autoDS2 += "'DomainId': '"+d.DomainId+"', ";
	autoDS2 += "'ConsoleIp': '"+d.ConsoleIp+"', ";
	autoDS2 += "'Manufacturer': '"+d.Manufacturer+"', ";
	autoDS2 += "'ConsolePort': '"+d.ConsolePort+"', ";
	autoDS2 += "'HostName': '"+d.HostName+"', ";
	autoDS2 += "'LogsName': '"+d.LogsName+"', ";
	autoDS2 += "'MTM': '"+d.MTM+"', ";
	autoDS2 += "'ManagementIp': '"+d.ManagementIp+"', ";
	autoDS2 += "'PartnerIp': '"+d.PartnerIp+"', ";
	autoDS2 += "'ManagementPort': '"+d.ManagementPort+"', ";
	autoDS2 += "'PartnerManufacturer': '"+d.PartnerManufacturer+"', ";
	//if(d.PartnerSlotNumber!=""){d.PartnerSlotNumber = ";"+d.PartnerSlotNumber;}
	autoDS2 += "'PartnerSlotNumber': '"+d.PartnerSlotNumber+"', ";
	autoDS2 += "'PartnerType': '"+d.PartnerType+"', ";
	autoDS2 += "'Password': '"+d.Password+"', ";
	autoDS2 += "'Username': '"+d.Username+"', ";
	autoDS2 += "'SaveOption': '"+d.SaveOption+"', ";
	autoDS2 += "'TotalPortsToSearch': '"+d.TotalPortsToSearch+"', ";
	autoDS2 += "'Type': '"+d.Type+"', ";
	autoDS2 += "'User': '"+d.User+"', ";
	autoDS2 += "}] }] }";
	}

	if(globalInfoType == "XML"){
	   return autoDS;
	} else {
	   return autoDS2;
	}
}
/*
 *
 *  FUNCTION NAME : gatherDataAutoD
 *  AUTHOR        : Cathyrine Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function gatherDataAutoD(type){
//	setAutoDVariable();

	var data = autoDDevData[0];
	var date = new Date();
	var month = date.getMonth();
    var day = date.getDay();
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getMilliseconds();
	var logname = globalUserName +"_"+ year + "-" + month + "-"+ day + "-" + hour + "-" + min + "-" + sec;
	data.LogsName = logname;

	switch(type){
		case "device":
			if(!checkDataManuAutoD(type)){ return false; }
			if($('#addManualNewDevHostName').val()!=undefined){
				data.HostName = $('#addManualNewDevHostName').val();
			}
			if($('#addDevTypeOpt > option:selected').text()!="Select"){
				var devtype = $('#addDevTypeOpt >  option:selected').text()
				if(devtype=="L1 Switch"){devtype = "Layer 1 Switch";
				}else if(devtype=="L2 Switch"){devtype = "Layer 2 Switch";}
				data.Type = devtype;
				}
			if($('#addNewDevManuOpt > option:selected').text()!="Select"){
				data.Manufacturer = $('#addNewDevManuOpt > option:selected').text();
				data.DeviceType = $('#addNewDevManuOpt > option:selected').text();
			}
			data.ManagementIp = $('#addNewDevMmgmtIp').val();
			if($('#addNewDevMmgmtIpPort').val()!=undefined){
				data.ManagementPort = $('#addNewDevMmgmtIpPort').val();
			}
			if($('#addNewDevConIp').val()!=undefined && $('#addNewDevConIp').val().toLowerCase!="na" && $('#addNewDevConIp').val().toLowerCase!="n/a"){
				data.ConsoleIp = $('#addNewDevConIp').val();
			}
			if($('#addNewDevConIpPort').val()!=undefined && $('#addNewDevConIpPort').val().toLowerCase!="na"){
				data.ConsolePort = $('#addNewDevConIpPort').val();
			}
			if($('#addNewDevUserN').val()!=undefined){
				data.Username = $('#addNewDevUserN').val();
			}
			if($('#addNewDevCPassW').val()!=undefined){
				data.Password = $('#addNewDevCPassW').val();
			}
			if($('#addNewDevDomainOpt > option:selected').text()!="Select"){
				data.Domain = $('#addNewDevDomainOpt > option:selected').text();
				data.DomainId = $('#addNewDevDomainOpt > option:selected').val();
			}
			if($('#addNewDevAuxIp').val()!=undefined){
				data.AuxiliaryIp = $('#addNewDevAuxIp').val();
			}
			if( $('#addNewDevAuxIpPort').val()!=undefined){
				data.AuxiliaryPort = $('#addNewDevAuxIpPort').val();
			}
			if($('#autoDPartTypeOpt > option:selected').text()!="Select"){
				var partnertype = $('#autoDPartTypeOpt > option:selected').text();
				if(partnertype=="L1 Switch"){partnertype = "Layer 1 Switch";
				}else if(partnertype=="L2 Switch"){partnertype = "Layer 2 Switch";}
				data.PartnerType = partnertype;
			}
			if($('#autoDPartAddOpt > option:selected').text()!="Select"){
				data.PartnerIp = $('#autoDPartAddOpt > option:selected').text();
			}
			if(globalDeviceType=="Mobile"){
				if($('#newDevPartnerDevManuS').text()!="No Selection"){
					data.PartnerManufacturer = $('#newDevPartnerDevManuS').text();
				}
			}else{
				if($('#newDevPartnerDevManu').children.length>0){
					data.PartnerManufacturer = $('#newDevPartnerDevManuS').val();
				}
			}
			if($('#autoDPartnerInfoTableCont').is(':visible')){
				$.each($('#autoDPartnerInfoTbody > tr'), function(index,object){
					if(globalDeviceType == "Mobile") {
						if(object.getAttribute('class')=='trAutoDP highlight'){
							var tmpval = ","+object.children[0].innerHTML+":";
//							if(object.children[2]){
								var tmpcnt = object.children[2].getAttribute('value');
//							}
							if(tmpcnt!=undefined){ tmpval+=tmpcnt; }
							data.PartnerSlotNumber += tmpval;
						}
					}else{
						var tmpslot = object.children[1].innerHTML;
						var tmpcnt = object.children[3].getAttribute('value');
						var tmpval =","+tmpslot+":";
						if(tmpcnt!=undefined){
							tmpval+=tmpcnt;
						}
						if($("#"+(object.children[0].children[0].getAttribute('id'))).is(':checked')){
							data.PartnerSlotNumber += tmpval;
						}
					}
				});
			}
			var totalports = $('#autoDPartPortsSrchNum').val();
			if(totalports!=undefined && totalports!=0){
				data.TotalPortsToSearch = totalports;
			}
		break;
		case "testtool":
			if(!checkDataManuAutoD(type)){ return false; }
			if($('#newTestTHostname').val()!=undefined){
				data.HostName = $('#newTestTHostname').val();
			}
			data.Type = "TestTool";
			if($('#addNewTestTManuOpt > option:selected').text()!="Select"){
				data.Manufacturer = $('#addNewTestTManuOpt > option:selected').text();
				data.DeviceType = $('#addNewTestTManuOpt > option:selected').text();
			}
			if($('#addNewTestTMmgmtIp').val()!=undefined){
				data.Host = $('#addNewTestTMmgmtIp').val();
				data.ManagementIp = $('#addNewTestTMmgmtIp').val();
			}
			//data.ManagementIp = $('#addNewTestTMmgmtIp').val();
			if($('#addNewTestTMmgmtIpPort').val()!=undefined){
				data.ManagementPort = $('#addNewTestTMmgmtIpPort').val();
			}
			if($('#addNewTestTConIp').val()!=undefined && $('#addNewTestTConIp').val().toLowerCase!="na" && $('#addNewTestTConIp').val().toLowerCase!="n/a"){
				data.ConsoleIp = $('#addNewTestTConIp').val();
			}
			if($('#addNewTestTConIpPort').val()!=undefined){
				data.ConsolePort = $('#addNewTestTConIpPort').val();
			}
			if($('#addNewTestTUserN').val()!=undefined){
				data.Username = $('#addNewTestTUserN').val();
			}
			if($('#addNewTestTCPassW').val()!=undefined){
				data.Password = $('#addNewTestTCPassW').val();
			}
			if($('#addNewTestTDomainOpt > option:selected').text()!="Select"){
				data.Domain = $('#addNewTestTDomainOpt > option:selected').text();
				data.DomainId = $('#addNewTestTDomainOpt > option:selected').val();
			}
			if($('#addNewTestTAuxIp').val()!=undefined){
				data.AuxiliaryIp = $('#addNewTestTAuxIp').val();
			}
			if($('#addNewTestTAuxIpPort').val()!=undefined){
				data.AuxiliaryPort = $('#addNewTestTAuxIpPort').val();
			}
			if($('#autoDTestTPartTypeOpt > option:selected').text()!="Select"){
				var partnertype = $('#autoDTestTPartTypeOpt > option:selected').text();
				if(partnertype=="L1 Switch"){partnertype = "Layer 1 Switch";
				}else if(partnertype=="L2 Switch"){partnertype = "Layer 2 Switch";}
				data.PartnerType = partnertype;
			}
			if($('#autoDTestTPartAddOpt > option:selected').text()!="Select"){
				data.PartnerIp = $('#autoDTestTPartAddOpt > option:selected').text();
			}
			if(globalDeviceType=="Mobile"){
				if($('#newTestTPartnerDevManuS').text()!="No Selection"){
					data.PartnerManufacturer = $('#newTestTPartnerDevManuS').text();
				}
			}else{
				if($('#newTestTPartnerDevManu').children.length>0){
					data.PartnerManufacturer = $('#newTestTPartnerDevManuS').val();
				}
			}
			if($('#autoDTestTPartnerInfoTableCont').is(':visible')){
				$.each($('#autoDTestTPartnerInfoTbody > tr'), function(index,object){
					if(globalDeviceType=="Mobile"){
						if(object.getAttribute('class')=='trAutoDP highlight'){
							var tmpval = ","+object.children[0].innerHTML+":";
							var tmpcnt = object.children[2].getAttribute('value');
							if(tmpcnt!=undefined){ tmpval+=tmpcnt; }
							data.PartnerSlotNumber += tmpval;
						}
					}else{
						var tmpslot = object.children[1].innerHTML;
						var tmpcnt = object.children[3].getAttribute('value');
						var tmpval =","+tmpslot+":";
						if(tmpcnt!=undefined){
							tmpval+=tmpcnt;
						}
						if($("#"+(object.children[0].children[0].getAttribute('id'))).is(':checked')){
							data.PartnerSlotNumber += tmpval;
						}
					}
				});

			}
			var totalports = "";
			totalports = $('#autoDTestTPartPortSrchNumNum').val();
			if(totalports!=undefined && totalports!=0){
				data.TotalPortsToSearch = totalports;
			}
		break;
		case "admin":
			return gatherAutoDAdminInfo(data);
		break;
	}
	autoDDevData[0] = data;
	return true;
}

/*
 *
 *  FUNCTION NAME : checkDataManuAutoD
 *  AUTHOR        : Cathyrine Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function checkDataManuAutoD (type) {

	switch(type){
		case "device":
			if(($('#newDevAddOpt').val()=="manual" && ($('#addManualNewDevHostName').val()=="" 
				|| $('#addNewDevManuOptManualTxt').val()=="") ) ||
				( ($('#newDevAddOpt').val()=="auto" || $('#dropdowntypeDevice > option:selected').text()=="Auto")
				&& ( $('#addNewDevManuOpt > option:selected').text() == "Select" 
				|| $('#addDevTypeOpt > option:selected').text() == "Select" 
				|| $('#addNewDevMmgmtIp').val() == ""
				|| $('#addNewDevConIp').val() == ""
//				|| $('#addNewDevUserN').val() == ""
				|| $('#addNewDevCPassW').val() == ""
				|| $('#addNewDevTypeHOpt > option:selected').text() == "Select"
				|| $('#addNewDevDomainOpt > option:selected').text() == "Select"
				|| $('#addNewDevConIp').val().toLowerCase() == ""
				)
				)
				){
				if(globalDeviceType=="Mobile"){
					error("Please fill up all required fields.","Notification")
				}else{
					alerts("Please fill up all required fields.")
				}
				return false;
			}
			if(!ValidateIPaddress($('#addNewDevMmgmtIp').val())){return false;}

/*			if($('#addNewDevConIp').val().toLowerCase()!="na" && $('#addNewDevConIp').val().toLowerCase()!="n/a"){
				if(!ValidateIPaddress($('#addNewDevConIp').val())){return false;}
			}
*/
			if($('#addNewDevConIpPort').val()!="" 
				&& parseInt($('#addNewDevConIpPort').val())<=0
				|| parseInt($('#addNewDevConIpPort').val())>65535){
				return false;
			}
			if($('#addNewDevMmgmtIpPort').val()!="" 
				&& parseInt($('#addNewDevMmgmtIpPort').val())<=0 
				|| parseInt($('#addNewDevMmgmtIpPort').val())>65535){
				return false;
			}		
		break;
		case "testtool":
			if( $('#newTestTHostname').val()=="" 
				|| $('#addNewTestTManuOptAuto > option:selected').text() == "Select"
				|| $('#addNewTestTMmgmtIp').val()==""
//				|| $('#addNewTestTConIp').val()==""
//				|| ( $('#addNewTestTMmgmtIpPortChk').is(':checked') && $('#addNewTestTMmgmtIpPort').val() == "")
//				|| ( $('#addNewTestTConIpPortChk').is(':checked') && $('#addNewTestTConIpPort').val() == "")
				|| $('#addNewTestTDomainOpt > option:selected').text() == "Select"
			//	|| $('#addNewTestTTypeHOpt > option:selected').text() == "Select"
				){
				if(globalDeviceType=="Mobile"){
					error("Please fill up all required fields.","Notification")
				}else{
					alerts("Please fill up all required fields.")
				}
				return false;
			}
			if(AutoDType.toLowerCase()=="server"){
				if( $('#addNewTestTUserN').val() == "" || $('#addNewTestTCPassW').val() == ""){
					if(globalDeviceType=="Mobile"){
						error("Please fill up all required fields.","Notification")
					}else{
						alerts("Please fill up all required fields.")
					}
					return false;
				}
			}
			if($('#addNewTestTMmgmtIp').val()!=undefined){
				if($('#addNewTestTMmgmtIp').val().toLowerCase()!="na" && $('#addNewTestTMmgmtIp').val().toLowerCase()!="n/a"){
					if(!ValidateIPaddress($('#addNewTestTMmgmtIp').val())){return false;}
				}
			}
			if($('#addNewTestTConIpPort').val()!="" 
				&& parseInt($('#addNewTestTConIpPort').val())<=0
				|| parseInt($('#addNewTestTConIpPort').val())>65535){
				return false;
			}
			if($('#addNewTestTMmgmtIpPort').val()!="" 
				&& parseInt($('#addNewTestTMmgmtIpPort').val())<=0
				|| parseInt($('#addNewTestTMmgmtIpPort').val())>65535){
				return false;
			}
		break;
	}
	return true;


}
/*
 *
 *  FUNCTION NAME : showautoDPortSrchTableByNum
 *  AUTHOR        : Cathyrine Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function showautoDPortSrchTableByNum(num) {
    if(num==2){
		if(globalDeviceType == "Mobile"){
			var aswidth = $('#autoDPartnerInfoField').width()/2;
		}else{
	        var aswidth = ($('#autoDPartnerInfoField').width()-15)/2;
		}
    	$('#autoDPortSlotNum').width(aswidth);
        $('#autoDSlotNumPId').width(aswidth);
	    $('#autoDPortSrch').hide();
    	$.each($('#autoDPartnerInfoTbody > tr'), function(index,object){
			if(globalDeviceType == "Mobile"){
	            if(object.children[2]!=undefined){object.children[2].remove();}
			}else{
	            if(object.children[3]!=undefined){object.children[3].remove();}
			}
	    });
    }else if(num==3){
		if((AutoDType.toLowerCase()=='testtool' || AutoDType.toLowerCase()=='server')) {
			var tmpwidth = $('#autoDTestTPartnerInfoField').width();
		}else if(AutoDType.toLowerCase()!='admin'){
			var tmpwidth = $('#autoDPartnerInfoField').width();
		}
		
		if(globalDeviceType == "Mobile"){
			var aswidth = tmpwidth/3;
		}else{
	        var aswidth = (tmpwidth-15)/3;
			$('#autoDPortSlotChk').width(15);
		}
		var tbodycon;
		if(AutoDType.toLowerCase()=='testtool' || AutoDType.toLowerCase()=='server') {
			if(globalDeviceType=="Mobile"){
			    $('#autoDTestTPortSlotNum').width(aswidth);
		        $('#autoDTestTNumPId').width(aswidth);
        		$('#autoDTestTPortSrch').width(aswidth);
			}
    	    $('#autoDTestTPortSrch').show();
			tbodycon = $('#autoDTestTPartnerInfoTbody > tr');
		}else if(AutoDType.toLowerCase()=='admin'){
			tbodycon = $('#partSlotInfoAutoDAdminTbody > tr');
		}else{
	        $('#autoDPortSlotNum').width(aswidth);
    	    $('#autoDSlotNumPId').width(aswidth);
        	$('#autoDPortSrch').show();
	        $('#autoDPortSrch').width(aswidth);
			tbodycon = $('#autoDPartnerInfoTbody > tr');
		}
        $.each(tbodycon, function(index,object){
            if(globalDeviceType == "Mobile"){
            	var input = "<td id='"+object.id+"In'><input type='text' placeholder='Count:' style='border:none;font-size:16px;' onKeyPress='return checkPortSlotTotal(event)'></td>";
				if(object.children.length<=2){$('#'+object.id).append(input);}
			}else{
            	var input = "<td id='"+object.id+"In' style='text-align:center;'><input type='text' placeholder='Count:' onKeyPress='return checkPortSlotTotal(event)' style='border:none;width:90%;' disabled='disabled'></td>";
	            if(object.children.length<=3){$('#'+object.id).append(input);}
			}
		 });
   }
}

function checkPortSlotTotal(evt){
	if(!checkNumberInputChar(evt)){return false;}
	
	var tmpcount = 0;
	$.each($('#autoDPartnerInfoTbody > tr'), function(index,object){
		if($("#"+(object.children[0].children[0].getAttribute('id'))).is(':checked') 
			&& object.children[3].getAttribute('value')!=undefined ){
			tmpcount += parseInt(object.children[3].getAttribute('value'));
		}
	});
	console.log(tmpcount);
}


/*
 *
 *  FUNCTION NAME : showNewPartnerInfo
 *  AUTHOR        : Cathyrine Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function showNewPartnerInfo(opt,type) {
    if(type=="device"){var tempdev = $('#autoDPartAddOpt > option:selected').val();}
    if(type=="testtool"){var tempdev = $('#autoDTestTPartAddOpt > option:selected').val();}
	if(type=="admin"){var tempdev = $('#partipadd > option:selected').val();}
    var partner = "";
    var dataS = "";
    switch(opt) {
        case "Networking Device":
            dataS = autoDDevLists[0].NetworkingDevices;
        break;
        case "L1 Switch":
            dataS = autoDDevLists[0].L1Switch;
        break;
        case "L2 Switch":
            dataS = autoDDevLists[0].L2Switch;
        break;
        case "Select":
            getAutoDSelectedPartnerAdd("Select",opt);
        break;
    }
    if(dataS.length==0){return;}
    for(var i=0; i<dataS.length; i++){
        if(dataS[i].devicename==tempdev) {
            partner = dataS[i];
            break;
        }
    }
    if(partner.length==0){getAutoDSelectedPartnerAdd("Select",opt);return;}
	
	var tempdata = partner.info.split(",");
    var host = tempdata[0];
    var manu = tempdata[2];
    var model = tempdata[4];
    var slots = tempdata[5].split(":");
    if(type=="device"){
		
		var devhost = "<input id='newDevPartnerDevHostS' type='text' value='"+host+"' disabled='disabled'/>";
		var devmanu = "<input id='newDevPartnerDevManuS' type='text' value='"+manu+"' disabled='disabled'/>";
		var devmodel = "<input id='newDevPartnerDevModelS' type='text' value='"+model+"' disabled='disabled'/>";
		if(globalDeviceType=="Mobile"){
			devhost = "<div class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>"+devhost+"</div>";
			devmanu = "<div class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>"+devmanu+"</div>";
			devmodel = "<div class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>"+devmodel+"</div>";
		}
        $('#newDevPartnerDevHost').empty().append(devhost);
        $('#newDevPartnerDevManu').empty().append(devmanu);
        $('#newDevPartnerDevModel').empty().append(devmodel);
        $('#autoDPartInfo1').show();
        $('#autoDPartInfo2').show();
        $('#autoDOptIncMappChk').show();
        $('#autoDDevSlotsIncCont').show();
    }else if(type=="testtool"){
		var devhost = "<input id='newTestTPartnerDevHostS' type='text' value='"+host+"' disabled='disabled'/>";
		var devmanu = "<input id='newTestTPartnerDevManuS' type='text' value='"+manu+"' disabled='disabled'/>";
		var devmodel = "<input id='newTestTPartnerDevModelS' type='text' value='"+model+"' disabled='disabled'/>";
		if(globalDeviceType=="Mobile"){
			devhost = "<div class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>"+devhost+"</div>";
			devmanu = "<div class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>"+devmanu+"</div>";
			devmodel = "<div class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>"+devmodel+"</div>";
		}

        $('#newTestTPartnerDevHost').empty().append(devhost);
        $('#newTestTPartnerDevManu').empty().append(devmanu);
        $('#newTestTPartnerDevModel').empty().append(devmodel);
        $('#autoDTestTPartInfo1').show();
        $('#autoDTestTPartInfo2').show();
        $('#autoDTestTOptIncMappChk').show();
        $('#autoDTestTSlotsIncCont').show();
    }else if(type=="admin") {
		$('#partdevhost').val(host);
		$('#partdevmanu').val(manu);
		$('#partdevmodel').val(model);
		$('#partdevhostC').show();
		$('#partdevmanuC').show();
		$('#partdevmodelC').show();
	}

    var tbladd = "";
	if(slots!=""){
	    for(var i=0; i<slots.length; i++) {
    	    var slotdata = slots[i].split("*");
        	var slotnum = slotdata[0].split("=")[0];
	        var slotpid = slotdata[2];
   		    var tbladdid = host.replace(/\./g,"_")+"__"+slotnum.replace(/\./g,"_");
   		    var tbladdidP = host.replace(/\./g,"_")+"__"+slotnum.replace(/\./g,"_")+"Search";
			if(globalDeviceType=="Mobile"){
		        tbladd += "<tr id='"+tbladdid+"' class='trAutoDP'><td>"+slotnum+"</td><td>"+slotpid
    		        +"</td></tr>";
			}else{
		        tbladd += "<tr id='"+tbladdid+"' class='trAutoDP'><td style='text-align:center;'>"+
					"<input id=\""+tbladdid+"Select\" type='checkbox' style='width:15px;' "+
					"onclick=\"checkSlotAutoD(this);\">"+
					"<td>"+slotnum+"</td><td>"+slotpid
    		        +"</td></tr>";
			}
		}
    }
    if(type=="device"){$('#autoDPartnerInfoTable > tbody').empty().append(tbladd);}
    if(type=="testtool"){$('#autoDTestTPartnerInfoTable >tbody').empty().append(tbladd);}
    if(type=="admin"){$('#partSlotInfoAutoDAdmin >tbody').empty().append(tbladd);}
	if(globalDeviceType=="Mobile"){
		$(".trAutoDP").on("tap",function(){
    	    if($(this).hasClass('highlight') == false){
        	    $(this).addClass('highlight');
	        }else{
    	        $(this).removeClass('highlight');
        	}
	    });
	}

    if(type=="device"){
		if(tbladd!=""){
	        $('#autoDPartnerInfoTableCont').show();
		    showautoDPortSrchTableByNum(3);
		}else{
			$('#autoDPartnerInfoTableCont').hide();
		}
		
    }else if(type=="testtool"){
		if(tbladd!=""){
        	$('#autoDTestTPartnerInfoTableCont').show();
			showautoDPortSrchTableByNum(3);
		}else{
        	$('#autoDTestTPartnerInfoTableCont').hide();
		}
    }else if(type=="admin"){
		if(tbladd!=""){
			$('#partSlotAdminTable').show();
			showautoDPortSrchTableByNum(3);
		}else{
			$('#partSlotAdminTable').hide();
		}
	}
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function checkSlotAutoDAll(flag){
	var flag2 = $(flag).is(':checked');
	
	if(AutoDType.toLowerCase()=='testtool' || AutoDType.toLowerCase()=='server') {
		var partnerslots = $('#autoDTestTPartnerInfoTbody > tr');
	}else if(AutoDType.toLowerCase()=='admin'){
		var partnerslots = $('#partSlotInfoAutoDAdminTbody > tr');
	}else{
		var partnerslots = $('#autoDPartnerInfoTbody > tr');
	}
	$.each(partnerslots, function(index,object){
		if (flag2 != $("#"+(object.children[0].children[0].getAttribute('id'))).is(':checked')) {
			$("#"+(object.children[0].children[0].getAttribute('id'))).trigger('click');
		}
	});
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function checkSlotAutoD(obj){
	var flag = $(obj).is(':checked');
	var parentid = $(obj).parent().parent()[0].id;
	var tmpid = $("#"+parentid+" > td")[3].getAttribute('id');
	if(flag){
		$('#'+parentid).addClass('highlight');
		$("#"+tmpid+" > input").attr('disabled',false);
		$("#"+tmpid+" > input").val('');
	}else{
		$('#'+parentid).addClass('highlight');
		$("#"+tmpid+" > input").attr('disabled',true);
		$("#"+tmpid+" > input").val('');
	}
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function switchDevicePartnerAutoD(opt) {
    var optselect = "<option>Select</option>";
    switch(opt) {
        case "L1 Switch":
            optselect += "<option>Networking Device</option>";
        break;
        case "L2 Switch":
            optselect += "<option>Networking Device</option>";
        break;
        case "Networking Device": case "Appliance": case "Terminal Server":
            optselect += "<option>L1 Switch</option>";
            optselect += "<option>L2 Switch</option>";
            optselect += "<option>Networking Device</option>";
        break;
    }
    $('#autoDPartTypeOpt').empty().append(optselect);
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkIPInputChar(evt,type) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
	if(type=="console"){
		if ((charCode >= 48 && charCode <=57 ) || charCode == 46 || charCode == 45 ||
			charCode == 95 || (charCode >= 65 &&  charCode <= 90) || (charCode >= 97 
			&& charCode <= 122)){
			return true
		}
	}else if((charCode >= 48 && charCode <=57 ) || charCode == 46) {
		return true
	}
    return false;
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkNumberInputChar(evt,obj,limit) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
    var asciiCode = String.fromCharCode(charCode);
	if (charCode >= 48 && charCode <=57 ) {
		if(limit){
			var tmp = "";
			if($(obj).val()!=undefined){ tmp = $(obj).val() }
			if(parseInt(tmp+asciiCode)>parseInt(limit)){
				alertUser("Input cannot be greater than "+limit+".");
				return false;
			}else{
				return true;
			}
		}else{
			return true;
		}
	}
	return false;
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function createDevSlotTbodyAutoD(val,type) {
    if(parseInt(val)>0){
        var input = "";
        for(i = 0;i<parseInt(val);i++) {
            input += "<tr><td style='text-align:center;'><input placeholder='Slot:' type='text' style='border:none;width:90%;'></td>";
            input += "<td style='text-align:center;'><input placeholder='Port Count:' onKeyPress='return checkNumberInputChar(event)' type='text' style='border:none;width:90%;'></td></tr>";
        }
        if(type=="device"){
            var aswidth = $('#autoDPartnerInfoField').width()/2;
            $('#autoDDevSlotNum').width(aswidth);
            $('#autoDDevSlotPortSrch').width(aswidth);
            $('#autoDDevSlotInfoTbody').empty().append(input);
            $('#autoDDevSlotInfoTableCont').show();
        }else if(type=="testtool"){
            var aswidth = $('#autoDTestTPartnerInfoField').width()/2;
			if(globalDeviceType!="Mobile"){aswidth = "50%"}
            $('#autoDTestTSlotNum').width(aswidth);
            $('#autoDTestTSlotPortSrch').width(aswidth);
            $('#autoDTestTSlotInfoTbody').empty().append(input);
            $('#autoDTestTSlotInfoTableCont').show();
            //$('#autoDTestTSlotInfoTable').show();
        }
    }else{
        if(type=="device"){
            $('#autoDDevSlotInfoTbody').empty();
            $('#autoDDevSlotInfoTableCont').hide();
        }else if(type=="testtool"){
            $('#autoDTestTSlotInfoTbody').empty();
            $('#autoDTestTSlotInfoTableCont').hide();
        }
    }

}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function toCreateNAT(evt,obj) {

	var key = event.keyCode;
	if (key == 13) {
		createNATTbodyAutoD($(obj).val());
		return true;
	}else{
		return checkNumberInputChar(evt);
	}
	
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function createNATTbodyAutoD(val) {
	if(parseInt(val)>0){
		var aswidth = $('#autoDSaveNATInfo').width()/3;
		var input = "";
		for(i = 0;i<parseInt(val);i++) {
			input += "<tr><td><input placeholder='Access Type:' type='text' style='border:none;font-size:16px;width:100%;'></td>";
			input += "<td><input placeholder='Ip Address:' type='text' style='border:none;font-size:16px;width:100%;'></td>";
			input += "<td><input placeholder='Address Port:' type='text' style='border:none;font-size:16px;width:100%;' onKeyPress='return checkNumberInputChar(event,this,\"66535\");' ></td></tr>";
		}
		$('#autoDSaveNATType').width(aswidth);
		$('#autoDSaveNATAdd').width(aswidth);
		$('#autoDSaveNATPort').width(aswidth);
		$('#autoDSaveNATContent').empty().append(input);
		$('#autoDSaveNATTableCont').show();	
	}else{
		$('#autoDSaveNATContent').empty();	
		$('#autoDSaveNATTableCont').hide();	
	}
}



/*
 *
 *  FUNCTION NAME : checkPortsDeviceStructure
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 07, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkPortsDeviceStructure(val){
	var structure = $("#dropdownstruction").val();
	value = parseInt(val);	
	if(structure=="devport"){
		var limit = 265
		if (value>=limit) {
			error(msg,"Notification") 
			$('#portperdevice').val("");
		}	
	}
}

/*
 *
 *  FUNCTION NAME : checkManagementInt
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 07, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkManagementInt(val){
	if(val!=""){
		$("#dropdowndomain").removeAttr('disabled');
		//$("#dropdownstruction").removeAttr('disabled');
		$("#portperdevice").removeAttr('disabled');
		$("#newdevapplyall").removeAttr('disabled');
	}else{
		$("#dropdowndomain").attr('disabled',true);
		//$("#dropdownstruction").attr('disabled',true);
		$("#portperdevice").attr('disabled',true);
		$("#newdevapplyall").attr('disabled',true);
	}
}
/*
 *
 *  FUNCTION NAME : checkIpEnable
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 07, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkIpEnable(val){	
	if (val!="") {
		$("#newdevusername").removeAttr('disabled');
		$("#newdevpassword").removeAttr('disabled');
		$("#newdevmanageinterface").removeAttr('disabled');
		$("#newdevportcheckbox").removeAttr('disabled');
		$("#newdevportaddress").removeAttr('disabled');	
	}else{
		$("#newdevusername").attr('disabled',true);
		$("#newdevpassword").attr('disabled',true);
		$("#newdevmanageinterface").attr('disabled',true);
		$("#newdevportcheckbox").prop('checked',false);
		$("#newdevportcheckbox").attr('disabled',true);
		$("#newdevportaddress").attr('disabled',true);
	}
}
/*
 *
 *  FUNCTION NAME : checkModel
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 07, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkModel(val){	
	if (val!="") {
		$("#newdevdescription").removeAttr('disabled');
		//$("#dropdownphysicalporttype").removeAttr('disabled');
	}else{
		$("#newdevdescription").attr('disabled',true);
		//$("#dropdownstruction").attr('disabled',true);
		//$("#dropdownphysicalporttype").attr('disabled',true);
		$("#newdevmanagementip").attr('disabled',true);
		$("#newdevconsoleip").attr('disabled',true);
		$("#newdevauxiliary").attr('disabled',true);
		$("#newdevportcheckbox").attr('disabled',true);
		$("#newdevportaddress").attr('disabled',true);
		$("#newdevusername").attr('disabled',true);
		$("#newdevpassword").attr('disabled',true);
		$("#newdevmanageinterface").attr('disabled',true);
	}
}
/*
 *
 *  FUNCTION NAME : checkProductFamily
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 07, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkProductFamily(val){	
	if (val!="") {
		$("#newdevmodel").removeAttr('disabled');
		$("#newdevmodel1").removeAttr('disabled');
		$("#labelmodel").removeAttr('disabled');
	}else{
		$("#labelmodel").attr('disabled',true);
		$("#newdevmodel").attr('disabled',true);
		$("#newdevmodel1").attr('disabled',true);
		$("#newdevdescription").attr('disabled',true);
		$("#dropdownstruction").attr('disabled',true);
		//$("#dropdownphysicalporttype").attr('disabled',true);
		$("#newdevmanagementip").attr('disabled',true);
		$("#newdevconsoleip").attr('disabled',true);
		$("#newdevauxiliary").attr('disabled',true);
		$("#newdevportcheckbox").attr('disabled',true);
		$("#newdevportaddress").attr('disabled',true);
		$("#newdevusername").attr('disabled',true);
		$("#newdevpassword").attr('disabled',true);
		$("#newdevmanageinterface").attr('disabled',true);
	}
}
/*
 *
 *  FUNCTION NAME : checkProductFamily
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 07, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkProductFamily(val){	
	if (val!="") {
		$("#newdevmodel").removeAttr('disabled');
	}else{
		$("#newdevmodel").attr('disabled',true);
		$("#newdevdescription").attr('disabled',true);
		//$("#dropdownstruction").attr('disabled',true);
		//$("#dropdownphysicalporttype").attr('disabled',true);
		$("#newdevmanagementip").attr('disabled',true);
		$("#newdevconsoleip").attr('disabled',true);
		$("#newdevauxiliary").attr('disabled',true);
		$("#newdevportcheckbox").attr('disabled',true);
		$("#newdevportaddress").attr('disabled',true);
		$("#newdevusername").attr('disabled',true);
		$("#newdevpassword").attr('disabled',true);
		$("#newdevmanageinterface").attr('disabled',true);
	}
}
/*
 *
 *  FUNCTION NAME : checkOperatingSystem
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 07, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkOperatingSystem(val,type){	
	if(val=="Other"){
		if (type=="devtype"){
			$("#lablemanufacturer").css("display","block");
		}
	}else if (val!="") {
		$("#newdevproductfamily").removeAttr('disabled');
		$("#newdevproductfamily1").removeAttr('disabled');
		$("#labelproductfamily").removeAttr('disabled');
	}else{
		$("#labelproductfamily").attr('disabled',true);
		$("#labelmodel").attr('disabled',true);
		$("#newdevproductfamily1").attr('disabled',true);
		$("#newdevmodel1").attr('disabled',true);
		$("#newdevproductfamily").attr('disabled',true);
		$("#newdevmodel").attr('disabled',true);
		$("#newdevdescription").attr('disabled',true);
		//$("#dropdownstruction").attr('disabled',true);
		//$("#dropdownphysicalporttype").attr('disabled',true);
		$("#newdevmanagementip").attr('disabled',true);
		$("#newdevconsoleip").attr('disabled',true);
		$("#newdevauxiliary").attr('disabled',true);
		$("#newdevportcheckbox").attr('disabled',true);
		$("#newdevportaddress").attr('disabled',true);
		$("#newdevusername").attr('disabled',true);
		$("#newdevpassword").attr('disabled',true);
		$("#newdevmanageinterface").attr('disabled',true);
	}

}
/*
 *
 *  FUNCTION NAME : checkManufacturer
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 07, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkManufacturer(val,type){	
	if(val=="Other"){
		if (type=="man"){
			hideShowElement("newdevmanufacturer1","newdevmanufacturer");	
			$("#lablemanufacturer").css("display","block");
		}
	}else if (val!="") {
		$("#newdevoperatingsystem").removeAttr('disabled');
		$("#newdevoperatingsystem1").removeAttr('disabled');
		$("#libeloperatingsystem").removeAttr('disabled');
	}else{
		$("#libeloperatingsystem").attr('disabled',true);
		$("#labelproductfamily").attr('disabled',true);
		$("#labelmodel").attr('disabled',true);
		$("#newdevoperatingsystem1").attr('disabled',true);
		$("#newdevproductfamily1").attr('disabled',true);
		$("#newdevmodel1").attr('disabled',true);
		$("#newdevoperatingsystem").attr('disabled',true);
		$("#newdevproductfamily").attr('disabled',true);
		$("#newdevmodel").attr('disabled',true);
		$("#newdevdescription").attr('disabled',true);
		//$("#dropdownstruction").attr('disabled',true);
		//$("#dropdownphysicalporttype").attr('disabled',true);
		$("#newdevmanagementip").attr('disabled',true);
		$("#newdevconsoleip").attr('disabled',true);
		$("#newdevauxiliary").attr('disabled',true);
		$("#newdevportcheckbox").attr('disabled',true);
		$("#newdevportaddress").attr('disabled',true);
		$("#newdevusername").attr('disabled',true);
		$("#newdevpassword").attr('disabled',true);
		$("#newdevmanageinterface").attr('disabled',true);
	}

} 
/*
 *
 *  FUNCTION NAME : clickDeviceTyp
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 07, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function clickDeviceType(val){
	getMapPartnerPortInfo();
	newDeviceAvailableDom();
	newDevAttribute();
	var itm = ["newdevmanufacturer","newdevoperatingsystem","newdevdescription","newdevmanagementip","newdevmanageinterface","newdevconsoleip","newdevauxiliary"]
	if(val!="Select") {
		if(globalDeviceType=="Mobile"){	
			for(var i=0; i<itm.length;i++){
				$("#"+itm[i]).textinput("enable");	
			}	
			$("#newdevproductfamily").textinput("enable");	
			$("#newdevmodel").textinput("enable");	
			
		}else{
			$("#newdevmanufacturer").removeAttr('disabled');
			$("#newdevmanufacturer1").removeAttr('disabled');
			$("#newdevoperatingsystem1").removeAttr('disabled');
			$("#newdevproductfamily1").removeAttr('disabled');
			$("#newdevmodel1").removeAttr('disabled');
			$("#newdevmanufacturer").removeAttr('disabled');
			$("#newdevoperatingsystem").removeAttr('disabled');
			$("#newdevproductfamily").removeAttr('disabled');
			$("#newdevmodel").removeAttr('disabled');
			$("#newdevdescription").removeAttr('disabled');
			//$("#dropdownstruction").removeAttr('disabled');
			$("#newdevmanagementip").removeAttr('disabled');
			$("#newdevmanageinterface").removeAttr('disabled');
			$("#newdevconsoleip").removeAttr('disabled');
			$("#newdevauxiliary").removeAttr('disabled');
		}
	}else{
		if(globalDeviceType=="Mobile"){
			for(var i=0; i<itm.length;i++){
				$("#"+itm[i]).textinput("disable");
			}
			$("#newdevproductfamily").textinput("disabl");
			$("#newdevmodel").textinput("disabl");
		}else{
			$("#lablemanufacturer").attr('onclick',true);
			$("#libeloperatingsystem").attr('onclick',true);
			$("#labelproductfamily").attr('onclick',true);
			$("#labelmodel").attr('onclick',true);
			$("#newdevmanufacturer1").attr('disabled',true);
			$("#newdevoperatingsystem1").attr('disabled',true);
			$("#newdevproductfamily1").attr('disabled',true);
			$("#newdevmodel1").attr('disabled',true);
			$("#newdevmanufacturer").attr('disabled',true);
			$("#newdevoperatingsystem").attr('disabled',true);
			$("#newdevproductfamily").attr('disabled',true);
			$("#newdevmodel").attr('disabled',true);
			$("#newdevdescription").attr('disabled',true);
			//$("#dropdownstruction").attr('disabled',true);
			$("#newdevmanagementip").attr('disabled',true);
			$("#newdevconsoleip").attr('disabled',true);
			$("#newdevauxiliary").attr('disabled',true);
			$("#newdevportcheckbox").attr('disabled',true);
			$("#newdevportaddress").attr('disabled',true);
			$("#newdevusername").attr('disabled',true);
			$("#newdevpassword").attr('disabled',true);
			$("#newdevmanageinterface").attr('disabled',true);
		}
	}
}
/*
 *
 *  FUNCTION NAME : checkHostNameInput
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */
function checkHostNameInput(val){
	if (val!="") {
		if(globalDeviceType=="Mobile"){
			$("#dropdowndevicetype").selectmenu("enable");
		}else{
			$("#dropdowndevicetype").removeAttr('disabled')
		}
	}else{
		$(".deviceInfoHideAndShow").hide();
		if(globalDeviceType=="Mobile"){
			$("#dropdowndevicetype").selectmenu("disable");
			$("#dropdowndomain").selectmenu("disable");
			$("#newdevmanageaddress").selectmenu("disable");
			$("#newdevconsoleaddress").selectmenu("disable");
			$("#dropdowndevicetype").selectmenu("disable");
			$("#newdevmanufacturer").selectmenu("disable");
			$("#newdevoperatingsystem").selectmenu("disable");
			$("#newdevproductfamily").selectmenu("disable");
			$("#newdevmodel").selectmenu("disable");
			$("#newdevdescription").selectmenu("disable");
			$("#dropdownstruction").selectmenu("disable");
			$("#newdevmanagementip").selectmenu("disable");
			$("#newdevconsoleip").selectmenu("disable");
			$("#newdevauxiliary").selectmenu("disable");
			$("#newdevportcheckbox").selectmenu("disable");
			$("#newdevportaddress").selectmenu("disable");
			$("#newdevusername").selectmenu("disable");
			$("#newdevpassword").selectmenu("disable");
			$("#newdevmanageinterface").selectmenu("disable");
		}else{
			$("#dropdowndevicetype").attr('disabled',true);
			$("#dropdowndomain").attr('disabled',true);
			$("#newdevmanageaddress").attr('disabled',true);
			$("#newdevconsoleaddress").attr('disabled',true);
			$("#dropdowndevicetype").attr('disabled',true);
			$("#newdevmanufacturer").attr('disabled',true);
			$("#newdevoperatingsystem").attr('disabled',true);
			$("#newdevproductfamily").attr('disabled',true);
			$("#newdevmodel").attr('disabled',true);
			$("#newdevdescription").attr('disabled',true);
			$("#dropdownstruction").attr('disabled',true);
			$("#newdevmanagementip").attr('disabled',true);
			$("#newdevconsoleip").attr('disabled',true);
			$("#newdevauxiliary").attr('disabled',true);
			$("#newdevportcheckbox").attr('disabled',true);
			$("#newdevportaddress").attr('disabled',true);
			$("#newdevusername").attr('disabled',true);
			$("#newdevpassword").attr('disabled',true);
			$("#newdevmanageinterface").attr('disabled',true);
		}
	}
}
/*
 *
 *  FUNCTION NAME : returnSelectedTab
 *  AUTHOR        : marlo agapay
 *  DATE          : March 18, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */
var selectedTab = [];
function returnSelectedTab(tval,id){
	$(".tab-"+id).removeClass('highlight');
	var tagid = $(tval).attr("id");
	$("#"+tagid).addClass('highlight');
	if (id.toLowerCase() == "module"){
		$("#input_Module").val("");
		$("#ModuleDiv").hide();
		selectedTab[0].Module = tagid;
		returnTextCount(arrModuleCount,tagid,"module");
	}else if (id.toLowerCase() == "slot"){
		$("#input_Slot").val("");
		if (globalStructure == "devslotmod"){
			$("#SlotModuleDiv").hide();
		}else{
			$("#SlotDiv").hide();
		}
		selectedTab[0].Slot = tagid;
		returnTextCount(arrSlotCount,tagid,"slot");
	}else if (id.toLowerCase() == "port"){
		selectedTab[0].Port = tagid;
		returnPortInfo(devPortInfoArray,tagid);
	}else if (id.toLowerCase() == "rack"){
		$("#input_Rack").val("");
		$("#RackSlotModuleDiv").hide();
		selectedTab[0].Rack = tagid;
		returnTextCount(arrRackCount,tagid,"rack");
	}
	return;
}
/*
 *
 *  FUNCTION NAME : returnTextCount
 *  AUTHOR        : marlo agapay
 *  DATE          : March 20, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :return on each tab
 *  PARAMETERS    : array id
 *
 */

function returnPortInfo(array,id){
	for (var a=0; a<array.length; a++){
		if(array[a].PortId == id){
			$("#porttypeinfo1").val(array[a].PortTypeInfo);
			$("#mediatype").val(array[a].MediaType);
			$("#portnamenumber").val(array[a].PortName);
			$("#partnerhostname").val(array[a].PartnerHostname);
			$("#partneripaddress").val(array[a].PartnerIp);
			$("#partnerslot").val(array[a].PartnerSlot);
			$("#partnerportinfo").val(array[a].PartnerPortInfo);
			
			return;
		}
	}	
}
/*
 *
 *  FUNCTION NAME : returnSelectedTab
 *  AUTHOR        : marlo agapay
 *  DATE          : March 18, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */

function returnTextCount(array,id,type){
	for (var a=0; a<array.length; a++){
		if(array[a].SlotId== id && type == "slot"){
			$("#input_Slot").val(array[a].Value);			
			$("#input_Slot").trigger("keyup");
			setTimeout(function(){
				if ($("#input_Slot").val()){
	//				triggerChildtabs("slot");	
					$("#slotDiv").show();
					$("#slotModuleDiv").show();
					if(globalStructure == "devslotmod"||globalStructure== "devrackslotport"){	
						$("#"+selectedTab[0].Module).trigger("click");
					}else{
						$("#"+selectedTab[0].Port).trigger("click");
					}
				}
			},1000);
			break;return;
		}else if(array[a].ModuleId== id && type == "module"){
			$("#input_Module").val(array[a].Value);			
			$("#input_Module").trigger("keyup");
			setTimeout(function(){
	//			triggerChildtabs("module");	
				$("#ModuleDiv").show();
				$("#"+selectedTab[0].Port).trigger("click");
			},1000);
			break;return;
		}else if(array[a].RackId== id && type == "rack"){
			$("#input_Rack").val(array[a].Value);
			setTimeout(function(){
				$("#input_Rack").trigger("keyup");			
				if($("#input_Rack").val()){
	//				triggerChildtabs("rack");	
					$("#RackSlotModuleDiv").show();
					$("#"+selectedTab[0].Slot).trigger("click"); 
					$("#"+selectedTab[0].Module).trigger("click");
				}
			}, 1000);
			break;return;
		}
	}
}
function triggerChildtabs(type){
		if(selectedTab[0].Slot)
			$("#"+selectedTab[0].Slot).trigger("click");
		if (selectedTab[0].Module)
			$("#"+selectedTab[0].Module).trigger("click");
		if (selectedTab[0].Port){
			$("#"+selectedTab[0].Port).trigger("click");
		}
	return;
}
var devPortInfoArray = [];
function appendToArrayInfo(){
	var port = "";
	var hostname = "";
	var hostnames = "";
	//hostnames += "<option value=''></option>"
	var mapportinfo = GlobalMapPort.MAINCONFIG[0].DEVICE
	var porttype = $("#porttypeinfo1").val();
	for (var a=0; a<mapportinfo.length; a++){
		try{
			port = mapportinfo[a].PortType
			if (port==porttype){
				hostname = mapportinfo[a].HostName
				hostnames += "<option value='"+hostname+"'>"+hostname+"</option>"	
			}
		}catch(err){
			continue		
		}
	}
	$("#partnerhostname").empty().append(hostnames);
	for (var a=0; a<devPortInfoArray.length; a++){
		if (devPortInfoArray[a].PortId == selectedTab[0].Port){
			var portname = 	$("#portnamenumber").val();	
			var portType = $("#porttypeinfo1").val();
			var mediatype = $("#mediatype").val();
			var hostname = $("#partnerhostname").val();
			var ipaddress = $("#partneripaddress").val();
			var slot = $("#partnerslot").val();
			var partnerInfo  = $("#partnerportinfo").val();
			devPortInfoArray[a].PortTypeInfo = portType;
			devPortInfoArray[a].PortName = portname;
			devPortInfoArray[a].MediaType = mediatype;	
			devPortInfoArray[a].PartnerHostname = hostname;	
			devPortInfoArray[a].PartnerIp = ipaddress;	
			devPortInfoArray[a].PartnerSlot = slot;	
			devPortInfoArray[a].PartnerPortInfo= partnerInfo;	
			return;
		}
	}
}
//devInfoArray.push({PortTypeInfo:"", PortName:"", MediaType:""});
/*
 *
 *  FUNCTION NAME : getTabSelectedID 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */
function getTabSelectedID(){
	var rack = "";
	rack = selectedTab[0].Rack
}
function pushAllToArray(id, str,a,idVal){
	var arrId = "";
		
		if (id =="Slot"){
			if(globalStructure == "devslotport"){
	            arrSlotCount.push({SlotId : idVal, Value : "", PhysicalPortType :""});
			}
			else 
	            arrSlotCount.push({SlotId : idVal, Value : ""});
		}else if (id == "Module"){
            arrModuleCount.push({ModuleId : idVal, Value :"", PhysicalPortType:""});
		}else{
			if(id !="Port"){
            	arrRackCount.push({RackId : idVal, Value : ""});
			}
		}
}

/*
 *
 *  FUNCTION NAME : newDynamicTab 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */
function newDynamicTab(id,num,divid,str,level,did){
	var tab = "";var tabnum = num-1;
	var comID = ""; // get complete struing id for appendSelectedTabToArray FCN
	tab += "<ul id='"+str+"' class='ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'>";
	for(var a=0; a<=tabnum; a++){
		/*    PUSH   ARRAY */


		if(level=="parent"){
		var m = id+a;
		pushAllToArray(id,str,a,m);	
			tab +="<li id='"+id+a+"' style=''";
			comID = id+a;
			if (id=="Port")
				devPortInfoArray.push({PortId : comID, PortTypeInfo: "", PortName:"", MediaType:"", PartnerHostname: "", PartnerIp: "", PartnerSlot: "", PartnerPortInfo: ""});
		}else{
			var m = globalTabParentId+"_"+id+a;
			pushAllToArray(id,str,a,m);
			tab +="<li id='"+globalTabParentId+"_"+id+a+"' style=''";
			comID = globalTabParentId+"_"+id+a;
			
			if (id=="Port"){
				var con = $.map(devPortInfoArray, function(val) {
					if(val.PortId == globalTabParentId+"_"+id+a) return true; 
				});
				if (con.length == 0){
					devPortInfoArray.push({PortId : comID, PortTypeInfo: "", PortName:"", MediaType:"", PartnerHostname: "", PartnerIp: "", PartnerSlot: "", PartnerPortInfo: ""});
				}
			}
		}
		tab +=" style='width: auto;'";
		tab +=" onclick=\"returnSelectedTab(this,'"+id+"')\" ";
		/*======= HIGHLIGHT TABS ========== */
		if (a==0){
			tab +="class='ui-tabs-anchor ui-state-default ui-corner-top tab-"+id+" highlight'>";
			appendSelectedTabToArray(id,comID);
		}else{
			tab +="class='ui-tabs-anchor ui-state-default ui-corner-top tab-"+id+"'>";
		}
		tab +="<a href='#tabs' style='color: ";
		tab +="#000;font-weight: bold;' class=''>"+id+a+"</a></li>";	
	}
	tab += "</ul>";
	if (id=="Port"){
		tab += portcontent();
	}else{
		tab += "<table id='"+id+"'";
		tab += " class='slotcontentshowhide'>";
		tab += "<tr><td style='width: 90px;'><br>";
		if(str=="slot" || str=="module")
			tab += "<p>Number of Ports: <br></p></td><td><p>";
		else if(str=="slotmodule")
			tab += "<p>Number of Modules: <br></p></td><td><p>";
		else if(str=="rackslotmodule")
			tab += "<p>Number of Slots: <br></p></td><td><p>";
		else
			tab += "<p>Number of Modules: <br></p></td><td><p>";
		tab += "<br><input id='input_"+id+"' maxlength='3'";
		tab += " type='search'";
		if(id=="Slot" || id=="Module" || id=="Rack"){
			tab += " onkeyup='tabsContents(\""+str+"\",this.value)'";
		}
		if (str=="slot" || str=="module"){
			tab += "/></p></td><td style=''>";
        	tab += "<br><p>Physical Port Type:</p>";
	        tab += "</td>";
    	    tab += "<td ><br>";
        	tab += "<select id='physicalportid' data-mini='true' style='width: 158px;'>";
	        tab += "<option value='Select'>Select</option>";
    	    tab += "<option value='ATM'>ATM</option>";
        	tab += "<option value='Ethernet'>Ethernet</option>";
	        tab += "<option value='GigabitEhernet'>GigabitEhernet</option>";
    	    tab += "<option value='TenGigabitEthernet'>TenGigabitEthernet</option>";
	        tab += "<option value='FortyGigabitEthernet'>FortyGigabitEthernet</option>";
    	    tab += "<option value='HundredGigabitEthernet'>HundredGigabitEthernet</option>";
	        tab += "<option value='POS'>POS</option>";
    	    tab += "<option value='Serial'>Serial</option>";
        	tab += "<option value='Embedded'>Embedded Service</option>";
	        tab += "</select>";
    	    tab += "</td></tr>";
			tab += "</table>";
		}else{
			tab += "/></p></td></tr>";
	        tab += "</table>";
		}
	}
	tab += "<div id='"+divid+"'>"
	tab += "<div>"
	$("#"+did).empty().append(tab);
	$("#"+did).tabs();
}
function appendSelectedTabToArray(str,comID){
	str = str.toLowerCase();
	if(str=="slot"){
		selectedTab[0].Slot = comID;
	}else if (str=="module"){
		selectedTab[0].Module = comID;
	}else if (str=="port"){
		selectedTab[0].Port = comID;
	}else if (str=="rack"){
		selectedTab[0].Rack = comID;
	}
}
/*
 *
 *  FUNCTION NAME : tabsContents 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
var arrSlotCount =[];
var arrModuleCount = [];
var arrRackCount = [];
function tabsContents(str,val){
	if(str=="slot"){
		globalTabParentId = selectedTab[0].Slot
		if (val ==""){
			if (globalStructure == "devslotmod"){
				$("#SlotModuleDiv").hide();
			}else{
				$("#SlotDiv").hide();
			}
			deleteToArrayCount(devPortInfoArray,globalTabParentId,"port");
		}else{
			var slotCount = selectedTab[0].Slot;
			pushToArrayCount("slot",val,"parent");
			newDynamicTab("Port",val,"PortDiv","port","Port","SlotDiv");
			if (globalStructure == "devslotmod"){
				$("#SlotModuleDiv").show();
			}else{
				$("#SlotDiv").show();
			}
		}
	}else if (str=="module"){
		globalTabParentId = selectedTab[0].Module
		if(val ==""){
			deleteToArrayCount(devPortInfoArray,globalTabParentId,"port");
			for(var a=0; a<arrModuleCount.length; a++){
				if(arrModuleCount[a].ModuleId == selectedTab[0].Module)
					arrModuleCount[a].Value =""; break;		
			}
			$("#ModuleDiv").hide();
		}else{
			pushToArrayCount("module",val,"parent");
			newDynamicTab("Port",val,"PortDiv","port","Port","ModuleDiv");
			$("#ModuleDiv").show();
		}
		// $("#input_Module").trigger("keyup");
	}else if (str=="slotmodule"){
		globalTabParentId = selectedTab[0].Slot;
		if (val==""){
			$("#SlotModuleDiv").hide();
			for(var a=0; a<arrSlotCount.length; a++){
				if(arrSlotCount[a].SlotId == selectedTab[0].Slot)
					arrSlotCount[a].Value =""; break;		
			}

			deleteToArrayCount(arrModuleCount,globalTabParentId,"module");
			deleteToArrayCount(devPortInfoArray,globalTabParentId,"port","child");
			if (globalStructure == "devrackslotport"); 
				deleteToArrayCount(arrModuleCount,selectedTab[0].Rack,"module");
			return;
		}else{
			$("#SlotModuleDiv").show();
			pushToArrayCount("slot",val);
			newDynamicTab("Module",val,"ModuleDiv","module","Module","SlotModuleDiv");
		}
	}else if (str=="rackslotmodule"){
		globalTabParentId = selectedTab[0].Rack;	
		if (val==""){
	//		arrSlotCount = [];
	//		arrRackCount = [];
	//		arrModuleCount = [];
	//		devPortInfoArray = [];
			deleteToArrayCount(arrSlotCount,globalTabParentId,"slot");
			deleteToArrayCount(devPortInfoArray,globalTabParentId,"port","child");
			deleteToArrayCount(arrModuleCount,globalTabParentId,"module","child");
		   	$("#RackSlotModuleDiv").hide();
//			return;
		}else{
			pushToArrayCount("rack",val);
			newDynamicTab("Slot",val,"SlotModuleDiv","slotmodule","Slot","RackSlotModuleDiv");
			$("#RackSlotModuleDiv").show();
		}
	}else{
		globalTabParentId = selectedTab[0].Slot;
		if (val==""){
			for(var a=0; a<arrSlotCount.length; a++){
				if(arrSlotCount[a].SlotId == selectedTab[0].Slot)
					arrSlotCount[a].Value =""; break;		
			}

			deleteToArrayCount(arrModuleCount,globalTabParentId,"module");
			deleteToArrayCount(devPortInfoArray,globalTabParentId,"port");
		}
		pushToArrayCount("module",val);
		newDynamicTab("Module",val,"ModuleDiv","module","Module","SlotModuleDiv");
	}
}
function deleteToArrayCount(array,globalTabParentId,type,flag){
	var delArr = [];
	if (type =="module"){ 
		for (var a=0; a<arrModuleCount.length; a++){
			if (type == "module"){
				var id = arrModuleCount[a].ModuleId.split("_");
				if (id[0] != globalTabParentId){
					delArr.push({ModuleId : arrModuleCount[a].ModuleId, Value:arrModuleCount[a].Value})
				}
			}
		}
		arrModuleCount = delArr;
		return;
	}else if (type =="slot"){ 
		for (var a=0; a<arrSlotCount.length; a++){
				var id = arrSlotCount[a].SlotId.split("_");
				if (id[0] != globalTabParentId){
					delArr.push({SlotId : arrSlotCount[a].SlotId, Value:arrSlotCount[a].Value})
				}
		}
		arrSlotCount = delArr;
		return;
	}else if(type == "port"){
		for (var a=0; a<devPortInfoArray.length; a++){
			if (flag =="child"){
				var id = devPortInfoArray[a].PortId;
				if (id.search(globalTabParentId) != -1){
					delArr.push({MediaType : devPortInfoArray[a].MediaType, PortId:devPortInfoArray[a].PortId, PortName : devPortInfoArray[a].PortName, PortTypeInfo : devPortInfoArray[a].PortTypeInfo})
				}
			}else{
				var parentArr1 = devPortInfoArray[a].PortId.split("_");
				var parentArr = parentArr1[0];
				for(var t=1; t<parentArr1.length; t++){
					if(t != parentArr1.length -1){
						parentArr+="_"+parentArr1[t];
					}
				}
				if (parentArr != globalTabParentId){
					delArr.push({MediaType : devPortInfoArray[a].MediaType, PortId:devPortInfoArray[a].PortId, PortName : devPortInfoArray[a].PortName, PortTypeInfo : devPortInfoArray[a].PortTypeInfo})
				}
			}
		}
		devPortInfoArray = delArr;
		return;
	}
			
}
function pushToArrayCount(type,val,flag){
    if (type=="rack"){
        var condition = false;
        for (var a=0; a<arrRackCount.length; a++){
            if (arrRackCount[a].RackId == globalTabParentId){
                arrRackCount[a].Value = val;
                condition = true;break;
            }
        }
        if (condition == false){
            arrRackCount.push({RackId : selectedTab[0].Rack, Value : val});
		}
    }else if (type =="slot"){
        var condition = false;
        for (var a=0; a<arrSlotCount.length; a++){
            if (arrSlotCount[a].SlotId == globalTabParentId){
                arrSlotCount[a].Value = val;
                condition = true;break;
            }
        }
        if (condition == false){
			if(globalStructure == "devslotport")
	            arrSlotCount.push({SlotId : selectedTab[0].Slot, Value : val, PhysicalPortType :""});
			else 
	            arrSlotCount.push({SlotId : selectedTab[0].Slot, Value : val});
		}
    }else if (type =="module"){
        var condition = false;
        for (var a=0; a<arrModuleCount.length; a++){
            if (arrModuleCount[a].ModuleId == globalTabParentId){
                arrModuleCount[a].Value = val;
                condition = true;break;
            }
        }
        if (condition == false)
            arrModuleCount.push({ModuleId : selectedTab[0].Module, Value : val, PhysicalPortType:""});
    }
}
/*
 *
 *  FUNCTION NAME : deviceStructureContent
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */
var globalStructure = "";
var globalTabParentId = "";
function deviceStructureContent(val){
	$("#dropdownphysicalporttype").attr('disabled',true);
	$("#newdevapplyall").attr('disabled',true);
	$("#tabspage").attr('disabled',true);
	var structure = $("#dropdownstruction").val();
	globalStructure = structure;
	if (val=="" || structure=="Select" || structure==""){
		alertUser("Please select device structure. Thank you!");
		$("#portperdevice").val("");
		devPortInfoArray = [];
		selectedTab = [];
		arrSlotCount = [];
		arrModuleCount =[];
		arrRackCount = [];
		$("#devicetypetabs").hide();
		return 0;
	}
	$("#devicetypetabs").show();
	if(structure == "devport"){
		$("#dropdownphysicalporttype").removeAttr('disabled');
		$("#newdevapplyall").removeAttr('disabled');
		$("#tabspage").removeAttr('disabled');
		devPortInfoArray = [];
		selectedTab = [];
		arrSlotCount = [];
		arrModuleCount =[];
		arrRackCount = [];
		selectedTab.push({Port: ""});
		globalTabParentId = selectedTab[0].Port
        var tabs = newDynamicTab("Port",val,"PortDiv","port","parent","devicetypetabs");
    }else if(structure == "devslotport"){
		devPortInfoArray = [];
		selectedTab = [];
		arrSlotCount = [];
		arrModuleCount =[];
		arrRackCount = [];
		selectedTab.push({Slot: "", Port: ""});
		globalTabParentId = selectedTab[0].Slot
        var tabs = newDynamicTab("Slot",val,"SlotDiv","slot","parent","devicetypetabs");
	}else if (structure == "devmodport"){
		devPortInfoArray = [];
		selectedTab = [];
		arrSlotCount = [];
		arrModuleCount =[];
		arrRackCount = [];
		selectedTab.push({Module: "", Port: ""});
		globalTabParentId = selectedTab[0].Module
        var tabs = newDynamicTab("Module",val,"ModuleDiv","module","parent","devicetypetabs");
	}else if (structure == "devslotmod"){
		devPortInfoArray = [];
		selectedTab = [];
		arrSlotCount = [];
		arrModuleCount =[];
		arrRackCount = [];
		selectedTab.push({Module:"",Slot: "", Port: ""});
		globalTabParentId = selectedTab[0].Slot
        var tabs = newDynamicTab("Slot",val,"SlotModuleDiv","slotmodule","parent","devicetypetabs");
	}else{
		devPortInfoArray = [];
		selectedTab = [];
		arrSlotCount = [];
		arrModuleCount =[];
		arrRackCount = [];
		selectedTab.push({Rack:"",Module:"",Slot: "", Port: ""});
		globalTabParentId = selectedTab[0].Rack
        var tabs = newDynamicTab("Rack",val,"RackSlotModuleDiv","rackslotmodule","parent","devicetypetabs");
	}
}
/*
 *
 *  FUNCTION NAME : portdynamictab
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */
function portdynamictab(val){
	var pageval = val/10;
	if (pageval > Math.floor(pageval)) {
		var pageval = pageval + 1;
		var pageval = parseInt(pageval);		
	}
	var pageinfo = "";
	for(var a=1; a<=pageval; a++){
		pageinfo +="<option value='"+a+"'>"+a+"</option>"
	}
	if($("#dropdownstruction").val() == "devport"){
		globalTabId = "port";
		var ret = createdynamictab(val,"newportid","Port ",257);
		var con = createDynamictabContent(val,257,"portcontent();");
	}else if($("#dropdownstruction").val() == "devslotport"){
		globalTabId = "slot";
		var ret = createSlotTab(val,"newslotid","Slot ",257);
		var con = createDynamictabContent(val,257,"slotContent();");
	}else if($("#dropdownstruction").val() == "devmodport"){
		globalTabId = "module";	
		var ret = createdynamictab(val,"newportid","Module ",257);
		var con = createDynamictabContent(val,257,"moduleContent();");
	}else if($("#dropdownstruction").val() == "devslotmod"){
		globalTabId = "slotmodule";
		var ret = createdynamictab(val,"newportid","Slot ",257);
		var con = createDynamictabContent(val,257,"slotModuleContent();");
	}else{
		var ret = createdynamictab(val,"newportid","Rack ",257);
		var con = createDynamictabContent(val,257,"rackContent();");
	}
	var tabs = ret.tabs
	var contents = con.contents
	$("#tabspage").empty().append(pageinfo);
	$("#porttabs").empty().append(tabs);
	$("#portinfotabs").empty().append(contents);
	$('#devicetypetabs').tabs();
	if($("#dropdownstruction").val() == "devport"){
		limittabsshow(1,"newportid",val);
	}else if($("#dropdownstruction").val() == "devslotport"){
		limittabsshow(1,"newslotid",val);
	}else{
		limittabsshow(1,"newslotid",val);
	}
}
/*
 *
 *  FUNCTION NAME : createdynamictab 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function createdynamictab(num,id,name,limit){
	var tab = "";
	var msg = "Port per device is over the limit.\nMaximum ports perr device is 256"
	$('#devicetypetabs').tabs();
	if (num>=limit) {
		error(msg,"Notification")	
		var val = 0;	
		$('#portperdevice').val("");
	}
	if(num==""){return 0;}
	for(var a=1; a<=num; a++){
		tab +="<li id='"+id+a+"' style='display:none'";
		tab +=" style='width: auto;'";
		if (globalTabId=="port"){
			tab +=" onclick=\"portinfoshow('"+id+a+"','"+a+"')\" ";
			tab +="class='ui-tabs-anchor ui-state-default ui-corner-top plimitshow'>";
		}else if(globalTabId=="slot"){
			tab +=" onclick=\"slotinfoshow('"+id+a+"','"+a+"')\" ";
			tab +="class='ui-tabs-anchor ui-state-default ui-corner-top slimitshow'>";
		}else{
			tab +="class='ui-tabs-anchor ui-state-default ui-corner-top mlimitshow'>";
		}
		tab +="<a href='#tabs-"+a+"' style='color: ";
		tab +="white;font-weight: bold;'>"+name+a+"</a></li>";	
	}
	var ret = ({tabs:tab});//,contents:content});
	return ret;
}
/*
 *
 *  FUNCTION NAME : createDynamictabContent 
 *  AUTHOR        : Krisfen G. Ducao 
 *  DATE          : March 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function createDynamictabContent(num,limit,execFunc){
	var content = "";
	var msg = "Port per device is over the limit.\nMaximum ports perr device is 256"
	$('#devicetypetabs').tabs();
	if (num>=limit) {
		error(msg,"Notification")	
		var val = 0;	
		$('#portperdevice').val("");
	}
	if(num==""){return 0;}
	for(var a=1; a<=num; a++){
		if(a==1){
			conterninfor = {};
			conterninfor = ({num:a,str:""}); 
			content += eval(execFunc);
		}else{
			conterninfor = {};
			conterninfor = ({num:a,str:"style='display:none'"});
			content += eval(execFunc);
		}
	}
	var ret = ({contents:content});
	return ret;
}
/*
 *
 *  FUNCTION NAME : portcontent 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function portcontent(){
	var content = "";
	if(globalDeviceType == "Mobile"){
		content += portContentMobile();
		return content
	}
	content += "<table ";
	content += " class='infoshowhide' style='width: 100%;'>";
	content += "<tr><td><table><tr>"
	content += "<td  style='width: 20px;' !important;></td>";
	content += "<td style='width: 150px;'>";
	content += "<p>Port type: <br></td><td><br>";
	content += "<select id='porttypeinfo1' onchange='appendToArrayInfo()'";
	content += " data-mini='true' style='width: 150px;'>";
	content += "<option value=''></option>"+GlobalDevicePortType+"</select>";
	content += "</p><br></td><td><br><p>Media type</p><br></td>";
	content += "<td><br><p><select id='mediatype' onchange='appendToArrayInfo()'><option value=''></option>"+GlobalMedia+"</select></p><br /></td>";
	content += "</tr><tr><td  style='width: 20px;'></td>";
	content += "<td  style='width: 150px;'><p>Port name: <br></td><td>";
	content += "<input id='portnamenumber' ";
	content += "type='text' onblur='appendToArrayInfo()'/></p><br>";
	content += "</td></tr><tr><td  style='width: 20px;'></td></tr></table></td></tr>";
	content += "<tr><td><table style='width: 100%;'  cellspacing='10'><tr><td  style='width: 100%;'>            <fieldset style='border:2px solid #1c5a8d;border-radius:10px;overflow:auto;'>";
    content += "<legend style='margin-left:20px;'>Map Partner Port</legend>";
    content += "<table cellspacing='10' id='newDeviceinfo' style='width: 100%; overflow:auto;margin-left:15px;text-align:center;width:95%'><br><tr><td>";
	content += "<p>Host Name: <select id='partnerhostname' onchange='appendToArrayInfo();checkHostIpaddress(this.value);'";
    content += "data-mini='true' style='width: 150px;'></select></p>";
	content += "<p>Ip Address: <input id='partneripaddress' onchange='appendToArrayInfo()'";
    content += " style='width: 150px;'></input></p>";
	content += "</td><td><p>Slot Number: <select id='partnerslot' onchange='appendToArrayInfo(); checkSlotPortNumber();' data-mini='true' style='width: 150px;'></select></p>";
	content += "<p>Port Name: <select id='partnerportinfo' onchange='appendToArrayInfo();' data-mini='true' style='width: 150px;'></select></p>";
	content += "</td></tr></table>"
	content += "</fieldset></td></tr></table></td></tr>";
	content +=	"</table>";
	return content
}
/*
 *
 *  FUNCTION NAME : deviceConfigPopup 
 *  AUTHOR        : Anna Marie Paulo
 *  DATE          : March 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function deviceConfigPopup(){
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
        deviceArr = getDevicesNodeJSON();
	}

	$("#configPopUp").dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		maxHeight: 500,
		title: "DEVICE CONFIGURATION"
	});
	var PortArr=[];

	var txt1=""; var txt2="";var txt="";
	for(var a=0; a<devicesArr.length; a++){
		if(glblDevMenImg==devicesArr[a].ObjectPath){
			txt=devicesArr[a].HostName;
			if(devicesArr[a].DeviceName != "")var host = devicesArr[a].DeviceName;
			else var host = "N/A";
			if(devicesArr[a].OSVersion != "") var os = devicesArr[a].OSVersion;
			else var os = "N/A";
			if(devicesArr[a].ManagementIp != "") var mngt = devicesArr[a].ManagementIp;
			else var mngt = "N/A"; 
			if(devicesArr[a].ConsoleIp != "") var con = devicesArr[a].ConsoleIp;
			else var con = "N/A";
			if(devicesArr[a].Model != "")var model = devicesArr[a].Model;
			else var model = "N/A";
			if(devicesArr[a].Manufacturer != "") var manu = devicesArr[a].Manufacturer;
			else var manu = "N/A";
			if(devicesArr[a].Status != "")var stat = devicesArr[a].Status;
			else var stat = "N/A";
			
			txt1 += "<tr><td>"+host+"</td><td>"+os+"</td><td>"+mngt+"</td><td>"+con+"</td><td>"+model+"</td><td>"+manu+"</td>";
			if(devicesArr[a].Exclusivity=="Exclusive"){
				txt1 += "<td><input type='checkbox' checked='checked'></td>";
			}else{
				txt1 += "<td><input type='checkbox'></td>";
			}
			txt1 += "<td>"+stat+"</td></tr>";
			PortArr = getDeviceChildPort(devicesArr[a], PortArr);
			PortObj = getAllPortOfDevice(devicesArr[a].ObjectPath);
			if(PortObj != 0){
				for(var i=0; i<PortArr.length; i++){
					if(PortArr[i].PortName != "") var pname = PortArr[i].PortName;
					else var pname = "N/A";
					if(PortArr[i].Speed != "") var speed = PortArr[i].Speed;
					else var speed = "N/A";
					if(PortArr[i].Bandwidth != "")var band = PortArr[i].Bandwidth;
					else var band = "N/A";
					if(PortArr[i].PhysicalPortType != "")var ptype = PortArr[i].PhysicalPortType;
					else var ptype = "N/A";
					if(PortArr[i].SwitchInfo != "") var sinfo = PortArr[i].SwitchInfo;
					else var sinfo = "N/A";

					txt2 += "<tr><td>"+pname+"</td><td>"+speed+"</td><td>"+band+"</td><td>"+ptype+"</td><td>"+sinfo+"</td>";
					if(PortArr[i].Exclusivity == "Exclusive"){
						txt2 += "<td><input type='checkbox' checked='checked'</td></tr>";
					}else{
						txt2 += "<td><input type='checkbox'></td>";
					}
				}
			}else alertUser("No port available on the device");
		}
	}
	$("#configPopUp").empty().load("pages/ConfigEditor/DeviceConfig.html",function(){
		setTimeout(function(){
		$("#deviceNameID").html(txt);
		$("#devConfigInfoBody").html(txt1);
		$("#portInfoBody").html(txt2);
		},1000);
	
		$(".ui-dialog").position({
		    my: "center",
	    	at: "center",
	    	of: window
		});
	});
}          
/*
 *
 *  FUNCTION NAME : slotinfoshow 
 *  AUTHOR        : Krisfen G. Ducao 
 *  DATE          : March 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function slotinfoshow(id,val,type){
	for(var a=1; a<=257; a++){
			if(type =="slotmodule"){
				
				$("#tabs-slot-module-"+a).hide();
			$("#slotcontentshowhide-"+a).hide();//Show content
			}else{
			$("#tabs-slot-port-"+a).hide();
			$("#slotcontentshowhide-"+a).hide();//Show content
			}
	}
	$("#slotcontentshowhide-"+val).show();//Show content
	$("#tabs-slot-module-"+val).show();
	$("#module-port-"+val).show();
	$("#porttabs li").removeClass("ui-tabs-active ui-state-active");
	$("#tabhead"+val+"").addClass("ui-state-default ui-corner-top ui-tabs-active ui-state-active");
	$("#porttabs li a").css("color","#fff");
	$("#"+id+" a").css("color","#000");
}
/*
 *
 *  FUNCTION NAME : portinfoshow 
 *  AUTHOR        : Krisfen G. Ducao 
 *  DATE          : March 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function portinfoshow(id,val,type,tabnum){
	
	$(".infoshowhide").hide();
	$("#tabs-"+val+"").show();
	$("#porttabs li").removeClass("ui-tabs-active ui-state-active");
	$("#tabhead"+val+"").addClass("ui-state-default ui-corner-top ui-tabs-active ui-state-active");
	$("#porttabs li a").css("color","#fff");
	$("#"+id+" a").css("color","#000");
}
/*
 *
 *  FUNCTION NAME : limittabsshow
 *  AUTHOR        : Krisfen G. Ducao 
 *  DATE          : March 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function limittabsshow(val,id,limit){
	if (limit == "empty"){
		var limit = $("#portperdevice").val();
	}
	var limit = parseInt(limit);
	var tabsetmax = val*10;
	var tabsetmin = val*10-9;
	if (globalTabId=="port"){
		$(".plimitshow").hide();
	}else{
	//	$(".slimitshow").hide();
	}
	for(var a=1; a<=limit; a++){
		if(a<=tabsetmax && a>=tabsetmin){
			$("#"+id+a+"").show();
		}
	}
	if (globalTabId=="port"){
		portinfoshow(id+tabsetmin,tabsetmin);
	}else if (globalTabId=="slot"){
		slotinfoshow(id,tabsetmin);
	}else{}
}

/*
 *
 *  FUNCTION NAME : hidePopUp 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : close the popup
 *  PARAMETERS    : 
 *
 */
function hidePopUp(pop){
	if(pop=="devicetype"){
		confirmation("Are you sure you want to cancel?","Cancel","closeDeviceTypePopUp();");
	}

}
/*
 *
 *  FUNCTION NAME : getPortName 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get port label for link 
 *  PARAMETERS    : 
 *
 */
function getPortName(portpath){
	var strArr = portpath.split(".");
    var strArr2 = strArr[strArr.length -1].split("_");
    var port = strArr[strArr.length -1];
    if(strArr2[0] != "Port"){
       port = "Port_" + strArr2[1];
    }
	return port;
}
/*
 *
 *  FUNCTION NAME : getPortName2 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get port name for port label
 *  PARAMETERS    : portPath 
 *
 */
function getPortName2(portPath){
	if(globalInfoType == "JSON"){
        var prtArr =[];
		var pathArr = portPath.split(".");
		prtArr = getAllPortOfDevice(pathArr[0]);
		var devices = prtArr;
    }else{
        var devices =  portArr;
    }
	var port = "";
	var portObj;
	for(var t=0; t<devices.length; t++){
		if(devices[t].ObjectPath == portPath){
			port = devices[t].PortName;
			portObj = devices[t];
			break;
		}
	}
	if(port == "" && portObj != undefined){
		port = getPortName(portObj.ObjectPath);
	}else if(port != ""){
		var myArr = port.split("Ethernet");
		if(myArr[1] != undefined && (myArr[0].toLowerCase() == "gigabit" || myArr[0].toLowerCase() == "giga" || myArr[0].toLowerCase() == "gig")){
			port = "GE"+myArr[1];
		}else if(myArr[0] != undefined && myArr[0].toLowerCase() == "fast"){
			port = "FE"+myArr[1];
		}
	}
	return port;
}
/*
 *
 *  FUNCTION NAME : filterPopUp
 *  AUTHOR        : James Turingan
 *  DATE          : March 12, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function filterPopUp(){
	$("#divAlert").dialog({
		modal: true,
		autoResize:true,
		width: width - 200,
		maxHeight: 700
	});
	if(enDisFilter == true){
		$("#divAlert").load("pages/ConfigEditor/Filter.html",function(){
			initDynamicFilterValue();
		});
	}
}
/*
 *
 *  FUNCTION NAME : getAvailablePorts 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get available ports of device
 *  PARAMETERS    : 
 *
 */
function getAvailablePorts(type,portObjArr){
	for(var t=0; t<portObjArr.length; t++){
        var port = portObjArr[t];
        if(port.PortFlag != "true" && port.PortType.toLowerCase() == type.toLowerCase()){
           	available = true;
            SwitchFlag = true;
        }
    }
}
/*
 *
 *  FUNCTION NAME : getPortInfo2 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get port information for link tool tip
 *  PARAMETERS    : srcDev,dstDev,srcPort,dstPort
 *
 */
function getPortInfo2(srcDev,dstDev,srcPort,dstPort,name,mytext){
	var text = mytext;
	var srcDevice = getDeviceObject2(srcDev);
	var dstDevice = getDeviceObject2(dstDev);
	var srcName = srcDevice.DeviceName;
	var dstName = dstDevice.DeviceName;
	if(srcName == ""){
		srcName = srcDevice.ObjectPath;
	}
	if(dstName == ""){
		dstName = dstDevice.ObjectPath;
	}
	text +="Name : "+srcName+" -- "+ dstName;
	text +="";
	text +="<br />Type :  " + name.toLowerCase();		
	var srcPort2 = getPortObject2(srcPort);
	var dstPort2 = getPortObject2(dstPort);
	text += "<br /><br />PortInfo: " + srcName + " --> " + getPortName2(srcPort2.ObjectPath);
	if(srcPort2.Bandwidth != ""){
		text += "<br />Bandwidth: " + srcPort2.Bandwidth;
	}
	if(srcPort2.Speed != ""){
		text += "<br />Speed: " + srcPort2.Speed;
	}
	if(srcPort2.SwitchInfo != ""){
		text += "<br />SwitchInfo: " + srcPort2.SwitchInfo.split("^").join(" ");
	}
	text += "<br /><br />PortInfo: " + dstName + " --> " + getPortName2(dstPort2.ObjectPath);
	if(dstPort2.Bandwidth != ""){
		text += "<br />Bandwidth: " + dstPort2.Bandwidth;
	}
	if(dstPort2.Speed != ""){
		text += "<br />Speed: " + dstPort2.Speed;
	}
	if(dstPort2.SwitchInfo != ""){
		text += "<br />SwitchInfo: " + dstPort2.SwitchInfo.split("^").join(" ");
	}
	text += "<br /><br />";
	return text;
}

/*
 *
 *  FUNCTION NAME : loadImgData
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 9, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function loadImgData(data){
	var mydata = data;
	if(globalInfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString( mydata , "text/xml" );
		var row = xmlDoc.getElementsByTagName('MAINCONFIG');
		var uptable = xmlDoc.getElementsByTagName('DEVICE');
		var lowtable = xmlDoc.getElementsByTagName('STATUS');
	}else{
		data = data.replace(/'/g,'"');
        var json = jQuery.parseJSON(data);
		if(json.MAINCONFIG){
            var uptable = json.MAINCONFIG[0].DEVICE;
            var lowtable = json.MAINCONFIG[0].STATUS;
        }	
	}
	var imgStat='';
	var loadImgStat='';
	if(json.MAINCONFIG){
		clearTimeout(TimeOut);
		TimeOut = setTimeout(function(){
			loadImgXML(uptable,lowtable);
		},5000);
		return;
	}
	loadImgInit();
	TimeOut = setTimeout(function(){
		sanityQuery('loadImage');
	},5000);	
}

/*
 *
 *  FUNCTION NAME : loadImgXML
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 10, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function loadImgXML(uptable,lowtable){
	var imgStat='';
	var loadImgStat='';
	var devFlag = false;
	if(globalInfoType == "XML"){
		for(var i = 0; i < uptable.length; i++){
			loadImgStat+="<tr>";
			loadImgStat+="<td>"+uptable[i].getAttribute('HostName')+"</td>";
			loadImgStat+="<td>"+uptable[i].getAttribute('ManagementIP')+"</td>";
			loadImgStat+="<td>"+uptable[i].getAttribute('ConsoleIP')+"</td>";
			loadImgStat+="<td>"+uptable[i].getAttribute('Manufacturer')+"</td>";
			loadImgStat+="<td>"+uptable[i].getAttribute('Model')+"</td>";
			loadImgStat+="<td>"+uptable[i].getAttribute('Login')+"</td>";
			loadImgStat+="<td>"+uptable[i].getAttribute('Rommon_Mode')+"</td>";
			loadImgStat+="<td>"+uptable[i].getAttribute('Load_Image')+"</td>";
			loadImgStat+="<td>"+uptable[i].getAttribute('Recovery')+"</td>";
			loadImgStat+="<td>"+uptable[i].getAttribute('Verify_Image')+"</td>";
			loadImgStat+="</tr>";
			if(window['variable' + LoadImageEnable[pageCanvas] ].toString() == "true" && uptable[i].getAttribute('Verify_Image').toLowerCase() != 'fail' && uptable[i].getAttribute('Verify_Image').toLowerCase() != 'completed' && uptable[i].getAttribute('Verify_Image').toLowerCase() != 'cancelled' && uptable[i].getAttribute('Verify_Image').toLowerCase() != 'device not accessible'){
				devFlag = true;		
			}
		}
//2nd Table of Device Sanity
		for(var i = 0; i < lowtable.length; i++){
			imgStat+="<tr>";
			imgStat+="<td>"+lowtable[i].getAttribute('TimeStamp')+"</td>";
			imgStat+="<td>"+lowtable[i].getAttribute('HostName')+"</td>";
			imgStat+="<td>"+lowtable[i].getAttribute('ManagementIP')+"</td>";
			imgStat+="<td>"+lowtable[i].getAttribute('File')+"</td>";
			imgStat+="<td>"+lowtable[i].getAttribute('State')+"</td>";
			imgStat+="<td>"+lowtable[i].getAttribute('Status')+"</td>";
			imgStat+="</tr>";
		}
	}else{
		for(var i = 0; i < uptable.length; i++){
			loadImgStat+="<tr>";
			loadImgStat+="<td>"+uptable[i].HostName+"</td>";
			loadImgStat+="<td>"+uptable[i].ManagementIP+"</td>";
			loadImgStat+="<td>"+uptable[i].ConsoleIP+"</td>";
			loadImgStat+="<td>"+uptable[i].Manufacturer+"</td>";
			loadImgStat+="<td>"+uptable[i].Model+"</td>";
			loadImgStat+="<td>"+uptable[i].Login+"</td>";
			loadImgStat+="<td>"+uptable[i].Rommon_Mode+"</td>";
			loadImgStat+="<td>"+uptable[i].Load_Image+"</td>";
			loadImgStat+="<td>"+uptable[i].Recovery+"</td>";
			loadImgStat+="<td>"+uptable[i].Verify_Image+"</td>";
			loadImgStat+="</tr>";
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "true" && uptable[i].Verify_Image.toLowerCase() != 'fail' && uptable[i].Verify_Image.toLowerCase() != 'completed' && uptable[i].Verify_Image.toLowerCase() != 'cancelled' && uptable[i].Verify_Image.toLowerCase() != 'device not accessible'){
				devFlag = true;		
			}
		}
//2nd Table of Device Sanity
		for(var i = 0; i < lowtable.length; i++){
			imgStat+="<tr>";
			imgStat+="<td>"+lowtable[i].TimeStamp+"</td>";
			imgStat+="<td>"+lowtable[i].HostName+"</td>";
			imgStat+="<td>"+lowtable[i].ManagementIP+"</td>";
			imgStat+="<td>"+lowtable[i].File+"</td>";
			imgStat+="<td>"+lowtable[i].State+"</td>";
			imgStat+="<td>"+lowtable[i].Status+"</td>";
			imgStat+="</tr>";
		}
	}
	$("#loadImgTableStat > tbody").empty().append(imgStat);
	$("#loadImgTable > tbody").empty().append(loadImgStat);
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#devTotalNo').empty().append(devices.length);
	if(globalDeviceType == "Mobile"){
		$("#loadImgTableStat").table("refresh");
		$("#loadImgTable").table("refresh");
	}
	if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "false"){
		LoadImageFlag = false;
	}
	if(devFlag == true){
		LoadImageFlag = true;
	}else{
		clearTimeout(TimeOut);
	}
	if(autoTriggerTab.toString() == "true"){
		if(devFlag == true){
			checkFromSanity = "true";
			$('#liLoadImg a').trigger('click');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "true" && devFlag == false && LoadConfigFlag.toString() == "false"){
			checkFromSanity = "true";
			LoadConfigFlag = "true";
			$('#liLoadConf a').trigger('click');
		}
	}else{
		if(devFlag == true){
			autoTrigger('loadImage');
		}
	}

	
	return;
}
/*
 *
 *  FUNCTION NAME : getOtherPorts 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 8, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get all port information of the two devices
 *  PARAMETERS    : srcDev,dstDev,text
 *
 */
function getOtherPorts(srcDev,dstDev,linename,text){
	var allline = [];	
	allline = gettargetmap(srcDev,allline);
	allline = gettargetmap(dstDev,allline);
	for(var s=0; s<allline.length; s++){
		var source = allline[s].Source;
		var destination = allline[s].Destination;
		var srcArr = source.split(".");
		var dstArr = destination.split(".");
		if(allline[s].Name != linename && ((srcDev == srcArr[0] && dstDev == dstArr[0]) || (dstDev == srcArr[0] && srcDev == dstArr[0]))){
			text = getPortInfo2(srcArr[0],dstArr[0],source,destination,name,text);
		}
	}
	return text;
}

/*
 *
 *  FUNCTION NAME : addPortInfo 
 *  AUTHOR 		  : Krisfen G. Ducao
 *  DATE          : March 10, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function addPortInfo(val){
	if($("#newdevportcheckbox").is(":checked")){
		$("#newdevportaddress").removeAttr('disabled');
	}else{
		$("#newdevportaddress").attr('disabled',true);
		$("#newdevportaddress").empty();
	}
}
/*
 *
 *  FUNCTION NAME : newDeviceAvailableDom 
 *  AUTHOR 		  : Krisfen G. Ducao
 *  DATE          : March 10, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function newDeviceAvailableDom(){
	var userid = userInformation[0].userId 
	var userinfo = userInformation[0].resourceDomain
	var ctr = 0;var str = "";
	for(var a =0; a< userinfo.length; a++){
		var resource = userinfo[a];
		if (userinfo[a]=="Default"){var ctr =1;}
		str += "<option value='"+resource+"'>"+resource+"</option>";
	}
	var val = ""
	if (ctr==0){
		val += "<option value='Default'>Default</option>";
		val += str
		$("#dropdowndomain").append(val);
	}else{
		$("#dropdowndomain").append(str);
	}
}

/*
 *
 *  FUNCTION NAME : clearHistoryRooulette
 *  AUTHOR 		  : Mark Anthony Elbambo
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : Clear history roulete
 *  PARAMETERS    : 
 *
 */
function clearHistoryRooulette(){
	if(globalDeviceType == "Mobile"){
		confirmation("Are you sure you want to clear the history?","Notification","window['variable' + dynamicGreenRouletteArr[pageCanvas]]=[];$('#cn-wrapper ul').html();$('#canvasRoulete').hide()");
	}else{
		alerts("Are you sure you want to clear the history?",'window["variable" + dynamicGreenRouletteArr[pageCanvas]]=[];$("#cn-wrapper ul").html();$("#canvasRoulete").hide()',"yesno");
	}
}


/*
 *
 *  FUNCTION NAME : tapholdJq
 *  AUTHOR 		  : Mark Anthony Elbambo
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : imitate the taphold functionalities of JQM for HTML5
 *  PARAMETERS    : holdTrigger - Id of the element that you taphold, todo - function to exucte after
 *
 */
function tapholdJq(holdTrigger,todo){
	var timeout_id = 0, hold_time = 1000;
	$("#"+holdTrigger).mousedown(function() {
    	timeout_id = setTimeout(todoFunc, hold_time);
	}).bind('mouseup mouseleave', function() {
    	clearTimeout(timeout_id);
	});
	function todoFunc() {
		eval(todo);
	}
}

/*
 *
 *  FUNCTION NAME : rouletteArrPusher
 *  AUTHOR 		  : Mark Anthony Elbambo
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : for pushing objects used in the roulette
 *  PARAMETERS    : devPath,model,imageObj,manufac,ostyp,prdfmly,ipadd,prot,hostnme,devtype
 *
 */
function rouletteArrPusher(devPath,model,imageObj,manufac,ostyp,prdfmly,ipadd,prot,hostnme,devtype){
	if(window['variable' + dynamicGreenRouletteArr[pageCanvas]].length > 0){
		var ctr=0;
		for(var a=0; a < window['variable' + dynamicGreenRouletteArr[pageCanvas]].length; a++){
			var roultArr = window['variable' + dynamicGreenRouletteArr[pageCanvas]][a];
			if(roultArr.model == model && roultArr.manufac == manufac && roultArr.ostyp == ostyp && roultArr.prdfmly == prdfmly && roultArr.ipadd==ipadd && roultArr.prot == prot && roultArr.hostnme == hostnme && roultArr.devtype == devtype){
				ctr++;
				a = window['variable' + dynamicGreenRouletteArr[pageCanvas]].length;
			}else if(roultArr.model == model && manufac == undefined && ostyp == undefined && prdfmly == undefined && ipadd== undefined && prot == undefined && hostnme && hostnme == undefined){
				ctr++;
				a = window['variable' + dynamicGreenRouletteArr[pageCanvas]].length;
			}
		}
		if(ctr == 0){
			window['variable' + dynamicGreenRouletteArr[pageCanvas]].push({"devPath":devPath,"model":model,"imageObj":imageObj,"manufac":manufac,"ostyp":ostyp,"prdfmly":prdfmly,"ipadd":ipadd,"prot":prot,"hostnme":hostnme,"devtype":devtype});
	        greenRoulette2();
		}
	}else{
		window['variable' + dynamicGreenRouletteArr[pageCanvas]].push({"devPath":devPath,"model":model,"imageObj":imageObj,"manufac":manufac,"ostyp":ostyp,"prdfmly":prdfmly,"ipadd":ipadd,"prot":prot,"hostnme":hostnme,"devtype":devtype});
	  	greenRoulette2();
	}
}

/*
 *
 *  FUNCTION NAME : greenRoulette2
 *  AUTHOR 		  : Mark Anthony Elbambo
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : creates dynamic li for roulet
 *  PARAMETERS    : 
 *
 */
var totalSlice =0;
function greenRoulette2(){
	if(window['variable' + dynamicGreenRouletteArr[pageCanvas]].length == 0 || window['variable' + dynamicGreenRouletteArr[pageCanvas]] =="" || window['variable' + dynamicGreenRouletteArr[pageCanvas]] ==[]){
		$("#canvasRoulete").hide();
	}else{
		$("#cn-button").removeClass("ui-btn ui-shadow ui-corner-all");
		$("#canvasRoulete").show();
	}
	totalSlice++;
	var rot =false;
	if(totalSlice == 1){
		var xX = 180;
		var skew = 180;
		var xX2 = 0;
		var aRotate = -Math.abs(45);
//		var aSkew = 0;
	}else if(totalSlice > 1 && totalSlice <4){
		var xX = 180/totalSlice;
		var skew = 90- xX;
		var xX2 =  0;//-Math.abs(90);
		var aRotate = -Math.abs(90-(xX/2));
//		var aSkew = -Math.abs(skew);
	}else if(totalSlice ==4 || totalSlice > 4){
		rot = true;
		var xX = 360/totalSlice;
		var skew= 90-xX;
		var xX2 =  0;//-Math.abs(90);
		var aRotate = -Math.abs(90-(xX/2));
//		var aSkew = -Math.abs(skew);
	}
	 var aSkew = -Math.abs(skew);
//	var aRotate = -Math.abs(90-(xX/2));
//    var aSkew = -Math.abs(skew);
    var dv = "";
    for(var a = 0; a < window['variable' + dynamicGreenRouletteArr[pageCanvas]].length; a++){
		var roultArr = window['variable' + dynamicGreenRouletteArr[pageCanvas]][a];
		var mytext2 = createDeviceTooltip(roultArr.devPath);
        dv += "<li class='rouleteSlice' data-increment='"+xX+"' slice='"+totalSlice+"' ";
        dv += "style='";
        dv += "-webkit-transform: rotate("+xX2+"deg) skew("+skew+"deg);";
        dv += "-ms-transform: rotate("+xX2+"deg) skew("+skew+"deg);";
        dv += "-moz-transform: rotate("+xX2+"deg) skew("+skew+"deg);";
        dv += "transform: rotate("+xX2+"deg) skew("+skew+"deg);";
        dv += "'";
        dv += ">";
        dv += '<a href="#"';
		dv += "style='";
		dv += "-webkit-transform: skew("+aSkew+"deg) rotate("+aRotate+"deg) scale(1);";
        dv += "-ms-transform: skew("+aSkew+"deg) rotate("+aRotate+"deg) scale(1);";
        dv += "-moz-transform: skew("+aSkew+"deg) rotate("+aRotate+"deg) scale(1);";
        dv += "transform: skew("+aSkew+"deg) rotate("+aRotate+"deg) scale(1);' >";
		if(roultArr.devtype.toLowerCase() == "dut" || roultArr.devtype.toLowerCase() == "testtool"){
			dv += "<img devpath='"+roultArr.devPath+"' class='rouletImg' width='62px' src='"+roultArr.imageObj.src+"' hostname='"+roultArr.hostnme+"' proto='"+roultArr.prot+"' devtype='"+roultArr.devtype+"' ipAdd='"+roultArr.ipadd+"' productFamily='"+roultArr.prdfmly+"' ostype='"+roultArr.ostyp+"' manufacturer='"+roultArr.manufac+"' did='device' model='"+roultArr.model+"' />";
		}
		dv += "</a></li>";
		xX2 = xX+xX2;
    }
	$("#cn-wrapper ul").html(dv);
	$("#cn-wrapper").attr("data",0);
	
	$(".rouletImg").on( "taphold", function( evt ) {
		var imgId = $(this).attr("devpath");
		var text = createDeviceTooltip(imgId);
		var posLeft = $( this ).offset().left;
		var posTop = $( this ).offset().top;
		$('#showTooltipInfo').css({
            background : '#DFEFF0',
            'border-radius' : '5px',
            border: '1px solid #555',
            padding : '5px',
            'max-width': '200px',
            'font-size' : '10px',
            'font-family': 'Arial',
            position:'absolute',
			top :posTop,
            left:posLeft	
        });
		$('#showTooltipInfo').empty().append(text).show();
	});
	$(".rouletImg").on("mouseover",function( evt ) {
//	$.document.on( "mouseover", ".rouletImg", function( evt ) {
        var imgId = $(this).attr("devpath");
        var text = createDeviceTooltip(imgId);
        var posLeft = $( this ).offset().left;
        var posTop = $( this ).offset().top;
        $('#showTooltipInfo').css({
            background : '#DFEFF0',
            'border-radius' : '5px',
            border: '1px solid #555',
            padding : '5px',
            'max-width': '200px',
            'font-size' : '10px',
            'font-family': 'Arial',
            position:'absolute',
            top :posTop-20,
            left:posLeft+20
        });
        $('#showTooltipInfo').empty().append(text).show();
    });
//	$.mobile.document.on( "mouseout", ".rouletImg", function( evt ) {
	$(".rouletImg").on("mouseout", function( evt ) {
		$('#showTooltipInfo').empty().hide();
	});

    var dragSrcEl = null;
	if(window['variable' + dynamicVar[canvasPage]] == undefined){
		return
	}
	var con = window['variable' + dynamicVar[canvasPage]].getContainer();
//	$.mobile.document.on( "dragstart",".rouletImg", function(e){
	$(".rouletImg").on("dragstart", function(e){
           dragSrcEl = this;
    });
	con.ddEventListener('dragover',function(e){
        e.preventDefault(); //@important
    });
	con.addEventListener('drop',function(e){
		var src = dragSrcEl;
		clickIcon(src);
     });
	if(globalDeviceType != "Mobile"){
		$(".rouletImg").dblclick(function(e){
			clickIcon(this);
		});
	}else{
		$.mobile.document.on( "taphold",".rouletImg", function(e){
            clickIcon(this);
        });
	}
	
	$(".rouleteSlice").on( "swiperigth", function( evt ) {
		if(rot == false){
			return;
		}
		var prevVal = $("#cn-wrapper").attr("data");
        var increment = $(this).attr("data-increment");
        var tots = parseInt(prevVal) + parseInt(increment);
//		if($(this).attr("slice") > 8){
//			tots = tots + tots;
//		}
        $("#cn-wrapper").css({"-webkit-transform":"rotate("+tots+"deg)"});
        $("#cn-wrapper").attr("data",tots);
	});
//	$.mobile.document.on( "swipeleft", ".rouleteSlice", function( evt ) {
	$(".rouleteSlice").on( "swipeleft", function( evt ) {
		if(rot == false){
            return;
        }
		var nextVal = $("#cn-wrapper").attr("data");
        var decrement = $(this).attr("data-increment");
        var tots = parseInt(nextVal) - parseInt(decrement);
//		if($(this).attr("slice") > 8){
//          tots = tots - tots;
//        }
        $("#cn-wrapper").css({"-webkit-transform":"rotate("+tots+"deg)"});
		$("#cn-wrapper").attr("data",tots);
    });

	function classReg( className ) {
		return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	}
	var hasClass, addClass, removeClass;
	if ( 'classList' in document.documentElement ) {
		hasClass = function( elem, c ) {
		    return elem.classList.contains( c );
		};
		addClass = function( elem, c ) {
			elem.classList.add( c );
  		};
		removeClass = function( elem, c ) {
	    	elem.classList.remove( c );
 		};
	}else {
		hasClass = function( elem, c ) {
			return classReg( c ).test( elem.className );
		};
		addClass = function( elem, c ) {
			if ( !hasClass( elem, c ) ) {
		    	elem.className = elem.className + ' ' + c;
	    	}
  		};
		removeClass = function( elem, c ) {
    		elem.className = elem.className.replace( classReg( c ), ' ' );
  		};
	}

	function toggleClass( elem, c ) {
		var fn = hasClass( elem, c ) ? removeClass : addClass;
		fn( elem, c );
	}

	var classie = {
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		has: hasClass,
		add: addClass,
		remove: removeClass,
		toggle: toggleClass
	};
	if ( typeof define === 'function' && define.amd ) {
		define( classie );
	} else {
		window.classie = classie;
	}
    rouleteEventBind();
}

/*
 *
 *  FUNCTION NAME : rouleteEventBind
 *  AUTHOR 		  : Mark Anthony Elbambo
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : binds function for shide/show of roulete
 *  PARAMETERS    : 
 *
 */
function rouleteEventBind(){
	var button = document.getElementById('cn-button'),
    wrapper = document.getElementById('cn-wrapper');

	var open = false;
	button.addEventListener('click', handler, false);
	if(globalDeviceType == "Mobile"){
		$(button).on('taphold',function(){
			clearHistoryRooulette();
		});
	}else{
		tapholdJq("cn-button","clearHistoryRooulette()");
	}
//	tapholdJq(holdTrigger,todo);
	function handler(){
		$("#cn-wrapper").removeAttr("style");
		if(!open){
	    	this.innerHTML = "-";
		    classie.add(wrapper, 'opened-nav');
		}else{
	    	this.innerHTML = "+";
			classie.remove(wrapper, 'opened-nav');
		}
	  	open = !open;
	}
	function closeWrapper(){
		classie.remove(wrapper, 'opened-nav');
	}
}


/*kmmabignay - mar11*/
function alertUser(msg,execFunc){
	if(globalDeviceType == "Mobile"){
		error(msg,"Notification",execFunc);
	}else{
		alerts(msg);
	}
	return;
}


/*
 *
 *  FUNCTION NAME : loadConfigData
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 11, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function loadConfigData(data){
	var mydata = data;
	if(globalInfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString( mydata , "text/xml" );
		var row = xmlDoc.getElementsByTagName('MAINCONFIG');
		var uptable = xmlDoc.getElementsByTagName('DEVICE');
		var lowtable = xmlDoc.getElementsByTagName('STATUS');
	}else{
		data = data.replace(/'/g,'"');
        var json = jQuery.parseJSON(data);
		if(json.MAINCONFIG){
            var uptable = json.MAINCONFIG[0].DEVICE;
            var lowtable = json.MAINCONFIG[0].STATUS;
        }
	}
	var confStat='';
	var loadConfStat='';
	if(json.MAINCONFIG){
		clearTimeout(TimeOut);
		TimeOut = setTimeout(function(){
			loadConfigXML(uptable,lowtable);
		},5000);
		return;
	}
	loadConfInit();	
	TimeOut = setTimeout(function(){
		sanityQuery('loadConfig');
	},5000);
}

/*
 *
 *  FUNCTION NAME : loadConfigXML
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 11, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function loadConfigXML(uptable,lowtable){
	var confStat='';
	var loadConfStat='';
	var devFlag = false;
	if(globalInfoType == "XML"){
		for(var i = 0; i < uptable.length; i++){
			loadConfStat+="<tr>";
			loadConfStat+="<td>"+uptable[i].getAttribute('HostName')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('ManagementIP')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('ConsoleIP')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Manufacturer')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Model')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Login')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Load_Config')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Recovery')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Restoration_Configuration')+"</td>";
			loadConfStat+="</tr>";
			if(window['variable' + LoadConfigEnable[pageCanvas] ].toString() == "true" && uptable[i].getAttribute('Restoration_Configuration').toLowerCase() != 'fail' && uptable[i].getAttribute('Restoration_Configuration').toLowerCase() != 'completed' && uptable[i].getAttribute('Restoration_Configuration').toLowerCase() != 'cancelled' && uptable[i].getAttribute('Restoration_Configuration').toLowerCase() != 'device not accessible'){
				devFlag = true;		
			}
		}
	//2nd Table of Device Sanity
		for(var i = 0; i < lowtable.length; i++){
			confStat+="<tr>";
			confStat+="<td>"+lowtable[i].getAttribute('TimeStamp')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('HostName')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('ManagementIP')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('Config_Name')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('State')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('Status')+"</td>";
			confStat+="</tr>";
		}
	}else{
		for(var i = 0; i < uptable.length; i++){
			loadConfStat+="<tr>";
			loadConfStat+="<td>"+uptable[i].HostName+"</td>";
			loadConfStat+="<td>"+uptable[i].ManagementIP+"</td>";
			loadConfStat+="<td>"+uptable[i].ConsoleIP+"</td>";
			loadConfStat+="<td>"+uptable[i].Manufacturer+"</td>";
			loadConfStat+="<td>"+uptable[i].Model+"</td>";
			loadConfStat+="<td>"+uptable[i].Login+"</td>";
			loadConfStat+="<td>"+uptable[i].Load_Config+"</td>";
			loadConfStat+="<td>"+uptable[i].Recovery+"</td>";
			loadConfStat+="<td>"+uptable[i].Restoration_Configuration+"</td>";
			loadConfStat+="</tr>";
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "true" && uptable[i].Restoration_Configuration.toLowerCase() != 'fail' && uptable[i].Restoration_Configuration.toLowerCase() != 'completed' && uptable[i].Restoration_Configuration.toLowerCase() != 'cancelled' && uptable[i].Restoration_Configuration.toLowerCase() != 'device not accessible'){
				devFlag = true;		
			}
		}
	//2nd Table of Device Sanity
		for(var i = 0; i < lowtable.length; i++){
			confStat+="<tr>";
			confStat+="<td>"+lowtable[i].TimeStamp+"</td>";
			confStat+="<td>"+lowtable[i].HostName+"</td>";
			confStat+="<td>"+lowtable[i].ManagementIP+"</td>";
			confStat+="<td>"+lowtable[i].Config_Name+"</td>";
			confStat+="<td>"+lowtable[i].State+"</td>";
			confStat+="<td>"+lowtable[i].Status+"</td>";
			confStat+="</tr>";
		}
	}
	$("#loadConfigTableStat > tbody").empty().append(confStat);
	$("#loadConfigTable > tbody").empty().append(loadConfStat);
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#devTotalNo').empty().append(devices.length);
	if(globalDeviceType == "Mobile"){
		$("#loadConfigTableStat").table("refresh");
		$("#loadConfigTable").table("refresh");
	}
	if(devFlag == false){
		LoadConfigFlag = "false";
	}
	if(devFlag == true){
		LoadConfigFlag = "true";
	}else{
		clearTimeout(TimeOut);
	}
	if(autoTriggerTab.toString() == "true"){
		if(devFlag == true){
			checkFromSanity = "true";
			$('#liLoadConf a').trigger('click');
		}else{
			LoadConfigFlag = "false";
		}
	}else{
		if(devFlag == true){
			autoTrigger('loadConfig');
		}
	}
	
	return;
}
/*
 *
 *  FUNCTION NAME : saveConfigData
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 11, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function saveConfigData(data){
	var mydata = data;
	if(globalInfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString( mydata , "text/xml" );
		var row = xmlDoc.getElementsByTagName('MAINCONFIG');
		var uptable = xmlDoc.getElementsByTagName('DEVICE');
		var lowtable = xmlDoc.getElementsByTagName('STATUS');
	}else{
		data = data.replace(/'/g,'"');
        var json = jQuery.parseJSON(data);
		if(json.MAINCONFIG){
            var uptable = json.MAINCONFIG[0].DEVICE;
            var lowtable = json.MAINCONFIG[0].STATUS;
        }
	}
	var confStat='';
	var loadConfStat='';
	if(json.MAINCONFIG){
		clearTimeout(TimeOut);
		TimeOut = setTimeout(function(){
			saveConfigXML(uptable,lowtable);
		},5000);
		return;
	}
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var i = 0; i < devices.length; i++){
		confStat+="<tr>";
		confStat+="<td>"+devices[i].HostName+"</td>";
		confStat+="<td>"+devices[i].ManagementIp+"</td>";
		confStat+="<td>"+devices[i].ConsoleIp+"</td>";
		confStat+="<td>"+devices[i].Manufacturer+"</td>";
		confStat+="<td>"+devices[i].Model+"</td>";
		confStat+="<td>Init</td>";
		confStat+="<td>Waiting..</td>";
		confStat+="<td>Waiting..</td>";
		confStat+="</tr>";
//2nd Table of Load Image
		loadConfStat+="<tr>";
		loadConfStat+="<td></td>";
		loadConfStat+="<td>"+devices[i].HostName+"</td>";
		loadConfStat+="<td>"+devices[i].ManagementIp+"</td>";
		loadConfStat+="<td>"+devices[i].ConfigURL+"</td>";
		loadConfStat+="<td>Init</td>";
		loadConfStat+="<td>Waiting..</td>";
		loadConfStat+="</tr>";

	}
	$("#loadSoftwareImageStatusTable > tbody").empty().append(loadConfStat);
	$("#devLoadStatusTable > tbody").empty().append(confStat);
	$('#devTotalNo').empty().append(devices.length);
	if(globalDeviceType == "Mobile"){
		$("#loadSoftwareImageStatusTable").table("refresh");
		$("#devLoadStatusTable").table("refresh");
	}
	TimeOut = setTimeout(function(){
		sanityQuery('saveConfig');
	},5000);
}

/*
 *
 *  FUNCTION NAME : saveConfigXML
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 11, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function saveConfigXML(uptable,lowtable){
	var confStat='';
	var loadConfStat='';
	var devFlag = false;
	if(globalInfoType == "XML"){
		for(var i = 0; i < uptable.length; i++){
			loadConfStat+="<tr>";
			loadConfStat+="<td>"+uptable[i].getAttribute('HostName')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('ManagementIP')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('ConsoleIP')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Manufacturer')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Model')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Login')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Save_Config')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Verification')+"</td>";
			loadConfStat+="</tr>";
			if(window['variable' + LoadImageEnable[pageCanvas] ].toString() == "true" && uptable[i].getAttribute('Verification').toLowerCase() != 'fail' && uptable[i].getAttribute('Verification').toLowerCase() != 'completed' && uptable[i].getAttribute('Verification').toLowerCase() != 'cancelled' && uptable[i].getAttribute('Verification').toLowerCase() != 'device not accessible'){
				devFlag = true;		
			}
		}
	//2nd Table of Device Sanity
		for(var i = 0; i < lowtable.length; i++){
			confStat+="<tr>";
			confStat+="<td>"+lowtable[i].getAttribute('TimeStamp')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('HostName')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('ManagementIP')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('Config_Name')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('State')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('Status')+"</td>";
			confStat+="</tr>";
		}
	}else{
		for(var i = 0; i < uptable.length; i++){
			loadConfStat+="<tr>";
			loadConfStat+="<td>"+uptable[i].HostName+"</td>";
			loadConfStat+="<td>"+uptable[i].ManagementIP+"</td>";
			loadConfStat+="<td>"+uptable[i].ConsoleIP+"</td>";
			loadConfStat+="<td>"+uptable[i].Manufacturer+"</td>";
			loadConfStat+="<td>"+uptable[i].Model+"</td>";
			loadConfStat+="<td>"+uptable[i].Login+"</td>";
			loadConfStat+="<td>"+uptable[i].Save_Config+"</td>";
			loadConfStat+="<td>"+uptable[i].Verification+"</td>";
			loadConfStat+="</tr>";
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].SaveImageEnable.toString() == "true" && uptable[i].Verification.toLowerCase() != 'fail' && uptable[i].Verification.toLowerCase() != 'completed' && uptable[i].Verification.toLowerCase() != 'cancelled' && uptable[i].Verification.toLowerCase() != 'device not accessible'){
				devFlag = true;		
			}
		}
	//2nd Table of Device Sanity
		for(var i = 0; i < lowtable.length; i++){
			confStat+="<tr>";
			confStat+="<td>"+lowtable[i].TimeStamp+"</td>";
			confStat+="<td>"+lowtable[i].HostName+"</td>";
			confStat+="<td>"+lowtable[i].ManagementIP+"</td>";
			confStat+="<td>"+lowtable[i].Config_Name+"</td>";
			confStat+="<td>"+lowtable[i].State+"</td>";
			confStat+="<td>"+lowtable[i].Status+"</td>";
			confStat+="</tr>";
		}
	}
	if(devFlag == false){
		saveImageFlag = "false";
	}else{
		saveImageFlag = "true";
	}
	$("#loadSoftwareImageStatusTable > tbody").empty().append(confStat);
	$("#devLoadStatusTable > tbody").empty().append(loadConfStat);
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#devTotalNo').empty().append(devices.length);
	if(globalDeviceType == "Mobile"){
		$("#loadConfigTableStat").table("refresh");
		$("#loadConfigTable").table("refresh");
	}
}
/*
 *
 *  FUNCTION NAME : saveImgData
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 11, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function saveImgData(data){
	var mydata = data;
	if(globalInfoType == "XML"){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString( mydata , "text/xml" );
		var row = xmlDoc.getElementsByTagName('MAINCONFIG');
		var uptable = xmlDoc.getElementsByTagName('DEVICE');
		var lowtable = xmlDoc.getElementsByTagName('STATUS');
	}else{
		data = data.replace(/'/g,'"');
        var json = jQuery.parseJSON(data);
		if(json.MAINCONFIG){
            var uptable = json.MAINCONFIG[0].DEVICE;
            var lowtable = json.MAINCONFIG[0].STATUS;
        }
	}
	var confStat='';
	var loadConfStat='';
	if(json.MAINCONFIG){
		clearTimeout(TimeOut);
		TimeOut = setTimeout(function(){
			saveImgXML(uptable,lowtable);
		},5000);
		return;
	}
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var i = 0; i < devices.length; i++){
		confStat+="<tr>";
		confStat+="<td>"+devices[i].HostName+"</td>";
		confStat+="<td>"+devices[i].ManagementIp+"</td>";
		confStat+="<td>"+devices[i].ConsoleIp+"</td>";
		confStat+="<td>"+devices[i].Manufacturer+"</td>";
		confStat+="<td>"+devices[i].Model+"</td>";
		confStat+="<td>Init</td>";
		confStat+="<td>Waiting..</td>";
		confStat+="<td>Waiting..</td>";
		confStat+="</tr>";
//2nd Table of Load Image
		loadConfStat+="<tr>";
		loadConfStat+="<td></td>";
		loadConfStat+="<td>"+devices[i].HostName+"</td>";
		loadConfStat+="<td>"+devices[i].ManagementIp+"</td>";
		loadConfStat+="<td>"+devices[i].ImageURL+"</td>";
		loadConfStat+="<td>Init</td>";
		loadConfStat+="<td>Waiting..</td>";
		loadConfStat+="</tr>";

	}
	$("#saveSoftwareImageStatusTable > tbody").empty().append(loadConfStat);
	$("#devStatusTable > tbody").empty().append(confStat);
	$('#devTotalNo').empty().append(devices.length);
	if(globalDeviceType == "Mobile"){
		$("#loadSoftwareImageStatusTable").table("refresh");
		$("#devLoadStatusTable").table("refresh");
	}
	TimeOut = setTimeout(function(){
		sanityQuery('saveImage');
	},5000);
}

/*
 *
 *  FUNCTION NAME : saveImgXML
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 11, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function saveImgXML(uptable,lowtable){
	var confStat='';
	var loadConfStat='';
	var devFlag =false;
	if(globalInfoType == "XML"){
		for(var i = 0; i < uptable.length; i++){
			loadConfStat+="<tr>";
			loadConfStat+="<td>"+uptable[i].getAttribute('HostName')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('ManagementIP')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('ConsoleIP')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Manufacturer')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Model')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Login')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Save_Image')+"</td>";
			loadConfStat+="<td>"+uptable[i].getAttribute('Verify_Image')+"</td>";
			loadConfStat+="</tr>";
			if(window['variable' + LoadImageEnable[pageCanvas] ].toString() == "true" && uptable[i].getAttribute('Verify_Image').toLowerCase() != 'fail' && uptable[i].getAttribute('Verify_Image').toLowerCase() != 'completed' && uptable[i].getAttribute('Verify_Image').toLowerCase() != 'cancelled' && uptable[i].getAttribute('Verify_Image').toLowerCase() != 'device not accessible'){
				devFlag = true;		
			}
		}
		//2nd Table of Device Sanity
		for(var i = 0; i < lowtable.length; i++){
			confStat+="<tr>";
			confStat+="<td>"+lowtable[i].getAttribute('TimeStamp')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('HostName')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('ManagementIP')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('Image_Name')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('State')+"</td>";
			confStat+="<td>"+lowtable[i].getAttribute('Status')+"</td>";
			confStat+="</tr>";
		}
	}else{
		for(var i = 0; i < uptable.length; i++){
			loadConfStat+="<tr>";
			loadConfStat+="<td>"+uptable[i].HostName+"</td>";
			loadConfStat+="<td>"+uptable[i].ManagementIP+"</td>";
			loadConfStat+="<td>"+uptable[i].ConsoleIP+"</td>";
			loadConfStat+="<td>"+uptable[i].Manufacturer+"</td>";
			loadConfStat+="<td>"+uptable[i].Model+"</td>";
			loadConfStat+="<td>"+uptable[i].Login+"</td>";
			loadConfStat+="<td>"+uptable[i].Save_Image+"</td>";
			loadConfStat+="<td>"+uptable[i].Verify_Image+"</td>";
			loadConfStat+="</tr>";
			if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].SaveImageEnable.toString() == "true" && uptable[i].Verify_Image.toLowerCase() != 'fail' && uptable[i].Verify_Image.toLowerCase() != 'completed' && uptable[i].Verify_Image.toLowerCase() != 'cancelled' && uptable[i].Verify_Image.toLowerCase() != 'device not accessible'){
				devFlag = true;		
			}
		}
		//2nd Table of Device Sanity
		for(var i = 0; i < lowtable.length; i++){
			confStat+="<tr>";
			confStat+="<td>"+lowtable[i].TimeStamp+"</td>";
			confStat+="<td>"+lowtable[i].HostName+"</td>";
			confStat+="<td>"+lowtable[i].ManagementIP+"</td>";
			confStat+="<td>"+lowtable[i].Image_Name+"</td>";
			confStat+="<td>"+lowtable[i].State+"</td>";
			confStat+="<td>"+lowtable[i].Status+"</td>";
			confStat+="</tr>";
		}
	}
	if(devFlag == true){
		 saveImageFlag = "true";
	}else{
		saveImageFlag = "false";
		clearTimeout(TimeOut);
	}
	$("#saveSoftwareImageStatusTable > tbody").empty().append(confStat);
	$("#devStatusTable > tbody").empty().append(loadConfStat);
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#devTotalNo').empty().append(devices.length);
	if(globalDeviceType == "Mobile"){
		$("#loadConfigTableStat").table("refresh");
		$("#loadConfigTable").table("refresh");
	}

}
/*
 *
 *  FUNCTION NAME : loadResultTable
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 12, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : shows pop Up for load config or image result
 *  PARAMETERS    : 
 *
 */

function loadResultTable(type){
	$("#divAlert").dialog({
		modal: true,
		autoResize:true,
		width:"auto",
		maxHeight: 700
	});
	$("#divAlert").empty().load('pages/ConfigEditor/SanityResultTable.html?',function(){
		$('#santabs').tabs();
		$('#ulDevConf').hide();
		if(type == "loadImage"){
			sanityQuery(type);
			$('#tabs-1').hide();	
			$('#tabs-6').show();
		}else if(type == "loadConfig"){
			sanityQuery(type);
			$('#tabs-1').hide();
			$('#tabs-7').show();
		}else if(type == "deviceSanity"){
			sanityQuery(type);
			$('#tabs-1').hide();
			$('#tabs-1').show();
		}else if(type == "accessSanity"){
			sanityQuery(type);
			$('#tabs-1').hide();
			$('#tabs-2').show();
		}else if(type == "connectivity"){
			sanityQuery(type);
			$('#tabs-1').hide();
			$('#tabs-3').show();
		}else if(type == "linksanity"){
			sanityQuery(type);
			$('#tabs-1').hide();
			$('#tabs-4').show();
		}else if(type == "enableint"){
			sanityQuery(type);
			$('#tabs-1').hide();
			$('#tabs-5').show();
		}		
		$(".ui-dialog").position({
		   my: "center",
		   at: "center",
		   of: window
		});
	});
	$("#divAlert").dialog('open');
}
/*
 *  FUNCTION NAME : cancelLoadSaveQuery
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 12, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : clear setInterval
 *  PARAMETERS    : 
 *
 */
function cancelLoadSaveQuery(button,type){
	if(button == 'cancel'){
		var msg = "Are you sure you want to cancel "+ type + "?";
		var d = type;
		alerts(msg,type,'yesno','canceldev');
	}else{
		clearTimeout(TimeOut);
		devSanFlag = "false";accSanFlag = "false";connSanFlag = "false";
		linkSanFlag = "false";enableFlagSan = "false";
		LoadImageFlag = "false";saveImageFlag;
		LoadConfigFlag = "false";saveConfigFlag = false;
	}
	return;
}
/*
 *  FUNCTION NAME : cancelDevStat
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 12, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function cancelDevStat(type){
	if(globalDeviceType == "Mobile"){
		loading("show","Processing information...");
	}
	var query = "action=canceldevicestatus&query=resourceid="+window['variable' + dynamicResourceId[pageCanvas] ]+"^user="+globalUserName+"^feature="+type;
	if(globalInfoType == "XML"){
		var url = getURL("ConfigEditor")+"?action=canceldevicestatus&query=resourceid="+window['variable' + dynamicResourceId[pageCanvas] ]+"^user="+globalUserName+"^feature="+type;
	}else{
		var url = getURL("ConfigEditor","JSON")+'?action=canceldevicestatus&query={"TOPOLOGY":[{"resourceid": "'+window['variable' + dynamicResourceId[pageCanvas]]+'", "user": "'+globalUserName+'", "feature": "'+type+'"}]}';
	}
	$.ajax({
		url: url,
		dataType: 'html',
		proccessData: false,
		success: function(data) {
		var returnflag = false;
			if(globalInfoType == "JSON"){
				var data2 = data.replace(/'/g,'"');
				var b = $.parseJSON(data2);
				if(b.RESULT[0].Result){
					var alertret = b.RESULT[0].Result;
					if(alertret.match(/Alert/gi) != null){
						returnflag = true;
						alertUser(b.RESULT[0].Result);
						return;
	               	}else{
						returnflag = true;
						alertUser("Process Completed");
						return;
					}
				}
			}
			if(returnflag == false){
				sanityQuery(type);
			}
		}
	});
	return;
}

/*
 *
 *  FUNCTION NAME : selectdevicestructure
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 11, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function selectdevicestructure(val){
	$("#portperdevice").val("");
	$('#devicetypetabs').empty();
	$("#devportphysicalporttype").css("display","none");
	$('#physicalporttypespan').css("display","none");
	$("#dropdownphysicalporttype").css("display","none");
	$("#pagenumber").css("display","none");
	$("#newdevapplyalltxt").css("display","none");
	if(val=="devport"){
		$('#physicalporttypespan').css("display","inline");
		$("#devportphysicalporttype").css("display","inline");
		$("#dropdownphysicalporttype").css("display","inline");
		//$("#pagenumber").css("display","inline");
		$("#newdevapplyalltxt").css("display","inline");
		$("#structuredice").text("Port per Device");
	}else if(val=="devslotport"){
		$("#structuredice").text("Slot per Device");
	}else if(val=="devmodport"){
		$("#structuredice").text("Module per Device");
	}else if(val=="devslotmod"){
		$("#structuredice").text("Slot per Device");
	}else{
		$("#structuredice").text("Rack per Device");
	}
	//portdynamictab(0);
	//deviceStructureDynamicTab(0);
}

/*
 *
 *  FUNCTION NAME : staticDynamic
 *  AUTHOR        : Maureen Daelo 
 *  DATE          : March 12, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : to know if the devices are static or dynamic
 *  PARAMETERS    : 
 *
 */

function staticDynamic(){
	var device = [];
	var sd = '';
	var devicesArr = getDevicesNodeJSON();
	if (devicesArr){
		for (var a=0; a<devicesArr.length; a++){
			if (devicesArr[a].ConsoleIp != ''){
				device.push("1");
			}
			if (devicesArr[a].ManagementIp != ''){
				device.push("1");
			}
		}
	}
	if (device.length != 0){
		sd = '<option value="both">Both</option>';
		sd = sd+'<option value="dynamic">Dynamic</option>';
		sd = sd+'<option value="static">Static</option>';
		sd = sd+'<option value="testbed">Testbed</option>';
	}else{
		sd = '<option value="dynamic">Dynamic</option>';
		sd = sd+'<option value="testbed">Testbed</option>';
	}
	$('#saveConfFileTypeDBType').empty().append(sd);
}

/*
 *
 *  FUNCTION NAME : queryAutoDiscoveryLogs
 *  AUTHOR        : kmmabignay
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : Cathyrine C. Bobis 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : query for auto discovery logs
 *  PARAMETERS    : filename,user,ip
 *  RETURN		  : data
 *
 */

function queryAutoDiscoveryLogs(fname,user,ip,pIp){
	//var infoType = "XML";
	if(globalInfoType == "XML"){
		//var urlx = "/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/querYCgi.fcgi";
		var urlx = getURL("RM");
		var queryS = "filename="+fname+"&user="+user+"&ip="+ip;
	}else{
		var urlx = getURL("ConfigEditor2","JSON");
		var queryS = "{  'QUERY' : [{ 'filename' : '"+fname
			+"', 'user' : '"+user+"', 'ip' : '"+ip+"' }] }";
	}
	if(globalDeviceType=="Mobile"){
		loading("show");
	}
	$.ajax({
		url: urlx,
		data : {
			"action": "getdiscoverylogs",
			"query": queryS,
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			data = $.trim(data);
			if(globalDeviceType=="Mobile"){
				loading("hide");
			}
			if(data){
				if(globalInfoType == "XML"){
					var devInfo = data.split('&&')[0].split(",");
					var linkInfo = data.split('&&')[1];	
					var autodLogs = data.split('&&')[2];	
				}else{
					var dat = data.replace(/'/g,'"');
			        var dat2 = $.parseJSON(dat);
					var DEVICE = dat2.DEVICE;
					var Access = DEVICE[0].Accessibility;
					var DevicePrep = DEVICE[0].DevicePreparation;
					var Mapping = DEVICE[0].SearchMapping;	
					var Gather = DEVICE[0].GatheringInformation;
					var Ip = DEVICE[0].Ip;
					var devInfo = [Ip,Access,DevicePrep,Mapping,Gather].join(",");
					var linkInfo = DEVICE[0].PORT;
					var autodLogs = DEVICE[0].Logs;
				}
				showAutoDiscoveryStatus(fname,user,ip,pIp,devInfo,linkInfo,autodLogs);
			}else{
				alertUser("Process failed.");return;
			}
		}
	});
}
/*-----------------------------------------------------*/

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/27/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function showActiveAutoDLog(){

	if(autoDDevData.length==0){
		alertUser("No ongoing Auto Discover.");
		return;
	}
	var tmpidx = autoDDevData.length - 1;

	if(autoDCurIdx == undefined){
		if(autoDCurIdx > -1){
			tmpidx = autoDCurIdx;
		}
	}
	var fname = autoDDevData[tmpidx].LogsName;
	var ip = autoDDevData[tmpidx].ManagementIp;
	var pIp =  autoDDevData[tmpidx].PartnerIp;
	if(fname == "" || ip == ""){
		alertUser("No ongoing Auto Discover.");
		return;
	}
	if(globalDeviceType=="Mobile"){
		showAutoDiscPage(fname,globalUserName,ip,pIp);
	}else{
		showAutoLogPage(fname,globalUserName,ip,pIp);
	}
}

/*-----kmmabignay - mar12 -------------------------------------*/
function showAutoDPopup(fname,user,ip,pIp){
	$("#autoDProcessDialogContent").load("pages/ConfigEditor/AutoDTableLogs.html", function(){
		$('#autoDProcessDialog').trigger('create');
		$('.ui-table-columntoggle-btn').hide();
//	$("#autodContent").empty().load("pages/ConfigEditor/AutoDTableLogs.html", function(){
		if(fname!='' && user!='' && ip!=''){
			queryAutoDiscoveryLogs(fname,user,ip,pIp);
		}else{
			alertUser("Process Failed.","Notification");
		}
	});
}
/*-----------------------------------------------------*/

function showAutoDiscoveryStatus(fname,user,devIp,pIp,devInfo,linkInfo,logs) {
	/*------device info table---------*/
	var devInfos = devInfo.split(',');
	//var devInfos = devInfo;
	var tableContent = "<tr>";
	if(devInfo){
		for(var a=0; a<devInfos.length; a++){
			tableContent += "<td>"+devInfos[a]+"</td>";
		}
		if(devInfos[4].toLowerCase()=="completed"){
			$("#portHeaderChange").html("Device_Port");
		}
	}else{
		tableContent += "<td>"+devIp+"</td>";
		tableContent += "<td>Init</td>";
		tableContent += "<td>Waiting</td>";
		tableContent += "<td>Waiting</td>";
		tableContent += "<td>Waiting</td>";
	}	
	tableContent += "</tr>";
	$("#autodDevInfoTableBody").html(tableContent);
	/*------link info table---------*/
	if(linkInfo){
		$("#autodLinkInfo").css({"display":"block"});
		$("#autodLinkInfoTableBody").empty();
		var linkInfoContents = "";
		for(var i=0; i<linkInfo.length; i++){
			var lLinkInfos = ['DeviceIp','DevicePort','PartnerPort','PartnerIp'];
			var ltContent = "<tr>";
			for(var x=0; x<lLinkInfos.length; x++){
				var valInfo = linkInfo[i][''+lLinkInfos[x]+''];
				if(valInfo==""){valInfo="-";}
				ltContent += "<td>"+valInfo+"</td>";
			}
			ltContent += "</tr>";
			linkInfoContents += ltContent;
		}
		$("#autodLinkInfoTableBody").html(linkInfoContents);
	}else if(pIp){
		$("#autodLinkInfo").css({"display":"block"});
		$("#autodLinkInfoTableBody").empty();
		var ltContent = "<tr>";
		ltContent += "<td>"+devIp+"</td>";
		ltContent += "<td>-</td>";
		ltContent += "<td>-</td>";
		ltContent += "<td>"+pIp+"</td>";
		ltContent += "</tr>";
		$("#autodLinkInfoTableBody").html(ltContent);
	}
	/*-----------------logs------------------------*/
	if(logs){
		var tmplogs = logs.split("\n");
		var tmplogtr = "<table>";
		for(var i=0;i<tmplogs.length;i++){
			tmplogtr += "<tr>"+tmplogs[i]+"<br/></tr>";
		}
		tmplogtr += "</table>";
		$("#autodLogsContent").html(tmplogtr);
	}else{
		$("#autodLogsContent").html("Initializing....");
	}
	/*----------------------------------*/
	if(devInfo!="" && devInfo!=undefined){
		var devFlag1 = (devInfos[1].toLowerCase()=="completed");
		var devFlag2 = (devInfos[2].toLowerCase()=="completed");
		var devFlag3 = (devInfos[3].toLowerCase()=="completed");
		var devFlag4 = (devInfos[4].toLowerCase()=="completed");
		var devFlag2_1 = (devInfos[2].toLowerCase()=="no operation");
		var devFlag3_1 = (devInfos[3].toLowerCase()=="no operation");
		if((devFlag1 && devFlag2 && devFlag3 && devFlag4) || (devFlag1 && devFlag2_1 && devFlag3_1 && devFlag4)){
			clearTimeout(initAutoD);
			initAutoD = "";
			autoDcomplete = true;
			$('#okAutoDStatus').attr('disabled',false);
		}else{
			initAutoD = setTimeout(function(){
				queryAutoDiscoveryLogs(fname,user,devIp,pIp)
			},3000);
		}
	}else{
		initAutoD = setTimeout(function(){
			queryAutoDiscoveryLogs(fname,user,devIp,pIp)
		},3000);
	}
}

/*-----kmmabignay - mar13 -------------------------------------*/
function enableRow1SubProc(cbAllKey,setValKey,checkCtr,checkBoxCtr){
	if(checkCtr == checkBoxCtr){
		$("#"+cbAllKey).trigger("click");
	}else{
		$("#"+cbAllKey).prop('checked',false);
	}
	if (userInformation[0].userLevel == 'Administrator') {
		if(checkCtr > 0){
			$('#'+setValKey).attr('disabled',false);
		}else{
			$('#'+setValKey).attr('disabled',true);
			$('#'+setValKey).prop('checked',false);
		}
	}
}
/*-----------------------------------------------------*/

/*-------kmmabignay - mar14 - saveEndReservation query-------*/
function saveEndResQuery(opt){
	var query = "";
	if(globalInfoType == "XML"){
		var urlx = "/cgi-bin/Final/AutoCompleteCgiQuerry_withDb/";
		urlx += "SaveLoadConfigurationImage.cgi";
		queryx = getXmlData();
	}else{
		var urlx = getURL("ConfigEditor","JSON");
		queryx = getStringJSON(globalMAINCONFIG[pageCanvas]);
	}
	if(opt=="Save"){
		var actionx = "saveconfigmenu";
	}else{
		var actionx = "loadconfigmenu";
	}
	$.ajax({
		url: urlx,
		data : {
			"action": actionx,
			"query": queryx,
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function(data) {
			if(data){
				var execFunc = "";
				if(globalDeviceType == "Mobile"){
					execFunc  = "toConfig();";
				}else{
					execFunc = "$(\"#startEndReserve\").dialog(\"close\");";
				}
				alertUser(data,execFunc);
				return;
			}else{
				alertUser("Process failed.");return;
			}
		}
	});
}
/*-----------------------------------------------------*/

/*-------kmmabignay - mar15 - saveEndReservation Alerts-------*/
function saveEndReservationAlerts(mainMenu,msg,type,opt){
	var mobileFlag = (globalDeviceType == "Mobile");
	var msgHeader = "Notification";
	var msgStr = ""; var typex = "";
	var func2Eval = ""; var optSaveFlag=false;
	if(opt=="Save"){var resOpt = "comOpEndRes"; optSaveFlag=true;}
	if(opt=="Load"){var resOpt = "comOpStartRes";}
	if(mainMenu){
		func2Eval += "saveEndResQuery('"+opt+"');";
	}else{
		if(globalDeviceType == "Mobile"){
			func2Eval += "changePageWithTimeout('commitOptions','"+resOpt+"',true);";
		}else{
			func2Eval += "$('#startEndReserve').dialog('close');";
			func2Eval += "$('#"+resOpt+"').prop('checked',true);";
		}
	}
	switch(true){
		case (type.toLowerCase()=="config" && optSaveFlag): 
			typex = "Configuration";
			func2Eval += "setvaluesendconfig=true;";
			break;
		case (type.toLowerCase()=="config" && !optSaveFlag): 
			typex = "Configuration";
			func2Eval += "setvaluesstartconfig=true;";
			break;
		case (type.toLowerCase()=="image" && optSaveFlag): 
			typex = "Image";
			func2Eval += "setvaluesendimage=true;";
			break;
		case (type.toLowerCase()=="image" && !optSaveFlag): 
			typex = "Image";
			func2Eval += "setvaluesstartimage=true;";
			break;
		case (type.toLowerCase()=="both" && optSaveFlag): 
			typex = "Image and Configuration";
			func2Eval += "setvaluesendimage=true;";
			func2Eval += "setvaluesendconfig=true;";
			break;
		case (type.toLowerCase()=="both" && !optSaveFlag): 
			typex = "Image and Configuration";
			func2Eval += "setvaluesstartimage=true;";
			func2Eval += "setvaluesstartconfig=true;";
			break;
	}
	switch(msg){
		case 1: 
			msgStr = "Are you sure you want to set new values for the "+typex+"? ";
			msgStr += "This will override what is saved in the database. ";
			msgStr += "Please make sure "+typex.toLowerCase()+" to be "+opt.toLowerCase()+" are compatible ";
			msgStr += "with the selected device(s) or this might cause unwanted result";
			alertType = "alert2";
			break;
		case 2: 
			msgStr = "Please make sure "+typex.toLowerCase()+"s to be "+opt.toLowerCase()+" are compatible ";
			msgStr += "with the selected device(s) or this might cause unwanted result";
			alertType = "prompt";
			break;
	}
	switch(mobileFlag){
		case true: confirmation(msgStr,msgHeader,func2Eval); break;
		case false: alerts(msgStr,func2Eval,alertType); break;
	}
	return;
}
/*----------------------------------------------------------------------*/

/*-------kmmabignay - mar15 - saveEndReservation Info-------*/
function saveEndReservationInfo(type,opt){
	var optTab = ""; 
	var isDetailed = false;	
	var selectedArr = new Array();
	var MainEndArr = new Array();
	if ($('#'+opt+type+'DetailedView').is(':checked')) {
		optTab = "Detail";
		isDetailed = true;
		if(type=="Image" && opt=="Save"){endimagedetail = "true";}
		if(type=="Config" && opt=="Save"){endconfigdetail = "true";}
		if(type=="Image" && opt=="Load"){startimagedetail = "true";}
		if(type=="Config" && opt=="Load"){startconfigdetail = "true";}
	}
	$('input[name="'+opt.toLowerCase()+type+optTab+'Sel"]').each(function() {
		if ($(this).is(':checked')) {
			selectedArr.push($(this).val());
		}
	});
    var errorMsg = validateInputs(selectedArr,isDetailed,opt,type);
    if(errorMsg!=""){
		alertUser(errorMsg);
		return "";
	}
	for(var y=0;y<selectedArr.length;y++){
		var dest = ""; var info = "";
		switch(type){
			case "Config": dest = "running-config"; break;
			case "Image": dest = "boot-image"; break;
		}
		switch(true){
			case (!isDetailed && opt=="Save"):
				var url = $('#tb'+opt+type+'URL'+selectedArr[y]).val();
				var loc = $('#'+opt.toLowerCase()+type+'Location'+selectedArr[y]).val();
				info = selectedArr[y]+"*"+url+"*"+dest+"*"+loc;
				break;
			case (isDetailed && opt=="Save"):
				var proto2 = $('#tb'+opt+type+'DetailProtocol'+selectedArr[y]).val();
				var ip = $('#tb'+opt+type+'DetailIp'+selectedArr[y]).val();
				var path = $('#tb'+opt+type+'DetailPath'+selectedArr[y]).val();
				var fname = $('#tb'+opt+type+'DetailFilename'+selectedArr[y]).val();
				var loc = $('#'+opt.toLowerCase()+type+'DetailLocation'+selectedArr[y]).val();
				info = selectedArr[y]+"*"+proto2+"*"+ip+"*"+path+"*"+fname+"*"+dest+"*"+loc;
				break;
			case (!isDetailed && opt=="Load"):
				var hostname = $('#trload'+type+selectedArr[y]).find('td').eq(1).text();
				var model = $('#trload'+type+selectedArr[y]).find('td').eq(2).text();
				var url = $('#tbLoad'+type+'URL'+selectedArr[y]).val();
				var dest = $('#tbLoad'+type+'Destination'+selectedArr[y]).val();
				var loc = $('#load'+type+'Location'+selectedArr[y]).val();
				info = hostname+"*"+model+"*"+url+"*"+dest+"*"+loc;
				break;
			case (isDetailed && opt=="Load"):
				var hostname = $('#trload'+type+selectedArr[y]).find('td').eq(1).text();
				var model = $('#trload'+type+selectedArr[y]).find('td').eq(2).text();
				var proto2 = $('#tbLoad'+type+'DetailProtocol'+selectedArr[y]).val();
				var ip = $('#tbLoad'+type+'DetailIp'+selectedArr[y]).val();
				var path = $('#tbLoad'+type+'DetailPath'+selectedArr[y]).val();
				var fname = $('#tbLoad'+type+'DetailFilename'+selectedArr[y]).val();
				var dest = $('#tbLoad'+type+'DetailDestination'+selectedArr[y]).val();
				var loc = $('#load'+type+'DetailLocation'+selectedArr[y]).val();
				info = hostname+"*"+model+"*"+proto2+"*"+ip+"*"+path+"*"+fname+"*"+dest+"*"+loc;
				break;
		}		
		MainEndArr.push(info);
		switch(true){
			case (type=="Config" && opt=="Save"): 
				EndOfReservationInfoForConfig[selectedArr[y]] = info; break;
			case (type=="Image" && opt=="Save"): 
				EndOfReservationInfoForImage[selectedArr[y]] = info; break;
			case (type=="Config" && opt=="Load"): 
				StartOfReservationInfoForConfig[selectedArr[y]] = info; break;
			case (type=="Image" && opt=="Load"): 
				StartOfReservationInfoForImage[selectedArr[y]] = info; break;
		}
	}
	return MainEndArr;
}
/*----------------------------------------------------------------------*/

/*----kmmabignay - mar15 - saveEndReservation Set Attribute for config--*/
function saveEndReservationSetAttrConfig(MainEndArr){
	var saveCon = MainEndArr.split("*");
	for(var i=0; i<devicesArr.length; i++){
		if(saveCon.length==4){
			devicesArr[i].SaveConfigUrl = saveCon[1];
			devicesArr[i].SaveConfigDestination = saveCon[2];
			devicesArr[i].SaveTypeConfig = saveCon[3];
			devicesArr[i].SaveConfigEnable = "true";
			devicesArr[i].SaveConfigDetail = "false";
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].SaveConfigEnable = "true";
		}else{
			devicesArr[i].SaveConfigServer = saveCon[2];
			devicesArr[i].ConfigFilePath = saveCon[3];
			devicesArr[i].SaveConfigFileName = saveCon[4];
			devicesArr[i].SaveConfigDestination = saveCon[5];
			devicesArr[i].SaveConfigType = saveCon[6];
			devicesArr[i].SaveTypeConfig = saveCon[1];
			devicesArr[i].SaveConfigEnable = "true";
			devicesArr[i].SaveConfigDetail = "true";
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].SaveConfigEnable =  "true";
		}
  	}	
	return;
}
/*----------------------------------------------------------------------*/

/*--kmmabignay - mar15 - saveEndReservation Set Attribute for image----*/
function saveEndReservationSetAttrImage(MainEndArr){
	var saveImg = MainEndArr.split("*");
	for(var i=0; i<devicesArr.length; i++){
		if(saveImg.length==4){
			devicesArr[i].SaveImageUrl = saveImg[1];
			devicesArr[i].SaveImageDestination = saveImg[2];
			devicesArr[i].SaveTypeImage = saveImg[3];
			devicesArr[i].SaveImageEnable = "true";
			devicesArr[i].SaveImageDetail = "false";
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].SaveImageEnable = "true";
		}else{
			devicesArr[i].SaveImageServer = saveImg[2];
			devicesArr[i].ImageFilePath = saveImg[3];
			devicesArr[i].SaveImageFileName = saveImg[4];
			devicesArr[i].SaveImageDestination = saveImg[5];
			devicesArr[i].SaveImageType = saveImg[6];
			devicesArr[i].SaveTypeImage = saveImg[1];
			devicesArr[i].SaveImageEnable = "true";
			devicesArr[i].SaveImageDetail = "true";
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].SaveImageEnable = "true";
		}
  	}
	return;
}
/*----------------------------------------------------------------------*/

/*-----kmmabignay - mar15 - saveEndReservation Alert Conditions------*/
function saveEndReservationAlertConditions(MainEndArr,type,mainMenu,opt){
	var isChecked = false;
	var resInfoFlag = false;
	var adminFlag = (userInformation[0].userLevel=='Administrator');
	if(opt=="Save"){
		var resInfoConfigObj = EndOfReservationInfoForConfig;
		var resInfoImageObj = EndOfReservationInfoForImage;
		var resOpt = "comOpEndRes";
		var optSaveFlag = true;
	}else{
		var resInfoConfigObj = StartOfReservationInfoForConfig;
		var resInfoImageObj = StartOfReservationInfoForImage;
		var resOpt = "comOpStartRes";
		var optSaveFlag = false;
	}
	if(type=="both"){
		var confFlag = ($('#SaveConfigSetValues').is(':checked'));
		var imgFlag = ($('#SaveImageSetValues').is(':checked'));
		var resInfoConf = $.isEmptyObject(resInfoConfigObj);
		var resInfoImg = $.isEmptyObject(resInfoImageObj);
		resInfoFlag = (resInfoConf && resInfoImg);
		isChecked = (confFlag && imgFlag);
	}else{
		isChecked = ($('#'+opt+type+'SetValues').is(':checked'));
		var resInfo = "resInfo"+type+"Obj";
		resInfoFlag = ($.isEmptyObject(eval(resInfo)));
	}
	switch(true){
		case (adminFlag && isChecked): 
			saveEndReservationAlerts(mainMenu,1,type,opt);
			break;
		case (adminFlag && !isChecked && resInfoFlag): 
		case (!adminFlag && resInfoFlag): 
			$("#"+resOpt).prop('checked',true);
			$('#startEndReserve').dialog('destroy');
			if($('#customPage')){toConfig();}
			break;
		case (adminFlag && !isChecked && !resInfoFlag && optSaveFlag && type!="both"): 
			saveEndReservationAlerts(mainMenu,2,type,opt);
			for(var a=0; a<MainEndArr.length; a++){
				if(type=="Image"){saveEndReservationSetAttrImage(MainEndArr[a]);}
				if(type=="Config"){saveEndReservationSetAttrConfig(MainEndArr[a]);}
			}
			break;
		case (adminFlag && !isChecked && !resInfoFlag && optSaveFlag && type=="both"):
			saveEndReservationAlerts(mainMenu,2,type,opt);
			for(var a=0; a<MainEndArr[0].length; a++){
				saveEndReservationSetAttrConfig(MainEndArr[0][a]);
			}
			for(var b=0; b<MainEndArr[1].length; b++){
				saveEndReservationSetAttrImage(MainEndArr[1][b]);
			}
			break;
		case (adminFlag && !isChecked && !resInfoFlag && !optSaveFlag && type!="both"): 
			saveEndReservationAlerts(mainMenu,2,type,opt);
			for(var a=0; a<MainEndArr.length; a++){
				if(type=="Image"){loadStartReservationSetAttrImage(MainEndArr[a]);}
				if(type=="Config"){loadStartReservationSetAttrConfig(MainEndArr[a]);}
			}
			break;
		case (adminFlag && !isChecked && !resInfoFlag && !optSaveFlag && type=="both"):
			saveEndReservationAlerts(mainMenu,2,type,opt);
			for(var a=0; a<MainEndArr[0].length; a++){
				loadStartReservationSetAttrConfig(MainEndArr[0][a]);
			}
			for(var b=0; b<MainEndArr[1].length; b++){
				loadStartReservationSetAttrImage(MainEndArr[1][b]);
			}
			break;

		case (!adminFlag && !resInfoFlag): 
			saveEndReservationAlerts(mainMenu,2,type,opt);
			break;
	}
	return;
}
/*----------------------------------------------------------------------*/
/*
 *
 *  FUNCTION NAME : autoTrigger
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 14, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : type, devFlag
 *  RETURN		  : data
 *
 */
function autoTrigger(type){
	autoTriggerTab = "false";
	if(type == 'deviceSanity'){
		devSanFlag = "true";accSanFlag = "false";connSanFlag = "false";
		linkSanFlag = "false";enableFlagSan = "false";
		LoadImageFlag = "false";
		LoadConfigFlag = "false";
	}else if(type == 'accessSanity'){
		devSanFlag = "false";accSanFlag = "true";connSanFlag = "false";
		linkSanFlag = "false";enableFlagSan = "false";
		LoadImageFlag = "false";
		LoadConfigFlag = "false";
	}else if(type == 'connectivity'){
        devSanFlag = "false";accSanFlag = "false";connSanFlag = "true";
        linkSanFlag = "false";enableFlagSan = "false";
        LoadImageFlag = "false";
        LoadConfigFlag = "false";
	}else if(type == 'linksanity'){
        devSanFlag = "false";accSanFlag = "false";connSanFlag = "false";
        linkSanFlag = "true";enableFlagSan = "false";
        LoadImageFlag = "false";
        LoadConfigFlag = "false";
	}else if(type == 'enableint'){
        devSanFlag = "false";accSanFlag = "false";connSanFlag = "false";
        linkSanFlag = "false";enableFlagSan = "true";
        LoadImageFlag = "false";
        LoadConfigFlag = "false";
	}else if(type == 'loadImage'){
        devSanFlag = "false";accSanFlag = "false";connSanFlag = "false";
        linkSanFlag = "false";enableFlagSan = "false";
        LoadImageFlag = "true";
        LoadConfigFlag = "false";
	}else if(type == 'loadConfig'){
        devSanFlag = "false";accSanFlag = "false";connSanFlag = "false";
        linkSanFlag = "false";enableFlagSan = "false";
        LoadImageFlag = "false";
        LoadConfigFlag = "true";
	}
	if(checkFromSanity.toString() == "true"){
		autoTriggerTab = "true";
		checkFromSanity = "false";
		clearTimeout(TimeOut);
		sanityQuery(type);
	}else {
		autoTriggerTab == "false";
		checkFromSanity = "false";
		clearTimeout(TimeOut);
		sanityQuery(type);
	}
}
/*
 *
 *  FUNCTION NAME : devSanInit
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initializes data in table
 *  PARAMETERS    : 
 *  RETURN		  : 
 *
 */
function devSanInit(){
	var devStat='';
	var devSanityStat='';
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var i = 0; i < devices.length; i++){
		devStat+="<tr>";
		devStat+="<td>"+devices[i].HostName+"</td>";
		devStat+="<td>"+devices[i].ManagementIp+"</td>";
		devStat+="<td>"+devices[i].ConsoleIp+"</td>";
		devStat+="<td>"+devices[i].Manufacturer+"</td>";
		devStat+="<td>"+devices[i].Model+"</td>";
		devStat+="<td>Init</td>";
		devStat+="<td>Waiting..</td>";
		devStat+="<td>Waiting..</td>";
		devStat+="<td>Waiting..</td>";
		devStat+="</tr>";
//2nd Table of Device Sanity
		devSanityStat+="<tr>";
		devSanityStat+="<td></td>";
		devSanityStat+="<td>"+devices[i].HostName+"</td>";
		devSanityStat+="<td>"+devices[i].ManagementIp+"</td>";
		devSanityStat+="<td>"+devices[i].ConsoleIp+"</td>";
		devSanityStat+="<td>"+devices[i].OSVersion+"</td>";
		devSanityStat+="<td>Init</td>";
		devSanityStat+="<td>Waiting..</td>";
		devSanityStat+="</tr>";

	}
	$("#devSanTableStat > tbody").empty().append(devSanityStat);
	$("#devSanTable > tbody").empty().append(devStat);
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#devTotalNo').empty().append(devices.length);
	if(globalDeviceType == "Mobile"){
		$("#devSanTableStat").table("refresh");
		$("#devSanTable").table("refresh");
	}
	return;
}
/*
 *
 *  FUNCTION NAME : accSanInit
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initializes data in table
 *  PARAMETERS    : 
 *  RETURN		  : 
 *
 */
function accSanInit(){
	var accStat='';
	var accSanityStat='';
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var i = 0; i < devices.length; i++){
		accStat+="<tr>";
		accStat+="<td>"+devices[i].HostName+"</td>";
		if(devices[i].ConsoleIp == devices[i].RP0ConsoleIp){
			accStat+="<td>"+devices[i].RP0ConsoleIp+"</td>";
			accStat+="<td>"+devices[i].RP1ConsoleIp+"</td>";
		}else{
			accStat+="<td>"+devices[i].RP1ConsoleIp+"</td>";
			accStat+="<td>"+devices[i].RP0ConsoleIp+"</td>";
		}
		accStat+="<td>"+devices[i].ManagementIp+"</td>";
		accStat+="<td>init</td>";
		accStat+="</tr>";
//2nd Table of Device Sanity
		accSanityStat+="<tr>";	
		accSanityStat+="<td></td>";
		accSanityStat+="<td>"+devices[i].HostName+"</td>";
		accSanityStat+="<td>Console IP</td>";
		if(devices[i].ConsoleIp == devices[i].RP0ConsoleIp){
			accSanityStat+="<td>"+devices[i].RP0ConsoleIp+"</td>";
		}else{
			accSanityStat+="<td>"+devices[i].RP1ConsoleIp+"</td>";
		}
		accSanityStat+="<td></td>";
		accSanityStat+="<td></td>";
		accSanityStat+="<td></td>";
		accSanityStat+="<td></td>";
		accSanityStat+="<td></td>";
		accSanityStat+="</tr>";

		accSanityStat+="<tr>";	
		accSanityStat+="<td></td>";
		accSanityStat+="<td>"+devices[i].HostName+"</td>";
		accSanityStat+="<td>Management IP</td>";
		accSanityStat+="<td>"+devices[i].ManagementIp+"</td>";
		accSanityStat+="<td></td>";
		accSanityStat+="<td></td>";
		accSanityStat+="<td></td>";
		accSanityStat+="<td></td>";
		accSanityStat+="<td></td>";
		accSanityStat+="</tr>";
		if(devices[i].RP0ConsoleIp != "" && devices[i].RP1ConsoleIp != ""){
			if(devices[i].ConsoleIp == devices[i].RP0ConsoleIp){
				accSanityStat+="<td>"+devices[i].RP1ConsoleIp+"</td>";
			}else{
				accSanityStat+="<td>"+devices[i].RP0ConsoleIp+"</td>";
			}
		}
	}
	$("#accSanTableStat > tbody").empty().append(accSanityStat);
	$("#accSanTable > tbody").empty().append(accStat);
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#accTotalNo').empty().append(devices.length);
	if(globalDeviceType == "Mobile"){
		$("#accSanTableStat").table("refresh");
		$("#accSanTable").table("refresh");
	}
}
/*
 *
 *  FUNCTION NAME : connSanInit
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initializes data in table
 *  PARAMETERS    : 
 *  RETURN		  : 
 *
 */
function connSanInit(){
	var connStat='';
	var connSanityStat='';
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var i = 0; i < devices.length; i++){
		connStat+="<tr>";
		connStat+="<td>"+devices[i].HostName+"</td>";
		connStat+="<td>"+devices[i].ManagementIp+"</td>";
		connStat+="<td>"+devices[i].ConsoleIp+"</td>";
		connStat+="<td>"+devices[i].Manufacturer+"</td>";
		connStat+="<td>"+devices[i].Model+"</td>";
		connStat+="<td>Init</td>";
		connStat+="</tr>";
	}
//2nd Table of Device Sanity
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
    var allline =[];
    for(var i = 0; i  < devices.length; i++){ // checks if the hitted object is equal to the array
        allline = gettargetmap(devices[i].ObjectPath,allline);
    }
    for(var t=0; t<allline.length; t++){
        var source = allline[t].Source;
        var destination = allline[t].Destination;
        var srcArr = source.split(".");
		var srcObj = getDeviceObject2(srcArr[0]);
        var dstArr = destination.split(".");
		var dstObj = getDeviceObject2(dstArr[0]);
        var portobject = getPortObject2(source);
        var portobject2 = getPortObject2(destination);
		if(portobject.SwitchInfo != "" && portobject2.SwitchInfo != ""){
			connSanityStat+="<tr>";
			connSanityStat+="<td></td>";
			connSanityStat+="<td>"+srcObj.DeviceName+"</td>";
			connSanityStat+="<td>"+portobject.PortName+"</td>";
			connSanityStat+="<td></td>";
			connSanityStat+="<td></td>";
				
			connSanityStat+="<td>"+dstObj.DeviceName+"</td>";
			connSanityStat+="<td>"+portobject2.PortName+"</td>";

			connSanityStat+="<td></td>";
			connSanityStat+="<td></td>";
			connSanityStat+="<td></td>";
			connSanityStat+="<td></td>";
			connSanityStat+="<td></td>";
			connSanityStat+="</tr>";
		}
	}
	$("#connSanityTableStat > tbody").empty().append(connSanityStat);
	$("#connSanityTable > tbody").empty().append(connStat);
	if(globalInfoType == "JSON"){

        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#connTotalNo').empty().append(devices.length);
	if(globalDeviceType =="Mobile"){
		$("#connSanityTableStat").table("refresh");
		$("#connSanityTable").table("refresh");	
	}
}
/*
 *
 *  FUNCTION NAME : linkSanInit
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initializes data in table
 *  PARAMETERS    : 
 *  RETURN		  : 
 *
 */
function linkSanInit(){
	var linkStat='';
	var linkSanityStat='';
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var i = 0; i < devices.length; i++){
		linkStat+="<tr>";
		linkStat+="<td>"+devices[i].HostName+"</td>";
		linkStat+="<td>"+devices[i].ManagementIp+"</td>";
		linkStat+="<td>"+devices[i].ConsoleIp+"</td>";
		linkStat+="<td>"+devices[i].Manufacturer+"</td>";
		linkStat+="<td>"+devices[i].Model+"</td>";
		linkStat+="<td>Init</td>";
		linkStat+="<td>Init</td>";
		linkStat+="<td>Init</td>";
		linkStat+="</tr>";
	}
//2nd Table of Link Sanity
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
    var allline =[];
    for(var i = 0; i  < devices.length; i++){ // checks if the hitted object is equal to the array
        allline = gettargetmap(devices[i].ObjectPath,allline);
    }
    for(var t=0; t<allline.length; t++){
        var source = allline[t].Source;
        var destination = allline[t].Destination;
        var srcArr = source.split(".");
        var srcObj = getDeviceObject2(srcArr[0]);
        var dstArr = destination.split(".");
        var dstObj = getDeviceObject2(dstArr[0]);
        var portobject = getPortObject2(source);
        var portobject2 = getPortObject2(destination);
        if(portobject.SwitchInfo != "" && portobject2.SwitchInfo != ""){
			linkSanityStat+="<tr>";
			linkSanityStat+="<td></td>";
			linkSanityStat+="<td>"+srcObj.DeviceName+"</td>";
			linkSanityStat+="<td>"+portobject.PortName+"</td>";
			linkSanityStat+="<td></td>";
			linkSanityStat+="<td></td>";
			linkSanityStat+="<td>"+dstObj.DeviceName+"</td>";
			linkSanityStat+="<td>"+portobject2.PortName+"</td>";
			linkSanityStat+="<td></td>";
			linkSanityStat+="<td></td>";
			linkSanityStat+="<td></td>";
			linkSanityStat+="<td></td>";
			linkSanityStat+="<td></td>";
			linkSanityStat+="<td></td>";
			linkSanityStat+="<td></td>";
			linkSanityStat+="</tr>";
		}
	}
	$("#linkSanityTableStat > tbody").empty().append(linkSanityStat);
	$("#linkSanityTable > tbody").empty().append(linkStat);
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#linkTotalNo').empty().append(devices.length);
	if(globalDeviceType=="Mobile"){
		$("#linkSanityTableStat").table("refresh");
		$("#linkSanityTable").table("refresh");			
	}
}
/*
 *
 *  FUNCTION NAME : enableIntInit
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initializes data in table
 *  PARAMETERS    : 
 *  RETURN		  : 
 *
 */
function enableIntInit(){
	var enableStat='';
	var enableSanityStat='';
	if(globalInfoType == "JSON"){
   	    var devices = getDevicesNodeJSON();
    }else{
	    var devices =devicesArr;
    }
	for(var i = 0; i < devices.length; i++){
		enableStat+="<tr>";
		enableStat+="<td>"+devices[i].HostName+"</td>";
		enableStat+="<td>"+devices[i].ManagementIp+"</td>";
		enableStat+="<td>"+devices[i].ConsoleIp+"</td>";
		enableStat+="<td>"+devices[i].Manufacturer+"</td>";
		enableStat+="<td>"+devices[i].Model+"</td>";
		enableStat+="<td>Init</td>";
		enableStat+="<td>Init</td>";
		enableStat+="<td>Init</td>";
		enableStat+="</tr>";
	}
//2nd Table of Device Sanity
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
    var allline =[];
    for(var i = 0; i  < devices.length; i++){ // checks if the hitted object is equal to the array
        allline = gettargetmap(devices[i].ObjectPath,allline);
    }
    for(var t=0; t<allline.length; t++){
		enableSanityStat+="<tr>";
        var source = allline[t].Source;
        var destination = allline[t].Destination;
        var srcArr = source.split(".");
        var srcObj = getDeviceObject2(srcArr[0]);
        var dstArr = destination.split(".");
        var dstObj = getDeviceObject2(dstArr[0]);
        var portobject = getPortObject2(source);
        var portobject2 = getPortObject2(destination);
        if(portobject.SwitchInfo != "" && portobject2.SwitchInfo != ""){	
			enableSanityStat+="<td></td>";
			enableSanityStat+="<td>"+srcObj.DeviceName+"</td>";
			enableSanityStat+="<td>"+portobject.PortName+"</td>";
			enableSanityStat+="<td></td>";
			enableSanityStat+="<td></td>";
			enableSanityStat+="<td></td>";
			enableSanityStat+="<td></td>";
			enableSanityStat+="<td>"+dstObj.DeviceName+"</td>";
			enableSanityStat+="<td>"+portobject2.PortName+"</td>";
			enableSanityStat+="<td></td>";
			enableSanityStat+="<td></td>";
			enableSanityStat+="<td></td>";
			enableSanityStat+="<td></td>";
				
		}
		enableSanityStat+="</tr>";
	}
	$("#enaSanityTableStat > tbody").empty().append(enableSanityStat);
	$("#enaSanityTable > tbody").empty().append(enableStat);	
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#enableTotalNo').empty().append(devices.length);
	if(globalDeviceType=="Mobile"){
		$("#enaSanityTableStat").table("refresh");
		$("#enaSanityTable").table("refresh");
	}
}
/*
 *
 *  FUNCTION NAME : loadImgInit
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initializes data in table
 *  PARAMETERS    : 
 *  RETURN		  : 
 *
 */
function loadImgInit(){
	var imgStat='';
	var loadImgStat='';
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var i = 0; i < devices.length; i++){
		if(HostName && HostName != "" && devices[i].HostName != HostName){continue;}
		imgStat+="<tr>";
		imgStat+="<td>"+devices[i].HostName+"</td>";
		imgStat+="<td>"+devices[i].ManagementIp+"</td>";
		imgStat+="<td>"+devices[i].ConsoleIp+"</td>";
		imgStat+="<td>"+devices[i].Manufacturer+"</td>";
		imgStat+="<td>"+devices[i].Model+"</td>";
		imgStat+="<td>Init</td>";
		imgStat+="<td>Waiting..</td>";
		imgStat+="<td>Waiting..</td>";
		imgStat+="<td>Waiting..</td>";
		imgStat+="<td>Waiting..</td>";
		imgStat+="</tr>";
//2nd Table of Load Image
		loadImgStat+="<tr>";
		loadImgStat+="<td></td>";
		loadImgStat+="<td>"+devices[i].HostName+"</td>";
		loadImgStat+="<td>"+devices[i].ManagementIp+"</td>";
		loadImgStat+="<td>"+devices[i].ImageUrl+"</td>";
		loadImgStat+="<td>Init</td>";
		loadImgStat+="<td>Waiting..</td>";
		loadImgStat+="</tr>";

	}
	$("#loadImgTableStat > tbody").empty().append(loadImgStat);
	$("#loadImgTable > tbody").empty().append(imgStat);
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#devTotalNo').empty().append(devices.length);
	if(globalDeviceType == "Mobile"){
		$("#loadImgTableStat").table("refresh");
		$("#loadImgTable").table("refresh");
	}
}
/*
 *
 *  FUNCTION NAME : loadConfInit
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : initializes data in table
 *  PARAMETERS    : 
 *  RETURN		  : 
 *
 */
function loadConfInit(){
	var confStat='';
	var loadConfStat='';
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var i = 0; i < devices.length; i++){
		if(HostName && HostName != "" && devices[i].HostName != HostName){continue;}
		confStat+="<tr>";
		confStat+="<td>"+devices[i].HostName+"</td>";
		confStat+="<td>"+devices[i].ManagementIp+"</td>";
		confStat+="<td>"+devices[i].ConsoleIp+"</td>";
		confStat+="<td>"+devices[i].Manufacturer+"</td>";
		confStat+="<td>"+devices[i].Model+"</td>";
		confStat+="<td>Init</td>";
		confStat+="<td>Waiting..</td>";
		confStat+="<td>Waiting..</td>";
		confStat+="<td>Waiting..</td>";
		confStat+="</tr>";
//2nd Table of Load Image
		loadConfStat+="<tr>";
		loadConfStat+="<td></td>";
		loadConfStat+="<td>"+devices[i].HostName+"</td>";
		loadConfStat+="<td>"+devices[i].ManagementIp+"</td>";
		loadConfStat+="<td>"+devices[i].ConfigUrl+"</td>";
		loadConfStat+="<td>Init</td>";
		loadConfStat+="<td>Waiting..</td>";
		loadConfStat+="</tr>";

	}
	$("#loadConfigTableStat > tbody").empty().append(loadConfStat);
	$("#loadConfigTable > tbody").empty().append(confStat);
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	$('#devTotalNo').empty().append(devices.length);
	if(globalDeviceType == "Mobile"){
		$("#loadConfTableStat").table("refresh");
		$("#loadConfTable").table("refresh");
	}
}
/*
 *
 *  FUNCTION NAME : mainDevMenuValid
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *  RETURN		  : 
 *
 */
function mainDevMenuValid(sub) {
	if(globalInfoType == "JSON"){
        devicesArr = getDevicesNodeJSON();
	}
	if(sub=="software"){
		if(devicesArr ==[] || devicesArr.length == 0){
			alertUser("No device on canvas");
			return;
		}else{
			for(var a=0; a<devicesArr.length; a++){
				if(devicesArr[a].Status.toLowerCase()=="reserved"){
					$('#toolsSubmenu').hide(1000);
			        $('#softwareSubmenu').show();
		 	        $('#menuList').hide();
				}else{
					$('#softwareSubmenu').hide();
					alertUser("Device/s should be committed.");return;
				}
			}
		}return;
	}else if(sub=="configuration"){
		if(devicesArr ==[] || devicesArr.length == 0){
			alertUser("No device on canvas");
			return;
		}else{
			for(var a=0; a<devicesArr.length; a++){
				if(devicesArr[a].Status.toLowerCase()=="reserved"){
					$('#toolsSubmenu').hide();
				    $('#configurationSubmenu').show();
				    $('#menuList').hide();
				}else{
					$('#configurationSubmenu').hide();
					alertUser("Device/s should be committed.");return;
				}
			}
		}return;
	}else if(sub=="showActivity"){
		if(devicesArr ==[] || devicesArr.length == 0){
			alertUser("No device on canvas");
			return;
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DeviceSanity.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].SaveImageEnable.toString() == "false" && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].SaveConfigEnable.toString() == "false"){
			alertUser("No activity to show");return;
		}else{
			for(var a=0; a<devicesArr.length; a++){
				if(devicesArr[a].Status.toLowerCase()=="reserved"){
			        $('#toolsSubmenu').hide();
				    $('#showActivitySubmenu').show();
				    $('#menuList').hide();
				}else{
					$('#showActivitySubmenu').hide();
					alertUser("Device/s should be committed.");return;
				}
			}
		}return;
	}else if(sub=="linksanity"){
		if(devicesArr ==[] || devicesArr.length == 0){
			alertUser("No device on canvas");
			return;
		}else{
			for(var a=0; a<devicesArr.length; a++){
				if(devicesArr[a].Status.toLowerCase()=="reserved"){
					$('#toolsSubmenu').hide();
			        $('#linkSanitySubmenu').show();
			        $('#menuList').hide();
				}else{
					$('#linkSanitySubmenu').hide();
					alertUser("Device/s should be committed.");return;
				}
			}
		}return;
	}else if(sub=="softwaredevmenu"){
		for(var a=0; a<devicesArr.length; a++){
			if(devicesArr[a].HostName == HostName){
				if(devicesArr[a].Status.toLowerCase()=="reserved"){
					$("#deviceToolsMenuMain").hide(500);
				    $('#softwareDevMenu').show(500);
				}else{
					$('#softwareDevMenu').hide();
					alertUser("Device/s should be committed.");return;
				}
			}
		}
		return;
	}else if(sub=="configdevmenu"){
		for(var a=0; a<devicesArr.length; a++){
			if(devicesArr[a].HostName == HostName){
				if(devicesArr[a].Status.toLowerCase()=="reserved"){
					$("#deviceToolsMenuMain").hide(500);
				    $('#configurationDevMenu').show(500);
				}else{
					$('#configurationDevMenu').hide();
					alertUser("Device/s should be committed.");return;
				}
			}
		}
		return;
	}
}

/*
 *
 *  FUNCTION NAME : dynamicTab
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */
function deviceStructureDynamicTab(val,type,tabnum){
	var pageval = val/7;var limit = 257;
	if (pageval > Math.floor(pageval)) {
		var pageval = pageval + 1;
		var pageval = parseInt(pageval);		
	}
	var pageinfo = "";
	for(var a=1; a<=pageval; a++){
		pageinfo +="<option value='"+a+"'>"+a+"</option>"
	}
	if (pageinfo!=""){
		document.getElementById('pagenumber').style.display = "block"
	}else{
		document.getElementById('pagenumber').style.display = "none"
	}
	if($("#dropdownstruction").val() == "devport"){
		var tabid = "newportid"
		var ret = dynamicPortTab(val,tabid,"Port ",limit);
		if (ret===0){$("#portperdevice").val("");return 0;}
		var con = createDynamictabContent(val,257,"portcontent();");
	}else if($("#dropdownstruction").val() == "devslotport"){
		var tabid = "newslotid"
		var ret = dynamicSlotTab(val,tabid,"Slot ",limit,"slotport");
		var con = createDynamictabContent(val,257,"slotContent('slotport');");
		
	}else if($("#dropdownstruction").val() == "devmodport"){
		var tabid = "newmoduleid"
		var ret = dynamicModuleTab(val,tabid,"Module ",limit);
		var con = createDynamictabContent(val,257,"moduleContent();");
	}else if($("#dropdownstruction").val() == "devslotmod"){
		if (type == "slotmodule") {
			var tabid = "newslotmoduleid"
			var ret = dynamicModuleTab(val,tabid,"Module ",limit,'slotmodule');
			var con = createDynamictabContent(val,257,"moduleContent('slotmodule');");
			var tabs = ret.tabs
			var contents = con.contents
			$("#slot-module-"+tabnum).empty().append(tabs);
			$('#tabs-slot-module-'+tabnum).show();		
			$('#tabs-slot-module-'+tabnum).tabs();
			$("#slot-module-content-"+tabnum).empty().append(contents);	
			$("#tabspagechild").empty().append(pageinfo);
			limitiPortTabsShow(1,tabid,limit,'slotmodule',tabnum);	
			return;
		}else{
			var tabid = "newslotmodid"
			var ret = dynamicSlotTab(val,tabid,"Slot ",limit,"slotmodule");
			var con = createDynamictabContent(val,257,"slotContent('slotmodule');");
		}
	}		
	var tabs = ret.tabs
	var contents = con.contents
	$("#tabspage").empty().append(pageinfo);
	$("#porttabs").empty().append(tabs);
	$('#devicetypetabs').tabs();
	$("#portinfotabs").empty().append(contents);	
	limitiPortTabsShow(1,tabid,limit);	
}
/*
 *
 *  FUNCTION NAME : dynamicPortTab
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */
function dynamicPortTab(num,id,name,limit){
	var tab = "";
	var msg = "Port per device is over the limit.\n"
	msg += "Maximum ports perr device is 256."
	if (num>=limit) {
		error(msg,"Notification")	
		var val = 0;	
		return 0;
	}
	if(num==""){return 0;}
	for(var a=1; a<=num; a++){
		tab +="<li id='"+id+a+"' style='display:none'";
		tab +=" style='width: auto;'";
		tab +=" onclick=\"portinfoshow('"+id+a+"','"+a+"')\" ";
		tab +="class='ui-tabs-anchor ui-state-default ui-corner-top plimitshow'>";
		tab +="<a href='#tabs-"+a+"' style='color: ";
		tab +="white;font-weight: bold;'>"+name+a+"</a></li>";	
	}
	var ret = ({tabs:tab});//,contents:content});
	return ret;

}
/*
 *
 *  FUNCTION NAME : limitiPortTabsShow
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */
function limitiPortTabsShow(val,id,limit,type,tabnum){
	if (type == 'slotmodule'){
		if(limit=="empty"){
			var limit = $("#inputSlotModule").val();
		}
		var limit = parseInt(limit);
		var tabsetmax = val*7;
		var tabsetmin = val*7-6;
		$(".plimitshow").hide();
		for(var a=1; a<=limit; a++){
			if(a<=tabsetmax && a>=tabsetmin){
				$("#"+id+a+"").show();
			}
		}
		portinfoshow(id+tabsetmin,tabsetmin,type,tabnum);
	}else{
		if(limit=="empty"){
			var limit = $("#portperdevice").val();
		}
		var limit = parseInt(limit);
		var tabsetmax = val*7;
		var tabsetmin = val*7-6;
		$(".plimitshow").hide();
		for(var a=1; a<=limit; a++){
			if(a<=tabsetmax && a>=tabsetmin){
				$("#"+id+a+"").show();
			}
		}
		portinfoshow(id+tabsetmin,tabsetmin);
	}
	
}
/*
 *
 *  FUNCTION NAME : dynamicSlotTab
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */
function dynamicSlotTab(num,id,name,limit,type){
	var tab = "";
	var msg = "Port per device is over the limit.\n"
	msg += "Maximum ports perr device is 256."
	if (num>=limit) {
		error(msg,"Notification")	
		var val = 0;	
		return 0;
	}
	if(num==""){return 0;}
	for(var a=1; a<=num; a++){
		if (type =="slotport"){
			tab +="<li id='"+id+a+"' style='display:none'";
			tab +=" style='width: auto;'";
			tab +=" onclick=\"slotinfoshow('"+id+a+"','"+a+"','slotport')\" ";
			tab +="class='ui-tabs-anchor ui-state-default ui-corner-top splimitshow'>";
			tab +="<a href='#tabs-"+a+"' style='color: ";
			tab +="white;font-weight: bold;'>"+name+a+"</a></li>";	
		}else if (type=="slotmodule"){
			tab +="<li id='"+id+a+"' style='display:none'";
			tab +=" style='width: auto;'";
			tab +=" onclick=\"slotinfoshow('"+id+a+"','"+a+"','slotmodule')\" ";
			tab +="class='ui-tabs-anchor ui-state-default ui-corner-top splimitshow'>";
			tab +="<a href='#tabs-"+a+"' style='color: ";
			tab +="white;font-weight: bold;'>"+name+a+"</a></li>";	

		}
	}
	var ret = ({tabs:tab});//,contents:content});
	return ret;


}
/*
 *
 *  FUNCTION NAME : limitSlotShow
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */
function limitSlotShow(val,id,limit){
	if (limit == "empty"){
		var limit = $("#portperdevice").val();
	}
	var limit = parseInt(limit);
	var tabsetmax = val*10;
	var tabsetmin = val*10-9;
	if (globalTabId=="port"){
		$(".plimitshow").hide();
	}
	for(var a=1; a<=limit; a++){
		if(a<=tabsetmax && a>=tabsetmin){
			$("#"+id+a+"").show();
		}
	}
	portinfoshow(id+tabsetmin,tabsetmin);
}
/*
 *
 *  FUNCTION NAME : slotPOrtContent
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   :
 *  PARAMETERS    : 
 *
 */
function slotPOrtContent(num,id,name,limit){
	var tab = "";
	var msg = "Port per device is over the limit.\nMaximum ports perr device is 256"
	$('#devicetypetabs').tabs();
	if (num>=limit) {
		error(msg,"Notification")	
		var val = 0;	
		$('#portperdevice').val("");
	}
	if(num==""){return 0;}
	for(var a=1; a<=num; a++){
		tab +="<li id='"+id+a+"' style='display:none'";
		tab +=" style='width: auto;'";
		tab +=" onclick=\"slotPortInfoShow('"+id+a+"','"+a+"')\" ";
		tab +="class='ui-tabs-anchor ui-state-default ui-corner-top plimitshow'>";
		tab +="<a href='#tabs-"+a+"' style='color: ";
		tab +="white;font-weight: bold;'>"+name+a+"</a></li>";	
	}
	var ret = ({tabs:tab});//,contents:content});
	return ret;
}
/*
 *
 *  FUNCTION NAME : limitSlotTabShow 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function limitSlotTabShow(val,id,limit){
	var limit = parseInt(limit);
	var tabsetmax = val*9;
	var tabsetmin = val*9-8;
	$(".slimitshow").hide();
	for(var a=1; a<=limit; a++){
		if(a<=tabsetmax && a>=tabsetmin){
			$("#"+id+a+"").show();
		}
	}
	slotPortInfoShow(id+tabsetmin,tabsetmin);
}
/*
 *
 *  FUNCTION NAME : slotPortInfoShow 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function slotPortInfoShow(id,val){
    $(".infoshowhide").hide();//Hide content
    $("#infoshowhide-"+val+"").show();//Show content
    for(var a=1; a<=257; a++){
    	$("#slot-port-"+a+" li a").css("color","#fffff");
	}
    $("#"+id+" a").css("color","#00000");
	//$("#tabs-"+val+"-slot").show();
	$("#tabs-"+val+"-slot"+GlobalSlotId).show();
}
/*
 *
 *  FUNCTION NAME : portSlotContent 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function portSlotContent(){
	var content = "";
	var a = conterninfor.num
	var addinfo = conterninfor.str
	content += "<table "+addinfo+" id='tabs-"+a+"-slot"+GlobalSlotId+"'";
	content += " class='infoshowhide'>";
	content += "<tr><td style='width: 90px;'>";
	content += "<p>Physical port type: <br></td><td><br>";
	content += "<select id='porttypeinfo"+a+"' ";
	content += "data-mini='true' style='width: 150px;'>";
	content += "<option value=''>Layer 1</option>";
	content += "<option value=''>Layer 2</option>"
	content += "<option value=''>Open Port</option>";
	content += "<option value=''>Direct connect";
	content += "</option></select>";
	content += "</p><br></td><td><br><p>Media type</p><br></td>";
	content += "<td><br><p><select></select></p><br></td>";
	content += "</tr><tr><td><p>Port name: <br></td><td><br>";
	content += "<input id='portnamenumber"+a+"' ";
	content += "type='text'/></p><br></td>";
	content += "</tr><tr><td style='width: 90px;'><br>";
	content += "<p>Sub chanel</p></td></tr></table>";
	return content
}
/*
 *
 *  FUNCTION NAME : dynamicModuleTab 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function dynamicModuleTab(num,id,name,limit,type){
	var tab = "";
	var msg = "Port per device is over the limit.\n"
	msg += "Maximum ports perr device is 256."
	if (num>=limit) {
		error(msg,"Notification")	
	val = 0;	
		return 0;
	}
	if(num==""){return 0;}
	for(var a=1; a<=num; a++){
		if (type == "slotmodule"){
			tab +="<li id='"+id+a+"' style='display:none'";
			tab +=" style='width: auto;'";
			tab +=" onclick=\"moduleinfoshow('"+id+a+"','"+a+"','slotmodule')\" ";
			tab +="class='ui-tabs-anchor ui-state-default ui-corner-top splimitshow'>";
			tab +="<a href='#tabs-slot-"+a+"' style='color: ";
			tab +="white;font-weight: bold;'>"+name+a+"</a></li>";	

		}else{
			tab +="<li id='"+id+a+"' style='display:none'";
			tab +=" style='width: auto;'";
			tab +=" onclick=\"moduleinfoshow('"+id+a+"','"+a+"')\" ";
			tab +="class='ui-tabs-anchor ui-state-default ui-corner-top splimitshow'>";
			tab +="<a href='#tabs-"+a+"' style='color: ";
			tab +="white;font-weight: bold;'>"+name+a+"</a></li>";	
		}
	}
	var ret = ({tabs:tab});//,contents:content});
	return ret;
}
/*
 *
 *  FUNCTION NAME : moduleinfoshow 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 7, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function moduleinfoshow(id,val){
	for(var a=1; a<=257; a++){
		$("#tabs-module-port-"+a).hide();
		$("#modulecontentshowhide-"+a).hide();//Show content
	}
	$("#modulecontentshowhide-"+val).show();//Show content
	$("#tabs-module-port-"+val).show();
	$("#porttabs li").removeClass("ui-tabs-active ui-state-active");
	$("#tabhead"+val+"").addClass("ui-state-default ui-corner-top ui-tabs-active ui-state-active");
	$("#porttabs li a").css("color","#fff");
	$("#"+id+" a").css("color","#000");

}
/*
 *
 *  FUNCTION NAME : modulePortContent 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function modulePortContent(num,id,name,limit){
	var tab = "";
	var msg = "Port per device is over the limit.\nMaximum ports perr device is 256"
	$('#devicetypetabs').tabs();
	if (num>=limit) {
		error(msg,"Notification")	
		var val = 0;	
		$('#portperdevice').val("");
	}
	if(num==""){return 0;}
	for(var a=1; a<=num; a++){
		tab +="<li id='"+id+a+"' style='display:none'";
		tab +=" style='width: auto;'";
		tab +=" onclick=\"slotPortInfoShow('"+id+a+"','"+a+"')\" ";
		tab +="class='ui-tabs-anchor ui-state-default ui-corner-top plimitshow'>";
		tab +="<a href='#tabs-"+a+"' style='color: ";
		tab +="white;font-weight: bold;'>"+name+a+"</a></li>";	
	}
	var ret = ({tabs:tab});//,contents:content});
	return ret;

}
/*
 *
 *  FUNCTION NAME : portModuleConten
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function portModuleContent(){
	var content = "";
	var a = conterninfor.num
	var addinfo = conterninfor.str
	content += "<table "+addinfo+" id='tabs-"+a+"-module"+GlobalSlotId+"'";
	content += " class='infoshowhide'>";
	content += "<tr><td style='width: 90px;'>";
	content += "<p>Physical port type: <br></td><td><br>";
	content += "<select id='porttypeinfo"+a+"' ";
	content += "data-mini='true' style='width: 150px;'>";
	content += "<option value=''>Layer 1</option>";
	content += "<option value=''>Layer 2</option>"
	content += "<option value=''>Open Port</option>";
	content += "<option value=''>Direct connect";
	content += "</option></select>";
	content += "</p><br></td><td><br><p>Media type</p><br></td>";
	content += "<td><br><p><select></select></p><br></td>";
	content += "</tr><tr><td><p>Port name: <br></td><td><br>";
	content += "<input id='portnamenumber"+a+"' ";
	content += "type='text'/></p><br></td>";
	content += "</tr><tr><td style='width: 90px;'><br>";
	content += "<p>Sub chanel</p></td></tr></table>";
	return content

}

/*---kmmabignay--mar17----*/
function menuToolsConfigQueryJSON(actionx,queryx,type,opt){
	var urlx = getURL("ConfigEditor","JSON");
	$.ajax({
		url: urlx,
		data: {
			action: actionx,
			query: queryx,
		},
        dataType: 'html',
		method: 'POST',
		proccessData: false,
		async:false,
        success: function(data) {
			if(!data){alertUser("Process failed.","toConfig()");}
			if(opt=="Save"){
				saveConfigAndImageJSON(data,type);
			}else{
				loadConfigAndImageJSON(data,type);
			}
			if(globalDeviceType != "Mobile"){
				$(".ui-dialog").position({
	   			    my: "center",
		  		    at: "center",
		   			of: window
		   		});
			}
		}
	});

}
/*--------------------------------------------------------*/

/*---kmmabignay--mar17----*/
function saveConfigAndImageJSON(data,type,pmFlag){
	var dat = data.replace(/'/g,'"');
 	var dat2 = $.parseJSON(dat);
	var row = dat2.data[0].row;
	var svc=""; var svc2="";
	for(var a=0; a<row.length; a++){
		if(HostName!=undefined && HostName!="" && HostName!=row[a].Hostname){continue;}
		tabClass = '';
		if(a % 2 == 0){tabClass = 'alt';}
		var devId = row[a].DeviceId;
		var hName = row[a].Hostname;
		var model = row[a].Model;
		var onchangeArgs = "\"Save"+type+"\",\"save"+type+"\",\""+devId+"\",";
		onchangeArgs += "\"URL\",\""+devId+"\"";
		var onchangeArgs2 = "\"Save"+type+"\",\"save"+type+"\",\""+devId+"\",";
		onchangeArgs2 += "\"Detail\",\""+devId+"\"";
		svc += "<tr class='"+tabClass+"'id='trsave"+type+devId+"'>";
		svc += "<td class='defaultGrid'>";
		svc += "<input type='checkbox' class='save"+type+"check' value='"+devId+"' ";
		svc += "name='save"+type+"Sel' onclick='enableRow1(\"save"+type+"\",\""+devId+"\")'/></td>";
		svc += "<td class='defaultGrid'>"+hName+"</td>";
		svc += "<td class='defaultGrid'>"+model+"</td>";
		if(!pmFlag){
			svc += "<td class='defaultGrid'>";
			svc += "<select disabled='disabled' style='width:98%' ";
			svc += "id='save"+type+"Location"+devId+"' ";
			svc += "onchange='getImageConfigLocation("+onchangeArgs+")'>";
			svc += "<option value='Custom'> Custom </option>";
			svc += "<option value='Primary'> Primary </option>";
			svc += "<option value='Secondary'> Secondary </option></select></td>";
		}
		svc += "<td class='defaultGrid'>";
		svc += "<input disabled='disabled' type='text' style='width:98%' ";
		svc += "id='tbSave"+type+"URL"+devId+"'></td></tr>";
		/*----detailed---*/
		svc2 += "<tr class='"+tabClass+"'id='trsave"+type+"Detail"+devId+"'>";
		svc2 += "<td class='defaultGrid'>";
		svc2 += "<input type='checkbox' class='save"+type+"Detailcheck' value='"+devId+"' ";
		svc2 += "name='save"+type+"DetailSel' onclick='enableRow1(\"save"+type+"Detail\",\""+devId+"\")'/></td>";
		svc2 += "<td class='defaultGrid'>"+hName+"</td>";
		svc2 += "<td class='defaultGrid'>"+model+"</td>";
		svc2 += "<td class='defaultGrid'>";
		svc2 += "<select disabled='disabled' style='width:98%' ";
		svc2 += "id='save"+type+"DetailLocation"+devId+"' ";
		svc2 += "onchange='getImageConfigLocation("+onchangeArgs2+")'>";
		svc2 += "<option value='Custom'> Custom </option>";
		svc2 += "<option value='Primary'> Primary </option>";
		svc2 += "<option value='Secondary'> Secondary </option></select></td>";
		svc2 += "<td class='defaultGrid'>";
		svc2 += "<input disabled='disabled' type='text' style='width:98%' ";
		svc2 += "id='tbSave"+type+"DetailProtocol"+devId+"'></td>";
		svc2 += "<td class='defaultGrid'>";
		svc2 += "<input disabled='disabled' type='text' style='width:98%' ";
		svc2 += "id='tbSave"+type+"DetailIp"+devId+"'></td>";
		svc2 += "<td class='defaultGrid'>";
		svc2 += "<input disabled='disabled' type='text' style='width:98%' ";
		svc2 += "id='tbSave"+type+"DetailPath"+devId+"'></td>";
		svc2 += "<td class='defaultGrid'>";
		svc2 += "<input disabled='disabled' type='text' style='width:98%' ";
		svc2 += "id='tbSave"+type+"DetailFilename"+devId+"'></td></tr>";
	}
	if(pmFlag){
		$("#save"+type+"BodyPM").html(svc);
	}else{
		$("#save"+type+"Body").html(svc);
		$("#save"+type+"DetailBody").html(svc2);		
	}
}
/*--------------------------------------------------------*/

/*---kmmabignay--mar17----*/
function loadConfigAndImageJSON(data,type,pmFlag){
	var dat = data.replace(/'/g,'"');
   	var dat2 = $.parseJSON(dat);
	var row = dat2.data[0].row;
	var svc=""; var svc2="";
	for(var a=0; a<row.length; a++){
		var devId = row[a].DeviceId;
		var hName = row[a].Hostname;
		var model = row[a].Model;
		if(HostName!=undefined && HostName!="" && HostName!=hName){continue;}
		tabClass = '';
		if(a % 2 == 0){tabClass = 'alt';}
		var onchangeArgs = "\"Load"+type+"\",\"load"+type+"\",\""+devId+"\",";
		onchangeArgs += "\"URL\",\""+devId+"\"";
		var onchangeArgs2 = "\"Load"+type+"\",\"load"+type+"\",\""+devId+"\",";
		onchangeArgs2 += "\"Detail\",\""+devId+"\"";
		if(type=="Image"){
			var destVal = "boot-image";
		}else{
			var destVal = "running-config";
		}
		svc += "<tr class='"+tabClass+"'id='trload"+type+devId+"'>";
		svc += "<td class='defaultGrid'>";
		svc += "<input type='checkbox' class='load"+type+"check' value='"+devId+"' ";
		svc += "name='load"+type+"Sel' onclick='enableRow1(\"load"+type+"\",\""+devId+"\")'/></td>";
		svc += "<td class='defaultGrid'>"+hName+"</td>";
		svc += "<td class='defaultGrid'>"+model+"</td>";
		if(!pmFlag){
			svc += "<td class='defaultGrid'>";
			svc += "<select disabled='disabled' style='width:98%' ";
			svc += "id='load"+type+"Location"+devId+"' ";
			svc += "onchange='getImageConfigLocation("+onchangeArgs+")'>";
			svc += "<option value='Custom'> Custom </option>";
			svc += "<option value='Primary'> Primary </option>";
			svc += "<option value='Secondary'> Secondary </option></select></td>";
		}
		svc += "<td class='defaultGrid'>";
		svc += "<input disabled='disabled' type='text' style='width:98%' ";
		svc += "id='tbLoad"+type+"URL"+devId+"'></td>";
		svc += "<td class='defaultGrid'><select disabled='disabled' style='width:98%' ";
		svc += "id='tbLoad"+type+"Destination"+devId+"'>";
		svc += "<option value='"+destVal+"'>"+destVal+"</option>";
		var options = ['bootflash','bootflash0','bootflash1','flash','flash0','flash1'];
		options.push('flash2','disk0','disk1','disk2','slot0','slot1','slot2');
		for(var i=0; i<options.length; i++){
			svc += "<option value='"+options[i]+"'>"+options[i]+"</option>";
		}
		svc += "</select></td></tr>";
		/*----detailed---*/
		svc2 += "<tr class='"+tabClass+"'id='trload"+type+"Detail"+devId+"'>";
		svc2 += "<td class='defaultGrid'>";
		svc2 += "<input type='checkbox' class='load"+type+"Detailcheck' value='"+devId+"' ";
		svc2 += "name='load"+type+"DetailSel' onclick='enableRow1(\"load"+type+"Detail\",\""+devId+"\")'/></td>";
		svc2 += "<td class='defaultGrid'>"+hName+"</td>";
		svc2 += "<td class='defaultGrid'>"+model+"</td>";
		svc2 += "<td class='defaultGrid'>";
		svc2 += "<select disabled='disabled' style='width:98%' ";
		svc2 += "id='load"+type+"DetailLocation"+devId+"' ";
		svc2 += "onchange='getImageConfigLocation("+onchangeArgs2+")'>";
		svc2 += "<option value='Custom'> Custom </option>";
		svc2 += "<option value='Primary'> Primary </option>";
		svc2 += "<option value='Secondary'> Secondary </option></select></td>";
		svc2 += "<td class='defaultGrid'>";
		svc2 += "<input disabled='disabled' type='text' style='width:98%' ";
		svc2 += "id='tbLoad"+type+"DetailProtocol"+devId+"'></td>";
		svc2 += "<td class='defaultGrid'>";
		svc2 += "<input disabled='disabled' type='text' style='width:98%' ";
		svc2 += "id='tbLoad"+type+"DetailIp"+devId+"'></td>";
		svc2 += "<td class='defaultGrid'>";
		svc2 += "<input disabled='disabled' type='text' style='width:98%' ";
		svc2 += "id='tbLoad"+type+"DetailPath"+devId+"'></td>";
		svc2 += "<td class='defaultGrid'>";
		svc2 += "<input disabled='disabled' type='text' style='width:98%' ";
		svc2 += "id='tbLoad"+type+"DetailFilename"+devId+"'></td>";
		svc2 += "<td class='defaultGrid'><select disabled='disabled' style='width:98%' ";
		svc2 += "id='tbLoad"+type+"DetailDestination"+devId+"'>";
		svc2 += "<option value='"+destVal+"'>"+destVal+"</option>";
		for(var x=0; x<options.length; x++){
			svc2 += "<option value='"+options[x]+"'>"+options[x]+"</option>";
		}
		svc2 += "</select></td></tr>";
	}
	if(pmFlag){
		$("#load"+type+"BodyPM").html(svc);
		$("#load"+type+"DetailBody").html(svc2);		
	}else{
		$("#load"+type+"Body").html(svc);
		$("#load"+type+"DetailBody").html(svc2);		
	}
}
/*--------------------------------------------------------*/

/*----kmmabignay - mar17 - loadEndReservation Set Attribute for config--*/
function loadStartReservationSetAttrConfig(MainEndArr){
	var loadCon = MainEndArr.split("*");
	for(var i=0; i<devicesArr.length; i++){
		if(loadCon.length==5){
			devicesArr[i].ConfigUrl = loadCon[2];
			devicesArr[i].ConfigDestination = loadCon[3];
			devicesArr[i].TypeConfig = loadCon[4];
			devicesArr[i].LoadConfigEnable = true;
			devicesArr[i].ConfigDetail = false;
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable = "true";
		}else{
			devicesArr[i].ConfigServer = loadCon[3];
			devicesArr[i].FilePath = loadCon[4];
			devicesArr[i].ConfigFileName = loadCon[5];
			devicesArr[i].ConfigDestination = loadCon[6];
			devicesArr[i].ConfigType = loadCon[7];
			devicesArr[i].TypeConfig = loadCon[2];
			devicesArr[i].LoadConfigEnable = true;
			devicesArr[i].ConfigDetail = true;
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable =  "true";
		}
  	}
}
/*----------------------------------------------------------------------*/

/*--kmmabignay - mar17 - loadEndReservation Set Attribute for image----*/
function loadStartReservationSetAttrImage(MainEndArr){
	var loadImg = MainEndArr.split("*");
	for(var i=0; i<devicesArr.length; i++){
		if(loadImg.length==5){
			devicesArr[i].ImageUrl = loadImg[2];
			devicesArr[i].ImageDestination = loadImg[3];
			devicesArr[i].TypeImage = loadImg[4];
			devicesArr[i].LoadImageEnable = true;
			devicesArr[i].ImageDetail = false;
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable = "true";
		}else{
			devicesArr[i].ImageServer = loadImg[4];
			devicesArr[i].ImageFilePath = loadImg[5];
			devicesArr[i].ImageFileName = loadImg[6];
			devicesArr[i].ImageDestination = loadImg[7];
			devicesArr[i].ImageType = loadImg[8];
			devicesArr[i].TypeImage = loadImg[2];
			devicesArr[i].LoadImageEnable = true;
			devicesArr[i].ImageDetail = true;
			globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable = "true";
		}
  	}
}
/*----------------------------------------------------------------------*/

/*
 *
 *  FUNCTION NAME : newDevAttribute 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function newDevAttribute(){
	$.ajax({
		url: getURL("ConfigEditor","JSON"),
		data : {
			"action": "fetchmanufacturers",
		},
		method: 'POST',
		proccessData: false,
		dataType: 'html',
		success: function(data) {
			var dat = data.replace(/'/g,'"'); 
			var dat2 = $.parseJSON(dat);
			var Productfamily = dat2.ProductFamily
			var Manufacturer = dat2.Manufacturer
			var OperatingSystem = dat2.OperatingSystem
			var MediaType = dat2.MediaType
			var Model = dat2.Model
			var ProcessorType = dat2.ProcessorType
			var CPUCores = dat2.CPUCores
			var productfam = "";
			var manufacture = "";
			var operatingsys = "";
			var model = "";
			var media = "";
			var processortype = "";
			var cpucores = "";
			var processrsockets = "";
			var corespersockets = "";
			var logicalprocessors = "";
			for(var i = 0; i < Productfamily.length; i++){
				productfam += "<option value='"+Productfamily[i]+"'>"+Productfamily[i]+"</option>"
			}
			for(var i = 0; i < Manufacturer.length; i++){
				manufacture += "<option value='"+Manufacturer[i]+"'>"+Manufacturer[i]+"</option>"
			}
			for(var i = 0; i < OperatingSystem.length; i++){
				operatingsys += "<option value='"+OperatingSystem[i]+"'>"+OperatingSystem[i]+"</option>"
			}
			for(var i = 0; i < Model.length; i++){
				model += "<option value='"+Model[i]+"'>"+Model[i]+"</option>"
			}
			for(var i = 0; i < MediaType.length; i++){
				media += "<option value='"+MediaType[i]+"'>"+MediaType[i]+"</option>"
			}
			for(var i = 0; i < ProcessorType.length; i++){
				processortype += "<option value='"+ProcessorType[i]+"'>"+ProcessorType[i]+"</option>"	
			}
			for(var i = 0; i < CPUCores.length; i++){
				cpucores += "<option value='"+CPUCores[i]+"'>"+CPUCores[i]+"</option>"	
			}
			productfam += "<option value='Other'>Other</option>"
			manufacture += "<option value='Other'>Other</option>"
			operatingsys += "<option value='Other'>Other</option>"
			model += "<option value='Other'>Other</option>"
			$("#newdevmodel").empty().append(model);
			$("#newdevoperatingsystem").empty().append(operatingsys);
			$("#newdevmanufacturer").empty().append(manufacture);
			$("#newdevproductfamily").empty().append(productfam);
			$("#newprocessortype").empty().append(processortype);
			$("#newcpucores").empty().append(cpucores);
			GlobalMedia = media;
		}
	});
}
/*
 *
 *  FUNCTION NAME : getMapPartnerPortInfo 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
var GlobalMapPort = "";
var GlobalDevicePortType = "";
function getMapPartnerPortInfo(){
	var porttype = "";
	$.ajax({
		url: getURL("ConfigEditor","JSON"),
		data : {
			"action": "getdevavailableports",
		},
		method: 'POST',
		proccessData: false,
		dataType: 'html',
		success: function(data) {
			var dat = data.replace(/'/g,'"'); 
			var dat2 = $.parseJSON(dat);
			GlobalMapPort = dat2;
			var portlist = [];
			var portType = "";
			var mapportinfo = GlobalMapPort.MAINCONFIG[0].DEVICE
			var test = "";
			for (var a=0; a<mapportinfo.length; a++){
				portType = mapportinfo[a].PortType
				test = ($.inArray(portType, portlist));
				if($.inArray(portType, portlist)==-1){
					if(portType==""){continue}
					portlist.push(portType);
					porttype += "<option value='"+portType+"'>"+portType+"</option>"
				}
			}
			//$("#porttypeinfo1").empty().append(porttype);
			GlobalDevicePortType = porttype
		}
	});
}
/*
 *
 *  FUNCTION NAME : showElement 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function showElement(id1,id2,value) {
	if(document.getElementById(id1).style.display=="none"){
		document.getElementById(id1).style.display = "inline";
		document.getElementById(id2).style.display = "none";
		document.getElementById(id1).selectedIndex="0";
		$(value).css("display","none");
	}else{
		document.getElementById(id1).style.display = "none";
		document.getElementById(id2).style.display = "inline";
		document.getElementById(id1).selectedIndex="0";
		$(value).css("display","block");
		//$(value).text("Select");
	}
}
/*
 *
 *  FUNCTION NAME : testToolTablePopUp 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function newTestToolPopUp() {
	addEvent2History("SideBar TestTool > NewTestTool"); //add event to history
	var h = $(window).height() - 100;
	$( "#newtesttolPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		closeOnEscape: false
	});
	$( "#newtesttolPopUp" ).empty().load('pages/ConfigEditor/NewTestTool.html',function(){
		$("span.ui-dialog-title").text("ADD NEW TEST TOOL");
		setTimeout(function(){
			newDevice('device');
		}, 1000);
		$(document).on("change", "#dropdowntypeTest", function(){
			if($("#dropdowntypeTest option:selected").val()=="Manual"){
				$(".manualTestClass").show();
				$("#testtoolMainDiv").hide();
			}else{
				AutoDType="TestTool";
				$("#testtoolMainDiv").show();
				$(".manualTestClass").hide();
				$('#addNewTestTManuOpt').val('Select');
				serverValidation();
				changeServerManuType();
				setAutoDVariable();
				$('#addNewTestTDomainOpt').html(autoDDomainOptions);
			}
		});
		$(".deviceInfoHideAndShow").hide();
		getMapPartnerPortInfo();
		newDeviceAvailableDom();
		newDevAttribute();
		$(".ui-dialog").position({
		   my: "top",
		   at: "top",
		   of: window
		});
	});

}
/*
 *
 *  FUNCTION NAME : newServerPop 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function newServerPop() {
	addEvent2History("SideBar Server > NewServer"); //add event to history
	var h = $(window).height() - 100;
	$( "#newserverPopup" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		closeOnEscape: false
	});
	$( "#newserverPopup" ).empty().load('pages/ConfigEditor/NewServer.html',function(){
		$('span.ui-dialog-title').text("ADD NEW SERVER");
		$('.ui-dialog-title').css({'margin-left':'14px','margin-top':'7px','text-align':'center'});
		setTimeout(function(){
			newDevice('device');	
		}, 1000);
		$(document).on("change", "#dropdowntypeServer", function(){
			if($("#dropdowntypeServer option:selected").val()=="Manual"){
				$("#serverMainDiv").hide();
				$(".manualServerClass").show();
			}else{
				AutoDType="Server";
				$("#serverMainDiv").show();
				$(".manualServerClass").hide();
				serverValidation();
				changeServerManuType();
				setAutoDVariable();
				$('#addNewTestTDomainOpt').html(autoDDomainOptions);
			}
		});
		$(".deviceInfoHideAndShow").hide();
		getMapPartnerPortInfo();
		newDeviceAvailableDom();
		newDevAttribute();
		$(".ui-dialog").position({
		   my: "top",
		   at: "top",
		   of: window
		});
	});

}

/*
 *
 *  FUNCTION NAME : hideShowElement 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function hideShowElement(id1,id2) {
	if(document.getElementById(id1).style.display=="none"){
		document.getElementById(id1).style.display = "inline";
		document.getElementById(id2).style.display = "none";
		//document.getElementById(id2).selectedIndex[0];
	}else{
		document.getElementById(id1).style.display = "none";
		document.getElementById(id2).style.display = "inline";
		//document.getElementById(id2).selectedIndex[0];
	//	$(value).text("Select");
	}
}
/*
 *
 *  FUNCTION NAME : runSanityQueryMenu 
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function runSanityQueryMenu(){
	if(globalDeviceType == "Mobile"){
		loading("show","Processing information...");
	}
	if(globalInfoType == "XML"){	
		var url = getURL("ConfigEditor")+"action=checkdevicestatus&query=resourceid="+window['variable' + dynamicResourceId[pageCanvas] ]+"^user="+globalUserName+"^feature=linksanity^result=false";
	}else{
		var url = getURL("ConfigEditor","JSON")+'action=checkdevicestatus&query={"TOPOLOGY":[{"resourceid": "'+window['variable' + dynamicResourceId[pageCanvas]]+'", "user": "'+globalUserName+'", "feature": "linksanity", "result":"false"}]}';
	}
	$.ajax({
		url: url,
		dataType: 'html',
		proccessData: false,
		success: function(data) {
			data = $.trim(data);
			if(globalInfoType == "XML"){
				if(data.match(/Alert/gi) != null){
					globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable = "false";
					alertUser(data);
				}else{
					globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable = "true";
					connQueryRunSanity();return;}
			}else{
				data = data.replace(/'/g,'"');
				var json = jQuery.parseJSON(data);
				if(json.TOPOLOGY[0].Result != '1'){
					alertUser(json.TOPOLOGY[0].Result);
					globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable = "false";
					return;
				}else{
					globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable = "true";
					connQueryRunSanity();return;
				}
			}
		}
	});

}

/*
 *
 *  FUNCTION NAME : connQueryRunSanity 
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 20, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function connQueryRunSanity(){
}
/*
 *
 *  FUNCTION NAME : startEndCheckBut
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function startEndCheckBut(type,num) {
	saveresmain = "";
	if(type=="start"){
		var startR = $("#comOpStartRes"+num).is(":checked");
		if(startR == "false" || startR == false){
			addEvent2History("UnCheck CommitOption > StartReservation"); //add event to history
			return;
		}else{
			addEvent2History("Check CommitOption > StartReservation"); //add event to history
			startRes('start', num);
		}
	}else{
		var endR = $("#comOpEndRes"+num).is(":checked");
		if(endR == "false" || endR == false){
			addEvent2History("UnCheck CommitOption > EndReservation"); //add event to history
			return;
		}else{
			addEvent2History("Check CommitOption > EndReservation"); //add event to history
			startRes('end', num);
		}
	}
}
/*
 *
 *  FUNCTION NAME : manageipenable 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function manageipenable(val){
	var consol = $("#newdevconsoleip").val();
	var manage = $("#newdevmanagementip").val();
	if(globalDeviceType=="Mobile"){
		if(manage!="")
			$("#newdevmanageaddress").textinput("enable");
		else
			$("#newdevmanageaddress").textinput("disable");
		if(consol!="")
			$("#newdevconsoleaddress").textinput("enable");
		else
			$("#newdevconsoleaddress").textinput("disable");
		if (consol=="" && manage==""){
			$("#newdevusername").textinput("disable");
			$("#newdevpassword").textinput("disable");
		}
		if (manage!="" || consol!="") {
			$("#newdevusername").textinput("enable");
			$("#newdevpassword").textinput("enable");
		}
	}else{
		if(manage!="")
			$("#newdevmanageaddress").removeAttr('disabled');
		else
			$("#newdevmanageaddress").attr('disabled',true);
		if(consol!="")
			$("#newdevconsoleaddress").removeAttr('disabled');
		else
			$("#newdevconsoleaddress").attr('disabled',true);
		if (consol=="" && manage==""){
			$("#newdevusername").attr('disabled',true);
			$("#newdevpassword").attr('disabled',true);
			return 0;
		}
		if (manage!="" || consol!="") {
			$("#newdevusername").removeAttr('disabled');
			$("#newdevpassword").removeAttr('disabled');
		}
	}
}
/*
 *
 *  FUNCTION NAME : newDeviceUserPassEnable 
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 12, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function newDeviceUserPassEnable(){
	var user = $("#newdevusername").val();
	var pass = $("#newdevpassword").val();
	if(globalDeviceType=="Mobile"){	
		if(user!="" && pass!=""){
			$("#dropdowndomain").selectmenu("enable");
			$("#dropdownstruction").selectmenu("enable");
			$("#portperdevice").textinput("enable");
			$(".deviceInfoHideAndShow").show();
		}else{
			$("#dropdowndomain").selectmenu('disabled');
			$("#dropdownstruction").selectmenu('disabled');
			$("#portperdevice").textinput('disabled');
			$(".deviceInfoHideAndShow").hide();
		}
	}else{
		if(user!="" && pass!=""){
			$("#dropdowndomain").removeAttr('disabled');
			$("#dropdownstruction").removeAttr('disabled');
			$("#portperdevice").removeAttr('disabled');
			$(".deviceInfoHideAndShow").show();
		}else{
			$("#dropdowndomain").attr('disabled',true);
			$("#dropdownstruction").attr('disabled',true);
			$("#portperdevice").attr('disabled',true);
			$(".deviceInfoHideAndShow").hide();
		}
	}
}
/*
 *
 *  FUNCTION NAME : checkNewPortValidation
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkNewPortValidation(val){
	var msg = "Maximum port must not over is 65535."
	if (val>=65535) {
		error(msg,"Notification");
	}
}
/*
 *
 *  FUNCTION NAME : checkCurRunningSanity 
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkRunningSanity(feature){
	if(globalDeviceType == "Mobile"){
		loading("show","Processing information...");
	}
	if(globalInfoType == "XML"){	
		var url = getURL("ConfigEditor")+"action=checkdevicestatus&query=resourceid="+window['variable' + dynamicResourceId[pageCanvas] ]+"&user="+globalUserName+"&feature="+feature+"&result=false&menuflag=1";
	}else{
		var urlx = getURL("ConfigEditor","JSON");
		var actionx = 'checkdevicestatus';
		var queryObj = {'QUERY':[{'resourceid':window['variable'+dynamicResourceId[pageCanvas]],
			'user':+globalUserName,'feature':feature,'result':'false','menuflag':'1'}]};
		var queryx = JSON.stringify(queryObj);
	}
	$.ajax({
		url: urlx,
		data: {
			action: actionx,
			query: queryx
		},
		dataType: 'html',
		proccessData: false,
		success: function(data) {
			data = $.trim(data);
			if(globalDeviceType == "Mobile"){
				loading("hide");
			}
			if(globalInfoType == "XML"){
				if(data.match(/Alert/gi) != 1){
					globalMAINCONFIG[pageCanvas].MAINCONFIG[0].SaveImageEnable = "false";
					globalMAINCONFIG[pageCanvas].MAINCONFIG[0].SaveConfigEnable = "false";
					globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable = "false";
					globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable = "false";
					alertUser(data);
				}else{
					return;}
			}else{
				data = data.replace(/'/g,'"');
				var json = jQuery.parseJSON(data);
				if(json.TOPOLOGY[0].Result != '1'){
					alertUser(json.TOPOLOGY[0].Result);
					return 0;
				}else{
					return 1;
				}
			}
		}
	});
}		
/*
 *
 *  FUNCTION NAME : newDeviceCancel 
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function newDeviceCancel(id){
	$("#devicetypetabs").empty();
	$("#manualMainID").remove();
	$('#'+id).empty().dialog('destroy');	
}
/*
 *
 *  FUNCTION NAME : saveNewManualDeviceInfo
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function saveNewManualDeviceInfo(){
	var url = getURL('ConfigEditor','JSON');
	var action = "savenewdevice";
	var str= GlobalNewDevice[0]
	var query = JSON.stringify(str)
	$.ajax({
		url: url,
		data : {
			"action":action,
			"query":query,
		},
		dataType: 'html',
		method: 'POST',
		proccessData: false,
		async:false,
		success: function(data) {
			var dat = data.replace(/'/g,'"'); 
			var dat2 = $.parseJSON(dat);
			var ret = dat2.RETURN[0].Return
			var msg = "Device successfully save."
			var err = "Information not save please check all information."
			if(ret){
				alerts(msg);
				$("#devicetypetabs").empty();
				$("#manualMainID").remove();
				$('#newdevicePopUp').empty().dialog('destroy');
			}else{
				alerts(err);
			}
		}
	});


}
/*
 *
 *  FUNCTION NAME : saveNewDeviceInfo
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function saveNewDeviceInfo(val,attr){
	GlobalSlotID = 0;
	GlobalPortIP = 0;	
	var structure = $("#dropdownstruction").val();
	var portinfo = devPortInfoArray[0]
	var conDevPortInfo = checkEmptyField(); // checks if there is an emtyfield on the devPPortInfoArray
	if(portinfo==undefined || conDevPortInfo.condition == true){
		var msg = "Please complete information.";
		if (conDevPortInfo.list != ""){
			msg += "</br>Ports : <br/>"+conDevPortInfo.list;
		}
		alerts(msg);	
		return 0;
	}else{
		var model = "";
		if(document.getElementById("labelmodel").style.display=="none"){
			model = $("#newdevmodel").val();
		}else{
			model = $("#newdevmodel1").val();
		}
		var hostname = $("#newhostnameid").val();
		var managementip = $("#newdevmanagementip").val();
		var consoleip = $("#newdevconsoleip").val();
		var checkhost = checkNewDeviceHostName(model,hostname,managementip,consoleip,attr);//Need to check this
		//alerts(checkhost);return 0;	
		var dom = $("#dropdowndomain").val();
		var str = setNewDevicesNode();
		if(GlobalNewDevice!=[]){
			saveNewManualDeviceInfo();	
		}
		return str;
	}
}
/*
 *
 *  FUNCTION NAME : checkEmptyField()
 *  AUTHOR        : marlo agapay
 *  DATE          : March 22, 2014 :)
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkEmptyField(){
	var ifEmpty = false;
	var str ="";
	for (var q=0; q<arrSlotCount.length; q++){
		if(arrSlotCount[q].Value == "")
			ifEmpty = true;
	}
	for(var w=0; w<arrModuleCount.length; w++){
		if(arrModuleCount[w].Value == "")		
			ifEmpty = true;
	}
	for (var a=0; a<devPortInfoArray.length; a++){
		var media = devPortInfoArray[a].MediaType;
		var phost = devPortInfoArray[a].PartnerHostname;
		var pip = devPortInfoArray[a].PartnePortInfo;
		var pslot = devPortInfoArray[a].PartnerSlot;
		var portid = devPortInfoArray[a].PortId;
		var pname = devPortInfoArray[a].PortName;
		var ptypeInf = devPortInfoArray[a].PortTypeInfo;
		if (media == "" || ptypeInf == ""){
			str +="Port : "+portid+"<br/>";
			ifEmpty = true;
		}	
	}
	return ({condition : ifEmpty, list : str});
}
/*---kmmabignay - mar19----*/
function propChecked(key,flag){
	window['variable"+key+"Check'+pageCanvas] = flag;
}
/*-----------------------------------*/
/*---kmmabignay - mar19----*/
function changePageWithTimeout(page,key,flag){
    setTimeout(function(){
		$.mobile.changePage($('#'+page),{
			changeHash:true,
			transition:'pop'
		});
    },350);
	$('#'+page).on('pageshow',function(){
		$('#'+key).prop('checked',flag).checkboxradio('refresh');
	});
}
/*-----------------------------------*/

/*
 * 
 *  FUNCTION NAME : drawMapImage
 *  AUTHOR        : Apple Kem E. Eguia
 *  DATE          : March 19, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */
function drawMapImage(){
	var tdw = $('#tdCanv').css("width").split("px")[0];
	var tdh = $('#tdCanv').css("height").split("px")[0];

	var mapLinkStage = new Kinetic.Stage({
		container: 'linkCon',
		width: 150,
		height: tdh 
    });
    var mapLinkLayer = new Kinetic.Layer({
		width: 150,
		height: tdh 	
	});
	var portImgObj = new Image();
	portImgObj.src = 'img/active.gif';
	var posy = 0;
	var posx = 0;
	var y = 0;
	var y2 = 0;
	var finaly = 0;
	var ctr = 0;
	var imgId = "";
	var mapXpos = "";
	var mapYpos = "";
	var dev2 = "";
	var mapLine = "";
	
	portImgObj.onload = function (){
		for (var i=0;i<window['variable' + dynamicManagePortArr[pageCanvas]].length;i++){
			var pos = window['variable' + dynamicManagePortArr[pageCanvas]][i].Position;
			if (pos == 'left'){
				posx = 15;
				if (y == ""){
					posy = 5;
					y = posy;
					finaly = y;
				}else{
					y += 26;
					finaly = y;
				}
			}else{
				posx = 75;
				if (y2 == ""){
					posy = 5;
					y2 = posy;
					finaly = y2;
				}else{
					y2 += 26;
					finaly = y2;
				}
			}
			var info = [];
			var portImg = new Kinetic.Image({
				id: window['variable' + dynamicManagePortArr[pageCanvas]][i].ObjectPath,
				x: posx,
				y: finaly,
				image: portImgObj,
				width: portImgObj.width - 5,
				height: portImgObj.height - 5
			});
			
			mapLinkLayer.add(portImg);
			portImg.on('mouseup touchend', function(){
				ctr++;
				if (ctr == 1){
					imgId = this.getAttr('id');
					mapXpos = this.getPosition().x;
					mapYpos = this.getPosition().y;
					dev1 = imgId.split(".")[0];
				}
				if (ctr == 2){
					var imgId2 = this.getAttr('id');
					var imgXpos2 = this.getPosition().x;
					var imgYpos2 = this.getPosition().y;
					var dev2 = imgId2.split(".")[0];
					if (dev1 != dev2){
						var maperror = checkMapInfo(imgId,imgId2);
					}else{
						var maperror = 0;
						portMapInfo = [];
						ctr = 0;
						return;
					}

					if (maperror == 1){
						mapXpos = parseInt(mapXpos) + 7.5;
						mapYpos = parseInt(mapYpos) + 7.5;
						imgXpos2 = parseInt(imgXpos2) + 7.5;
						imgYpos2 = parseInt(imgYpos2) + 7.5;
						portMapInfo.push({Destination:imgId,Source:imgId2,X:mapXpos,Y:mapYpos,X2:imgXpos2,Y2:imgYpos2});
						mapLine = new Kinetic.Line({
					        points: [mapXpos, mapYpos, imgXpos2, imgYpos2],
					        stroke: 'black',
					        strokeWidth: 3,
					        lineCap: 'round',
					        lineJoin: 'round',
					        Destination: imgId,
					        Source: imgId2,
							id: imgId+"^"+imgId2
					    });
						mapLinkLayer.add(mapLine);
						mapLine.on('mouseover', function(){
							lineId = this.getAttr('id');
							var touchPos = mapLinkStage.getPointerPosition();
				        	var imgXpos2 = touchPos.x+40;
			    	    	var imgYpos2 = touchPos.y+50;
							var text = createMapToolTip(lineId,'line');
			
							$('#linkConToolTip').css({
								background : '#DFEFF0',
								'border-radius' : '5px',	
								border: '1px solid #555',	
								padding : '5px',	
								'max-width': '200px',
								'font-size' : '10px',
								'font-family': 'Arial',
					        	position:'absolute',
					       	});
							var mTop = imgYpos+50;
							if (globalDeviceType =="Mobile"){
								$('#linkConToolTip').css({
									top :mTop,
					   				left:imgXpos+50
					        	});
							}else{
								$('#linkConToolTip').css({
									top : imgYpos+50,
					   				left:imgXpos+50
					        	});
			
							}
					        $('#linkConToolTip').empty().append(text);
							$('#linkConToolTip').show();
						});
						mapLine.on('mouseout', function(){
							$('#linkConToolTip').hide();
						});
						mapLinkStage.add(mapLinkLayer);
							
					}else{
						portMapInfo = [];
						ctr = 0;
						return;
					}
					portMapInfo = [];
					ctr = 0;
				}
			});
			portImg.on('mouseover', function(){
				imgId = this.getAttr('id');
				imgXpos = this.getPosition().x;
				imgYpos = this.getPosition().y;
				var text = createMapToolTip(imgId,'port');

				$('#linkConToolTip').css({
					background : '#DFEFF0',
					'border-radius' : '5px',	
					border: '1px solid #555',	
					padding : '5px',	
					'max-width': '200px',
					'font-size' : '10px',
					'font-family': 'Arial',
		        	position:'absolute',
		       	});
				var mTop = imgYpos+50;
				if (globalDeviceType =="Mobile"){
					$('#linkConToolTip').css({
						top :mTop,
		   				left:imgXpos+50
		        	});
				}else{
					$('#linkConToolTip').css({
						top : imgYpos+50,
		   				left:imgXpos+50
		        	});

				}
		        $('#linkConToolTip').empty().append(text);
				$('#linkConToolTip').show();
			});
			portImg.on('mouseout', function(){
				$('#linkConToolTip').hide();
			});
			
		}
		mapLinkStage.add(mapLinkLayer);
		mapLinkStage.batchDraw();	
	}
}

/*
 * 
 *  FUNCTION NAME : checkMapInfo 
 *  AUTHOR        : Apple Kem E. Eguia
 *  DATE          : March 22, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */

function checkMapInfo(objPathA,objPathB){
	var infoA = new Array();
	var infoB = new Array();
	for(var a = 0; a < window['variable' + dynamicManagePortArr[pageCanvas]].length; a++){
		var objPath = window['variable' + dynamicManagePortArr[pageCanvas]][a].ObjectPath;
		if (objPath == objPathA){	
			infoA.push({Speed:window['variable' + dynamicManagePortArr[pageCanvas]][a].Speed,Type:window['variable' + dynamicManagePortArr[pageCanvas]][a].PortType,SwitchInfo:window['variable' + dynamicManagePortArr[pageCanvas]][a].SwitchInfo});
		}
		if (objPath == objPathB){
			infoB.push({Speed:window['variable' + dynamicManagePortArr[pageCanvas]][a].Speed,Type:window['variable' + dynamicManagePortArr[pageCanvas]][a].PortType,SwitchInfo:window['variable' + dynamicManagePortArr[pageCanvas]][a].SwitchInfo});
		}
		
	}
	if (infoA[0].Type == infoB[0].Type){
		//L1
		if (infoA[0].Type == 'L1' && infoB[0].Type == 'L1'){ //check if both L1 
			if (infoA[0].Speed == infoB[0].Speed){ //check if it has the same speed
				if (infoA[0].SwitchInfo.split(".")[0] == infoB[0].SwitchInfo.split(".")[0]){ // check if switch info is the same
					return 1;
				}else{
					return 0;
				}
			}else{
				return 0;
			}
		}else{
			return 0;
		}
		
		//L2
		if (infoA[0].Type == 'L2' && infoB[0].Type == 'L2'){ //check if both L2
			if (infoA[0].SwitchInfo.split(".")[0] == infoB[0].SwitchInfo.split(".")[0]){ // check if switch info is the same
				return 1;
			}else{
				return 0;
			}
		}else{
			return 0;
		}
		if (infoA[0].Type == 'Open' && infoB[0].Type == 'Open'){
			return 0;
		}
	}else{
		return 0;
	}
}
/*
 *
 *  FUNCTION NAME : sanityQuery2
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 20, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function sanityQuery2(type){
	if(globalDeviceType == "Mobile"){
		loading("show");
	}
	if(globalInfoType == "XML"){	
		var url = getURL("ConfigEditor")+"action=checkdevicestatus&query=resourceid="+window['variable' + dynamicResourceId[pageCanvas] ]+"^user="+globalUserName+"^feature="+type+"^result=true";
	}else{
		var url = getURL("ConfigEditor","JSON")+'action=checkdevicestatus&query={"TOPOLOGY":[{"resourceid": "'+window['variable' + dynamicResourceId[pageCanvas]]+'", "user": "'+globalUserName+'", "feature": "'+type+'", "result":"true"}]}';
	}
	$.ajax({
		url: url,
		dataType: 'html',
		proccessData: false,
		success: function(data) {
			if(globalDeviceType == "Mobile"){
				loading("hide");
			}
			data = $.trim(data);
			var returnflag = false;
			if(globalInfoType == "JSON"){
				var data2 = data.replace(/'/g,'"');
				var b = $.parseJSON(data2);
				if(b.RESULT[0].Result){
					var alertret = b.RESULT[0].Result;
					if(alertret.match(/Alert/gi) != null){
						returnflag = true;
						alertUser(b.RESULT[0].Result);
						return;
					}else if(alertret == 1 || alertret == '1'){
						returnflag = false;
                	}else{
						returnflag = true;
						alertUser("Process Completed");
						return;
					}
				}
				if(returnflag == false){
					if(globalDeviceType != "Mobile"){
						sanityResultTable();
					}else{
						deviceConfigStat();
					}
				}
			}
		}
	});
}
/*
 *
 *  FUNCTION NAME : devSanityFail
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 21, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function devSanityFail(yesno){
	var devSanF = $("#devsancb").is(":checked");
	if(yesno == "yes"){
		sendUpdateContFlag('continue');
		var devFlag = false;
		devSanXML2(devFlag);
	}else if(yesno == "no"){
		if(devSanF.toString == "true"){
			sendUpdateContFlag('stop');
			closePopUp('sanity');
			cancelReservation();
			return;
		}else{
			sendUpdateContFlag('stop');
			closePopUp('sanity');
			return;
		}
	}
}	

/*---kmmabignay - mar21------------*/
function onClickEditConfigName(valKey){
	var curName = $("#configText").val();
	if(valKey=="SAVE"){
		addEvent2History("Save Configuration Name"); //add event to history
		$("#editConfigNameBtn").attr("value","EDIT");
		globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Name = curName;
		$("#configText").attr("disabled",true);
	}else{
		addEvent2History("Edit Configuration Name"); //add event to history
		$("#editConfigNameBtn").attr("value","SAVE");
		$("#configText").attr("disabled",false);
	}
}
/*---kmmabignay - mar21------------*/
function addEvent2History(msg){
	window['variableHistory'+pageCanvas].push(msg);
	addHistory();	
}
/*------------------------------*/

/*
 * 
 *  FUNCTION NAME : createMapLine 
 *  AUTHOR        : Apple Kem E. Eguia
 *  DATE          : March 21, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */
function createMapLine(){
	var pointX = portMapInfo[0].X;
	var pointY = portMapInfo[0].Y;
	var pointX2 = portMapInfo[0].X2;
	var pointY2 = portMapInfo[0].Y2;
	var mapLine = new Kinetic.Line({
		points: [pointX, pointY, pointX2, pointY2],
		stroke: 'black',
		strokeWidth: 3,
		lineCap: 'round',
		lineJoin: 'round',
		Destination: portMapInfo[0].Destination,
		Source: portMapInfo[0].Source
	});
	return mapLine;
}

/*----kmmabigny----mar22----*/
function validateInputs(devArr,detailedFlag,option,type){
	var optLower = option.toLowerCase(); 
    var errHost = new Array();
	var regPatt = /^[a-z|A-Z][0-9|a-z|\-|\_|A-Z|\.]+$/;
	var patt = /^disk[0-2]|disk$|^flash[0-1]|flash$|^slot[0-1]|^NVRAM$|^FTP$/i;
	for(var a=0; a<devArr.length; a++){
		var urlVal = $('#tb'+option+type+'URL'+devArr[a]).val();
		var urlDesti = $('#tb'+option+type+'Destination'+devArr[a]).val();
		var protoVal = $('#tb'+option+type+'DetailProtocol'+devArr[a]).val();
		var ipVal = $('#tb'+option+type+'DetailIp'+devArr[a]).val();
		var pathVal = $('#tb'+option+type+'DetailPath'+devArr[a]).val();
		var fnameVal = $('#tb'+option+type+'DetailFilename'+devArr[a]).val();
		var destVal = $('#tb'+option+type+'DetailDestination'+devArr[a]).val();
		var host = $('#tr'+optLower+type+devArr[a]).find('td').eq(1).text();
		if(!detailedFlag && urlVal==""
		|| !detailedFlag && urlVal!="" && urlVal.split(':').length!=2
		|| detailedFlag && path=="" && fname==""
		|| detailedFlag && ipVal!="" && checkIP(ipVal)
		|| detailedFlag && pathVal!="" && patt.test(pathVal)==false
		|| detailedFlag && fnameVal!="" && patt.test(fnameVal)==false
		|| detailedFlag && protoVal!="" && /^FTP$/i.test(protoVal)==false){
			errHost.push(host);
		}
		if(!detailedFlag && urlVal!="" && urlVal.split(':').length==2){
			var urlsp = urlVal.split(':')[0];
			if(patt.test(urlsp)==false){ errHost.push(host); }
			if(/^FTP$/i.test(urlsp)){
				var urlsp2 = urlVal.split("://")[1].split("/");
			}else if(urlVal.split(":/")[1]!=undefined){
				var urlsp2 = urlVal.split(":/")[1].split("/");
			}else{
				var urlsp2 = urlVal.split(":")[1].split("/");
			}
			for(var x=0; x<urlsp2.length; x++){
				if(regPatt.test(urlsp2[x])==false){ errHost.push(host); }
			}
		}
		if(!detailedFlag && urlVal!="" && option=="Load"){
			var url = urlVal.split(':')[0];
			if(url==urlDesti){ errHost.push(host); }
		}
		if(detailedFlag && pathVal!="" && option=="Load"){
			if(pathVal==destVal){ errHost.push(host); }
		}
	}
	var errMsg = "";
	if(errHost.length > 0){
        errMsg = "Invalid "+type+" URL for the following device(s): <br/>";
		errMsg += errHost.join(',')+"<br/>";
		errMsg += "(sample: TFTP://"+CURRENT_IP+"/Directory/FileName or disk0:FileName)<br/>";
	}
	return errMsg;
}
/*-----------------------------------------------*/



/*
 *
 *  FUNCTION NAME : devSanXML2
 *  AUTHOR        : Clarice Salanda
 *  DATE          : March 22, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function devSanXML2(devFlag){
	if(autoTriggerTab.toString() == "true"){
		if(devFlag == true){
			checkFromSanity = "true";
			$('#liDevSan a').trigger('click');
		}else if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity.toString() == "true" && accSanFlag.toString() == "false"){
			accSanFlag = "true";
			checkFromSanity = "true";
			$('#liAccSan a').trigger('click');
		}else if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString() == "true" && connSanFlag.toString() == "false"){
			checkFromSanity = "true";
			connSanFlag = "true";
			$('#liConn a').trigger('click');
		}else if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "true" && linkSanFlag.toString() == "false"){
			checkFromSanity = "true";
			linkSanFlag = "true";
			$('#liLinkSan a').trigger('click');	
		}else if(devFlag == false && globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "true" && enableFlagSan.toString() == "false"){
			checkFromSanity = "true";
			enableFlagSan = "true";
			$('#liEnaInt a').trigger('click');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString()== "true" && devFlag == false && LoadImageFlag.toString() == "false"){
			checkFromSanity = "true";
			LoadImageFlag = "true";
			$('#liLoadImg a').trigger('click');
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString()== "true" && devFlag == false && LoadConfigFlag.toString() == "false"){
			checkFromSanity = "true";
			LoadConfigFlag = "true";
			$('#liLoadConf a').trigger('click');
		}
	}else{
		if(devFlag == true){
			autoTrigger('deviceSanity');
		}
	}
	return;		
}
/*
 *
 *  FUNCTION NAME : checkhostipaddress
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 21, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkHostIpaddress(val){
	var ipadd = GlobalMapPort.MAINCONFIG[0].DEVICE	
	var slot = "";
	var newslot = "";
	var slotnumber = "";
	for (var a=0; a<ipadd.length; a++){
		host = ipadd[a].HostName
		var ip = ipadd[a].IpAddress
		if(val == host){
			$("#partneripaddress").val(ip);
			slot = ipadd[a].SLOT
			for (var x=0; x<ipadd[a].SLOT.length; x++){
				newslot = ipadd[a].SLOT[x].Number;
				slotnumber += "<option value='"+newslot+"'>"+newslot+"</option>"
				$("#partnerslot").empty().append(slotnumber);
			}
			break
		}
	}
}
/*
 *
 *  FUNCTION NAME : checkSlotPortNumber
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 21, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkSlotPortNumber(){
	var ipadd = GlobalMapPort.MAINCONFIG[0].DEVICE	
	var slot = "";
	var newslot = "";
	var slotnumber = $("#partnerslot").val();
	var ports = "";
	var port = "";
	var portid = "";
	var val = $("#partnerhostname").val();
	for (var a=0; a<ipadd.length; a++){
		host = ipadd[a].HostName
		var ip = ipadd[a].IpAddress
		if(val == host){
			for (var x=0; x<ipadd[a].SLOT.length; x++){
				newslot = ipadd[a].SLOT[x].Number;
				if(slotnumber==newslot){
					for (var z=0; z<ipadd[a].SLOT[x].PORT.length; z++){
						port = ipadd[a].SLOT[x].PORT[z].PortName
						portid = ipadd[a].SLOT[x].PORT[z].PortId
						ports += "<option value='"+port+"_"+portid+"'>"+port+"</option>"	
					}
					$("#partnerportinfo").empty().append(ports);
				}
			}
			break
		}
	}
}
/*
 *
 *  FUNCTION NAME : sendUpdateContFlag
 *  AUTHOR        : Clarice A. Salanda
 *  DATE          : March 23, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function sendUpdateContFlag(flag){
	var url = getURL("ConfigEditor","JSON")+'?action=updateContinueFlag&query={"TOPOLOGY":[{"resourceid": "'+window['variable' + dynamicResourceId[pageCanvas]]+'", "flag": "'+flag+'"}]}';	
	$.ajax({
		url: url,
		dataType: 'html',
		proccessData: false,
		success: function(data) {
			data = $.trim(data);
			var data2 = data.replace(/'/g,'"');
			var b = $.parseJSON(data2);
			if(b.RESULT){
				var alertret = b.RESULT[0].Result;
				if(alertret.match(/Alert/gi) != null){
					alertUser(b.RESULT[0].Result);
					return;
               	}else if(alertret == 1 || alertret == '1'){
					return;
				}
			}
		}
	});
}
/*
 *
 *  FUNCTION NAME : checkNewDeviceHostName
 *  AUTHOR        : Krisfen G. Ducao
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkNewDeviceHostName(model,hostname,managementip,consoleip,attr){
	var query = "{'QUERY':[{'User':'"+globalUserName+"','DomainName':'"+window['variable' + dynamicDomain[pageCanvas] ]+"','HostName':'"+hostname+"','Model':'"+model+"','ManagementIp':'"+managementip+"','ConsoleIp':'"+consoleip+"','Server':'"+attr+"'}]}"
	$.ajax({
		url: getURL("ConfigEditor","JSON"),
		data : {
			"action": "checkhostname",
			"query":query,
		},
		dataType: 'html',
		method: 'POST',
		proccessData: false,
		success: function(data) {
			//var dat = data.replace(/'/g,'"'); 
			//var dat2 = $.parseJSON(dat);
			//var ret =da2.RESULT[0].Result
			if(data){
				return data;
			}else{
				alerts(ret);
			}
		}
	});
}

/*
 * 
 *  FUNCTION NAME : createMapDevToolTip
 *  AUTHOR        : Apple Kem E. Eguia
 *  DATE          : March 25, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : imgId,act
 * 
 */
function createMapToolTip(imgId,act){
	var myText = "";
	switch(act){
		case 'port':
			var prtArr = new Array();
			if(globalInfoType == "JSON"){
		        var devices = getDevicesNodeJSON();
				for(var s=0;s < devices.length; s++){
		            prtArr = getDeviceChildPort(devices[s],prtArr);
		        }
		    }else{
		         var prtArr = portArr;
		    }
			for(var i = 0; i  < prtArr.length; i++){ // checks if the hitted object is equal to the array
				if(prtArr[i].ObjectPath == imgId){ 
					myText += "Port Name: " + prtArr[i].PortName;
					
					var switchInfo = prtArr[i].SwitchInfo ? prtArr[i].SwitchInfo : 'N/A';
					myText += "<br/>Switch Info: " + switchInfo;
				}
			}
		break;
		case 'line':
			var prtArr = new Array();
			var ports = imgId.split('^');
			if(globalInfoType == "JSON"){
		        var devices = getDevicesNodeJSON();
				for(var s=0;s < devices.length; s++){
		            prtArr = getDeviceChildPort(devices[s],prtArr);
		        }
		    }else{
		         var prtArr = portArr;
		    }
			for (var a=0; a<ports.length;a++){
				for(var i = 0; i  < prtArr.length; i++){ // checks if the hitted object is equal to the array
					if(prtArr[i].ObjectPath == ports[a]){ 
						var ctr = a+1;
						myText += "Port "+ctr+": " + prtArr[i].PortName;
						var switchInfo = prtArr[i].SwitchInfo ? prtArr[i].SwitchInfo : 'N/A';
						myText += "<br/>Switch Info "+ctr+": " + switchInfo;
						if (ctr != ports.length){
							myText += "<br/><br/>";
						}
					}
				}
			}
		break;
	}
	return myText;
}
/*
 *
 *  FUNCTION NAME : configImageQuery
 *  AUTHOR        :	Clarice A. Salanda
 *  DATE          : March 11, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function checkLoadActive(src,id,platform){
	if(platform == "html5"){
	$("#ActiveTable > tbody >tr").each(function(){
		if($(this).attr("rId") != id){
			var ids = $(this).attr('rId');
			$(this).removeClass('highlight');
			$('#cb'+ids).prop('checked',false);
//			$("#LoadActiveButton").attr('disabled',true);
		}else{
			var ids = $(this).attr('rId');
			var strt = $(this).attr('sdate').split(" ");
            var edte = $(this).attr('edate').split(" ");
            globalLAdate = strt+','+edte;
			globalLArId = ids;
			$(this).addClass('highlight');
			$("#LoadActiveButton").attr('disabled',false);
		}
	});
	}else{
		$(".trSelected").on("click",function(){
           if($(this).hasClass('highlight') == false){
                globalLArId = $(this).attr('rId');
                var strt = $(this).attr('sdate').split(" ");
                var edte = $(this).attr('edate').split(" ");
                globalLAdate = strt+','+edte;
                $(this).addClass('highlight');
                if(globalLArId){ unChkTrClss(globalLArId); }
            }else{
                $(this).removeClass('highlight');
            }
         });
	}
}
/*
 *
 *  FUNCTION NAME : unChkTrClss
 *  AUTHOR        :	James Turingan
 *  DATE          : March 25, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function unChkTrClss(id){
    $("#ActiveTable > tbody >tr").each(function(){
          if($(this).attr("rId") != id){
               $(this).removeClass('highlight');
          }
     });
}
/*
 *
 *  FUNCTION NAME : configImageQuery
 *  AUTHOR        :	Clarice A. Salanda
 *  DATE          : March 11, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function configImageQuery(type){
	if(globalDeviceType == "Mobile"){
		loading("show","Processing information...");
	}
	var url = getURL("ConfigEditor","JSON")+'action=checkdevicestatus&query={"TOPOLOGY":[{"ResourceId": "'+window['variable' + dynamicResourceId[pageCanvas]]+'", "user": "'+globalUserName+'", "feature": "'+type+'", "result":"true"}]}';
	$.ajax({
		url: url,
		dataType: 'html',
		proccessData: false,
		success: function(data) {
			if(globalDeviceType == "Mobile"){
				loading("hide");
			}
			data = $.trim(data);
			var returnflag = false;
			if(globalInfoType == "JSON"){
				var data2 = data.replace(/'/g,'"');
				var b = $.parseJSON(data2);
				if(b.RESULT[0].Result){
					var alertret = b.RESULT[0].Result;
					if(alertret.match(/Alert/gi) != null){
						returnflag = true;
						alertUser(b.RESULT[0].Result);
						return;
                	}else if(alertret == 1 || alertret == '1'){
						returnflag = false;
					}else{
						returnflag = true;
						alertUser("Process Completed");
						return;
					}
				}
			}
			if(returnflag == false){
				if(type == 'loadImage'){
					LoadImageFlag = "true";
					loadImgData(data);
				}else if(type == 'loadConfig'){
					LoadConfigFlag = "true";
					loadConfigData(data);
				}else if(type == 'saveImage'){
					saveImgData(data);
				}else if(type == 'saveConfig'){
					saveConfigData(data);
				}
			}
			if(data.match(/Alert/gi) != null){
				window['variable' + SanityFlag[pageCanvas] ] = false;
				alerts(data);
				if(globalDeviceType=="Mobile"){
					error(data,"Notification");
                } 
			}
		}
	});
	if(globalDeviceType == "Mobile"){
		$(".ui-dialog").position({
			 my: "center",
	  		at: "center",
	  	 	 of: window
		});
	}

}
/*-------------------------------------------------------*/
/*
 *
 *  FUNCTION NAME : openConsoleDevice
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : open console for specific device
 *  PARAMETERS    : device
 *
 */
function openConsoleDevice(){
	if(glblDevMenImg != undefined && glblDevMenImg != null){
		$('#deviceMenuPopUp').dialog('close');
	}
	if(globalInfoType == "JSON"){
		devicesArr = getDevicesNodeJSON();
	}
	if(devicesArr.length == 0){
		alerts("No devices available in the canvas.");
	}
	var myArray = new Array();
	if(glblDevMenImg != undefined && glblDevMenImg != null){
		var devArray = new Array()
		for(var t=0; t<devicesArr.length; t++){
			if(devicesArr[t].ObjectPath == glblDevMenImg){
				devArray.push(devicesArr[t]);
				break;
			}
		}
		glblDevMenImg = null;
		devicesArr = devArray;
	}
	devicesArr = getAllServerAndDutCommitted(devicesArr);
	if(devicesArr.length == 0){
		alerts("Devices in the canvas are not allowed to open a console.");
	}else if(devicesArr.length == 1){
		var type = "Telnet";
		if(devicesArr[0].DeviceType == "Server"){
			type = "SSH";
		}
		myArray.push({
			DeviceId:devicesArr[0].DeviceResId,
			DeviceName: devicesArr[0].DeviceName,	
			Type: type,	
			SessionId:''	
		});	
		showDevicetoSelect(devicesArr,myArray);
		//loadOpenConsole(myArray,devicesArr);
	}else if(devicesArr.length > 1){
		for(var t=0; t<devicesArr.length; t++){
			var type = "Telnet";
			if(devicesArr[t].DeviceType == "Server"){
				type = "SSH";
			}
			myArray.push({
				DeviceId:devicesArr[t].DeviceResId,
				DeviceName: devicesArr[t].DeviceName,	
				Type: type,
				SessionId:''	
			});	
		}
		showDevicetoSelect(devicesArr,myArray);
	}
}
/*
 *FUNCTION NAME : showDevicetoSelect
 *AUTHOR        : Juvindle C Tina
 *DATE          : March 26, 2013
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #     :
 *DESCRIPTION   : show pop-up with table
 *PARAMETERS    : devicesArr,myArray
*/
function showDevicetoSelect(devicesArr,myArray){
	validDevices = devicesArr;
	validSessionDevices = myArray;
	$( "#openConsoleSelect" ).dialog({
		modal: true,
		autoResize:true,
		width: "60%",
		height: "auto"
	});
	$( "#openConsoleSelect" ).dialog("open");
	$( "#openConsoleSelect" ).empty().load('pages/ConfigEditor/selectOpenConsole.html',function(){
		$('span.ui-dialog-title').text('Open Console');
		$('.ui-dialog-title').css({'margin-left':'14px','margin-top':'7px','text-align':'center'});
		$('#showOpenconsoleDiv div[role="dialog"]').css({"max-width":"80%"});
		var str = "";
		for(var t=0; t<devicesArr.length ; t++){
			var mgtip = devicesArr[t].ManagementIp;
			var conIp = devicesArr[t].ConsoleIp;
			var model = devicesArr[t].Model;
			var devname = devicesArr[t].DeviceName;
			var devresid = devicesArr[t].DeviceResId;
			if(devname != ""){
				if(devicesArr.length == 1){
					str += "<tr><td class='defaultGrid'><input class='openSelectedDevice' type='checkbox' checked='true' did='"+devresid+"' onclick='enableSelection(this,\""+devresid+"\");' did='"+devresid+"'/></td>";
				}else{
					str += "<tr><td class='defaultGrid'><input class='openSelectedDevice' type='checkbox' did='"+devresid+"' onclick='enableSelection(this,\""+devresid+"\");' did='"+devresid+"'/></td>";
				}
				str += "<td class='defaultGrid'>"+devname+"</td>";
				str += "<td class='defaultGrid'>"+mgtip+"</td>";
				str += "<td class='defaultGrid'>"+conIp+"</td>";
				str += "<td class='defaultGrid'>"+model+"</td>";
				str += "<td class='defaultGrid' style='width:20%'>";
				if(devicesArr.length == 1){
					str += "<select id='open_"+devresid+"'>";
				}else{
					str += "<select id='open_"+devresid+"' disabled>";
				}
				str += "<option value='Telnet'> Telnet </option>";
				str += "<option value='SSH'> SSH </option>";
				str += "<option value='SSL'> SSL </option></select></td></tr>";
			}	
		}
		$('.openSelectedDevice').trigger('click');
		$('#selectAllConsole').trigger('click');
		if(devicesArr.length == 1){
        	$("#selectAllConsole").attr("checked",true);
		}else{
        	$("#selectAllConsole").attr("checked",false);
		}
		$('#showOpenconsoleTable > tbody').empty().append(str)
		setTimeout(function(){
			enableSelection("","");
		},500);
	});
}
/*
 *
 *  FUNCTION NAME : enableSelection
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : enable/disable selection session type
 *  PARAMETERS    : src,deviceresid
 *
 */
function enableSelection(src,deviceresid){
	if(src != ""){
		var cnt2 = 0;
		var cnt = 0;
		$('.openSelectedDevice').each(function(){
			var did = $(this).attr('did');
			if($(this).is(':checked')){
				cnt++;
				$('#open_'+did).removeAttr("disabled");
			}else{
				$('#open_'+did).attr("disabled",true);
			}
			cnt2++;
		});
		if(cnt == cnt2 && cnt != 0){
			$('#selectAllConsole').prop('checked',true);
		}else{
			$('#selectAllConsole').prop('checked',false);
		}
	}
}
/*
 *
 *  FUNCTION NAME : selectDataforOpenConsole
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get selected data of the selected device 
 *  PARAMETERS    : 
 *
 */
function selectDataforOpenConsole(id){
	var linkArray = new Array();
	$('.openSelectedDevice').each(function(){
		if($(this).is(':checked')){
			var did = $(this).attr('did');
			var id = $(this).attr('did') + "::" + $('#open_'+did).val();
			linkArray.push(id);
		}
	});
	if(linkArray.length == 0){
		alerts("Please select one entry.");
		return;
	}
	var mayArray = new Array();
	for(var f=0; f<validSessionDevices.length; f++){
		var flag = false;
		for(var t=0; t<linkArray.length; t++){
			var mydata = linkArray[t].split("::");
			if(mydata[0] == validSessionDevices[f].DeviceId){
				validSessionDevices[f].Type = mydata[1];
				flag = true;
				break;
			}
		}
		if(flag){
			mayArray.push(validSessionDevices[f]);
		}
	}
	var mayArray2 = new Array();
	for(var f=0; f<validDevices.length; f++){
		var flag = false;
		for(var t=0; t<linkArray.length; t++){
			var mydata = linkArray[t].split("::");
			if(mydata[0] == validDevices[f].DeviceId){
				flag = true;
				break;
			}
		}
		if(flag){
			mayArray2.push(validDevices[f]);
		}
	}
	$('#'+id).empty();
	closeDialog(id);
	loadOpenConsole(mayArray,mayArray2);
}

/*
 *FUNCTION NAME : loadOpenConsole()
 *AUTHOR        :Mary Grace P. Delos Reyes
 *DATE          :March 18, 2014
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #     :
 *DESCRIPTION   :
 *PARAMETERS    :
*/
function loadOpenConsole(device,devicesArr){
	var devicesStr = deviceQstr(device); 
 	var url = getURL('Console') + "action=sessionIdCreator&query={'MAINCONFIG': [{'UserName': '"+globalUserName+"','ResourceId': '"+globalMAINCONFIG[pageCanvas].MAINCONFIG[0].ResourceId+"','To': '','DEVICE' : "+devicesStr + "}]}";
    $.ajax({
        url: url,
        dataType: 'html',
        method: 'POST',
        proccessData: false,
        async:false,
        success: function(data) {
        	data = $.trim(data);
			checkdataForConsole(device,devicesArr,data);  
		}
    });
}

/*
 *FUNCTION NAME : checkdataForConsole
 *AUTHOR        : Juvindle C Tina
 *DATE          : March 26, 2014
 *MODIFIED BY   :
 *REVISON  DATE :
 *REVISON #     :
 *DESCRIPTION   : check data for open console
 *PARAMETERS    :
*/
function checkdataForConsole(device,devicesArr,data){
	data = data.replace(/'/g,'"');
	var json = jQuery.parseJSON(data);
	var mainconfig = json.MAINCONFIG[0];
	if(mainconfig.PASS != null && mainconfig.PASS != undefined && mainconfig.FAILED != null && mainconfig.FAILED != undefined){
		var messageArray = new Array();
		var devArray = [];
		var devIdArray = [];
		for(var f=0; f<mainconfig.FAILED.length; f++){
			var devId = mainconfig.FAILED[f].DeviceId;
			var message = mainconfig.FAILED[f].Message;
			var flag = false;
			for(var t=0; t<device.length; t++){
				if(devId == device[t].DeviceId){
					device.splice(t,1);
					flag = true;
					break;
				}
			}
			if(!flag){
				if ($.inArray(devId,devIdArray) == -1) {
					devIdArray.push(devId);
				}					
			}
			if ($.inArray(message,messageArray) == -1) {
				messageArray.push(message);
			}					
				
		}
		for(var f=0; f<mainconfig.PASS.length; f++){
			var sessionid = mainconfig.PASS[f].SessionId;
			var devId = mainconfig.PASS[f].DeviceId;
			for(var t=0; t<device.length; t++){
				if(devId == device[t].DeviceId){
					device[t].SessionId = sessionid;
				}
			}
		}
		if(messageArray.length){
			var msg = messageArray.join("") + ".Do you still want to continue?";
			alerts(msg,"showConsolePopUp(device,devicesArr)","console");
			return;
		}
	}else if(mainconfig.PASS != null && mainconfig.PASS != undefined){
		for(var f=0; f<mainconfig.PASS.length; f++){
			var sessionid = mainconfig.PASS[f].SessionId;
			var devId = mainconfig.PASS[f].DeviceId;
			for(var t=0; t<device.length; t++){
				if(devId == device[t].DeviceId){
					device[t].SessionId = sessionid;
				}
			}
		}
		showConsolePopUp(device,devicesArr);
	}else if(mainconfig.FAILED != null && mainconfig.FAILED != undefined){
		var messageArray = new Array();
		var devArray = [];
		var devIdArray = [];
		for(var f=0; f<mainconfig.FAILED.length; f++){
			var devId = mainconfig.FAILED[f].DeviceId;
			var message = mainconfig.FAILED[f].Message;
			if ($.inArray(message,messageArray) == -1) {
				messageArray.push(message);
			}					
				
		}
		if(messageArray.length){
			var msg = messageArray.join("");
			alerts(msg);
			return;
		}
	}
}
/*
 *
 *  FUNCTION NAME : showConsolePopUp
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : open pop-up for console 
 *  PARAMETERS    : device
 *
 */
function showConsolePopUp(device,devicesArr){
	validDevices = device;
	validSessionDevices = devicesArr;
	if(globalDeviceType == "Mobile"){
		$.mobile.changePage("OpenConsole", {
			transition: "flow",
			reverse: false,
			changeHash: true
		});
	}else{
		$( "#Console" ).dialog({
			modal: true,
			autoResize:true,
			width: "auto",
			height: "810",
			open: function(event, ui){ 
				$(".ui-dialog-titlebar-close").show();
				$(".ui-button-text").hide();
				//$('.ui-button-text').click(function(){closeButtonPopUp(); clearInterval(sentInt);});
			}
		});
		$("#Console" ).empty().load("pages/ConfigEditor/Chatbox2.html",function (event){
			$(document).on("click", ".addtogroup",function(){
				addUserToGroup();
			});	
			createDynamicTabForConsole(validDevices);
		});
	} 
}
/*
 *
 *  FUNCTION NAME : closeButtonPopUp
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 28, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : close pop-up button
 *  PARAMETERS    : 
 *
 */
function closeButtonPopUp(){
	if(validDevices.length != 0){
		var myArray = new Array();
		for(var t=0; t< validDevices.length; t++){
			var sessId = validDevices[t].SessionId;
			if ($.inArray(sessId,myArray)== -1){
				myArray.push(sessId);
			}
		}
		validDevices = [];
		validSessionDevices = [];
		$('#Console').empty();
		closeDialog("Console");
		var url = getURL('Console') + "action=cancelsession&query={'MAINCONFIG': [{'SessionId': '"+myArray.toString()+"'}]}";
    	$.ajax({
        	url: url,
	        dataType: 'html',
    	    method: 'POST',
        	proccessData: false,
	        async:false,
    	    success: function(data) {
			}
    	});

	}
}
/*
 *
 *  FUNCTION NAME : createDynamicTabForConsole
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : create dynamic tab for console
 *  PARAMETERS    : 
 *
 */
function createDynamicTabForConsole(device){
	var str = "";
	for(var t=0; t<device.length; t++){
		var sessionid = device[t].SessionId;
		var deviceid = device[t].DeviceId;
		var type = device[t].Type;
		var myid = deviceid + "__" + sessionid + "__" + type;
		if( t == 0){
			seletedSessionId = myid;
			str+="<li id='open_"+myid+"' class='ui-tabs-active ui-state-active ui-corner-top'><a id='"+myid+"' onclick='showSelectedOpenConsoleTab(this.id)' >"+device[t].DeviceName+"</a></li>";
		}else{
			str+="<li id='open_"+myid+"' class='ui-state-default ui-corner-top'><a id='"+myid+"' onclick='showSelectedOpenConsoleTab(this.id)' >"+device[t].DeviceName+"</a></li>";
		}
		seletedSessionTabArray.push(myid);
	}
	showSelectedOpenConsoleTab(seletedSessionId);
	getOnlineUsers();
	$("#ulchat").empty().append(str);
	$("#chattab").tabs();
	$("#chatTable").tabs();
	$("#userTab").tabs();
	$("#chatTable").tabs();
	clearInterval(setInt);
	globalRefresh = true;
    setInt = setInterval(function(){
        loadConsole();
       	loadChatSession();
    },10000);
}

/*
 *
 *  FUNCTION NAME : showSelectedOpenConsoleTab
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : query session of the selected device
 *  PARAMETERS    : 
 *
 */
function showSelectedOpenConsoleTab(device){
	for(var t=0; t<seletedSessionTabArray.length; t++){
		$("#open_"+seletedSessionTabArray[t]).removeClass("ui-tabs-active ui-state-active ui-corner-top");
		$("#open_"+seletedSessionTabArray[t]).addClass("ui-state-default ui-corner-top");
	}
	seletedSessionId = device;
	$("#open_"+device).removeClass("ui-state-default ui-corner-top");
	$("#open_"+device).addClass("ui-tabs-active ui-state-active ui-corner-top");
	getActiveUser();
    loadConsole();
}
/*
 *
 *  FUNCTION NAME : invitePeopleSeesion
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : invite user to join the seesion
 *  PARAMETERS    : 
 *
 */
function invitePeopleSeesion(){
	var sessionid = seletedSessionId.split("__");
	var url = getURL('Console') + "action=getUserNameForInvitation&query={'MAINCONFIG': [{'sessionId': '"+sessionid[1]+"','user':'"+globalUserName+"'}]}";
   	$.ajax({
       	url: url,
        dataType: 'html',
   	    method: 'POST',
       	proccessData: false,
        async:false,
   	    success: function(data) {
			//data = "{'MAINCONFIG':[{'UserExist':'jctina,csalanda','UsersNotExist':'rimartinez,jpmanauis'}]}";
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			var mainconfig = json.MAINCONFIG[0];
			inviteUserPopUp(mainconfig);
		}
   	});
}
/*
 *
 *  FUNCTION NAME : inviteUserPopUp
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : invite user pop-up
 *  PARAMETERS    : 
 *
 */
function inviteUserPopUp(mainconfig){
	$( "#invitePeoplePopUp").dialog({
		modal: true,
		autoResize:true,
		width: "510",
		height: "500",
		open: function(event, ui){ 
			$(".ui-dialog-titlebar-close").show();
		}
	});
	$("#invitePeoplePopUp").empty().load("pages/ConfigEditor/inviteuser.html",function (event){
		var txt= "";
		var strArr = seletedSessionId.split("__");
		for(var t=0; t<validDevices.length; t++){
			if(seletedSessionId[0] == validDevices[t].DeviceId){
				txt = validDevices[t].DeviceName;
				break;
			}
		}
		userExistArray = [];
		userNotExistArray = [];
		var userexist = mainconfig.UserExist;
		var usernotexist = mainconfig.UsersNotExist;
		if(userexist != null && userexist != undefined){
			var str = userexist.split(",");
			for(var t=0; t<str.length; t++){
				if (!checkArray(str[t],userExistArray)){
					userExistArray.push(str[t]);
				}
			}
		}
		if(usernotexist != null && usernotexist != undefined){
			var str = usernotexist.split(",");
			for(var t=0; t<str.length; t++){
				if (!checkArray(str[t],userNotExistArray)){
					userNotExistArray.push(str[t]);
				}
			}
		}
		createtableforinvitation();
	});

}
/*
 *
 *  FUNCTION NAME : createtableforinvitation
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : invite user pop-up
 *  PARAMETERS    : 
 *
 */
function createtableforinvitation(){
	var str = "<tr>";
	str+= "<td style='text-align:left;'><div id='usertobeadded' style='height:345px;width:250px;overflow:auto;'><ul>";
	for(var t=0; t<userNotExistArray.length; t++){
		if(userNotExistArray[t] != ""){
			str+="<li><input type='checkbox' style='width:20px' class='usernotexist' did='"+userNotExistArray[t]+"'/><img src='images/users.png'>  "+ userNotExistArray[t] + "</li>"; 
		}
	}
	str+= "</ul></td></div>";
	str+= "<td style='text-align:left;'><div id='addeduser' style='height:345px;width:250px;overflow:auto;'><ul>";
	for(var t=0; t<userExistArray.length; t++){
		if(userExistArray[t] != ""){
			str+="<li><input type='checkbox' style='width:20px' class='userexist' did='"+userExistArray[t]+"'/><img src='images/users.png'>  "+ userExistArray[t] + "</li>"; 
		}
	}
	str+= "</ul></td></div>";
	str+="<tr>"
	str+="<td><button id='addinvite' data-role='button' style='width:100px;' data-mini='true' class='ui-link ui-btn ui-shadow ui-corner-all ui-mini ui-last-child' role='button' data-icon='check' data-transition='pop' data-direction='reverse' onclick='removeadduser(\"add\")'>Add</button></td>"
	str+="<td><button id='removeinvite' data-role='button' style='width:100px;' data-mini='true' class='ui-link ui-btn ui-shadow ui-corner-all ui-mini ui-last-child' role='button' data-icon='check' data-transition='pop' data-direction='reverse' onclick='removeadduser(\"remove\")'>Remove</button></td>"
	str+="</tr>";
	$("#inviteUserTable > tbody").empty().append(str);	
}

/*
 *
 *  FUNCTION NAME : removeadduser
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : add / remove user from seesion
 *  PARAMETERS    : 
 *
 */
function removeadduser(level){
	if(level == "add"){
		$('.usernotexist').each(function(){
			if($(this).is(':checked')){
				var did = $(this).attr('did');
				if (checkArray(did,userNotExistArray)){
					var indx = userNotExistArray.indexOf(did);
					userNotExistArray.splice(indx,1);
				}
				if (!checkArray(did,userExistArray)){
					userExistArray.push(did);
				}
			}
		});
	}else{
		$('.userexist').each(function(){
			if($(this).is(':checked')){
				var did = $(this).attr('did');
				if (checkArray(did,userExistArray)){
					var indx = userExistArray.indexOf(did);
					userExistArray.splice(indx,1);
				}
				if (!checkArray(did,userNotExistArray)){
					userNotExistArray.push(did);
				}
			}
		});

	}
	createtableforinvitation();
}

/*
 *
 *  FUNCTION NAME : savedatainsession
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : save added user 
 *  PARAMETERS    : 
 *
 */
function savedatainsession(id){
	var addeduser = "";
	if(userExistArray.length != 0){
		for(var t=0; t<userExistArray.length; t++){
			if(t == 0){
				addeduser = userExistArray[t];
			}else{
				addeduser += ","+ userExistArray[t];
			}
		}
	}
	$('#'+id).empty();
	closeDialog(id);
	var sessionid = seletedSessionId.split("__");
	var url = getURL('Console') + "action=putConsoleInvitation&query={'MAINCONFIG': [{'user': '"+globalUserName+"','addeduser': '"+addeduser+"','sessionid': '"+sessionid[1]+"'}]}";
	console.log("url putConsoleInvitation >>>" + url);
    $.ajax({
        url: url,
        dataType: 'html',
        method: 'POST',
        proccessData: false,
        async:false,
        success: function(data) {
        	data = $.trim(data);
			getActiveUser();
		}
    });

}
/*
 *
 *  FUNCTION NAME : getActiveUser
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get active user of the session seleceted 
 *  PARAMETERS    : 
 *
 */
function getActiveUser(){
	var sessionid = seletedSessionId.split("__");
	var url = getURL('Console') + "action=getlistofuser&query={'MAINCONFIG': [{'sessionId': '"+sessionid[1]+"','user':'"+globalUserName+"'}]}";
   	$.ajax({
       	url: url,
        dataType: 'html',
   	    method: 'POST',
       	proccessData: false,
        async:false,
   	    success: function(data) {
			//data = "{'MAINCONFIG':[{'users':'jctina,csalanda','active':'jctina','creator':'jctina'}]}";
			var dat = data.replace(/'/g,'"');
		    var dat2 = $.parseJSON(dat);
			var users = dat2.MAINCONFIG[0].users;
			var active = dat2.MAINCONFIG[0].active;
			var creator = dat2.MAINCONFIG[0].creator;
			var userArr = users.split(",");
			var str = " Active User : <select id='selectActiveUser' onchange='changeActiveUser(true)' style='width:120px;' >";
			var str2 = " Active User : <span id='activeuserlabel'>";
			var ctr = 0;
			for(var t=0; t<userArr.length; t++){
				if(userArr[t] != "" && userArr[t] == active && userArr[t] != globalUserName){
					str += "<option value='"+userArr[t]+"' selected >"+userArr[t]+"</option>";
					str2 += userArr[t] + "</span>";
					ctr ++;		
				}else if(userArr[t] != "" && userArr[t] != globalUserName){
					str += "<option value='"+userArr[t]+"'>"+userArr[t]+"</option>";
					str2 += userArr[t] + "</span>";
					ctr ++;		
				}
			}
			str += "</select>";
			console.log("ctr >>>" + ctr);
			if(ctr > 1){
				$("#activeusercontainer").html(str);
			}else if(ctr != 0){
				$("#activeusercontainer").html(str2);
				if($('#enableactiveuser').is(':checked') == false){	
					$('#activeuserlabel').css('color','gray');
				}else{
					$('#activeuserlabel').css('color','black');
				}
			}
			if(creator == globalUserName && ctr > 1){
            	$("#selectActiveUser").removeAttr("disabled");
			}else if(ctr > 1){
            	$("#selectActiveUser").attr("disabled",true);
			}
			if(active == globalUserName){
            	$("#consoletext").removeAttr("disabled");
				if(userArr.length > 0 && users != "" && globalUserName == creator){
					$('#enableactiveuser').show();
				}else{
					$('#enableactiveuser').hide();
				}
			}else{
            	$("#consoletext").attr("disabled",true);
				$('#enableactiveuser').hide();
			}
		}
   	});

}

/*
 *
 *  FUNCTION NAME : changeActiveUser
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : change active user 
 *  PARAMETERS    : 
 *
 */
function changeActiveUser(flag){
	var active = "";
	if(flag == false && $('#enableactiveuser').is(':checked') == false){
		active = globalUserName;
	}else{
		active = $('#selectActiveUser').val();
		if(active == "" | active == undefined || active == null){
			active = $('#activeuserlabel').text();
		}
	}
	if(flag == false && $('#enableactiveuser').is(':checked') == false && ($('#selectActiveUser').val() == null || $('#selectActiveUser').val() == "" || $('#selectActiveUser').val() == undefined)){
		$('#activeuserlabel').css('color','gray');
	}else if(flag == false && $('#enableactiveuser').is(':checked') == false && ($('#selectActiveUser').val() != null && $('#selectActiveUser').val() != "" && $('#selectActiveUser').val() != undefined)){
        $("#selectActiveUser").removeAttr("disabled");
	}else if(flag == false && $('#enableactiveuser').is(':checked') == true && ($('#selectActiveUser').val() != null && $('#selectActiveUser').val() != "" && $('#selectActiveUser').val() != undefined)){
         $("#selectActiveUser").attr("disabled",true);
	}else if(flag == false && $('#enableactiveuser').is(':checked') == true && ($('#selectActiveUser').val() == null || $('#selectActiveUser').val() == "" || $('#selectActiveUser').val() ==  undefined)){
		$('#activeuserlabel').css('color','black');
	}
	var sessionid = seletedSessionId.split("__");
	var url = getURL('Console') + "action=changeActiveUser&query={'MAINCONFIG': [{'sessionid': '"+sessionid[1]+"','username':'"+active+"'}]}";
   	$.ajax({
       	url: url,
        dataType: 'html',
   	    method: 'POST',
       	proccessData: false,
        async:false,
   	    success: function(data) {
			getActiveUser();
		}
   	});
}

/*
 *
 *  FUNCTION NAME : checkUserNotfication
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : check notification console 
 *  PARAMETERS    : 
 *
 */
function checkUserNotfication(){
	setTimeout(function(){
		var url = getURL('Console') + "action=getnotification&query={'MAINCONFIG': [{'username':'"+globalUserName+"'}]}";
	   	$.ajax({
    	   	url: url,
        	dataType: 'html',
	   	    method: 'POST',
    	   	proccessData: false,
        	async:false,
	   	    success: function(data) {
				console.log("data >>>" + data);
				var dat = data.replace(/'/g,'"');
			    var dat2 = $.parseJSON(dat);
			    var row = dat2.MAINCONFIG[0];
				if(row != null && row != undefined && row != ""){
					var flag = row.flag;
					var count = row.count;
					if(flag == "true"){
						consoleNotificationFlag = true;
						if(count != "" && count != null && count != undefined){
							count = parseInt(count);
							if(count > 0){
								$('#countnotification').empty().append(count);
								$('#notificationConsole2').removeAttr('style');
								$('#notificationConsole').removeAttr('style');
								$('#notificationConsole').attr('style','display:none;');
							}else{
								$('#notificationConsole').removeAttr('style');
								$('#notificationConsole2').removeAttr('style');
								$('#notificationConsole2').attr('style','display:none;');
							}
						}	
					}else{
						consoleNotificationFlag = false;
						$('#notificationConsole').removeAttr('style');
						$('#notificationConsole2').removeAttr('style');
						$('#notificationConsole2').attr('style','display:none');
					}
				}
			}
   		});
	},1000);
}

/*
 *
 *  FUNCTION NAME : shownotification
 *  AUTHOR        :	Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : check notification console 
 *  PARAMETERS    : 
 *
 */
function shownotification(){
	var url = getURL('Console') + "action=getinvitationinfo&query={'MAINCONFIG': [{'username':'"+globalUserName+"'}]}";
	$.ajax({
       	url: url,
       	dataType: 'html',
 	    method: 'POST',
       	proccessData: false,
       	async:false,
	    success: function(data) {
			var dat = data.replace(/'/g,'"');
		    var dat2 = $.parseJSON(dat);
			var result = dat2.RESULT;
			if(result != null && result != undefined && result != ""){
				return;
			}
		    var row = dat2.MAINCONFIG[0];
			if(row != null && row != undefined && row != "" && row.DEVICES != "" && row.INFO != null && row.INFO != undefined && consoleNotificationFlag == true){
				var myArray = new Array();
				var myArray2 = new Array();
				for(var t=0; t<row.INFO.length; t++){
					myArray.push({
						DeviceId:row.INFO[t].DeviceId,
						DeviceName: row.INFO[t].DeviceName,	
						Type: row.INFO[t].Type,	
						SessionId: row.INFO[t].SessionId	
					});	
				}
				showConsolePopUp(myArray,myArray2);	
			}
		}
  	});
}
/*
 *
 *  FUNCTION NAME : clearCanvasHistory
 *  AUTHOR        :	Clarice A. Salanda
 *  DATE          : March 30, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : clear history 
 *  PARAMETERS    : 
 *
 */
function clearCanvasHistory(){
	window['variableHistory'+pageCanvas] = [];
	$("#historyDiv .ulDeco").html("");
	$('#clearHistory').hide();
}
