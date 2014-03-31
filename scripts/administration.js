/*This script file contains functions that are used in the administration page.
 * Each function should have their own headers for reference to the next
 * developer.*/

/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : 
 #  DATE          :  
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadUserTable
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 14, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads user table
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadUserTable(){
	//var url = "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPy.py?action=loadUser&query=Limit=10$Page=1$Filter=$Sort=$Orderby=";
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPyV3.py?action=loadUser&query=Limit=10$Page=1$Filter=$Sort=$Orderby=&version=3";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			/* PARSE XML
  			var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var datatag = xmlDoc.getElementsByTagName('data'); 
            var row = xmlDoc.getElementsByTagName('row');
			var str = "";
			var totMatch = datatag[0].getAttribute('total');
			$('#totalMatches').empty().append(totMatch);
			for (var a=0;a<row.length;a++){
				str += "<tr id='trUser'>";
				str += "<td>"+row[a].getAttribute('LastName')+"</td>";
				str += "<td>"+row[a].getAttribute('FirstName')+"</td>";
				str += "<td>"+row[a].getAttribute('UserName')+"</td>";
				str += "<td>"+row[a].getAttribute('UserType')+"</td>";
				str += "<td>"+row[a].getAttribute('ResourceProfile')+"</td>";
				str += "<td>"+row[a].getAttribute('ActiveDomain')+"</td>";
				str += "<td>"+row[a].getAttribute('AccessRight')+"</td>";
				str += "<td>"+row[a].getAttribute('UserStatus')+"</td>";
				str += "</tr>";
			}
			*/
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#totalMatches').empty().append(totMatch);
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				str += "<tr class='trUser' uid='"+row.UserId+"'>";
				str += "<td>"+row.LastName+"</td>";
				str += "<td>"+row.FirstName+"</td>";
				str += "<td>"+row.UserName+"</td>";
				str += "<td>"+row.UserType+"</td>";
				str += "<td>"+row.ResourceProfile+"</td>";
				str += "<td>"+row.ActiveDomain+"</td>";
				str += "<td>"+row.AccessRight+"</td>";
				str += "<td>"+row.UserStatus+"</td>";
				str += "</tr>";
			}
			console.log('str>>',str);
			$('#usersAdmin-table > tbody').empty().append(str);
			$("#usersAdmin-table").table("refresh");
			
			accessRemoveAndHighlight();
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadGroupTable
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 15, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads group table
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadGroupTable(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPy.py?action=LoadGroup&query=Limit=10$Page=1$Filter=$Sort=$Orderby=";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			/* PARSE XML
			var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var datatag = xmlDoc.getElementsByTagName('data'); 
            var row = xmlDoc.getElementsByTagName('row');
			var str = "";
			var totMatch = datatag[0].getAttribute('total');
			$('#totalMatches').empty().append(totMatch);
			for (var a=0;a<row.length;a++){
				str += "<tr id='trGroup'>";
				str += "<td>"+row[a].getAttribute('GroupName')+"</td>";
				str += "<td>"+row[a].getAttribute('Description')+"</td>";
				str += "<td>"+row[a].getAttribute('ZoneName')+"</td>";
				str += "<td>"+row[a].getAttribute('ResourceProfile')+"</td>";
				str += "<td>"+row[a].getAttribute('AccessRight')+"</td>";
				str += "<td>"+row[a].getAttribute('NumberOfUser')+"</td>";
				str += "<td>"+row[a].getAttribute('NumOfDevices')+"</td>";
				str += "<td>"+row[a].getAttribute('AddedBy')+"</td>";
				str += "<td>"+row[a].getAttribute('DateAdded')+"</td>";
				str += "<td>"+row[a].getAttribute('Status')+"</td>";
				str += "</tr>";
			}
			*/
		
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#totalMatches').empty().append(totMatch);
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				str += "<tr class='trGroup' gid='"+row.GroupId+"'>";
				str += "<td>"+row.GroupName+"</td>";
				str += "<td>"+row.Description+"</td>";
				str += "<td>"+row.ZoneName+"</td>";
				str += "<td>"+row.ResourceProfile+"</td>";
				str += "<td>"+row.AccessRight+"</td>";
				str += "<td>"+row.NumberOfUser+"</td>";
				str += "<td>"+row.NumOfDevices+"</td>";
				str += "<td>"+row.AddedBy+"</td>";
				str += "<td>"+row.DateAdded+"</td>";
				str += "<td>"+row.Status+"</td>";
				str += "</tr>";
			}

			console.log('str>>',str);
			$('#groupsAdmin-table > tbody').empty().append(str);
			$("#groupsAdmin-table").table("refresh");
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadDomainTable
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 15, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads domain table
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadDomainTable(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPy.py?action=LoadRDomNew&query=Limit=10$Page=1$Filter=$Sort=$Orderby=";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var datatag = xmlDoc.getElementsByTagName('data'); 
            var row = xmlDoc.getElementsByTagName('row');
			var str = "";
			var totMatch = datatag[0].getAttribute('total');
			$('#totalMatches').empty().append(totMatch);
			for (var a=0;a<row.length;a++){
				str += "<tr id='trDomain'>";
				str += "<td>"+row[a].getAttribute('DomainName')+"</td>";
				str += "<td>"+row[a].getAttribute('DomainDescription')+"</td>";
				str += "<td>"+row[a].getAttribute('NumDevices')+"</td>";
				str += "<td>"+row[a].getAttribute('NumZones')+"</td>";
				str += "<td>"+row[a].getAttribute('AffiliationCount')+"</td>";
				str += "<td>"+row[a].getAttribute('UserCount')+"</td>";
				str += "<td>"+row[a].getAttribute('DomainAdmin')+"</td>";
				str += "<td>"+row[a].getAttribute('BoundRTM')+"</td>";
				str += "<td>"+row[a].getAttribute('TimeZone')+"</td>";
				str += "</tr>";
			}
			console.log('str>>',str);
			$('#domainsAdmin-table > tbody').empty().append(str);
			$("#domainsAdmin-table").table("refresh");
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadAccRightsTable
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 15, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads access rights table
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadAccRightsTable(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPy.py?action=LoadARig&query=Limit=10$Page=1$Filter=$Sort=$Orderby=";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var datatag = xmlDoc.getElementsByTagName('data'); 
            var row = xmlDoc.getElementsByTagName('row');
			var str = "";
			var totMatch = datatag[0].getAttribute('total');
			$('#totalMatches').empty().append(totMatch);
			for (var a=0;a<row.length;a++){
				str += "<tr id='trAccRights'>";
				str += "<td>"+row[a].getAttribute('AccessRightsName')+"</td>";
				str += "<td>"+row[a].getAttribute('Action')+"</td>";
				str += "<td>"+row[a].getAttribute('EntityType')+"</td>";
				str += "<td>"+row[a].getAttribute('Description')+"</td>";
				str += "</tr>";
			}
			console.log('str>>',str);
			$('#accrightsAdmin-table > tbody').empty().append(str);
			$("#accrightsAdmin-table").table("refresh");
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadAccessTable
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 15, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads access table
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadAccessTable(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPy.py?action=UserLogs&query=Limit=10$Page=1$Filter=$Sort=$Orderby=";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var datatag = xmlDoc.getElementsByTagName('data'); 
            var row = xmlDoc.getElementsByTagName('row');
			var str = "";
			var totMatch = datatag[0].getAttribute('total');
			$('#totalMatches').empty().append(totMatch);
			for (var a=0;a<row.length;a++){
				str += "<tr id='trAccess'>";
				str += "<td>"+row[a].getAttribute('UserName')+"</td>";
				str += "<td>"+row[a].getAttribute('UserId')+"</td>";
				str += "<td>"+row[a].getAttribute('UserType')+"</td>";
				str += "<td>"+row[a].getAttribute('LogInDate')+"</td>";
				str += "<td>"+row[a].getAttribute('LogInTime')+"</td>";
				str += "<td>"+row[a].getAttribute('NumHours')+"</td>";
				str += "</tr>";
			}
			console.log('str>>',str);
			$('#accessAdmin-table > tbody').empty().append(str);
			$("#accessAdmin-table").table("refresh");
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadServerInfoTable
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 17, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads server info table
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function loadServerInfoTable(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPy.py?action=ServerInfo&query=Limit=10$Page=1$Filter=$Sort=$Orderby=";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var datatag = xmlDoc.getElementsByTagName('data'); 
            var row = xmlDoc.getElementsByTagName('row');
			var str = "";
			var totMatch = datatag[0].getAttribute('total');
			$('#totalMatches').empty().append(totMatch);
			for (var a=0;a<row.length;a++){
				str += "<tr id='trServerInfo'>";
				str += "<td>"+row[a].getAttribute('ServerInformationId')+"</td>";
				str += "<td>"+row[a].getAttribute('ServerType')+"</td>";
				str += "<td>"+row[a].getAttribute('Hostname')+"</td>";
				str += "<td>"+row[a].getAttribute('Authentication')+"</td>";
				str += "<td>"+row[a].getAttribute('NTP')+"</td>";
				str += "<td>"+row[a].getAttribute('Status')+"</td>";
				str += "<td>"+row[a].getAttribute('BindedDomains')+"</td>";
				str += "<td>"+row[a].getAttribute('PrimaryInterface')+"</td>";
				str += "<td>"+row[a].getAttribute('PrimaryIP')+"</td>";
				str += "<td>"+row[a].getAttribute('PrimaryNetMask')+"</td>";
				str += "<td>"+row[a].getAttribute('PrimaryGateway')+"</td>";
				str += "<td>"+row[a].getAttribute('SecondaryInterface')+"</td>";
				str += "<td>"+row[a].getAttribute('SecondaryIP')+"</td>";
				str += "<td>"+row[a].getAttribute('SecondaryNetMask')+"</td>";
				str += "</tr>";
			}
			console.log('str>>',str);
			$('#serverInfoAdmin-table > tbody').empty().append(str);
			$("#serverInfoAdmin-table").table("refresh");
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadEmailTable
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 17, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads email notification table
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function loadEmailTable(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPy.py?action=LoadUser&query=Limit=10$Page=1$Filter=$Sort=$Orderby=";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			var mydata = data;
            var parser = new DOMParser();
            var xmlDoc;
            xmlDoc = parser.parseFromString( mydata , "text/xml" );
			var datatag = xmlDoc.getElementsByTagName('data'); 
            var row = xmlDoc.getElementsByTagName('row');
			var str = "";
			var totMatch = datatag[0].getAttribute('total');
			$('#totalMatches').empty().append(totMatch);
			for (var a=0;a<row.length;a++){
				str += "<tr id='trEmail'>";
				str += "<td>"+row[a].getAttribute('LastName')+"</td>";
				str += "<td>"+row[a].getAttribute('FirstName')+"</td>";
				str += "<td>"+row[a].getAttribute('UserName')+"</td>";
				str += "<td>"+row[a].getAttribute('PrimaryEmail')+"</td>";
				str += "<td>"+row[a].getAttribute('SecondaryRecepients')+"</td>";
				str += "</tr>";
			}
			console.log('str>>',str);
			$('#emailAdmin-table > tbody').empty().append(str);
			$("#emailAdmin-table").table("refresh");
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadLogsTable
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 17, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads logs table
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function loadLogsTable(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPy.py?action=initLogs&query=Limit=10$Page=1";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			
			var str = "";
			$('#totalMatches').empty().append('1');
			str += "<tr id='trLogs'>";
			str += "<td>02-17-2014</td>";
			str += "</tr>";
			console.log('str>>',str);
			$('#logsAdmin-table > tbody').empty().append(str);
			$("#logsAdmin-table").table("refresh");
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadVLANTable
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 17, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads VLAN Allocation table
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function loadVLANTable(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPy.py?action=&query=Limit=10$Page=1";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			
			var str = "";
			$('#totalMatches').empty().append('1');
			str += "<tr id='trVLAN'>";
			str += "<td>02-17-2014</td>";
			str += "</tr>";
			console.log('str>>',str);
			$('#VLANAdmin-table > tbody').empty().append(str);
			$("#VLANAdmin-table").table("refresh");
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : accessRemoveAndHighlight
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : February 18, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the selected id of the row and highlights the row
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function accessRemoveAndHighlight(){
	globalAccessId = [];
	$(".trUser").on("click",function(){
		var val = $(this).attr('uid');
		if($.inArray(val, globalAccessId) == -1){
			globalAccessId.push(val);
			console.log('Global: ',globalAccessId);	
			$(this).addClass('highlight');
		}else{
			var pos = globalAccessId.indexOf(val);
			globalAccessId.splice(pos,1);
			console.log('Global: ',globalAccessId);	
			$(this).removeClass('highlight');
		}
	});
	$(".trGroup").on("click",function(){
		var val = $(this).attr('gid');
		if($.inArray(val, globalAccessId) == -1){
			globalAccessId.push(val);
			console.log('Global: ',globalAccessId);	
			$(this).addClass('highlight');
		}else{
			var pos = globalAccessId.indexOf(val);
			globalAccessId.splice(pos,1);
			console.log('Global: ',globalAccessId);	
			$(this).removeClass('highlight');
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : changeTab
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : Feb. 19, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : changes tab page in pop up
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function changeTab(divid,ind){
	console.log('changeTab');
	for(var i=1;i<=4;i++){
		console.log('i',i);
		if (ind == i){
			console.log('ind',ind);
			$('#'+divid+'-'+ind).removeClass("ui-screen-hidden");
		}else{
			console.log('hide');
			$('#'+divid+'-'+ind).addClass("ui-screen-hidden");
		}
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadResDomTable
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : Feb. 19, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : load resource domain table in pop up
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadResDomTable(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPyV3.py?action=SelLoadRDom&query=Limit=10$Page=1$Filter=$Sort=$Orderby=$ResourceDomainId=&version=3";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#totalMatches').empty().append(totMatch);
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				str += "<tr class='trUserDomain' did='"+row.ResourceDomainId+"'>";
				str += "<td>"+row.DomainName+"</td>";
				str += "<td>"+row.DomainDescription+"</td>";
				str += "<td>"+row.NumDevices+"</td>";
				str += "<td>"+row.NumZones+"</td>";
				str += "<td>"+row.BoundRTM+"</td>";
				str += "<td><select value='Inactive'><option value='Inactive'>Inactive</option>";
				str += "<option value='Active'>Active</option></select></td>";
				str += "</tr>";
			}
			console.log('str>>',str);
			$('#userDomainsAdmin-table > tbody').empty().append(str);
			$("#userDomainsAdmin-table").table("refresh");
			
			accessRemoveAndHighlight();
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadBindedZone
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : Feb. 19, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : load zone table in pop up
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadBindedZone(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPyV3.py?action=showBindedZone&query=Limit=10$Page=1$Filter=$Sort=$Orderby=$ResourceDomainId=&version=3";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#totalMatches').empty().append(totMatch);
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				str += "<tr class='trUserZone' did='"+row.ResourceZoneId+"'>";
				str += "<td>"+row.ZoneName+"</td>";
				str += "<td>"+row.ZoneDescription+"</td>";
				str += "<td>"+row.NumGroups+"</td>";
				str += "<td>"+row.NumDevices+"</td>";
				str += "</tr>";
			}
			console.log('str>>',str);
			$('#userZonesAdmin-table > tbody').empty().append(str);
			$("#userZonesAdmin-table").table("refresh");
			
			accessRemoveAndHighlight();
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadBindedGroup
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : Feb. 19, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : load groups table in pop up
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadBindedGroup(){
	var url = "https://"+CURRENT_IP+"/cgi-bin/Final/AutoCompleteAdmin/FQueryCgiAdminPyV3.py?action=getBindedGroup&query=Limit=10$Page=1$Filter=$Sort=$Orderby=$ResourceDomainId=1$User=$ZoneId=&version=3";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#totalMatches').empty().append(totMatch);
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				str += "<tr class='trUserGroup' did='"+row.GroupId+"'>";
				str += "<td>"+row.GroupName+"</td>";
				str += "<td>"+row.Description+"</td>";
				str += "<td>"+row.NumOfDevices+"</td>";
				str += "<td>"+row.Status+"</td>";
				str += "</tr>";
			}
			console.log('str>>',str);
			$('#userGroupsAdmin-table > tbody').empty().append(str);
			$("#userGroupsAdmin-table").table("refresh");
			
			accessRemoveAndHighlight();
		}
	});
}


