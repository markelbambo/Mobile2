var Limit = $('#PowerManagementPageLimit > option:selected').val();
var PMDeviceId = '';
/*
 *
 **
 **  FUNCTION NAME : createTreeView
 **  AUTHOR        : Juvindle C. Tina
 **  DATE          : May 23,2013
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : create tree view for power management page
 **  PARAMETERS    : data
 **
 **/
function createPMTreeView(data){
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString( data , "text/xml" );
	var device = xmlDoc.getElementsByTagName('DEVICE');
	var outlet = xmlDoc.getElementsByTagName('OUTLET');
	var str2 = "<ul id='ulOutlet'>";
	for(x=0; x<device.length; x++){
		var devName = device[x].getAttribute('HostName');
		var ip = device[x].getAttribute('ManagementIp');
		var devId = device[x].getAttribute('DeviceId');
		var deviceOCP = device[x].getAttribute('availableocp');
		if (deviceOCP != undefined && deviceOCP.toLowerCase()!="none" && deviceOCP != ''){
			var label = devName;
			if(devName == ""){
				label = ip;
			}
			str2 += "<li><a id='powerstrip_"+devId+"' did='"+ip+"' name='"+devId+"' onclick=\"showPMTable(1);PMRibbon('','"+label+"');LoadPowerController('"+ip+"');\">"+label+"</a>";
			str2 += "<ul>";
			var avin=device[x].getAttribute('availableinlet');
			if (avin !=null){
			str2 += "<li id='powerInlet'>Inlet<ul>";
				var availInlet = avin.split(",");
				for (var a =0; a<availInlet.length; a++){
					var inHdr = label+" >> Inlet";
					str2 += "<li id='powerinlet_"+devId+"_"+availInlet[a]+"' did='"+ip+"' onclick=\"showPMTable(2);PMRibbon('"+inHdr+"','"+availInlet[a]+"');LoadInlet('"+ip+"',this.id);\"><a>"+availInlet[a]+"</a></li>";
				}
			}
			str2+="</ul></li>";
			var availOCP =deviceOCP.split(",");
			for (var i=0; i<availOCP.length; i++){
				var ocp = availOCP[i];
					var str4 = "";
					str2+="<li><a id='"+devId+"' did='"+ip+"' onclick=\"PMRibbon('"+label+"','"+ocp+"');showPMTable(4);LoadOCP('"+ip+"','"+ocp+"');\">"+ocp+"</a>";
					str2+="<ul id='ulDevices"+devId+"'>";
					str4 = createOutletTreeViewOCP(outlet,ip,devId,ocp,devName,ip);
					str2+=str4;
					str2+="</ul></li>";
				}
			str2+="<li id='ocpLog"+devId+"' myname='"+devName+"' onclick=\"showPMTable(5);PMRibbon('"+label+"','Logs');LoadPDULogs('"+ip+"');\"><a>Logs</a></li>";
			str2+="</ul></li>";
		}else{

			var label = devName;
			if(devName == ""){
				label = ip;
			}
			str2 += "<li><a id='powerstrip_"+devId+"' did='"+ip+"' name='"+devId+"'onclick=\"showPMTable(1);PMRibbon('','"+label+"');LoadPowerController('"+ip+"')\">"+label+"</a>";
			str2 += "<ul>";
			var avin=device[x].getAttribute('availableinlet');
			str2 += "<li id='powerInlet'>Inlet<ul>";
			if (avin !=null){
				var availInlet = avin.split(",");
				for (var a =0; a<availInlet.length; a++){
					var inHdr = label+" >> Inlet";
					str2 += "<li id='powerinlet_"+devId+"_"+availInlet[a]+"' did='"+ip+"'  onclick=\"showPMTable(2);PMRibbon('"+inHdr+"','"+availInlet[a]+"');LoadInlet('"+ip+"',this.id)\"><a>"+availInlet[a]+"</a></li>";
				}
			}
			str2+="</ul></li>";
			str2 += "<li><a id='powerStrip"+devId+"' did='"+ip+"'  onclick=\"showPMTable(3);PMRibbon('"+label+"','Outlet');LoadOutlet('"+ip+"')\">Outlet</a><ul id='ulDevices"+devId+"'>";
			var str4 = "";
			str4 = createOutletTreeView(outlet,ip,devId);
			if(str4 != ""){
				str2+=str4;
			}
			str2+="</ul></li>";

			str2+="<li id='ocpLog"+devId+"' myname='"+devName+"' did='"+ip+"' onclick=\"showPMTable(5);PMRibbon('"+label+"','Logs');LoadPDULogs('"+ip+"')\"><a>Logs</a></li>";
			str2+="</ul></li>";
		}
	}
	$('#ulPDU').html(str2);
	$("#PMtree").treeview({collapsed: true});
}

function createOutletTreeView(outlet,ip,devId){
    var str2 = "";
    for(var b=0; b<outlet.length; b++){
        var devName = outlet[b].getAttribute('HostName');
        var ip3 = outlet[b].getAttribute('ManagementIp');
        var devId2 = outlet[b].getAttribute('DeviceId');
        var conDevId = outlet[b].getAttribute('ControllerDeviceId');
        var num = outlet[b].getAttribute('Outlet');
        var ipStr = ip;
		var pmsButton = ip+"="+ip3+"="+num;
        if(ip != "null" && ip != "" && ip != undefined){
            ipStr = ip.split(".").join("");
        }
        var label = num;
        if(conDevId == devId){
            if(devName != ""){
                label = num + " " + devName ;
            }	
            if(devName = ""){
                label = num + " " + ip ;
            }
			var ribstr = label.split(" ")[1] ? label.split(" ")[1] : 'OPEN';
            if (ip3==""){
                ip3=num;
                str2 += "<li><a id='deviceoutlet_"+devId2+"_"+ipStr+"_"+num+"' did='"+ip+"' outlet='"+num+"' name='"+ip3+"' onclick=\"showPMTable(6);PMRibbon('Outlet "+num+"','"+ribstr+"');loadOCPDevices('"+ip+"','"+ip3+"','"+num+"');powerSpecificOutlet('"+ip+"','"+ip3+"','"+num+"');\"><li>"+label+"</a></li>";
            }else{
                str2 += "<li><a id='deviceoutlet_"+devId2+"_"+ipStr+"_"+num+"' did='"+ip+"' outlet='"+num+"' name='"+ip3+"' onclick=\"showPMTable(6);PMRibbon('Outlet "+num+"','"+ribstr+"');loadOCPDevices('"+ip+"','"+ip3+"','"+num+"');powerSpecificOutlet('"+ip+"','"+ip3+"','"+num+"');\"><li>"+label+"</a></li>";
            }
        }
    }
    return str2;
//    clearInterval(refreshIntervalId);
}
function createOutletTreeViewOCP(outlet,ip,devId,ocp,devName,ip){
    var deviceName = devName;
    var str2 = "";
    for(b=0; b<outlet.length; b++){
        var devName = $.trim(outlet[b].getAttribute('HostName'));
        var ip3 = $.trim(outlet[b].getAttribute('ManagementIp'));
        var devId2 = $.trim(outlet[b].getAttribute('DeviceId'));
        var num = $.trim(outlet[b].getAttribute('Outlet'));
        var ocp1 = $.trim(outlet[b].getAttribute('OverCurrentProtector'));
        var log = $.trim(outlet[b].getAttribute('Logs'));
        var conDevId = $.trim(outlet[b].getAttribute('ControllerDeviceId'));
        var outletOCP = "OCP "+ocp;
        var ipStr = ip;
        if(ip != "null" && ip != "" && ip != undefined){
            ipStr = ip.split(".").join("");
        }
        var label = num;
        if(devId == conDevId && outletOCP == ocp1){
            if(devName != ""){
                label = num + " " + devName ;
            }
            if(devName = ""){
                label = num + " " + ip;
            }
            if (ip3==""){
                str2 += "<li><a id='deviceoutlet_"+devId2+"_"+ipStr+"_"+num+"' did='"+ip+"' outlet='"+num+"' name='"+ip3+"' onclick=\"showPMTable(6);loadOCPDevices('"+ip+"','"+ip3+"','"+num+"')\">"+label+"</a>";
                if(log=="yes"){
                    str2 +="<ul><li>";
                    str2 +="<a onclick=\"showDeviceLogs('"+ip+"','"+num+"','"+deviceName+"')\">Log</a>";
                    str2 +="</li></ul>";
                }
            str2 +="</li>";
ip3=num;
            }else{
                str2 += "<li><a id='deviceoutlet_"+devId2+"_"+ipStr+"_"+num+"' did='"+ip+"' outlet='"+num+"' name='"+ip3+"' onclick=\"showPMTable(6);loadOCPDevices('"+ip+"','"+ip3+"','"+num+"')\">"+label+"</a>";
                if (log=="yes"){
                    str2 +="<ul><li>";
                    str2 +="<a onclick=\"showDeviceLogs('"+ip+"','"+num+"','"+deviceName+"')\">Log</a>";
                    str2 +="</li></ul>";
                }
          str2 +="</li>";
            }
        }
    }
    return str2;
}
/*
 *  FUNCTION NAME : initPowerMangement 
 *  AUTHOR        : James Turingan
 *  DATE          : March 12, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get information to be displayed in the power management table
 *  PARAMETERS    : 
 */
function initPowerManagement() {
//	var cgiURL="https://"+CURRENT_IP+"/cgi-bin/Final/M2_CGI/FastQueryCgi.py?";
	url = getURL("Power","JSON");
	$.ajax({
		url: url,
		data: {
			"action": "getpowercontroller"
		},
		dataType: 'html',
		success: function(data) {
			var dat2 = data.replace(/'/g,'"');
			var dat = $.parseJSON(dat2);
			createPMTreeViewJSON(dat);
		},
		error: function(data) {
			data = "";
			createPMTreeView(data);
		}
	});
}

/*
 *  FUNCTION NAME : LoadPowerManagement 
 *  AUTHOR        : Apple Kem E. Eguia
 *  DATE          : March 12, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get information to be displayed in the power management table
 *  PARAMETERS    : page
 */
function LoadPowerManagement(action,page,limit,ip,id,tb) { 
	if (globalDeviceType == "Mobile"){
		var Limit = "20";
		ip = '';
	}else{
		var Limit = $('#PowerManagementPageLimit > option:selected').val();
	}
	pmpage = 'PDU';
//    qstruser = "action=getpdu&query=Limit=20*Page=1*IP="+ip+"&Filter=";
  //  url = "https://"+CURRENT_IP+"/cgi-bin/Final/M2_CGI/FastQueryCgi.py?"+qstruser;
 	url = getURL("Power","JSON");  
	/*if(powerManagementView == "PDU"){
		//globalLoad = "pmPDU";
		//page = powerPage;
		con = "PowerManagement2Table";
        qstrUser = "action="+globalactionPDU+"&query=Limit="+globalLimitPDU+"*Page="+page+"*IP="+globalIpPDU+"&Filter="+filterVal;
        url = "https://"+CURRENT_IP+"/cgi-bin/Final/M2_CGI/FastQueryCgi.py?"+qstrUser;
   	}*/
	$.ajax ({
		url: url,
		data: {
			"action": "getpdu",
			"query": "{'QUERY':[{'Limit':'"+Limit+"','Page':'1','IP':'"+ip+"'}]}",
			"Filter": "",
		},
		dataType: 'html',
		success: function (data) { 
			//getlabel(data,action);
			data = $.trim(data);
			if (globalInfoType == "XML"){ 
			//XML 
	            var parser = new DOMParser();
    	        var xmlDoc;
        	    xmlDoc = parser.parseFromString( data , "text/xml" );
				var datatag = xmlDoc.getElementsByTagName('data'); 
    	        var row = xmlDoc.getElementsByTagName('row');
				var totMatch = datatag[0].getAttribute('Total');
				PMAttribXML(row,tb);
			}else{
 			//JSON
				dat = data.replace(/'/g,'"');
				var jsonData = $.parseJSON(dat);
				var totMatch = jsonData.data[0].Total;
				PMAttribJSON(jsonData,tb);
			}
			$('#PMTotalMatches').empty().append(totMatch);
		}
	});
	$('#divTotal').show();
}

function PMAttribXML(row,tb,jsonData){
	var str = "";
	for (var a=0;a<row.length;a++){
		//XML
		if(globalDeviceType != "Mobile"){
			str += "<tr id='tr"+row[a].getAttribute('DeviceId')+"'><td><input type='checkbox' class='trPDU' pduid='"+row[a].getAttribute('DeviceId')+"'/></td>";
		}else{
			str += "<tr class='trPDU' pduid='"+row[a].getAttribute('DeviceId')+"'>";
		}
		str += "<td>"+row[a].getAttribute('Name')+"</td>";
		str += "<td>"+row[a].getAttribute('IpAddress')+"</td>";
		str += "<td class='PMexpanded'>"+row[a].getAttribute('Manufacturer')+"</td>";
		str += "<td class='PMexpanded'>"+row[a].getAttribute('Model')+"</td>";
		str += "<td class='PMexpanded'>"+row[a].getAttribute('SerialNumber')+"</td>";
		str += "<td>"+row[a].getAttribute('MACAddress')+"</td>";
		str += "<td class='PMexpanded'>"+row[a].getAttribute('OutletCount')+"</td>";
		str += "<td>"+row[a].getAttribute('StateOnDeviceStartUp')+"</td>";
		str += "<td>"+row[a].getAttribute('DelayOnDeviceStartup')+"</td>";
		str += "<td>"+row[a].getAttribute('PowerOfPeriodPowerCycle')+"</td>";
		str += "<td>"+row[a].getAttribute('InrushGuardDelay')+"</td>";
		str += "<td>"+row[a].getAttribute('ExternalSensor')+"</td>";
		str += "<td>"+row[a].getAttribute('FirmwareVersion')+"</td>";
		str += "<td>"+row[a].getAttribute('Rating')+"</td>";
		str += "</tr>";
	}
	$('#'+tb+' > tbody').empty().append(str);
	setBlank(tb);
	if(globalDeviceType != "Mobile"){
	}else{
		$("#"+tb).table("refresh");
	}
	if (!($('#PMExpandedView').is(':checked'))){
		$(".PMexpanded").hide();
	}
}

function PMAttribJSON(jsonData,tb){
	var str = "";
	//JSON for loop
	for (var a=0;a<jsonData.data[0].row.length;a++){
		var row = jsonData.data[0].row[a];

		//JSON 	
 		if(globalDeviceType != "Mobile"){
			str += "<tr id='tr"+jsonData.data[0].row[a].DeviceId+"'><td><input type='checkbox' class='trPDU' pduid='"+jsonData.data[0].row[a].DeviceId+"' did='"+jsonData.data[0].row[a].IpAddress+"'/></td>";
		}else{
			str += "<tr class='trPDU' pduid='"+row[a].DeviceId+"'>";
		}
		str += "<td>"+jsonData.data[0].row[a].Name+"</td>";
		str += "<td>"+jsonData.data[0].row[a].IpAddress+"</td>";
		str += "<td class='PMexpanded'>"+jsonData.data[0].row[a].Manufacturer+"</td>";
		str += "<td class='PMexpanded'>"+jsonData.data[0].row[a].Model+"</td>";
		str += "<td class='PMexpanded'>"+jsonData.data[0].row[a].SerialNumber+"</td>";
		str += "<td>"+jsonData.data[0].row[a].MACAddress+"</td>";
		str += "<td class='PMexpanded'>"+jsonData.data[0].row[a].OutletCount+"</td>";
		str += "<td>"+jsonData.data[0].row[a].StateOnDeviceStartUp+"</td>";
		str += "<td>"+jsonData.data[0].row[a].DelayOnDeviceStartup+"</td>";
		str += "<td>"+jsonData.data[0].row[a].PowerOfPeriodPowerCycle+"</td>";
		str += "<td>"+jsonData.data[0].row[a].InrushGuardDelay+"</td>";
		str += "<td>"+jsonData.data[0].row[a].ExternalSensor+"</td>";
		str += "<td>"+jsonData.data[0].row[a].FirmwareVersion+"</td>";
		str += "<td>"+jsonData.data[0].row[a].Rating+"</td>";
		str += "</tr>";	
	}
	$('#'+tb+' > tbody').empty().append(str);
	setBlank(tb);
	if(globalDeviceType != "Mobile"){
	}else{
		$("#"+tb).table("refresh");
	}
	if (!($('#PMExpandedView').is(':checked'))){
		$(".PMexpanded").hide();
	}
}
/**
 **
 **  FUNCTION NAME : expandPM
 **  AUTHOR        : Apple Kem E. Eguia
 **  DATE          : March 12, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : 
 **  PARAMETERS    : 
 **
 **/
function expandPM(){
	if ($('#PMExpandedView').is(':checked')){
		if (pmpage == 'PDU'){
			$(".PMexpanded").show();
			$("#devInfoHdr").attr('colspan',7);
		} else if(pmpage == 'Outlet') {
			$(".PMOexpanded").show();
			$("#pduInfoHdr").attr('colspan',21);
		} else if(pmpage == 'PDULogs'){
			$(".PMLexpanded").show();
			$("#logspduInfoHdr").attr('colspan',20);	
		}
	}else{
		if (pmpage == 'PDU'){
			$(".PMexpanded").hide();
			$("#devInfoHdr").attr('colspan',4);
		} else if (pmpage == 'Outlet') {
			$(".PMOexpanded").hide();
			$("#pduInfoHdr").attr('colspan',11);
		} else if(pmpage == 'PDULogs'){
			$(".PMLexpanded").hide();
			$("#logspduInfoHdr").attr('colspan',7);	
		}
	}
}

/**
 **
 **  FUNCTION NAME : LoadPowerController
 **  AUTHOR        : Apple Kem E. Eguia
 **  DATE          : March 13, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : 
 **  PARAMETERS    : 
 **
 **/
var powerPageIP ='';
function LoadPowerController(ip){
//ar qstrUser = "action=getpowercontrollerip&query=IP="+ip;
  // 	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/M2_CGI/FastQueryCgi.py?"+qstrUser;
 	var url = getURL("Power","JSON"); 	
	powerPageIP = ip;

	$.ajax ({
		url: url,
		data: {
			"action": "getpowercontrollerip",
			"query": "{'QUERY':[{'IP':'"+ip+"'}]}",
//			"query": "{'QUERY':[{'IP':'172.25.1.11'}]}"			
		},
		dataType: 'html',
		success: function (data) { 
			data = $.trim(data);
			if (globalInfoType == "XML"){
	           var parser = new DOMParser();
    		   var xmlDoc;
	           xmlDoc = parser.parseFromString( data , "text/xml" );
				var datatag = xmlDoc.getElementsByTagName('data'); 
            	var row = xmlDoc.getElementsByTagName('row');
				powerControllerAttrXML(row);
			}else{
			
 			//JSON
			dat2 = data.replace(/'/g,'"');
			var dat = $.parseJSON(dat2);
				powerControllerAttrJSON(dat);
			
			}
		}
	});
	$('#divTotal').hide();
}

/**
 **
 **  FUNCTION NAME : powerControllerAttr
 **  AUTHOR        : Apple Kem E. Eguia
 **  DATE          : March 13, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : 
 **  PARAMETERS    : row
 **
 **/

//var devId1,HostName,ExternalSensor,Altitude,statedevicestartupid,StateDeviceStartUp,DelayDeviceStartUp,PowerCyclePeriod,InRushGuardDelay,LoadShedding;
var devId1;
function powerControllerAttrXML(row){
	for (var a=0;a<row.length;a++){
		//XML
		$('#spName').text(row[a].getAttribute('HostName'));
		$('#spOutletState').text(row[a].getAttribute('StateDeviceStartUp'));
		$('#spOutletInit').text(row[a].getAttribute('DelayDeviceStartUp'));
		$('#spPowerOff').text(row[a].getAttribute('PowerCyclePeriod'));
		$('#spInrush').text(row[a].getAttribute('InRushGuardDelay'));
		$('#spExternal').text(row[a].getAttribute('ExternalSensor'));
		$('#spFirmware').text(row[a].getAttribute('FirmwareVersion'));
		$('#spMac').text(row[a].getAttribute('MACAddress'));
		$('#spRating').text(row[a].getAttribute('Rating'));

		
	}
	setBlank2('tbFormController');
}

function powerControllerAttrJSON(jsonData){
	//JSON for loop
	for (var a=0;a<jsonData.data[0].row.length;a++){
		var row = jsonData.data[0].row[a];
		
		//JSON
		$('#spName').text(jsonData.data[0].row[a].HostName);
		$('#spOutletState').text(jsonData.data[0].row[a].StateDeviceStartUp);
		$('#spOutletInit').text(jsonData.data[0].row[a].DelayDeviceStartUp);
		$('#spPowerOff').text(jsonData.data[0].row[a].PowerCyclePeriod);
		$('#spInrush').text(jsonData.data[0].row[a].InRushGuardDelay);
		$('#spExternal').text(jsonData.data[0].row[a].ExternalSensor);
		$('#spFirmware').text(jsonData.data[0].row[a].FirmwareVersion);
		$('#spMac').text(jsonData.data[0].row[a].MACAddress);
		$('#spRating').text(jsonData.data[0].row[a].Rating);
		devId1 = jsonData.data[0].row[0].DeviceId; 	
//		statedevicestartupid = jsonData.data[0].row[a]statedevicestartupid;
	}
	//EditInformation(devId1,HostName,ExternalSensor);
	setBlank2('tbFormController');
}
/**
 **  FUNCTION NAME : LoadInlet
 **  AUTHOR        : Apple Kem E. Eguia
 **  DATE          : March 13, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : 
 **  PARAMETERS    : 
 **
 **/
function LoadInlet(ip,id){
	var inlet = id.split('_')[2];
	var qstrUser = "action=getinlet&query=Limit=20*Page=1*IP="+ip+"*Inlet="+inlet;
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/M2_CGI/FastQueryCgi.py?"+qstrUser;

	$.ajax ({
		url: url,
		dataType: 'html',
		success: function (data) { 
			data = $.trim(data);
			//XML
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( data , "text/xml" );
			var datatag = xmlDoc.getElementsByTagName('data'); 
            var row = xmlDoc.getElementsByTagName('row');
			/*
 			//JSON
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			*/

			inletAttr(row);
		}
	});
	$('#divTotal').hide();
}

/**
 **  FUNCTION NAME : inletAttr
 **  AUTHOR        : Apple Kem E. Eguia
 **  DATE          : March 13, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : 
 **  PARAMETERS    : row
 **
 **/

function inletAttr(row,jsonData){
	var curr = "";
	var volt = "";
	var power = "";
	/*
	//JSON for loop
	for (var a=0;a<jsonData.data[0].row.length;a++){
		var row = jsonData.data[0].row[a];
	*/
		
	for (var a=0;a<row.length;a++){
		//XML
		$('#spInletLabel').text(row[a].getAttribute('InletLabel'));
		$('#spInletName').text(row[a].getAttribute('InletName'));
		curr += "<tr><td>Inlet RMS Current</td>";
		curr += "<td>"+row[a].getAttribute('CurrentValue')+"</td>";
		curr += "<td>"+row[a].getAttribute('CurrentState')+"</td>";
		curr += "<td>"+row[a].getAttribute('CurrentRemaining')+"</td></tr>";
		volt += "<tr><td>Inlet RMS Voltage</td>";
		volt += "<td>"+row[a].getAttribute('VoltageValue')+"</td>";
		volt += "<td>"+row[a].getAttribute('VoltageState')+"</td></tr>";
		power += "<tr><td>Active Power</td>";
		power += "<td>"+row[a].getAttribute('ActivePowerValue')+"</td>";
		power += "<td>"+row[a].getAttribute('ActivePowerState')+"</td></tr>";
		power += "<tr><td>Apparent Power</td>";
		power += "<td>"+row[a].getAttribute('ApparentPowerValue')+"</td>";
		power += "<td>"+row[a].getAttribute('ApparentPowerState')+"</td></tr>";
		power += "<tr><td>Power Factor</td>";
		power += "<td>"+row[a].getAttribute('PowerFactorValue')+"</td>";
		power += "<td>"+row[a].getAttribute('PowerFactorState')+"</td></tr>";
		power += "<tr><td>Apparent Power</td>";
		power += "<td>"+row[a].getAttribute('ApparentPowerValue')+"</td>";
		power += "<td>"+row[a].getAttribute('ApparentPowerState')+"</td></tr>";
		power += "<tr><td>Power Factor</td>";
		power += "<td>"+row[a].getAttribute('PowerFactorValue')+"</td>";
		power += "<td>"+row[a].getAttribute('PowerFactorState')+"</td></tr>";
		power += "<tr><td>Active Energy</td>";
		power += "<td>"+row[a].getAttribute('ActiveEnergyValue')+"</td>";
		power += "<td>"+row[a].getAttribute('ActiveEnergyState')+"</td></tr>";

		/*
 		//JSON
 		$('#spInletLabel').text(row[a].InletLabel);
		$('#spInletName').text(row[a].InletName);
		curr += "<tr><td>Inlet RMS Current</td>";
		curr += "<td>"+row[a].CurrentValue+"</td>";
		curr += "<td>"+row[a].CurrentState+"</td>";
		curr += "<td>"+row[a].CurrentRemaining+"</td></tr>";
		volt += "<tr><td>Inlet RMS Voltage</td>";
		volt += "<td>"+row[a].VoltageValue+"</td>";
		volt += "<td>"+row[a].VoltageState+"</td></tr>";
		power += "<tr><td>Active Power</td>";
		power += "<td>"+row[a].ActivePowerValue+"</td>";
		power += "<td>"+row[a].ActivePowerState+"</td></tr>";
		power += "<tr><td>Apparent Power</td>";
		power += "<td>"+row[a].ApparentPowerValue+"</td>";
		power += "<td>"+row[a].ApparentPowerState+"</td></tr>";
		power += "<tr><td>Power Factor</td>";
		power += "<td>"+row[a].PowerFactorValue+"</td>";
		power += "<td>"+row[a].PowerFactorState+"</td></tr>";
		power += "<tr><td>Apparent Power</td>";
		power += "<td>"+row[a].ApparentPowerValue+"</td>";
		power += "<td>"+row[a].ApparentPowerState+"</td></tr>";
		power += "<tr><td>Power Factor</td>";
		power += "<td>"+row[a].PowerFactorValue+"</td>";
		power += "<td>"+row[a].PowerFactorState+"</td></tr>";
		power += "<tr><td>Active Energy</td>";
		power += "<td>"+row[a].ActiveEnergyValue+"</td>";
		power += "<td>"+row[a].ActiveEnergyState+"</td></tr>";	
		 */ 
	}

	$('#tbInletCurr > tbody').empty().append(curr);
	setBlank('tbInletCurr');
	$('#tbInletVolt > tbody').empty().append(volt);
	setBlank('tbInletVolt');
	$('#tbInletPower > tbody').empty().append(power);
	setBlank('tbInletPower');
	setBlank2('tbInletInfo');
	
}

/**
 **
 **  FUNCTION NAME : LoadOutlet
 **  AUTHOR        : Apple Kem E. Eguia
 **  DATE          : March 13, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : 
 **  PARAMETERS    : 
 **
 **/
function LoadOutlet(ip){
	pmpage = 'Outlet';
	var limit = $("#PowerManagementPageLimit").val();
	var queryObj = {'QUERY':[{'Limit':limit,'Page':'1','IP':ip}]};
	var qstrUser = JSON.stringify(queryObj);
	var con = "PowerManagementTable";
	var url = getURL("Power","JSON");  	
	globalCIP=[];
	globalCIP.push(ip);
	$.ajax ({
		url: url,
		data: {
			"action": "getoutlet",
			"query": qstrUser,
		},
		dataType: 'html',
		success: function (data) { 
			dat2 = data.replace(/'/g,'"');
			var dat = $.parseJSON(dat2);
			var totMatch = dat.data[0].total;
			outletAttrJSON(dat);
			$('#PMTotalMatches').empty().append(totMatch);
		}
	});
	$('#divTotal').show();
}

/**
 **
 **  FUNCTION NAME : outletAttr
 **  AUTHOR        : Apple Kem E. Eguia
 **  DATE          : March 13, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : 
 **  PARAMETERS    : row
 **
 **/

function outletAttr(row){

	for (var a=0;a<row.length;a++){
		//XML
		if(globalDeviceType != "Mobile"){
			str += "<tr id='tr"+row[a].getAttribute('DeviceId')+"'><td><input type='checkbox' class='trOutlet' oid='"+row[a].getAttribute('DeviceId')+"'/></td>";
		}else{
			str += "<tr class='trOutlet' oid='"+row[a].getAttribute('DeviceId')+"'>";
		}
		str += "<td>"+row[a].getAttribute('HostName')+"</td>";
		str += "<td>"+row[a].getAttribute('PowerSupply')+"</td>";
		
		str += "<td>"+row[a].getAttribute('Status')+"</td>";
		if (row[a].getAttribute('State') == 'On'){
			str += "<td style='color:green;'>";
		}else{
			str += "<td style='color:red;'>";
		}
		str += row[a].getAttribute('State')+"</td>";
		str += "<td>"+row[a].getAttribute('PowerControllerIp')+"</td>";
		str += "<td>"+row[a].getAttribute('ControllerName')+"</td>";
		str += "<td>"+row[a].getAttribute('OutletName')+"</td>";
		str += "<td>"+row[a].getAttribute('Outlet')+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].getAttribute('OverCurrentProtector')+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].getAttribute('Lines')+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].getAttribute('StateOnDeviceStartUp')+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].getAttribute('CyclingPowerOffPeriod')+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].getAttribute('NonCritical')+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].getAttribute('DomainName')+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].getAttribute('ZoneName')+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].getAttribute('GroupName')+"</td>";
		str += "<td>"+row[a].getAttribute('PowerPolicy')+"</td>";
		str += "<td>"+row[a].getAttribute('RMSVoltage')+"</td>";
		str += "<td>"+row[a].getAttribute('RMSCurrent')+"</td>";
		str += "<td>"+row[a].getAttribute('ActivePower')+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].getAttribute('ApparentPower')+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].getAttribute('PowerFactor')+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].getAttribute('ActiveEnergy')+"</td>";
		str += "</tr>";
	
	}
	$('#tbOutlet > tbody').empty().append(str);
	setBlank('tbOutlet');
	if(globalDeviceType != "Mobile"){
	}else{
		$("#tbOutlet").table("refresh");
	}
	if (!($('#PMExpandedView').is(':checked'))){
		$(".PMOexpanded").hide();
	}
}
function outletAttr(jsonData){
	for (var a=0;a<jsonData.data[0].row.length;a++){
		var row = jsonData.data[0].row[a];

		//JSON
		if(globalDeviceType != "Mobile"){
			str += "<tr id='tr"+row[a].DeviceId+"'><td><input type='checkbox' class='trOutlet' oid='"+row[a].DeviceId+"'/></td>";
		}else{
			str += "<tr class='trOutlet' oid='"+row[a].DeviceId+"'>";
		}
		str += "<td>"+row[a].HostName+"</td>";
		str += "<td>"+row[a].PowerSupply+"</td>";
		
		str += "<td>"+row[a].Status+"</td>";
		if (row[a].State == 'On'){
			str += "<td style='color:green;'>";
		}else{
			str += "<td style='color:red;'>";
		}
		str += row[a].State+"</td>";
		str += "<td>"+row[a].PowerControllerIp+"</td>";
		str += "<td>"+row[a].ControllerName+"</td>";
		str += "<td>"+row[a].OutletName+"</td>";
		str += "<td>"+row[a].Outlet+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].OverCurrentProtector+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].Lines+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].StateOnDeviceStartUp+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].CyclingPowerOffPeriod+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].NonCritical+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].DomainName+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].ZoneName+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].GroupName+"</td>";
		str += "<td>"+row[a].PowerPolicy+"</td>";
		str += "<td>"+row[a].RMSVoltage+"</td>";
		str += "<td>"+row[a].RMSCurrent+"</td>";
		str += "<td>"+row[a].ActivePower+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].ApparentPower+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].PowerFactor+"</td>";
		str += "<td class='PMOexpanded'>"+row[a].ActiveEnergy+"</td>";
		str += "</tr>";
	}
	$('#tbOutlet > tbody').empty().append(str);
	setBlank('tbOutlet');
	if(globalDeviceType != "Mobile"){
	}else{
		$("#tbOutlet").table("refresh");
	}
	if (!($('#PMExpandedView').is(':checked'))){
		$(".PMOexpanded").hide();
	}
}

function showPMTable(ind){
	for (var x=0;x<8;x++){
		if (x == ind){
			$('.powerPage-'+x).show();
		}else{
			$('.powerPage-'+x).hide();
		}
	}
}


function PMRibbon(prnt,child){
	var pstr = " >> ";
	if (prnt != ''){
		pstr = " >> "+prnt + " >> ";
	}
	$('#PMprnt').html(pstr);
	$('#PMchild').html(child);
	
}

/**
 **  FUNCTION NAME : LoadOCP
 **  AUTHOR        : Apple Kem E. Eguia
 **  DATE          : March 14, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : 
 **  PARAMETERS    : 
 **
 **/
function LoadOCP(ip,ocp){
	var qstrUser = "action=getovercurrentprotectors&query=Limit=20*Page=1*IP="+ip+"*C="+ocp;
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/M2_CGI/FastQueryCgi.py?"+qstrUser;

	$.ajax ({
		url: url,
		dataType: 'html',
		success: function (data) { 
			data = $.trim(data);
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( data , "text/xml" );
			var datatag = xmlDoc.getElementsByTagName('data'); 
            var row = xmlDoc.getElementsByTagName('row');
			/*
 			//JSON
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			*/	
			OCPAttr(row);
		}
	});
	$('#divTotal').hide();
}

/**
 **  FUNCTION NAME : OCPAttr
 **  AUTHOR        : Apple Kem E. Eguia
 **  DATE          : March 14, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : 
 **  PARAMETERS    : row
 **
 **/

function OCPAttr(row,jsonData){
	var sensors = "";
	
	/*
	//JSON for loop
	for (var a=0;a<jsonData.data[0].row.length;a++){
		var row = jsonData.data[0].row[a];
	*/
	for (var a=0;a<row.length;a++){
		//XML
		$('#ocpLabel').text(row[a].getAttribute('OverCurrentProtectors'));
		$('#ocpName').text(row[a].getAttribute('Name'));
		$('#ocpStat').text(row[a].getAttribute('state'));
		$('#ocpLines').text(row[a].getAttribute('Lines'));
		$('#ocpProtected').text(row[a].getAttribute('ProtectedOutlets'));
		sensors += "<tr><td>RMS Current</td>";
		sensors += "<td>"+row[a].getAttribute('RMSCurrentValue')+"</td>";
		sensors += "<td>"+row[a].getAttribute('RMSCurrentState')+"</td>";
		sensors += "<td>"+row[a].getAttribute('RemainingCurrent')+"</td></tr>";
	
		/*
		//JSON
		$('#ocpLabel').text(row[a].OverCurrentProtectors);
		$('#ocpName').text(row[a].Name);
		$('#ocpStat').text(row[a].state);
		$('#ocpLines').text(row[a].Lines);
		$('#ocpProtected').text(row[a].ProtectedOutlets);
		sensors += "<tr><td>RMS Current</td>";
		sensors += "<td>"+row[a].RMSCurrentValue+"</td>";
		sensors += "<td>"+row[a].RMSCurrentState+"</td>";
		sensors += "<td>"+row[a].RemainingCurrent+"</td></tr>";
		*/
	}

	$('#tbSensors > tbody').empty().append(sensors);
	setBlank('tbSensors');
	setBlank2('tbOCPSettings');
}

/**
 **
 **  FUNCTION NAME : LoadPDULogs
 **  AUTHOR        : Apple Kem E. Eguia
 **  DATE          : March 14, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : 
 **  PARAMETERS    : 
 **
 **/
function LoadPDULogs(ip){
	if (globalDeviceType != "Mobile"){
		var Limit = $('#PowerManagementPageLimit > option:selected').val();
	}else{
		var Limit = '20';
	}
	pmpage = 'PDULogs';
	var con = "PowerManagementLogsTable";
//	var qstrUser = "action=getlog&query=Limit=20*Page=1*IP="+ip+"&Filter=";
	var qstrUser = "{'QUERY':[{'Limit':'"+Limit+"', 'Page':'1', 'IP':'"+ip+"'}]}";
//	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/M2_CGI/FastQueryCgi.py?"+qstrUser;
	var url = getURL("Power","JSON");	

	$.ajax({	
		url: url,
		data: {
			"action": "getlog",
			"query": qstrUser,
			"Filter": '' 
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function (data) { 
			data = $.trim(data);
			if (globalInfoType == "XML"){
	            var parser = new DOMParser();
    	        var xmlDoc;
        	    xmlDoc = parser.parseFromString( data , "text/xml" );
				var datatag = xmlDoc.getElementsByTagName('data'); 
    	        var row = xmlDoc.getElementsByTagName('row');
				var totMatch = datatag[0].getAttribute('total');
				pduLogsAttrXML(row);
			}else{
				dat2 = data.replace(/'/g,'"');
				var jsonData = $.parseJSON(dat2);
				var totMatch = jsonData.data[0].total;
//				var = dat.row;
				pduLogsAttrJSON(jsonData);
			}
			$('#PMTotalMatches').empty().append(totMatch);
		}
	});
	$('#divTotal').show();
}

/**
 **
 **  FUNCTION NAME : pduLogsAttr
 **  AUTHOR        : Apple Kem E. Eguia
 **  DATE          : March 14, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : 
 **  PARAMETERS    : row
 **
 **/

function pduLogsAttrXML(row){
	for (var a=0;a<row.length;a++){
		//XML
		if(globalDeviceType != "Mobile"){
			str += "<tr id='tr"+row[a].getAttribute('DeviceId')+"'><td><input type='radio' class='trPDULogs' logid='"+row[a].getAttribute('DeviceId')+"' onclick=\"radioPM(this.id);\"/></td>";
		}else{
			str += "<tr class='trPDULogs' oid='"+row[a].getAttribute('DeviceId')+"'>";
		}
		str += "<td>"+row[a].getAttribute('DeviceId')+"</td>";
		str += "<td>"+row[a].getAttribute('HostName')+"</td>";
		str += "<td>"+row[a].getAttribute('ManagementIp')+"</td>";
		str += "<td>"+row[a].getAttribute('PowerSupply')+"</td>";
		str += "<td>"+row[a].getAttribute('Status')+"</td>";
		str += "<td>"+row[a].getAttribute('PowerControllerIp')+"</td>";
		str += "<td>"+row[a].getAttribute('ControllerName')+"</td>";
		str += "<td>"+row[a].getAttribute('OutletName')+"</td>";
		str += "<td class='PMLexpanded'>"+row[a].getAttribute('Outlet')+"</td>";
		str += "<td class='PMLexpanded'>"+row[a].getAttribute('OverCurrentProtector')+"</td>";
		str += "<td class='PMLexpanded'>"+row[a].getAttribute('Lines')+"</td>";
		str += "<td class='PMLexpanded'>"+row[a].getAttribute('StateOnDeviceStartUp')+"</td>";
		str += "<td class='PMLexpanded'>"+row[a].getAttribute('CyclingPowerOffPeriod')+"</td>";
		str += "<td class='PMLexpanded'>"+row[a].getAttribute('NonCritical')+"</td>";
		str += "<td>"+row[a].getAttribute('RMSVoltage')+"</td>";
		str += "<td>"+row[a].getAttribute('RMSCurrent')+"</td>";
		str += "<td>"+row[a].getAttribute('ActivePower')+"</td>";
		str += "<td class='PMLexpanded'>"+row[a].getAttribute('ApparentPower')+"</td>";
		str += "<td class='PMLexpanded'>"+row[a].getAttribute('PowerFactor')+"</td>";
		str += "<td class='PMLexpanded'>"+row[a].getAttribute('ActiveEnergy')+"</td>";
		str += "</tr>";
	}
	$('#tbPDULogs > tbody').empty().append(str);
	setBlank('tbPDULogs');
	if(globalDeviceType != "Mobile"){
	}else{
		$("#tbPDULogs").table("refresh");
	}
	if (!($('#PMExpandedView').is(':checked'))){
		$(".PMLexpanded").hide();
	}
}
function pduLogsAttrJSON(jsonData){
	//JSON for loop
	for (var a=0;a<jsonData.data[0].row.length;a++){
//		var row = jsonData.data[0].row[a];
		if(globalDeviceType != "Mobile"){
			str += "<tr id='tr"+jsonData.data[0].row[a].DeviceId+"'><td><input type='radio' onclick=\"radioPM('"+jsonData.data[0].row[a].PowerControllerIp+"','"+jsonData.data[0].row[a].Outlet+"');\" name='trPDULogs' class='trPDULogs' id='pm"+jsonData.data[0].row[a].DeviceId+"'/></td>";
		}else{
			str += "<tr class='trPDULogs' oid='"+jsonData.data[0].row[a].DeviceId+"'>";
		}
		var row = jsonData;	
		str += "<td>"+jsonData.data[0].row[a].DeviceId+"</td>";
		str += "<td>"+jsonData.data[0].row[a].HostName+"</td>";
		str += "<td>"+jsonData.data[0].row[a].ManagementIp+"</td>";
		str += "<td>"+jsonData.data[0].row[a].PowerSupply+"</td>";
		str += "<td>"+jsonData.data[0].row[a].Status+"</td>";
		str += "<td>"+jsonData.data[0].row[a].PowerControllerIp+"</td>";
		str += "<td>"+jsonData.data[0].row[a].ControllerName+"</td>";
		str += "<td>"+jsonData.data[0].row[a].OutletName+"</td>";
		str += "<td class='PMLexpanded'>"+jsonData.data[0].row[a].Outlet+"</td>";
		str += "<td class='PMLexpanded'>"+jsonData.data[0].row[a].OverCurrentProtector+"</td>";
		str += "<td class='PMLexpanded'>"+jsonData.data[0].row[a].Lines+"</td>";
		str += "<td class='PMLexpanded'>"+jsonData.data[0].row[a].StateOnDeviceStartUp+"</td>";
		str += "<td class='PMLexpanded'>"+jsonData.data[0].row[a].CyclingPowerOffPeriod+"</td>";
		str += "<td class='PMLexpanded'>"+jsonData.data[0].row[a].NonCritical+"</td>";
		str += "<td>"+jsonData.data[0].row[a].RMSVoltage+"</td>";
		str += "<td>"+jsonData.data[0].row[a].RMSCurrent+"</td>";
		str += "<td>"+jsonData.data[0].row[a].ActivePower+"</td>";
		str += "<td class='PMLexpanded'>"+jsonData.data[0].row[a].ApparentPower+"</td>";
		str += "<td class='PMLexpanded'>"+jsonData.data[0].row[a].PowerFactor+"</td>";
		str += "<td class='PMLexpanded'>"+jsonData.data[0].row[a].ActiveEnergy+"</td>";
		str += "</tr>";
		
	}
	$('#tbPDULogs > tbody').empty().append(str);
	setBlank('tbPDULogs');
	if(globalDeviceType != "Mobile"){
	}else{
		$("#tbPDULogs").table("refresh");
	}
	if (!($('#PMExpandedView').is(':checked'))){
		$(".PMLexpanded").hide();
	}
}

function loadOCPDevices(ip,mngip,outletnum){
//	qstrUser = "action=getoutletip&query=";
//	qstrUser += {"QUERY":[{"Limit":"20","Page":"1","IP":ip,"MngIP":mngip,"OutletNumber":outletnum}]};
//	url = "https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/POWER/FastQueryCgi.py?";

	var url = getURL("Power","JSON");
	var actionx = 'getoutletip';
	var dObj = {};
	var aaObj = [];
  var qObj = {'QUERY':aaObj};

	dObj['Limit']='20';
	dObj['Page']='1';
	dObj['IP']=ip;
	dObj['MngIP']=mngip;
	dObj['OutletNumber']=outletnum;
	aaObj.push(dObj);
	$.ajax ({
		url: url,
		data: { action: actionx, query: JSON.stringify(qObj) },
		dataType: 'html',
		success: function (data) { 
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(jsonData);
			
			ocpDevAttr(jsonData);
		}
	});
	$('#divTotal').hide();
}

/**
 **
 **  FUNCTION NAME : ocpDevAttr
 **  AUTHOR        : Apple Kem E. Eguia
 **  DATE          : March 17, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : 
 **  PARAMETERS    : row
 **
 **/

function ocpDevAttr(jsonData){
	var str = "";
	
	//JSON for loop
	for (var a=0;a<jsonData.data[0].row.length;a++){
		var row = jsonData.data[0].row[a];
	
//	for (var a=0;a<row.length;a++){}
		//XML
/*		$('#outletLabel').text(row[a].getAttribute('OutletIpLabel'));
		$('#OutletName').text(row[a].getAttribute('OutletIpName'));
		$('#OutletStat').text(row[a].getAttribute('OutletStatus'));
		$('#outletState').text(row[a].getAttribute('OutletState'));
		$('#outletLines').text(row[a].getAttribute('OutletLine'));
		$('#outletCP').text(row[a].getAttribute('OCP'));
		$('#stateOnStartUp').text(row[a].getAttribute('StateOnStartUp'));
		$('#outletPowerOff').text(row[a].getAttribute('PowerOff'));
		$('#outletNonCrit').text(row[a].getAttribute('Noncritical'));
		$('#outletHostName').text(row[a].getAttribute('HostName'));
		$('#OutletMIP').text(row[a].getAttribute('ManagementIp'));
		$('#OutletManu').text(row[a].getAttribute('Manufacturer'));
		$('#outletConsole').text(row[a].getAttribute('ConsoleIp'));
		$('#outletModel').text(row[a].getAttribute('Model'));
		$('#outletDevType').text(row[a].getAttribute('DeviceType'));
		$('#outletSN').text(row[a].getAttribute('SerialNumber'));
		$('#outletDom').text(row[a].getAttribute('DomainName'));
		$('#outletZone').text(row[a].getAttribute('ZoneName'));
		$('#outletGroup').text(row[a].getAttribute('GroupName'));
		$('#outletPower').text(row[a].getAttribute('PowerPolicy'));
		str += "<tr><td>RMS Voltage</td>";
		str += "<td>"+row[a].getAttribute('RMSVoltageValue')+"</td>";
		str += "<td>"+row[a].getAttribute('RMSVoltageState')+"</td></tr>";
		str += "<tr><td>RMS Current</td>";
		str += "<td>"+row[a].getAttribute('RMSCurrentValue')+"</td>";
		str += "<td>"+row[a].getAttribute('RMSCurrentState')+"</td>";
		str += "<tr><td>Active Power</td>";
		str += "<td>"+row[a].getAttribute('ActivePowerValue')+"</td>";
		str += "<td>"+row[a].getAttribute('ActivePowerState')+"</td></tr>";
		str += "<tr><td>Apparent Power</td>";
		str += "<td>"+row[a].getAttribute('ApparentPowerValue')+"</td>";
		str += "<td>"+row[a].getAttribute('ApparentPowerState')+"</td></tr>";
		str += "<tr><td>Power Factor</td>";
		str += "<td>"+row[a].getAttribute('PowerFactorValue')+"</td>";
		str += "<td>"+row[a].getAttribute('PowerFactorState')+"</td></tr>";
		str += "<tr><td>Apparent Power</td>";
		str += "<td>"+row[a].getAttribute('ApparentPowerValue')+"</td>";
		str += "<td>"+row[a].getAttribute('ApparentPowerState')+"</td></tr>";
		str += "<tr><td>Power Factor</td>";
		str += "<td>"+row[a].getAttribute('PowerFactorValue')+"</td>";
		str += "<td>"+row[a].getAttribute('PowerFactorState')+"</td></tr>";
		str += "<tr><td>Active Energy</td>";
		str += "<td>"+row[a].getAttribute('ActiveEnergyValue')+"</td>";
		str += "<td>"+row[a].getAttribute('ActiveEnergyState')+"</td></tr>";
*/
		
		//JSON
		$('#outletLabel').text(row[a].OutletIpLabel);
		$('#OutletName').text(row[a].OutletIpName);
		$('#OutletStat').text(row[a].OutletStatus);
		$('#outletState').text(row[a].OutletState);
		$('#outletLines').text(row[a].OutletLine);
		$('#outletCP').text(row[a].OCP);
		$('#stateOnStartUp').text(row[a].StateOnStartUp);
		$('#outletPowerOff').text(row[a].PowerOff);
		$('#outletNonCrit').text(row[a].Noncritical);
		$('#outletHostName').text(row[a].HostName);
		$('#OutletMIP').text(row[a].ManagementIp);
		$('#OutletManu').text(row[a].Manufacturer);
		$('#outletConsole').text(row[a].ConsoleIp);
		$('#outletModel').text(row[a].Model);
		$('#outletDevType').text(row[a].DeviceType);
		$('#outletSN').text(row[a].SerialNumber);
		$('#outletDom').text(row[a].DomainName);
		$('#outletZone').text(row[a].ZoneName);
		$('#outletGroup').text(row[a].GroupName);
		$('#outletPower').text(row[a].PowerPolicy);
		str += "<tr><td>RMS Voltage</td>";
		str += "<td>"+row[a].RMSVoltageValue+"</td>";
		str += "<td>"+row[a].RMSVoltageState+"</td></tr>";
		str += "<tr><td>RMS Current</td>";
		str += "<td>"+row[a].RMSCurrentValue+"</td>";
		str += "<td>"+row[a].RMSCurrentState+"</td>";
		str += "<tr><td>Active Power</td>";
		str += "<td>"+row[a].ActivePowerValue+"</td>";
		str += "<td>"+row[a].ActivePowerState+"</td></tr>";
		str += "<tr><td>Apparent Power</td>";
		str += "<td>"+row[a].ApparentPowerValue+"</td>";
		str += "<td>"+row[a].ApparentPowerState+"</td></tr>";
		str += "<tr><td>Power Factor</td>";
		str += "<td>"+row[a].PowerFactorValue+"</td>";
		str += "<td>"+row[a].PowerFactorState+"</td></tr>";
		str += "<tr><td>Apparent Power</td>";
		str += "<td>"+row[a].ApparentPowerValue+"</td>";
		str += "<td>"+row[a].ApparentPowerState+"</td></tr>";
		str += "<tr><td>Power Factor</td>";
		str += "<td>"+row[a].PowerFactorValue+"</td>";
		str += "<td>"+row[a].PowerFactorState+"</td></tr>";
		str += "<tr><td>Active Energy</td>";
		str += "<td>"+row[a].ActiveEnergyValue+"</td>";
		str += "<td>"+row[a].ActiveEnergyState+"</td></tr>";
		
	}
	$('#tbOutSensors > tbody').empty().append(str);
	setBlank2('tbDevOutlet');
	setBlank('tbOutSensors');
}

function setBlank(table){
	$('#'+table+' > tbody > tr').find('td:gt(0)').each(function(){
		var td = $(this).text();
		if (td == '' || td == null){
			$(this).text('N/A');
		}
	});
}

function setBlank2(table){
	$('#'+table+' > tbody > tr').find('td:gt(0)').each(function(){
		var td = $(this).find('span').text();
		if (td == '' || td == 'null'){
			$(this).find('span').text('N/A');
		}
	});
}

/*
*
*  FUNCTION NAME : EditInformation
*  AUTHOR        :
*  DATE          :
*  MODIFIED BY   :
*  REVISION DATE :
*  REVISION #    :
*  DESCRIPTION   : edit information
*  PARAMETERS    : id,table,action*
*  
*/

function EditInformation(id,table,action,queryStr,div1){ 
//	clearInterval(refreshIntervalId);
	var deviceArray = new Array();
	var myId = "";
	var x=powerPageIP;
	if(x != undefined && x != ""){
		
		var c=x.split("*");
		
	}
	if(id.toLowerCase() == "powermanagementoff22"){
//	var devId1 = $('#controllerId').text();
		myId=devId1;
	}

		PMDeviceId = myId;
				$('.trPDU').each(function(){
					if ($(this).is(':checked')){
						PMDeviceId = $(this).attr('pduid');
//			ip = ip+',';
					}
				});
	myId = PMDeviceId;
	if(queryStr != undefined || queryStr =="" ){  
		if( powerPageIP == ""){
		var qstrUser = "{'QUERY':[{'DeviceId':'"+myId+"', 'IP':'"+powerPageIP+"','flag':'true',}]}";
		}else{
		var qstrUser = "{'QUERY':[{'DeviceId':'"+myId+"','IP':'"+powerPageIP+"'}]}";
		}
	}else{
		var qstrUser = "{'QUERY':[{'DeviceId':'"+myId+"','IP':'"+powerPageIP+"'}]}";
		if(action == "getdeviceinformation" && myId != ''){
			qstrUser = "{'QUERY': [{'DeviceId':'"+myId+"'}]}";
           	devId=myId;
		}
	}
//		var url = "https://"+CURRENT_IP+"/cgi-bin/Final/M2_CGI/FastQueryCgi.py?"+qstrUser;
		var url= getURL("Power","JSON");  		

	$.ajax({
		url: url,
		data: {
			"action": action,
			"query": qstrUser,
		},
		dataType: 'html',
		success: function (data) {
	//		data = $.trim(data);
			dat = data.replace(/'/g,'"');
			var jsonData = $.parseJSON(dat);
			showEditInformation(jsonData);
		}
	});   
	$.ajax({
		url: url,
		data: {
			"action": "getoutleteditinformation",
			"query": qstrUser,
		},
		dataType: 'html',
		success: function (data) {
			data = $.trim(data);
			dat = data.replace(/'/g,'"');
			var jsonData = $.parseJSON(dat);
			showEditInformation2(jsonData);
		}
	});   
}
/*
*
*  FUNCTION NAME : showEditInformation
*  AUTHOR        : Maureen Daelo
*  DATE          :
*  MODIFIED BY   :
*  REVISION DATE :
*  REVISION #    :
*  DESCRIPTION   : edit information
*  PARAMETERS    : id,table,action*
*  
*/
function showEditInformation(jsonData){
	for (var a=0;a<jsonData.data[0].row.length;a++){
		var row = jsonData.data[0].row[a];
		
		var devId1 = jsonData.data[0].row[0].DeviceId; 	
		var HostName = $('#spName').text();
		var Altitude = jsonData.data[0].row[0].Altitude;
		var ExternalSensor = jsonData.data[0].row[0].ExternalSensor;
		var StateDeviceStartUp = jsonData.data[0].row[0].StateDeviceStartUp;
		var DelayDeviceStartUp = jsonData.data[0].row[0].DelayDeviceStartUp;
		var PowerCyclePeriod = jsonData.data[0].row[0].PowerCyclePeriod;
		var InRushGuardDelay = jsonData.data[0].row[0].InRushGuardDelay;
		var LoadShedding = jsonData.data[0].row[0].LoadShedding;
//		statedevicestartupid = jsonData.data[0].row[a]statedevicestartupid;
	}

	$('#PMPopUp').dialog({
		modal: true,
		width: "auto",
		autoResize: true,
		maxHeight: "auto",
	});	
	$('#PMPopUp').load('pages/PM/powermanagement2editpopup.html',function(){
		$("#externalsensorid option").each(function(){			
			if(ExternalSensor.toLowerCase() == $(this).val().toLowerCase()){
				$(this).attr('selected',true);
			}
		});
		$("#statedevicestartupid option").each(function(){			
			if(StateDeviceStartUp.toLowerCase() == $(this).val().toLowerCase()){
				$(this).attr('selected',true);
			}
		});
		$("#delaydevicestartupid option").each(function(){			
			if(DelayDeviceStartUp.toLowerCase() == $(this).val().toLowerCase()){
				$(this).attr('selected',true);
			}
		});
		$("#powercycleperiodid option").each(function(){			
			if(PowerCyclePeriod.toLowerCase() == $(this).val().toLowerCase()){
				$(this).attr('selected',true);
			}
		});
		$("#guarddelayid option").each(function(){			
			if(InRushGuardDelay.toLowerCase() == $(this).val().toLowerCase()){
				$(this).attr('selected',true);
			}
		});
		$("#loadsheddingid option").each(function(){			
			if(LoadShedding.toLowerCase() == $(this).val().toLowerCase()){
				$(this).attr('selected',true);
			}
		});
		$('#altitudeid').val(Altitude);
		$('#devicenameid').val(HostName);
		$("#OutletNumber1").trigger("click");
	});

}

function savePMEditSaveSub(){
	var HostName = $("#PMhostname").val();
	var ManagementIp = $("#PMip").val();
	var PowerSupply = $("#outletpower").val();
	var ctrOut=0;
	for(var t=0; t<outletBinding.length ; t++){
		if(outletBinding[t].Outlet == selectedOutletPower){
			outletBinding[t].HostName = HostName;
			outletBinding[t].ManagementIp = ManagementIp;
			outletBinding[t].PowerSupply = PowerSupply;
			break;
		}
	}
}

/*
*
*  FUNCTION NAME : showEditInformation
*  AUTHOR        : Maureen Daelo
*  DATE          :
*  MODIFIED BY   :
*  REVISION DATE :
*  REVISION #    :
*  DESCRIPTION   : edit information
*  PARAMETERS    : id,table,action*
*  
*/
function showEditInformation2(jsonData){
	var outlet = '';	
	var power = '';
	if (jsonData.data[0].outlet){
		for (var a=0;a<jsonData.data[0].outlet.length;a++){

			var RMSVoltage = getPMDataFromJSON(jsonData.data[0].outlet[a].RMSVoltage);
			var RMSCurrent = getPMDataFromJSON(jsonData.data[0].outlet[a].RMSCurrent);	
			var ManagementIp = getPMDataFromJSON(jsonData.data[0].outlet[a].ManagementIp);
			var OutletNumber = getPMDataFromJSON(jsonData.data[0].outlet[a].OutletNumber); 
			var ActivePower = getPMDataFromJSON(jsonData.data[0].outlet[a].ActivePower);
			var PowerFactor = getPMDataFromJSON(jsonData.data[0].outlet[a].PowerFactor);
			var ActiveEnergy = getPMDataFromJSON(jsonData.data[0].outlet[a].ActiveEnergy);
			
	
			if (jsonData.data[0].outlet[a].ManagementIp == "" || jsonData.data[0].outlet[a].ManagementIp == undefined){
				var ManagementIp = "";
			}else{
				var HostName = jsonData.data[0].outlet[a].HostName;
			}
			if (jsonData.data[0].outlet[a].HostName == "" || jsonData.data[0].outlet[a].HostName == undefined){
				var HostName = "";
			}else{
				var HostName = jsonData.data[0].outlet[a].HostName;
			}

			if (jsonData.data[0].outlet[a].PowerSupply == "" || jsonData.data[0].outlet[a].PowerSupply == undefined){
				var PowerSupply = "";
			}else{
				var PowerSupply = jsonData.data[0].outlet[a].PowerSupply;
			}

			var outletNum = jsonData.data[0].outlet[a].OutletNumber;
			outlet += "<li style='width: auto;' id='"+outletNum+"' onclick=\"changePDUOutlet('"+RMSVoltage+"','"+RMSCurrent+"','"+ActivePower+"','"+PowerFactor+"','"+ActiveEnergy+"','"+HostName+"','"+ManagementIp+"','"+OutletNumber+"','"+PowerSupply+"','"+outletNum+"')\"";
			if(a == 0){
				outlet += " class='ui-state-default ui-corner-top ui-tabs-active ui-state-active'>";
				selectedOutletPower = outletNum;
			}else{
				outlet += " class='ui-state-default ui-corner-top'>";
			}
			outlet += "<a class='ui-tabs-anchor' ";
			outlet += "role='presentation'>Outlet "+outletNum+"</a></li>";

//			var HostName = $('#PMhostname > option:selected').text();
//			var ManagementIp = $('#PMip > option:selected').text();
//			var PowerFactor = jsonData.data[0].outlet[0].PowerFactor;
///			var PowerSupply = $('#outletpower > option:selected').text();
			var ctrOut=0;
			for(var t=0; t<outletBinding.length ; t++){
				if(outletBinding[t].Outlet == outletNum){
					outletBinding[t].HostName = HostName;
					outletBinding[t].ManagementIp = ManagementIp;
					outletBinding[t].PowerSupply = PowerSupply;
					outletBinding[t].ActiveEnergy = ActiveEnergy;
					outletBinding[t].ActivePower = ActivePower;
					outletBinding[t].OutletNumber = outletNum;
					outletBinding[t].PowerFactor = PowerFactor;
					outletBinding[t].RMSCurrent = RMSCurrent;
					outletBinding[t].RMSVoltage = RMSVoltage;
					ctrOut++;;
					break;
				}
			}
			if(ctrOut ==0){
				outletBinding.push({"Outlet":outletNum,"HostName":HostName,"ManagementIp":ManagementIp,"PowerSupply":PowerSupply,"ActiveEnergy":ActiveEnergy,"ActivePower":ActivePower,"OutletNumber":outletNum,"PowerFactor":PowerFactor,"RMSCurrent":RMSCurrent,"RMSVoltage":RMSVoltage});
			}

			
		}
		var RMSVoltage = getPMDataFromJSON(jsonData.data[0].outlet[0].RMSVoltage);
		var RMSCurrent = getPMDataFromJSON(jsonData.data[0].outlet[0].RMSCurrent);
		var OutletNumber = getPMDataFromJSON(jsonData.data[0].outlet[0].OutletNumber);
		var ActivePower = getPMDataFromJSON(jsonData.data[0].outlet[0].ActivePower);
		var PowerFactor = getPMDataFromJSON(jsonData.data[0].outlet[0].PowerFactor);
		var PowerSupply = getPMDataFromJSON(jsonData.data[0].outlet[0].PowerSupply);

		if (jsonData.data[0].outlet[0].HostName){
			if (jsonData.data[0].outlet[0].HostName == "" || jsonData.data[0].outlet[0].HostName == undefined){
				var HostName = "";
			}else{
				var HostName = jsonData.data[0].outlet[0].HostName;
			}
		}
	
		if (jsonData.data[0].outlet[0].ManagementIp){
			if (jsonData.data[0].outlet[0].ManagementIp == "" || jsonData.data[0].outlet[0].ManagementIp == undefined){
				var ManagementIp = "";
			}else{
				var ManagementIp = jsonData.data[0].outlet[0].ManagementIp;
			}
		}



		if (jsonData.data[0].outlet[0].ActiveEnergy == "" || jsonData.data[0].outlet[0].ActiveEnergy == undefined){
			var ActiveEnergy = "";
		}else{
			var ActiveEnergy = jsonData.data[0].outlet[0].ActiveEnergy;
		}
	}

			
	power += "<td>"+RMSVoltage+"</td>"
	power += "<td>"+RMSCurrent+"</td>"
	power += "<td>"+ActivePower+"</td>"
	power += "<td>"+PowerFactor+"</td>"
	power += "<td>"+ActiveEnergy+"</td>"
	if (jsonData.data[0].available){
		for (var b=0; b<jsonData.data[0].available.length; b++){
			var AHost = jsonData.data[0].available[b].AvailableHost;
			var AIp = jsonData.data[0].available[b].AvailableIp;
		
		}
	}else{
		var AHost = '';
		var AIp = '';
	}
	$("#PMhostname option").each(function(){			
		if(HostName.toLowerCase() == $(this).val().toLowerCase()){
			$(this).attr('selected',true);
		}
	});
	$("#PMip option").each(function(){			
		if(ManagementIp.toLowerCase() == $(this).val().toLowerCase()){
			$(this).attr('selected',true);
		}
	});
	$("#outletpower option").each(function(){			
		if(PowerFactor.toLowerCase() == $(this).val().toLowerCase()){
			$(this).attr('selected',true);
		}
	});
	var host = AHost.split(',');
	var ip = AIp.split(',');
	var host2 = '';
	var ip2 = '';
	for (var c=0; c<host.length; c++){
		host2 += "<option>"+host[c]+"</option>";
	}
	for (var d=0; d<ip.length; d++){
		ip2 += "<option>"+ip[d]+"</option>";
	}
	setTimeout(function(){
		$('#taboutlet').empty().append(outlet);
	},1500);
	setTimeout(function(){
		$('#PMhostname').empty().append(host2);
	},1500);
	setTimeout(function(){
		$('#PMip').empty().append(ip2);
	},1500);
	setTimeout(function(){
		$('#outlettable > tbody').empty().append(power);
	},1500);
}

/*-------------------------------------------------------
 * FUNC: outletAttrJSON 
 * DESC: populate Outlet Table content
 * PARAMS: json data from query
 * AUTHOR: kmmabignay
 * DATE: March 26, 2014
 *------------------------------------------------------ */
function outletAttrJSON(jData){
	powerOutletTableObj = {};
	var str = "";
	var row = jData.data[0].row;
	var tableHead = $("#tbOutlet").find('th');
	for(var a=0; a<row.length; a++){
		if(globalDeviceType != "Mobile"){
			var host = jData.data[0].row[a]['HostName'];
			var outname = jData.data[0].row[a]['OutletName'];
			var outnum = jData.data[0].row[a]['Outlet'];
			var outcom = host+"^"+outname+"^"+outnum;
			str += "<tr id='tr"+row[a].DeviceId+"' ";
			str += "onclick='$($(this).find(\"input\")[0]).trigger(\"click\")'><td>";
			str += "<input type='checkbox' name='tbOutlet' class='trOutletDev' ";
			var clickAct = "$(this).trigger(\"click\");powerCheckbox(this.name)";
			str += "outletid='"+row[a].DeviceId+"' onClick='"+clickAct+"'/></td>";
		}else{
			str += "<tr class='trOutletDev' outletid='"+row[a].DeviceId+"'>";
		}
		var tableContentObj = {};
		powerOutletTableObj[row[a].DeviceId] = tableContentObj;
		for(var x=0; x<tableHead.length; x++){
			var name = $(tableHead[x]).attr('name');
			var className = $(tableHead[x]).attr('class');
			if(name==undefined){continue;}
			if(className!=undefined){
				str += "<td class='"+className+"'>"+row[a][name]+"</td>";
			}else{
				str += "<td>"+row[a][name]+"</td>";
			}
			tableContentObj[name] = row[a][name];
		}
		str += "</tr>";
	}
	$('#tbOutlet > tbody').empty().append(str);
	setBlank('tbOutlet');
	if(globalDeviceType != "Mobile"){
	}else{
		$("#tbOutlet").table("refresh");
	}
	if (!($('#PMExpandedView').is(':checked'))){
		$(".PMOexpanded").hide();
	}
}
/*--------------------------------------------------*/

/*
 *
 **
 **  FUNCTION NAME : powerCheckBox
 **  AUTHOR        : Mico D. Dela Cruz
 **  DATE          : March 27, 2014
 **  MODIFIED BY   : kmmabignay
 **  REVISION DATE : March 28, 2014
 **  REVISION #    :
 **  DESCRIPTION   : gets the necesary information based on checked device
 **  PARAMETERS    : table
 **
 **/
function powerCheckbox(table){
	var outname;
	var outnum;
	var statu;
	var statee;
	var selDeviceId;
	var ion =0;
	var ioff=0;
	var zz = 0;
	powerDevices=[];
	powerDevices2=[];
	var cbCtr = 0;
	$(':input[name="'+table+'"]').each(function() {
		var outlet = $(this).attr('outletid');
		/*---highligh rowt---*/
		var tdArr = $(this).parent().parent().find('td');
		for(var xx=0; xx<tdArr.length; xx++){
			if($(this).is(':checked')){
				$(tdArr).css({'background':'#c9e3f0','color':'#000'});
			}else{
				$(tdArr).css({'background':'','color':''});
			}
		}
		/*----------------------*/
		if ($(this).is(':checked')) {
			cbCtr++;
  			checkval = $(this).val();
			outname = powerOutletTableObj[outlet].OutletName;
			outnum = powerOutletTableObj[outlet].Outlet;
			statu = powerOutletTableObj[outlet].State;
			statee = powerOutletTableObj[outlet].Status;
			if(statu=="On" && statee=="Completed"){
				ion++;
			}else if(statu=="Off" && statee=="Completed"){
				ioff++;
			}else{
				zz++;
			}
			selDeviceId = powerOutletTableObj[outlet].PowerControllerIp;
			powerDevices.push(selDeviceId+"^"+outnum);
			powerDevices2.push(outname);
			powerOutletTableObj[outname] = outlet;
		}
	});
	if(table=='tbOutlet'){
		var cbAll = $(':input[name="'+table+'"]').length;
		if(cbAll==cbCtr){
			$("#cbAllOutlet").prop('checked',true);
		}else{
			$("#cbAllOutlet").attr('checked',false);
		}
	}
	EnablePowerButtons(ion,ioff,zz,'');
}

/*
 *
 **
 **  FUNCTION NAME : powerSpecificOutlet
 **  AUTHOR        : Mico D. Dela Cruz
 **  DATE          : March 28, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : gets the necesary information based on chosen specific outlet on dynamic tree
 **  PARAMETERS    : ip,mngip,outletnum
 **
 **/
function powerSpecificOutlet(ip,mngip,outletnum){
	powerDevices = [];
	powerDevices2 = [];
	var ion=0;
	var ioff=0;
	var zz=0;
	var url = getURL("Power","JSON");
	var actionx = 'getoutletip';
	var dObj = {};
	var aaObj = [];
	var qObj = {'QUERY':aaObj};
	dObj['Limit']='20';
	dObj['Page']='1';
	dObj['IP']=ip;
	dObj['MngIP']=mngip;
	dObj['OutletNumber']=outletnum;
	aaObj.push(dObj);
	$.ajax ({
		url: url,
		data: { action: actionx, query: JSON.stringify(qObj) },
		dataType: 'html',
		success: function (data) { 
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(jsonData);
			var dstatus = jsonData.data[0].row[a].OutletState;
			var dstate = jsonData.data[0].row[a].OutletStatus;
			var oipname = jsonData.data[0].row[a].OutletIpName;
			powerDevices.push(ip+"^"+outletnum);
			powerDevices2.push(oipname);
			powerDevicesState.push(dstatus);
			if(dstatus=="On" && dstate=="Completed"){
				ion++;
			}else if(dstatus=="Off" && dstate=="Completed"){
				ioff++;
			}else{
				zz++;
			}
		EnablePowerButtons(ion,ioff,zz,'2');
		}				
	});
}

/*---------------------------------------------------------------*/
/*
 *
 **
 **  FUNCTION NAME : EnablePowerButtons
 **  AUTHOR        : Mico D. Dela Cruz
 **  DATE          : March 27, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : enables the on off and cycle buttons necessary based on device state
 **  PARAMETERS    : ion,ioff,zz
 **
 **/

function EnablePowerButtons(ion,ioff,zz,na){
var powOn="powManOn"+na;
var powOff="powManOff"+na;
var powCycle="powManCycle"+na;
var powEdit="powManEdit"+na;
	$("#"+powOn).addClass('ui-state-disabled');
	$("#"+powOff).addClass('ui-state-disabled');
	$("#"+powCycle).addClass('ui-state-disabled');
	$("#"+powEdit).addClass('ui-state-disabled');
	$("#"+powOn).attr('disabled', 'disabled');
	$("#"+powOff).attr('disabled', 'disabled');
	$("#"+powCycle).attr('disabled', 'disabled');
	$("#"+powEdit).attr('disabled', 'disabled');

	
	if(ion>=1 && ioff==0 && zz==0){
		$("#"+powOff).removeAttr('disabled');
		$("#"+powCycle).removeAttr('disabled');
		$("#"+powOff).removeClass('ui-button-disabled ui-state-disabled').addClass('ui-state-default');
		$("#"+powCycle).removeClass('ui-button-disabled ui-state-disabled').addClass('ui-state-default');
	}else if(ioff>=1 && ion==0 && zz==0){
		$("#"+powOn).removeAttr('disabled');
		$("#"+powOn).removeClass('ui-button-disabled ui-state-disabled').addClass('ui-state-default');

	}else if(ion>=1 && ioff>=1 && zz==0){
		$("#"+powOn).removeAttr('disabled');
		$("#"+powOff).removeAttr('disabled');
		$("#"+powCycle).removeAttr('disabled');
		$("#"+powOn).removeClass('ui-button-disabled ui-state-disabled').addClass('ui-state-default');
		$("#"+powOff).removeClass('ui-button-disabled ui-state-disabled').addClass('ui-state-default');
		$("#"+powCycle).removeClass('ui-button-disabled ui-state-disabled').addClass('ui-state-default');
	}
	if(ion+ioff==1){
		$("#"+powEdit).removeAttr('disabled');
		$("#"+powEdit).removeClass('ui-button-disabled ui-state-disabled').addClass('ui-state-default');

	}else if(ion+ioff==0 && zz==1){
		$("#"+powEdit).removeAttr('disabled');
		$("#"+powEdit).removeClass('ui-button-disabled ui-state-disabled').addClass('ui-state-default');
	}


}

/*
 *
 **
 **  FUNCTION NAME : setPowerDevice
 **  AUTHOR        : Mico D. Dela Cruz
 **  DATE          : March 27,2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : checks the selected devices if it can be turned on,off and cycle
 **  PARAMETERS    : action
 **
 **/

/*----revised--kmmabignay---mar27-----*/
function setPowerDevice(action){
	var x = powerDevices.length;
	var hostname;
	var manIp;
	var conInfo;
	var query="";
	var resAlert="";
	var url = getURL("Power","JSON");
	var actionx = 'checkpower'+action;
	var devArr = [];
	var devObj = {'DEVICE':devArr,'User':globalUserName};
	var queryObj = {'MAINCONFIG':[devObj]};
	for(var i = 0; i<x; i++){
		var attrObj = {};
		conInfo = powerDevices[i];
		hostname = powerDevices2[i].split(" ")[0];
		manIp = powerDevices2[i].split(" ")[1];
		attrObj['Hostname'] = hostname;
		attrObj['ManagementIP'] = manIp;
		attrObj['ControllerInfo'] = conInfo;
		attrObj['LoadConfigPath'] = '';
		attrObj['LoadImagePath'] = '';
		attrObj['SaveConfigPath'] = '';
		attrObj['GracefulShutdown'] = 'false';
		devArr.push(attrObj);
	}
	$.ajax({
		url: url,
		data: { action: actionx, query: JSON.stringify(queryObj) },
		dataType: 'html',
		success: function(data) {
			if(!data){alertUser("Process failed");return;}
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			switch(action){
				case 'on': executePowerCycle(json,action); break;
				case 'off': executePowerCycle(json,action); break;
				case 'cycle': executePowerCycle(json,action); break;
			}
		}
	});
}
/*
 *
 **
 **  FUNCTION NAME : execPowerDevice
 **  AUTHOR        : Mico D. Dela Cruz
 **  DATE          : March 27,2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : send the query to CGI for power on,off,cycle
 **  PARAMETERS    : query,action
 **
 **/

function execPowerDevice(data,action){
	var str="";
	var url = getURL("Power","JSON");
	var actionx = 'checkpower'+action;
	var devArr = data.MAINCONFIG[0].DEVICE;
	var alertArr = [];
	var emailFlag = false;
	var gracefulFlag = false;
	var conti = false;
	var coninfo=[];
	var manIp=[];
	var hostname=[];
	var nuser=[];
	var alertStr = "";
	for(var a=0; a<devArr.length; a++){
	if(powerDevicesState[a] != action){
		if(devArr[a].Continue=="true"){
			if(action=="off"){gracefulFlag=true;}
			coninfo.push(devArr[a].ControllerInfo);
			manIp.push(devArr[a].ManagementIp);
			hostname.push(devArr[a].Hostname);
			nuser.push(devArr[a].User);
			conti=true;
			if(devArr[a].User!=globalUserName){emailFlag=true;}
		
		}else{
			alertArr.push("<tr><td colspan=2>"+devArr[a].Alert);
		}

	}else{
		alertArr.push("<tr><td colspan=2>"+devArr[a].Hostname+" is already "+action);
	}
	
}
	if(alertArr.length>0){
	alertStr = alertArr.join('</td></tr>');
	}
	if(conti==true){
	powerOnOffPop(action,emailFlag,gracefulFlag,coninfo,hostname,manIp,nuser,alertStr);
	}else{
		$( "#powOnOffPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		title: "Power Device",
	});
	$( "#powOnOffPopUp" ).empty().load('pages/PM/PowerOutletPopUp.html',function(){
		setTimeout(function(){
			$(".ui-dialog").position({
			my: "center",
			at: "center",
			of: window
			});
		},1000);
	$("#powOnOffWindowSubmit").css("display","none");
	$("#tblpowOnOff").empty().append(alertStr);
    $("#powOnOffWindowSubmit").css("display","none");

		$(document).on("click", "#powOnOffWindowClose",function(){
		$("#powOnOffPopUp").dialog("close");

	});

	});
}
}
function sendExecPowerDevice(coninfo,manIp,hostname,nuser,em,gf){
	var atObj = {};
		atObj['Hostname'] = hostname;
		atObj['ManagementIP'] = manIp;
		atObj['ControllerInfo'] = coninfo;
		atObj['LoadConfigPath'] = '';
		atObj['LoadImagePath'] = '';
		atObj['SaveConfigPath'] = '';
	//	atObj['Destination'] = '';
		atObj['GracefulShutdown'] = gf;
		atObj['Email'] = em;
		atObj['NewUser']= nuser;
	return atObj;
}


function powerOnOffPop(action,emailFlag,gracefulFlag,coninfo,hostname,manIp,nuser,alertStr){
	var str=alertStr;
	var url = getURL("Power","JSON");
	var actionx = 'power'+action;
	var em = 'false';
	var gf = 'false';
	var dArr = [];
	var dObj = {'DEVICE':dArr,'User':globalUserName};
	var qObj = {'MAINCONFIG':[dObj]};

	if(emailFlag==true){
		str += "<tr><td><input type='checkbox' id='cbPowerEmail'></td>";
		str += "<td><p>Email Notification</p></td></tr>";
	}
	if(gracefulFlag==true){
		str += "<tr><td><input type='checkbox' id='cbGracefulShutdown'></td>";
		str += "<td><p>Graceful Shutdown</p></td></tr>";
	}
		str += "<tr><td><input type='checkbox' id='cbDeviceConfig'></td>";
		str += "<td><p>Device Configuration</p></td></tr>";

	if(action=='on'){
		str += "<tr><td><input type='checkbox' id='cbImageConfig'></td>";
		str += "<td><p>Image Configuration</p></td></tr>";

	}

	$( "#powOnOffPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		title: "Power Device",
	});
	$( "#powOnOffPopUp" ).empty().load('pages/PM/PowerOutletPopUp.html',function(){
		setTimeout(function(){
			$(".ui-dialog").position({
			my: "center",
			at: "center",
			of: window
			});
		},1000);
	$("#tblpowOnOff").empty().append(str);
	$(document).on("click", "#powOnOffWindowClose",function(){
		$("#powOnOffPopUp").dialog("close");

	});
	$(document).on("click", "#powOnOffWindowSubmit",function(){
		if($("#cbPowerEmail") && $('#cbPowerEmail').is(':checked')==true){
			em='true'
			
		}
		if($("#cbGracefulShutdown") && $('#checkbox').is(':checked')==true){
			gf='true';
		}
		for(var x = 0; x<coninfo.length;x++){
			dArr.push(sendExecPowerDevice(coninfo[x],manIp[x],hostname[x],nuser[x],em,gf));
		}
//		sendPowerOptionToCGI(url,actionx,qObj);
		$("#powOnOffPopUp").dialog("close");
	});
	});

}

function sendPowerOptionToCGI(url,actionx,query){
	$.ajax({
		url: url,
		data: { action: actionx, query: JSON.stringify(query) },
		dataType: 'html',
 		success: function(data) {

		}
	});

}
/*-------------------------------------------------------
 * FUNC: btnPMPDU
 * DESC: button function for PDU add,edit,delete
 * PARAMS: btnType(add,edit,del),divId
 * AUTHOR: kmmabignay
 * DATE: March 26, 2014
 *------------------------------------------------------ */
function btnPMPDU(btnType){
	$('#powerMgmtPopup').dialog({
		modal: true,
		width: "auto",
		autoResize: true,
		maxHeight: "auto",
	});	
	$("#powerMgmtPopup").empty().load("pages/PM/AddEditDelPDU.html", function(){
		var popupContent = "";
		switch(btnType){
			case "add":
				if(!validateUserLevel()){return;}
					popupContent = initAddPDUPopup();
					queryBindedResource('selResDomAddPDU');
				break;
			case "edit":
			break;
			case "delete":
				deleteDevicePDU();	
				
			break;
		}
		$("#aedPDUBody").html(popupContent);
	});
	PMDeviceId = '';
}
/*--------------------------------------------------*/

/*-------------------------------------------------------
 * FUNC: initAddPDUPopup 
 * DESC: initialize AutoD Popup
 * RETURN: html string 
 * AUTHOR: kmmabignay
 * DATE: March 26, 2014
 *------------------------------------------------------ */
function initAddPDUPopup(){
	var retStr = "";
	var accSelOpt = ['Telnet','SSH','SNMP'];
	var manuSelOpt = ['Raritan','TrippLite'];
	var modelSelOpt = ['RPX(DPXR20-30L)','TPX2-5464'];
	retStr += createSelectTr('Accessibility:','selAccAddPDU',accSelOpt,'onchangeAccess()');
	retStr += createInputTr('ManagementIp:','inputMgmtAddPDU',1);
	retStr += createSelectTr('Manufacturer:','selManAddPDU',manuSelOpt);
	retStr += createSelectTr('Model:','selModelAddPDU',modelSelOpt);
	retStr += createInputTr('Username:','inputUserAddPDU',1);
	retStr += createInputTr('Password:','inputPassAddPDU',1);
	retStr += createInputTr('Read Community:','inputReadAddPDU',0);
	retStr += createInputTr('Write Community:','inputWriteAddPDU',0);
	retStr += createSelectTr('Resource Domain:','selResDomAddPDU',['Default']);
	return retStr;
	
}
/*--------------------------------------------------*/

/*-------------------------------------------------------
 * FUNC: createInputTr 
 * DESC: create Input box html string
 * RETURN: html string 
 * AUTHOR: kmmabignay
 * DATE: March 26, 2014
 *------------------------------------------------------ */
function createInputTr(label,inputId,dispFlag){
	var style = "text-align:right;100px;white-space:nowrap;";
	style += "width:110px;padding-right:20px;";
	var disp = "";
	if(!dispFlag){disp = "display:none";}
	var retStr = "<tr style='"+disp+"'><td style='"+style+"'>"+label+"</td>";
	var tdStyle = "style='padding-top:5px;padding-bottom:5px;'";
	retStr += "<td "+tdStyle+"><input id='"+inputId+"' ";
	retStr += "style='width:191px;height:25px;' type='text'></td></tr>";
	return retStr;
}
/*--------------------------------------------------*/

/*-------------------------------------------------------
 * FUNC: createSelectTr 
 * DESC: create Combo box html string
 * RETURN: html string 
 * AUTHOR: kmmabignay
 * DATE: March 26, 2014
 *------------------------------------------------------ */
function createSelectTr(label,selId,optArr,onchangeAct){
	var style = "text-align:right;100px;white-space:nowrap;";
	style += "width:110px;padding-right:20px;";
	var seltdStyle = "padding-top:5px;padding-bottom:5px;";
	var selStyle = "white-space:normal;width:200px;height:30px;";
	var retStr = "<tr><td style='"+style+"'>"+label+"</td>";
	retStr += "<td style='text-align:left;"+seltdStyle+"'>";
	retStr += "<select id='"+selId+"' style='"+selStyle+"' ";
	retStr += "onchange='"+onchangeAct+"'>";
	retStr += "<option value='Select'>Select</option>";
	for(var a=0; a<optArr.length; a++){
		retStr += "<option value='"+optArr[a]+"'>"+optArr[a]+"</option>";
	}
	retStr += "</select></td></tr>";
	return retStr;
} 
/*--------------------------------------------------*/

/*-------------------------------------------------------
 * FUNC: queryBindedResource
 * DESC: query userbinded domain and append to combo box
 * PARAMS: divId of the combo box
 * AUTHOR: kmmabignay
 * DATE: March 26, 2014
 *------------------------------------------------------ */
function queryBindedResource(divId){
 	var url = getURL("Power","JSON");
	var action = "getbindeddomain";
	var queryObj = {'QUERY':[{'user':globalUserName}]};
	var queryStr = JSON.stringify(queryObj);
	$.ajax ({
		url: url,
		data: { action: action, query: queryStr },
		dataType: 'html',
		success: function (data) {
			dat2 = data.replace(/'/g,'"');
			var dat = $.parseJSON(dat2);
			var domains = dat.data[0].row[0].Domain.split(',');
			var retStr = "";
			for(var a=0; a<domains.length; a++){
				var domain = domains[a];
				if(domain.toLowerCase=="default"){continue;}
				retStr += "<option value='"+domain+"'>"+domain+"</option>";
			}
			$("#"+divId).append(retStr);
		}	
	});
}
/*--------------------------------------------------*/

/*-------------------------------------------------------
 * FUNC: validateUserLevel
 * DESC: check if userLevel is an authorized user
 * PARAMS: divId of the combo box
 * AUTHOR: kmmabignay
 * DATE: March 26, 2014
 *------------------------------------------------------ */
function validateUserLevel(){
	if(!/admin|manager/i.test(userInformation[0].userLevel)){
		var errMsg = "Unable to add new device. Only a Manager, ";
		errMsg += "an Administrator and System Administrator can ";
		errMsg += "add a new device.";
		alertUser(errMsg);
		return 0;
	}
	return 1;
}

/*-------------------------------------------------------
 * FUNC: clickOkAddPDU
 * DESC: on click handler for Ok in Adding PDU
 * PARAMS: 
 * AUTHOR: kmmabignay
 * DATE: March 26, 2014
 *------------------------------------------------------ */
function clickOkAddPDU(){
	var valObj = {}; 
	var retFlag = true;
	valObj['Access'] = $("#selAccAddPDU").val();
	valObj['ManagementIp'] = $("#inputMgmtAddPDU").val();
	valObj['DeviceType'] = $("#selManAddPDU").val();
	valObj['Model'] = $("#selModelAddPDU").val();
	valObj['Username'] = $("#inputUserAddPDU").val();
	valObj['Password'] = $("#inputPassAddPDU").val();
	valObj['Domain'] = $("#selResDomAddPDU").val();
	valObj['User'] = globalUserName;
	var readcom = $("#inputReadAddPDU").val();
	var writecom = $("#inputWriteAddPDU").val();
	var ipRegPatt = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/; 
	if(/^snmp$/i.test(valObj.Access)){
		if(readcom=="" || writecom==""){
			alertUser("All fields are required.");
			retFlag = false;
		}
	}
	$.each(valObj, function(key,data){
		if(key=="ManagementIp" && !ipRegPatt.test(data)){
			alertUser(data+" is not a valid "+key);
			retFlag = false;
		} 
		if(data=="" || /select/i.test(data)){
			alertUser("All fields are required.");
			retFlag = false;
		}
	});
	/*--string query json for pdu add--*/
	var time = new Date().getTime();
	var logName = globalUserName+"_"+time;
	valObj['LogsName'] = logName;
	valObj['Type'] = "power";
	valObj['SaveOption'] = "Save";
	var devObj = {'DEVICE':[valObj]};
	var queryObj = {'MAINCONFIG':[devObj]};
	var queryStr = JSON.stringify(queryObj);
	if(retFlag){checkIPinDB(valObj.ManagementIp,queryStr,logName);}
	autoDDevData.push(valObj);
}
/*--------------------------------------------------*/

/*-------------------------------------------------------
 * FUNC: onchangeAccess
 * DESC: on change handler for combo box
 * PARAMS: 
 * AUTHOR: kmmabignay
 * DATE: March 26, 2014
 *------------------------------------------------------ */
function onchangeAccess(){
	if(/^snmp$/i.test($("#selAccAddPDU").val())){
		$("#inputReadAddPDU").parent().parent().attr('style','');
		$("#inputWriteAddPDU").parent().parent().attr('style','');
	}
}

/*-------------------------------------------------------
 * FUNC: sendQueryForAddPDU
 * DESC: sendQuery to start autod
 * PARAMS: queryString, logFilename 
 * AUTHOR: kmmabignay
 * DATE: March 26, 2014
 *------------------------------------------------------ */
function sendQueryForAddPDU(queryStr,logFile,ip){
	var url = getURL("ConfigEditor","JSON");
	var action = "autodiscover";
	$.ajax ({
		url: url,
		data: { action: action, query: queryStr },
		dataType: 'html',
		success: function (data) {
			dat2 = data.replace(/'/g,'"');
			var dat = $.parseJSON(dat2);
			var res = dat.RESULT[0].Result;	
			if(res=='1'){
				autoRefreshLogs = setTimeout(function(){
					queryAutoPMLogs(logFile,ip);
				},8000);
				return;
			}else{
				alertUser("Proces failed");
				return;
			}
		}
	});
}
/*--------------------------------------------------*/

/*-------------------------------------------------------
 * FUNC: checkIPinDB
 * DESC: query to check if ip exists in DB
 * PARAMS: ip, queryString, logFilename 
 * AUTHOR: kmmabignay
 * DATE: March 26, 2014
 *------------------------------------------------------ */
function checkIPinDB(ip,queryforAutoD,logFile){
	var url = getURL("ConfigEditor2","JSON");
	var action = "checkdeviceindb";
	var queryObj = {'QUERY':[{'managementip':ip,
		'consoleip':'','hostname':''}]};
	var queryStr = JSON.stringify(queryObj);
	$.ajax ({
		url: url,
		data: { action: action, query: queryStr },
		dataType: 'html',
		success: function (data) {
			dat2 = data.replace(/'/g,'"');
			var dat = $.parseJSON(dat2);
			var res = dat.RESULT[0].Result;
			if(res=='1'){
				sendQueryForAddPDU(queryforAutoD,logFile,ip);
				return;
			}else{
				alertUser(res);
				return;
			}
		}
	});
}
/*--------------------------------------------------*/

/*-------------------------------------------------------
 * FUNC: queryAutoPMLogs
 * DESC: query for autod activity logs
 * PARAMS: logfile name
 * AUTHOR: kmmabignay
 * DATE: March 26, 2014
 *------------------------------------------------------ */
function queryAutoPMLogs(logFile,ip){
	var url = getURL("ConfigEditor","JSON");
	var action = "getdiscoverylogs";
	var queryObj = {'QUERY':[{'filename':logFile,
		'user':globalUserName,'ip':ip}]};
	var queryStr = JSON.stringify(queryObj);
	$.ajax ({
		url: url,
		data: { action: action, query: queryStr },
		dataType: 'html',
		success: function (data) {
			dat2 = data.replace(/'/g,'"');
			var dat = $.parseJSON(dat2);
			var res = dat.DEVICE[0].Logs;
			if(res){
				res = res.split('\n').join('<br/>');
				$("#addPDUContent").css({'display':'none'});
				$("#addPDULogs").css({'display':'block'});
				$("#addPDULogsContent").html(res);
				$("#saveAddPDUPM").attr("onclick","saveAddPDUAutoD('"+logFile+"')");
				if(/completed/i.test(res)){
					clearTimeout(autoRefreshLogs);
				}else{
					queryAutoPMLogs(logFile,ip);
				}
				return;
			}else{
				alertUser("Process failed.");	
				return;
			}
		}
	});
}
/*--------------------------------------------------*/

/*
*
*  FUNCTION NAME : SaveChanges
*  AUTHOR        : Maureen Daelo
*  DATE          :
*  MODIFIED BY   :
*  REVISION DATE :
*  REVISION #    :
*  DESCRIPTION   : 
*  PARAMETERS    : 
*  
*/

function SaveChanges(table){
	
	var actionquery = getQueryForSaving(table);
	var action = actionquery.split('&&&')[0];
	var query = actionquery.split('&&&')[1];


	url = getURL("Power","JSON");
	$.ajax({ 
		url: url,
		data: {
			"action": action,
			"query": query,
		},
		method: 'POST',
		proccessData: false,
		async:false,
		dataType: 'html',
		success: function (data) { 
			data = $.trim(data);
		}
	});
}

function getQueryForSaving(table){
	var qstr = "";
	switch(table.toLowerCase()){
		case "editpdu":
			var deviceName = $("#devicenameid").val();
			var strup = $('#statedevicestartupid > option:selected').html();	
			var delaystart = $('#delaydevicestartupid > option:selected').html();
			var powercycle = $('#powercycleperiodid > option:selected').html();
				
			var guarddelay = $('#guarddelayid > option:selected').html();

			var extsensor = $('#externalsensorid > option:selected').html();
			var altitude = $('#altitudeid').val(); 
			var loadshedding = $('#loadsheddingid > option:selected').html();				
			var deviceArray = new Array();
			var noncritic = "";
			var host = $('#PMhostname > option:selected').html();
			var ip = $('#PMip > option:selected').html();
//	var ip = document.getElementById("ip");
/*			$('input:[name="PowerManagement5Sel"]').each(function() {
				if ($(this).is(':checked')) {
					var checkval = $(this).val();
					deviceArray.push(checkval);
				}
			});*/
			if(deviceArray.length){
				noncritic = deviceArray.join(",");
			}
			var action = "editdevice&&&"			
			qstr = "{'MAINCONFIG': [{'User':'"+globalUserName+"','DeviceId':'"+PMDeviceId+"',";
			qstr += "'available':[{'DeviceName':'"+deviceName+"', 'StateDeviceStartUp':'"+strup+"', 'DelayDeviceStartUp':'"+delaystart+"', 'PowerCyclePeriod':'"+powercycle+"', 'InRushGuardDelay':'"+guarddelay+"', 'ExternalSensor':'"+extsensor+"', 'Altitude':'"+altitude+"', 'LoadShedding':'"+loadshedding+"', 'NonCriticalOutlet':'"+noncritic+"'}],'outlet':[";
			 
			var hostName = $('#PMhostname option:selected').html();
			var ip = $('#PMip option:selected').html();
			var power = $('#outletpower option:selected').html();
/*			for(var t=0; t<outletBinding.length; t++){
//				myArray = outletBinding[t].split("&");
				outletBinding[t].Outlet = outletBinding[t].Outlet.split("_")[1];
				var myHostName = outletBinding[t].HostName;
				var myIp = outletBinding[t].ManagementIp;
				var myPower = outletBinding[t].PowerSupply;
/*				if(myArray[0] == Outletid){
					var myNumber = outletBinding[t].Outlet;
//					var myNumber = myArray[0].split("_");
					qstr += "{'outlet':[{'OutletNumber':'"+myNumber+"', 'HostName':'"+hostName+"', 'ManagementIp':'"+ip+"', 'PowerSupply':'"+power+"'}]}";
				}else{
//					var myNumber = myArray[0].split("_");
					var myNumber = outletBinding[t].Outlet;
					qstr += "{'outlet': [{'OutletNumber':'"+myNumber+"', 'HostName':'"+myHostName+"', 'ManagementIp':'"+myIp+"', 'PowerSupply':'"+myPower+"'}]}";
				}
			}*/
		var query = '';
		var outlet = ''
		query =  outletBinding;
		for (var a=0; a<query.length; a++){
			var ActiveEnergy = query[a].ActiveEnergy;
			var ActivePower = query[a].ActivePower;
			var HostName = query[a].HostName;
			var ManagementIp = query[a].ManagementIp;
			var Outlet = query[a].Outlet;
			var OutletNumber = query[a].OutletNumber;
			var PowerSupply = query[a].PowerSupply;
			var RMSCurrent = query[a].RMSCurrent;
			var RMSVoltage = query[a].RMSVoltage;
			if (a == 0){
				outlet += "{'ActiveEnergy':'"+ActiveEnergy+"','ActivePower':'"+ActivePower+"','HostName':'"+HostName+"','ManagementIp':'"+ManagementIp+"','OutletNumber':'"+OutletNumber+"','PowerSupply':'"+PowerSupply+"','RMSCurrent':'"+RMSCurrent+"','RMSVoltage':'"+RMSVoltage+"'}"; 
			}else{
				outlet += ",{'ActiveEnergy':'"+ActiveEnergy+"','ActivePower':'"+ActivePower+"','HostName':'"+HostName+"','ManagementIp':'"+ManagementIp+"','OutletNumber':'"+OutletNumber+"','PowerSupply':'"+PowerSupply+"','RMSCurrent':'"+RMSCurrent+"','RMSVoltage':'"+RMSVoltage+"'}"; 
			}
		}
		qstr = qstr+outlet+"]}]}";
		break;
	}
	var query = action+qstr;
	return query
}

function closeEditPDU(type){
	$('#PMPopUp').empty().dialog('destroy');
}
/*
 *
 *  FUNCTION NAME : validateNum 
 *  AUTHOR        : Maureen Daelo
 *  DATE          : 
 *  MODIFIED BY   :
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : validate the input from Altitude
 *  PARAMETERS    : 
 *
 */

function validateNum(){
	var getNumber = $("#altitudeid").val();
	numbers = /^[0-9]+$/;
	if(!getNumber.match(numbers)){
		newVal = getNumber.replace(/[a-zA-Z<>`{}~,./?;:'"!@#$%^&*()_+=\-\[\]]+$/, "");
		$("#altitudeid").val(newVal);
	}
}

/*
 *
 *  FUNCTION NAME : changePDUOutlet
 *  AUTHOR        : Maureen Daelo
 *  DATE          : 
 *  MODIFIED BY   :
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : change the value of RMSVoltage,RMSCurrent,ActivePower,PowerFactor,ActiveEnergy on table power table
 *  PARAMETERS    : RMSVoltage,RMSCurrent,ActivePower,PowerFactor,ActiveEnergy
 *
 */
function changePDUOutlet(RMSVoltage,RMSCurrent,ActivePower,PowerFactor,ActiveEnergy,HostName,ManagementIp,OutletNumber,PowerSupply,Outlet){
	for(var t=0; t<outletBinding.length ; t++){
		$('#'+outletBinding[t].Outlet).removeClass("ui-corner-top ui-tabs-active ui-state-active");
		$('#'+outletBinding[t].Outlet).addClass("ui-corner-top ui-tabs-default");
		if(outletBinding[t].Outlet == Outlet){
			HostName = outletBinding[t].HostName;	
			ManagementIp = outletBinding[t].ManagementIp;
			PowerSupply = outletBinding[t].PowerSupply;
		}
	}
	selectedOutletPower = Outlet;
	$('#'+Outlet).removeClass("ui-corner-top ui-tabs-default");
	$('#'+Outlet).addClass("ui-corner-top ui-tabs-active ui-state-active");
	var powerPDUOutlet = '';
	powerPDUOutlet += "<td>"+RMSVoltage+"</td>"
	powerPDUOutlet += "<td>"+RMSCurrent+"</td>"
	powerPDUOutlet += "<td>"+ActivePower+"</td>"
	powerPDUOutlet += "<td>"+PowerFactor+"</td>"
	powerPDUOutlet += "<td>"+ActiveEnergy+"</td>"
	$("#PMhostname option").each(function(){			
		if(HostName.toLowerCase() == $(this).val().toLowerCase()){
			$(this).attr('selected',true);
		}
	});
	$("#PMip option").each(function(){			
		if(ManagementIp.toLowerCase() == $(this).val().toLowerCase()){
			$(this).attr('selected',true);
		}
	});
	$("#outletpower option").each(function(){			
		if(PowerSupply.toLowerCase() == $(this).val().toLowerCase()){
			$(this).attr('selected',true);
		}
	});

	setTimeout(function(){
		$('#outlettable > tbody').empty().append(powerPDUOutlet);
		$("#currOutNum").val(Outlet);
	},1500);
}
function getPMDataFromJSON(data){
	var str = "";
	if(data != "" && data != undefined){
		str = data;
	}else{
		str = "";
	} 
	return str;
}

/*-------------------------------------------------------
 * FUNC: saveAddPDUAutoD
 * DESC: sendquery for save Add PDU
 * PARAMS: logfile name
 * AUTHOR: kmmabignay
 * DATE: March 27, 2014
 *------------------------------------------------------ */
function saveAddPDUAutoD(logFile){
	var url = getURL("RM","JSON");
	var action = "saveinformation";
	var queryObj = {'QUERY':[{'logname':logFile}]};
	var queryStr = JSON.stringify(queryObj);
	clearTimeout(autoRefreshLogs);
	$.ajax ({
		url: url,
		data: { action: action, query: queryStr },
		dataType: 'html',
		success: function (data) {
			dat2 = data.replace(/'/g,'"');
			var dat = $.parseJSON(dat2);
			var res = dat.RESULT[0].Result;
			var msg = ""; var execFunc = "";
			if(res=='1'){
				msg = "Device successfully added.";
			}else{
				msg = "Process failed";
			}
			if(globalDeviceType=="Mobile"){
				alertUser(msg);
			}else{
				execFunc = "$('#powerMgmtPopup').dialog('close');";
				execFunc += "PMRibbon('','PDU');showPMTable(0);";
				execFunc += "LoadPowerManagement('getpdu',1,20,globalCIP,'PowerManagement2','tbPDU')";
				alerts(msg,execFunc);
			}
		}
	});
}
/*------------------------------------------------------ */

/*-------------------------------------------------------
 * FUNC: clickAllCBoxPM
 * DESC: click all action handler
 * PARAMS: cbAll id, name of input
 * AUTHOR: kmmabignay
 * DATE: March 27, 2014
 *------------------------------------------------------ */
function clickAllCBoxPM(cbAllId,name){
	var allCheckFlag = $("#"+cbAllId).is(":checked");
	$(':input[name="'+name+'"]').each(function() {
		if(allCheckFlag && !$(this).is(":checked")){
			$(this).prop('checked',true);
		}
		if(!allCheckFlag && $(this).is(":checked")){
			$(this).attr('checked',false);
		}
	});
	powerCheckbox(name);
}
/*------------------------------------------------------ */

/*-------------------------------------------------------
 * FUNC: executePowerCycle 
 * DESC: to execute power cycle
 * PARAMS: data from checkpower query
 * AUTHOR: kmmabignay
 * DATE: March 27, 2014
 *------------------------------------------------------ */
function executePowerCycle(data,aaction){
	var devArr = data.MAINCONFIG[0].DEVICE;
	var alertArr = [];
	var devConArr = [];
	var devOutletArr = [];
	var confArr = [];
	var emailFlag = false;
	for(var a=0; a<devArr.length; a++){
		var devType = devArr[a].DeviceType;
		var manu = devArr[a].Manufacturer;
		var host = devArr[a].Hostname;
		var devAlert = devArr[a].Alert;
		var devUser = devArr[a].User;
		var contFlag = devArr[a].Continue;
		var key = host+" "+devArr[a].ManagementIp;
		var devOutlet = powerOutletTableObj[key];
		powerOutletTableObj[host] = devArr[a];
		/*-----------------------------*/
		alertArr.push(devAlert);
		if(contFlag=='false'){continue;}
		if(devUser!=globalUserName){emailFlag=true;}
		if(/dut/i.test(devType) && /cisco|juniper/i.test(manu)){
			confArr.push(devOutlet);
		}
		devConArr.push(host);
		devOutletArr.push(devOutlet);
			
	}
	powerOutletTableObj['ConfigArr'] = confArr;
	var alertStr = alertArr.join('<br/>');
	if(devConArr.length==0){alertUser(alertStr);return;}
	var content = "<table>";
	if(emailFlag){
		content += createCheckboxTr('E-mail Notification','cbpcEmainNotif','pcENotif',0);
	}
	if(confArr.length>0){
		var endConfig = "selectConfigImagePM(\"Save\",\"Config\");";
		var endImage = "selectConfigImagePM(\"Save\",\"Image\");";
		var startConfig = "selectConfigImagePM(\"Load\",\"Config\");";
		var startImage = "selectConfigImagePM(\"Load\",\"Image\");";
		if(aaction=='off' || aaction=='cycle'){
			content += createCheckboxTr('Graceful Shutdown','cbpcGraceShut','pcGraceShut',1);
			content += createCheckboxTr('Save Device Configuration','cbpcSaveConfig','pcSaveConf',0,endConfig);
			content += createCheckboxTr('Save Device Image','cbpcSaveImage','pcSaveImage',0,endImage);
		}
		if(aaction=='on' || aaction=='cycle'){
			content += createCheckboxTr('Load Device Configuration','cbpcLoadConfig','pcLoadConf',0,startConfig);
			content += createCheckboxTr('Load Image Configuration','cbpcLoadImage','pcLoadImage',0,startImage);
		}
	}
	content += "</table>";
	var promptMsg = "Are you sure you want to cycle the selected device(s)?";
	promptMsg += "<br/>"+devConArr.join(',');
	var aMsg = alertStr+"<br/><br/>"+promptMsg+"<br/><br/>"+content;
	if(globalDeviceType=="Mobile"){
		error(aMsg,"Power Cycle",alertUser('ok'));
	}else{
		alerts(aMsg,"getQueryFinal(\""+devOutletArr+"\")","yesorno");
	}
}
/*------------------------------------------------------ */

/*-------------------------------------------------------
 * FUNC: createCheckboxTr
 * DESC: create checkBox tr
 * PARAMS: label,cbId,name,flag,act
 * AUTHOR: kmmabignay
 * DATE: March 27, 2014
 *------------------------------------------------------ */
function createCheckboxTr(label,cbId,name,flag,act){
	var retStr = "<tr><td>";
	retStr += "<input id='"+cbId+"' type='checkbox' ";
	if(act!=undefined){retStr += "onClick='"+act+"' ";}	
	if(flag){retStr += "checked='true' ";}
	retStr += "name='"+name+"'/></td>";
	retStr += "<td  style='margin-left:5px'>"+label+"</td>";
	return retStr;
}
/*------------------------------------------------------ */

/*-------------------------------------------------------
 * FUNC: execPowerCmdFinal
 * DESC: final function to execute Power command
 * PARAMS: action,table
 * AUTHOR: kmmabignay
 * DATE: March 27, 2014
 *------------------------------------------------------ */
function execPowerCmdFinal(action,query){
	var url = getURL("Power","JSON");
	$.ajax ({
		url: url,
		data: { action: action, query: query, },
		dataType: 'html',
		success: function (data) { 
			try{
				dat2 = data.replace(/'/g,'"');
				var dat = $.parseJSON(dat2);
				var res = dat.RESULT[0].Result;
				if(/alert/i.test(res)){
					var msg = res;
				}else{
					var msg = "Request submitted.<br/>";
					msg += "Turning "+action+" the devices may take minutes.";	
				}
				alertUser(msg);
			}catch(err){
				alertUser("Process failed");
			}
		}
	});
}
/*------------------------------------------------------ */

/*-------------------------------------------------------
 * FUNC: getQueryFinal 
 * DESC: create final query for Power command
 * PARAMS: devArr
 * AUTHOR: kmmabignay
 * DATE: March 28, 2014
 *------------------------------------------------------ */
function getQueryFinal(devArr){
	devArr = devArr.split(',');
	var devAttrArr = [];
	var devObj = {'DEVICE':devAttrArr,'User':globalUserName};
	var queryObj = {'MAINCONFIG':[devObj]};
	for(var a=0; a<devArr.length; a++){
		var attrKeyVal = {};
		var devInfo = powerOutletTableObj[devArr[a]];
		var devHost = devInfo.HostName;
		var dataInfo = powerOutletTableObj[devHost];
		var controlInfo = powerOutletTableObj[devHost];
		attrKeyVal['Hostname'] = devHost;
		attrKeyVal['ControllerInfo'] = dataInfo.ControllerInfo;
		attrKeyVal['Multiple'] = dataInfo.Multiple;
		attrKeyVal['LoadConfigPath'] = '';
		attrKeyVal['LoadImagePath'] = '';
		attrKeyVal['SaveConfigPath'] = '';
		attrKeyVal['SaveImagePath'] = '';
		attrKeyVal['Destination'] = '';
		attrKeyVal['GracefulShutdown'] = '';
		attrKeyVal['Email'] = 'false';
		attrKeyVal['NewUser'] = '';
		if($("#cbpcGraceShut").is(":checked")){
			attrKeyVal['GracefulShutdown'] = 'true';
		}
		if($("#cbpcEmainNotif").is(":checked")){
			attrKeyVal['Email'] = 'true';
			attrKeyVal['NewUser'] = dataInfo.User;
		}
		if($("#cbpcLoadConfig").is(":checked")){
			attrKeyVal['LoadConfigPath'] = dataInfo.LoadConfigPath;
			attrKeyVal['Destination'] = dataInfo.Destination;
		}
		if($("#cbpcLoadImage").is(":checked")){
			attrKeyVal['LoadImagePath'] = dataInfo.LoadImagePath;
			attrKeyVal['Destination'] = dataInfo.Destination;
		}
		if($("#cbpcSaveConfig").is(":checked")){
			attrKeyVal['SaveConfigPath'] = dataInfo.SaveConfigPath;
		}
		if($("#cbpcSaveImage").is(":checked")){
			attrKeyVal['SaveImagePath'] = dataInfo.SaveImagePath;
		}
		devAttrArr.push(attrKeyVal);
	}
	var queryFinal = JSON.stringify(queryObj);
	execPowerCmdFinal('powercycle',queryFinal);
}
/*------------------------------------------------------ */

/*
 *
 *  FUNCTION NAME : changeHostName
 *  AUTHOR        : Maureen Daelo
 *  DATE          : 
 *  MODIFIED BY   :
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : changing HostName while changing MgmtIp or changing MgmtIp while changing HostName
 *  PARAMETERS    : type 
 *
 */
function changeHostName(type){
	var Hn = $("#PMhostname option:selected").index();
	var ip = $("#PMip option:selected").index();
	if (type == 'host'){
		$("select#PMip").prop('selectedIndex', Hn);
	}else{
		$("select#PMhostname").prop('selectedIndex', ip);
	}
} 

/*-------------------------------------------------------
 * FUNC: selectConfigImagePM
 * DESC: handler for power command options
 * PARAMS: option, type
 * AUTHOR: kmmabignay
 * DATE: March 28, 2014
 *------------------------------------------------------ */
function selectConfigImagePM(option,type){
	if(!$("#cbpc"+option+type).is(":checked")){return;}
	var endHtmlFile = "pages/PM/endReservationPM.html";
	var startHtmlFile = "pages/PM/startReservationPM.html";
	var cancelOnclick = "cancelConfigImagePMPopup('"+option+"','"+type+"')";
	var okOnclick = "okConfigImagePMPopup('"+option+"','"+type+"')";
	$("#powerMgmtPopup").dialog({
		modal: true,
		width: "auto",
		autoResize: true,
		maxHeight: "auto",
	});
	if(option=="Load"){
		$("#powerMgmtPopup").empty().load(startHtmlFile, function(){
			$("#Load"+type+"DetailedView").parent().parent().css({'display':'none'});
			$("#okLoadSelectPM").attr('onclick',okOnclick);
			$("#cancelLoadSelectPM").attr('onclick',cancelOnclick);
			if(type=="Config"){$("#ReserveOptionLoadImageDivPM").hide();}
			if(type=="Image"){$("#ReserveOptionLoadConfigDivPM").hide();}
			selectConfigImagePMPopup(option,type);
		});
	}else{
		$("#powerMgmtPopup").empty().load(endHtmlFile, function(){
			$("#Save"+type+"DetailedView").parent().parent().css({'display':'none'});
			$("#okSaveSelectPM").attr('onclick',okOnclick);
			$("#cancelSaveSelectPM").attr('onclick',cancelOnclick);
			if(type=="Config"){$("#ReserveOptionSaveImageDivPM").hide();}
			if(type=="Image"){$("#ReserveOptionSaveConfigDivPM").hide();}
			selectConfigImagePMPopup(option,type);
		});
	}
	if(globalDeviceType != "Mobile"){
		$(".ui-dialog").position({
			my: "center",
			at: "center",
			of: window
		});
	}
}
function selectConfigImagePMPopup(option,type){
	var devs = powerOutletTableObj['ConfigArr'];
	var devArr = [];
	if(devs.length>0){
		for(var x=0; x<devs.length; x++){
			var attrObj = {};
			var objPath = "Device_"+x;
			var hName = powerOutletTableObj[devs[x]].HostName;
			var model = powerOutletTableObj[hName].Model;
			attrObj['Model'] = model;
			attrObj['HostName'] = hName;
			attrObj['ObjectPath'] = objPath;
			attrObj['DeviceId'] = devs[x];
			devArr.push(attrObj);
		}
	}
	createRowObjforDyn(type,option,devArr);
}
/*------------------------------------------------------ */

/*-------------------------------------------------------
 * FUNC: cancelConfigImagePMPopup
 * DESC: cancel selectConfigImagePMPopup
 * PARAMS: option,type
 * AUTHOR: kmmabignay
 * DATE: March 29, 2014
 *------------------------------------------------------ */
function cancelConfigImagePMPopup(option,type){
	$("#cbpc"+option+type).attr('checked',false);
	$("#powerMgmtPopup").dialog('close');
}
/*------------------------------------------------------ */
function okConfigImagePMPopup(option,type){
	var selArr = [];
 	var confArr = powerOutletTableObj['ConfigArr'];
	for(var a=0; a<confArr.length; a++){
		var checkFlag = $(':input[value="'+confArr[a]+'"]').is(":checked");
		if(checkFlag){
			selArr.push(confArr[a]);
		}
	}
	if(selArr.length==0){cancelConfigImagePMPopup(option,type);return;}
	var errorMsg = validateInputs(selArr,false,option,type);
	if(errorMsg!=""){alertUser(errorMsg);return;}
	for(var x=0; x<selArr.length; x++){
		var urlPath = $("#tb"+option+type+"URL"+selArr[x]).val();
		var destPath = $("#tb"+option+type+"Destination"+selArr[x]).val();
		var hName = powerOutletTableObj[selArr[x]].HostName;	
		var destKey = ""; var urlKey = "";
		switch(true){
			case (option=="Save" && type=="Config"):
				urlKey="SaveConfigPath";break;
			case (option=="Save" && type=="Image"):
				urlKey="SaveImagePath";break;
			case (option=="Load" && type=="Config"):
				destKey="Destination";
				urlKey="LoadConfigPath";break;
			case (option=="Load" && type=="Image"):
				destKey="Destination";
				urlKey="LoadImagePath";break;
		}
		powerOutletTableObj[hName][destKey] = destPath;
		powerOutletTableObj[hName][urlKey] = urlPath;
	}
	$("#cbpc"+option+type).prop('checked',true);
	$("#powerMgmtPopup").dialog('close');
}
/*------------------------------------------------------ */

/*-------------------------------------------------------
 * FUNC: cancelPDUAutoD
 * DESC: cancel query logs
 * PARAMS: 
 * AUTHOR: kmmabignay
 * DATE: March 28, 2014
 *------------------------------------------------------ */
function cancelPDUAutoD(){
	var execFunc = "clearTimeout(autoRefreshLogs);";
	execFunc += "if(cancelAutoDQuery()==false){return;}";
	execFunc += "$('#powerMgmtPopup').dialog('close');";
	var msg = "Cancel auto discovery of the device?";
	if(globalDeviceType == "Mobile"){
		confirmation(msg,'Confirmation',execFunc);
	}else{
		alerts(msg,execFunc,"yesno");
	}
}
/*------------------------------------------------------ */




/*
 *
 *  FUNCTION NAME : radioPM
 *  AUTHOR        : Maureen Daelo
 *  DATE          : 
 *  MODIFIED BY   :
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : PowerControllerIP,OutletNumber
 *
 */

function radioPM(PowerControllerIP,OutletNumber){
//	$('.trPDULogs').attr('checked', false);
	$('#powerMgmtPopup').dialog({
		modal: true,
		width: "auto",
		autoResize: true,
		maxHeight: "auto",
	});	
	$("#powerMgmtPopup").empty().load("pages/PM/AddEditDelPDU.html", function(){
		$('#addPDUContent').hide();
		$('#addPDULogs').hide();
		$('#showPDULogs').show();
var url = getURL("Power","JSON");
		$.ajax ({
			url: url,
			data: {
				"action": "showlogs",
				"query": "{'QUERY':[{'PowerControllerIP':'"+PowerControllerIP+"','OutletNumber':'"+OutletNumber+"'}]}" 
			},
			dataType: 'html',
			success: function (data) {
				var dat2 = data.replace(/'/g,'"');
				var jsonData = $.parseJSON(dat2);
				var result = jsonData.RESULT[0].Result;			
				//$("#addPDULogsContent").append(data);
				
				var msg2 = '<table>';
				var msg = result.split("&&");
				for (var a=0; a<msg.length; a++){
					msg2 += "<tr><td>"+msg[a]+"</td></tr>"
					msg2 += "<tr><td></td></tr>"
				}
				msg2 = msg2+"</table>";
				$("#showPDULogsContent").empty().append(msg2);
			}	
		});
	});
	
}

/*
 *
 **
 **  FUNCTION NAME : createTreeView
 **  AUTHOR        : Maureen Daelo
 **  DATE          : March 29, 2014
 **  MODIFIED BY   :
 **  REVISION DATE :
 **  REVISION #    :
 **  DESCRIPTION   : create tree view for power management page
 **  PARAMETERS    : data
 **
 **/
function createPMTreeViewJSON(data){
//	var parser = new DOMParser();
//	var xmlDoc = parser.parseFromString( data , "text/xml" );
	var device = data.MAINCONFIG[0].DEVICE;
	
	var str2 = "<ul id='ulOutlet'>";
	for(x=0; x<device.length; x++){
		var outlet = device[x].OUTLET; 
		var devName = device[x].HostName;
		var ip = device[x].ManagementIp;
		var devId = device[x].DeviceId;
		var deviceOCP = device[x].availableocp;
		if (deviceOCP != undefined && deviceOCP.toLowerCase()!="none" && deviceOCP != ''){
			var label = devName;
			if(devName == ""){
				label = ip;
			}
			str2 += "<li><a id='powerstrip_"+devId+"' did='"+ip+"' name='"+devId+"' onclick=\"showPMTable(1);PMRibbon('','"+label+"');LoadPowerController('"+ip+"');\">"+label+"</a>";
			str2 += "<ul>";
			var avin=device[x].availableinlet;
			if (avin !=null){
			str2 += "<li id='powerInlet'>Inlet<ul>";
				var availInlet = avin.split(",");
				for (var a =0; a<availInlet.length; a++){
					var inHdr = label+" >> Inlet";
					str2 += "<li id='powerinlet_"+devId+"_"+availInlet[a]+"' did='"+ip+"' onclick=\"showPMTable(2);PMRibbon('"+inHdr+"','"+availInlet[a]+"');LoadInlet('"+ip+"',this.id);\"><a>"+availInlet[a]+"</a></li>";
				}
			}
			str2+="</ul></li>";
			var availOCP =deviceOCP.split(",");
			for (var i=0; i<availOCP.length; i++){
				var ocp = availOCP[i];
					var str4 = "";
					str2+="<li><a id='"+devId+"' did='"+ip+"' onclick=\"PMRibbon('"+label+"','"+ocp+"');showPMTable(4);LoadOCP('"+ip+"','"+ocp+"');\">"+ocp+"</a>";
					str2+="<ul id='ulDevices"+devId+"'>";
					str4 = createOutletTreeViewOCPJSON(outlet,ip,devId,ocp,devName,ip);
					str2+=str4;
					str2+="</ul></li>";
				}
			str2+="<li id='ocpLog"+devId+"' myname='"+devName+"' onclick=\"showPMTable(5);PMRibbon('"+label+"','Logs');LoadPDULogs('"+ip+"');\"><a>Logs</a></li>";
			str2+="</ul></li>";
		}else{

			var label = devName;
			if(devName == ""){
				label = ip;
			}
			str2 += "<li><a id='powerstrip_"+devId+"' did='"+ip+"' name='"+devId+"'onclick=\"showPMTable(1);PMRibbon('','"+label+"');LoadPowerController('"+ip+"')\">"+label+"</a>";
			str2 += "<ul>";
			var avin=device[x].availableinlet;
			str2 += "<li id='powerInlet'>Inlet<ul>";
			if (avin !=null){
				var availInlet = avin.split(",");
				for (var a =0; a<availInlet.length; a++){
					var inHdr = label+" >> Inlet";
					str2 += "<li id='powerinlet_"+devId+"_"+availInlet[a]+"' did='"+ip+"'  onclick=\"showPMTable(2);PMRibbon('"+inHdr+"','"+availInlet[a]+"');LoadInlet('"+ip+"',this.id)\"><a>"+availInlet[a]+"</a></li>";
				}
			}
			str2+="</ul></li>";
			str2 += "<li><a id='powerStrip"+devId+"' did='"+ip+"'  onclick=\"showPMTable(3);PMRibbon('"+label+"','Outlet');LoadOutlet('"+ip+"')\">Outlet</a><ul id='ulDevices"+devId+"'>";
			var str4 = "";
			str4 = createOutletTreeViewJSON(outlet,ip,devId);
			if(str4 != ""){
				str2+=str4;
			}
			str2+="</ul></li>";

			str2+="<li id='ocpLog"+devId+"' myname='"+devName+"' did='"+ip+"' onclick=\"showPMTable(5);PMRibbon('"+label+"','Logs');LoadPDULogs('"+ip+"')\"><a>Logs</a></li>";
			str2+="</ul></li>";
		}
	}
	$('#ulPDU').html(str2);
	$("#PMtree").treeview({collapsed: true});
}

function createOutletTreeViewJSON(outlet,ip,devId){
    var str2 = "";
	if (outlet){
		for(var b=0; b<outlet.length; b++){
			var devName = outlet[b].HostName;
			var ip3 = outlet[b].ManagementIp;
			var devId2 = outlet[b].DeviceId;
			var conDevId = outlet[b].ControllerDeviceId;
			var num = outlet[b].Outlet;
			var ipStr = ip;
			var pmsButton = ip+"="+ip3+"="+num;
			if(ip != "null" && ip != "" && ip != undefined){
				ipStr = ip.split(".").join("");
			}
			var label = num;
			if(conDevId == devId){
				if(devName != ""){
					label = num + " " + devName ;
				}	
				if(devName = ""){
					label = num + " " + ip ;
				}
				var ribstr = label.split(" ")[1] ? label.split(" ")[1] : 'OPEN';
				if (ip3==""){
//					ip3=num;
					str2 += "<li><a id='deviceoutlet_"+devId2+"_"+ipStr+"_"+num+"' did='"+ip+"' outlet='"+num+"' name='"+ip3+"' onclick=\"showPMTable(6);PMRibbon('Outlet "+num+"','"+ribstr+"');loadOCPDevices('"+ip+"','"+ip3+"','"+num+"');powerSpecificOutlet('"+ip+"','"+ip3+"','"+num+"');\"><li>"+label+"</a></li>";
				}else{
					str2 += "<li><a id='deviceoutlet_"+devId2+"_"+ipStr+"_"+num+"' did='"+ip+"' outlet='"+num+"' name='"+ip3+"' onclick=\"showPMTable(6);PMRibbon('Outlet "+num+"','"+ribstr+"');loadOCPDevices('"+ip+"','"+ip3+"','"+num+"');powerSpecificOutlet('"+ip+"','"+ip3+"','"+num+"');\"><li>"+label+"</a></li>";
				}
			}
		}
	}
    return str2;
//    clearInterval(refreshIntervalId);
}
function createOutletTreeViewOCPJSON(outlet,ip,devId,ocp,devName,ip){
    var deviceName = devName;
    var str2 = "";
	if (outlet){
		for(b=0; b<outlet.length; b++){
			var devName = $.trim(outlet[b].HostName);
			var ip3 = $.trim(outlet[b].ManagementIp);
			var devId2 = $.trim(outlet[b].DeviceId);
			var num = $.trim(outlet[b].Outlet);
			var ocp1 = $.trim(outlet[b].OverCurrentProtector);
			var log = $.trim(outlet[b].Logs);
			var conDevId = $.trim(outlet[b].ControllerDeviceId);
			var outletOCP = "OCP "+ocp;
			var ipStr = ip;
			if(ip != "null" && ip != "" && ip != undefined){
				ipStr = ip.split(".").join("");
			}
			var label = num;
			if(devId == conDevId && outletOCP == ocp1){
				if(devName != ""){
					label = num + " " + devName ;
				}
				if(devName = ""){
					label = num + " " + ip;
				}
				if (ip3==""){
					str2 += "<li><a id='deviceoutlet_"+devId2+"_"+ipStr+"_"+num+"' did='"+ip+"' outlet='"+num+"' name='"+ip3+"' onclick=\"showPMTable(6);loadOCPDevices('"+ip+"','"+ip3+"','"+num+"')\">"+label+"</a>";
					if(log=="yes"){
						str2 +="<ul><li>";
						str2 +="<a onclick=\"showDeviceLogs('"+ip+"','"+num+"','"+deviceName+"')\">Log</a>";
						str2 +="</li></ul>";
					}
					str2 +="</li>";
					ip3=num;
				 }else{
					str2 += "<li><a id='deviceoutlet_"+devId2+"_"+ipStr+"_"+num+"' did='"+ip+"' outlet='"+num+"' name='"+ip3+"' onclick=\"showPMTable(6);loadOCPDevices('"+ip+"','"+ip3+"','"+num+"')\">"+label+"</a>";
					if (log=="yes"){
						str2 +="<ul><li>";
						str2 +="<a onclick=\"showDeviceLogs('"+ip+"','"+num+"','"+deviceName+"')\">Log</a>";
						str2 +="</li></ul>";
					}
					str2 +="</li>";
				}
			}
		}
	}
    return str2;
}
/*
 *
 *  FUNCTION NAME : radioPM
 *  AUTHOR        : Maureen Daelo
 *  DATE          : 
 *  MODIFIED BY   :
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : PowerControllerIP,OutletNumber
 *
 */

function deletePM(PowerControllerIP,OutletNumber){
//	$('.trPDULogs').attr('checked', false);
	$('#powerMgmtPopup').dialog({
		modal: true,
		width: "auto",
		autoResize: true,
		maxHeight: "auto",
	});	
	$("#powerMgmtPopup").empty().load("pages/PM/AddEditDelPDU.html", function(){
		$('#addPDUContent').hide();
		$('#addPDULogs').hide();
		$('#showPDULogs').hide();
		$('#showPDULogs').hide();
var url = getURL("Power","JSON");
		$.ajax ({
			url: url,
			data: {
				"action": "showlogs",
				"query": "{'QUERY':[{'PowerControllerIP':'"+PowerControllerIP+"','OutletNumber':'"+OutletNumber+"'}]}" 
			},
			dataType: 'html',
			success: function (data) {
				var dat2 = data.replace(/'/g,'"');
				var jsonData = $.parseJSON(dat2);
				var result = jsonData.RESULT[0].DATA;			
				//$("#addPDULogsContent").append(data);
				
				
				var msg2 = '<table>';
				var msg = result.split("&&");
				for (var a=0; a<msg.length; a++){
					msg2 += "<tr><td>"+msg[a]+"</td></tr>"
					msg2 += "<tr><td></td></tr>"
				}
				$("#showPDULogsContent").empty().append(msg2);
			}	
		});
	});
	
}
function deleteDevicePDU(){
	$('.trPDU').each(function(){
		if ($(this).is(':checked')){
			PMip.push($(this).attr('did'));
//			ip = ip+',';
		}
	});
	if (PMip.length == 0){
		alert("no solected Device")

	}else{
		$('#powerMgmtPopup').dialog({
			modal: true,
			width: "auto",
			autoResize: true,
			maxHeight: "auto",
		});	
		$("#powerMgmtPopup").empty().load("pages/PM/AddEditDelPDU.html", function(){
			$('#addPDUContent').hide();
			$('#addPDULogs').hide();
			$('#showPDULogs').hide();
			$('#deletePDULogs').show();
	});
		
	}
/*	var url = getURL("Power","JSON");
	$.ajax ({
		url: url,
		data: {
		},
	});*/
	
	
}

function deleteDevicePDU2(){
	var url = getURL("Power","JSON");
		
	$.ajax ({
		url: url,
		data: {
			"action": "powerdelete",
			"query": "{'QUERY':[{'IP':'"+PMip+"'}]}",
		},
		dataType: 'html',
		success: function (data) { 
			dat2 = data.replace(/'/g,'"');
			var jsonData = $.parseJSON(dat2);
			var result = jsonData.RESULT[0].result;
			alert(result) 
		}
	});
	$('#powerMgmtPopup').dialog('close');	
	PMip = [];
}
