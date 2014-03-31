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
 #  FUNCTION NAME : 
 #  AUTHOR        : MARLO AGAPAY
 #  DATE          :  
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : ALL INITIALIZED ONCLICKS
 #  PARAMETERS    : 
 #
 #######################################################################
*/
$(document).on('click','#addEditAccRi', function(){
	if(globalDeviceType.toLowerCase() != "mobile")
        saveAccessRights();
});
$(document).on('click','#cancelAccRi', function(){
	if(globalDeviceType.toLowerCase() != "mobile")
        $( "#AdminPopUp" ).dialog("close");
});
$(document).on('click','#editAccRights', function(){
		
	if(globalDeviceType.toLowerCase() != "mobile"){
		globalAdminFunc = "edit";
        $("#AccRightsPopUp").popup({create: function(){
            $("#AccRightsPopUp").popup("open");
        }});
        loadAccRiData();
	}
});

$(document).on('click', '#cancelEditEmailPopUP', function(){
	if(globalDeviceType.toLowerCase() != "mobile")
		$("#AdminPopUp").dialog("close")
});
$(document).on('click', '#deleteAccRights', function(){
	if (globalDeviceType.toLowerCase() != "mobile"){
		globalAdminFunc = "delete";
		deleteAccRi();
	}
});
$(document).on('click', '#cancelUser', function(){
	if (globalDeviceType.toLowerCase() != "mobile"){
        $( "#AdminPopUp" ).dialog("close");
		globalUserDomainIds = [];
		globalUserDomainNames = [];
		globalUserZoneIds = [];
		globalUserZoneNames = [];
		globalUserGroupIds = [];
		globalDynamicSelected = [];	
		globalUGroupPolicyIds = [];
		globalDomainBoundUserIds = [];
		globalUserPolicyIds = [];
		globalUserPolicy2Ids = [];
		loadUserTable();
	}
});
$(document).on('click', '#saveUser', function(){
	if (globalDeviceType.toLowerCase() != "mobile"){
		saveAddEditUser();
	}
});
/*$(document).on('click', '#saveEditedEmailPopUp', function(){
	if (globalDeviceType.toLowerCase() != "mobile"){
		saveEditedEmail();
	}
});*/
$(document).on('click', '#closeLogs', function(){
	if (globalDeviceType.toLowerCase() != "mobile")
		$( "#AdminPopUp" ).dialog("close");
});
$(document).on('click', '#cancelEmailMsg', function(){
	if (globalDeviceType.toLowerCase() != "mobile")
		$( "#AdminPopUp" ).dialog("close");
});
$(document).on('click', '#editUserBtn', function(){
	globalAdminFunc = "edit";
	addAdminPopUp('edituser');
	$('#countries').dropdownchecklist({icon: {}, width: 200, maxDropHeight:100});
});
$(document).on('click', '#CancelNewVlan', function(){
	if (globalDeviceType.toLowerCase() != "mobile")
		$( "#AdminPopUp" ).dialog("close");
});

/*
 #######################################################################
 #
 #  FUNCTION NAME : saveEditedEmail
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : February 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : query for saving
 #  PARAMETERS    : qjson, exec
 #
 #######################################################################
*/
function saveEditedEmail(){
	var primary = $("#editemailid").val();
	var secondary = $("#editadditionalemailid").val();
	var queryObj = {'QUERY':[{'PrimaryEmail':primary,'SecondaryRecepients':secondary,'UserId':+globalSelectedAdminMain[0]}]};
	var queryStr = JSON.stringify(queryObj);
	$.ajax({
		url: getURL('ADMIN2','JSON')+"action=editEmailAccount&query="+queryStr+"&version=3",
		dataType: 'html',
		success: function (data) {
			var mydata = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(mydata)
			var jresult = jsonData.RESULT[0].Result;
			alerts(jresult,"adminPopUpClose();");
			loadEmailTable();/*	
			alerts(data);*/
		}
	});	
}

function pagination(total, type){
//	var first;var second; var third; var fourth; var fifth;
	var num="";
	//var limit=document.getElementById("limitOption").value;
	var limit = $('#limitOption').val();
	GlobalPageType = type;
	TotalRowData = total;	
	pagelimit=limit;
	
	var equals=total/limit;
	if(CurrentPage == "panel"){
		CurrentPage = 1;
		PerPage = CurrentPage;
		loadAdminFunctions();
	}else{
		CurrentPage = PerPage;
	}
	if(Math.round(equals)==equals){
		var total = equals;
		TotalPages = total;
	}else{
		var total = parseInt(equals)+1;
		TotalPages = total;
	}
	for(var a=1, prev=0, next=4; a<=TotalPages && prev<6 && next>-1; a++, prev++, next--){
		if(CurrentPage<=5){
			num += "<a href='#'onclick='singlePage("+a+");' style='text-decoration:none;'>"+a+"</a>&nbsp;";
		}else{
			if(CurrentPage<TotalPages){
				num += "<a href='#' onclick='singlePage("+(CurrentPage+prev)+");' style='text-decoration: none;'>"+(CurrentPage+prev)+"</a>&nbsp;";
			}else if(CurrentPage==TotalPages) {
				num += "<a href='#' onclick='singlePage("+(CurrentPage-prev)+");' style='text-decoration: none;'>"+(CurrentPage-prev)+"</a>&nbsp;";
				break;
			}
		}
	}
	$("#totalPages").empty().append("Pages "+CurrentPage+" of "+total+"");
	$("#pages").empty().append(num);
}
function singlePage(no){
	PerPage = no
	CurrentPage = PerPage;
	if(GlobalPageType == "device"){
		loadManageDevice(PerPage);
	}else{
		loadAdminFunctions();
	}
}
function firstpage(){
	if(TotalRowData != ""){
		PerPage = 1;
		CurrentPage = PerPage;
//		prev = CurrentPage;
	}
	loadAdminFunctions();
}
function prevpage(){
	if(TotalRowData != ""){
		if(CurrentPage==0 || CurrentPage ==1){
			PerPage = 1;
			CurrentPage = PerPage;
//			prev = CurrentPage;
		}else{
			PerPage = CurrentPage - 1;
			CurrentPage = PerPage;
//			prev = CurrentPage;
		}
	}
	loadAdminFunctions();
}
function nextpage(){
	if(TotalRowData != "" && CurrentPage != TotalPages){
		PerPage = CurrentPage + 1;
		CurrentPage = PerPage;
//		next = CurrentPage;
	}
	loadAdminFunctions();
}
function lastpage(){
	if(TotalRowData != ""){
		PerPage = TotalPages;
		CurrentPage = PerPage;
//		next = CurrentPage;
	}
	loadAdminFunctions();
}
function loadAdminFunctions(){
	if(GlobalPageType=="user"){
		loadUserTable();
	}else if(GlobalPageType=="group"){
		loadGroupTable();
	}else if(GlobalPageType=='domain'){
		loadDomainTable();		
	}else if(GlobalPageType=='accessright'){
		loadAccRightsTable();
	}else if(GlobalPageType =='power'){
		loadPower();	
	}else if(GlobalPageType=='access'){
		loadAccessTable();
	}else if(GlobalPageType=='server'){
		loadServerInfoTable();
	}else if(GlobalPageType=='email'){
		loadEmailTable();
	}else if(GlobalPageType=='logs'){
		loadLogsTable();
	}else if(GlobalPageType=='vlan'){
		loadVLANTable();
	}else if(GlobalPageType=='adduserdom'){
		loadDomainBoundtoUser();	
	}else if(GlobalPageType=='device'){
		loadManageDevice(PerPage);
	}

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : logOutUser
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : February 14, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : To loguot the user
 #  PARAMETERS    : username(s)
 #
 #######################################################################
*/
function logOutUser(){
	var url = getURL('ADMIN1','JSON')+"action=outuser&query="+globalUsernamesJson+"&version='3.0'";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){ 
			var data2 = data.replace(/'/g,'"');
			var dat = $.parseJSON(data2);
			if(dat.RESULT[0].Result=="out"){
				changeAdminLabel('Access','Management');
				changeAdminPage(6);
				loadAccessTable();
				alerts("The user(s) has been logout!");
			}else{
				alerts("Please check the connection.");
			}
		}	
	});	
}

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
	var queryObj = {'QUERY':[{'limit':pagelimit,
		'page':PerPage,'sort':'','orderby':'','filter':''}]};
	var queryStr = JSON.stringify(queryObj);
	var url = getURL('ADMIN1','JSON')+"action=loadUser&query="+queryStr+"&version=3.0";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			var totalRow=0;
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#adminTotalMatches').empty().append(totMatch);
			pagination(totMatch, "user");
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				if(globalDeviceType != "Mobile"){
					str += "<tr id='tr"+row.UserId+"'><td><input type='checkbox' class='trUser "+tableClass+"' uid='"+row.UserId+"' name='trUser'/></td>";
				}else{
					str += "<tr class='trUser' uid='"+row.UserId+"'>";
				}
				str += "<td>"+row.LastName+"</td>";
				str += "<td>"+row.FirstName+"</td>";
				str += "<td>"+row.UserName+"</td>";
				str += "<td>"+row.UserType+"</td>";
				str += "<td>"+row.ResourceProfile+"</td>";
				str += "<td>"+row.ActiveDomain+"</td>";
				str += "<td>"+row.AccessRight+"</td>";
				str += "<td>"+row.UserStatus+"</td>";
				str += "</tr>";
				totalRow++;
			}
			$('#usersAdmin-table > tbody').empty().append(str);
			if(globalDeviceType != "Mobile"){
			}else{
				$("#usersAdmin-table").table("refresh");
			}
			globalAdminPage = "Users";
			checkSingleMain('trUser', 'uid');
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadGroupTable
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 15, 2014
 #  MODIFIED BY   : Angeline Bringas 
 #  REVISION DATE : March 27,2014
 #  REVISION #    : 
 #  DESCRIPTION   : loads group table
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadGroupTable(){
	var pagelimit = $('#limitOption').val();
//	var queryObj = {'QUERY':[{'limit':'pagelimit',
//		'page':PerPage,'sort':'','orderby':'','filter':''}]};
//	var queryStr = JSON.stringify(queryObj);
	var url = getURL("ADMIN2","JSON") +"action=LoadGroup&query={'QUERY':[{'limit':'70','page':'1','sort':'','orderby':''}]}&version=3.0";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#adminTotalMatches').html(totMatch);
			pagination(totMatch, "group");
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				if(globalDeviceType != "Mobile"){
					if(a % 2 == 0){
    			        var tableClass = 'alt';
        			}else{
        			    var tableClass = '';
        			}
					str += "<tr id='tradminGroup"+row.GroupId+"' class='"+tableClass+"'><td><input type='checkbox' rpId='"+row.ResourceProfileId+"' zoneName='"+row.ZoneName+"' groupId='"+row.GroupId+"'  name='adminGroupSel' class='trGroup' gid='"+row.GroupId+"' onclick='AdminCheckSingle(\"AdminGroups\")'/></td>";
				}else{
					str += "<tr class='trGroup' id='tradminGroup"+row.GroupId+"' gid='"+row.GroupId+"'>";
				}
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


			$('#groupsAdmin-table > tbody').empty().append(str);

			globalAdminPage = "AdminGroups";
			if(globalDeviceType != "Mobile"){
			}else{
				$("#groupsAdmin-table").table("refresh");
			}
			checkSingleMain('trGroup', 'gid');
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
	var url = getURL("ADMIN2","JSON") + "action=LoadRDomNew&query={'QUERY':[{'limit':'"+pagelimit+"','page':'"+PerPage+"','sort':'','orderby':'','filter':''}]}&version=3.0";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#adminTotalMatches').empty().append(totMatch);
			pagination(totMatch, "domain");
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				if(globalDeviceType != "Mobile"){
					if(a % 2 == 0){
    			        var tableClass = 'alt';
        			}else{
        			    var tableClass = '';
        			}

					str += "<tr id='tr"+row.ResourceDomainId+"' class='"+tableClass+"'><td><input type='checkbox' class='trDomain' did='"+row.ResourceDomainId+"'/></td>";
				}else{
					str += "<tr class='trDomain' did='"+row.ResourceDomainId+"'>";
				}
				str += "<td>"+row.DomainName+"</td>";
				str += "<td>"+row.DomainDescription+"</td>";
				str += "<td>"+row.NumDevices+"</td>";
				str += "<td>"+row.NumZones+"</td>";
				str += "<td>"+row.AffiliationCount+"</td>";
				str += "<td>"+row.UserCount+"</td>";
				str += "<td>"+row.DomainAdmin+"</td>";
				str += "<td>"+row.BoundRTM+"</td>";
				str += "<td>"+row.TimeZone+"</td>";
				str += "</tr>";
			}
			$('#domainsAdmin-table > tbody').empty().append(str);
			if(globalDeviceType != "Mobile"){
			}else{
				$("#domainsAdmin-table").table("refresh");
			}
			checkSingleMain('trDomain', 'did');
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
	if (globalDeviceType!= "Mobile"){
		pagelimit = 50;
	}
	var url =getURL("ADMIN2","JSON") + "action=LoadARig&query={'QUERY':[{'limit':'"+pagelimit+"','page':'"+PerPage+"','sort':'','orderby':'','filter':''}]}&version=3.0";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#adminTotalMatches').empty().append(totMatch);
			pagination(totMatch, "accessright");
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				if(globalDeviceType != "Mobile"){
					if(a % 2 == 0){
    			        var tableClass = 'alt';
        			}else{
        			    var tableClass = '';
        			}
					str += "<tr id='tr"+row.AccessRightsId+"' class='"+tableClass+"'><td><input type='checkbox' class='trAccRights' accrigid='"+row.AccessRightsId+"'/></td>";
				}else{
					str += "<tr class='trAccRights' accrigid='"+row.AccessRightsId+"'>";
				}
				str += "<td>"+row.AccessRightsName+"</td>";
				str += "<td>"+row.Action+"</td>";
				str += "<td>"+row.EntityType+"</td>";
				str += "<td>"+row.Description+"</td>";
				str += "</tr>";
			}
			$('#accrightsAdmin-table > tbody').empty().append(str);
			if(globalDeviceType != "Mobile"){
			}else{
				$("#accrightsAdmin-table").table("refresh");
			}
			globalAdminPage = "AccRights";
			checkSingleMain('trAccRights', 'accrigid');
		}
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : loadPower
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : February 15, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads power table
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function loadPower(){
	var url = getURL('ADMIN2','JSON') + "action=showPowerPolicy&query={'QUERY':[{'limit':'"+pagelimit+"','page':'"+PerPage+"','sort':'','orderby':'','filter':''}]}&version=3.0";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			pagination(totMatch, "power");
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				if(globalDeviceType != "Mobile"){
					if(a % 2 == 0){
    			        var tableClass = 'alt';
        			}else{
        			    var tableClass = '';
        			}
					str += "<tr id='tr"+row.PowerPolicyId+"' class='"+tableClass+"'><td><input type='checkbox' class='trPower' appid='"+row.PowerPolicyId+"'/></td>";
				}else{
					str += "<tr class='trPower' appid='"+row.PowerPolicyId+"'>";
				}
				str += "<td>"+row.PolicyName+"</td>";
				str += "<td>"+row.Description+"</td>";
				str += "<td>"+row.Domains+"</td>";
				str += "<td>"+row.AddedBy+"</td>";
				str += "<td>"+row.EditedBy+"</td>";
				str += "<td>"+row.DateAdded+"</td>";
				str += "</tr>";
			
			}
			$('#powerAdmin-table > tbody').empty().append(str);
			if(globalDeviceType != "Mobile"){
			}else{
			$( "#powerAdmin-table" ).table( "refresh" );
			}
			checkSingleMain('trPower', 'appid');
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
	var url = getURL("ADMIN2","JSON") + "action=UserLogs&query={'QUERY':[{'limit':'"+pagelimit+"','page':'"+PerPage+"','sort':'','orderby':'','filter':''}]}&version3.0";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#adminTotalMatches').empty().append(totMatch);
			pagination(totMatch, "access");
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				if(globalDeviceType != "Mobile"){
					str += "<tr id='trAcc"+row.UserId+"'><td><input type='checkbox' class='trAcc' accid='"+row.UserId+"'/></td>";
				}else{
					str += "<tr class='trAcc' accid='"+row.UserId+"'>";
				}
				str += "<td>"+row.UserName+"</td>";
				str += "<td>"+row.UserId+"</td>";
				str += "<td>"+row.UserType+"</td>";
				str += "<td>"+row.LogInDate+"</td>";
				str += "<td>"+row.LogInTime+"</td>";
				str += "<td>"+row.NumHours+"</td>";
				str += "</tr>";
			}
			$('#accessAdmin-table > tbody').empty().append(str);
			if(globalDeviceType != "Mobile"){
			}else{
				$("#accessAdmin-table").table("refresh");
			}
			$(".adminlogoutbutton").attr('disabled',true);
			$(".adminlogoutbutton").addClass('ui-state-disabled');
			GlobalCommadButton = "logout"
			checkSingleMain('trAcc', 'accid');
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
	var url = getURL("ADMIN2","JSON") +  "action=ServerInfo&query={'QUERY':[{'limit':'"+pagelimit+"','page':'"+PerPage+"','sort':'','orderby':'','filter':''}]}&version=3.0";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#adminTotalMatches').empty().append(totMatch);
			pagination(totMatch, "server");
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				if(globalDeviceType != "Mobile"){
					str += "<tr id='tr"+row.ServerInformationId+"' class='"+tableClass+"'><td><input type='checkbox' class='trServerInfo' siid='"+row.ServerInformationId+"' name='trServerInfo' onclick='serverBtnValidation();'/></td>";
				}else{
					str += "<tr class='trServerInfo' siid='"+row.ServerInformationId+"'>";
				}
				str += "<td>"+row.ServerInformationId+"</td>";
				str += "<td>"+row.ServerType+"</td>";
				str += "<td>"+row.Hostname+"</td>";
				str += "<td>"+row.Authentication+"</td>";
				str += "<td>"+row.NTP+"</td>";
				str += "<td>"+row.Status+"</td>";
				str += "<td>"+row.BindedDomains+"</td>";
				str += "<td>"+row.PrimaryInterface+"</td>";
				str += "<td>"+row.PrimaryIP+"</td>";
				str += "<td>"+row.PrimaryNetMask+"</td>";
				str += "<td>"+row.PrimaryGateway+"</td>";
				str += "<td>"+row.SecondaryInterface+"</td>";
				str += "<td>"+row.SecondaryIP+"</td>";
				str += "<td>"+row.SecondaryNetMask+"</td>";
				str += "</tr>";
			}
			$('#serverInfoAdmin-table > tbody').empty().append(str);
			if(globalDeviceType != "Mobile"){
			}else{
				$("#serverInfoAdmin-table").table("refresh");
			}
			checkSingleMain('trServerInfo', 'siid');
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadEmailTable
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 17, 2014
 #  MODIFIED BY   : Krisfen G. Ducao 
 #  REVISION DATE : March 29, 2014
 #  REVISION #    : 1
 #  DESCRIPTION   : loads email notification table
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadEmailTable(){
	//var url =getURL('ADMIN2','JSON') + "action=LoadUser&query={'QUERY':[{'limit':'"+pagelimit+"','page':'"+PerPage+"','sort':'','orderby':'','filter':''}]}&version=3.0";
	var url =getURL('ADMIN2','JSON') + "action=loaduseremail&query={'QUERY':[{'Filter':'','Sort':'','Orderby':'','Limit':'"+pagelimit+"','Page':'"+PerPage+"'}]}&version=3.0";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#adminTotalMatches').empty().append(totMatch);
			pagination(totMatch, "email");
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				if(globalDeviceType != "Mobile"){
					if(a % 2 == 0){
    			        var tableClass = 'alt';
        			}else{
        			    var tableClass = '';
        			}

					str += "<tr id='trEmail"+row.UserId+"' class='"+tableClass+"' ><td><input type='checkbox' class='trEmail' eid='"+row.UserId+"'/></td>";
				}else{
					str += "<tr class='trEmail' eid='"+row.UserId+"'>";
				}
				str += "<td>"+row.LastName+"</td>";
				str += "<td>"+row.FirstName+"</td>";
				str += "<td>"+row.UserName+"</td>";
				str += "<td>"+row.PrimaryEmail+"</td>";
				if (row.SecondaryRecepients == ""){
					str += "<td>N/A</td>";
				}else{
					str += "<td>"+row.SecondaryRecepients+"</td>";
				}
				str += "</tr>";
			}
			$('#emailAdmin-table > tbody').empty().append(str);
			if(globalDeviceType != "Mobile"){
			}else{
				$("#emailAdmin-table").table("refresh");
			}
			checkSingleMain('trEmail', 'eid');	
		}
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : loadVlanTableInformation
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   :
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function loadVlanTableInformation(){
	globalSelectAddVlanPopUp = [];
	var str = "";
	var url = getURL('ADMIN2','JSON') + "action=checkvlandevices";
	$.ajax({
		url: url,	
		dataType: 'html',
		success: function(data){
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var jresult = jsonData.MAINCONFIG[0].Data;
			for (var a=0;a<jresult.length;a++){
				if(a % 2 == 0)
					var tableClass = 'alt1';
				else
					var tableClass = '';
				str += "<tr id='tr"+jresult[a].DeviceId+"' class='"+tableClass+"'><td><input type='checkbox' class='trVlanChildren' vlanpopid='"+jresult[a].DeviceId+"'/></td>";
				str += "<td>"+jresult[a].HostName+"</td>";
				str += "<td>"+jresult[a].DeviceType+"</td>";
				str += "<td><input id='popdyvlanstart"+jresult[a].DeviceId+"' disabled value='' type='text'></input></td>";
				str += "<td><input id='popdyvlanend"+jresult[a].DeviceId+"' disabled value='' type='text'></input></td>";
				str += "<td><input id='popstatvlanstart"+jresult[a].DeviceId+"' disabled value='' type='text'></input></td>";
				str += "<td><input id='popstatvlanend"+jresult[a].DeviceId+"' disabled value='' type='text'></input></td>";
				str += "<td><input id='popreservedVlan"+jresult[a].DeviceId+"' disabled value='' type='text'></input></td>";
			}
			$('#AddVlanTable > tbody').empty().append(str);
			checkPopUPMain('trVlanChildren', 'vlanpopid');	
		}
	})	
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : uncheckSelectedItem
 #  AUTHOR        :	Krisfen G. Ducao
 #  DATE          : February 17, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function uncheckSelectedItem(){
	if(GlobalCommadButton=="logout"&&globalSelectedAdminMain.length==0){
		$(".adminlogoutbutton").attr('disabled',true);
		$(".adminlogoutbutton").addClass('ui-state-disabled');
		return 0
	}
	if(globalSelectedAdminMain.length!=1){
		return 0
	}
	if(GlobalCommadButton=="Save"){
		var id = "tr"+globalSelectedAdminMain[0]
		var dyvlanstart = "dyvlanstart"+globalSelectedAdminMain[0]
		var dyvlanend ="dyvlanend"+globalSelectedAdminMain[0]
		var statvlanstart = "statvlanstart"+globalSelectedAdminMain[0]
		var statvlanend = "statvlanend"+globalSelectedAdminMain[0]
		$("#"+id).attr('disabled',true);
		$("#"+dyvlanstart).attr('disabled',true);
		$("#"+dyvlanend).attr('disabled',true);
		$("#"+statvlanstart).attr('disabled',true);
		$("#"+statvlanend).attr('disabled',true);
		$("#editvlanrangeallocations").val("Edit");
	}else if(GlobalCommadButton=="logout") {
		$(".adminlogoutbutton").attr('disabled',false);
		$(".adminlogoutbutton").removeClass('ui-state-disabled');
	}
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : editVlanRangeAllocation
 #  AUTHOR        :	Krisfen G. Ducao
 #  DATE          : February 17, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads logs table
 #  PARAMETERS    : 
 #
 #######################################################################
*/
var GlobalCommadButton = "";
function editVlanRangeAllocation(){
	if(globalSelectedAdminMain.length!=1){
		alerts("Please select one item only. Thank you!");
		return 0;
	}
	var btn = $("#editvlanrangeallocations").val();
	if(btn=="Edit"){
		GlobalCommadButton = "Save"
		var id = "tr"+globalSelectedAdminMain[0]
		var dyvlanstart = "dyvlanstart"+globalSelectedAdminMain[0]
		var dyvlanend ="dyvlanend"+globalSelectedAdminMain[0]
		var statvlanstart = "statvlanstart"+globalSelectedAdminMain[0]
		var statvlanend = "statvlanend"+globalSelectedAdminMain[0]
		$("#"+id).attr('disabled',false);
		$("#"+dyvlanstart).attr('disabled',false);
		$("#"+dyvlanend).attr('disabled',false);
		$("#"+statvlanstart).attr('disabled',false);
		$("#"+statvlanend).attr('disabled',false);
		$("#editvlanrangeallocations").val("Save");
	}else{
		GlobalCommadButton = "Edit"
		$("#editvlanrangeallocations").val("Edit");
	}
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
	var url = getURL("ADMIN2","JSON") +  "action=initLogs&query={'QUERY':[{'limit':'"+pagelimit+"','page':'"+PerPage+"','sort':'','orderby':'','filter':''}]}&version=3.0";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){			
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#adminTotalMatches').empty().append(totMatch);
			pagination(totMatch, "logs");
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				if(globalDeviceType != "Mobile"){
					str += "<tr id='trLogs"+row.LogId+"'><td><input type='checkbox' class='trLogs' lid='"+row.LogId+"'/></td>";
				}else{
					str += "<tr class='trLogs' lid='"+row.LogId+"'>";
				}
				str += "<td>"+row.log+"</td>";
				str += "</tr>";
			}	
			$('#logsAdmin-table > tbody').empty().append(str);
			if(globalDeviceType != "Mobile"){
			}else{
				$("#logsAdmin-table").table("refresh");
			}
			checkSingleMain('trLogs', 'lid');
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadVLANTable
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 17, 2014
 #  MODIFIED BY   : Penn Ducao
 #  REVISION DATE : March 29, 2014
 #  REVISION #    : 1
 #  DESCRIPTION   : loads VLAN Allocation table
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadVLANTable(){
	var url = getURL('ADMIN2','JSON') + "action=LoadVlan&query={'QUERY':[{'limit':'"+pagelimit+"','page':'"+PerPage+"','sort':'','orderby':'','filter':''}]}&version=3.0";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){	
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#adminTotalMatches').empty().append(totMatch);
			pagination(totMatch, "vlan");
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				if(globalDeviceType != "Mobile"){
					if(a % 2 == 0){
    			        var tableClass = 'alt';
        			}else{
        			    var tableClass = '';
        			}

					str += "<tr id='tr"+row.VlanAdminId+"' class='"+tableClass+"'><td><input type='checkbox' class='trVlan' vid='"+row.VlanAdminId+"'/></td>";
				}else{
					str += "<tr class='trVlan' vid='"+row.VlanAdminId+"'>";
				}
				str += "<td>"+row.HostName+"</input></td>";
				str += "<td>"+row.DeviceType+"</td>";
				str += "<td><input id='dyvlanstart"+row.VlanAdminId+"' disabled value='"+row.VlanStartRangeId+"' type='text'></input></td>";
				str += "<td><input id='dyvlanend"+row.VlanAdminId+"' disabled value='"+row.VlanEndRangeId+"' type='text'></input></td>";
				str += "<td><input id='statvlanstart"+row.VlanAdminId+"' disabled value='"+row.VlanStaticStartRangeId+"' type='text'></input></td>";
				str += "<td><input id='statvlanend"+row.VlanAdminId+"' disabled value='"+row.VlanEndRangeId+"' type='text'></input></td>";
				str += "<td>"+row.ReservedVlanIds+"</td>";
				str += "</tr>";
			}	
			$('#VLANAdmin-table > tbody').empty().append(str);
			if(globalDeviceType != "Mobile"){
			}else{
					
				$("#VLANAdmin-table").table("refresh");
			}
			checkSingleMain('trVlan', 'vid');
		}
	});
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
	var domainStr = "";
	if (globalUserDomainIds){
		domainStr = globalUserDomainIds.join(",");
	}
	var queryObj = "{'QUERY':[{'limit':'"+pagelimit+"','page':'"+PerPage+"','sort':'','orderby':'','ResourceDomainId':'"+domainStr+"','filter':''}]}";
	var url = getURL('ADMIN2','JSON') + "action=SelLoadRDom&query="+queryObj+"&version=3.0";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#domaintotalMatches').empty().append(totMatch);
			globalUserDomainIds = [];
			globalUserDomainNames = [];
			globalDynamicSelected = [];
			if (jsonData.data[0].row){
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				var domName = row.DomainName;
				var domId = row.ResourceDomainId;
				if(globalDeviceType != "Mobile"){
					str += "<tr id='trUserDomain"+row.ResourceDomainId+"'><td><input type='checkbox' class='trUserDomain' rdid='"+row.ResourceDomainId+"' rname='"+row.DomainName+"' name='trUserDomain' onclick='enableStatusAccRight("+a+", \"trUserDomain\")'/></td>";
				}else{
					str += "<tr class='trUserDomain"+row.ResourceDomainId+"' rdid='"+row.ResourceDomainId+"' rname='"+row.DomainName+"'>";
				}
				str += "<td>"+row.DomainName+"</td>";
				str += "<td>"+row.DomainDescription+"</td>";
				str += "<td>"+row.NumDevices+"</td>";
				str += "<td>"+row.NumZones+"</td>";
				str += "<td>"+row.BoundRTM+"</td>";
				str += "<td><select value='"+row.Status+"' ssid='"+domId+"' data-mini='true' id='trUserDomain"+a+"'><option value='Inactive'>Inactive</option>";
				str += "<option value='Active'>Active</option></select></td>";
				str += "</tr>";
				if ($.inArray(domId,globalUserDomainIds) == -1){
					globalUserDomainIds.push(domId);
				}
				if ($.inArray(domId,globalDynamicSelected) == -1){
					globalDynamicSelected.push(domId);
				}
				if ($.inArray(domName,globalUserDomainNames) == -1){
					globalUserDomainNames.push(domName);
				}
				if(row.Status=='Active'){
					if($.inArray(id,globalDomActiveStatus)==-1){
						globalDomActiveStatus.push(domId);
					}
				}else{
					if($.inArray(id,globalDomInactiveStatus)==-1){	
						globalDomInactiveStatus.push(domId);
					}
				}
			}
			}
			$('#userDomainsAdmin-table > tbody').empty().append(str);
		//	$("#userDomainsAdmin-table").table("refresh");
			domainIdHighlight();
			checkSelectedDynamic('trUserDomain');
			createZoneDynamicTab();
			if (globalDynamicSelected.length == 0){
				$('#userZoneGroupTab').hide();
			}	
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkSelectedDynamic 
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : check if there's a selected item to create a
 #					dynamic tab
 #  PARAMETERS    : id of tr
 #
 #######################################################################
*/
function checkSelectedDynamic(trid){
	if (globalDynamicSelected.length != 0){
		if (globalDeviceType == 'Mobile'){
			$('.'+trid).each(function(){
				$(this).addClass('highlight');
			});
		}else{
			for (var i=0;i<globalDynamicSelected.length;i++){
				$('#'+trid+globalDynamicSelected[i]).children().find('input').attr('checked',true);
			}
		}
	}
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
 #  PARAMETERS    : rdid
 #
 #######################################################################
*/

function loadBindedZone(rdid){
	var url = getURL('ADMIN2','JSON') + "action=showBindedZone&query={'QUERY':[{'limit':'"+pagelimit+"','page':'"+PerPage+"','sort':'','orderby':'','ResourceDomainId':'"+rdid+"','filter':''}]}&version=3.0";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#zonetotalMatches').empty().append(totMatch);
			globalUserZoneIds = [];
			globalUserZoneNames = [];
			globalDynamicSelected = [];
			if (jsonData.data[0].row){
				for (var a=0;a<jsonData.data[0].row.length;a++){
					var row = jsonData.data[0].row[a];
					var zoneName = row.ZoneName;
					var zoneId = row.ResourceZoneId;
					if(globalDeviceType != "Mobile"){
						str += "<tr id='trUserZone"+row.ResourceZoneId+"'><td><input type='checkbox' class='trUserZone' zid='"+row.ResourceZoneId+"' zname='"+row.ZoneName+"'/></td>";
					}else{
						str += "<tr class='trUserZone"+row.ResourceZoneId+"' zid='"+row.ResourceZoneId+"' zname='"+row.ZoneName+"'>";
					}
					str += "<td>"+row.ZoneName+"</td>";
					str += "<td>"+row.ZoneDescription+"</td>";
					str += "<td>"+row.NumGroups+"</td>";
					str += "<td>"+row.NumDevices+"</td>";
					str += "</tr>";
					if ($.inArray(zoneId,globalUserZoneIds) == -1){
						globalUserZoneIds.push(zoneId);
					}
					if ($.inArray(zoneId,globalDynamicSelected) == -1){
						globalDynamicSelected.push(zoneId);
					}
					if ($.inArray(zoneName,globalUserZoneNames) == -1){
						globalUserZoneNames.push(zoneName);
					}
				}
			}
			$('#userZoneAdmin-table > tbody').empty().append(str);
			if (globalDeviceType == 'Mobile'){
				$("#userZoneAdmin-table").table("refresh");
			}
			
			checkSelectedDynamic('trUserZone');
			createGroupDynamicTab(rdid);
			zoneIdHighlight();
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

function loadBindedGroup(rdid,zid){
	var url = getURL('ADMIN2','JSON') + "action=getBindedGroup&query={'QUERY':[{'limit':'"+pagelimit+"','page':'"+PerPage+"','sort':'','orderby':'','ResourceDomainId':'"+rdid+"','ZoneId':'"+zid+"','User':'"+globalUserName+"','filter':''}]}&version=3.0";

	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#grouptotalMatches').empty().append(totMatch);
			globalUserGroupIds = [];
			globalDynamicSelected = [];
			if (jsonData.data[0].row){
				for (var a=0;a<jsonData.data[0].row.length;a++){
					var row = jsonData.data[0].row[a];
					var groupId = row.GroupId;
					if(globalDeviceType != "Mobile"){
						str += "<tr id='trUserGroup"+row.GroupId+"'><td><input type='checkbox' class='trUserGroup' gid='"+row.GroupId+"'/></td>";
					}else{
						str += "<tr class='trUserGroup' gid='"+row.GroupId+"'>";
					}
					str += "<td>"+row.GroupName+"</td>";
					str += "<td>"+row.Description+"</td>";
					str += "<td>"+row.NumOfDevices+"</td>";
					str += "<td>"+row.Status+"</td>";
					str += "</tr>";
					if ($.inArray(groupId,globalUserGroupIds) == -1){
						globalUserGroupIds.push(groupId);
					}
					if ($.inArray(groupId,globalDynamicSelected) == -1){
						globalDynamicSelected.push(groupId);
					}
				}
			}
			$('#userGroupsAdmin-table > tbody').empty().append(str);
			if (globalDeviceType == 'Mobile'){
				$("#userGroupsAdmin-table").table("refresh");
			}
			checkSelectedDynamic('trUserGroup');
			checkSingleMain();
		}
	});
}

function loadUserData(id){
	var url = getURL('ADMIN2','JSON') + "action=SelInfo&query={'QUERY':[{'Table':'User','TableId':'"+id+"'}]}&version=3.0";
	$.ajax({
        url: url,
        dataType: 'html',
        success: function (data) {
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#totalMatches').empty().append(totMatch);
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				var did  = row.DirectReport;
				$('#addtxtFirstName').val(row.FirstName);
				$('#addtxtMiddleName').val(row.MiddleName);
				$('#addtxtLastName').val(row.LastName);
				$('#addtxtCountry').val(row.Country);
				changeContactFormat('addtxtCountry');
				$('#addtxtPhoneNo').val(row.BusinessPhoneNumber.replace(" ","+"));
				$('#addtxtHomePhoneNo').val(row.HomePhoneNumber.replace(" ","+"));
				$('#addtxtMobileNo').val(row.CellPhoneNumber.replace(" ","+"));
				$('#addtxtHomeAdd').val(row.HomeAddress);
				$('#addtxtEmail').val(row.Email);
				$('#addtxtCompany').val(row.Company);
				$('#addtxtEmployNo').val(row.EmployeeNumber);
				$('#addtxtOfficeAdd').val(row.OfficeAddress);
				//$('#addtxtDepartment').val(row.Department);
				//$('#addtxtDepartmentNumber').val(row.DepartmentNumber);
				$('#addtxtDivision').val(row.Division);
				$('#addtxtUserName').val(row.UserName);
				$('#addtxtPassword').val(row.Password);
				$('#addtxtRePassword').val(row.Password);
				//activeDom = row.ActiveDomain;
				//if (activeDom == remActiveDom){
				//	activeDom = "";
				//}
				//oldpassword = row.Password;
				var user = row.UserName;
				//oldusername = user;
				var userlevel = row.UserLevel;
				if (user == 'admin' || user == 'manager') {
					$('#addtxtUserName').textinput('disable');
					$('#addtxtUserLevel').selectmenu('disable');
				}
				if (user == globalUserName) {
					//$('#addtxtUserLevel').attr('disabled',true);
					if (userInformation[0].userLevel == 'Administrator' || userInformation[0].userLevel == 'Manager') {
						$('#addtxtUserLevel').append("<option value='"+userlevel+"' >"+userlevel+"</option>");
					}
				} else if (userInformation[0].userLevel == 'Administrator') {	
					if (userlevel == 'Administrator') {
						$('#addtxtUserLevel').append("<option value='Manager' >Manager</option>");
						$('#addtxtUserLevel').append("<option value='"+userlevel+"' >"+userlevel+"</option>");
					} else {
						$('#addtxtUserLevel').append("<option value='Manager' >Manager</option>");
						$('#addtxtUserLevel').append("<option value='Administrator' >Administrator</option>");
					  }
				 } else if (userInformation[0].userLevel == 'Manager') {
						if (userlevel == 'Manager') {
							$('#addtxtUserLevel').append("<option value='"+userlevel+"' >"+userlevel+"</option>");
						} 
					}
				$('#addtxtUserLevel').selectmenu("refresh");
				$('#addtxtUserLevel').val(row.UserLevel);
				var homephonenumbervalue = $('#addtxtHomePhoneNo').val();
				if (homephonenumbervalue == 'undefined' || homephonenumbervalue == 'None'){
					$('#addtxtHomePhoneNo').val('');
				}
				var rdid = row.ResourceProfileId;
				var arid = row.SecurityProfileId;
				var zid = row.Zone;
				var aid = row.Affiliation;
				var userdom = row.UserDomain;
				var grpid = row.GroupId;
				var grpname = row.GroupName;
				var grpdom = row.GroupDomain;
				var grpdomfix = row.GroupDomainFix;
				var grpar = row.GroupAccessRights;
				var grpzo = row.GroupZone;
				var grpaff = row.GroupAffiliation;
				var userid = row.UserId;
				var zone = row.Zone2;
				var group = row.Group2;
				/*if(zone != "" && zone != undefined){
					var myArr = zone.split(",");
					for(var t=0; t<myArr.length; t++){
						if(myArr[t] != "" && myArr[t] != undefined){
							globalUserInfoArr.push(myArr[t]);
						}
					}
				}*/
			}
		}
	});
}
var adminBindDeviceFlag = 0;
function loadDevicesInZone(){
	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?action=getDevicesInDefaultZone&query={"QUERY":[{"Limit":"20","Page":"1","Filter":"","Sort":"","Orderby":"","ResourceDomainId":"'+globalResourceGroupId+'","ZoneName":"'+globalUserZoneNames+'","GroupId":"'+globalAdminGroupId+'","Extra":"'+globalAddDevice+'","Flag":"'+adminBindDeviceFlag+'","remove":""}]}';

	$.ajax({
        url: url,
		dataType: 'html',
        success: function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			$('#adminGroupsTotalMatches').html(json.data[0].row.total);
			var tableClass = "";
            var html ='',startRes='',endRes='';
			if(json.data[0].total == 0){
				html += "<tr><td colspan='13'>No available data.</td></tr>";
				$("#deviceListTable > tbody").empty().append(html);
				return;
			}
            for(var a =0; a< json.data[0].row.length; a++){

				html += "<tr class='trDeviceList "+tableClass+"'>";
				if(globalDeviceType != "Mobile"){
					html += "<td><input type='checkbox' deviceid='"+json.data[0].row[a].DeviceId+"' name='adminBindedDevicesSel' onclick='AdminCheckSingle(\"AdminDeviceList\");'/></td>";
				}
				if(globalDeviceType == "Mobile"){
					loading('hide');
					html += "<td>"+json.data[0].row[a].HostName+"</td>";
					html += "<td>"+json.data[0].row[a].IpAddress+"</td>";
    	            html += "<td>"+json.data[0].row[a].Model+"</td>";
			        html += "<td>"+json.data[0].row[a].Description+"</td>";
					html += "<td>"+json.data[0].row[a].Manufacturer+"</td>";	
			        html += "<td>"+json.data[0].row[a].SerialNumber+"</td>";
		    	    html += "<td>"+json.data[0].row[a].DeviceType+"</td>";
					html += "<td>"+json.data[0].row[a].OSType+"</td>";

				}else{
					html += "<td>"+json.data[0].row[a].HostName+"</td>";
					html += "<td>"+json.data[0].row[a].IpAddress+"</td>";
    	            html += "<td>"+json.data[0].row[a].Model+"</td>";
			        html += "<td>"+json.data[0].row[a].Description+"</td>";
					html += "<td>"+json.data[0].row[a].Manufacturer+"</td>";	
			        html += "<td>"+json.data[0].row[a].SerialNumber+"</td>";
		    	    html += "<td>"+json.data[0].row[a].DeviceType+"</td>";
					html += "<td>"+json.data[0].row[a].OSType+"</td>";

				}
					html +="</tr>";
			}
			$("#deviceListTable > tbody").html(html);
	//		$("#RMHistory-table").table("refresh");
			
			globalAdminPage = "AdminDeviceList";
		}
	});

}
var adminActionFlag = 0;
function loadUserResourceDom(){
	var resourcename = convertResourceIdToName($('#resourcedropdown').val());
	var url = getURL('ADMIN2','JSON') + "action=LoadUserRDom&query={'QUERY':[{'Limit':'20','Page':'1','Filter':'','Sort':'','Orderby':'','resourcedomainid':'"+resourcename+"','GroupId':'"+globalAdminGroupId+"','Flag':'"+adminActionFlag+"','Extra':'"+globalAddBindedUser+"'}]}&version=3.0";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#adminGroupsTotalMatches').empty().append(totMatch);
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				if(globalDeviceType != "Mobile"){
					str += "<tr><td><input type='checkbox' class='trBindedUsers' userid='"+row.UserId+"' username='"+row.UserName+"' name='adminBindedUserSel' accrigid='"+row.AccessRightsId+"' onclick='AdminCheckSingle(\"AdminBindedUsers\");'/></td>";
				}else{
					str += "<tr class='trBindedUsers'>";
				}
				str += "<td>"+row.LastName+"</td>";
				str += "<td>"+row.FirstName+"</td>";
				str += "<td>"+row.UserName+"</td>";
				str += "<td>"+row.UserLevel+"</td>";
				str += "<td>"+row.UserId+"</td>";
				str += "<td>"+row.BusinessPhoneNumber+"</td>";
				str += "<td>"+row.Email+"</td>";
				str += "<td><select>/td>";
				str += "<option>Add in Group</option>";
				str += "<option>Move in Group</option>";
				str += "</select></td>"
				str += "</tr>";
				if(globalAddBindedUser.indexOf(row.UserId) == -1){
					globalAddBindedUser.push(row.UserId);
				}
			}
			$('#usersBinded-table > tbody').empty().append(str);
			if(globalDeviceType != "Mobile"){
			}else{
				$("#usersBinded-table").table("refresh");
			}
		}
	});
	globalAdminPage = "AdminBindedUsers";
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : addUserOnLoad
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 24, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : enables/disables textbox/select menu on load of add
 #					user pop up
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function addUserOnLoad() {
	var UserLevel = userInformation[0].userLevel;
	var str = "";
	if (UserLevel == 'Administrator') {
		str += "<option value='Manager'> Manager</option>";
		str += "<option value='Administrator' >Administrator</option>";
	} else if (UserLevel == 'Manager') {
		str += "<option value='Manager' >Manager</option>";
	}	
	
	$('#addtxtUserLevel').append(str);
	if (globalDeviceType == 'Mobile'){
		$('#addtxtUserLevel').selectmenu("refresh");
	}

	/*'#addManager').button().click(function() {	
		$("#showhidesubs").hide();
		openUserManagerDial();			
	});*/

	/*globalUserFlag = 'add';
	globalUserOnLoadFlag = 'addonload';
	globalUserFirstOnLoadFlag = false;
	globalDefaultGroupDomainArray = [];
	globalDefaultGroupDomainArray.push('1'); //added by juvy
	globalSelectesArray2 = [];
	globalSelectedArray2.push('1');
	globalSelAccRiInactive = [];
	globalSelAccRiInactive.push('1');*/
	loadDirectReport('add','','','');
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : addEditVlanAdmin
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : March 19, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function addEditVlanAdmin(){
	
	var url = getURL('ADMIN2','JSON') + "action=addeditvlan&query={'QUERY':[{'VlanStartRangeId':'','VlanEndRangeId':'','TimeStamp':'','ReservedVlanIds':'','VlanStaticStartRangeId':'','VlanStaticEndRangeId':'','HostName':'','DeviceId':'','Flag':''}]}&version=3.0";
	$.ajax({
		
	})
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : loadDirectReport
 #  AUTHOR        : 
 #  DATE          : July 19, 2013
 #  MODIFIED BY   : Apple Kem E. Eguia
 #  REVISION DATE : February 24, 2014
 #  REVISION #    : 2
 #  DESCRIPTION   : loads direct report
 #  PARAMETERS    : flag,username,userlevel,id
 #
 #######################################################################
*/

function loadDirectReport(flag,username,userlevel,id){
	var qstrdr = "action=LoadDR&query={'QUERY':[{'Position':'"+userlevel+"','ToEdit':'"+username+"'}]}&version=3.0";
	$.ajax ({
		url: getURL('ADMIN2','JSON') + qstrdr,
		dataType: 'html',
		success: function (data) {
			var str = "";
			if (globalDeviceType == 'Mobile'){
				str += "<option data-placeholder='true'>Manager</option>";
			}
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				str += "<option title='Username: "+row.UserName+"' value='"+row.DirectReportId+"'>"+row.FirstName+" "+row.LastName+"</option>";
			}
			$('#directreportselect2').empty().append(str);
			if (globalDeviceType == 'Mobile'){
				$('#directreportselect2').selectmenu("refresh");
			}
			if (flag == 'edit') {
				$('#directreportselect2').val("+id+");
				//updateDirectReport('"+id+"','"+userlevel+"');
			}
		}
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : checkPopUPMain
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
var globalSelectAddVlanPopUp = [];
function checkPopUPMain(trclass, id){
	$("."+trclass).on("click",function(){
		//uncheckSelectedItem();
		var val = $(this).attr(id);
		if($.inArray(val, globalSelectAddVlanPopUp) == -1){
			globalSelectAddVlanPopUp.push(val);
			/*if(globalDeviceType != "Mobile"){
				if(trclass == "trAcc"){
					$('#trAcc'+val).addClass('highlight');
				}else if(trclass == "trEmail"){
					$('#trEmail'+val).addClass('highlight');
				}else if(trclass == "trLogs"){
					$('#trLogs'+val).addClass('highlight');
				}else if (trclass == "trAccRights"){
					
					$(this).addClass('highlight');
				}else{
					$('#tr'+val).addClass('highlight');
				}
			}else{
				$(this).addClass('highlight');
				if (trclass == 'trAccRights'){
				}
			}*/
		}else{
			var pos = globalSelectAddVlanPopUp.indexOf(val);
			globalSelectAddVlanPopUp.splice(pos,1);
			/*if(globalDeviceType != "Mobile"){
				if(trclass == "trAcc"){
					$('#trAcc'+val).removeClass('highlight');
				}else if(trclass == "trEmail"){
					$('#trEmail'+val).removeClass('highlight');
				}else if(trclass == "trLogs"){
					$('#trLogs'+val).removeClass('highlight');
				}else if (trclass == "trAccRights"){
					$(this).removeClass('highlight');
				}else{
					$('#tr'+val).removeClass('highlight');
				}
			}else{
				$(this).removeClass('highlight');
				if (trclass == 'trAccRights'){
				}
			}*/
		}
		checkAdminPopUpVlan();
	});
}



/*
 #######################################################################
 #
 #  FUNCTION NAME : checkSingleMain
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
function checkSingleMain(trclass, id){
	globalSelectedAdminMain = [];
	$("."+trclass).on("click",function(){
		uncheckSelectedItem();
		var val = $(this).attr(id);
		if($.inArray(val, globalSelectedAdminMain) == -1){
			globalSelectedAdminMain.push(val);
			if(globalDeviceType != "Mobile"){
				if(trclass == "trAcc"){
					$('#trAcc'+val).addClass('highlight');
				}else if(trclass == "trEmail"){
					$('#trEmail'+val).addClass('highlight');
				}else if(trclass == "trLogs"){
					$('#trLogs'+val).addClass('highlight');
				}else if (trclass == "trAccRights"){
					
					$(this).addClass('highlight');
				}else{
					$('#tr'+val).addClass('highlight');
				}
			}else{
				$(this).addClass('highlight');
				if (trclass == 'trAccRights'){
				}
			}
		}else{
			ctr--;
			var pos = globalSelectedAdminMain.indexOf(val);
			globalSelectedAdminMain.splice(pos,1);
			if(globalDeviceType != "Mobile"){
				if(trclass == "trAcc"){
					$('#trAcc'+val).removeClass('highlight');
				}else if(trclass == "trEmail"){
					$('#trEmail'+val).removeClass('highlight');
				}else if(trclass == "trLogs"){
					$('#trLogs'+val).removeClass('highlight');
				}else if (trclass == "trAccRights"){
					$(this).removeClass('highlight');
				}else{
					$('#tr'+val).removeClass('highlight');
				}
			}else{
				$(this).removeClass('highlight');
				if (trclass == 'trAccRights'){
				}
			}
		}
		userBtnValidation();
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : domainIdHighlight
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the selected id of the row and highlights the
 #					row for domain table only
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function domainIdHighlight() {

	$(".trUserDomain").on("click",function(){
		var id = $(this).attr('rdid');
		var name = $(this).attr('rname');
		if (globalDeviceType == 'Mobile'){
			var cond = $('.trUserDomain').hasClass('highlight');
		}else{
			var cond = $('#trUserDomain'+id).children().find('input').is(':checked');
		}
		if (cond){
			if($.inArray(id, globalUserDomainIds) == -1){
				globalUserDomainIds.push(id);
				globalUserDomainNames.push(name);
				if(globalDeviceType != "Mobile"){
					$('#trUserDomain'+id).addClass('highlight');
				}else{
					$(this).addClass('highlight');
				}
			}
			$('#userZoneGroupTab').show();
		}else{
			var pos = globalUserDomainIds.indexOf(id);
			var pos2 = globalUserDomainNames.indexOf(name);
			var pos3 = globalDynamicSelected.indexOf(id);
			globalUserDomainIds.splice(pos,1);
			globalDynamicSelected.splice(pos3,1);
			globalUserDomainNames.splice(pos2,1);
			if(globalDeviceType != "Mobile"){
				$('#trUserDomain'+id).removeClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
			$('#userZoneGroupTab').hide();
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : zoneIdHighlight
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the selected id of the row and highlights the
					row for zone table only
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function zoneIdHighlight() {
	$(".trUserZone").on("click",function(){
		var id = $(this).attr('zid');
		var name = $(this).attr('zname');
		if (globalDeviceType == 'Mobile'){
			var cond = $('.trUserZone').hasClass('highlight');
		}else{
			var cond = $('#trUserZone'+id).children().find('input').is(':checked');
		}
		if (cond){
			if($.inArray(id, globalUserZoneIds) == -1){
				globalUserZoneIds.push(id);
				globalUserZoneNames.push(name);
				if(globalDeviceType != "Mobile"){
					$('#trUserZone'+id).addClass('highlight');
				}else{
					$(this).addClass('highlight');
				}
			}
			$('#domZoneGroupTab').show();
		}else{
			var pos = globalUserZoneIds.indexOf(id);
			var pos2 = globalUserZoneNames.indexOf(name);
			var pos3 = globalDynamicSelected.indexOf(id);
			globalUserZoneIds.splice(pos,1);
			globalUserZoneNames.splice(pos2,1);
			globalDynamicSelected.splice(pos3,1);
			if(globalDeviceType != "Mobile"){
				$('#trUserZone'+id).removeClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
			$('#domZoneGroupTab').hide();
		}
	});
}


/*
 #######################################################################
 #
 #  FUNCTION NAME : changeAdminPage
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : February 19, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : Change the page
 #  PARAMETERS    : Number of table
 #
 #######################################################################
*/
function changeAdminPage(num){
    for(var i = 0 ; i < 11; i++){
        if(num == i){
            $('.tablePage-'+i).show();
        }else{
            $('.tablePage-'+i).hide();
        }

    }
	if(num == 10){
		globalAdminPage = 'Device';
	}
	CurrentPage = "panel";
}


/*
 #######################################################################
 #
 #  FUNCTION NAME : checkAllAdminTable
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : February 19, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : Check all admin checkbox
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function checkAllAdminTable(){
	if($('#adminSelectAll').is (':checked')){
		$(".trUser").each(function(){
			var val = $(this).attr('uid');	
			if($.inArray(val, globalSelectedAdminMain) == -1){
				globalSelectedAdminMain.push(val);
				if(globalDeviceType != "Mobile"){
					$(this).prop('checked',true);
					$('#tr'+val).addClass('highlight');
				}else{
					$(this).addClass('highlight');
				}
			}
		});
	}else{
		$(".trUser").each(function(){
			var val = $(this).attr('uid');
			var pos = globalSelectedAdminMain.indexOf(val);
			globalSelectedAdminMain.splice(pos,1);
			if(globalDeviceType != "Mobile"){
				$(this).prop('checked',false);
				$('#tr'+val).removeClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
		});
	}
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

function changeTab(){
	var prevSelection = "usertab-1";
    $(document).on("click", "#navbar ul li",function() {
	    var newSelection = $(this).children("a").attr("data-tab-class");
        $("." + prevSelection).addClass("ui-screen-hidden");
        $("." + newSelection).removeClass("ui-screen-hidden");
        prevSelection = newSelection;
		loadUserTab(newSelection);
    });
	
	
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadUserTab
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads user tab content
 #  PARAMETERS    : tab
 #
 #######################################################################
*/
function loadUserTab(tab){
	switch(tab) {
		case "usertab-1":
					
		break;
		case "usertab-2":
			loadResDomTable();
		break;
		case "usertab-3":
			$('#useraccritab').tabs();
			loadUserPolicy();
		break;
		case "usertab-4":
		
		break;
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : createZoneDynamicTab
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : creates dynamic zone tab
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function createZoneDynamicTab(){
	var str = '<div data-role="navbar" id="zonenavbar"><ul>';
    for(var a = 0; a <globalUserDomainNames.length; a++){
		if (globalDeviceType == 'Mobile'){
	        str += "<li><a href='#' data-tab-class='liUserZone_"+globalUserDomainNames[a]+"' did='"+globalUserDomainIds[a]+"' onclick='loadBindedZone("+globalUserDomainIds[a]+")' data-mini='true'>";
		}else{
	        str += "<li><a href='#liUserZone_"+globalUserDomainNames[a]+"' did='"+globalUserDomainIds[a]+"' onclick='loadBindedZone("+globalUserDomainIds[a]+")' data-mini='true'>";
		}
        str += globalUserDomainNames[a]+"</a></li>";
	}
	str += "</ul>";
	str += "<div id='domZoneDiv'></div></div>";
    $('#userZoneGroupTab').empty().append(str);
	$('#zonenavbar').tabs();
	if (globalDeviceType == 'Mobile'){
		$('#addUserPopUp').trigger('create');
	}
	$( "#domZoneDiv" ).empty().load('pages/Admin/UserDomainZone.html',function(){
		loadBindedZone(globalUserDomainIds[0]);
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : changeZoneTab
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

function changeZoneTab(){
	var prevSelection = "liUserZone-"+globalUserDomainNames[0];
    $(document).on("click", "#zonenavbar ul li",function() {
	    var newSelection = $(this).children("a").attr("data-tab-class");
        //$("." + prevSelection).addClass("ui-screen-hidden");
        //$("." + newSelection).removeClass("ui-screen-hidden");
		var rdid = $(this).children("a").attr("did");
        prevSelection = newSelection;
		loadBindedZone(rdid);
    });
	
	
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : changeGroupTab
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : Feb. 25, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : changes tab page in pop up
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function changeGroupTab(){
	var prevSelection = "liUserGroup-"+globalUserZoneNames[0];
    $(document).on("click", "#groupnavbar ul li",function() {
	    var newSelection = $(this).children("a").attr("data-tab-class");
        //$("." + prevSelection).addClass("ui-screen-hidden");
        //$("." + newSelection).removeClass("ui-screen-hidden");
		var zid = $(this).children("a").attr("zid");
        prevSelection = newSelection;
		loadBindedGroup();
    });
	
	
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : addGroupPopUp -> addAdminPopUp
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : marlo agapay 
 #  REVISION DATE :	Mar 4, 2014
 #  REVISION #    : 1
 #  DESCRIPTION   : load dialog for add popup 
 #  PARAMETERS    : page
 #
 #######################################################################
*/
function addAdminPopUp(page){
	var h = $(window).height() - 100;
	var w = $(window).width() - 100;
	var pageInfo = getPageToLoad(page); // gets the information of the page
	$( "#AdminPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: '1000px',
		maxHeight:600,
		height:600,
		title: pageInfo.title
	});
	$( "#AdminPopUp" ).empty().load( pageInfo.url,function(){
		$('#navbar').tabs();
		setTimeout(function(){
			addEditUserInit();
		}, 1000);

	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getPageToLoad
 #  AUTHOR        : Marlo P. Agapay
 #  DATE          : Mar. 4, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   :	will return the page URL to load on popUp
 #  PARAMETERS    : page
 #
 #######################################################################
*/
function getPageToLoad(page){
	if (page =="addgroup"){
		return({url : "pages/Admin/AddGroupPopUp.html", title : "Add Group", size : "90%"});
	}else if (page == "addaccess"){
		globalAdminFunc="add";
		return ({url : "pages/Admin/AddAccessRightsPopUp.html", title : "Add Access", size: "50%"});
	}else if (page == "editaccess"){
		globalAdminFunc="edit";
		return ({url : "pages/Admin/AddAccessRightsPopUp.html", title : "Edit Access", size: "50%"});
	}else if (page == "adduser"){
		globalAdminFunc = "add";
		return ({url : "pages/Admin/addEditUserPopUp.html", title : "Add User"});
	}else if(page == "edituser"){
		globalAdminFunc="edit";
		return ({url : "pages/Admin/addEditUserPopUp.html", title : "Edit User", size: "50%"});
	}else if(page == "adddomain"){
		globalAdminFunc="add";
		globalDPSFlag = 0;
		return ({url : "pages/Admin/domainPopUp.html", title : "Add Resource Domain"});
	}else if(page == "editdomain"){
		globalAdminFunc="edit";
		globalDPSFlag = 0;
		return ({url : "pages/Admin/domainPopUp.html", title : "Edit Resource Domain"});
	}


}

/*
 #######################################################################
 #
 #  FUNCTION NAME : domainPopUp
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : Apple Kem E. Eguia
 #  REVISION DATE : March 29, 2014
 #  REVISION #    : 
 #  DESCRIPTION   : load dialog for add/edit domain
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function domainPopUp(page){
	var pageInfo = getPageToLoad(page); // gets the information of the page
	$( "#AdminPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "90%",
		height: 600,
		title: pageInfo.title
	});
	$( "#AdminPopUp").empty().load(pageInfo.url,function(){
		$('#domaintab').tabs();
		setTimeout(function(){
			$('#deviceListDiv').empty().load('pages/Admin/deviceListTable.html',function(){
				loadDeviceList();
			});
		},1000);
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : addAccessRightsPopUp
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : load dialog for add domain
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function addAccessRightsPopUp(){
	var h = $(window).height() - 100;
	var w = $(window).height() - 100;
	$( "#AdminPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "90%",
		height: h,
		title: "Add User",
	});
	$( "#AdminPopUp" ).empty().load('pages/Admin/AddAccessRightsPopUp.html',function(){
		$('#tabs').tabs();
		setTimeout(function(){
			//TestToolListTable();
			$(".ui-dialog").position({
			   my: "center",
			   at: "center",
			   of: window
			});

		},1000);
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : addPowerPopUp
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : load dialog for add power
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function addPowerPopUp(){
	var h = $(window).height() - 100;
	var w = $(window).height() - 100;
	$( "#AdminPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "90%",
		height: h,
		title: "Add User",
	});
	$( "#AdminPopUp" ).empty().load('pages/Admin/AddPowerPopUp.html',function(){
		$('#tabs').tabs();
		setTimeout(function(){
			//TestToolListTable();
			$(".ui-dialog").position({
			   my: "center",
			   at: "center",
			   of: window
			});

		},1000);
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : editCountry
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : January 13, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : opens pop up for editing country list
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function editCountry(){

	$("#delCountryPopUp").dialog({
			title: 'Delete Country',
			autoOpen: false,
			height: 340, 
			width: 350,
			resizable: false,
			closeOnEscape: false,
		    open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
			buttons: {	
				"Done": function () {
					loadCountry('addtxtCountry');
					$(this).dialog('close');
					$('#modalID2').remove();					
				},
				"Cancel": function (){
					if (addedCountry != [] || addedCountry.length != 0){
						addedCountry = [];
					}
					if (deletedCountry != [] || deletedCountry.length != 0){
						deletedCountry = [];	
					}
					$(this).dialog('close');
					$('#modalID2').remove();					
				}
			}
		});
	$(".ui-dialog :button").blur();
	$("#delCountryPopUp").dialog("open").load("pages/Admin/delCountry.html",function(){
		//addModal2();
		//addAModal('delCountryPopUp',2);
		loadCountry('countries');
	});

}
function addAModal(div,modalId){
	var ind = 0;
	$(".ui-widget-overlay").each(function() {
		var zind = parseInt($('#'+div).parent().css("z-index"));
		if (zind > ind) {
			ind = zind;
		}
	});
	ind += -1;
	$('#modalID'+modalId).css("z-index",ind);
}
function addModal(){
	$('body').append('<div class="ui-widget-overlay" style="width: 100%;height:100%; position:fixed; z-index: 1152;" id="modalID"></div>');
}

function addModal2(){
	$('body').append('<div class="ui-widget-overlay" style="width: 100%;height:150%; position-fixed; z-index: 1152;" id="modalID2"></div>');
}

function addModal3(){
	$('body').append('<div class="ui-widget-overlay" style="width: 100%;height:200%; position-fixed; z-index: 1152;" id="modalID3"></div>');
}

function addModal4(){
	$('body').append('<div class="ui-widget-overlay" style="width: 100%;height:250%; position-fixed; z-index: 1152;" id="modalID4"></div>');
}


/*
 #######################################################################
 #
 #  FUNCTION NAME : addServerInfoPopUp
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : Anna Marie Paulo
 #  REVISION DATE : March 25,2014
 #  REVISION #    : 
 #  DESCRIPTION   : load dialog for add server information
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function addServerInfoPopUp(){
	var h = $(window).height() - 100;
	var w = $(window).height() - 100;
	$( "#AdminPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		open: function(event, ui) { $(".ui-dialog-titlebar-close").show(); }
	});
	$( "#AdminPopUp" ).empty().load('pages/Admin/AddServerInfoPopUp.html',function(){
		$('span.ui-dialog-title').text('ADD SERVER INFO');

			$(".ui-dialog").position({
			   my: "center",
			   at: "center",
			   of: window
			});

	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : gatherServerInfo
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 26, 2014
 #  MODIFIED BY   :
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : load dialog for server after validation of server ip
 #  PARAMETERS    : 
 #
 #######################################################################
*/
var ServerIP;
function gatherServerInfo(){
	var server=$('#addServerIPID').val();
	ServerIP=server;
	if($.trim(server)==""){
		alerts('Please input the Server IP Address');
		return;
	}

	var url = getURL('ConfigEditor', 'JSON')+"action=instantiateServer&query={'QUERY': [{'ServerIp':'"+server+"'}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var result = jsonData.data[0].row;
			var mngtIntStr="";var ctrlPlnStr="";var intAll=[];var intVal=[];
			for(var a=0; a<result.length;a++){
				if(result[a].status != 1){
					alerts(result[a].status);
				}else{
					var host = result[a].hostname;
					var ntp = result[a].ntp;
					var intr = result[a].interfaces;
					var gt = result[a].gateway;
					
					addServerContent(host, ntp, intr, gt);
					loadStaticRoute('add');					
				}	
			}
		}
	});	
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : addServerContent
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : load content of server info
 #  PARAMETERS    : host, ntp, intr, gt
 #
 #######################################################################
*/
var Interfaces=[];
var SourcePopup;
function addServerContent(host, ntp, intr, gt){
	var intSplit=[];var intVal=[];
	var mngtStr="";var ctrlStr="";
	$( "#AdminPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		buttons: {
			"Save": function(){
				addServerInfoOk();
			},
			"Close": function(){
				$(this).dialog('close');
			}
		}
	});

	$('#AdminPopUp').empty().load('pages/Admin/AddServerInfoPopUp.html', function(){
		SourcePopup = "Add";
		$('#alertAddServer').hide();
		$('#serverInfoRefresh').hide();
		$('#addServerInfo').show();
		$('#addServeInfoTab').tabs();	
		
		$('#hostnameVal').attr('value', host);
		$('#ntpserverVal').attr('value', ntp);
		$('#mngtGateVal').attr('value', gt);
		intSplit = intr.split('^');	
		for(var a=0; a<intSplit.length; a++){
			intVal=intSplit[a].split('-');
			mngtStr += "<option>"+intVal[0]+"</option>";
			Interfaces = Interfaces.push(intVal[0]);
			if(a==0){
				ctrlStr += "<option>"+intVal[0]+"</option>";		
			}else if(a==1){
				ctrlStr += "<option selected='selected'>"+intVal[0]+"</option>";
				$('#ctrlPlaneIPVal').attr('value', intVal[1]);
				$('#ctrlPlaneNetVal').attr('value', intVal[2]);
			}else{
				ctrlStr += "<option>"+intVal[0]+"</option>";		
			}
		}
		$('#ctrlPlaneIntVal').html(ctrlStr);
		$('#mngtIntVal').html(mngtStr);
		$('#mngtIPVal').attr('value', intVal[1]);
		$('#mngtNetVal').attr('value', intVal[2]);

		$(".ui-dialog").position({
		   my: "center",
		   at: "center",
		   of: window
		});
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : uncheckAdminPopUpVlan
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : March 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : save added server
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function checkAdminPopUpVlan(){
	var id = "tr"+globalSelectAddVlanPopUp[0]
	var dyvlanstart = "popdyvlanstart"+globalSelectAddVlanPopUp[0]
	var dyvlanend ="popdyvlanend"+globalSelectAddVlanPopUp[0]
	var statvlanstart = "popstatvlanstart"+globalSelectAddVlanPopUp[0]
	var statvlanend = "popstatvlanend"+globalSelectAddVlanPopUp[0]
	var reserved = "popreservedVlan"+globalSelectAddVlanPopUp[0]
	$("#"+id).attr('disabled',false);
	$("#"+dyvlanstart).attr('disabled',false);
	$("#"+dyvlanend).attr('disabled',false);
	$("#"+statvlanstart).attr('disabled',false);
	$("#"+statvlanend).attr('disabled',false);
	$("#"+reserved).attr('disabled',false);
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : addServerInfoOk
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : save added server
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function addServerInfoOk(){
	var stype=$('#serverTypeVal option:selected').text();
	var PIP = $('#mngtIPVal').val();
	var PNet = $('#mngtNetVal').val();
	var PGT = $('#mngtGateVal').val();
	var SIP = $('#ctrlPlaneIPVal').val();
	var SNet = $('#ctrlPlaneNetVal').val();
	var stat = $('#statusVal option:selected').text();
	var host = $('#hostnameVal').val();
	var PInt = $('#mngtIntVal option:selected').text();
	var SInt = $('#ctrlPlaneIntVal option:selected').text();
	var auth = $('#authVal option:selected').text();
	var ntp = $('#ntpserverVal').val();

	var url = getURL('ADMIN2', 'JSON')+"action=addServerInfo&query={'QUERY': [{'ServerType': '"+stype+"', 'PrimaryIp': '"+PIP+"', 'PrimaryNetMask': '"+PNet+"', 'PrimaryGateway': '"+PGT+"', 'SecondaryIp': '"+SIP+"', 'SecondaryNetMask': '"+SNet+"', 'Status': '"+stat+"', 'Hostname': '"+host+"', 'PrimaryInterface': '"+PInt+"', 'SecondaryInterface': '"+SInt+"', 'Authentication': '"+auth+"', 'NTP': '"+ntp+"', 'ServerIp': '"+PIP+"'}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var result = jsonData.RESULT[0].Result;
			alerts(result);
			loadServerInfoTable();
		}
	});
	$('#AdminPopUp').dialog('destroy');
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : userBtnValidation
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : March 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function userBtnValidation(){
	uncheckSelectedItem();
	if(globalSelectedAdminMain.length==1){
		$('#editUserBtn').removeClass('ui-state-disabled');
		$('#editUserBtn').attr('disabled', false);
		$('#deleteUserBtn').removeClass('ui-state-disabled');
		$('#deleteUserBtn').attr('disabled', false);
		$('#showInfoUserBtn').removeClass('ui-state-disabled');
		$('#showInfoUserBtn').attr('disabled', false);
		$('#genreportUserBtn').removeClass('ui-state-disabled');
		$('#genreportUserBtn').attr('disabled', false);
	}else if(globalSelectedAdminMain.length>1){
		$('#deleteUserBtn').removeClass('ui-state-disabled');
		$('#deleteUserBtn').attr('disabled', false);
		$('#showInfoUserBtn').removeClass('ui-state-disabled');
		$('#showInfoUserBtn').attr('disabled', false);
		$('#genreportUserBtn').removeClass('ui-state-disabled');
		$('#editUserBtn').addClass('ui-state-disabled');
		$('#editUserBtn').attr('disabled', true);
		$('#genreportUserBtn').attr('disabled', false);
	}else if(globalSelectedAdminMain.length==0){
		$('#deleteUserBtn').addClass('ui-state-disabled');
		$('#deleteUserBtn').attr('disabled', true);
		$('#showInfoUserBtn').addClass('ui-state-disabled');
		$('#showInfoUserBtn').attr('disabled', true);
		$('#genreportUserBtn').addClass('ui-state-disabled');
		$('#editUserBtn').addClass('ui-state-disabled');
		$('#editUserBtn').attr('disabled', true);
		$('#genreportUserBtn').attr('disabled', true);
	}
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : serverBtnValidation
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : enable disable of buttons in server info
 #  PARAMETERS    : 
 #
 #######################################################################
*/

var serverIds = [];
function serverBtnValidation(){
	var ctr=0;var ctrAll=0;
	serverIds = [];
	$("input:checkbox[name='trServerInfo']").each(function(){
		if($(this).is(':checked')){
			ctr++;
			var id = $(this).attr('siid');
			serverIds.push(id);
		}else{
			ctr--;
		}
		ctrAll++;
	});
	if(serverIds.length==1){
		$('#editServerInfoBtn').attr('disabled',false);
		$('#deleteServerInfoBtn').attr('disabled', false);
		$('#deleteServerInfoBtn').removeClass('ui-state-disabled');
		$('#editServerInfoBtn').removeClass('ui-state-disabled');
	}else if(serverIds.length>1){
		$('#editServerInfoBtn').attr('disabled',true);
		$('#deleteServerInfoBtn').attr('disabled', false);
		$('#deleteServerInfoBtn').removeClass('ui-state-disabled');
		$('#editServerInfoBtn').addClass('ui-state-disabled');
	}else if(serverIds.length==0){
		$('#editServerInfoBtn').attr('disabled',true);
		$('#deleteServerInfoBtn').attr('disabled', true);
		$('#deleteServerInfoBtn').addClass('ui-state-disabled');
		$('#editServerInfoBtn').addClass('ui-state-disabled');
	}	
	if(ctr==ctrAll){
		$('.serverCheckAll').prop('checked', true);
	}else{
		$('.serverCheckAll').prop('checked', false);
	}
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : editServer
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : load content of server info
 #  PARAMETERS    : host, ntp, intr, gt
 #
 #######################################################################
*/

function editServer(){
	var hostserver;var auth;var ntp;
	var sertype;var stat;var mngtInt;
	var mngIP;var mngtNet;var mngtGT;
	var ctrlInt;var ctrlIP;var ctrlNet;

	$( "#AdminPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		buttons: {
			"Save": function(){
				editServerOk();
			},
			"Close": function(){
				$(this).dialog('destroy');
			}
		}
	});

	$('#AdminPopUp').empty().load('pages/Admin/AddServerInfoPopUp.html', function(){
		$('#alertAddServer').hide();
		$('#addServerInfo').show();
		$('#serverInfoRefresh').show();
		$('#addServeInfoTab').tabs();	

		var ctrlStr="";var mngtStr="";
		$('#tr'+serverIds).each(function(){
			hostserver = $(this).find('td').eq(3).text();
			auth = $(this).find('td').eq(4).text();
			ntp = $(this).find('td').eq(5).text();
			sertype = $(this).find('td').eq(2).text();
			stat = $(this).find('td').eq(6).text();
			mngtInt = $(this).find('td').eq(8).text();
			mngtIP = $(this).find('td').eq(9).text();
	  		mngtNet = $(this).find('td').eq(10).text();
		  	mngtGT = $(this).find('td').eq(11).text();
		  	ctrlInt = $(this).find('td').eq(12).text();
	  		ctrlIP = $(this).find('td').eq(13).text();
		  	ctrlNet = $(this).find('td').eq(14).text();
			
		});
		Interfaces = ["eth0", "eth1", "eth2"];		
		ctrlStr += "<option>"+ctrlInt+"</option>";
		mngtStr += "<option>"+mngtInt+"</option>";

		$('#hostnameVal').attr({value: hostserver, disabled: 'disabled'});
		$('#mngtIPVal').attr({value: mngtIP, disabled: 'disabled'});
		$('#ctrlPlaneIPVal').attr('value', ctrlIP);
		$('#mngtNetVal').attr({value: mngtNet, disabled:'disabled'});
		$('#ctrlPlaneNetVal').attr('value', ctrlNet);
		$('#ntpserverVal').attr({value: ntp, disabled:'disabled'});
		$('#mngtGateVal').attr({value: mngtGT, disabled:'disabled'});
		$('#mngtIntVal').html(mngtStr);
		$('#mngtIntVal').attr('disabled', 'disabled');
		$('#ctrlPlaneIntVal').html(ctrlStr);

		loadStaticRoute('edit');
	$(".ui-dialog").position({
		   my: "center",
		   at: "center",
		   of: window
		});
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : editServerOk
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : save updated server
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function editServerOk(){
	var stype=$('#serverTypeVal option:selected').text();
	var PIP = $('#mngtIPVal').val();
	var PNet = $('#mngtNetVal').val();
	var PGT = $('#mngtGateVal').val();
	var SIP = $('#ctrlPlaneIPVal').val();
	var SNet = $('#ctrlPlaneNetVal').val();
	var stat = $('#statusVal option:selected').text();
	var host = $('#hostnameVal').val();
	var PInt = $('#mngtIntVal option:selected').text();
	var SInt = $('#ctrlPlaneIntVal option:selected').text();
	var auth = $('#authVal option:selected').text();
	var ntp = $('#ntpserverVal').val();

	var url = getURL('ADMIN2', 'JSON')+"action=editServerInfo&query={'QUERY': [{'ServerType': '"+stype+"', 'PrimaryIp': '"+PIP+"', 'PrimaryNetMask': '"+PNet+"', 'PrimaryGateway': '"+PGT+"', 'SecondaryIp': '"+SIP+"', 'SecondaryNetMask': '"+SNet+"', 'Status': '"+stat+"', 'ServerInformationId': '"+serverIds+"', 'Hostname': '"+host+"', 'PrimaryInterface': '"+PInt+"', 'SecondaryInterface': '"+SInt+"','sshIP': '"+PIP+"', 'Authentication': '"+auth+"', 'NTP': '"+ntp+"'}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var result = jsonData.RESULT[0].Result;
			alerts(result);
			loadServerInfoTable();
		}
	});
	$('#AdminPopUp').dialog('destroy');

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : deleteValidation
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function deleteValidation(){
	$( "#AdminPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		title: "Delete Server",
		buttons: {
			"Yes": function(){
				checkBindedDomain();
				$(this).dialog('destroy');
			},
			"No": function(){
				$(this).dialog('destroy');
			}
		}
	});
	$( "#AdminPopUp" ).text('Delete Selected Server/s?');

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : deleteServerInfo
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : delete server selected
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function deleteServerInfo(){

	var url = getURL('ADMIN2', 'JSON')+"action=DeleteServerInfo&query={'QUERY': [{'ServerInfoId': '"+serverIds+"'}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			data = data.replace(/'/g, '"');
			var jsonData = $.parseJSON(data);
			var res = jsonData.RESULT[0].Result;
			alerts(res);
			loadServerInfoTable();
		}	
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : checkBindedDomain
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   :
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function checkBindedDomain(){
	var error="";
	var url = getURL('ADMIN2', 'JSON')+"action=checkwithdomain&query={'QUERY': [{'id': '"+serverIds+"'}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			data = data.replace(/'/g, '"');
			var jsonData = $.parseJSON(data);
			var res = jsonData.RESULT[0].Result;
			if(res==0){
				deleteServerInfo();
			}else{
				$('#tr'+serverIds).each(function(){
					domain = $(this).find('td').eq(7).text();
				});
				error += "The following server(s) are binded to a domain. Deleting the chosen server(s) will unbind them from their domain(s):<br/><br/>";
				error += domain+"<br/>";
				error += "Would you like to continue?";

				$( "#AdminPopUp" ).dialog({
					modal: true,
					autoResize:true,
					width: "auto",
					title: "Delete Server",
					buttons: {
						"Yes": function(){
							deleteServerInfo();
							$(this).dialog('destroy');
						},
						"No": function(){
							$(this).dialog('destroy');
						}
					}
				});
				$( "#AdminPopUp" ).text(error);
			}
		}	
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : pingServer
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function pingServer(){
	if(serverIds.length==0){
		alerts('No item selected.');
		return;
	}

	var ipAddStr="";var ip="";

	$("#AdminPopUp").dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		title: "Ping Server",
		buttons: {
			"Yes": function(){
				pingServerOk();
			},
			"No": function(){
				$(this).dialog('destroy');
			}
		}
	});
	$( "#AdminPopUp" ).empty().load('pages/Admin/AddServerInfoPopUp.html', function(){
		$('#alertAddServer').hide();
		$('#addServerInfo').hide();
		$('#pingServerMain').show();
		for(var a=0;a<serverIds.length;a++){
			ip= $('#tr'+serverIds[a]).find('td').eq(9).text();
			id= $('#tr'+serverIds[a]).find('td').eq(1).text();
				ipAddStr += "<option value='"+id+"'>"+ip+"</option>";
		}
		$("#ipAddPingID").html(ipAddStr);

	$(".ui-dialog").position({
	   my: "center",
	   at: "center",
	   of: window
	});
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : pingServerOk
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function pingServerOk(){
	var prime = $('#ipAddPingID option:selected').val();
	var otherid = [];
	$('#ipAddPingID option:not(:selected)').each(function(){
		otherid.push($(this).val());
	});
	if(otherid.length==0){
		alerts('Please select two or more servers to ping.');
		return;
	}
	
	$("#AdminPopUp").dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		title: "Ping Server",
		buttons: {
			"Close": function(){
				$(this).dialog('destroy');
			}
		}
	});
	$( "#AdminPopUp" ).empty().load('pages/Admin/AddServerInfoPopUp.html', function(){
		$('#alertAddServer').hide();
		$('#addServerInfo').hide();
		$('#pingServerMain').hide();
		$('#pingResult').show();
	
		var url = getURL('ADMIN2', 'JSON')+"action=pingServer&query={'QUERY':[{'PrimaryId': '"+prime+"', 'OtherIds': '"+otherid+"'}]}";
		$.ajax({
			url: url,
			dataType: 'html',
			success: function(data){
				data = data.replace(/'/g, '"');
				var jsonData = $.parseJSON(data);
				var res = jsonData.data[0].row;
				var datStr="";
				for(var a=0; a<res.length;a++){
					datStr += "<tr><td>"+res[a].SourceIp+"</td>";
					datStr += "<td>"+res[a].DestinationIp+"</td>";
					datStr += "<td>"+res[a].Transmitted+"</td>";
					datStr += "<td>"+res[a].Received+"</td>";
					datStr += "<td>"+res[a].Loss+"</td>";
					datStr += "<td>"+res[a].Errors+"</td>";
					datStr += "<td>"+res[a].Time+"</td>";
					datStr += "<td>"+res[a].Min+"</td>";
					datStr += "<td>"+res[a].Max+"</td>";
					datStr += "<td>"+res[a].Avg+"</td>";
					datStr += "<td>"+res[a].Mdev+"</td></tr>";
				}
				$('#pingResultBody').html(datStr);
			}	
		});
	$(".ui-dialog").position({
	   my: "center",
	   at: "center",
	   of: window
	});

	});
}

function rebootServerAlert(){
	$( "#AdminPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "300px",
		height: "auto",
		buttons: {
			"Reboot Now": function(){
			},
			"Close": function(){
				$(this).dialog('destroy');
			}
		}
	});
	var text = "Are you sure you want to reboot the selected device?\n\n";
	text += "(Warning: By selecting reboot now, users who are currently logged in might lose the unsaved data they're currently working on..)";
	$('#AdminPopUp').text(text);
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : loadStaticRoute
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadStaticRoute(type){
	if(type=="add"){
		$('#staticRteContent').hide();
	}else{
		$('#staticRteContent').show();
	}
	var url =  getURL('ADMIN2', 'JSON')+"action=getStaticRoutes2&query={'QUERY':[{'Limit': '"+pagelimit+"', 'Page': '"+PerPage+"', 'ServerIp': '172.24.1.11', 'ServerId':'"+serverIds+"'}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			data = data.replace(/'/g, '"');
			var jsonData = $.parseJSON(data);
			var res = jsonData.data[0].row;
			if(res.length==0){
				$('#statRteLi').hide();
			}else{
				$('#statRteLi').show();
		//		for(var a=0; a<res.length; a++){
					
		//		}
			
			}
		}
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : addStaticPopup
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function addStaticPopup(){
	$( "#staticRoute" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		buttons: {
			"Save": function(){
				addStaticRoute();
			},
			"Close": function(){
				$(this).dialog('destroy');
			}
		}
	});

	$('#staticRoute').empty().load('pages/Admin/AddStaticRoute.html', function(){
		var opt="";
		for(var a=0; a<Interfaces.length; a++){
			opt += "<option>"+Interfaces[a]+"</option>";
		}
		$('#intSelect').append(opt);
	$(".ui-dialog").position({
	   my: "center",
	   at: "center",
	   of: window
	});

	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : editStaticPopup
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function editStaticPopup(){
	
	$( "#staticRoute" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		buttons: {
			"Save": function(){
				editStaticRoute();
			},
			"Close": function(){
				$(this).dialog('destroy');
			}
		}
	});

	$('#staticRoute').empty().load('pages/Admin/AddStaticRoute.html', function(){
		var opt="";
		for(var a=0; a<Interfaces.length; a++){
			opt += "<option>"+Interfaces[a]+"</option>";
		}
		$('#intSelect').append(opt);
	$(".ui-dialog").position({
	   my: "center",
	   at: "center",
	   of: window
	});

	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : addStaticRoute
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function addStaticRoute(){
	var rte = $('#routeTextID').val();
	var net = $('#netmaskTextID').val();
	var gt = $('#gateTextID').val();
	var intr = $('#intSelect option:selected').text();
 
	var url = getURL('ADMIN2', 'JSON')+"action=addStaticRoute&query={'QUERY': [{'sshIp': '"+ServerIP+"', 'Route': '"+rte+"', 'Gateway': '"+gt+"', 'Netmask': '"+net+"', 'Interface': '"+intr+"', 'ServerId': '"+serverIds+"'}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			data = data.replace(/'/g, '"');
			var jsonData = $.parseJSON(data);
			var res = jsonData.data[0].row;
		}
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : deleteStaticRoute
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function deleteStaticRoute(){
	var url = getURL('ADMIN2', 'JSON')+"action=deleteStaticRoute&query={'QUERY': [{'sshIp': '"+ServerIP+"', 'args': '"+serverIds+"'}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			data = data.replace(/'/g, '"');
			var jsonData = $.parseJSON(data);
			var res = jsonData.data[0].row;
		}
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : editStaticRoute
 #  AUTHOR        : Anna Marie Paulo
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function editStaticRoute(){
	var url = getURL('ADMIN2', 'JSON')+"action=editStaticRoute&query={'QUERY': [{'sshIp': '"+ServerIP+"', 'Route': '', 'Gateway': '', 'Netmask': '', 'Interface': '', 'args': '', 'ServerId': '"+serverIds+"'}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			data = data.replace(/'/g, '"');
			var jsonData = $.parseJSON(data);
			var res = jsonData.data[0].row;
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : logoutAccessPopUp
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : load dialog for logout access
 #  PARAMETERS    : 
 #
 #######################################################################
*/
var globalUsernamesJson = [];
function logoutAccessPopUp(){
	var users = [];
	if(globalSelectedAdminMain.length!=0){
		var name = "";
		name += "Are you sure you want to Logout the following user(s)?"
		for(var a=0;a<globalSelectedAdminMain.length;a++){
			$("#trAcc"+globalSelectedAdminMain[a]).each(function(){
				name += "<br>"+($(this).find('td').eq(1).text());
				users.push(($(this).find('td').eq(1).text()));	
			})
		}
		var str1 = ""; str1 = users
		var str = "{'QUERY':[{'username':'"+str1+"'}]}";
		globalUsernamesJson = str;
		alerts(name,"logOutUser();","yesno")
	}else{
		alerts("Please select user(s) to logout.");	
	}
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : editEMailNotePopUp
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : load dialog for edit email notification
 #  PARAMETERS    : 
 #
 #######################################################################
*/
//var GlobalEditEmailUserId = "";
function editEMailNotePopUp(){
	var email = "";
	var secondary = "";
	if(globalSelectedAdminMain.length==1){
		globalSelectedAdminMain[0]
		$("#trEmail"+globalSelectedAdminMain[0]).each(function(){ 
			email = ($(this).find('td').eq(4).text());
			secondary = ($(this).find('td').eq(5).text());
			//GlobalEditEmailUserId = ($(this).find('td').eq(5).text(1));
		});
		$( "#AdminPopUp" ).dialog({
			modal: true,
			autoResize:true,
			width: "auto",
			height: "auto",
			title: "Edit Email",
		});
		$( "#AdminPopUp" ).empty().load('pages/Admin/EditEMailNotificationPopUp.html',function(){
			setTimeout(function(){
				$(".ui-dialog").position({
				   my: "center",
				   at: "center",
					of: window
				});
			},1000);
		$("#editemailid").val(email);
		if(secondary!="N/A")
			$("#editadditionalemailid").val(secondary);
		});	
	}else{
		alerts("Please select one user only");	
	}
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : clickRecipients
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION	  :
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function clickRecipients(val){
	var emailnames = "";
	var value = "";
	if(val=="Custom"){
		var emaillist = GlobalEmailRecOpts.split("*");
		for(var x=0;x<emaillist.length;x++){
			value = emaillist[x].split("^");
			emailnames += "<option value='"+value[0]+"'>"+value[1]+" "+value[2]+"</option>"
		}	
		$("#multiselectemailoption").empty().append(emailnames);
		$("#multiselectemailoption").multiselect();
		$("#recipientslist").show();
	}else{
		$("#recipientslist").hide();
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : deleteVlanID
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : delete VLan range allocation
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function deleteVlanID(){
	var vlanids = globalAdminVlanId.toString()
	var url = getURL('ConfigEditor', 'JSON')+"action=deletevlan&query={'QUERY': [{'DeviceId':'"+vlanids+"'}]}";
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			dat = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(dat);
			var qresult = jsonData.RESULT[0].Result;
		}
	})
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : deleteVlanRangeAllocation
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : delete VLan range allocation
 #  PARAMETERS    : 
 #
 #######################################################################
*/
var globalAdminVlanId = [];
function deleteVlanRangeAllocation(){
	globalAdminVlanId = [];
	if(globalSelectedAdminMain.length!=0){
		var msg = "Are you sure you want to delete Vlan allocation of hostname(s)?"
		for(var a=0;a<globalSelectedAdminMain.length;a++){
			$("#tr"+globalSelectedAdminMain[a]).each(function(){
				globalAdminVlanId.push($(this).find('td').children().attr('vid'))
				msg += "<br>"+($(this).find('td').eq(1).text());
			})
		}
		alerts(msg,"deleteVlanID();","yesno")
	}else{
		var msg = "Please select item in the table. Thank you!"
		alerts(msg);
	}	
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : addVLanRangeAllocation
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : Feb. 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : load dialog for add VLan range allocation
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function addVLanRangeAllocation(){
	$( "#AdminPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		title: "Add Vlan",
	});
	$( "#AdminPopUp" ).empty().load('pages/Admin/AddVLanRangePopUp.html',function(){
		setTimeout(function(){
			$(".ui-dialog").position({
			   my: "center",
			   at: "center",
			   of: window
			});

		},1000);
		loadVlanTableInformation();
		//$("#AddVlanTable").table();
		
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadCountry
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : January 13, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the list of countries
 #  PARAMETERS    : selectbox id
 #
 #######################################################################
*/
function loadCountry(selbox){
	var queryObj = {'QUERY':[{'userid':userInformation[0].userId}]};
	var queryStr = JSON.stringify(queryObj);
	$.ajax({
		url: getURL('ADMIN2','JSON')+"action=getCountries&query="+queryStr+"&version=3.0",
		dataType: 'html',
		success: function (data) {
			var str = "<option data-placeholder='true'>Country</option>";
			var countries = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			if(jsonData.data[0].row){
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				countries = row.Country;
				id = row.CountryId;
				if (selbox == 'countries'){
					str += "<option value='"+id+"' onChange'=changeContactFormat(";
				}else{
					str += "<option value='"+countries+"' onChange'=changeContactFormat(";
				}
				str += '"addtxtCountry")';
				str += "'>"+countries+"</option>";
			}
			}
			$('#'+selbox).empty().append(str);
			if (globalDeviceType == 'Mobile'){
				$( "#"+selbox ).selectmenu( "refresh" );
			}
			if (selbox == 'countries'){
				$('#countries').dropdownchecklist({icon: {}, width: 200, maxDropHeight: 100});
			}
		}
		
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : delCountry
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : January 14, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : deletes country
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function delCountry(){
	var countries = $('#countries').val();

	if (countries == [] || countries.length == 0){
		alerts("No item selected!");
		return;
	}
	var msg = "Are you sure you want to DELETE the selected countries?";
/*	for (var c=0; c<countries.length; c++){
		msg+= countries[c] + "<br/>";
	}*/

    $('#manualAlert').dialog({
	    modal: true,
        autoOpen: false,
        height: 175,
        width: 300,
	    resizable: false,
	    closeOnEscape: false,
	    open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
	    buttons: {			
		    "Yes" : function() {
				deleteCountry(countries);
				for (var i=0;i<countries.length;i++){
					deletedCountry.push(countries[i]);
				}
				countries = [];
		        $(this).dialog("close");
            },
            "Cancel": function() {
				countries = [];
				deletedCountry = [];
	            $(this).dialog("close");
            }
        }
	});			
	$('#manualAlert').text(msg);
	$('#manualAlert').dialog('open');
	$('#manualAlert').css('height','auto');
	$(".ui-dialog :button").blur();
}

function deleteCountry(val){
	var cgiURL=getURL('ADMIN2', 'JSON')+"action=deleteCountry&query={'QUERY': [{'query': '"+userInformation[0].userId+"::"+val+"'}]}";
	$.ajax({
		url: cgiURL,
		dataType: 'html',
		success: function(data) {
			data = data.replace(/'/g, '"');
			var jsonData = $.parseJSON(data);
			res = jsonData.RESULT[0].Result;
			if (res == 1){
				$('#countries').dropdownchecklist("destroy");
				//$('#countries').dropdownchecklist("refresh");
				loadCountry('countries');
				alerts("Delete Successful!");
			}else{
				alerts("Delete Unsuccessful!");
			}
		}
	});
}
function newCountry(val){
	$.ajax({
		url: getURL('ADMIN2', 'JSON')+"action=addcountry&query={'QUERY':[{'query':'"+userInformation[0].userId+"::"+val+"'}]}",
		dataType: 'html',
        async: false,
        success: function (data) {
			data = data.replace(/'/g,'"');
			var jsonData = $.parseJSON(data);
			var res = jsonData.RESULT[0].Result;
	
			if (res == '1'){
				setTimeout(function() {
					$('#countries').dropdownchecklist("destroy");
					//$('#countries').dropdownchecklist("refresh");
					loadCountry('countries');
					alerts('Add Successful!');
				},2000);
			}else{
				setTimeout(function() {	
					alerts('Add Unsuccessful!');
				},1000);
			}
		}
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : addCountry
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : January 10, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : adds a country in country selection in add/edit user
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function addCountry(){
	$("#addCountryPopUp").dialog({
			title: 'Add Country',
			autoOpen: false,
			modal: true,
			height: 'auto', 
			width: 400,
			resizable: false,
			closeOnEscape: false,
		    open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
			buttons: {	
				"Add": function () {
					var country = new Array();
	
					$('input[name="countryName"]').each(function(){
						country.push($(this).val());
					});

					if (country == [] || country == null || country == undefined || country.length == 0){
						alerts("Please input a country name.");
						return;
					}
					var checkCountry = validateCountryCompany('country',country);
					if (checkCountry == 0){
						alerts("Country name already exist!");
						return;
					}
					newCountry(country);
					for (var i=0;i<country.length;i++){
						addedCountry.push(country[i]);
					}
					country = [];
					$('#modalID3').remove();					
					$(this).dialog('close');
				},
				"Cancel": function (){
					country = [];
					addedCountry = [];
					$('#modalID3').remove();					
					$(this).dialog('close');
				}
			}
		});
	$("#addCountryPopUp").dialog("open");
	$(".ui-dialog :button").blur();
	$("#addCountryPopUp").load("pages/Admin/addCountry.html",function(){
		addModal3();
		addAModal('addCountryPopUp',3);
	});
}
function newCompany(val){
	$.ajax({
		url: getURL('ADMIN2', 'JSON')+"action=addCompany&query={'QUERY': [{'query': '"+userInformation[0].userId+"::"+val+"'}]}",
		dataType: 'html',
        async: false,
        success: function (data) {	
			data = data.replace(/'/g, '"');
			var jsonData = $.parseJSON(data);	
			var res = jsonData.RESULT[0].Result;
			if (res == '1'){
				setTimeout(function() {
					$('#companies').dropdownchecklist("destroy");
					//$('#companies').dropdownchecklist("refresh");
					loadCompany('companies');
					alerts('Add Successful!');
				},2000);
			}else{
				setTimeout(function() {	
					alerts('Add Unsuccessful!');
				},2000);
			}
		}
	});
}

function validateCountryCompany(flag,name){
	var url =  getURL('ADMIN2', 'JSON')+"action=validateCountryCompany&query={'QUERY': [{'flag': '"+flag+"', 'name': '"+name+"', 'userid': '"+userInformation[0].userId+"'}]}";
	var retcerd;
	$.ajax({
		url: url,
		dataType: 'html',
        async: false,
        success: function (data) {	
			data = data.replace(/'/g, '"');
			var jsonData = $.parseJSON(data);
			res = jsonData.RESULT[0].Result;
				
		}
	});
	return res;
}


/*
 #######################################################################
 #
 #  FUNCTION NAME : addCountryBox
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : January 10, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : creates country textbox
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function addCountryBox(){
	var val = $('#numCountry').val();
	var str = "";
	for (var i=0;i<val;i++){
		 var x = i+1;
		 str += "<tr style='padding:10px'>";
         str += "<td style='width:130px;'>Name of Country "+x+":</td>";
         str += "<td style='padding-left:10px;'><input type='text' class='inputDesign' name='countryName' style='width:180px;'/></td>";
         str += "</tr>";
	}
	$('#countryTable').empty().append(str);
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : loadCompany
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : January 13, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the list of companies
 #  PARAMETERS    : selectbox id
 #
 #######################################################################
*/
function loadCompany(selbox){
	var queryObj = {'QUERY':[{'userid':userInformation[0].userId}]};
	var queryStr = JSON.stringify(queryObj);
	$.ajax({
		url:  getURL('ADMIN2','JSON') + "action=getCompanies&query="+queryStr+"&version=3.0",
		dataType: 'html',
		success: function (data) {
			var str = "<option data-placeholder='true'>Company</option>";
			var companies = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			if(jsonData.data[0].row){
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				companies = row.CompanyName;
				id = row.CompanyId;
				if (selbox == 'companies'){
					str += "<option value='"+id+"' onChange'=changeContactFormat(";
				}else{
					str += "<option value='"+companies+"' onChange'=changeContactFormat(";
				}
				str += '"addtxtCompany")';
				str += "'>"+companies+"</option>";
			}
			}
			$('#'+selbox).empty().append(str);
			if (globalDeviceType == 'Mobile'){
				$( "#"+selbox ).selectmenu( "refresh" );
			}
			if (selbox == 'companies'){
				$('#companies').dropdownchecklist({icon: {}, width: 200, maxDropHeight: 100});
			}
		}
		
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : editCompany
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : January 13, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : opens pop up for editing company list
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function editCompany(){

	$("#delCompanyPopUp").dialog({
			title: 'Edit Company',
			autoOpen: false,
			height: 340, 
			width: 350,
			resizable: false,
			closeOnEscape: false,
		    open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
			buttons: {	
				"Done": function () {
					loadCompany('addtxtCompany');
					$('#modalID2').remove();					
					$(this).dialog('close');
				},
				"Cancel": function (){
					if (addedCompany != [] || addedCompany.length != 0){
						addedCompany = [];
					}
					if (deletedCompany != [] || deletedCompany.length != 0){
						deletedCompany = [];	
					}
					$('#modalID2').remove();					
					$(this).dialog('close');
				}
			}
		});
	$(".ui-dialog :button").blur();
	$("#delCompanyPopUp").dialog("open").load("pages/Admin/delCompany.html",function(){
		//addModal2();
		//addAModal('delCompanyPopUp',2);
		loadCompany('companies');
	});

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : delCompany
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : January 14, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : deletes company
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function delCompany(){
	var companies = $('#companies').val();
	if (companies == [] || companies.length == 0){
		alerts("No item selected!");
		return;
	}

	var msg = "<b>Are you sure you want to DELETE the selected companies?</b><br/><br/>";
/*	for (var c=0; c<companies.length; c++){
		msg+= companies[c] + "<br/>";
	}*/

    $('#manualAlert').dialog({
	    modal: true,
        autoOpen: false,
        height: 175,
        width: 300,
	    resizable: false,
	    closeOnEscape: false,
	    open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
	    buttons: {			
		    "Yes" : function() {
				deleteCompany(companies);
				for (var i=0;i<companies.length;i++){
					deletedCompany.push(companies[i]);
				}
				companies = [];
		        $(this).dialog("close");
            },
            "Cancel": function() {
				companies = [];
				deletedCompany = [];
	            $(this).dialog("close");
            }
        }
	});			
	$('#manualAlert').empty().append(msg);
	$('#manualAlert').dialog('open');
	$('#manualAlert').css('height','auto');
	$(".ui-dialog :button").blur();
}

function deleteCompany(val){
	var cgiURL = getURL('ADMIN2', 'JSON')+"action=deleteCompany&query={'QUERY': [{'query': '"+userInformation[0].userId+"::"+val+"'}]}";
	$.ajax({
		url: cgiURL,
		dataType: 'html',
		success: function(data) {
			data = data.replace(/'/g, '"');
			var jsonData = $.parseJSON(data);
			var res = jsonData.RESULT[0].Result;
			if(res == 1){
				$('#companies').dropdownchecklist("destroy");
				//$('#companies').dropdownchecklist("refresh");
				loadCompany('companies');
				alerts("Delete Successful!");
			}else{
				alerts("Delete Unsuccessful!");
			}
		}
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : addCompany
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : January 10, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : adds a country in country selection in add/edit user
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function addCompany(){
	$("#addCompanyPopUp").dialog({
			title: 'Add Company',
			autoOpen: false,
			height: 'auto', 
			width: 400,
			resizable: false,
			closeOnEscape: false,
		    open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
			buttons: {	
				"Add": function () {
					var company = new Array();
	
					$('input[name="companyName"]').each(function(){
						company.push($(this).val());
					});

					if (company == [] || company == null || company == undefined || company.length == 0){
						alerts("Please input a company name.");
						return;
					}
					newCompany(company);
					for (var i=0;i<company.length;i++){
						addedCompany.push(company[i]);
					}
					company = [];
					$('#modalID3').remove();					
					$(this).dialog('close');
				},
				"Cancel": function (){
					company = [];
					addedCompany = [];
					$('#modalID3').remove();					
					$(this).dialog('close');
				}
			}
		});
	$("#addCompanyPopUp").dialog("open");
	$(".ui-dialog :button").blur();
	$("#addCompanyPopUp").load("pages/Admin/addCompany.html",function(){
		addModal3();
		addAModal('addCompanyPopUp',3);
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : addCompanyBox
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : January 10, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : creates company textbox
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function addCompanyBox(){
	var val = $('#numCompany').val();
	var str = "";
	for (var i=0;i<val;i++){
		 var x = i+1;
		 str += "<tr style='padding:10px'>";
         str += "<td style='width:130px;'>Name of Company "+x+":</td>";
         str += "<td style='padding-left:10px;'><input type='text' class='inputDesign' name='companyName' style='width:180px;'/></td>";
         str += "</tr>";
	}
	$('#companyTable').empty().append(str);
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : rePosPopUp
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 20, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : changes the size and position of popup
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function rePosPopUp(){
	
	var canvH = $(window).height() - 275;
	var canvW = $(window).width() - 250;
	$('.popUpPage').css({'height':canvH,'width':canvW});
	$('#navbar').css({'width':canvW-10,'height':canvH-100});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : rePosDialog 
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 20, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : repositions the dialog box
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function rePosDialog(){
	$( ".dialogBox" ).popup({ positionTo: "window" });
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : activateResLimits
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 21, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : enables/disables form fields in Reservation Limits
 #					Tab
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function activateResLimits(){
	$('#maxResNumCB').bind('click',function(){
		if ($('#maxResNumCB').is(':checked') == true){
			if (globalDeviceType == 'Mobile'){
				$('#maxResNum').textinput('enable');
			} else {
				$('#maxResNum').attr('disabled',false);
			}
		}else{
			if (globalDeviceType == 'Mobile'){
				$('#maxResNum').textinput('disable');
			} else {
				$('#maxResNum').attr('disabled',true);
			}
		}
	});
	$('#maxActResCB').bind('click',function(){
		if ($('#maxActResCB').is(':checked') == true){
			if (globalDeviceType == 'Mobile'){
				$('#maxActRes').textinput('enable');
			} else {
				$('#maxActRes').attr('disabled',false);
			}
		}else{
			if (globalDeviceType == 'Mobile'){
				$('#maxActRes').textinput('disable');
			} else {
				$('#maxActRes').attr('disabled',true);
			}
		}
	});
	$('#maxDevNumCB').bind('click',function(){
		if ($('#maxDevNumCB').is(':checked') == true){
			if (globalDeviceType == 'Mobile'){
				$('#maxDevNum').textinput('enable');
			}else{
				$('#maxDevNum').attr('disabled',false);
			}
		}else{
			if (globalDeviceType == 'Mobile'){
				$('#maxDevNum').textinput('disable');
			}else{
				$('#maxDevNum').attr('disabled',true);
			}

		}
	});
	$('#maxExtNumCB').bind('click',function(){
		if ($('#maxExtNumCB').is(':checked') == true){
			if (globalDeviceType == 'Mobile'){
				$('#maxExtNum').textinput('enable');
			}else{
				$('#maxExtNum').attr('disabled',false);
			}
		}else{
			if (globalDeviceType == 'Mobile'){
				$('#maxExtNum').textinput('disable');
			}else{
				$('#maxExtNum').attr('disabled',true);
			}
		}
	});
	$('#maxResDurCB').bind('click',function(){
		if ($('#maxResDurCB').is(':checked') == true){
			if (globalDeviceType == 'Mobile'){
				$('#UserReservationTimeInfo').selectmenu('enable');
			} else {
				$('#UserReservationTimeInfo').attr('disabled',false);
			}
		}else{
			if (globalDeviceType == 'Mobile'){
				$('#UserReservationTimeInfo').selectmenu('disable');
			} else {
				$('#UserReservationTimeInfo').attr('disabled',true);
			}
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkDeleteUser 
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 25, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : checks user to be deleted
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function checkDeleteUser() {
	var msg = "";
	var unames = new Array();
	var header = "Delete User";
	
	$(".trUser").each(function(){
		var uname = $(this).find('td').eq(2).text();
		if ($(this).hasClass('highlight') == true){
			if ($.inArray(uname,unames) == -1){
				unames.push(uname);
			}
		}
	});
	msg += "<b>Are you sure you want to DELETE the following user(s)?</b><br/><br/>";
	for (var c = 0; c < unames.length; c++){
    	msg += unames[c] + "<br/>";
	}
    msg += "<br/>Deleting user(s) will also delete files that are uploaded and their reservations.<br/><br/><input id='keepFiles' type='checkbox' />Keep Files";
	alerts(msg,'finalDeleteUser();','yesorno','','');
}



/*
 #######################################################################
 #
 #  FUNCTION NAME : finalDeleteUser 
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 25, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : deletes selected user
 #  PARAMETERS    :
 #
 #######################################################################
*/
function finalDeleteUser(){
	var kfiles = 0;
	if ($('#keepFiles').is(':checked')) {
    	kfiles = 1;
    }
	var usernames = new Array();
	var userName = "";
	for(i=0;i<globalSelectedAdminMain.length;i++) {
		if (globalDeviceType == 'Mobile'){
			$('.trUser').each(function(){
				var uid = $(this).attr('uid');
				if (uid == globalSelectedAdminMain[i]){
					userName = $(this).children().find('td').eq(2).text();
				}
			});
		}else{
			userName = $('#tr'+globalSelectedAdminMain[i]).children().find('td').eq(3).text();
		}
		usernames.push(userName);
		if(i == (globalSelectedAdminMain.length-1)) {
			var deltodo ;	
		//	if (todo != "") {
		//		deltodo = "loadUserTable(1);"+todo;
		//	} else {
				deltodo = "alertUser('Delete Success!');loadUserTable();";
		//	}
			var qryStr = {'QUERY':[{'UserId':globalSelectedAdminMain[i]}]};
			var queryStr = JSON.stringify(qryStr);
			deletes("action=DeleteUser&query="+queryStr,deltodo);
			if (kfiles == 0) {
				deleteFTPUser(usernames);
			}
		
		} else {
			var qryStr = {'QUERY':[{'UserId':globalSelectedAdminMain[i]}]};
			var queryStr = JSON.stringify(qryStr);
			deletes("action=DeleteUser&query="+queryStr,"");
		}
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : createGroupDynamicTab
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : Feb. 25, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : creates dynamic group tab
 #  PARAMETERS    : rdid
 #
 #######################################################################
*/
function createGroupDynamicTab(rdid){
	 var str = '<div data-role="navbar" id="groupnavbar"><ul id="groupTab">';
    for(var a = 0; a <globalUserZoneNames.length; a++){
		if (globalDeviceType == 'Mobile'){
	        str += "<li><a href='#g' data-tab-class='liUserGroup_"+globalUserZoneNames[a]+"' did='"+globalUserZoneIds[a]+"' onclick='loadBindedGroup("+rdid+","+globalUserZoneIds[a]+")' data-mini='true'>";
		} else {
	        str += "<li><a href='#liUserGroup_"+globalUserZoneNames[a]+"' did='"+globalUserZoneIds[a]+"' onclick='loadBindedGroup("+rdid+","+globalUserZoneIds[a]+")' data-mini='true'>";
		}
        str += globalUserZoneNames[a]+"</a></li>";
	}
	str += "</ul><div id='domZoneGroupDiv'></div></div>";
    $('#domZoneGroupTab').empty().append(str);
	$('#groupnavbar').tabs();
	$( "#domZoneGroupDiv" ).empty().load('pages/Admin/UserDomainZoneGroup.html',function(){
		loadBindedGroup(rdid,globalUserZoneIds[0]);
	});	
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : zoneIdHighlight
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 25, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the selected id of the row and highlights the
 #					row for zone table only
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function groupIdHighlight() {
	$(".trUserGroup").on("click",function(){
		var id = $(this).attr(gid);
		if (globalDeviceType == 'Mobile'){
			var cond = $('.trUserDomain').hasClass('highlight');
		}else{
			var cond = $('#trUserDomain'+id).children().find('input').is(':checked');
		}
		if (cond){
			if($.inArray(id, globalUserZoneIds) == -1){
				globalUserGroupIds.push(id);
				if(globalDeviceType != "Mobile"){
					$('#trUserGroup'+id).addClass('highlight');
				}else{
					$(this).addClass('highlight');
				}
			}
		}else{
			var pos = globalUserGroupIds.indexOf(id);
			var pos2 = globalDynamicSelected.indexOf(id);
			globalUserGroupIds.splice(pos,1);
			globalDynamicSelected.splice(pos2,1);
			if(globalDeviceType != "Mobile"){
				$('#trUserGroup'+id).removeClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getUserPolicyId
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the selected id of the row and highlights the
 #					row for user policy table
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getUserPolicyId() {
	$(".trUserAccRights").on("click",function(){
		var id = $(this).attr('accrigid');
		if (globalDeviceType == 'Mobile'){
			var cond = $('.trUserAccRights').hasClass('highlight');
		}else{
			var cond = $('#trUserAccRights'+id).children().find('input').is(':checked');
		}
		if (cond){
			if($.inArray(id, globalUserPolicyIds) == -1){
				globalUserPolicyIds.push(id);
				if(globalDeviceType != "Mobile"){
					$('#trUserAccRights'+id).addClass('highlight');
				}else{
					$(this).addClass('highlight');
				}
			}
		}else{
			var pos = globalUserPolicyIds.indexOf(id);
			globalUserPolicyIds.splice(pos,1);
			if(globalDeviceType != "Mobile"){
				$('#trUserAccRights'+id).removeClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getUserGrpPolicyId
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the selected id of the row and highlights the
 #					row for user group policy table
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getUserGrpPolicyId() {
	$(".trUGroupAccRights").on("click",function(){
		var id = $(this).attr('accrigid2');
		if (globalDeviceType == 'Mobile'){
			var cond = $('.trUGroupAccRights').hasClass('highlight');
		}else{
			var cond = $('#trUGroupAccRights'+id).children().find('input').is(':checked');
		}
		if (cond){
			if($.inArray(id, globalUGroupPolicyIds) == -1){
				globalUGroupPolicyIds.push(id);
				if(globalDeviceType != "Mobile"){
					$('#trUGroupAccRights'+id).addClass('highlight');
				}else{
					$(this).addClass('highlight');
				}
			}
		}else{
			var pos = globalUGroupPolicyIds.indexOf(id);
			globalUGroupPolicyIds.splice(pos,1);
			if(globalDeviceType != "Mobile"){
				$('#trUGroupAccRights'+id).removeClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadUserPolicy
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 26, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads user access rights table
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadUserPolicy(){
	var userPolStr = "";
	if (globalUserPolicy2Ids){
		userPolStr = globalUserPolicy2Ids.join(",");
	}
	var url =  getURL('ADMIN2','JSON') + "action=showSelectedAccessRights&query={'QUERY':[{'limit':'10','page':'1','sort':'','orderby':'','extra':'"+userPolStr+"','filter':''}]}&version=3.0";
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
			globalUserPolicy2Ids = [];
			if (jsonData.data[0].row){
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				var id = row.AccessRightsId;
				if(globalDeviceType != "Mobile"){
					str += "<tr id='trUserAccRights"+row.AccessRightsId+"'><td><input type='checkbox' onclick='enableStatusAccRight("+a+", \"trUserAccRights\");' name='trUserAccRights' class='trUserAccRights' accrigid='"+row.AccessRightsId+"'/></td>";
				}else{
					str += "<tr class='trUserAccRights' accrigid='"+row.AccessRightsId+"'>";
				}

				str += "<td>"+row.AccessRightsName+"</td>";
				str += "<td>"+row.Action+"</td>";
				str += "<td>"+row.EntityType+"</td>";
				str += "<td>"+row.Description+"</td>";
				str += "<td><select disabled='disabled' id='trUserAccRights"+a+"' ssid='"+id+"' value='"+row.Status+"' data-mini='true'><option value='Active'>Active</option>";
				str += "<option value='Inactive'>Inactive</option></select></td>";
				str += "</tr>";
				if ($.inArray(id,globalUserPolicy2Ids) == -1){
					globalUserPolicy2Ids.push(id);
				}
				if(row.Status=='Active'){
					if($.inArray(id,globalAccActiveStatus)==-1){
						globalAccActiveStatus.push(id);
					}
				}else{
					if($.inArray(id,globalAccInactiveStatus)==-1){
						globalAccInactiveStatus.push(id);
					}
				}
			}
			}
			$('#userAccRiAdmin-table > tbody').empty().append(str);
			if(globalDeviceType != "Mobile"){
			}else{
				$("#userAccRiAdmin-table").table("refresh");
			}
			if (globalUserPolicyIds){
				for(var x=0;x<globalUserPolicyIds.length;x++){
					$('#trUserAccRights'+globalUserPolicyIds[x]).children().find('input').prop('checked',true);
				}
			}
			getUserPolicyId();
		}
	});
}

function enableStatusAccRight(a, type){
	$("input:checkbox[name='"+type+"']").each(function(){
		if($(this).is(":checked")){
			$('#'+type+a).attr('disabled', false);
			$(this).prop("checked", true);
		}else{
			$('#'+type+a).attr('disabled', true);
			$(this).prop("checked", false);
		}
	});

	$(document).on('change', '#'+type+a, function(){
		var id;
		if($(this).val()=='Active'){
			id=$(this).attr('ssid');
			if(type=='trUserAccRights'){
				globalAccActiveStatus.push(id);
				var pos = globalAccActiveStatus.indexOf(id);
				globalAccActiveStatus.splice(pos,1);
			}else{
				globalDomActiveStatus.push(id);
				var pos = globalAccActiveStatus.indexOf(id);
			}
		}else{
			id=$(this).attr('ssid');
			if(type=='trUserAccRights'){
				globalAccInactiveStatus.push(id);
			}else{
				globalDomInactiveStatus.push(id);
			}
		}
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : loadGroupPolicy
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 26, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads user's group access rights table
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadGroupPolicy(){
	var url = getURL('ADMIN2','JSON') + "action=loadGroupAccessRights&query={'QUERY':[{'limit':'10','page':'1','sort':'','orderby':'','groupid':'','filter':''}]}&version=3.0";
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
			globalUGroupPolicyIds = [];
			if (jsonData.data[0].row){
				for (var a=0;a<jsonData.data[0].row.length;a++){
					var row = jsonData.data[0].row[a];
					var ugrouppol = row.AccessRightsId;
					if ($. inArray(ugrouppol,globalUGroupPolicyIds) == -1){
						globalUGroupPolicyIds.push(ugrouppol);
					}
					if(globalDeviceType != "Mobile"){
						str += "<tr id='tr"+row.AccessRightsId+"'>";
					}else{
						str += "<tr class='trAccRights' accrigid2='"+row.AccessRightsId+"'>";
					}
					str += "<td>"+row.AccessRightsName+"</td>";
					str += "<td>"+row.Action+"</td>";
					str += "<td>"+row.EntityType+"</td>";
					str += "<td>"+row.Description+"</td>";
					str += "<td>"+row.GroupName+"</td>";
					str += "<td>"+row.DomainName+"</td>";
					str += "</tr>";
				}
			}
			$('#ugroupAccRiAdmin-table > tbody').empty().append(str);
			if(globalDeviceType != "Mobile"){
			}else{
				$("#ugroupAccRiAdmin-table").table("refresh");
			}
			//getUserGrpPolicyId();
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : changeUserAccRiTab
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : Feb. 26, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : changes user access rights tab page in pop up
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function changeUserAccRiTab(){
	var prevSelection = "useraccritab-1";
    $(document).on("click", "#useraccritab ul li",function() {
	    var newSelection = $(this).children("a").attr("data-tab-class");
       // $("." + prevSelection).addClass("ui-screen-hidden");
//        $("." + newSelection).removeClass("ui-screen-hidden");
        prevSelection = newSelection;
		loadUserAccRiTab(newSelection);
    });
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadUserAccRiTab
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : Feb. 26, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads user access rights tab content
 #  PARAMETERS    : tab
 #
 #######################################################################
*/
function loadUserAccRiTab(tab){
	switch(tab) {
		case "useraccritab-1":
			loadUserPolicy();
		break;
		case "useraccritab-2":
			loadGroupPolicy();	
		break;
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : showAccess
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : id, src
 #
 #######################################################################
*/

function showAccess(id,src) {

    var type = "";
    switch ( id ) {
        case "CEChoices": type = "CE"; break;
        case "RMChoices": type = "RM"; break;
        case "ADChoices": type = "AD"; break;
        case "PMChoices2": type = "PM2"; break;
        case "SRChoices": type = "SR"; break;
    }
    if (src.checked == true) {
		if (globalDeviceType.toLowerCase() == "mobile"){
        	$('#'+id).removeAttr('style');
        	$('#'+type+'addSecPolView').prop('checked',true).checkboxradio("refresh");
        	$('#'+type+'addSecPolView').checkboxradio('disable').checkboxradio("refresh");
		}else{
		 	$('#'+id).removeAttr('style');
			$('#'+type+'addSecPolView').prop('checked',true);
	        $('#'+type+'addSecPolView').attr('disabled',true);
		}
    } else {
        $('#'+id).attr('style','display:none');
		if (globalDeviceType.toLowerCase() == "mobile"){
        	$('#'+type+'addSecPolView').prop('checked',false).checkboxradio("refresh");
	        $('#'+type+'addSecPolView').checkboxradio('enable').checkboxradio("refresh");
		    $('#'+type+'addSecPolEdit').prop('checked',false).checkboxradio("refresh");
	        $('#'+type+'addSecPolAdd').prop('checked',false).checkboxradio("refresh");
   	    	$('#'+type+'addSecPolDel').prop('checked',false).checkboxradio("refresh");
		}else{
			 $('#'+type+'addSecPolView').prop('checked',false);
	        $('#'+type+'addSecPolView').attr('disabled',false);
	        $('#'+type+'addSecPolEdit').prop('checked',false);
	        $('#'+type+'addSecPolAdd').prop('checked',false);
	        $('#'+type+'addSecPolDel').prop('checked',false);
		}
    }

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : saveAccessRights
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : add or edit access rights save function
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function saveAccessRights(){
	var name = $('#SecPolName').val();
	var desc = $('#SecPolDesc').val();
	if (globalAdminFunc == "add"){
		var header = "Add Access Rights";
	}else if (globalAdminFunc == "edit"){
		var header = "Edit Access Rights";
	}
	var table = "Access Rights";
	var validate = validateTextbox(name,desc,"",table,header);
	if (validate == 1){
		return;
	}
	var enttype = getEntityType();
	var qjson = "";
	if (globalAdminFunc == "add"){
		var queryObj = {'QUERY':[{
			'AccessRightsName':name,'EntityType':enttype,'Description':desc}]};
		queryObj = getActions(queryObj);
		var queryStr = JSON.stringify(queryObj);
		qjson = "action=addSpol&query="+queryStr+"&version=3.0";
	}else if (globalAdminFunc == "edit"){
		var queryObj = {'QUERY':[{
			'AccessRightsId':globalSelectedAdminMain.toString(),
			'AccessRightsName':name,'EntityType':enttype,'Description':desc}]};
		queryObj = getActions(queryObj);
		var queryStr = JSON.stringify(queryObj);
		qjson = "action=editSecPol&query="+queryStr+"&version=3.0";
	}
	saveJSON(qjson,"loadAccRightsTable();", header);
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateTextbox 
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : validates fields
 #  PARAMETERS    : name, desc, oldname, table name, header
 #
 #######################################################################
*/
function validateTextbox(name,desc,oldname,table,header){
	 if(name == "" && desc == "") {
	     alertUser("Please provide a name and description.", header);
         return 1;
     } else if(desc == "")  {
         alertUser("Please provide a description.",header);
         return 1;
     } else if(name == "")   {
         alertUser("Please provide a name.",header);
         return 1;
	 }
	 if (name != globalName){
	 	 var exists = checkNameExist(name,"AccessRights");
	 	 if (exists == 1){
		 	alertUser(name+" already exist!",header);
			return 1;
	 	 }
	 }
	 var cbox = validateCheckboxes(header);
     if (cbox == 1) {
     	return 1;
     }
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkNameExist 
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : check name existence
 #  PARAMETERS    : name, table
 #
 #######################################################################
*/

function checkNameExist(name,table){
	//var rdid = globalSelectedDomainId;
	var rdid = "";
	var queryObj = {'QUERY':[{'name':name,'table':table,'resourcedomainid':rdid}]};
	var queryStr = JSON.stringify(queryObj);
    var url = getURL('ADMIN2','JSON')+"action=checkadminname&query="+queryStr+"&version=3.0";
    var qresult = "";
    $.ajax({
        url: url,
        dataType: 'html',
        async: false,
        success: function(data){
            var mydata = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(mydata);
			qresult = jsonData.RESULT[0].Result;
        }
    });
    return qresult;
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateCheckboxes
 #  AUTHOR        : 
 #  DATE          : February 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : validates entity type checkboxes in access rights
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function validateCheckboxes(header) {

    if ($('#PMCbox').is(':checked') == false && $('#CECbox').is(':checked') == false && $('#ADCbox').is(':checked') == false && $('#RMCbox').is(':checked') == false && $('#PMCbox2').is(':checked') == false && $('#SRCbox').is(':checked') == false) {
        alertUser("Please select at least 1 Entity to bind with the Access Right.");
        return 1;
    }

    var errmsg = validateSubCheckboxes();

    if (errmsg.length != 0) {
        var msg = "Please bind at least 1 action for ";
        for (var j = 0; j < errmsg.length; j++) {
            if (errmsg.length == 1) {
                msg += errmsg[j]+" entity.";
            } else if (errmsg.length == 2){
                if (j == errmsg.length - 1) {
                    msg += "and "+errmsg[j]+" entities."
                } else {
                    msg += errmsg[j] + " ";
                  }
              } else {
                    if (j == errmsg.length - 1) {
                        msg += "and "+errmsg[j]+" entities."
                    } else if (j == errmsg.length - 2){
                        msg += errmsg[j]+" ";
                      } else {
                            msg += errmsg[j]+", ";
                        }
                }
        }
        alertUser(msg);
        return 1;
    } else {
        return 0;
    }

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateSubCheckboxes
 #  AUTHOR        : 
 #  DATE          : February 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : validates checkboxes under entity type of access
 #					rights
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function validateSubCheckboxes() {

    var errmsg = new Array();


    if ($('#CECbox').is(':checked')) {
        if ($('#CEaddSecPolView').is(':checked') == false && $('#CEaddSecPolAdd').is(':checked') == false && $('#CEaddSecPolDel').is(':checked') == false && $('#CEaddSecPolEdit').is(':checked') == false) {
            errmsg.push("Config Editor");
        }
    }

    if ($('#RMCbox').is(':checked')) {
        if ($('#RMaddSecPolView').is(':checked') == false && $('#RMaddSecPolAdd').is(':checked') == false && $('#RMaddSecPolDel').is(':checked') == false && $('#RMaddSecPolEdit').is(':checked') == false) {
            errmsg.push("Resource Management");
        }
    }

    if ($('#ADCbox').is(':checked')) {
        if ($('#ADaddSecPolView').is(':checked') == false && $('#ADaddSecPolAdd').is(':checked') == false && $('#ADaddSecPolDel').is(':checked') == false && $('#ADaddSecPolEdit').is(':checked') == false) {
            errmsg.push("Administration");
        }
    }

    if ($('#PMCbox').is(':checked')) {
        if ($('#PMaddSecPolView').is(':checked') == false && $('#PMaddSecPolAdd').is(':checked') == false && $('#PMaddSecPolDel').is(':checked') == false && $('#PMaddSecPolEdit').is(':checked') == false) {
            errmsg.push("Port Matrix");
        }
    }

    if ($('#PMCbox2').is(':checked')) {
        if ($('#PM2addSecPolView').is(':checked') == false && $('#PM2addSecPolAdd').is(':checked') == false && $('#PM2addSecPolDel').is(':checked') == false && $('#PM2addSecPolEdit').is(':checked') == false) {
            errmsg.push("Power Management");
        }
    }

    if ($('#SRCbox').is(':checked')) {
        if ($('#SRaddSecPolView').is(':checked') == false && $('#SRaddSecPolAdd').is(':checked') == false && $('#SRaddSecPolDel').is(':checked') == false && $('#SRaddSecPolEdit').is(':checked') == false) {
            errmsg.push("Statistics and Reports");
        }
    }

    return errmsg;

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getActions
 #  AUTHOR        : 
 #  DATE          : February 27, 2014
 #  MODIFIED BY   : kmmabignay
 #  REVISION DATE : March 25, 2014
 #  REVISION #    : 
 #  DESCRIPTION   : gets the action of selected entity type
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getActions(queryObj) {
    var action2 = "";
    var view = "";
    var add = "";
    var edit = "";
    var del = "";
    var act1 = new Array();
    if ($('#CECbox').is(':checked')) {
        act1 = formulateActionString('CE');
        view += act1[0]+"/";
        add += act1[1]+"/";
        edit += act1[2]+"/";
        del += act1[3]+"/";
        action2 += act1[4]+"/";
	}
    if ($('#RMCbox').is(':checked')) {
        act1 = formulateActionString('RM');
        view += act1[0]+"/";
        add += act1[1]+"/";
        edit += act1[2]+"/";
        del += act1[3]+"/";
        action2 += act1[4]+"/";
	}
    if ($('#ADCbox').is(':checked')) {
        act1 = formulateActionString('AD');
        view += act1[0]+"/";
        add += act1[1]+"/";
        edit += act1[2]+"/";
        del += act1[3]+"/";
        action2 += act1[4]+"/";
	}
    if ($('#PMCbox').is(':checked')) {
        act1 = formulateActionString('PM');
        view += act1[0]+"/";
        add += act1[1]+"/";
        edit += act1[2]+"/";
        del += act1[3]+"/";
        action2 += act1[4]+"/";
	}
    if ($('#PMCbox2').is(':checked')) {
        act1 = formulateActionString('PM2');
        view += act1[0]+"/";
        add += act1[1]+"/";
        edit += act1[2]+"/";
        del += act1[3]+"/";
        action2 += act1[4]+"/";
	}
    if ($('#SRCbox').is(':checked')) {
        act1 = formulateActionString('SR');
        view += act1[0]+"/";
        add += act1[1]+"/";
        edit += act1[2]+"/";
        del += act1[3]+"/";
        action2 += act1[4]+"/";
	}
	queryObj.QUERY[0].PView = view.substr(0,view.length-1);
	queryObj.QUERY[0].PAdd = add.substr(0,add.length-1);
	queryObj.QUERY[0].PEdit = edit.substr(0,edit.length-1);
	queryObj.QUERY[0].PDelete = del.substr(0,del.length-1);
	queryObj.QUERY[0].Action = action2.substr(0,action2.length-1);
	return queryObj;
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : formulateActionString
 #  AUTHOR        : 
 #  DATE          : February 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : formulates the selected actions in entity type
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function formulateActionString(ent) {

    var retArr = new Array();
    var a1, a2, a3, a4, action2="";

    if ($('#'+ent+'addSecPolView').is(':checked')) {
        a1 = "true";
        action2 += "V-";
    } else {
        a1 = "false";
      }

    if ($('#'+ent+'addSecPolAdd').is(':checked')) {
        a2 = "true";
        action2 += "A-";
    } else {
        a2 = "false";
      }

    if ($('#'+ent+'addSecPolEdit').is(':checked')) {
        a3 = "true";
        action2 += "E-";
    } else {
        a3 = "false";
      }

    if ($('#'+ent+'addSecPolDel').is(':checked')) {
        a4 = "true";
        action2 += "D"
    } else {
        a4 = "false";
        action2 = action2.substr(0,action2.length-1);
      }

    retArr.push(a1,a2,a3,a4,action2);

    return retArr;

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getEntityType
 #  AUTHOR        : 
 #  DATE          : February 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets entity type selected
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function getEntityType() {

    var enttype = "";

    if ($('#CECbox').is(':checked')) {
        enttype += "Config Editor/";
    }
    if ($('#RMCbox').is(':checked')) {
        enttype += "Resource Management/";
    }
    if ($('#ADCbox').is(':checked')) {
        enttype += "Administration/";
    }
    if ($('#PMCbox2').is(':checked')) {
        enttype += "Power Management/";
    }
    if ($('#PMCbox').is(':checked')) {
        enttype += "Port Matrix/";
    }
    if ($('#SRCbox').is(':checked')) {
        enttype += "Statistics and Reports/";
    }

    enttype = enttype.substr(0,enttype.length-1);

    return enttype;
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : getEmailRecordOptions
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : February 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
var GlobalEmailRecOpts = [];
function getEmailRecordOptions(){
	var queryObj = {'QUERY':[{'table':'custom'}]};
	var queryStr = JSON.stringify(queryObj);
	$.ajax({ 
		url: getURL('ADMIN2','JSON')+"action=getRecOpts&query="+queryStr+"&version=3",
		dataType: 'html',
		success: function (data) {
			var mydata = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(mydata);
			var jresult = jsonData.RESULT[0].Result;
			GlobalEmailRecOpts = jresult;	
		}
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : sendMsgAdmin
 #  AUTHOR        : Krisfen G. Ducao
 #  DATE          : February 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function sendMsgAdmin(){
	$( "#AdminPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		title: "Send Message",
	});
	$( "#AdminPopUp" ).empty().load('pages/Admin/SendMsgPopUp.html',function(){
	setTimeout(function(){
		$(".ui-dialog").position({
		   my: "center",
		   at: "center",
			of: window
		});
		$("#recipientslist").hide();
		getEmailRecordOptions();
	},1000);
	});
}
/*
 #######################################################################
 #
 #  function name : getRecepientsSelected
 #  author        : krisfen g. ducao
 #  date          : february 27, 2014
 #  modified by   : 
 #  revision date :
 #  revision #    : 
 #  description   : 
 #  parameters    : 
 #
 #######################################################################
*/
function getRecepientsSelected(){
	select1 = document.getElementById("multiselectemailoption");
	selected1 = [];
	for (var i = 0; i < select1.length; i++) {
	    if (select1.options[i].selected){ 
			selected1.push(select1.options[i].value);
		}
	}
	return selected1
}

/*
 #######################################################################
 #
 #  function name : sendEmailMsg
 #  author        : krisfen g. ducao
 #  date          : february 27, 2014
 #  modified by   : 
 #  revision date :
 #  revision #    : 
 #  description   : 
 #  parameters    : 
 #
 #######################################################################
*/
$(document).on('click','#sendEmailMsg', function(){
	var msgtype = $('input:radio[name=EmailMsg]').filter(":checked").val();
	if(msgtype=="Custom Message"){
		var msg = $('#sendemailsubject').val();
	}else{
		var msg = $('input:radio[name=PredefMsg]').filter(":checked").val();
	}
	var subject = $("#emailsubject").val();
	var recepienttype = $("#dropdownRecipients").val();
	var recepients = getRecepientsSelected(); 
	var str = recepients.toString(); 
	var queryObj = {'MAINCONFIG':[{'data':[{'MessageType':msgtype,'Subject':subject,'Message':msg,'RecepientType':recepienttype,'Recepients':str}]}]};	
	var queryStr = JSON.stringify(queryObj);
	$.ajax({
		url: getURL('ADMIN2','JSON')+"action=sendglobalmessage&query="+queryStr+"&version=3",
		dataType: 'html',
		success: function (data) {
			var mydata = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(mydata)
			var jresult = jsonData.RESULT[0].Result;
			alerts(jresult,"adminPopUpClose();");
			
		}
	});	
	
});
/*
 #######################################################################
 #
 #  function name : adminPopUpClose
 #  author        : krisfen g. ducao
 #  date          : february 27, 2014
 #  modified by   : 
 #  revision date :
 #  revision #    : 
 #  description   : 
 #  parameters    : 
 #
 #######################################################################
*/

function adminPopUpClose(){
	if (globalDeviceType.toLowerCase() != "mobile")
		$( "#AdminPopUp" ).dialog("close");
}
/*
 #######################################################################
 #
 #  function name : deletelogsbutton
 #  author        : krisfen g. ducao
 #  date          : february 27, 2014
 #  modified by   : 
 #  revision date :
 #  revision #    : 
 #  description   : 
 #  parameters    : 
 #
 #######################################################################
*/
function deletelogsbutton(){
	if(globalSelectedAdminMain.length!=0){
		var msg = "Are you sure you want to DELETE the following logs(s)?"
		var val = "";
		for(var a=0;a<globalSelectedAdminMain.length;a++){
			$("#trLogs"+globalSelectedAdminMain[a]).each(function(){
				msg += "<br>"+($(this).text());
				val = $(this).text()
			})
		}
		alerts(msg,"deleteLogsUser('"+val+"');","yesno");
	}else{
		alerts("Please select date of logs. Thank you!");
		return 0; 
	}
}
/*
 #######################################################################
 #
 #  function name : showlogsbutton
 #  author        : krisfen g. ducao
 #  date          : february 27, 2014
 #  modified by   : 
 #  revision date :
 #  revision #    : 
 #  description   : 
 #  parameters    : 
 #
 #######################################################################
*/
var GlobalLogsAdminId = "";
function showLogsbutton(){
	if(globalSelectedAdminMain.length==1){
		var val =$("#trLogs"+globalSelectedAdminMain[0]).text();
	}else{
		alerts("Please select 1 date only. Thank you!");
		return 0;
	}	
	$( "#AdminPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: "auto",
		height: "auto",
		title: "Logs",
	});
	$( "#AdminPopUp" ).empty().load('pages/Admin/ShowLogsPopUp.html',function(){
	setTimeout(function(){
		$(".ui-dialog").position({
		   my: "center",
		   at: "center",
			of: window
		});
	},1000);
	GlobalLogsAdminId = val
	showAdminLogsInfo();
	});
}
/*
 #######################################################################
 #
 #  function name : deleteLogsUser
 #  author        : krisfen g. ducao
 #  date          : february 27, 2014
 #  modified by   : 
 #  revision date :
 #  revision #    : 
 #  description   : 
 #  parameters    : 
 #
 #######################################################################
*/
function deleteLogsUser(logs){
	$.ajax({
		url: getURL('ADMIN2','JSON')+"action=deleteLogs&query={'QUERY':[{'logs':'"+logs+"','ipAdd':'"+CURRENT_IP+"'}]}&version=3.0",
		dataType: 'html',
		success: function (data) {
			var mydata = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(mydata);
			var jresult = jsonData.RESULT[0].Result;
			alerts(jresult);
			if(jresult){
				alerts("Logs has been deleted. Thank you!")
				loadLogsTable();
			}	
		}		
	})
}
/*
 #######################################################################
 #
 #  function name : showAdminLogsInfo
 #  author        : krisfen g. ducao
 #  date          : february 27, 2014
 #  modified by   : 
 #  revision date :
 #  revision #    : 
 #  description   : 
 #  parameters    : 
 #
 #######################################################################
*/
function showAdminLogsInfo(){
	var dir = "../../../../../var/log/radius/"
	var str = "";
	var val = GlobalLogsAdminId;
	dir += val
	dir += ".txt"
	$.ajax({
		url: getURL('ADMIN2','JSON')+"action=adminLogs&query={'QUERY':[{'dir':'"+dir+"'}]}&version=3",
		dataType: 'html',
		success: function (data) {
			var mydata = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(mydata);
			var jresult = jsonData.RESULT[0].Result;
			var result = jresult.split("^");
			for(var a=0;a<result.length;a++){
				str += "\n"+result[a]
			}
			$("#showlogstextarea").empty().val(str);
		}		
	})
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : saveJSON
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 27, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : query for saving
 #  PARAMETERS    : qjson, exec
 #
 #######################################################################
*/
function saveJSON(qstr, exec, header) { 
	var url = getURL('ADMIN1','JSON')+qstr;
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data) {
            var mydata = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(mydata);
			var jresult = jsonData.RESULT[0].Result;
			if(/successful/i.test(jresult)){
				if(globalDeviceType == "Mobile"){
					error(jresult,header,"closeAccRi()");
				}else{
					alerts(jresult);
					$( "#AdminPopUp" ).dialog("close");
				}
			}else{
				if(globalDeviceType == "Mobile"){
					error('Error occured. Please try again later',header,"closeAccRi()");
				}else{
					alerts('Error occured. Please try again later');
					$( "#AdminPopUp" ).dialog("close");
				}
			}
			if (globalDeviceType != "Mobile"){
				eval(exec);
			}
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getpageLimit
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 3, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : increases the page limit of table/s
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function getpageLimit(){
//	pagelimit += 20;
	if (globalAdminPage == 'Users'){
		loadUserTable();
	}else if (globalAdminPage == 'AccRights'){
		loadAccRightsTable();
	}else if(globalAdminPage == 'AdminGroups'){
		loadGroupTable();
	}else if(globalAdminPage == 'Device'){
		loadManageDevice(1);
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadAccRiData
 #  AUTHOR        : Apple Kem  E. Eguia
 #  DATE          : MArch 04, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads access rights data in edit
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadAccRiData(){
	if (globalAdminFunc == 'edit'){
		getAccessRightInfo(globalSelectedAdminMain);	
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getAccRiData
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 6, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets access rights name, desc, action and entity type
 #  PARAMETERS    : id
 #
 #######################################################################
*/
function getAccRiData(id){
	var nameDesc = fetchFromDB(id,"AccessRights","AccessRightsName,Description,Action,EntityType");
	for (var x=0;x<nameDesc.length;x++){
		var cols = nameDesc[x].split(":")[0];
		var res = nameDesc[x].split(":")[1];
		if (cols == "AccessRightsName"){
			$('#SecPolName').val(res);
		}else if (cols == "Description"){
			$('#SecPolDesc').val(res);
		}else if (cols == "Action"){
			accRiAction = res.split("/");
		}else if (cols == "EntityType"){
			accRiEntity = res.split("/");
		}
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getAccessRightInfo
 #  AUTHOR        : 
 #  DATE          :  
 #  MODIFIED BY   : Apple Kem E. Eguia
 #  REVISION DATE : March 6, 2014
 #  REVISION #    : 2
 #  DESCRIPTION   : gets data for editing Access Rights
 #  PARAMETERS    : id
 #
 #######################################################################
*/
function getAccessRightInfo(id) {
		
	getAccRiData(id);
	if ($('#SecPolName').val() == "Default") {
		 $('#SecPolName').textinput('disable');
	}
//	var action = $('#trSecurityPolicy'+id).find('td').eq(2).text().split("/");
//	var entity = $('#trSecurityPolicy'+id).find('td').eq(3).text().split("/");

    for (var k = 0; k < accRiEntity.length; k++) {
	    switch(accRiEntity[k]) {
            case "Config Editor":
                setActions(accRiAction[k],'CE');
                $('#CEChoices').removeAttr('style');
				if (globalDeviceType == "Mobile"){
	                $('#CECbox').prop('checked',true).checkboxradio("refresh");
					$('#CEaddSecPolView').prop('checked',true).checkboxradio("refresh");
					$('#CEaddSecPolView').checkboxradio('disable').checkboxradio("refresh");
				}else {
				    $('#CECbox').prop('checked',true);
					$('#CEaddSecPolView').prop('checked',true);
					$('#CEaddSecPolView').attr('disabled',true);

				}
            break;
            case "Administration":

                setActions(accRiAction[k],'AD');
                $('#ADChoices').removeAttr('style');
				if (globalDeviceType == "Mobile"){ 
               		$('#ADCbox').prop('checked',true).checkboxradio("refresh");
					$('#ADaddSecPolView').prop('checked',true).checkboxradio("refresh");
					$('#ADaddSecPolView').checkboxradio('disable').checkboxradio("refresh");
				}else {
		    		$('#ADCbox').prop('checked',true);
					$('#ADaddSecPolView').prop('checked',true);
					$('#ADaddSecPolView').attr('disabled',true);
				}
            break;
            case "Resource Management":

                setActions(accRiAction[k],'RM');
                $('#RMChoices').removeAttr('style');
				if (globalDeviceType == "Mobile"){
        	        $('#RMCbox').prop('checked',true).checkboxradio("refresh");
					$('#RMaddSecPolView').prop('checked',true).checkboxradio("refresh");
					$('#RMaddSecPolView').checkboxradio('disable').checkboxradio("refresh");
				}else{
					$('#RMCbox').prop('checked',true);
					$('#RMaddSecPolView').prop('checked',true);
					$('#RMaddSecPolView').attr('disabled', true);
				}
            break;
            case "Port Matrix":
				if (globalDeviceType == "Mobile")
	                $('#PMCbox').prop('checked',true).checkboxradio("refresh");
				else 
	                $('#PMCbox').prop('checked',true);
	                setActions(accRiAction[k],'PM');
    	            $('#PMChoices').removeAttr('style');
            break;
            case "Power Management":
                setActions(accRiAction[k],'PM2');
                $('#PMChoices2').removeAttr('style');
				if (globalDeviceType == "Mobile"){
	                $('#PMCbox2').prop('checked',true).checkboxradio("refresh");
					$('#PM2addSecPolView').prop('checked',true).checkboxradio("refresh");
					$('#PM2addSecPolView').checkboxradio('disable').checkboxradio("refresh");
				}else {
    	            $('#PMCbox2').prop('checked',true);
					$('#PM2addSecPolView').prop('checked',true);
					$('#PM2addSecPolView').attr('disabled', true);
				}
            break;
            case "Statistics and Reports":
                setActions(accRiAction[k],'SR');
                $('#SRChoices').removeAttr('style');
				if( globalDeviceType =="Mobile"){
                	$('#SRCbox').prop('checked',true).checkboxradio("refresh");
					$('#SRaddSecPolView').prop('checked',true).checkboxradio("refresh");
					$('#SRaddSecPolView').checkboxradio('disable').checkboxradio("refresh");
				}else {
                	$('#SRCbox').prop('checked',true);
					$('#SRaddSecPolView').prop('checked',true);
					$('#SRaddSecPolView').attr('disabled',true);
				}
            break;
        }
    }

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : setActions
 #  AUTHOR        : 
 #  DATE          :  
 #  MODIFIED BY   : Apple Kem E. Eguia
 #  REVISION DATE : March 3, 2014
 #  REVISION #    : 1
 #  DESCRIPTION   : 
 #  PARAMETERS    : act,ent
 #
 #######################################################################
*/

function setActions(act,ent) {

    var action = act.split("-");

    for (var j = 0; j < action.length; j++) {
		if (globalDeviceType == "Mobile"){
        	switch (action[j]) {
        	    case "V": $('#'+ent+'addSecPolView').prop('checked',true).checkboxradio("refresh"); break;
        	    case "E": $('#'+ent+'addSecPolEdit').prop('checked',true).checkboxradio("refresh"); break;
        	    case "A": $('#'+ent+'addSecPolAdd').prop('checked',true).checkboxradio("refresh"); break;
        	    case "D": $('#'+ent+'addSecPolDel').prop('checked',true).checkboxradio("refresh"); break;
        	}
		}else{
			switch (action[j]) {
        	    case "V": $('#'+ent+'addSecPolView').prop('checked',true); break;
        	    case "E": $('#'+ent+'addSecPolEdit').prop('checked',true); break;
        	    case "A": $('#'+ent+'addSecPolAdd').prop('checked',true); break;
        	    case "D": $('#'+ent+'addSecPolDel').prop('checked',true); break;
        	}
		}
    }
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : deleteAccRi
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 4, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : deletes access rights
 #  PARAMETERS    : 
 #
 #######################################################################
*/
 function deleteAccRi(){
	var header= "Delete Access Rights";
	var msg = "";
	var currUser = checkUserStat(globalUserName);
	if (currUser == 'n'){
		var msgStr = "Unable to delete selected Access Right. Only an Administrator,";
		msgStr += " Manager and System Administrator can delete an Access Right.";
		alertUser(msg,header);
		return;
	}
	if (globalSelectedAdminMain.length == 0){
		alertUser("No Access Rights to edit!",header);
		return;
	}
	var accessrightsnames = new Array();
	
	for (var i = 0;i<globalSelectedAdminMain.length;i++){
		$(".trAccRights").each(function(){
			var arid = $(this).attr('accrigid');
			if (globalSelectedAdminMain[i] == arid){
				var accriname = $(this).find('td').eq(0).text();
				if ($.inArray(accriname,accessrightsnames) == -1){
					accessrightsnames.push(accriname);
				}
			}
		});
	}
	for (var x=0;x<accessrightsnames.length;x++){
		if (accessrightsnames[x] == "Default"){
			alertUser("Cannot delete the default access right.",header);
			return;
		}
	}
	msg = "<b>Are you sure you want to DELETE the following access right(s)?</b><br/><br/>";
	for (var c = 0; c < accessrightsnames.length; c++) {
		msg += accessrightsnames[c] + "<br/>";
	}
	if(globalDeviceType == "Mobile"){
		confirmation(msg,header,"deleteSecPol('"+header+"')");
	}else{
		alerts(msg,"deleteSecPol('"+header+"')","yesorno");
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getJSON
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 4, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : jsonData,table
 #
 #######################################################################

function getJSON(jsonData,table){
	var attribs = getTDAttrib(table);
	for (var a=0;a<jsonData.data[0].row.length;a++){
		var row = jsonData.data[0].row[a];
		if(globalDeviceType != "Mobile"){
			str += "<tr id='tr"+row.UserId+"'><td><input type='checkbox' class='trUser' uid='"+row.UserId+"'/></td>";
		}else{
			str += "<tr class='trUser' uid='"+row.UserId+"'>";
		}
		for (var b=0;b<attribs.length;b++){
			str += "<td>"+row.attribs[b]+"</td>";
		}
		str += "<td>"+row.FirstName+"</td>";
		str += "<td>"+row.UserName+"</td>";
		str += "<td>"+row.UserType+"</td>";
		str += "<td>"+row.ResourceProfile+"</td>";
		str += "<td>"+row.ActiveDomain+"</td>";
		str += "<td>"+row.AccessRight+"</td>";
		str += "<td>"+row.UserStatus+"</td>";
		str += "</tr>";
	}
	$('#usersAdmin-table > tbody').empty().append(str);
	if(globalDeviceType != "Mobile"){
	}else{
		$("#usersAdmin-table").table("refresh");
	}
}

function getTDAttrib(table){
	switch (table) {
		case  "User":
			var attribs = new Array("LastName","FirstName","UserName","UserType","ResourceProfile","Activedomain","AccessRight","UserStatus");
			return attribs;
		break;
	}
}
*/

/*
 #######################################################################
 #
 #  FUNCTION NAME : deleteSecPol
 #  AUTHOR        : 
 #  DATE          :  
 #  MODIFIED BY   : Apple Kem E. Eguia
 #  REVISION DATE : March 4, 2014
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function deleteSecPol(header){
	var invalidSelection = new Array();
    var invalidSelection2 = new Array();
    for(var a = 0; a < globalSelectedAdminMain.length; a++) {
        var canbedeleted = canDeletePolicy(globalSelectedAdminMain[a],"AccessRights");
        if (canbedeleted == 0) {
			$('.trAccRights').each(function(){
				var arid = $(this).attr('accrigid');
				if (globalSelectedAdminMain[a] == arid){
		            var selprof = $(this).find('td').eq(0).text()+" (ID: "+globalSelectedAdminMain[a]+")";
		            invalidSelection.push(selprof);
				}
			});
        } else if (canbedeleted == 2) {
			$('.trAccRights').each(function(){
				var arid = $(this).attr('accrigid');
				if (globalSelectedAdminMain[a] == arid){
            		var selprof = $(this).find('td').eq(0).text()+" (ID: "+globalSelectedAdminMain[a]+")";
		            invalidSelection2.push(selprof);
				}
			});
        }
    }

    if (invalidSelection.length > 0) {
        var prompt1 = "Unable to delete the following access right(s) listed below. There are accounts binded to the selected access right(s).<br/><br/>";
        for (var c=0; c < invalidSelection.length; c++){
            prompt1 += invalidSelection[c] + "<br/>";
        }
        if (invalidSelection2.length > 0) {
            prompt1 += "<br/>Unable to delete the following policy(ies) listed below. There are profile(s) binded to the selected policy(ies). Please unbind or delete the selected profile(s) to proceed.<br/><br/>";
            for (var c=0; c < invalidSelection2.length; c++){
                prompt1 += invalidSelection2[c] + "<br/>";
            }
        }
		alertUser(prompt1,header);
		return;
	}else if (invalidSelection2.length > 0) {
		var prompt1 = "Unable to delete the following policy(ies) listed below. There are profiles binded to the selected policy(ies). Please unbind or delete the selected profile(s) to proceed.<br/><br/>";
        for (var c=0; c < invalidSelection2.length; c++){
            prompt1 += invalidSelection2[c] + "<br/>";
        }
		alertUser(prompt1,header);
		return;

	}
	for(i=0;i<globalSelectedAdminMain.length;i++) {
		var queryObj = {'QUERY':[{'SpolId':globalSelectedAdminMain[i]}]};
		var queryStr = JSON.stringify(queryObj);
		if(i == (globalSelectedAdminMain.length-1)) {
			var todo = "alertUser('Delete Success!','"+header+"');";
			todo += "loadAccRightsTable();";
			deletes("action=DeleteSPol&query="+queryStr+"&version=3.0",todo);
		}else {
			deletes("action=DeleteSPol&query="+queryStr+"&version=3.0","");
		}
	}
}

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
function changeContactFormat(id){
	if(id=="addtxtCountry")	{
		var country = document.getElementById("addtxtCountry").value;
		var divName="addPhoneNoFormat";
		var divName2="addHomePhoneNoFormat";
	}else if (id=="edittxtCountry")	{
		var country = document.getElementById("edittxtCountry").value;
		var divName="editPhoneNoFormat";
	}
	if(country=='Philippines')	{
		$("#"+divName).empty();
		$("#"+divName2).empty();
		$("#"+divName2).append('+63-(xxx)-xxx-xxxx');
		$("#"+divName).append('+63-(xxx)-xxx-xxxx');
	}else if(country=='United States')	{
		$("#"+divName).empty();
		$("#"+divName2).empty();
		$("#"+divName2).append('+1-(xxx)-xxx-xxxx');
		$("#"+divName).append('+1-(xxx)-xxx-xxxx');
	}else if(country=='United Kingdom')	{
		$("#"+divName).empty();
		$("#"+divName2).empty();
		$("#"+divName2).append('+44-(xxx)-xxxx-xxxx');
		$("#"+divName).append('+44-(xxx)-xxxx-xxxx');
	}else if(country=='Singapore')	{
		$("#"+divName).empty();
		$("#"+divName2).empty();
		$("#"+divName2).append('+65-xxxx-xxxx');
		$("#"+divName).append('+65-xxxx-xxxx');
	}else if(country=='Russian Federation')	{
		$("#"+divName).empty();
		$("#"+divName2).empty();
		$("#"+divName2).append('+7-(xxx)-xxx-xxxx');
		$("#"+divName).append('+7-(xxx)-xxx-xxxx');
	}else if(country=='Japan')	{
		$("#"+divName).empty();
		$("#"+divName2).empty();
		$("#"+divName2).append('+81-(xxx)-xxxx-xxxx');
		$("#"+divName).append('+81-(xxx)-xxxx-xxxx');
	}else if(country=='China')	{
		$("#"+divName).empty();
		$("#"+divName2).empty();
		$("#"+divName2).append('+86-(xxx)-xxxx-xxxx');
		$("#"+divName).append('+86-(xxx)-xxxx-xxxx');
	}else if(country=='India')	{
		$("#"+divName).empty();
		$("#"+divName2).empty();
		$("#"+divName2).append('+91-(xxx)-xxxx-xxxx');
		$("#"+divName).append('+91-(xxx)-xxxx-xxxx');
	}

	$('#addtxtMobileNo').val('');
	$('#addtxtPhoneNo').val('');
	$('#addtxtHomePhoneNo').val('');
	$('#addtxtHomeAdd').val('');
	$('#spanaddtxtMobileNo').empty();
    $('#spanaddtxtPhoneNo').empty();
    $('#spanaddtxtHomePhoneNo').empty();

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateFirstName
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's first name
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateFirstName(id) {
	
	if ( $("#"+id).val() == "" || $("#"+id).val() == null ) {
		$("#span"+id).empty();
	} else {
		if (/^([\u00F1a-z ]*)\.?$/i.test($("#"+id).val())){
			$("#span"+id).empty();
			var str=$("#"+id).val().toLowerCase();
			$("#"+id).val(ucwords(str));
		} else {
			$("#span"+id).empty();
			$("#span"+id).append("Invalid format.");
			$("#"+id).focus();
		}
	}

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateHomeAdd
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's home address
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateHomeAdd(id) {

	if($("#"+id).val()=="" || $("#"+id).val()==null) {
		$("#span"+id).empty();
	} else if ( $("#"+id).val().length > 100) {
		$("#span"+id).empty();
		$("#span"+id).append("Invalid length. Maximum of 100 characters.");
		$("#"+id).focus();
	} else if($("#"+id).val().toLowerCase() == 'undefined'){
		$("#span"+id).empty();
		$("#span"+id).append("Invalid.");
		$("#"+id).focus();
	} else {
		$("#span"+id).empty();
		var str=$("#"+id).val();
		$("#"+id).val(ucwords(str));		
 	  }
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateLastName
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's last name
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateLastName(id) {

	if($("#"+id).val()=="" || $("#"+id).val()==null) {
		$("#span"+id).empty();
	} else {
		if (/^([\u00F1a-z ]*)\.?$/i.test($("#"+id).val())){
			$("#span"+id).empty();
			var str=$("#"+id).val().toLowerCase();
			$("#"+id).val(ucwords(str));
		} else{
			$("#span"+id).empty();
			$("#span"+id).append("Invalid format.");
			$("#"+id).focus();
		  }
	  }
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateMiddleName
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's middle name
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateMiddleName(id) {

	if($("#"+id).val()=="" || $("#"+id).val()==null) {
		$("#span"+id).empty();
	} else if($("#"+id).val().toLowerCase() == 'undefined'){
		$("#span"+id).empty();
		$("#span"+id).append("Invalid.");
		$("#"+id).focus();
	} else {
		if (/^([\u00F1a-z ]*)\.?$/i.test($("#"+id).val())){
			$("#span"+id).empty();
			var str=$("#"+id).val().toLowerCase();
			$("#"+id).val(ucwords(str));
		} else{
			$("#span"+id).empty();
			$("#span"+id).append("Invalid format.");
			$("#"+id).focus();
		  }
	 }
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateEmail
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's email address
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateEmail(id) {

	if($("#"+id).val()=="" || $("#"+id).val()==null) {
		$("#span"+id).empty();
	} else {
		if (/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|co|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test($("#"+id).val())){
			$("#span"+id).empty();
		} else{
			$("#span"+id).empty();
			$("#span"+id).append("Invalid format.");
			$("#"+id).focus();
			
		  }
	  }
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateUserInfo
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's info
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateUserInfo() {

	if ($("#addtxtFirstName").val()=="" || $("#addtxtFirstName").val()==null) {
		alerts("Please enter your first name.");
		$("#addtxtFirstName").focus();
		return(false);
	} else if ($("#addtxtLastName").val()=="" || $("#addtxtLastName").val()==null) {  
		alerts("Please enter your last name.");
		$("#addtxtLastName").focus();
		return(false);
	} else if ($("#addtxtEmail").val()=="" || $("#addtxtEmail").val()==null) {
		alerts("Please enter your email address.");
		$("#addtxtEmail").focus();
		return(false);
  	} else if (echeck($("#addtxtEmail").val())== false) {	
		alerts("Invalid Email format");
		//document.form1.txtEmail.focus(); //edited by fcluciano 09262011
		$("#addtxtEmail").focus();
		return(false);
	} else if ($("#addtxtUserName").val().length < 3) {
		alertUser("Please provide a username with at least 3 characters.");
		$("#addtxtUserName").focus();
		return(false);
	} else if ($("#addtxtUserName").hasClass("highlighterror")) {
		alertUser("Username already exist");
		return(false);
	} else if ($('#addtxtPassword').val() == "" && $('#addtxtRePassword').val() == "") {
		alertUser("Please provide password and re-enter password afterwards.");
		return(false);
	} else if ($('#addtxtPassword').val() == "") {
		alertUser("Please provide password");
		return(false);
	} else if ($('#addtxtRePassword').val() == "") {
			alertUser("Please re-enter password.");
		return(false);
	} else if ($('#addtxtPassword').val() != $('#addtxtRePassword').val()) {
		alertUser("The passwords you entered do not match. Please try again.");
		$('#passwordStrength').removeClass("highlight");
		$('#passwordStrength').removeClass("highlight2");
		$('#passwordStrength').removeClass("highlighterror");
		$('#passwordStrength').empty();						
		$('#addtxtPassword').val('');
		$('#addtxtRePassword').val('');
		return;
	}else{
		var validate = validatePasswordFormat($('#addtxtPassword').val());
		if (validate == "less") {
			alertUser("Please enter password with min. of 6 characters.");
			$('#passwordStrength').removeClass("highlight");
			$('#passwordStrength').removeClass("highlight2");
			$('#passwordStrength').removeClass("highlighterror");
			$('#passwordStrength').empty();						
			$('#addtxtPassword').val('');
			$('#addtxtRePassword').val('');
			return(false);
		} else if (validate == false) {
			$('#passwordStrength').removeClass("highlight");
			$('#passwordStrength').removeClass("highlight2");
			$('#passwordStrength').removeClass("highlighterror");
			$('#passwordStrength').empty();						
			$('#addtxtPassword').val('');
			$('#addtxtRePassword').val('');
			return;
		} else {
			return(true);
		}
	}

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : echeck
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's first name
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function echeck(str) {

	var at="@"
    var dot="."
    var lat=str.indexOf(at)
    var lstr=str.length
    var ldot=str.indexOf(dot)

    if (str.indexOf(at)==-1){
    	alertUser("Please enter a valid email address")
        return(false);
    }

    if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
	    alertUser("Please enter a valid email address")
        return(false);
    }

    if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr-1){
    	alertUser("Please enter a valid email address")
        return(false);
    }

    if (str.indexOf(at,(lat+1))!=-1){
    	alertUser("Please enter a valid email address")
        return(false);
    }

    if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
    	alertUser("Please enter a valid email address")
        return(false);
    }

    if (str.indexOf(dot,(lat+2))==-1){
        alertUser("Please enter a valid email address")
        return(false);
    }

    if (str.indexOf(" ")!=-1){
    	alertUser("Please enter a valid email address")
        return(false);
    }

    return(true);
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateEmployeeInfo
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's employee info
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateEmployeeInfo() {

	if ($("#addtxtEmployNo").val()=="" || $("#addtxtEmployNo").val()==null) {
		alerts("Please enter your employee number.");
		$("#addtxtEmployNo").focus();
		return(false);
	} else if ($("#addtxtOfficeAdd").val()=="" || $("#addtxtOfficeAdd").val()==null) {  
		alerts("Please enter your office address.");
		$("#addtxtOfficeAdd").focus();
		return(false);
	  } else if ($("#addtxtDivision").val()=="" || $("#addtxtDivision").val()==null) {
			alerts("Please enter your division.");
			$("#addtxtDivision").focus();
			return(false);
		} else if ($("#directreportselect2").val()=="" || $("#directreportselect2").val()==null) {
			alerts("Please select your direct report.");
			$("#directreportselect2").focus();
			return(false);
		  }	else
				return(true);

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateAccountInfo
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's account info
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateAccountInfo() {

	if ($("#addtxtUserName").val()=="" || $("#addtxtUserName").val()==null) {
		alerts("Please enter your username.");
		$("#addtxtUserName").focus();
		return(false);
	} else if ($("#addtxtPassword").val()=="" || $("#addtxtPassword").val()==null) {
		alerts("Please enter your password.");
		$("#addtxtPassword").focus();
		return(false);
	  } else if ($("#addtxtRePassword").val()=="" || $("#addtxtRePassword").val()==null) {
			alerts("Please retype your password.");
			$("#addtxtRePassword").focus();
			return(false);
		} else if (verifyPassword($("#addtxtPassword").val(),$("#addtxtRePassword").val())==false) {
			return (false);
		  }	else
				return(true);
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : verifyPassword
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's password
 #  PARAMETERS    : password, re-entered password
 #
 #######################################################################
*/

function verifyPassword(password1,password2) {

	if (password1!=password2) {
		alerts("The passwords you entered do not matched. Please try again.");
		return (false);
	} else if(password1.length<6 || password2.length<6 ) {
		alerts("Password should have a minimum of 6 characters");
		return(false);
	  }	else
 			return (true);

} 

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateMobileNo
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's mobile number
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateMobileNo(id) {
	
	if($("#"+id).val()=="" || $("#"+id).val()==null) {
		if(id=='addtxtMobileNo') {
			$("#spanaddtxtMobileNo").empty();
		} else if(id=='edittxtMobileNo') { //edited by fcluciano 09262011
			$("#spantxtMobileNo").empty();
		  }
	} else {
		formatUserContact(id);
		if (id=='addtxtMobileNo') {
			if (checkContactInfo($("#"+id).val(),'addmobile')==true){
				$("#spanaddtxtMobileNo").empty();
			
			} else{
				$("#spanaddtxtMobileNo").empty();
				$("#spanaddtxtMobileNo").append("Invalid format.");
			  }
		} else if(id=='edittxtMobileNo') {
			if (checkContactInfo($("#"+id).val(),'editmobile')==true){
				$("#spantxtMobileNo").empty();	
			
			} else{
				$("#spantxtMobileNo").empty();
				$("#spantxtMobileNo").append("Invalid format.");
			  }
		  }
	  }

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateHomePhone
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's home phone number
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateHomePhoneNo(id) {

	if($("#"+id).val()=="" || $("#"+id).val()==null) {
		if(id=='addtxtHomePhoneNo') {
			$("#spanaddtxtHomePhoneNo").empty();
		} else if(id=='edittxtHomePhoneNo') {
			$("#spantxtHomePhoneNo").empty();
		  }
	} else {
		formatUserContact(id);
		if(id=='addtxtHomePhoneNo') {
			if (checkContactInfo($("#"+id).val(),'addphone2')==true){
				$("#span"+id).empty();
			
			} else{
				$("#span"+id).empty();
				$("#span"+id).append("Invalid format.");
				$("#"+id).focus();
				var numberval = $("#"+id).val();
				if(numberval == ""){
					$("#span"+id).empty();
				}
			  }
		} else if(id=='edittxtHomePhoneNo')	{
			if (checkContactInfo($("#"+id).val(),'editphone')==true){
				$("#span"+id).empty();		
			
			} else {
				$("#span"+id).empty();
				$("#span"+id).append("Invalid format.");
				var numberval = $("#"+id).val();
				if(numberval == ""){
					$("#span"+id).empty();
				}
			  }
		  }
	  } 

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validatePhoneNo
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's phone number
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validatePhoneNo(id){
	
	if($("#"+id).val()=="" || $("#"+id).val()==null) {
		if(id=='addtxtPhoneNo') {
			$("#spanaddtxtPhoneNo").empty();
		} else if(id=='edittxtPhoneNo')	{
			$("#spantxtPhoneNo").empty();
		  }
	} else {
		formatUserContact(id);
		if(id=='addtxtPhoneNo') {
			if (checkContactInfo($("#"+id).val(),'addphone')==true) {
				$("#span"+id).empty();	
			
			} else {
				$("#span"+id).empty();
				$("#span"+id).append("Invalid format.");
				var numberval = $("#"+id).val();
				if(numberval == ""){
					$("#span"+id).empty();
				}
			  }
		} else if(id=='edittxtPhoneNo') {
			if (checkContactInfo($("#"+id).val(),'editphone')==true){
				$("#span"+id).empty();	
				
			} else {
				$("#span"+id).empty();
				$("#span"+id).append("Invalid format.");
				var numberval = $("#"+id).val();
				if(numberval == ""){
					$("#span"+id).empty();
				}
			}
		  }
	  } 

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkContactInfo
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's contact info
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function checkContactInfo(str, category) {

	if(category=='addphone' || category=='addphone2' || category=='addhomephone')
		var country = document.getElementById("addtxtCountry").value;
	else if(category=='editphone')
		var country = document.getElementById("edittxtCountry").value;

	switch (category) {
		case 'addphone': case 'addphone2': case 'editphone': case 'addhomephone':
			switch (country) {
				case 'Philippines':
					if (/^(\+63\-\(\d\d\d\)\-\d\d\d\-\d\d\d\d)$/i.test(str)==true) {
						return true;
					} else {
						return false;
				  	  }
			    break;
				case 'United States':
					if (/^(\+1\-\(\d\d\d\)\-\d\d\d\-\d\d\d\d)$/i.test(str)==true) {
						return true;
					} else {
						return false;
					  }
				break;
				case 'United Kingdom':
					if (/^(\+44\-\(\d\d\d\)\-\d\d\d\d-\d\d\d\d)$/i.test(str)==true) {
						return true;
					} else {
						return false;
					  }
				break;
				case 'Singapore':
					if (/^(\+65\-\d\d\d\d-\d\d\d\d)$/i.test(str)==true) {
						return true;
					} else {
						return false;
				      }
				break;
				case 'Russian Federation':
					if (/^(\+7\-\(\d\d\d\)\-\d\d\d-\d\d\d\d)$/i.test(str)==true) {
						return true;
					} else {
						return false;
					  }
				break;
				case 'Japan':
					if (/^(\+81\-\(\d\d\d\)\-\d\d\d\d-\d\d\d\d)$/i.test(str)==true) {
						return true;
					} else {
						return false;
				      }
				break;	
				case 'China':
					if (/^(\+86\-\(\d\d\d\)\-\d\d\d\d-\d\d\d\d)$/i.test(str)==true) {
						return true;
					} else {
						return false;
					  }
				break;
				case 'India':
					if (/^(\+91\-\(\d\d\d\)\-\d\d\d\d-\d\d\d\d)$/i.test(str)==true) {
						return true;
					} else {
						return false;
					  }
				break;
			}
		break;
		case 'addmobile': case 'editmobile':
			if(/^(\+\d\d\-\d\d\d\-\d\d\d\-\d\d\d\d)\.?$/i.test(str)==true) {
				return true;
			} else {
				return false;
			  }
		break;
	}

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateEmployNo
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's employee number
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateEmployNo(id) {
	
	if($("#"+id).val()=="" || $("#"+id).val()==null) {
		$("#span"+id).empty();
	} else {
		$("#span"+id).empty();
		var str=$("#"+id).val().toLowerCase();
		$("#"+id).val(ucwords(str));
	  }
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateOfficeAdd
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's office address
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateOfficeAdd(id) {
	
	if ($("#"+id).val()=="" || $("#"+id).val()==null) {
		$("#span"+id).empty();
	} else {
		$("#span"+id).empty();
		var str=$("#"+id).val();
		$("#"+id).val(ucwords(str));
	  }

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateDivision
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's division
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateDivision(id){
	
	if($("#"+id).val()=="" || $("#"+id).val()==null) {
		$("#span"+id).empty();
	}else if ($("#"+id).val().toLowerCase() == 'undefined'){
		$("#span"+id).empty();
		$("#span"+id).val("Invalid.");
	} else {
		$("#span"+id).empty();
		var str=$("#"+id).val();
		$("#"+id).val(ucwords(str));
	  }

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateDirectReport
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate user's direct report
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateDirectReport(id) {
	
	if ($("#"+id).val()=="" || $("#"+id).val()==null) 	{
		$("#span"+id).empty();
	} else {
		$("#span"+id).empty();
		var str=$("#"+id).val();
		$("#"+id).val(ucwords(str));
	  }

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkCorrectFormat
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : validate format for user's input
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function checkCorrectFormat() {

	var formatArr = new Array("FirstName","LastName","MiddleName","PhoneNo","MobileNo","Email","UserName","HomePhoneNo");
	var correctFormat = new Array("First Name","Last Name","Middle Name","Business Phone Number","Mobile Number","Email Address","User Name","Home Phone Number");
	var incorrectFormat = new Array();
	var errString = "";
	for (var t=0; t < formatArr.length; t++) {
		switch (t) {
			case 0: case 2:   
				if ((t == 2 && $("#addtxt"+formatArr[t]).val() != "") || t==0) { 
					var str = ucwords($("#addtxt"+formatArr[t]).val().toLowerCase());
					if (str.length > 1) {
						if (/^[\u00F1A-Z][\u00F1a-z|\s]+$/i.test(str) == false){
							incorrectFormat.push(correctFormat[t]);
						}
					} else {
						str = $.trim(str);
						if (/^[A-Z]$/i.test(str) == false){
							incorrectFormat.push(correctFormat[t]);
						}
					  }
				}
			break;
			case 1:    
				var str = ucwords($("#addtxt"+formatArr[t]).val().toLowerCase());
				if (str.length > 1) {
					if (/^[\u00F1A-Z][\u00F1a-z|\s|\.]+$/i.test(str) == false){
						incorrectFormat.push(correctFormat[t]);
					}
				} else {
					str = $.trim(str);
					if (/^[A-Z]$/i.test(str) == false){
						incorrectFormat.push(correctFormat[t]);
					}
				  }
			break;
			case 3: case 4: case 7:
				if (t == 3) {
					cat = 'addphone';
				} else if (t == 7) {
					cat = 'addhomephone';
				} else {
					cat = 'addmobile';
				}
				if ( $("#addtxt"+formatArr[t]).val() != "" && $("#addtxt"+formatArr[t]).val() != undefined ) {
					if (checkContactInfo($("#addtxt"+formatArr[t]).val(),cat) == false) {
						incorrectFormat.push(correctFormat[t]);
					}
				}
			break;
			case 5:
				if ( /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|co|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test($("#addtxt"+formatArr[t]).val()) == false && $("#addtxt"+formatArr[t]).val() != "" && $("#addtxt"+formatArr[t]).val() != undefined ) {
					incorrectFormat.push(correctFormat[t]);
				}
			break;
			case 6:
				var username = $("#addtxt"+formatArr[t]).val();
				var validusername = true;
				for(var ctr=0;ctr<username.length;ctr++) {
		            if ((/^([a-z])\.?$/i.test(username[ctr]))==false && (/^([0-9])\.?$/i.test(username[ctr]))==false){
        	        	validusername=false;
            		}
        		}
				if (validusername == false) {
					incorrectFormat.push(correctFormat[t]);
				}
			break;
		}
	}
	if (incorrectFormat.length > 0) {
		var errString = "Please correct format(s) for ";
		switch (incorrectFormat.length) {
			case 1:
				errString += incorrectFormat[0];
			break;
			case 2:
				errString += incorrectFormat[0] + " and " + incorrectFormat[1];
			break;
			default:
				for (var c = 0; c < incorrectFormat.length; c++) {
					if (c == incorrectFormat.length - 1) {
						errString += " and " + incorrectFormat[c];
					} else if (c == incorrectFormat.length - 2) {
						errString += incorrectFormat[c];
					  } else {
							errString += incorrectFormat[c] + ", ";
					    }
				}
			break;
		}	
	}
	
	return errString;

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validatePasswordFormat
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : checks strength for password
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validatePasswordFormat(str,flag){

	if(str.length<6 && flag == undefined) {
		//alerts("Please enter password with min. of 6 character.");
		$('#addtxtPassword').val('');
		$('#addtxtRePassword').val('');		
		$('#addtxtPassword2').val('');
		$('#addtxtRePassword2').val('');		
		return "less";
	} else if (flag == ""){
		if (str == "") {
			$('#passwordStrength').removeClass("highlight");
		    $('#passwordStrength').removeClass("highlight2");
		    $('#passwordStrength').removeClass("highlighterror");
		    $('#passwordStrength').empty();
			return;
		}
		var strength = checkPassStrength(str);
		switch (strength) {
			case "strong":
				$("#passwordStrength").removeClass("highlight");
				$("#passwordStrength").removeClass("highlighterror");
				$("#passwordStrength").addClass("highlight2").empty().append("&nbsp;&nbsp;&nbsp;&nbsp;STRONG&nbsp;&nbsp;&nbsp;&nbsp;");
			break;
			case "good":
				$("#passwordStrength").removeClass("highlight2");
				$("#passwordStrength").removeClass("highlighterror");
				$("#passwordStrength").addClass("highlight").empty().append("&nbsp;&nbsp;&nbsp;&nbsp;GOOD&nbsp;&nbsp;&nbsp;&nbsp;");
			break;
			case "weak":
				$("#passwordStrength").removeClass("highlight2");
				$("#passwordStrength").removeClass("highlight");
				$("#passwordStrength").addClass("highlighterror").empty().append("&nbsp;&nbsp;&nbsp;&nbsp;WEAK&nbsp;&nbsp;&nbsp;&nbsp;");
			break;
		}	
	  }
	
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : comparePasswords
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : compare password and re-entered password
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function comparePasswords() {

	var pass = $('#addtxtPassword').val();
	var repass = $('#addtxtRePassword').val();

	if ( pass != "" && repass != "" ) {
		if ( pass != repass ) {
			$('#logAlert').dialog('open').empty().append("<font size=1px><b>Passwords do not match.</b></font>");
			setTimeout("resetPasswords();", 1000);
		}
	}

	return;

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : resetPasswords
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 09, 2013
 #  REVISION #    : 2
 #  DESCRIPTION   : empties password textboxes
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function resetPasswords() {
	$('#logAlert').dialog('close');
	$('#passwordStrength').removeClass("highlight");
	$('#passwordStrength').removeClass("highlight2");
	$('#passwordStrength').removeClass("highlighterror");
	$('#passwordStrength').empty();
	$('#addtxtPassword').val('');
	$('#addtxtRePassword').val('');
	$('#addtxtPassword').focus();
}

function canDeletePolicy(id,state) {
    var selId;
	var urlx = getURL('ADMIN3','JSON');
	var queryObj = {'QUERY':[{'state':state,'id':id}]};
	var queryStr = JSON.stringify(queryObj);
    $.ajax({
        url: urlx+"action=checkrspolstat&query="+queryStr+"&version=3.0",
        dataType: "text/xml",
        async:false,
        success: function(data) {
            //selId = $.trim(data);
            selId = data.replace(/'/g,'"');
        }
    });
    return selId;
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : saveAddUser
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 4, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : save user account created
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function saveAddEditUser(){
	var error = validateUserInfo();
	if (!error){
		return;
	}
	var qstr1 = checkUserInformation();
	var qstr2 = checkEmployeeInfo();
	var qstr3 = checkAccountInfo();

	if (qstr1 == "" || qstr2 == "" || qstr3 == "") {

		alertUser("Please fill in all required information on the User Data tab.");
		return;
		}
	
	var err = checkCorrectFormat();
	if (err != "") {
		alertUser(err);
		return;
	}
		
	var domPriv = "";
	if ($('#domPriviledge').is(':checked') == true){
		domPriv = $('#domPriviledge').val();
	} else {
		domPriv = "disabled";
	}
	var SecPolId = new Array();
//	res=false;
	if (globalUserDomainIds.length == 0 && globalUserPolicy2Ids == undefined) {
		alertUser("Please select 1 Resource Domain and 1 Access Right");
		return;
	} else if (globalUserDomainIds.length == 0) {
		alertUser("Please select at least 1 Resource Domain");
		return;
		}
/*	if (globalAccActiveStatus.length == 0 || globalAccActiveStatus.length > 1) {
		alertUser("Please set only one status of Access Right to 'Active'");
		return;
	}
	if (globalDomActiveStatus == [] || globalDomActiveStatus.length == 0 || globalDomActiveStatus.length > 1) {
		alertUser("Please set only one status of Domain to 'Active'");
		return;
	}*/
	var idContainer1 = "";
	var idContainer2 = "";

	if(globalUserPolicy2Ids.length>1) {
	
		alertUser("You have exceeded the number of access rights allowed. You must not exceed over 1 per account.");
		return
	
	} else {
//		var cor2 = validateReservation("User");
		var cor2 = 1;				
		if (cor2 == 1) {	
			//RESERVATION
			var resnum ="";
			var actres ="";
			var devnum ="";
			var resdur ="";
			var minres ="";
			var minext ="";
			var maxext ="";
			var emt = "";
			var di = "0";
			var notrequired  = new Array('maxResNum','maxActRes','maxDevNum','durMM','durDD','maxExtNum','emailNot');
			for (var i=0;i<notrequired.length;i++){
				if ($('#'+notrequired[i]).val() == undefined || $('#'+notrequired[i]).val() == null){
					$('#'+notrequired[i]).val('');			
				}
			}
			if ($('#maxResNumCB').is(':checked') == true) {
				resnum = $('#maxResNum').val()+"::1";
			}else{
				resnum = $('#maxResNum').val()+"::0";
			}
			if ($('#maxActResCB').is(':checked') == true) {
				actres = $('#maxActRes').val()+"::1";
			}else{
				actres = $('#maxActRes').val()+"::0";
			}
			if ($('#maxDevNumCB').is(':checked') == true) {
				devnum = $('#maxDevNum').val()+"::1";
			}else{
				devnum = $('#maxDevNum').val()+"::0";
			}
			if ($('#maxResDurCB').is(':checked') == true) {
				if ($('#UserReservationTimeInfo').val() == "Limited") {
					var month;
					var day;
					//MONTH
					if ($('#durMM').val() == "") {
						month = "00";
					} else if ($('#durMM').val() < 10 && $('#durMM').val().length == 1) {
						month = "0"+$('#durMM').val();
					  } else {
							var newmonth = $('#durMM').val();
							month = "";
							//remove leading zeroes
							if (newmonth != "00") {
								for (l=0; l < newmonth.length; l++) {
									if (newmonth[l] != 0) {
						                for (j=l; j < newmonth.length; j++) {
    	            							        month += newmonth[j];
		                	            }
               	    							    break;
		                        	}
		                    	}
							} else {
								month = newmonth;
							  }

							if (month == "") {
								month = "00";
							} else if (month < 10 && month.length == 1) {
								month = "0"+month ;
					  		  }
					    }
		
					//DAY	
					if ($('#durDD').val() == "") {
						day = "00";
					} else if ($('#durDD').val() < 10 && $('#durDD').val().length == 1) {
						day = "0"+$('#durDD').val();
					  } else {
							var newday = $('#durDD').val();
							day = "";
							//remove leading zeroes
							if (newday != "00") {
								for (l=0; l < newday.length; l++) {
									if (newday[l] != 0) {
						                for (j=l; j < newday.length; j++) {
    	           					        day += newday[j];
		                	            }
               	   					    break;
		                        	}
		                    	}
							} else {
								day = newday;
							}
							if (day == "") {
								day = "00";
							} else if (day < 10 && day.length == 1) {
								day = "0"+day;
					  		}
					   }
					resdur = month+":"+day+":"+$('#durH').val()+":"+$('#durM').val()+"::1";
				} else {
					resdur = "00:00:00:00::0";
				  }
			}
			if ($('#maxExtNumCB').is(':checked') == true) {
				maxext = $('#maxExtNum').val()+"::1";
			}else{
				maxext = $('#maxExtNum').val()+"::0";
			}
			if ($('#emailNotCB').is(':checked') == true) {
				emt = $('#emailNot').val();
			}
			if ($('#disableIterationCB').is(':checked') == true) {
				di = 1;
			}
			idContainer1 = idContainer1+globalUserDomainIds;
			resDomEmail = idContainer1;
			idContainer2 = idContainer2+globalUserPolicyIds;
			if(idContainer1 != 1){
				var lclgrpid = new Array();
				lclgrpid.push('1');
			}else{
				var lclgrpid = new Array();
				lclgrpid.push('');
			}
			var zoneArr = new Array();
//	zoneArr = getZoneArray(zoneArr,true);
			var groupArr = new Array();
//	groupArr = getGroupArray(groupArr,true);
//			var zoneStr = zoneArr.join(",");
//			var groupStr = groupArr.join(",");
			var act = "";
			var qstr = "action="+globalAdminFunc+"User&query={'QUERY':[{"+qstr1+qstr2+qstr3+",'ResourceProfileId':'"+idContainer1+"','SecurityProfileId':'"+globalUserPolicy2Ids;
			qstr += "','SecurityProfileIdActive':'"+globalAccActiveStatus;
			qstr += "','SecurityProfileIdInactive':'globalAccInActiveStatus";
			qstr += "','Zone':'"+zoneArr+"','GroupId':'"+groupArr;
			qstr += "','MaxReservationPerUser':'"+resnum;
			qstr += "','MaxActiveReservationPerUser':'"+actres;
			qstr += "','MaxNumberOfDevicesPerReservation':'"+devnum;
			qstr += "','MaxNumberOfReservationTime':'"+resdur;
			qstr += "','MaxAllowedExtension':'"+maxext;
			qstr += "','Affiliation':'";
			qstr += "','Notification':'"+emt;
			qstr += "','UserStatus':'Active";
			qstr += "','DisableIteration':'"+di;
			qstr += "','DomainPriviledge':'"+domPriv;
			if (globalAdminFunc == 'edit'){
				qstr += "','UserId':'"+globalSelectedAdminMain;
			}
			qstr += "','ActiveDomain':'"+globalDomActiveStatus+"'}]}&version=3.0";
			var uname = $('#addtxtUserName').val();
//			addingModal = true;
//			globalUserGroupInfoArr = [];
//			globalUserInfoArr = [];
//			flagHandler = 1;
			addUserPy(qstr, /*updateUserDomainZoneInfo('add','"+idContainer1+"','"+globalUserDomainIds+"','"+lclgrpid+"','"+uname+"');loadAuthenticationTable(1);createFtpUser();*/"loadUserTable(1);$('#AdminPopUp').empty().dialog('close');");
			//add(qstr, "loadUserTable(1);loadAuthenticationTable(1);createFtpUser();");
			/*var uname = document.getElementsByName("addtxtUserName");
			var qstr2 = "action=radpol&UserName="+uname[0].value+"&RprofId="+idContainer1 +"&SprofId="+idContainer2;
			add2(qstr2, "$('#addUserPopUp').dialog('close');$('#addUserPopUp').empty();"");*/
//			logCheck(globalUser,"Administration","Added a User");
		} else {
			alertUser(cor2);
//			$('#msg').css('height','auto');
			return;
		  }
	}
/*	initAdminSort('');	
	globalLoad = "rmUserStat";
	globalAdminLoad = "User";
	globalSelectedArray = [];
	globalSelectedArray2 = [];
	globalSelectedArray4 = [];
	globalSelectedArray6 = [];
	globalSelectedArray7 = [];
	globalSelectedArray8 = [];
	globalSelectedArray9 = [];
	globalGroupDomainArray = [];
	globalSelectedUserDomainArray = [];
	globalSelAccRiActive = [];
	globalSelectedAccessRight = [];
	globalSelAccRiInactive = [];
	globalGroupId = [];
	tempActiveDom = [];
	activeDom = "";
	domStatFlag = false;		*/
	
}

function checkPolicies(header){
	
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateUser
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 4, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : validates user input data
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function validateUser(){
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkUserInformation
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 1, 2013
 #  REVISION #    : 1
 #  DESCRIPTION   : checks user inputs in Adding A User
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function checkUserInformation(){

	var notrequired  = new Array('addtxtMiddleName','addtxtPhoneNo','addtxtHomePhoneNo','addtxtMobileNo','addtxtHomeAdd');
	for (var i=0;i<notrequired.length;i++){
		if ($('#'+notrequired[i]).val() == undefined || $('#'+notrequired[i]).val() == null || $('#'+notrequired[i]).val() == "undefined"){
				$('#'+notrequired[i]).val('');			
		}
	}
	var fname = $("#addtxtFirstName").val();
	var lname = $("#addtxtLastName").val();
	var mname = $("#addtxtMiddleName").val();
	var bno = $("#addtxtPhoneNo").val();
	var hno = $("#addtxtHomePhoneNo").val();
	var cno = $("#addtxtMobileNo").val();
	var hadd = $("#addtxtHomeAdd").val();
	var country = $("#addtxtCountry").val();
	var email = $("#addtxtEmail").val();
	
	
	if ( fname == "" || lname == "" || email == "") {
		var qstr = "";
	} else {
		var qstr = "'FirstName':'"+fname+"','LastName':'"+lname+"','MiddleName':'"+mname+"','BusinessPhoneNumber':'"+bno+"','HomePhoneNumber':'"+hno+"','CellPhoneNumber':'"+cno+"','HomeAddress':'"+hadd+"','Country':'"+country+"','Email':'"+email;
	}

	return qstr;

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkEmployeeInfo
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 1, 2013
 #  REVISION #    : 1
 #  DESCRIPTION   : checks user inputs in Employee Part of adding a user
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function checkEmployeeInfo() {

	var notrequired  = new Array('addtxtEmployNo','addtxtOfficeAdd','addtxtDivision');
	for (var i=0;i<notrequired.length;i++){
		if ($('#'+notrequired[i]).val() == undefined || $('#'+notrequired[i]).val() == null || $('#'+notrequired[i]).val() == "undefined"){
				$('#'+notrequired[i]).val('');			
		}
	}
	var comp = $("#addtxtCompany").val();
	var empno = $("#addtxtEmployNo").val();
	var offadd = $("#addtxtOfficeAdd").val();
	var div = $("#addtxtDivision").val();
	var dir = "";

	if ($('#directreportselect2').attr('disabled') == false) {
		dir = $("#directreportselect2").val();
	}

	var qstr = "','Company':'"+comp+"','EmployeeNumber':'"+empno+"','OfficeAddress':'"+offadd+"','Division':'"+div+"','DirectReport':'"+dir;

	return qstr;

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkAccountInfo
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 1, 2013
 #  REVISION #    : 1
 #  DESCRIPTION   : checks user inputs in Account Part of adding a user
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function checkAccountInfo() {

	var uname = $("#addtxtUserName").val();
	var ulevel = $("#addtxtUserLevel").val();
	var pass = $("#addtxtPassword").val();
	var repass = $("#addtxtRePassword").val();
	var md5 = $.md5(repass);

	if (uname == "" || ulevel == undefined || md5 == "") {
		var qstr = "";
	} else {
		var qstr = "','UserName':'"+uname+"','UserType':'"+ulevel+"','UserLevel':'"+ulevel+"','Password':'"+md5+"'";
	}

	return qstr;

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateUserName
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 1, 2013
 #  REVISION #    : 1
 #  DESCRIPTION   : validate user's username input
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateUserName(id) { 

	if($("#"+id).val()=="" || $("#"+id).val()==null) {
		$("#addUsernamediv").empty();		
		$('#addtxtUserName').removeClass('highlighterror');
	} else if ($("#"+id).val().length < 3) {
		$("#addUsernamediv").empty();
		$('#addtxtUserName').removeClass('highlight');
		$('#addtxtUserName').addClass('highlighterror');
 	}else {
			var username=$("#"+id).val();
			var validusername=true;
			for (var ctr = 0; ctr < username.length; ctr++) {
				if ((/^([a-z])\.?$/i.test(username[ctr]))==false && (/^([0-9])\.?$/i.test(username[ctr]))==false){
					validusername=false;
				}
			}

			if(validusername==true) {
				if (oldusername != "") {
					if (username == oldusername) {
						$('#addtxtUserName').removeClass('highlighterror');
					} else {
						checkUsernameAvail(username);
				  	  }
				} else {
					checkUsernameAvail(username);
			  	  }
			} else {
				$("#addUsernamediv").empty();
				$('#addtxtUserName').addClass('highlighterror');
		      }
		
		}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validateUserType
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Maricel Louise Sumulong 
 #  REVISION DATE : November 1, 2013
 #  REVISION #    : 1
 #  DESCRIPTION   : validate user's user level
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validateUserType(id) {

	if($("#"+id).val()=="" || $("#"+id).val()==null) {
		$("#span"+id).empty();
		$("#span"+id).append("Please enter your Username.");
	} else {
		$("#span"+id).empty();
	  }
	
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : validatePassword
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Apple Kem E. Eguia 
 #  REVISION DATE : November 1, 2013
 #  REVISION #    : 1
 #  DESCRIPTION   : validate user's password
 #  PARAMETERS    : element id
 #
 #######################################################################
*/

function validatePassword(id) {
	if($("#"+id).val()=="" || $("#"+id).val()==null) {
		$('#passwordStrength').removeClass("highlight");
	    $('#passwordStrength').removeClass("highlight2");
    	$('#passwordStrength').removeClass("highlighterror");
	    $('#passwordStrength').val("");
	} else if($("#"+id).val().length<6)	{
		var pass = $("#addtxtPassword").val();
		var pass2 = $("#addtxtRePassword").val();
		if(pass != "" && pass2 != "" && pass != pass2){
			alertUser("The passwords you entered do not matched. Please try again.");
		} else if (typeof alerts == 'function') {
			alertUser("Please enter password with min. of 6 characters.");
		} else {
			alertUser("Please enter password with min of 6 characters.");
		}
	} else {
		if(id=='spantxtPassword' || id=='spantxtRePassword') {
			if(oldpassword!=$("#"+id).val()) {
				var validated=validatePasswordFormat($("#"+id).val());
			} else if(oldpassword==$("#"+id).val())	{
				var validated=true;
			}
		} else {
			var validated=validatePasswordFormat($("#"+id).val());
		}
		if(validated==true)	{
			if(id=='addtxtRePassword') {
				if(verifyPassword($("#addtxtPassword").val(),$("#addtxtRePassword").val())==false) {
				}
			} else if(id=='spantxtRePassword') {
				if(verifyPassword($("#spantxtPassword").val(),$("#spantxtRePassword").val())==false) {
				}
			}
		}
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkUserStat
 #  AUTHOR        : 
 #  DATE          :  
 #  MODIFIED BY   : Apple Kem E. Eguia
 #  REVISION DATE : March 5, 2014
 #  REVISION #    : 1
 #  DESCRIPTION   : checks user status
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function checkUserStat(uname) {
	var urlx = getURL('ADMIN3','JSON');
	var queryObj = {'QUERY':[{'user':uname}]};
	var queryStr = JSON.stringify(queryObj);
	var cgiUrl = urlx+"action=getuserstat&query="+queryStr+"&version=3.0";
	var theStat;
	$.ajax({
		url: cgiUrl,
		dataType: 'text/xml',
		async: false,
		success: function(data){
			var mydata = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(mydata);
			theStat = jsonData.RESULT[0].Result;
		}
	});
	return theStat;
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : deletes 
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : Apple Kem E. Eguia
 #  REVISION DATE : March 5, 2014
 #  REVISION #    : 1
 #  DESCRIPTION   : delete query
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function deletes(qstr, todo, header){
    var URL= getURL('ADMIN2','JSON');
    $.ajax({
        url: URL+qstr,
        dataType: 'html',
        success: function(data) {
            var mydata = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(mydata);
			var jresult = jsonData.RESULT[0].Result;
			if(/successful/i.test(jresult)){
				eval(todo);
			}else{
				alertUser('Delete Failed!');
			}
        }
    });
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : fetchFromDB
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 6, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets certain data from DB
 #  PARAMETERS    : id,table,columns
 #
 #######################################################################
*/

function fetchFromDB(id,table, columns){
	var queryObj = {'QUERY':[{'columns':columns,'table':table,'where':table+'Id IN ('+id+')'}]};
	var queryStr = JSON.stringify(queryObj);
	var URL= getURL('ADMIN3','JSON')+ "action=guiDbQuery&query="+queryStr+"&version=3.0";
	var arr_col = columns.split(",");
	var ret_arr = new Array();
    $.ajax({
        url: URL,
        dataType: 'html',
		async: false,
        success: function(data) {
			var mydata = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(mydata);
			var row = jsonData.data[0].row;
			for(var a=0; a<row.length; a++){
				for(var b=0; b<arr_col.length; b++){
					var arr_ind = arr_col[b];
					var str = arr_col[b]+":"+row[a][arr_ind];
					ret_arr.push(str);
				}
			}
        }
    });
	return ret_arr;
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : ShowDeviceInformation
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 12, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : show device information of the selected device
 #  PARAMETERS    : device
 #
 #######################################################################
*/
function ShowDeviceInformation(device){
	var url = getURL("RM4")+'action=deviceinfo&query={"QUERY":[{"deviceid":"'+device+'"}]}&version=3.0';
	$.ajax({
        url: url,
        dataType: 'html',
		async: false,
        success: function(data) {
			if(globalDeviceType != "Mobile"){
				var mydata = data;
				deviceInformationPopUp(mydata);
			}
        }
    });

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : deviceInformationPopUp
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 12, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : show device information pop-up
 #  PARAMETERS    : data
 #
 #######################################################################
*/
function deviceInformationPopUp(data){
	var h = $(window).height();
	$( "#showInformationDeviceDiv" ).dialog({
		modal: true,
		autoResize:true,
		width: "90%",
		height: h,
		top: "0px !important",
		overflow: "auto",
		title: "Device Information",
	});
	$( "#showInformationDeviceDiv" ).empty().load('pages/Admin/DeviceInformation.html',function(){
		createTableDeviceXML(data);
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : createTableDeviceXML
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 12, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : create dynamic table based on the xml
 #  PARAMETERS    : data
 #
 #######################################################################
*/
function createTableDeviceXML(data){
	data = data.replace(/'/g,'"');
	var jsonData = jQuery.parseJSON(data);
	globaleviceInformationJSON = jsonData.data[0].DEVICE[0];
	var str = "";
	str = createDyanamicTableAndAttribute(jsonData.data[0].DEVICE[0],str);
	str+="<div data-role='navbar' id='devicechildTab'><ul>";
	str= createDyanmicTabDeviceInformation(jsonData.data[0].DEVICE[0],str,false,true);
	str+="</div></div></center>";
	$('#DeviceInformationArea').empty().append(str);
	$('#devicechildTab').tabs();
	$('#devicechildinformation').tabs();
	$('#devicerackTab').tabs();
	$('#devicemoduleTab').tabs();
	$('#deviceportTab').tabs();
	$('#devicesubchannelTab').tabs();
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : createDyanamicTableAndAttribute
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 12, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : create dynamic table
 #  PARAMETERS    : xmlDoc,str
 #
 #######################################################################
*/
function createDyanamicTableAndAttribute(device,str,level,id){
	str += "<center><table class='DeviceInformationTable'>";
	var ctr = 1;
	var t = 1;
	var len = 1;
	for(var x in device) {
		var attrname = x;
		var val = device[x];
		if(val != "" && val != "None" && attrname != "ObjectPath" && attrname != "SLOT" && attrname != "RACK" && attrname != "MODULE" && attrname != "PORT" && attrname != "SUBCHANNEL" && attrname != "PROTOCOL" && attrname != "PARTNER"){
			len++;
		}
	}
	for(var x in device) {
	//for(var t=0; t<device.properties.length; t++){
		var name = x;
		var attrname = x;
		var val = device[x];
		if(val != "" && val != "None" && attrname != "ObjectPath" && attrname != "SLOT" && attrname != "RACK" && attrname != "MODULE" && attrname != "PORT" && attrname != "SUBCHANNEL" && attrname != "PROTOCOL" && attrname != "PARTNER"){
			if(editDevInfoAdmin){
				str = createDynamicEditDevTable(str,name,val,ctr,len,t,level,id);
			}else{
				str = createDynamicTable(str,name,val,ctr,len,t);
			}
			ctr++;
			t++;
		}
	}
	str+="</table>";
	return str;
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : createDynamicTable
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 12, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : check value of attribute
 #  PARAMETERS    : str,name,val,ctr,device
 #
 #######################################################################
*/
function createDynamicTable(str,attrname,attrval,ctr,device,t){
	if(attrval != "" && attrval != undefined && attrval.toLowerCase() != "none"){
		if(ctr == 1){
			str += "<tr>";
			str += "<td>" + attrname + " :</td>";	
			if(attrname.toLowerCase() == "password"){
				str += "<td><input type='password' value='"+ attrval +"' disabled='disabled'/></td>";	
			}else{
				str += "<td><input type='type' value='"+ attrval +"' disabled='disabled'/></td>";	
			}
		}else if(ctr%3 == 0){
			str += "<td>" + attrname + " :</td>";	
			if(attrname.toLowerCase() == "password"){
				str += "<td><input type='password' value='"+ attrval +"' disabled='disabled'/></td>";	
			}else{
				str += "<td><input type='type' value='"+ attrval +"' disabled='disabled'/></td>";	
			}
			str += "</tr>";
			str += "<tr>";
		}else{
			str += "<td>" + attrname + " :</td>";	
			if(attrname.toLowerCase() == "password"){
				str += "<td><input type='password' value='" + attrval + "' disabled='disabled'/></td>";	
			}else{
				str += "<td><input type='type' value='" + attrval + "' disabled='disabled'/></td>";	
			}
			if(t == device -1){
				str += "</tr>";
			}
		} 
	}
	return str;
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : closeDeviceInformation
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 12, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : close pop-up
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function closeDeviceInformation(){
    $( "#showInformationDeviceDiv" ).empty().dialog("close");
	globaleviceInformationJSON = null;
	globalDeviceInformationTab = [];
	editDevInfoAdmin = false;
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : createDyanmicTabDeviceInformation
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 12, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : creaet dynamic tab for device information pop-up
 #  PARAMETERS    : data 
 #
 #######################################################################
*/
function createDyanmicTabDeviceInformation(data,str,flag,flg,flg2){
	var data2 = "";
	if(data.SLOT != undefined && data.SLOT != null){
		data2 = "slot";
		var child = data.SLOT.length;
		if(!flag){
			str = createStringForDynamicTab("SLOT",child,str,data,flg2);
		}
	}else if(data.RACK != undefined && data.RACK != null){
		data2 = "rack";
		var child = data.RACK.length;
		if(!flag){
			str = createStringForDynamicTab("RACK",child,str,data,flg2);
		}
	}else if(data.MODULE != undefined && data.MODULE != null){
		data2 = "module";
		var child = data.MODULE.length;
		if(!flag){
			str = createStringForDynamicTab("MODULE",child,str,data,flg2);
		}
	}else if(data.PORT != undefined && data.PORT != null){
		data2 = "port";
		var child = data.PORT.length;
		if(!flag){
			str = createStringForDynamicTab("PORT",child,str,data,flg2);
		}
	}else if(data.SUBCHANNEL != undefined && data.SUBCHANNEL != null){
		data2 = "subchannel";
		var child = data.SUBCHANNEL.length;
		if(!flag){
			str = createStringForDynamicTab("SUBCHANNEL",child,str,data,flg2);
		}
	}else if(data.PARTNER != undefined && data.PARTNER != null){
		data2 = "partner";
	}
	if(!flag){
		return str;
	}else{
		return data2;
	}
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : createStringForDynamicTab
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 12, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : show dynamic tab
 #  PARAMETERS    : level,child,str,data
 #
 #######################################################################
*/
function createStringForDynamicTab(level,child,str,data,flg){
	if(editDevInfoAdmin){
		getDevEditedInfoAdmin();
	}
	var sub;
	var div;
	for(var s=0; s<child ; s++){
		var node = "";
		var liId = "";
		var txt = "";
		var num;
		var devObj;
		if(level.toLowerCase() == "subchannel"){
			devObj = data.SUBCHANNEL[s];	
			num = data.SUBCHANNEL[s].Number;	
			if(data.SUBCHANNEL[s].PhysicalPortType != ""){
				txt = "SubChannel" + data.SUBCHANNEL[s].PhysicalPortType + "_" + num;
			}else{
				txt = "SubChannel_" + num;
			}
		}else if(level.toLowerCase() == "port"){
			devObj = data.PORT[s];	
			num = data.PORT[s].Number;	
			if(data.PORT[s].PhysicalPortType != ""){
				txt = "Port" + data.PORT[s].PhysicalPortType + "_" + num;
			}else{
				txt = "Port_" + num;
			}
		}else if(level.toLowerCase() == "module"){
			num = data.MODULE[s].Number;	
			txt = "Module_" + num;
			devObj = data.MODULE[s];	
		}else if(level.toLowerCase() == "slot"){
			devObj = data.SLOT[s];	
			num = data.SLOT[s].Number;	
			txt = "Slot_" + num;
		}else if(level.toLowerCase() == "rack"){
			devObj = data.RACK[s];	
			num = data.RACK[s].Number;	
			txt = "Rack_"+num;
		}
		if(s==0){
			sub = devObj;
		}
		node = level + " " + num;
		liId = devObj.ObjectPath.split(".").join("--");
		globalDeviceInformationTab.push(liId);
		if(s==0){
			str += "<li id='"+liId+"'class='ui-tabs-active ui-state-active' style='color: #39599C;' onclick='changeDynamicTabDev(this.id,\""+liId+"\");'><a class='ui-tabs-anchor'>"+node+"</a></li>";	
		}else{
			str += "<li id='"+liId+"' style='color: #39599C;' onclick='changeDynamicTabDev(this.id,\""+liId+"\");'><a class='ui-tabs-anchor'>"+node+"</a></li>";	
		}
	}
	if(flg){
		var name = 'device'+level.toLowerCase()+'childinformation'; 
		$('#'+name).empty();
	}
	var tmpid = "";
	if(level.toLowerCase()=="port" || level.toLowerCase()=="subchannel"){
		tmpid = sub.PortId;
	}
	str+="</ul><div id='device"+level.toLowerCase()+"childinformation'>"
	str = createDyanamicTableAndAttribute(sub,str,level,tmpid);
	if(level.toLowerCase() != "subchannel"){
		var strMe = createDyanmicTabDeviceInformation(sub,str,true,false,false);
		if(strMe != "" && strMe != "partner"){
			str+="<div data-role='navbar' id='device"+strMe.toLowerCase()+"Tab'><ul>";
			if(flg){
				var name = 'device'+strMe.toLowerCase()+'Tab'; 
				$('#'+name).empty();
			}
			str = createDyanmicTabDeviceInformation(sub,str,false,false,false);
		}else if(strMe != "" && strMe == "partner"){
			str = createFieldSetForPartner(sub,str,level);
		}
		if(editDevInfoAdmin && (level.toLowerCase() == "subchannel" || level.toLowerCase() == "port") && strMe != "partner"){
			str += showParnerAddSelectionAdmin(level,tmpid);
		}
		str+="</div>";
	}else if(level.toLowerCase() == "subchannel"){
		var strMe = createDyanmicTabDeviceInformation(sub,str,true,false,false);
		if(strMe != "" && strMe == "partner"){
			str = createFieldSetForPartner(sub,str,level);
		}
		if(editDevInfoAdmin && (level.toLowerCase() == "subchannel" || level.toLowerCase() == "port") && strMe != "partner"){
			str += showParnerAddSelectionAdmin(level,tmpid);
		}
	}
	str+="</div>";
	return str;
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : createFieldSetForPartner
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 13, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : create form style for the partner information
 #  PARAMETERS    : level,myStr
 #
 #######################################################################
*/
function createFieldSetForPartner(data,str,level){
	str += "<fieldset id='partInfoField'><legend style='/*margin-left:-850px;*/text-align:center'><strong>Partner Port Information</strong></legend><div id='devpartnerinformation'>";
	str = createDyanamicTableAndAttribute(data.PARTNER[0],str);
	if(editDevInfoAdmin){
		var found = false;
		if(level.toLowerCase() == "port"){
			var target = editedDevInfoPerTabAdmin[0].Port;
		}else if(level.toLowerCase() == "subchannel"){
			var target = editedDevInfoPerTabAdmin[0].SubChannel;
		}
		$.each(target, function(i,obj){
			if(obj.Id == data.PortId){
				if(obj.Attr == "PartnerId"){
					found = true;
					obj.Value = data.PARTNER[0].PortId;
				}
			}
		});
		if(!found){
			target.push({Id: data.PortId, Attr: "PartnerId", Value: data.PARTNER[0].PortId})
		}
		str += "<table><tr><td style='text-align:right'><input type='button' id='deletePartInfoAdmin' value='Delete Partner Port' onclick=\"deleteDevPPortAdmin('"+level+"_"+data.PortId+"_"+data.PARTNER[0].PortId+"');\"/></td></tr></table>";
	}
	str += "</div></fieldset>";
	return str;
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : changeDynamicTabDev
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 13, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : change dynamic tab
 #  PARAMETERS    : id
 #
 #######################################################################
*/
function changeDynamicTabDev(id,level){
	for(var t=0; t<globalDeviceInformationTab.length; t++){
		$('#'+globalDeviceInformationTab[t]).removeClass('ui-state-active');
        $('#'+globalDeviceInformationTab[t]).removeClass('ui-tabs-active');
	}
	var strArr = id.split("--");
	var data1 = strArr[0];
	var flag = false;
	for(var s=1; s<strArr.length; s++){
		data1 += "--" + strArr[s];
		if(level == strArr[s] && s == strArr.length-1){
			flag = true;
		}
		$('#'+data1).addClass('ui-state-active');
        $('#'+data1).addClass('ui-tabs-active');
	}
	var levelArr2 = level.split("--");
	var levelArr = levelArr2[levelArr2.length -1].split("_");	
	if(levelArr[0].match(/slot/gi) != null){
		createNewDisplayDeviceInformation(globaleviceInformationJSON,level,id);
	}else if(levelArr[0].match(/rack/gi) != null){
		createNewDisplayDeviceInformation(globaleviceInformationJSON,level,id);
	}else if(levelArr[0].match(/module/gi) != null){
		createNewDisplayDeviceInformation(globaleviceInformationJSON,level,id);
	}else if(levelArr[0].match(/port/gi) != null){
		createNewDisplayDeviceInformation(globaleviceInformationJSON,level,id);
	}else if(levelArr[0].match(/subchannel/gi) != null){
		createNewDisplayDeviceInformation(globaleviceInformationJSON,level,id);
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : createNewDisplayDeviceInformation
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 13, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : create new display
 #  PARAMETERS    : val,id
 #
 #######################################################################
*/
function createNewDisplayDeviceInformation(devObj,id,tabid){
	if(devObj.SLOT != undefined && devObj.SLOT != null){
		checkDeviceChildInformation(devObj.SLOT,id,"SLOT",tabid);
	}else if(devObj.RACK != undefined && devObj.RACK != null){
		checkDeviceChildInformation(devObj.RACK,id,"RACK",tabid);
	}else if(devObj.MODULE != undefined && devObj.MODULE != null){
		checkDeviceChildInformation(devObj.MODULE,id,"MODULE",tabid);
	}else if(devObj.PORT != undefined && devObj.PORT != null){
		checkDeviceChildInformation(devObj.PORT,id,"PORT",tabid);
	}else if(devObj.SUBCHANNEL != undefined && devObj.SUBCHANNEL != null){
		checkDeviceChildInformation(devObj.SUBCHANNEL,id,"SUBCHANNEL",tabid);
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkDeviceChildInformation
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 13, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : check if id  is match with the object path
 #  PARAMETERS    : obj,id,level
 #
 #######################################################################
*/
function checkDeviceChildInformation(obj,id,level,tabid){
	for(var t=0; t<obj.length; t++){
		var name = "";
		var flag = false;
		name = obj[t].ObjectPath.split(".").join("--");;
		var idArr = id.split("--");
		if(level == "SLOT" && idArr[idArr.length-1].match(/slot/gi) != null){
			flag = true;
			if(idArr[idArr.length-1].match(/slot/gi) != null && id == name){
				updateNewDisplay(obj[t],id,"Slot",tabid);
				break;
			}
		}else if(level == "RACK" && idArr[idArr.length-1].match(/rack/gi) != null){
			flag = true;
			if(id.match(/rack/gi) != null && id == name){
				updateNewDisplay(obj[t],id,"Rack",tabid);
				break;
			}
		}else if(level == "MODULE" && idArr[idArr.length-1].match(/module/gi) != null){
			flag = true;
			if(idArr[idArr.length-1].match(/module/gi) != null && id == name){
				updateNewDisplay(obj[t],id,"Module",tabid);
				break;
			}
		}else if(level == "PORT" && idArr[idArr.length-1].match(/port/gi) != null){
			flag = true;
			var strMe = createDyanmicTabDeviceInformation(obj[t],str,true,false,false);
			if(idArr[idArr.length-1].match(/port/gi) != null && id == name){
				updateNewDisplay(obj[t],id,"Port",tabid);
				break;
			}
		}else if(level == "SUBCHANNEL" && idArr[idArr.length-1].match(/subchannel/gi) != null){
			flag = true;
			if(idArr[idArr.length-1].match(/subchannel/gi) != null && id == name){
				updateNewDisplay(obj[t],id,"SubChannel",tabid);
				break;
			}
		}	
		if(!flag){
			createNewDisplayDeviceInformation(obj[t],id,tabid);
		} 
	}
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : updateNewDisplay
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 13, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : update display on pop-up
 #  PARAMETERS    : obj,level
 #
 #######################################################################
*/
function updateNewDisplay(obj,id,level,tabid){
	var str = "";
	var tmpid = ""
	if(level.toLowerCase()=="port" || level.toLowerCase()=="subchannel"){
		tmpid = obj.PortId;
	}
	str = createDyanamicTableAndAttribute(obj,str,level,tmpid);
	var strMe = createDyanmicTabDeviceInformation(obj,str,true,false,false);
	if((level == "SubChannel" && strMe == "partner") || (level == "Port" && strMe == "partner")){
		str = createFieldSetForPartner(obj,str,level);
	}else{
		str+="<div data-role='navbar' id='device"+strMe.toLowerCase()+"Tab'><ul>";
		str = createDyanmicTabDeviceInformation(obj,str,false,false,true);
	}
	if(editDevInfoAdmin && (level.toLowerCase() == "subchannel" || level.toLowerCase() == "port") && strMe != "partner"){
		str += showParnerAddSelectionAdmin(level,tmpid);
	}
	
	str+="</center>";
	var name = "device" + level.toLowerCase() + "childinformation";
	$('#'+name).empty().append(str);
	$('#devicechildTab').tabs();
	$('#devicechildinformation').tabs();
	$('#devicerackTab').tabs();
	$('#devicemoduleTab').tabs();
	$('#deviceportTab').tabs();
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : updateNewDisplay
 #  AUTHOR        : Juvindle C Tina
 #  DATE          : March 13, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : update display on pop-up
 #  PARAMETERS    : obj,level
 #
 #######################################################################
*/
function changeAdminLabel(label,main){
	var str ="<font>Administration >>";
	if(main != ""){
		str+= "<font> " + main + " >></font>";
	}
	str+="<font style='color: #cd1526; text-shadow: 1px 1px 1px #500404;'> "+label+"</font></font>";
	$('#administrationlabel').empty().append(str);
}

function addEditUserInit(){
	if (globalAdminFunc == "add"){
			if ($.inArray('1',globalUserDomainIds) == -1){
				globalUserDomainIds.push('1');
			}
			if ($.inArray('1',globalUserPolicy2Ids) == -1){
				globalUserPolicy2Ids.push('1');
			}
			addUserOnLoad();
		}else if (globalAdminFunc == "edit"){
			loadUserData(globalSelectedAdminMain);
		}
		userTextInputs();
		loadCountry('addtxtCountry');
		loadCompany('addtxtCompany');
		activateResLimits();
		if (globalDeviceType == 'Mobile'){
			$( ".inputDesign" ).textinput({ wrapperClass: "input-design" });
			changeTab();
			changeZoneTab();
			changeUserAccRiTab();
			$('#addUserPopUp').trigger('create');
		}	
}

function userTextInputs(){
	$(document).on('change','#addtxtCountry', function(){
		changeContactFormat('addtxtCountry');
	});
	$(document).on('blur','#addtxtFirstName', function(){
		validateFirstName('addtxtFirstName');
	});
	$(document).on('blur','#addtxtMiddleName', function(){
		validateMiddleName('addtxtMiddleName');
	});
	$(document).on('blur','#addtxtLastName', function(){
		validateLastName('addtxtLastName');
	});
	$(document).on('blur','#addtxtHomePhoneNo', function(){
		validateHomePhoneNo('addtxtHomePhoneNo');
	});
	$(document).on('blur','#addtxtHomeAdd', function(){
		validateHomeAdd('addtxtHomeAdd');
	});
	$(document).on('blur','#addtxtHomePhoneNo', function(){
		validateHomePhoneNo('addtxtHomePhoneNo');
	});
	$(document).on('blur','#addtxtMobileNo', function(){
		validateMobileNo('addtxtMobileNo');
	});
	$(document).on('blur','#addtxtPhoneNo', function(){
		validatePhoneNo('addtxtPhoneNo');
	});
	$(document).on('blur','#addtxtEmail', function(){
		validateEmail('addtxtEmail');
	});
	$(document).on('blur','#addtxtEmployNo', function(){
		validateEmployNo('addtxtEmployNo');
	});
	$(document).on('blur','#addtxtOfficeAdd', function(){
		validateOfficeAdd('addtxtOfficeAdd');
	});
	$(document).on('blur','#addtxtDivision', function(){
		validateDivision('addtxtDivision');
	});
	$(document).on('blur','#addtxtUserName', function(){
		validateUserName('addtxtUserName');
	});
	$(document).on('keyup','#addtxtUserName', function(){
		validateUserName('addtxtUserName');
	});
	$(document).on('keypress','#addtxtUserName', function(){
		validateUserName('addtxtUserName');
	});
	$(document).on('keydown','#addtxtUserName', function(){
		validateUserName('addtxtUserName');
	});
}

function accRiCheckBoxes(){
	$(document).on('click','#CECbox', function(){
		var val = $(this).val();
		showAccess("CEChoices",val);
	});
	$(document).on('click','#RMCbox', function(){
		var val = $(this).val();
		showAccess("RMChoices",val);
	});
	$(document).on('click','#ADCbox', function(){
		var val = $(this).val();
		showAccess("ADChoices",val);
	});
	$(document).on('click','#PMCbox2', function(){
		var val = $(this).val();
		showAccess("PMChoices",val);
	});
	$(document).on('click','#SRCbox', function(){
		var val = $(this).val();
		showAccess("SRChoices",val);
	});
	
}
function showEditGroupPopUp(type){
	$('#AdminAlert').dialog({
		autoOpen: false,
		resizable: false,
		height:500,
		width:1200,
		overflow:"auto",
		modal: true,
		closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons:{
			"Save": function(){			
				$(this).dialog("close");
			},
			"Cancel": function(){
				$(this).empty().dialog("destroy");
				loadGroupTable();
			}
		}	
	});
	$('#AdminAlert').dialog("open");
	$('#AdminAlert').empty().load('pages/Admin/AddGroupPopUp.html?', function() {
	if(type == 'showinfo'){
		setTimeout(function(){
	//		loadDevicesInZone();
	//		loadUserResourceDom();
	//		loadUserPolicy();
			initResourceDropDown(type);
			$('#unbindAddPopUp').hide();
			$('#unbindRemovePopUp').hide();
			$('#groupDeviceAdd').hide();
			$('#groupDeviceRemove').hide();
			
		},1000);
	}
	$("#tabsEdit").tabs();
		setTimeout(function(){
	//		loadUserResourceDom();
			//loadDevicesInZone();
	//		loadUserPolicy();
			initResourceDropDown(type);
		},1000);
	});



}

function checkUsersStat() {
	var cgiUrl = getURL('ADMIN2','JSON')+'action=getuserstat&query={"QUERY":[{"user":"'+globalUserName+'"}]}';
	var theStat;
	$.ajax({
		url: cgiUrl,
		dataType: 'html',
		async: false,
		success: function(data){

			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			if(json.RESULT[0].Result == "n"){
				alerts("Unable to edit selected group. Only an Administrator, Manager and System Administrator can edit a group.");
			}
	}
});

}

function AdminCheckSingle(table){
	var ctr = 0;
	var ctrtotal = 0;
	if(globalAdminPage == "AdminGroups"){
		globalAdminGroupId = [];
		globalUserZoneNames = [];	
		globalResourceGroupId = [];
		$('input:checkbox[name="adminGroupSel"]').each(function(){
			if($(this).is(':checked')){
				$(this).parent().parent().addClass('highlight');
				globalAdminGroupId.push($(this).attr('gid'));
				globalUserZoneNames.push($(this).attr('zoneName'));
				globalResourceGroupId.push($(this).attr('rpId'));
				ctr++;
			}else{
				$(this).parent().parent().removeClass('highlight');
				ctr--;
			}
		});
	}else if(globalAdminPage == "AdminBindedUsers"){
		globalUsersIdArray = [];
		globalUserNameArray = [];
		$('input:checkbox[name="adminBindedUserSel"]').each(function(){
			if($(this).is(':checked')){
				$(this).parent().parent().addClass('highlight');
				globalUsersIdArray.push($(this).attr('userid'));
				globalUserNameArray.push($(this).attr('username'));
				ctr++;
			}else{
				$(this).parent().parent().removeClass('highlight');
				ctr--;
			}
		});

	}else if(globalAdminPage == "AdminAddBindUser"){
		//globalAddBindedUser = [];
		$('input:checkbox[name="adminAddBindUserSel"]').each(function(){
			if($(this).is(':checked')){
				$(this).parent().parent().addClass('highlight');
				if(globalAddBindedUser.indexOf($(this).attr('userid')) == -1){
					globalAddBindedUser.push($(this).attr('userid'));
				}
				ctr++;
			}else{
				$(this).parent().parent().removeClass('highlight');
				if(globalAddBindedUser.indexOf($(this).attr('userid') != -1)){
					var index = globalAddBindedUser.indexOf($(this).attr('userid'))
				//	globalAddBindedUser.splice(index,1);
				}
				ctr--;
			}
		});
	}else if(globalAdminPage == "AdminAddBindDevice"){
		$('input:checkbox[name="adminAddBindDeviceSel"]').each(function(){
			if($(this).is(':checked')){
				$(this).parent().parent().addClass('highlight');
				if(globalAddDevice.indexOf($(this).attr('deviceid')) == -1){
					globalAddDevice.push($(this).attr('deviceid'));
				}
				ctr++;
			}else{
				$(this).parent().parent().removeClass('highlight');
					var index = globalAddBindedUser.indexOf($(this).attr('globalAddDevice'));
			}
				ctr--;
		});
	}else if(globalAdminPage == "AdminDeviceList"){
		$('input:checkbox[name="adminBindedDevicesSel"]').each(function(){
			if($(this).is(':checked')){
				globalDeviceId.push($(this).attr('deviceid'));
				$(this).parent().parent().addClass('highlight');
				ctr++;
			}else{
				$(this).parent().parent().removeClass('highlight');
				ctr--;
			}
		});
	}
}
function checkGAddBind(){
	var cgiURL="https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?action=checkgroup&query={'QUERY':[{'UserId':'"+globalUserId+"','GroupId':'"+globalAdminGroupId+"'}]}";
	$.ajax({
		url: cgiURL,
		dataType: 'html',
		async: false,
		success: function(data){
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

			if(json.RESULT[0].Result == 1){
				
			}
		}
	});
}

function retrieveOriginalUser() {

	$.ajax({
		//url: "../php/dbm_receiver.php?action=getUserById&id="+id,
		url: 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?action=getuserbyid&query={"QUERY":[{"id":"'+globalAdminGroupId+'"}]}',
		dataType: 'html',
		async: false,
		success: function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

		}
	});
}
function checkUserGroup(){
	$.ajax({
		url: 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?action=checkusergroup&query={"QUERY":[{"user":"'+globalUserName+'","groupid="'+globalAdminGroupId+'"}]}',
		dataType: 'html',
		async: false,
		success: function(data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

		}
	});
}
function DeleteGroup(){
	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?action=DeleteGroupNew&query={"QUERY":[{"GroupId":"'+globalAdminGroupId+'"}]}';
	$.ajax({
		url: url,
		dataType: 'html',
		async: false,
		success: function(data){
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

			if(json.RESULT[0].Result == "Delete Successful!"){
				alerts('Delete Successful!');
			}
		}
	});
}
function showDeletePopUp(){
	var prompt1 = ("Are you sure you want to delete the following group?");
	
	$('#AdminAlert').dialog({
		autoOpen: false,
		resizeable: false,
		modal: true,
		open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();  },
		buttons:{
			"Yes": function(){			
				setTimeout(function(){
					checkUserStat();	
					retrieveOriginalUser();
					checkUserGroup();
					DeleteGroup();
				},1000);
				loadGroupTable();
				$(this).dialog("close");
			},
			"No": function(){
				$(this).dialog("close");
			}
		}
	});
	$('#AdminAlert').dialog("open");
	$('#AdminAlert').empty().append(prompt1);


}
/*
 #######################################################################
 #
 #  FUNCTION NAME :  initZoneDropDown
 #  AUTHOR        : Angeline Bringas
 #  DATE          :  March 26,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : initializes zone drop down
 #  PARAMETERS    : val,type 
 #
 #######################################################################
*/


function initZoneDropDown(val,type){
	var groupid='';
	globalResourceDomainId = convertResourceIdToName(val); // this function converts resource name to resource id
	if(type=='edit'){
		//groupid = getSelectedArr("adminGroup");	
		groupid = globalAdminGroupId;
//		loadEmailReservation();
	}


	var str='<option value="">--Select Zone--</option>';
	$.ajax({
		url: "https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?action=getZonesInDomain&query={'QUERY':[{'DomainName':'"+val+"','GroupId':'"+globalAdminGroupId+"'}]}",
		dataType: 'html',
		async: false,
		success: function (data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);
			var dataArr = json.RESULT[0].Result.split('^');
			for(var i = 0; i < dataArr.length; i++){
				selected = dataArr[i].split('-');
				if(selected[1] == 'Selected'){
					str+='<option value="'+selected[0]+'" selected>'+selected[0]+'</option>';
				}else{
					str+='<option value="'+dataArr[i]+'" >'+dataArr[i]+'</option>';

				}
			}	
			if ($('#resourcedropdown').val() != "" && type == "add"){
				$('#zonedropdown').removeAttr('disabled','disabled');
			}
				
			$('#zonedropdown').empty().append(str);	
			globalSelectedArray4 = [];
//			loadGroupAff(1,'');
			globalBindUserId = [];
			globalBindUserAdd = [];
			globalBindUserMove = [];
			globalGroupNewExtraId = [];
//			$('#groupDeviceRemove').addClass('ui-state-disabled ui-button-disabled').attr('disabled',true);
//			$('#groupDeviceAdd').addClass('ui-state-disabled ui-button-disabled').attr('disabled',true);
			if($('#zonedropdown').val() != ""){
				$('#unbindAddPopUp').removeClass('ui-state-disabled ui-button-disabled').attr('disabled',false);
			}else{
				$('#unbindAddPopUp').addClass('ui-state-disabled ui-button-disabled').attr('disabled',true);
				$('#addgrpsecprof').addClass('ui-state-disabled ui-button-disabled').attr('disabled',true);
			}
   		}
		
	});

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : initResourceDropDown 
 #  AUTHOR        : Angeline Brinas
 #  DATE          :   March 26,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : initializes the resource domain on the drop down
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function initResourceDropDown(type){
	var groupid ='';
	var resourcename = '';
	globalGroupNewExtraId='';
	if(type=='edit'){
	//	groupid = getSelectedArr("adminGroup");	
		groupid = globalAdminGroupId;
		globalGroupFlag = 'edit';
		var gname = $('#tradminGroup'+groupid).find('td').eq(1).text();
		var gdesc = $('#tradminGroup'+groupid).find('td').eq(2).text();
		$('#addGroupName').val(gname);
		$('#addGroupDescription').val(gdesc);
		if(gname == "Default"){
			$('#addGroupName').attr('disabled',true);
			$('#unbindbuttons').show();
			$('#groupdevicebuttons').hide();
			$('#unbindAddPopUp').hide();
			$('#unbindRemovePopUp').hide();
			$('#groupDeviceAdd').hide();
			$('#groupDeviceRemove').hide();
			$('#showUserGroupPopUp').show();
		}
	}
	$.ajax({
		url: "https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?action=getResourceDomains&query={'QUERY':[{'groupid':'"+globalAdminGroupId+"','user':'"+globalUserId+"'}]}",
		dataType: 'html',
		async: false,
		success: function (data) {
			data = data.replace(/'/g,'"');
			var json = jQuery.parseJSON(data);

			var str='<option value="">--Select Domain--</option>';
			//data = 'sample1$sample2';
			var dataArr = json.RESULT[0].Result.split('^');
			for(var i = 0; i < dataArr.length; i++){
				selected = dataArr[i].split('-');
				if(selected[1] == 'Selected'){
					resourcename = selected[0];
					str+='<option value="'+selected[0]+'" selected>'+selected[0]+'</option>';
				}else{
					str+='<option value="'+dataArr[i]+'" >'+dataArr[i]+'</option>';

				}
			}
			$('#resourcedropdown').empty().append(str);	
   		}
	});
	if(groupid != '' && resourcename != ''){ // initialize this function when edit group
		globalGroupId = groupid;
//		loadUserGroupTable(1,resourcename);	
		loadUserResourceDom();
		initZoneDropDown(resourcename,'edit');	
 	    loadDevicesInZone();
	}
	if(type == 'add'){
//		globalResourceDomainId = '0';
		loadUserResourceDom('');
		$('#zonedropdown').removeAttr('disabled');
		//$('#zonedropdown').attr('disabled','disabled');

	}
}
function convertResourceIdToName(val){
	var resourceid='';
	$.ajax({
		url: "https://"+CURRENT_IP+"/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?action=getDomainId&query={'QUERY':[{'DomainName':'"+val+"'}]}",
		dataType: 'html',
		async: false,
		success: function (data) {
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			resourceid = jsonData.RESULT[0].Result;

		}
	});
	return resourceid
}
function showUserGroup() {
	$('#AdminGroupAlert').dialog({
		autoOpen: false,
		height: 400,
		width: 1200,
		title: 'Show Groups',
		resizable: false,
		draggable: false,
		closeOnEscape: false,
		overflow: "auto",
		modal: true,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		buttons: {
			"Cancel": function() {
				$(this).dialog("close");
				$('#AdminGroupAlert').empty();
				globalUsersIdArray = [];
				globalUserNameArray = [];
				globalUserNamesArray = [];
				globalUserGroupId = [];
				globalUserGroupName = [];	
				loadUserResourceDom('');
			}
		}
	});
	$('#AdminGroupAlert').dialog('open');
	$(".ui-dialog :button").blur();
	$('#AdminGroupAlert').load('pages/Admin/ShowGroupPopUp.html', function() {
		showGroupDetails(globalUsersIdArray[0]);
/*		var ind = 0;
		$(".ui-widget-overlay").each(function() {
			var zind = parseInt($('#AdminGroupAlert').parent().css("z-index"));
			if (zind > ind) {
				ind = zind;
			}
		});
		ind += -1;
		//var profid = getSelectedArr('AffiliateFromProfile');
		globalUsersIdArray = [];
		globalUserNameArray = [];
		$('input:checkbox[name="adminBindedUserSel"]').each(function() {
			if ($(this).is(':checked')) {
				var val = $(this).val();
				var did = $(this).attr('did');
				if ($.inArray(val,globalUsersIdArray) == -1) {
					globalUsersIdArray.push(val);
				}
				if ($.inArray(did,globalUserNameArray) == -1) {
					globalUserNameArray.push(did);
				}
			}
		});*/	
		$('#showUserGroupDivTab').tabs();
		dynamicshowUserGroupsTab();
//		showGroupDetails(1,globalUsersIdArray[0],globalUserNameArray[0]);
	});
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : dynamicshowUserGroupTab
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 27,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : dynamic tab that show groups on a certain user
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function dynamicshowUserGroupsTab(){
	var str = '';
	for(var a = 0; a < globalUserNameArray.length; a++){
        str += "<li onclick='showGroupDetails("+globalUsersIdArray[a]+",\""+globalUserNameArray[a]+"\");' id='liUserGroups_"+globalUserNameArray[a]+"' class='ui-tabs-anchor'>";
		str += "<a style='vertical-align:top;padding:7px;' href='#editAffFrom-"+globalUsersIdArray[a]+"'>"+globalUserNameArray[a]+"</a></li>";
	}
    $('#showUserGroupDivTab').show();
	$('#ulshowUserGroupDivTab').empty().append(str);

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : showGroupDetails
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 28,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : show group details
 #  PARAMETERS    : id
 #
 #######################################################################
*/


function showGroupDetails(id){
	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?action=showUserGroups&query={"QUERY":[{"UserId":"'+id+'","Filter":"","Limit":"20","Page":"1"}]}';
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				str += "<tr>";
				str += "<td>"+row.GroupName+"</td>";
				str += "<td>"+row.Description+"</td>";
				str += "<td>"+row.ResourceProfile+"</td>";
				str += "<td>"+row.ZoneName+"</td>";
				str += "<td>"+row.AccessRight+"</td>";
				str += "</tr>";
			}
			$('#bindedUserGroup-table > tbody').empty().append(str);
		}
	});
		
}

function deleteFTPUser(users) {
	var myusers = users.join(",");

	var qstr = "action=deleteUserAccount&query={'QUERY':[{'user':'"+myusers+"','ipAdd':'"+CURRENT_IP+"'}]}&version=3.0";
	
    $.ajax({
        url: getURL('ADMIN2','JSON')+qstr,
        dataType: 'html',
        success: function(data) {
        }
    });
}

function showAddUserDom(){
	$( "#addUserDomPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: 1000,
		maxHeight: 500,
		height:600,
		title: 'Add Resource Domain'
	});
	$( "#addUserDomPopUp" ).empty().load("pages/Admin/addUserDomain.html",function(){
		setTimeout(function(){
		$(this).css('overflow','auto');
			loadDomainBoundtoUser();
		}, 1000);

	});
}

function addUserDom(){
	for(var i=0;i<globalDomainBoundUserIds.length;i++){
		if ($.inArray(globalDomainBoundUserIds[i],globalUserDomainIds) == -1){
			globalUserDomainIds.push(globalDomainBoundUserIds[i]);
			globalDynamicSelected.push(globalDomainBoundUserIds[i]);
		}
	}
	$( "#addUserDomPopUp" ).dialog('close');
	loadResDomTable();
}

function removeUserDom(){
	for(var i=0;i<globalUserDomainIds.length;i++){
		var pos = globalDynamicSelected.indexOf(globalUserDomainIds[i]);
		globalDynamicSelected.splice(pos,1);
		globalUserDomainNames.splice(i,1);
	}
	globalUserDomainIds = [];
	loadResDomTable();
}

function loadDomainBoundtoUser(){
	var qstrUser = "action=LoadRDomNew&query={'QUERY':[{'Limit':'"+pagelimit+"','Page':'"+PerPage+"','Filter':'','Sort':'','Orderby':'','Extra':'"+globalUserDomainIds+"'}]}&version=3.0";
	$.ajax ({
		url: getURL('ADMIN2','JSON')+qstrUser,
		dataType: 'html',
		success: function (data) {
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#adduserdomtotalMatches').empty().append(totMatch);
			pagination(totMatch, "adduserdom");
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				var domId = row.ResourceDomainId;
				if(globalDeviceType != "Mobile"){
					str += "<tr id='trUserAddDom"+row.ResourceDomainId+"'><td><input type='checkbox' class='trUserAddDom' rdid='"+row.ResourceDomainId+"'/></td>";
				}else{
					str += "<tr class='trUserAddDom"+row.ResourceDomainId+"' rdid='"+row.ResourceDomainId+"'>";
				}
				str += "<td>"+row.DomainName+"</td>";
				str += "<td>"+row.DomainDescription+"</td>";
				str += "<td>"+row.NumDevices+"</td>";
				str += "<td>"+row.NumZones+"</td>";
				str += "<td>"+row.AffiliationCount+"</td>";
				str += "<td>"+row.BoundRTM+"</td>";
				str += "</tr>";
			}
			$('#useraddDomainsAdmin-table > tbody').empty().append(str);
			if (globalDeviceType == 'Mobile'){
				$("#useraddDomainsAdmin-table").table("refresh");
			}
			globalAdminPage = "AddDomainUser";
			getDomainIds2Add();
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getDomainIds2Add
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : February 25, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the selected id of the row and highlights the
 #					row for zone table only
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getDomainIds2Add() {
	$(".trUserAddDom").on("click",function(){
		var id = $(this).attr('rdid');
		if (globalDeviceType == 'Mobile'){
			var cond = $('.trUserAddDom').hasClass('highlight');
		}else{
			var cond = $('#trUserAddDom'+id).children().find('input').is(':checked');
		}
		if (cond){
			if($.inArray(id, globalDomainBoundUserIds) == -1){
				globalDomainBoundUserIds.push(id);
				if(globalDeviceType != "Mobile"){
					$('#trUserAddDom'+id).addClass('highlight');
				}else{
					$(this).addClass('highlight');
				}
			}
		}else{
			var pos = globalDomainBoundUserIds.indexOf(id);
			globalDomainBoundUserIds.splice(pos,1);
			if(globalDeviceType != "Mobile"){
				$('#trUserAddDom'+id).removeClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
		}
	});
}

function cancelAddDom(){
	for (var i=0;i<globalDomainBoundUserIds.length;i++){
		if ($.inArray(globalDomainBoundUserIds[i],globalUserDomainIds) == -1){
		}else{
			var pos = globalDomainBoundUserIds.indexOf(globalDomainBoundUserIds[i]);
			globalDomainBoundUserIds[i].splice(pos,1);
		}
	}
	$( "#addUserDomPopUp" ).dialog('close');
}

function showAddUserPol(){
	$( "#addUserPolicyDiv" ).dialog({
		modal: true,
		autoResize:true,
		width: 1200,
		height:600,
		title: 'Add User Policy'
	});
	$( "#addUserPolicyDiv" ).empty().load("pages/Admin/addUserPolicy.html",function(){
		setTimeout(function(){
		$(this).css('overflow','auto');
			loadAddUserPol();
		}, 1000);

	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadAddUserPol
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads add user access rights table
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function loadAddUserPol(){
	var url =  getURL('ADMIN2','JSON') + "action=initPtype2&query={'QUERY':[{'Table':'AccessRights','Limit':'"+pagelimit+"','Page':'"+PerPage+"','Filter':'','Sort':'','Orderby':'','Extra':'"+globalUserPolicyIds+"'}]}&version=3.0";
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
				if(globalDeviceType != "Mobile"){
					str += "<tr id='trAddUserAccRi"+row.AccessRightsId+"'><td><input type='checkbox' class='trAddUserAccRi' accrigid='"+row.AccessRightsId+"'/></td>";
				}else{
					str += "<tr class='trAddUserAccRi' accrigid='"+row.AccessRightsId+"'>";
				}

				str += "<td>"+row.AccessRightsName+"</td>";
				str += "<td>"+row.Action+"</td>";
				str += "<td>"+row.EntityType+"</td>";
				str += "<td>"+row.Description+"</td>";
				str += "</tr>";
			}
			$('#addUserAccRiAdmin-table > tbody').empty().append(str);
			if(globalDeviceType == "Mobile"){
				$("#addUserAccRiAdmin-table").table("refresh");
			}
			getAddUserPolId();
		}
	});
}

function addUserPol(){
	for(var i=0;i<globalAddUserPolIds.length;i++){
		if ($.inArray(globalAddUserPolIds[i],globalUserPolicyIds) == -1){
			globalUserPolicyIds.push(globalAddUserPolIds[i]);
		}
	}
	$( "#addUserPolicyDiv" ).dialog('close');
	loadUserPolicy();
}

function removeUPol(){
	for(var i=0;i<globalUserPolicyIds.length;i++){
		var pos = globalUserPolicy2Ids.indexOf(globalUserPolicyIds[i]);
		globalUserPolicy2Ids.splice(pos,1);
	}
	globalUserPolicyIds = [];
	loadUserPolicy();
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getAddUserPolId
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 28, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the selected id of the row and highlights the
 #					row for zone table only
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getAddUserPolId() {
	$(".trAddUserAccRi").on("click",function(){
		var id = $(this).attr('accrigid');
		if (globalDeviceType == 'Mobile'){
			var cond = $('.trAddUserAccRi').hasClass('highlight');
		}else{
			var cond = $('#trAddUserAccRi'+id).children().find('input').is(':checked');
		}
		if (cond){
			if($.inArray(id, globalAddUserPolIds) == -1){
				globalAddUserPolIds.push(id);
				if(globalDeviceType != "Mobile"){
					$('#trAddUserAccRi'+id).addClass('highlight');
				}else{
					$(this).addClass('highlight');
				}
			}
		}else{
			var pos = globalAddUserPolIds.indexOf(id);
			globalAddUserPolIds.splice(pos,1);
			if(globalDeviceType != "Mobile"){
				$('#trAddUserAccRi'+id).removeClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
		}
	});
}

function addUserPy(qstr, todo) {

    $.ajax({
        url: getURL('ADMIN2','JSON') + qstr,
        dataType: 'html',
        success: function(data) {
			var data = data.replace(/'/g,'"');
			var jsonData = $.parseJSON(data);
			if(jsonData.RESULT[0].Result.toLowerCase()=="add successful"){
				var str = jsonData.RESULT[0].Result;
	            alertUser(str);
//			var uname = $("#addtxtUserName").val();
//			var fname = $("#addtxtFirstName").val()+" "+$("#addtxtLastName").val();
//			var email = $("#addtxtEmail").val();
//			var newtodo = "sendemail('"+fname+"','"+uname+"','"+email+"','"+resDomEmail+"');"+todo;
	           eval(todo);
			}else{
				alertUser("Add Unsuccessful!");
			}

        }
    });

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : showAddNewBindUser
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 28,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : shows popup of all users
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function showAddNewBindUser(){
$('#AdminGroupAlert').dialog({
		autoOpen: false,
		height: 400,
		width: 1200,
		resizable: false,
		draggable: false,
		closeOnEscape: false,
		overflow: "auto",
		title: "Add User",
		modal: true,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		buttons: {
			"Add": function(){
				adminActionFlag = 1;
				loadUserResourceDom();
				$(this).dialog("close");
			},
			"Cancel": function() {
				$(this).dialog("close");
			}
		}
	});
	$('#AdminGroupAlert').dialog('open');
	$(".ui-dialog :button").blur();
	$('#AdminGroupAlert').load('pages/Admin/AddNewBindUser.html', function() {
		loadAddNewUserTable();
	});

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : loadAddNewUserTable
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 28,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads all users that was not yet binned on group
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function loadAddNewUserTable(){
	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?action=LoadUserRDomAdd&query={"QUERY":[{"Limit":"20","Page":"1","Filter":"","Sort":"","Orderby":"","ResourceDomainId":"'+globalResourceDomainId+'","Extra":"'+globalAddBindedUser+'"}]}';
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				str += "<tr><td><input type='checkbox' class='trAddBindUsers' userid='"+row.UserId+"' username='"+row.UserName+"' name='adminAddBindUserSel' accrigid='"+row.AccessRightsId+"' onclick='AdminCheckSingle(\"AdminAddBindedUsers\");'/></td>";
				str += "<td>"+row.LastName+"</td>";
				str += "<td>"+row.FirstName+"</td>";
				str += "<td>"+row.UserName+"</td>";
				str += "<td>"+row.UserLevel+"</td>";
				str += "<td>"+row.UserId+"</td>";
				str += "<td>"+row.BusinessPhoneNumber+"</td>";
				str += "<td>"+row.Email+"</td>";

				str += "</tr>";
			}
			$('#usersAddBinded-table > tbody').empty().append(str);
		}
	});
	globalAdminPage = "AdminAddBindUser";
	
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : removeBindUser
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 28,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : removes binned user on group
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function removeBindUser(){
	for(var a = 0;a < globalUsersIdArray.length;a++){
		if(globalAddBindedUser.indexOf(globalUsersIdArray[a]) != -1){
			var index = globalAddBindedUser.indexOf(globalUsersIdArray[a]);
			globalAddBindedUser.splice(index,1);
		}
	}		
	loadUserResourceDom();
}
/*
 #######################################################################
 #
 #  FUNCTION NAME : loadAddNewDevicetable
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 28,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads all devices that was not yet binned on group
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function loadAddNewDeviceTable(){
	var url = 'https://'+CURRENT_IP+'/cgi-bin/NFast_3-0/CGI/ADMINISTRATION/FQueryCgiAdminPy.py?action=getDevicesInDefaultZoneAdd&query={"QUERY":[{"Limit":"20","Page":"1","Filter":"","Sort":"","Orderby":"","ResourceDomainId":"'+globalResourceGroupId+'","ZoneName":"'+globalUserZoneNames+'","Extra":"","GroupId":"'+globalAdminGroupId+'","Removed":""}]}';
	$.ajax({
		url: url,
		dataType: 'html',
		success: function(data){
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			for (var a=0;a<jsonData.data[0].row.length;a++){
				var row = jsonData.data[0].row[a];
				str += "<tr><td><input type='checkbox' deviceid='"+jsonData.data[0].row[a].DeviceId+"'class='trAddBindDevice' name='adminAddBindDeviceSel' onclick='AdminCheckSingle(\"AdminAddBindedDevice\");'/></td>";
					str += "<td>"+jsonData.data[0].row[a].HostName+"</td>";
					str += "<td>"+jsonData.data[0].row[a].IpAddress+"</td>";
    	            str += "<td>"+jsonData.data[0].row[a].Model+"</td>";
			        str += "<td>"+jsonData.data[0].row[a].Description+"</td>";
					str += "<td>"+jsonData.data[0].row[a].Manufacturer+"</td>";	
			        str += "<td>"+jsonData.data[0].row[a].SerialNumber+"</td>";
		    	    str += "<td>"+jsonData.data[0].row[a].DeviceType+"</td>";
					str += "<td>"+jsonData.data[0].row[a].OSType+"</td>";

				str += "</tr>";
			}
			$('#deviceAddBinded-table > tbody').empty().append(str);
		}
	});
	globalAdminPage = "AdminAddBindDevice";
	

}
/*
 #######################################################################
 #
 #  FUNCTION NAME : showAddDevice 
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 28,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : popup that shows all available devices that was not yet binned on group.
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function showAddDevice(){
	$('#AdminGroupAlert').dialog({
		autoOpen: false,
		height: 400,
		width: 1200,
		resizable: false,
		draggable: false,
		closeOnEscape: false,
		overflow: "auto",
		title: "Add User",
		modal: true,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		buttons: {
			"Add": function(){
				adminActionFlag = 1;
				loadDevicesInZone();
				$(this).dialog("close");
			},
			"Cancel": function() {
				$(this).dialog("close");
			}
		}
	});
	$('#AdminGroupAlert').dialog('open');
	$(".ui-dialog :button").blur();
	$('#AdminGroupAlert').load('pages/Admin/AddNewBindDevice.html', function() {
		loadAddNewDeviceTable();
	});


}
/*
 #######################################################################
 #
 #  FUNCTION NAME : removeBindDevice 
 #  AUTHOR        : Angeline Bringas
 #  DATE          : March 28,2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : removes binned devices
 #  PARAMETERS    : 
 #
 #######################################################################
*/


function removeBindDevice(){
	for(var a = 0;a < globalUsersIdArray.length;a++){
		if(globalAddBindedUser.indexOf(globalUsersIdArray[a]) != -1){
			var index = globalAddBindedUser.indexOf(globalUsersIdArray[a]);
			globalAddBindedUser.splice(index,1);
		}
	}		
	loadUserResourceDom();
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadDeviceList
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 29, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function loadDeviceList(act){
		var url = "action=SelDomainInfoNew&query={'QUERY':[{'Limit':'"+pagelimit+"','Page':'"+PerPage+"','Filter':'','extra':'"+globalDomDev2Ids+"','AddedBy':''}]}&version=3.0";
	$.ajax({
		url: getURL('ADMIN2','JSON') + url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#domainDevtotalMatches').empty().append(totMatch);
			globalDomDev2Ids = [];
			if (jsonData.data[0].row){
				for (var a=0;a<jsonData.data[0].row.length;a++){
					var row = jsonData.data[0].row[a];					
					var did = row.DeviceId;
					if(globalDeviceType != "Mobile"){
						str += "<tr id='trDomDev"+row.DeviceId+"'><td><input type='checkbox' class='trDomDev' devid='"+row.DeviceId+"'/></td>";
					}else{
						str += "<tr class='trDomDev"+row.DeviceId+"' devid='"+row.DeviceId+"'>";
					}
					str += "<td>"+row.HostName+"</td>";
					str += "<td>"+row.IpAddress+"</td>";
					str += "<td>"+row.Model+"</td>";
					str += "<td>"+row.Description+"</td>";
					str += "<td>"+row.Manufacturer+"</td>";
					str += "<td>"+row.SerialNumber+"</td>";
					str += "<td>"+row.OSType+"</td>";
					str += "<td>"+row.DeviceType+"</td>";
					str += "<td>"+row.ZoneName+"</td>";
					str += "</tr>";
					if ($.inArray(did,globalDomDev2Ids) == -1){
						globalDomDev2Ids.push(did);
					}
				}
			}
			$('#domainDevListAdmin-table > tbody').empty().append(str);
			if (globalDeviceType == 'Mobile'){
				$("#domainDevListAdmin-table").table("refresh");
			}
			getDomDeviceIds();
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadDomainTab
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 29, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : loads domain tab content
 #  PARAMETERS    : tab
 #
 #######################################################################
*/
function loadDomainTab(tab){
	switch(tab) {
		case "domaintab-1":
			$('#deviceListDiv').empty().load('pages/Admin/deviceListTable.html',function(){
				loadDeviceList();
			});
		break;
		case "domaintab-2":
		break;
		case "usertab-3":
		break;
		case "usertab-4":
		break;
		case "domaintab-7":
			$('#domDPSDiv').empty().load('pages/Admin/domainDPS.html',function(){
				loadDomDPS();
			});
		break;
	}
}

function showAddDomDev(){
	$( "#addDomDevPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: 1000,
		maxHeight: 500,
		height:600,
		title: 'Add Devices'
	});
	$( "#addDomDevPopUp" ).empty().load("pages/Admin/addDomainDevice.html",function(){
		setTimeout(function(){
		$(this).css('overflow','auto');
			loadAddDevList();
		}, 1000);

	});
}

function addDomDev(){
	for(var i=0;i<globalDevBoundDomIds.length;i++){
		if ($.inArray(globalDevBoundDomIds[i],globalDomDev2Ids) == -1){
			globalDomDev2Ids.push(globalDevBoundDomIds[i]);
		}
	}
	$( "#addDomDevPopUp" ).dialog('close');
	loadDeviceList();
}

function removeDomDev(){
	for(var i=0;i<globalDomDevIds.length;i++){
		var pos = globalDomDev2Ids.indexOf(globalDomDevIds[i]);
		globalDomDev2Ids.splice(pos,1);
		$('#trDomDev'+globalDomDevIds).children().find('input').prop('checked',false);
	}
	globalDomDevIds = [];
	loadDeviceList();
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getDomDeviceIds
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 29, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the selected id of the row and highlights the
 #					row for zone table only
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getDomDeviceIds() {
	$(".trDomDev").on("click",function(){
		var id = $(this).attr('devid');
		if (globalDeviceType == 'Mobile'){
			var cond = $('.trDomDev').hasClass('highlight');
		}else{
			var cond = $('#trDomDev'+id).children().find('input').is(':checked');
		}
		if (cond){
			if($.inArray(id, globalDomDevIds) == -1){
				globalDomDevIds.push(id);
				if(globalDeviceType != "Mobile"){
					$('#trDomDev'+id).addClass('highlight');
				}else{
					$(this).addClass('highlight');
				}
			}
		}else{
			var pos = globalDomDevIds.indexOf(id);
			globalDomDevIds.splice(pos,1);
			if(globalDeviceType != "Mobile"){
				$('#trDomDev'+id).removeClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadAddDeviceList
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 29, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function loadAddDevList(act){
		var url = "action=LoadDefaultDevices&query={'QUERY':[{'Limit':'"+pagelimit+"','Page':'"+PerPage+"','Filter':'','sort':'','Orderby':'','DeviceId':'','DeviceId2':'"+globalDomDev2Ids+"'}]}&version=3.0";
	$.ajax({
		url: getURL('ADMIN2','JSON') + url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#domainDevtotalMatches').empty().append(totMatch);
			if (jsonData.data[0].row){
				for (var a=0;a<jsonData.data[0].row.length;a++){
					var row = jsonData.data[0].row[a];
					if(globalDeviceType != "Mobile"){
						str += "<tr id='traddDomDev"+row.DeviceId+"'><td><input type='checkbox' class='traddDomDev' devid='"+row.DeviceId+"'/></td>";
					}else{
						str += "<tr class='traddDomDev"+row.DeviceId+"' devid='"+row.DeviceId+"'>";
					}
					str += "<td>"+row.HostName+"</td>";
					str += "<td>"+row.IpAddress+"</td>";
					str += "<td>"+row.Model+"</td>";
					str += "<td>"+row.Description+"</td>";
					str += "<td>"+row.Manufacturer+"</td>";
					str += "<td>"+row.SerialNumber+"</td>";
					str += "<td>"+row.OSType+"</td>";
					str += "<td>"+row.DeviceType+"</td>";
					str += "</tr>";
				}
			}
			$('#addDevListAdmin-table > tbody').empty().append(str);
			if (globalDeviceType == 'Mobile'){
				$("#addDevListAdmin-table").table("refresh");
			}
			getDeviceIds2Add();
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getDeviceIds2Add
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 29, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the selected id of the row and highlights the
 #					row for zone table only
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getDeviceIds2Add() {
	$(".traddDomDev").on("click",function(){
		var id = $(this).attr('devid');
		if (globalDeviceType == 'Mobile'){
			var cond = $('.traddDomDev').hasClass('highlight');
		}else{
			var cond = $('#traddDomDev'+id).children().find('input').is(':checked');
		}
		if (cond){
			if($.inArray(id,globalDevBoundDomIds) == -1){
				globalDevBoundDomIds.push(id);
				if(globalDeviceType != "Mobile"){
					$('#traddDomDev'+id).addClass('highlight');
				}else{
					$(this).addClass('highlight');
				}
			}
		}else{
			var pos = globalDevBoundDomIds.indexOf(id);
			globalDevBoundDomIds.splice(pos,1);
			if(globalDeviceType != "Mobile"){
				$('#traddDomDev'+id).removeClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : loadDomDPS
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 29, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function loadDomDPS(){
		var url = "action=BoundRTM&query={'QUERY':[{'Limit':'"+pagelimit+"','Page':'"+PerPage+"','extra':'"+globalDomDPS2Ids+"','flag':'"+globalDPSFlag+"'}]}&version=3.0";
	$.ajax({
		url: getURL('ADMIN2','JSON') + url,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#domainDPStotalMatches').empty().append(totMatch);
			globalDomDPS2Ids = [];
			if (jsonData.data[0].row){
				for (var a=0;a<jsonData.data[0].row.length;a++){
					var row = jsonData.data[0].row[a];
					var id = row.ServerInformationId;
					if(globalDeviceType != "Mobile"){
						str += "<tr id='trDomDPS"+row.ServerInformationId+"'><td><input type='checkbox' class='trDomDPS' siid='"+row.ServerInformationId+"'/></td>";
					}else{
						str += "<tr class='trDomDPS' siid='"+row.ServerInformationId+"'>";
					}
					str += "<td>"+row.ServerType+"</td>";
					str += "<td>"+row.Hostname+"</td>";
					str += "<td>"+row.Authentication+"</td>";
					str += "<td>"+row.NTP+"</td>";
					str += "<td>"+row.Status+"</td>";
					str += "<td>"+row.BindedDomains+"</td>";
					str += "<td>"+row.PrimaryInterface+"</td>";
					str += "<td>"+row.PrimaryIP+"</td>";
					str += "<td>"+row.PrimaryNetMask+"</td>";
					str += "<td>"+row.PrimaryGateway+"</td>";
					str += "<td>"+row.SecondaryInterface+"</td>";
					str += "<td>"+row.SecondaryIP+"</td>";
				str += "<td>"+row.SecondaryNetMask+"</td>";
				str += "</tr>";
					if ($.inArray(id,globalDomDPS2Ids) == -1){
						globalDomDPS2Ids.push(id);
					}
				}
			}
			$('#domainDPSAdmin-table > tbody').empty().append(str);
			if (globalDeviceType == 'Mobile'){
				$("#domainDPSAdmin-table").table("refresh");
			}
			getDomDPSIds();
		}
	});
}

function showAddDomDPS(){
	$( "#addDomDPSPopUp" ).dialog({
		modal: true,
		autoResize:true,
		width: 1000,
		maxHeight: 500,
		height:600,
		title: 'Add DPS'
	});
	$( "#addDomDPSPopUp" ).empty().load("pages/Admin/domainAddDPS.html",function(){
		setTimeout(function(){
			loadDPSBoundtoDom();
		}, 1000);

	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getDomDPSIds
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 29, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the selected id of the row and highlights the
 #					row for zone table only
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getDomDPSIds() {
	$(".trDomDPS").on("click",function(){
		var id = $(this).attr('siid');
		if (globalDeviceType == 'Mobile'){
			var cond = $('.trDomDPS').hasClass('highlight');
		}else{
			var cond = $('#trDomDPS'+id).children().find('input').is(':checked');
		}
		if (cond){
			if($.inArray(id, globalDomDPSIds) == -1){
				globalDomDPSIds.push(id);
				if(globalDeviceType != "Mobile"){
					$('#trDomDPS'+id).addClass('highlight');
				}else{
					$(this).addClass('highlight');
				}
			}
		}else{
			var pos = globalDomDPSIds.indexOf(id);
			globalDomDPSIds.splice(pos,1);
			if(globalDeviceType != "Mobile"){
				$('#trDomDPS'+id).removeClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
		}
	});
}

function addDomDPS(){
	for(var i=0;i<globalDPSBoundDomIds.length;i++){
		if ($.inArray(globalDPSBoundDomIds[i],globalDomDPS2Ids) == -1){
			globalDomDPS2Ids.push(globalDPSBoundDomIds[i]);
		}
	}
	$( "#addDomDPSPopUp" ).dialog('close');
	loadDomDPS();
}

function removeDomDPS(){
	for(var i=0;i<globalDomDPSIds.length;i++){
		var pos = globalDomDPS2Ids.indexOf(globalDomDPSIds[i]);
		globalDomDPS2Ids.splice(pos,1);
		$('#trDomDPS'+globalDomDPSIds).children().find('input').attr('checked',false);
	}
	globalDomDPSIds = [];
	loadDomDPS();
}

function loadDPSBoundtoDom(){
	 var qstr = "action=LoadRTM&query={'QUERY':[{'Limit':'"+pagelimit+"','Page':'"+PerPage+"','extra':'"+globalDomDPS2Ids+"'}]}&version=3.0";
	$.ajax({
		url: getURL('ADMIN2','JSON') + qstr,
		dataType: 'html',
		success: function(data){
			// PARSE JSON
			var str = "";
			data = data.replace(/'/g,'"');
			var jsonData = jQuery.parseJSON(data);
			var totMatch = jsonData.data[0].total;
			$('#domainaddDPStotalMatches').empty().append(totMatch);
			if (jsonData.data[0].row){
				for (var a=0;a<jsonData.data[0].row.length;a++){
					var row = jsonData.data[0].row[a];
					var id = row.ServerInformationId;
					if(globalDeviceType != "Mobile"){
						str += "<tr id='trDomAddDPS"+row.ServerInformationId+"'><td><input type='checkbox' class='trDomDPS' siid='"+row.ServerInformationId+"'/></td>";
					}else{
						str += "<tr class='trDomAddDPS' siid='"+row.ServerInformationId+"'>";
					}
					str += "<td>"+row.ServerType+"</td>";
					str += "<td>"+row.Hostname+"</td>";
					str += "<td>"+row.Authentication+"</td>";
					str += "<td>"+row.NTP+"</td>";
					str += "<td>"+row.Status+"</td>";
					str += "<td>"+row.BindedDomains+"</td>";
					str += "<td>"+row.PrimaryInterface+"</td>";
					str += "<td>"+row.PrimaryIP+"</td>";
					str += "<td>"+row.PrimaryNetMask+"</td>";
					str += "<td>"+row.PrimaryGateway+"</td>";
					str += "<td>"+row.SecondaryInterface+"</td>";
					str += "<td>"+row.SecondaryIP+"</td>";
				str += "<td>"+row.SecondaryNetMask+"</td>";
				str += "</tr>";
				}
			}
			$('#domainAddDPSAdmin-table > tbody').empty().append(str);
			if (globalDeviceType == 'Mobile'){
				$("#domainAddDPSAdmin-table").table("refresh");
			}
			getDomAddDPSIds();
		}
	});
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : getDomAddDPSIds
 #  AUTHOR        : Apple Kem E. Eguia
 #  DATE          : March 29, 2014
 #  MODIFIED BY   : 
 #  REVISION DATE :
 #  REVISION #    : 
 #  DESCRIPTION   : gets the selected id of the row and highlights the
 #					row for zone table only
 #  PARAMETERS    : 
 #
 #######################################################################
*/
function getDomAddDPSIds() {
	$(".trDomAddDPS").on("click",function(){
		var id = $(this).attr('siid');
		if (globalDeviceType == 'Mobile'){
			var cond = $('.trDomAddDPS').hasClass('highlight');
		}else{
			var cond = $('#trDomAddDPS'+id).children().find('input').is(':checked');
		}
		if (cond){
			if($.inArray(id, globalDPSBoundIds) == -1){
				globalDPSBoundIds.push(id);
				if(globalDeviceType != "Mobile"){
					$('#trDomAddDPS'+id).addClass('highlight');
				}else{
					$(this).addClass('highlight');
				}
			}
		}else{
			var pos = globalDPSBoundIds.indexOf(id);
			globalDPSBoundIds.splice(pos,1);
			if(globalDeviceType != "Mobile"){
				$('#trDomAddDPS'+id).removeClass('highlight');
			}else{
				$(this).removeClass('highlight');
			}
		}
	});
}

// -------cbobis
function editDevInfosPopUp(){
	if(genIds.length<1){ alertUser("Please select a device to edit"); return; }
	if(genIds.length<1){ return; }
	editDevInfoAdmin = true;
	setvariableEditDevice();
	showEditDevInfoAdmin(genIds[0]);
}

function showEditDevInfoAdmin(device){
	var url = getURL("RM4")+'action=deviceinfo&query={"QUERY":[{"deviceid":"'+device+'"}]}&version=3.0';
	$.ajax({
        url: url,
        dataType: 'html',
		async: false,
        success: function(data) {
			if(globalDeviceType != "Mobile"){
				var mydata = data;
				editDevInfoAdminPopUp(mydata);
			}
        }
    });

}

function editDevInfoAdminPopUp(data){
	var h = $(window).height();
	$( "#showInformationDeviceDiv" ).dialog({
		modal: true,
		autoResize:true,
		width: "90%",
//		'max-height': h,
//		height: 'auto',
		height: h,
		top: "0px !important",
		overflow: "auto",
		title: "Device Information",
	});
	$( "#showInformationDeviceDiv" ).empty().load('pages/Admin/EditDeviceInfo.html',function(){
		createTableEditDeviceXML(data);
	});
}

function createTableEditDeviceXML(data){
	data = data.replace(/'/g,'"');
	var jsonData = jQuery.parseJSON(data);
	globaleviceInformationJSON = jsonData.data[0].DEVICE[0];
	var str = "";
	editedDevInfoAdmin = [];
	str = createDyanamicTableAndAttribute(jsonData.data[0].DEVICE[0],str,"",genIds[0]);
	str+="<div data-role='navbar' id='devicechildTab'><ul>";
	str= createDyanmicTabDeviceInformation(jsonData.data[0].DEVICE[0],str,false,true);
	str+="</div></div></center>";
	$('#EditInfoAreAdmin').empty().append(str);
	$('#devicechildTab').tabs();
	$('#devicechildinformation').tabs();
	$('#devicerackTab').tabs();
	$('#devicemoduleTab').tabs();
	$('#deviceportTab').tabs();
	$('#devicesubchannelTab').tabs();
}


function createDynamicEditDevTable(str,attrname,attrval,ctr,device,t,level,nodeid){
	var toedit = ["username","password","tftpgateway","rp1port","subnetmask","technicalsupport","systemconfigname","systemimagefile"];
	if(level){
		if(level.toLowerCase()=="port"){
			toedit = ["description","mediatype","physicalporttype"];
		}
	}
	if(attrval != "" && attrval != undefined && attrval.toLowerCase() != "none"){
		if(ctr == 1){
			str += "<tr>";
			str += "<td>" + attrname + " :</td>";	
			if(attrname.toLowerCase() == "password"){
				str += "<td><input type='password' value='"+ attrval +"'";	
			}else{
				str += "<td><input type='text' value='"+ attrval +"'";	
			}
			if(toedit.indexOf(attrname.toLowerCase())==-1){
				str += " disabled='disabled'/></td>";
			}else{
				var idtmp = nodeid+"_"+attrname;
				if(level){
					idtmp = level+"_"+idtmp;
				}
				editedDevInfoAdmin.push(idtmp);
				str += " id='"+idtmp+"'/></td>";
			}
		}else if(ctr%3 == 0){
			str += "<td>" + attrname + " :</td>";	
			if(attrname.toLowerCase() == "password"){
				str += "<td><input type='password' value='"+ attrval +"'";	
			}else{
				str += "<td><input type='text' value='"+ attrval +"'";	
			}
			if(toedit.indexOf(attrname.toLowerCase())==-1){
				str += " disabled='disabled'/></td>";
			}else{ 
				var idtmp = nodeid+"_"+attrname;
				if(level){
					idtmp = level+"_"+idtmp;
				}
				editedDevInfoAdmin.push(idtmp);
				str += " id='"+idtmp+"'/></td>";
				//str += "/></td>";
			}
			str += "</tr>";
			str += "<tr>";
		}else{
			str += "<td>" + attrname + " :</td>";	
			if(attrname.toLowerCase() == "password"){
				str += "<td><input type='password' value='"+ attrval +"'";	
			}else{
				str += "<td><input type='text' value='"+ attrval +"'";	
			}
			if(toedit.indexOf(attrname.toLowerCase())==-1){
				str += " disabled='disabled'/></td>";
			}else{ 
				var idtmp = nodeid+"_"+attrname;
				if(level){
					idtmp = level+"_"+idtmp;
				}
				editedDevInfoAdmin.push(idtmp);
				str += " id='"+idtmp+"'/></td>";
				//str += "/></td>";
			}
			if(t == device -1){
				str += "</tr>";
			}
		} 
	}
	return str;
}

function setvariableEditDevice(){
	editedDevInfoPerTabAdmin = []
	editedDevInfoPerTabAdmin.push({Device: [], Port: [], SubChannel: [], Partner: []});
}

function getDevEditedInfoAdmin(){
	var d = editedDevInfoPerTabAdmin[0];
	if(editedDevInfoAdmin.length<1){ return; }
	$.each(editedDevInfoAdmin, function(index,object){
		if(object.split("_").length>2){
			var node = object.split("_")[0];
			var nodeid = object.split("_")[1];
			var nodeattr = object.split("_")[2];
			var nodeval = $("#"+object).val();
		}else{
			var node = "";
			var nodeid = object.split("_")[0];
			var nodeattr = object.split("_")[1];
			var nodeval = $("#"+object).val();
		}
		var target = d.Device;
		switch(node.toLowerCase()){
			case "port":
				target = d.Port;
			break;
			case "subchannel":
				target = d.SubChannel;
			break;
		}
		if(target.length>0){
			$.each(target, function(i,obj){
				if(obj.Id == nodeid && obj.Attr == nodeattr){
					obj.Value = nodeval;
				}else{
					target.push({ Id: nodeid, Attr: nodeattr, Value: nodeval})
				}
			});
		}else{
			target.push({ Id: nodeid, Attr: nodeattr, Value: nodeval})
		}
	});
}

function saveEditedDeviceInformation(){
	getDevEditedInfoAdmin();

}

function deleteDevPPortAdmin(id) {
	var level = id.split("_")[0];
	var portid = id.split("_")[1];
	var partid = id.split("_")[2];
	var tmpidx = -1;
	if(level.toLowerCase() == "port"){
		var target = editedDevInfoPerTabAdmin[0].Port;
	}else if(level.toLowerCase() == "subchannel"){
		var target = editedDevInfoPerTabAdmin[0].SubChannel;
	}
	$.each(target, function(i,obj){
		if(obj.Id == portid){
			if(obj.Attr == "PartnerId" && obj.Value == partid){
				tmpidx = i;
			}
		}
	});
	if(tmpidx>-1){
		target.splice(tmpidx,1);
	}
	$('#partInfoField').remove();
	var str = showParnerAddSelectionAdmin(level,portid);
	$('#device'+level.toLowerCase()+"childinformation").append(str);
}

function showParnerAddSelectionAdmin(level,tmpid){
	var str = "<table><tr><td style='text-align:center;'><input type='button' id='addPartInfoAdmin' value='Add Partner Port' onclick=\"showAvailPartAddAdmin('"+level+"_"+tmpid+"');\"/></td></tr><tr><div id='"+level.toLowerCase()+"partaddInclude'></div></tr></table>";
	return str;
}

function showAvailPartAddAdmin(tag) {
	var level = tag.split("_")[0];
	var targetid = tag.split("_")[1];
	var urlx = getURL("ADMIN2","JSON");
	$.ajax({
		url: urlx,
		data: {
			action: "getswitchdevice",
		},
		dataType : 'html',
		success: function(data){
			if(globalInfoType == "JSON"){
				var dat = data.replace(/'/g,'"');
		        var dat2 = $.parseJSON(dat);
				var MAIN = dat2.MAINCONFIG[0];
				var DEVICE = MAIN.DEVICE;
				$.each(DEVICE, function(i,obj) {
					var SLOT = obj.SLOT;
					
				});
			}
		}
	});
//	var str = "";
//	$('#'+level.toLowerCase()+'partaddInclude').append(str);
}
